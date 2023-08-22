import * as Yup from "yup";
import { textRequired } from "../utils";

const AddWaterWellWalValidate = Yup.object().shape({
  name: Yup.string().required(textRequired("نام")),
  code: Yup.number().required(textRequired("کد")).typeError('لطفا عدد وارد کنید!'),
  order: Yup.number().required(textRequired("ترتیب نمایش")).typeError('لطفا عدد وارد کنید!'),
});

export { AddWaterWellWalValidate };
