import { Form } from "formik";
import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { JobRequestStatus } from "../../../../../../../core/enums/job-request-status";
import {
  useGetAllProvinceGuildRoomsForDropDown,
  useGetMyProvincePositionRequestDetailsById,
  usePostGetProvinceGuildRoomPosition,
} from "../../../../../../../core/services/api";
import { fullOption } from "../../../../../../../core/utils";
import { TextInput } from "../../../../../../common/Form/InputComponents/TextInputComponents/TextInput/TextInput";
import BasicSelectOption from "../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { FallBackSpinner } from "../../../../../../common/Spinner/FallBackSpinner/FallbackSpinner";

interface IPropTypes {
  values: any;
  setInitialValues: any;
}

const Details: FC<IPropTypes> = ({ setInitialValues, values }) => {
  const [province, setProvince] = useState<any>([
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
  const positionMutation = usePostGetProvinceGuildRoomPosition();
  const getDetailsMutation = useGetMyProvincePositionRequestDetailsById();

  const { req_id } = useParams<{ req_id: string }>();

  const getData = (provinceData: any) => {
    try {
      getDetailsMutation.mutate(req_id, {
        onSuccess: (val: any) => {
          const data = val.data.result;
          setInitialValues({
            province: fullOption(data.provinceId, provinceData),
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
  };

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
      getData(newProvinces);
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
    <Form>
      {getDetailsMutation.isLoading || isFetching ? (
        <>
          <FallBackSpinner />
        </>
      ) : (
        <>
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
                    lableText="وضعیت پروانه اشتغال"
                    isDisabled={
                      +status === JobRequestStatus.RejectBySecretariat
                        ? false
                        : true
                    }
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
        </>
      )}
    </Form>
  );
};

export { Details };
