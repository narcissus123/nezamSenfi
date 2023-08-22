import { Form, Formik } from "formik";
import React, { FC, Fragment, useEffect, useRef, useState } from "react";
import { Alert, Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { useAddUserRealJobInformation, useAllUseTypes, useEditUserRealJobInformation, useGetAllCitiesByCountyId, useGetAllCountyByProvinceId, useGetAllprovinceByMainLocationId, useGetAllprovinces, useGetAllVillagesByCountyId, useGetJobsByUseTypes } from "../../../core/services/api";
import { useGetAllCountyJahadCenterByFilter, useGetAllCountyJahadCenterForDropdown } from "../../../core/services/api/jahad-center.api";
import { useGetAllJobByUseTypeForDropDown } from "../../../core/services/api/job.api";
import { useGetLicenseCountByFilterByMainLocationManger } from "../../../core/services/api/license-request-report.api";
import { ModernDatePicker, SubmitButton } from "../../common/Form";
import BasicSelectOption from "../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { ListTable } from "../../common/ListTable/ListTable";
import { FallBackSpinner } from "../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { ReportActions } from "./ReportActions/ReportActions";
import { ReportGrid } from "./ReportGrid/ReportGrid";
import { columns } from "./UserColumns";

const LicenseCount: FC = ({}) => {
  const [tableData, setTableData] = useState([]);

  const [pageCountList, setPageCount] = useState<any>(0);
  const [pageSize, setPageSize] = useState<any>(10);
  const [filterState, setFilterState] = useState<any>({
    loceationId: 0,
    reportLocationTypeEnum: 1,
    jobId: 0,
    useTypeId: 0,
    jahadCenterId: 0,
    startDate: "",
    endDate: "",
    province: null,
    county: null,
    city: null,
    village: null,
  });

  const getMutation = useGetLicenseCountByFilterByMainLocationManger();

  const componentRef = useRef<any>();

  const fillForm = (val: any) => {

    try {
      setTableData(val.data.result.items);
    } catch (err) {}
  };

  const [provinceOptions, setProvinceOptions] = useState<any>([
    {
      label: "انتخاب کنید",
      options: [],
    },
  ]);

  const [countyOptions, setCountyOptions] = useState<any>([]);

  const [cityOptions, setCityOptions] = useState<any>([]);

  const [villageOptions, setVillageOptions] = useState<any>([]);
  const [jahadCenterData, setJahadCenterData] = useState<any>([]);
  const [jobsData, setJobsData] = useState<any>([]);
  const [reportLocationTypeEnumData, setReportLocationTypeEnumData] =
    useState<any>([
      { value: 1, label: "استان" },
      { value: 2, label: "شهرستان" },
      { value: 3, label: "اتحادیه" },
      { value: 4, label: "شهر یا روستا" },
    ]);

  const {
    data: provinceData,
    isFetching: provinceIsFetching,
    isSuccess: provinceIsSuccess,
  } = useGetAllprovinces();
  const getAllCountyByProvinceIdMutation = useGetAllCountyByProvinceId();
  const getAllCitiesByCountyIdMutation = useGetAllCitiesByCountyId();
  const getAllVillagesByCountyIdMutation = useGetAllVillagesByCountyId();
  const getJahadCenterMutation = useGetAllCountyJahadCenterForDropdown();
  const getJobs = useGetAllJobByUseTypeForDropDown();

  useEffect(() => {
    if (getJahadCenterMutation.data && getJahadCenterMutation.data.data) {
      const result = getJahadCenterMutation.data.data.result;

      let pro: any = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      result.forEach((county: any) => {
        pro[0].options.push({
          value: county.id.toString(),
          label: county.title,
        });
      });
      setJahadCenterData(pro);
    }
  }, [getJahadCenterMutation.isSuccess]);

  useEffect(() => {
    if (
      getAllCountyByProvinceIdMutation.data &&
      getAllCountyByProvinceIdMutation.data.data
    ) {
      const result = getAllCountyByProvinceIdMutation.data.data.result;

      let pro: any = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      result.forEach((county: any) => {
        pro[0].options.push({
          value: county.id.toString(),
          label: county.title,
        });
      });
      setCountyOptions(pro);
    }
  }, [getAllCountyByProvinceIdMutation.isSuccess]);

  useEffect(() => {
    if (
      getAllCitiesByCountyIdMutation.data &&
      getAllCitiesByCountyIdMutation.data.data
    ) {
      const result = getAllCitiesByCountyIdMutation.data.data.result;

      let pro: any = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      result.forEach((county: any) => {
        pro[0].options.push({
          value: county.id.toString(),
          label: county.title,
        });
      });
      setCityOptions(pro);
    }
  }, [getAllCitiesByCountyIdMutation.isSuccess]);

  useEffect(() => {
    if (
      getAllVillagesByCountyIdMutation.data &&
      getAllVillagesByCountyIdMutation.data.data
    ) {
      const result = getAllVillagesByCountyIdMutation.data.data.result;

      let pro: any = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      result.forEach((county: any) => {
        pro[0].options.push({
          value: county.id.toString(),
          label: county.title,
        });
      });
      setVillageOptions(pro);
    }
  }, [getAllVillagesByCountyIdMutation.isLoading]);

  useEffect(() => {
    if (provinceData && provinceData.data && provinceData.data.result) {
      try {
        let provinceNewOptions: any = [{ label: "انتخاب کنید", options: [] }];
        let options: any = [];
        provinceData.data.result.forEach((county: any) => {
          options.push({ value: county.id, label: county.title });
        });
        provinceNewOptions[0].options = options;
        setProvinceOptions(provinceNewOptions);
      } catch (err) {}
    }
  }, [provinceIsSuccess]);

  const [useTypeData, setUseTypeData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const {
    data: useTypesData,
    isFetching: useTypesIsFetching,
    isSuccess: useTypesIsSuccess,
  } = useAllUseTypes();

  useEffect(() => {
    if (useTypesData && useTypesData.data) {
      const result = useTypesData.data.result;

      console.log("---usetypedata----", useTypesData);

      let pro: any = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      result.forEach((useType: any) => {
        pro[0].options.push({
          value: useType.id,
          label: useType.title,
          useTypeEnum: useType.useTypeEnum,
        });
      });
      setUseTypeData(pro);
    }
  }, [useTypesIsSuccess]);

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle>گزارش تعداد پروانه</CardTitle>
        </CardHeader>
        <CardBody>
          <Formik
            initialValues={filterState}
            onSubmit={(value) => {
              const obj: any = {
                loceationId:
                  value.city && value.city.value !== 0
                    ? +value.city.value
                    : value.village && value.village.value !== 0
                    ? +value.village.value
                    : 0,
                reportLocationTypeEnum: value.reportLocationTypeEnum
                  ? value.reportLocationTypeEnum.value
                  : 0,
                jobId: value.jobId ? +value.jobId.value : 0,
                useTypeId: value.useTypeId ? +value.useTypeId.value : 0,
                jahadCenterId: +value.jahadCenterId
                  ? value.jahadCenterId.value
                  : 0,
                startDate: value.startDate,
                endDate: value.endDate,
              };
              getMutation.mutate(obj, {
                onSuccess: (val: any) => {
                  fillForm(val);
                },
              });
            }}
            enableReinitialize={true}
          >
            {({ values, errors, handleChange, resetForm, setFieldValue }) => (
              <>
                <Form>
                  <Card>
                    <CardHeader>
                      <CardTitle> جستجو </CardTitle>
                    </CardHeader>
                    <CardBody>
                      <Row>
                        <Col md="4">
                          <BasicSelectOption
                            name="province"
                            placeHolder="انتخاب استان"
                            data={provinceOptions}
                            isLoading={provinceIsFetching}
                            lableText="استان"
                            onChange={(opt, e) => {
                              getAllCountyByProvinceIdMutation.mutate(
                                parseInt(opt.value),
                                {
                                  onSuccess: (val) => {
                                    let counties: any = [];
                                    val.data.result.forEach((row: any) => {
                                      counties.push({
                                        value: row.id,
                                        label: row.title,
                                      });
                                    });

                                    setCountyOptions(counties);
                                  },
                                }
                              );
                              setFieldValue("province", {
                                value: opt.value,
                                label: opt.label,
                              });
                              setFieldValue("county", null);
                              setFieldValue("city", null);
                              setFieldValue("village", null);
                              setCityOptions([]);
                              setVillageOptions([]);
                            }}
                          />
                        </Col>
                        <Col md="4">
                          <BasicSelectOption
                            name="county"
                            data={countyOptions}
                            isLoading={
                              getAllCountyByProvinceIdMutation.isLoading
                            }
                            placeHolder="انتخاب شهرستان"
                            lableText="شهرستان"
                            onChange={async (opt, e) => {
                              getAllCitiesByCountyIdMutation.mutate(
                                parseInt(opt.value),
                                {
                                  onSuccess: (val) => {
                                    let cities: any = [];
                                    val.data.result.forEach((row: any) => {
                                      cities.push({
                                        value: row.id,
                                        label: row.title,
                                      });
                                    });
                                    setCityOptions(cities);
                                  },
                                }
                              );
                              getAllVillagesByCountyIdMutation.mutate(
                                parseInt(opt.value),
                                {
                                  onSuccess: (val) => {
                                    let villages: any = [];
                                    val.data.result.forEach((row: any) => {
                                      villages.push({
                                        value: row.id,
                                        label: row.title,
                                      });
                                    });
                                    setVillageOptions(villages);
                                  },
                                }
                              );
                              getJahadCenterMutation.mutate(opt.value, {
                                onSuccess: (val) => {
                                  let jahadCenters: any = [];
                                  val.data.result.forEach((row: any) => {
                                    jahadCenters.push({
                                      value: row.id,
                                      label: row.title,
                                    });
                                  });
                                  setJahadCenterData(jahadCenters);
                                },
                              });
                              setFieldValue("county", {
                                value: opt.value,
                                label: opt.label,
                              });
                              setFieldValue("city", null);
                              setFieldValue("village", null);
                            }}
                          />
                        </Col>
                        <Col md="4">
                          <BasicSelectOption
                            placeHolder="انتخاب شهر"
                            name="city"
                            isLoading={getAllCitiesByCountyIdMutation.isLoading}
                            data={cityOptions}
                            isClearable
                            lableText="شهر"
                            onChange={(opt, e) => {
                              if (opt) {
                                setFieldValue("city", {
                                  value: opt.value,
                                  label: opt.label,
                                });
                                setFieldValue("village", null);
                              } else {
                                setFieldValue("city", null);
                              }
                            }}
                          />
                        </Col>
                        <Col md="4">
                          <BasicSelectOption
                            placeHolder="انتخاب روستا"
                            name="village"
                            isLoading={
                              getAllVillagesByCountyIdMutation.isLoading
                            }
                            data={villageOptions}
                            lableText="روستا"
                            isClearable
                            onChange={(opt, e) => {
                              if (opt) {
                                setFieldValue("village", {
                                  value: opt.value,
                                  label: opt.label,
                                });
                                setFieldValue("city", null);
                              } else {
                                setFieldValue("village", null);
                              }
                            }}
                          />
                        </Col>
                        <Col md="4">
                          <BasicSelectOption
                            placeHolder="مرکز جهاد"
                            name="jahadCenterId"
                            isClearable
                            isLoading={getJahadCenterMutation.isLoading}
                            data={jahadCenterData}
                            lableText="مرکز جهاد"
                          />
                        </Col>
                        <Col md="4">
                          <BasicSelectOption
                            data={useTypeData}
                            name="useTypeId"
                            lableText="نوع کاربری"
                            isClearable
                            isLoading={useTypesIsFetching}
                            placeHolder="بخش مورد نظر را انتخاب کنید"
                            onChange={(opt: any, e: any) => {
                              if (opt) {
                                setFieldValue("useTypeId", {
                                  value: opt.value,
                                  label: opt.label,
                                });
                                setFieldValue("jobId", null);
                                setJobsData([]);

                                getJobs.mutate(opt.value, {
                                  onSuccess: (val: any) => {
                                    let data = val.data.result;

                                    if (data) {
                                      let pro: any = [
                                        {
                                          label: "انتخاب کنید...",
                                          options: [],
                                        },
                                      ];
                                      data.forEach((job: any) => {
                                        pro[0].options.push({
                                          value: job.id,
                                          label: job.title,
                                        });
                                      });
                                      setJobsData(pro);
                                    }
                                  },
                                });
                              } else {
                                setFieldValue("jobId", null);
                                setJobsData([]);
                                setFieldValue("useTypeId", null);
                              }
                            }}
                          />
                        </Col>
                        <Col md="4">
                          <BasicSelectOption
                            data={jobsData}
                            name="jobId"
                            lableText="شغل"
                            isClearable
                            isLoading={getJobs.isLoading}
                            placeHolder="شغل مورد نظر را انتخاب کنید"
                          />
                        </Col>
                        <Col md="4">
                          <BasicSelectOption
                            data={reportLocationTypeEnumData}
                            name="reportLocationTypeEnum"
                            isClearable
                            lableText="نوع گزارش"
                            isLoading={false}
                            placeHolder="گزینه مورد نظر را انتخاب کنید"
                          />
                        </Col>
                        <Col sm="4">
                          <ModernDatePicker
                            name="startDate"
                            lableText="تاریخ شروع"
                            placeholder="وارد کنید..."
                            hasMaximum
                          />
                        </Col>
                        <Col sm="4">
                          <ModernDatePicker
                            name="endDate"
                            lableText="تاریخ پایان"
                            placeholder="وارد کنید..."
                            hasMaximum
                          />
                        </Col>
                      </Row>
                      <Row style={{ marginTop: "25px" }}>
                        <Col md="4">
                          <SubmitButton
                            isLoading={getMutation.isLoading}
                            btnText="گرفتن گزارش"
                            clearable
                            clearableTxt="پاک کردن فرم"
                            onClear={() => {
                              resetForm();
                            }}
                          />
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>
                </Form>
              </>
            )}
          </Formik>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle> لیست گزارشات ها </CardTitle>
        </CardHeader>
        <CardBody>
          {getMutation.isLoading ? (
            <>
              <FallBackSpinner />
            </>
          ) : (
            <>
              {tableData.length > 0 ? (
                <>
                  <ReportGrid componentRef={componentRef} data={tableData} />
                </>
              ) : (
                <>
                  <Alert color="info" className="w-100 m-0 text-center">
                    گزارشی یافت نشد!
                  </Alert>
                </>
              )}
            </>
          )}
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle> عملیات ها </CardTitle>
        </CardHeader>
        <CardBody>
          <ReportActions componentRef={componentRef} data={tableData} />
        </CardBody>
      </Card>
    </Fragment>
  );
};

export { LicenseCount };
