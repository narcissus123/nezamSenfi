import * as Yup from "yup";
const MachineryInfoValidate = Yup.object().shape(
  {
    firstPlateNum: Yup.string()
      .matches(/^[0-9]{2}$/, "لطفا دو رقم اول پلاک را درست وارد کنید")
      .when(
        ["chassisNumber", "engineNumber", "serialNumberOrModel"],
        (
          chassisNumber: any,
          engineNumber: any,
          serialNumberOrModel: any,
          schema: any
        ) => {
          if (
            (chassisNumber && chassisNumber.length > 0) ||
            (engineNumber && engineNumber.length > 0) ||
            (serialNumberOrModel && serialNumberOrModel.length > 0)
          ) {
            return schema.nullable().notRequired();
          }
          return schema
            .required("لطفا دو رقم اول پلاک خود را وارد کنید")
            .typeError("لطقا دو رقم اول پلاک را درست وارد کنید");
        }
      ),
    secondPlateNum: Yup.string()
      .matches(
        /^([\u0600-\u06FF\uFB8A\u067E\u0686\u06AF]|0|الف){1}$/,
        "لطفا حرف وسط پلاک را درست وارد کنید"
      )
      .when(
        ["chassisNumber", "engineNumber", "serialNumberOrModel"],
        (
          chassisNumber: any,
          engineNumber: any,
          serialNumberOrModel: any,
          schema: any
        ) => {
          if (
            (chassisNumber && chassisNumber.length > 0) ||
            (engineNumber && engineNumber.length > 0) ||
            (serialNumberOrModel && serialNumberOrModel.length > 0)
          ) {
            return schema.nullable().notRequired();
          }
          return schema
            .required("لطفا حرف وسط پلاک خود را وارد کنید")
            .typeError("لطقا حرف وسط پلاک را درست وارد کنید");
        }
      ),
    thirdPlateNum: Yup.string()
      .matches(/^[0-9]{5}$/, "لطفا پنج رقم وارد کنید")
      .when(
        ["chassisNumber", "engineNumber", "serialNumberOrModel"],
        (
          chassisNumber: any,
          engineNumber: any,
          serialNumberOrModel: any,
          schema: any
        ) => {
          if (
            (chassisNumber && chassisNumber.length > 0) ||
            (engineNumber && engineNumber.length > 0) ||
            (serialNumberOrModel && serialNumberOrModel.length > 0)
          ) {
            return schema.nullable().notRequired();
          }
          return schema
            .required("لطفا پنج رقم اخر پلاک وارد کنید")
            .typeError("لطقا پنج رقم اخر پلاک را درست وارد کنید");
        }
      ),
    // plateNumber: Yup.string()
    //   .matches(
    //     /^[0-9]{2}([\u0600-\u06FF\uFB8A\u067E\u0686\u06AF]|0|الف){1}[0-9]{5}$/,
    //     "لطفا پلاک را درست وارد کنید"
    //   )
    //   .required("لطفا شماره پلاک خود را وارد کنید")
    //   .typeError("لطقا شماره پلاک را درست وارد کنید"),
    engineNumber: Yup.string().when(
      ["thirdPlateNum", "secondPlateNum", "firstPlateNum"],
      (
        thirdPlateNum: any,
        secondPlateNum: any,
        firstPlateNum: any,
        schema: any
      ) => {
        if (
          (thirdPlateNum && thirdPlateNum.length > 0) ||
          (secondPlateNum && secondPlateNum.length > 0) ||
          (firstPlateNum && firstPlateNum.length > 0)
        ) {
          return schema.nullable().notRequired();
        }
        return schema
          .required("لطفا شماره موتور خود را وارد کنید")
          .typeError("لطقا شماره موتور را درست وارد کنید");
      }
    ),
    chassisNumber: Yup.string().when(
      ["thirdPlateNum", "secondPlateNum", "firstPlateNum"],
      (
        thirdPlateNum: any,
        secondPlateNum: any,
        firstPlateNum: any,
        schema: any
      ) => {
        if (
          (thirdPlateNum && thirdPlateNum.length > 0) ||
          (secondPlateNum && secondPlateNum.length > 0) ||
          (firstPlateNum && firstPlateNum.length > 0)
        ) {
          return schema.nullable().notRequired();
        }
        return schema
          .required("لطفا شماره شاسی خود را وارد کنید")
          .typeError("لطقا شماره شاسی را درست وارد کنید");
      }
    ),
    serialNumberOrModel: Yup.string().when(
      ["thirdPlateNum", "secondPlateNum", "firstPlateNum"],
      (
        thirdPlateNum: any,
        secondPlateNum: any,
        firstPlateNum: any,
        schema: any
      ) => {
        if (
          (thirdPlateNum && thirdPlateNum.length > 0) ||
          (secondPlateNum && secondPlateNum.length > 0) ||
          (firstPlateNum && firstPlateNum.length > 0)
        ) {
          return schema.nullable().notRequired();
        }
        return schema
          .required("لطفا شماره سریال/مدل خود را وارد کنید")
          .typeError("لطقا شماره سریال/مدل را درست وارد کنید");
      }
    ),
    locationOfServices: Yup.array()
      .of(
        Yup.object().shape({
          value: Yup.number(),
          label: Yup.string().nullable(),
        })
      )
      .when(["typeOfMachineUse"], (typeOfMachineUse: any, schema: any) => {
        if (typeOfMachineUse && typeOfMachineUse.value === 2) {
          return schema
            .required("لطفا یک گزینه را انتخاب کنید")
            .typeError("لطفا یک گزینه را انتخاب کنید");
        }
        return schema.nullable().notRequired();
      }),

    typeOfOwnership: Yup.object()
      .test(
        "typeOfOwnership",
        "لطفا نوع مالکیت را انتخاب کنید",
        (obj: any) => obj.value > 0
      )
      .required("لطفا نوع مالکیت را وارد کنید")
      .typeError("لطقا نوع مالکیت را درست وارد کنید"),
    machineryId: Yup.object()
      .test(
        "machineryId",
        "لطفا نام ماشین را انتخاب کنید",
        (obj: any) => obj.value > 0
      )
      .required("لطفا نام ماشین را وارد کنید")
      .typeError("لطقا نام ماشین را درست وارد کنید"),
    typeOfMachineUse: Yup.object()
      .test(
        "typeOfMachineUse",
        " لطفا نوع استفاده از ماشین را انتخاب کنید",
        (obj: any) => obj.value > 0
      )
      .required("لطفا نوع استفاده از ماشین را وارد کنید")
      .typeError("لطقا نوع استفاده از ماشین را درست وارد کنید"),
    thirdPartyInsuranceValidityDate: Yup.mixed().when(
      "thirdPartyInsuranceStatus",
      {
        is: true,
        then: Yup.string()
          .required("لطفا تاریخ اعتبار بیمه را وارد کنید")
          .typeError("لطقا تاریخ اعتبار بیمه را درست وارد کنید"),
      }
    ),
    thirdPartyInsuranceId: Yup.mixed().when("thirdPartyInsuranceStatus", {
      is: true,
      then: Yup.object()
        .test(
          "thirdPartyInsuranceId",
          "لطفا یک گزینه انتخاب کنید",
          (obj: any) => obj.value > 0
        )
        .required("لطفا یک گزینه را انتخاب کنید")
        .typeError("لطقا یک گزینه را انتخاب کنید"),
    }),
    hallInsuranceValidityDate: Yup.mixed().when("hallInsuranceStatus", {
      is: true,
      then: Yup.string()
        .required("لطفا تاریخ اعتبار بیمه را وارد کنید")
        .typeError("لطفا تاریخ اعتبار بیمه را درست وارد کنید"),
      otherwise: Yup.string().notRequired(),
    }),
    hallInsuranceId: Yup.mixed().when("hallInsuranceStatus", {
      is: true,
      then: Yup.object()
        .test(
          "thirdPartyInsuranceId",
          "لطفا یک گزینه انتخاب کنید",
          (obj: any) => obj.value > 0
        )
        .required("لطفا یک گزینه انتخاب کنید")
        .typeError("لطفا یک گزینه انتخاب کنید"),
      otherwise: Yup.string().notRequired(),
    }),
  },
  [
    ["thirdPlateNum", "chassisNumber"],
    ["thirdPlateNum", "engineNumber"],
    ["thirdPlateNum", "serialNumberOrModel"],

    ["secondPlateNum", "chassisNumber"],
    ["secondPlateNum", "engineNumber"],
    ["secondPlateNum", "serialNumberOrModel"],

    ["firstPlateNum", "chassisNumber"],
    ["firstPlateNum", "engineNumber"],
    ["firstPlateNum", "serialNumberOrModel"],
  ]
);

export { MachineryInfoValidate };
