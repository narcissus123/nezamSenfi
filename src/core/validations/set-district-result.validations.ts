import { isNumberRegex } from "./../utils/regex.utils";
import * as Yup from "yup";
import { CheckMaximumDate } from "../utils";

const SetDistrictValidate = Yup.object().shape({
  letterNumber: Yup.string()
    .matches(isNumberRegex(), "لطفا به عدد وارد کنید")
    .required("شماره نامه نباید خالی باشد")
    .typeError("شماره نامه را درست وارد کنید"),
  description: Yup.string()
    .required("توضیحات نباید خالی باشد")
    .typeError("توضیحات را درست وارد کنید"),
  letterDate: Yup.string()
    .required(" تاریخ نامه پاسخ جهاد نباید خالی باشد")
    .test(
      "letterDate",
      "تاریخ نامه پاسخ جهاد وارد شده نادرست است",
      (val: any) => CheckMaximumDate(val)
    )
    .typeError("تاریخ نامه پاسخ جهاد تولد را انتخاب کنید"),
});

export { SetDistrictValidate };
