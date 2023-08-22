import classnames from "classnames";
import React, { useEffect, useState } from "react";
import { Switch, useHistory, useLocation } from "react-router-dom";
import {
  Alert,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Nav,
  NavItem,
  NavLink,
  TabContent,
} from "reactstrap";
import { GuildsActivation } from "../../../../core/enums/guilds-activation-status.enums";
import { UnionsActivation } from "../../../../core/enums/unions-activation-status.enums";
import {
  useGetCountyGuildRoomRequestDetails,
  useGetUnionRequestDetails,
  useGetMyUnionRequestHistory,
  useGetMyCountyGuilDRooomRequestHistory,
  useGetMyProvinceGuilDRooomRequestHistory,
  useGetProvinceGuildRoomRequestDetailsForProvinceAdmin,
  useSetProvinceGuildRoomRequestDocument,
} from "../../../../core/services/api";
import { IsIncludes, IsSameUrl } from "../../../../core/utils";
import { useGlobalState } from "../../../../core/utils/context/GlobalContext";
import { useStatusPermission } from "../../../../core/utils/context/StatusProvider";
import { isSameString } from "../../../../core/utils/same-string.utils";
import BreadCrumbs from "../../../common/@vuexy/breadCrumbs/BreadCrumb";
import { SimpleProtectedRoute } from "../../../common/RouteComponents/SimpleProtectedRoute/SimpleProtectedRoute";
import { StatusWrapper } from "../../../common/Wrapper/StatusWrapper/StatusWrapper";
import { BankInfo } from "../Shared/BankInfo/BankInfo";
import { LocationInfo } from "../Shared/LocationInfo/LocationInfo";
import { MembersInfo } from "../Shared/MembersInfo/MembersInfo";
import { RegisteryDocs } from "../Shared/RegisteryDocs/RegisteryDocs";
import { RequestHistory } from "../Shared/RequestHistory/RequestHistory";
import { SubsetOfJobs } from "../Shared/SubsetOfJobs/SubsetOfJobs";
import { SendFinalyRequest } from "./SendFinalyRequest/SendFinalyRequest";

export interface IPropTypes {
  type: string;
  locationMutation?: any;
  membersMutation?: any;
  rolesMutation?: any;
  noChangeAllServiceState: any;
  AllServiceState: any;
  bankInfoMutation: any;
}

