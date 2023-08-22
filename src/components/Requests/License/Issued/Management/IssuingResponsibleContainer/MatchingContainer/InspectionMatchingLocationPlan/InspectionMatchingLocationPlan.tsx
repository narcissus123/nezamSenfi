import { GoogleMap, InfoBox, InfoWindow, LoadScriptNext, Polygon } from "@react-google-maps/api";
import React, { FC, useEffect, useState } from "react";
import {
  Card, CardBody, CardHeader, CardTitle, Col, FormGroup, Row,
} from "reactstrap";
import { useGetLicenseRequestDetailByIssuingResponsible, useGetPlanSectionMap, usePostGetSectionOfLicenseRequestByIdByIssuingResponsible, useRegisterPlanSectionMap } from "../../../../../../../../core/services/api";
import { FallBackSpinner } from "../../../../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import $ from 'jquery'
import { useParams } from "react-router-dom";
import { SimpleSubmitButton } from "../../../../../../../common/Form";
import { MarkerInfoView } from "./MarkerInfoView/MarkerInfoView";
import "./InspectionMatchingLocationPlan.scss";
import { showToast } from "../../../../../../../../core/utils";
import { ToastTypes } from "../../../../../../../../core/enums";

const InspectionMatchingLocationPlanContainer: FC = () => {

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

  const { req_id , section_id } = useParams<any>();
  

  const [path, setPath] = useState<
    {
      lat: number;
      lng: number;
    }[]
  >([]);
const [sections, setSections] = useState<
  {
    id: number;
    farmName: string;
    centerX: number;
    centerY: number;
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

const getSection =
  usePostGetSectionOfLicenseRequestByIdByIssuingResponsible();


const getLisenceDetails = useGetPlanSectionMap();
const setMutation = useRegisterPlanSectionMap();


useEffect(() => {
  const loadSec = async () => {
    const secDetail = await getSection.mutateAsync(+section_id);
    const coordinates = secDetail.data.result.coordinates;
    let cord: { lat: number; lng: number }[] = [];
    for (let i = 0; i < coordinates.length; i++) {
      cord.push({ lat: coordinates[i].x, lng: coordinates[i].y });
    }
    setPath(cord);
  };
  loadSec();
}, [sections]);


  const [mapref, setMapRef] = useState<any>(null);

  const handleOnLoad = (map: any) => {
    setMapRef(map);


      getCenter();
      setIsLoaded(true);
  };

  const [center, setCenter] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });

  useEffect(() => {
    if (path.length > 0) {
      getCenter();
    }
  }, [path]);

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


  const [zoom, setZoom] = useState<number>(0);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  useEffect(() => {
    //@ts-ignore
    if (path.length > 0 && isLoaded) {
      getZoomLevel(path);
    }
    //@ts-ignore
  }, [path, isLoaded]);

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

  useEffect(() => {
    getLisenceDetails.mutate(+section_id, {
      onSuccess: (val: any) => {
        const result = val.data.result;
        if (
          result.latCenterMap &&
          result.latCenterMap !== 0 &&
          result.lngCenterMap &&
          result.lngCenterMap !== 0
        ) {
          setCenter({
            lat: result.latCenterMap,
            lng: result.lngCenterMap,
          });
        }
        if (result.zoomMap && result.zoomMap !== 0) {
          setZoom(result.zoomMap);
        }
      },
    });
  },[])
  
  const onSubmit = () => {
    const setObject = {
      sectionId: +section_id,
      latCenterMap: mapref.getCenter().lat(),
      lngCenterMap: mapref.getCenter().lng(),
      zoomMap: mapref.getZoom(),
    };
    setMutation.mutate(setObject, {
      onSuccess: (val: any) => {
        showToast(["با موفقیت ثبت شد."], ToastTypes.success);
      },
    });
  };
  
  return (
    <Card>
      <CardHeader>
        <CardTitle>ثبت پلان موقعیت قطعات درخواست پروانه</CardTitle>
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
                center={center}
                zoom={zoom}
                onLoad={handleOnLoad}
              >
                <Polygon path={path} />

                {path &&
                  path.map((row: { lat: number; lng: number }, key) => {
                    return (
                      <InfoBox
                        position={{ lat: row.lat, lng: row.lng }}
                        options={{}}
                      >
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
                  })}
              </GoogleMap>
            )}
          </LoadScriptNext>
        </FormGroup>
        <Row style={{ marginTop: "25px" }}>
          <Col>
            <SimpleSubmitButton
              isLoading={setMutation.isLoading}
              btnText="ثبت پلان موقعیت قطعه"
              onCLick={onSubmit}
            />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );


};

export { InspectionMatchingLocationPlanContainer };
