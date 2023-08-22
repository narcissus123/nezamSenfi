import * as Yup from 'yup';

const adminMachineValidation = Yup.object().shape({
  title : Yup.string()
  .required("لطفا نام ماشین را وارد کنید"),
  productionType:Yup.object()
  .test("productionType", " لطفا نوع ماشین را انتخاب کنید", (obj: any) => obj.value > 0 && obj.value ),
});

export {adminMachineValidation}