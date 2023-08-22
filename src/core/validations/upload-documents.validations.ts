import * as Yup from "yup";

const UploadDocumentsValidate = Yup.object().shape({
  documentType: Yup.object().shape({
    value : Yup.string(),
    label : Yup.string()
  }).required('این فیلد باید پر شود!').typeError('لطفا یکی از گزینه ها را انتخاب کنید!'),
});


export { UploadDocumentsValidate }