/* eslint-disable */
import {
  DrawingManager,
  GoogleMap,
  LoadScriptNext,
  Polygon,
  PolygonProps,
} from "@react-google-maps/api";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router";
import { Card, CardBody, CardHeader, CardTitle, FormGroup } from "reactstrap";
import { SimpleSubmitButton } from "../../components/common/Form";
import { FallBackSpinner } from "../../components/common/Spinner/FallBackSpinner/FallbackSpinner";
import { ToastTypes } from "../../core/enums";
import { useGetGeometryById, useSaveGeometry } from "../../core/services/api";
import { showToast } from "../../core/utils";

const MapTest2 = () => {
  // Store Polygon path in state
  const [path, setPath] = useState([
    { lat: 52.52549080781086, lng: 13.398118538856465 },
    { lat: 52.48578559055679, lng: 13.36653284549709 },
    { lat: 52.48871246221608, lng: 13.44618372440334 },
  ]);
  const [center, setCenter] = useState(null);

  const options = {
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

  const { id } = useParams();

  const getGeometry = useGetGeometryById();
  const addGeometry = useSaveGeometry();

  useEffect(() => {
    getGeometry.mutate(id, {
      onSuccess: (val) => {
        const coordinates = val.data.result.coordinates;
        const newCord = [];
        coordinates.forEach((cord, index) => {
          if (coordinates.length - 1 > index) {
            newCord.push({
              lat: cord.y,
              lng: cord.x,
            });
          }
        });
        setPath(newCord);
        setCenter(newCord[0]);
      },
    });
  }, []);

  // Define refs for Polygon instance and listeners
  const polygonRef = useRef(null);
  const listenersRef = useRef([]);

  // Call setPath with new edited path
  const onEdit = useCallback(() => {
    if (polygonRef.current) {
      const nextPath = polygonRef.current
        .getPath()
        .getArray()
        .map((latLng) => {
          return { lat: latLng.lat(), lng: latLng.lng() };
        });
      setPath(nextPath);
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

  const onAddNewPolygon = () => {
    const coordinate = {
      coordinates: [],
    };
    path.forEach((cord) => {
      coordinate.coordinates.push({
        y: cord.lat,
        x: cord.lng,
      });
    });
    coordinate.coordinates.push({ y: path[0].lat, x: path[0].lng });
    addGeometry.mutate(coordinate, {
      onSuccess: () => {
        showToast(["با موفقیت اضافه شد"], ToastTypes.success);
      },
    });
  };

  // Clean up refs
  const onUnmount = useCallback(() => {
    listenersRef.current.forEach((lis) => lis.remove());
    polygonRef.current = null;
  }, []);

  const handleLoadPolygon = (polygon) => {
    polygon.setMap(null);
    const path2 = polygon.getPath();
    const bermudaTriangle = new google.maps.Polygon({
      paths: path,
    });
    var pathArray = [];
    let polygonArray = [];
    for (var i = 0; i < path2.length; i++) {
      pathArray = { lat: path2.getAt(i).lat(), lng: path2.getAt(i).lng() };
      const resultPath = google.maps.geometry.poly.containsLocation(
        path2.getAt(i),
        bermudaTriangle
      );
      if (!resultPath) {
        polygon.setMap(null);
        return showToast(
          ["نمیتوان خارج از محدوده را انتخاب کرد"],
          ToastTypes.error
        );
      }
      polygonArray.push(pathArray);
    }
    setPath(polygonArray);
  };

  const NEW_ZEALAND_BOUNDS = {
    north: -34.36,
    south: -47.35,
    west: 166.28,
    east: -175.81,
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>نقشه تستی</CardTitle>
      </CardHeader>
      <CardBody>
        <FormGroup style={{ height: "100vh", width: "100%" }}>
          <LoadScriptNext
            id="script-loader"
            googleMapsApiKey="AIzaSyAZY39rkhAz-qzchvth09A906OvFkUqwoc"
            language="en"
            region="us"
            libraries={["drawing", "geometry"]}
            loadingElement={<FallBackSpinner />}
          >
            {getGeometry.isLoading ? (
              <FallBackSpinner />
            ) : (
              <GoogleMap
                mapTypeId="hybrid"
                mapContainerClassName="App-map"
                center={
                  center
                    ? { lat: center.lat, lng: center.lng }
                    : { lat: 0, lng: 0 }
                }
                zoom={11}
                version="weekly"
                // options={{
                //   restriction: {
                //     latLngBounds: NEW_ZEALAND_BOUNDS,
                //     strictBounds: true,
                //   },
                // }}
              >
                <DrawingManager
                  options={options}
                  onPolygonComplete={(polygon) => handleLoadPolygon(polygon)}
                />
                <Polygon
                  // Make the Polygon editable / draggable
                  editable
                  //options={{ fillColor: "" }}
                  draggable
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
        <SimpleSubmitButton
          isLoading={false}
          btnText="ذخیره زمین"
          onCLick={onAddNewPolygon}
        />
      </CardBody>
    </Card>
  );
};

export { MapTest2 };
