import * as Yup from "yup";
import { CheckMaximumDate } from "../utils";

export const CheckBoxPositionValidation = Yup.object().shape({
  fromDate: Yup.string()
    .required(" تاریخ نباید خالی باشد")
    .test("fromDate", "تاریخ وارد شده نادرست است", (val: any) =>
      CheckMaximumDate(val, false, true)
    )
    .typeError("تاریخ را انتخاب کنید"),
  toDate: Yup.string()
    .required(" تاریخ نباید خالی باشد")
    .test("toDate", "تاریخ وارد شده نادرست است", (val: any) =>
      CheckMaximumDate(val, false, true)
    )
    .typeError("تاریخ را انتخاب کنید"),
});

export const SetPositionValidation = Yup.object().shape({
  province: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  county: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  union: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  mainLocation: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  positionType: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
});
