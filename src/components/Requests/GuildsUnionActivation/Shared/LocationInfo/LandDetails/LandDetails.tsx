import {
  GoogleMap,
  LoadScriptNext,
  Marker,
  Polyline,
} from "@react-google-maps/api";
import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert, FormGroup } from "reactstrap";
import { FallBackSpinner } from "../../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import $ from 'jquery'
import { GuildsActivation } from "../../../../../../core/enums/guilds-activation-status.enums";

interface IPointType {
  lat: number;
  lng: number;
}

interface IPropTypes {
  point: IPointType;
  setPoint: (point: IPointType) => void;
  polyLine: { lat: number; lng: number }[];
  setPolyline: (val: { lat: number; lng: number }[]) => void;
  requestDetail?: any
}

const LandDetails: FC<IPropTypes> = ({
  point,
  setPoint,
  polyLine,
  setPolyline,
  requestDetail
}) => {
  const [isInPolygon, setIsInPolygon] = useState<boolean>(true);
  const [zoom, setZoom] = useState<number>(12);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  
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
          center={{
            lat: point.lat
              ? point.lat.toString().length > 0
                ? point.lat
                : 36.56577310384823
              : 36.56577310384823,
            lng: point.lng
              ? point.lng.toString().length > 0
                ? point.lng
                : 53.05849976624534
              : 53.05849976624534,
          }}
          onLoad={(map) => {
            setIsLoaded(true);
          }}
          onClick={(e: any) => {
            if (requestDetail) {
              if (requestDetail.status !== GuildsActivation.Finish) {
                setPoint({ lat: e.latLng.lat(), lng: e.latLng.lng() });
              }
            } else {
              setPoint({ lat: e.latLng.lat(), lng: e.latLng.lng() });
            }
          }}
        >
          {isInPolygon && (
            <Marker
              position={{
                lat: point.lat
                  ? point.lat.toString().length > 0
                    ? point.lat
                    : 36.56577310384823
                  : 36.56577310384823,
                lng: point.lng
                  ? point.lng.toString().length > 0
                    ? point.lng
                    : 53.05849976624534
                  : 53.05849976624534,
              }}
            />
          )}
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
