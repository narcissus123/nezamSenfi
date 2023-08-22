import { isNumberRegex } from "./../utils/regex.utils";
import * as Yup from "yup";

const LegalJobInfoValidate = Yup.object().shape({
  workExperience: Yup.string()
    .matches(isNumberRegex(), "باید عدد وارد شود")
    .test(
      "",
      "عدد باید بین صفر و 200 باشد",
      (val: any) => (+val < 201 && +val >= 0) || !val
    )
    .notRequired()
    .typeError("لطفا فقط عدد وارد کنید!"),
});

export { LegalJobInfoValidate };
