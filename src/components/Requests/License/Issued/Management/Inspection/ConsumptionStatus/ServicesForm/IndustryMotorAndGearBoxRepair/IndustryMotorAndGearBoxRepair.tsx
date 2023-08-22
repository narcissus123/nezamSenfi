import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";

import {
  SubmitButton,
  TextInput,
} from "../../../../../../../../common/Form";

import BasicSelectOption from "../../../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { Row, Col } from "reactstrap";
import { FullOptionSel } from "../../../../../../../../../core/models";
import { MotorAndGearBoxValidate } from "../../../../../../../../../core/validations/motor-gearbox.validations";
import { useGetAllConsumptionForDropDown2, useGetConsumptionCostForDropDownById } from "../../../../../../../../../core/services/api";
import { useParams } from "react-router-dom";
import { ToastTypes } from "../../../../../../../../../core/enums";
import { checkConsumptionExistsInData, showToast } from "../../../../../../../../../core/utils";
import { createConsumptionValueLabel } from "../../../../../../../../../core/utils/create-consumption-value-label.utils";
import { getCost } from "../../../../../../../../../core/utils/get-cost.utils";

interface IPropTypes {
  setMutation: any;
  parentData: any;
  id: number | undefined;
  useGetMutation: any;
  type: 1 | 2
}

