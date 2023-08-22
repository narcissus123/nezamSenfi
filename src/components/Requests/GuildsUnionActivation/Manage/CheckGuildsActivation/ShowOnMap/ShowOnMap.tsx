import { GoogleMap, LoadScriptNext, Marker } from "@react-google-maps/api";
import React, { FC, useState } from "react";
import { Col, FormGroup, ListGroup, ListGroupItem, Row } from "reactstrap";
import { FallBackSpinner } from "../../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import Styled from './ShowOnMap.module.scss'
import $ from 'jquery'

interface IPropTypes {
  point:any
}

const ShowOnMap: FC<IPropTypes> = ({ point }) => {

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

  const [zoom, setZoom] = useState<number>(12);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);

  return (
    <>
      <Row style={{ margin: "25px 0px" }}>
        <Col>
          <ListGroupItem tag="a" active>
            مختصات
          </ListGroupItem>
          <ListGroup className="list-group-horizontal-sm">
            <ListGroupItem tag="a" className={Styled["item-flex"]}>
              {`Longitude: ${point.lng}`}
            </ListGroupItem>
            <ListGroupItem tag="a" className={Styled["item-flex"]}>
              {`Latitude: ${point.lat}`}
            </ListGroupItem>
          </ListGroup>
        </Col>
      </Row>
      <FormGroup style={{ height: "100vh" }} className="w-100 mt-2">
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
              // setPoint({ lat: e.latLng.lat(), lng: e.latLng.lng() });
            }}
          >
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
          </GoogleMap>
        </LoadScriptNext>
      </FormGroup>
    </>
  );
};

export { ShowOnMap };
