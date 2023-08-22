import { OptionRow, OptionRowSel } from "./so-option-row.models";

export type FullOption = {
  label: string;
  options: OptionRow[];
};

export type FullOptionSel = {
  label: string;
  options: OptionRowSel[];
};
