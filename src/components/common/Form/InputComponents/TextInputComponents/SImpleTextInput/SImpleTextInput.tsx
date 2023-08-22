import * as React from "react";
import { FormGroup, Input } from "reactstrap";
import { Field } from "formik";
import { InpuLable } from "../../InputLable/InputLable";

export interface IPropsType {
  id?: string;
  name: string;
  placeholder: string;
  type?: string;
  value?: string;
  disabled?: boolean;
  className?: any;
  text?: string;
  significant?: boolean;
  lableText?: string;
}

const SimpleTextInput: React.FC<IPropsType> = ({
  id,
  name,
  disabled,
  className,
  type = "text",
  placeholder,
  lableText,
  significant = false,
}) => {
  return (
    <FormGroup>
      <InpuLable lableText={lableText} significant={significant} />
      <Field id={id} name={name} placeholder={placeholder}>
        {({ field, form: { touched, errors, value } }: any) => (
          <>
            <Input
              {...field}
              disabled={disabled}
              type={type}
              placeholder={placeholder}
              className={`${className} form-control`}
            />
          </>
        )}
      </Field>
    </FormGroup>
  );
};

export { SimpleTextInput };
