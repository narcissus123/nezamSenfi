import * as React from "react";
import { useState } from "react";
import { Row, Col } from "reactstrap";
import {
  ModernDatePicker,
  SubmitButton,
  TextInput,
} from "../../../../../../../common/Form";

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
        <Col lg="4">
          <TextInput
            name="organizationTitle"
            placeholder="نام سازمان را وارد کنید"
            hasLabel
            lableText="نام سازمان"
          />
        </Col>
        <Col lg="4">
          <ModernDatePicker
            lableText="تاریخ شروع"
            name="startDate"
            hasMaximum
            placeholder="تاریخ شروع را وارد کنید"
          />
        </Col>

        <Col lg="4">
          <ModernDatePicker
            lableText="تاریخ پایان"
            name="endDate"
            hasMaximum
            placeholder="تاریخ پایان را وارد کنید"
          />
        </Col>
      </Row>
      <Row></Row>
      <Row>
        <Col lg="4">
          <SubmitButton
            isLoading={mutation && mutation.isLoading}
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
