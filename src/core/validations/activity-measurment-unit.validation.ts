import * as Yup from 'yup';

const addActivityMeasurmentUnitValidation = Yup.object().shape({
  title : Yup.string()
  .required("لطفا نام واحد را وارد کنید"),
  code : Yup.string()
  .required("لطفا کلمه انحصاری را وارد کنید"),
  viewOrder : Yup.number()
  .required("لطفا کلمه انحصاری را وارد کنید")
  .typeError("لطفا عدد وارد کنید!"),
});

export {addActivityMeasurmentUnitValidation}