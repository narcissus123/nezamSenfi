import * as Yup from "yup";

const InspectionTypeValidate = Yup.object().shape({
  baseLandAmount: Yup.number()
    .required("این فیلد باید پر شود!")
    .typeError("این فیلد باید پر شود!")
    .min(0, "حداقل مقدار ورودی می تواند 0 باشد!"),
  startDateTimeAsShamsi: Yup.string()
    .required("این فیلد باید پر شود!")
    .typeError("این فیلد باید پر شود!"),
  extraLandTariffPercentage1: Yup.number()
    .required("این فیلد باید پر شود!")
    .typeError("این فیلد باید پر شود!")
    .min(0, "یک عدد بین 0 تا 100 وارد کنید!")
    .max(100, "یک عدد بین 0 تا 100 وارد کنید!"),
  baseLandTariffPercentage1: Yup.number()
    .required("این فیلد باید پر شود!")
    .typeError("این فیلد باید پر شود!")
    .min(0, "یک عدد بین 0 تا 100 وارد کنید!")
    .max(100, "یک عدد بین 0 تا 100 وارد کنید!"),
  extraLandTariffPercentage2: Yup.number()
    .required("این فیلد باید پر شود!")
    .typeError("این فیلد باید پر شود!")
    .min(0, "یک عدد بین 0 تا 100 وارد کنید!")
    .max(100, "یک عدد بین 0 تا 100 وارد کنید!"),
  baseLandTariffPercentage2: Yup.number()
    .required("این فیلد باید پر شود!")
    .typeError("این فیلد باید پر شود!")
    .min(0, "یک عدد بین 0 تا 100 وارد کنید!")
    .max(100, "یک عدد بین 0 تا 100 وارد کنید!"),
  extraLandTariffPercentage3: Yup.number()
    .required("این فیلد باید پر شود!")
    .typeError("این فیلد باید پر شود!")
    .min(0, "یک عدد بین 0 تا 100 وارد کنید!")
    .max(100, "یک عدد بین 0 تا 100 وارد کنید!"),
  baseLandTariffPercentage3: Yup.number()
    .required("این فیلد باید پر شود!")
    .typeError("این فیلد باید پر شود!")
    .min(0, "یک عدد بین 0 تا 100 وارد کنید!")
    .max(100, "یک عدد بین 0 تا 100 وارد کنید!"),
  extraLandTariffPercentage4: Yup.number()
    .required("این فیلد باید پر شود!")
    .typeError("این فیلد باید پر شود!")
    .min(0, "یک عدد بین 0 تا 100 وارد کنید!")
    .max(100, "یک عدد بین 0 تا 100 وارد کنید!"),
  baseLandTariffPercentage4: Yup.number()
    .required("این فیلد باید پر شود!")
    .typeError("این فیلد باید پر شود!")
    .min(0, "یک عدد بین 0 تا 100 وارد کنید!")
    .max(100, "یک عدد بین 0 تا 100 وارد کنید!"),
  extraLandTariffPercentage5: Yup.number()
    .required("این فیلد باید پر شود!")
    .typeError("این فیلد باید پر شود!")
    .min(0, "یک عدد بین 0 تا 100 وارد کنید!")
    .max(100, "یک عدد بین 0 تا 100 وارد کنید!"),
  baseLandTariffPercentage5: Yup.number()
    .required("این فیلد باید پر شود!")
    .typeError("این فیلد باید پر شود!")
    .min(0, "یک عدد بین 0 تا 100 وارد کنید!")
    .max(100, "یک عدد بین 0 تا 100 وارد کنید!"),
  extraLandTariffPercentage6: Yup.number()
    .required("این فیلد باید پر شود!")
    .typeError("این فیلد باید پر شود!")
    .min(0, "یک عدد بین 0 تا 100 وارد کنید!")
    .max(100, "یک عدد بین 0 تا 100 وارد کنید!"),
  baseLandTariffPercentage6: Yup.number()
    .required("این فیلد باید پر شود!")
    .typeError("این فیلد باید پر شود!")
    .min(0, "یک عدد بین 0 تا 100 وارد کنید!")
    .max(100, "یک عدد بین 0 تا 100 وارد کنید!"),
  extraLandTariffPercentage7: Yup.number()
    .required("این فیلد باید پر شود!")
    .typeError("این فیلد باید پر شود!")
    .min(0, "یک عدد بین 0 تا 100 وارد کنید!")
    .max(100, "یک عدد بین 0 تا 100 وارد کنید!"),
  baseLandTariffPercentage7: Yup.number()
    .required("این فیلد باید پر شود!")
    .typeError("این فیلد باید پر شود!")
    .min(0, "یک عدد بین 0 تا 100 وارد کنید!")
    .max(100, "یک عدد بین 0 تا 100 وارد کنید!"),
  extraLandTariffPercentage8: Yup.number()
    .required("این فیلد باید پر شود!")
    .typeError("این فیلد باید پر شود!")
    .min(0, "یک عدد بین 0 تا 100 وارد کنید!")
    .max(100, "یک عدد بین 0 تا 100 وارد کنید!"),
  baseLandTariffPercentage8: Yup.number()
    .required("این فیلد باید پر شود!")
    .typeError("این فیلد باید پر شود!")
    .min(0, "یک عدد بین 0 تا 100 وارد کنید!")
    .max(100, "یک عدد بین 0 تا 100 وارد کنید!"),
  extraLandTariffPercentage9: Yup.number()
    .required("این فیلد باید پر شود!")
    .typeError("این فیلد باید پر شود!")
    .min(0, "یک عدد بین 0 تا 100 وارد کنید!")
    .max(100, "یک عدد بین 0 تا 100 وارد کنید!"),
  baseLandTariffPercentage9: Yup.number()
    .required("این فیلد باید پر شود!")
    .typeError("این فیلد باید پر شود!")
    .min(0, "یک عدد بین 0 تا 100 وارد کنید!")
    .max(100, "یک عدد بین 0 تا 100 وارد کنید!"),
});



export { InspectionTypeValidate };
