import React from "react";
import { Formik, Form } from "formik";

import { TextInput } from "../../../../../common/Form/InputComponents/TextInputComponents/TextInput";
import { TwoColumn } from "../../../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";
import BasicSelectOption from "../../../../../common/Form/SelectOptionComponent/BasicSelectOption";
import { MultiSelectOption } from "../../../../../common/Form/SelectOptionComponent/MultiSelectOption";
import { TextArea } from "../../../../../common/Form/InputComponents/TextArea";
import { SubmitButton } from "../../../../../common/Form/SubmitButtonComponent/SubmitButton/SubmitButton";
import { addProductionFactorValidation } from "../../../../../../core/validations/production-factor.validation";

const initialValue = {
  name: "",
  code: "",
  order: "",
  describe: "",
  karbari: { value: 0, label: "انتخاب کنید" },
  job: { value: 0, label: "انتخاب کنید" },
  product: { value: 0, label: "انتخاب کنید" },
  unit: { value: 0, label: "انتخاب کنید" },
  repeat: { value: 0, label: "انتخاب کنید" },
  dependType: { value: 0, label: "انتخاب کنید" },
};

const colourOptions = [
  { value: "ocean", label: "Ocean" },
  { value: "blue", label: "Blue" },
  { value: "purple", label: "Purple" },
  { value: "red", label: "Red" },
  { value: "orange", label: "Orange" },
];

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
        validationSchema={addProductionFactorValidation}
        onSubmit={(value) => alert(value)}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form>
              <>
                <TwoColumn>
                  <div>
                    <TextInput
                      lableText="نام"
                      name="name"
                      placeholder="نام"
                      significant
                    />
                    <TextInput
                      lableText="کد"
                      name="code"
                      placeholder="کد"
                      significant
                    />
                    <TextInput
                      lableText="ترتیب نمایش"
                      name="order"
                      placeholder="ترتیب نمایش"
                      significant
                    />
                    <TextArea
                      lableText="توضیحات"
                      name="describe"
                      placeholder="توضیحات"
                      significant
                    />
                  </div>
                  <div>
                    <BasicSelectOption
                      lableText="نوع کاربری"
                      significant={true}
                      placeHolder="انتخاب کنید..."
                      name="karbari"
                      data={[]}
                      isLoading={false}
                    />
                    <BasicSelectOption
                      lableText="َشغل"
                      significant={true}
                      placeHolder="انتخاب کنید..."
                      name="job"
                      data={[]}
                      isLoading={false}
                    />
                    <MultiSelectOption
                      labelText="محصولات"
                      name="Multi2"
                      significant={true}
                      options={colourOptions}
                      onChange={(e) => handleOnchangeProducts(e, setFieldValue)}
                      hasLabel={true}
                    />
                    <BasicSelectOption
                      lableText="واحد سنجش فعالیت"
                      significant={true}
                      placeHolder="انتخاب کنید..."
                      name="unit"
                      data={[]}
                      isLoading={false}
                    />
                    <BasicSelectOption
                      lableText="امکان تکرار"
                      significant={true}
                      placeHolder="انتخاب کنید..."
                      name="repeat"
                      data={[]}
                      isLoading={false}
                    />
                    <BasicSelectOption
                      lableText="نوع وابستگی"
                      significant={true}
                      placeHolder="انتخاب کنید..."
                      name="dependType"
                      data={[]}
                      isLoading={false}
                    />
                  </div>
                </TwoColumn>
                <SubmitButton
                  isLoading={false}
                  initialValue={initialValue}
                  schema={addProductionFactorValidation}
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
