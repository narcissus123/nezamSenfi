import { Formik, Form } from "formik";
import React, {  useContext, useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { ToastTypes } from "../../../../core/enums";
import { FullOptionSel } from "../../../../core/models";
import { useSetJobCategoryTariff } from "../../../../core/services/api";
import { useNewTarrif } from "../../../../core/services/api/tarrif.api";
import { getCurrentJalaliDate, showToast } from "../../../../core/utils";
import { refetchContext } from "../../../../core/utils/context/EventContext";
import { InspectionTypeValidate } from "../../../../core/validations/inspection-type.validation";
import { JobCategoryTarrifValidate } from "../../../../core/validations/job-category-tarrif.validation";
import { SetTarrifValidate } from "../../../../core/validations/set-tarrif.validation";
import { FileInput, FormDivider, ModernDatePicker, SubmitButton, TextArea, TextInput } from "../../../common/Form";
import { List } from "./List/List";





const TarrifContainer = () => {
  const [initialValue, setInitialValue] = useState<any>({
    title: "",
    startDate: "",
    DataEntryStartDate: "",
    letterNumber: "",
    letterDate: "",
    file: null,
    description: "",
  });

  const addMutation = useNewTarrif();

  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);


  const onSubmit = (value: any) => {
    if (!value.file || !(value.file.length > 0)) {
      return showToast(["لطفا فایل را انتخاب کنید!"], ToastTypes.error);
    }

    const formData = new FormData();
    if(value.file) {
      for (let file of value.file) {
        formData.append(`File`, file);
      }
    }
    
    formData.append(`Title`, value.title);
    formData.append(`Description`, value.description);
    formData.append(`LetterNumber`, value.letterNumber);
    formData.append(`LetterDateAsShamsi`, value.letterDate);
    formData.append(`LetterDate`, value.letterDate);
    formData.append(`StartDateAsShamsi`, value.startDate);
    formData.append(`StartDate`, value.startDate);
    formData.append(`LetterDate`, value.letterDate);
    formData.append(`DataEntryStartDateAsShamsi`, value.DataEntryStartDate);
    formData.append(`DataEntryStartDate`, value.DataEntryStartDate);

    addMutation.mutate(formData, {
      onSuccess: (val: any) => {
        showToast(["با موفقیت انجام شد."], ToastTypes.success);
        const newEvent = { ...refetchEvent };
        newEvent.tariffList = !newEvent.tariffList;
        setRefetchEvent(newEvent);
      },
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle> ثبت تعرفه </CardTitle>
        </CardHeader>
        <CardBody>
          <Formik
            enableReinitialize={true}
            initialValues={initialValue}
            validationSchema={SetTarrifValidate}
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
                    <Col md="4">
                      <TextInput
                        lableText="عنوان تعرفه"
                        name="title"
                        placeholder="عنوان تعرفه را وارد کنید ... ..."
                        significant
                      />
                    </Col>
                    <Col md="4">
                      <ModernDatePicker
                        name="startDate"
                        lableText="تاریخ شروع تعرفه"
                        placeholder="وارد کنید..."
                        minimumDate={getCurrentJalaliDate()}
                        hasMaximum={false}
                      />
                    </Col>
                    <Col md="4">
                      <ModernDatePicker
                        name="DataEntryStartDate"
                        lableText="تاریخ شروع ورود داده توسط کاربران"
                        placeholder="وارد کنید..."
                        minimumDate={getCurrentJalaliDate()}
                        hasMaximum={false}
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col md="4">
                      <TextInput
                        lableText="شماره مصوبه"
                        name="letterNumber"
                        placeholder="وارد کنید ..."
                        significant
                      />
                    </Col>
                    <Col md="4">
                      <ModernDatePicker
                        name="letterDate"
                        lableText="تاریخ مصوبه"
                        placeholder="وارد کنید..."
                        hasMaximum={false}
                      />
                    </Col>
                    <Col md="4">
                      <FileInput
                        files={values.file}
                        outLine
                        name="file"
                        inputText="بارگذاری اصل مصوبه"
                        setFieldValue={(val: any) => {
                          setFieldValue("file", val);
                        }}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="4">
                      <TextArea
                        lableText="توضیحات"
                        name="description"
                        placeholder="توضیحات"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="4">
                      <SubmitButton
                        isLoading={addMutation.isLoading}
                        values={values}
                        schema={SetTarrifValidate}
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

      <List />
    </>
  );
};

export { TarrifContainer };
