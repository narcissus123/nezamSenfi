import { Form, Formik } from "formik";
import * as React from "react";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Alert, Col, Row } from "reactstrap";
import { ToastTypes } from "../../../../../../../../core/enums";
import { TypeOfDependenceEnum } from "../../../../../../../../core/enums/type-of-dependence.enums";
import {
  useGetAgriculturalMechanizationServiceOfProductionFactorMachineByExpert,
  useGetAllMachineByProductionFactorId,
  useGetCurrentYear,
  useGetOwnToolsOfProductionFactorIdByExpert,
  useSetActivityOfLicenseRequest,
  useSetActivityOfLicenseRequestSection,
} from "../../../../../../../../core/services/api";
import {
  useGetAllJobFigureByProductId,
  useGetAllJobProductByProductionFactorId,
  useGetAllJobProductionFactorByJobId,
  useGetAllJobsWithUseTypeOfLicenseRequestPrimaryInfo,
} from "../../../../../../../../core/services/api/job.api";
import { fullOption, showToast } from "../../../../../../../../core/utils";
import { FullOptionCreater } from "../../../../../../../../core/utils/full-option-creater.utils";
import { inspectionCapacityValidation } from "../../../../../../../../core/validations/Inspection-capacity.validation";
import {
  FieldWrapper,
  SubmitButton,
  TextInput,
} from "../../../../../../../common/Form";
import BasicSelectOption from "../../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { SweetAlertCallback } from "../../../../../../../common/SweetAlert/SweetALertCallback/SweetALertCallback";
import { TwoColumn } from "../../../../../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";
import { CapacityList } from "./CapacityList/CapacityList";


export const checkProductionCapacityValidity = (
  firstVal: string,
  secondVal: string,
  maxFirstVal: string,
  maxSecondVal: string
) => {
  console.log(parseFloat(firstVal) , parseFloat(secondVal) ,  parseFloat(maxFirstVal) , parseFloat(maxSecondVal));
  
  return parseFloat(firstVal) * parseFloat(secondVal) <=  parseFloat(maxFirstVal) * parseFloat(maxSecondVal) ;
};

const checkYearlyCapacity = (first : string, second : any ) => {
  if( first && second && second.value ) {
    return +first * +second.value;
  }
}

export const numberOfyearsData = [
  {
    label: "انتخاب کنید ...",
    options: [
      { value: 1, label: "1 دوره" },
      { value: 2, label: "2 دوره" },
      { value: 3, label: "3 دوره" },
      { value: 4, label: "4 دوره" },
      { value: 5, label: "5 دوره" },
      { value: 6, label: "6 دوره" },
      { value: 7, label: "7 دوره" },
      { value: 8, label: "8 دوره" },
      { value: 9, label: "9 دوره" },
      { value: 10, label: "10 دوره" },
      { value: 11, label: "11 دوره" },
      { value: 12, label: "12 دوره" },
      { value: 1 / 2, label: "1/2 دوره" },
      { value: 1 / 3, label: "1/3 دوره" },
      { value: 1 / 4, label: "1/4 دوره" },
      { value: 1 / 5, label: "1/5 دوره" },
    ],
  },
];

interface IPropTypes {
  refetch: any;
  activityData: any;
  isExpert: boolean;
  fixedOrMobieTypeByExpert?: number;
}

