/* eslint-disable */
import {
  GoogleMap,
  LoadScriptNext,
  Marker,
  Polygon,
} from "@react-google-maps/api";
import { Form, Formik } from "formik";
import React, { FC, useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  FormGroup,
} from "reactstrap";
import {
  useCheckLicenseRequestIntersects,
  useGetLicenseRequestDetailByIssuingResponsible,
  usePostGetSectionOfLicenseRequestByIdByIssuingResponsible,
} from "../../../../../../../../core/services/api";
import { MultiSelectOption } from "../../../../../../../common/Form";
import { FallBackSpinner } from "../../../../../../../common/Spinner/FallBackSpinner";
import $ from 'jquery'

const IntersectSectionMap: FC = () => {

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

  const [path, setPath] = useState<
    {
      id: number;
      cord: { lat: number; lng: number }[];
    }[]
  >([]);
  const [zoom, setZoom] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [center, setCenter] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [marker, setMarker] = useState<
    { label: string; point: { lat: number; lng: number } }[]
  >([]);
  const [intersectsPath, setIntersectsPath] = useState<any>([]);
  const [sections, setSections] = useState<
    {
      id: number;
      farmName: string;
      centerX: number;
      centerY: number;
    }[]
  >([]);

  const { id } = useParams<{ id: string }>();

  const checkIntersect = useCheckLicenseRequestIntersects();

  const getLisenceDetails = useGetLicenseRequestDetailByIssuingResponsible(+id);

  const getSection =
    usePostGetSectionOfLicenseRequestByIdByIssuingResponsible();

  useEffect(() => {
    if (getLisenceDetails.isSuccess) {
      const result = getLisenceDetails.data.data.result;
      console.log(result);
      try {
        setSections([
          ...result.sections.map((row: any) => ({
            id: row.id,
            farmName: row.farmName,
            centerX: row.centerX,
            centerY: row.centerY,
            label: row.farmName,
            value: row.id,
          })),
          {
            id: -2,
            farmName: "همه نقاط",
            label: "همه نقاط",
            value: -2,
          },
        ]);
      } catch (error) {}
    }
  }, [getLisenceDetails.isSuccess]);

  useEffect(() => {
    const loadSec = async () => {
      if (sections.length > 0) {
        for (let index = 0; index < sections.length; index++) {
          if (sections[index].id !== -2) {
            const secDetail = await getSection.mutateAsync(sections[index].id);
            const coordinates = secDetail.data.result.coordinates;
            const newCord: {
              id: number;
              cord: { lat: number; lng: number }[];
            } = { id: sections[index].id, cord: [] };
            for (let i = 0; i < coordinates.length; i++) {
              const cord = coordinates[i];

              newCord.cord.push({
                lat: cord.y,
                lng: cord.x,
              });
            }
            setPath((old) => [...old, newCord]);
          }
        }
      }
    };
    loadSec();
  }, [sections]);

  // useEffect(() => {
  //   if (getSection.isSuccess && false) {
  //     const coordinates = getSection.data?.data.result.coordinates;
  //     const newCord: { lat: number; lng: number }[] = [];
  //     coordinates.forEach((cord: any, index: number) => {
  //       if (coordinates.length - 1 > index) {
  //         newCord.push({
  //           lat: cord.y,
  //           lng: cord.x,
  //         });
  //       }
  //     });
  //     setPath(newCord);
  //     // getIntersects();
  //     // setCenter(newCord[0]);
  //   }
  // }, [getSection.isSuccess]);

  useEffect(() => {
    checkIntersect.mutate(+id, {
      onSuccess: (val) => {
        const result = val.data.result;

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
        console.log(points);

        setIntersectsPath(cords);
        setMarker(points);
      },
    });
  }, []);

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
      getZoomLevel(path[0].cord);
    }
    //@ts-ignore
  }, [path, isLoaded]);

  // Clean up refs
  const onUnmount = useCallback(() => {
    listenersRef.current.forEach((lis: any) => lis.remove());
    polygonRef.current = null;
  }, []);

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
      path[0].cord.forEach((value) => {
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
      {getLisenceDetails.isLoading || getSection.isLoading ? (
        <FallBackSpinner />
      ) : (
        <Formik
          onSubmit={() => {}}
          initialValues={{ points: [{ value: -2, label: "همه نقاط" }] }}
        >
          {({ values: { points }, setFieldValue }) => (
            <Form>
              <CardHeader>
                <CardTitle>همپوشانی نقاط</CardTitle>
              </CardHeader>

              <Col sm="4" className="ml-1 mt-2">
                <MultiSelectOption
                  labelText="نقاط"
                  name="points"
                  options={sections}
                  significant={false}
                  placeHolder="نقاط مورد نظر برای نمایش..."
                  onChange={(e) => {
                    setFieldValue(
                      "points",
                      e.length > 1
                        ? e[e.length - 1].value === -2
                          ? [e[e.length - 1]]
                          : e.filter((it: any) => it.value !== -2)
                        : e
                    );
                  }}
                />
              </Col>
              <CardBody>
                <FormGroup style={{ height: "100vh", width: "100%" }}>
                  <LoadScriptNext
                    id="script-loader"
                    googleMapsApiKey="AIzaSyAZY39rkhAz-qzchvth09A906OvFkUqwoc"
                    language="en"
                    region="us"
                    libraries={["geometry"]}
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
                        center={
                          center
                            ? { lat: center.lat, lng: center.lng }
                            : { lat: 0, lng: 0 }
                        }
                        zoom={zoom}
                      >
                        {intersectsPath.map((item: any, key: number) => (
                          <Polygon
                            key={key}
                            path={item}
                            options={{ fillColor: "red", strokeColor: "red" }}
                          />
                        ))}
                        {path
                          .filter((row) =>
                            points
                              ? points.some((it) => it.value === -2)
                                ? true
                                : points.some((it) => it.value === row.id)
                              : false
                          )
                          .map((item, key) => (
                            <Polygon
                              // Make the Polygon editable / draggable
                              key={key}
                              path={item.cord}
                              // Event used when manipulating and adding points
                              // Event used when dragging the whole Polygon
                            />
                          ))}

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
                      </GoogleMap>
                    )}
                  </LoadScriptNext>
                </FormGroup>
              </CardBody>
            </Form>
          )}
        </Formik>
      )}
    </Card>
  );
};

export { IntersectSectionMap };
