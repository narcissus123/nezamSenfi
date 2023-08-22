import * as Yup from "yup";
import {
  textRequired,
  selectOptionRequired,
} from "./../utils/validation-error.utils";

const AddLandAdjacentTypeValidation = Yup.object().shape({
  name: Yup.string().required(textRequired("نام")),
  code: Yup.string().required(textRequired("کد")),
  order: Yup.string().required(textRequired("ترتیب نمایش")).nullable(),
  type: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
});

export { AddLandAdjacentTypeValidation };
