import { Formik, Form } from "formik";
import React, { FC, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { showToast } from "../../../../../core/utils";
import { UnionsLocationInfoValidate } from "../../../../../core/validations/unions-location-info.validations";
import BasicSelectOption from "../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { FileInput } from "../../../../common/Form";
import { SubmitButton } from "../../../../common/Form";
import { TextArea } from "../../../../common/Form";
import { TextInput } from "../../../../common/Form";

const LocationInfo: FC = ({}) => {
  const [initialValues, setInitialValues] = useState<any>({
    province: null,
    county: null,
    city: null,
    address: "",
    postalCode: "",
    phone: "",
    fax: "",
    email: "",
    files: null,
  });

  const onSubmit = (value: any) => {
    if (!value.files || !(value.files.length > 0)) {
      return showToast(["لطفا اسناد مورد نیاز را انتخاب کنید!"], "error");
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>مشخصات مکانی</CardTitle>
        </CardHeader>
        <CardBody>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={UnionsLocationInfoValidate}
            onSubmit={onSubmit}
          >
            {({
              values,
              errors,
              handleChange,
              touched,
              getFieldProps,
              setFieldValue,
            }) => {
              return (
                <Form>
                  <>
                    <Row>
                      <Col md="4">
                        <Row>
                          <Col>
                            <BasicSelectOption
                              lableText="استان"
                              //significant={true}
                              placeHolder="انتخاب کنید..."
                              name="province"
                              data={[{ value: 1, label: "تست" }]}
                              isLoading={false}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <BasicSelectOption
                              lableText="شهرستان"
                              //significant={true}
                              placeHolder="انتخاب کنید..."
                              name="county"
                              data={[{ value: 1, label: "تست" }]}
                              isLoading={false}
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <BasicSelectOption
                              lableText="شهر مرکزی شهرستان"
                              //significant={true}
                              placeHolder="انتخاب کنید..."
                              name="city"
                              data={[{ value: 1, label: "تست" }]}
                              isLoading={false}
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col md="4">
                        <Row>
                          <Col>
                            <TextInput
                              id="postalCode"
                              lableText="کد پستی"
                              name="postalCode"
                              placeholder="کد پستی ..."
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            {" "}
                            <TextInput
                              id="phone"
                              lableText="تلفن"
                              name="phone"
                              placeholder="تلفن ..."
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <TextArea
                              lableText="آدرس"
                              name="address"
                              placeholder="آدرس"
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col md="4">
                        <Row>
                          <Col>
                            <TextInput
                              id="fax"
                              lableText="فکس"
                              name="fax"
                              placeholder="فکس ..."
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <TextInput
                              id="email"
                              lableText="ایمیل"
                              name="email"
                              placeholder="ایمیل ..."
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FileInput
                              files={values.files}
                              accept="image/jpeg, image/png, image/jpg, image/tif,image/tiff, application/pdf"
                              setFieldValue={(val: any) =>
                                setFieldValue("files", val)
                              }
                            />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <SubmitButton
                          isLoading={false}
                          schema={UnionsLocationInfoValidate}
                          values={values}
                          initialValue={initialValues}
                        />
                      </Col>
                    </Row>
                  </>
                </Form>
              );
            }}
          </Formik>
        </CardBody>
      </Card>
    </>
  );
};

export { LocationInfo };
