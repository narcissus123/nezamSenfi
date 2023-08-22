import DatePicker from "@hassanmojab/react-modern-calendar-datepicker";
import "@hassanmojab/react-modern-calendar-datepicker/lib/DatePicker.css";
import { ErrorMessage, Field } from "formik";
import React, { useEffect, useState } from "react";
import InputMask from "react-input-mask";
import { FormGroup } from "reactstrap";
import {
  ConvertObjToStringDate,
  ConvertStringDateToObj,
  getCurrentJalaliDate,
  ReplaceWrongDate,
} from "../../../../core/utils";
import { InpuLable } from "../InputComponents/InputLable/InputLable";
import { useFixModal } from "./CalendarModalFix/CalendarModalFix";
import Styled from "./ModernDatePicker.module.scss";

export interface propType {
  id?: string;
  name: string;
  significant?: boolean;
  lableText?: string;
  placeholder?: string;
  handleBlur?: any;
  initialValue?: string;
  clearable?: boolean;
  hasMaximum?: boolean;
  disabled?: boolean;
  minimumDate?: any;
  hasLabel?: boolean;
  forcePosition?: string;
}

const ModernDatePicker: React.FC<propType> = ({
  id,
  name,
  lableText,
  placeholder,
  significant = false,
  handleBlur,
  initialValue,
  clearable,
  hasMaximum = true,
  disabled,
  hasLabel = true,
  minimumDate,
  forcePosition,
}) => {
  const notValid = (errors: any, touched: any): boolean => {
    return errors[name] && touched[name];
  };

  const isValid = (errors: any, touched: any): boolean => {
    return !errors[name] && touched[name];
  };

  useEffect(() => {
    setTimeout(() => {
      setRigularDay(initialValue);
      if (initialValue) {
        setOriginalDay(ConvertStringDateToObj(initialValue));
      }
    }, 100);
  }, [initialValue]);

  useEffect(() => {
    if (clearable) {
      setRigularDay("");
    }
  }, [clearable]);

  const { ref, setZIndex, zIndex } = useFixModal();

  const [rigularDay, setRigularDay] = useState<any>("");
  const [originalDay, setOriginalDay] = useState<any>(null);
  const [position, setPosition] = useState<any>("auto");

  useEffect(() => {
    if (ref.current !== 0) {
      const bodyRect = document.body.getBoundingClientRect();
      const element = ref.current.getBoundingClientRect();
      console.log(element.top - bodyRect.top, bodyRect.bottom - element.bottom);
      if (bodyRect.bottom - element.bottom > element.top - bodyRect.top) {
        setPosition("bottom");
      } else if (bodyRect.bottom - element.bottom < element.top - bodyRect.top)
        setPosition("top");
      else setPosition("auto");
    }
  }, [ref]);

  const renderInput = (
    prop: any,
    errors: any,
    touched: any,
    setFieldValue: any,
    values: any
  ) => {
    if (values[name] === "") {
      setRigularDay("");
      setOriginalDay(null);
    } // } else {
    //   setRigularDay(ReplaceWrongDate(values[name], hasMaximum));
    //   //console.log("sss");
    // }

    const onChangeDate = (e: any) => {
      setRigularDay(
        ReplaceWrongDate(
          e.target.value,
          hasMaximum,
          minimumDate ? minimumDate : null
        )
      );
      if (!significant && e.target.value !== "____/__/__") {
        setFieldValue(
          name,
          ReplaceWrongDate(
            e.target.value,
            hasMaximum,
            minimumDate ? minimumDate : null
          )
        );
      } else if (significant)
        setFieldValue(
          name,
          ReplaceWrongDate(
            e.target.value,
            hasMaximum,
            minimumDate ? minimumDate : null
          )
        );
      if (e.target.value) {
        setOriginalDay(
          ConvertStringDateToObj(
            ReplaceWrongDate(
              e.target.value,
              hasMaximum,
              minimumDate ? minimumDate : null
            )
          )
        );
      }
      touched[name] = true;
    };

    return (
      <InputMask
        mask="9999/99/99"
        style={{ direction: "ltr", width: "100%" }}
        value={rigularDay}
        disabled={disabled}
        onChange={onChangeDate}
        className={`form-control ${
          disabled ? Styled["disabled-input"] : Styled.dateinput
        } ${
          notValid(errors, touched) &&
          `is-invalid ${Styled["text-input-error"]}`
        }
          ${isValid(errors, touched) && `is-valid`}`}
      >
        {(inputProps: any) => (
          <input
            {...inputProps}
            ref={prop.ref}
            name={name}
            type="text"
            disabled={disabled}
            placeholder={placeholder}
          />
        )}
      </InputMask>
    );
  };

  // convert date obj to string
  const setStringDay = (day: any, setFieldValue: any) => {
    let da = "";
    if (day) {
      da = ConvertObjToStringDate(day);
    }
    setRigularDay(da);
    setFieldValue(name, da);
  };

  return (
    <FormGroup>
      {hasLabel && (
        <InpuLable significant={significant} lableText={lableText} />
      )}
      <Field
        name={name}
        className="form-control"
        id={id}
        placeholder={placeholder}
      >
        {({ field, form: { values, touched, errors, setFieldValue } }: any) => (
          <div
            onClick={() => setZIndex(100)}
            ref={ref}
            style={{ position: "relative", zIndex: zIndex }}
          >
            <DatePicker
              wrapperClassName={`col-sm-12 ${Styled.date}`}
              onChange={(e) => {
                setOriginalDay(e);
                setStringDay(e, setFieldValue);
              }}
              value={originalDay}
              calendarPopperPosition={forcePosition ? forcePosition : position}
              inputPlaceholder="...تاریخ را انتخاب کنید"
              shouldHighlightWeekends
              locale="fa"
              //minimumDate={{ day: 1, month: 1, year: 1100 }}
              renderInput={(prop) =>
                renderInput(prop, errors, touched, setFieldValue, values)
              }
              maximumDate={
                hasMaximum
                  ? getCurrentJalaliDate()
                  : {
                      day: 29,
                      month: 12,
                      year: 1450,
                    }
              }
              minimumDate={minimumDate ? minimumDate : null}
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
          </div>
        )}
      </Field>
    </FormGroup>
  );
};

export { ModernDatePicker };
