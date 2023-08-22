import * as Yup from "yup";
import { CheckMaximumDate, isNumberRegex } from "../utils";

const SetSecretariatNumberValidation = Yup.object().shape({
  secretariatDate: Yup.string()
    .required(" تاریخ اندیکاتوری دبیرخانه نباید خالی باشد")
    .test("secretariatDate", "تاریخ وارد شده نادرست است", (val: any) =>
      CheckMaximumDate(val, false, true)
    )
    .typeError("تاریخ اندیکاتوری دبیرخانه را انتخاب کنید"),

  secretariatNumber: Yup.string()
    .matches(isNumberRegex(), "لطفا عدد وارد کنید")
    .required("شماره اندیکاتوری دبیرخانه را وارد کنید")
    .typeError("شماره اندیکاتوری دبیرخانه را درست وارد کنید"),
});

export { SetSecretariatNumberValidation };
