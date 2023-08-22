import * as Yup from "yup";

const UnionsSubsetOfJobsValidate = Yup.object().shape({
  useType: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.number(),
        label: Yup.string().nullable(),
      })
    )
    .test("useType", "یک گزینه انتخاب کنید", (obj: any) => {
      return obj ? (obj.length > 0 ? true : false) : false;
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
});

export { UnionsSubsetOfJobsValidate };
