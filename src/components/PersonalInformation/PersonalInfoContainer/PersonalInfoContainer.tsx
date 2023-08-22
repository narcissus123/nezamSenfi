import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  CardTitle,
  TabContent,
  Nav,
  NavItem,
  NavLink,
} from "reactstrap";
import classnames from "classnames";
import { useHistory, useLocation, Switch } from "react-router-dom";

import { IdentityInfo } from "./IdentityInfo";
import { ContactInfo } from "./ContactInfo";
import { PersonalDocuments } from "./PersonalDocuments";
import { LegalIdentityInfo } from "./LegalIdentityInfo";
import { LegalContactInfo } from "./LegalContactInfo";
import { RealJobInfo } from "./JobInfo/RealJobInfo";
import { LegalJobInfo } from "./JobInfo/LegalJobInfo";
import { useUserAuth } from "../../../core/utils/context/AuthenticationContext";
import { IsSameUrl } from "../../../core/utils";
import { UserRoles } from "../../../core/enums";
import { SimpleProtectedRoute } from "../../common/RouteComponents/SimpleProtectedRoute/SimpleProtectedRoute";
import { MachineryInfo } from "../../BeneficiariContainer/MachineryInfo/MachineryInfo";
import { ServicesInfo } from "../../BeneficiariContainer/ServicesInfo/ServicesInfo";


const PersonalInfoContainer: React.FC = () => {
  const [toggle, setToggle] = useState<string>("1");
  const [userType, setUserType] = useState<string>("");
  const history = useHistory();
  const location = useLocation();

  const { userInfo, role } = useUserAuth();

  useEffect(() => {
    if (userInfo && userInfo.userType === 2) {
      setUserType("Legal");
    } else if (userInfo && userInfo.userType === 1) {
      setUserType("");
    }
  }, [userInfo]);

  return (
    <>
      <Card>
        <CardHeader></CardHeader>
        <CardBody>
          <TabContent>
            <Nav tabs className="nav-justified">
              <NavItem>
                <NavLink
                  className={classnames({
                    active: IsSameUrl(
                      location.pathname,
                      `/PersonalInfo/${userType}IdentityInfo`
                    ),
                  })}
                  onClick={() => {
                    history.push(`/PersonalInfo/${userType}IdentityInfo`);
                  }}
                >
                  اطلاعات هویتی
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: IsSameUrl(
                      location.pathname,
                      `/PersonalInfo/${userType}ContactInfo`
                    ),
                  })}
                  onClick={() => {
                    history.push(`/PersonalInfo/${userType}ContactInfo`);
                  }}
                >
                  اطلاعات تماس
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: IsSameUrl(
                      location.pathname,
                      `/PersonalInfo/${userType}JobInfo`
                    ),
                  })}
                  onClick={() => {
                    history.push(`/PersonalInfo/${userType}JobInfo`);
                  }}
                >
                  اطلاعات شغلی
                </NavLink>
              </NavItem>
              {!role.includes(UserRoles.UserLegal) && (
                <NavItem>
                  <NavLink
                    className={classnames({
                      active:
                        IsSameUrl(
                          location.pathname,
                          "/PersonalInfo/PersonalDocuments"
                        ) ||
                        IsSameUrl(
                          location.pathname,
                          "/PersonalInfo/CancellationDocuments"
                        ),
                    })}
                    onClick={() => {
                      history.push("/PersonalInfo/PersonalDocuments");
                    }}
                  >
                    بارگذاری اسناد
                  </NavLink>
                </NavItem>
              )}

              <NavItem>
                <NavLink
                  className={classnames({
                    active: IsSameUrl(
                      location.pathname,
                      "/PersonalInfo/Machinery"
                    ),
                  })}
                  onClick={() => {
                    history.push("/PersonalInfo/Machinery");
                  }}
                >
                  اطلاعات ماشین آلات
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  className={classnames({
                    active: IsSameUrl(
                      location.pathname,
                      "/PersonalInfo/ServicesInfo"
                    ),
                  })}
                  onClick={() => {
                    history.push("/PersonalInfo/ServicesInfo");
                  }}
                >
                  ادوات و خدمات
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent className="py-50" activeTab={toggle}>
              <Switch>
                <SimpleProtectedRoute
                  component={IdentityInfo}
                  path="/PersonalInfo/IdentityInfo"
                  exact
                />
                <SimpleProtectedRoute
                  exact
                  path="/PersonalInfo/LegalIdentityInfo"
                  component={LegalIdentityInfo}
                />

                <SimpleProtectedRoute
                  component={ContactInfo}
                  path="/PersonalInfo/ContactInfo"
                  exact
                />
                <SimpleProtectedRoute
                  exact
                  path="/PersonalInfo/LegalContactInfo"
                  component={LegalContactInfo}
                />

                <SimpleProtectedRoute
                  component={RealJobInfo}
                  path="/PersonalInfo/JobInfo"
                  exact
                />

                <SimpleProtectedRoute
                  exact
                  path="/PersonalInfo/LegalJobInfo"
                  component={LegalJobInfo}
                />

                <SimpleProtectedRoute
                  path="/PersonalInfo/Machinery"
                  component={MachineryInfo}
                />

                <SimpleProtectedRoute
                  path="/PersonalInfo/ServicesInfo"
                  component={ServicesInfo}
                />

                <SimpleProtectedRoute
                  component={PersonalDocuments}
                  path="/PersonalInfo/"
                />
              </Switch>
            </TabContent>
          </TabContent>
        </CardBody>
      </Card>
    </>
  );
};

export { PersonalInfoContainer };
