import React, { useContext, useEffect, useState } from "react";
import { Formik, Form, FieldArray } from "formik";

import { TextInput } from "../../../../../common/Form/InputComponents/TextInputComponents/TextInput";
import { TwoColumn } from "../../../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";
import BasicSelectOption from "../../../../../common/Form/SelectOptionComponent/BasicSelectOption";
import { MultiSelectOption } from "../../../../../common/Form/SelectOptionComponent/MultiSelectOption";
import { SubmitButton } from "../../../../../common/Form/SubmitButtonComponent/SubmitButton/SubmitButton";
import { useAllAgriculturalToolsTypes, useAllUseTypes, useGetAllFacilityBuildings, useGetAllFacilityBuildingsWithType, useGetAllMachineTypes, useGetSelcetOptionOfEnum } from "../../../../../../core/services/api";
import {
  useCreateJobProductionFactor,
  useGetAllJobByUseTypeForDropDown,
  useGetAllJobByUseTypesForDropDown,
  useGetAllJobProductionFactorByJobId,
  useGetAllJobProductionFactorByJobsId,
  useGetAvailableProductionFactorBasedOnEstablishment,
  useGetJobProductionFactorDependencyDetailsByProductionFactorId,
  useSetProductionFactorDependency,
} from "../../../../../../core/services/api/job.api";
import { TypeOfDependenceEnum, TypeOfDependencePersianEnum } from "../../../../../../core/enums/type-of-dependence.enums";
import { refetchContext } from "../../../../../../core/utils/context/EventContext";
import {
  FullOptionSel,
  OptionRow,
  OptionRowSel,
} from "../../../../../../core/models";
import {  CardBody, Col, Row } from "reactstrap";
import { FormDivider, SimpleSubmitButton, Toggle } from "../../../../../common/Form";
import { NewMachinery } from "./NewMachinery/NewMachinery";
import { FullOptionCreater } from "../../../../../../core/utils/full-option-creater.utils";
import { addProductionFactorDependencyValidation } from "../../../../../../core/validations/production-factor-dependency.validation";
import { showToast } from "../../../../../../core/utils";
import { ToastTypes } from "../../../../../../core/enums";
import { useGetAllTreeCategory } from "../../../../../../core/services/api/base-tree-category.api";
import { useGetAllBaseTree } from "../../../../../../core/services/api/base-tree.api";
import { useParams } from "react-router-dom";
import { FallBackSpinner } from "../../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import TreeColumn from "../../../../../common/Wrapper/ColumnWrapper/ThreeColumn/ThreeColumn";

