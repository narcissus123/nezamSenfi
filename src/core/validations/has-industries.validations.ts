import * as Yup from "yup";
import { isValidIranianNationalCode } from "./new-contract-draft.validations";

const HasIndustriesValidate = Yup.object().shape({
  industryUsageType: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),

  conversionIndustriesConsumptionSellers: Yup.array()
    .of(
      Yup.object().shape({
        firstName: Yup.string()
          .required("این فیلد باید پر شود!")
          .typeError("این فیلد باید پر شود!"),
        lastName: Yup.string()
          .required("این فیلد باید پر شود!")
          .typeError("این فیلد باید پر شود!"),
        nationalCode: Yup.string()
          .required("این فیلد باید پر شود!")
          .typeError("این فیلد باید پر شود!")
          .test("nationalCode", "کد ملی وارد شده نامعتبر است", (value) =>
            isValidIranianNationalCode(value)
          ),
      })
    )
    .when(["industryUsageType"], (industryUsageType: any, schema: any) => {
      if (
        industryUsageType &&
        (industryUsageType.value === 2 ||
          industryUsageType.value === 3 ||
          industryUsageType.value === 4 ||
          industryUsageType.value === 1)
      ) {
        return schema
          .required("لطفا یک گزینه را انتخاب کنید")
          .typeError("لطفا یک گزینه را انتخاب کنید");
      }
      return schema.nullable().notRequired();
    }),

  conversionIndustriesConsumptionOwners: Yup.array()
    .of(
      Yup.object().shape({
        firstName: Yup.string()
          .required("این فیلد باید پر شود!")
          .typeError("این فیلد باید پر شود!"),
        lastName: Yup.string()
          .required("این فیلد باید پر شود!")
          .typeError("این فیلد باید پر شود!"),
        nationalCode: Yup.string()
          .required("این فیلد باید پر شود!")
          .typeError("این فیلد باید پر شود!")
          .test("nationalCode", "کد ملی وارد شده نامعتبر است", (value) =>
            isValidIranianNationalCode(value)
          ),

        industryTitle: Yup.string()
          .required("این فیلد باید پر شود!")
          .typeError("این فیلد باید پر شود!"),
      })
    )
    .when(["industryUsageType"], (industryUsageType: any, schema: any) => {
      if (industryUsageType && industryUsageType.value === 6) {
        return schema
          .required("لطفا یک گزینه را انتخاب کنید")
          .typeError("لطفا یک گزینه را انتخاب کنید");
      }
      return schema.nullable().notRequired();
    }),
});

export { HasIndustriesValidate };