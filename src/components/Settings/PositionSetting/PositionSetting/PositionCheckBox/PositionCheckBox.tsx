import React, { FC, useEffect, useState } from "react";
import { ToastTypes } from "../../../../../core/enums";
import { showToast } from "../../../../../core/utils";

interface IPropTypes {
  className?: any;
  color: string;
  defaultChecked?: boolean;
  checked?: boolean;
  value?: any;
  disabled?: boolean;
  onClick?: any;
  onChange?: any;
  size?: string;
  label?: string;
  icon?: any;
  valueForm: any;
  schema: any;
  submitForm?: any;
}

const PositionCheckBox: FC<IPropTypes> = ({
  className,
  color,
  defaultChecked = false,
  checked,
  value,
  disabled,
  onClick,
  onChange,
  size,
  label,
  icon,
  schema,
  valueForm,
  submitForm,
}) => {
  const [check, setCheck] = useState<boolean>(
    defaultChecked ? defaultChecked : false
  );

  useEffect(() => {
    setCheck(defaultChecked);
  }, [defaultChecked]);

  return (
    <div
      className={`vx-checkbox-con ${
        className ? className : ""
      } vx-checkbox-${color}`}
    >
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        checked={check}
        value={value}
        disabled={disabled}
        onClick={onClick ? onClick : undefined}
        onChange={
          onChange
            ? (e) => {
                schema
                  .validate(valueForm)
                  .then((value: any) => {
                    onChange(!check);
                    setCheck(!check);
                    submitForm();
                  })
                  .catch((error: any) => {
                    if (!check)
                      showToast(["تاریخ ها را وارد کنید"], ToastTypes.error);
                    setCheck(false);
                    submitForm();
                  });
              }
            : undefined
        }
      />
      <span className={`vx-checkbox vx-checkbox-${size ? size : "md"}`}>
        <span className="vx-checkbox--check">{icon}</span>
      </span>
      <span>{label}</span>
    </div>
  );
};

export { PositionCheckBox };
