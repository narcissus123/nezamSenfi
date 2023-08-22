import { isNumberPointRegex, isNumberRegex } from "./../utils/regex.utils";
import * as Yup from "yup";

export const BoundariesValidation = Yup.object().shape({
  boundaryTypeId: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("یک گزینه را انتخاب کنید")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  geographicalDirection: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("یک گزینه را انتخاب کنید")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  ownerName: Yup.string().when(
    ["boundaryTypeId"],
    (boundaryTypeId: any, schema: any) => {
      if (boundaryTypeId && boundaryTypeId.type === 2) {
        return schema
          .required("لطفا یک گزینه را انتخاب کنید")
          .typeError("لطفا یک گزینه را انتخاب کنید");
      }
      return schema.nullable().notRequired();
    }
  ),
  distance: Yup.string()
    .matches(isNumberPointRegex(), "لطفا عدد وارد کنید")
    .required("لطفا فاصله را وارد کنید")
    .typeError("فاصله به درستی وارد نشده است"),
  y: Yup.string()
    .matches(isNumberPointRegex(), "لطفا عدد (یا با +،- در اول) وارد کنید")
    .required("لطفا فاصله را وارد کنید")
    .typeError("فاصله به درستی وارد نشده است"),
  x: Yup.string()
    .matches(isNumberPointRegex(), "لطفا عدد (یا با +،- در اول) وارد کنید")
    .required("لطفا فاصله را وارد کنید")
    .typeError("فاصله به درستی وارد نشده است"),
});
