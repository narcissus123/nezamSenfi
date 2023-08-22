import { Form, Formik } from "formik";
import React, { useState } from "react";
import {
  Alert,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  Row,
} from "reactstrap";
import { showToast } from "../../../../../../../../core/utils";
import { NewContractDraftValidate } from "../../../../../../../../core/validations/new-contract-draft.validations";
import {
  DropZone,
  ModernDatePicker,
  SubmitButton,
  TextArea,
  TextInput,
} from "../../../../../../../common/Form";
import BasicSelectOption from "../../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";

export interface IPropsType {
  setFormData: any;
  guaratorsRequirements: any;
}

const NewContractDraft: React.FC<IPropsType> = ({
  setFormData,
  guaratorsRequirements,
}) => {
  const [initialValues, setInitialValues] = useState<any>({
    guaranteeType: 0,
    date: "",
    number: "",
    price: guaratorsRequirements.guaranteeAmount,
    sponsorName: "",
    gender: 0,
    nationalCode: "",
    phoneNumber: "",
    address: "",
    telephone: "",
    guarantorsFiles: null,
    postalCode: "",
    workAddress: "",
  });
  const [counter, setCounter] = useState<number>(1);

  let guaranteeTypeData: any = [];

  if (guaratorsRequirements.guaranteeType === 2) {
    guaranteeTypeData = [
      {
        label: "انتخاب کنید ...",
        options: [{ value: 1, label: "سفته" }],
      },
    ];
  } else {
    guaranteeTypeData = [
      {
        label: "انتخاب کنید ...",
        options: [{ value: 2, label: "چک" }],
      },
    ];
  }

  const [genderData, setGenderData] = useState<any>([
    {
      label: "انتخاب کنید ...",
      options: [
        { value: 1, label: "مرد" },
        { value: 2, label: "زن" },
      ],
    },
  ]);

  console.log("---guarantors requirements---", guaratorsRequirements);

  const onSubmit = (value: any, { resetForm }: any) => {
    if (!value.guarantorsFiles || !(value.guarantorsFiles.length > 0)) {
      return showToast(["لطفا اسناد مورد نیاز را انتخاب کنید!"], "error");
    }
    let newFormObject = {
      id: counter,
      guaranteeType: value.guaranteeType.value,
      guaranteeTypeTitle: value.guaranteeType.label,
      date: value.date,
      number: value.number,
      price: value.price,
      sponsorName: value.sponsorName,
      gender: value.gender ? value.gender.value : 0,
      genderTitle: value.gender ? value.gender.label : "",
      nationalCode: value.nationalCode,
      phoneNumber: value.phoneNumber,
      telephone: value.telephone,
      address: value.address,
      workAddress: value.workAddress,
      postalCode: value.postalCode,
      guarantorsFiles: value.guarantorsFiles,
    };
    setCounter((prev: number) => {
      return prev + 1;
    });
    setFormData((prev: any) => {
      return [...prev, newFormObject];
    });
    resetForm();
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>مشاهده پیش نویس قرارداد و ثبت ضمانت نامه ها</CardTitle>
        </CardHeader>
        <CardBody>
          <Alert color="info">{`حداقل تعداد ضامن ها می بایست ${guaratorsRequirements.guarantorCount} نفر باشد!`}</Alert>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={NewContractDraftValidate}
            onSubmit={onSubmit}
          >
            {({
              values,
              errors,
              handleChange,
              touched,
              getFieldProps,
              setFieldValue,
              resetForm,
            }) => {
              return (
                <Form>
                  <>
                    <Row>
                      <Col sm="4">
                        <BasicSelectOption
                          lableText="نوع تضمین"
                          significant={true}
                          name="guaranteeType"
                          placeHolder="انتخاب کنید..."
                          data={guaranteeTypeData}
                        />
                      </Col>
                      <Col sm="4">
                        <ModernDatePicker
                          lableText="تاریخ"
                          name="date"
                          placeholder="تاریخ"
                          hasMaximum={false}
                          initialValue={initialValues.date}
                          significant
                        />
                      </Col>

                      <Col sm="4">
                        <TextInput
                          significant
                          lableText="شماره"
                          name="number"
                          placeholder="شماره"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="4">
                        <TextInput
                          significant
                          lableText="مبلغ"
                          name="price"
                          disabled
                          placeholder="مبلغ"
                        />
                      </Col>
                      <Col sm="4">
                        <TextInput
                          significant
                          lableText="نام و نام خانوادگی ضامن"
                          name="sponsorName"
                          placeholder="نام و نام خانوادگی ضامن"
                        />
                      </Col>
                      <Col sm="4">
                        <TextInput
                          lableText="کد ملی ضامن"
                          significant
                          name="nationalCode"
                          placeholder="کد ملی ضامن"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col sm="4">
                        <BasicSelectOption
                          lableText="جنسیت ضامن"
                          significant={true}
                          name="gender"
                          placeHolder="انتخاب کنید..."
                          data={genderData}
                        />
                      </Col>
                      <Col sm="4">
                        <TextInput
                          lableText="شماره موبایل ضامن"
                          significant
                          name="phoneNumber"
                          placeholder="شماره موبایل ضامن"
                        />
                      </Col>
                      <Col sm="4">
                        <TextInput
                          lableText="شماره تلفن ثابت ضامن"
                          significant
                          name="telephone"
                          placeholder="شماره تلفن ثابت"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="4">
                        <TextArea
                          name="address"
                          lableText="آدرس ضامن"
                          placeholder="آدرس ..."
                          id="address"
                          significant
                        />
                      </Col>
                      <Col md="4">
                        <TextArea
                          name="workAddress"
                          lableText="آدرس محل کار ضامن"
                          placeholder="آدرس ..."
                          id="workAddress"
                          significant
                        />
                      </Col>
                      <Col md="4">
                        <TextInput
                          lableText="کد پستی ضامن"
                          significant
                          name="postalCode"
                          placeholder="کد پستی"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <DropZone
                        name="guarantorsFiles"
                        lableText="انتخاب فایل ضمیمه"
                      />
                    </Row>
                    <Row>
                      <Col>
                        <SubmitButton
                          isLoading={false}
                          schema={NewContractDraftValidate}
                          values={values}
                          initialValue={initialValues}
                          btnText="افزودن"
                        />
                      </Col>
                    </Row>
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

export { NewContractDraft };
