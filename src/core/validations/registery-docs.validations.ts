import { isPersian } from "./../utils/regex.utils";

import * as Yup from "yup";
import { isLimitedNumberRegex, PersianToEnglish, textRequired } from "../utils";

const nationalIdValidation = (value: string | undefined | null): boolean => {
  if (value === undefined || value === null) {
    return false;
  }
  value = PersianToEnglish(value);
  var patt = new RegExp(`^[0-9]{11}$`);
  return patt.test(value);
};

const RegisteryDocsValidate: any = Yup.object().shape({
  Name: Yup.string()
    .matches(isPersian(), "نام باید فارسی وارد شود")
    .required("لطفا نام صنف را وارد کنید!")
    .typeError("لطفا نام صنف را وارد کنید!"),
  // longitude: Yup.number().required(textRequired("طول جغرافیایی")).nullable(),
  // latitude: Yup.number().required(textRequired("عرض جغرافیایی")).nullable(),
  stablishNumber: Yup.string()
    .matches(
      isLimitedNumberRegex(1, 20),
      "آگهی ثبتی تاسیس یا تغییر باید بین 1 تا 20 رقم باشد"
    )
    .required("لطفا شماره آگهی ثبتی تاسیس یا تغییر را وارد کنید!")
    .typeError("لطفا شماره آگهی ثبتی تاسیس یا تغییر را وارد کنید!"),
  newspaperNumber: Yup.string()
    .matches(
      isLimitedNumberRegex(1, 20),
      "شماره روزنامه رسمی باید بین 1 تا 20 رقم باشد"
    )
    .required("لطفا شماره روزنامه رسمی را وارد کنید!")
    .typeError("لطفا شماره روزنامه رسمی را وارد کنید!"),
  nationalId: Yup.string()
    .required("لطفا شماره شناسه ملی خود را وارد کنید")
    .test("nationalId", "َشناسه ملی وارد شده نامعتبر است", (value) =>
      nationalIdValidation(value)
    )
    .typeError("لطفا شناسه ملی را درست وارد کنید"),
  economicCode: Yup.string()
    .matches(isLimitedNumberRegex(12, 12), "کد اقتصادی را درست وارد کنید")
    .required("کد اقتصادی نباید خالی باشد")
    .typeError("کد اقتصادی نباید خالی باشد"),
});

const ProvinceDocsValidate = Yup.object().shape({
  province: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
});
const CountyDocsValidate = Yup.object().shape({
  county: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
});

const MergedProvicneDocsValidate = ProvinceDocsValidate.concat(
  RegisteryDocsValidate
);
const MergedCountyDocsValidate = CountyDocsValidate.concat(
  RegisteryDocsValidate
);

export {
  RegisteryDocsValidate,
  MergedProvicneDocsValidate,
  MergedCountyDocsValidate,
};
