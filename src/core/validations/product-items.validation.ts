import { isNumberRegex } from "./../utils/regex.utils";
import * as Yup from "yup";

const addProductItemValidation = Yup.object().shape({
  itemName: Yup.string().required("لطفا نام رقم را وارد کنید"),
  code: Yup.string()
    .matches(isNumberRegex(), "لطفا عدد وارد کنید")
    .test(
      "code",
      "کد باید 2 رقم باشد",
      (val: any) => val && val.toString().length === 2 && val > 0
    )
    .required("لطفا کد رقم را وارد کنید"),
  product: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  periodProduct: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
});

export { addProductItemValidation };
