import { isNumberRegex } from "./../utils/regex.utils";
import * as Yup from "yup";

const addProductItemEditValidation = Yup.object().shape({
  itemName: Yup.string().required("لطفا نام رقم را وارد کنید"),
  code: Yup.string()
    .test(
      "code",
      "کد باید 2 رقم باشد",
      (val: any) => val && val.toString().length === 2
    )
    .required("لطفا کد رقم را وارد کنید"),
  periodProduct: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
});

export { addProductItemEditValidation };
