import { Formik , Form } from "formik";
import React, {useState } from "react";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { showToast } from "../../../../../core/utils";
import { UnionsRegisteryDocsValidate } from "../../../../../core/validations/unions-registery-docs.validations";
import { FileInput } from "../../../../common/Form";
import { SubmitButton } from "../../../../common/Form";
import { TextInput } from "../../../../common/Form";



const RegisteryDocs = () => {
  
  const [initialValues,setInitialValues] = useState<any>({
    unionName : "",
    stablishNumber : "",
    nationalId:"",
    economicCode : "",
    newspaperNumber:"",
    files:null
  }) 

  const onSubmit = (value:any) => {
    if(!value.files || !(value.files.length > 0)){
        return showToast(["لطفا اسناد مورد نیاز را انتخاب کنید!"], "error");
    }
  }
  
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>اسناد ثبتی</CardTitle>
        </CardHeader>
        <CardBody>
          <Formik
            enableReinitialize={true}
            initialValues={initialValues}
            validationSchema={UnionsRegisteryDocsValidate}
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
                            <TextInput
                              id="unionName"
                              lableText="نام اتحادیه"
                              name="unionName"
                              placeholder=""
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <TextInput
                              id="economicCode"
                              lableText="کد اقتصادی"
                              name="economicCode"
                              placeholder=""
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col md="4">
                        <Row>
                          <Col>
                            <TextInput
                              id="stablishNumber"
                              lableText="شماره آگهی ثبتی تاسیس یا تغییر"
                              name="stablishNumber"
                              placeholder=""
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <TextInput
                              id="newspaperNumber"
                              lableText="شماره روزنامه رسمی"
                              name="newspaperNumber"
                              placeholder=""
                            />
                          </Col>
                        </Row>
                      </Col>
                      <Col md="4">
                        <Row>
                          <Col> 
                            <TextInput
                              id="nationalId"
                              lableText="شناسه ملی"
                              name="nationalId"
                              placeholder=""
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <FileInput files={values.files} setFieldValue={(val : any) => setFieldValue('files' , val)} />
                          </Col>
                        </Row>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <SubmitButton
                          isLoading={false}
                          schema={UnionsRegisteryDocsValidate}
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

export { RegisteryDocs };
