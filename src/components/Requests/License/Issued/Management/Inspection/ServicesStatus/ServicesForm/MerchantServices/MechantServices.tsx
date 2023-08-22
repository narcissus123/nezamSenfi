import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { ToastTypes } from "../../../../../../../../../core/enums";
import {
  usePostSetBusinessServiceOfLicenseRequestSection,
  useSetBusinessServiceOfLicenseRequest,
} from "../../../../../../../../../core/services/api";
import { showToast } from "../../../../../../../../../core/utils";
import { ExpertMerchantTabValidate } from "../../../../../../../../../core/validations/expert-merchant.validations";
import {
  FieldWrapper,
  SubmitButton,
  TextInput,
} from "../../../../../../../../common/Form";
import BasicSelectOption from "../../../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { List } from "./List/List";

interface IPropTypes {
  businessServiceData: any;
  refetchBusinessService: any;
  isExpert?: boolean;
  fixedOrMobieTypeByExpert?: number;
}

const MerchantServices: React.FC<IPropTypes> = ({
  businessServiceData,
  refetchBusinessService,
  isExpert,
  fixedOrMobieTypeByExpert,
}) => {
  const [counter, setCounter] = useState<number>(1);
  const [tableData, setTableData] = useState<any>([]);
  const [isInEditMode, setIsInEditMode] = useState<boolean>(false);
  const [editRowID, setEditRowID] = useState<number>(0);

  const setMutation = usePostSetBusinessServiceOfLicenseRequestSection();
  const setMobilityMutation = useSetBusinessServiceOfLicenseRequest();

  const { section_id, req_id } =
    useParams<{ section_id: string; req_id: string }>();

  const [initialValue, setInitialValue] = useState<any>({
    transportationStatusEnum: null,
    packingStatusEnum: null,
    manPowerStatusEnum: null,
    permanentManpower: "",
    temporaryManPower: "",
    permanentExpertManpower: "",
    temporaryExpertManPower: "",
    brandStatusEnum: null,
  });

  const transportationToolsStatusData = [
    {
      label: "انتخاب کنید ...",
      options: [
        { value: 1, label: "استیجاری" },
        { value: 2, label: "شخصی" },
        { value: 3, label: "فاقد هرگونه امکانات" },
      ],
    },
  ];

  const packagingEquipmentData = [
    {
      label: "انتخاب کنید ...",
      options: [
        { value: 1, label: "استیجاری" },
        { value: 2, label: "شخصی" },
        { value: 3, label: "فاقد هرگونه امکانات" },
      ],
    },
  ];

  const manPowerStatusEnumData = [
    {
      label: "انتخاب کنید ...",
      options: [
        { value: 1, label: "دارای نیروی انسانی کارگری دائم" },
        { value: 2, label: "دارای نیروی انسانی کارگری موقت" },
        { value: 3, label: "دارای نیروی انسانی متخصص دائم" },
        { value: 4, label: "دارای نیروی انسانی متخصص موقت" },
      ],
    },
  ];

  const brandStatusEnumData = [
    {
      label: "انتخاب کنید ...",
      options: [
        { value: 1, label: "دارای نام تجاری ثبت شده" },
        { value: 2, label: "دارای نام تجاری ثبت نشده" },
        { value: 3, label: "فاقد هرگونه نام تجاری" },
      ],
    },
  ];

  useEffect(() => {
    let initialCounter = 1;
    if (businessServiceData && businessServiceData.data) {
      const result = businessServiceData.data.result.businessServices;

      if (result && result.length > 0) {
        result.forEach((row: any) => {
          const obj = {
            id: initialCounter,
            transportationStatusEnum: row.transportationStatusEnum,
            transportationStatusEnumTitle: row.transportationStatusEnumTitle,
            packingStatusEnum: row.packingStatusEnum,
            packingStatusEnumTitle: row.packingStatusEnumTitle,
            manPowerStatusEnum: row.manPowerStatusEnum,
            manPowerStatusEnumTitle: row.manPowerStatusEnumTitle,
            permanentManpower: row.permanentManpower,
            temporaryManPower: row.temporaryManPower,
            permanentExpertManpower: row.permanentExpertManpower,
            temporaryExpertManPower: row.temporaryExpertManPower,
            brandStatusEnum: row.brandStatusEnum,
            brandStatusEnumTitle: row.brandStatusEnumTitle,
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
  }, [businessServiceData]);

  const onSubmit = (values: any) => {
    if (isInEditMode) {
      const obj = {
        id: counter,
        transportationStatusEnum: values.transportationStatusEnum.value,
        transportationStatusEnumTitle: values.transportationStatusEnum.label,
        packingStatusEnum: values.packingStatusEnum.value,
        packingStatusEnumTitle: values.packingStatusEnum.label,
        manPowerStatusEnum: values.manPowerStatusEnum.value,
        manPowerStatusEnumTitle: values.manPowerStatusEnum.label,
        permanentManpower: values.permanentManpower,
        temporaryManPower: values.temporaryManPower,
        permanentExpertManpower: values.permanentExpertManpower,
        temporaryExpertManPower: values.temporaryExpertManPower,
        brandStatusEnum: values.brandStatusEnum.value,
        brandStatusEnumTitle: values.brandStatusEnum.label,
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
        transportationStatusEnum: values.transportationStatusEnum.value,
        transportationStatusEnumTitle: values.transportationStatusEnum.label,
        packingStatusEnum: values.packingStatusEnum.value,
        packingStatusEnumTitle: values.packingStatusEnum.label,
        manPowerStatusEnum: values.manPowerStatusEnum.value,
        manPowerStatusEnumTitle: values.manPowerStatusEnum.label,
        permanentManpower: values.permanentManpower,
        temporaryManPower: values.temporaryManPower,
        permanentExpertManpower: values.permanentExpertManpower,
        temporaryExpertManPower: values.temporaryExpertManPower,
        brandStatusEnum: values.brandStatusEnum.value,
        brandStatusEnumTitle: values.brandStatusEnum.label,
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

    let finalMerchantServices: any = [];

    tableData.forEach((row: any) => {
      finalMerchantServices.push({
        transportationStatusEnum: row.transportationStatusEnum,

        packingStatusEnum: row.packingStatusEnum,

        manPowerStatusEnum: row.manPowerStatusEnum,

        permanentManpower: row.permanentManpower,
        temporaryManPower: row.temporaryManPower,
        permanentExpertManpower: row.permanentExpertManpower,
        temporaryExpertManPower: row.temporaryExpertManPower,
        brandStatusEnum: row.brandStatusEnum,
      });
    });

    let finalObj: any = {
      licenseRequestSectionId: +section_id,
      businessServices: finalMerchantServices,
      licenseRequestId: +req_id,
    };

    if (fixedOrMobieTypeByExpert === 1)
      setMutation.mutate(finalObj, {
        onSuccess: (val: any) => {
          showToast(["با موفقیت انجام شد."], ToastTypes.success);
          refetchBusinessService();
        },
      });
    else if (fixedOrMobieTypeByExpert === 2)
      setMobilityMutation.mutate(finalObj, {
        onSuccess: (val: any) => {
          showToast(["با موفقیت انجام شد."], ToastTypes.success);
          refetchBusinessService();
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
            validationSchema={ExpertMerchantTabValidate}
          >
            {({ values, setFieldError, setFieldValue }) => (
              <FieldWrapper
                setFieldError={setFieldError}
                useMutate={() => null}
              >
                <Form>
                  <div style={{ margin: "30px 0px" }}>
                    <p style={{ fontWeight: "bolder" }}>
                      خدمات بازرگانی و فروش
                    </p>
                    <Row>
                      <Col sm="6">
                        <Row>
                          <Col>
                            <BasicSelectOption
                              lableText="وضعیت امکانات حمل و نقل"
                              name="transportationStatusEnum"
                              placeHolder="وضعیت امکانات حمل و نقل"
                              data={transportationToolsStatusData}
                              significant
                              isDisabled={!isExpert}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <BasicSelectOption
                              lableText="وضعیت لوازم و تجهیزات بسته بندی اولیه"
                              name="packingStatusEnum"
                              data={packagingEquipmentData}
                              placeHolder="وضعیت لوازم و تجهیزات بسته بندی اولیه"
                              significant
                              isDisabled={!isExpert}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <BasicSelectOption
                              lableText="وضعیت نیروی انسانی تحت مدیریت"
                              name="manPowerStatusEnum"
                              data={manPowerStatusEnumData} //humanResourceStatusData}
                              placeHolder="وضعیت نیروی انسانی تحت مدیریت"
                              significant
                              isDisabled={!isExpert}
                            />
                          </Col>
                        </Row>

                        <Row>
                          <Col>
                            <TextInput
                              lableText="تعداد نیروی انسانی کارگری موقت"
                              name="temporaryManPower"
                              placeholder="عدد وارد کنید ..."
                              significant
                              disabled={!isExpert}
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col sm="6">
                        <Row>
                          <Col>
                            <TextInput
                              lableText="تعداد نیروی انسانی کارگری دائم"
                              name="permanentManpower"
                              placeholder="عدد وارد کنید ..."
                              significant
                              disabled={!isExpert}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <TextInput
                              lableText="تعداد نیروی انسانی متخصص دائم"
                              name="permanentExpertManpower"
                              placeholder="عدد وارد کنید ..."
                              significant
                              disabled={!isExpert}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <TextInput
                              lableText="تعداد نیروی انسانی متخصص موقت"
                              name="temporaryExpertManPower"
                              placeholder="عدد وارد کنید ..."
                              significant
                              disabled={!isExpert}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <BasicSelectOption
                              lableText="وضعیت نام تجاری و برند"
                              name="brandStatusEnum"
                              data={brandStatusEnumData}
                              placeHolder="وضعیت نام تجاری و برند"
                              significant
                              isDisabled={!isExpert}
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    {isExpert && (
                      <Row>
                        <Col>
                          <SubmitButton
                            isLoading={false} //createCategory.isLoading}
                            initialValue={initialValue}
                            schema={ExpertMerchantTabValidate}
                            values={values}
                            btnText={
                              isInEditMode ? "ثبت ویرایش" : "ثبت موقت"
                            }
                            clearable={isInEditMode ? true : false}
                            clearableTxt="لغو ویرایش"
                            onClear={() => {
                              setIsInEditMode(false);
                              setEditRowID(0);
                              setInitialValue({
                                transportationStatusEnum: null,
                                packingStatusEnum: null,
                                manPowerStatusEnum: null,
                                permanentManpower: "",
                                temporaryManPower: "",
                                permanentExpertManpower: "",
                                temporaryExpertManPower: "",
                                brandStatusEnum: null,
                              });
                            }}
                          />
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

export { MerchantServices };
