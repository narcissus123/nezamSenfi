import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";

import {
  FieldWrapper,
  FormDivider,
  ModernDatePicker,
  MultiSelectOption,
  SubmitButton,
  TextArea,
  TextInput,
  Toggle,
} from "../../../../../../../../common/Form";

import BasicSelectOption from "../../../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { Row, Col, CardBody } from "reactstrap";
import { FullOptionSel } from "../../../../../../../../../core/models";
import { useGetAllConsumptionForDropDown2, useGetConsumptionCostForDropDownById } from "../../../../../../../../../core/services/api";
import { checkConsumptionExistsInData, showToast } from "../../../../../../../../../core/utils";
import { createConsumptionValueLabel } from "../../../../../../../../../core/utils/create-consumption-value-label.utils";
import { TireConsumptionValidate } from "../../../../../../../../../core/validations/tire-consumption.validations";
import { ToastTypes } from "../../../../../../../../../core/enums";
import { useParams } from "react-router-dom";
import { getCost } from "../../../../../../../../../core/utils/get-cost.utils";

interface IPropTypes {
  setFieldValue:any,
  setMutation: any;
  parentData: any;
  id: number | undefined;
  useGetMutation: any;
  isExpert: boolean
}

const IndustryHasTireDepreciation: React.FC<IPropTypes> = ({
  isExpert,
  setFieldValue,
  setMutation,
  parentData,
  id = 0,
  useGetMutation,
}) => {



  const setFormMutation = setMutation();

  const [initialValues, setInitialValues] = useState<any>({
    bigTireUseAmount: 0,
    bigTireCostId: 0,
    smallTireUseAmount: 0,
    smallTireCostId: 0,
    sheniTireUseAmount: 0,
    sheniTireCostId: 0,
    motionStrapUseAmount: 0,
    motionStrapCostId: 0,
    otherStrapUseAmount: 0,
    otherStrapCostId: 0,
  });

  let useData: FullOptionSel[] = [{ label: "انتخاب کنید ...", options: [] }];
  let optionsArray = []

  for(let i=0 ; i <= 100 ; i++ ){
    optionsArray.push({ value: i, label: i.toString() });
  }

  useData[0].options = optionsArray;


  const [tireCost, settireCost] = useState<FullOptionSel[]>([]);
  const gettireCost = useGetAllConsumptionForDropDown2();
  useEffect(() => {
    gettireCost.mutate(7);
  }, []);
  const getTireCostOfConsomptionIdMutation = useGetConsumptionCostForDropDownById();

  const getTireDetail = useGetMutation();
  const { section_id } = useParams<{ section_id: string }>();

  useEffect(() => {
    if (id && id !== 0) {
      getTireDetail.mutate(id, {
        onSuccess: (val: any) => {
          const result = val.data.result;
          if (
            tireCost &&
            tireCost[0].options &&
            tireCost[0].options.length > 0
          ) {
            if (!checkConsumptionExistsInData(result.bigTireCostId, tireCost)) {
              getTireCostOfConsomptionIdMutation.mutate(result.bigTireCostId, {
                onSuccess: (val: any) => {
                  let data = val.data.result;
                  setInitialValues((old: any) => ({
                    ...old,
                    bigTireCostId: createConsumptionValueLabel(data),
                  }));
                },
              });
            }
            if (
              !checkConsumptionExistsInData(result.smallTireCostId, tireCost)
            ) {
              getTireCostOfConsomptionIdMutation.mutate(
                result.smallTireCostId,
                {
                  onSuccess: (val: any) => {
                    let data = val.data.result;
                    setInitialValues((old: any) => ({
                      ...old,
                      smallTireCostId: createConsumptionValueLabel(data),
                    }));
                  },
                }
              );
            }
            if (
              !checkConsumptionExistsInData(result.sheniTireCostId, tireCost)
            ) {
              getTireCostOfConsomptionIdMutation.mutate(
                result.sheniTireCostId,
                {
                  onSuccess: (val: any) => {
                    let data = val.data.result;
                    setInitialValues((old: any) => ({
                      ...old,
                      sheniTireCostId: createConsumptionValueLabel(data),
                    }));
                  },
                }
              );
            }
            if (
              !checkConsumptionExistsInData(result.motionStrapCostId, tireCost)
            ) {
              getTireCostOfConsomptionIdMutation.mutate(
                result.motionStrapCostId,
                {
                  onSuccess: (val: any) => {
                    let data = val.data.result;
                    setInitialValues((old: any) => ({
                      ...old,
                      motionStrapCostId: createConsumptionValueLabel(data),
                    }));
                  },
                }
              );
            }
            if (
              !checkConsumptionExistsInData(result.otherStrapCostId, tireCost)
            ) {
              getTireCostOfConsomptionIdMutation.mutate(
                result.otherStrapCostId,
                {
                  onSuccess: (val: any) => {
                    let data = val.data.result;
                    setInitialValues((old: any) => ({
                      ...old,
                      otherStrapCostId: createConsumptionValueLabel(data),
                    }));
                  },
                }
              );
            }
          }
 
          setInitialValues({
            bigTireUseAmount: {
              value: result.bigTireUseAmount,
              label: result.bigTireUseAmount.toString(),
            },
            bigTireCostId: { value: result.bigTireCostId, label: "" },
            smallTireUseAmount: {
              value: result.smallTireUseAmount,
              label: result.smallTireUseAmount.toString(),
            },
            smallTireCostId: { value: result.smallTireCostId, label: "" },
            sheniTireUseAmount: {
              value: result.sheniTireUseAmount,
              label: result.sheniTireUseAmount.toString(),
            },
            sheniTireCostId: { value: result.sheniTireCostId, label: "" },
            motionStrapUseAmount: {
              value: result.motionStrapUseAmount,
              label: result.motionStrapUseAmount.toString(),
            },
            motionStrapCostId: { value: result.motionStrapCostId, label: "" },
            otherStrapUseAmount: {
              value: result.otherStrapUseAmount,
              label: result.otherStrapUseAmount.toString(),
            },
            otherStrapCostId: { value: result.otherStrapCostId, label: "" },
          });

        },
      });
    }
  }, [id, tireCost]);


  useEffect(() => {
    if (gettireCost.isSuccess) {
      const result = gettireCost.data?.data.result;
      let tireCosts: FullOptionSel[] = [{ label: "انتخاب کنید...", options: [] }];

      result.forEach((item: any) => {
        tireCosts[0].options.push({
          value: item.id,
          label: getCost(item),
        });
      });
      settireCost(tireCosts);
    }
  }, [gettireCost.isSuccess]);

  const onSubmit = (value: any) => {
    const setTireObj = {
      productionFactorId: parentData.productionFactor.value,
      sectionId: +section_id,
      year: parentData.productionYear.value,
      activityRate: parentData.activityTime,
      tireConsumption: {
        bigTireUseAmount: value.bigTireUseAmount.value,
        bigTireCostId: value.bigTireCostId.value,
        smallTireUseAmount: value.smallTireUseAmount.value,
        smallTireCostId: value.smallTireCostId.value,
        sheniTireUseAmount: value.sheniTireUseAmount.value,
        sheniTireCostId: value.sheniTireCostId.value,
        motionStrapUseAmount: value.motionStrapUseAmount.value,
        motionStrapCostId: value.motionStrapCostId.value,
        otherStrapUseAmount: value.otherStrapUseAmount.value,
        otherStrapCostId: value.otherStrapCostId.value,
      },
    };

    setFormMutation.mutate(setTireObj, {
      onSuccess: () => {
        showToast(["با موفقیت انجام شد"], ToastTypes.success);
      },
    });

  }

  return (
    <>
      <CardBody>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={TireConsumptionValidate}
          enableReinitialize
        >
          {({ values, setFieldValue }) => {
            return (
              <Form>
                <Row>
                  <Col md="6">
                    <Row>
                      <Col md="12">
                        <BasicSelectOption
                          lableText="میزان مصرف لاستیک سایز بزرگ"
                          name="bigTireUseAmount"
                          data={useData}
                          placeHolder="انتخاب کنید"
                          significant
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <BasicSelectOption
                          lableText="هزینه مصرف لاستیک سایز بزرگ"
                          name="bigTireCostId"
                          data={tireCost}
                          placeHolder="انتخاب کنید"
                          significant
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <BasicSelectOption
                          lableText="میزان مصرف لاستیک سایز کوچیک"
                          name="smallTireUseAmount"
                          data={useData}
                          placeHolder="انتخاب کنید"
                          significant
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <BasicSelectOption
                          lableText="هزینه مصرف لاستیک سایز کوچیک"
                          name="smallTireCostId"
                          data={tireCost}
                          placeHolder="انتخاب کنید"
                          significant
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <BasicSelectOption
                          lableText="میزان مصرف شنی"
                          name="sheniTireUseAmount"
                          data={useData}
                          placeHolder="انتخاب کنید"
                          significant
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <BasicSelectOption
                          lableText="هزینه مصرف شنی"
                          name="sheniTireCostId"
                          data={tireCost}
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
                          lableText="میزان مصرف تسمه حرکت"
                          name="motionStrapUseAmount"
                          data={useData}
                          placeHolder="انتخاب کنید"
                          significant
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <BasicSelectOption
                          lableText="هزینه مصرف تسمه حرکت"
                          name="motionStrapCostId"
                          data={tireCost}
                          placeHolder="انتخاب کنید"
                          significant
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <BasicSelectOption
                          lableText="میزان مصرف انواع تسمه"
                          name="otherStrapUseAmount"
                          data={useData}
                          placeHolder="انتخاب کنید"
                          significant
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <BasicSelectOption
                          lableText="هزینه مصرف انواع تسمه"
                          name="otherStrapCostId"
                          data={tireCost}
                          placeHolder="انتخاب کنید"
                          significant
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
                {isExpert && (
                  <SubmitButton
                    isLoading={setFormMutation.isLoading}
                    btnText="ثبت"
                    values={values}
                    schema={TireConsumptionValidate}
                  />
                )}
              </Form>
            );
          }}
        </Formik>
      </CardBody>
    </>
  );
};

export { IndustryHasTireDepreciation };
