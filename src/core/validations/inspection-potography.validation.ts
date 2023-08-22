import * as Yup from "yup";
import { textRequired, selectOptionRequired } from "./../utils";

const inspectionPotoraphyValidation = Yup.object().shape({
  topographyStatus: Yup.object()
    .test(
      "topographyStatus",
      selectOptionRequired("وضعیت توپوگرافی"),
      (obj: any) => obj.value > 0 && obj.value
    )
    .typeError("لطفا یک گزینه انتخاب کنید"),
  slopePercentage: Yup.object()
    .test(
      "slopePercentage",
      selectOptionRequired("درصد شیب"),
      (obj: any) => obj.value > 0 && obj.value
    )
    .typeError("لطفا یک گزینه انتخاب کنید"),
  soilCondition: Yup.object()
    .test(
      "soilCondition",
      selectOptionRequired("وضعیت خاک"),
      (obj: any) => obj.value > 0 && obj.value
    )
    .typeError("لطفا یک گزینه انتخاب کنید"),
  waterSupplySource: Yup.object()
    .test(
      "waterSupplySource",
      selectOptionRequired("منبع تامین آب "),
      (obj: any) => obj.value > 0 && obj.value
    )
    .typeError("لطفا یک گزینه انتخاب کنید"),

  waterExploitationSystem: Yup.object()
    .test(
      "waterExploitationSystem",
      selectOptionRequired("سیستم بهره برداری از آب"),
      (obj: any) => obj.value > 0 && obj.value
    )
    .typeError("لطفا یک گزینه انتخاب کنید"),
  beforProductionSystem: Yup.object()
    .test(
      "beforProductionSystem",
      selectOptionRequired("سیستم بهره برداری قبل از تولید"),
      (obj: any) => obj.value > 0 && obj.value
    )
    .typeError("لطفا یک گزینه انتخاب کنید"),
  DuringProductionSystem: Yup.object()
    .test(
      "DuringProductionSystem",
      selectOptionRequired("سیستم بهره برداری حین از تولید"),
      (obj: any) => obj.value > 0 && obj.value
    )
    .typeError("لطفا یک گزینه انتخاب کنید"),
  endProductionSystem: Yup.object()
    .test(
      "endProductionSystem",
      selectOptionRequired("سیستم بهره برداری قبل از تولید"),
      (obj: any) => obj.value > 0 && obj.value
    )
    .typeError("لطفا یک گزینه انتخاب کنید"),

  licenseNumber: Yup.mixed().when("license", {
    is: true,
    then: Yup.string()
      .required(textRequired("شماره مجوز"))
      .nullable()
      .typeError("لطفا درست وارد کنید"),
    otherwise: Yup.string().notRequired(),
  }),
  licenseDate: Yup.mixed().when("license", {
    is: true,
    then: Yup.string().required(textRequired("تاریخ مجوز ")).nullable(),
    otherwise: Yup.string().notRequired(),
  }),

  PH: Yup.mixed().when("waterTest", {
    is: true,
    then: Yup.number()
      .min(0, "حداقل درصد قابل ثبت صفر می باشد")
      .max(100, "حداکثر درصد قابل ثبت صد می باشد")
      .required(textRequired("اسید PH "))
      .nullable()
      .typeError("لطفا این فیلد را درست وارد کنید..."),
  }),
  EC: Yup.mixed().when("waterTest", {
    is: true,
    then: Yup.number()
      .min(0, "حداقل درصد قابل ثبت صفر می باشد")
      .max(100, "حداکثر درصد قابل ثبت صد می باشد")
      .required(textRequired("هدایت EC"))
      .nullable()
      .typeError("لطفا این فیلد را درست وارد کنید..."),
  }),
  impurity: Yup.mixed().when("waterTest", {
    is: true,
    then: Yup.number()
      .min(0, "حداقل درصد قابل ثبت صفر می باشد")
      .max(100, "حداکثر درصد قابل ثبت صد می باشد")
      .required(textRequired("ناخالصی"))
      .nullable()
      .typeError("لطفا این فیلد را درست وارد کنید..."),
  }),
  waterQuality: Yup.mixed().when("waterTest", {
    is: false,
    then: Yup.object()
      .test(
        "waterQuality",
        selectOptionRequired("کیفیت آب با حس چشائی"),
        (obj: any) => obj.value > 0 && obj.value
      )
      .typeError("لطفا یک گزینه انتخاب کنید"),
  }),
});

