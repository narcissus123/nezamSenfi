import { selectOptionDefault } from "../utils"

export const topographyStatus = [
  {
    label: selectOptionDefault("وضعیت توپوگرافی"),
    options: [
      { value: 1, label: "دشت و مسطح" },
      { value: 2, label: "دشت و شیبدار" },
      { value: 3, label: "کوهستانی و پایین بنه" },
      { value: 4, label: "کوهستانی و میان بنه" },
      { value: 5, label: "کوهستانی و بالا بنه" }
    ],
  },
];

export const slopePercent = [
  {
    label: selectOptionDefault("درصد شیب"),
    options: [
      { value: 1, label: "کمتر از 5  درصد" },
      { value: 2, label: "بین 5 تا 10 درصد" },
      { value: 3, label: "بین 10 تا 15 درصد" },
      { value: 4, label: "بین 15 تا 20 درصد" },
      { value: 5, label: "بین 20 تا 25 درصد" },
      { value: 6, label: "بین 25 تا 30 درصد" },
      { value: 7, label: "بیشتر از 30 درصد" },
    ],
  },
];

export const soilCondition = [
  {
    label: selectOptionDefault("وضعیت خاک"),
    options: [
      { value: 1, label: "عمیق و حاصلخیز" },
      { value: 2, label: "عمیق و حاصلخیری متوسط" },
      { value: 3, label: "عمیق و حاصلخیزی ضعیف" },
      { value: 4, label: "نیمه عمیق و حاصلخیز" },
      { value: 5, label: "نیمه عمیق و حاصلخیزی متوسط" },
      { value: 6, label: "نیمه عمیق و حاصلخیزی ضعیف" },
      { value: 7, label: "سطحی و سنگلاخی" },
      { value: 8, label: "بستر سنگی و غیرقابل کشت" },
      { value: 9, label: "حاصلخیزی نامناسب و غیر قابل کشت" },
      { value: 10, label: "دارای پوشش گیاهی مرتعی چندساله و غیر قابل زراعت" },
    ],
  },
];

export const waterSupplySources = [
  {
    label: selectOptionDefault("منبع تامین آب"),
    options: [
      { value: 1, label: "قنات" },
      { value: 2, label: "چشمه" },
      { value: 3, label: "رود خانه" },
      { value: 4, label: "چاه سطحی" },
      { value: 5, label: "چاه نیمه عمیق " },
      { value: 6, label: "چاه عمیق" },
      { value: 7, label: "ذخیره مخزنی/آب بندان" },
      { value: 8, label: "دیم" },
      { value: 9, label: "آب شهری/روستایی" },
      { value: 10, label: "سایر" },
    ],
  },
];

export const waterQuality = [
  {
    label: selectOptionDefault("کیفیت آب "),
    options: [
      { value: 1, label: "شور" },
      { value: 2, label: "نیمه شور" },
      { value: 3, label: "شیرین" },

    ],
  },
];

export const waterExploitationSystems = [
  {
    label: selectOptionDefault("سیستم بهره برداری از آب"),
    options: [
      { value: 1, label: "غرقابی" },
      { value: 2, label: "جوی و پشته" },
      { value: 3, label: "قطره ای" },
      { value: 4, label: "بارانی" },
      { value: 5, label: "سایر" },
    ],
  },
];

export const soilPatterns = [ 
  {
    label: selectOptionDefault("بافت خاک"),
    options: [
      { value: 1, label: "بافت خاک" },
    ],
  },
];

export const beforProductionSystems = [ 
  {
    label: selectOptionDefault(" سیستم کاشت"),
    options: [
      { value: 1, label: "صنعتی و تمام مکانیزه" },
      { value: 2, label: "نیمه صنعتی و مکانیزه" },
      { value: 3, label: "سنتی" },
    ],
  },
];

export const DuringProductionSystems = [ 
  {
    label: selectOptionDefault(" سیستم داشت"),
    options: [
      { value: 1, label: "صنعتی و تمام مکانیزه" },
      { value: 2, label: "نیمه صنعتی و مکانیزه" },
      { value: 3, label: "سنتی" },
    ],
  },
];

export const endProductionSystems = [ 
  {
    label: selectOptionDefault(" سیستم برداشت"),
    options: [
      { value: 1, label: "صنعتی و تمام مکانیزه" },
      { value: 2, label: "نیمه صنعتی و مکانیزه" },
      { value: 3, label: "سنتی" },
    ],
  },
];
