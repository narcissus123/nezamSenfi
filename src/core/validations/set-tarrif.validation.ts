import * as Yup from "yup";

const SetTarrifValidate = Yup.object().shape({
  title: Yup.string()
    .required("این فیلد باید پر شود!")
    .typeError("این فیلد باید پر شود"),
  startDate: Yup.string()
    .required("این فیلد باید پر شود!")
    .typeError("این فیلد باید پر شود"),
  DataEntryStartDate: Yup.string()
    .required("این فیلد باید پر شود!")
    .typeError("این فیلد باید پر شود"),
  letterNumber: Yup.string()
    .required("این فیلد باید پر شود!")
    .typeError("این فیلد باید پر شود"),
  letterDate: Yup.string()
    .required("این فیلد باید پر شود!")
    .typeError("این فیلد باید پر شود"),
  description: Yup.string()
    .required("این فیلد باید پر شود!")
    .typeError("این فیلد باید پر شود"),
});



export { SetTarrifValidate };
