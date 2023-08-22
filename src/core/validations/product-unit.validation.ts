import * as Yup from 'yup';

const addProductionUnitValidation = Yup.object().shape({
  title : Yup.string()
  .required("لطفا نام واحد را وارد کنید"),
  abbreviation : Yup.string()
  .required("لطفا کلمه انحصاری را وارد کنید"),
});

export {addProductionUnitValidation}