import React from "react";
import Select from "react-select";

import { OptionRow } from "../../../core/models";
import { FullOption } from "../../../core/models";

import Styled from "./SelectOption.module.scss";

type SelectType = 1;
interface IPropTypes {
  hasGroupTitle?: boolean;
  options: OptionRow[] | FullOption[];
  selectedOption?: OptionRow | undefined | null;
  placeholder?: string;
  selectType?: SelectType;
  isClearable: boolean;
  defaultValue?: OptionRow;
  loading?: boolean;
  hideSelectedOptions?: boolean;
  onChange: (value: any) => void;
}

const SelectOption: React.FC<IPropTypes> = ({
  hasGroupTitle,
  loading,
  defaultValue,
  hideSelectedOptions = false,
  options,
  selectedOption,
  placeholder,
  selectType,
  isClearable,
  onChange,
}) => {
  return (
    <Select
      minMenuHeight={250}
      isLoading={loading}
      hideSelectedOptions={hideSelectedOptions}
      placeholder={placeholder}
      className={`SelectOptionContainer${selectType} ${Styled.width}`}
      classNamePrefix={`SelectOption${selectType}`}
      getOptionLabel={(option: OptionRow) => option.title}
      getOptionValue={(option: OptionRow) => option.id}
      isClearable={isClearable}
      defaultValue={defaultValue}
      value={selectedOption}
      onChange={(value: any) => onChange(value)}
      options={options}
      noOptionsMessage={(value) => {
        return "گزینه ای در لیست موجود نیست!";
      }}
    />
  );
};

// Usage Example

// const [test , setTest] = useState<OptionRow | OptionRow[]>()
// const [testOptions , setTestOptions] = useState<OptionRow[] | FullOption[]>([
//   {
//     label: "کلاس",
//     options: [
//       { id: "89", title: "حرفه ای" },
//       { id: "76", title: "تست کلمه | Jadid" },
//       { id: "65", title: "بقیه " },
//     ],
//   },
//   {
//     label: "آواها",
//     options: [
//       { id: "17", title: "موسیقی" },
//       { id: "26", title: "دستگاه پخش صدا" },
//       { id: "35", title: "تار" },
//     ],
//   },
// ])

// return (
//   <div style={{ height: "70px" , width:'400px' , margin:'100px auto' }}>
//     <SelectOption selectType={3} placeholder="جستجو ..." onChange={(value) => setTest(value)} selectedOption={test}
//       options={testOptions}
//     />
//   </div>
// );

export { SelectOption };
