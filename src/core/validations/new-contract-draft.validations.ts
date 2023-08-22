import * as Yup from "yup";
import { isHomePhone, isLimitedNumberRegex, PersianToEnglish } from "../utils";
import { checkNumber } from "./register-validation";

export function isValidIranianNationalCode(input: any) {
  if (!/^\d{10}$/.test(input)) return false;

  var check = +input[9];
  var sum = 0;
  var i;
  for (i = 0; i < 9; ++i) {
    sum += +input[i] * (10 - i);
  }
  sum %= 11;

  return (sum < 2 && check === sum) || (sum >= 2 && check + sum === 11);
}

const NewContractDraftValidate = Yup.object().shape({
  guaranteeType: Yup.object()
    .test("guaranteeType", "لطفا نوع ضمانت را انتخاب کنید", (obj: any) =>
      obj ? (obj.value > 0 ? true : false) : false
    )
    .nullable(),
  date: Yup.string()
    .required("لطفا تاریخ را وارد کنید")
    .typeError("لطفا تاریخ را وارد کنید"),
  address: Yup.string()
    .required("لطفا آدرس را وارد کنید")
    .typeError("لطفا آدرس را وارد کنید"),
  workAddress: Yup.string()
    .required("لطفا آدرس محل کار را وارد کنید")
    .typeError("لطفا آدرس محل کار را وارد کنید"),
  postalCode: Yup.string()
    .matches(isLimitedNumberRegex(10, 10), "کدپستی باید ده رقم و عدد باشد")
    .required("کد پستی خود را ثبت کنید")
    .typeError("لطفا کد پستی را وارد کنید"),
  telephone: Yup.string()
    .matches(isHomePhone(), "لطفا تلفن ثابت را درست وارد کنید")
    .required("لطفا تلفن ثابت را وارد کنید")
    .typeError("لطفا تلفن ثابت را درست وارد کنید"),
  sponsorName: Yup.string().required(
    "لطفا نام و نام خانوادگی ضامن را وارد کنید"
  ),
  gender: Yup.object()
    .test("gender", "لطفا جنسیت ضامن را انتخاب کنید", (obj: any) =>
      obj ? (obj.value > 0 ? true : false) : false
    )
    .nullable(),
  nationalCode: Yup.string()
    .required("لطفا کد ملی ضامن را وارد کنید")
    .test("nationalCode", "کد ملی وارد شده نامعتبر است", (value) =>
      isValidIranianNationalCode(value)
    )
    .typeError("لطفا کد ملی را درست وارد کنید"),
  phoneNumber: Yup.string()
    .required("لطفا شماره را وارد کنید")
    .test("cellphone", "شماره تلفن وارد شده نامعتبر است", (value) =>
      checkNumber(value)
    )
    .typeError("لطفا شماره را درست وارد کنید"),
});

export { NewContractDraftValidate };
