import React from "react";
import { Formik, Form } from "formik";
import { Col, Row } from "reactstrap";
import { TextInput } from "../../../../../common/Form";
import { SubmitButton } from "../../../../../common/Form";
import { useCreateServicesType } from "../../../../../../core/services/api";
import { ICreateServicesType } from "./../../../../../../core/models";
import { addServicesTypedValidations } from "../../../../../../core/validations/services-tools.validation";
import { useServicesTypesContext } from "./../AdminServicesTypesContainer";

const AddServicesTypes: React.FC = () => {
  const initialValue: ICreateServicesType = {
    title: "",
  };
  const CreateServicesType = useCreateServicesType();

  const {
    mutation,
    initialFilter,
    setfilterState,
    filterState,
    setInitialPage,
  } = useServicesTypesContext();

  const onSubmit = (value: ICreateServicesType, { resetForm }: any) => {
    CreateServicesType.mutate(value, {
      onSuccess: () => {
        resetForm();
        mutation.mutate({
          // refetch without filter
          ...initialFilter,
          pageSize: filterState.pageSize,
        });
        setfilterState({ ...initialFilter, pageSize: filterState.pageSize }); // reset filter state
        setInitialPage(0); // reset page-number
      },
    });
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValue}
        validationSchema={addServicesTypedValidations}
        onSubmit={onSubmit}
      >
        {({ values }) => {
          return (
            <Form>
              <>
                <Row>
                  <Col md="6">
                    <TextInput
                      id="title"
                      lableText="نوع خدمات"
                      name="title"
                      placeholder=" نوع خدمات"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <SubmitButton
                      isLoading={CreateServicesType.isLoading}
                      initialValue={initialValue}
                      schema={addServicesTypedValidations}
                      values={values}
                      isDisabled={CreateServicesType.isLoading}
                    />
                  </Col>
                </Row>
              </>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export { AddServicesTypes };
