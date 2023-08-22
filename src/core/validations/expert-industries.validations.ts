import * as Yup from "yup";

const ExpertAlterantIndustriesTabValidate = Yup.object().shape({
  productionYearNum: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  consumptionStatusEnum: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  unitHealthStatusEnum: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  licenseNumber: Yup.string()
    .required("این فیلد باید پر شود!")
    .typeError("این فیلد باید پر شود!"),
  issueDate: Yup.string()
    .required("این فیلد باید پر شود!")
    .typeError("این فیلد باید پر شود!"),
  validityDuration: Yup.number()
    .required("این فیلد باید پر شود!")
    .min(0, "یک عدد بین 0 تا 255 وارد کنید!")
    .max(255, "یک عدد بین 0 تا 255 وارد کنید!")
    .typeError("لطفا عدد وارد کنید!"),
  healthCode: Yup.string()
    .required("این فیلد باید پر شود!")
    .typeError("این فیلد باید پر شود!"),
  machineryId: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  machineManufacturerId: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
});

export { ExpertAlterantIndustriesTabValidate };