const IndustryMotorAndGearBoxRepair: React.FC<IPropTypes> = ({
  setMutation,
  parentData,
  id = 0,
  useGetMutation,
  type
}) => {
  const [initialValues, setInitialValues] = useState<any>({
    minorRepairsCostId: null,
    minorRepairsCount: "",
    halfRepairsCostId: null,
    halfRepairsCount: "",
    generalRepairsCostId: null,
    generalRepairsCount: "",
  });

  const [costData, setCostData] = useState<FullOptionSel[]>([
    { label: "انتخاب کنید ...", options: [] },
  ]);

  const [minorRepairsCountData, setMinorRepairsCountData] = useState<
  FullOptionSel[]
>([{ label: "انتخاب کنید ...", options: [] }]);
  const [generalRepairsCountData, setGeneralRepairsCountData] = useState<
    FullOptionSel[]
  >([{ label: "انتخاب کنید ...", options: [] }]);
  
  const [halfRepairsCountData, setHalfRepairsCountData] = useState<FullOptionSel[]>([
    { label: "انتخاب کنید ...", options: [] },
  ]);
  const countRangeData: FullOptionSel[] = [
    {
      label: "انتخاب کنید ...",
      options: [
        { value: 1, label: "از 1 تا 10" },
        { value: 2, label: "از 11 تا 20" },
        { value: 3, label: "از 21 تا 30" },
        { value: 4, label: "از 31 تا 40" },
        { value: 5, label: "از 41 تا 50" },
      ],
    },
  ];

  const rangeDataGenerator = (value: number) => {
    let data: any = [];
    console.log('log-g--value--' , value);
    
    switch (value) {
      case 1:
        for (let i = 1; i <= 10; i++) {
          data.push({ value: i, label: i });
        }
        break;
      case 2:
        for (let i = 11;  i <= 20 ; i++) {
          data.push({ value: i, label: i });
        }
        break;
      case 3:
        for (let i = 21; i <= 30; i++) {
          data.push({ value: i, label: i });
        }
        break;
      case 4:
        for (let i = 31; i <= 40; i++) {
          data.push({ value: i, label: i });
        }
        break;
      case 5:
        for (let i = 41; i <= 50; i++) {
          data.push({ value: i, label: i });
        }
        break;
    }
    console.log('data----' , value);
    return data;
  };

  const onRangeChange = (opt: any, setFieldValue: any , name : string , setData : any) => {
    setFieldValue(name, opt);
    console.log('--optvalue---' , opt.value);
    
    let data = rangeDataGenerator(opt.value);
    let newOptions = [
      {label : 'انتخاب کنید ...' , options:data}
    ]
    console.log('---data ,' , newOptions);
    
    setData(newOptions)


  };

  const getDetailMutation = useGetMutation();

  const getCosts = useGetAllConsumptionForDropDown2();
  useEffect(()=>{
    getCosts.mutate(6);
  },[])
  
  const getMinorRepairsCostIdMutation = useGetConsumptionCostForDropDownById();
  const getHalfRepairsCostIdMutation = useGetConsumptionCostForDropDownById();
  const getGeneralRepairsCostIdMutation = useGetConsumptionCostForDropDownById();
  
  useEffect(() => {
    if (id && id !== 0) {
      getDetailMutation.mutate(id, {
        onSuccess: (val: any) => {
          const result = val.data.result;
          
          
          if (costData && costData[0].options && costData[0].options.length > 0) {
            if (
              !checkConsumptionExistsInData(result.minorRepairsCostId, costData)
            ) {
              
              getMinorRepairsCostIdMutation.mutate(result.minorRepairsCostId, {
                onSuccess: (val: any) => {
                  let data = val.data.result;
                  setInitialValues((old: any) => ({
                    ...old,
                    minorRepairsCostId:createConsumptionValueLabel(data) ,
                  }));
                },
              });
            }

            if (
              !checkConsumptionExistsInData(result.halfRepairsCostId, costData)
            ) {

              getHalfRepairsCostIdMutation.mutate(result.halfRepairsCostId, {
                onSuccess: (val: any) => {
                  let data = val.data.result;
                  setInitialValues((old: any) => ({
                    ...old,
                    halfRepairsCostId: createConsumptionValueLabel(data) ,
                  }));
                },
              });
            }

            if (
              !checkConsumptionExistsInData(
                result.generalRepairsCostId,
                costData
              )
            ) {

              getGeneralRepairsCostIdMutation.mutate(
                result.generalRepairsCostId,
                {
                  onSuccess: (val: any) => {
                    let data = val.data.result;
                    setInitialValues((old: any) => ({
                      ...old,
                      generalRepairsCostId: createConsumptionValueLabel(data) ,
                    }));
                  },
                }
              );
            }
          }

          setInitialValues({
            minorRepairsCostId: {
              value: result.minorRepairsCostId,
              label: result.minorRepairsCostTitle,
            },
            minorRepairsCount: {
              value: result.minorRepairsCount,
              label: result.minorRepairsCount,
            },
            halfRepairsCostId: {
              value: result.halfRepairsCostId,
              label: result.halfRepairsCostTitle,
            },
            halfRepairsCount: {
              value: result.halfRepairsCount,
              label: result.halfRepairsCount,
            },
            generalRepairsCostId: {
              value: result.generalRepairsCostId,
              label: result.generalRepairsCostTitle,
            },
            generalRepairsCount: {
              value: result.generalRepairsCount,
              label: result.generalRepairsCount,
            },
          });
      }
    })
  }}, [id,costData]);

  useEffect(() => {
    if (getCosts.isSuccess) {
      const result = getCosts.data?.data.result;
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
    const setRepairObj = {
      productionFactorId: parentData.productionFactor.value,
      sectionId: +section_id,
      year: parentData.productionYear.value,
      activityRate: parentData.activityTime,
      enginOrGearBoxRepairs: {
        minorRepairsCostId: value.minorRepairsCostId.value,
        minorRepairsCount: value.minorRepairsCount.value,
        halfRepairsCostId: value.halfRepairsCostId.value,
        halfRepairsCount: value.halfRepairsCount.value,
        generalRepairsCostId: value.generalRepairsCostId.value,
        generalRepairsCount: value.generalRepairsCount.value,
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
        validationSchema={MotorAndGearBoxValidate}
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
                            lableText={`هزینه تعمیرات جزئی ${type === 1 ? "موتور" : "گیربکس"}`}
                            name="minorRepairsCostId"
                            data={costData}
                            placeHolder="انتخاب کنید"
                            significant
                          />
                        </Col>
                      </Row>

                      <Row>
                        <Col md="12">
                          <BasicSelectOption
                            lableText="بازه تعداد دستگاه"
                            name="minorRepairsCountRange"
                            onChange={(opt) =>
                              onRangeChange(
                                opt,
                                setFieldValue,
                                "minorRepairsCountRange",
                                setMinorRepairsCountData
                              )
                            }
                            data={countRangeData}
                            placeHolder="انتخاب کنید"
                            significant
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <BasicSelectOption
                            lableText="تعداد دستگاه"
                            name="minorRepairsCount"
                            data={minorRepairsCountData}
                            placeHolder="انتخاب کنید"
                            significant
                          />
                        </Col>
                      </Row>

                      <Row>
                        <Col md="12">
                          <BasicSelectOption
                            lableText={`هزینه تعمیرات  ${type === 1 ? "نیم موتور" : "نیم گیربکس"}`}
                            name="halfRepairsCostId"
                            data={costData}
                            placeHolder="انتخاب کنید"
                            significant
                          />
                        </Col>
                      </Row>

                      <Row>
                        <Col md="12">
                          <BasicSelectOption
                            lableText="بازه تعداد دستگاه"
                            onChange={(opt) =>
                              onRangeChange(
                                opt,
                                setFieldValue,
                                "halfRepairsCountRange",
                                setHalfRepairsCountData
                              )
                            }
                            name="halfRepairsCountRange"
                            data={countRangeData}
                            placeHolder="انتخاب کنید"
                            significant
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <BasicSelectOption
                            lableText="تعداد دستگاه"
                            name="halfRepairsCount"
                            data={halfRepairsCountData}
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
                                lableText={`هزینه تعمیرات کلی ${type === 1 ? "موتور" : "گیربکس"}`}
                                name="generalRepairsCostId"
                                data={costData}
                                placeHolder="انتخاب کنید"
                                significant
                              />
                            </Col>
                          </Row>

                          <Row>
                            <Col md="12">
                              <BasicSelectOption
                                lableText="بازه تعداد دستگاه"
                                onChange={(opt) =>
                                  onRangeChange(
                                    opt,
                                    setFieldValue,
                                    "generalRepairsCountRange",
                                    setGeneralRepairsCountData
                                  )
                                }
                                name="generalRepairsCountRange"
                                data={countRangeData}
                                placeHolder="انتخاب کنید"
                                significant
                              />
                            </Col>
                          </Row>
                          <Row>
                            <Col md="12">
                              <BasicSelectOption
                                lableText="تعداد دستگاه"
                                name="generalRepairsCount"
                                data={generalRepairsCountData}
                                placeHolder="انتخاب کنید"
                                significant
                              />
                            </Col>
                          </Row>
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
                        schema={MotorAndGearBoxValidate}
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

export { IndustryMotorAndGearBoxRepair };
