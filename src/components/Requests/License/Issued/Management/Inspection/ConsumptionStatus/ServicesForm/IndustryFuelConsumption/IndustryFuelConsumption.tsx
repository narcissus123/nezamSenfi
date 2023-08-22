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

const IndustryFuelConsumption: React.FC<IPropTypes> = ({ setFieldValue }) => {
  return (
    <>
      <Row>
        <Col md="6">
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="تعرفه برق مصرفی"
                name="industryElectricityTariff"
                data={[]}
                placeHolder="انتخاب کنید"
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="هزینه برق سالانه (ریال)"
                name="industryAnnualElectricityCost"
                data={[]}
                placeHolder="انتخاب کنید"
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="میزان گازوئیل مصرفی با تعرفه یارانه ای"
                name="industrySubsidizedConsumedDiesel"
                data={[]}
                placeHolder="انتخاب کنید"
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="میزان گازوئیل مصرفی با تعرفه آزاد"
                name="industryConsumedDiesel"
                data={[]}
                placeHolder="انتخاب کنید"
                significant
              />
            </Col>
          </Row>

          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="میزان نفت سفید مصرفی با تعرفه یارانه ای"
                name="industrySubsidizedConsumedKerosene"
                data={[]}
                placeHolder="انتخاب کنید"
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="میزان نفت سفید مصرفی با تعرفه آزاد"
                name="industryConsumedKerosene"
                data={[]}
                placeHolder="انتخاب کنید"
                significant
              />
            </Col>
          </Row>

          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="مرکز تامین سوخت"
                name="industryFuelSupplyCenter"
                data={[]}
                placeHolder="انتخاب کنید"
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="منبع تامین برق"
                name="industryPowerSupplyCenter"
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
                    lableText="نحوه حمل سوخت"
                    name="industryFuelTransportationType"
                    data={[]}
                    placeHolder="انتخاب کنید"
                    significant
                  />
                </Col>
              </Row>

              <Row>
                <Col md="12">
                  <BasicSelectOption
                    lableText="تعداد دفعات حمل سوخت در سال"
                    name="industryAnnualFuelTransportation"
                    data={[]}
                    placeHolder="انتخاب کنید"
                    significant
                  />
                </Col>
              </Row>

              <Row>
                <Col md="12">
                  <BasicSelectOption
                    lableText="میزان گاز مایع مصرفی با تعرفه یارانه ای"
                    name="industrySubsidizedConsumedLiquidGas"
                    data={[]}
                    placeHolder="انتخاب کنید"
                    significant
                  />
                </Col>
              </Row>
              <Row>
                <Col md="12">
                  <BasicSelectOption
                    lableText="میزان گاز مایع مصرفی با تعرفه آزاد"
                    name="industryConsumedLiquidGas"
                    data={[]}
                    placeHolder="انتخاب کنید"
                    significant
                  />
                </Col>
              </Row>

              <Row>
                <Col md="12">
                  <BasicSelectOption
                    lableText="هزینه گاز شهری مصرفی در سال"
                    name="industryAnnualGasConsumption"
                    data={[]}
                    placeHolder="انتخاب کنید"
                    significant
                  />
                </Col>
              </Row>

              <Row>
                <Col md="12">
                  <BasicSelectOption
                    lableText="تعرفه مصرف گاز شهری"
                    name="industryGasConsumptionTarrif"
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

export { IndustryFuelConsumption };