const TabContainer: React.FC<IPropTypes> = ({
  type,
  locationMutation,
  membersMutation,
  rolesMutation,
  AllServiceState,
  noChangeAllServiceState,
  bankInfoMutation
}) => {
  const [toggle, setToggle] = useState<string>("1");
  const [requestId, setRequestId] = useState<string>("1");
  const [requestData, setRequestData] = useState<any>(null);
  const history = useHistory();
  const location = useLocation();

  const { req_id } = useGlobalState();
  const { status, setStatus } = useStatusPermission();

  const getProvinceDetails = useGetProvinceGuildRoomRequestDetailsForProvinceAdmin();
  const getCountyDetails = useGetCountyGuildRoomRequestDetails();
  const getUnionDetails = useGetUnionRequestDetails();

  useEffect(() => {
    return () => {
      setStatus(1);
      req_id[1]("0");
    };
  }, []);

  useEffect(() => {
    if (req_id[0] !== "0" && isSameString(type, "county")) {
      getCountyDetails.mutate(+req_id[0]);
    } else if (req_id[0] !== "0" && isSameString(type, "province")) {
      getProvinceDetails.mutate(+req_id[0]);
    } else if (req_id[0] !== "0" && isSameString(type, "Union")) {
      getUnionDetails.mutate(+req_id[0]);
    }
  }, [req_id[0]]);

  useEffect(() => {
    if (getCountyDetails && getCountyDetails.isSuccess) {
      const result = getCountyDetails.data?.data.result;
      setRequestData(result);
    }
  }, [getCountyDetails.isSuccess]);

  useEffect(() => {
    if (getUnionDetails && getUnionDetails.isSuccess) {
      const result = getUnionDetails.data?.data.result;
      setRequestData(result);
    }
  }, [getUnionDetails.isSuccess]);

  useEffect(() => {
    if (getProvinceDetails && getProvinceDetails.isSuccess) {
      const result = getProvinceDetails.data?.data.result;
      setRequestData(result);
    }
  }, [getProvinceDetails.isSuccess]);

 // console.log("--set request data --", requestData);

  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="درخواست نظام صنفی"
        breadCrumbParent="لیست درخواست ها"
        parentLink={`/${
          isSameString(type, "union") ? "Union" : "Guild"
        }sRequests/${type}/List`}
        breadCrumbActive={
          isSameString(type, "union")
            ? `درخواست اتحادیه ${requestData ? requestData.name : ""}`
            : `درخواست نظام صنفی ${requestData ? requestData.name : ""}`
        }
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
                    active:
                      IsIncludes(
                        location.pathname,
                        `/${
                          isSameString(type, "union") ? "Union" : "Guild"
                        }sActivation/${type}/`
                      ) && IsIncludes(location.pathname, `/RegisteryDocs/`),
                  })}
                  onClick={() => {
                    history.push(
                      `/${
                        isSameString(type, "union") ? "Union" : "Guild"
                      }sActivation/${type}/${status}/RegisteryDocs/${req_id[0]}`
                    );
                  }}
                >
                  اسناد ثبتی
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  className={classnames({
                    active:
                      IsIncludes(
                        location.pathname,
                        `/${
                          isSameString(type, "union") ? "Union" : "Guild"
                        }sActivation/${type}/`
                      ) && IsIncludes(location.pathname, `/BankInfo/`),
                  })}
                  onClick={() => {
                    history.push(
                      `/${
                        isSameString(type, "union") ? "Union" : "Guild"
                      }sActivation/${type}/${status}/BankInfo/${req_id[0]}`
                    );
                  }}
                >
                  اطلاعات بانکی
                </NavLink>
              </NavItem>

              <NavItem>
                <NavLink
                  className={classnames({
                    active: IsSameUrl(
                      location.pathname,
                      `/${
                        isSameString(type, "union") ? "Union" : "Guild"
                      }sActivation/${type}/${status}/UserDetails/${req_id[0]}`
                    ),
                  })}
                  onClick={() => {
                    history.push(
                      `/${
                        isSameString(type, "union") ? "Union" : "Guild"
                      }sActivation/${type}/${status}/UserDetails/${req_id[0]}`
                    );
                  }}
                >
                  مشخصات اعضا
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: IsSameUrl(
                      location.pathname,
                      `/${
                        isSameString(type, "union") ? "Union" : "Guild"
                      }sActivation/${type}/${status}/LocationInfo/${req_id[0]}`
                    ),
                  })}
                  onClick={() => {
                    history.push(
                      `/${
                        isSameString(type, "union") ? "Union" : "Guild"
                      }sActivation/${type}/${status}/LocationInfo/${req_id[0]}`
                    );
                  }}
                >
                  مشخصات مکانی
                </NavLink>
              </NavItem>
              {(type === "Union" || type === "union") && (
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: IsSameUrl(
                        location.pathname,
                        `/UnionsActivation/Union/${status}/SubsetOfJobs/${req_id[0]}`
                      ),
                    })}
                    onClick={() => {
                      history.push(
                        `/UnionsActivation/${type}/${status}/SubsetOfJobs/${req_id[0]}`
                      );
                    }}
                  >
                    مشاغل زیرمجموعه
                  </NavLink>
                </NavItem>
              )}

              <NavItem>
                <NavLink
                  className={classnames({
                    active: IsSameUrl(
                      location.pathname,
                      `/${
                        isSameString(type, "union") ? "Union" : "Guild"
                      }sActivation/${type}/${status}/RequestHistory/${
                        req_id[0]
                      }`
                    ),
                  })}
                  onClick={() => {
                    history.push(
                      `/${
                        isSameString(type, "union") ? "Union" : "Guild"
                      }sActivation/${type}/${status}/RequestHistory/${
                        req_id[0]
                      }`
                    );
                  }}
                >
                  تاریخچه درخواست
                </NavLink>
              </NavItem>
            </Nav>

            <TabContent className="py-50" activeTab={toggle}>
              {requestData && requestData.statusTitle && (
                <Alert color="info">{requestData.statusTitle}</Alert>
              )}
              {requestData && requestData.description && (
                <Alert color="info">{`توضیحات: ${requestData.description}`}</Alert>
              )}
              <Switch>
                <SimpleProtectedRoute
                  component={() => (
                    <RegisteryDocs
                      requestDetail={requestData}
                      type={type}
                      refetch={
                        isSameString(type, "Province")
                          ? getProvinceDetails
                          : isSameString(type, "County")
                          ? getCountyDetails
                          : isSameString(type, "union")
                          ? getUnionDetails
                          : null
                      }
                    />
                  )}
                  path={`/${
                    isSameString(type, "union") ? "Union" : "Guild"
                  }sActivation/${type}/:status/RegisteryDocs/:req_id`}
                  // flow="CountyJobRequestFlow"
                  flow={`${type}ApplicantFlow`}
                  status={0}
                  exact
                />
                <SimpleProtectedRoute
                  component={() => (
                    <SubsetOfJobs
                      requestDetail={requestData}
                      refetch={getUnionDetails}
                    />
                  )}
                  path={`/UnionsActivation/${type}/:status/SubsetOfJobs/:req_id`}
                  // flow="CountyJobRequestFlow"
                  // status={1}
                  exact
                />
                <SimpleProtectedRoute
                  component={(props: any) => (
                    <LocationInfo
                      requestDetail={requestData}
                      locationInfoMutation={locationMutation}
                      setRequestId={setRequestId}
                      type={type}
                      refetch={
                        isSameString(type, "Province")
                          ? getProvinceDetails
                          : isSameString(type, "County")
                          ? getCountyDetails
                          : isSameString(type, "union")
                          ? getUnionDetails
                          : null
                      }
                    />
                  )}
                  path={`/${
                    isSameString(type, "union") ? "Union" : "Guild"
                  }sActivation/${type}/:status/LocationInfo/:req_id`}
                  // flow="CountyJobRequestFlow"
                  flow={`${type}ApplicantFlow`}
                  status={2}
                  exact
                />
                <SimpleProtectedRoute
                  component={(props: any) => (
                    <MembersInfo
                      requestDetail={requestData}
                      AllServiceState={AllServiceState}
                      noChangeAllServiceState={noChangeAllServiceState}
                      rolesMutation={rolesMutation}
                      membersMutation={membersMutation}
                      type={type}
                      refetch={
                        isSameString(type, "Province")
                          ? getProvinceDetails
                          : isSameString(type, "County")
                          ? getCountyDetails
                          : isSameString(type, "union")
                          ? getUnionDetails
                          : null
                      }
                    />
                  )}
                  path={`/${
                    isSameString(type, "union") ? "Union" : "Guild"
                  }sActivation/${type}/:status/UserDetails/:req_id`}
                  status={1}
                  flow={`${type}ApplicantFlow`}
                  exact
                />

                <SimpleProtectedRoute
                  path={`/${
                    isSameString(type, "union") ? "Union" : "Guild"
                  }sActivation/${type}/:status/RequestHistory/:req_id`}
                  component={() => (
                    <RequestHistory
                      getHistoriesMutation={
                        isSameString(type, "union")
                          ? useGetMyUnionRequestHistory
                          : isSameString(type, "county")
                          ? useGetMyCountyGuilDRooomRequestHistory
                          : useGetMyProvinceGuilDRooomRequestHistory
                      }
                    />
                  )}
                  exact
                />

                <SimpleProtectedRoute
                  path={`/${
                    isSameString(type, "union") ? "Union" : "Guild"
                  }sActivation/${type}/:status/BankInfo/:req_id`}
                  component={() => (
                    <BankInfo
                      requestDetail={requestData}
                      bankInfoMutation={bankInfoMutation}
                      setRequestId={setRequestId}
                      type={type}
                      refetch={
                        isSameString(type, "Province")
                          ? getProvinceDetails
                          : isSameString(type, "County")
                          ? getCountyDetails
                          : isSameString(type, "union")
                          ? getUnionDetails
                          : null
                      }
                    />
                  )}
                  exact
                />
              </Switch>
            </TabContent>
          </TabContent>

          {isSameString(type, "union") ? (
            <StatusWrapper
              guildStatus={[
                UnionsActivation.AddedSubcategoryJobs,
                UnionsActivation.RjectedBySecretariat,
              ]}
              curStatus={[+status]}
            >
              <SendFinalyRequest type={type} />
            </StatusWrapper>
          ) : (
            <StatusWrapper
              guildStatus={[
                GuildsActivation.AddedLocation,
                GuildsActivation.RjectedBySecretariat,
              ]}
              curStatus={[+status]}
            >
              <SendFinalyRequest type={type} />
            </StatusWrapper>
          )}
        </CardBody>
      </Card>
    </>
  );
};

export { TabContainer };
