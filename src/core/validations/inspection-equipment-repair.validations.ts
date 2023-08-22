import * as Yup from "yup";

const InspectionEquipmentRepair = Yup.object().shape({
  mobileEquipmentRepairsCostId: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  mobileEquipmentNamesViewModel: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.number(),
        label: Yup.string().nullable(),
      })
    )
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  mobileEquipmentCount: Yup.number()
    .required("این فیلد باید پر شود!")
    .typeError("لطفا فقط عدد وارد کنید"),
  fixedEquipmentRepairsCostId: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  fixedEquipmentNamesViewModel: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.number(),
        label: Yup.string().nullable(),
      })
    )
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  fixedEquipmentCount: Yup.number()
    .required("این فیلد باید پر شود!")
    .typeError("لطفا فقط عدد وارد کنید"),
});

export { InspectionEquipmentRepair };
