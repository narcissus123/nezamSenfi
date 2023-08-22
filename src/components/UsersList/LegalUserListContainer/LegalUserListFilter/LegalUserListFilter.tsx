import React from "react";
import { Row, Col } from "reactstrap";
import BasicSelectOption from "../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";

import { SimpleTextInput } from "../../../common/Form";

const companyTypes = [
  {
    label: "نوع شرکت را انتخاب کنید",
    options: [
      { value: 0, label: "هیچکدام" },
      { value: 1, label: "سهامی عام" },
      { value: 2, label: "سهامی خاص" },
      { value: 3, label: "مسئولیت محدود" },
      { value: 4, label: "تضامنی" },
      { value: 5, label: "مختلط غیرسهامی" },
      { value: 6, label: "مختلط سهامی" },
      { value: 7, label: "نسبی" },
      { value: 8, label: "تعاونی" },
    ],
  },
];

export interface IPropsProps {
  resetFilter?: () => void;
}

const LegalUserListFilter: React.FC<IPropsProps> = ({ resetFilter }) => {
  return (
    <>
      <Row>
        <Col lg="2">
          <SimpleTextInput lableText="نام" name="name" placeholder="نام" />
        </Col>
        <Col lg="2">
          <SimpleTextInput
            lableText="شناسه ملی"
            name="nationalId"
            placeholder="شناسه ملی"
          />
        </Col>
        <Col lg="2">
          <SimpleTextInput lableText="ایمیل" name="email" placeholder="ایمیل" />
        </Col>
        <Col lg="3">
          <SimpleTextInput
            lableText="کد اقتصادی"
            name="economicCode"
            placeholder="کد اقتصادی"
          />
        </Col>
        <Col lg="3">
          <BasicSelectOption
            name="companyType"
            lableText="نوع شرکت"
            placeHolder="انتخاب کنید..."
            data={companyTypes}
          />
        </Col>
      </Row>
    </>
  );
};

export { LegalUserListFilter };
