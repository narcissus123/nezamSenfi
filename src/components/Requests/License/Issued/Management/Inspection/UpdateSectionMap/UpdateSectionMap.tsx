/* eslint-disable */

import {
  DrawingManager,
  GoogleMap,
  LoadScriptNext,
  Marker,
  Polygon,
} from "@react-google-maps/api";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { Download, Map } from "react-feather";
import { useHistory, useParams } from "react-router-dom";
import { Button, Card, CardBody, Col, FormGroup, Row } from "reactstrap";
import { ToastTypes } from "../../../../../../../core/enums";
import { LicenseRequestStatusEnum } from "../../../../../../../core/enums/license-request-status.enums";
import {
  useCheckLicenseRequesSectiontIntersectsByExpert,
  useGetSectionOfLicenseRequestById,
  useUpdateLicenseRequestSection,
} from "../../../../../../../core/services/api";
import { showToast } from "../../../../../../../core/utils";
import { SimpleSubmitButton } from "../../../../../../common/Form";
import { FallBackSpinner } from "../../../../../../common/Spinner/FallBackSpinner";
const { buildGPX, GarminBuilder } = require("gpx-builder");
import $ from 'jquery'

interface IPropTypes {
  useMutation?: any;
  isExpert: boolean;
}

const UpdateSectionMap: FC<IPropTypes> = ({ useMutation, isExpert }) => {
  const [path, setPath] = useState<{ lat: number; lng: number }[]>([]);
  const [zoom, setZoom] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [center, setCenter] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [marker, setMarker] = useState<
    { label: string; point: { lat: number; lng: number } }[]
  >([]);
  const [intersectsPath, setIntersectsPath] = useState<any>([]);

  const { section_id, req_id, status } =
    useParams<{ section_id: string; req_id: string; status: string }>();
  const history = useHistory();

  const getIntersect = useCheckLicenseRequesSectiontIntersectsByExpert();

  const targetNode = document.body;
  const nodeConfig = {attributes: true, childList: true, subtree: true};
  const callback = function (mutationsList: any, observer: any) {
      for (const mutation of mutationsList) {
        if (mutation.type === "childList") {
          $('div[style*="background-color: rgba(0, 0, 0, 0.5)"]').remove();
          $(
            'div[style*="background-color: white; font-weight: 500; font-family: Roboto, sans-serif; padding: 15px 25px; box-sizing: border-box; top: 5px; border: 1px solid rgba(0, 0, 0, 0.12); border-radius: 5px; left: 50%; max-width: 375px; position: absolute; transform: translateX(-50%); width: calc(100% - 10px); z-index: 1;"]'
          ).remove();
        }
      }
  };
  const observer = new MutationObserver(callback);
  observer.observe(targetNode, nodeConfig);

  const getSection = useMutation
    ? useMutation(+section_id)
    : useGetSectionOfLicenseRequestById(+section_id);

  const options: any = {
    drawingControl: true,
    drawingControlOptions: {
      drawingModes: ["polygon"],
    },
    polygonOptions: {
      clickable: true,
      editable: true,
      draggable: true,
      zIndex: 1,
    },
  };

  useEffect(() => {
    if (getSection.isSuccess) {
      const coordinates = getSection.data.data.result.coordinates;
      const newCord: { lat: number; lng: number }[] = [];
      coordinates.forEach((cord: any, index: number) => {
        if (coordinates.length - 1 > index) {
          newCord.push({
            lat: cord.y,
            lng: cord.x,
          });
        }
      });
      setPath(newCord);
      // setCenter(newCord[0]);
    }
  }, [getSection.isSuccess]);

  const getIntersects = () => {
    getIntersect.mutate(+section_id, {
      onSuccess: (val) => {
        const result = val.data.result;
        console.log(result);

        const cords: any = [];
        const points: any = [];

        result.forEach((item: any) => {
          item.sections.forEach((sec: any, index: number) => {
            const cord = sec.coordinates;
            const pol = cord.map((row: any) => ({ lat: row.y, lng: row.x }));
            cords.push(pol);
            const center = getIntersectCenter(pol);
            points.push({
              label: `${item.name} ${item.lastName} درخواست ${item.licenseRequestId} قطعه ${sec.sectionId}`,
              point: center,
            });
          });
        });
        setIntersectsPath(cords);
        setMarker(points);
      },
    });
  };

  // Define refs for Polygon instance and listeners
  const polygonRef: any = useRef(null);
  const listenersRef: any = useRef([]);

  // Call setPath with new edited path
  const onEdit = useCallback(() => {
    if (polygonRef.current) {
      const nextPath = polygonRef.current
        .getPath()
        .getArray()
        .map((latLng: any) => {
          return { lat: latLng.lat(), lng: latLng.lng() };
        });
      setPath(nextPath);
      // getCenter();/
    }
  }, [setPath]);

  // Bind refs to current Polygon and listeners
  const onLoad = useCallback(
    (polygon) => {
      polygonRef.current = polygon;
      const path = polygon.getPath();
      listenersRef.current.push(
        path.addListener("set_at", onEdit),
        path.addListener("insert_at", onEdit),
        path.addListener("remove_at", onEdit)
      );
    },

    [onEdit]
  );

  useEffect(() => {
    //@ts-ignore
    if (path.length > 0 && isLoaded) {
      getZoomLevel(path);
    }
    //@ts-ignore
  }, [path, isLoaded]);

  const updateSection = useUpdateLicenseRequestSection();

  const onUpdatePolygon = () => {
    let coordinate: any = {
      id: +section_id,
      coordinates: [],
    };
    path.forEach((cord: any) => {
      coordinate.coordinates.push({
        y: cord.lat,
        x: cord.lng,
      });
    });
    coordinate.coordinates.push({ y: path[0].lat, x: path[0].lng });

    // @ts-ignore
    const bermudaTriangle = new google.maps.Polygon({
      paths: path,
    });

    //@ts-ignore
    const area = google.maps.geometry.spherical.computeArea(
      bermudaTriangle.getPath()
    );
    //@ts-ignore
    const perimeter = google.maps.geometry.spherical.computeLength(
      bermudaTriangle.getPath()
    );

    coordinate["sectionArea"] = area;
    coordinate["sectionPerimeter"] = perimeter;

    updateSection.mutate(coordinate, {
      onSuccess: () => {
        showToast(["با موفقیت انجام شد"], ToastTypes.success);
      },
    });
  };

  // Clean up refs
  const onUnmount = useCallback(() => {
    listenersRef.current.forEach((lis: any) => lis.remove());
    polygonRef.current = null;
  }, []);

  const handleLoadPolygon = (polygon: any) => {
    polygon.setMap(null);
    const path2 = polygon.getPath();
    // @ts-ignore
    // const bermudaTriangle = new google.maps.Polygon({
    //   paths: path,
    // });
    var pathArray: any = [];
    let polygonArray: any = [];
    for (var i = 0; i < path2.length; i++) {
      pathArray = { lat: path2.getAt(i).lat(), lng: path2.getAt(i).lng() };
      // @ts-ignore
      //   const resultPath = google.maps.geometry.poly.containsLocation(
      //     path2.getAt(i),
      //     bermudaTriangle
      //   );
      //   if (!resultPath) {
      //     polygon.setMap(null);
      //     return showToast(
      //       ["نمیتوان خارج از محدوده را انتخاب کرد"],
      //       ToastTypes.error
      //     );
      //   }
      polygonArray.push(pathArray);
    }
    setPath(polygonArray);
  };

  // const [latLngs, setLatLngs] = useState<any>({ lat: 0, lng: 0 });

  useEffect(() => {
    getCenter();
  }, [path]);

  const getZoomLevel = (pol: any) => {
    try {
      //@ts-ignore
      const bounds = new google.maps.LatLngBounds();
      let i;
      const polygonCoords: any = [];

      pol.forEach((value: any) => {
        //@ts-ignore
        polygonCoords.push(
          //@ts-ignore
          new google.maps.LatLng(value.lat, value.lng)
        );
      });

      for (i = 0; i < polygonCoords.length; i++) {
        bounds.extend(polygonCoords[i]);
      }
      const ne = bounds.getNorthEast();
      const sw = bounds.getSouthWest();
      var west = sw.lng();
      var east = ne.lng();
      var angle = east - west;
      if (angle < 0) {
        angle += 360;
      }
      var zoom = Math.round(Math.log(360 / angle) / Math.LN2);
      console.log(zoom);

      setZoom(+zoom);
    } catch (error) {
      setZoom(12);
      console.log(error);
    }
  };

  const getCenter = () => {
    try {
      //@ts-ignore
      const bounds = new google.maps.LatLngBounds();
      let i;

      // The Bermuda Triangle
      const polygonCoords: any = [];

      path.forEach((value) => {
        //@ts-ignore
        polygonCoords.push(
          //@ts-ignore
          new google.maps.LatLng(value.lat, value.lng)
        );
      });

      for (i = 0; i < polygonCoords.length; i++) {
        bounds.extend(polygonCoords[i]);
      }
      setCenter({
        lat: bounds.getCenter().lat(),
        lng: bounds.getCenter().lng(),
      });
    } catch (error) {}
  };
  const getIntersectCenter = (polygon: { lat: number; lng: number }[]) => {
    try {
      //@ts-ignore
      const bounds = new google.maps.LatLngBounds();
      let i;

      // The Bermuda Triangle
      const polygonCoords: any = [];

      polygon.forEach((value) => {
        //@ts-ignore
        polygonCoords.push(
          //@ts-ignore
          new google.maps.LatLng(value.lat, value.lng)
        );
      });

      for (i = 0; i < polygonCoords.length; i++) {
        bounds.extend(polygonCoords[i]);
      }
      return {
        lat: bounds.getCenter().lat(),
        lng: bounds.getCenter().lng(),
      };
    } catch (error) {
      return {
        lat: 0,
        lng: 0,
      };
    }
  };

  interface IWaypoints {
    lat: number;
    lng: number;
  }

  const { Point } = GarminBuilder.MODELS;
  const gpxData = new GarminBuilder();

  const downloadGpxFile = (lines: Array<IWaypoints>) => {
    const points: any = [];
    if (lines) {
      lines.forEach((row: IWaypoints) => {
        points.push(new Point(row.lat, row.lng));
      });
    }

    points.push(new Point(lines[0].lat, lines[0].lng));

    gpxData.setSegmentPoints(points);

    const xml = buildGPX(gpxData.toObject());
    const url = "data:text/json;charset=utf-8," + xml;
    const link = document.createElement("a");
    link.download = `gpx.gpx`;
    link.href = url;
    document.body.appendChild(link);
    link.click();
  };

  const svgMarker = {
    path: "M10.453 14.016l6.563-6.609-1.406-1.406-5.156 5.203-2.063-2.109-1.406 1.406zM12 2.016q2.906 0 4.945 2.039t2.039 4.945q0 1.453-0.727 3.328t-1.758 3.516-2.039 3.070-1.711 2.273l-0.75 0.797q-0.281-0.328-0.75-0.867t-1.688-2.156-2.133-3.141-1.664-3.445-0.75-3.375q0-2.906 2.039-4.945t4.945-2.039z",
    fillOpacity: 0.6,
    strokeWeight: 0,
    rotation: 0,
    scale: 0,
    // anchor: new google.maps.Point(15, 30),
  };

  return (
    <Card>
      {getSection.isLoading ? (
        <FallBackSpinner />
      ) : (
        <>
          <Row>
            {isExpert && (
              <Col sm="auto">
                <Button
                  color="primary"
                  onClick={() =>
                    history.push(`/License/Land/Track/${req_id}/${section_id}`)
                  }
                >
                  <Map size={14} /> تغییر فایل نقشه
                </Button>
              </Col>
            )}
            <Col sm="auto">
              <Button color="primary" onClick={() => downloadGpxFile(path)}>
                <Download size={14} /> دانلود فایل GPX
              </Button>
            </Col>
          </Row>
          <CardBody>
            {/* <Alert color="info" className="h6 text-center">
              Lat Lng {"»"} {latLngs.lat} , {latLngs.lng}
            </Alert> */}
            <FormGroup style={{ height: "100vh", width: "100%" }}>
              <LoadScriptNext
                id="script-loader"
                googleMapsApiKey="AIzaSyAZY39rkhAz-qzchvth09A906OvFkUqwoc"
                language="en"
                region="us"
                libraries={isExpert ? ["drawing", "geometry"] : ["geometry"]}
                loadingElement={<FallBackSpinner />}
                version="weekly"
              >
                {getSection.isLoading ? (
                  <FallBackSpinner />
                ) : (
                  <GoogleMap
                    mapTypeId="hybrid"
                    mapContainerClassName="App-map"
                    onLoad={(map) => {
                      getCenter();
                      setIsLoaded(true);
                    }}
                    // onMouseMove={(e) =>
                    //   setLatLngs({ lat: e.latLng.lat(), lng: e.latLng.lng() })
                    // }
                    center={
                      center
                        ? { lat: center.lat, lng: center.lng }
                        : { lat: 0, lng: 0 }
                    }
                    zoom={zoom}

                    // options={{
                    //   restriction: {
                    //     latLngBounds: NEW_ZEALAND_BOUNDS,
                    //     strictBounds: true,
                    //   },
                    // }}
                  >
                    {isExpert && (
                      <DrawingManager
                        options={options}
                        onPolygonComplete={(polygon) =>
                          handleLoadPolygon(polygon)
                        }
                      />
                    )}

                    {marker.map((row) => (
                      <Marker
                        position={{
                          lat: row.point.lat + row.point.lat / 100000,
                          lng: row.point.lng,
                        }}
                        label={{ text: row.label, color: "white" }}
                        icon={svgMarker}
                      />
                    ))}

                    {intersectsPath.map((item: any, key: number) => (
                      <Polygon
                        key={key}
                        path={item}
                        options={{ fillColor: "red", strokeColor: "red" }}
                      />
                    ))}
                    <Polygon
                      // Make the Polygon editable / draggable
                      editable={isExpert}
                      //options={{ fillColor: "" }}
                      draggable={isExpert}
                      path={path}
                      // Event used when manipulating and adding points
                      onMouseUp={onEdit}
                      // Event used when dragging the whole Polygon
                      onDragEnd={onEdit}
                      onLoad={onLoad}
                      onUnmount={onUnmount}
                    />
                  </GoogleMap>
                )}
              </LoadScriptNext>
            </FormGroup>

            <Row>
              {+status === LicenseRequestStatusEnum.Matching && (
                <SimpleSubmitButton
                  isLoading={getIntersect.isLoading}
                  btnText="مشاهده همپوشانی ها"
                  className="mt-2 mr-2"
                  onCLick={getIntersects}
                />
              )}
              {isExpert && (
                <SimpleSubmitButton
                  isLoading={updateSection.isLoading}
                  btnText="ثبت تغییرات نقشه"
                  className="mt-2"
                  onCLick={onUpdatePolygon}
                />
              )}
            </Row>
          </CardBody>
        </>
      )}
    </Card>
  );
};

export { UpdateSectionMap };
