import React, { FC, useEffect, useState } from "react";
import { ErrorMessage, Field } from "formik";
import { FormGroup } from "reactstrap";
import Select from "react-select";
import { InpuLable } from "../../InputComponents/InputLable/InputLable";
import { OptionRowSel } from "../../../../../core/models";
import { fullOption, simpleOption } from "../../../../../core/utils";

type size = "-sm" | "-lg";

export interface SelectOptionProps {
  id?: string;
  name: string;
  significant?: boolean;
  size?: size;
  lableText?: string;
  data: Array<any>;
  isLoading?: boolean;
  selectedDefault?: any;
  hasLabel?: boolean;
  handleChange?: (value: any) => void;
  placeHolder?: string;
  onChange?: (opt: any, e: any) => void;
  isDisabled?: boolean;
  isClearable?: boolean;
  hasInfo?: boolean;
  infoTitle?: string;
  info?: string;
  infoUniqueId?: string
  popoverPlacement?:"top" | "bottom" | "left" | "right"
}

const BasicSelectOption: React.FC<SelectOptionProps> = ({
  id,
  size = "",
  isLoading = false,
  name,
  lableText,
  significant = false,
  data = [],
  selectedDefault,
  hasLabel = true,
  placeHolder,
  onChange,
  isDisabled,
  isClearable,
  hasInfo,
  infoTitle,
  info,
  infoUniqueId,
  popoverPlacement = "top",
}) => {
  return (
    <>
      <FormGroup style={!hasLabel ? { marginBottom: "0" } : {}}>
        {hasLabel && (
          <InpuLable
            hasInfo={hasInfo}
            infoTitle={infoTitle}
            info={info}
            lableText={lableText}
            significant={significant}
            infoUniqueId={infoUniqueId}
            popoverPlacement={popoverPlacement}
          />
        )}
        <Field
          value={selectedDefault}
          name={name}
          className={`custom-select form-control-lg`}
          id={id}
        >
          {({
            field,
            form: { touched, errors, setFieldTouched, setFieldValue },
            meta,
          }: any) => (
            <CustomSelect
              data={data}
              errors={errors}
              field={field}
              id={id}
              name={name}
              selectedDefault={selectedDefault}
              setFieldTouched={setFieldTouched}
              setFieldValue={setFieldValue}
              touched={touched}
              isClearable={isClearable}
              isDisabled={isDisabled}
              isLoading={isLoading}
              onChange={onChange}
              placeHolder={placeHolder}
              meta={meta}
            />
          )}
        </Field>
      </FormGroup>
    </>
  );
};

interface ICustomSelect {
  errors: any;
  isDisabled?: boolean;
  touched: any;
  name: string;
  field: any;
  selectedDefault: OptionRowSel;
  isLoading?: boolean;
  id?: string;
  data: any;
  setFieldTouched: any;
  setFieldValue: any;
  onChange?: (opt: any, e: any) => void;
  placeHolder?: string;
  isClearable?: boolean;
  meta: any;
  
}

const CustomSelect: FC<ICustomSelect> = ({
  errors,
  isDisabled,
  name,
  touched,
  field,
  selectedDefault,
  isLoading,
  data,
  id,
  setFieldTouched,
  setFieldValue,
  onChange,
  isClearable,
  placeHolder,
  meta,
}) => {
  const customStyles = {
    control: (base: any, state: any) => ({
      ...base,
      // state.isFocused can display different borderColor if you need it
      borderColor: state.isFocused
        ? "blue"
        : meta.error && meta.touched
        ? "red"
        : "#d9d9d9",
      // overwrittes hover style
    }),
  };

  const [local, setLocal] = useState<OptionRowSel | undefined>(undefined);

  useEffect(() => {
    try {
      if (
        field.value &&
        field.value.value &&
        field.value.value !== 0 &&
        JSON.stringify(local) !== JSON.stringify(field.value) &&
        data &&
        data.length > 0

      ) {
        if (fullOption(field.value.value, data) && fullOption(field.value.value, data).value !== 0 ) {
          setLocal(fullOption(field.value.value, data));
        } else if (simpleOption(field.value.value, data) && simpleOption(field.value.value, data).value !== 0 ) {
          setLocal(simpleOption(field.value.value, data));
        }
      }
    } catch (error) {}
  }, [field, data]);

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
        className="React"
        classNamePrefix="select"
        defaultValue={selectedDefault}
        name={name}
        isLoading={isLoading}
        styles={customStyles}
        id={id}
        ///error={errors[name]}
        //touched={touched[name]}
        options={data}
        onBlur={() => setFieldTouched(name, true)}
        onChange={
          onChange
            ? onChange
            : (opt, e) => {
                if (opt) {
                  return setFieldValue(name, {
                    ...opt,
                    value: opt.value,
                    label: opt.label,
                  });
                }
                setFieldValue(name, null);
              }
        }
        placeholder={placeHolder}
        isClearable={isClearable}
        loadingMessage={(value) => {
          return "در حال جستجو...";
        }}
        noOptionsMessage={(value) => {
          return "گزینه ای در لیست موجود نیست!";
        }}
      ></Select>
      {/* {errors[name] && touched[name] ? (
        <p style={{ color: "red", fontSize: "11px", marginTop: "5px" }}>
          {errors[name]
            ? () => {
                console.log(errors[name]);
              }
            : ""}
        </p>
      ) : (
        <></>
      )} */}

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

export default BasicSelectOption;
