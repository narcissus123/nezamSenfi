import * as Yup from "yup";

const ExpertMerchantTabValidate = Yup.object().shape({
  transportationStatusEnum: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  packingStatusEnum: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  manPowerStatusEnum: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  permanentManpower: Yup.number()
    .required("این فیلد باید پر شود! (در صورت نداشتن نیرو صفر وارد شود)")
    .typeError("لطفا فقط عدد وارد کنید"),
  temporaryManPower: Yup.number()
    .required("این فیلد باید پر شود! (در صورت نداشتن نیرو صفر وارد شود)")
    .typeError("لطفا فقط عدد وارد کنید"),
  permanentExpertManpower: Yup.number()
    .required("این فیلد باید پر شود! (در صورت نداشتن نیرو صفر وارد شود)")
    .typeError("لطفا فقط عدد وارد کنید"),
  temporaryExpertManPower: Yup.number()
    .required("این فیلد باید پر شود! (در صورت نداشتن نیرو صفر وارد شود)")
    .typeError("لطفا فقط عدد وارد کنید"),
  brandStatusEnum: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
});

export { ExpertMerchantTabValidate };
