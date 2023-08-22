import * as Yup from "yup";

const FacilityAndOperationLicenseValidate = Yup.object().shape({
  FacilityAndOperationDocumentIds: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.number(),
        label: Yup.string().nullable(),
      })
    )
    .required("لطفا یکی را حداقل انتخاب کنید")
    .typeError("لفطا یکی از گزینه ها را انتخاب کنید!"),
  FacilityAndOperationLicenseNumber: Yup.string().required(
    "لطفا نوع ماشین را وارد کنید"
  ),
  FacilityAndOperationLicenseIssuingDate: Yup.string().required(
    " تاریخ نباید خالی باشد"
  ),
  FacilityAndOperationLicenseStatus: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
});

export { FacilityAndOperationLicenseValidate };
