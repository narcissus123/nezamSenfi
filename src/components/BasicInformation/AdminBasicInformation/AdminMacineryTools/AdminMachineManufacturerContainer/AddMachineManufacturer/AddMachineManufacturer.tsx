import React from "react";
import { Formik, Form } from "formik";
import { Col, Row } from "reactstrap";
import { TextInput } from "../../../../../common/Form";
import { SubmitButton } from "../../../../../common/Form";
import { ICreateManufacturerType } from "./../../../../../../core/models";
import { addMachineManufactorerValidate } from "../../../../../../core/validations/admin-machinery-tools.validation";
import { useCreateMachineManufacturer } from "./../../../../../../core/services/api";
import { useMachineManufacturerContext } from "./../AdminMachineManufacturerContainer";

const initialValue: ICreateManufacturerType = {
  title: "",
};

const AddMachineManufacturer: React.FC = () => {
  const CreateMachineManufacturer = useCreateMachineManufacturer();
  const {
    mutation,
    initialFilter,
    setfilterState,
    filterState,
    setInitialPage,
  } = useMachineManufacturerContext();

  const onSubmit = (value: ICreateManufacturerType, { resetForm }: any) => {
    CreateMachineManufacturer.mutate(value, {
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
        validationSchema={addMachineManufactorerValidate}
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
                      lableText="نام شرکت"
                      name="title"
                      placeholder="نام شرکت"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <SubmitButton
                      isLoading={CreateMachineManufacturer.isLoading}
                      initialValue={initialValue}
                      schema={addMachineManufactorerValidate}
                      values={values}
                      isDisabled={CreateMachineManufacturer.isLoading}
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

export { AddMachineManufacturer };
