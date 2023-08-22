import { FieldArray, Form, Formik } from "formik";
import React, { useContext, useState } from "react";
import {  Col, Row } from "reactstrap";
import { ToastTypes } from "../../../../../../core/enums";
import { useSetProductCategory } from "../../../../../../core/services/api/job.api";


import { showToast } from "../../../../../../core/utils";
import { refetchContext } from "../../../../../../core/utils/context/EventContext";
import { addProductCategoryValidation } from "../../../../../../core/validations/product-category.validation";

import {  SimpleSubmitButton } from "../../../../../common/Form";

import { TextInput } from "../../../../../common/Form/InputComponents/TextInputComponents/TextInput/TextInput";

import { SubmitButton } from "../../../../../common/Form/SubmitButtonComponent/SubmitButton/SubmitButton";

import TreeColumn from "../../../../../common/Wrapper/ColumnWrapper/ThreeColumn/ThreeColumn";
import { TwoColumn } from "../../../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";

const AddProductionCategory: React.FC = () => {

  const [initialValue, setInitialValue] = useState<any>({
    cpcCode: "",
    ranges: [{ title: "" ,range: "" }],
  });

  const {refetchEvent,setRefetchEvent} = useContext(refetchContext)

  const setMutation = useSetProductCategory();
 
  const onSubmit = (value: any) => {
    
    let setObj = {
      cpcCode : value.cpcCode,
      ranges : value.ranges
    }

    setMutation.mutate(setObj , {
      onSuccess: (val: any) => {
        showToast(["با موفقیت انجام شد!"], ToastTypes.success);
        const newEvent = { ...refetchEvent };
        newEvent.productionCategoryList = !newEvent.productionCategoryList;
        setRefetchEvent(newEvent);
      }
    })

  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValue}
        validationSchema={addProductCategoryValidation}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form>
              <>
                <TwoColumn>
                  <div>
                    <TextInput
                      lableText="کد CPC"
                      name="cpcCode"
                      placeholder="کد CPC را وارد کنید ..."
                      significant
                    />
                  </div>
                  <div></div>
                </TwoColumn>
                <Row>
                  <Col>
                    <FieldArray
                      name="ranges"
                      render={(arrayHelpers) => (
                        <div>
                          {values.ranges && values.ranges.length > 0 ? (
                            values.ranges.map((friend: any, index: any) => (
                              <div key={index}>
                                {/* <Field name={`addresses.${index}`} /> */}
                                <TreeColumn>
                                  <div>
                                    <TextInput
                                      lableText="نام دسته"
                                      name={`ranges.${index}.title`}
                                      placeholder="نام ..."
                                      significant
                                    />
                                  </div>
                                  <div>
                                    <TextInput
                                      lableText="کد پایه"
                                      name={`ranges.${index}.range`}
                                      placeholder="عدد وارد کنید ..."
                                      significant
                                    />
                                  </div>
                                  <div style={{ marginTop: "24px" }}>
                                    <SimpleSubmitButton
                                      isLoading={false}
                                      type="button"
                                      className="mb-1"
                                      outLine
                                      color="danger"
                                      onCLick={() => arrayHelpers.remove(index)}
                                      btnText="حذف"
                                    />
                                  </div>
                                </TreeColumn>
                              </div>
                            ))
                          ) : (
                            <SimpleSubmitButton
                              isLoading={false}
                              type="button"
                              className="mb-1"
                              outLine
                              onCLick={() =>
                                arrayHelpers.push({
                                  title: "",
                                  range: "",
                                })
                              }
                              btnText="افزودن بازه جدید"
                            />
                          )}
                          {arrayHelpers.form.values.ranges.length > 0 && (
                            <SimpleSubmitButton
                              isLoading={false}
                              type="button"
                              className="mb-1"
                              outLine
                              onCLick={() =>
                                arrayHelpers.insert(
                                  arrayHelpers.form.values.ranges.length,
                                  {
                                    range: "",
                                    title: "",
                                  }
                                )
                              }
                              btnText="افزودن بازه جدید"
                            />
                          )}
                        </div>
                      )}
                    />
                  </Col>
                </Row>

                <SubmitButton
                  isLoading={setMutation.isLoading}
                  initialValue={initialValue}
                  schema={addProductCategoryValidation}
                  values={values}
                  isDisabled={false}
                />
              </>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export { AddProductionCategory };
