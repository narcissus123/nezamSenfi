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
import { LicenseRequestStatusEnum } from "../../../../../../core/enums/license-request-status.enums";
import { LicenseRequestTabs } from "../../../../../../core/enums/license-request-tabs.enums";
import {
  useGetActivityOfLicenseRequestByExpert,
  useGetActivityOfLicenseRequestSection,
  useGetAgriculturalMechanizationServiceOfLicenseRequestByExpert,
  useGetAgriculturalMechanizationServiceOfLicenseRequestSectionByExpert,
  useGetAllFacilityBuildings,
  useGetBoundariesOfLicenseRequestSection,
  useGetBuildingOfLicenseReuestSection,
  useGetBusinessServiceOfLicenseRequestByExpert,
  useGetBusinessServiceOfLicenseRequestSection,
  useGetConsomptionTabsByExpert,
  useGetConsultingServicesOfLicenseRequestByExpert,
  useGetConsultingServicesOfLicenseRequestSection,
  useGetConversionIndustriesServiceOfLicenseRequestByExpert,
  useGetConversionIndustriesServiceOfLicenseRequestSection,
  useGetLicenseRequestDetailByExpert,
  useGetLicenseRequestExpertIdeaByExpert,
  useGetLicenseRequestRequiredTabs,
  useGetLicenseRequestSectionExpertIdeaByExpert,
  useGetOwnershipOfLicenseRequest,
  useGetSectionOfLicenseRequestById,
  useGetTopographyOfLicenseReuest,
  useGetTreesOfLicenseRequestSection,
} from "../../../../../../core/services/api";
import { IsIncludes, IsSameUrl } from "../../../../../../core/utils";
import { useGlobalState } from "../../../../../../core/utils/context/GlobalContext";
import { useStatusPermission } from "../../../../../../core/utils/context/StatusProvider";
import { SimpleProtectedRoute } from "../../../../../common/RouteComponents/SimpleProtectedRoute";
import { FallBackSpinner } from "../../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { ApplicantInfo } from "../Shared/ApplicantInfo";
import { Capacity } from "./Capacity/Capacity";
import { ConsumptionStatus } from "./ConsumptionStatus/ConsumptionStatus";
import { DistancesBoundaries } from "./DistancesBoundaries";
import { ExpertDescription } from "./ExpertDescription/ExpertDescription";
import { Facilities } from "./Facilities/Facilities";
import { GeographicalLocation } from "./GeographicalLocation";
import { SendExpertizingToMatching } from "./SendExpertizingToMatching/SendExpertizingToMatching";
import { ServicesStatus } from "./ServicesStatus/ServicesStatus";
import { Topography } from "./Topography/Topography";
import { TreeSpecifications } from "./TreeSpecifications/TreeSpecifications";
import { UpdateSectionMap } from "./UpdateSectionMap/UpdateSectionMap";

