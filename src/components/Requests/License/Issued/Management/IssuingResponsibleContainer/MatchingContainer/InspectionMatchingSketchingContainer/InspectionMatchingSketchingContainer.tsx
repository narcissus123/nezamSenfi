import { GoogleMap, LoadScriptNext } from "@react-google-maps/api";
import React, { FC, useEffect, useState } from "react";
import {
  Card, CardBody, CardHeader, CardTitle, Col, FormGroup, Row,
} from "reactstrap";
import { useGetLicenseRequestDetailByIssuingResponsible, useGetRoutingMap, usePostGetSectionOfLicenseRequestByIdByIssuingResponsible, useRegisterRoutingMap } from "../../../../../../../../core/services/api";
import { FallBackSpinner } from "../../../../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import $ from 'jquery'
import { useParams } from "react-router-dom";
import { SimpleSubmitButton } from "../../../../../../../common/Form";
import { MarkerInfoView } from "./MarkerInfoView/MarkerInfoView";
import { showToast } from "../../../../../../../../core/utils";
import { ToastTypes } from "../../../../../../../../core/enums";

const InspectionMatchingSketchingContainer: FC = () => {

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

  const { req_id } = useParams<any>();

  const [path, setPath] = useState<
  {
    id: number;
    cord: { lat: number; lng: number }[];
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

const getLisenceDetails = useGetRoutingMap();

useEffect(() => {
  getLisenceDetails.mutate(+req_id, {
    onSuccess: (val: any) => {
      const result = val.data.result;
      setRoutingMapData({
        latCenterMap: result.latCenterMap,
        licenseRequestId: result.licenseRequestId,
        lngCenterMap: result.lngCenterMap,
        zoomMap: result.zoomMap,
      });
    }
  })
},[])

const getSection =
  usePostGetSectionOfLicenseRequestByIdByIssuingResponsible();

const getDetails = useGetLicenseRequestDetailByIssuingResponsible(+req_id);

const setMutation = useRegisterRoutingMap();

useEffect(() => {
  if (getDetails.isSuccess) {
    const result = getDetails.data.data.result;
    console.log(result);
    try {
      setSections([
        ...result.sections.map((row: any) => ({
          id: row.id,
          farmName: row.farmName,
          centerX: row.centerX,
          centerY: row.centerY,
          area: row.area,
          perimeter: row.perimeter,
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
}, [getDetails.isSuccess]);

// useEffect(() => {
//   const loadSec = async () => {
//     if (sections.length > 0) {
//       for (let index = 0; index < sections.length; index++) {
//         if (sections[index].id !== -2) {
//           const secDetail = await getSection.mutateAsync(sections[index].id);
//           const coordinates = secDetail.data.result.coordinates;
//           const newCord: {
//             id: number;
//             cord: { lat: number; lng: number }[];
//           } = { id: sections[index].id, cord: [] };
//           for (let i = 0; i < coordinates.length; i++) {
//             const cord = coordinates[i];

//             newCord.cord.push({
//               lat: cord.y,
//               lng: cord.x,
//             });
//           }
//           setPath((old) => [...old, newCord]);
//         }
//       }
//     }
//   };
//   loadSec();
// }, [sections]);

  const onSubmit = () => {

    const setObject = {
      licenseRequestId: +req_id,
      latCenterMap: mapref.getCenter().lat(),
      lngCenterMap: mapref.getCenter().lng(),
      zoomMap: mapref.getZoom(),
    };
    setMutation.mutate(setObject , {
      onSuccess: (val: any) => {
        showToast(["با موفقیت ثبت شد."], ToastTypes.success);
      }
    })
  }

  const [mapref, setMapRef] = useState<any>(null);

  const handleOnLoad = (map: any) => {
    setMapRef(map);
  };

  const handleCenterChanged = () => {
    if (mapref) {
      const newCenter = mapref.getCenter();
      console.log(newCenter);
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>ثبت کروکی درخواست پروانه</CardTitle>
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
            {getSection.isLoading || getLisenceDetails.isLoading ? (
              <FallBackSpinner />
            ) : (
              <GoogleMap
                mapTypeId="hybrid"
                mapContainerClassName="App-map"
                center={{
                  lat:
                    routingMapData.latCenterMap &&
                    routingMapData.latCenterMap !== 0
                      ? routingMapData.latCenterMap
                      : sections[0]
                      ? sections[0].centerX
                      : 0,
                  lng:
                    routingMapData.lngCenterMap &&
                    routingMapData.lngCenterMap !== 0
                      ? routingMapData.lngCenterMap
                      : sections[0]
                      ? sections[0].centerY
                      : 0,
                }}
                zoom={
                  routingMapData.zoomMap && routingMapData.zoomMap !== 0
                    ? routingMapData.zoomMap
                    : 14
                }
                onLoad={handleOnLoad}
                onCenterChanged={handleCenterChanged}
              >
                {/* {path.map((item, key) => (
                  <Polygon key={key} path={item.cord} />
                ))} */}

                {sections.map((item, key) => (
                  <MarkerInfoView key={key} item={item} />
                ))}
              </GoogleMap>
            )}
          </LoadScriptNext>
        </FormGroup>
        <Row style={{ marginTop: "25px" }}>
          <Col>
            <SimpleSubmitButton 
              isLoading={setMutation.isLoading}
              btnText="ثبت کروکی"
              onCLick={onSubmit}
            />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );


};

export { InspectionMatchingSketchingContainer };
