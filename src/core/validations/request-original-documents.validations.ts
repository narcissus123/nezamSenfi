import * as Yup from "yup";
import { CheckMaximumDate } from "../utils";

const RequestOriginalDocumentsValidate = Yup.object().shape({
  date: Yup.string()
    .required(" تاریخ حضور نباید خالی باشد")
    .test("presenceDate", "تاریخ وارد شده نادرست است", (val: any) =>
      CheckMaximumDate(val, false, true)
    )
    .typeError("تاریخ حضور را انتخاب کنید"),
  description: Yup.string()
    .required("توضیحات را وارد کنید")
    .typeError("توضیحات را درست وارد کنید"),
  
});

export { RequestOriginalDocumentsValidate };
