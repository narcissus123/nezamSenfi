
import * as Yup from "yup";

const AddOrganizationValide = Yup.object().shape({
  title: Yup.string().required('لطفا نام سازمان را وارد کنید!'),
  description: Yup.string()
});

export { AddOrganizationValide };
