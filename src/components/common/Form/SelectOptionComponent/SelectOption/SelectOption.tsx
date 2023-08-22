import React from "react";
import { Field } from "formik";
import { FormGroup } from "reactstrap";
import Select from "react-select";
import { InpuLable } from "../../InputComponents/InputLable/InputLable";

type size = "-sm" | "-lg";

interface SelectOptionProps {
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
}

//this function searchs in data-list and find item which equal to value
const findValue = (data: Array<any>, value: any, placeholde?: string) => {
  let result = null;
  for (let i = 0; i < data.length; i++) {
    if (data[i].value === value) {
      result = data[i];
    }
  }
  return result ? result : { value: null, label: placeholde }; //[example] = { value:"value" , label:"something" }
};

const SelectOption: React.FC<SelectOptionProps> = ({
  id,
  placeHolder,
  isLoading = false,
  name,
  lableText,
  significant = false,
  data = [],
  selectedDefault,
  hasLabel = true,
}) => {
  return (
    <>
      <FormGroup style={!hasLabel ? { marginBottom: "0" } : {}}>
        {hasLabel && (
          <InpuLable lableText={lableText} significant={significant} />
        )}
        <Field
          name={name}
          placeholder="sfad"
          className={`custom-select form-control-lg`}
          id={id}
        >
          {({
            field,
            form: { touched, errors, setFieldTouched, setFieldValue },
          }: any) => {
            const customStyles = {
              control: (base: any, state: any) => ({
                ...base,
                // state.isFocused can display different borderColor if you need it
                borderColor: state.isFocused
                  ? "blue"
                  : errors[name] & touched[name]
                  ? "red"
                  : "#d9d9d9",
                // overwrittes hover style
              }),
            };

            return (
              <>
                <Select
                  value={findValue(data[0].options, field.value, placeHolder)}
                  className="React"
                  classNamePrefix="select"
                  name={name}
                  isLoading={isLoading}
                  styles={customStyles}
                  id={id}
                  //error={errors[name]}
                  //touched={touched[name]}
                  options={data}
                  onBlur={() => setFieldTouched(name, true)}
                  onChange={(opt, e) => {
                    setFieldValue(name, opt.value);
                  }}
                  placeholder={placeHolder}
                ></Select>
                {errors[name] && touched[name] ? (
                  <p
                    style={{ color: "red", fontSize: "11px", marginTop: "5px" }}
                  >
                    {errors[name]}
                  </p>
                ) : (
                  <></>
                )}
              </>
            );
          }}
        </Field>
      </FormGroup>
    </>
  );
};

export { SelectOption };
