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
import { LicenseRequestTabs } from "../../../../../../../core/enums/license-request-tabs.enums";
import {
  useGetActivityOfLicenseRequestByJahadCenterManager,
  useGetActivityOfLicenseRequestSectionByJahadCenterManager,
  useGetAgriculturalMechanizationServiceOfLicenseRequestByJahadCenterManager,
  useGetAgriculturalMechanizationServiceOfLicenseRequestSectionByJahadCenterManager,
  useGetAllFacilityBuildings,
  useGetBoundariesOfLicenseRequestSectionByJahadCenterManager,
  useGetBuildingOfLicenseReuestSectionByJahadCenterManager,
  useGetBusinessServiceOfLicenseRequestByJahadCenterManager,
  useGetBusinessServiceOfLicenseRequestSectionByJahadCenterManager,
  useGetConsomptionTabsByJahadCenterManager,
  useGetConsultingServicesOfLicenseRequestByJahadCenterManager,
  useGetConsultingServicesOfLicenseRequestSectionByJahadCenterManager,
  useGetConversionIndustriesServiceOfLicenseRequestByJahadCenterManager,
  useGetConversionIndustriesServiceOfLicenseRequestSectionByJahadCenterManager,
  useGetLicenseRequestDetailByJahadCenterManager,
  useGetLicenseRequestExpertIdeaByJahadCenterManager,
  useGetLicenseRequestRequiredTabsByJahadCenterManager,
  useGetLicenseRequestSectionExpertIdeaByJahadCenterManager,
  useGetOwnershipOfLicenseRequestByJahadCenterManager,
  useGetSectionOfLicenseRequestByIdByJahadCenterManager,
  useGetTopographyOfLicenseReuestByJahadCenterManager,
  useGetTreesOfLicenseRequestSectionByJahadCenterManager,
} from "../../../../../../../core/services/api";
import { IsIncludes, IsSameUrl } from "../../../../../../../core/utils";
import { useGlobalState } from "../../../../../../../core/utils/context/GlobalContext";
import { useStatusPermission } from "../../../../../../../core/utils/context/StatusProvider";
import { SimpleProtectedRoute } from "../../../../../../common/RouteComponents/SimpleProtectedRoute/SimpleProtectedRoute";
import { FallBackSpinner } from "../../../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { Capacity } from "../../Inspection/Capacity/Capacity";
import { ConsumptionStatus } from "../../Inspection/ConsumptionStatus/ConsumptionStatus";
import { DistancesBoundaries } from "../../Inspection/DistancesBoundaries/DistancesBoundaries";
import { ExpertDescription } from "../../Inspection/ExpertDescription/ExpertDescription";
import { Facilities } from "../../Inspection/Facilities/Facilities";
import { GeographicalLocation } from "../../Inspection/GeographicalLocation/GeographicalLocation";
import { ServicesStatus } from "../../Inspection/ServicesStatus/ServicesStatus";
import { Topography } from "../../Inspection/Topography/Topography";
import { TreeSpecifications } from "../../Inspection/TreeSpecifications/TreeSpecifications";
import { UpdateSectionMap } from "../../Inspection/UpdateSectionMap/UpdateSectionMap";
import { ApplicantInfo } from "../../Shared/ApplicantInfo/ApplicantInfo";

