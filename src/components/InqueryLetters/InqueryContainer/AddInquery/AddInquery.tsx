import { Form, Formik } from "formik";
import * as React from "react";
import { useContext, useState } from "react";
import { Col, Row } from "reactstrap";
import { ToastTypes } from "../../../../core/enums";
import { IInquery } from "../../../../core/models";
import {
  useGetAllOrganization,
  usePostCreateInquery,
} from "../../../../core/services/api";
import { showToast } from "../../../../core/utils";
import { refetchContext } from "../../../../core/utils/context/EventContext";
import { AddInqueryValidate } from "../../../../core/validations/inquery-add.validations";
import { SubmitButton, TextArea, TextInput } from "../../../common/Form";
import BasicSelectOption from "../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";

export interface IProps {}

const AddInquery: React.FC<IProps> = ({}) => {
  const [initialValues, setInitialValues] = useState<IInquery>({
    inqueryTitle: "",
    description: "",
    defaultLetterContent: "",
    defaultLetterTitle: "",
    organizationId: null,
  });

  const [organizationData, setOrganizationData] = useState<any>([
    {
      label: "انتخاب کنید ...",
      options: [],
    },
  ]);

  const { data, isFetching, isSuccess } = useGetAllOrganization();

  const addMutation = usePostCreateInquery();

  React.useEffect(() => {
    if (data) {
      try {
        const result = data.data.result;

        let newOrganization = [
          {
            label: "انتخاب کنید ...",
            options: [],
          },
        ];
        let newOptions: any = [];
        data.data.result.forEach((row: any) => {
          newOptions.push({ value: row.id, label: row.title });
        });
        newOrganization[0].options = newOptions;
        setOrganizationData(newOrganization);
      } catch (e) {}
    }
  }, [isSuccess, data]);

  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

  const onSubmit = (value: any) => {
    const postInqueryObject = {
      title: value.inqueryTitle,
      description: value.description,
      defaultLetterContent: value.defaultLetterContent,
      defualtLetterTitle: value.defaultLetterTitle,
      organizationId: value.organizationId ? value.organizationId.value : 0,
    };

    addMutation.mutate(postInqueryObject, {
      onSuccess: (val: any) => {
        showToast(["با موفقیت انجام شد."], ToastTypes.success);
        const newEvent = { ...refetchEvent };
        newEvent.inqueryList = !newEvent.inqueryList;
        setRefetchEvent(newEvent);
      },
    });
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={AddInqueryValidate}
        enableReinitialize
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
          setFieldTouched,
          setFieldValue,
        }) => {
          return (
            <>
              <Form>
                <Row>
                  <Col md="4">
                    <TextInput
                      lableText="موضوع استعلام"
                      name="inqueryTitle"
                      placeholder="موضوع استعلام"
                      significant
                    />
                  </Col>
                  <Col md="5">
                    <TextInput
                      lableText="موضوع پیشفرض نامه"
                      name="defaultLetterTitle"
                      placeholder="موضوع"
                      significant
                    />
                  </Col>
                  <Col md="3">
                    <BasicSelectOption
                      lableText="نام سازمان"
                      name="organizationId"
                      placeHolder="انتخاب نام سازمان "
                      data={organizationData}
                      isLoading={isFetching}
                      significant
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <TextArea
                      lableText="توضیحات"
                      name="description"
                      placeholder="توضیحات"
                    />
                  </Col>
                  <Col md="6">
                    <TextArea
                      lableText="محتوای پیشفرض نامه"
                      name="defaultLetterContent"
                      placeholder="محتوا"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <SubmitButton
                      isLoading={addMutation.isLoading}
                      schema={AddInqueryValidate}
                      values={values}
                      initialValue={initialValues}
                    />
                  </Col>
                </Row>
              </Form>
            </>
          );
        }}
      </Formik>
    </>
  );
};

export { AddInquery };
