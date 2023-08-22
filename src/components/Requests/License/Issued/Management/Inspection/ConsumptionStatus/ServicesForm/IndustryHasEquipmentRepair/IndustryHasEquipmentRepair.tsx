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

const IndustryHasEquipmentRepair: React.FC<IPropTypes> = ({
  setFieldValue,
}) => {
  return (
    <>
      <Row>
        <Col md="6">
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="هزینه تعمیر تجهیزات متحرک"
                name="industryRepairOfMobileEquipmentCost"
                data={[]}
                placeHolder="انتخاب کنید"
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="نام تجهیزات"
                name="industryMobileEquipmentName"
                data={[]}
                placeHolder="انتخاب کنید"
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="تعداد تجهیزات"
                name="industryNumberOfMobileEquipment"
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
                lableText="هزینه تعمیر تجهیزات ثابت"
                name="industryFixedEquipmentRepairCost"
                data={[]}
                placeHolder="انتخاب کنید"
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="نام تجهیزات"
                name="industryFixedEquipmentName"
                data={[]}
                placeHolder="انتخاب کنید"
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="تعداد تجهیزات"
                name="industryNumberOfFixedEquipment"
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

export { IndustryHasEquipmentRepair };
