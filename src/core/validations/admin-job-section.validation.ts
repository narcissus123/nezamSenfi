import * as Yup from "yup";

const AdminJobSectionValidate = Yup.object().shape({
  title: Yup.string().required("لطفا عنوان شغل را وارد کنید"),
  code: Yup.number()
    .min(1, "عدد وارد شده باید از 1 تا 99 باشد!")
    .max(99, "عدد وارد شده باید از 1 تا 99 باشد!")
    .required("لطفا کد شغل را وارد کنید"),
});

export { AdminJobSectionValidate };
