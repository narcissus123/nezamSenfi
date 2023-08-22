import { Form, Formik } from "formik";
import React from "react";
import { useState } from "react";
import { SubmitButton, TextInput } from "../../../../../common/Form";
import TreeColumn from "../../../../../common/Wrapper/ColumnWrapper/ThreeColumn/ThreeColumn";
import { TwoColumn } from "../../../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";

interface IPropTypes {
    setParentInitialValue: any
}

const ProductionCategoryRange: React.FC<IPropTypes> = ({ setParentInitialValue }) => {

  const [initialValue, setInitialValue] = useState<any>({
      fromRange: "",
      toRange: ""
  });
 
  const onSubmit = (value: any) => {
  
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValue}
        // validationSchema={addProductItemValidation}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form>
              <>
                <TreeColumn>
                  <div>
                    <TextInput
                      lableText="از بازه"
                      name="fromRange"
                      placeholder="عدد وارد کنید ..."
                      significant
                    />
                  </div>
                  <div>
                    <TextInput
                      lableText="تا بازه"
                      name="toRange"
                      placeholder="عدد وارد کنید ..."
                      significant
                    />
                  </div>
                  <div>
                    <SubmitButton
                      isLoading={false} //createMutation.isLoading}
                      initialValue={initialValue}
                      btnText="افزودن"
                      //schema={addProductItemValidation}
                      values={values}
                      isDisabled={false}
                    />
                  </div>
                </TreeColumn>
              </>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export { ProductionCategoryRange };
