import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";

import {
  FieldWrapper,
  SubmitButton,
  TextInput,
  Toggle,
} from "../../../../../../../common/Form";
import BasicSelectOption from "../../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { TwoColumn } from "../../../../../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";
import { TreeSpecificationValidation } from "../../../../../../../../core/validations/inspection-tree-specifications.validation";
import {
  useGetAllSeedlingPreparationCenter,
  useGetSelcetOptionOfEnum,
  usePostSetTreesOfLicenseRequestSection,
  useSetTreesOfLicenseRequestSection,
} from "../../../../../../../../core/services/api";
import {
  useGetAllJobProductionFactorByTypeOfDependence,
  useGetJobProductByFilter,
} from "../../../../../../../../core/services/api/job.api";
import { TreesList } from "./TreesList/TreesList";
import { Col, Row } from "reactstrap";
import { showToast } from "../../../../../../../../core/utils";
import { ToastTypes } from "../../../../../../../../core/enums";
import { useParams } from "react-router-dom";

interface IPropTypes {
  tableData: any;
  setTableData: any;
  treeData: any;
  refetch: any;
  isExpert: boolean;
}

const TreeSpecificationsForm: React.FC<IPropTypes> = ({
  tableData: t1,
  setTableData: tset1,
  treeData,
  refetch,
  isExpert,
}) => {
  const [validationControll, setValidationControll] = useState(false);

  const [counter, setCounter] = useState<number>(1);
  const [tableData, setTableData] = useState<any>([]);
  const [isInEditMode, setIsInEditMode] = useState<boolean>(false);
  const [editRowID, setEditRowID] = useState<number>(0);
  const [listRowErros, setListRowErrors] = useState<number[]>([]);

  const [initialValues, setInitialValues] = useState<any>({
    // must create model in core
    treesType: null,
    productFactor: null,
    seedlingBase: null,
    seedlingPreparationCenter: null,
    areaUnderCultivation: 0,
    treeAge: null,
    treeLength: 0,
    treeWidth: 0,
    hasTree: false,
  });

  const {
    data: seeldingCenterData,
    isFetching: seedlingCenterIsFetching,
    isSuccess: seedlingCenterIsSuccess,
  } = useGetAllSeedlingPreparationCenter();

  const finalSetMutation = useSetTreesOfLicenseRequestSection();

  const [treeTypes, setTreeTypes] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const [ageOfTrees, setAgeOfTrees] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const [SeedlingBases, setSeedlingBases] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const [productFactorData, setProductFactorData] = useState<any>([
    {
      label: "انتخاب کنید",
      options: [],
    },
  ]);

  const [seedlingPreparationCenterData, setSeedlingPreparationCenterData] =
    useState<any>([
      {
        label: "انتخاب کنید",
        options: [],
      },
    ]);

  const setMutation = usePostSetTreesOfLicenseRequestSection();

  const getTreeTypeMutation = useGetSelcetOptionOfEnum();
  const getSeedlingBaseMutation = useGetSelcetOptionOfEnum();
  const getTreeAgeMutation = useGetSelcetOptionOfEnum();

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
          setTreeTypes(newList);
        }
      },
    });
  }, []);
  useEffect(() => {
    getSeedlingBaseMutation.mutate("SeedlingBaseEnum", {
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
          setSeedlingBases(newList);
        }
      },
    });
  }, []);

  useEffect(() => {
    getTreeAgeMutation.mutate("AgeOfTreesEnum", {
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
          setAgeOfTrees(newList);
        }
      },
    });
  }, []);

  const getProductionFactorMutation =
    useGetAllJobProductionFactorByTypeOfDependence();

  const { section_id } = useParams<{ section_id: string }>();

  useEffect(() => {
    console.log("resullt-----", treeData);
    let initialCounter = 1;
    if (treeData && treeData.data) {
      const result = treeData.data.result.trees;

      if (result && result.length > 0) {
        setInitialValues((prev: any) => {
          return { ...prev, hasTree: true };
        });
        result.forEach((row: any) => {
          const obj = {
            id: initialCounter,
            treeTypeEnum: row.treeTypeEnum,
            treeTypeEnumTitle: row.treeTypeEnumTitle,
            seedlingBaseEnum: row.seedlingBaseEnum,
            seedlingBaseEnumTitle: row.seedlingBaseEnumTitle,
            cultivatedArea: row.cultivatedArea,
            ageOfTreesEnum: row.ageOfTreesEnum,
            ageOfTreesEnumTitle: row.ageOfTreesEnumTitle,
            treeDimensionsLength: row.treeDimensionsLength,
            treeDimensionsWidth: row.treeDimensionsWidth,
            seedlingPreparationCenterId: row.seedlingPreparationCenterId,
            seedlingPreparationCenterIdTitle:
              row.seedlingPreparationCenterTitle,
            productionFactorId: row.productionFactorId,
            productionFactorTitle: row.productionFactorTitle,
          };

          setTableData((prev: any) => {
            return [...prev, obj];
          });

          initialCounter = initialCounter + 1;
        });

        setCounter((prev: number) => {
          return initialCounter;
        });
      }
    }
  }, [treeData]);

  useEffect(() => {
    if (seedlingCenterIsSuccess && seeldingCenterData) {
      const result = seeldingCenterData.data.result;
      let newOptions: any = [];
      result.forEach((row: any) => {
        newOptions.push({ value: row.id, label: row.name });
      });
      setSeedlingPreparationCenterData(newOptions);
    }
  }, [seedlingCenterIsSuccess]);

  useEffect(() => {
    getProductionFactorMutation.mutate(3, {
      onSuccess: (val: any) => {
        const result = val.data.result;
        let newOptions: any = [];
        result.forEach((row: any) => {
          newOptions.push({ value: row.id, label: row.title });
        });
        setProductFactorData(newOptions);
      },
    });
  }, []);
  const onSubmit = (value: any) => {
    if (isInEditMode) {
      const obj = {
        id: editRowID,
        treeTypeEnum: value.treesType.value,
        treeTypeEnumTitle: value.treesType.label,
        seedlingBaseEnum: value.seedlingBase.value,
        seedlingBaseEnumTitle: value.seedlingBase.label,
        cultivatedArea: value.areaUnderCultivation,
        ageOfTreesEnum: value.treeAge.value,
        ageOfTreesEnumTitle: value.treeAge.label,
        treeDimensionsLength: value.treeLength,
        treeDimensionsWidth: value.treeWidth,
        productionFactorId: value.productFactor.value,
        productionFactorTitle: value.productFactor.label,
        seedlingPreparationCenterId: value.seedlingPreparationCenter.value,
        seedlingPreparationCenterIdTitle: value.seedlingPreparationCenter.label,
      };

      setTableData((prev: any) => {
        const lastState = [...prev];
        let findIDIndex = lastState.findIndex(
          (row: any) => row.id === editRowID
        );
        lastState[findIDIndex] = obj;
        return lastState;
      });
      setListRowErrors([])
      setIsInEditMode(false);
      setEditRowID(0);
    } else {
      const obj = {
        id: counter,
        treeTypeEnum: value.treesType.value,
        treeTypeEnumTitle: value.treesType.label,
        seedlingBaseEnum: value.seedlingBase.value,
        seedlingBaseEnumTitle: value.seedlingBase.label,
        cultivatedArea: value.areaUnderCultivation,
        ageOfTreesEnum: value.treeAge.value,
        ageOfTreesEnumTitle: value.treeAge.label,
        treeDimensionsLength: value.treeLength,
        treeDimensionsWidth: value.treeWidth,
        productionFactorId: value.productFactor.value,
        productionFactorTitle: value.productFactor.label,
        seedlingPreparationCenterId: value.seedlingPreparationCenter.value,
        seedlingPreparationCenterIdTitle: value.seedlingPreparationCenter.label,
      };

      setTableData((prev: any) => {
        return [...prev, obj];
      });
      setCounter((prev: number) => {
        return prev + 1;
      });
      setListRowErrors([])
    }
  };

  const onFinalSubmit = (values: any) => {

    const treesObj: any = [];

    tableData.forEach((row: any) => {
      treesObj.push({
        treeTypeEnum: row.treeTypeEnum,
        seedlingBaseEnum: row.seedlingBaseEnum,
        cultivatedArea: row.cultivatedArea,
        ageOfTreesEnum: row.ageOfTreesEnum,
        treeDimensionsLength: row.treeDimensionsLength,
        treeDimensionsWidth: row.treeDimensionsWidth,
        productionFactorId: row.productionFactorId,
        numberOfOriginals: 0,
        seedlingPreparationCenterId: row.seedlingPreparationCenterId,
      });
    });

    const setTreeSpecificationObj = {
      licenseRequestSectionId: +section_id,
      trees: treesObj,
    };

    finalSetMutation.mutate(setTreeSpecificationObj, {
      onSuccess: (val: any) => {
        showToast(["با موفقیت انجام شد."], ToastTypes.success);
        setListRowErrors([])
        refetch();
      },
      onError: (err: any) => {
        try {
          let errorArray = { ...err }.response.data.result
            .reviewedProductionFactorViewModels;

          let errorMessages: string[] = [];
          let rowErros: number[] = [];
          errorArray.forEach((row: any) => {
            errorMessages.push(`وابستگی ${row.title} درست نمی باشد!`);
            rowErros.push(row.id);
          });
          setListRowErrors(rowErros);
          showToast(errorMessages, ToastTypes.error);
        } catch (err: any) {}
      },
    });
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={
          validationControll ? TreeSpecificationValidation : null
        }
        onSubmit={isExpert ? onSubmit : () => {}}
        enableReinitialize={true}
      >
        {({ values, setFieldError, setFieldValue }) => (
          <FieldWrapper setFieldError={setFieldError} useMutate={() => null}>
            <Form>
              <Toggle
                id="hasTree"
                name="hasTree"
                lableText="درخت"
                significant
                direction="ltr"
                disabled={!isExpert || tableData.length > 0}
                className="my-1"
                onChange={(opt: any) => {
                  setFieldValue("hasTree", opt.target.checked);
                  setValidationControll(opt.target.checked);
                }}
              />
              {values.hasTree && (
                <>
                  <TwoColumn>
                    <div>
                      <BasicSelectOption
                        lableText="نوع درختان"
                        name="treesType"
                        data={treeTypes}
                        placeHolder="انتخاب کنید ..."
                        significant
                        isLoading={getTreeTypeMutation.isLoading}
                        isDisabled={!isExpert}
                      />
                      <BasicSelectOption
                        lableText="درخت"
                        name="productFactor"
                        data={productFactorData}
                        placeHolder="انتخاب کنید ..."
                        isDisabled={!isExpert}
                        significant
                      />

                      <BasicSelectOption
                        lableText="پایه نهال"
                        name="seedlingBase"
                        data={SeedlingBases}
                        placeHolder="انتخاب کنید ..."
                        significant
                        isDisabled={!isExpert}
                        isLoading={getSeedlingBaseMutation.isLoading}
                      />
                      <BasicSelectOption
                        lableText="مرکز تهیه نهال / بذر"
                        name="seedlingPreparationCenter"
                        placeHolder="انتخاب کنید ..."
                        data={seedlingPreparationCenterData}
                        significant
                        isDisabled={!isExpert}
                        isLoading={seedlingCenterIsFetching}
                      />
                    </div>
                    <div>
                      {/* <TextInput
                        lableText="تعداد اصله"
                        name="countOfTree"
                        placeholder="تعداد اصله"
                        significant
                        disabled={!isExpert}
                        type="number"
                      /> */}
                      <TextInput
                        lableText="سطح زیر کشت (متر مربع)"
                        name="areaUnderCultivation"
                        placeholder="سطح زیر کشت (متر مربع)"
                        significant
                        disabled={!isExpert}
                        type="number"
                      />
                      <BasicSelectOption
                        lableText="سن درختان"
                        name="treeAge"
                        data={ageOfTrees}
                        isDisabled={!isExpert}
                        placeHolder="انتخاب کنید ..."
                        significant
                        isLoading={getTreeAgeMutation.isLoading}
                      />
                      <label> ابعاد درخت (متر) : </label>
                      <TwoColumn>
                        <TextInput
                          lableText="طول"
                          name="treeLength"
                          placeholder="طول"
                          significant
                          disabled={!isExpert}
                          type="number"
                        />

                        <TextInput
                          lableText="عرض"
                          name="treeWidth"
                          placeholder="عرض"
                          significant
                          disabled={!isExpert}
                          type="number"
                        />
                      </TwoColumn>
                    </div>
                  </TwoColumn>
                  {isExpert && (
                    <SubmitButton
                      btnText={isInEditMode ? "ثبت ویرایش" : "ثبت موقت"}
                      clearable={isInEditMode ? true : false}
                      clearableTxt="لغو ویرایش"
                      onClear={() => {
                        setIsInEditMode(false);
                        setEditRowID(0);
                        setInitialValues({
                          treesType: null,
                          productFactor: null,
                          seedlingBase: null,
                          seedlingPreparationCenter: null,
                          areaUnderCultivation: 0,
                          treeAge: null,
                          treeLength: 0,
                          treeWidth: 0,
                          hasTree: true,
                        });
                      }}
                      isLoading={false}
                    ></SubmitButton>
                  )}
                  <Row style={{ marginTop: "25px" }}>
                    <Col>
                      <TreesList
                        listRowErrors={listRowErros}
                        tableData={tableData}
                        setTableData={setTableData}
                        setInitialValues={setInitialValues}
                        setIsInEditMode={setIsInEditMode}
                        setEditRowID={setEditRowID}
                        isExpert={isExpert}
                      />
                    </Col>
                  </Row>
                </>
              )}
            </Form>
          </FieldWrapper>
        )}
      </Formik>
      {isExpert && (
        <Formik
          initialValues={tableData}
          onSubmit={onFinalSubmit}
          enableReinitialize={true}
        >
          {({ values, setFieldError, setFieldValue }) => (
            <FieldWrapper setFieldError={setFieldError} useMutate={() => null}>
              <Form style={{ marginTop: "25px" }}>
                <SubmitButton
                  btnText="ثبت نهایی"
                  isLoading={finalSetMutation.isLoading}
                  initialValue={tableData}
                  values={values}
                />
              </Form>
            </FieldWrapper>
          )}
        </Formik>
      )}
    </>
  );
};

export { TreeSpecificationsForm };
