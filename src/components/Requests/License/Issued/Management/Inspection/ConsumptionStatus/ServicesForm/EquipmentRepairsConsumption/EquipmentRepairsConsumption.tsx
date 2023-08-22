import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";

import {
  MultiSelectOption,
  SubmitButton,
  TextInput,
} from "../../../../../../../../common/Form";

import BasicSelectOption from "../../../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { Row, Col } from "reactstrap";
import { FullOptionSel } from "../../../../../../../../../core/models";
import { useGetAllConsumptionForDropDown2, useGetConsumptionCostForDropDownById } from "../../../../../../../../../core/services/api";
import { useParams } from "react-router-dom";
import { ToastTypes } from "../../../../../../../../../core/enums";
import { checkConsumptionExistsInData, showToast } from "../../../../../../../../../core/utils";
import { InspectionEquipmentRepair } from "../../../../../../../../../core/validations/inspection-equipment-repair.validations";
import { createConsumptionValueLabel } from "../../../../../../../../../core/utils/create-consumption-value-label.utils";
import { getCost } from "../../../../../../../../../core/utils/get-cost.utils";

interface IPropTypes {
  setMutation: any;
  parentData: any;
  id: number | undefined;
  useGetMutation: any;
}

const EquipmentRepairsConsumption: React.FC<IPropTypes> = ({
  setMutation,
  parentData,
  id = 0,
  useGetMutation,
}) => {

  const [initialValues, setInitialValues] = useState<any>({
    mobileEquipmentRepairsCostId: null,
    mobileEquipmentNamesViewModel: null,
    mobileEquipmentCount: "",
    fixedEquipmentRepairsCostId: null,
    fixedEquipmentNamesViewModel: null,
    fixedEquipmentCount: "",
  });

  const [costData, setCostData] = useState<FullOptionSel[]>([
    { label: "انتخاب کنید ...", options: [] },
  ]);



  const MobileEquipmentNamesEnum: FullOptionSel[] = [
    {
      label: "انتخاب کنید ...",
      options: [
        { value: 1, label: "دیسک" },
        { value: 2, label: "گاو آهن" },
        { value: 3, label: "پنجه غازی" },
        { value: 4, label: "ساب سویلر" },
        { value: 5, label: "بیلر" },
        { value: 6, label: "ردیف کار" },
        { value: 7, label: "نشان کار" },
        { value: 8, label: "بذر کار" },
        { value: 9, label: "بذرپاش و کود پاش" },
        { value: 10, label: "تریلر کوچک" },
        { value: 11, label: "تریلر متوسط" },
        { value: 12, label: "تریلر بزرگ" },
        { value: 13, label: "یدک کش ماشین آلات" },
        { value: 14, label: "یدک کش حمل علوفه" },
        { value: 15, label: "کاه خرد کن" },
        { value: 16, label: "ساقه خرد کن" },
        { value: 17, label: "کمبیناتور" },
        { value: 18, label: "خاک ورز مرکب" },
        { value: 19, label: "سله شکن" },
        { value: 20, label: "سمپاش توربو" },
        { value: 21, label: "سمپاش لایسنس دار" },
        { value: 22, label: "سمپاش بوم دار" },
        { value: 23, label: "سمپاش توربو" },
        { value: 24, label: "روتیواتور" },
        { value: 25, label: "پادلر هرس کن" },
        { value: 26, label: "سایر" },
      ],
    },
  ];


  const FixedEquipmentNamesEnum: FullOptionSel[] = [
    {
      label: "انتخاب کنید ...",
      options: [
        { value: 1, label: "کاه خردکن" },
        { value: 2, label: "علوفه خردکن" },
        { value: 3, label: "آسیاب" },
        { value: 4, label: "سم گیر" },
        { value: 5, label: "میکسر" },
        { value: 6, label: "مخلوط کن" },
        { value: 7, label: "هم زن برقی" },
        { value: 8, label: "سیستم آبی تحت فشار" },
        { value: 9, label: "تجهیزات دانخوری" },
        { value: 10, label: "تجهیزات آبخوری" },
        { value: 11, label: "تجهیزات تهویه" },
        { value: 12, label: "تجهیزات گرمایشی" },
        { value: 13, label: "تجهیزات سرمایشی" },
        { value: 14, label: "تجهیزات امنیتی" },
        { value: 15, label: "سایر" },
      ],
    },
  ];

  const getDetailMutation = useGetMutation();

  const getCosts = useGetAllConsumptionForDropDown2();
  useEffect(()=>{
    getCosts.mutate(6);
  },[])

  const getMobileEquipmentRepairsCostIdMutation = useGetConsumptionCostForDropDownById();
  const getFixedEquipmentRepairsCostIdMutation = useGetConsumptionCostForDropDownById();

  useEffect(() => {
    if (id && id !== 0) {
      getDetailMutation.mutate(id, {
        onSuccess: (val: any) => {
          const result = val.data.result;

          if (costData && costData[0].options && costData[0].options.length > 0) {
            if (
              !checkConsumptionExistsInData(
                result.mobileEquipmentRepairsCostId,
                costData
              )
            ) {
              getMobileEquipmentRepairsCostIdMutation.mutate(
                result.mobileEquipmentRepairsCostId,
                {
                  onSuccess: (val: any) => {
                    let data = val.data.result;
                    setInitialValues((old: any) => ({
                      ...old,
                      mobileEquipmentRepairsCostId:
                        createConsumptionValueLabel(data),
                    }));
                  },
                }
              );
            }
            if (
              !checkConsumptionExistsInData(
                result.fixedEquipmentRepairsCostId,
                costData
              )
            ) {
             
              getFixedEquipmentRepairsCostIdMutation.mutate(
                result.fixedEquipmentRepairsCostId,
                {
                  onSuccess: (val: any) => {
                    let data = val.data.result;
                    setInitialValues((old: any) => ({
                      ...old,
                      fixedEquipmentRepairsCostId:
                        createConsumptionValueLabel(data),
                    }));
                  },
                }
              );
            }
          }


          let mobileEquipmentNamesViewModel: {value: number, label: string}[] = [];

          if(result.mobileEquipmentNamesViewModel) {
            result.mobileEquipmentNamesViewModel.forEach((row: any) => {
              mobileEquipmentNamesViewModel.push({ value: row, label: "" });
            });
          }

          let fixedEquipmentNamesViewModel: any = [];

          if(result.fixedEquipmentNamesViewModel) {
            result.fixedEquipmentNamesViewModel.forEach((row: any) => {
              fixedEquipmentNamesViewModel.push({ value: row, label: "" });
            });
          }


          setInitialValues({
            mobileEquipmentRepairsCostId: {
              value: result.mobileEquipmentRepairsCostId,
              label: result.mobileEquipmentRepairsCostTitle,
            },
            mobileEquipmentNamesViewModel: mobileEquipmentNamesViewModel,
            mobileEquipmentCount: result.mobileEquipmentCount,
            fixedEquipmentRepairsCostId: {
              value: result.fixedEquipmentRepairsCostId,
              label: result.fixedEquipmentRepairsCostTitle,
            },
            fixedEquipmentNamesViewModel: fixedEquipmentNamesViewModel,
            fixedEquipmentCount: result.fixedEquipmentCount,
          });
      }
    })
  }}, [id, costData]);

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

  const setFormMutation = setMutation();

  const { section_id } = useParams<{ section_id: string }>();

  const onSubmit = (value: any) => {
   
    let mobileEquipmentNamesViewModel : number[] = []
    let fixedEquipmentNamesViewModel : number[] = []

    value.mobileEquipmentNamesViewModel.forEach((row:any) => {
      mobileEquipmentNamesViewModel.push(row.value)
    })
    value.fixedEquipmentNamesViewModel.forEach((row:any) => {
      fixedEquipmentNamesViewModel.push(row.value)
    })

    const setRepairObj = {
      productionFactorId: parentData.productionFactor.value,
      sectionId: +section_id,
      year: parentData.productionYear.value,
      activityRate: parentData.activityTime,
      equipmentRepairsConsumption: {
        mobileEquipmentRepairsCostId: value.mobileEquipmentRepairsCostId.value,
        mobileEquipmentNamesViewModel: mobileEquipmentNamesViewModel,
        mobileEquipmentCount: value.mobileEquipmentCount,
        fixedEquipmentRepairsCostId: value.fixedEquipmentRepairsCostId.value,
        fixedEquipmentNamesViewModel: fixedEquipmentNamesViewModel,
        fixedEquipmentCount: value.fixedEquipmentCount,
      },
    };

    setFormMutation.mutate(setRepairObj, {
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
        validationSchema={InspectionEquipmentRepair}
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
                            lableText="هزینه تعمیر تجهیزات متحرک "
                            name="mobileEquipmentRepairsCostId"
                            data={costData}
                            placeHolder="انتخاب کنید"
                            significant
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <MultiSelectOption
                            labelText="نام تجهیزات"
                            name="mobileEquipmentNamesViewModel"
                            placeHolder="انتخاب کنید..."
                            significant={true}
                            isLoading={false}
                            options={MobileEquipmentNamesEnum}
                            onChange={(e) =>
                              setFieldValue("mobileEquipmentNamesViewModel", e)
                            }
                            hasLabel={true}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <TextInput
                            id="mobileEquipmentCount"
                            name="mobileEquipmentCount"
                            lableText="تعداد"
                            placeholder="عدد وارد کنید ..."
                          />
                        </Col>
                      </Row>
                    </Col>

                    <Col md="6">
                      <Row>
                        <Col md="12">
                          <BasicSelectOption
                            lableText="هزینه تعمیر تجهیزات ثابت"
                            name="fixedEquipmentRepairsCostId"
                            data={costData}
                            placeHolder="انتخاب کنید"
                            significant
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <MultiSelectOption
                            labelText="نام تجهیزات"
                            name="fixedEquipmentNamesViewModel"
                            placeHolder="انتخاب کنید..."
                            significant={true}
                            isLoading={false}
                            options={FixedEquipmentNamesEnum}
                            onChange={(e) =>
                              setFieldValue("fixedEquipmentNamesViewModel", e)
                            }
                            hasLabel={true}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <TextInput
                            id="fixedEquipmentCount"
                            name="fixedEquipmentCount"
                            lableText="تعداد"
                            placeholder="عدد وارد کنید ..."
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
                        schema={InspectionEquipmentRepair}
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

export { EquipmentRepairsConsumption };
