import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";

import {
  SubmitButton,
  TextInput,
} from "../../../../../../../../common/Form";

import BasicSelectOption from "../../../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { Row, Col } from "reactstrap";
import { FullOptionSel, OptionRow, OptionRowSel } from "../../../../../../../../../core/models";
import { useGetAllConsumptionForDropDown2, useGetOilUsedAmount, useGetSelcetOptionOfEnum } from "../../../../../../../../../core/services/api";
import { useParams } from "react-router-dom";
import { ToastTypes } from "../../../../../../../../../core/enums";
import { showToast } from "../../../../../../../../../core/utils";
import { ElectricityRepairsValidate } from "../../../../../../../../../core/validations/electrisity-repairs.validations";
import { LubricantConsumptionValidate } from "../../../../../../../../../core/validations/lubricant-consumption.validations";
import { getCost } from "../../../../../../../../../core/utils/get-cost.utils";

interface IPropTypes {
  setMutation: any;
  parentData: any;
  id: number | undefined;
  useGetMutation: any;
}

const LubricantConsumption: React.FC<IPropTypes> = ({
  setMutation,
  parentData,
  id = 0,
  useGetMutation,
}) => {

  const [initialValues, setInitialValues] = useState<any>({
    oilUseAmount: null,
    oilUseAmountRange: null,
    oilChangeCount: null,
    graceUseAmount: null,
    graceUseAmountRange: null,
    hydraulicOilUseAmount: null,
    hydraulicOilUseAmountRange: null,
    oilChangeCostId: null,
  });

  const [costData, setCostData] = useState<FullOptionSel[]>([
    { label: "انتخاب کنید ...", options: [] },
  ]);

  const getOilUsedAmount = useGetOilUsedAmount();
  const getGraceUsedAmount = useGetOilUsedAmount();
  const getHydraulicUsedAmount = useGetOilUsedAmount();
  const getOilEnum = useGetSelcetOptionOfEnum();

  const getCosts = useGetAllConsumptionForDropDown2();
  useEffect(()=>{
    getCosts.mutate(6);
  },[])

  const [rangeData, setRangeData] = useState<FullOptionSel[]>([
    { label: "انتخاب کنید ...", options: [] },
  ]);

  const [oilUseAmountData, setOilUseAmountData] = useState<
    FullOptionSel[]
  >([{ label: "انتخاب کنید ...", options: [] }]);

  const [graceUseAmountData, setGraceUseAmountData] = useState<
    FullOptionSel[]
  >([{ label: "انتخاب کنید ...", options: [] }]);
  const [hydraulicOilUseAmountData, setHydraulicOilUseAmountData] = useState<
    FullOptionSel[]
  >([{ label: "انتخاب کنید ...", options: [] }]);

  useEffect(() => {
    if (getCosts.isSuccess) {
      const result = getCosts.data?.data.result;
      console.log(result);
      let gasCost: FullOptionSel[] = [{ label: "انتخاب کنید...", options: [] }];

      result.forEach((item: any) => {
        gasCost[0].options.push({
          value: item.id,
          label: getCost(item),
        });
      });
      setCostData(gasCost);
    }
  }, [getCosts.isSuccess]);

  useEffect(() => {
    getOilEnum.mutate("OilUsedAmountEnum", {
      onSuccess: (val) => {
        try {
          let newEnumList: FullOptionSel[] = [
            { label: "انتخاب کنید...", options: [] },
          ];

          val.data.result.forEach((item: OptionRow) => {
            newEnumList[0].options.push({ value: +item.id, label: item.title });
          });

          setRangeData(newEnumList);
        } catch (error) {}
      },
    });
  }, []);

  const onOilConsumptionChange = (opt: OptionRowSel, setFieldValue: any) => {
    setFieldValue("oilUseAmountRange", opt);

    setFieldValue("OilUsedAmountEnum", null);
    getOilUsedAmount.mutate(opt.value, {
      onSuccess: (val) => {
        const result = val.data.result;
        let newList: FullOptionSel[] = [
          { label: "انتخاب کنید...", options: [] },
        ];

        result.forEach((item: number) => {
          newList[0].options.push({
            value: item,
            label: item + " لیتر",
          });
        });

        setOilUseAmountData(newList);
      },
    });
  };

    const onGraceConsumptionChange = (opt: OptionRowSel, setFieldValue: any) => {
      setFieldValue("graceUseAmountRange", opt);

      setFieldValue("graceUseAmount", null);
      getGraceUsedAmount.mutate(opt.value, {
        onSuccess: (val) => {
          const result = val.data.result;
          let newList: FullOptionSel[] = [
            { label: "انتخاب کنید...", options: [] },
          ];

          result.forEach((item: number) => {
            newList[0].options.push({
              value: item,
              label: item + " لیتر",
            });
          });

          setGraceUseAmountData(newList);
        },
      });
    };

    const onHydraulicConsumptionChange = (opt: OptionRowSel, setFieldValue: any) => {
      setFieldValue("hydraulicOilUseAmountRange", opt);

      setFieldValue("hydraulicOilUseAmount", null);
      getHydraulicUsedAmount.mutate(opt.value, {
        onSuccess: (val) => {
          const result = val.data.result;
          let newList: FullOptionSel[] = [
            { label: "انتخاب کنید...", options: [] },
          ];

          result.forEach((item: number) => {
            newList[0].options.push({
              value: item,
              label: item + " لیتر",
            });
          });

          setHydraulicOilUseAmountData(newList);
        },
      });
    };

  const getDetailMutation = useGetMutation();

  useEffect(() => {
    if (id && id !== 0) {
      getDetailMutation.mutate(id, {
        onSuccess: (val: any) => {
          const result = val.data.result;

          setInitialValues({
            oilUseAmount: {
              value: result.oilUseAmount,
              label: result.oilUseAmount + " لیتر ",
            },
            oilChangeCount: result.oilChangeCount,
            graceUseAmount: {
              value: result.graceUseAmount,
              label: result.graceUseAmount + " لیتر",
            },
            hydraulicOilUseAmount: {
              value: result.hydraulicOilUseAmount,
              label: result.hydraulicOilUseAmount + " لیتر ",
            },
            oilChangeCostId: {
              value: result.oilChangeCostId,
              label: result.oilChangeCostTitle,
            },
          });
        },
      });
    }
  }, [id]);

  // useEffect(() => {
  //   if (getCosts.isSuccess) {
  //     const result = getCosts.data?.data.result;
  //     console.log(result);
  //     let gasCost: FullOptionSel[] = [{ label: "انتخاب کنید...", options: [] }];

  //     result.forEach((item: any) => {
  //       gasCost[0].options.push({
  //         value: item.id,
  //         label: `${
  //           item.oprator === 4
  //             ? `مابین ${item.from1} تا ${item.from2}`
  //             : item.oprator === 3
  //             ? `${item.from1} کوچکتر از ${item.form2}`
  //             : item.oprator === 2
  //             ? `${item.from1} بزرگتر از ${item.from2}`
  //             : item.oprator === 1
  //             ? `${item.from1} مساوی با ${item.from2}`
  //             : `مابین ${item.from1} تا ${item.from2}`
  //         } `,
  //       });
  //     });
  //     setCostData(gasCost);
  //   }
  // }, [getCosts.isSuccess]);

  const setFormMutation = setMutation();

  const { section_id } = useParams<{ section_id: string }>();

  const onSubmit = (value: any) => {
    const setLubricantObj = {
      productionFactorId: parentData.productionFactor.value,
      sectionId: +section_id,
      year: parentData.productionYear.value,
      activityRate: parentData.activityTime,
      lubricantConsumption: {
        oilUseAmount: value.oilUseAmount.value,
        oilChangeCount: value.oilChangeCount,
        graceUseAmount: value.graceUseAmount.value,
        hydraulicOilUseAmount: value.hydraulicOilUseAmount.value,
        oilChangeCostId: value.oilChangeCostId.value,
      },
    };

    setFormMutation.mutate(setLubricantObj, {
      onSuccess: () => {
        showToast(["با موفقیت انجام شد"], ToastTypes.success);
      },
    });
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={LubricantConsumptionValidate}
        enableReinitialize
      >
        {({ values, setFieldValue }) => {
          return (
            <Row>
              <Col md="12">
                <Form>
                  <Row>
                    <Col md="6">
                      <Row>
                        <Col md="12">
                          <BasicSelectOption
                            lableText="بازه مصرف روغن در سال"
                            name="oilUseAmountRange"
                            data={rangeData}
                            isLoading={getOilEnum.isLoading}
                            onChange={(opt) =>
                              onOilConsumptionChange(opt, setFieldValue)
                            }
                            placeHolder="انتخاب کنید"
                            significant
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <BasicSelectOption
                            lableText="میزان مصرف روغن در سال"
                            name="oilUseAmount"
                            data={oilUseAmountData}
                            isLoading={getOilUsedAmount.isLoading}
                            placeHolder="انتخاب کنید"
                            significant
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <TextInput
                            id="oilChangeCount"
                            lableText="تعداد دفعات تعویض روغن"
                            name="oilChangeCount"
                            placeholder="عدد وارد کنید ..."
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <BasicSelectOption
                            lableText="هزینه تعویض روغن و سرویس کامل"
                            name="oilChangeCostId"
                            isLoading={getCosts.isLoading}
                            data={costData}
                            placeHolder="انتخاب کنید"
                            significant
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <BasicSelectOption
                            lableText="بازه مصرف انواع گریس و روانکارها"
                            name="graceUseAmountRange"
                            data={rangeData}
                            onChange={(opt) =>
                              onGraceConsumptionChange(opt, setFieldValue)
                            }
                            placeHolder="انتخاب کنید"
                            significant
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <BasicSelectOption
                            lableText="میزان مصرف انواع گریس و روانکارها"
                            name="graceUseAmount"
                            data={graceUseAmountData}
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
                            lableText="بازه مصرف روغن هیدرولیک در سال"
                            name="hydraulicOilUseAmountRange"
                            onChange={(opt) =>
                              onHydraulicConsumptionChange(opt, setFieldValue)
                            }
                            data={rangeData}
                            placeHolder="انتخاب کنید"
                            significant
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <BasicSelectOption
                            lableText="میزان مصرف روغن هیدرولیک در سال"
                            name="hydraulicOilUseAmount"
                            data={hydraulicOilUseAmountData}
                            placeHolder="انتخاب کنید"
                            significant
                          />
                        </Col>
                      </Row>
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <SubmitButton
                        isLoading={setFormMutation.isLoading}
                        btnText="ثبت"
                        values={values}
                        schema={LubricantConsumptionValidate}
                      />
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          );
        }}
      </Formik>
    </>
  );
};

export { LubricantConsumption };
