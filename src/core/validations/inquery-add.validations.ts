import * as Yup from "yup";

const AddInqueryValidate = Yup.object().shape({
  inqueryTitle: Yup.string().required("لطفا موضوع استعلام را وارد کنید!"),
  defaultLetterTitle: Yup.string().required(
    "لطفا موضوع پیش فرض نامه را وارد کنید!"
  ),
  description: Yup.string(),
  organizationId: Yup.object()
    .test(
      "organizationId",
      "یک گزینه راانتخاب کنید",
      (obj: any) => obj.value > 0
    )
    .required()
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
});

export { AddInqueryValidate };
