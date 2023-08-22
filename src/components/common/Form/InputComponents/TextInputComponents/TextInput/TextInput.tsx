import * as React from "react";
import { Field, ErrorMessage } from "formik";
import { FormGroup } from "reactstrap";

import { InpuLable } from "../../InputLable/InputLable";

import Styled from "./TextInput.module.scss";

type size = "-sm" | "-lg";

interface TextInputProps {
  passRef?: any;
  id?: string;
  name: string;
  significant?: boolean;
  size?: size;
  lableText?: string;
  placeholder: string;
  type?: string;
  value?: string;
  disabled?: boolean;
  className?: any;
  hasLabel?: boolean;
  novalidate?: boolean;
  singleSpace?: boolean;
  onChange?: (val: any) => void;
  hasInfo?: boolean;
  infoTitle?: string;
  info?: string;
  infoUniqueId?: string
  popoverPlacement?:"top" | "bottom" | "left" | "right"
}

const TextInput: React.FC<TextInputProps> = ({
  passRef,
  id,
  size = "",
  name,
  lableText,
  className,
  placeholder,
  significant = false,
  type = "text",
  disabled,
  value,
  hasLabel,
  novalidate,
  singleSpace = true,
  onChange,
  hasInfo,
  infoTitle,
  info,
  infoUniqueId,
  popoverPlacement,
}) => {
  const notValid = (errors: any, touched: any): boolean => {
    return errors[name] && touched[name];
  };

  const isValid = (errors: any, touched: any): boolean => {
    return !errors[name] && touched[name];
  };

  return (
    <>
      <FormGroup>
        <InpuLable
          hasInfo={hasInfo}
          infoTitle={infoTitle}
          info={info}
          infoUniqueId={infoUniqueId}
          popoverPlacement={popoverPlacement}
          lableText={lableText}
          significant={significant}
        />
        <Field type={type} id={id} name={name} value={value}>
          {({
            field,
            form: { touched, errors, values, setFieldValue },
            meta,
          }: any) => (
            <>
              <input
                ref={passRef}
                focu
                disabled={disabled}
                formNoValidate={novalidate}
                type={type}
                onChangeCapture={(e) => {
                  if (singleSpace) {
                    e.currentTarget.value = e.currentTarget.value.replace(
                      /\s+/g,
                      " "
                    );
                  }
                  if (onChange) {
                    onChange(e.currentTarget.value);
                  }
                }}
                {...field}
                className={`${className} form-control form-control${size} 
                      ${
                        meta.error &&
                        meta.touched &&
                        `is-invalid ${Styled["text-input-error"]}`
                      }   
                      ${
                        !meta.error && meta.touched && !disabled && `is-valid`
                      }            
                    `}
                placeholder={placeholder}
                value={value ? value : meta.value}
                name={name}
              />

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

export { TextInput };