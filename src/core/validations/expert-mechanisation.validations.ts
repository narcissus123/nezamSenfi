import * as Yup from "yup";

const ExpertMechanisationTabValidate = Yup.object().shape({
  machinName: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  toolsType: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  toolsName: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  // totalLicensedArea: Yup.array()
  //   .required("لطفا یک فایل انتخاب کنید")
  //   .typeError("لطفا یک فایل انتخاب کنید"),
  // areaOfWithoutLicense: Yup.array()
  //   .required("لطفا یک فایل انتخاب کنید")
  //   .typeError("لطفا یک فایل انتخاب کنید"),
  province: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  township: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  village: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  daysInImmigration: Yup.string().required("این فیلد باید پر شود!"),
  agriculturalToolsAndServicesNumber: Yup.number()
    .required("این فیلد باید پر شود!")
    .typeError("لطفا فقط عدد وارد کنید!")
    .min(1, "حداقل مقدار این ورودی باید یک باشد!"),
});

export { ExpertMechanisationTabValidate };
