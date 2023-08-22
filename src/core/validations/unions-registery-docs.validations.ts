import * as Yup from "yup";
import { isLimitedNumberRegex, PersianToEnglish } from "../utils";

const nationalIdValidation = (value: string | undefined | null): boolean => {
  if (value === undefined || value === null) {
    return false;
  }
  value = PersianToEnglish(value);
  var patt = new RegExp(`^[0-9]{11}$`);
  return patt.test(value);
};

const UnionsRegisteryDocsValidate = Yup.object().shape({
  Name: Yup.string()
    .required("لطفا نام اتحادیه را وارد کنید!")
    .typeError("لطفا نام اتحادیه را وارد کنید!"),
  stablishNumber: Yup.string()
    .required("لطفا شماره آگهی ثبتی تاسیس یا تغییر را وارد کنید!")
    .typeError("لطفا شماره آگهی ثبتی تاسیس یا تغییر را وارد کنید!"),
  newspaperNumber: Yup.string()
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

export { UnionsRegisteryDocsValidate };
