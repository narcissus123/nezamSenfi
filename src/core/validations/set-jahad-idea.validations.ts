import { CheckMaximumDate } from "./../utils/date-helper.utils";
import { isNumberRegex } from "./../utils/regex.utils";
import * as Yup from "yup";

const SetJahadIdeaValidate = Yup.object().shape({
  facilityAndOperationLicenseNumber: Yup.string()
    .matches(isNumberRegex(), "لطفا به عدد وارد کنید")
    .required("شماره تسهیلات و پروانه بهره برداری نباید خالی باشد")
    .typeError("شماره تسهیلات و پروانه بهره برداری نباید خالی باشد"),
  jahadResponseLetterNumber: Yup.string()
    .matches(isNumberRegex(), "لطفا به عدد وارد کنید")
    .required("شماره نامه پاسخ جهاد نباید خالی باشد")
    .typeError("شماره نامه پاسخ جهاد نباید خالی باشد"),
  facilityAndOperationLicenseIssuingDate: Yup.string()
    .required(" تاریخ صدور پروانه بهره برداری نباید خالی باشد")
    .test(
      "facilityAndOperationLicenseIssuingDate",
      "تاریخ صدور پروانه بهره برداری وارد شده نادرست است",
      (val: any) => CheckMaximumDate(val, false, true)
    )
    .typeError("تاریخ صدور پروانه بهره برداری را انتخاب کنید"),
  jahadResponseLetterDate: Yup.string()
    .required(" تاریخ نامه پاسخ جهاد نباید خالی باشد")
    .test(
      "jahadResponseLetterDate",
      "تاریخ نامه پاسخ جهاد وارد شده نادرست است",
      (val: any) => CheckMaximumDate(val)
    )
    .typeError("تاریخ نامه پاسخ جهاد تولد را انتخاب کنید"),
  FacilityAndOperationDocumentIds: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.number(),
        label: Yup.string().nullable(),
      })
    )
    .required("لطفا یکی را حداقل انتخاب کنید")
    .typeError("لفطا یکی از گزینه ها را انتخاب کنید!"),
  facilityAndOperationLicenseStatus: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  files: Yup.array()
    .required("لطفا فایل را انتخاب کنید")
    .test(
      "files",
      "لطفا یک فایل بارگذاری کنید",
      (value: any) => value.length > 0
    )
    .typeError("فایل انتخاب شده درست نیست"),
});

export { SetJahadIdeaValidate };
