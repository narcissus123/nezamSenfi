import * as React from "react";
import { Field, ErrorMessage } from "formik";
import { FormGroup } from "reactstrap";

import { InpuLable } from "../InputLable/InputLable";

export interface TextAreaProps {
  id?: string;
  name: string;
  significant?: boolean;
  lableText: string;
  placeholder: string;
  value?: string;
  disabled?: boolean;
  singleSpace?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({
  id,
  name,
  lableText,
  placeholder,
  significant = false,
  value,
  disabled,
  singleSpace = true,
}) => {
  const notValid = (errors: any, touched: any): boolean => {
    return errors[name] && touched[name];
  };

  const isValid = (errors: any, touched: any): boolean => {
    return !errors[name] && touched[name];
  };

  return (
    <FormGroup>
      <InpuLable significant={significant} lableText={lableText} />
      <Field
        name={name}
        className="form-control "
        id={id}
        placeholder={placeholder}
      >
        {({
          field,
          form: { touched, errors, setFieldValue, values },
          meta,
        }: any) => (
          <>
            <textarea
              disabled={disabled}
              style={{ maxHeight: "110px", minHeight: "110px" }}
              {...field}
              className={`form-control form-control 
                    ${meta.error && meta.touched && `is-invalid`}   
                    ${
                      !meta.error && meta.touched && !disabled && `is-valid`
                    }            
                  `}
              //value={value}
              onChange={(e) => {
                if (singleSpace) {
                  e.target.value = e.target.value.replace(/\s+/g, " ");
                }
                setFieldValue(name, e.target.value);
              }}
              name={name}
              placeholder={placeholder}
              value={value ? value : meta.value}
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
  );
};

export { TextArea };
