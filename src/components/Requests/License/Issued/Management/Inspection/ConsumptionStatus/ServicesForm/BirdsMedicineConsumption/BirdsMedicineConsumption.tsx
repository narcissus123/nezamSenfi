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

const BirdsMedicineConsumption: React.FC<IPropTypes> = ({ setFieldValue }) => {
  return (
    <>
      <Row>
        <Col md="6">
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="میزان مصرف کلسیم خوراکی"
                name="birdsCalciumConsumption"
                data={[]}
                placeHolder="انتخاب کنید ..."
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="میزان مصرف نمک"
                name="birdsSaltConsumption"
                data={[]}
                placeHolder="انتخاب کنید ..."
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="میزان مصرف ملاس"
                name="birdsMolassesConsumption"
                data={[]}
                placeHolder="انتخاب کنید ..."
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="نام ملاس"
                name="birdsMolassesName"
                data={[]}
                placeHolder="انتخاب کنید ..."
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="میزان مصرف اسید چرب"
                name="birdsFattyAcidConsumption"
                data={[]}
                placeHolder="انتخاب کنید ..."
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="میزان مصرف روغن نباتی"
                name="birdsVegetableOilConsumption"
                data={[]}
                placeHolder="انتخاب کنید ..."
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="میزان مصرف انواع تقویتی خوراکی"
                name="birdsOralBoosterConsumption"
                data={[]}
                placeHolder="انتخاب کنید ..."
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="نام تقویتی خوراکی مصرفی"
                name="birdsOralBoosterName"
                data={[]}
                placeHolder="انتخاب کنید ..."
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="میزان مصرف انواع تقویتی خوراکی"
                name="birdsInjectableBoosterConsumption"
                data={[]}
                placeHolder="انتخاب کنید ..."
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="نام تقویتی تزریقی مصرفی"
                name="birdsInjectableBoosterName"
                data={[]}
                placeHolder="انتخاب کنید ..."
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="میزان سرم مصرفی"
                name="birdsSerumConsumption"
                data={[]}
                placeHolder="انتخاب کنید ..."
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="مرکز تهیه انواع مکمل ها"
                name="birdsComplementSupplyCenter"
                data={[]}
                placeHolder="انتخاب کنید ..."
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="مرکز تهیه انواع تقویتی ها و داروها"
                name="birdsBoostersSupplyCenter"
                data={[]}
                placeHolder="انتخاب کنید ..."
                significant
              />
            </Col>
          </Row>
        </Col>

        <Col md="6">
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="میزان مصرف سموم ضد عفونی روی دام"
                name="birdsDisinfectantsConsumption"
                data={[]}
                placeHolder="انتخاب کنید ..."
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="نام سم یا محلول ضد عفونی مصرفی روی دام"
                name="birdsDisinfectantsName"
                data={[]}
                placeHolder="انتخاب کنید ..."
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="میزان مصرف سموم ضد عفونی محیط"
                name="birdsAreaPoisonsConsumption"
                data={[]}
                placeHolder="انتخاب کنید ..."
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="نام سم مصرفی ضد عفونی محیط"
                name="birdsAreaPoisonsName"
                data={[]}
                placeHolder="انتخاب کنید ..."
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="مرکز تهیه انواع سموم"
                name="birdsPoisonsSupplyCenter"
                data={[]}
                placeHolder="انتخاب کنید ..."
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="میزان مصرف آهک"
                name="birdsLimeConsumption"
                data={[]}
                placeHolder="انتخاب کنید ..."
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="مرکز تامین آهک"
                name="birdsLimeSupplyCenter"
                data={[]}
                placeHolder="انتخاب کنید ..."
                significant
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export { BirdsMedicineConsumption };
