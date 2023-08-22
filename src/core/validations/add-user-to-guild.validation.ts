import * as Yup from "yup";
import { UserRoleOfUnion } from "../enums";

const AddUserToGuild = Yup.object().shape({
  userSearch: Yup.string()
    .required("این فیلد باید پر شود!")
    .typeError("لطفا نام کاربر را وارد نمایید!"),
  roles: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.number(),
        label: Yup.string().nullable(),
      })
    )
    .required("لطفا یکی را حداقل انتخاب کنید")
    .typeError("لفطا یکی از گزینه ها را انتخاب کنید!"),
});

export { AddUserToGuild };
