import * as Yup from "yup";

const ExpertDescriptionValidation = Yup.object().shape({
  description: Yup.string()
    .required("لطفا توضیحات را وارد کنید")
    .typeError("لطفا توضیحات را درست وارد کنید"),
});

export { ExpertDescriptionValidation };
