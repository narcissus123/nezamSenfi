import * as Yup from "yup";

const LatLngValidate = Yup.object().shape({
  lat: Yup.number()
    .min(-80, "عرض جغرافیایی باید بین -80 و 80 باشد")
    .max(80, "عرض جغرافیایی باید بین -80 و 80 باشد")
    .required("این فیلد باید پر شود!")
    .typeError("لطفا فقط عدد وارد کنید!"),
  lng: Yup.number()
    .min(-120, "طول جغرافیایی باید بین -120 و 120 باشد")
    .max(120, "طول جغرافیایی باید بین -120 و 120 باشد")
    .required("این فیلد باید پر شود!")
    .typeError("لطفا فقط عدد وارد کنید!"),
});

const CountyPolygonValidate: any = Yup.object().shape({
  county: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  province: Yup.object()
    .shape({
      value: Yup.string(),
      label: Yup.string().nullable(),
    })
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
});

const LatLngCountyPolygonValidate =
  CountyPolygonValidate.concat(LatLngValidate);

export { LatLngValidate, LatLngCountyPolygonValidate, CountyPolygonValidate };
