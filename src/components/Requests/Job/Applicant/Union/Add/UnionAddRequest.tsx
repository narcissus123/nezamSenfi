import { Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { UserRoles } from "../../../../../../core/enums";
import { IUnionPositionRequest } from "../../../../../../core/models/union-position-request.model";
import {
  useGetAllCountyGuildRoomsByProvinceIdForDropDown,
  useGetAllProvinceGuildRoomsForDropDown,
  useGetAllUnioinByCountyGuildroomIdForDropDown,
  usePostCreatePositionRequestInCountyUnion,
  usePostGetUnionCountyPosition,
} from "../../../../../../core/services/api";
import { showToast } from "../../../../../../core/utils";
import { useUserAuth } from "../../../../../../core/utils/context/AuthenticationContext";
import { JobFlowUnionDetailsValidate } from "../../../../../../core/validations/jobflow-union-details.validations";
import BreadCrumbs from "../../../../../common/@vuexy/breadCrumbs/BreadCrumb";
import { TextInput } from "../../../../../common/Form/InputComponents/TextInputComponents/TextInput/TextInput";
import BasicSelectOption from "../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { SubmitButton } from "../../../../../common/Form/SubmitButtonComponent/SubmitButton/SubmitButton";

const UnionAddRequest: FC = () => {
  const [initialValues, setInitialValues] = useState<any>({
    province: null,
    county: null,
    union: null,
    jobType: null,
    serviceType: null,
    rankStatus: null,
    employmentLicense: "",
    employmentLicenseStatus: null,
    activityLicenseStatus: "",
    examCertificateStatus: "",
    yearOfServices: null,
  });

  const [province, setProvince] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const [county, setCounty] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const [union, setUnion] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const { role } = useUserAuth();

  const isLegalUser = role.includes(UserRoles.UserLegal);

  let jobTypeData: any = [
    {
      label: "انتخاب کنید ...",
      options: [
        { value: 1, label: "پرسنلی" },
        { value: 2, label: "پیمانکاری" },
      ],
    },
  ];
  if (isLegalUser) {
    jobTypeData = [
      {
        label: "انتخاب کنید ...",
        options: [{ value: 2, label: "پیمانکاری" }],
      },
    ];
  }

  const [employmentLicenseStatusData, setEmploymentLicenseStatusData] =
    useState<any>([
      {
        label: "انتخاب کنید ...",
        options: [
          { value: 1, label: "دارای اعتبار" },
          { value: 2, label: "فاقد اعتبار" },
        ],
      },
    ]);

  const [rankStatusData, setRankStatusData] = useState<any>([
    {
      label: "انتخاب کنید ...",
      options: [
        { value: 1, label: "رتبه A" },
        { value: 2, label: "رتبه B" },
        { value: 3, label: "رتبه C" },
        { value: 4, label: "فاقد رتبه" },
      ],
    },
  ]);

  const [serviceTypeِData, setServiceTypeِData] = useState<any>([]);

  const yearOfServicesData = [
    {
      label: "انتخاب کنید ...",
      options: [
        { value: 1, label: "1 سال" },
        { value: 2, label: "2 سال" },
        { value: 3, label: "3 سال" },
        { value: 4, label: "4 سال" },
        { value: 5, label: "5 سال" },
        { value: 6, label: "6 تا 10 سال" },
        { value: 7, label: "11 تا 15 سال" },
        { value: 8, label: "16 تا 20 سال" },
        { value: 9, label: "21 تا 25 سال" },
        { value: 10, label: "26 تا 30 سال" },
      ],
    },
  ];

  const { data, isSuccess, isFetching } =
    useGetAllProvinceGuildRoomsForDropDown();
  const positionMutation = usePostGetUnionCountyPosition();
  const countyGuildRoomsMutation =
    useGetAllCountyGuildRoomsByProvinceIdForDropDown();
  const unionMutation = useGetAllUnioinByCountyGuildroomIdForDropDown();
  const postRequest = usePostCreatePositionRequestInCountyUnion();

  useEffect(() => {
    if (data) {
      let queryData: any = data;
      let newOptions: any = [];
      let newProvinces = [
        {
          label: "انتخاب کنید ...",
          options: [],
        },
      ];

      queryData.data.result.forEach((row: any) => {
        newOptions.push({ value: row.id, label: row.title });
      });
      newProvinces[0].options = newOptions;
      setProvince(newProvinces);
    }
  }, [isSuccess, data]);
  useEffect(() => {
    try {
      if (data) {
        let queryData: any = countyGuildRoomsMutation.data;
        let newOptions: any = [];
        let newCounties = [
          {
            label: "انتخاب کنید ...",
            options: [],
          },
        ];

        queryData.data.result.forEach((row: any) => {
          newOptions.push({ value: row.id, label: row.title });
        });
        newCounties[0].options = newOptions;
        setCounty(newCounties);
      }
    } catch (e) {}
  }, [countyGuildRoomsMutation.isSuccess, countyGuildRoomsMutation.data]);

  useEffect(() => {
    try {
      if (data) {
        let queryData: any = unionMutation.data;
        let newOptions: any = [];
        let newUnions = [
          {
            label: "انتخاب کنید ...",
            options: [],
          },
        ];

        queryData.data.result.forEach((row: any) => {
          newOptions.push({ value: row.countyUnionId, label: row.title });
        });
        newUnions[0].options = newOptions;
        setUnion(newUnions);
      }
    } catch (e) {}
  }, [unionMutation.isSuccess, unionMutation.data]);

  useEffect(() => {
    try {
      if (positionMutation.data) {
        let queryData: any = positionMutation.data;
        let newOptions: any = [];
        let newServiceType = [
          {
            label: "انتخاب کنید ...",
            options: [],
          },
        ];

        queryData.data.result.forEach((row: any) => {
          newOptions.push({
            value: row.id,
            label: row.title,
            haveExam: row.haveExam,
          });
        });
        newServiceType[0].options = newOptions;
        setServiceTypeِData(newServiceType);
      }
    } catch (e) {}
  }, [positionMutation.isSuccess, positionMutation.data]);

  const history = useHistory();

  const onSubmit = (value: any) => {
    const PositionRequestObject: IUnionPositionRequest = {
      ratingStatus: value.rankStatus.value,
      ratingTitle: value.employmentLicense,
      countyUnionPositionId: value.serviceType.value,
      historyOfServiceAfterGraduation: value.yearOfServices.value,
      employmentLicenseStatus: value.employmentLicenseStatus.value,
      certificateExaminationStatus: 0,
      tradeUnionLicenseStatus: 0,
    };

    postRequest.mutate(PositionRequestObject, {
      onSuccess: (val) => {
        const id = val.data.result;
        history.push("/Requests/job/Union/1/UploadDocuments/" + id);
        showToast(["با موفقیت انجام شد!"], "success");
      },
    });
  };

  return (
    <>
      <BreadCrumbs
        breadCrumbTitle="درخواست های شغلی"
        breadCrumbParent="داشبورد"
        parentLink="/"
        breadCrumbActive="درخواست جدید"
      />
      <Card>
        <CardHeader>
          <CardTitle>درخواست شغل اتحادیه</CardTitle>
        </CardHeader>
        <CardBody>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={JobFlowUnionDetailsValidate}
            onSubmit={onSubmit}
          >
            {({
              values,
              errors,
              handleChange,
              touched,
              getFieldProps,
              setFieldValue,
            }) => {
              return (
                <Form>
                  <>
                    <Row>
                      <Col md="6">
                        <Row>
                          <Col>
                            <BasicSelectOption
                              lableText="استان"
                              significant={true}
                              name="province"
                              placeHolder="انتخاب کنید..."
                              data={province}
                              isLoading={isFetching}
                              onChange={(opt, e) => {
                                setFieldValue("province", {
                                  value: opt.value,
                                  label: opt.label,
                                });
                                setFieldValue("jobType", null);
                                setFieldValue("county", null);
                                setFieldValue("serviceType", null);
                                setFieldValue("union", null);
                                setUnion([]);
                                setServiceTypeِData([]);
                                setCounty([]);
                                countyGuildRoomsMutation.mutate(opt.value);
                              }}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <BasicSelectOption
                              lableText="شهرستان"
                              significant={true}
                              name="county"
                              placeHolder="انتخاب کنید..."
                              data={county}
                              isLoading={countyGuildRoomsMutation.isLoading}
                              onChange={(opt, e) => {
                                setFieldValue("county", {
                                  value: opt.value,
                                  label: opt.label,
                                });
                                setFieldValue("jobType", null);
                                setFieldValue("serviceType", null);
                                setFieldValue("union", null);
                                setServiceTypeِData([]);
                                unionMutation.mutate(opt.value);
                              }}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <BasicSelectOption
                              lableText="اتحادیه"
                              significant={true}
                              name="union"
                              placeHolder="انتخاب کنید..."
                              data={union}
                              isLoading={unionMutation.isLoading}
                              onChange={(opt, e) => {
                                setFieldValue("union", {
                                  value: opt.value,
                                  label: opt.label,
                                });
                                setFieldValue("jobType", null);
                                setFieldValue("serviceType", null);
                                setServiceTypeِData([]);
                              }}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <BasicSelectOption
                              significant
                              isDisabled={values.union ? false : true}
                              placeHolder="نوع اشتغال درخواستی"
                              name="jobType"
                              data={jobTypeData}
                              lableText="نوع اشتغال درخواستی"
                              onChange={(opt, e) => {
                                setFieldValue("jobType", {
                                  value: opt.value,
                                  label: opt.label,
                                });
                                setFieldValue("serviceType", null);
                                positionMutation.mutate({
                                  positionType: opt.value,
                                  countyUnoinId: values.union.value,
                                });
                              }}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col md="12">
                            <BasicSelectOption
                              significant
                              isLoading={positionMutation.isLoading}
                              placeHolder="نوع ارائه خدمت"
                              name="serviceType"
                              data={serviceTypeِData}
                              lableText="نوع ارائه خدمت"
                              onChange={(opt, e) => {
                                setFieldValue("serviceType", {
                                  value: opt.value,
                                  label: opt.label,
                                  haveExam: opt.haveExam,
                                });
                              }}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <BasicSelectOption
                              significant
                              placeHolder="وضعیت رتبه"
                              name="rankStatus"
                              data={rankStatusData}
                              lableText="وضعیت رتبه"
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <TextInput
                              significant
                              lableText="موضوع رتبه یا پروانه اشتغال"
                              name="employmentLicense"
                              placeholder="موضوع رتبه یا پروانه اشتغال"
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <BasicSelectOption
                              significant
                              placeHolder="وضعیت پروانه اشتغال"
                              name="employmentLicenseStatus"
                              data={employmentLicenseStatusData}
                              lableText="وضعیت پروانه اشتغال"
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col md="6">
                        <Row>
                          <Col>
                            <TextInput
                              disabled
                              significant
                              lableText="وضعیت پروانه فعالیت نظام صنفی"
                              name="activityLicenseStatus"
                              placeholder="وضعیت پروانه فعالیت نظام صنفی"
                            />
                          </Col>
                        </Row>
                        {values.serviceType ? (
                          <>
                            {values.serviceType.haveExam && (
                              <Row>
                                <Col>
                                  <TextInput
                                    disabled
                                    significant
                                    lableText="وضعیت گواهی نامه شرکت در آزمون"
                                    name="examCertificateStatus"
                                    placeholder="وضعیت گواهی نامه شرکت در آزمون"
                                  />
                                </Col>
                              </Row>
                            )}
                          </>
                        ) : (
                          <></>
                        )}
                        <Row>
                          <Col>
                            <BasicSelectOption
                              significant
                              placeHolder="انتخاب کنید ..."
                              name="yearOfServices"
                              data={yearOfServicesData}
                              lableText="سابقه خدمت پس از تحصیل"
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <SubmitButton
                      isLoading={postRequest.isLoading}
                      schema={JobFlowUnionDetailsValidate}
                      values={values}
                      initialValue={initialValues}
                    />
                  </>
                </Form>
              );
            }}
          </Formik>
        </CardBody>
      </Card>
    </>
  );
};

export { UnionAddRequest };
