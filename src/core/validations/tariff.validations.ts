import { isNumberRegex } from "./../utils/regex.utils";
import * as Yup from "yup";
import { CheckMaximumDate, RemoveCurrencyMask } from "../utils";

const SetTariffValidation: any = Yup.object().shape(
  {
    amount: Yup.string().when("percentage", (percentage: any, schema: any) => {
      if (percentage) {
        return schema;
      } else {
        return schema
          .required("مبلغ نباید خالی باشد")
          .test("amount", "مبلغ نمی تواند کمتر از صفر باشد", (value: any) => {
            if (+RemoveCurrencyMask(value) < 0) {
              return false;
            }
            return true;
          })
          .typeError("مبلغ را درست وارد کنید");
      }
    }),
    startDate: Yup.string()
      .required(" تاریخ شروع نباید خالی باشد")
      .test("birthDate", "تاریخ وارد شده نادرست است", (val: any) =>
        CheckMaximumDate(val, false, true)
      )
      .typeError("تاریخ شروع را انتخاب کنید"),
  },
  [["amount", "percentage"]]
);

const SetTariffProvinceValidation = Yup.object().shape({
  province: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .required("حداقل یک گزینه را انتخاب کنید")
    .typeError("حداقل یک گزینه را انتخاب کنید"),
  percentage: Yup.string().when("amount", (amount: any, schema: any) => {
    if (amount) {
      return schema;
    } else {
      return schema
        .matches(isNumberRegex(), "میزان درصد را درست وارد کنید")
        .typeError("درصد وارد شده اشتباه است")
        .required("میزان درصد افزایش را وارد کنید");
    }
  }),
});

const SetTariffCountyValidation = Yup.object().shape({
  county: Yup.object().when("province", (province: any, schema: any) => {
    console.log("---proooviincee,,", province);

    return province && province.value === "0"
      ? schema.notRequired().nullable()
      : schema
          .shape({
            value: Yup.string(),
            label: Yup.string().nullable(),
          })
          .required("حداقل یک گزینه را انتخاب کنید")
          .typeError("حداقل یک گزینه را انتخاب کنید");
  }),
});

const SetTariffUnionValidation = Yup.object().shape({
  union: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .required("حداقل یک گزینه را انتخاب کنید")
    .typeError("حداقل یک گزینه را انتخاب کنید")
    .when(["province", "county"], (province: any, county: any, schema: any) => {
      console.log("---proooviincee,,", province);
      console.log("---proooviincee,,", county);
      if (province && province.value === "0") {
        return schema.notRequired().nullable();
      } else if (county && county.value === "0") {
        return schema.notRequired().nullable();
      } else {
        schema
          .required("حداقل یک گزینه را انتخاب کنید")
          .typeError("حداقل یک گزینه را انتخاب کنید");
      }
    }),
});

const MergedSetTariffProvinceValidation = SetTariffValidation.concat(
  SetTariffProvinceValidation
);

const MergedSetTariffCountyValidation =
  MergedSetTariffProvinceValidation.concat(SetTariffCountyValidation);

const MergedSetTariffUnionValidation = MergedSetTariffCountyValidation.concat(
  SetTariffUnionValidation
);

export {
  SetTariffValidation,
  MergedSetTariffProvinceValidation,
  MergedSetTariffCountyValidation,
  MergedSetTariffUnionValidation,
};
