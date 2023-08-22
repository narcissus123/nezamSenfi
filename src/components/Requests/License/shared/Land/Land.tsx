import { GoogleMap, LoadScriptNext } from "@react-google-maps/api";
import classNames from "classnames";
import React, { FC, useEffect, useState } from "react";
import { Switch, useHistory, useLocation } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  Nav,
  NavItem,
  NavLink,
  TabContent,
} from "reactstrap";
import { useGetCountyPoligon, useGetLicenseRequestDetailByExpert } from "../../../../../core/services/api";
import { IsIncludes } from "../../../../../core/utils";
import { useGlobalState } from "../../../../../core/utils/context/GlobalContext";
import { SimpleProtectedRoute } from "../../../../common/RouteComponents/SimpleProtectedRoute";
import { FallBackSpinner } from "../../../../common/Spinner/FallBackSpinner";
import { ApplicantInfo } from "../../Issued/Management/Shared/ApplicantInfo";
import { LatLng } from "./LatLng";
import { TrackPoint } from "./TrackPoint";
import { Utm } from "./Utm";
import { WayPoint } from "./WayPoint";
import $ from 'jquery'

const Land: FC = () => {

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

  const history = useHistory();
  const location = useLocation();
  const [toggle, setToggle] = useState<string>("1");
  const [countyId , setCountyId] = useState<number>(0);
  const [countyPolygon, setCountyPolygon] = useState<any>([]);

  const { req_id, section_id } = useGlobalState();

  // const getPolygonMutation = useGetCountyPoligon(); 


  // useEffect(()=>{
  //   if(countyId && countyId !== 0 ) {
  //     getPolygonMutation.mutate(countyId, {
  //       onSuccess: (val: any) => {
  //         if (val.data.result) {
  //           const poly = val.data.result.coordinates;
  //           let polygon: any = [];
  //           poly.forEach((row: any) => {
  //             polygon.push({ lat: row.y, lng: row.x });
  //           });
  //           setCountyPolygon(polygon);
  //         }
  //       },
  //     });

  //   }
  // },[countyId])

  return (
    <>
      {req_id[0] !== "0" && (
        <ApplicantInfo
          req_id={req_id[0]}
          useGetLicenseRequestDetail={useGetLicenseRequestDetailByExpert}
          setCountyId={setCountyId}
        />
      )}
      <Card>
        <CardHeader></CardHeader>
        <CardBody>
          <TabContent>
            <Nav tabs className="nav-justified">
              <NavItem>
                <NavLink
                  className={classNames({
                    active: IsIncludes(
                      location.pathname,
                      `/License/Land/Track/${req_id[0]}`
                    ),
                  })}
                  onClick={() => {
                    history.push(
                      `/License/Land/Track/${req_id[0]}/${
                        +section_id[0] !== 0 ? section_id[0] : ""
                      }`
                    );
                  }}
                >
                  فایل مختصات(Track)
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  className={classNames({
                    active: IsIncludes(
                      location.pathname,
                      `/License/Land/Waypoint/${req_id[0]}`
                    ),
                  })}
                  onClick={() => {
                    history.push(
                      `/License/Land/Waypoint/${req_id[0]}/${
                        +section_id[0] !== 0 ? section_id[0] : ""
                      }`
                    );
                  }}
                >
                  فایل مختصات(Waypoint)
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  className={classNames({
                    active: IsIncludes(
                      location.pathname,
                      `/License/Land/LatLng/${req_id[0]}`
                    ),
                  })}
                  onClick={() => {
                    history.push(
                      `/License/Land/LatLng/${req_id[0]}/${
                        +section_id[0] !== 0 ? section_id[0] : ""
                      }`
                    );
                  }}
                >
                  مختصات نقاط(Lat, Lng)
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classNames({
                    active: IsIncludes(
                      location.pathname,
                      `/License/Land/Utm/${req_id[0]}`
                    ),
                  })}
                  onClick={() => {
                    history.push(
                      `/License/Land/Utm/${req_id[0]}/${
                        +section_id[0] !== 0 ? section_id[0] : ""
                      }`
                    );
                  }}
                >
                  مختصات نقاط(UTM)
                </NavLink>
              </NavItem>
            </Nav>
          </TabContent>

          <TabContent className="py-50" activeTab={toggle}>
            {/* Routes */}
            <Switch>
              <SimpleProtectedRoute
                path={`/License/Land/Track/:req_id/:section_id?`}
                component={() => <TrackPoint countyPolygon={countyPolygon} />}
              />
              <SimpleProtectedRoute
                path={`/License/Land/Waypoint/:req_id/:section_id?`}
                component={() => <WayPoint countyPolygon={countyPolygon} />}
              />
              <SimpleProtectedRoute
                path={`/License/Land/Utm/:req_id/:section_id?`}
                component={() => <Utm countyPolygon={countyPolygon} />}
              />
              <SimpleProtectedRoute
                path={`/License/Land/LatLng/:req_id/:section_id?`}
                component={() => <LatLng countyPolygon={countyPolygon} />}
              />
            </Switch>
          </TabContent>
        </CardBody>

        <div className="d-none">
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
              // onLoad={() => {
              //   setMapLoaded(true);
              // }}
            >
              {/* {polygon.length > 0 && (
                  <Polygon path={polygon} onLoad={calcArea} />
                )} */}
            </GoogleMap>
          </LoadScriptNext>
        </div>
      </Card>
    </>
  );
};

export { Land };
