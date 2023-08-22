import * as React from "react";
import { useState } from "react";
import { Row, Col } from "reactstrap";
import { statusTypeRequest } from "../../../../../../../core/data/status-requests.data";
import { SubmitButton } from "../../../../../../common/Form";
import BasicSelectOption from "../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";

export interface IPropsProps {
  mutation: any;
  onResetClick: () => void;
  setFieldValue: any;
}

const ListFilter: React.FC<IPropsProps> = ({
  mutation,
  onResetClick,
  setFieldValue,
}) => {
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

  return (
    <>
      <Row>
        <Col lg="3">
          <BasicSelectOption
            isClearable={true}
            lableText="وضعیت"
            name="status"
            placeHolder="انتخاب کنید..."
            data={statusTypeRequest}
            isLoading={false}
          />
        </Col>
        <Col lg="3">
          <BasicSelectOption
            isClearable={true}
            placeHolder="وضعیت رتبه"
            name="ratingStatus"
            data={rankStatusData}
            lableText="وضیعیت رتبه"
          />
        </Col>

        <Col lg="3">
          <BasicSelectOption
            isClearable={true}
            lableText="سابقه خدمت پس از تحصیل"
            name="historyOfServiceAfterGraduation"
            placeHolder="انتخاب کنید..."
            data={yearOfServicesData}
            isLoading={false}
          />
        </Col>
        <Col lg="3">
          <BasicSelectOption
            isClearable={true}
            lableText="وضعیت پروانه اشتغال"
            name="employmentLicenseStatus"
            placeHolder="انتخاب کنید..."
            data={employmentLicenseStatusData}
            isLoading={false}
          />
        </Col>
      </Row>
      <Row></Row>
      <Row>
        <Col lg="4">
          <SubmitButton
            isLoading={mutation.isLoading}
            btnText="جستجو"
            clearable
            clearableTxt="پاک کردن"
            onClear={onResetClick}
          />
        </Col>
      </Row>
    </>
  );
};

export { ListFilter };
