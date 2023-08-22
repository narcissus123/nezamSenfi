import * as Yup from "yup";
import {
  textRequired,
} from "./../utils/validation-error.utils";

const NewTreeValidation = Yup.object().shape({
  title: Yup.string().required(textRequired("عنوان درخت")),
  baseTreeCategoryId: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
});

export { NewTreeValidation };
