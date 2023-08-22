import * as Yup from "yup";
import { textRequired } from '../utils/validation-error.utils';

const AddTypesOfStructureValide = Yup.object().shape({
  name: Yup.string().required(textRequired("نام")),
  code: Yup.number().required(textRequired("کد")).typeError('لطفا عدد وارد کنید!'),
  order: Yup.number().required(textRequired("ترتیب نمایش")).typeError('لطفا عدد وارد کنید!'),
});

export { AddTypesOfStructureValide };
