import * as Yup from 'yup';

const addServicesValidations = Yup.object().shape({
    title : Yup.string()
    .required("لطفا نام خدمت را وارد کنید"),
    agriculturalToolsTypeId:Yup.object()
    .test("agriculturalToolsTypeId", " لطفا نوع خدمت را انتخاب کنید", (obj: any) => obj.value > 0 && obj.value ),
});

const addServicesTypedValidations = Yup.object().shape({
    title : Yup.string()
    .required("لطفا نوع خدمت را وارد کنید"),
});


export { 
    addServicesValidations,
    addServicesTypedValidations
 }