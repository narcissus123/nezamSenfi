import * as Yup from "yup";
import { TypeOfDependenceEnum } from "../enums/type-of-dependence.enums";
import { textRequired } from "./../utils";

const inspectionCapacityValidation = Yup.object().shape({
  job: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  productionFactor: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  activityRate: Yup.number()
    .min(0, "حداقل مقدار وارد شده می تواند صفر باشد!")
    .required(textRequired("میزان فعالیت"))
    .when("productionFactor", (productionFactor: any, schema: any) => {
      if (
        productionFactor &&
        productionFactor.typeOfDependence !==
          TypeOfDependenceEnum.AreaOfBuildingsAndFacilities &&
        productionFactor.typeOfDependence !== TypeOfDependenceEnum.TotalArea
      ) {
        return schema.integer("لطفا فقط عدد صحیح وارد کنید!");
      } else {
        return schema;
      }
    })
    .nullable(),
  numberOfyears: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  productionYear: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  mainProductName: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  mainProductItem: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  productionUnitOfActivity: Yup.number()
    .required(textRequired("تولید به ازای واحد فعالیت در سال"))
    .typeError("لطفا فقط عدد وارد کنید")
    .min(0, "حداقل مقدار وارد شده می تواند صفر باشد!")
    .nullable(),
  productionFactorMachineId: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .when("productionFactor", (productionFactor: any, schema: any) => {
      if (
        productionFactor &&
        productionFactor.typeOfDependence === TypeOfDependenceEnum.Machinery
      ) {
        return schema
          .required("یک گزینه را انتخاب کنید")
          .typeError("لطفا یکی از گزینه ها را انتخاب کنید!");
      }
      return schema.nullable().notRequired();
    }),
  productionFactorMachineAgricultureToolsAndServiceId: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .when("productionFactor", (productionFactor: any, schema: any) => {
      if (
        productionFactor &&
        productionFactor.typeOfDependence === TypeOfDependenceEnum.Machinery
      ) {
        return schema
          .required("یک گزینه را انتخاب کنید")
          .typeError("لطفا یکی از گزینه ها را انتخاب کنید!");
      }
      return schema.nullable().notRequired();
    }),
  numberOfAgriculturalToolsAndService: Yup.number().integer("لطفا فقط عدد صحیح وارد کنید!").when(
    "productionFactor",
    (productionFactor: any, schema: any) => {
      if (
        productionFactor &&
        productionFactor.typeOfDependence === TypeOfDependenceEnum.Machinery
      ) {
        return schema
          .required("یک گزینه را انتخاب کنید")
          .typeError("لطفا یکی از گزینه ها را انتخاب کنید!")
          .min(0, "حداقل مقدار وارد شده می تواند صفر باشد!");
      }
      return schema.nullable().notRequired();
    }
  ),
  ownToolsEnum: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .when("productionFactor", (productionFactor: any, schema: any) => {
      if (
        productionFactor &&
        productionFactor.typeOfDependence === TypeOfDependenceEnum.Equipment
      ) {
        return schema
          .required("یک گزینه را انتخاب کنید")
          .typeError("لطفا یکی از گزینه ها را انتخاب کنید!");
      }
      return schema.nullable().notRequired();
    }),
});

export { inspectionCapacityValidation };
