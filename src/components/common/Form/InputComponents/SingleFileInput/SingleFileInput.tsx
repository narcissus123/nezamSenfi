import * as React from "react";
import { Field, ErrorMessage } from "formik";
import { Button, FormGroup } from "reactstrap";

import Styled from "./SingleFileInput.module.scss";
import { InpuLable } from "../..";
import { stringShorter } from "../../../../../core/utils";
import { useRef } from "react";

type size = "-sm" | "-lg";

interface TextInputProps {
  id?: string;
  name: string;
  significant?: boolean;
  size?: size;
  lableText?: string;
  placeholder: string;
  type?: string;
  value?: any;
  disabled?: boolean;
  className?: any;
  hasLabel?: boolean;
  novalidate?: boolean;
  singleSpace?: boolean;
}

const SingleFileInput: React.FC<TextInputProps> = ({
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
}) => {
  const inputRef: any = useRef();
  const notValid = (errors: any, touched: any): boolean => {
    return errors[name] && touched[name];
  };

  const isValid = (errors: any, touched: any): boolean => {
    return !errors[name] && touched[name];
  };

  return (
    <>
      <FormGroup>
        <InpuLable lableText={lableText} significant={significant} />
        <Field type={type} id={id} name={name} value={value}>
          {({
            field,
            form: { touched, errors, values, setFieldValue },
          }: any) => (
            <>
              <label htmlFor={id} style={{ display: "block" }}>
                <div className={Styled.inputContainer}>
                  <Button
                    className={Styled.inputButton}
                    size="sm"
                    color="primary"
                    onClick={() => {
                      inputRef.current!.click();
                    }}
                  >
                    {" "}
                    انتخاب فایل
                  </Button>
                  {value ? (
                    <span>{stringShorter(value || "", 20)}</span>
                  ) : (
                    <></>
                  )}
                </div>
              </label>

              <input
                ref={inputRef}
                onChange={(e: any) => {
                  // setFieldValue(name, e.target.files[0]);
                }}
                onChangeCapture={(e) => {
                  console.log("----fileee---", e.currentTarget.files);

                  setFieldValue(name, e.currentTarget.files);
                }}
                style={{ visibility: "hidden", opacity: 0 }}
                disabled={disabled}
                formNoValidate={novalidate}
                type="file"
                id={id}
                {...field}
                className={`${className} form-control form-control${size} 
                      ${
                        notValid(errors, touched) &&
                        `is-invalid ${Styled["text-input-error"]}`
                      }   
                      ${
                        isValid(errors, touched) && !disabled && `is-valid`
                      }            
                    `}
                placeholder={placeholder}
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

export { SingleFileInput };
