import React, { useContext, useEffect, useState } from "react";
import { Formik, Form } from "formik";

import { TextInput } from "../../../../../common/Form/InputComponents/TextInputComponents/TextInput";
import { TwoColumn } from "../../../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";
import BasicSelectOption from "../../../../../common/Form/SelectOptionComponent/BasicSelectOption";
import { MultiSelectOption } from "../../../../../common/Form/SelectOptionComponent/MultiSelectOption";

import { addProductionFactorValidation } from "../../../../../../core/validations/production-factor.validation";
import { SubmitButton } from "../../../../../common/Form/SubmitButtonComponent/SubmitButton/SubmitButton";
import { useAllUseTypes, useGetAllFacilityBuildings, useGetAllMachineByTypes, useGetAllMachineTypes, useGetSelcetOptionOfEnum } from "../../../../../../core/services/api";
import {
  useCreateJobProductionFactor,
  useGetAllActivityMeasurementUnit,
  useGetAllJobByUseTypeForDropDown,
  useGetAllJobProductionFactorByJobId,
} from "../../../../../../core/services/api/job.api";
import { TypeOfDependenceEnum, TypeOfDependencePersianEnum } from "../../../../../../core/enums/type-of-dependence.enums";
import { ToastTypes } from "../../../../../../core/enums";
import { showToast } from "../../../../../../core/utils";
import { refetchContext } from "../../../../../../core/utils/context/EventContext";
import {
  FullOptionSel,
  OptionRowSel,
} from "../../../../../../core/models";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { FormDivider, Toggle } from "../../../../../common/Form";

