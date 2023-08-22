import React from "react";
import { Formik, Form } from "formik";

import { TextInput } from "../../../../../common/Form/InputComponents/TextInputComponents/TextInput";
import { TwoColumn } from "../../../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";
import BasicSelectOption from "../../../../../common/Form/SelectOptionComponent/BasicSelectOption";
import { SubmitButton } from "../../../../../common/Form/SubmitButtonComponent/SubmitButton/SubmitButton";
import { addProductiValidation } from "../../../../../../core/validations/product-tools.validation";
import { DropZone } from "../../../../../common/Form/DropZone/DropZone";

const initialValue = {
  name: "",
  code: "",
  order: "",
  unit: { value: 0, label: "انتخاب کنید" },
  karbari: { value: 0, label: "انتخاب کنید" },
  job: { value: 0, label: "انتخاب کنید" },
  productFactor: { value: 0, label: "انتخاب کنید" },
  file: null,
};

const ProductsEdit: React.FC = () => {
  const onSubmit = () => {};

  const handleOnchange = (e: any, setFieldValue: any) => {
    setFieldValue("Multi1", e);
  };

  const handleOnchangeProducts = (e: any, setFieldValue: any) => {
    setFieldValue("Multi2", e);
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValue}
        validationSchema={addProductiValidation}
        onSubmit={(value) => alert(value)}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form>
              <>
                <TwoColumn>
                  <div>
                    <TextInput
                      lableText="نام محصول "
                      name="name"
                      placeholder="نام"
                      significant
                    />
                    <TextInput
                      lableText="کد محصول"
                      name="code"
                      placeholder="کد محصول"
                      significant
                    />
                    <TextInput
                      lableText="ترتیب نمایش"
                      name="order"
                      placeholder="ترتیب نمایش"
                      significant
                    />
                    <DropZone
                      lableText="انتخاب فایل"
                      name="file"
                      significant={true}
                    />
                  </div>
                  <div>
                    <BasicSelectOption
                      lableText="واحد"
                      significant={true}
                      placeHolder="انتخاب کنید..."
                      name="unit"
                      data={[]}
                      isLoading={false}
                    />
                    <BasicSelectOption
                      lableText="نوع کاربری"
                      significant={true}
                      placeHolder="انتخاب کنید..."
                      name="karbari"
                      data={[]}
                      isLoading={false}
                    />
                    <BasicSelectOption
                      lableText="شغل"
                      significant={true}
                      placeHolder="انتخاب کنید..."
                      name="job"
                      data={[]}
                      isLoading={false}
                    />
                    <BasicSelectOption
                      lableText="عامل تولید"
                      significant={true}
                      placeHolder="انتخاب کنید..."
                      name="productFactor"
                      data={[]}
                      isLoading={false}
                    />
                  </div>
                </TwoColumn>
                <SubmitButton
                  isLoading={false}
                  initialValue={initialValue}
                  schema={addProductiValidation}
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

export { ProductsEdit };
