import * as Yup from "yup";

const InspectionBuildingsRepair = Yup.object().shape({
  buildingRepairsCostId: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  buildingRepairsNameIds: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.number(),
        label: Yup.string().nullable(),
      })
    )
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  numberOfBuildingUnits: Yup.number()
    .required("این فیلد باید پر شود!")
    .typeError("لطفا فقط عدد وارد کنید"),
  facilityRepairsCostId: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  facilityRepairsNamesViewModel: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.number(),
        label: Yup.string().nullable(),
      })
    )
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  numberOfFacilityUnits: Yup.number()
    .required("این فیلد باید پر شود!")
    .typeError("لطفا فقط عدد وارد کنید"),
});

export { InspectionBuildingsRepair };
