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

const BirdsForageConsumption: React.FC<IPropTypes> = ({ setFieldValue }) => {
  return (
    <>
      <Row>
        <Col md="6">
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="میزان مصرف گندم"
                name="birdsWheatConsumption"
                data={[]}
                placeHolder="انتخاب کنید ..."
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="میزان مصرف جو"
                name="birdsGrainConsumption"
                data={[]}
                placeHolder="انتخاب کنید ..."
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="میزان مصرف ذرت"
                name="birdsCornConsumption"
                data={[]}
                placeHolder="انتخاب کنید ..."
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="میزان مصرف سویا"
                name="birdsSoyConsumption"
                data={[]}
                placeHolder="انتخاب کنید ..."
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="میزان مصرف انواع کنجاله"
                name="birdsOilCakeConsumption"
                data={[]}
                placeHolder="انتخاب کنید ..."
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="میزان مصرف سبوس گندم"
                name="birdsWheatBranConsumption"
                data={[]}
                placeHolder="انتخاب کنید ..."
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="میزان مصرف سبوس برنچ"
                name="birdsRiceBranConsumption"
                data={[]}
                placeHolder="انتخاب کنید ..."
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="میزان مصرف سایر غلات"
                name="birdsOtherCerealsConsumption"
                data={[]}
                placeHolder="انتخاب کنید ..."
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="میزان مصرف گندم"
                name="birdsWheatConsumption"
                data={[]}
                placeHolder="انتخاب کنید ..."
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="مرکز تامین نهاده ها"
                name="birdsForageSupplyCenter"
                data={[]}
                placeHolder="انتخاب کنید ..."
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="میزان مصرف کنسانتره"
                name="birdsConcentrateConsumption"
                data={[]}
                placeHolder="انتخاب کنید ..."
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="مرکز تامین کنسانتره ها"
                name="birdsConcentrateSupplyCenter"
                data={[]}
                placeHolder="انتخاب کنید ..."
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="میزان مصرف نهاد ها با نرخ یارانه ای"
                name="birdsForageConsumptionSubsidyRate"
                data={[]}
                placeHolder="انتخاب کنید ..."
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="مرکز تامین نهاده یارانه ای"
                name="birdsForageSubsidySupplyCenter"
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
                lableText="میزان مصرف علوفه خشک"
                name="birdsDryForageConsumption"
                data={[]}
                placeHolder="انتخاب کنید ..."
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText=" نام علوفه خشک"
                name="DryForageName"
                data={[]}
                placeHolder="انتخاب کنید ..."
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="میزان مصرف علوفه تازه"
                name="FreshForageConsumption"
                data={[]}
                placeHolder="انتخاب کنید ..."
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="نام علوفه تازه"
                name="FreshForageName"
                data={[]}
                placeHolder="انتخاب کنید ..."
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="مرکز تامین علوفه خشک"
                name="DryForageSupplyCenter"
                data={[]}
                placeHolder="انتخاب کنید ..."
                significant
              />
            </Col>
          </Row>
          <Row>
            <Col md="12">
              <BasicSelectOption
                lableText="مرکز تامین علوفه تازه"
                name="FreshForageSupplyCenter"
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

export { BirdsForageConsumption };
