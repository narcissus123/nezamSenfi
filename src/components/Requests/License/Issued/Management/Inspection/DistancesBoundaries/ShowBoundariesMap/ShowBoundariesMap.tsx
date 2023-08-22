import {
  GoogleMap,
  LoadScriptNext,
  Marker,
  Polygon,
  Polyline,
} from "@react-google-maps/api";
import * as Turf from "@turf/turf";
import React, { FC, useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FormGroup } from "reactstrap";
import { FallBackSpinner } from "../../../../../../../common/Spinner/FallBackSpinner";
import $ from 'jquery'

interface IPropTypes {
  lat: string | number;
  lng: string | number;
  setLat: (val: number) => void;
  setLng: (val: number) => void;
  setDistance: (val: number) => void;
  getSection: any;
  setRealDistance: any;
}

const ShowBoundariesMap: FC<IPropTypes> = ({
  lat,
  lng,
  setLat,
  setLng,
  getSection,
  setDistance,
  setRealDistance,
}) => {
  const { section_id } = useParams<{ section_id: string }>();
  const [polygon, setPolygon] = useState<{ lat: number; lng: number }[]>([]);
  const [zoom, setZoom] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [polyLine, setPolyLine] = useState<any>([]);
  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });

  const getPolygon = getSection(+section_id);

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

  useEffect(() => {
    if (getPolygon.isSuccess) {
      const result = getPolygon.data.data.result.coordinates;
      const serverPolygon: { lat: number; lng: number }[] = [];

      result.forEach((item: { y: number; x: number }) => {
        serverPolygon.push({
          lat: item.y,
          lng: item.x,
        });
      });

      setPolygon(serverPolygon);
    }
  }, [getPolygon.isSuccess]);

  useEffect(() => {
    if (polygon.length > 0) {
      getCenter();
    }
  }, [polygon]);

  const getCenter = () => {
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
      setCenter({
        lat: bounds.getCenter().lat(),
        lng: bounds.getCenter().lng(),
      });
    } catch (error) {}
  };

  const onMapClick = (e: any) => {
    try {
      let route: any = [];
      polygon.forEach((element) => {
        route.push([element.lng, element.lat]);
      });

      const point = Turf.point([e.latLng.lng(), e.latLng.lat()]);

      let newRoute = Turf.lineString(route);
      var nearest = Turf.nearestPointOnLine(newRoute, point, {
        units: "meters",
      });
      const cord = nearest.geometry.coordinates;
      //@ts-ignore
      const from = new google.maps.LatLng(e.latLng.lat(), e.latLng.lng());
      // @ts-ignore
      const to = new google.maps.LatLng(cord[1], cord[0]);
      // console.log(nearest);

      setPolyLine([from, to]);
      setDistance(
        nearest.properties.dist
          ? parseFloat(nearest.properties.dist.toFixed(2))
          : 0
      );
      setRealDistance(nearest.properties.dist ? nearest.properties.dist : 0);
      setLat(e.latLng.lat());
      setLng(e.latLng.lng());
    } catch (error) {}
  };

  const onPointChange = useCallback(
    (point: any) => {
      try {
        let route: any = [];
        polygon.forEach((element) => {
          route.push([element.lng, element.lat]);
        });

        const points = Turf.point([point.lng, point.lat]);

        let newRoute = Turf.lineString(route);
        var nearest = Turf.nearestPointOnLine(newRoute, points, {
          units: "meters",
        });
        const cord = nearest.geometry.coordinates;
        //@ts-ignore
        const from = new google.maps.LatLng(point.lat, point.lng);
        // @ts-ignore
        const to = new google.maps.LatLng(cord[1], cord[0]);

        setPolyLine([from, to]);
        setDistance(
          nearest.properties.dist
            ? parseFloat(nearest.properties.dist.toFixed(2))
            : 0
        );
        setRealDistance(nearest.properties.dist ? nearest.properties.dist : 0);
      } catch (error) {
        console.log(error);
      }
    },
    [polygon]
  );

  useEffect(() => {
    if (
      lat !== "0" &&
      lng !== "0" &&
      lat !== 0 &&
      lng !== 0 &&
      lat !== "" &&
      lng !== ""
    )
      onPointChange({ lat: lat, lng: lng });
    else if (
      !lat ||
      !lng ||
      lat === "" ||
      lng === "" ||
      lat === "0" ||
      lng === "0" ||
      lat === 0 ||
      lng === 0
    )
      setPolyLine([]);
  }, [lat, lng, onPointChange]);

  useEffect(() => {
    //@ts-ignore
    if (polygon.length > 0 && isLoaded) {
      getZoomLevel(polygon);
    }
    //@ts-ignore
  }, [polygon, isLoaded]);

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

  return (
    <FormGroup style={{ height: "100vh" }} className="w-100 mt-2">
      <LoadScriptNext
        id="script-loader"
        googleMapsApiKey="AIzaSyAZY39rkhAz-qzchvth09A906OvFkUqwoc"
        language="en"
        region="us"
        libraries={["drawing", "geometry"]}
        loadingElement={<FallBackSpinner />}
        version="weekly"
      >
        <GoogleMap
          mapTypeId="hybrid"
          mapContainerClassName="App-map"
          center={center}
          onLoad={(map) => {
            getCenter();
            setIsLoaded(true);
            // getZoomLevel(map);
          }}
          zoom={zoom}
          onClick={(e) => onMapClick(e)}
        >
          <Polygon path={polygon} onLoad={(pol) => getZoomLevel(pol)} />
          {+lat !== 0 && +lng !== 0 && (
            <Marker position={{ lat: +lat, lng: +lng }} />
          )}
          <Polyline path={polyLine} options={{ strokeColor: "orange" }} />
        </GoogleMap>
      </LoadScriptNext>
    </FormGroup>
  );
};

export { ShowBoundariesMap };
