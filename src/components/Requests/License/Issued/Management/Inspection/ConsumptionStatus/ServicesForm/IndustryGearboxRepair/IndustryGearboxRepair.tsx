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

const IndustryGearboxRepair: React.FC<IPropTypes> = ({ setFieldValue }) => {
  return (
    <>
      <Row>
        <Col md="6">
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="هزینه تعمیرات جرئی گیربکس"
                name="industrySmallGearboxRepairCost"
                data={[]}
                placeHolder="انتخاب کنید"
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="تعداد دستگاه"
                name="industrySmallGearboxCount"
                data={[]}
                placeHolder="انتخاب کنید"
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="هزینه تعمیرات نیم گیربکس"
                name="industryHalfGearboxRepairCost"
                data={[]}
                placeHolder="انتخاب کنید"
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="تعداد دستگاه"
                name="industryHalfGearboxCount"
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
              <Row>
                <Col md="12">
                  <BasicSelectOption
                    lableText="هزینه تعمیرات کلی گیربکس"
                    name="industryGearboxRepairCost"
                    data={[]}
                    placeHolder="انتخاب کنید"
                    significant
                  />
                </Col>
              </Row>

              <Row>
                <Col md="12">
                  <BasicSelectOption
                    lableText="تعداد دستگاه"
                    name="industryGearboxCount"
                    data={[]}
                    placeHolder="انتخاب کنید"
                    significant
                  />
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export { IndustryGearboxRepair };
