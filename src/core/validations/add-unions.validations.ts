import * as Yup from "yup";

const AddUnionValidate = Yup.object().shape({
  unionName: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  unionCounty: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
});

const AddNewUnionType = Yup.object().shape({
  unionName: Yup.string()
    .required("این فیلد باید پر شود!")
    .typeError("لطفا نام اتحادیه را وارد کنید!"),
  unionTypes: Yup.array()
    .required("حداقل یک گزینه را انتخاب کنید")
    .typeError("حداقل یک گزینه را انتخاب کنید"),
});

export { AddUnionValidate, AddNewUnionType };
