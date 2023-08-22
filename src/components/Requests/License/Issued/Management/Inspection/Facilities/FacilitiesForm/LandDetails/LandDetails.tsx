import {
  GoogleMap,
  LoadScriptNext,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert, FormGroup } from "reactstrap";
import { ToastTypes } from "../../../../../../../../../core/enums";
import { PointInPolygon, showToast } from "../../../../../../../../../core/utils";
import { FallBackSpinner } from "../../../../../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import $ from 'jquery'
import { MarkerInfoView } from "./MarkerInfoView/MarkerInfoView";
import { isArray } from "react-select/dist/declarations/src/utils";

interface IPointType {
  lat: number;
  lng: number;
}

interface IPropTypes {
  buildingsData: any
  point: IPointType;
  setPoint: (point: IPointType) => void;
  getSection: any;
  polyLine: { lat: number; lng: number }[];
  setPolyline: (val: { lat: number; lng: number }[]) => void;
  buildingType: any;
  wellLocationEnum: any;
}

const LandDetails: FC<IPropTypes> = ({
  point,
  setPoint,
  getSection,
  polyLine,
  setPolyline,
  buildingsData,
  buildingType,
  wellLocationEnum
}) => {
  const [isInPolygon, setIsInPolygon] = useState<boolean>(true);
  const { section_id } = useParams<{ section_id: string }>();
  const [zoom, setZoom] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const getPolygon = getSection(+section_id);
  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });

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

      setPolyline(serverPolygon);
    }
  }, [getPolygon.isSuccess]);

  useEffect(() => {
    if (polyLine.length > 0 && isLoaded) {
      getCenter();
      getZoomLevel(polyLine);
    }
  }, [polyLine, isLoaded]);

  const getCenter = () => {
    try {
      //@ts-ignore
      const bounds = new google.maps.LatLngBounds();
      let i;

      // The Bermuda Triangle
      const polygonCoords: any = [];

      polyLine.forEach((value) => {
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

  const checkOuterPoint = () => {
    try {
      // @ts-ignore
      const bermudaTriangle = new google.maps.Polygon({
        paths: polyLine,
      });
      const curPoint:any = { lat: () => point.lat, lng: () => point.lng };
      // @ts-ignore
      const resultPath = google.maps.geometry.poly.containsLocation(
        curPoint,
        bermudaTriangle
      );
      if (!resultPath) {
        //setLatError("مختصات مورد نظر در قطعه نمیباشد");
        // setLngError("مختصات مورد نظر در قطعه نمیباشد");
      }
      setIsInPolygon(resultPath);
      //   setPoint(point);
    } catch (error) {}
  };

  //   useEffect(() => {
  //     if (!isInPolygon) {
  //       setLatError("مختصات مورد نظر در قطعه نمیباشد");
  //       setLngError("مختصات مورد نظر در قطعه نمیباشد");
  //       console.log(isInPolygon);
  //     }
  //   }, [isInPolygon]);

  useEffect(() => {
    checkOuterPoint();
  }, [point]);

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
    }
  };

  return (
    <FormGroup style={{ height: "100vh" }} className="w-100 mt-2">
      {!isInPolygon &&
        ((!!point.lat && !!point.lng) ||
          point.lat === 0 ||
          point.lng === 0) && (
          <Alert color="danger" className="text-center">
            مختصات مورد نظر در قطعه نمیباشد
          </Alert>
        )}
      <LoadScriptNext
        id="script-loader"
        googleMapsApiKey="AIzaSyAZY39rkhAz-qzchvth09A906OvFkUqwoc"
        language="en"
        region="us"
        // libraries={libraries}
        loadingElement={<FallBackSpinner />}
        version="weekly"
      >
        <GoogleMap
          mapTypeId="hybrid"
          mapContainerClassName="App-map"
          zoom={zoom}
          center={center}
          onLoad={(map) => {
            getCenter();
            setIsLoaded(true);
            //getZoomLevel(map);
          }}
          onClick={(e: any) => {

            if(buildingType && buildingType.form !== 2){
              if (
                PointInPolygon(
                  { lat: e.latLng.lat(), lng: e.latLng.lng() },
                  polyLine
                )
              ) {
                return setPoint({ lat: e.latLng.lat(), lng: e.latLng.lng() });
              }
              showToast(
                ["نقطه انتخاب شده خارج از قطعه می باشد"],
                ToastTypes.error
              );
            }else{
              if (wellLocationEnum && wellLocationEnum.value === 2) {
                if (
                  !PointInPolygon(
                    { lat: e.latLng.lat(), lng: e.latLng.lng() },
                    polyLine
                  )
                ) {
                  return setPoint({ lat: e.latLng.lat(), lng: e.latLng.lng() });
                }
                showToast(
                  ["نقطه انتخاب شده داخل از قطعه می باشد"],
                  ToastTypes.error
                );
              } else {
                if (
                  PointInPolygon(
                    { lat: e.latLng.lat(), lng: e.latLng.lng() },
                    polyLine
                  )
                ) {
                  return setPoint({ lat: e.latLng.lat(), lng: e.latLng.lng() });
                }
                showToast(
                  ["نقطه انتخاب شده خارج از قطعه می باشد"],
                  ToastTypes.error
                );
              }

            }

          }}
        >
          {isInPolygon && (
            <Marker position={{ lat: point.lat, lng: point.lng }} />
          )}

          {buildingsData &&
            buildingsData.map((item: any, key: any) => (
              <MarkerInfoView key={key} item={item} />
            ))}

          <Polyline
            path={polyLine}
            options={{ strokeColor: "orange" }}
            //onLoad={(pol) => getZoomLevel(pol)}
          />
        </GoogleMap>
      </LoadScriptNext>
    </FormGroup>
  );
};

export { LandDetails };