const InspectionContainer: React.FC = () => {
  const history = useHistory();
  const location = useLocation();
  const [tabs, setTabs] = useState<number[]>([]);
  const [treeSpecificationTableData, setTreeSpecificationTableData] =
    useState<any>([]);

  const [tabsLoaded, setTabsLoaded] = useState<boolean>(false);
  const [fixedOrMobieTypeByExpert, setFixedOrMobieTypeByExpert] =
    useState<number>(1);
  const [jobs, setJobs] = useState<any[]>([]);
  const [rejectedExpertize, setRejectedExpertize] = useState<boolean>(false);

  const { status, setStatus } = useStatusPermission();

  const { req_id, section_id , ownerShipList , topographyList , boundaryList } = useGlobalState();

  useEffect(() => {
    ownerShipList[1](null);
    topographyList[1](null);
    boundaryList[1]([]);
  }, []);

  const getTabs = useGetLicenseRequestRequiredTabs();

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
          setTabs(val.data.result.tabs ? val.data.result.tabs : []);
        },
      });
    }
  }, [req_id]);

  const {
    data: treeData,
    isFetching: treeIsFetching,
    isSuccess: treeIsSuccess,
    refetch,
  } = useGetTreesOfLicenseRequestSection(parseInt(section_id[0]));

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
  } = useGetActivityOfLicenseRequestSection(parseInt(section_id[0]));

  const {
    data: activityMobilityData,
    isSuccess: activityMobilitIsSuccess,
    isFetching: activityMobilitIsFetching,
    refetch: refetchMobilitActivity,
  } = useGetActivityOfLicenseRequestByExpert(parseInt(req_id[0]));

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
  } = useGetBuildingOfLicenseReuestSection(parseInt(section_id[0]));

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
  } = useGetBusinessServiceOfLicenseRequestSection(parseInt(section_id[0]));

  const {
    data: businessMobilityServiceData,
    isSuccess: businessMobilityServiceIsSuccess,
    isFetching: businessMobilityServiceIsFetching,
    refetch: refetchMobilityBusinessService,
  } = useGetBusinessServiceOfLicenseRequestByExpert(parseInt(req_id[0]));

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
  } = useGetConversionIndustriesServiceOfLicenseRequestSection(
    parseInt(section_id[0])
  );

  const {
    data: conversionMobilityIndustriesData,
    isSuccess: conversionMobilityIndustriesIsSuccess,
    isFetching: conversionMobilityIndustriesIsFetching,
    refetch: refetchMobilityConversionIndustries,
  } = useGetConversionIndustriesServiceOfLicenseRequestByExpert(
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
  } = useGetConsultingServicesOfLicenseRequestSection(parseInt(section_id[0]));
  const {
    data: consultingMobilityServicesData,
    isSuccess: consultingMobilityServicesIsSuccess,
    isFetching: consultingMobilityServicesIsFetching,
    refetch: refetchMobilityConsultingServices,
  } = useGetConsultingServicesOfLicenseRequestByExpert(parseInt(req_id[0]));

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
  } = useGetAgriculturalMechanizationServiceOfLicenseRequestSectionByExpert(
    parseInt(section_id[0])
  );
  const {
    data: mechanizationMobilityServicesData,
    isSuccess: mechanizationMobilityServicesIsSuccess,
    isFetching: mechanizationMobilityServicesIsFetching,
    refetch: refetchMobilityMechanizationServices,
  } = useGetAgriculturalMechanizationServiceOfLicenseRequestByExpert(
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
          useGetLicenseRequestDetail={useGetLicenseRequestDetailByExpert}
          setFixedOrMobieTypeByExpert={setFixedOrMobieTypeByExpert}
          setJobs={setJobs}
          setRejectedExpertize={setRejectedExpertize}
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
                          `/Inspection/${status}/UpdateLand/${req_id[0]}/${section_id[0]}`
                        ),
                      })}
                      onClick={() => {
                        history.push(
                          `/Inspection/${status}/UpdateLand/${req_id[0]}/${section_id[0]}`
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
                          `/Inspection/${status}/GeographicalLocation/${req_id[0]}/${section_id[0]}`
                        ),
                      })}
                      onClick={() => {
                        history.push(
                          `/Inspection/${status}/GeographicalLocation/${req_id[0]}/${section_id[0]}`
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
                          `/Inspection/${status}/DistancesBoundaries/${req_id[0]}/${section_id[0]}`
                        ),
                      })}
                      onClick={() => {
                        history.push(
                          `/Inspection/${status}/DistancesBoundaries/${req_id[0]}/${section_id[0]}`
                        );
                      }}
                    >
                      فواصل و حرایم
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
                          `/Inspection/${status}/Topography/${req_id[0]}/${section_id[0]}`
                        );
                      }}
                      className={classnames({
                        active: IsSameUrl(
                          location.pathname,
                          `/Inspection/${status}/Topography/${req_id[0]}/${section_id[0]}`
                        ),
                      })}
                    >
                      توپوگرافی، آب و خاک
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
                          `/Inspection/${status}/Facilities/${req_id[0]}/${
                            section_id[0] !== "0" ? section_id[0] : ""
                          }`
                        );
                      }}
                      className={classnames({
                        active: IsIncludes(
                          location.pathname,
                          `/Inspection/${status}/Facilities/${req_id[0]}`
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
                          `/Inspection/${status}/TreeSpecifications/${req_id[0]}/${section_id[0]}`
                        );
                      }}
                      className={classnames({
                        active: IsSameUrl(
                          location.pathname,
                          `/Inspection/${status}/TreeSpecifications/${req_id[0]}/${section_id[0]}`
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
                          `/Inspection/${status}/ServicesStatus/${req_id[0]}/${section_id[0]}/consulting`
                        );
                      }}
                      className={classnames({
                        active:
                          IsSameUrl(
                            location.pathname,
                            `/Inspection/${status}/ServicesStatus/${req_id[0]}/${section_id[0]}/consulting`
                          ) ||
                          IsSameUrl(
                            location.pathname,
                            `/Inspection/${status}/ServicesStatus/${req_id[0]}/${section_id[0]}/mechanisation`
                          ) ||
                          IsSameUrl(
                            location.pathname,
                            `/Inspection/${status}/ServicesStatus/${req_id[0]}/${section_id[0]}/alterantindustries`
                          ) ||
                          IsSameUrl(
                            location.pathname,
                            `/Inspection/${status}/ServicesStatus/${req_id[0]}/${section_id[0]}/merchantservices`
                          ),
                      })}
                    >
                      خدمات و صنایع
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
                          `/Inspection/${status}/ConsumptionStatus/${req_id[0]}/${section_id[0]}`
                        );
                      }}
                      className={classnames({
                        active: IsSameUrl(
                          location.pathname,
                          `/Inspection/${status}/ConsumptionStatus/${req_id[0]}/${section_id[0]}`
                        ),
                      })}
                    >
                      وضعیت مصرف
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
                          `/Inspection/${status}/Capacity/${req_id[0]}${
                            section_id[0] !== "0" ? `/${section_id[0]}` : ""
                          }`
                        );
                      }}
                      className={classnames({
                        active: IsSameUrl(
                          location.pathname,
                          `/Inspection/${status}/Capacity/${req_id[0]}${
                            section_id[0] !== "0" ? `/${section_id[0]}` : ""
                          }`
                        ),
                      })}
                    >
                      فعالیت و ظرفیت
                    </NavLink>
                  </NavItem>
                )}

                <NavItem>
                  <NavLink
                    //disabled={status < 2}
                    onClick={() => {
                      history.push(
                        `/Inspection/${status}/Description/${req_id[0]}${
                          section_id[0] !== "0" ? `/${section_id[0]}` : ""
                        }`
                      );
                    }}
                    className={classnames({
                      active: IsSameUrl(
                        location.pathname,
                        `/Inspection/${status}/Description/${req_id[0]}${
                          section_id[0] !== "0" ? `/${section_id[0]}` : ""
                        }`
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
                          isExpert={
                            (+status !== LicenseRequestStatusEnum.Expertise
                              ? false
                              : true) || rejectedExpertize
                          }
                        />
                      )
                    }
                    path="/Inspection/:status/UpdateLand/:req_id/:section_id"
                    exact
                  />
                  <SimpleProtectedRoute
                    component={() =>
                      onLazyTabsLoad(
                        <GeographicalLocation
                          useMutation={useGetOwnershipOfLicenseRequest}
                          useGetSectionOfLicenseRequestById={
                            useGetSectionOfLicenseRequestById
                          }
                          isExpert={
                            (+status !== LicenseRequestStatusEnum.Expertise
                              ? false
                              : true) || rejectedExpertize
                          }
                        />
                      )
                    }
                    path="/Inspection/:status/GeographicalLocation/:req_id/:section_id"
                    exact
                  />
                  <SimpleProtectedRoute
                    component={() =>
                      onLazyTabsLoad(
                        <Topography
                          isExpert={
                            (+status !== LicenseRequestStatusEnum.Expertise
                              ? false
                              : true) || rejectedExpertize
                          }
                          useMutation={useGetTopographyOfLicenseReuest}
                        />
                      )
                    }
                    path="/Inspection/:status/Topography/:req_id/:section_id"
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
                              isExpert={
                                (+status !== LicenseRequestStatusEnum.Expertise
                                  ? false
                                  : true) || rejectedExpertize
                              }
                            />
                          )}
                        </>
                      )
                    }
                    path="/Inspection/:status/Capacity/:req_id/:section_id?"
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
                              isExpert={
                                (+status !== LicenseRequestStatusEnum.Expertise
                                  ? false
                                  : true) || rejectedExpertize
                              }
                            />
                          )}
                        </>
                      )
                    }
                    path="/Inspection/:status/TreeSpecifications/:req_id/:section_id"
                    exact
                  />
                  <SimpleProtectedRoute
                    component={() =>
                      onLazyTabsLoad(
                        <>
                          {buildingsIsFetching ? (
                            <FallBackSpinner />
                          ) : (
                            <Facilities
                              facilityDataIsFetching={buildingTypeIsFetching}
                              refetch={refetchBuildings}
                              facilityData={buildingTypeData}
                              buildingsData={buildingsData}
                              isExpert={
                                (+status !== LicenseRequestStatusEnum.Expertise
                                  ? false
                                  : true) || rejectedExpertize
                              }
                              getSection={useGetSectionOfLicenseRequestById}
                            />
                          )}
                        </>
                      )
                    }
                    path="/Inspection/:status/Facilities/:req_id/:section_id?"
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
                          mechanizationServicesIsFetching ||
                          consultingServicesIsFetching ||
                          consultingMobilityServicesIsFetching ? (
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
                              isExpert={
                                (+status !== LicenseRequestStatusEnum.Expertise
                                  ? false
                                  : true) || rejectedExpertize
                              }
                            />
                          )}
                        </>
                      )
                    }
                    path="/Inspection/:status/ServicesStatus/:req_id/:section_id"
                  />
                  <SimpleProtectedRoute
                    component={() =>
                      onLazyTabsLoad(
                        <ConsumptionStatus
                          jobs={jobs}
                          useGetConsomptionTabs={useGetConsomptionTabsByExpert}
                          isExpert={
                            (+status !== LicenseRequestStatusEnum.Expertise
                              ? false
                              : true) || rejectedExpertize
                          }
                          isExpertUser={true}
                        />
                      )
                    }
                    path="/Inspection/:status/ConsumptionStatus/:req_id/:section_id"
                    exact
                  />
                  <SimpleProtectedRoute
                    component={() =>
                      onLazyTabsLoad(
                        <DistancesBoundaries
                          isExpert={
                            (+status !== LicenseRequestStatusEnum.Expertise
                              ? false
                              : true) || rejectedExpertize
                          }
                          useMutation={useGetBoundariesOfLicenseRequestSection}
                          getSection={useGetSectionOfLicenseRequestById}
                        />
                      )
                    }
                    path="/Inspection/:status/DistancesBoundaries/:req_id/:section_id"
                    exact
                  />
                  <SimpleProtectedRoute
                    component={() =>
                      onLazyTabsLoad(
                        <ExpertDescription
                          useGetDescriptionLicenseRequest={
                            section_id[0] !== "0"
                              ? useGetLicenseRequestSectionExpertIdeaByExpert
                              : useGetLicenseRequestExpertIdeaByExpert
                          }
                          isExpert={
                            (+status !== LicenseRequestStatusEnum.Expertise
                              ? false
                              : true) || rejectedExpertize
                          }
                        />
                      )
                    }
                    path="/Inspection/:status/Description/:req_id/:section_id?"
                    exact
                  />
                </Switch>
              </TabContent>
            </TabContent>

            {(+status === LicenseRequestStatusEnum.Expertise ||
              (+status === LicenseRequestStatusEnum.Matching &&
                rejectedExpertize)) && (
              <>
                <hr />
                <SendExpertizingToMatching />
              </>
            )}
          </CardBody>
        )}
      </Card>
    </>
  );
};

export { InspectionContainer };
