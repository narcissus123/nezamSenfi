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

const IndustryHasOilConsumption: React.FC<IPropTypes> = ({ setFieldValue }) => {
  return (
    <>
      <Row>
        <Col md="6">
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="میزان مصرف روغن در سال"
                name="industryOilPerYear"
                data={[]}
                placeHolder="انتخاب کنید"
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="تعداد دفعات تعویض روغن"
                name="industryNumberOfOilChanges"
                data={[]}
                placeHolder="انتخاب کنید"
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="هزینه تعویض روغن و سرویس کامل"
                name="industryOilChangeAndFullServiceCost"
                data={[]}
                placeHolder="انتخاب کنید"
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="میزان مصرف انواع گریس و روانکارها"
                name="industryTypesOfGreasesAndLubricantsCost"
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
                lableText="میزان مصرف روغن هیدرولیک در سال"
                name="industryHydraulicOilPerYear"
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

export { IndustryHasOilConsumption };
