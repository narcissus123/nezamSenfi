import React, { FC, useEffect } from "react";

interface CheckBoxProps {
  className?: any;
  color?: any;
  defaultChecked?: any;
  value?: any;
  checked?: any;
  size?: any;
  disabled?: any;
  label?: any;
  icon?: any;
  data: any;
  currentId: any;
  setCheckBoxData: any;
  onClick?: () => void;
  onChange?: () => void;
}
const CheckBox: FC<CheckBoxProps> = ({
  className,
  setCheckBoxData,
  data,
  currentId,
  color,
  size,
  label,
  icon,
  defaultChecked,
  value,
  checked,
  disabled,
  onClick,
  onChange,
}) => {
  useEffect(() => {
    setTimeout(() => {
      let newData = [...data];
      const currentDataId = newData.findIndex(
        ({ groupId }) => groupId === currentId.group
      );
      let isAllCheck = 0;
      newData[currentDataId].options.forEach((op: any) => {
        if (op.checked) {
          isAllCheck++;
        }
      });

      const lastIndex = newData[currentDataId].options.length - 1;

      if (isAllCheck === lastIndex) {
        newData[currentDataId].options.forEach((opt: any) => {
          if (opt.isAll) {
            opt.checked = true;
          }
        });
        setCheckBoxData(newData);
      }
    }, 100);
  }, [data]);

  const handleOptionClick = () => {
    let newData = [...data];

    const currentDataId = newData.findIndex(
      ({ groupId }) => groupId === currentId.group
    );
    const currentJobId = newData[currentDataId].options.findIndex(
      ({ id }: any) => id === currentId.optionValue
    );

    let getOption = {
      ...newData[currentDataId].options[currentJobId],
    };

    if (getOption.isAll) {
      let currentChecked = getOption.checked;
      newData[currentDataId].options.forEach((opt: any) => {
        opt.checked = currentChecked ? false : true;
      });
      setCheckBoxData(newData);
    } else {
      let currentChecked = getOption.checked;

      let newOption = {
        ...getOption,
        checked: currentChecked ? false : true,
      };

      newData[currentDataId].options[currentJobId] = newOption;

      let isAllCheck = 0;
      newData[currentDataId].options.forEach((op: any) => {
        if (op.checked) {
          isAllCheck++;
        }
      });
      const lastIndex = newData[currentDataId].options.length - 1;
      if (isAllCheck === lastIndex) {
        let currentChecked = getOption.checked;
        newData[currentDataId].options.forEach((opt: any) => {
          opt.checked = currentChecked ? opt.checked : true;
        });
      }

      if (!newData[currentDataId].options[currentJobId].checked) {
        newData[currentDataId].options.forEach((opt: any) => {
          if (opt.isAll) {
            opt.checked = false;
          }
        });
      }

      setCheckBoxData(newData);
    }
  };

  return (
    <div
      className={`vx-checkbox-con ${
        className ? className : ""
      } vx-checkbox-${color}`}
    >
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        checked={checked}
        value={value}
        disabled={disabled}
        onClick={handleOptionClick}
        onChange={onChange}
      />
      <span className={`vx-checkbox vx-checkbox-${size ? size : "md"}`}>
        <span className="vx-checkbox--check">{icon}</span>
      </span>
      <span>{label}</span>
    </div>
  );
};

export { CheckBox };
