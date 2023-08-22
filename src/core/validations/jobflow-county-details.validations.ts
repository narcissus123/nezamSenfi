import * as Yup from "yup";

const JobFlowCountyDetailsValidate = Yup.object().shape({
  province: Yup.object()
    .required()
    .test("province", "لطفا استان مورد نظر را انتخاب کنید", (obj: any) =>
      obj ? obj.value > 0 : false
    )
    .typeError("لطفا استان مورد نظر را انتخاب کنید"),

  rankStatus: Yup.object()
    .required()
    .test(
      "rankStatus",
      "لطفا وضعیت رتبه را انتخاب کنید",
      (obj: any) => obj.value > 0
    )
    .typeError("لطفا وضعیت رتبه را انتخاب کنید"),
  employmentLicense: Yup.string().required(
    "لطفا موضوع رتبه یا پروانه اشتغال را وارد کنید"
  ),
  employmentLicenseStatus: Yup.object()
    .required()
    .test(
      "employmentLicenseStatus",
      "لطفا وضعیت پروانه اشتغال را انتخاب کنید",
      (obj: any) => obj.value > 0
    )
    .typeError("لطفا وضعیت پروانه اشتغال را انتخاب کنید"),
  //activityLicenseStatus: "",
  //examCertificateStatus: "",
  yearOfServices: Yup.object()
    .required()
    .test(
      "yearOfServices",
      "لطفا سابقه خدمت پس از تحصیل را انتخاب کنید",
      (obj: any) => obj.value > 0
    )
    .typeError("لطفا سابقه خدمت پس از تحصیل را انتخاب کنید"),
});

const EditJobFlowCountyDetailsValidate = Yup.object().shape({
  rankStatus: Yup.object()
    .required()
    .test(
      "rankStatus",
      "لطفا وضعیت رتبه را انتخاب کنید",
      (obj: any) => obj.value > 0
    )
    .typeError("لطفا وضعیت رتبه را انتخاب کنید"),
  employmentLicense: Yup.string().required(
    "لطفا موضوع رتبه یا پروانه اشتغال را وارد کنید"
  ),
  employmentLicenseStatus: Yup.object()
    .required()
    .test(
      "employmentLicenseStatus",
      "لطفا وضعیت پروانه اشتغال را انتخاب کنید",
      (obj: any) => obj.value > 0
    )
    .typeError("لطفا وضعیت پروانه اشتغال را انتخاب کنید"),
  //activityLicenseStatus: "",
  //examCertificateStatus: "",
  yearOfServices: Yup.object()
    .required()
    .test(
      "yearOfServices",
      "لطفا سابقه خدمت پس از تحصیل را انتخاب کنید",
      (obj: any) => obj.value > 0
    )
    .typeError("لطفا سابقه خدمت پس از تحصیل را انتخاب کنید"),
});

export { JobFlowCountyDetailsValidate, EditJobFlowCountyDetailsValidate };
