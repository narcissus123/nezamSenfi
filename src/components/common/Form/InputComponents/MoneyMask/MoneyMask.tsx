import Cleave from "cleave.js/react";
import { ErrorMessage } from "formik";
import React, { FC } from "react";
import { FormGroup } from "reactstrap";

import { InpuLable } from "../InputLable/InputLable";

import Styled from "./MoneyMask.module.scss";

interface IPropTypes {
  lableText: string;
  value: string;
  onChange: (val: string) => void;
  errors: any;
  touched: any;
  name: string;
  significant?: boolean;
  disabled?: boolean;
  placeholder?:string
}

const MoneyMask: FC<IPropTypes> = ({
  lableText,
  value,
  onChange,
  errors,
  name,
  touched,
  significant = false,
  disabled,
  placeholder
}) => {
  return (
    <FormGroup>
      <InpuLable significant={significant} lableText={lableText} />
      <Cleave
        className={`form-control ${
          errors[name] &&
          touched[name] &&
          `is-invalid ${Styled["text-input-error"]}`
        }   
        ${!errors[name] && touched[name] && `is-valid`}`}
        placeholder={placeholder ? placeholder: "10,000 ریال"}
        name={name}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        options={{
          numeral: true,
          numeralThousandsGroupStyle: "thousand",
        }}
        id="numeral-formatting"
        disabled={disabled}
      />
      {errors[name] && touched[name] && (
        <ErrorMessage
          name="amount"
          render={(msg) => (
            <p
              style={{
                color: "red",
                margin: 0,
                padding: 0,
                paddingTop: 5,
                fontSize: 11,
              }}
            >
              {msg}
            </p>
          )}
        />
      )}
    </FormGroup>
  );
};

export { MoneyMask };
