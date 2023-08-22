import { Form } from "formik";
import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { JobRequestStatus } from "../../../../../../../core/enums/job-request-status";
import {
  useGetAllCountyGuildRoomsByProvinceIdForDropDown,
  useGetAllProvinceGuildRoomsForDropDown,
  useGetMyCountyPositionRequestDetailsById,
  usePostGetContyGuildRoomPosition,
} from "../../../../../../../core/services/api";
import { fullOption } from "../../../../../../../core/utils";
import { TextInput } from "../../../../../../common/Form/InputComponents/TextInputComponents/TextInput/TextInput";
import BasicSelectOption from "../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";

interface IPropTypes {
  values: any;
  setInitialValues: any;
}

const Details: FC<IPropTypes> = ({ values, setInitialValues }) => {
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

  const [
    employmentLicenseStatusData,
    setEmploymentLicenseStatusData,
  ] = useState<any>([
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

  const {
    data,
    isSuccess,
    isFetching,
  } = useGetAllProvinceGuildRoomsForDropDown();
  const positionMutation = usePostGetContyGuildRoomPosition();
  const countyGuildRoomsMutation = useGetAllCountyGuildRoomsByProvinceIdForDropDown();
  const getDetailsMutation = useGetMyCountyPositionRequestDetailsById();

  const { req_id } = useParams<{ req_id: string }>();

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
      getDetailsMutation.mutate(req_id, {
        onSuccess: (val: any) => {
          const data = val.data.result;
          setInitialValues({
            province: null,
            county: null,
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
            tradeUnionLicenseStatus: data.tradeUnionLicenseStatus,
            certificateExaminationStatus: data.certificateExaminationStatus,
          });
        },
      });
    } catch (e) {}
  }, []);

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

  const onSubmit = (value: any) => {
    // const PositionRequestObject: ICountyPositionRequest = {
    //   ratingStatus: value.rankStatus.value,
    //   ratingTitle: value.employmentLicense,
    //   countyGuildRoomPositionId: value.serviceType.value,
    //   historyOfServiceAfterGraduation: value.yearOfServices.value,
    //   employmentLicenseStatus: value.employmentLicenseStatus.value,
    //   certificateExaminationStatus: 0,
    //   tradeUnionLicenseStatus: 0,
    // };
    // positionRequestMutation.mutate(PositionRequestObject, {
    //   onSuccess: (val) => {
    //     const newEvent = { ...refetchEvent };
    //     newEvent.countyJobRequestList = !newEvent.countyJobRequestList;
    //     setRefetchEvent(newEvent);
    //   },
    // });
  };

  const { status }: any = useParams();

  return (
    <>
      <Form>
        <Form>
          <Row>
            <Col md="6">
              <Row>
                <Col>
                  <BasicSelectOption
                    significant
                    placeHolder="وضعیت رتبه"
                    name="rankStatus"
                    data={rankStatusData}
                    lableText="وضیعیت رتبه"
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
                    disabled={
                      +status === JobRequestStatus.RejectBySecretariat
                        ? false
                        : true
                    }
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
                    isDisabled={
                      +status === JobRequestStatus.RejectBySecretariat
                        ? false
                        : true
                    }
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
        </Form>
      </Form>
    </>
  );
};

export { Details };
