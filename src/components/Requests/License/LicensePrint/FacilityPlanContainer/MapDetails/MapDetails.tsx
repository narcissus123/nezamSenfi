import { GoogleMap, InfoBox, InfoWindow, LoadScriptNext, Marker, Polygon } from "@react-google-maps/api";
import React, { FC, useEffect, useState } from "react";
import { FormGroup } from "reactstrap";
import { FallBackSpinner } from "../../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { MarkerInfoView } from "../MarkerInfoView/MarkerInfoView";
import $ from "jquery";
import './MapDetails.scss';


interface IPropTypes {
  sectionInfo: any;
}

const MapDetails: FC<IPropTypes> = ({ sectionInfo }) => {

  useEffect(()=>{
    setSections(sectionInfo);

    let cord: { lat: number; lng: number }[] = [];
    for (let i = 0; i < sectionInfo[0].pointsSection.length; i++) {
      cord.push({
        lat: sectionInfo[0].pointsSection[i].x,
        lng: sectionInfo[0].pointsSection[i].y,
      });
    }
    setPath(cord);
  },[sectionInfo])

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
      lat: number;
      lng: number;
    }[]
  >([]);

const [routingMapData, setRoutingMapData] = useState<{
  latCenterMap: number;
  licenseRequestId: number;
  lngCenterMap: number;
  zoomMap: number;
}>({
  latCenterMap: 0,
  licenseRequestId: 0,
  lngCenterMap: 0,
  zoomMap: 0,
});

const [sections, setSections] = useState<
  {
    id: number;
    farmName: string;
    centerX: number;
    centerY: number;
  }[]
>([]);


  return (
    <FormGroup style={{ height: "100%", width: "100%", marginBottom: "0" }}>
      <LoadScriptNext
        id="script-loader"
        googleMapsApiKey="AIzaSyAZY39rkhAz-qzchvth09A906OvFkUqwoc"
        language="en"
        region="us"
        libraries={["geometry"]}
        loadingElement={<FallBackSpinner />}
        version="weekly"
      >
        <GoogleMap
          mapTypeId="hybrid"
          mapContainerClassName="App-map"
          center={{
            lat: sections[0] ? sections[0].centerX : 0,
            lng: sections[0] ? sections[0].centerY : 0,
          }}
          zoom={
            routingMapData.zoomMap && routingMapData.zoomMap !== 0
              ? routingMapData.zoomMap
              : 14
          }
          tilt={0}
        >
          <Polygon path={path} />

          {/* {path &&
            path.map((row: { lat: number; lng: number }, key) => {
              return (
                <InfoBox position={{ lat: row.lat, lng: row.lng }} options={{}}>
                  <p
                    style={{
                      textAlign: "center",
                      background: "white",
                      width: "15px",
                      height: "15px",
                      overflow: "hidden",
                    }}
                  >
                    {key}
                  </p>
                </InfoBox>
              );
            })} */}
        </GoogleMap>
      </LoadScriptNext>
    </FormGroup>
  );



};

export { MapDetails };
