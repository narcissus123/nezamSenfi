import * as Yup from "yup";

const AddCostManagementValidate = Yup.object().shape({
  from1: Yup.number()
    .required("این فیلد باید پر شود!")
    .typeError("لطفا عدد وارد کنید!"),
  from2: Yup.number().when("oprator", (oprator: any, schema: any) => {
    if (oprator && oprator.value === 4) {
      return schema
        .required("این فیلد باید  پر شود!")
        .typeError("لطفا عدد وارد کنید!");
    }
    return schema.nullable().notRequired();
  }),
  oprator: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  type: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
});

const SearchCostManagementValidate = Yup.object().shape({
  from1: Yup.number().notRequired().typeError("لطفا عدد وارد کنید!"),
  from2: Yup.number().notRequired().typeError("لطفا عدد وارد کنید!"),
});

export { AddCostManagementValidate, SearchCostManagementValidate };
