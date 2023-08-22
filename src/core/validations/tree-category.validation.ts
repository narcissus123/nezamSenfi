import * as Yup from "yup";
import {
  textRequired,
} from "./../utils/validation-error.utils";

const TreeCategoryValidation = Yup.object().shape({
  title: Yup.string().required(textRequired("عنوان دسته بندی")),
});

export { TreeCategoryValidation };