const AddDependencyType: React.FC = () => {

  const { id } = useParams<any>();

  const [buildingTypeData, setBuildingTypeData] = useState<any>([]);


  const getEnumMutation = useGetSelcetOptionOfEnum();

  useEffect(() => {
    getEnumMutation.mutate("FacilityBuildingsTypeEnum", {
      onSuccess: (val) => {
        try {
          const result = val.data.result;
          let typeList: FullOptionSel[] = [
            { label: "انتخاب کنید...", options: [] },
          ];

          result.forEach((item: OptionRow) => {
            typeList[0].options.push({ value: +item.id, label: item.title });
          });

          setBuildingTypeData(typeList);
        } catch (error) {}
      },
    });
  }, []);
 
  const [initialValue, setInitialValue]: any = useState<any>({
    productionFactor: null ,
    secondUseTypes: null,
    secondJob: null,
    secondProduTctionFactors: null,
    dependType: null,
    facilityBuildingsIds: null,
    areaPerUnit: "",
    machinery: [],
    treeCategory: null,
    treeName: null,
    equipmentIds: null,
    repeat: false,
    facilityBuildingsType: null
  });

  const { data: dependecyData, isFetching: dependencyIsFetching, isSuccess: dependencyIsSuccess } =
    useGetJobProductionFactorDependencyDetailsByProductionFactorId(+id);

  const getBuildingsMutation = useGetAllFacilityBuildingsWithType()

  useEffect(() => {
    if(dependecyData && dependecyData.data.result) {
      let result = dependecyData.data.result;


      let productionFactorMachineryDependencyViewModels: any = []
      let areaPerUnit = ""

      if(result.productionFactorMachineryDependencyViewModels) {
        result.productionFactorMachineryDependencyViewModels.forEach((row: any) => {

          let servicesIds : any = []

          if(row.productionFactorMachineryToolsAndServicesDependencies) {
            row.productionFactorMachineryToolsAndServicesDependencies.forEach(
              (row2: any) => {
                servicesIds.push({
                  value: row2.toolsAndServicesId,
                  label: row2.toolsAndServicesTitle,
                });
              }
            );
          }

          
          
          let servicesType : any = []

          if(row.productionFactorMachineryToolsAndServicesDependencies) {
            row.productionFactorMachineryToolsAndServicesDependencies.forEach(
              (row3: any) => {
                servicesType.push({
                  value: row3.toolsAndServicesTypeId,
                  label: "",
                });
              }
            );
          }
          productionFactorMachineryDependencyViewModels.push({
            machineTypes: { value: row.machineTypeId, label: "" },
            machineryIds: { value: row.machineryId, label: row.machineryTitle },
            servicesType: servicesType,
            servicesIds: servicesIds,
          });  
        })
      }

      let productionFactorBuildingDependencyViewModels: any = [];

      if (
        result.productionFactorBuildingDependencyViewModels &&
        result.productionFactorBuildingDependencyViewModels
          .productionFactorBuildingDependencyItemViewModels
      ) {
        areaPerUnit =
          result.productionFactorBuildingDependencyViewModels.areaPerUnit;
        result.productionFactorBuildingDependencyViewModels.productionFactorBuildingDependencyItemViewModels.forEach(
          (row: any) => {
            productionFactorBuildingDependencyViewModels.push({
              value: row.facilityBuildingsId,
              label: row.facilityBuildingsTitle,
            });
          }
        );
      }


      let baseTreeData : any = { value : 0  , label : ""}
      let baseTreeType: any = { value : 0  , label : ""}
      if (
        result.productionFactorTrees &&
        result.productionFactorTrees[0]&&
        result.productionFactorTrees[0].cultivationArea
      ) {
        areaPerUnit = result.productionFactorTrees[0].cultivationArea;
        baseTreeData = {
          value: result.productionFactorTrees[0].baseTreeId,
          label: result.productionFactorTrees[0].baseTreeTitle,
        };
        baseTreeType = {
          value: result.productionFactorTrees[0].baseTreeCategoryTypeId,
          label: result.productionFactorTrees[0].baseTreeCategoryTypeTitle,
        };
      }
     
      let jointProductionFactors : any = [];

      let secondUseTypes: any = [];
      let secondJob: any = [];
      if(result.jointProductionFactors){
        result.jointProductionFactors.forEach((row: any) => {
          jointProductionFactors.push({
            value: row.productionFactorId,
            label: row.productionFactorTitle,
          });

          secondUseTypes.push({
            value: row.sameProductionFactorJobUseTypeId,
            label: row.sameProductionFactorJobUseTypeTitle,
          });
          secondJob.push({
            value: row.sameProductionFactorJobId,
            label: row.sameProductionFactorJobTitle,
          });
        });
      }

      let productionFactorOwnToolsDependencyViewModels : any = [];

    

      if(result.productionFactorOwnToolsDependencyViewModels){
        result.productionFactorOwnToolsDependencyViewModels.forEach(
          (row: any) => {
            productionFactorOwnToolsDependencyViewModels.push({
              value: row.ownToolsEnumId,
              label: row.ownToolsEnumTitle,
            });
          }
        );
      }
      

      setInitialValue({
        productionFactor: { value: id, label: result.productionFactorTitle },
        secondUseTypes: secondUseTypes,
        secondJob: secondJob,
        secondProduTctionFactors: jointProductionFactors,
        dependType: { value: result.typeOfDependence, label: "" },
        facilityBuildingsIds: productionFactorBuildingDependencyViewModels,
        areaPerUnit: areaPerUnit,
        machinery: productionFactorMachineryDependencyViewModels,
        treeCategory: baseTreeType,
        treeName: baseTreeData,
        equipmentIds: productionFactorOwnToolsDependencyViewModels,
        repeat: result.possibilityOfRepetition === 1,
        hasDistanceLimite: result.hasDistanceLimit,
      });
    }
  },[dependencyIsSuccess])
 
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
  const [treeCategoryData, setTreeCategoryData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);
  const [treeTypeData, setTreeTypeData] = useState<FullOptionSel[]>([]);
  const [jobData, setJobData] = useState<any>([]);
  const [secondProductionFactorData, setSecondProductionFactorData] =
    useState<any>([]);
  const [productionFactorData, setProductionFactorData] = useState<any>([]);
  const [ownedToolsOptions, setOwnedToolsOptions] = useState<any>([]);

  const getAllJobsByUseTypesIds = useGetAllJobByUseTypesForDropDown();
  const getSecondProductionFactorsMutation =
    useGetAllJobProductionFactorByJobsId();
  const OwnToolsMutation = useGetSelcetOptionOfEnum();
  const setMutation = useSetProductionFactorDependency();

  const { data, isFetching, isSuccess } = useGetAllTreeCategory();

  useEffect(() => {
    OwnToolsMutation.mutate("OwnToolsEnum", {
      onSuccess: (val: any) => {
        const result = val.data.result;
        if (result) {
          let newOptions: any = [];

          result.forEach((row: any) => {
            newOptions.push({ value: row.id, label: row.title });
          });

          setOwnedToolsOptions(newOptions);
        }
      },
    });
  }, []);

  useEffect(() => {
    if (data) {
      let queryData: any = data.data.result;
      let newOptions: any = [];
      let newList: any = [
        {
          label: "انتخاب کنید ...",
          options: [],
        },
      ];

      queryData.forEach((row: any) => {
        newOptions.push({ value: row.id, label: row.title });
      });
      newList[0].options = newOptions;
      setTreeCategoryData(newList);
    }
  }, [isSuccess]);

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

  const [toolsTypeData, setToolsTypeData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const {
    data: allAgriculturalToolsTypesData,
    isFetching: allAgriculturalToolsTypesIsFetching,
    isSuccess: allAgriculturalToolsTypesIsSuccess,
  } = useAllAgriculturalToolsTypes();

  useEffect(() => {
    if (allAgriculturalToolsTypesData) {
      let queryData: any = allAgriculturalToolsTypesData;
      let newOptions: any = [];
      let newList: any = [
        {
          label: "انتخاب کنید ...",
          options: [],
        },
      ];

      queryData.forEach((row: any) => {
        newOptions.push({ value: row.id, label: row.title });
      });
      newList[0].options = newOptions;
      setToolsTypeData(newList);
    }
  }, [allAgriculturalToolsTypesIsSuccess]);

  const [machineryData, setMachineryData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);
  const [treeNameData, setTreeNameData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);
  const [secondJobData, setSecondJobData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const getAllBaseTreeMutation = useGetAllBaseTree();

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

  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

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

  const onSubmit = (values: any, { resetForm }: any) => {
    let joinProductionFactorIds: any = [];

    if (values.secondProduTctionFactors) {
      values.secondProduTctionFactors.forEach((row: any) => {
        joinProductionFactorIds.push(row.value);
      });
    }

    let facilityBuildingsIds: any = [];

    if (values.facilityBuildingsIds) {
      values.facilityBuildingsIds.forEach((row: any) => {
        facilityBuildingsIds.push(row.value);
      });
    }

    let createProductionFactorMachineryDependencyViewModel: any = [];

    if (values.machinery) {
      values.machinery.forEach((row: any) => {
        let agricultureToolsAnsServicesIds: any = [];
        row.servicesIds.forEach((row2: any) => {
          agricultureToolsAnsServicesIds.push(row2.value);
        });

        createProductionFactorMachineryDependencyViewModel.push({
          machineryId: row.machineryIds.value,
          agricultureToolsAnsServicesIds: agricultureToolsAnsServicesIds,
        });
      });
    }

    let ownToolsItems: any = [];

    if (values.equipmentIds) {
      values.equipmentIds.forEach((row: any) => {
        ownToolsItems.push(row.value);
      });
    }

    const setObj = {
      productionFactorId: values.productionFactor.value,
      repeatable:
        values.dependType.value === TypeOfDependenceEnum.Trees
          ? values.repeat2
            ? 1
            : 2
          : values.repeat
          ? 1
          : 2,
      hasDistanceLimite: values.hasDistanceLimite,
      joinProductionFactorIds: joinProductionFactorIds,
      typeOfDependence: values.dependType.value,
      baseTreeId: values.treeName ? values.treeName.value : 0,
      facilityBuildingIds: facilityBuildingsIds,
      areaPerUnit: values.areaPerUnit ? values.areaPerUnit : 0,
      createProductionFactorMachineryDependencyViewModel:
        createProductionFactorMachineryDependencyViewModel,
      ownToolsItems: ownToolsItems,
    };

    setMutation.mutate(setObj, {
      onSuccess: (val: any) => {
        showToast(["با موفقیت ثبت شد!"], ToastTypes.success);
      },
    });
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValue}
        validationSchema={addProductionFactorDependencyValidation}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form>
              {dependencyIsFetching ? (
                <FallBackSpinner />
              ) : (
                <>
                  {" "}
                  <TwoColumn>
                    <div>
                      <BasicSelectOption
                        isLoading={false}
                        lableText="عامل تولید"
                        name="productionFactor"
                        data={productionFactorData}
                        significant
                        isDisabled
                        placeHolder="انتخاب کنید ..."
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
                              <TreeColumn>
                                <div>
                                  <BasicSelectOption
                                    lableText="نوع ساختمان"
                                    significant={true}
                                    placeHolder="انتخاب کنید..."
                                    name="facilityBuildingsType"
                                    data={buildingTypeData}
                                    onChange={(opt) => {
                                      setFieldValue(
                                        "facilityBuildingsType",
                                        opt
                                      );
                                      getBuildingsMutation.mutate(opt.value, {
                                        onSuccess: (val: any) => {
                                          try {
                                            const result = val.data.result;

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
                                          } catch (err) {}
                                        },
                                        onError: (error: any) => {},
                                      });
                                    }}
                                    isLoading={false}
                                  />
                                </div>
                                <div>
                                  <MultiSelectOption
                                    labelText="نام ساختمان"
                                    significant={true}
                                    hasLabel
                                    placeHolder="انتخاب کنید..."
                                    name="facilityBuildingsIds"
                                    options={buildingTypes}
                                    isLoading={getBuildingsMutation.isLoading}
                                    onChange={(opt) =>
                                      setFieldValue("facilityBuildingsIds", opt)
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
                              </TreeColumn>
                            )}

                          {values.dependType &&
                            values.dependType.value ===
                              TypeOfDependenceEnum.Machinery && (
                              <FieldArray
                                name="machinery"
                                render={(arrayHelpers) => (
                                  <div>
                                    {values.machinery &&
                                    values.machinery.length > 0 ? (
                                      values.machinery.map(
                                        (friend: any, index: any) => (
                                          <div key={index}>
                                            <Row>
                                              <Col md="12">
                                                <NewMachinery
                                                  index={index}
                                                  values={values}
                                                  setFieldValue={setFieldValue}
                                                  machineTypesData={
                                                    machineTypesData
                                                  }
                                                  isGetAllMachinTypesLoading={
                                                    isGetAllMachinTypesLoading
                                                  }
                                                  toolsTypeData={toolsTypeData}
                                                />
                                              </Col>
                                            </Row>
                                            <Row>
                                              <Col md="2">
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
                                            <hr />
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
                                            machineTypes: null,
                                            machineryIds: null,
                                            servicesType: null,
                                            servicesIds: null,
                                          })
                                        }
                                        btnText="افزودن ماشین جدید"
                                      />
                                    )}
                                    {arrayHelpers.form.values.machinery.length >
                                      0 && (
                                      <SimpleSubmitButton
                                        isLoading={false}
                                        type="button"
                                        className="mb-1"
                                        outLine
                                        onCLick={() =>
                                          arrayHelpers.insert(
                                            arrayHelpers.form.values.machinery
                                              .length,
                                            {
                                              machineTypes: null,
                                              machineryIds: null,
                                              servicesType: null,
                                              servicesIds: null,
                                            }
                                          )
                                        }
                                        btnText="افزودن ماشین جدید"
                                      />
                                    )}
                                  </div>
                                )}
                              ></FieldArray>
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
                                    data={treeCategoryData}
                                    isLoading={isFetching}
                                    onChange={(opt: any, e: any) => {
                                      setFieldValue("treeCategory", {
                                        value: opt.value,
                                        label: opt.label,
                                      });
                                      setFieldValue("treeName", null);

                                      if (opt) {
                                        getAllBaseTreeMutation.mutate(
                                          { id: opt.value },
                                          {
                                            onSuccess: (val: any) => {
                                              const result = val.data.result;
                                              setTreeNameData(
                                                FullOptionCreater(
                                                  result,
                                                  "id",
                                                  "title"
                                                )
                                              );
                                            },
                                          }
                                        );
                                      }
                                    }}
                                  />
                                  <BasicSelectOption
                                    lableText="نام درخت"
                                    significant={true}
                                    placeHolder="انتخاب کنید..."
                                    name="treeName"
                                    data={treeNameData}
                                    isLoading={getAllBaseTreeMutation.isLoading}
                                  />

                                  <Toggle
                                    id="hasDistanceLimite"
                                    name="hasDistanceLimite"
                                    lableText="دارای حد فاصل"
                                    significant
                                    direction="ltr"
                                    className="my-1"
                                    onChange={(opt: any) => {
                                      setFieldValue(
                                        "hasDistanceLimite",
                                        opt.target.checked
                                      );
                                      setFieldValue("repeat2", false);
                                    }}
                                  />

                                  <Toggle
                                    id="repeat2"
                                    name="repeat2"
                                    lableText="وضعیت تکرار پذیری"
                                    disabled={values.hasDistanceLimite}
                                    significant
                                    direction="ltr"
                                    className="my-1"
                                    onChange={(opt: any) => {
                                      setFieldValue(
                                        "repeat2",
                                        opt.target.checked
                                      );
                                    }}
                                  />

                                  {values.hasDistanceLimite ? (
                                    <>
                                      {" "}
                                      <>
                                        <MultiSelectOption
                                          labelText="نوع کاربری تکرار پذیر"
                                          significant={true}
                                          hasLabel
                                          placeHolder="انتخاب کنید..."
                                          name="secondUseTypes"
                                          options={useTypeData}
                                          isLoading={useTypesIsFetching}
                                          onChange={(opt) => {
                                            setFieldValue(
                                              "secondUseTypes",
                                              opt
                                            );

                                            if (opt) {
                                              const useTypeIds: number[] = [];

                                              opt.forEach(
                                                (row: OptionRowSel) => {
                                                  useTypeIds.push(row.value);
                                                }
                                              );

                                              getAllJobsByUseTypesIds.mutate(
                                                { useTypesId: useTypeIds },
                                                {
                                                  onSuccess: (val) => {
                                                    let newState =
                                                      FullOptionCreater(
                                                        val.data.result,
                                                        "id",
                                                        "title"
                                                      );

                                                    setSecondJobData(newState);
                                                  },
                                                }
                                              );
                                            }
                                          }}
                                        />
                                        <MultiSelectOption
                                          labelText="شغل تکرار پذیر"
                                          significant={true}
                                          hasLabel
                                          placeHolder="انتخاب کنید..."
                                          name="secondJob"
                                          options={secondJobData}
                                          isLoading={
                                            getAllJobsByUseTypesIds.isLoading
                                          }
                                          onChange={(opt) => {
                                            setFieldValue("secondJob", opt);
                                            if (
                                              opt &&
                                              values.productionFactor
                                            ) {
                                              let jobsData: any = [];

                                              opt.forEach((row: any) => {
                                                jobsData.push(row.value);
                                              });
                                              const data = {
                                                jobsId: jobsData,
                                                exceptionProductionFactorId:
                                                  values.productionFactor.value,
                                              };
                                              getSecondProductionFactorsMutation.mutate(
                                                data,
                                                {
                                                  onSuccess: (val: any) => {
                                                    let result =
                                                      val.data.result;
                                                    let newState =
                                                      FullOptionCreater(
                                                        result,
                                                        "id",
                                                        "title"
                                                      );

                                                    setSecondProductionFactorData(
                                                      newState
                                                    );
                                                  },
                                                }
                                              );
                                            }
                                          }}
                                        />
                                        <MultiSelectOption
                                          labelText="عامل تولید های قابل تکرار"
                                          significant={true}
                                          hasLabel
                                          placeHolder="انتخاب کنید..."
                                          name="secondProduTctionFactors"
                                          options={secondProductionFactorData}
                                          isLoading={
                                            getSecondProductionFactorsMutation.isLoading
                                          }
                                        />
                                      </>
                                    </>
                                  ) : values.repeat2 ? (
                                    <>
                                      <>
                                        <MultiSelectOption
                                          labelText="نوع کاربری تکرار پذیر"
                                          significant={true}
                                          hasLabel
                                          placeHolder="انتخاب کنید..."
                                          name="secondUseTypes"
                                          options={useTypeData}
                                          isLoading={useTypesIsFetching}
                                          onChange={(opt) => {
                                            setFieldValue(
                                              "secondUseTypes",
                                              opt
                                            );

                                            if (opt) {
                                              const useTypeIds: number[] = [];

                                              opt.forEach(
                                                (row: OptionRowSel) => {
                                                  useTypeIds.push(row.value);
                                                }
                                              );

                                              getAllJobsByUseTypesIds.mutate(
                                                { useTypesId: useTypeIds },
                                                {
                                                  onSuccess: (val) => {
                                                    let newState =
                                                      FullOptionCreater(
                                                        val.data.result,
                                                        "id",
                                                        "title"
                                                      );

                                                    setSecondJobData(newState);
                                                  },
                                                }
                                              );
                                            }
                                          }}
                                        />
                                        <MultiSelectOption
                                          labelText="شغل تکرار پذیر"
                                          significant={true}
                                          hasLabel
                                          placeHolder="انتخاب کنید..."
                                          name="secondJob"
                                          options={secondJobData}
                                          isLoading={
                                            getAllJobsByUseTypesIds.isLoading
                                          }
                                          onChange={(opt) => {
                                            setFieldValue("secondJob", opt);
                                            if (
                                              opt &&
                                              values.productionFactor
                                            ) {
                                              let jobsData: any = [];

                                              opt.forEach((row: any) => {
                                                jobsData.push(row.value);
                                              });
                                              const data = {
                                                jobsId: jobsData,
                                              };
                                              getSecondProductionFactorsMutation.mutate(
                                                data,
                                                {
                                                  onSuccess: (val: any) => {
                                                    let result =
                                                      val.data.result;
                                                    let newState =
                                                      FullOptionCreater(
                                                        result,
                                                        "id",
                                                        "title"
                                                      );

                                                    setSecondProductionFactorData(
                                                      newState
                                                    );
                                                  },
                                                }
                                              );
                                            }
                                          }}
                                        />
                                        <MultiSelectOption
                                          labelText="عامل تولید های قابل تکرار"
                                          significant={true}
                                          hasLabel
                                          placeHolder="انتخاب کنید..."
                                          name="secondProduTctionFactors"
                                          options={secondProductionFactorData}
                                          isLoading={
                                            getSecondProductionFactorsMutation.isLoading
                                          }
                                        />
                                      </>
                                    </>
                                  ) : (
                                    <></>
                                  )}
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
                              TypeOfDependenceEnum.TotalArea && (
                              <TwoColumn>
                                <div>
                                  <Toggle
                                    id="repeat"
                                    name="repeat"
                                    lableText="وضعیت تکرار پذیری"
                                    significant
                                    direction="ltr"
                                    className="my-1"
                                    onChange={(opt: any) => {
                                      setFieldValue(
                                        "repeat",
                                        opt.target.checked
                                      );
                                    }}
                                  />

                                  {values.repeat ? (
                                    <>
                                      <MultiSelectOption
                                        labelText="نوع کاربری تکرار پذیر"
                                        significant={true}
                                        hasLabel
                                        placeHolder="انتخاب کنید..."
                                        name="secondUseTypes"
                                        options={useTypeData}
                                        isLoading={useTypesIsFetching}
                                        onChange={(opt) => {
                                          setFieldValue("secondUseTypes", opt);

                                          if (opt) {
                                            const useTypeIds: number[] = [];

                                            opt.forEach((row: OptionRowSel) => {
                                              useTypeIds.push(row.value);
                                            });

                                            getAllJobsByUseTypesIds.mutate(
                                              { useTypesId: useTypeIds },
                                              {
                                                onSuccess: (val) => {
                                                  let newState =
                                                    FullOptionCreater(
                                                      val.data.result,
                                                      "id",
                                                      "title"
                                                    );

                                                  setSecondJobData(newState);
                                                },
                                              }
                                            );
                                          }
                                        }}
                                      />
                                      <MultiSelectOption
                                        labelText="شغل تکرار پذیر"
                                        significant={true}
                                        hasLabel
                                        placeHolder="انتخاب کنید..."
                                        name="secondJob"
                                        options={secondJobData}
                                        isLoading={
                                          getAllJobsByUseTypesIds.isLoading
                                        }
                                        onChange={(opt) => {
                                          setFieldValue("secondJob", opt);
                                          if (opt && values.productionFactor) {
                                            let jobsData: any = [];

                                            opt.forEach((row: any) => {
                                              jobsData.push(row.value);
                                            });
                                            const data = {
                                              jobsId: jobsData,
                                            };
                                            getSecondProductionFactorsMutation.mutate(
                                              data,
                                              {
                                                onSuccess: (val: any) => {
                                                  let result = val.data.result;
                                                  let newState =
                                                    FullOptionCreater(
                                                      result,
                                                      "id",
                                                      "title"
                                                    );

                                                  setSecondProductionFactorData(
                                                    newState
                                                  );
                                                },
                                              }
                                            );
                                          }
                                        }}
                                      />
                                      <MultiSelectOption
                                        labelText="عامل تولید های قابل تکرار"
                                        significant={true}
                                        hasLabel
                                        placeHolder="انتخاب کنید..."
                                        name="secondProduTctionFactors"
                                        options={secondProductionFactorData}
                                        isLoading={
                                          getSecondProductionFactorsMutation.isLoading
                                        }
                                      />
                                    </>
                                  ) : (
                                    <></>
                                  )}
                                </div>
                                <div>
                                  <div style={{ marginTop: "22px" }}></div>
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
                                    options={ownedToolsOptions}
                                    isLoading={OwnToolsMutation.isLoading}
                                    onChange={(opt) =>
                                      setFieldValue("equipmentIds", opt)
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
                  <SubmitButton
                    isLoading={setMutation.isLoading}
                    initialValue={initialValue}
                    values={values}
                    isDisabled={false}
                  />
                </>
              )}
              <></>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export { AddDependencyType };
