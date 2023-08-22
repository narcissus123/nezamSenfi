import * as Yup from "yup";

const AddJahadCenterValidate = Yup.object().shape(
  {
    county: Yup.object()
      .shape({
        value: Yup.number(),
        label: Yup.string().nullable(),
      })
      .required("این فیلد باید پر شود!")
      .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
    title: Yup.string().required("لطفا نام مرکز جهاد را وارد کنید!"),
    code: Yup.string().required("لطفا کد مرکز جهاد را وارد کنید!"),
    city: Yup.array()
      .of(
        Yup.object().shape({
          value: Yup.number(),
          label: Yup.string().nullable(),
        })
      )
      .when("village", (village: any, schema: any) => {
        if (!village) {
          return schema
            .required("یک گزینه را انتخاب کنید")
            .typeError("لطفا یکی از گزینه ها را انتخاب کنید!");
        }
        return schema.nullable().notRequired();
      }),
    village: Yup.array()
      .of(
        Yup.object().shape({
          value: Yup.number(),
          label: Yup.string().nullable(),
        })
      )
      .when("city", (city: any, schema: any) => {
        if (!city) {
          return schema
            .required("یک گزینه را انتخاب کنید")
            .typeError("لطفا یکی از گزینه ها را انتخاب کنید!");
        }
        return schema.nullable().notRequired();
      }),
  },
  [["city", "village"]]
);

export { AddJahadCenterValidate };
