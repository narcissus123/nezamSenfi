import * as Yup from "yup";

const SetDefaultLetterValidate = Yup.object().shape({
  defaultLetterTitle: Yup.string()
    .required("عنوان پیشفرض نباید خالی باشد")
    .typeError("عنوان پیشفرض نباید خالی باشد"),
  defaultLetterContent: Yup.string()
    .required("محتوا پیشفرض نباید خالی باشد")
    .typeError("محتوا پیشفرض نباید خالی باشد"),
  inquiryId: Yup.object()
    .test("inquiryId", " استعلام مورد نظر را انتخاب کنید", (obj: any) =>
      obj ? (obj.value > 0 ? true : false) : false
    )
    .nullable(),
  province: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  county: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  city: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  provinceId: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  countyId: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  unionId: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
});

export { SetDefaultLetterValidate };
