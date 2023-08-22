import { FieldArray, Form, Formik } from "formik";
import React, { createRef, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router";
import { useLocation } from "react-router-dom";
import {  Col, Row } from "reactstrap";
import { ToastTypes } from "../../../../../../../core/enums";
import { useGetAllProductCategoryByCPCCode, useGetProductCategoryDetailsById, useSetProductCategory } from "../../../../../../../core/services/api/job.api";
import { showToast } from "../../../../../../../core/utils";
import { addProductCategoryValidation } from "../../../../../../../core/validations/product-category.validation";
import { SimpleSubmitButton, SubmitButton, TextInput } from "../../../../../../common/Form";
import { FallBackSpinner } from "../../../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import TreeColumn from "../../../../../../common/Wrapper/ColumnWrapper/ThreeColumn/ThreeColumn";
import { TwoColumn } from "../../../../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";


const ProductsCategoryEdit: React.FC = () => {

  const [initialValue, setInitialValue] = useState<any>({
    cpcCode: "",
    ranges: [{ title: "" ,range: "" }],
  });
  
  const [editedRef, setEditedRef] = useState<any>(null)

  const location :any = useLocation(); 
  
  const { id } = useParams<any>();

  const setMutation = useSetProductCategory();
  const getDetailsMutation = useGetProductCategoryDetailsById()
  const getCategoriesByCpcCode = useGetAllProductCategoryByCPCCode()

  const history = useHistory();

  useEffect(()=>{
    if( location.state && location.state.title ){
      let editedRow = initialValue.ranges.find((row: any) => row.title === location.state.title) 
      setEditedRef(editedRow)
    }
  },[location , initialValue ])

  useEffect(()=>{
    if(editedRef) {
      console.log(editedRef);
      if (editedRef.ref && editedRef.ref.current) {
        editedRef.ref.current.focus();
        editedRef.ref.current.scrollIntoView({ behavior: 'smooth'});
      }
      
    }

  },[editedRef])

  useEffect(() => {
    getDetailsMutation.mutate(id , {
      onSuccess: (val: any) => {

        let result = val.data.result

        getCategoriesByCpcCode.mutate(result.cpcCode, {
          onSuccess: (val: any) => {

            let ranges: any = []
            let cpcs = val.data.result
            if(cpcs){
              cpcs.forEach((row: any) => {
                ranges.push({ title: row.title, range: row.startRange, ref: createRef() });
              });
            }
            setInitialValue({
              cpcCode: result.cpcCode,
              ranges: ranges,
            });
          } 
        }) 
      }
    });
  }, []);

 
  const onSubmit = (value: any) => {

    let ranges: any = []

    value.ranges.forEach((row:any) => {
      ranges.push({title: row.title, range: row.range})
    })
    
    let setObj = {
      cpcCode: value.cpcCode,
      ranges: ranges,
    };

    setMutation.mutate(setObj , {
      onSuccess: (val: any) => {
        showToast(["با موفقیت انجام شد!"], ToastTypes.success);
        history.push("/BasicInformation/Products/ProductsCategory/");
      }
    })

  };

  return (
    <>
      {getDetailsMutation.isLoading ? (
        <FallBackSpinner />
      ) : (
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
                        disabled={true}
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
                              values.ranges.map((row: any, index: any) => {

                                console.log('--row---', row);
                                

                                return(
                                <div key={index}>
                                  {/* <Field name={`addresses.${index}`} /> */}
                                  <TreeColumn>
                                    <div>
                                      <TextInput
                                        lableText="نام دسته"
                                        name={`ranges.${index}.title`}
                                        placeholder="نام ..."
                                        passRef={row.ref}
                                        significant
                                      />
                                    </div>
                                    <div>
                                      <TextInput
                                        lableText="از"
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
                                        onCLick={() =>
                                          arrayHelpers.remove(index)
                                        }
                                        btnText="حذف"
                                      />
                                    </div>
                                  </TreeColumn>
                                </div>
                              )
                              })
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
                                    ref: createRef()
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
                                      ref: createRef()
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
                    isLoading={setMutation.isLoading} //createMutation.isLoading}
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
      )}
    </>
  );
};

export { ProductsCategoryEdit };