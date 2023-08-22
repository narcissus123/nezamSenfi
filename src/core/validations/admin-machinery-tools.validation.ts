import * as Yup from 'yup';

const addMachineTypeValidate = Yup.object().shape({
    title : Yup.string()
    .required("لطفا نوع ماشین را وارد کنید")
});

const addInsuranceValidate = Yup.object().shape({
    title : Yup.string()
    .required("لطفا نام بیمه را وارد کنید")
});

const addMachineManufactorerValidate = Yup.object().shape({
    title : Yup.string()
    .required("لطفا نام شرکت سازنده را وارد کنید")
});


export {
    addMachineTypeValidate,
    addInsuranceValidate,
    addMachineManufactorerValidate
}