import * as Yup from "yup";

const CountySetAdminValidate = Yup.object().shape({
  province: Yup.object()
    .required()
    .test("province", "لطفا استان مورد نظر را انتخاب کنید", (obj: any) =>
      obj ? obj.value > 0 : false
    )
    .typeError("لطفا استان مورد نظر را انتخاب کنید"),
  county: Yup.object()
    .required()
    .test("county", "لطفا شهرستان مورد نظر را انتخاب کنید", (obj: any) =>
      obj ? obj.value > 0 : false
    )
    .typeError("لطفا شهرستان مورد نظر را انتخاب کنید"),
});

export { CountySetAdminValidate };
