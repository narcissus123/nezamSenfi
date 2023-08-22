import React, { useState } from "react";
import { Field, ErrorMessage } from "formik";
import { FormGroup } from "reactstrap";
import { Eye, EyeOff } from "react-feather";

import { InpuLable } from "../../InputLable/InputLable";

import Styled from "./PasswordInput.module.scss";

type size = "-sm" | "-lg";

export interface TextInputProps {
  id?: string;
  name: string;
  significant?: boolean;
  size?: size;
  lableText?: string;
  placeholder: string;
  value?: string;
  disabled?: boolean;
  className?: any;
  hasLabel?: boolean;
  hasEye?: boolean;
}

const PasswordInput: React.FC<TextInputProps> = ({
  id,
  size = "",
  name,
  lableText,
  className,
  placeholder,
  significant = false,
  disabled,
}) => {
  const [eyeState, setEyeState] = useState(false);

  const notValid = (errors: any, touched: any): boolean => {
    return errors[name] && touched[name];
  };

  const isValid = (errors: any, touched: any): boolean => {
    return !errors[name] && touched[name];
  };
  return (
    <>
      <FormGroup className="position-relative">
        <InpuLable lableText={lableText} significant={significant} />
        <Field type={eyeState ? "text" : "password"} id={id} name={name}>
          {({ field, form: { touched, errors, va } }: any) => (
            <>
              <input
                disabled={disabled}
                type={eyeState ? "text" : "password"}
                {...field}
                className={`${className} form-control form-control${size} 
                      ${
                        notValid(errors, touched) &&
                        `is-invalid ${Styled["text-input-error"]}`
                      }   
                      ${isValid(errors, touched) && `is-valid`}            
                    `}
                placeholder={placeholder}
              />

              {!eyeState && (
                <EyeOff
                  size="15"
                  className={`${Styled["eye"]}`}
                  onClick={() => setEyeState(true)}
                />
              )}
              {eyeState && (
                <Eye
                  size="15"
                  className={Styled["eye"]}
                  onClick={() => setEyeState(false)}
                />
              )}

              <ErrorMessage
                name={name}
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
            </>
          )}
        </Field>
      </FormGroup>
    </>
  );
};

export { PasswordInput };
