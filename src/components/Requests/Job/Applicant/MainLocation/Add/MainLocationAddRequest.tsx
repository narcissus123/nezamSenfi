import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { UserRoles } from "../../../../../../core/enums";
import {
  useGetAllMainLocations,
  usePostCreatePositionRequestInMainGuildRoom,
  usePostGetMainLocationGuildRoomPosition,
} from "../../../../../../core/services/api";
import { showToast } from "../../../../../../core/utils";
import { useUserAuth } from "../../../../../../core/utils/context/AuthenticationContext";
import {
  JobFlowMainLocationDetailsValidate,
  JobFlowMainLocationLegalDetailsValidate,
} from "../../../../../../core/validations/jobflow-mainlocation-details.validations";
import BreadCrumbs from "../../../../../common/@vuexy/breadCrumbs/BreadCrumb";
import { TextInput } from "../../../../../common/Form/InputComponents/TextInputComponents/TextInput/TextInput";
import BasicSelectOption from "../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { SubmitButton } from "../../../../../common/Form/SubmitButtonComponent/SubmitButton/SubmitButton";

const MainLocationAddRequest = () => {
  const [initialValues, setInitialValues] = useState<any>({
    mainLocation: null,
    jobType: null,
    serviceType: null,
    rankStatus: null,
    employmentLicense: "",
    employmentLicenseStatus: null,
    activityLicenseStatus: "",
    examCertificateStatus: "",
    yearOfServices: null,
  });

  const [mainLocation, setMainLocation] = useState<any>([
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

  const { data, isSuccess, isFetching } = useGetAllMainLocations();
  const positionMutation = usePostGetMainLocationGuildRoomPosition();
  const positionRequestMutation = usePostCreatePositionRequestInMainGuildRoom();

  const history = useHistory();

  const onSubmit = (value: any) => {
    const PositionRequestObject: any = {
      ratingStatus: value.rankStatus.value,
      ratingTitle: value.employmentLicense,
      mainLocationGuildRoomPositionId: value.serviceType.value,
      historyOfServiceAfterGraduation: isLegalUser
        ? 0
        : value.yearOfServices.value,
      employmentLicenseStatus: value.employmentLicenseStatus.value,
      certificateExaminationStatus: 0,
      tradeUnionLicenseStatus: 0,
    };

    positionRequestMutation.mutate(PositionRequestObject, {
      onSuccess: (val: any) => {
        const id = val.data.result;
        history.push("/Requests/job/MainLocation/1/UploadDocuments/" + id);
        showToast(["با موفقیت انجام شد!"], "success");
      },
    });
  };

  useEffect(() => {
    if (data) {
      let queryData: any = data;
      let newOptions: any = [];
      let newMainLocations = [
        {
          label: "انتخاب کنید ...",
          options: [],
        },
      ];

      queryData.data.result.forEach((row: any) => {
        newOptions.push({ value: row.id, label: row.title });
      });
      newMainLocations[0].options = newOptions;
      setMainLocation(newMainLocations);
      setInitialValues((prev: any) => {
        return { ...prev, mainLocation: newMainLocations[0].options[0] };
      });
    }
  }, [isSuccess, data]);

  useEffect(() => {
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
  }, [positionMutation.isSuccess, positionMutation.data]);

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
          <CardTitle>درخواست شغل کشوری</CardTitle>
        </CardHeader>
        <CardBody>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={
              isLegalUser
                ? JobFlowMainLocationLegalDetailsValidate
                : JobFlowMainLocationDetailsValidate
            }
            onSubmit={onSubmit}
          >
            {({
              values,
              errors,
              handleChange,
              touched,
              getFieldProps,
              setFieldValue,
              setFieldError,
            }) => {
              return (
                <Form>
                  <>
                    <Row>
                      <Col md="6">
                        <Row>
                          <Col>
                            <BasicSelectOption
                              lableText="کشور"
                              significant={true}
                              name="mainLocation"
                              placeHolder="انتخاب کنید..."
                              data={mainLocation}
                              isLoading={isFetching}
                              isDisabled={true}
                              onChange={(opt, e) => {
                                setFieldValue("mainLocation", {
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
                              isDisabled={values.mainLocation ? false : true}
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
                                  mainLocationId: values.mainLocation.value,
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
                        {!isLegalUser && (
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
                        )}
                      </Col>
                    </Row>
                    <SubmitButton
                      isLoading={positionRequestMutation.isLoading}
                      schema={
                        isLegalUser
                          ? JobFlowMainLocationLegalDetailsValidate
                          : JobFlowMainLocationDetailsValidate
                      }
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

export { MainLocationAddRequest };
