import classnames from "classnames";
import React, { useEffect, useState } from "react";
import { Switch, useHistory, useLocation } from "react-router-dom";
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
import { LicenseRequestTabs } from "../../../../../../../../core/enums/license-request-tabs.enums";
import {
  useGetActivityOfLicenseRequestByIssuingResponsible,
  useGetActivityOfLicenseRequestSectionByIssuingResponsible,
  useGetAgriculturalMechanizationServiceOfLicenseRequestByIssuingResponsible,
  useGetAgriculturalMechanizationServiceOfLicenseRequestSectionByIssuingResponsible,
  useGetAllFacilityBuildings,
  useGetBoundariesOfLicenseRequestSectionByIssuingResponsible,
  useGetBuildingOfLicenseReuestSectionByIssuingResponsible,
  useGetBusinessServiceOfLicenseRequestByIssuingResponsible,
  useGetBusinessServiceOfLicenseRequestSectionByIssuingResponsible,
  useGetConsomptionTabsByIssuingResponsible,
  useGetConsultingServicesOfLicenseRequestByIssuingResponsible,
  useGetConsultingServicesOfLicenseRequestSectionByIssuingResponsible,
  useGetConversionIndustriesServiceOfLicenseRequestByIssuingResponsible,
  useGetConversionIndustriesServiceOfLicenseRequestSectionByIssuingResponsible,
  useGetLicenseRequestDetailByIssuingResponsible,
  useGetLicenseRequestRequiredTabsByIssuingResponsible,
  useGetOwnershipOfLicenseRequestByIssuingResponsible,
  useGetSectionOfLicenseRequestById,
  useGetSectionOfLicenseRequestByIdByIssuingResponsible,
  useGetTopographyOfLicenseReuestByIssuingResponsible,
  useGetTreesOfLicenseRequestSectionByIssuingResponsible,
} from "../../../../../../../../core/services/api";
import { IsIncludes, IsSameUrl } from "../../../../../../../../core/utils";
import { useGlobalState } from "../../../../../../../../core/utils/context/GlobalContext";
import { useStatusPermission } from "../../../../../../../../core/utils/context/StatusProvider";
import { SimpleProtectedRoute } from "../../../../../../../common/RouteComponents/SimpleProtectedRoute/SimpleProtectedRoute";
import { FallBackSpinner } from "../../../../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { Capacity } from "../../../Inspection/Capacity/Capacity";
import { ConsumptionStatus } from "../../../Inspection/ConsumptionStatus/ConsumptionStatus";
import { DistancesBoundaries } from "../../../Inspection/DistancesBoundaries/DistancesBoundaries";
import { Facilities } from "../../../Inspection/Facilities/Facilities";
import { GeographicalLocation } from "../../../Inspection/GeographicalLocation/GeographicalLocation";
import { ServicesStatus } from "../../../Inspection/ServicesStatus/ServicesStatus";
import { Topography } from "../../../Inspection/Topography/Topography";
import { TreeSpecifications } from "../../../Inspection/TreeSpecifications/TreeSpecifications";
import { UpdateSectionMap } from "../../../Inspection/UpdateSectionMap/UpdateSectionMap";
import { ApplicantInfo } from "../../../Shared/ApplicantInfo/ApplicantInfo";

