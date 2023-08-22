import classnames from "classnames";
import React, { useState } from "react";
import { Switch, useHistory, useLocation, useParams } from "react-router-dom";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Nav,
  NavItem,
  NavLink,
  TabContent,
} from "reactstrap";
import { useGlobalState } from "../../../../../core/utils/context/GlobalContext";
import { useStatusPermission } from "../../../../../core/utils/context/StatusProvider";
import { IsSameUrl } from "../../../../../core/utils/url.utils";
import BreadCrumbs from "../../../../common/@vuexy/breadCrumbs/BreadCrumb";
import { SimpleProtectedRoute } from "../../../../common/RouteComponents/SimpleProtectedRoute/SimpleProtectedRoute";
import { EditCV } from "../UploadDocuments/EditCV/EditCV";
import { UploadDocuments } from "../UploadDocuments/UploadDocuments";
import { Details } from "./Details/Details";
import { UnionUploadInquiryFiles } from "./UnionUploadInquiryFiles/UnionUploadInquiryFiles";

export interface JobRequestProps {}

const Union: React.FC<JobRequestProps> = () => {
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
        parentLink2="/Requests/UnionJobRequest/List"
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
                      `/Requests/job/union/${status}/Details/${req_id[0]}`
                    ),
                  })}
                  onClick={() => {
                    history.push(
                      `/Requests/job/union/${status}/Details/${req_id[0]}`
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
                      `/Requests/job/union/${status}/UploadDocuments/${req_id[0]}`
                    ),
                  })}
                  onClick={() => {
                    history.push(
                      `/Requests/job/union/${status}/UploadDocuments/${req_id[0]}`
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
                      `/Requests/job/union/${status}/UploadInquiry/${req_id[0]}`
                    ),
                  })}
                  onClick={() => {
                    history.push(
                      `/Requests/job/union/${status}/UploadInquiry/${req_id[0]}`
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
                  path="/Requests/job/union/:status/Details/:req_id"
                  flow="UnionJobRequestFlow"
                  status={0}
                  exact
                />
                <SimpleProtectedRoute
                  component={EditCV}
                  path="/Requests/job/union/:status/UploadDocuments/:req_id/cv/:cv_id"
                  flow="UnionJobRequestFlow"
                  status={1}
                  exact
                />
                <SimpleProtectedRoute
                  component={UploadDocuments}
                  path="/Requests/job/union/:status/UploadDocuments/:req_id"
                  flow="UnionJobRequestFlow"
                  status={1}
                  exact
                />
                <SimpleProtectedRoute
                  component={UnionUploadInquiryFiles}
                  path="/Requests/job/union/:status/UploadInquiry/:req_id"
                  flow="UnionJobRequestFlow"
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
          path="/Requests/job/union/:status/UploadDocuments/:req_id"
          flow="UnionJobRequestFlow"
          status={1}
          exact
        />
      </Switch> */}
    </>
  );
};

export { Union };
