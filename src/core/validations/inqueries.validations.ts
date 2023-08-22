import * as Yup from "yup";
import { CheckMaximumDate, isPersianAndNumber } from "../utils";

export const ISelectInquiryValidation = Yup.object().shape({
  inquiries: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.number(),
        label: Yup.string().nullable(),
      })
    )
    .typeError("لفطا یکی از گزینه ها را انتخاب کنید!"),
});

export const NoticeLettersValidation = Yup.object().shape({
  creditStartDate: Yup.string()
    .required(" تاریخ نباید خالی باشد")
    .test("creditStartDate", "تاریخ وارد شده نادرست است", (val: any) =>
      CheckMaximumDate(val, false, true)
    )
    .typeError("تاریخ را انتخاب کنید"),
  appendix: Yup.string()
    .notRequired()
    .matches(isPersianAndNumber(), "پیوست را درست وارد کنید")
    .typeError("پیوست را درست وارد کنید"),
  letterNumber: Yup.string()
    .required("شماره نامه را وارد کنید")
    .typeError("شماره نامه را درست وارد کنید"),
});
