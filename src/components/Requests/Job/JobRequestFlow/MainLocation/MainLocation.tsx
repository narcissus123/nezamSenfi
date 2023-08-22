import classnames from "classnames";
import React, { useState } from "react";
import { Switch, useHistory, useLocation, useParams } from "react-router-dom";
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
import { useGlobalState } from "../../../../../core/utils/context/GlobalContext";
import { useStatusPermission } from "../../../../../core/utils/context/StatusProvider";
import { IsSameUrl } from "../../../../../core/utils/url.utils";
import { SimpleProtectedRoute } from "../../../../common/RouteComponents/SimpleProtectedRoute/SimpleProtectedRoute";
import { Details } from "./Details/Details";
import { EditCV } from "../UploadDocuments/EditCV/EditCV";
import { UploadDocuments } from "../UploadDocuments/UploadDocuments";
import { MainLocationUploadInquiryFiles } from "./MainLocationUploadInquiryFiles/MainLocationUploadInquiryFiles";
import BreadCrumbs from "../../../../common/@vuexy/breadCrumbs/BreadCrumb";

export interface JobRequestProps {}

const MainLocation: React.FC<JobRequestProps> = () => {
  const [toggle, setToggle] = useState<string>("1");
  const history = useHistory();
  const location = useLocation();

  const id = useParams();

  const { status } = useStatusPermission();
  const { req_id } = useGlobalState();

  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="درخواست های شغلی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbParent2="لیست درخواست ها"
        parentLink2="/Requests/MainLocationJobRequest/List"
        breadCrumbActive="جزییات درخواست"
      />
      <Card>
        <CardHeader>
          <CardTitle></CardTitle>
        </CardHeader>
        <CardBody>
          <TabContent>
            <Nav tabs className="nav-justified">
              <NavItem>
                <NavLink
                  className={classnames({
                    active: IsSameUrl(
                      location.pathname,
                      `/Requests/job/MainLocation/${status}/Details/${req_id[0]}`
                    ),
                  })}
                  onClick={() => {
                    history.push(
                      `/Requests/job/MainLocation/${status}/Details/${req_id[0]}`
                    );
                  }}
                >
                  اطلاعات
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  disabled={status < 1}
                  className={classnames({
                    active: IsSameUrl(
                      location.pathname,
                      `/Requests/job/MainLocation/${status}/UploadDocuments/${req_id[0]}`
                    ),
                  })}
                  onClick={() => {
                    history.push(
                      `/Requests/job/MainLocation/${status}/UploadDocuments/${req_id[0]}`
                    );
                  }}
                >
                  {status > 1 ? "رزومه" : "بارگزاری رزومه"}
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  disabled={status < 12}
                  className={classnames({
                    active: IsSameUrl(
                      location.pathname,
                      `/Requests/job/MainLocation/${status}/UploadInquiry/${req_id[0]}`
                    ),
                  })}
                  onClick={() => {
                    history.push(
                      `/Requests/job/MainLocation/${status}/UploadInquiry/${req_id[0]}`
                    );
                  }}
                >
                  {status <= 12 ? "بارگزاری پاسخ استعلامات" : "استعلامات"}
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent className="py-50" activeTab={toggle}>
              <Switch>
                <SimpleProtectedRoute
                  component={Details}
                  path="/Requests/job/MainLocation/:status/Details/:req_id"
                  flow="MainLocationJobRequestFlow"
                  status={0}
                  exact
                />
                <SimpleProtectedRoute
                  component={EditCV}
                  path="/Requests/job/MainLocation/:status/UploadDocuments/:req_id/cv/:cv_id"
                  flow="MainLocationJobRequestFlow"
                  status={1}
                  exact
                />
                <SimpleProtectedRoute
                  component={UploadDocuments}
                  path="/Requests/job/MainLocation/:status/UploadDocuments/:req_id"
                  flow="MainLocationJobRequestFlow"
                  status={1}
                  exact
                />
                <SimpleProtectedRoute
                  component={MainLocationUploadInquiryFiles}
                  path="/Requests/job/MainLocation/:status/UploadInquiry/:req_id"
                  flow="MainLocationJobRequestFlow"
                  status={12}
                  exact
                />
              </Switch>
            </TabContent>
          </TabContent>
        </CardBody>
      </Card>
      {/* <Switch>
        <SimpleProtectedRoute
          component={JobRequestList}
          path="/Requests/job/MainLocation/:status/UploadDocuments/:req_id"
          flow="MainLocationJobRequestFlow"
          status={1}
          exact
        />
      </Switch> */}
    </>
  );
};

export { MainLocation };
