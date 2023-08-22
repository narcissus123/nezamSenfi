import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CardBody, Col, Row } from "reactstrap";
import { ToastTypes } from "../../../../../../../../../../core/enums";
import {
  FullOptionSel,
  OptionRow,
  OptionRowSel,
} from "../../../../../../../../../../core/models";
import {
  useGetAllConsumptionForDropDown2,
  useGetConsumptionCostForDropDownById,
  useGetSelcetOptionOfEnum,
  useGetWaterUsedAmount,
  useSetWaterConsumption,
} from "../../../../../../../../../../core/services/api";
import {
  checkConsumptionExistsInData,
  fullOption,
  showToast,
} from "../../../../../../../../../../core/utils";
import { createConsumptionValueLabel } from "../../../../../../../../../../core/utils/create-consumption-value-label.utils";
import { getCost } from "../../../../../../../../../../core/utils/get-cost.utils";
import { WaterConsumptionValidateMixed } from "../../../../../../../../../../core/validations/water-consumption.validations";
import {
  FormDivider,
  SubmitButton,
  TextInput,
} from "../../../../../../../../../common/Form";
import BasicSelectOption from "../../../../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { WaterResourceJson } from "../../WaterResourceJson";

interface IPropTypes {
  parentData: any;
  useTypeCategory: number;
  title: string;
  id: number | undefined;
  useGetMutation: any;
  isExpert: boolean;
}

