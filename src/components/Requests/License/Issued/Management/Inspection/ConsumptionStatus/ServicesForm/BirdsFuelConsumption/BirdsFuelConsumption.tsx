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

const BirdsFuelConsumption: React.FC<IPropTypes> = ({ setFieldValue }) => {
  return (
    <>
      <Row>
        <Col md="6">
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="تعرفه برق مصرفی"
                name="birdsElectricityTariff"
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
                name="birdsAnnualElectricityCost"
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
                name="birdsSubsidizedConsumedDiesel"
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
                name="birdsConsumedDiesel"
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
                name="birdsSubsidizedConsumedKerosene"
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
                name="birdsConsumedKerosene"
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
                name="birdsFuelSupplyCenter"
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
                name="birdsPowerSupplyCenter"
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
                    name="birdsFuelTransportationType"
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
                    name="birdsAnnualFuelTransportation"
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
                    name="birdsSubsidizedConsumedLiquidGas"
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
                    name="birdsConsumedLiquidGas"
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
                    name="birdsAnnualGasConsumption"
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
                    name="birdsGasConsumptionTarrif"
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

export { BirdsFuelConsumption };
