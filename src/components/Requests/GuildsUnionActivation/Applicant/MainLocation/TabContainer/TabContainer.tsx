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
import { useGetMianLocationGuildRoomRequestDetails, useSetMainLocationGuildRoomBankInfo } from "../../../../../../core/services/api";
import { IsIncludes, IsSameUrl } from "../../../../../../core/utils";
import { isSameString } from "../../../../../../core/utils/same-string.utils";
import BreadCrumbs from "../../../../../common/@vuexy/breadCrumbs/BreadCrumb";
import { SimpleProtectedRoute } from "../../../../../common/RouteComponents/SimpleProtectedRoute/SimpleProtectedRoute";
import { BankInfo } from "../../../Shared/MainLocation/BankInfo/BankInfo";
import { LocationInfo } from "../../../Shared/MainLocation/LocationInfo/LocationInfo";
import { MembersInfo } from "../../../Shared/MainLocation/MembersInfo/MembersInfo";
import { RegisteryDocs } from "../../../Shared/MainLocation/RegisteryDocs/RegisteryDocs";


export interface IPropTypes {
  type: string;
  locationMutation?: any;
  membersMutation?: any;
  rolesMutation?: any;
  noChangeAllServiceState: any;
  AllServiceState: any;
}

const TabContainer: React.FC<IPropTypes> = ({
  type,
  locationMutation,
  membersMutation,
  rolesMutation,
  AllServiceState,
  noChangeAllServiceState,
}) => {
  const [toggle, setToggle] = useState<string>("1");
  const [requestData, setRequestData] = useState<any>(null);
  const history = useHistory();
  const location = useLocation();

  const getMainLocationDetails = useGetMianLocationGuildRoomRequestDetails();


  useEffect(() => {
   
      getMainLocationDetails.mutate();
  }, []);

  useEffect(() => {
    if (getMainLocationDetails && getMainLocationDetails.isSuccess) {
      const result = getMainLocationDetails.data?.data.result;
      setRequestData(result);
    }
  }, [getMainLocationDetails.isSuccess]);

 // console.log("--set request data --", requestData);

  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="صنف کشوری"
        breadCrumbParent="پیشخوان"
        parentLink={`/`}
        breadCrumbActive={"مدیریت صنف کشوری"}
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
                    active: IsIncludes(
                      location.pathname,
                      `/${
                        isSameString(type, "union") ? "Union" : "Guild"
                      }sDetails/${type}/RegisteryDocs`
                    ),
                  })}
                  onClick={() => {
                    history.push(
                      `/${
                        isSameString(type, "union") ? "Union" : "Guild"
                      }sDetails/${type}/RegisteryDocs/`
                    );
                  }}
                >
                  اسناد ثبتی
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: IsIncludes(
                      location.pathname,
                      `/${
                        isSameString(type, "union") ? "Union" : "Guild"
                      }sDetails/${type}/BankInfo`
                    ),
                  })}
                  onClick={() => {
                    history.push(
                      `/${
                        isSameString(type, "union") ? "Union" : "Guild"
                      }sDetails/${type}/BankInfo/`
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
                      }sDetails/${type}/UserDetails/`
                    ),
                  })}
                  onClick={() => {
                    history.push(
                      `/${
                        isSameString(type, "union") ? "Union" : "Guild"
                      }sDetails/${type}/UserDetails/`
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
                      }sDetails/${type}/LocationInfo/`
                    ),
                  })}
                  onClick={() => {
                    history.push(
                      `/${
                        isSameString(type, "union") ? "Union" : "Guild"
                      }sDetails/${type}/LocationInfo/`
                    );
                  }}
                >
                  مشخصات مکانی
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
                      refetch={getMainLocationDetails}
                    />
                  )}
                  path={`/${
                    isSameString(type, "union") ? "Union" : "Guild"
                  }sDetails/${type}/RegisteryDocs/`}
                  // flow="CountyJobRequestFlow"
                  flow={`noflow`}
                  permissions={[]}
                  status={0}
                  exact
                />
                <SimpleProtectedRoute
                  component={(props: any) => (
                    <LocationInfo
                      requestDetail={requestData}
                      locationInfoMutation={locationMutation}
                      type={type}
                      refetch={getMainLocationDetails}
                    />
                  )}
                  path={`/${
                    isSameString(type, "union") ? "Union" : "Guild"
                  }sDetails/${type}/LocationInfo/`}
                  // flow="CountyJobRequestFlow"
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
                      refetch={getMainLocationDetails}
                    />
                  )}
                  path={`/${
                    isSameString(type, "union") ? "Union" : "Guild"
                  }sDetails/${type}/UserDetails/`}
                  exact
                />

                <SimpleProtectedRoute
                  component={(props: any) => (
                    <BankInfo
                      requestDetail={requestData}
                      bankInfoMutation={useSetMainLocationGuildRoomBankInfo}
                      type={type}
                      refetch={getMainLocationDetails}
                    />
                  )}
                  path={`/${
                    isSameString(type, "union") ? "Union" : "Guild"
                  }sDetails/${type}/BankInfo/`}
                  exact
                />
              </Switch>
            </TabContent>
          </TabContent>

          {/* <StatusWrapper
              guildStatus={[
                GuildsActivation.AddedLocation,
                GuildsActivation.RjectedBySecretariat,
              ]}
              curStatus={[+status]}
            >
              <SendFinalyRequest type={type} />
            </StatusWrapper> */}
        </CardBody>
      </Card>
    </>
  );
};

export { TabContainer };