const WaterConsumption: React.FC<IPropTypes> = ({
  parentData,
  useTypeCategory,
  title,
  id = 0,
  useGetMutation,
  isExpert,
}) => {
  const waterInOneProductionCicle: FullOptionSel[] = [
    {
      label: "انتخاب کنید...",
      options: [
        { value: 1, label: "یک دوره" },
        { value: 2, label: "دو دوره" },
        { value: 3, label: "سه دوره" },
        { value: 4, label: "چهار دوره" },
        { value: 5, label: "پنج دوره" },
        { value: 6, label: "روزانه" },
        { value: 7, label: "هر 48 ساعت" },
        { value: 8, label: "هر 72 ساعت" },
        { value: 9, label: "هفتگی " },
        { value: 10, label: "هر ده روز" },
        { value: 11, label: "ماهانه" },
        { value: 12, label: "فاقد دوره / دیم" },
      ],
    },
  ];

  const howTransferWaterToUnitEnum: FullOptionSel[] = [
    {
      label: "انتخاب کنید...",
      options: [
        { value: 1, label: "انتقال آب شهری روستایی ار طریق لوله گذاری" },
        {
          value: 2,
          label: "انتقال آب از چاه ار طریق پمپاژ و لوله گذاری - داخل واحد",
        },
        {
          value: 3,
          label: "انتقال آب از چاه از طریق پمپاژ و لوله گذاری - خارج واحد",
        },
        {
          value: 4,
          label: "انتقال آب از طریق لوله گذاری و پمپاژ آب از رودخانه",
        },
        { value: 5, label: "انتقال آب رودخانه به صورت ثقلی" },
        { value: 6, label: "انتقال آب از طریق تانکر مخصوص  حمل آب" },
        { value: 7, label: "سایر موارد" },
      ],
    },
  ];

  const [waterCost, setWaterCost] = useState<FullOptionSel[]>([]);
  const [WaterAmountGroup, setWaterAmountGroup] = useState<FullOptionSel[]>([]);
  const [waterUsedAmount, setWaterUsedAmount] = useState<FullOptionSel[]>([]);
  const [totalWaterVolume, setTotalWaterVolume] = useState<number>(0);
  const [tableData, setTableData] = useState<any[]>([]);
  const [waterResource, setWaterResource] = useState<any[]>([]);
  const [initialValues, setInitialValues] = useState<any>({
    waterInOneProductionCicle: null,
    //waterSupplied: null,
    waterSuppliedInOneProductionCycle: null,
    waterAmountGroupEnum: null,
    equipmentMaintenanceCosts: null,
    costOfWellDemolition: null,
    oneYearWaterCost: null,
    waterUsedAmountId: null,
    howTransferWaterToUnitEnum: null,
  });

  const setWaterConsumption = useSetWaterConsumption();
  const getWaterAmountGroupEnum = useGetSelcetOptionOfEnum();
  const getWaterUsedAmount = useGetWaterUsedAmount();
  const getWaterDetails = useGetMutation();

  const getWaterCost = useGetAllConsumptionForDropDown2();
  useEffect(()=>{
    getWaterCost.mutate(1);
  },[])

  const getMaintenanceCostIdMutation = useGetConsumptionCostForDropDownById();
  const getDestructionCostIdMutation = useGetConsumptionCostForDropDownById();
  const getWaterConsumptionCostIdMutation = useGetConsumptionCostForDropDownById();

  useEffect(() => {
    if (id && id !== 0) {
      getWaterDetails.mutate(id, {
        onSuccess: (val: any) => {
          const result = val.data.result;
          if (waterCost && waterCost[0].options && waterCost[0].options.length > 0) {
            if (
              !checkConsumptionExistsInData(result.maintenanceCostId, waterCost)
            ) {
              getMaintenanceCostIdMutation.mutate(result.maintenanceCostId, {
                onSuccess: (val: any) => {
                  let data = val.data.result;
                  setInitialValues((old: any) => ({
                    ...old,
                    maintenanceCostId: createConsumptionValueLabel(data) ,
                  }));
                },
              });
            }

            if (
              !checkConsumptionExistsInData(result.destructionCostId, waterCost)
            ) {
              getDestructionCostIdMutation.mutate(result.destructionCostId, {
                onSuccess: (val: any) => {
                  let data = val.data.result;
                  setInitialValues((old: any) => ({
                    ...old,
                    destructionCostId: createConsumptionValueLabel(data) ,
                  }));
                },
              });
            }

            if (
              !checkConsumptionExistsInData(
                result.waterConsumptionCostId,
                waterCost
              )
            ) {
              getWaterConsumptionCostIdMutation.mutate(
                result.waterConsumptionCostId,
                {
                  onSuccess: (val: any) => {
                    let data = val.data.result;
                    setInitialValues((old: any) => ({
                      ...old,
                      waterConsumptionCostId: createConsumptionValueLabel(data) ,
                    }));
                  },
                }
              );
            }
          }

          
          setWaterResource(result.waterResource.items);
          setInitialValues({
            equipmentMaintenanceCosts: fullOption(
              result.maintenanceCostId,
              waterCost
            ),
            costOfWellDemolition: fullOption(
              result.destructionCostId,
              waterCost
            ),
            oneYearWaterCost: fullOption(
              result.waterConsumptionCostId,
              waterCost
            ),
            waterInOneProductionCicle: fullOption(
              result.numberIrrigation,
              waterInOneProductionCicle
            ),
            waterSuppliedInOneProductionCycle: null,
            howTransferWaterToUnitEnum: result.howTransferWaterToUnitEnumTitle
              ? {
                  value: result.howTransferWaterToUnitEnum,
                  label: result.howTransferWaterToUnitEnumTitle,
                }
              : null,
            waterUsedAmountId: result.waterUsedAmountId
              ? {
                  value: result.waterUsedAmountId,
                  label: `${result.waterUsedAmountId} لیتر`,
                }
              : null,
          });
        },
      });
    }
  }, [id, waterCost]);

  useEffect(() => {
    getWaterAmountGroupEnum.mutate("WaterAmountGroupEnum", {
      onSuccess: (val) => {
        const result = val.data.result;
        console.log(result);
        let waterAmountList: FullOptionSel[] = [
          { label: "انتخاب کنید", options: [] },
        ];

        result.forEach((item: OptionRow) => {
          waterAmountList[0].options.push({
            value: +item.id,
            label: item.title,
          });
        });

        setWaterAmountGroup(waterAmountList);
      },
    });
  }, []);

  useEffect(() => {
    if (getWaterCost.isSuccess) {
      const result = getWaterCost.data?.data.result;
      console.log(result);
      let waterCost: FullOptionSel[] = [
        { label: "انتخاب کنید...", options: [] },
      ];

      result.forEach((item: any) => {
        waterCost[0].options.push({
          value: item.id,
          label: getCost(item),
        });
      });
      setWaterCost(waterCost);
    }
  }, [getWaterCost.isSuccess]);

  useEffect(() => {
    let totalVolume = 0;
    tableData.forEach((row) => {
      totalVolume +=
        row.waterInOneLevelHour.value * 3600 + row.waterSupplied.value;
    });
    setTotalWaterVolume(totalVolume);
  }, [tableData]);

  const { section_id } = useParams<{ section_id: string }>();

  const onSubmit = (values: any) => {
    if (tableData.length === 0) {
      return showToast(["لطفا ليست مورد نظر را پر کنيد"], ToastTypes.error);
    }
    const waterResourceJson: any = {
      items: [],
    };
    console.log('----1--'  );
    tableData.forEach((item) => {
      waterResourceJson.items.push({
        waterResourceEnum: item.waterSupplyCenter.value,
        waterUsePerHourEnum: item.waterInOneLevelHour.value,
        theAmountOfWaterSupplied: item.waterSupplied.value,
        waterResourceLicenseStatus: item.licenseStatus.value,
        waterResourceLicenseType:
          item.licenseStatus.value === 1
            ? item.licenseType
              ? item.licenseType.value
              : 0
            : 0,
        licenseNumber:
          item.licenseStatus.value === 1
            ? item.licenseNumber
              ? item.licenseNumber
              : ""
            : "",
        licenseDate:
          item.licenseStatus.value === 1
            ? item.issueDate
              ? item.issueDate
              : ""
            : "",
        waterResourceLicenseCreditEnum:
          item.licenseStatus.value === 1
            ? item.waterResourceLicenseCreditEnum
              ? item.waterResourceLicenseCreditEnum.value
              : 0
            : 0,
      });
    });

    console.log('----2 --' , waterResourceJson );

    const waterResourse = {
      numberIrrigation: values.waterInOneProductionCicle
        ? values.waterInOneProductionCicle.value
        : 0,
      waterResourceJson: waterResourceJson,
      waterConsumptionCostId: values.oneYearWaterCost
        ? values.oneYearWaterCost.value
        : 0,
      destructionCostId: values.costOfWellDemolition
        ? values.costOfWellDemolition.value
        : 0,
      maintenanceCostId: values.equipmentMaintenanceCosts
        ? values.equipmentMaintenanceCosts.value
        : 0,
    };

    const agricaltureWaterObj = {
      useTypeCategory: useTypeCategory,
      productionFactorId: parentData.productionFactor.value,
      sectionId: +section_id,
      year: parentData.productionYear.value,
      activityRate: parentData.activityTime,
      waterResourse: waterResourse,
      howTransferWaterToUnitEnum: values.howTransferWaterToUnitEnum.value,
      waterUsedAmountId: values.waterUsedAmountId.value,
    };

    console.log('----3--' , agricaltureWaterObj );
    
    setWaterConsumption.mutate(agricaltureWaterObj, {
      onSuccess: () => {
        showToast(["با موفقیت انجام شد"], ToastTypes.success);
      },
    });
  };

  const onWaterAmountGroupChange = (opt: OptionRowSel, setFieldValue: any) => {
    setFieldValue("waterAmountGroupEnum", opt);

    getWaterUsedAmount.mutate(opt.value, {
      onSuccess: (val) => {
        const result = val.data.result;
        let waterUsedList: FullOptionSel[] = [
          { label: "انتخاب کنید...", options: [] },
        ];

        result.forEach((item: number) => {
          waterUsedList[0].options.push({
            value: item,
            label: item + " کیلوگرم",
          });
        });

        setWaterUsedAmount(waterUsedList);
      },
    });
  };

  return (
    <FormDivider textHeader={title}>
      <CardBody>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          enableReinitialize
          validationSchema={WaterConsumptionValidateMixed}
        >
          {({ values, setFieldValue }) => (
            <Row>
              <Col sm="6">
                <Form>
                  <Row>
                    <Col md="12">
                      <BasicSelectOption
                        lableText="میزان آب"
                        name="waterAmountGroupEnum"
                        data={WaterAmountGroup}
                        isLoading={getWaterAmountGroupEnum.isLoading}
                        isDisabled={!isExpert}
                        placeHolder="میزان آب"
                        significant
                        onChange={(opt) =>
                          onWaterAmountGroupChange(opt, setFieldValue)
                        }
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <BasicSelectOption
                        lableText="مقدار استفاده شده از آب"
                        name="waterUsedAmountId"
                        data={waterUsedAmount}
                        isDisabled={!isExpert}
                        isLoading={getWaterUsedAmount.isLoading}
                        placeHolder="مقدار استفاده شده از آب"
                        significant
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <BasicSelectOption
                        lableText="نحوه انتقال آب به واحد"
                        name="howTransferWaterToUnitEnum"
                        data={howTransferWaterToUnitEnum}
                        isDisabled={!isExpert}
                        placeHolder="نحوه انتقال آب به واحد..."
                        significant
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <BasicSelectOption
                        lableText="تعداد مراحل آبیاری در یک دوره تولید"
                        name="waterInOneProductionCicle"
                        data={waterInOneProductionCicle}
                        isDisabled={!isExpert}
                        placeHolder="تعداد مراحل آبیاری در یک دوره تولید"
                        significant
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <TextInput
                        lableText="حجم کل آب مصرفی در هر دوره تولید"
                        name="waterSuppliedInOneProductionCycle"
                        disabled
                        placeholder="حجم کل آب مصرفی در هر دوره تولید ..."
                        value={totalWaterVolume.toString()}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col md="12">
                      <BasicSelectOption
                        lableText="هزینه تعمیرات و نگهداری تاسیسات و تجهیزات"
                        name="equipmentMaintenanceCosts"
                        data={waterCost}
                        isDisabled={!isExpert}
                        placeHolder="انتخاب کنید ..."
                        isLoading={getWaterCost.isLoading}
                        significant
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <BasicSelectOption
                        lableText="هزینه تخریب و جابجایی چاه و کف شکنی چاه"
                        name="costOfWellDemolition"
                        data={waterCost}
                        isDisabled={!isExpert}
                        placeHolder="انتخاب کنید ..."
                        isLoading={getWaterCost.isLoading}
                        significant
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <BasicSelectOption
                        lableText="هزینه تامین آب در یکسال"
                        name="oneYearWaterCost"
                        data={waterCost}
                        isDisabled={!isExpert}
                        placeHolder="انتخاب کنید ..."
                        isLoading={getWaterCost.isLoading}
                        significant
                      />
                    </Col>
                  </Row>

                  {isExpert && (
                    <SubmitButton
                      isLoading={setWaterConsumption.isLoading}
                      btnText="ثبت"
                      values={values}
                      schema={WaterConsumptionValidateMixed}
                    />
                  )}
                </Form>
              </Col>

              <Col sm="6">
                <WaterResourceJson
                  setTableData={setTableData}
                  tableData={tableData}
                  waterResource={waterResource}
                  isExpert={isExpert}
                />
              </Col>
            </Row>
          )}
        </Formik>
      </CardBody>
    </FormDivider>
  );
};

export { WaterConsumption };
