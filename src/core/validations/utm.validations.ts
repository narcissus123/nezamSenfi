import * as Yup from "yup";
import { CountyPolygonValidate } from "./lat-lng.validations";

const UtmValidate = Yup.object().shape({
  easting: Yup.string()
    .required("این فیلد باید پر شود!")
    .typeError("لطفا فقط عدد وارد کنید!"),
  northing: Yup.string()
    .required("این فیلد باید پر شود!")
    .typeError("لطفا فقط عدد وارد کنید!"),
  zone: Yup.string()
    .required("این فیلد باید پر شود!")
    .typeError("لطفا فقط عدد وارد کنید!"),
});

const UtmCountyPolygonValidate = CountyPolygonValidate.concat(UtmValidate);

export { UtmValidate, UtmCountyPolygonValidate };
