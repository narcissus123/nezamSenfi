import * as Yup from "yup";

const BankInfoValidate = Yup.object().shape({
  bankShabaNumber: Yup.number()
    .required("لطفا شبا را وارد کنید!")
    .typeError("لطفا فقط عدد وارد کنید!"),
  bankAcountNumber: Yup.number()
    .required("لطفا شماره حساب را وارد کنید!")
    .typeError("لطفا فقط عدد وارد کنید!"),
  bankName: Yup.string()
    .required("لطفا نام بانک را وارد کنید!")
    .typeError("لطفا نام بانک وارد کنید!"),
  bankBranchName: Yup.string()
    .required("لطفا نام شعبه را وارد کنید!")
    .typeError("لطفا نام شعبه وارد کنید!"),
  bankBranchCode: Yup.string()
    .required("لطفا کد شعبه را وارد کنید!")
    .typeError("لطفا کد شعبه وارد کنید!"),
  bankAccountType: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
});

export { BankInfoValidate };
