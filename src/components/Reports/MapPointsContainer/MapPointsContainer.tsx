import { Form, Formik } from "formik";
import React, { FC, Fragment, useEffect, useState } from "react";
import { Alert, Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import {
  useAllUseTypes,
  useGetAllCitiesByCountyId,
  useGetAllCountyByProvinceId,
  useGetAllprovinces,
  useGetAllVillagesByCountyId,
} from "../../../core/services/api";
import { useGetAllCountyJahadCenterForDropdown } from "../../../core/services/api/jahad-center.api";
import { useGetAllJobByUseTypeForDropDown } from "../../../core/services/api/job.api";
import { useGetAllPointByFilterByMainLocationManager } from "../../../core/services/api/license-request-report.api";
import { SubmitButton, Toggle } from "../../common/Form";
import BasicSelectOption from "../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { MapDetails } from "./MapDetails/MapDetails";


export interface ILicenseCoordinates {
  licenseId: number;
  coordinates: { x: number; y: number }[];
  centerX: number;
  centerY: number;
}

const MapPointsContainer: FC = ({}) => {
  const [tableData, setTableData] = useState<ILicenseCoordinates[]>([]);

  const [filterState, setFilterState] = useState<any>({
    loceationId: null,
    reportLocationTypeEnum: null,
    jobId: null,
    isValid: false,
    province: null,
    county: null,
    city: null,
    village: null,
  });

  const getMutation = useGetAllPointByFilterByMainLocationManager();

  const fillForm = (val: any) => {
    try {
      let newData : ILicenseCoordinates[] = []
      val.data.result.forEach((row:ILicenseCoordinates) => {
        newData.push({
          centerX: row.centerX,
          centerY: row.centerY,
          coordinates: row.coordinates,
          licenseId: row.licenseId,
        });
        setTableData(newData );
      })
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
  const [jobsData, setJobsData] = useState<any>([]);
  const [reportLocationTypeEnumData, setReportLocationTypeEnumData] =
    useState<any>([
      { value: 1, label: "استان" },
      { value: 2, label: "شهرستان" },
      { value: 3, label: "شهر یا روستا" },
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
          <CardTitle>جستجو</CardTitle>
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
                    : value.county
                    ? +value.county.value
                    : value.province
                    ? +value.province.value
                    : 0,
                reportLocationTypeEnum:
                  value.village || value.city ? 3 : value.county ? 2 : 1,
                jobId: value.jobId ? +value.jobId.value : 0,
                useTypeId: value.useTypeId ? +value.useTypeId.value : 0,
                isValid: value.isValid,
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
                  <Row>
                    <Col md="4">
                      <BasicSelectOption
                        name="province"
                        placeHolder="انتخاب استان"
                        data={provinceOptions}
                        significant
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
                        isLoading={getAllCountyByProvinceIdMutation.isLoading}
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
                        isLoading={getAllVillagesByCountyIdMutation.isLoading}
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
                      <Toggle
                        id="isValid"
                        name="isValid"
                        lableText="دارای اعتبار"
                        significant
                        direction="ltr"
                        className="my-1"
                        onChange={(opt: any) => {
                          setFieldValue("isValid", opt.target.checked);
                        }}
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
                </Form>
              </>
            )}
          </Formik>
        </CardBody>
      </Card>

      { tableData.length > 0 && <MapDetails data={tableData} /> }
    </Fragment>
  );
};

export { MapPointsContainer };
