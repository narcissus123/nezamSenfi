import { selectOptionDefault } from "./../utils/validation-error.utils";

export const floor = [
  {
    label: selectOptionDefault("نوع ساختمان"),
    options: [
      { value: 1, label: "همکف" },
      { value: 2, label: "طبقه 1" },
      { value: 3, label: "طبقه 2" },
      { value: 4, label: "طبقه 3" },
      { value: 5, label: "طبقه 4" },
      { value: 6, label: "طبقه 5" },
      { value: 7, label: "طبقه 6" },
      { value: 8, label: "طبقه 7" },
      { value: 9, label: "طبقه 8" },
      { value: 10, label: "طبقه 9" },
    ],
  },
];

export const buildingTypes = [
  {
    label: selectOptionDefault("طبقه"),
    options: [
      { value: 1, label: "ساختمان اداری" },
      { value: 2, label: "چاه اب" },
    ],
  },
];

export const buildingLicense = [
  {
    label: selectOptionDefault("مجوز بنا"),
    options: [
      { value: 1, label: "دارای مجوز" },
      { value: 2, label: "فاقد مجوز" },
    ],
  },
];

export const wallCovering = [
  {
    label: selectOptionDefault("پوشش دیوار"),
    options: [
      { value: 1, label: "سرامیک" },
      { value: 2, label: "گچ" },
      { value: 3, label: "سیمان" },
      { value: 4, label: "سایر" },
      { value: 5, label: "فاقد پوشش" },
    ],
  },
];
export const roofCovering = [
  {
    label: selectOptionDefault("پوشش سقف"),
    options: [
      { value: 1, label: "حلب" },
      { value: 2, label: "ایرانیت" },
      { value: 3, label: "سفال" },
      { value: 4, label: "سایر" },
      { value: 5, label: "فاقد پوشش" },
    ],
  },
];
export const floorCovering = [
  {
    label: selectOptionDefault("پوشش کف"),
    options: [
      { value: 1, label: "بتن" },
      { value: 2, label: "سرامیک" },
      { value: 3, label: "موزاییک" },
      { value: 4, label: "سایر" },
      { value: 5, label: "خاکی" },
      { value: 6, label: "فاقد پوشش" },
    ],
  },
];
export const lightingAndVentilation = [
  {
    label: selectOptionDefault("نور و تهویه"),
    options: [
      { value: 1, label: "خوب" },
      { value: 2, label: "متوسط" },
      { value: 3, label: "نامطلوب" },
    ],
  },
];

export const electricity = [
  {
    label: selectOptionDefault("برق"),
    options: [
      { value: 1, label: "َشبکه کابل کشی کامل" },
      { value: 2, label: "َشبکه کابل کشی ناقص" },
      { value: 3, label: "موتور برق سیار و کابل کشی ناقص" },
      { value: 4, label: "فاقد کابل کشی" },
      { value: 5, label: "سایر" },
    ],
  },
];
export const water = [
  {
    label: selectOptionDefault("برق"),
    options: [
      { value: 1, label: "شبکه آبرسانی کامل و مکانیزه" },
      { value: 2, label: "شبکه آبرسانی ناقص و نیمه مکانیزه" },
      { value: 3, label: "آبرسانی سنتی فاقد هرگونه شبکه" },
      { value: 4, label: "سایر" },
    ],
  },
];

export const buildingTypeData = [
  { value: 1, label: "حفاظتی" },
  { value: 2, label: "مسکونی" },
  { value: 3, label: "اداری" },
  { value: 4, label: "تجاری" },
  { value: 5, label: "تولیدی گلخانه ای" },
  { value: 6, label: "تولیدی، گیاهی، قارچ" },
  { value: 7, label: "تولیدی تبدیلی و تکمیلی" },
  { value: 8, label: "تولیدی سورت و بسته بندی" },
  { value: 9, label: "تولیدی طیور و ماکیان" },
  { value: 10, label: "تولیدی دام" },
  { value: 11, label: "تولیدی شیلات و آبزیان" },
  { value: 12, label: "تولیدی آزمایشگاهی" },
  { value: 13, label: "انباری" },
  { value: 14, label: "خدماتی" },
];
