import { isLimitedNumberRegex } from "./../utils/regex.utils";
import * as Yup from "yup";
import { textRequired } from "./../utils";

const geographicalLocationValidation = Yup.object().shape({
  ownershipType: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  location: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),

  // northAdjacent: Yup.number().required(textRequired("مجاور شمالی")).nullable(),
  // eastAdjacent: Yup.number().required(textRequired("مجاور شرقی")).nullable(),
  // southAdjacent: Yup.number().required(textRequired("مجاور جنوبی")).nullable(),
  // westAdjacent: Yup.number().required(textRequired("مجاور غربی")).nullable(),
  address: Yup.string()
    .required(textRequired("ادرس"))
    .nullable()
    .typeError("لطفا این فیلد را پر کنید!"),
  northAdjacent: Yup.string()
    .required("این فیلد باید پر شود!")
    .typeError("لطفا این فیلد را پر کنید!"),
  eastAdjacent: Yup.string()
    .required("این فیلد باید پر شود!")
    .typeError("لطفا این فیلد را پر کنید!"),
  southAdjacent: Yup.string()
    .required("این فیلد باید پر شود!")
    .typeError("لطفا این فیلد را پر کنید!"),
  westAdjacent: Yup.string()
    .required("این فیلد باید پر شود!")
    .typeError("لطفا این فیلد را پر کنید!"),
  farmName: Yup.string()
    .required(textRequired("نام مزرعه"))
    .nullable()
    .typeError("لطفا این فیلد را پر کنید!"),
  postalCode: Yup.string()
    .matches(isLimitedNumberRegex(10, 10), "کدپستی باید ده رقم و عدد باشد")
    .required("کد پستی خود را ثبت کنید")
    .typeError("لطفا کد پستی را وارد کنید"),
});

export { geographicalLocationValidation };
