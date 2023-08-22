import * as Yup from "yup";
import { CheckMaximumDate, RemoveCurrencyMask } from "../utils";

const NoticeForPresenceValidation = Yup.object().shape({
  presenceDate: Yup.string()
    .required(" تاریخ حضور نباید خالی باشد")
    .test("presenceDate", "تاریخ وارد شده نادرست است", (val: any) =>
      CheckMaximumDate(val, false, true)
    )
    .typeError("تاریخ حضور را انتخاب کنید"),
  guaranteeType: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  guaranteeAmount: Yup.string()
    .required("هزینه تضمین را وارد کنید")
    .test(
      "guaranteeAmount",
      `مبلغ تضمین کمتر از صفر نمیتواند باشد`,
      (val: any) => (val ? RemoveCurrencyMask(val) >= 0 : true)
    )
    .required("لطفا مقدار مورد نظر را درست وارد کنید"),
  description: Yup.string()
    .required("توضیحات را وارد کنید")
    .typeError("توضیحات را درست وارد کنید"),
  guarantorCount: Yup.number()
    .required("تعداد ضامن را وارد کنید")
    .typeError("تعداد ضامن را درست وارد کنید"),
});

export { NoticeForPresenceValidation };
