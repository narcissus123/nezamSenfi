import * as Yup from "yup";
import { isLimitedNumberRegex, isNumberRegex } from "../utils";

const addProductiValidation = Yup.object().shape({
  name: Yup.string().required("لطفا نام محصول را وارد کنید"),
  productCode: Yup.string()
    .required("لطفا کد محصول را وارد کنید")
    .typeError("لطفا کد محصول را وارد کنید"),
  unit: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  productCategory: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
});

export { addProductiValidation };
