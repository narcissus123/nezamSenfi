import * as Yup from "yup";
import { textRequired, selectOptionRequired } from "./../utils";

const inpectionFacilitiesValidation = Yup.object().shape({
  buildingLicenseNumber: Yup.mixed().when("buildingLicense", {
    is: true,
    then: Yup.string().required(textRequired("شماره مجوز")).nullable(),
  }),
  buildingLicenseDate: Yup.mixed().when("buildingLicense", {
    is: true,
    then: Yup.string().required(textRequired("تاریخ مجوز ")).nullable(),
  }),

  buildingType: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  length: Yup.number().required(textRequired("طول (متر)")).nullable(),
  width: Yup.number().required(textRequired("عرض (متر)")).nullable(),
  area: Yup.number().required(textRequired("مساحت (متر مربع)")).nullable(),
  longitude: Yup.number().required(textRequired("طول جغرافیایی")).nullable(),
  latitude: Yup.number().required(textRequired("عرض جغرافیایی")).nullable(),

  fencesTypeList: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.number(),
        label: Yup.string(),
      })
    )
    .when(["buildingType"], (buildingType: any, schema: any) => {
      if (buildingType && buildingType.form === 3) {
        return schema
          .required("لطفا یک گزینه را انتخاب کنید")
          .typeError("لطفا یک گزینه را انتخاب کنید");
      }
      return schema.nullable().notRequired();
    }),
  geographicalDirectionsList: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.number(),
        label: Yup.string(),
      })
    )
    .when(["buildingType"], (buildingType: any, schema: any) => {
      if (buildingType && buildingType.form === 3) {
        return schema
          .required("لطفا یک گزینه را انتخاب کنید")
          .typeError("لطفا یک گزینه را انتخاب کنید");
      }
      return schema.nullable().notRequired();
    }),
  materialsTypeList: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.number(),
        label: Yup.string(),
      })
    )
    .when(["buildingType"], (buildingType: any, schema: any) => {
      if (buildingType && buildingType.form === 3) {
        return schema
          .required("لطفا یک گزینه را انتخاب کنید")
          .typeError("لطفا یک گزینه را انتخاب کنید");
      }
      return schema.nullable().notRequired();
    }),
  perimeter: Yup.number().when(
    ["buildingType"],
    (buildingType: any, schema: any) => {
      if (buildingType && buildingType.form === 3) {
        return schema
          .required("لطفا یک گزینه را انتخاب کنید")
          .typeError("لطفا فقط عدد وارد کنید")
          .min(0, "فقط عدد مثبت وارد کنید!");
      }
      return schema.nullable().notRequired();
    }
  ),

  Floor: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .when(["buildingType"], (buildingType: any, schema: any) => {
      if (buildingType && buildingType.form === 1) {
        return schema
          .required("لطفا یک گزینه را انتخاب کنید")
          .typeError("لطفا یک گزینه را انتخاب کنید");
      }
      return schema.nullable().notRequired();
    }),
  buildingLicenseStatus: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .when(["buildingType"], (buildingType: any, schema: any) => {
      if (buildingType && buildingType.form === 1) {
        return schema
          .required("لطفا یک گزینه را انتخاب کنید")
          .typeError("لطفا یک گزینه را انتخاب کنید");
      }
      return schema.nullable().notRequired();
    }),
  buldingAge: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .when(["buildingType"], (buildingType: any, schema: any) => {
      if (buildingType && buildingType.form === 1) {
        return schema
          .required("لطفا یک گزینه را انتخاب کنید")
          .typeError("لطفا یک گزینه را انتخاب کنید");
      }
      return schema.nullable().notRequired();
    }),
  wallCovering: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .when(["buildingType"], (buildingType: any, schema: any) => {
      if (buildingType && buildingType.form === 1) {
        return schema
          .required("لطفا یک گزینه را انتخاب کنید")
          .typeError("لطفا یک گزینه را انتخاب کنید");
      }
      return schema.nullable().notRequired();
    }),
  floorCovering: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .when(["buildingType"], (buildingType: any, schema: any) => {
      if (buildingType && buildingType.form === 1) {
        return schema
          .required("لطفا یک گزینه را انتخاب کنید")
          .typeError("لطفا یک گزینه را انتخاب کنید");
      }
      return schema.nullable().notRequired();
    }),
  roofCovering: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .when(["buildingType"], (buildingType: any, schema: any) => {
      if (buildingType && buildingType.form === 1) {
        return schema
          .required("لطفا یک گزینه را انتخاب کنید")
          .typeError("لطفا یک گزینه را انتخاب کنید");
      }
      return schema.nullable().notRequired();
    }),
  describe: Yup.string().when(["buildingType"], (buildingType: any, schema: any) => {
    if (buildingType && (buildingType.form === 2 || buildingType.form === 1 )) {
      return schema
        .required("این فیلد باید پر شود")
        .typeError("این فیلد باید پر شود");
    }
    return schema.nullable().notRequired();
  }),

  ventilation: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .when(["buildingType"], (buildingType: any, schema: any) => {
      if (buildingType && buildingType.form === 1) {
        return schema
          .required("لطفا یک گزینه را انتخاب کنید")
          .typeError("لطفا یک گزینه را انتخاب کنید");
      }
      return schema.nullable().notRequired();
    }),
  Electricity: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .when(["buildingType"], (buildingType: any, schema: any) => {
      if (buildingType && buildingType.form === 1) {
        return schema
          .required("لطفا یک گزینه را انتخاب کنید")
          .typeError("لطفا یک گزینه را انتخاب کنید");
      }
      return schema.nullable().notRequired();
    }),
  water: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .when(["buildingType"], (buildingType: any, schema: any) => {
      if (buildingType && buildingType.form === 1) {
        return schema
          .required("لطفا یک گزینه را انتخاب کنید")
          .typeError("لطفا یک گزینه را انتخاب کنید");
      }
      return schema.nullable().notRequired();
    }),
  Wastewater: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .when(["buildingType"], (buildingType: any, schema: any) => {
      if (buildingType && buildingType.form === 1) {
        return schema
          .required("لطفا یک گزینه را انتخاب کنید")
          .typeError("لطفا یک گزینه را انتخاب کنید");
      }
      return schema.nullable().notRequired();
    }),

  coldAndWarmth: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .when(["buildingType"], (buildingType: any, schema: any) => {
      if (buildingType && buildingType.form === 1) {
        return schema
          .required("لطفا یک گزینه را انتخاب کنید")
          .typeError("لطفا یک گزینه را انتخاب کنید");
      }
      return schema.nullable().notRequired();
    }),

  powerSource: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .when(["buildingType"], (buildingType: any, schema: any) => {
      if (buildingType && buildingType.form === 1) {
        return schema
          .required("لطفا یک گزینه را انتخاب کنید")
          .typeError("لطفا یک گزینه را انتخاب کنید");
      }
      return schema.nullable().notRequired();
    }),
  waterSource: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .when(["buildingType"], (buildingType: any, schema: any) => {
      if (buildingType && buildingType.form === 1) {
        return schema
          .required("لطفا یک گزینه را انتخاب کنید")
          .typeError("لطفا یک گزینه را انتخاب کنید");
      }
      return schema.nullable().notRequired();
    }),
  electricityTariff: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .when(["buildingType"], (buildingType: any, schema: any) => {
      if (buildingType && buildingType.form === 1) {
        return schema
          .required("لطفا یک گزینه را انتخاب کنید")
          .typeError("لطفا یک گزینه را انتخاب کنید");
      }
      return schema.nullable().notRequired();
    }),
  fuelSource: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .when(["buildingType"], (buildingType: any, schema: any) => {
      if (buildingType && buildingType.form === 1) {
        return schema
          .required("لطفا یک گزینه را انتخاب کنید")
          .typeError("لطفا یک گزینه را انتخاب کنید");
      }
      return schema.nullable().notRequired();
    }),
  electricPower: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .when(["buildingType"], (buildingType: any, schema: any) => {
      if (buildingType && buildingType.form === 1) {
        return schema
          .required("لطفا یک گزینه را انتخاب کنید")
          .typeError("لطفا یک گزینه را انتخاب کنید");
      }
      return schema.nullable().notRequired();
    }),
  waterTariff: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .when(["buildingType"], (buildingType: any, schema: any) => {
      if (buildingType && buildingType.form === 1) {
        return schema
          .required("لطفا یک گزینه را انتخاب کنید")
          .typeError("لطفا یک گزینه را انتخاب کنید");
      }
      return schema.nullable().notRequired();
    }),
});

export { inpectionFacilitiesValidation };