const InspectionDetails: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const [tabs, setTabs] = useState<number[]>([]);
  const [treeSpecificationTableData, setTreeSpecificationTableData] =
    useState<any>([]);

  const [tabsLoaded, setTabsLoaded] = useState<boolean>(false);
  const [fixedOrMobieTypeByExpert, setFixedOrMobieTypeByExpert] =
    useState<number>(1);

  const { status, setStatus } = useStatusPermission();
  const [jobs, setJobs] = useState<any[]>([]);

  const { req_id, section_id } = useGlobalState();

  const getTabs = useGetLicenseRequestRequiredTabsByIssuingResponsible();

  useEffect(() => {
    return () => {
      setStatus(1);
      req_id[1]("0");
      section_id[1]("0");
    };
  }, []);

  useEffect(() => {
    if (req_id[0] !== "0" && !tabsLoaded) {
      getTabs.mutate(+req_id[0], {
        onSuccess: (val) => {
          setTabsLoaded(true);
          setTabs(val.data.result.tabs);
        },
      });
    }
  }, [req_id]);

  const {
    data: treeData,
    isFetching: treeIsFetching,
    isSuccess: treeIsSuccess,
    refetch,
  } = useGetTreesOfLicenseRequestSectionByIssuingResponsible(
    parseInt(section_id[0])
  );

  useEffect(() => {
    if (section_id[0] !== "0" && getTabs.isSuccess) {
      refetch();
    }
  }, [section_id[0], getTabs.isSuccess]);

  const {
    data: buildingTypeData,
    isSuccess: buildingTypeIsSuccess,
    isFetching: buildingTypeIsFetching,
    refetch: refetchFacilityBuildings,
  } = useGetAllFacilityBuildings();

  useEffect(() => {
    if (section_id[0] !== "0" && getTabs.isSuccess) {
      refetchFacilityBuildings();
    }
  }, [section_id[0], getTabs.isSuccess]);

  const {
    data: activityData,
    isSuccess: activityIsSuccess,
    isFetching: activityIsFetching,
    refetch: refetchActivity,
  } = useGetActivityOfLicenseRequestSectionByIssuingResponsible(
    parseInt(section_id[0])
  );
  const {
    data: activityMobilityData,
    isSuccess: activityMobilitIsSuccess,
    isFetching: activityMobilitIsFetching,
    refetch: refetchMobilitActivity,
  } = useGetActivityOfLicenseRequestByIssuingResponsible(parseInt(req_id[0]));

  useEffect(() => {
    if (section_id[0] !== "0" && getTabs.isSuccess) {
      refetchActivity();
    } else if (getTabs.isSuccess) {
      refetchMobilitActivity();
    }
  }, [section_id[0], getTabs.isSuccess]);

  const {
    data: buildingsData,
    isSuccess: buildingsIsSuccess,
    isFetching: buildingsIsFetching,
    refetch: refetchBuildings,
  } = useGetBuildingOfLicenseReuestSectionByIssuingResponsible(
    parseInt(section_id[0])
  );

  useEffect(() => {
    if (section_id[0] !== "0" && getTabs.isSuccess) {
      refetchBuildings();
    }
  }, [section_id[0], getTabs.isSuccess]);

  const {
    data: businessServiceData,
    isSuccess: businessServiceIsSuccess,
    isFetching: businessServiceIsFetching,
    refetch: refetchBusinessService,
  } = useGetBusinessServiceOfLicenseRequestSectionByIssuingResponsible(
    parseInt(section_id[0])
  );

  const {
    data: businessMobilityServiceData,
    isSuccess: businessMobilityServiceIsSuccess,
    isFetching: businessMobilityServiceIsFetching,
    refetch: refetchMobilityBusinessService,
  } = useGetBusinessServiceOfLicenseRequestByIssuingResponsible(
    parseInt(req_id[0])
  );

  useEffect(() => {
    if (section_id[0] !== "0" && getTabs.isSuccess) {
      refetchBusinessService();
    } else if (getTabs.isSuccess) {
      refetchMobilityBusinessService();
    }
  }, [section_id[0], getTabs.isSuccess]);

  const {
    data: conversionIndustriesData,
    isSuccess: conversionIndustriesIsSuccess,
    isFetching: conversionIndustriesIsFetching,
    refetch: refetchConversionIndustries,
  } = useGetConversionIndustriesServiceOfLicenseRequestSectionByIssuingResponsible(
    parseInt(section_id[0])
  );
  const {
    data: conversionMobilityIndustriesData,
    isSuccess: conversionMobilityIndustriesIsSuccess,
    isFetching: conversionMobilityIndustriesIsFetching,
    refetch: refetchMobilityConversionIndustries,
  } = useGetConversionIndustriesServiceOfLicenseRequestByIssuingResponsible(
    parseInt(req_id[0])
  );

  useEffect(() => {
    if (section_id[0] !== "0" && getTabs.isSuccess) {
      refetchConversionIndustries();
    } else if (getTabs.isSuccess) {
      refetchMobilityConversionIndustries();
    }
  }, [section_id[0], getTabs.isSuccess]);

  const {
    data: consultingServicesData,
    isSuccess: consultingServicesIsSuccess,
    isFetching: consultingServicesIsFetching,
    refetch: refetchConsultingServices,
  } = useGetConsultingServicesOfLicenseRequestSectionByIssuingResponsible(
    parseInt(section_id[0])
  );

  const {
    data: consultingMobilityServicesData,
    isSuccess: consultingMobilityServicesIsSuccess,
    isFetching: consultingMobilityServicesIsFetching,
    refetch: refetchMobilityConsultingServices,
  } = useGetConsultingServicesOfLicenseRequestByIssuingResponsible(
    parseInt(req_id[0])
  );

  useEffect(() => {
    if (section_id[0] !== "0" && getTabs.isSuccess) {
      refetchConsultingServices();
    } else if (getTabs.isSuccess) {
      refetchMobilityConsultingServices();
    }
  }, [section_id[0], getTabs.isSuccess]);

  const {
    data: mechanizationServicesData,
    isSuccess: mechanizationServicesIsSuccess,
    isFetching: mechanizationServicesIsFetching,
    refetch: refetchMechanizationServices,
  } = useGetAgriculturalMechanizationServiceOfLicenseRequestSectionByIssuingResponsible(
    parseInt(section_id[0])
  );
  const {
    data: mechanizationMobilityServicesData,
    isSuccess: mechanizationMobilityServicesIsSuccess,
    isFetching: mechanizationMobilityServicesIsFetching,
    refetch: refetchMobilityMechanizationServices,
  } = useGetAgriculturalMechanizationServiceOfLicenseRequestByIssuingResponsible(
    parseInt(req_id[0])
  );

  useEffect(() => {
    if (section_id[0] !== "0" && getTabs.isSuccess) {
      refetchMechanizationServices();
    } else if (getTabs.isSuccess) {
      refetchMobilityMechanizationServices();
    }
  }, [section_id[0], getTabs.isSuccess]);

  const onLazyTabsLoad = (Component: any) => {
    if (tabsLoaded) {
      return Component;
    }
    return <FallBackSpinner />;
  };

  return (
    <>
      {req_id[0] !== "0" && (
        <ApplicantInfo
          req_id={req_id[0]}
          useGetLicenseRequestDetail={
            useGetLicenseRequestDetailByIssuingResponsible
          }
          setFixedOrMobieTypeByExpert={setFixedOrMobieTypeByExpert}
          setJobs={setJobs}
        />
      )}
      <Card>
        <CardHeader>
          <CardTitle></CardTitle>
        </CardHeader>
        {getTabs.isLoading ? (
          <FallBackSpinner />
        ) : (
          <CardBody>
            <TabContent>
              <Nav tabs className="nav-justified">
                {tabs.some((tab: number) => tab === LicenseRequestTabs.Map) && (
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: IsSameUrl(
                          location.pathname,
                          `/IssueingManager/Inspection/${status}/Land/${req_id[0]}/${section_id[0]}`
                        ),
                      })}
                      onClick={() => {
                        history.push(
                          `/IssueingManager/Inspection/${status}/Land/${req_id[0]}/${section_id[0]}`
                        );
                      }}
                    >
                      نقشه
                    </NavLink>
                  </NavItem>
                )}
                {tabs.some(
                  (tab: number) => tab === LicenseRequestTabs.Ownership
                ) && (
                  <NavItem>
                    <NavLink
                      className={classnames({
                        active: IsSameUrl(
                          location.pathname,
                          `/IssueingManager/Inspection/${status}/GeographicalLocation/${req_id[0]}/${section_id[0]}`
                        ),
                      })}
                      onClick={() => {
                        history.push(
                          `/IssueingManager/Inspection/${status}/GeographicalLocation/${req_id[0]}/${section_id[0]}`
                        );
                      }}
                    >
                      موقعیت جغرافیایی
                    </NavLink>
                  </NavItem>
                )}

                {tabs.some(
                  (tab: number) => tab === LicenseRequestTabs.Distances
                ) && (
                  <NavItem>
                    <NavLink
                      // disabled={true}
                      className={classnames({
                        active: IsSameUrl(
                          location.pathname,
                          `/IssueingManager/Inspection/${status}/DistancesBoundaries/${req_id[0]}/${section_id[0]}`
                        ),
                      })}
                      onClick={() => {
                        history.push(
                          `/IssueingManager/Inspection/${status}/DistancesBoundaries/${req_id[0]}/${section_id[0]}`
                        );
                      }}
                    >
                      وضعیت فواصل و حرایم
                    </NavLink>
                  </NavItem>
                )}
                {tabs.some(
                  (tab: number) => tab === LicenseRequestTabs.Topography
                ) && (
                  <NavItem>
                    <NavLink
                      //disabled={status < 2}
                      onClick={() => {
                        history.push(
                          `/IssueingManager/Inspection/${status}/Topography/${req_id[0]}/${section_id[0]}`
                        );
                      }}
                      className={classnames({
                        active: IsSameUrl(
                          location.pathname,
                          `/IssueingManager/Inspection/${status}/Topography/${req_id[0]}/${section_id[0]}`
                        ),
                      })}
                    >
                      وضعیت توپوگرافی
                    </NavLink>
                  </NavItem>
                )}
                {tabs.some(
                  (tab: number) => tab === LicenseRequestTabs.Building
                ) && (
                  <NavItem>
                    <NavLink
                      onClick={() => {
                        history.push(
                          `/IssueingManager/Inspection/${status}/Facilities/${req_id[0]}/${section_id[0]}`
                        );
                      }}
                      className={classnames({
                        active: IsIncludes(
                          location.pathname,
                          `/IssueingManager/Inspection/${status}/Facilities/${req_id[0]}/${section_id[0]}`
                        ),
                      })}
                    >
                      ساختمان و تاسیسات
                    </NavLink>
                  </NavItem>
                )}
                {tabs.some(
                  (tab: number) => tab === LicenseRequestTabs.Trees
                ) && (
                  <NavItem>
                    <NavLink
                      //disabled={status < 2}
                      onClick={() => {
                        history.push(
                          `/IssueingManager/Inspection/${status}/TreeSpecifications/${req_id[0]}/${section_id[0]}`
                        );
                      }}
                      className={classnames({
                        active: IsSameUrl(
                          location.pathname,
                          `/IssueingManager/Inspection/${status}/TreeSpecifications/${req_id[0]}/${section_id[0]}`
                        ),
                      })}
                    >
                      مشخصات درختان
                    </NavLink>
                  </NavItem>
                )}
                {tabs.some(
                  (tab: number) => tab === LicenseRequestTabs.Activity
                ) && (
                  <NavItem>
                    <NavLink
                      //disabled={status < 2}
                      onClick={() => {
                        history.push(
                          `/IssueingManager/Inspection/${status}/Capacity/${
                            req_id[0]
                          }${section_id[0] !== "0" ? `/${section_id[0]}` : ""}`
                        );
                      }}
                      className={classnames({
                        active: IsSameUrl(
                          location.pathname,
                          `/IssueingManager/Inspection/${status}/Capacity/${
                            req_id[0]
                          }${section_id[0] !== "0" ? `/${section_id[0]}` : ""}`
                        ),
                      })}
                    >
                      مشخصات فعالیت و ظرفیت
                    </NavLink>
                  </NavItem>
                )}
                {tabs.some(
                  (tab: number) => tab === LicenseRequestTabs.ProductionServices
                ) && (
                  <NavItem>
                    <NavLink
                      //disabled={status < 2}
                      onClick={() => {
                        history.push(
                          `/IssueingManager/Inspection/${status}/ServicesStatus/${req_id[0]}/${section_id[0]}/consulting`
                        );
                      }}
                      className={classnames({
                        active:
                          IsSameUrl(
                            location.pathname,
                            `/IssueingManager/Inspection/${status}/ServicesStatus/${req_id[0]}/${section_id[0]}/consulting`
                          ) ||
                          IsSameUrl(
                            location.pathname,
                            `/IssueingManager/Inspection/${status}/ServicesStatus/${req_id[0]}/${section_id[0]}/mechanisation`
                          ) ||
                          IsSameUrl(
                            location.pathname,
                            `/IssueingManager/Inspection/${status}/ServicesStatus/${req_id[0]}/${section_id[0]}/alterantindustries`
                          ) ||
                          IsSameUrl(
                            location.pathname,
                            `/IssueingManager/Inspection/${status}/ServicesStatus/${req_id[0]}/${section_id[0]}/merchantservices`
                          ),
                      })}
                    >
                      ارائه خدمات و تولید
                    </NavLink>
                  </NavItem>
                )}

                {tabs.some(
                  (tab: number) => tab === LicenseRequestTabs.Water
                ) && (
                  <NavItem>
                    <NavLink
                      //disabled={status < 2}
                      onClick={() => {
                        history.push(
                          `/IssueingManager/Inspection/${status}/ConsumptionStatus/${req_id[0]}/${section_id[0]}`
                        );
                      }}
                      className={classnames({
                        active: IsSameUrl(
                          location.pathname,
                          `/IssueingManager/Inspection/${status}/ConsumptionStatus/${req_id[0]}/${section_id[0]}`
                        ),
                      })}
                    >
                      مصرف آب و نهاده
                    </NavLink>
                  </NavItem>
                )}

                <NavItem>
                  <NavLink
                    //disabled={status < 2}
                    onClick={() => {
                      history.push(
                        `/IssueingManager/Inspection/${status}/Description/${
                          req_id[0]
                        }${section_id[0] !== "0" ? `/${section_id[0]}` : ""}`
                      );
                    }}
                    className={classnames({
                      active: IsSameUrl(
                        location.pathname,
                        `/IssueingManager/Inspection/${status}/Description/${
                          req_id[0]
                        }${section_id[0] !== "0" ? `/${section_id[0]}` : ""}`
                      ),
                    })}
                  >
                    توضیحات کارشناس
                  </NavLink>
                </NavItem>
              </Nav>

              <TabContent className="py-50">
                <Switch>
                  <SimpleProtectedRoute
                    component={() =>
                      onLazyTabsLoad(
                        <UpdateSectionMap
                          useMutation={
                            useGetSectionOfLicenseRequestByIdByIssuingResponsible
                          }
                          isExpert={false}
                        />
                      )
                    }
                    path="/IssueingManager/Inspection/:status/Land/:req_id/:section_id"
                    exact
                  />
                  <SimpleProtectedRoute
                    component={() =>
                      onLazyTabsLoad(
                        <GeographicalLocation
                          useGetSectionOfLicenseRequestById={
                            useGetSectionOfLicenseRequestById
                          }
                          useMutation={
                            useGetOwnershipOfLicenseRequestByIssuingResponsible
                          }
                          isExpert={false}
                        />
                      )
                    }
                    path="/IssueingManager/Inspection/:status/GeographicalLocation/:req_id/:section_id"
                    exact
                  />
                  <SimpleProtectedRoute
                    component={() =>
                      onLazyTabsLoad(
                        <Topography
                          useMutation={
                            useGetTopographyOfLicenseReuestByIssuingResponsible
                          }
                          isExpert={false}
                        />
                      )
                    }
                    path="/IssueingManager/Inspection/:status/Topography/:req_id/:section_id"
                    exact
                  />
                  <SimpleProtectedRoute
                    component={() =>
                      onLazyTabsLoad(
                        <>
                          {activityIsFetching || activityMobilitIsFetching ? (
                            <FallBackSpinner />
                          ) : (
                            <Capacity
                              refetch={
                                fixedOrMobieTypeByExpert === 1
                                  ? refetchActivity
                                  : refetchMobilitActivity
                              }
                              activityData={
                                activityData || activityMobilityData
                              }
                              fixedOrMobieTypeByExpert={
                                fixedOrMobieTypeByExpert
                              }
                              isExpert={false}
                            />
                          )}
                        </>
                      )
                    }
                    path="/IssueingManager/Inspection/:status/Capacity/:req_id/:section_id?"
                    exact
                  />
                  <SimpleProtectedRoute
                    component={() =>
                      onLazyTabsLoad(
                        <>
                          {treeIsFetching ? (
                            <FallBackSpinner />
                          ) : (
                            <TreeSpecifications
                              refetch={refetch}
                              treeData={treeData}
                              tableData={treeSpecificationTableData}
                              setTableData={setTreeSpecificationTableData}
                              isExpert={false}
                            />
                          )}
                        </>
                      )
                    }
                    path="/IssueingManager/Inspection/:status/TreeSpecifications/:req_id/:section_id"
                    exact
                  />
                  <SimpleProtectedRoute
                    component={() =>
                      onLazyTabsLoad(
                        <>
                          <Facilities
                            facilityDataIsFetching={buildingTypeIsFetching}
                            refetch={refetchBuildings}
                            facilityData={buildingTypeData}
                            buildingsData={buildingsData}
                            isExpert={false}
                            getSection={
                              useGetSectionOfLicenseRequestByIdByIssuingResponsible
                            }
                          />
                        </>
                      )
                    }
                    path="/IssueingManager/Inspection/:status/Facilities/:req_id/:section_id"
                    exact
                  />
                  <SimpleProtectedRoute
                    component={() =>
                      onLazyTabsLoad(
                        <>
                          {businessServiceIsFetching ||
                          conversionIndustriesIsFetching ||
                          businessMobilityServiceIsFetching ||
                          conversionMobilityIndustriesIsFetching ||
                          mechanizationMobilityServicesIsFetching ||
                          mechanizationServicesIsFetching ? (
                            <FallBackSpinner />
                          ) : (
                            <ServicesStatus
                              fixedOrMobieTypeByExpert={
                                fixedOrMobieTypeByExpert
                              }
                              businessServiceData={
                                fixedOrMobieTypeByExpert === 1
                                  ? businessServiceData
                                  : businessMobilityServiceData
                              }
                              refetchBusinessService={
                                fixedOrMobieTypeByExpert === 1
                                  ? refetchBusinessService
                                  : refetchMobilityBusinessService
                              }
                              conversionIndustriesData={
                                fixedOrMobieTypeByExpert === 1
                                  ? conversionIndustriesData
                                  : conversionMobilityIndustriesData
                              }
                              refetchConversionIndustries={
                                fixedOrMobieTypeByExpert === 1
                                  ? refetchConversionIndustries
                                  : refetchMobilityConversionIndustries
                              }
                              consultingServicesData={
                                fixedOrMobieTypeByExpert === 1
                                  ? consultingServicesData
                                  : consultingMobilityServicesData
                              }
                              refetchConsultingServices={
                                fixedOrMobieTypeByExpert === 1
                                  ? refetchConsultingServices
                                  : refetchMobilityConsultingServices
                              }
                              mechanizationServicesData={
                                fixedOrMobieTypeByExpert === 1
                                  ? mechanizationServicesData
                                  : mechanizationMobilityServicesData
                              }
                              refetchMechanizationServices={
                                fixedOrMobieTypeByExpert === 1
                                  ? refetchMechanizationServices
                                  : refetchMobilityMechanizationServices
                              }
                              isExpert={false}
                              screen="/IssueingManager"
                            />
                          )}
                        </>
                      )
                    }
                    path="/IssueingManager/Inspection/:status/ServicesStatus/:req_id/:section_id"
                  />
                  <SimpleProtectedRoute
                    component={() =>
                      onLazyTabsLoad(
                        <ConsumptionStatus
                          jobs={jobs}
                          useGetConsomptionTabs={
                            useGetConsomptionTabsByIssuingResponsible
                          }
                          isIssueingResponsible
                        />
                      )
                    }
                    path="/IssueingManager/Inspection/:status/ConsumptionStatus/:req_id/:section_id"
                    exact
                  />
                  <SimpleProtectedRoute
                    component={() =>
                      onLazyTabsLoad(
                        <DistancesBoundaries
                          useMutation={
                            useGetBoundariesOfLicenseRequestSectionByIssuingResponsible
                          }
                          isExpert={false}
                          getSection={
                            useGetSectionOfLicenseRequestByIdByIssuingResponsible
                          }
                        />
                      )
                    }
                    path="/IssueingManager/Inspection/:status/DistancesBoundaries/:req_id/:section_id"
                    exact
                  />

                  {/* <SimpleProtectedRoute
                    component={() =>
                      onLazyTabsLoad(
                        <ExpertDescription
                          useGetDescriptionLicenseRequest={
                            useGetDescriptionLicenseRequestSectionByJahadCenterManager
                          }
                        />
                      )
                    }
                    path="/IssueingManager/Inspection/:status/Description/:req_id/:section_id?"
                    exact
                  /> */}
                </Switch>
              </TabContent>
            </TabContent>
          </CardBody>
        )}
      </Card>
    </>
  );
};

export { InspectionDetails };
