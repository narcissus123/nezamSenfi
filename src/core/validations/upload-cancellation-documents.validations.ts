import * as Yup from "yup";

const UploadCancellationDocumentsValidate = Yup.object().shape({
  CancellationReasonLicenseRequestId: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
});


export { UploadCancellationDocumentsValidate }