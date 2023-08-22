import { selectOptionDefault } from './../utils';

export const treeTypes = [
  {
    label: selectOptionDefault("نوع درختان"),
    options: [
      { value: 1, label: "درخت حاشیه اراضی" },
      { value: 2, label: "درخت محوطه و باغچه ها" },
      { value: 3, label: "درخت باغی مثمر و غیر مثمر" },
    ],
  },
];

export const SeedlingBases = [
  {
    label: selectOptionDefault("پایه نهال "),
    options: [
      { value: 1, label: "بذر" },
      { value: 2, label: "پیوندی" },
    ],
  },
];

export const ageOfTrees = [
  {
    label: selectOptionDefault("سن درختان"),
    options: [
      { value: 1, label: "1 سال" },
      { value: 2, label: "2 سال" },
      { value: 3, label: "3 سال" },
      { value: 4, label: "4 سال" },
      { value: 5, label: "5 سال" },
      { value: 6, label: "6 سال" },
      { value: 7, label: "7 سال" },
      { value: 8, label: "8 سال" },
      { value: 9, label: "9 سال" },
      { value: 10, label: "10 سال" },
      { value: 7, label: "11 الی 15 سال" },
      { value: 8, label: "16 الی 20 سال" },
      { value: 9, label: "21 الی 25 سال" },
      { value: 10, label: "26 الی 30 سال" },     
      { value: 9, label: "31 الی 35 سال" },
      { value: 10, label: "36 سال به بالا" },            
    ],
  },
];