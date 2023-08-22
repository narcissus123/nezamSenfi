import * as Yup from "yup";

const UnionSetAdminValidate = Yup.object().shape({
  county: Yup.object()
    .required()
    .test("county", "لطفا شهرستان مورد نظر را انتخاب کنید", (obj: any) =>
      obj ? obj.value > 0 : false
    )
    .typeError("لطفا شهرستان مورد نظر را انتخاب کنید"),
  union: Yup.object()
    .required()
    .test("union", "لطفا اتحادیه مورد نظر را انتخاب کنید", (obj: any) =>
      obj ? obj.value > 0 : false
    )
    .typeError("لطفا اتحادیه مورد نظر را انتخاب کنید"),
});

export { UnionSetAdminValidate };
