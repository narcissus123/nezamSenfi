import * as Yup from "yup";

const SetMachineryInfoExpert = Yup.object().shape(
  {
    machineryConsumptionOperationStatusEnum: Yup.object()
      .shape({
        value: Yup.string(),
        label: Yup.string().nullable(),
      })
      .when(
        "machineryConsumptionOperationStatusEnum",
        (machineryConsumptionOperationStatusEnum: any, schema: any) => {
          if (
            machineryConsumptionOperationStatusEnum &&
            (machineryConsumptionOperationStatusEnum.value === "2" ||
              machineryConsumptionOperationStatusEnum.value === "3")
          ) {
            return schema
              .required("یک گزینه را انتخاب کنید")
              .typeError("لطفا یکی از گزینه ها را انتخاب کنید!");
          }
          return schema.nullable().notRequired();
        }
      ),
    ownedToolsNamesIds: Yup.array()
      .of(
        Yup.object().shape({
          value: Yup.number(),
          label: Yup.string(),
        })
      )
      .when(
        "machineryConsumptionOperationStatusEnum",
        (machineryConsumptionOperationStatusEnum: any, schema: any) => {
          if (
            machineryConsumptionOperationStatusEnum &&
            (machineryConsumptionOperationStatusEnum.value === "2" ||
              machineryConsumptionOperationStatusEnum.value === "3")
          ) {
            return schema
              .required("یک گزینه را انتخاب کنید")
              .typeError("لطفا یکی از گزینه ها را انتخاب کنید!");
          }
          return schema.nullable().notRequired();
        }
      ),
    rentalMachineryNamesIds: Yup.array()
      .of(
        Yup.object().shape({
          value: Yup.number(),
          label: Yup.string(),
        })
      )
      .when(
        "machineryConsumptionOperationStatusEnum",
        (machineryConsumptionOperationStatusEnum: any, schema: any) => {
          if (
            machineryConsumptionOperationStatusEnum &&
            (machineryConsumptionOperationStatusEnum.value === "1" ||
              machineryConsumptionOperationStatusEnum.value === "3")
          ) {
            return schema
              .required("یک گزینه را انتخاب کنید")
              .typeError("لطفا یکی از گزینه ها را انتخاب کنید!");
          }
          return schema.nullable().notRequired();
        }
      ),
    rentalToolsNamesIds: Yup.array()
      .of(
        Yup.object().shape({
          value: Yup.number(),
          label: Yup.string().nullable(),
        })
      )
      .when(
        "machineryConsumptionOperationStatusEnum",
        (machineryConsumptionOperationStatusEnum: any, schema: any) => {
          if (
            machineryConsumptionOperationStatusEnum &&
            (machineryConsumptionOperationStatusEnum.value === "1" ||
              machineryConsumptionOperationStatusEnum.value === "3")
          ) {
            return schema
              .required("یک گزینه را انتخاب کنید")
              .typeError("لطفا یکی از گزینه ها را انتخاب کنید!");
          }
          return schema.nullable().notRequired();
        }
      ),
  },
  [
    [
      "machineryConsumptionOperationStatusEnum",
      "machineryConsumptionOperationStatusEnum",
    ],
  ]
);

export { SetMachineryInfoExpert };
