import * as Yup from "yup";

const PayableValueValidate = Yup.object().shape({
  inspectorFeeOfRejectedInspection: Yup.number()
    .required("این فیلد باید پر شود!")
    .typeError("لطفا فقط عدد وارد کنید!")
    .min(0, "یک عدد بین 0 تا 100 وارد کنید!")
    .max(100, "یک عدد بین 0 تا 100 وارد کنید!")
    .test("inspectorFeeOfRejectedInspection", "", function (item) {
      if (
        item &&
        this.parent.inspectorFeeOfRejectedInspectionMaxValue &&
        +item > +this.parent.inspectorFeeOfRejectedInspectionMaxValue
      ) {
        return this.createError({
          message: ` درصد سهم کارشناس از کارشناسی های رد شده بعد از بازدید باید کمتر یا مساوی ${this.parent.inspectorFeeOfRejectedInspectionMaxValue} باشد!`,
        });
      }
      return true;
    }),
  supportFee: Yup.number()
    .required("این فیلد باید پر شود!")
    .typeError("لطفا فقط عدد وارد کنید!")
    .min(0, "حداقل مقدار ورودی می تواند 0 باشد!")
    .test("supportFee", "", function (item) {
      if (
        item &&
        this.parent.supportFeeMaxValue &&
        +item > +this.parent.supportFeeMaxValue
      ) {
        return this.createError({
          message: ` مبلغ سهم پشتیبان باید کمتر یا مساوی ${this.parent.supportFeeMaxValue} باشد!`,
        });
      }
      return true;
    }),
  unionFee: Yup.number()
    .required("این فیلد باید پر شود!")
    .typeError("لطفا فقط عدد وارد کنید!")
    .min(0, "یک عدد بین 0 تا 100 وارد کنید!")
    .max(100, "یک عدد بین 0 تا 100 وارد کنید!")
    .test("unionFee", "", function (item) {
      if (
        item &&
        this.parent.unionFeeMaxValue &&
        +item > +this.parent.unionFeeMaxValue
      ) {
        return this.createError({
          message: `  درصد سهم اتحادیه باید کمتر یا مساوی ${this.parent.unionFeeMaxValue} باشد!`,
        });
      }
      return true;
    }),
  interimInterest: Yup.number()
    .required("این فیلد باید پر شود!")
    .typeError("لطفا فقط عدد وارد کنید!")
    .min(0, "یک عدد بین 0 تا 100 وارد کنید!")
    .max(100, "یک عدد بین 0 تا 100 وارد کنید!")
    .test("interimInterest", "", function (item) {
      if (
        item &&
        this.parent.interimInterestMaxValue &&
        +item > +this.parent.interimInterestMaxValue
      ) {
        return this.createError({
          message: `  درصد علی الحساب باید کمتر یا مساوی ${this.parent.interimInterestMaxValue} باشد!`,
        });
      }
      return true;
    }),
  countyFee: Yup.number()
    .required("این فیلد باید پر شود!")
    .typeError("لطفا فقط عدد وارد کنید!")
    .min(0, "یک عدد بین 0 تا 100 وارد کنید!")
    .max(100, "یک عدد بین 0 تا 100 وارد کنید!")
    .test(
      "countyFee",
      "مجموع درصد سهم کشور، استان و شهرستان باید برابر با 100 باشد!",
      function (item) {
        if (item && this.parent.provinceFee && this.parent.mainLocationFee) {
          return (
            +item + +this.parent.provinceFee + +this.parent.mainLocationFee ===
            100
          );
        }
        return true;
      }
    )
    .test("countyFee", "", function (item) {
      if (
        item &&
        this.parent.countyFeeMaxValue &&
        +item > +this.parent.countyFeeMaxValue
      ) {
        return this.createError({
          message: `درصد سهم شهرستان باید کمتر یا مساوی ${this.parent.countyFeeMaxValue} باشد!`,
        });
      }
      return true;
    }),
  provinceFee: Yup.number()
    .required("این فیلد باید پر شود!")
    .typeError("لطفا فقط عدد وارد کنید!")
    .min(0, "یک عدد بین 0 تا 100 وارد کنید!")
    .max(100, "یک عدد بین 0 تا 100 وارد کنید!")
    .test(
      "provinceFee",
      "مجموع درصد سهم کشور، استان و شهرستان باید برابر با 100 باشد!",
      function (item) {
        if (item && this.parent.countyFee && this.parent.mainLocationFee) {
          return (
            +item + +this.parent.countyFee + +this.parent.mainLocationFee ===
            100
          );
        }
        return true;
      }
    )
    .test("provinceFee", "", function (item) {
      if (
        item &&
        this.parent.provinceFeeMaxValue &&
        +item > +this.parent.provinceFeeMaxValue
      ) {
        return this.createError({
          message: `درصد سهم استان باید کمتر یا مساوی ${this.parent.provinceFeeMaxValue} باشد!`,
        });
      }
      return true;
    }),
  mainLocationFee: Yup.number()
    .required("این فیلد باید پر شود!")
    .typeError("لطفا فقط عدد وارد کنید!")
    .min(0, "یک عدد بین 0 تا 100 وارد کنید!")
    .max(100, "یک عدد بین 0 تا 100 وارد کنید!")
    .test(
      "mainLocationFee",
      "مجموع درصد سهم کشور، استان و شهرستان باید برابر با 100 باشد!",
      function (item) {
        if (item && this.parent.countyFee && this.parent.provinceFee) {
          return (
            +item + +this.parent.countyFee + +this.parent.provinceFee === 100
          );
        }
        return true;
      }
    )
    .test("mainLocationFee", "", function (item) {
      if (
        item &&
        this.parent.mainLocationFeeMaxValue &&
        +item > +this.parent.mainLocationFeeMaxValue
      ) {
        return this.createError({
          message: `درصد سهم کشور باید کمتر یا مساوی ${this.parent.mainLocationFeeMaxValue} باشد!`,
        });
      }
      return true;
    }),
  startDateTimeAsShamsi: Yup.string()
    .required("این فیلد باید پر شود!")
    .typeError("این فیلد باید پر شود!"),
});



export { PayableValueValidate };
