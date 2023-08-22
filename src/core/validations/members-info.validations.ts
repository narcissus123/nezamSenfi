import * as Yup from "yup";

// type selectList = {
//   label: any;
//   value: any;
// };

const MemebersInfoValidate = Yup.object().shape({
  roles: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.number(),
        label: Yup.string().nullable(),
      })
    )
    .test("roles", "یک گزینه انتخاب کنید", (obj: any) => {
      return obj ? (obj.length > 0 ? true : false) : false;
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
});

export { MemebersInfoValidate };