const InspectionDetails: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const [tabs, setTabs] = useState<number[]>([]);
  const [treeSpecificationTableData, setTreeSpecificationTableData] =
    useState<any>([]);

  const [jobs, setJobs] = useState<any[]>([]);

  const [tabsLoaded, setTabsLoaded] = useState<boolean>(false);
  const [fixedOrMobieTypeByExpert, setFixedOrMobieTypeByExpert] =
    useState<number>(1);

  const { status, setStatus } = useStatusPermission();

  const { req_id, section_id } = useGlobalState();

  const getTabs = useGetLicenseRequestRequiredTabsByJahadCenterManager();

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
  } = useGetTreesOfLicenseRequestSectionByJahadCenterManager(
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
  } = useGetActivityOfLicenseRequestSectionByJahadCenterManager(
    parseInt(section_id[0])
  );
  const {
    data: activityMobilityData,
    isSuccess: activityMobilityIsSuccess,
    isFetching: activityMobilityIsFetching,
    refetch: refetchMobilityActivity,
  } = useGetActivityOfLicenseRequestByJahadCenterManager(parseInt(req_id[0]));

  useEffect(() => {
    if (section_id[0] !== "0" && getTabs.isSuccess) {
      refetchActivity();
    } else if (getTabs.isSuccess) {
      refetchMobilityActivity();
    }
  }, [section_id[0], getTabs.isSuccess]);

  const {
    data: buildingsData,
    isSuccess: buildingsIsSuccess,
    isFetching: buildingsIsFetching,
    refetch: refetchBuildings,
  } = useGetBuildingOfLicenseReuestSectionByJahadCenterManager(
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
  } = useGetBusinessServiceOfLicenseRequestSectionByJahadCenterManager(
    parseInt(section_id[0])
  );
  const {
    data: businessMobilityServiceData,
    isSuccess: businessMobilityServiceIsSuccess,
    isFetching: businessMobilityServiceIsFetching,
    refetch: refetchMobilityBusinessService,
  } = useGetBusinessServiceOfLicenseRequestByJahadCenterManager(
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
  } = useGetConversionIndustriesServiceOfLicenseRequestSectionByJahadCenterManager(
    parseInt(section_id[0])
  );
  const {
    data: conversionMobilityIndustriesData,
    isSuccess: conversionMobilityIndustriesIsSuccess,
    isFetching: conversionMobilityIndustriesIsFetching,
    refetch: refetchMobilityConversionIndustries,
  } = useGetConversionIndustriesServiceOfLicenseRequestByJahadCenterManager(
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
  } = useGetConsultingServicesOfLicenseRequestSectionByJahadCenterManager(
    parseInt(section_id[0])
  );
  const {
    data: consultingMobilityServicesData,
    isSuccess: consultingMobilityServicesIsSuccess,
    isFetching: consultingMobilityServicesIsFetching,
    refetch: refetchMobilityConsultingServices,
  } = useGetConsultingServicesOfLicenseRequestByJahadCenterManager(
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
  } = useGetAgriculturalMechanizationServiceOfLicenseRequestSectionByJahadCenterManager(
    parseInt(section_id[0])
  );
  const {
    data: mechanizationMobilityServicesData,
    isSuccess: mechanizationMobilityServicesIsSuccess,
    isFetching: mechanizationMobilityServicesIsFetching,
    refetch: refetchMobilityMechanizationServices,
  } = useGetAgriculturalMechanizationServiceOfLicenseRequestByJahadCenterManager(
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
            useGetLicenseRequestDetailByJahadCenterManager
          }
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
                          `/JahadCenterManager/Inspection/${status}/Land/${req_id[0]}/${section_id[0]}`
                        ),
                      })}
                      onClick={() => {
                        history.push(
                          `/JahadCenterManager/Inspection/${status}/Land/${req_id[0]}/${section_id[0]}`
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
                          `/JahadCenterManager/Inspection/${status}/GeographicalLocation/${req_id[0]}/${section_id[0]}`
                        ),
                      })}
                      onClick={() => {
                        history.push(
                          `/JahadCenterManager/Inspection/${status}/GeographicalLocation/${req_id[0]}/${section_id[0]}`
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
                          `/JahadCenterManager/Inspection/${status}/DistancesBoundaries/${req_id[0]}/${section_id[0]}`
                        ),
                      })}
                      onClick={() => {
                        history.push(
                          `/JahadCenterManager/Inspection/${status}/DistancesBoundaries/${req_id[0]}/${section_id[0]}`
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
                          `/JahadCenterManager/Inspection/${status}/Topography/${req_id[0]}/${section_id[0]}`
                        );
                      }}
                      className={classnames({
                        active: IsSameUrl(
                          location.pathname,
                          `/JahadCenterManager/Inspection/${status}/Topography/${req_id[0]}/${section_id[0]}`
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
                          `/JahadCenterManager/Inspection/${status}/Facilities/${req_id[0]}/${section_id[0]}`
                        );
                      }}
                      className={classnames({
                        active: IsIncludes(
                          location.pathname,
                          `/JahadCenterManager/Inspection/${status}/Facilities/${req_id[0]}/${section_id[0]}`
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
                          `/JahadCenterManager/Inspection/${status}/TreeSpecifications/${req_id[0]}/${section_id[0]}`
                        );
                      }}
                      className={classnames({
                        active: IsSameUrl(
                          location.pathname,
                          `/JahadCenterManager/Inspection/${status}/TreeSpecifications/${req_id[0]}/${section_id[0]}`
                        ),
                      })}
                    >
                      مشخصات درختان
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
                          `/JahadCenterManager/Inspection/${status}/ServicesStatus/${req_id[0]}/${section_id[0]}/consulting`
                        );
                      }}
                      className={classnames({
                        active:
                          IsSameUrl(
                            location.pathname,
                            `/JahadCenterManager/Inspection/${status}/ServicesStatus/${req_id[0]}/${section_id[0]}/consulting`
                          ) ||
                          IsSameUrl(
                            location.pathname,
                            `/JahadCenterManager/Inspection/${status}/ServicesStatus/${req_id[0]}/${section_id[0]}/mechanisation`
                          ) ||
                          IsSameUrl(
                            location.pathname,
                            `/JahadCenterManager/Inspection/${status}/ServicesStatus/${req_id[0]}/${section_id[0]}/alterantindustries`
                          ) ||
                          IsSameUrl(
                            location.pathname,
                            `/JahadCenterManager/Inspection/${status}/ServicesStatus/${req_id[0]}/${section_id[0]}/merchantservices`
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
                          `/JahadCenterManager/Inspection/${status}/ConsumptionStatus/${req_id[0]}/${section_id[0]}`
                        );
                      }}
                      className={classnames({
                        active: IsSameUrl(
                          location.pathname,
                          `/JahadCenterManager/Inspection/${status}/ConsumptionStatus/${req_id[0]}/${section_id[0]}`
                        ),
                      })}
                    >
                      مصرف آب و نهاده
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
                          `/JahadCenterManager/Inspection/${status}/Capacity/${
                            req_id[0]
                          }${section_id[0] !== "0" ? `/${section_id[0]}` : ""}`
                        );
                      }}
                      className={classnames({
                        active: IsSameUrl(
                          location.pathname,
                          `/JahadCenterManager/Inspection/${status}/Capacity/${
                            req_id[0]
                          }${section_id[0] !== "0" ? `/${section_id[0]}` : ""}`
                        ),
                      })}
                    >
                      مشخصات فعالیت و ظرفیت
                    </NavLink>
                  </NavItem>
                )}

                <NavItem>
                  <NavLink
                    //disabled={status < 2}
                    onClick={() => {
                      history.push(
                        `/JahadCenterManager/Inspection/${status}/Description/${
                          req_id[0]
                        }${section_id[0] !== "0" ? `/${section_id[0]}` : ""}`
                      );
                    }}
                    className={classnames({
                      active: IsSameUrl(
                        location.pathname,
                        `/JahadCenterManager/Inspection/${status}/Description/${
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
                            useGetSectionOfLicenseRequestByIdByJahadCenterManager
                          }
                          isExpert={false}
                        />
                      )
                    }
                    path="/JahadCenterManager/Inspection/:status/Land/:req_id/:section_id"
                    exact
                  />
                  <SimpleProtectedRoute
                    component={() =>
                      onLazyTabsLoad(
                        <GeographicalLocation
                          useMutation={
                            useGetOwnershipOfLicenseRequestByJahadCenterManager
                          }
                          isExpert={false}
                          useGetSectionOfLicenseRequestById={
                            useGetSectionOfLicenseRequestByIdByJahadCenterManager
                          }
                        />
                      )
                    }
                    path="/JahadCenterManager/Inspection/:status/GeographicalLocation/:req_id/:section_id"
                    exact
                  />
                  <SimpleProtectedRoute
                    component={() =>
                      onLazyTabsLoad(
                        <Topography
                          useMutation={
                            useGetTopographyOfLicenseReuestByJahadCenterManager
                          }
                          isExpert={false}
                        />
                      )
                    }
                    path="/JahadCenterManager/Inspection/:status/Topography/:req_id/:section_id"
                    exact
                  />
                  <SimpleProtectedRoute
                    component={() =>
                      onLazyTabsLoad(
                        <>
                          {activityIsFetching || activityMobilityIsFetching ? (
                            <FallBackSpinner />
                          ) : (
                            <Capacity
                              refetch={
                                fixedOrMobieTypeByExpert === 1
                                  ? refetchActivity
                                  : refetchMobilityActivity
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
                    path="/JahadCenterManager/Inspection/:status/Capacity/:req_id/:section_id?"
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
                    path="/JahadCenterManager/Inspection/:status/TreeSpecifications/:req_id/:section_id"
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
                              useGetSectionOfLicenseRequestByIdByJahadCenterManager
                            }
                          />
                        </>
                      )
                    }
                    path="/JahadCenterManager/Inspection/:status/Facilities/:req_id/:section_id"
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
                              screen="/JahadCenterManager"
                            />
                          )}
                        </>
                      )
                    }
                    path="/JahadCenterManager/Inspection/:status/ServicesStatus/:req_id/:section_id"
                  />
                  <SimpleProtectedRoute
                    component={() =>
                      onLazyTabsLoad(
                        <ConsumptionStatus
                          jobs={jobs}
                          useGetConsomptionTabs={
                            useGetConsomptionTabsByJahadCenterManager
                          }
                          isJahadManager
                        />
                      )
                    }
                    path="/JahadCenterManager/Inspection/:status/ConsumptionStatus/:req_id/:section_id"
                    exact
                  />
                  <SimpleProtectedRoute
                    component={() =>
                      onLazyTabsLoad(
                        <DistancesBoundaries
                          useMutation={
                            useGetBoundariesOfLicenseRequestSectionByJahadCenterManager
                          }
                          isExpert={false}
                          getSection={
                            useGetSectionOfLicenseRequestByIdByJahadCenterManager
                          }
                        />
                      )
                    }
                    path="/JahadCenterManager/Inspection/:status/DistancesBoundaries/:req_id/:section_id"
                    exact
                  />

                  <SimpleProtectedRoute
                    component={() =>
                      onLazyTabsLoad(
                        <ExpertDescription
                          useGetDescriptionLicenseRequest={
                            section_id[0] !== "0"
                              ? useGetLicenseRequestSectionExpertIdeaByJahadCenterManager
                              : useGetLicenseRequestExpertIdeaByJahadCenterManager
                          }
                          isExpert={false}
                        />
                      )
                    }
                    path="/IssueingManager/Inspection/:status/Description/:req_id/:section_id?"
                    exact
                  />
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
