import React, { useEffect, useState } from "react";

import { Button, Nav, NavItem, NavLink, TabContent } from "reactstrap";
import { DocumentsTable } from "./DocumentsTable";
import { UploadDocuments } from "./UploadDocuments";

import Styled from "./PersonalDocuments.module.scss";
import { SubmitButton } from "../../../common/Form";
import { UserDocuments } from "./UserDocuments/UserDocuments";
import { Switch, useHistory, useLocation } from "react-router-dom";
import { SimpleProtectedRoute } from "../../../common/RouteComponents/SimpleProtectedRoute/SimpleProtectedRoute";
import classnames from "classnames";
import { IsSameUrl } from "../../../../core/utils";
import { UserRoles } from "../../../../core/enums";
import { useUserAuth } from "../../../../core/utils/context/AuthenticationContext";
import { CancellationDocuments } from "./CancellationDocuments/CancellationDocuments";

export interface PersonalDocumentsProps {}

const PersonalDocuments: React.FC<PersonalDocumentsProps> = () => {

  const [toggle, setToggle] = useState<string>("1");

  const history = useHistory();
  const location = useLocation();

  const [userType, setUserType] = useState<string>("");
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
      <TabContent>
        <Nav tabs className="nav-justified">
          <NavItem>
            <NavLink
              className={classnames({
                active: IsSameUrl(
                  location.pathname,
                  `/PersonalInfo/PersonalDocuments`
                ),
              })}
              onClick={() => {
                history.push(`/PersonalInfo/PersonalDocuments`);
              }}
            >
              بارگذاری اسناد
            </NavLink>
          </NavItem>
          <NavItem>
            <NavLink
              className={classnames({
                active: IsSameUrl(
                  location.pathname,
                  `/PersonalInfo/CancellationDocuments`
                ),
              })}
              onClick={() => {
                history.push(`/PersonalInfo/CancellationDocuments`);
              }}
            >
              بارگذاری اسناد ابطال
            </NavLink>
          </NavItem>
        </Nav>
      </TabContent>

      <TabContent className="py-50" activeTab={toggle}>
        <Switch>
          <SimpleProtectedRoute
            component={UserDocuments}
            path="/PersonalInfo/PersonalDocuments"
            exact
          />

          <SimpleProtectedRoute
            component={CancellationDocuments}
            path="/PersonalInfo/CancellationDocuments"
            exact
          />
        </Switch>
      </TabContent>
    </>
  );
};

export { PersonalDocuments };
