import { GoogleMap, LoadScriptNext, Marker, Polygon } from "@react-google-maps/api";
import React, { FC, Fragment, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle, FormGroup } from "reactstrap";
import { FallBackSpinner } from "../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { ILicenseCoordinates } from "../MapPointsContainer";
import $ from 'jquery'


interface IPropTypes {
  data: ILicenseCoordinates[]
}
const MapDetails: FC<IPropTypes> = ({ data }) => {

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
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle>قطعات روی نقشه</CardTitle>
        </CardHeader>
        <CardBody>
          <FormGroup style={{ height: "100vh" }} className="w-100 mt-2">
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
                center={{ lat: data[0].centerX,  lng: data[0].centerY }}
                zoom={8}
              >
                {data.map((row: ILicenseCoordinates, key: any) => {
                  let newPath: { lat: number; lng: number }[] = [];
                  row.coordinates.forEach(
                    (row: { x: number; y: number }, key: any) => {
                      newPath.push({ lat: row.x, lng: row.y });
                    }
                  );
                  return <Polygon path={newPath} />;
                })}

                {data.map((row: ILicenseCoordinates, key: any) => {
                  return (
                    <Marker
                      position={{ lat: +row.centerX, lng: +row.centerY }}
                    />
                  );
                })} 
              </GoogleMap>
            </LoadScriptNext>
          </FormGroup>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export { MapDetails };
