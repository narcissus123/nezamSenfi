import { Formik, Form } from "formik";
import React, { FC, useContext, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { ToastTypes } from "../../../../core/enums";
import { FullOptionSel } from "../../../../core/models";
import { useGetAllCountyGuildRoomsByProvinceIdForDropDown, useGetAllProvinceGuildRoomsForDropDown, useGetAllUnioinByCountyGuildroomIdForDropDown, useGetOwnedUserCountyGuildRoomsForAdmin, useGetOwnedUserProvinceGuildRooms, useGetOwnedUserProvinceGuildRoomsForAdmin, useSetPayableValueType } from "../../../../core/services/api";
import { getCurrentJalaliDate, showToast } from "../../../../core/utils";
import { refetchContext } from "../../../../core/utils/context/EventContext";
import { FixedPayableValueValidate } from "../../../../core/validations/fixed-payable-value.validation";
import {
  DropZone,
  ModernDatePicker,
  MultiSelectOption,
  SubmitButton,
  TextInput,
} from "../../../common/Form";
import { ShowActiveTariff } from "../ShowActiveTariff/ShowActiveTariff";
import { List } from "./List/List";
import { MainLocation } from "./MainLocation/MainLocation";

export type locationType = "mainlocation" | "province" | "county"

interface IPropTypes {
  type: locationType
}

const FixedPayableValueContainer: FC<IPropTypes> = ({ type }) => {
  
  const [initialValue] = useState<any>({});
  const [activeTariff, setActiveTariff] = useState<number>(0);
  const [activeTariffSuccess, setActiveTariffSuccess] =
    useState<boolean>(false);
  const [payableTypesData, setPayableTypesData] = useState<FullOptionSel[]>([
      {
        label: "انتخاب کنید...",
        options: [],
      },
    ]);
  const [province, setProvince] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const [county, setCounty] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const [union, setUnion] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const [jobCategoryTypeData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [
        { value: 1, label: "فعالیتهای وابسته به ساختمان صنعتی" },
        { value: 2, label: "فعالیتهای وابسته به ساختمان سنتی وکارگاهی" },
        { value: 3, label: "فعالیتهای وابسته به سازه های سبک گلخانه صنعتی" },
        { value: 4, label: "فعالیتهای وابسته به سازه های سبک گلخانه سنتی" },
        { value: 5, label: "فعالیتهای وابسته به اراضی زراعی وباغی" },
        { value: 6, label: "فعالیتهای وابسته به ماشین الات وادوات" },
        { value: 7, label: "فعالیتهای  تخصصی یا مهارتی فاقد وابستگی مشخص " },
        { value: 8, label: "فعالیت های تولیدی مهاجر" },
      ],
    },
  ]);


  const addMutation = useSetPayableValueType();

  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

  const unionMutation = useGetAllUnioinByCountyGuildroomIdForDropDown();

  const onSubmit = (value: any) => {
    if (!value.file || !(value.file.length > 0)) {
      showToast(["لطفا فایل را انتخاب کنید!"], ToastTypes.error);
      return;
    }

    const formData = new FormData();
    for (let file of value.file) {
      formData.append(`File`, file);
    }

    formData.append("PayableType", value.payableTypes.value);
    formData.append("StartDateAsShamsi", value.startDate);
    formData.append("StartDate", value.startDate);
    formData.append("Value", value.value);
    if (value.union) {
      for (let i = 0; i < value.union.length; i++) {
        formData.append(`CountyUnionId[${i}]`, value.union[i].value);
      }
    }
    if (value.job) {
      for (let i = 0; i < value.job.length; i++) {
        formData.append(`JobCategory[${i}]`, value.job[i].value);
      }
    }

    addMutation.mutate(formData, {
      onSuccess: (val: any) => {
        showToast(["با موفقیت انجام شد."], ToastTypes.success);
        const newEvent = { ...refetchEvent };
        newEvent.fixedPayableValueList = !newEvent.fixedPayableValueList;
        setRefetchEvent(newEvent);
      },
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle> ردیف مالی تعرفه </CardTitle>
        </CardHeader>
        <CardBody>
          <Formik
            enableReinitialize={true}
            initialValues={initialValue}
            validationSchema={FixedPayableValueValidate}
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
                    {type === "mainlocation" ? (
                      <MainLocation
                        type={type}
                        provinceMutation={
                          useGetAllProvinceGuildRoomsForDropDown
                        }
                        countyMutation={
                          useGetAllCountyGuildRoomsByProvinceIdForDropDown
                        }
                        setFieldValue={setFieldValue}
                        setUnion={setUnion}
                        setPayableTypesData={setPayableTypesData}
                        payableTypesData={payableTypesData}
                      />
                    ) : type === "province" ? (
                      <MainLocation
                        type={type}
                        provinceMutation={
                          useGetOwnedUserProvinceGuildRoomsForAdmin
                        }
                        countyMutation={
                          useGetAllCountyGuildRoomsByProvinceIdForDropDown
                        }
                        setFieldValue={setFieldValue}
                        setUnion={setUnion}
                        setPayableTypesData={setPayableTypesData}
                        payableTypesData={payableTypesData}
                      />
                    ) : (
                      <MainLocation
                        type={type}
                        isCounty
                        provinceMutation={
                          useGetAllProvinceGuildRoomsForDropDown
                        }
                        countyMutation={useGetOwnedUserCountyGuildRoomsForAdmin}
                        setFieldValue={setFieldValue}
                        setUnion={setUnion}
                        setPayableTypesData={setPayableTypesData}
                        payableTypesData={payableTypesData}
                      />
                    )}
                    <Col sm="4">
                      <MultiSelectOption
                        labelText="اتحادیه"
                        name="union"
                        placeHolder="انتخاب کنید..."
                        significant={true}
                        isLoading={unionMutation.isLoading}
                        options={union}
                        onChange={(e) => setFieldValue("union", e)}
                        hasLabel={true}
                        notSetWithId={true}
                      />
                    </Col>
                    <Col sm="4">
                      <MultiSelectOption
                        labelText="گروه شغلی"
                        name="job"
                        placeHolder="انتخاب کنید..."
                        significant={true}
                        isLoading={false}
                        options={jobCategoryTypeData}
                        onChange={(e) => setFieldValue("job", e)}
                        hasLabel={true}
                      />
                    </Col>
                    <Col sm="4">
                      <ModernDatePicker
                        name="startDate"
                        lableText="تاریخ شروع ردیف مالی"
                        placeholder="وارد کنید..."
                        hasMaximum={false}
                        minimumDate={getCurrentJalaliDate()}
                      />
                    </Col>
                    <Col sm="4">
                      <TextInput
                        lableText={
                          values.payableTypes
                            ? values.payableTypes.payableValueType === 1
                              ? "مبلغ (ریال)"
                              : "درصد"
                            : "مبلغ / درصد"
                        }
                        name="value"
                        placeholder={
                          values.payableTypes
                            ? values.payableTypes.payableValueType === 1
                              ? "مبلغ (ریال)"
                              : "درصد"
                            : "مبلغ / درصد"
                        }
                        significant
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="4">
                      <DropZone
                        lableText="انتخاب فایل"
                        name="file"
                        significant={true}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="4">
                      <SubmitButton
                        isLoading={addMutation.isLoading}
                        schema={FixedPayableValueValidate}
                        values={values}
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
        payableTypesData={payableTypesData}
        activeTariff={activeTariff}
        jobCategoryTypeData={jobCategoryTypeData}
        type={type}
      />
    </>
  );
};

export { FixedPayableValueContainer };
