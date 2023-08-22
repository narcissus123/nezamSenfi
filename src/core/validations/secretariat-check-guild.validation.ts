import * as Yup from "yup";

export const validationGuildConfirmModal = Yup.object().shape({
  description: Yup.string()
    .required("توضیحات نباید خالی باشد")
    .typeError("توضیحات نباید خالی باشد"),
});