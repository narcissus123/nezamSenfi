import * as Yup from "yup";

const MaxPayableValueValidate = Yup.object().shape({
  payableValueTypeEnum: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  value: Yup.number()
    .required("این فیلد باید پر شود!")
    .typeError("لطفا عدد وارد کنید!")
    .min(0, "حداقل مقدار ورودی می تواند 0 باشد!")
    .when("payableValueTypeEnum", (payableValueTypeEnum: any, schema: any) => {
      if (payableValueTypeEnum && payableValueTypeEnum.valueType === 1) {
        return schema;
      }
      return schema
        .min(0, "یک عدد بین 0 تا 100 وارد کنید!")
        .max(100, "یک عدد بین 0 تا 100 وارد کنید!");
    }),
});


export { MaxPayableValueValidate };
