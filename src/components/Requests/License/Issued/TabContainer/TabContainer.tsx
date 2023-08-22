import classNames from "classnames";
import React, { FC, useContext, useEffect, useState } from "react";
import { Switch, useHistory, useLocation } from "react-router-dom";
import {
  Alert,
  Card,
  CardBody,
  CardHeader,
  Nav,
  NavItem,
  NavLink,
  TabContent,
} from "reactstrap";
import { useGetLicenseRequestHistoryByExpert, useGetLicenseRequestHistoryByUser, useGetMyLicenseRequest, useReportRoutingMap } from "../../../../../core/services/api";
import { useGlobalState } from "../../../../../core/utils/context/GlobalContext";
import { useStatusPermission } from "../../../../../core/utils/context/StatusProvider";
import { isSameString } from "../../../../../core/utils/same-string.utils";
import BreadCrumbs from "../../../../common/@vuexy/breadCrumbs/BreadCrumb";
import { SimpleProtectedRoute } from "../../../../common/RouteComponents/SimpleProtectedRoute";
import { DetailsPage } from "../Applicant/NewLicense/DetailsPage/DetailsPage";
import { New } from "../Applicant/NewLicense/New/New";
import { Documents } from "../Applicant/Documents/Documents";
import { FinancialDoc } from "../Applicant/FinancialDoc";
import { SetExpert } from "../Applicant/SetExpert/SetExpert";
import { refetchContext } from "../../../../../core/utils/context/EventContext";
import { LicenseRequestStatusEnum } from "../../../../../core/enums/license-request-status.enums";
import { HistoryLicenseRequest } from "../Applicant/HistoryLicenseRequest/HistoryLicenseRequest";

const TabContainer: FC = () => {
  const [toggle, setToggle] = useState<string>("1");
  const [licenseDataGiven, setLicenseDataGiven] = useState<boolean>(false);
  const [licenseDetail, setLicenseDetail] = useState<any>(null);
  const [sections, setSections] = useState<any>(null);

  const history = useHistory();
  const location = useLocation();

  const getMyLicenseReq = useGetMyLicenseRequest();
  const getSections = useReportRoutingMap()

  const { status, setStatus } = useStatusPermission();
  const { req_id } = useGlobalState();

  useEffect(() => {
    return () => {
      setStatus(1);
      req_id[1]("0");
    };
  }, []);

  useEffect(() => {
    if (req_id[0] !== "0") {
      getMyLicenseReq.mutate(+req_id[0], {
        onSuccess: (val) => {
          let result = val.data.result;
          setLicenseDetail(result);
          setLicenseDataGiven(true);

          if (
            result &&
            result.licenseRequestDetails &&
            result.licenseRequestDetails.status ===
              LicenseRequestStatusEnum.GuildIdHasSet
          ) {
            getSections.mutate(+req_id[0], {
              onSuccess: (val: any) => {
                const result = val.data.result;
                if (
                  result &&
                  result.licenseInfo &&
                  result.licenseInfo.sectionInfos
                ) {
                  setSections(result.licenseInfo.sectionInfos);
                }
              },
            });
          }
        },
      });
    }
  }, [req_id]);


  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="درخواست صدور پروانه"
        breadCrumbParent="لیست پروانه ها"
        parentLink={`/`}
        breadCrumbActive="درخواست صدور"
      />

      <Card>
        <CardHeader></CardHeader>
        <CardBody>
          <TabContent>
            <Nav tabs className="nav-justified">
              <NavItem>
                <NavLink
                  className={classNames({
                    active: isSameString(
                      location.pathname,
                      `/License/Issued/${status}/Details/${req_id[0]}`
                    ),
                  })}
                  onClick={() => {
                    history.push(
                      `/License/Issued/${status}/Details/${req_id[0]}`
                    );
                  }}
                >
                  اطلاعات پروانه
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  className={classNames({
                    active: isSameString(
                      location.pathname,
                      `/License/Issued/${status}/documents/${req_id[0]}`
                    ),
                  })}
                  onClick={() => {
                    history.push(
                      `/License/Issued/${status}/documents/${req_id[0]}`
                    );
                  }}
                >
                  اسناد مورد نیاز جهت صدور پروانه
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  className={classNames({
                    active: isSameString(
                      location.pathname,
                      `/License/Issued/${status}/FinancialDoc/${req_id[0]}`
                    ),
                  })}
                  onClick={() => {
                    history.push(
                      `/License/Issued/${status}/FinancialDoc/${req_id[0]}`
                    );
                  }}
                >
                  پرداخت
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  className={classNames({
                    active: isSameString(
                      location.pathname,
                      `/License/Issued/${status}/SetExpert/${req_id[0]}`
                    ),
                  })}
                  onClick={() => {
                    history.push(
                      `/License/Issued/${status}/SetExpert/${req_id[0]}`
                    );
                  }}
                >
                  انتخاب کارشناس
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  className={classNames({
                    active: isSameString(
                      location.pathname,
                      `/License/Issued/${status}/history/${req_id[0]}`
                    ),
                  })}
                  onClick={() => {
                    history.push(
                      `/License/Issued/${status}/history/${req_id[0]}`
                    );
                  }}
                >
                  تاریخچه درخواست
                </NavLink>
              </NavItem>
            </Nav>
          </TabContent>

          <TabContent className="py-50" activeTab={toggle}>
            {/* Routes */}
            {licenseDetail && (
              <Alert color="info">
                {licenseDetail.licenseRequestDetails.statusTitle}
              </Alert>
            )}
            {licenseDetail &&
              licenseDetail.licenseRequestDetails.description && (
                <Alert color="info">
                  {licenseDetail.licenseRequestDetails.description}
                </Alert>
              )}

            {licenseDetail &&
              licenseDetail.licenseRequestDetails &&
              licenseDetail.licenseRequestDetails.status ===
                LicenseRequestStatusEnum.AcceptingAfterVisit && (
                <Alert color="info">
                  {`تاریخ انجام بازدید: ${licenseDetail.licenseRequestDetails.visitDate}`}
                </Alert>
              )}
            <Switch>
              <SimpleProtectedRoute
                path={`/License/Issued/:status/FinancialDoc/:req_id`}
                component={FinancialDoc}
                status={1}
                flow="ApplicantLicenseIssuedFlow"
              />
              <SimpleProtectedRoute
                path={`/License/Issued/:status/Details/:req_id`}
                component={() => (
                  <DetailsPage
                    sections={sections}
                    setLicenseDetail={setLicenseDetail}
                    licenseDetail={
                      licenseDetail && licenseDetail.licenseRequestDetails
                    }
                  />
                )}
              />
              <SimpleProtectedRoute
                path={`/License/Issued/:status/SetExpert/:req_id`}
                component={() => (
                  <SetExpert
                    dataGiven={licenseDataGiven}
                    licenseDetail={
                      licenseDetail && licenseDetail.licenseRequestDetails
                    }
                  />
                )}
                status={2}
                flow="ApplicantLicenseIssuedFlow"
              />

              <SimpleProtectedRoute
                path={`/License/Issued/:status/documents/:req_id`}
                component={() => (
                  <Documents
                    licenseDetail={
                      licenseDetail &&
                      licenseDetail.setLicensRequest.documentTypes
                    }
                  />
                )}
              />
              <SimpleProtectedRoute
                path={`/License/Issued/:status/history/:req_id`}
                component={() => (
                  <HistoryLicenseRequest
                    getMutation={useGetLicenseRequestHistoryByUser}
                  />
                )}
              />
            </Switch>
          </TabContent>
        </CardBody>
      </Card>
    </>
  );
};

export { TabContainer };
