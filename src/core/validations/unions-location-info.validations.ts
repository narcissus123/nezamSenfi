import * as Yup from "yup";
import { isFax, isHomePhone, isLimitedNumberRegex } from "../utils";

const UnionsLocationInfoValidate = Yup.object().shape({
  province: Yup.object()
    .test("", "یک گزینه انتخاب کنید", (obj: any) =>
      obj ? obj.value > 0 : false
    )
    .required()
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  township: Yup.object()
    .test("", "یک گزینه انتخاب کنید", (obj: any) =>
      obj ? obj.value > 0 : false
    )
    .required()
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  city: Yup.object()
    .test("", "یک گزینه انتخاب کنید", (obj: any) =>
      obj ? obj.value > 0 : false
    )
    .required()
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  email: Yup.string()
    .email("ایمیل را به درستی وارد کنید")
    .required("ایمیل خود را ثبت کنید")
    .typeError("آدرس ایمیل خود را وارد کنید"),
  postalCode: Yup.string()
    .matches(isLimitedNumberRegex(10, 10), "کدپستی باید ده رقم و عدد باشد")
    .required("کد پستی خود را ثبت کنید")
    .typeError("لطفا کد پستی را وارد کنید"),
  phone: Yup.string()
    .matches(isHomePhone(), "شماره تلفن وارد شده نا معتبر است")
    .required("شماره محل شرکت خود را ثبت کنید")
    .typeError("لطفا شماره تلفن را وارد کنید"),
  address: Yup.string()
    .required("لطفا آدرس را وارد کنید!")
    .typeError("لطفا آدرس را وارد کنید!"),
  fax: Yup.string()
    .matches(isFax(), "شماره وارد شده اشتباه است!")
    .required("لطفا فکس را وارد کنید!")
    .typeError("لطفا فکس را وارد کنید!"),
  longitude: Yup.string()
    .required("این فیلد باید پر شود!")
    .typeError("این فیلد باید پر شود!"),
  latitude: Yup.string()
    .required("این فیلد باید پر شود!")
    .typeError("این فیلد باید پر شود!"),
});

export { UnionsLocationInfoValidate };
