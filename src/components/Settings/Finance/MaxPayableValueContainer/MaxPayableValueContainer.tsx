import { Formik, Form } from "formik";
import React, {  useContext, useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { ToastTypes } from "../../../../core/enums";
import { FullOptionSel } from "../../../../core/models";
import { useGetCurrentMaximumValue, useSetMainLocationPayableValue } from "../../../../core/services/api";
import { showToast } from "../../../../core/utils";
import { refetchContext } from "../../../../core/utils/context/EventContext";
import { PayableValueValidate } from "../../../../core/validations/payable-value.validation";
import { DropZone, ModernDatePicker, SubmitButton, TextInput, Toggle } from "../../../common/Form";
import { ShowActiveTariff } from "../ShowActiveTariff/ShowActiveTariff";
import { List } from "./List/List";



enum CentralizedLocationEnum {
  county = 1004,
  province = 1005 ,
  mainlocation = 1006
}

const MaxPayableValueContainer = () => {
  const [initialValue, setInitialValue] = useState<any>({
    inspectorFeeOfRejectedInspection: "0",
    supportFee: "0",
    unionFee: "0",
    interimInterest: "0",
    countyFee: "0",
    provinceFee: "0",
    mainLocationFee: "0",
    startDateTimeAsShamsi: "0",
    IsAssignSupportFeeToBackupCompany: false,
    files: null,
    countyMaxValue: 0,
    provinceMaxValue: 0,
    mainlocationMaxValue: 0,
    inspectorFeeOfRejectedInspectionMaxValue: 0,
    supportFeeMaxValue: 0,
    unionFeeMaxValue: 0,
    interimInterestMaxValue: 0,
  });
  const [payableTypesData, setPayableTypesData] = useState<FullOptionSel[]>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);
  const rolesData: FullOptionSel[] = [
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ];
  const [activeTariffSuccess, setActiveTariffSuccess] =
    useState<boolean>(false);
  const [activeTariff, setActiveTariff] = useState<number>(0);

  const addMutation = useSetMainLocationPayableValue();

  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

  const getMaxMutation = useGetCurrentMaximumValue();

  useEffect(() => {
    getMaxMutation.mutate(
      {},
      {
        onSuccess: (val: any) => {
          try {
            let data: { payableValueTypeEnum: number; value: number }[] =
              val.data.result;

            let countyMaxValue = data.find(
              (row) =>
                row.payableValueTypeEnum === CentralizedLocationEnum.county
            );
            let provinceMaxValue = data.find(
              (row) =>
                row.payableValueTypeEnum === CentralizedLocationEnum.province
            );
            let mainlocationMaxValue = data.find(
              (row) =>
                row.payableValueTypeEnum ===
                CentralizedLocationEnum.mainlocation
            );


            let inspectorFeeOfRejectedInspectionMaxValue = data.find(
              (row) =>
                row.payableValueTypeEnum ===
                1001
            );
            let supportFeeMaxValue = data.find(
              (row) =>
                row.payableValueTypeEnum ===
                1002
            );
            let unionFeeMaxValue = data.find(
              (row) =>
                row.payableValueTypeEnum ===
                1003
            );
            let interimInterestMaxValue = data.find(
              (row) =>
                row.payableValueTypeEnum ===
                1010
            );
            let countyFeeMaxValue = data.find(
              (row) =>
                row.payableValueTypeEnum ===
                1007
            );
            let provinceFeeMaxValue = data.find(
              (row) =>
                row.payableValueTypeEnum ===
                1008
            );
            let mainLocationFeeMaxValue = data.find(
              (row) =>
                row.payableValueTypeEnum ===
                1009
            );


            setInitialValue((old: any) => ({
              ...old,
              countyMaxValue: countyMaxValue!.value,
              provinceMaxValue: provinceMaxValue!.value,
              mainlocationMaxValue: mainlocationMaxValue!.value,
              inspectorFeeOfRejectedInspectionMaxValue:
                inspectorFeeOfRejectedInspectionMaxValue!.value,
              supportFeeMaxValue: supportFeeMaxValue!.value,
              unionFeeMaxValue: unionFeeMaxValue!.value,
              interimInterestMaxValue: interimInterestMaxValue!.value,
              countyFeeMaxValue: countyFeeMaxValue!.value,
              provinceFeeMaxValue: provinceFeeMaxValue!.value,
              mainLocationFeeMaxValue: mainLocationFeeMaxValue!.value,
            }));
          } catch (Err) {
            console.log("--error---", Err);
          }
        },
      }
    );
  }, []);

  const onSubmit = (value: any) => {
    if (!value.files || !(value.files.length > 0)) {
      showToast(["لطفا فایل را انتخاب کنید!"], ToastTypes.error);
      return;
    }

    let formData = new FormData();

    formData.append(
      "InspectorFeeOfRejectedInspection",
      value.inspectorFeeOfRejectedInspection
    );
    formData.append("SupportFee", value.supportFee);
    formData.append("UnionFee", value.unionFee);
    formData.append("CountyFee", value.countyFee);
    formData.append("ProvinceFee", value.provinceFee);
    formData.append("MainLocationFee", value.mainLocationFee);
    formData.append("InterimInterest", value.interimInterest);
    formData.append("StartDateTimeAsShamsi", value.startDateTimeAsShamsi);
    formData.append("IsAssignSupportFeeToBackupCompany", "True");
    formData.append("StartDateTime", value.startDateTimeAsShamsi);

    for (let file of value.files) {
      formData.append(`File`, file);
    }

    addMutation.mutate(formData, {
      onSuccess: (val: any) => {
        showToast(["با موفقیت انجام شد."], ToastTypes.success);
        const newEvent = { ...refetchEvent };
        newEvent.maxPayableValueList = !newEvent.maxPayableValueList;
        setRefetchEvent(newEvent);
      },
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle> درصد تسهیم تعرفه </CardTitle>
        </CardHeader>
        <CardBody>
          <Formik
            enableReinitialize={true}
            initialValues={initialValue}
            validationSchema={PayableValueValidate}
            onSubmit={onSubmit}
          >
            {({
              values,
              errors,
              handleChange,
              touched,
              getFieldProps,
              setFieldValue,
            }) => {
              return (
                <Form>
                  <Row>
                    <Col>
                      <ShowActiveTariff
                        setActiveTariffSuccess={setActiveTariffSuccess}
                        setActiveTarrif={setActiveTariff}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="4">
                      <TextInput
                        lableText="درصد سهم کارشناس از کارشناسی های رد شده بعد از بازدید"
                        name="inspectorFeeOfRejectedInspection"
                        placeholder="درصد .."
                        significant
                      />
                    </Col>
                    <Col sm="4">
                      <TextInput
                        lableText="مبلغ سهم پشتیبان (ریال)"
                        name="supportFee"
                        placeholder="درصد .."
                        significant
                      />
                    </Col>
                    <Col sm="4">
                      <TextInput
                        lableText="درصد سهم اتحادیه"
                        name="unionFee"
                        placeholder="درصد .."
                        significant
                      />
                    </Col>
                    <Col sm="4">
                      <TextInput
                        lableText="درصد علی الحساب"
                        name="interimInterest"
                        placeholder="درصد .."
                        significant
                      />
                    </Col>
                    <Col sm="4">
                      <TextInput
                        lableText="درصد سهم شهرستان"
                        name="countyFee"
                        placeholder="درصد .."
                        significant
                      />
                    </Col>
                    <Col sm="4">
                      <TextInput
                        lableText="درصد سهم استان"
                        name="provinceFee"
                        placeholder="درصد .."
                        significant
                      />
                    </Col>
                    <Col sm="4">
                      <TextInput
                        lableText="درصد سهم کشور"
                        name="mainLocationFee"
                        placeholder="درصد .."
                        significant
                      />
                    </Col>
                    <Col sm="4">
                      <ModernDatePicker
                        name="startDateTimeAsShamsi"
                        lableText="از تاریخ"
                        placeholder="وارد کنید..."
                        hasMaximum={false}
                      />
                    </Col>
                    <Col sm="4" style={{ paddingTop: "20px" }}>
                      <Toggle
                        id="IsAssignSupportFeeToBackupCompany"
                        name="IsAssignSupportFeeToBackupCompany"
                        lableText="واریز مبلغ به حساب شرکت پشتیبان"
                        significant
                        direction="ltr"
                        className="my-1"
                        onChange={(opt: any) => {
                          setFieldValue(
                            "IsAssignSupportFeeToBackupCompany",
                            opt.target.checked
                          );
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="4">
                      <DropZone
                        lableText="انتخاب فایل"
                        name="files"
                        significant={true}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="4">
                      <SubmitButton
                        isLoading={addMutation.isLoading}
                        values={values}
                        schema={PayableValueValidate}
                        initialValue={initialValue}
                      />
                    </Col>
                  </Row>
                </Form>
              );
            }}
          </Formik>
        </CardBody>
      </Card>

      <List
        activeTariffSuccess={activeTariffSuccess}
        activeTariff={activeTariff}
      />
    </>
  );
};

export { MaxPayableValueContainer };
