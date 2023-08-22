import * as Yup from "yup";
import { textRequired, selectOptionRequired } from "./../utils";

const TreeSpecificationValidation = Yup.object().shape({
  treesType: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  seedlingBase: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  seedlingPreparationCenter: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  areaUnderCultivation: Yup.number()
    .required(textRequired("میزان فعالیت"))
    .nullable(),
  treeAge: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  treeLength: Yup.number().required(textRequired("طول")).nullable(),
  treeWidth: Yup.number().required(textRequired("عرض")).nullable(),
});

export { TreeSpecificationValidation };
