import { ErrorMessage, Field } from "formik";
import React, { FC, useEffect, useState } from "react";
import Select from "react-select";
import { FormGroup } from "reactstrap";
import { OptionRowSel } from "../../../../../core/models";
import {
  fullOption,
  multiFullOption,
  multiSimpleOption,
  simpleOption,
} from "../../../../../core/utils";
import { InpuLable } from "../../InputComponents/InputLable/InputLable";

import "./MultiSelectOption.scss";

interface IPropTypes {
  options: any;
  name: string;
  placeHolder?: string;
  labelText: string;
  significant: boolean;
  value?: any;
  selectedDefault?: any;
  hasLabel?: boolean;
  isDisabled?: boolean;
  isLoading?: boolean;
  onChange?: (e: any) => void;
  notSetWithId?: boolean;
  clearale?: boolean;
}

const MultiSelectOption: FC<IPropTypes> = ({
  options,
  name,
  placeHolder,
  labelText,
  significant,
  value,
  selectedDefault,
  hasLabel,
  isDisabled,
  isLoading,
  onChange,
  notSetWithId,
  clearale = true,
}) => {
  return (
    <FormGroup style={!hasLabel ? { marginBottom: "0" } : {}}>
      {hasLabel && (
        <InpuLable lableText={labelText} significant={significant} />
      )}
      <Field
        value={selectedDefault}
        name={name}
        className={`custom-select form-control-lg`}
      >
        {({
          field,
          form: { touched, errors, setFieldTouched, setFieldValue, values },
        }: any) => {
          return (
            <>
              <CustomMultiSelect
                setFieldValue={setFieldValue}
                field={field}
                data={options}
                isDisabled={isDisabled}
                value={value}
                values={values}
                isMulti
                selectedDefault={selectedDefault}
                name={name}
                isLoading={isLoading}
                errors={errors}
                touched={touched}
                options={options}
                setFieldTouched={setFieldTouched}
                onChange={onChange}
                placeHolder={placeHolder}
                notSetWithId={notSetWithId}
                clearale={clearale}
              />
            </>
          );
        }}
      </Field>
    </FormGroup>
  );
};

interface ICustomSelect {
  value: any;
  values: any;
  errors: any;
  options: any;
  isDisabled?: boolean;
  touched: any;
  name: string;
  field: any;
  selectedDefault: OptionRowSel;
  isLoading?: boolean;
  isMulti: boolean;
  data: any;
  setFieldTouched: any;
  setFieldValue: any;
  placeHolder?: string;
  isClearable?: boolean;
  onChange?: (e: any) => void;
  notSetWithId?: boolean;
  clearale: boolean;
}

const CustomMultiSelect: FC<ICustomSelect> = ({
  values,
  value,
  options,
  errors,
  isDisabled,
  name,
  touched,
  field,
  selectedDefault,
  isLoading,
  setFieldTouched,
  setFieldValue,
  onChange,
  isClearable,
  placeHolder,
  isMulti,
  notSetWithId,
  clearale,
}) => {
  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      // state.isFocused can display different borderColor if you need it
      borderColor: state.isFocused
        ? "blue"
        : errors[name] && touched[name]
        ? "red"
        : "#d9d9d9",
      // overwrittes hover style
    }),
  };

  const [local, setLocal] = useState<OptionRowSel[] | undefined>(undefined);

  useEffect(() => {
    try {
      if (
        field.value &&
        !field.value.some((item: any) => item.value === 0) &&
        JSON.stringify(local) !== JSON.stringify(field.value) &&
        options &&
        options.length > 0 &&
        !notSetWithId
      ) {
        if (
          multiFullOption(field.value, options) &&
          multiFullOption(field.value, options).length > 0
        ) {
          setLocal(multiFullOption(field.value, options));
        } else if (
          multiSimpleOption(field.value, options) &&
          multiSimpleOption(field.value, options).length > 0
        ) {
          setLocal(multiSimpleOption(field.value, options));
        }
      }
    } catch (error) {}
  }, [field, options]);

  useEffect(() => {
    if (local) {
      setFieldValue(name, local);
    }
  }, [local]);

  return (
    <>
      <Select
        isDisabled={isDisabled}
        value={field.value}
        isMulti
        className="React"
        classNamePrefix="select"
        isClearable={clearale}
        defaultValue={selectedDefault}
        name={name}
        isLoading={isLoading}
        styles={customStyles}
        //error={errors[name]}
        //touched={touched[name]}
        options={options}
        tabSelectsValue
        onBlur={() => setFieldTouched(name, true)}
        onChange={
          onChange
            ? (e: any) => onChange(e)
            : (e: any) => {
                setFieldValue(name, e);
              }
        }
        placeholder={placeHolder}
        loadingMessage={(value) => {
          return "در حال جستجو...";
        }}
        noOptionsMessage={(value) => {
          return "گزینه ای در لیست موجود نیست!";
        }}
      ></Select>
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
            {typeof msg === "string" ? msg : "لطفا یک گزینه انتخاب کنید"}
          </p>
        )}
      />
    </>
  );
};

export { MultiSelectOption };
