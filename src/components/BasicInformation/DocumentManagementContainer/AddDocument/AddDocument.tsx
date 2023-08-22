import { Form, Formik } from "formik";
import React, { useState } from "react";
import { CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { DocumentCategoryData } from "../../../../core/data/document-category.data";
import { useAddDocument } from "../../../../core/services/api";
import { showToast } from "../../../../core/utils";
import { addDocumentValidate } from "../../../../core/validations/add-document-validate.validations";
import { MultiSelectOption, TextArea } from "../../../common/Form";
import { TextInput } from "../../../common/Form/InputComponents/TextInputComponents/TextInput/TextInput";
import BasicSelectOption from "../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { SubmitButton } from "../SubmitButton";
import Styles from "./AddDocument.module.scss";

interface IPropTypes {
  setRefetch: (val: any) => void;
}

const AddDocument: React.FC<IPropTypes> = ({ setRefetch }) => {
  
  const addDocumentMutation = useAddDocument();


  const [jobCategoryTypeData] = useState<any>([
    { value: 1, label: "فعالیتهای وابسته به ساختمان صنعتی" },
    { value: 2, label: "فعالیتهای وابسته به ساختمان سنتی وکارگاهی" },
    { value: 3, label: "فعالیتهای وابسته به سازه های سبک گلخانه صنعتی" },
    { value: 4, label: "فعالیتهای وابسته به سازه های سبک گلخانه سنتی" },
    { value: 5, label: "فعالیتهای وابسته به اراضی زراعی وباغی" },
    { value: 6, label: "فعالیتهای وابسته به ماشین الات وادوات" },
    { value: 7, label: "فعالیتهای  تخصصی یا مهارتی فاقد وابستگی مشخص " },
    { value: 8, label: "فعالیت های تولیدی مهاجر" },
  ]);
  const handleSubmit = (value: any, { resetForm }: any) => {

    let jobCategoryEnums: any = [];
    if(value.jobCategoryEnums) {
      value.jobCategoryEnums.forEach((row: any) => {
        jobCategoryEnums.push(row.value);
      })
    }


    const obj = {
      title: value.title,
      categoryType: value.categoryId.value,
      description: value.description,
      jobCategoryEnums: jobCategoryEnums,
    };

    const onSuccessFunc = () => {
      showToast(["با موفقیت انجام شد."], "success");
      setRefetch((val: boolean) => !val);
      resetForm();
    };

    addDocumentMutation.mutate(obj, {
      onSuccess: (val: any) => {
        typeof val.data == "object"
          ? onSuccessFunc()
          : showToast(["مشکلی پیش آمد"], "error");
      },
    });
  };

  return (
    <>
      <CardHeader>
        <CardTitle>افزودن سند</CardTitle>
      </CardHeader>
      <CardBody>
        <Formik
          validationSchema={addDocumentValidate}
          onSubmit={handleSubmit}
          initialValues={{
            categoryId: null,
            title: "",
            description: "",
            jobCategoryEnums: null,
          }}
        >
          {({ setFieldValue }) => {
            return (
              <Form>
                <div className={Styles.contentContainer}>
                  <Row>
                    <Col md="4">
                      <TextInput
                        lableText="عنوان سند"
                        name="title"
                        placeholder="عنوان"
                        significant
                        type="text"
                      />
                    </Col>
                    <Col md="4">
                      <BasicSelectOption
                        isLoading={false}
                        name="categoryId"
                        placeHolder="انتخاب نوع ..."
                        data={DocumentCategoryData}
                        lableText="نوع"
                        significant
                      />
                    </Col>
                    <Col md="4">
                      <MultiSelectOption
                        labelText="گروه شغلی"
                        name="jobCategoryEnums"
                        placeHolder="انتخاب کنید..."
                        significant={true}
                        isLoading={false}
                        options={jobCategoryTypeData}
                        onChange={(e) => setFieldValue("jobCategoryEnums", e)}
                        hasLabel={true}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="8">
                      <TextArea
                        name="description"
                        lableText="توضیحات"
                        placeholder="توضیحات ..."
                      />
                    </Col>
                  </Row>
                </div>
                <SubmitButton isLoading={addDocumentMutation.isLoading} />
              </Form>
            );
          }}
        </Formik>
      </CardBody>
    </>
  );
};

export { AddDocument };
  function setFieldValue(arg0: string, e: any): void {
    throw new Error("Function not implemented.");
  }

