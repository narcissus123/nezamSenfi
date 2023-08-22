import React from "react";
import { Formik, Form } from "formik";
import { TextInput } from "../../../../../common/Form/InputComponents/TextInputComponents/TextInput/TextInput";
import { TwoColumn } from "../../../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";
import BasicSelectOption from "../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { MultiSelectOption } from "../../../../../common/Form/SelectOptionComponent/MultiSelectOption/MultiSelectOption";
import { addJobValidation } from "../../../../../../core/validations/admin-job-tools.validation";
import { SubmitButton } from "../../../../../common/Form/SubmitButtonComponent/SubmitButton/SubmitButton";

const JobEdit: React.FC = () => {
  const initialValue = {
    title: "",
    title2: "",
    productionType2: { value: 0, label: "انتخاب کنید" },
  };

  const colourOptions = [
    { value: "ocean", label: "Ocean" },
    { value: "blue", label: "Blue" },
    { value: "purple", label: "Purple" },
    { value: "red", label: "Red" },
    { value: "orange", label: "Orange" },
  ];

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
        validationSchema={addJobValidation}
        onSubmit={(value) => alert(value)}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form>
              <>
                <TwoColumn>
                  <div>
                    <TextInput
                      lableText="نام شغل"
                      name="title"
                      placeholder="نام شغل"
                      significant
                    />
                    <TextInput
                      lableText="کد شغل"
                      name="title2"
                      placeholder="کد شغل"
                      significant
                    />
                    <BasicSelectOption
                      lableText="نوع کاربری"
                      significant={true}
                      placeHolder="انتخاب کنید..."
                      name="productionType2"
                      data={[]}
                      isLoading={false}
                    />
                    <MultiSelectOption
                      labelText="عوامل تولید"
                      name="Multi1"
                      placeHolder="انتخاب کنید..."
                      significant={false}
                      options={colourOptions}
                      onChange={(e) => handleOnchange(e, setFieldValue)}
                      hasLabel={true}
                    />
                    <MultiSelectOption
                      labelText="محصولات"
                      name="Multi2"
                      placeHolder="انتخاب کنید..."
                      significant={false}
                      options={colourOptions}
                      onChange={(e) => handleOnchangeProducts(e, setFieldValue)}
                      hasLabel={true}
                    />
                  </div>
                  <div></div>
                </TwoColumn>
                <SubmitButton
                  isLoading={false}
                  initialValue={initialValue}
                  schema={addJobValidation}
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

export { JobEdit };
