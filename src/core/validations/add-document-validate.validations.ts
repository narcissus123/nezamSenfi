import * as Yup from 'yup';

const addDocumentValidate = Yup.object().shape({
  categoryId: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  title: Yup.string()
    .required("این فیلد باید پر شود!")
    .typeError("لطفا عنوان را وارد نمایید!"),
  jobCategoryEnums: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.number(),
        label: Yup.string().nullable(),
      })
    )
    .required("لطفا یکی را حداقل انتخاب کنید")
    .typeError("لفطا یکی از گزینه ها را انتخاب کنید!"),
});

export {addDocumentValidate}