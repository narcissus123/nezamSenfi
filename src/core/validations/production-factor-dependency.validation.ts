import { isNumberRegex } from "./../utils/regex.utils";
import * as Yup from "yup";
import { TypeOfDependenceEnum } from "../enums/type-of-dependence.enums";


const addProductionFactorDependencyValidation = Yup.object().shape({
  productionFactor: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  secondUseTypes: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.number(),
        label: Yup.string().nullable(),
      })
    )
    .when(
      ["repeat", "dependType", "repeat2", "hasDistanceLimite"],
      (
        repeat: any,
        dependType: any,
        repeat2: any,
        hasDistanceLimite: any,
        schema: any
      ) => {
        if (
          (repeat &&
            dependType &&
            dependType.value === TypeOfDependenceEnum.TotalArea) ||
          (repeat2 &&
            dependType &&
            dependType.value === TypeOfDependenceEnum.Trees) ||
          (hasDistanceLimite &&
            dependType &&
            dependType.value === TypeOfDependenceEnum.Trees)
        ) {
          return schema
            .required("لطفا یک گزینه را انتخاب کنید")
            .typeError("لطفا یک گزینه را انتخاب کنید");
        }
        return schema.nullable().notRequired();
      }
    ),
  secondJob: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.number(),
        label: Yup.string().nullable(),
      })
    )
    .when(
      ["repeat", "dependType", "repeat2", "hasDistanceLimite"],
      (
        repeat: any,
        dependType: any,
        repeat2: any,
        hasDistanceLimite: any,
        schema: any
      ) => {
        if (
          (repeat &&
            dependType &&
            dependType.value === TypeOfDependenceEnum.TotalArea) ||
          (repeat2 &&
            dependType &&
            dependType.value === TypeOfDependenceEnum.Trees) ||
          (hasDistanceLimite &&
            dependType &&
            dependType.value === TypeOfDependenceEnum.Trees)
        ) {
          return schema
            .required("لطفا یک گزینه را انتخاب کنید")
            .typeError("لطفا یک گزینه را انتخاب کنید");
        }
        return schema.nullable().notRequired();
      }
    ),
  secondProduTctionFactors: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.number(),
        label: Yup.string().nullable(),
      })
    )
    .when(
      ["repeat", "dependType", "repeat2", "hasDistanceLimite"],
      (
        repeat: any,
        dependType: any,
        repeat2: any,
        hasDistanceLimite: any,
        schema: any
      ) => {
        if (
          (repeat &&
            dependType &&
            dependType.value === TypeOfDependenceEnum.TotalArea) ||
          (repeat2 &&
            dependType &&
            dependType.value === TypeOfDependenceEnum.Trees) ||
          (hasDistanceLimite &&
            dependType &&
            dependType.value === TypeOfDependenceEnum.Trees)
        ) {
          return schema
            .required("لطفا یک گزینه را انتخاب کنید")
            .typeError("لطفا یک گزینه را انتخاب کنید");
        }
        return schema.nullable().notRequired();
      }
    ),
  dependType: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  facilityBuildingsIds: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.number(),
        label: Yup.string().nullable(),
      })
    )
    .when(["dependType"], (dependType: any, schema: any) => {
      if (
        dependType &&
        dependType.value === TypeOfDependenceEnum.AreaOfBuildingsAndFacilities
      ) {
        return schema
          .required("لطفا یک گزینه را انتخاب کنید")
          .typeError("لطفا یک گزینه را انتخاب کنید");
      }
      return schema.nullable().notRequired();
    }),
  areaPerUnit: Yup.number().when(
    ["dependType"],
    (dependType: any, schema: any) => {
      if (
        dependType &&
        (dependType.value ===
          TypeOfDependenceEnum.AreaOfBuildingsAndFacilities ||
          dependType.value === TypeOfDependenceEnum.Trees)
      ) {
        return schema
          .required("این فیلد باید پر شود.")
          .typeError("لطفا فقط عدد وارد کنید")
          .min(0, "حداقل ورودی می تواند 0 باشد!");
      }
      return schema.nullable().notRequired();
    }
  ),

  machinery: Yup.array()
    .of(
      Yup.object().shape({
        machineryIds: Yup.object()
          .shape({
            value: Yup.number(),
            label: Yup.string().nullable(),
          })
          .required("لطفا یک گزینه را انتخاب کنید")
          .typeError("لطفا یک گزینه را انتخاب کنید"),
        servicesIds: Yup.array()
          .of(
            Yup.object().shape({
              value: Yup.number(),
              label: Yup.string().nullable(),
            })
          )
          .required("این فیلد باید پر شود.")
          .typeError("این فیلد باید پر شود."),
      })
    )
    .when(["dependType"], (dependType: any, schema: any) => {
      if (dependType && dependType.value === TypeOfDependenceEnum.Machinery) {
        return schema
          .required("این فیلد باید پر شود.")
          .typeError("این فیلد باید پر شود.");
      }
      return schema.nullable().notRequired();
    }),

  treeCategory: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .when(["dependType"], (dependType: any, schema: any) => {
      if (dependType && dependType.value === TypeOfDependenceEnum.Trees) {
        return schema
          .required("این فیلد باید پر شود.")
          .typeError("این فیلد باید پر شود.");
      }
      return schema.nullable().notRequired();
    }),
  treeName: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .when(["dependType"], (dependType: any, schema: any) => {
      if (dependType && dependType.value === TypeOfDependenceEnum.Trees) {
        return schema
          .required("این فیلد باید پر شود.")
          .typeError("این فیلد باید پر شود.");
      }
      return schema.nullable().notRequired();
    }),
  equipmentIds: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.number(),
        label: Yup.string().nullable(),
      })
    )
    .when(["dependType"], (dependType: any, schema: any) => {
      if (dependType && dependType.value === TypeOfDependenceEnum.Equipment) {
        return schema
          .required("لطفا یک گزینه را انتخاب کنید")
          .typeError("لطفا یک گزینه را انتخاب کنید");
      }
      return schema.nullable().notRequired();
    }),
});

export { addProductionFactorDependencyValidation };
