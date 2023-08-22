import { Formik, Form } from "formik";
import React, { FC, useEffect, useState } from "react";
import { Alert, CardBody } from "reactstrap";
import { ToastTypes } from "../../../../../../../../core/enums";
import {
  ConvertObjToStringDate,
  getCurrentJalaliDate,
  showToast,
} from "../../../../../../../../core/utils";
import { NoticeLettersValidation } from "../../../../../../../../core/validations/inqueries.validations";
import { ModernDatePicker } from "../../../../../../../common/Form";
import { TextArea } from "../../../../../../../common/Form/InputComponents/TextArea/TextArea";
import { TextInput } from "../../../../../../../common/Form/InputComponents/TextInputComponents/TextInput/TextInput";
import { SubmitButton } from "../../../../../../../common/Form/SubmitButtonComponent/SubmitButton/SubmitButton";
import { TwoColumn } from "../../../../../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";

interface IPropTypes {
  useMutate: any;
  formData: any;
  setInquiriesLetter: (val: any) => void;
}

const NoticeLettersForm: FC<IPropTypes> = ({
  useMutate,
  formData,
  setInquiriesLetter,
}) => {
  const [initialValues, setInitialValues] = useState({
    creditStartDate: ConvertObjToStringDate(getCurrentJalaliDate()),
    creditEndDate: "",
    appendix: "",
    letterNumber: null,
    letterTitle: "",
    letterCotent: "",
    inquiryTitle: "",
  });

  const [isSetted, setIsSetted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onSubmit = (value: any) => {
    const setNoticeLetterObj = {
      positionRequestInquiryId: formData.id,
      creditStartDate: value.creditStartDate
        ? value.creditStartDate
        : ConvertObjToStringDate(getCurrentJalaliDate()),
      creditEndDate: value.creditEndDate,
      appendix: value.appendix,
      letterNumber: value.letterNumber,
    };

    setIsLoading(true);

    useMutate.mutate(setNoticeLetterObj, {
      onSuccess: () => {
        showToast(["با موفقیت ثبت شد"], ToastTypes.success);
        setIsSetted(true);
        setIsLoading(false);
        setInquiriesLetter((old: any) => {
          const indexOfInquery = old.findIndex(
            (row: any) => row.id === formData.id
          );
          let newData = [...old];
          newData[indexOfInquery] = {
            ...newData[indexOfInquery],
            ...setNoticeLetterObj,
          };
          return newData;
        });
      },
    });
  };

  useEffect(() => {
    if (formData) {
      setInitialValues((old: any) => ({
        ...old,
        //creditStartDate: formData.creditStartDate,
        appendix: formData.appendix,
        creditEndDate: formData.creditEndDate,
        letterNumber: formData.letterNumber,
        letterCotent: formData.letterCotent,
        letterTitle: formData.letterTitle,
        inquiryTitle: formData.inquiryTitle,
      }));
    }
  }, [formData]);

  return (
    <CardBody>
      {isSetted && (
        <Alert color="info">با موفقیت ثبت شد.امکان ویرایش وجود دارد</Alert>
      )}
      <Formik
        initialValues={initialValues}
        onSubmit={onSubmit}
        validationSchema={NoticeLettersValidation}
        enableReinitialize
      >
        {({ values }) => (
          <Form>
            <TwoColumn>
              <>
                <TextInput
                  name="inquiryTitle"
                  placeholder="عنوان استعلام"
                  lableText="عنوان استعلام"
                  //value={formData ? formData.letterTitle : ""}
                  disabled
                />
                <TextInput
                  name="letterTitle"
                  placeholder="عنوان نامه"
                  lableText="عنوان نامه"
                  //value={formData ? formData.letterTitle : ""}
                  disabled
                />

                <TextArea
                  name="letterCotent"
                  placeholder="متن نامه"
                  lableText="متن نامه"
                  // value={formData ? formData.letterContent : ""}
                  disabled
                />
              </>

              <>
                <TextInput
                  name="letterNumber"
                  placeholder="شماره نامه را وارد کنید..."
                  hasLabel
                  lableText="شماره نامه"
                  significant
                  //value={formData ? formData.letterNumber : ""}
                />
                <TextInput
                  name="appendix"
                  placeholder="پیوست را وارد کنید..."
                  hasLabel
                  lableText="پیوست"
                  significant
                />
                <ModernDatePicker
                  lableText="تاریخ صدور"
                  name="creditStartDate"
                  significant
                  placeholder="...تاریخ را وارد کنید"
                  minimumDate={getCurrentJalaliDate()}
                  hasMaximum={false}
                  initialValue={
                    formData
                      ? formData.creditStartDate
                        ? formData.creditStartDate
                        : ConvertObjToStringDate(getCurrentJalaliDate())
                      : ConvertObjToStringDate(getCurrentJalaliDate())
                  }
                />
              </>
            </TwoColumn>

            <SubmitButton
              isLoading={useMutate.isLoading && isLoading}
              btnText="ثبت"
              values={values}
              submitOutLine
              schema={NoticeLettersValidation}
            />
          </Form>
        )}
      </Formik>
    </CardBody>
  );
};

export { NoticeLettersForm };
