import {
  DrawingManager,
  GoogleMap,
  LoadScriptNext,
  Polygon,
} from "@react-google-maps/api";
import React, { FC, useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle, FormGroup } from "reactstrap";
import { useGetCountyPoligon } from "../../../../core/services/api";
import { FormDivider } from "../../../common/Form";
import { FallBackSpinner } from "../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import $ from 'jquery'

interface IPropTypes {
  county: number;
}

const MapDetails: FC<IPropTypes> = ({ county }) => {

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

  const [path, setPath] = useState<{ lat: number; lng: number }[]>([]);

  const getSection = useGetCountyPoligon();

  useEffect(() => {
    if (county !== 0) {
      getSection.mutate(county, {
        onSuccess: (val) => {
          const result = val.data.result;
          console.log(result);
        },
      });
    } else {
      setPath([]);
    }
  }, [county]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>نقشه فعلی شهرستان</CardTitle>
      </CardHeader>
      <CardBody>
        <FormGroup
          style={{ height: "100vh", width: "100%", marginBottom: "0" }}
        >
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
                center={{ lat: 0, lng: 0 }}
                zoom={11}

                // options={{
                //   restriction: {
                //     latLngBounds: NEW_ZEALAND_BOUNDS,
                //     strictBounds: true,
                //   },
                // }}
              >
                <Polygon path={path} />
              </GoogleMap>
            )}
          </LoadScriptNext>
        </FormGroup>
      </CardBody>
    </Card>
  );
};

export { MapDetails };
