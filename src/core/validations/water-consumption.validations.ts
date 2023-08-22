import { isNumberRegex } from "../utils/regex.utils";
import * as Yup from "yup";
import { CheckMaximumDate } from "../utils";

const AgricutureWaterConsumptionValidate = Yup.object().shape({
  waterInOneProductionCicle: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),

  equipmentMaintenanceCosts: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  costOfWellDemolition: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  oneYearWaterCost: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
});

const WaterResourceJsonValidation = Yup.object().shape({
  waterSupplied: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  waterInOneLevelHour: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  waterSupplyCenter: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  licenseStatus: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  waterResourceLicenseCreditEnum: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .when("licenseStatus", (licenseStatus: any, schema: any) => {
      if (licenseStatus && licenseStatus.value === 1) {
        return schema
          .required("یک گزینه را انتخاب کنید")
          .typeError("لطفا یکی از گزینه ها را انتخاب کنید!");
      }
      return schema.nullable().notRequired();
    }),
  licenseType: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .when("licenseStatus", (licenseStatus: any, schema: any) => {
      if (licenseStatus && licenseStatus.value === 1) {
        return schema
          .required("یک گزینه را انتخاب کنید")
          .typeError("لطفا یکی از گزینه ها را انتخاب کنید!");
      }
      return schema.nullable().notRequired();
    }),
  licenseNumber: Yup.string().when(
    "licenseStatus",
    (licenseStatus: any, schema: any) => {
      if (licenseStatus && licenseStatus.value === 1) {
        return schema
          .matches(isNumberRegex(), "لطفا به عدد وارد کنید")
          .required("شماره لایسنس نباید خالی باشد")
          .typeError("شماره لایسنس را درست وارد کنید!");
      }
      return schema.nullable().notRequired();
    }
  ),
  issueDate: Yup.string().when(
    "licenseStatus",
    (licenseStatus: any, schema: any) => {
      if (licenseStatus && licenseStatus.value === 1) {
        return schema
          .test("issueDate", "تاریخ وارد شده نادرست است", (val: any) =>
            CheckMaximumDate(val)
          )
          .required("تاریخ لایسنس را وارد کنید")
          .typeError("تاریخ لایسنس را درست وارد کنید!");
      }
      return schema.nullable().notRequired();
    }
  ),
});

const WaterConsumptionValidate: any = Yup.object().shape({
  waterAmountGroupEnum: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  waterUsedAmountId: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  howTransferWaterToUnitEnum: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  waterInOneProductionCicle: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),

  equipmentMaintenanceCosts: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  costOfWellDemolition: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  oneYearWaterCost: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
});

const WaterConsumptionValidateMixed = AgricutureWaterConsumptionValidate.concat(
  WaterConsumptionValidate
);

export {
  AgricutureWaterConsumptionValidate,
  WaterResourceJsonValidation,
  WaterConsumptionValidateMixed,
};
