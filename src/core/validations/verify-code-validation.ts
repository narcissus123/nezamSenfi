import { isNumberRegex } from "./../utils/regex.utils";
import * as Yup from "yup";

export const verificationValidation = Yup.object({
  verificationCode: Yup.string()
    .matches(isNumberRegex(), "لطفا عدد وارد کنید")
    .required("لطفا کد دریافتی را وارد کنید")
    .max(6, "کد وارد شده معتبر نیست")
    .min(6, "کد وارد شده معتبر نیست")
    .typeError("لطفا کد دریافتی را وارد کنید"),
});
