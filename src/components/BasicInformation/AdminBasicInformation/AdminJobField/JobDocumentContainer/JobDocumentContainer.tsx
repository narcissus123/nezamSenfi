import classNames from "classnames";
import React, { FC, useState } from "react";
import { Switch, useHistory, useLocation } from "react-router";
import { Card, CardBody, Nav, NavItem, NavLink, TabContent } from "reactstrap";
import { isSameString } from "../../../../../core/utils/same-string.utils";
import BreadCrumbs from "../../../../common/@vuexy/breadCrumbs/BreadCrumb";
import { SimpleProtectedRoute } from "../../../../common/RouteComponents/SimpleProtectedRoute/SimpleProtectedRoute";
import { Cancellation } from "./Cancellation";
import { Issued } from "./Issued";

const JobDocumentContainer: FC = (): React.ReactElement => {
  const [toggle, setToggle] = useState<string>("1");

  const history = useHistory();
  const location = useLocation();

  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="اطلاعات اولیه"
        breadCrumbParent="خانه"
        parentLink={`/`}
        breadCrumbActive="مدیریت اسناد مشاغل"
      />

      <Card>
        <CardBody>
          <TabContent>
            <Nav tabs className="nav-justified">
              <NavItem>
                <NavLink
                  className={classNames({
                    active: isSameString(
                      location.pathname,
                      `/BasicInformation/FieldJob/Document/Issued`
                    ),
                  })}
                  onClick={() => {
                    history.push(`/BasicInformation/FieldJob/Document/Issued`);
                  }}
                >
                  اسناد صدور
                </NavLink>
              </NavItem>
{/* 
              <NavItem>
                <NavLink
                  className={classNames({
                    active: isSameString(
                      location.pathname,
                      `/BasicInformation/FieldJob/Document/Cancellation`
                    ),
                  })}
                  onClick={() => {
                    history.push(
                      `/BasicInformation/FieldJob/Document/Cancellation`
                    );
                  }}
                >
                  اسناد ابطال
                </NavLink>
              </NavItem> */}
            </Nav>
          </TabContent>

          <TabContent className="py-50" activeTab={toggle}>
            {/* Routes */}

            <Switch>
              <SimpleProtectedRoute
                path={`/BasicInformation/FieldJob/Document/Issued`}
                component={() => <Issued />}
                exact
              />

              {/* <SimpleProtectedRoute
                path={`/BasicInformation/FieldJob/Document/Cancellation`}
                component={() => <Cancellation />}
                exact
              /> */}
            </Switch>
          </TabContent>
        </CardBody>
      </Card>
    </>
  );
};

export { JobDocumentContainer };