const CapacityForm: React.FC<IPropTypes> = ({
  refetch,
  activityData,
  isExpert,
  fixedOrMobieTypeByExpert = 1,
}) => {
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const deleteClickHandler = () => {
    setShowConfirmation(true);
  };
  const [isInEditMode, setIsInEditMode] = useState<boolean>(false);
  const [listRowErros, setListRowErrors] = useState<number[]>([]);
  const [editRowID, setEditRowID] = useState<number>(0);
  const [initialValues, setInitialValues] = useState<any>({
    job: null,
    productionFactor: null,
    activityRate: 0,
    numberOfyears: null,
    productionYearNum: null,
    mainProductName: null,
    mainProductItem: null,
    productionUnitOfActivity: 0,
    productionFactorMachineId: null,
    productionFactorMachineAgricultureToolsAndServiceId: null,
    numberOfAgriculturalToolsAndService: "",
    ownToolsEnum: null,
  });

  const setValuesToDefault = () => {
    setInitialValues({
      job: null,
      productionFactor: null,
      activityRate: 0,
      numberOfyears: null,
      productionYearNum: null,
      mainProductName: null,
      mainProductItem: null,
      productionUnitOfActivity: 0,
      productionFactorMachineId: null,
      productionFactorMachineAgricultureToolsAndServiceId: null,
      numberOfAgriculturalToolsAndService: "",
      ownToolsEnum: null,
    });
  }

   const {
    data: currentYearData,
    isSuccess: currentYearIsSuccess,
    isFetching: currentYearIsFetching,
  } = useGetCurrentYear();
  const [productionYearNumData, setproductionYearNumData] = useState<any>([]);

  const [jobData, setJobData] = useState<any>([]);
  const [productionFactorData, setProductionFactorData] = useState<any>([]);
  const [machineryData, setMachineryData] = useState<any>([]);
  const [
    productionFactorMachineAgricultureToolsAndServiceIdData,
    setProductionFactorMachineAgricultureToolsAndServiceIdData,
  ] = useState<any>([]);
  const [tableData, setTableData] = useState<any>([]);
  const [counter, setCounter] = useState<number>(1);
  const [useTypeData, setUseTypeData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const [mainProductNameData, setMainProductNameData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const [productItemData, setProductItemData] = useState<any>([
    {
      label: "انتخاب کنید",
      options: [],
    },
  ]);

  const [ownToolsEnumData, setOwnToolsEnumData] = useState<any>([
    {
      label: "انتخاب کنید",
      options: [],
    },
  ]);

  const getJobsMutation = useGetAllJobsWithUseTypeOfLicenseRequestPrimaryInfo();
  const getJobFactorMutation = useGetAllJobProductionFactorByJobId();
  const getProductMutation = useGetAllJobProductByProductionFactorId();
  const getProductFigureListMutation = useGetAllJobFigureByProductId();
  const getMachineByProductionFactorMutation = useGetAllMachineByProductionFactorId()
  const getAgriculturalToolsMutation = useGetAgriculturalMechanizationServiceOfProductionFactorMachineByExpert()
  const getOwnedToolsOfProductionFactorMutation = useGetOwnToolsOfProductionFactorIdByExpert();
  
  const { section_id, req_id } =
    useParams<{ section_id: string; req_id: string }>();

  useEffect(() => {
    let initialCounter = 1;
    if (activityData && activityData.data) {
      const result = activityData.data.result.activities;

      if (result && result.length > 0) {
        setInitialValues((prev: any) => {
          return { ...prev };
        });
        result.forEach((row: any) => {
          const obj = {
            id: initialCounter,
            mainProductName: row.productId,
            mainProductNameTitle: row.productTitle,
            maximumCapacity: row.maximumCapacity,
            job: row.jobId,
            jobTitle: row.jobTitle,
            activityRate: row.activityRate,
            periodInYearEnum: row.periodInYearEnum,
            periodInYearEnumTitle: fullOption(
              row.periodInYearEnum,
              numberOfyearsData
            )!.label,
            productionYearNum: row.productionYearNum,
            productionYearNumTitle: row.productionYearNum,
            productionUniPerYear: row.productionUniPerYear,
            isDeleted: true,
            productionFactorId: row.productionFactorId,
            productionFactorIdTitle: row.productionFactorTitle,
            figureId: row.figureId,
            figureIdTitle: row.figureTitle,
            productionFactorMachineId: row.machineId,
            productionFactorMachineIdTitle: row.machineTitle,
            productionFactorMachineAgricultureToolsAndServiceId:
              row.agriculturalToolsAndServicesId,
            productionFactorMachineAgricultureToolsAndServiceIdTitle:
              row.agriculturalToolsAndServicesTitle,
            numberOfAgriculturalToolsAndService:
              row.numberOfAgriculturalToolsAndService,
            ownToolsEnum: row.ownToolsEnum,
            ownToolsEnumTitle: row.ownToolsEnumTitle,
            typeOfDependence: row.typeOfDependence,
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
  }, [activityData]);

  useEffect(() => {
    if (
      initialValues.productionFactor &&
      initialValues.productionFactor.value &&
      initialValues.productionFactor.value !== 0
    ) {
      getProductMutation.mutate(initialValues.productionFactor.value, {
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
                label: `${job.title} - ${job.concatedCode}`,
                maximumCapacity: job.maximumCapacity,
              });
            });
            setMainProductNameData(pro);
          }
        },
      });
    }
  }, [initialValues]);

  useEffect(() => {
    if (currentYearData && currentYearData.data) {
      let result = currentYearData.data.result;

      let pro: any = [];
      for (let i = 0; i < 5; i++) {
        pro.push({ value: result, label: result });
        result = result - 1;
      }
      setproductionYearNumData(pro);
    }
  }, [currentYearIsSuccess]);

  useEffect(() => {
    getJobsMutation.mutate(+req_id, {
      onSuccess: (val: any) => {
        const result = val.data.result.useTypes;
        const finalJob: any = [];
        result.forEach((useType: any) => {
          const job: any = {
            label: useType.useTypeTitle,
            options: [],
          };
          useType.useTypeJobs.forEach((jobItem: any) => {
            job.options.push({
              value: jobItem.useTypeJobId,
              label: jobItem.useTypeJobTitle,
            });
          });
          finalJob.push(job);
        });
        setJobData(finalJob);
      },
    });
  }, []);

  const onSubmit = (value: any) => {
    if (
      !checkProductionCapacityValidity(
        value.numberOfyears ? value.numberOfyears.value : 0,
        value.productionUnitOfActivity,
        value.mainProductName ? value.mainProductName.maximumCapacity : 0,
        value.productionFactor
          ? value.productionFactor.typeOfDependence ===
            TypeOfDependenceEnum.Machinery
            ? value.numberOfAgriculturalToolsAndService < value.activityRate
              ? value.numberOfAgriculturalToolsAndService
              : value.activityRate
            : value.activityRate
          : 0
      )
    ) {
      return setShowConfirmation(true);
    }
    
    if (isInEditMode) {

      const obj = {
        id: editRowID,
        activityRate: value.activityRate,

        mainProductName: value.mainProductName.value,
        mainProductNameTitle: value.mainProductName.label,
        maximumCapacity: value.mainProductName.maximumCapacity,
        job: value.job.value,
        jobTitle: value.job.label,

        periodInYearEnum: value.numberOfyears.value,
        periodInYearEnumTitle: value.numberOfyears.label,
        productionYearNum: value.productionYearNum.value,
        productionYearNumTitle: value.productionYearNum.label,
        productionUniPerYear: value.productionUnitOfActivity,
        isDeleted: true,
        productionFactorId: value.productionFactor.value,
        productionFactorIdTitle: value.productionFactor.label,
        typeOfDependence: value.productionFactor.typeOfDependence,
        figureId: value.mainProductItem.value,
        figureIdTitle: value.mainProductItem.label,
        productionFactorMachineId: value.productionFactorMachineId
          ? value.productionFactorMachineId.value
          : 0,
        productionFactorMachineIdTitle: value.productionFactorMachineId
          ? value.productionFactorMachineId.label
          : "",
        machineId: value.productionFactorMachineId
          ? value.productionFactorMachineId.machineId
          : 0,
        productionFactorMachineAgricultureToolsAndServiceId:
          value.productionFactorMachineAgricultureToolsAndServiceId
            ? value.productionFactorMachineAgricultureToolsAndServiceId.value
            : 0,
        productionFactorMachineAgricultureToolsAndServiceIdTitle:
          value.productionFactorMachineAgricultureToolsAndServiceId
            ? value.productionFactorMachineAgricultureToolsAndServiceId.label
            : 0,
        agricultureToolsAndServiceId:
          value.productionFactorMachineAgricultureToolsAndServiceId
            ? value.productionFactorMachineAgricultureToolsAndServiceId
                .agricultureToolsAndServiceId
            : 0,
        numberOfAgriculturalToolsAndService:
          value.numberOfAgriculturalToolsAndService
            ? value.numberOfAgriculturalToolsAndService
            : 0,
        ownToolsEnum: value.ownToolsEnum ? value.ownToolsEnum.value : 0,
        ownToolsEnumTitle: value.ownToolsEnum ? value.ownToolsEnum.label : 0,
        productId: value.mainProductName ? value.mainProductName.value : 0,
        productIdTitle: value.mainProductName ? value.mainProductName.label : 0,
      };

      setTableData((prev: any) => {
        const lastState = [...prev];
        let findIDIndex = lastState.findIndex(
          (row: any) => row.id === editRowID
        );
        lastState[findIDIndex] = obj;
        return lastState;
      });
      setListRowErrors([]);
      setIsInEditMode(false);
      setEditRowID(0);
    } else {
      const obj = {
        id: counter,

        mainProductName: value.mainProductName.value,
        mainProductNameTitle: value.mainProductName.label,
        job: value.job.value,
        jobTitle: value.job.label,
        maximumCapacity: value.mainProductName.maximumCapacity,

        activityRate: value.activityRate,
        periodInYearEnum: value.numberOfyears.value,
        periodInYearEnumTitle: value.numberOfyears.label,
        productionYearNum: value.productionYearNum.value,
        productionYearNumTitle: value.productionYearNum.label,
        productionUniPerYear: value.productionUnitOfActivity,
        isDeleted: true,
        productionFactorId: value.productionFactor.value,
        productionFactorIdTitle: value.productionFactor.label,
        typeOfDependence: value.productionFactor.typeOfDependence,
        figureId: value.mainProductItem.value,
        figureIdTitle: value.mainProductItem.label,
        productionFactorMachineId: value.productionFactorMachineId
          ? value.productionFactorMachineId.value
          : 0,
        productionFactorMachineIdTitle: value.productionFactorMachineId
          ? value.productionFactorMachineId.label
          : "",
        machineId: value.productionFactorMachineId
          ? value.productionFactorMachineId.machineId
          : 0,
        productionFactorMachineAgricultureToolsAndServiceId:
          value.productionFactorMachineAgricultureToolsAndServiceId
            ? value.productionFactorMachineAgricultureToolsAndServiceId.value
            : 0,
        productionFactorMachineAgricultureToolsAndServiceIdTitle:
          value.productionFactorMachineAgricultureToolsAndServiceId
            ? value.productionFactorMachineAgricultureToolsAndServiceId.label
            : 0,
        agricultureToolsAndServiceId:
          value.productionFactorMachineAgricultureToolsAndServiceId
            ? value.productionFactorMachineAgricultureToolsAndServiceId
                .agricultureToolsAndServiceId
            : 0,
        numberOfAgriculturalToolsAndService:
          value.numberOfAgriculturalToolsAndService
            ? value.numberOfAgriculturalToolsAndService
            : 0,
        ownToolsEnum: value.ownToolsEnum ? value.ownToolsEnum.value : 0,
        ownToolsEnumTitle: value.ownToolsEnum ? value.ownToolsEnum.label : 0,
        productId: value.mainProductName ? value.mainProductName.value : 0,
        productIdTitle: value.mainProductName ? value.mainProductName.label : 0,
      };

      setTableData((prev: any) => {
        return [...prev, obj];
      });
      setCounter((prev: number) => {
        return prev + 1;
      });
      setListRowErrors([]);
    }

    setValuesToDefault()
  };

  const setMutation = useSetActivityOfLicenseRequestSection();
  const setMobilityMutation = useSetActivityOfLicenseRequest();

  const onFinalSubmit = (values: any) => {
    const capacityObj: any = [];

    tableData.forEach((row: any) => {
      capacityObj.push({
        activityRate: row.activityRate,
        periodInYearEnum: row.periodInYearEnum,
        productionYearNum: row.productionYearNum,
        productionUniPerYear: row.productionUniPerYear,
        isDeleted: true,
        productionFactorId: row.productionFactorId,
        figureId: row.figureId,
        productionFactorMachineId: row.productionFactorMachineId,
        machineId: row.machineId,
        productionFactorMachineAgricultureToolsAndServiceId:
          row.productionFactorMachineAgricultureToolsAndServiceId,
        agricultureToolsAndServiceId: row.agricultureToolsAndServiceId,
        numberOfAgriculturalToolsAndService:
          row.numberOfAgriculturalToolsAndService,
        ownToolsEnum: row.ownToolsEnum,
        productId: row.productId,
      });
    });

    const setCapacityObj = {
      licenseRequestSectionId: +section_id,
      activities: capacityObj,
      licenseRequestId: +req_id,
    };

    if (fixedOrMobieTypeByExpert === 1)
      setMutation.mutate(setCapacityObj, {
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
    else if (fixedOrMobieTypeByExpert === 2)
      setMobilityMutation.mutate(setCapacityObj, {
        onSuccess: (val: any) => {
          showToast(["با موفقیت انجام شد."], ToastTypes.success);
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
        validationSchema={inspectionCapacityValidation}
        onSubmit={isExpert ? onSubmit : () => {}}
        enableReinitialize={true}
      >
        {({ values, setFieldError, setFieldValue }) => {
          console.log("--values --", values);

          return (
            <FieldWrapper setFieldError={setFieldError} useMutate={() => null}>
              <SweetAlertCallback
                mutation={false}
                title="آیا مطمئنید؟"
                onCancel={() => {
                  setShowConfirmation(false);
                }}
                onClose={() => {
                  setShowConfirmation(false);
                }}
                onConfirm={() => {
                  setShowConfirmation(false);
                  try {
                    if (isInEditMode) {
                      const obj = {
                        id: editRowID,

                        mainProductName: values.mainProductName.value,
                        mainProductNameTitle: values.mainProductName.label,
                        maximumCapacity: values.mainProductName.maximumCapacity,
                        job: values.job.value,
                        jobTitle: values.job.label,

                        activityRate: values.activityRate,
                        periodInYearEnum: values.numberOfyears.value,
                        periodInYearEnumTitle: values.numberOfyears.label,
                        productionYearNum: values.productionYearNum.value,
                        productionYearNumTitle: values.productionYearNum.label,
                        productionUniPerYear: values.productionUnitOfActivity,
                        isDeleted: true,
                        productionFactorId: values.productionFactor.value,
                        productionFactorIdTitle: values.productionFactor.label,
                        figureId: values.mainProductItem.value,
                        figureIdTitle: values.mainProductItem.label,
                        productionFactorMachineId:
                          values.productionFactorMachineId
                            ? values.productionFactorMachineId.value
                            : 0,
                        productionFactorMachineIdTitle:
                          values.productionFactorMachineId
                            ? values.productionFactorMachineId.label
                            : "",
                        machineId: values.productionFactorMachineId
                          ? values.productionFactorMachineId.machineId
                          : 0,
                        productionFactorMachineAgricultureToolsAndServiceId:
                          values.productionFactorMachineAgricultureToolsAndServiceId
                            ? values
                                .productionFactorMachineAgricultureToolsAndServiceId
                                .value
                            : 0,
                        productionFactorMachineAgricultureToolsAndServiceIdTitle:
                          values.productionFactorMachineAgricultureToolsAndServiceId
                            ? values
                                .productionFactorMachineAgricultureToolsAndServiceId
                                .label
                            : 0,
                        agricultureToolsAndServiceId:
                          values.productionFactorMachineAgricultureToolsAndServiceId
                            ? values
                                .productionFactorMachineAgricultureToolsAndServiceId
                                .agricultureToolsAndServiceId
                            : 0,
                        numberOfAgriculturalToolsAndService:
                          values.numberOfAgriculturalToolsAndService
                            ? values.numberOfAgriculturalToolsAndService
                            : 0,
                        ownToolsEnum: values.ownToolsEnum
                          ? values.ownToolsEnum.value
                          : 0,
                        ownToolsEnumTitle: values.ownToolsEnum
                          ? values.ownToolsEnum.label
                          : 0,
                        productId: values.mainProductName
                          ? values.mainProductName.value
                          : 0,
                        productIdTitle: values.mainProductName
                          ? values.mainProductName.label
                          : 0,
                      };

                      setTableData((prev: any) => {
                        const lastState = [...prev];
                        let findIDIndex = lastState.findIndex(
                          (row: any) => row.id === editRowID
                        );
                        lastState[findIDIndex] = obj;
                        return lastState;
                      });

                      setIsInEditMode(false);
                      setEditRowID(0);
                    } else {
                      const obj = {
                        id: counter,

                        mainProductName: values.mainProductName.value,
                        mainProductNameTitle: values.mainProductName.label,
                        maximumCapacity: values.mainProductName.maximumCapacity,
                        job: values.job.value,
                        jobTitle: values.job.label,

                        activityRate: values.activityRate,
                        periodInYearEnum: values.numberOfyears.value,
                        periodInYearEnumTitle: values.numberOfyears.label,
                        productionYearNum: values.productionYearNum.value,
                        productionYearNumTitle: values.productionYearNum.label,
                        productionUniPerYear: values.productionUnitOfActivity,
                        isDeleted: true,
                        productionFactorId: values.productionFactor.value,
                        productionFactorIdTitle: values.productionFactor.label,
                        figureId: values.mainProductItem.value,
                        figureIdTitle: values.mainProductItem.label,
                        productionFactorMachineId:
                          values.productionFactorMachineId
                            ? values.productionFactorMachineId.value
                            : 0,
                        productionFactorMachineIdTitle:
                          values.productionFactorMachineId
                            ? values.productionFactorMachineId.label
                            : "",
                        machineId: values.productionFactorMachineId
                          ? values.productionFactorMachineId.machineId
                          : 0,
                        productionFactorMachineAgricultureToolsAndServiceId:
                          values.productionFactorMachineAgricultureToolsAndServiceId
                            ? values
                                .productionFactorMachineAgricultureToolsAndServiceId
                                .value
                            : 0,
                        productionFactorMachineAgricultureToolsAndServiceIdTitle:
                          values.productionFactorMachineAgricultureToolsAndServiceId
                            ? values
                                .productionFactorMachineAgricultureToolsAndServiceId
                                .label
                            : 0,
                        agricultureToolsAndServiceId:
                          values.productionFactorMachineAgricultureToolsAndServiceId
                            ? values
                                .productionFactorMachineAgricultureToolsAndServiceId
                                .agricultureToolsAndServiceId
                            : 0,
                        numberOfAgriculturalToolsAndService:
                          values.numberOfAgriculturalToolsAndService
                            ? values.numberOfAgriculturalToolsAndService
                            : 0,
                        ownToolsEnum: values.ownToolsEnum
                          ? values.ownToolsEnum.value
                          : 0,
                        ownToolsEnumTitle: values.ownToolsEnum
                          ? values.ownToolsEnum.label
                          : 0,
                        productId: values.mainProductName
                          ? values.mainProductName.value
                          : 0,
                        productIdTitle: values.mainProductName
                          ? values.mainProductName.label
                          : 0,
                      };

                      setTableData((prev: any) => {
                        return [...prev, obj];
                      });
                      setCounter((prev: number) => {
                        return prev + 1;
                      });
                    }
                    setValuesToDefault();
                  } catch (err) {
                    setValuesToDefault();
                  }
                }}
                show={showConfirmation}
              >
                {`حداکثر مقدار وارد شده برای ظرفیت سالانه می تواند ${
                  (values.productionFactor
                    ? values.productionFactor.typeOfDependence ===
                      TypeOfDependenceEnum.Machinery
                      ? values.numberOfAgriculturalToolsAndService <
                        values.activityRate
                        ? values.numberOfAgriculturalToolsAndService
                        : values.activityRate
                      : values.activityRate
                    : 0) *
                  (values.mainProductName
                    ? values.mainProductName.maximumCapacity
                      ? values.mainProductName.maximumCapacity
                      : 0
                    : 0
                  ).toFixed(2)
                } باشد!`}
              </SweetAlertCallback>
              <Form>
                <TwoColumn>
                  <div>
                    <BasicSelectOption
                      lableText="شغل"
                      name="job"
                      data={jobData}
                      significant
                      isLoading={getJobsMutation.isLoading}
                      isDisabled={!isExpert}
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
                                    typeOfDependence: job.typeOfDependence,
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
                      isDisabled={!isExpert}
                      significant
                      placeHolder="بخش مورد نظر را انتخاب کنید"
                      onChange={(opt: any, e: any) => {
                        setFieldValue("productionFactor", {
                          value: opt.value,
                          label: opt.label,
                          typeOfDependence: opt.typeOfDependence,
                        });

                        setFieldValue("productionFactorMachineId", null);
                        setFieldValue(
                          "productionFactorMachineAgricultureToolsAndServiceId",
                          null
                        );

                        if (opt) {
                          getProductMutation.mutate(opt.value, {
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
                                    label: `${job.title} - ${job.concatedCode}`,
                                    maximumCapacity: job.maximumCapacity,
                                  });
                                });
                                setMainProductNameData(pro);
                              }
                            },
                          });
                          if (
                            opt.typeOfDependence ===
                            TypeOfDependenceEnum.Machinery
                          ) {
                            getMachineByProductionFactorMutation.mutate(
                              { id: opt.value },
                              {
                                onSuccess: (val: any) => {
                                  let newState: any = FullOptionCreater(
                                    val,
                                    "id",
                                    "title"
                                  );
                                  setMachineryData(newState);
                                },
                              }
                            );
                          }

                          if (
                            opt.typeOfDependence ===
                            TypeOfDependenceEnum.Equipment
                          ) {
                            getOwnedToolsOfProductionFactorMutation.mutate(
                              { productionFactorId: opt.value },
                              {
                                onSuccess: (val: any) => {
                                  let newState: any = FullOptionCreater(
                                    val,
                                    "ownTools",
                                    "ownToolsTitle"
                                  );
                                  setOwnToolsEnumData(newState);
                                },
                              }
                            );
                          }
                        }
                      }}
                    />
                    {values.productionFactor &&
                      values.productionFactor.typeOfDependence ===
                        TypeOfDependenceEnum.Machinery && (
                        <>
                          <BasicSelectOption
                            lableText="ماشین آلات"
                            name="productionFactorMachineId"
                            data={machineryData}
                            isLoading={
                              getMachineByProductionFactorMutation.isLoading
                            }
                            isDisabled={!isExpert}
                            significant
                            placeHolder="انتخاب کنید ..."
                            onChange={(opt: any, e: any) => {
                              setFieldValue("productionFactorMachineId", {
                                value: opt.value,
                                label: opt.label,
                                ...opt,
                              });
                              if (opt) {
                                getAgriculturalToolsMutation.mutate(
                                  {
                                    licenseRequestId: +req_id,
                                    productionFactorMachineId: opt.value,
                                  },
                                  {
                                    onSuccess: (val: any) => {
                                      let newState: any = FullOptionCreater(
                                        val,
                                        "agricultureToolsAndServiceProductionFactorMachineId",
                                        "agricultureToolsAndServiceTitle"
                                      );
                                      setProductionFactorMachineAgricultureToolsAndServiceIdData(
                                        newState
                                      );
                                    },
                                  }
                                );
                              }
                            }}
                          />

                          <BasicSelectOption
                            lableText="ادوات و خدمات"
                            name="productionFactorMachineAgricultureToolsAndServiceId"
                            data={
                              productionFactorMachineAgricultureToolsAndServiceIdData
                            }
                            isLoading={getAgriculturalToolsMutation.isLoading}
                            isDisabled={!isExpert}
                            significant
                            placeHolder="انتخاب کنید ..."
                          />

                          <TextInput
                            lableText="تعداد ادوات و خدمات"
                            name="numberOfAgriculturalToolsAndService"
                            placeholder="عدد وارد کنید ..."
                            significant
                            disabled={!isExpert}
                            type="number"
                          />
                        </>
                      )}

                    {values.productionFactor &&
                      values.productionFactor.typeOfDependence ===
                        TypeOfDependenceEnum.Equipment && (
                        <>
                          <BasicSelectOption
                            lableText="تجهیزات عامل تولید"
                            name="ownToolsEnum"
                            data={ownToolsEnumData}
                            isLoading={
                              getOwnedToolsOfProductionFactorMutation.isLoading
                            }
                            isDisabled={!isExpert}
                            significant
                            placeHolder="انتخاب کنید ..."
                          />
                        </>
                      )}

                    <TextInput
                      lableText="میزان فعالیت"
                      name="activityRate"
                      placeholder="میزان فعالیت "
                      significant
                      disabled={!isExpert}
                      type="number"
                    />
                    <BasicSelectOption
                      lableText="تعداد دوره در سال"
                      name="numberOfyears"
                      data={numberOfyearsData}
                      isDisabled={!isExpert}
                      significant
                      placeHolder="بخش مورد نظر را انتخاب کنید"
                    />
                    <BasicSelectOption
                      lableText="سال تولید"
                      name="productionYearNum"
                      data={productionYearNumData}
                      isLoading={currentYearIsFetching}
                      isDisabled={!isExpert}
                      significant
                      placeHolder="بخش مورد نظر را انتخاب کنید"
                    />
                  </div>
                  <div>
                    <BasicSelectOption
                      lableText="نام محصول اصلی"
                      name="mainProductName"
                      data={mainProductNameData}
                      isDisabled={!isExpert}
                      significant
                      placeHolder="بخش مورد نظر را انتخاب کنید"
                      isLoading={getProductMutation.isLoading}
                      onChange={(opt, e) => {
                        setFieldValue("mainProductName", {
                          value: opt.value,
                          label: opt.label,
                          maximumCapacity: opt.maximumCapacity,
                        });

                        getProductFigureListMutation.mutate(opt.value, {
                          onSuccess: (val: any) => {
                            const result = val.data.result;
                            let newOptions: any = [];
                            result.forEach((row: any) => {
                              newOptions.push({
                                value: row.id,
                                label: row.title,
                              });
                            });
                            setProductItemData(newOptions);
                          },
                        });
                      }}
                    />
                    <BasicSelectOption
                      lableText="رقم محصول اصلی"
                      name="mainProductItem"
                      data={productItemData}
                      isLoading={getProductFigureListMutation.isLoading}
                      isDisabled={!isExpert}
                      significant
                      placeHolder="بخش مورد نظر را انتخاب کنید"
                    />
                    <TextInput
                      lableText="تولید به ازای واحد فعالیت در سال"
                      name="productionUnitOfActivity"
                      placeholder="تولید به ازای واحد فعالیت در سال"
                      significant
                      disabled={!isExpert}
                      type="number"
                    />
                    <Alert color="info" className="w-100 m-0 text-center">
                      ظرفیت سالانه :{" "}
                      {checkYearlyCapacity(
                        values.productionUnitOfActivity,
                        values.numberOfyears
                      )}
                    </Alert>
                    {!checkProductionCapacityValidity(
                      values.numberOfyears ? values.numberOfyears.value : 0,
                      values.productionUnitOfActivity,
                      values.mainProductName
                        ? values.mainProductName.maximumCapacity
                        : 0,
                      values.productionFactor
                        ? values.productionFactor.typeOfDependence ===
                          TypeOfDependenceEnum.Machinery
                          ? values.numberOfAgriculturalToolsAndService <
                            values.activityRate
                            ? values.numberOfAgriculturalToolsAndService
                            : values.activityRate
                          : values.activityRate
                        : 0
                    ) &&
                      values.productionUnitOfActivity && (
                        <Alert color="danger" className="w-100 m-0 text-center">
                          {" "}
                          {console.log(
                            (values.productionFactor
                              ? values.productionFactor.typeOfDependence ===
                                TypeOfDependenceEnum.Machinery
                                ? values.numberOfAgriculturalToolsAndService <
                                  values.activityRate
                                  ? values.numberOfAgriculturalToolsAndService
                                  : values.activityRate
                                : values.activityRate
                              : 0) *
                              (values.mainProductName
                                ? values.mainProductName.maximumCapacity
                                  ? values.mainProductName.maximumCapacity
                                  : 0
                                : 0
                              ).toFixed(2)
                          )}
                          {`حداکثر مقدار وارد شده برای ظرفیت سالانه می تواند ${
                            (values.productionFactor
                              ? values.productionFactor.typeOfDependence ===
                                TypeOfDependenceEnum.Machinery
                                ? values.numberOfAgriculturalToolsAndService <
                                  values.activityRate
                                  ? values.numberOfAgriculturalToolsAndService
                                  : values.activityRate
                                : values.activityRate
                              : 0) *
                            (values.mainProductName
                              ? values.mainProductName.maximumCapacity
                                ? values.mainProductName.maximumCapacity
                                : 0
                              : 0
                            ).toFixed(2)
                          } باشد!`}
                        </Alert>
                      )}
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
                      setValuesToDefault();
                    }}
                    isLoading={false}
                  ></SubmitButton>
                )}
              </Form>
              <Row style={{ marginTop: "25px" }}>
                <Col>
                  <CapacityList
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
            </FieldWrapper>
          );
        }}
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
                  isLoading={
                    setMutation.isLoading || setMobilityMutation.isLoading
                  }
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

export { CapacityForm };
