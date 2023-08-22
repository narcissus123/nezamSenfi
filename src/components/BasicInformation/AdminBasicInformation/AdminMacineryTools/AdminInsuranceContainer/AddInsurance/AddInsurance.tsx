import React from "react";
import { Formik, Form } from "formik";
import { Col, Row } from "reactstrap";
import { TextInput } from "../../../../../common/Form";
import { SubmitButton } from "../../../../../common/Form";
import { ICreateManufacturerType } from "./../../../../../../core/models";
import { addInsuranceValidate } from "../../../../../../core/validations/admin-machinery-tools.validation";
import { useAdminInsuranceContext } from "./../AdminInsuranceContainer";
import { useCreateInsurance } from "../../../../../../core/services/api/admin-machiner-insurance.api";


const AddInsurance: React.FC = () => {

  const initialValue: ICreateManufacturerType = {
    title: "",
  };

  const CreateInsurance = useCreateInsurance();
  const {
    mutation,
    initialFilter,
    setfilterState,
    filterState,
    setInitialPage,
  } = useAdminInsuranceContext();

  const onSubmit = (value: ICreateManufacturerType, { resetForm }: any) => {
    CreateInsurance.mutate(value, {
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
        validationSchema={addInsuranceValidate}
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
                      lableText="نام شرکت بیمه"
                      name="title"
                      placeholder="نام شرکت بیمه"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <SubmitButton
                      isLoading={CreateInsurance.isLoading}
                      initialValue={initialValue}
                      schema={addInsuranceValidate}
                      values={values}
                      isDisabled={CreateInsurance.isLoading}
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

export { AddInsurance };
