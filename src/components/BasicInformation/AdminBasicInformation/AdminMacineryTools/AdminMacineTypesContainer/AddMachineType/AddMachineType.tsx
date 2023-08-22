import React from "react";
import { Formik, Form } from "formik";
import { Col, Row } from "reactstrap";
import { TextInput } from "../../../../../common/Form";
import { SubmitButton } from "../../../../../common/Form";
import { ICreateMachineType } from "./../../../../../../core/models";
import { addMachineTypeValidate } from "../../../../../../core/validations/admin-machinery-tools.validation";
import { useCreateMachineType } from "./../../../../../../core/services/api";
import { useMachineTypeContext } from "./../AdminMacineTypesContainer";

const initialValue: ICreateMachineType = {
  title: "",
};

const AddMachineType: React.FC = () => {
  const CreateMachineType = useCreateMachineType();
  const {
    mutation,
    setInitialPage,
    initialFilter,
    setfilterState,
    filterState,
  } = useMachineTypeContext();

  const onSubmit = (value: ICreateMachineType, { resetForm }: any) => {
    CreateMachineType.mutate(value, {
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
        validationSchema={addMachineTypeValidate}
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
                      lableText="نوع ماشین"
                      name="title"
                      placeholder="نوع ماشین"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <SubmitButton
                      isLoading={CreateMachineType.isLoading}
                      initialValue={initialValue}
                      schema={addMachineTypeValidate}
                      values={values}
                      isDisabled={CreateMachineType.isLoading}
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

export { AddMachineType };
