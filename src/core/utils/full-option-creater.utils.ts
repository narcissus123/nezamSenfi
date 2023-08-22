import { FullOption, OptionRow, OptionRowSel } from "../models";

export const FullOptionCreater = (
  options: any,
  valueId: string,
  labelId: string,
) => {
  let newState: FullOption[] = [
    {
      label: "انتخاب کنید ...",
      options: [],
    },
  ];

  let newOptions: any = [];

  options.forEach((row: any) => {
    newOptions.push({ value: row[valueId], label: row[labelId], ...row });
  });

  newState[0].options = newOptions;
  return newState;
};
