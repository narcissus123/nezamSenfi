import * as Yup from "yup";

const JobCategoryTarrifValidate = Yup.object().shape({
  priceOne1: Yup.number()
    .required("این فیلد باید پر شود!")
    .typeError("لطفا فقط عدد وارد کنید!")
    .min(0, "حداقل مقدار ورودی می تواند 0 باشد!"),
  priceOne2: Yup.number()
    .required("این فیلد باید پر شود!")
    .typeError("لطفا فقط عدد وارد کنید!")
    .min(0, "حداقل مقدار ورودی می تواند 0 باشد!"),
  priceOne3: Yup.number()
    .required("این فیلد باید پر شود!")
    .typeError("لطفا فقط عدد وارد کنید!")
    .min(0, "حداقل مقدار ورودی می تواند 0 باشد!"),
  priceOne4: Yup.number()
    .required("این فیلد باید پر شود!")
    .typeError("لطفا فقط عدد وارد کنید!")
    .min(0, "حداقل مقدار ورودی می تواند 0 باشد!"),
  priceOne5: Yup.number()
    .required("این فیلد باید پر شود!")
    .typeError("لطفا فقط عدد وارد کنید!")
    .min(0, "حداقل مقدار ورودی می تواند 0 باشد!"),
  priceOne6: Yup.number()
    .required("این فیلد باید پر شود!")
    .typeError("لطفا فقط عدد وارد کنید!")
    .min(0, "حداقل مقدار ورودی می تواند 0 باشد!"),
  priceOne7: Yup.number()
    .required("این فیلد باید پر شود!")
    .typeError("لطفا فقط عدد وارد کنید!")
    .min(0, "حداقل مقدار ورودی می تواند 0 باشد!"),
  priceTwo8: Yup.number()
    .required("این فیلد باید پر شود!")
    .typeError("لطفا فقط عدد وارد کنید!")
    .min(0, "حداقل مقدار ورودی می تواند 0 باشد!"),
  priceOne8: Yup.number()
    .required("این فیلد باید پر شود!")
    .typeError("لطفا فقط عدد وارد کنید!")
    .min(0, "حداقل مقدار ورودی می تواند 0 باشد!"),
});



export { JobCategoryTarrifValidate };