const PotoraphySoilDecompositionValidation = Yup.object().shape({
  depthOfSampling: Yup.number()
    .required(textRequired("عمق نمونه گیری"))
    .nullable()
    .typeError("لطفا این فیلد را درست وارد کنید..."),
  percentOfSand: Yup.number()
    .min(0, "حداقل درصد قابل ثبت صفر می باشد")
    .max(100, "حداکثر درصد قابل ثبت صد می باشد")
    .required(textRequired("درصد شن "))
    .nullable()
    .typeError("لطفا این فیلد را درست وارد کنید..."),
  percentOfLay: Yup.number()
    .min(0, "حداقل درصد قابل ثبت صفر می باشد")
    .max(100, "حداکثر درصد قابل ثبت صد می باشد")
    .required(textRequired("درصد لای"))
    .nullable()
    .typeError("لطفا این فیلد را درست وارد کنید..."),
  percentOfClay: Yup.number()
    .min(0, "حداقل درصد قابل ثبت صفر می باشد")
    .max(100, "حداکثر درصد قابل ثبت صد می باشد")
    .required(textRequired("درصد رس"))
    .nullable()
    .typeError("لطفا این فیلد را درست وارد کنید..."),
  organicCarbon: Yup.number()
    .min(0, "حداقل درصد قابل ثبت صفر می باشد")
    .max(100, "حداکثر درصد قابل ثبت صد می باشد")
    .required(textRequired("کربن آلی"))
    .nullable()
    .typeError("لطفا این فیلد را درست وارد کنید..."),
  organicMatter: Yup.number()
    .min(0, "حداقل درصد قابل ثبت صفر می باشد")
    .max(100, "حداکثر درصد قابل ثبت صد می باشد")
    .required(textRequired("درصد ماده آلی"))
    .nullable()
    .typeError("لطفا این فیلد را درست وارد کنید..."),
  organicSaturation: Yup.number()
    .min(0, "حداقل درصد قابل ثبت صفر می باشد")
    .max(100, "حداکثر درصد قابل ثبت صد می باشد")
    .required(textRequired("درصد اشباع"))
    .nullable()
    .typeError("لطفا این فیلد را درست وارد کنید..."),
  aciditySaturation: Yup.number()
    .min(0, "حداقل درصد قابل ثبت صفر می باشد")
    .max(100, "حداکثر درصد قابل ثبت صد می باشد")
    .required(textRequired("اسیدیتیه گل اشباع"))
    .nullable()
    .typeError("لطفا این فیلد را درست وارد کنید..."),
  ECSoil: Yup.number()
    .min(0, "حداقل درصد قابل ثبت صفر می باشد")
    .max(100, "حداکثر درصد قابل ثبت صد می باشد")
    .required(textRequired("هدایت الکتریکی"))
    .nullable()
    .typeError("لطفا این فیلد را درست وارد کنید..."),
  PercentOfNeutralizingMatter: Yup.number()
    .min(0, "حداقل درصد قابل ثبت صفر می باشد")
    .max(100, "حداکثر درصد قابل ثبت صد می باشد")
    .required(textRequired("درصد مواد خنثی شونده"))
    .nullable()
    .typeError("لطفا این فیلد را درست وارد کنید..."),

  soilPattern: Yup.object()
    .test(
      "soilPattern",
      selectOptionRequired("بافت خاک"),
      (obj: any) => obj.value > 0 && obj.value
    )
    .typeError("لطفا یک گزینه انتخاب کنید"),
});

const PotoraphySoilNutrientsValidation = Yup.object().shape({
  depthOfSampling: Yup.number()
    .required(textRequired("عمق نمونه گیری"))
    .nullable()
    .typeError("لطفا این فیلد را درست وارد کنید..."),
  percentageOfNitrogen: Yup.number()
    .min(0, "حداقل درصد قابل ثبت صفر می باشد")
    .max(100, "حداکثر درصد قابل ثبت صد می باشد")
    .required(textRequired("درصد ازت کل"))
    .nullable()
    .typeError("لطفا این فیلد را درست وارد کنید..."),
  Phosphorus: Yup.number()
    .min(0, "حداقل درصد قابل ثبت صفر می باشد")
    .max(100, "حداکثر درصد قابل ثبت صد می باشد")
    .required(textRequired("فسفر قابل جذب"))
    .nullable()
    .typeError("لطفا این فیلد را درست وارد کنید"),
  potassium: Yup.number()
    .min(0, "حداقل درصد قابل ثبت صفر می باشد")
    .max(100, "حداکثر درصد قابل ثبت صد می باشد")
    .required(textRequired("پتاسیم قابل جذب"))
    .nullable()
    .typeError("لطفا این فیلد را درست وارد کنید"),
  Magnesium: Yup.number()
    .min(0, "حداقل درصد قابل ثبت صفر می باشد")
    .max(100, "حداکثر درصد قابل ثبت صد می باشد")
    .required(textRequired("منیزم"))
    .nullable()
    .typeError("لطفا این فیلد را درست وارد کنید"),
  Iron: Yup.number()
    .min(0, "حداقل درصد قابل ثبت صفر می باشد")
    .max(100, "حداکثر درصد قابل ثبت صد می باشد")
    .required(textRequired("آهن"))
    .nullable()
    .typeError("لطفا این فیلد را درست وارد کنید"),
  Manganese: Yup.number()
    .min(0, "حداقل درصد قابل ثبت صفر می باشد")
    .max(100, "حداکثر درصد قابل ثبت صد می باشد")
    .required(textRequired("منگنز"))
    .nullable()
    .typeError("لطفا این فیلد را درست وارد کنید"),
  Roy: Yup.number()
    .min(0, "حداقل درصد قابل ثبت صفر می باشد")
    .max(100, "حداکثر درصد قابل ثبت صد می باشد")
    .required(textRequired("روی"))
    .nullable()
    .typeError("لطفا این فیلد را درست وارد کنید"),
  Copper: Yup.number()
    .min(0, "حداقل درصد قابل ثبت صفر می باشد")
    .max(100, "حداکثر درصد قابل ثبت صد می باشد")
    .required(textRequired("مس"))
    .nullable()
    .typeError("لطفا این فیلد را درست وارد کنید"),
  bor: Yup.number()
    .min(0, "حداقل درصد قابل ثبت صفر می باشد")
    .max(100, "حداکثر درصد قابل ثبت صد می باشد")
    .required(textRequired("بُر"))
    .nullable()
    .typeError("لطفا این فیلد را درست وارد کنید"),
  Calcium: Yup.number()
    .min(0, "حداقل درصد قابل ثبت صفر می باشد")
    .max(100, "حداکثر درصد قابل ثبت صد می باشد")
    .required(textRequired("درصد کلسیم"))
    .nullable()
    .typeError("لطفا این فیلد را درست وارد کنید"),
});

export {
  inspectionPotoraphyValidation,
  PotoraphySoilDecompositionValidation,
  PotoraphySoilNutrientsValidation,
};
