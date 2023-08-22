import * as React from "react";
import { Field, ErrorMessage } from "formik";
import { Button, Col, FormGroup, Row, Spinner } from "reactstrap";

import { InpuLable } from "../../InputLable/InputLable";

import Styled from "./ListInput.module.scss";
import { X } from "react-feather";

type size = "-sm" | "-lg";

interface ListInputProps {
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
  onAddClick: () => void;
  listData: any;
  setListData: any;
  isLoading: boolean;
  renderList? : boolean;
  children? : any
}

const ListInput: React.FC<ListInputProps> = ({
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
  listData,
  onAddClick,
  setListData,
  isLoading,
  renderList,
  children
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
        <InpuLable lableText={lableText} significant={significant} />
        <Field type={type} id={id} name={name} value={value}>
          {({
            field,
            form: { touched, errors, values, setFieldValue },
          }: any) => (
            <>
              <Row>
                <Col sm="8">
                  {" "}
                  <input
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
                    }}
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
                    value={value ? value : values[name]}
                    name={name}
                  />
                </Col>
                <Col sm="2">
                  <Button
                    color="primary"
                    onClick={onAddClick}
                    disabled={disabled}
                  >
                    {isLoading ? (
                      <Spinner color="white" size="sm" />
                    ) : (
                      <span className="ml-50">افزودن</span>
                    )}
                  </Button>
                </Col>
              </Row>

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
              {renderList && (
                <Row
                  style={{
                    marginTop: "20px",
                  }}
                >
                  <Col>
                    {listData.map((row: any) => {
                      return (
                        <Row
                          style={{
                            borderBottom: "1px solid #000",
                            padding: "3px 0px",
                          }}
                        >
                          <Col xs="5">{row.nationalCode}</Col>
                          <Col xs="5">{row.fullName}</Col>
                          <Col xs="1" style={{ cursor: "pointer" }}>
                            {" "}
                            <X
                              color="red"
                              onClick={() => {
                                setListData((prev: any) => {
                                  return prev.filter(
                                    (val: any) => val.id !== row.id
                                  );
                                });
                              }}
                            />{" "}
                          </Col>
                        </Row>
                      );
                    })}
                  </Col>
                </Row>
              )}
              <Row>
                <Col>{children}</Col>
              </Row>
            </>
          )}
        </Field>
      </FormGroup>
    </>
  );
};

export { ListInput };
