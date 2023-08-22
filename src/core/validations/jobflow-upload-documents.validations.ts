import * as Yup from "yup";
import { CheckMaximumDate } from "../utils";

const JobFlowUploadDocumentsValidate = Yup.object().shape({
  companyName: Yup.string().required("لطفا نام سازمان را وارد کنید"),
  province: Yup.object()
    .required()
    .test(
      "province",
      "لطفا استان محل خدمت را انتخاب کنید",
      (obj: any) => obj.value > 0
    )
    .typeError("لطفا استان محل خدمت را انتخاب کنید"),
  county: Yup.object()
    .required()
    .test(
      "county",
      "لطفا شهرستان محل خدمت را انتخاب کنید",
      (obj: any) => obj.value > 0
    )
    .typeError("لطفا شهرستان محل خدمت را انتخاب کنید"),
  startDate: Yup.string()
    .required(" تاریخ شروع فعالیت نباید خالی باشد")
    .test("startDate", "تاریخ وارد شده نادرست است", (val: any) =>
      CheckMaximumDate(val)
    )
    .typeError("تاریخ شروع فعالیت را انتخاب کنید"),
  finishDate: Yup.string()
    .required(" تاریخ پایان فعالیت نباید خالی باشد")
    .test("finishDate", "تاریخ وارد شده نادرست است", (val: any) =>
      CheckMaximumDate(val)
    )
    .typeError("تاریخ پایان فعالیت را انتخاب کنید"),
  insuranceType: Yup.object()
    .required()
    .test(
      "insuranceType",
      "لطفا وضعیت بیمه را انتخاب کنید",
      (obj: any) => obj.value > 0
    )
    .typeError("لطفا وضعیت بیمه را انتخاب کنید"),
  insuranceHistory: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  jobType: Yup.object()
    .required()
    .test(
      "jobType",
      "لطفا نوع اشتغال را انتخاب کنید",
      (obj: any) => obj.value > 0
    )
    .typeError("لطفا نوع اشتغال را انتخاب کنید"),
  serviceType: Yup.object()
    .required()
    .test(
      "serviceType",
      "لطفا نوع ارائه خدمت را انتخاب کنید",
      (obj: any) => obj.value > 0
    )
    .typeError("لطفا نوع ارائه خدمت را انتخاب کنید"),
});

export { JobFlowUploadDocumentsValidate };
