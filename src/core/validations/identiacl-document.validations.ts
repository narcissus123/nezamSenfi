import * as Yup from 'yup';

const IdentiaclDocumentValidate = Yup.object().shape({
    title: Yup.string().required('این فیلد باید پر شود!').typeError('لطفا عنوان را وارد نمایید!'),
    userType: Yup.number().required('این فیلد باید پر شود!').typeError('لطفا یکی از گزینه ها را انتخاب کنید!')
});

export {IdentiaclDocumentValidate}