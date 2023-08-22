import React, { useState } from "react";
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
import { useHistory, useLocation, Switch, Route } from "react-router-dom";
import { MachineryInfo } from "./MachineryInfo";
import { ServicesInfo } from "./ServicesInfo";
import { IsSameUrl } from "./../../core/utils";
import BreadCrumbs from "../common/@vuexy/breadCrumbs/BreadCrumb";

export interface PersonalInfoContainerProps {}

const BeneficiariContainer: React.FC<PersonalInfoContainerProps> = () => {
  const [toggle, setToggle] = useState<string>("1");
  const history = useHistory();
  const location = useLocation();

  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="اطلاعات فردی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive={
          IsSameUrl(location.pathname, "/Beneficiari/Machinery")
            ? "اطلاعات ماشین"
            : "اطلاعات ادوات و خدمات"
        }
      />
      <Card>
        <CardHeader>
          {IsSameUrl(location.pathname, "Beneficiari/Machinery") && (
            <CardTitle>اطلاعات ماشین </CardTitle>
          )}
          {IsSameUrl(location.pathname, "Beneficiari/ServicesInfo") && (
            <CardTitle>اطلاعات ادوات و خدمات </CardTitle>
          )}
        </CardHeader>

        <CardBody>
          <TabContent>
            <Nav tabs className="nav-justified">
              <NavItem>
                <NavLink
                  className={classnames({
                    active: location.pathname === "/Beneficiari/Machinery",
                  })}
                  onClick={() => {
                    history.push("/Beneficiari/Machinery");
                  }}
                >
                  اطلاعات ماشین آلات
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: location.pathname === "/Beneficiari/ServicesInfo",
                  })}
                  onClick={() => {
                    history.push("/Beneficiari/ServicesInfo");
                  }}
                >
                  ادوات و خدمات
                </NavLink>
              </NavItem>
            </Nav>
            <TabContent className="py-50" activeTab={toggle}>
              <Switch>
                <Route
                  exact
                  path="/Beneficiari/Machinery"
                  component={MachineryInfo}
                />
                <Route
                  exact
                  path="/Beneficiari/ServicesInfo"
                  component={ServicesInfo}
                />
              </Switch>
            </TabContent>
          </TabContent>
        </CardBody>
      </Card>
    </>
  );
};

export { BeneficiariContainer };
