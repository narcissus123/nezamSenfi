import classnames from "classnames";
import React, { useEffect, useState } from "react";
import { Switch, useHistory, useLocation, useParams } from "react-router-dom";
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
import { useGetMianLocationGuildRoomRequestDetails } from "../../../../../../core/services/api";
import { IsIncludes, IsSameUrl } from "../../../../../../core/utils";
import { isSameString } from "../../../../../../core/utils/same-string.utils";
import BreadCrumbs from "../../../../../common/@vuexy/breadCrumbs/BreadCrumb";
import { SimpleProtectedRoute } from "../../../../../common/RouteComponents/SimpleProtectedRoute/SimpleProtectedRoute";
import { BankInfo } from "../BankInfo/BankInfo";
import { HistoryDetails } from "../HistoryDetails/HistoryDetails";
import { LocationInfo } from "../LocationInfo/LocationInfo";
import { MembersInfo } from "../MembersInfo/MembersInfo";
import { RegisteryDocs } from "../RegisteryDocs/RegisteryDocs";
import { SubsetOfJobs } from "../SubsetOfJobs/SubsetOfJobs";


export interface IPropTypes {
  type: string;
  noChangeAllServiceState: any;
  AllServiceState: any;
  getDetailsMutation: any
  historyMutation: any
  
}

const TabContainer: React.FC<IPropTypes> = ({
  type,
  AllServiceState,
  noChangeAllServiceState,
  getDetailsMutation,
  historyMutation
}) => {
  const [toggle, setToggle] = useState<string>("1");
  const [requestData, setRequestData] = useState<any>(null);
  const history = useHistory();
  const location = useLocation();

  const GetDetailsMutation = getDetailsMutation();

  const { id } = useParams<any>();

  useEffect(() => {
      GetDetailsMutation.mutate(id);
  }, []);

  useEffect(() => {
    if (GetDetailsMutation && GetDetailsMutation.isSuccess) {
      const result = GetDetailsMutation.data?.data.result;
      setRequestData(result);
    }
  }, [GetDetailsMutation.isSuccess]);

 // console.log("--set request data --", requestData);

  return (
    <>
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
                      }sDetails/${type}/${id}/RegisteryDocs`
                    ),
                  })}
                  onClick={() => {
                    history.push(
                      `/${
                        isSameString(type, "union") ? "Union" : "Guild"
                      }sDetails/${type}/${id}/RegisteryDocs/`
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
                      }sDetails/${type}/${id}/BankInfo/`
                    ),
                  })}
                  onClick={() => {
                    history.push(
                      `/${
                        isSameString(type, "union") ? "Union" : "Guild"
                      }sDetails/${type}/${id}/BankInfo/`
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
                      }sDetails/${type}/${id}/UserDetails/`
                    ),
                  })}
                  onClick={() => {
                    history.push(
                      `/${
                        isSameString(type, "union") ? "Union" : "Guild"
                      }sDetails/${type}/${id}/UserDetails/`
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
                      }sDetails/${type}/${id}/LocationInfo/`
                    ),
                  })}
                  onClick={() => {
                    history.push(
                      `/${
                        isSameString(type, "union") ? "Union" : "Guild"
                      }sDetails/${type}/${id}/LocationInfo/`
                    );
                  }}
                >
                  مشخصات مکانی
                </NavLink>
              </NavItem>
              <NavItem>
                <NavLink
                  className={classnames({
                    active: IsSameUrl(
                      location.pathname,
                      `/${
                        isSameString(type, "union") ? "Union" : "Guild"
                      }sDetails/${type}/${id}/History/`
                    ),
                  })}
                  onClick={() => {
                    history.push(
                      `/${
                        isSameString(type, "union") ? "Union" : "Guild"
                      }sDetails/${type}/${id}/History/`
                    );
                  }}
                >
                  تاریخچه
                </NavLink>
              </NavItem>
              {(type === "Union" || type === "union") && (
                <NavItem>
                  <NavLink
                    className={classnames({
                      active: IsSameUrl(
                        location.pathname,
                        `/UnionsDetails/Union/${id}/SubsetOfJobs/`
                      ),
                    })}
                    onClick={() => {
                      history.push(`/UnionsDetails/Union/${id}/SubsetOfJobs/`);
                    }}
                  >
                    مشاغل زیرمجموعه
                  </NavLink>
                </NavItem>
              )}
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
                      refetch={GetDetailsMutation}
                    />
                  )}
                  path={`/${
                    isSameString(type, "union") ? "Union" : "Guild"
                  }sDetails/${type}/:id/RegisteryDocs/`}
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
                      type={type}
                      refetch={GetDetailsMutation}
                    />
                  )}
                  path={`/${
                    isSameString(type, "union") ? "Union" : "Guild"
                  }sDetails/${type}/:id/LocationInfo/`}
                  // flow="CountyJobRequestFlow"
                  exact
                />
                <SimpleProtectedRoute
                  component={(props: any) => (
                    <MembersInfo
                      requestDetail={requestData}
                      AllServiceState={AllServiceState}
                      noChangeAllServiceState={noChangeAllServiceState}
                      type={type}
                      refetch={GetDetailsMutation}
                    />
                  )}
                  path={`/${
                    isSameString(type, "union") ? "Union" : "Guild"
                  }sDetails/${type}/:id/UserDetails/`}
                  exact
                />

                <SimpleProtectedRoute
                  component={(props: any) => (
                    <HistoryDetails
                      requestData={requestData}
                      type={type}
                      historyMutation={historyMutation}
                    />
                  )}
                  path={`/${
                    isSameString(type, "union") ? "Union" : "Guild"
                  }sDetails/${type}/:id/History/`}
                  exact
                />

                <SimpleProtectedRoute
                  component={() => (
                    <SubsetOfJobs
                      requestDetail={requestData}
                      refetch={GetDetailsMutation}
                    />
                  )}
                  path={`/UnionsDetails/${type}/:id/SubsetOfJobs/`}
                  // flow="CountyJobRequestFlow"
                  // status={1}
                  exact
                />

                <SimpleProtectedRoute
                  path={`/${
                    isSameString(type, "union") ? "Union" : "Guild"
                  }sDetails/${type}/:id/BankInfo/`}
                  component={() => (
                    <BankInfo requestDetail={requestData} type={type} />
                  )}
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
