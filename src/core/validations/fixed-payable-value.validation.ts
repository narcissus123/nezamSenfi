import * as Yup from "yup";

const FixedPayableValueValidate = Yup.object().shape({
  payableTypes: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  province: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  county: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  union: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.number(),
        label: Yup.string().nullable(),
      })
    )
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  job: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.number(),
        label: Yup.string().nullable(),
      })
    )
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  value: Yup.number()
    .required("این فیلد باید پر شود!")
    .typeError("لطفا عدد وارد کنید!")
    .min(0, "حداقل مبلغ ورودی می تواند 0 باشد!")
    .test("value", "", function (item) {
      if (
        this.parent.payableTypes &&
        item &&
        +this.parent.payableTypes.maxValue < +item
      ) {
        return this.createError({
          message: `مقدار وارد شده باید کمتر یا مساوی ${this.parent.payableTypes.maxValue} باشد!`,
        });
      }
      return true;
    })
    .when("payableTypes", (payableTypes: any, schema: any) => {
      if (payableTypes && payableTypes.payableValueType === 1) {
        return schema;
      }
      return schema
        .min(0, "یک عدد بین 0 تا 100 وارد کنید!")
        .max(100, "یک عدد بین 0 تا 100 وارد کنید!");
    }),
  startDate: Yup.string()
    .required(" تاریخ شروع ردیف مالی نباید خالی باشد")
    .typeError("تاریخ شروع ردیف مالی را انتخاب کنید"),
});



export { FixedPayableValueValidate };
