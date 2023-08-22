import * as Yup from "yup";

const GuildsAddProvinceValidate = Yup.object().shape({
  provinceName: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
});

export { GuildsAddProvinceValidate };
