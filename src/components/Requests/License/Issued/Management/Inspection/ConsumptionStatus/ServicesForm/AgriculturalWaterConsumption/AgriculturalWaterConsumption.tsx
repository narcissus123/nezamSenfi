import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CardBody, Col, Row } from "reactstrap";
import { ToastTypes } from "../../../../../../../../../core/enums";
import { FullOptionSel } from "../../../../../../../../../core/models";
import {
  useGetAllConsumptionForDropDown2,
  useGetConsumptionCostForDropDownById,
  useSetAgriculturalWaterConsumption,
} from "../../../../../../../../../core/services/api";
import { checkConsumptionExistsInData, fullOption, showToast } from "../../../../../../../../../core/utils";
import { createConsumptionValueLabel } from "../../../../../../../../../core/utils/create-consumption-value-label.utils";
import { getCost } from "../../../../../../../../../core/utils/get-cost.utils";
import { AgricutureWaterConsumptionValidate } from "../../../../../../../../../core/validations/water-consumption.validations";
import {
  FormDivider,
  SubmitButton,
  TextInput,
} from "../../../../../../../../common/Form";
import BasicSelectOption from "../../../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { WaterResourceJson } from "../WaterResourceJson";

interface IPropTypes {
  parentData: any;
  id: number | undefined;
  useGetMutation: any;
  isExpert: boolean;
}

const AgriculturalWaterConsumption: React.FC<IPropTypes> = ({
  parentData,
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

  const [waterCost, setWaterCost] = useState<FullOptionSel[]>([]);
  const [waterResource, setWaterResource] = useState<any[]>([]);
  const [totalWaterVolume, setTotalWaterVolume] = useState<number>(0);
  const [tableData, setTableData] = useState<any[]>([]);
  const [initialValues, setInitialValues] = useState<any>({
    waterInOneProductionCicle: null,
    waterSuppliedInOneProductionCycle: null,
    equipmentMaintenanceCosts: null,
    costOfWellDemolition: null,
    oneYearWaterCost: null,
  });

  const getWaterDetail = useGetMutation();

  const getMaintenanceCostIdMutation = useGetConsumptionCostForDropDownById();
  const getDestructionCostIdMutation = useGetConsumptionCostForDropDownById();
  const getWaterConsumptionCostIdMutation = useGetConsumptionCostForDropDownById();


  useEffect(() => {
    if (id && id !== 0) {
      getWaterDetail.mutate(id, {
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
                    maintenanceCostId: createConsumptionValueLabel(data),
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
                    destructionCostId: createConsumptionValueLabel(data),
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
                      waterConsumptionCostId: createConsumptionValueLabel(data),
                    }));
                  },
                }
              );
            }
          }

          setWaterResource(result.waterResource.items);
          setInitialValues({
            equipmentMaintenanceCosts: {
              value: result.maintenanceCostId,
              label: "",
            },
            costOfWellDemolition: {
              value: result.destructionCostId,
              label: "",
            },
            oneYearWaterCost: {
              value: result.waterConsumptionCostId,
              label: "",
            },
            waterInOneProductionCicle: fullOption(
              result.numberIrrigation,
              waterInOneProductionCicle
            ),
            waterSuppliedInOneProductionCycle: null,
          });
          // console.log(result);
        },
      });
    }
  }, [id, waterCost]);

  const setAgricaltureWater = useSetAgriculturalWaterConsumption();

  const getWaterCost = useGetAllConsumptionForDropDown2();
  useEffect(()=>{
    getWaterCost.mutate(1);
  },[])

  useEffect(() => {
    if (getWaterCost.isSuccess) {
      const result = getWaterCost.data?.data.result;
      // console.log(result);
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
    try {
      tableData.forEach((row) => {
        totalVolume +=
          row.waterInOneLevelHour.value * 3600 + row.waterSupplied.value;
      });
      setTotalWaterVolume(totalVolume);
    } catch (error) {}
  }, [tableData]);

  const { section_id } = useParams<{ section_id: string }>();

  const onSubmit = (values: any) => {
    if (tableData.length === 0) {
      return showToast(["لطفا ليست مورد نظر را پر کنيد"], ToastTypes.error);
    }

    const waterResourceJson: any = {
      items: [],
    };

    tableData.forEach((item) => {
      waterResourceJson.items.push({
        waterResourceEnum: item.waterSupplyCenter
          ? item.waterSupplyCenter.value
          : 0,
        waterUsePerHourEnum: item.waterInOneLevelHour
          ? item.waterInOneLevelHour.value
          : 0,
        theAmountOfWaterSupplied: item.waterSupplied
          ? item.waterSupplied.value
          : 0,
        waterResourceLicenseStatus: item.licenseStatus
          ? item.licenseStatus.value
          : 0,
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
        waterResourceLicenseCreditEnum: item.waterResourceLicenseCreditEnum
          ? item.waterResourceLicenseCreditEnum.value
          : 0,
      });
    });

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
      productionFactorId: parentData.productionFactor.value,
      sectionId: +section_id,
      year: parentData.productionYear.value,
      activityRate: parentData.activityTime,
      waterResourse: waterResourse,
    };

    setAgricaltureWater.mutate(agricaltureWaterObj, {
      onSuccess: () => {
        showToast(["با موفقیت انجام شد"], ToastTypes.success);
      },
    });
  };
  return (
    <FormDivider textHeader="مصرف آب کشاورزی">
      <CardBody>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          enableReinitialize
          validationSchema={AgricutureWaterConsumptionValidate}
        >
          {({ values }) => (
            <Row>
              <Col sm="6">
                <Form>
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
                        placeHolder="انتخاب کنید ..."
                        isDisabled={!isExpert}
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
                        placeHolder="انتخاب کنید ..."
                        isDisabled={!isExpert}
                        isLoading={getWaterCost.isLoading}
                        significant
                      />
                    </Col>
                  </Row>

                  {isExpert && (
                    <SubmitButton
                      isLoading={setAgricaltureWater.isLoading}
                      btnText="ثبت"
                      values={values}
                      schema={AgricutureWaterConsumptionValidate}
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

export { AgriculturalWaterConsumption };
