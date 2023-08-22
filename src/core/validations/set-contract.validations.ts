import * as Yup from "yup";

export const SetContractPositionValidation = Yup.object().shape({
  contractTypeEnum: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  files: Yup.array()
    .required("لطفا فایل را انتخاب کنید")
    .test(
      "files",
      "لطفا یک فایل بارگذاری کنید",
      (value: any) => value.length > 0
    )
    .typeError("فایل انتخاب شده درست نیست"),
});
