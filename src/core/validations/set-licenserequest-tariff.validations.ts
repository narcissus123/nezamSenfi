import * as Yup from "yup";
import { RemoveCurrencyMask } from "../utils";

const SetLicenseRequestTariffValidate: any = Yup.object().shape({
  a: Yup.string()
    .test("a", "مبلغ نمی تواند کمتر از صفر باشد", (value: any) => {
      if (+RemoveCurrencyMask(value) < 0) {
        return false;
      }
      return true;
    })
    .required("این فیلد باید پر شود")
    .typeError("لطفا فقط عدد وارد کنید!"),
  b: Yup.string()
    .test("b", "مبلغ نمی تواند کمتر از صفر باشد", (value: any) => {
      if (+RemoveCurrencyMask(value) < 0) {
        return false;
      }
      return true;
    })
    .required("این فیلد باید پر شود")
    .typeError("لطفا فقط عدد وارد کنید!"),
  c: Yup.string()
    .test("c", "مبلغ نمی تواند کمتر از صفر باشد", (value: any) => {
      if (+RemoveCurrencyMask(value) < 0) {
        return false;
      }
      return true;
    })
    .required("این فیلد باید پر شود")
    .typeError("لطفا فقط عدد وارد کنید!"),
  d: Yup.string()
    .test("d", "مبلغ نمی تواند کمتر از صفر باشد", (value: any) => {
      if (+RemoveCurrencyMask(value) < 0) {
        return false;
      }
      return true;
    })
    .required("این فیلد باید پر شود")
    .typeError("لطفا فقط عدد وارد کنید!"),
  e: Yup.string()
    .test("e", "مبلغ نمی تواند کمتر از صفر باشد", (value: any) => {
      if (+RemoveCurrencyMask(value) < 0) {
        return false;
      }
      return true;
    })
    .required("این فیلد باید پر شود")
    .typeError("لطفا فقط عدد وارد کنید!"),
  f: Yup.string()
    .test("f", "مبلغ نمی تواند کمتر از صفر باشد", (value: any) => {
      if (+RemoveCurrencyMask(value) < 0) {
        return false;
      }
      return true;
    })
    .required("این فیلد باید پر شود")
    .typeError("لطفا فقط عدد وارد کنید!"),
  industrialBuildingsAndFacilitiesRate: Yup.string()
    .test(
      "industrialBuildingsAndFacilitiesRate",
      "مبلغ نمی تواند کمتر از صفر باشد",
      (value: any) => {
        if (+RemoveCurrencyMask(value) < 0) {
          return false;
        }
        return true;
      }
    )
    .required("این فیلد باید پر شود")
    .typeError("لطفا فقط عدد وارد کنید!"),
  traditionalBuildingsAndFacilitiesRate: Yup.string()
    .test(
      "traditionalBuildingsAndFacilitiesRate",
      "مبلغ نمی تواند کمتر از صفر باشد",
      (value: any) => {
        if (+RemoveCurrencyMask(value) < 0) {
          return false;
        }
        return true;
      }
    )
    .required("این فیلد باید پر شود")
    .typeError("لطفا فقط عدد وارد کنید!"),
  traditionalGreenHouseRate: Yup.string()
    .test(
      "traditionalGreenHouseRate",
      "مبلغ نمی تواند کمتر از صفر باشد",
      (value: any) => {
        if (+RemoveCurrencyMask(value) < 0) {
          return false;
        }
        return true;
      }
    )
    .required("این فیلد باید پر شود")
    .typeError("لطفا فقط عدد وارد کنید!"),
  industrialGreenHouseRate: Yup.string()
    .test(
      "industrialGreenHouseRate",
      "مبلغ نمی تواند کمتر از صفر باشد",
      (value: any) => {
        if (+RemoveCurrencyMask(value) < 0) {
          return false;
        }
        return true;
      }
    )
    .required("این فیلد باید پر شود")
    .typeError("لطفا فقط عدد وارد کنید!"),
  machinerayNumberRate: Yup.string()
    .test(
      "machinerayNumberRate",
      "مبلغ نمی تواند کمتر از صفر باشد",
      (value: any) => {
        if (+RemoveCurrencyMask(value) < 0) {
          return false;
        }
        return true;
      }
    )
    .required("این فیلد باید پر شود")
    .typeError("لطفا فقط عدد وارد کنید!"),
});


export { SetLicenseRequestTariffValidate };
