import classNames from "classnames";
import React, { FC, useEffect, useState } from "react";
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
import { UserType } from "../../../../../../../core/enums";
import {
  useGetDraftOfMatching,
  useGetLicenseRequestDetailByIssuingResponsibleWithRefetch,
} from "../../../../../../../core/services/api";
import { useGlobalState } from "../../../../../../../core/utils/context/GlobalContext";
import { useStatusPermission } from "../../../../../../../core/utils/context/StatusProvider";
import { isSameString } from "../../../../../../../core/utils/same-string.utils";
import { SimpleProtectedRoute } from "../../../../../../common/RouteComponents/SimpleProtectedRoute/SimpleProtectedRoute";
import { FallBackSpinner } from "../../../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { DraftDetails } from "./DraftDetails/DraftDetails";
import { ExpertDetails } from "./ExpertDetails/ExpertDetails";
import { RequesterDetails } from "./RequesterDetails/RequesterDetails";
import { SetSectionsDetails } from "./SetSectionsDetails/SetSectionsDetails";

const MatchingContainer: FC = () => {
  const [toggle, setToggle] = useState<string>("1");
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [requesterUserRealInfo, setRequesterUserRealInfo] = useState<any>(null); // edit type
  const [requesterUserLegalInfo, setRequesterUserLegalInfo] =
    useState<any>(null); // edit type
  const [licenseRequestDetails, setLicenseRequestDetails] = useState<any>(null); // edit type
  const [primaryInformation, setPrimaryInformation] = useState<any>(null); // edit type
  const [sections, setSections] = useState<any>(null); // edit type

  const history = useHistory();
  const location = useLocation();

  const { status, setStatus } = useStatusPermission();
  const { req_id } = useGlobalState();

  const { data, isSuccess, isFetching, refetch } =
    useGetLicenseRequestDetailByIssuingResponsibleWithRefetch(+req_id[0]);

  useEffect(() => {
    if (req_id[0] !== "0") {
      refetch();
    }
  }, [req_id[0]]);

  useEffect(() => {
    return () => {
      setStatus(1);
      req_id[1]("0");
    };
  }, []);

  useEffect(() => {
    if (isSuccess) {
      setLicenseRequestDetails(data?.data.result.licenseRequestDetails);
      setPrimaryInformation(data?.data.result.primaryInformation);
      if (data?.data.result.userType === UserType.Real) {
        setRequesterUserRealInfo(data?.data.result.requesterUserRealInfo);
      } else
        setRequesterUserLegalInfo(data?.data.result.requesterUserLegalInfo);
      setSections(data?.data.result.sections);
      setIsLoaded(true);
    }
  }, [isSuccess, data]);

  return (
    <>
      <Card>
        <CardHeader></CardHeader>

        <>
          <CardBody>
            <TabContent>
              <Nav tabs className="nav-justified">
                <NavItem>
                  <NavLink
                    className={classNames({
                      active: isSameString(
                        location.pathname,
                        `/ManageLicense/IssuingResponsible/Matching/${status}/RequesterDetails/${req_id[0]}`
                      ),
                    })}
                    onClick={() => {
                      history.push(
                        `/ManageLicense/IssuingResponsible/Matching/${status}/RequesterDetails/${req_id[0]}`
                      );
                    }}
                  >
                    اطلاعات درخواست کننده
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink
                    className={classNames({
                      active: isSameString(
                        location.pathname,
                        `/ManageLicense/IssuingResponsible/Matching/${status}/ExpertDetails/${req_id[0]}`
                      ),
                    })}
                    onClick={() => {
                      history.push(
                        `/ManageLicense/IssuingResponsible/Matching/${status}/ExpertDetails/${req_id[0]}`
                      );
                    }}
                  >
                    اطلاعات کارشناس فنی
                  </NavLink>
                </NavItem>
                {/* <NavItem>
                  <NavLink
                    disabled={
                      licenseRequestDetails &&
                      (licenseRequestDetails.rejectExpertStatus !== 3 ||
                        licenseRequestDetails.rejectUserApplicantStatus !== 3)
                    }
                    className={classNames({
                      active: isSameString(
                        location.pathname,
                        `/ManageLicense/IssuingResponsible/Matching/${status}/SetSectionsDetails/${req_id[0]}`
                      ),
                    })}
                    onClick={() => {
                      history.push(
                        `/ManageLicense/IssuingResponsible/Matching/${status}/SetSectionsDetails/${req_id[0]}`
                      );
                    }}
                  >
                    ثبت اطلاعات قطعات
                  </NavLink>
                </NavItem> */}
                <NavItem>
                  <NavLink
                    disabled={
                      isFetching ||
                      (licenseRequestDetails &&
                        (licenseRequestDetails.rejectExpertStatus !== 3 ||
                          licenseRequestDetails.rejectUserApplicantStatus !==
                            3))
                    }
                    className={classNames({
                      active: isSameString(
                        location.pathname,
                        `/ManageLicense/IssuingResponsible/Matching/${status}/Draft/${req_id[0]}`
                      ),
                    })}
                    onClick={() => {
                      history.push(
                        `/ManageLicense/IssuingResponsible/Matching/${status}/Draft/${req_id[0]}`
                      );
                    }}
                  >
                    پیش نویس و ثبت نهایی
                  </NavLink>
                </NavItem>
              </Nav>
            </TabContent>

            <TabContent className="py-50" activeTab={toggle}>
              {/* Routes */}

              <Switch>
                <SimpleProtectedRoute
                  path={`/ManageLicense/IssuingResponsible/Matching/:status/RequesterDetails/:req_id`}
                  component={() => {
                    return (requesterUserLegalInfo || requesterUserRealInfo) &&
                      licenseRequestDetails ? (
                      <RequesterDetails
                        requesterUserRealInfo={requesterUserRealInfo}
                        requesterUserLegalInfo={requesterUserLegalInfo}
                        requestInfo={licenseRequestDetails}
                        refetch={refetch}
                      />
                    ) : isFetching ? (
                      <FallBackSpinner setHeight={200} />
                    ) : (
                      <Alert color="info">
                        مشکلی در دریافت اطلاعات رخ داده است
                      </Alert>
                    );
                  }}
                  status={1}
                  flow="IssuingResponsibleMatchingFlow"
                />
                <SimpleProtectedRoute
                  path={`/ManageLicense/IssuingResponsible/Matching/:status/ExpertDetails/:req_id`}
                  component={() => {
                    return sections &&
                      primaryInformation &&
                      licenseRequestDetails ? (
                      <ExpertDetails
                        sections={sections}
                        primaryInformation={primaryInformation}
                        licenseRequestDetails={licenseRequestDetails}
                        refetch={refetch}
                      />
                    ) : isFetching ? (
                      <FallBackSpinner setHeight={200} />
                    ) : (
                      <Alert color="info">
                        مشکلی در دریافت اطلاعات رخ داده است
                      </Alert>
                    );
                  }}
                  status={1}
                  flow="IssuingResponsibleMatchingFlow"
                />

                <SimpleProtectedRoute
                  path={`/ManageLicense/IssuingResponsible/Matching/:status/Draft/:req_id`}
                  component={() => {
                    return (
                      <DraftDetails
                        sections={sections}
                        licenseRequestDetails={licenseRequestDetails}
                        refetch={refetch}
                      />
                    );
                  }}
                  status={1}
                  flow="IssuingResponsibleMatchingFlow"
                />
                {/* <SimpleProtectedRoute
                  path={`/ManageLicense/IssuingResponsible/Matching/:status/SetSectionsDetails/:req_id`}
                  component={() => {
                    return (
                      <SetSectionsDetails
                        sections={sections}
                        licenseRequestDetails={licenseRequestDetails}
                        refetch={refetch}
                      />
                    );
                  }}
                  status={1}
                  flow="IssuingResponsibleMatchingFlow"
                /> */}
              </Switch>
            </TabContent>
          </CardBody>
        </>
      </Card>
    </>
  );
};

export { MatchingContainer };
