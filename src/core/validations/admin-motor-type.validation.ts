import * as Yup from "yup";
import { textRequired } from "../utils/validation-error.utils";

const AddMotorTypeValide = Yup.object().shape({
  name: Yup.string().required(textRequired("نام")),
  code: Yup.number()
    .required(textRequired("کد"))
    .typeError("لطفا عدد وارد کنید!"),
  order: Yup.number()
    .required(textRequired("ترتیب نمایش"))
    .typeError("لطفا عدد وارد کنید!"),
  description: Yup.string().required(textRequired("توضیحات")),
  engineTypePowerIds: Yup.array()
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

export { AddMotorTypeValide };
