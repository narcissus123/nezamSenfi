import * as Yup from "yup";
import {
  textRequired,
  selectOptionRequired,
} from "./../utils/validation-error.utils";

const AddBuildingTypeValidation = Yup.object().shape({
  name: Yup.string().required(textRequired("نام")),
  code: Yup.number()
    .required(textRequired("کد"))
    .typeError("لطفا عدد وارد کنید!"),
  order: Yup.number()
    .required(textRequired("ترتیب نمایش"))
    .typeError("لطفا عدد وارد کنید!"),
  roof: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  status: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  buildingType: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
});

export { AddBuildingTypeValidation };
