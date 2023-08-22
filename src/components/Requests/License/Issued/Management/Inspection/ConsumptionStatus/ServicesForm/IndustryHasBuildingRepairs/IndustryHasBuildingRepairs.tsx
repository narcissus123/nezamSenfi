import React, { useState } from "react";
import { Formik, Form } from "formik";

import {
  FieldWrapper,
  ModernDatePicker,
  MultiSelectOption,
  SubmitButton,
  TextArea,
  TextInput,
  Toggle,
} from "../../../../../../../../common/Form";

import BasicSelectOption from "../../../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { Row, Col } from "reactstrap";

interface IPropTypes {
  setFieldValue: any;
}

const IndustryHasBuildingRepairs: React.FC<IPropTypes> = ({
  setFieldValue,
}) => {
  return (
    <>
      <Row>
        <Col md="6">
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="هزینه تعمیرات ساختمان"
                name="industryBuildingRepairsCost"
                data={[]}
                placeHolder="انتخاب کنید"
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="نام ساختمان"
                name="industryBuildingName"
                data={[]}
                placeHolder="انتخاب کنید"
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="تعداد واحد"
                name="industryNumberOfUnits"
                data={[]}
                placeHolder="انتخاب کنید"
                significant
              />
            </Col>
          </Row>
        </Col>

        <Col md="6">
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="هزینه تعمیرات تاسیسات"
                name="industryFacilityRepairsCost"
                data={[]}
                placeHolder="انتخاب کنید"
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="نام تاسیسات"
                name="industryFacilityName"
                data={[]}
                placeHolder="انتخاب کنید"
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="تعداد واحد"
                name="industryFacilityNumberOfUnits"
                data={[]}
                placeHolder="انتخاب کنید"
                significant
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export { IndustryHasBuildingRepairs };
