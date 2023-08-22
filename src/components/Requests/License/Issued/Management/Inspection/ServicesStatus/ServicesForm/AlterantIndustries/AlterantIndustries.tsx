import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { ToastTypes } from "../../../../../../../../../core/enums";
import {
  useGetAllMachine,
  useGetAllMachineManufacturer,
  useGetAllMachineTypes,
  useGetCurrentYear,
  usePostSetConversionIndustriesServiceOfLicenseRequestSection,
  useSetConversionIndustriesServiceOfLicenseRequest,
} from "../../../../../../../../../core/services/api";
import { showToast } from "../../../../../../../../../core/utils";
import { ExpertAlterantIndustriesTabValidate } from "../../../../../../../../../core/validations/expert-industries.validations";
import {
  FieldWrapper,
  ModernDatePicker,
  SubmitButton,
  TextInput,
} from "../../../../../../../../common/Form";
import BasicSelectOption from "../../../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { List } from "./List/List";

interface IPropTypes {
  conversionIndustriesData: any;
  refetchConversionIndustries: any;
  isExpert?: boolean;
  fixedOrMobieTypeByExpert?: number;
}
const AlterantIndustries: React.FC<IPropTypes> = ({
  conversionIndustriesData,
  refetchConversionIndustries,
  isExpert,
  fixedOrMobieTypeByExpert,
}) => {
  const [counter, setCounter] = useState<number>(1);
  const [tableData, setTableData] = useState<any>([]);
  const [isInEditMode, setIsInEditMode] = useState<boolean>(false);
  const [editRowID, setEditRowID] = useState<number>(0);

  const [initialValue, setInitialValue] = useState<any>({
    productionYearNum: null,
    consumptionStatusEnum: null,
    unitHealthStatusEnum: null,
    licenseNumber: "",
    issueDate: "",
    validityDuration: "",
    healthCode: "",
    machineryId: null,
    machineManufacturerId: null,
  });

  useEffect(() => {
    let initialCounter = 1;
    if (conversionIndustriesData && conversionIndustriesData.data) {
      const result = conversionIndustriesData.data.result.conversionIndustries;

      if (result && result.length > 0) {
        result.forEach((row: any) => {
          const obj = {
            id: initialCounter,
            productionYearNum: row.productionYearNum,
            productionYearNumTitle: row.productionYearNum,
            consumptionStatusEnum: row.consumptionStatusEnum,
            consumptionStatusEnumTitle: row.consumptionStatusEnumTitle,
            unitHealthStatusEnum: row.unitHealthStatusEnum,
            unitHealthStatusEnumTitle: row.unitHealthStatusEnumTitle,
            licenseNumber: row.licenseNumber,
            issueDate: row.issueDate,
            validityDuration: row.validityDuration,
            healthCode: row.healthCode,
            machineryId: row.machineryId,
            machineryIdTitle: row.machineryTitle,
            machineManufacturerId: row.machineManufacturerId,
            machineManufacturerIdTitle: row.machineManufacturerTitle,
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
  }, [conversionIndustriesData]);

  const healthStatusData = [
    {
      label: "انتخاب کنید ...",
      options: [
        { value: 1, label: "دارای کد بهداشتی" },
        { value: 2, label: "دارای تاییدیه بهداشت محیط" },
        { value: 3, label: "فاقد کد" },
      ],
    },
  ];

  const machinEnergyUsageData = [
    {
      label: "انتخاب کنید ...",
      options: [
        { value: 1, label: "پر مصرف" },
        { value: 2, label: "مصرف متوسط" },
        { value: 3, label: "کم مصرف" },
      ],
    },
  ];

  const [machineryIdData, setMachineryIdData] = useState<any>([
    {
      label: "انتخاب کنید ...",
      options: [],
    },
  ]);

  const [machineManufacturerIdData, setMachineManufacturerIdData] =
    useState<any>([
      {
        label: "انتخاب کنید ...",
        options: [],
      },
    ]);

  const [productionYearNumData, setProductionYearNumData] = useState<any>([
    {
      label: "انتخاب کنید ...",
      options: [],
    },
  ]);

  const setMutation =
    usePostSetConversionIndustriesServiceOfLicenseRequestSection();

  const setMobilityMutation =
    useSetConversionIndustriesServiceOfLicenseRequest();

  const {
    data: getAllMachin,
    isSuccess: isGetAllMachinSuccess,
    isLoading: isGetAllMachinLoading,
  } = useGetAllMachine();

  const {
    data: getAllMachineManufacturer,
    isSuccess: isMachineManufacturerSuccess,
    isLoading: isMachineManufacturerLoading,
  } = useGetAllMachineManufacturer();

  const {
    data: currentYearData,
    isSuccess: currentYearIsSuccess,
    isFetching: currentYearIsFetching,
  } = useGetCurrentYear();

  const { section_id, req_id } =
    useParams<{ section_id: string; req_id: string }>();

  useEffect(() => {
    // save machin-types to state
    if (getAllMachin?.data.result) {
      const result = getAllMachin.data.result;
      let pro: any = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      result.forEach((county: any) => {
        pro[0].options.push({ value: county.id, label: county.title });
      });
      setMachineryIdData(pro);
    }
  }, [isGetAllMachinSuccess]);

  useEffect(() => {
    // save machin-Manufacturer to state
    if (getAllMachineManufacturer?.data.result) {
      const result = getAllMachineManufacturer.data.result;
      let pro: any = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      result.forEach((county: any) => {
        pro[0].options.push({ value: county.id, label: county.title });
      });
      setMachineManufacturerIdData(pro);
    }
  }, [isMachineManufacturerSuccess]);

  useEffect(() => {
    if (currentYearData && currentYearData.data) {
      let result = currentYearData.data.result;

      let pro: any = [];
      for (let i = 0; i < 30; i++) {
        pro.push({ value: result, label: result });
        result = result - 1;
      }
      setProductionYearNumData(pro);
    }
  }, [currentYearIsSuccess]);

  const onSubmit = (value: any) => {
    if (isInEditMode) {
      const obj = {
        id: editRowID,
        productionYearNum: value.productionYearNum.value,
        productionYearNumTitle: value.productionYearNum.label,
        consumptionStatusEnum: value.consumptionStatusEnum.value,
        consumptionStatusEnumTitle: value.consumptionStatusEnum.label,
        unitHealthStatusEnum: value.unitHealthStatusEnum.value,
        unitHealthStatusEnumTitle: value.unitHealthStatusEnum.label,
        licenseNumber: value.licenseNumber,
        issueDate: value.issueDate,
        validityDuration: value.validityDuration,
        healthCode: value.healthCode,
        machineryId: value.machineryId.value,
        machineryIdTitle: value.machineryId.label,
        machineManufacturerId: value.machineManufacturerId.value,
        machineManufacturerIdTitle: value.machineManufacturerId.label,
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
        productionYearNum: value.productionYearNum.value,
        productionYearNumTitle: value.productionYearNum.label,
        consumptionStatusEnum: value.consumptionStatusEnum.value,
        consumptionStatusEnumTitle: value.consumptionStatusEnum.label,
        unitHealthStatusEnum: value.unitHealthStatusEnum.value,
        unitHealthStatusEnumTitle: value.unitHealthStatusEnum.label,
        licenseNumber: value.licenseNumber,
        issueDate: value.issueDate,
        validityDuration: value.validityDuration,
        healthCode: value.healthCode,
        machineryId: value.machineryId.value,
        machineryIdTitle: value.machineryId.label,
        machineManufacturerId: value.machineManufacturerId.value,
        machineManufacturerIdTitle: value.machineManufacturerId.label,
      };

      setTableData((prev: any) => {
        return [...prev, obj];
      });
      setCounter((prev: number) => {
        return prev + 1;
      });
    }
  };

  const onFinalSubmit = (values: any) => {

    let finalIndustriesServices: any = [];
    console.log(tableData);

    tableData.forEach((row: any) => {
      finalIndustriesServices.push({
        productionYearNum: row.productionYearNum,
        consumptionStatusEnum: row.consumptionStatusEnum,
        unitHealthStatusEnum: row.unitHealthStatusEnum,
        licenseNumber: row.licenseNumber,
        issueDate: row.issueDate,
        validityDuration: row.validityDuration,
        healthCode: row.healthCode,
        machineryId: row.machineryId,
        machineManufacturerId: row.machineManufacturerId,
      });
    });

    let finalObj: any = {
      licenseRequestSectionId: +section_id,
      conversionIndustries: finalIndustriesServices,
      licenseRequestId: +req_id,
    };

    if (fixedOrMobieTypeByExpert === 1)
      setMutation.mutate(finalObj, {
        onSuccess: (val: any) => {
          showToast(["با موفقیت انجام شد."], ToastTypes.success);
          refetchConversionIndustries();
        },
      });
    else if (fixedOrMobieTypeByExpert === 2)
      setMobilityMutation.mutate(finalObj, {
        onSuccess: (val: any) => {
          showToast(["با موفقیت انجام شد."], ToastTypes.success);
          refetchConversionIndustries();
        },
      });
  };

  return (
    <>
      <Row>
        <Col>
          <Formik
            initialValues={initialValue}
            onSubmit={isExpert ? onSubmit : () => {}}
            enableReinitialize={true}
            validationSchema={ExpertAlterantIndustriesTabValidate}
          >
            {({ values, setFieldError, setFieldValue }) => (
              <FieldWrapper
                setFieldError={setFieldError}
                useMutate={() => null}
              >
                <Form>
                  <div style={{ margin: "30px 0px" }}>
                    <p style={{ fontWeight: "bolder" }}>
                      خدمات و تولیدات صنایع تبدیلی و تکمیلی
                    </p>
                    <Row>
                      <Col sm="6">
                        <Row>
                          <Col>
                            <BasicSelectOption
                              lableText="نام ماشین آلات و تجهیزات"
                              name="machineryId"
                              placeHolder="نام ماشین آلات و تجهیزات"
                              data={machineryIdData}
                              significant
                              isDisabled={!isExpert}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <BasicSelectOption
                              lableText="شرکت سازنده"
                              name="machineManufacturerId"
                              data={machineManufacturerIdData}
                              placeHolder="شرکت سازنده"
                              significant
                              isDisabled={!isExpert}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <BasicSelectOption
                              lableText="مدل ماشین و تجهیزات"
                              name="productionYearNum"
                              data={productionYearNumData}
                              placeHolder="مدل ماشین و تجهیزات"
                              significant
                              isDisabled={!isExpert}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <BasicSelectOption
                              lableText="وضعیت مصرف انرژی ماشین آلات"
                              name="consumptionStatusEnum"
                              data={machinEnergyUsageData}
                              placeHolder="وضعیت مصرف انرژی ماشین آلات"
                              significant
                              isDisabled={!isExpert}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col></Col>
                        </Row>
                        <Row>
                          <Col></Col>
                        </Row>
                      </Col>
                      <Col sm="6">
                        <Row>
                          <Col>
                            <BasicSelectOption
                              lableText="وضعیت بهداشتی واحد"
                              name="unitHealthStatusEnum"
                              data={healthStatusData}
                              placeHolder="وضعیت بهداشتی واحد"
                              significant
                              isDisabled={!isExpert}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <TextInput
                              lableText="شماره مجوز"
                              name="licenseNumber"
                              placeholder="شماره مجوز"
                              disabled={!isExpert}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <ModernDatePicker
                              lableText="تاریخ صدور"
                              name="issueDate"
                              disabled={!isExpert}
                              initialValue={values.issueDate}
                              hasMaximum
                              placeholder="تاریخ صدور"
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <TextInput
                              lableText="مدت اعتبار"
                              name="validityDuration"
                              disabled={!isExpert}
                              placeholder="مدت اعتبار"
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <TextInput
                              lableText="کد بهداشتی"
                              name="healthCode"
                              disabled={!isExpert}
                              placeholder="کد بهداشتی"
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    {isExpert && (
                      <Row>
                        <Col>
                          <SubmitButton
                            btnText={
                              isInEditMode ? "ثبت ویرایش" : "ثبت موقت"
                            }
                            clearable={isInEditMode ? true : false}
                            clearableTxt="لغو ویرایش"
                            initialValue={initialValue}
                            schema={ExpertAlterantIndustriesTabValidate}
                            values={values}
                            onClear={() => {
                              setIsInEditMode(false);
                              setEditRowID(0);
                              setInitialValue({
                                productionYearNum: "",
                                consumptionStatusEnum: null,
                                unitHealthStatusEnum: null,
                                licenseNumber: "",
                                issueDate: "",
                                validityDuration: "",
                                healthCode: "",
                                machineryId: null,
                                machineManufacturerId: null,
                              });
                            }}
                            isLoading={false}
                          ></SubmitButton>
                        </Col>
                      </Row>
                    )}
                  </div>
                </Form>
                <Row style={{ marginTop: "25px" }}>
                  <Col>
                    <List
                      tableData={tableData}
                      setTableData={setTableData}
                      setInitialValues={setInitialValue}
                      setIsInEditMode={setIsInEditMode}
                      setEditRowID={setEditRowID}
                      isExpert={isExpert}
                    />
                  </Col>
                </Row>
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
                <FieldWrapper
                  setFieldError={setFieldError}
                  useMutate={() => null}
                >
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
        </Col>
      </Row>
    </>
  );
};

export { AlterantIndustries };
