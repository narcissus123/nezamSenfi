import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { FileText, User } from "react-feather";
import { useParams } from "react-router-dom";
import { Alert, Button, Col, Collapse, Row } from "reactstrap";
import { JobRequestStatus } from "../../../../../../core/enums/job-request-status";
import {
  useGetAllMainLocations,
  useGetGuarantorsRequiermentOfMainLocationGuildRoomPositionRequest,
  useGetMyMainLocationPositionRequestDetailsById,
  usePostCreatePositionRequestInCountyGuildRoom,
  usePostGetProvinceGuildRoomPosition,
} from "../../../../../../core/services/api";
import { usePostJobRequest } from "../../../../../../core/services/api/job-request.api";
import { fullOption } from "../../../../../../core/utils";
import { TextInput } from "../../../../../common/Form/InputComponents/TextInputComponents/TextInput/TextInput";
import BasicSelectOption from "../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { FallBackSpinner } from "../../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import Timeline from "../../../../../common/timeline";
import { Guarantors } from "../../Guarantors/Guarantors";
import { HistoryJobRequest } from "../../HistoryJobRequest/HistoryJobRequest";

const Details = () => {
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

  const [jobTypeData, setJobTypeData] = useState<any>([
    {
      label: "انتخاب کنید ...",
      options: [
        { value: 1, label: "پرسنلی" },
        { value: 2, label: "پیمانکاری" },
      ],
    },
  ]);

  const postRequest = usePostJobRequest();

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

  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
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
  const positionMutation = usePostGetProvinceGuildRoomPosition();
  const positionRequestMutation =
    usePostCreatePositionRequestInCountyGuildRoom();
  const getDetailsMutation = useGetMyMainLocationPositionRequestDetailsById();

  const { req_id } = useParams<{ req_id: string }>();

  const getData = (mainLocationData: any) => {
    try {
      getDetailsMutation.mutate(req_id, {
        onSuccess: (val: any) => {
          const data = val.data.result;
          setInitialValues({
            mainLocation: fullOption(data.mainLocationId, mainLocationData),
            jobType: null,
            serviceType: null,
            rankStatus: fullOption(data.ratingStatus, rankStatusData),
            employmentLicense: data.ratingTitle,
            employmentLicenseStatus: fullOption(
              data.employmentLicenseStatus,
              employmentLicenseStatusData
            ),
            activityLicenseStatus: "",
            examCertificateStatus: "",
            yearOfServices: fullOption(
              data.historyOfServiceAfterGraduation,
              yearOfServicesData
            ),
            personalCode: data.personalCode ? data.personalCode : "",
            createDate: data.createDate ? data.createDate : "",
            statusTitle: data.statusTitle,
            description: data.description,
            status: data.status,
          });
        },
      });
    } catch (e) {}
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
      getData(newMainLocations);
    }
  }, [isSuccess, data]);

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

  const { status }: any = useParams();

  return (
    <Formik
      enableReinitialize
      initialValues={initialValues}
      onSubmit={() => {}}
    >
      <>
        {getDetailsMutation.isLoading || isFetching ? (
          <>
            <FallBackSpinner />
          </>
        ) : (
          <>
            <>
              {initialValues.statusTitle && (
                <Alert color="info">{initialValues.statusTitle}</Alert>
              )}

              {initialValues.description && (
                <Alert color="info">توضیحات: {initialValues.description}</Alert>
              )}
              <Timeline
                data={[
                  {
                    title: "اطلاعات درخواست شغل",
                    color: "success",
                    icon: <User size={14} />,
                    customContent: (
                      <Row>
                        <Col md="6">
                          {/* <Row>
                                 <Col>
                                  <BasicSelectOption
                                    lableText="کشور"
                                    significant={true}
                                    name="mainLocation"
                                    placeHolder="انتخاب کنید..."
                                    data={mainLocation}
                                    isLoading={isFetching}
                                    isDisabled
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
                              </Row> */}
                          <Row>
                            <Col>
                              <BasicSelectOption
                                significant
                                placeHolder="وضعیت رتبه"
                                name="rankStatus"
                                data={rankStatusData}
                                lableText="وضیعیت رتبه"
                                isDisabled={true}
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
                                disabled={true}
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
                                isDisabled={true}
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
                          {initialValues.serviceType ? (
                            <>
                              {initialValues.serviceType.haveExam && (
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
                                isDisabled={true}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col>
                              <TextInput
                                placeholder="تاریخ ایجاد"
                                name="createDate"
                                lableText="تاریخ ایجاد"
                                disabled={true}
                              />
                            </Col>
                          </Row>
                        </Col>
                        {+status === 23 && (
                          <Col sm="6">
                            <Row>
                              <Col>
                                <TextInput
                                  placeholder="کد پرسنلی"
                                  name="personalCode"
                                  lableText="کد پرسنلی"
                                  disabled={true}
                                />
                              </Col>
                            </Row>
                          </Col>
                        )}
                      </Row>
                    ),
                  },
                  initialValues.status >=
                  JobRequestStatus.WaitingForAttachmentsAndGuarantors
                    ? {
                        title: "اطلاعات اعلان حضور",
                        // color: "#28c76f",
                        icon: <FileText size={14} />,
                        customContent: (
                          <Guarantors
                            useGetGuarantors={
                              useGetGuarantorsRequiermentOfMainLocationGuildRoomPositionRequest
                            }
                          />
                        ),
                      }
                    : {},
                  {
                    title: "تاریخچه",
                    // color: "#28c76f",
                    icon: <FileText size={14} />,
                    customContent: (
                      <>
                        <Button
                          color="primary"
                          //id="reportToggler2"
                          outline
                          onClick={() => {
                            setIsHistoryOpen(!isHistoryOpen);
                          }}
                        >
                          مشاهده تاریخچه
                        </Button>
                        <hr />

                        <Collapse
                          style={{ marginTop: "30px" }}
                          //toggler="#reportToggler2"
                          isOpen={isHistoryOpen}
                        >
                          <HistoryJobRequest isOpen={isHistoryOpen} />
                        </Collapse>
                      </>
                    ),
                  },
                ]}
              />
            </>
          </>
        )}
      </>
    </Formik>
  );
};

export { Details };
