import classNames from "classnames";
import React, { FC, useState } from "react";
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
import { IsIncludes } from "../../../core/utils";
import { SimpleProtectedRoute } from "../../common/RouteComponents/SimpleProtectedRoute/SimpleProtectedRoute";
import { LatLng } from "./LatLng/LatLng";
import { MapDetails } from "./MapDetails/MapDetails";
import { TrackPoint } from "./TrackPoint/TrackPoint";
import { Utm } from "./Utm/Utm";
import { WayPoint } from "./WayPoint/WayPoint";

const SetCountyPolygon: FC = () => {
  const history = useHistory();
  const location = useLocation();
  const [toggle, setToggle] = useState<string>("1");
  const [county, setCounty] = useState<number>(0);

  return (
    <>
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
                      `/Land/SetCountyPolygon/Track`
                    ),
                  })}
                  onClick={() => {
                    history.push(`/Land/SetCountyPolygon/Track`);
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
                      `/Land/SetCountyPolygon/Waypoint`
                    ),
                  })}
                  onClick={() => {
                    history.push(`/Land/SetCountyPolygon/Waypoint`);
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
                      `/Land/SetCountyPolygon/LatLng`
                    ),
                  })}
                  onClick={() => {
                    history.push(`/Land/SetCountyPolygon/LatLng`);
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
                      `/Land/SetCountyPolygon/Utm`
                    ),
                  })}
                  onClick={() => {
                    history.push(`/Land/SetCountyPolygon/Utm`);
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
                path={`/Land/SetCountyPolygon/Track`}
                component={() => <TrackPoint setCounty={setCounty} />}
              />
              <SimpleProtectedRoute
                path={`/Land/SetCountyPolygon/Waypoint`}
                component={WayPoint}
              />
              <SimpleProtectedRoute
                path={`/Land/SetCountyPolygon/Utm`}
                component={Utm}
              />
              <SimpleProtectedRoute
                path={`/Land/SetCountyPolygon/LatLng`}
                component={LatLng}
              />
            </Switch>
          </TabContent>
        </CardBody>
      </Card>

      <MapDetails county={county} />
    </>
  );
};

export { SetCountyPolygon };
