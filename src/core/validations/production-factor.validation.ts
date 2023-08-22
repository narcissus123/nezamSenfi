import { isNumberRegex } from "./../utils/regex.utils";
import * as Yup from "yup";


const addProductionFactorValidation = Yup.object().shape({
  name: Yup.string().required("لطفا نام را وارد کنید"),
  code: Yup.string()
    .matches(isNumberRegex(), "لطفا عدد وارد کنید")
    .test(
      "code",
      "کد باید 2 رقم باشد",
      (val: any) => val && val.toString().length === 2
    )
    .required("لطفا کد را وارد کنید")
    .typeError("لطفا درست وارد کنید"),
  useTypeId: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  unit: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  job: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),

  products: Yup.array()
    .of(
      Yup.object().shape({
        productCategory: Yup.object()
          .shape({
            value: Yup.number(),
            label: Yup.string().nullable(),
          })
          .required("این فیلد باید پر شود!")
          .typeError("این فیلد باید پر شود!"),
        productIds: Yup.object()
          .shape({
            value: Yup.number(),
            label: Yup.string().nullable(),
          })
          .required("این فیلد باید پر شود!")
          .typeError("این فیلد باید پر شود!"),
        maxProduction: Yup.number()
          .required(
            "لطفا حداکثر ظرفیت تولید محصول در یک واحد از عامل تولید را وارد کنید"
          )
          .typeError("لطفا فقط عدد وارد کنید !"),
      })
    )
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  establishmentOfProduction: Yup.number()
    .required("لطفا استقرار تولید را وارد کنید")
    .typeError("لطفا فقط عدد وارد کنید")
    .min(0, "حداقل ورودی می تواند 0 باشد!")
    .max(365, "حداکثر ورودی می تواند 365 باشد!"),
});

export { addProductionFactorValidation };
