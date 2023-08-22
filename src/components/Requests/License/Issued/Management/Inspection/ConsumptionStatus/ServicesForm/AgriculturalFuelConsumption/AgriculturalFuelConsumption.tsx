import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CardBody, Col, Row } from "reactstrap";
import { ToastTypes } from "../../../../../../../../../core/enums";
import { FullOptionSel } from "../../../../../../../../../core/models";
import {
  useGetAllConsumptionForDropDown2,
  useGetConsumptionCostForDropDownById,
  useGetSelcetOptionOfEnum,
} from "../../../../../../../../../core/services/api";
import { checkConsumptionExistsInData, showToast } from "../../../../../../../../../core/utils";
import { createConsumptionValueLabel } from "../../../../../../../../../core/utils/create-consumption-value-label.utils";
import { getCost } from "../../../../../../../../../core/utils/get-cost.utils";
import { AgricultureEnergyConsumption } from "../../../../../../../../../core/validations/agriculture-energy-consumption.validations";
import { FormDivider, SubmitButton } from "../../../../../../../../common/Form";
import BasicSelectOption from "../../../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";

interface IPropTypes {
  parentData: any;
  setMutation: any;
  id: number | undefined;
  useGetMutation: any;
  isExpert: boolean;
}

const AgriculturalFuelConsumption: React.FC<IPropTypes> = ({
  parentData,
  setMutation,
  id = 0,
  useGetMutation,
  isExpert,
}) => {


  const getElectricityCost = useGetAllConsumptionForDropDown2();
  useEffect(() => {
    getElectricityCost.mutate(2);
  }, []);

  const getGasCost = useGetAllConsumptionForDropDown2();
  useEffect(()=>{
    getGasCost.mutate(3);
  },[])

  const getEnergyDetail = useGetMutation();

  const [initialValues, setInitialValues] = useState<any>({
    electricityPricesEnum: null,
    theAmountOfFuleSuppliedGasolineSubsidy: null,
    theAmountOfFuleSuppliedGasolineFree: null,
    theAmountOfFuleSuppliedKeroseneSubsidy: null,
    theAmountOfFuleSuppliedKeroseneFree: null,
    fuelSupplyCenterEnum: null,
    electricitySupplyCenterEnum: null,
    usedElectricityPowerEnum: null,
    howToTransportFuelEnum: null,
    transferFuelCountEnum: null,
    liquidGasUseEnumSubsidy: null,
    liquidGasUseEnumFree: null,
    cityGasPricesEnum: null,
    electrictyCostOfConsomptionId: null,
    gasCityCostOfConsomptionId: null,
  });

  const [annualElectricityCostData, setAnnualElectricityCostData] = useState<
    FullOptionSel[]
  >([{ label: "انتخاب کنید...", options: [] }]);
  const [annualGasCostData, setAnnualGasCostData] = useState<FullOptionSel[]>([
    { label: "انتخاب کنید...", options: [] },
  ]);

  const [LiquidGasUseEnumData, setLiquidGasUseEnumData] = useState<
    FullOptionSel[]
  >([{ label: "انتخاب کنید...", options: [] }]);
  const [TheAmountOfFuleSuppliedEnumData, setTheAmountOfFuleSuppliedEnumData] =
    useState<FullOptionSel[]>([{ label: "انتخاب کنید...", options: [] }]);

  const electricityTariffData: FullOptionSel[] = [
    {
      label: "انتخاب کنید...",
      options: [
        { value: 1, label: "خانگی" },
        { value: 2, label: "کشاورزی" },
        { value: 3, label: "آزاد" },
        { value: 4, label: "صنعت و خدمات" },
      ],
    },
  ];

  const fuelSupplyCenterData: FullOptionSel[] = [
    {
      label: "انتخاب کنید...",
      options: [
        { value: 1, label: "پمپ بنزین عمومی" },
        { value: 2, label: "شرکت تعاونی روستایی" },
        { value: 3, label: " (خصوصی)جایگاه توزیع سوخت کشاورزی در روستا / شهر" },
      ],
    },
  ];

  const powerSupplyCenterData: FullOptionSel[] = [
    {
      label: "انتخاب کنید...",
      options: [
        { value: 1, label: "موتور برق دیزل" },
        { value: 2, label: "برق شهر / روستا" },
        { value: 3, label: "برق انرژی پاک / انرژی خورشیدی" },
        { value: 4, label: "فانوس" },
      ],
    },
  ];

  const fuelTransportationTypeData: FullOptionSel[] = [
    {
      label: "انتخاب کنید...",
      options: [
        { value: 1, label: "پیمانکاری حمل سوخت" },
        { value: 2, label: "تراکتور و حمل سوخت کرایه ای" },
        { value: 3, label: "تراکتور و حمل سوخت مالکیتی" },
        { value: 4, label: "تیلر و حمل سوخت کرایه ای" },
        { value: 5, label: "تیلر و حمل سوخت مالکیتی" },
      ],
    },
  ];

  const annualFuelTransportationData: FullOptionSel[] = [
    {
      label: "انتخاب کنید...",
      options: [
        { value: 1, label: "1 مرحله " },
        { value: 2, label: "2 مرحله " },
        { value: 3, label: "3 مرحله " },
        { value: 4, label: "4 مرحله " },
        { value: 5, label: "5 مرحله " },
        { value: 6, label: "6 مرحله " },
        { value: 7, label: "7 مرحله " },
        { value: 8, label: "8 مرحله " },
        { value: 9, label: "9 مرحله " },
        { value: 10, label: "10 مرحله " },
        { value: 11, label: "روزانه" },
        { value: 12, label: "هفتگی" },
        { value: 13, label: "ماهانه" },
        { value: 14, label: "فصلی" },
      ],
    },
  ];

  const UsedElectricityPowerEnumData: FullOptionSel[] = [
    {
      label: "انتخاب کنید...",
      options: [
        { value: 1, label: "تک فاز 25 امپر" },
        { value: 2, label: "تک فاز 32 امپر" },
        { value: 3, label: "تک فاز 64 امپر" },
        { value: 4, label: "سه فاز 25 امپر" },
        { value: 5, label: "سه فاز 32 امپر" },
        { value: 6, label: "سه فاز 64 امپر" },
        { value: 7, label: "25 کیلو ولت آمپز (20 کیلو وات)" },
        { value: 8, label: "50 کیلو ولت آمپز (40 کیلو وات)" },
        { value: 9, label: "100 کیلو ولت آمپز (80 کیلو وات)" },
        { value: 10, label: "250 کیلو ولت آمپز (200 کیلو وات)" },
        { value: 11, label: "315 کیلو ولت آمپز (250 کیلو وات)" },
      ],
    },
  ];

  const getElectrictyCostOfConsomptionIdMutation = useGetConsumptionCostForDropDownById();
  const getGasCityCostOfConsomptionIdMutation = useGetConsumptionCostForDropDownById();


  useEffect(() => {
    if (id && id !== 0) {
      getEnergyDetail.mutate(id, {
        onSuccess: (val: any) => {
          const result = val.data.result;
          if (annualGasCostData && annualGasCostData[0].options && annualGasCostData[0].options.length > 0) {
            if (
              !checkConsumptionExistsInData(
                result.gasCityCostOfConsomptionId,
                annualElectricityCostData
              )
            ) {
              getElectrictyCostOfConsomptionIdMutation.mutate(
                result.gasCityCostOfConsomptionId,
                {
                  onSuccess: (val: any) => {
                    let data = val.data.result;
                    setInitialValues((old: any) => ({
                      ...old,
                      gasCityCostOfConsomptionId:
                        createConsumptionValueLabel(data),
                    }));
                  },
                }
              );
            }
          }

          if (
            annualElectricityCostData &&
            annualElectricityCostData.length > 0
          ) {
            if (
              !checkConsumptionExistsInData(
                result.electrictyCostOfConsomptionId,
                annualGasCostData
              )
            ) {
              getGasCityCostOfConsomptionIdMutation.mutate(
                result.electrictyCostOfConsomptionId,
                {
                  onSuccess: (val: any) => {
                    let data = val.data.result;
                    setInitialValues((old: any) => ({
                      ...old,
                      electrictyCostOfConsomptionId:
                        createConsumptionValueLabel(data),
                    }));
                  },
                }
              );
            }
          }

          setInitialValues({
            electricityPricesEnum: {
              value: result.electricityPricesEnum,
              label: result.electricityPricesEnumTitle,
            },
            theAmountOfFuleSuppliedGasolineSubsidy: {
              value: result.theAmountOfFuleSuppliedGasolineSubsidy,
              label: result.theAmountOfFuleSuppliedGasolineSubsidyTitle,
            },
            theAmountOfFuleSuppliedGasolineFree: {
              value: result.theAmountOfFuleSuppliedGasolineFree,
              label: result.theAmountOfFuleSuppliedGasolineFreeTitle,
            },
            theAmountOfFuleSuppliedKeroseneSubsidy: {
              value: result.theAmountOfFuleSuppliedKeroseneSubsidy,
              label: result.theAmountOfFuleSuppliedKeroseneSubsidyTitle,
            },
            theAmountOfFuleSuppliedKeroseneFree: {
              value: result.theAmountOfFuleSuppliedKeroseneFree,
              label: result.theAmountOfFuleSuppliedKeroseneFreeTitle,
            },
            fuelSupplyCenterEnum: {
              value: result.fuelSupplyCenterEnum,
              label: result.fuelSupplyCenterEnumTitle,
            },
            electricitySupplyCenterEnum: {
              value: result.electricitySupplyCenterEnum,
              label: result.electricitySupplyCenterEnumTitle,
            },
            usedElectricityPowerEnum: {
              value: result.usedElectricityPowerEnum,
              label: result.usedElectricityPowerEnumTitle,
            },
            howToTransportFuelEnum: {
              value: result.howToTransportFuelEnum,
              label: result.howToTransportFuelEnumTitle,
            },
            transferFuelCountEnum: {
              value: result.transferFuelCountEnum,
              label: result.transferFuelCountEnumTitle,
            },
            liquidGasUseEnumSubsidy: {
              value: result.liquidGasUseEnumSubsidy,
              label: result.liquidGasUseEnumSubsidyTitle,
            },
            liquidGasUseEnumFree: {
              value: result.liquidGasUseEnumFree,
              label: result.liquidGasUseEnumFreeTitle,
            },
            cityGasPricesEnum: {
              value: result.cityGasPricesEnum,
              label: result.cityGasPricesEnumTitle,
            },
            electrictyCostOfConsomptionId: {
              value: result.electrictyCostOfConsomptionId,
              label: result.electrictyCostOfConsomptionIdTitle,
            },
            gasCityCostOfConsomptionId: {
              value: result.gasCityCostOfConsomptionId,
              label: result.gasCityCostOfConsomptionIdTitle,
            },
          });

          console.log(result);
        },
      });
    }
  }, [id, annualElectricityCostData , 
    annualGasCostData]);

  useEffect(() => {
    LiquidGasUseEnumMutation.mutate("LiquidGasUseEnum", {
      onSuccess: (val: any) => {
        const result = val.data.result;
        if (result) {
          let newOptions: any = [];
          let newList = [
            {
              label: "انتخاب کنید ...",
              options: [],
            },
          ];

          result.forEach((row: any) => {
            newOptions.push({ value: row.id, label: row.title });
          });
          newList[0].options = newOptions;
          setLiquidGasUseEnumData(newList);
        }
      },
    });
  }, []);
  useEffect(() => {
    TheAmountOfFuleSuppliedEnumMutation.mutate("TheAmountOfFuleSuppliedEnum", {
      onSuccess: (val: any) => {
        const result = val.data.result;
        if (result) {
          let newOptions: any = [];
          let newList = [
            {
              label: "انتخاب کنید ...",
              options: [],
            },
          ];

          result.forEach((row: any) => {
            newOptions.push({ value: row.id, label: row.title });
          });
          newList[0].options = newOptions;
          setTheAmountOfFuleSuppliedEnumData(newList);
        }
      },
    });
  }, []);

  useEffect(() => {
    if (getElectricityCost.isSuccess) {
      const result = getElectricityCost.data?.data.result;
      console.log(result);
      let waterCost: FullOptionSel[] = [
        { label: "انتخاب کنید...", options: [] },
      ];

      result.forEach((item: any) => {
        waterCost[0].options.push({
          value: item.id,
          label: `${
            item.oprator === 4
              ? `مابین ${item.from1} تا ${item.from2}`
              : item.oprator === 3
              ? `${item.from1} کوچکتر از`
              : item.oprator === 2
              ? `${item.from1} بزرگتر از `
              : item.oprator === 1
              ? `${item.from1}`
              : `مابین ${item.from1} تا ${item.from2}`
          } `,
        });
      });
      setAnnualElectricityCostData(waterCost);
    }
  }, [getElectricityCost.isSuccess]);

  useEffect(() => {
    if (getGasCost.isSuccess) {
      const result = getGasCost.data?.data.result;
      console.log(result);
      let gasCost: FullOptionSel[] = [{ label: "انتخاب کنید...", options: [] }];

      result.forEach((item: any) => {
        gasCost[0].options.push({
          value: item.id,
          label: getCost(item),
        });
      });
      setAnnualGasCostData(gasCost);
    }
  }, [getGasCost.isSuccess]);

  const LiquidGasUseEnumMutation = useGetSelcetOptionOfEnum();
  const TheAmountOfFuleSuppliedEnumMutation = useGetSelcetOptionOfEnum();
  const setAgricaltureFuelMutation = setMutation();

  const { section_id } = useParams<{ section_id: string }>();

  const onSubmit = (values: any) => {
    const setFuelConsumptionOjb = {
      productionFactorId: parentData.productionFactor.value,
      sectionId: +section_id,
      year: parentData.productionYear.value,
      activityRate: parentData.activityTime,
      energyConsumption: {
        electricityPricesEnum: values.electricityPricesEnum.value,
        theAmountOfFuleSuppliedGasolineSubsidy:
          values.theAmountOfFuleSuppliedGasolineSubsidy.value,
        theAmountOfFuleSuppliedGasolineFree:
          values.theAmountOfFuleSuppliedGasolineFree.value,
        theAmountOfFuleSuppliedKeroseneSubsidy:
          values.theAmountOfFuleSuppliedKeroseneSubsidy.value,
        theAmountOfFuleSuppliedKeroseneFree:
          values.theAmountOfFuleSuppliedKeroseneFree.value,
        fuelSupplyCenterEnum: values.fuelSupplyCenterEnum.value,
        electricitySupplyCenterEnum: values.electricitySupplyCenterEnum.value,
        usedElectricityPowerEnum: values.usedElectricityPowerEnum.value,
        howToTransportFuelEnum: values.howToTransportFuelEnum.value,
        transferFuelCountEnum: values.transferFuelCountEnum.value,
        liquidGasUseEnumSubsidy: values.liquidGasUseEnumSubsidy.value,
        liquidGasUseEnumFree: values.liquidGasUseEnumFree.value,
        cityGasPricesEnum: values.cityGasPricesEnum.value,
        electrictyCostOfConsomptionId:
          values.electrictyCostOfConsomptionId.value,
        gasCityCostOfConsomptionId: values.gasCityCostOfConsomptionId.value,
      },
    };

    setAgricaltureFuelMutation.mutate(setFuelConsumptionOjb, {
      onSuccess: () => {
        showToast(["با موفقیت انجام شد"], ToastTypes.success);
      },
    });
  };

  return (
    <>
      <FormDivider textHeader="مصرف انواع سوخت و انرژی">
        <CardBody>
          <Formik
            initialValues={initialValues}
            onSubmit={onSubmit}
            validationSchema={AgricultureEnergyConsumption}
            enableReinitialize
          >
            {({ values }) => (
              <Form>
                <>
                  <Row>
                    <Col md="6">
                      <Row>
                        <Col md="12">
                          <BasicSelectOption
                            lableText="تعرفه برق مصرفی"
                            name="electricityPricesEnum"
                            data={electricityTariffData}
                            isDisabled={!isExpert}
                            placeHolder="انتخاب کنید"
                            significant
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <BasicSelectOption
                            lableText="هزینه برق سالانه (ریال)"
                            name="electrictyCostOfConsomptionId"
                            data={annualElectricityCostData}
                            isDisabled={!isExpert}
                            isLoading={getElectricityCost.isLoading}
                            placeHolder="انتخاب کنید"
                            significant
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <BasicSelectOption
                            lableText="میزان گازوئیل مصرفی با تعرفه یارانه ای"
                            name="theAmountOfFuleSuppliedGasolineSubsidy"
                            data={TheAmountOfFuleSuppliedEnumData}
                            isLoading={
                              TheAmountOfFuleSuppliedEnumMutation.isLoading
                            }
                            placeHolder="انتخاب کنید"
                            isDisabled={!isExpert}
                            significant
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <BasicSelectOption
                            lableText="میزان گازوئیل مصرفی با تعرفه آزاد"
                            name="theAmountOfFuleSuppliedGasolineFree"
                            data={TheAmountOfFuleSuppliedEnumData}
                            isLoading={
                              TheAmountOfFuleSuppliedEnumMutation.isLoading
                            }
                            placeHolder="انتخاب کنید"
                            isDisabled={!isExpert}
                            significant
                          />
                        </Col>
                      </Row>

                      <Row>
                        <Col md="12">
                          <BasicSelectOption
                            lableText="میزان نفت سفید مصرفی با تعرفه یارانه ای"
                            name="theAmountOfFuleSuppliedKeroseneSubsidy"
                            data={TheAmountOfFuleSuppliedEnumData}
                            isLoading={
                              TheAmountOfFuleSuppliedEnumMutation.isLoading
                            }
                            placeHolder="انتخاب کنید"
                            isDisabled={!isExpert}
                            significant
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <BasicSelectOption
                            lableText="میزان نفت سفید مصرفی با تعرفه آزاد"
                            name="theAmountOfFuleSuppliedKeroseneFree"
                            data={TheAmountOfFuleSuppliedEnumData}
                            isLoading={
                              TheAmountOfFuleSuppliedEnumMutation.isLoading
                            }
                            placeHolder="انتخاب کنید"
                            isDisabled={!isExpert}
                            significant
                          />
                        </Col>
                      </Row>

                      <Row>
                        <Col md="12">
                          <BasicSelectOption
                            lableText="مرکز تامین سوخت"
                            name="fuelSupplyCenterEnum"
                            data={fuelSupplyCenterData}
                            placeHolder="انتخاب کنید"
                            significant
                            isDisabled={!isExpert}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <BasicSelectOption
                            lableText="منبع تامین برق"
                            name="electricitySupplyCenterEnum"
                            data={powerSupplyCenterData}
                            placeHolder="انتخاب کنید"
                            significant
                            isDisabled={!isExpert}
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
                                name="howToTransportFuelEnum"
                                data={fuelTransportationTypeData}
                                placeHolder="انتخاب کنید"
                                significant
                                isDisabled={!isExpert}
                              />
                            </Col>
                          </Row>

                          <Row>
                            <Col md="12">
                              <BasicSelectOption
                                lableText="تعداد دفعات حمل سوخت در سال"
                                name="transferFuelCountEnum"
                                data={annualFuelTransportationData}
                                placeHolder="انتخاب کنید"
                                significant
                                isDisabled={!isExpert}
                              />
                            </Col>
                          </Row>

                          <Row>
                            <Col md="12">
                              <BasicSelectOption
                                lableText="میزان گاز مایع مصرفی با تعرفه یارانه ای"
                                name="liquidGasUseEnumSubsidy"
                                data={LiquidGasUseEnumData}
                                isLoading={LiquidGasUseEnumMutation.isLoading}
                                placeHolder="انتخاب کنید"
                                significant
                                isDisabled={!isExpert}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col md="12">
                              <BasicSelectOption
                                lableText="میزان گاز مایع مصرفی با تعرفه آزاد"
                                name="liquidGasUseEnumFree"
                                data={LiquidGasUseEnumData}
                                isLoading={LiquidGasUseEnumMutation.isLoading}
                                placeHolder="انتخاب کنید"
                                significant
                                isDisabled={!isExpert}
                              />
                            </Col>
                          </Row>

                          <Row>
                            <Col md="12">
                              <BasicSelectOption
                                lableText="هزینه گاز شهری مصرفی در سال"
                                name="gasCityCostOfConsomptionId"
                                data={annualGasCostData}
                                isLoading={getGasCost.isLoading}
                                placeHolder="انتخاب کنید"
                                significant
                                isDisabled={!isExpert}
                              />
                            </Col>
                          </Row>

                          <Row>
                            <Col md="12">
                              <BasicSelectOption
                                lableText="تعرفه مصرف گاز شهری"
                                name="cityGasPricesEnum"
                                data={electricityTariffData}
                                placeHolder="انتخاب کنید"
                                significant
                                isDisabled={!isExpert}
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col md="12">
                              <BasicSelectOption
                                lableText="قدرت برق مصرفی"
                                name="usedElectricityPowerEnum"
                                data={UsedElectricityPowerEnumData}
                                placeHolder="انتخاب کنید"
                                significant
                                isDisabled={!isExpert}
                              />
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                  {isExpert && (
                    <Row>
                      <Col>
                        <SubmitButton
                          btnText="ثبت"
                          isLoading={setAgricaltureFuelMutation.isLoading}
                          schema={AgricultureEnergyConsumption}
                        />
                      </Col>
                    </Row>
                  )}
                </>
              </Form>
            )}
          </Formik>
        </CardBody>
      </FormDivider>
    </>
  );
};

export { AgriculturalFuelConsumption };