const EditDependencyType: React.FC = () => {
  const initialValue: any = {
    name: "",
    code: "",
    order: "",
    describe: "",
    useTypeId: null,
    products: [],
    job: null,
    unit: null,
    repeat: null,
    dependType: null,
    productIds: null,
    productCategory: null,
    facilityBuildingsIds: null,
    areaPerUnit: "",
    machineTypes: null,
    machineryIds: null,
    treeTypeEnums: null,
    countOfRepetition: "",
    establishmentOfProduction: null,
  };

  const [useTypeData, setUseTypeData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const [repeatData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [
        { value: 1, label: "دارد" },
        { value: 2, label: "ندارد" },
      ],
    },
  ]);

  const [equipmentsData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const [treeTypeData, setTreeTypeData] = useState<FullOptionSel[]>([]);
  const [jobData, setJobData] = useState<any>([]);
  const [productionFactorData, setProductionFactorData] = useState<any>([]);

  const [dependTypeData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [
        {
          value: TypeOfDependenceEnum.AreaOfBuildingsAndFacilities,
          label: TypeOfDependencePersianEnum.AreaOfBuildingsAndFacilities,
        },
        {
          value: TypeOfDependenceEnum.Equipment,
          label: TypeOfDependencePersianEnum.Equipment,
        },
        {
          value: TypeOfDependenceEnum.Machinery,
          label: TypeOfDependencePersianEnum.Machinery,
        },
        {
          value: TypeOfDependenceEnum.TotalArea,
          label: TypeOfDependencePersianEnum.TotalArea,
        },
        {
          value: TypeOfDependenceEnum.Trees,
          label: TypeOfDependencePersianEnum.Trees,
        },
      ],
    },
  ]);

  const [machineTypesData, setMachineTypesData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const [machineryData, setMachineryData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);


  const getTreeTypeMutation = useGetSelcetOptionOfEnum();

  const {
    data: useTypesData,
    isFetching: useTypesIsFetching,
    isSuccess: useTypesIsSuccess,
  } = useAllUseTypes();

  const {
    data: getAllMachinTypes,
    isSuccess: isGetAllMachinTypsSuccess,
    isLoading: isGetAllMachinTypesLoading,
    isFetching: isGetAllMachinTypesFetching,
  } = useGetAllMachineTypes();


  const getJobFactorMutation = useGetAllJobProductionFactorByJobId();
  const getJobsMutation = useGetAllJobByUseTypeForDropDown();
  

  const getMachineMutation = useGetAllMachineByTypes();


  const createMutation = useCreateJobProductionFactor();

  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

  useEffect(() => {
    getTreeTypeMutation.mutate("TreeTypeEnum", {
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
          setTreeTypeData(newList);
        }
      },
    });
  }, []);
  
  useEffect(() => {
    if (getAllMachinTypes?.data.result) {
      const result = getAllMachinTypes.data.result;
      let pro: any = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      result.forEach((county: any) => {
        pro[0].options.push({ value: county.id, label: county.title });
      });
      setMachineTypesData(pro);
    }
  }, [isGetAllMachinTypsSuccess]);

  useEffect(() => {
    if (useTypesData && useTypesData.data) {
      const result = useTypesData.data.result;

      let pro: any = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      result.forEach((useType: any) => {
        pro[0].options.push({
          value: useType.id,
          label: useType.title,
          useTypeEnum: useType.useTypeEnum,
        });
      });
      setUseTypeData(pro);
    }
  }, [useTypesIsSuccess]);


  const [buildingTypes, setBuildingTypes] = useState<any>([]);
  
  const {
    data: buildingTypeData,
    isSuccess: buildingTypeIsSuccess,
    isFetching: buildingTypeIsFetching,
    refetch: refetchFacilityBuildings,
  } = useGetAllFacilityBuildings();

  useEffect(() => {
      refetchFacilityBuildings();
  }, []);

  useEffect(() => {
    if (buildingTypeData && buildingTypeData.data) {
      const result = buildingTypeData.data.result;

      let pro: any = [
        {
          label: "مسقف",
          options: [],
        },
        {
          label: "غیر مسقف",
          options: [],
        },
      ];
      result.forEach((facility: any) => {
        if (facility.roofType === 1) {
          pro[0].options.push({
            value: facility.id,
            label: facility.name,
            form: facility.form,
          });
        } else {
          pro[1].options.push({
            value: facility.id,
            label: facility.name,
            form: facility.form,
          });
        }
      });
      setBuildingTypes(pro);
    }
  }, [buildingTypeData]);

  const onSubmit = (values: any) => {

    let facilityBuildingsIds: any = [];
    if(values.facilityBuildingsIds){
      values.facilityBuildingsIds.forEach((row:any)=>{
        facilityBuildingsIds.push(row.value)
      })
    }

    let treeTypeEnums: any = [];
    if(values.treeTypeEnums){
      values.treeTypeEnums.forEach((row:any)=>{
        treeTypeEnums.push(row.value)
      })
    }

    let machineryIds: any = [];
    if(values.machineryIds){
      values.machineryIds.forEach((row:any)=>{
        machineryIds.push(row.value)
      })
    }
     
    const jobProductionFactorData = {
      title: values.name,
      code: values.code,
      description: values.describe,
      viewOrder: values.order,
      typeOfDependence: values.dependType ? values.dependType.value : 0,
      possibilityOfRepetition: values.repeat ? values.repeat.value : 0,
      countOfRepetition: values.countOfRepetition
        ? values.countOfRepetition.length > 0
          ? values.countOfRepetition
          : 0
        : 0,
      jobId: values.job ? values.job.value : 0,
      productIds: values.productIds
        ? values.productIds.map((row: OptionRowSel) => row.value)
        : [],
      treeTypeEnums: treeTypeEnums,
      machineryIds: machineryIds,
      activityMeasurementUnitId: values.unit ? values.unit.value : 0,
      facilityBuildingsIds: facilityBuildingsIds,
      areaPerUnit: values.areaPerUnit
        ? values.areaPerUnit.length > 0
          ? values.areaPerUnit
          : 0
        : 0,
    };

    // createMutation.mutate(jobProductionFactorData, {
    //   onSuccess: (val: any) => {
    //     showToast(["با موفقیت انجام شد."], ToastTypes.success);
    //     const newEvent = { ...refetchEvent };
    //     newEvent.productionFactorList = !newEvent.productionFactorList;
    //     setRefetchEvent(newEvent);
    //   },
    // });
  };



  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>ویرایش وابستگی عامل تولید</CardTitle>
        </CardHeader>
        <CardBody>
          <Formik
            enableReinitialize={true}
            initialValues={initialValue}
            validationSchema={addProductionFactorValidation}
            onSubmit={onSubmit}
          >
            {({ values, setFieldValue }) => {
              return (
                <Form>
                  <>
                    <TwoColumn>
                      <div>
                        <BasicSelectOption
                          data={useTypeData}
                          name="useTypeId"
                          lableText="نوع کاربری"
                          significant
                          isLoading={useTypesIsFetching}
                          placeHolder="بخش مورد نظر را انتخاب کنید"
                          onChange={(opt: any, e: any) => {
                            setFieldValue("useTypeId", {
                              value: opt.value,
                              label: opt.label,
                            });
                            setFieldValue("job", null);

                            if (opt) {
                              getJobsMutation.mutate(opt.value, {
                                onSuccess: (val: any) => {
                                  console.log("-optioonsss- ,", val);
                                  let data = val.data.result;

                                  if (data) {
                                    let pro: any = [
                                      {
                                        label: "انتخاب کنید...",
                                        options: [],
                                      },
                                    ];
                                    data.forEach((job: any) => {
                                      pro[0].options.push({
                                        value: job.id,
                                        label: job.title,
                                      });
                                    });
                                    setJobData(pro);
                                  }
                                },
                              });
                            }
                          }}
                        />
                        <BasicSelectOption
                          lableText="شغل"
                          name="job"
                          data={jobData}
                          significant
                          isLoading={getJobsMutation.isLoading}
                          placeHolder="بخش مورد نظر را انتخاب کنید"
                          onChange={(opt: any, e: any) => {
                            setFieldValue("job", {
                              value: opt.value,
                              label: opt.label,
                            });
                            setFieldValue("productionFactor", null);

                            if (opt) {
                              getJobFactorMutation.mutate(opt.value, {
                                onSuccess: (val: any) => {
                                  let data = val.data.result;

                                  if (data) {
                                    let pro: any = [
                                      {
                                        label: "انتخاب کنید...",
                                        options: [],
                                      },
                                    ];
                                    data.forEach((job: any) => {
                                      pro[0].options.push({
                                        value: job.id,
                                        label: `${job.title} - ${job.activityMeasurementUnitTtile}`,
                                      });
                                    });
                                    setProductionFactorData(pro);
                                  }
                                },
                              });
                            }
                          }}
                        />
                        <BasicSelectOption
                          isLoading={getJobFactorMutation.isLoading}
                          lableText="عامل تولید"
                          name="productionFactor"
                          data={productionFactorData}
                          significant
                          placeHolder="انتخاب کنید ..."
                        />
                        <BasicSelectOption
                          lableText="امکان تکرار"
                          significant={true}
                          placeHolder="انتخاب کنید..."
                          name="repeat"
                          data={repeatData}
                          isLoading={false}
                        />
                      </div>
                      <div></div>
                    </TwoColumn>

                    <Row>
                      <Col>
                        <FormDivider textHeader="نوع وابستگی">
                          <CardBody>
                            <Row>
                              <Col md="6">
                                <BasicSelectOption
                                  lableText="نوع وابستگی"
                                  significant={true}
                                  placeHolder="انتخاب کنید..."
                                  name="dependType"
                                  data={dependTypeData}
                                  isLoading={false}
                                />
                              </Col>
                            </Row>
                            <hr />
                            {values.dependType &&
                              values.dependType.value ===
                                TypeOfDependenceEnum.AreaOfBuildingsAndFacilities && (
                                <TwoColumn>
                                  <div>
                                    <MultiSelectOption
                                      labelText="نوع ساختمان"
                                      significant={true}
                                      hasLabel
                                      placeHolder="انتخاب کنید..."
                                      name="facilityBuildingsIds"
                                      options={buildingTypes}
                                      isLoading={buildingTypeIsFetching}
                                      onChange={(opt) =>
                                        setFieldValue(
                                          "facilityBuildingsIds",
                                          opt
                                        )
                                      }
                                    />
                                  </div>
                                  <div>
                                    <TextInput
                                      lableText="میزان مساحت مورد نیاز برای هر واحد از عامل تولید"
                                      name="areaPerUnit"
                                      placeholder="متر مربع ..."
                                      significant
                                    />
                                  </div>
                                </TwoColumn>
                              )}

                            {values.dependType &&
                              values.dependType.value ===
                                TypeOfDependenceEnum.Machinery && (
                                <TwoColumn>
                                  <div>
                                    <MultiSelectOption
                                      labelText="نوع ماشین"
                                      significant={true}
                                      hasLabel
                                      placeHolder="انتخاب کنید..."
                                      name="machineTypes"
                                      options={machineTypesData}
                                      isLoading={isGetAllMachinTypesLoading}
                                      onChange={(opt) => {
                                        setFieldValue("machineTypes", opt);
                                        if (opt) {
                                          let Ids: any = [];
                                          opt.forEach((row: any) => {
                                            Ids.push(row.value);
                                          });
                                          getMachineMutation.mutate(
                                            { typeIds: Ids },
                                            {
                                              onSuccess: (val: any) => {
                                                const result = val.data.result;
                                                let newMachineData: {
                                                  value: number;
                                                  label: string;
                                                }[] = [];
                                                result.forEach(
                                                  (row: {
                                                    id: number;
                                                    title: string;
                                                  }) => {
                                                    newMachineData.push({
                                                      value: row.id,
                                                      label: row.title,
                                                    });
                                                  }
                                                );
                                                setMachineryData(
                                                  newMachineData
                                                );
                                              },
                                            }
                                          );
                                        }
                                      }}
                                    />
                                    <MultiSelectOption
                                      labelText="نام ماشین"
                                      significant={true}
                                      hasLabel
                                      placeHolder="انتخاب کنید..."
                                      name="machineryIds"
                                      options={machineryData}
                                      isLoading={getMachineMutation.isLoading}
                                      onChange={(opt) =>
                                        setFieldValue("machineryIds", opt)
                                      }
                                    />
                                  </div>
                                  <div>
                                    <MultiSelectOption
                                      labelText="نوع ادوات و خدمات"
                                      significant={true}
                                      hasLabel
                                      placeHolder="انتخاب کنید..."
                                      name="servicesType"
                                      options={machineryData}
                                      isLoading={getMachineMutation.isLoading}
                                      onChange={(opt) =>
                                        setFieldValue("servicesType", opt)
                                      }
                                    />
                                    <MultiSelectOption
                                      labelText="نام ادوات و خدمات"
                                      significant={true}
                                      hasLabel
                                      placeHolder="انتخاب کنید..."
                                      name="machineryIds"
                                      options={machineryData}
                                      isLoading={getMachineMutation.isLoading}
                                      onChange={(opt) =>
                                        setFieldValue("machineryIds", opt)
                                      }
                                    />
                                  </div>
                                </TwoColumn>
                              )}

                            {values.dependType &&
                              values.dependType.value ===
                                TypeOfDependenceEnum.Trees && (
                                <TwoColumn>
                                  <div>
                                    <BasicSelectOption
                                      lableText="دسته بندی درخت"
                                      significant={true}
                                      placeHolder="انتخاب کنید..."
                                      name="treeCategory"
                                      data={[]}
                                      isLoading={false}
                                    />
                                    <BasicSelectOption
                                      lableText="نام درخت"
                                      significant={true}
                                      placeHolder="انتخاب کنید..."
                                      name="treeName"
                                      data={[]}
                                      isLoading={false}
                                    />
                                  </div>
                                  <div>
                                    <TextInput
                                      lableText="میزان مساحت مورد نیاز برای هر واحد از عامل تولید"
                                      name="areaPerUnit"
                                      placeholder="متر مربع ..."
                                      significant
                                    />
                                    <div style={{ marginTop: "22px" }}>
                                      <Toggle
                                        id="repeatability"
                                        name="repeatability"
                                        lableText="امکان تکرار پذیری"
                                        significant
                                        direction="ltr"
                                        className="my-1"
                                        onChange={(opt: any) => {
                                          setFieldValue(
                                            "repeatability",
                                            opt.target.checked
                                          );
                                        }}
                                      />
                                    </div>
                                  </div>
                                </TwoColumn>
                              )}

                            {values.dependType &&
                              values.dependType.value ===
                                TypeOfDependenceEnum.TotalArea && (
                                <TwoColumn>
                                  <div>
                                    <TextInput
                                      lableText="مساحت کل"
                                      name="totalArea"
                                      placeholder="متر مربع ..."
                                      significant
                                    />
                                  </div>
                                  <div>
                                    <div style={{ marginTop: "22px" }}>
                                      <Toggle
                                        id="repeatability"
                                        name="repeatability"
                                        lableText="امکان تکرار پذیری"
                                        significant
                                        direction="ltr"
                                        className="my-1"
                                        onChange={(opt: any) => {
                                          setFieldValue(
                                            "repeatability",
                                            opt.target.checked
                                          );
                                        }}
                                      />
                                    </div>
                                  </div>
                                </TwoColumn>
                              )}

                            {values.dependType &&
                              values.dependType.value ===
                                TypeOfDependenceEnum.Equipment && (
                                <TwoColumn>
                                  <div>
                                    <MultiSelectOption
                                      labelText="نام تجهیزات"
                                      significant={true}
                                      hasLabel
                                      placeHolder="انتخاب کنید..."
                                      name="equipmentIds"
                                      options={equipmentsData}
                                      isLoading={false}
                                      onChange={(opt) =>
                                        setFieldValue("machineryIds", opt)
                                      }
                                    />
                                  </div>
                                  <div></div>
                                </TwoColumn>
                              )}
                          </CardBody>
                        </FormDivider>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        {/* <FormDivider textHeader="محصولات">
                      <CardBody>
                        <FieldArray
                          name="products"
                          render={(arrayHelpers) => (
                            <div>
                              {values.products && values.products.length > 0 ? (
                                values.products.map(
                                  (friend: any, index: any) => (
                                    <div key={index}>
                                      <Row>
                                        <Col md="10">
                                          <NewProduct
                                            index={index}
                                            setFieldValue={setFieldValue}
                                            getProductCategory={
                                              getProductCategory
                                            }
                                            values={values}
                                          />
                                        </Col>
                                        <Col
                                          md="2"
                                          style={{ marginTop: "22px" }}
                                        >
                                          <SimpleSubmitButton
                                            isLoading={false}
                                            type="button"
                                            className="mb-1"
                                            outLine
                                            color="danger"
                                            onCLick={() =>
                                              arrayHelpers.remove(index)
                                            }
                                            btnText="حذف"
                                          />
                                        </Col>
                                      </Row>
                                    </div>
                                  )
                                )
                              ) : (
                                <SimpleSubmitButton
                                  isLoading={false}
                                  type="button"
                                  className="mb-1"
                                  outLine
                                  onCLick={() =>
                                    arrayHelpers.push({
                                      productCategory: null,
                                      productIds: null,
                                      maxProduction: "",
                                    })
                                  }
                                  btnText="افزودن محصول جدید"
                                />
                              )}
                              {arrayHelpers.form.values.products.length > 0 && (
                                <SimpleSubmitButton
                                  isLoading={false}
                                  type="button"
                                  className="mb-1"
                                  outLine
                                  onCLick={() =>
                                    arrayHelpers.insert(
                                      arrayHelpers.form.values.products.length,
                                      {
                                        productCategory: null,
                                        productIds: null,
                                        maxProduction: "",
                                      }
                                    )
                                  }
                                  btnText="افزودن محصول جدید"
                                />
                              )}
                            </div>
                          )}
                        ></FieldArray>
                      </CardBody>
                    </FormDivider> */}
                      </Col>
                    </Row>
                    <SubmitButton
                      isLoading={createMutation.isLoading}
                      initialValue={initialValue}
                      values={values}
                      isDisabled={false}
                    />
                  </>
                </Form>
              );
            }}
          </Formik>
        </CardBody>
      </Card>
    </>
  );
};

export { EditDependencyType };
