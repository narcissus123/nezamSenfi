import * as Yup from "yup";
import { isLimitedNumberRegex } from "../utils";

const addProductCategoryValidation = Yup.object().shape({
  cpcCode: Yup.string()
    .matches(isLimitedNumberRegex(5, 5), "کد cpc باید 5 رقم باشد!")
    .required("لطفا کد CPC را وارد کنید")
    .typeError("لطفا فقط عدد وارد کنید!"),
  ranges: Yup.array()
    .of(
      Yup.object().shape({
        range: Yup.string()
          .matches(
            isLimitedNumberRegex(3, 3),
            "کد پایه وارد شده نا معتبر است لطفا ورودی سه رقمی وارد کنید"
          )
          .required("این فیلد باید پر شود!")
          .typeError("لطفا فقط عدد وارد کنید!"),
        title: Yup.string().required("لطفا عنوان بازه را وارد کنید"),
      })
    )
    .required("لطفا حداقل یک بازه را وارد کنید!")
    .typeError("لطفا حداقل یک بازه را وارد کنید!"),
});

export { addProductCategoryValidation };
