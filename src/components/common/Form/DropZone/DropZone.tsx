import * as React from "react";
import { ErrorMessage, Field } from "formik";
import { FormGroup, Button, Row, Col } from "reactstrap";
import Dropzone from "react-dropzone";

import { InpuLable } from "../InputComponents/InputLable/InputLable";

import Styled from "./DropZone.module.scss";
import { Delete } from "react-feather";

export interface DropZoneProps {
  name: string;
  significant?: boolean;
  lableText?: string;
  placeholder?: string;
  isSingle?: boolean;
  toggleModal?: () => void;
  accept?: string;
  removeServedFiles?: () => void;
  hasImage?: any;
}

const DropZone: React.FC<DropZoneProps> = ({
  lableText,
  placeholder,
  significant = false,
  name,
  toggleModal,
  isSingle,
  accept,
  removeServedFiles,
  hasImage,
}) => {
  const showSelectedFiles = (
    files: FileList,
    setFieldValue: any,
    name: string
  ) => {
    if (files) {
      return Array.from(files).map((file, index) => {
        return (
          <>
            {file.name && (
              <Row key={index} style={{ borderBottom: "1px solid #ccc" }}>
                <Col md="7" style={{ padding: "0" }}>
                  {file.name.length > 38
                    ? file.name.slice(0, 37) + "..."
                    : file.name}
                </Col>
                <Col md="3" style={{ padding: "0" }}>
                  {`${(file.size / 1024).toFixed(2)}kb`}
                </Col>
                <Col
                  md="2"
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "flex-end",
                    padding: "0",
                  }}
                >
                  <Delete
                    onClick={() => {
                      let newFiles = Array.from(files).filter(
                        (file, ind) => ind !== index
                      );
                      setFieldValue(name, newFiles);
                    }}
                    size={18}
                    color="red"
                    style={{ cursor: "pointer", transform: "rotateZ(180deg)" }}
                  />
                </Col>
              </Row>
            )}
          </>
        );
      });
    }
  };

  return (
    <>
      <FormGroup>
        <InpuLable lableText={lableText} significant={significant} />
        <Field name={name} className={`custom-select form-control-lg`}>
          {({
            field,
            form: { values, touched, errors, setFieldTouched, setFieldValue },
          }: any) => {
            return (
              <>
                <Dropzone
                  multiple={!isSingle}
                  accept={
                    accept
                      ? accept
                      : "image/jpeg, image/png, image/jpg, image/tif,image/tiff, application/pdf"
                  }
                  onDrop={
                    toggleModal
                      ? (acceptedFiles) => {
                          setFieldValue(name, acceptedFiles);
                          toggleModal();
                          if (removeServedFiles) {
                            removeServedFiles();
                          }
                        }
                      : (acceptedFiles) => {
                          setFieldValue(name, acceptedFiles);
                          if (removeServedFiles) {
                            removeServedFiles();
                          }
                        }
                  }
                >
                  {({ getRootProps, getInputProps }) => (
                    <section
                      className={
                        errors[name] && touched[name]
                          ? Styled["is-invalid"]
                          : undefined
                      }
                    >
                      <div {...getRootProps()}>
                        <input {...getInputProps()} />
                        <div className={Styled.dropZoneContainer}>
                          <div className={Styled.insideHolder}>
                            {hasImage ? (
                              <img
                                src={hasImage}
                                alt="product"
                                width="100%"
                                height="100%"
                                style={{ cursor: "pointer" }}
                                onClick={() => {}}
                              />
                            ) : (
                              <p>
                                {placeholder
                                  ? placeholder
                                  : "فایل ها را بکشید و اینجا رها کنید ..."}
                              </p>
                            )}
                          </div>
                          <div>
                            <Button
                              type="button"
                              outline
                              color="primary"
                              className={`${Styled.selectButton}`}
                            >
                              انتخاب فایل
                            </Button>
                          </div>
                        </div>
                      </div>
                    </section>
                  )}
                </Dropzone>
                <Row
                  style={{ margin: "14px", marginTop: "10px", padding: "0px" }}
                >
                  <Col style={{ margin: 0, padding: 0 }} md="12">
                    {showSelectedFiles(values[name], setFieldValue, name)}
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
                        paddingTop: 0,
                        fontSize: 12,
                      }}
                    >
                      {msg}
                    </p>
                  )}
                />
              </>
            );
          }}
        </Field>
      </FormGroup>
    </>
  );
};

export { DropZone };
