import * as React from "react";
import { Field } from "formik";
import { CustomInput, FormGroup } from "reactstrap";

import Styled from "./Toggle.module.scss";

type size = "-sm" | "-lg";

interface TextInputProps {
  id?: string;
  name: string;
  significant?: boolean;
  size?: size;
  lableText?: string;
  placeholder?: string;
  type?: string;
  value?: string;
  disabled?: boolean;
  className?: any;
  hasLabel?: boolean;
  novalidate?: boolean;
  onChange?: (opt: any, e: any) => void;
  direction?: "ltr" | "rtl";
  defaultChecked?: boolean;
}

const Toggle: React.FC<TextInputProps> = ({
  id,
  name,
  lableText,
  placeholder,
  type = "text",
  disabled,
  novalidate,
  direction = "rtl",
  className,
  onChange,
  defaultChecked,
}) => {
  const p_Dir = direction === "rtl" ? "" : "p-dir";

  return (
    <>
      <FormGroup className={`${Styled[`toggle-${direction}`]} ${className}`}>
        <Field type={type} id={id} name={name}>
          {({ field, form: { values, setFieldValue } }: any) => (
            <>
              <CustomInput
                type="switch"
                id={id}
                name="isBool"
                disabled={disabled}
                formNoValidate={novalidate}
                {...field}
                checked={values[name]}
                placeholder={placeholder}
                defaultChecked={defaultChecked}
                inline
                onChange={
                  onChange
                    ? onChange
                    : (opt: any) => {
                        return setFieldValue(name, opt.target.checked);
                      }
                }
              >
                <span className={`${Styled[p_Dir]} switch-label`}>
                  {lableText}
                </span>
              </CustomInput>
            </>
          )}
        </Field>
      </FormGroup>
    </>
  );
};

export { Toggle };
