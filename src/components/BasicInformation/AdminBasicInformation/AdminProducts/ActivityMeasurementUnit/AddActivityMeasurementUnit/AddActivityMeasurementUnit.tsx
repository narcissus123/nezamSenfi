import { Form, Formik } from "formik";
import React, { useContext } from "react";
import { Col, Row } from "reactstrap";
import { ToastTypes } from "../../../../../../core/enums";
import { useCreateActivityMeasurementUnit } from "../../../../../../core/services/api/job.api";
import { showToast } from "../../../../../../core/utils";
import { refetchContext } from "../../../../../../core/utils/context/EventContext";
import { addActivityMeasurmentUnitValidation } from "../../../../../../core/validations/activity-measurment-unit.validation";
import { TextInput } from "../../../../../common/Form/InputComponents/TextInputComponents/TextInput/TextInput";
import { SubmitButton } from "../../../../../common/Form/SubmitButtonComponent/SubmitButton/SubmitButton";


const initialValue = {
  title: "",
  code: "",
  viewOrder:0
};

const AddActivityMeasurementUnit: React.FC = () => {
  const addMutation = useCreateActivityMeasurementUnit();

  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

  const onSubmit = (value: { title: string; code: string ; viewOrder:number }) => {
    const unitObject = {
      title: value.title,
      code: value.code,
      viewOrder:value.viewOrder
    };

    addMutation.mutate(unitObject, {
      onSuccess: (val: any) => {
        showToast(["با موفقیت انجام شد"], ToastTypes.success);
        const newEvent = { ...refetchEvent };
        newEvent.ActivityMeasurementUnitList = !newEvent.ActivityMeasurementUnitList;
        setRefetchEvent(newEvent);
      },
    });
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValue}
        validationSchema={addActivityMeasurmentUnitValidation}
        onSubmit={onSubmit}
      >
        {({ values, setFieldValue }) => {
          return (
            <Form>
              <>
                <Row>
                  <Col md="4">
                    <TextInput
                      lableText="نام واحد"
                      name="title"
                      placeholder="نام"
                      significant
                    />
                  </Col>
                  <Col md="4">
                    <TextInput
                      lableText="کد"
                      name="code"
                      placeholder="کد"
                      significant
                    />
                  </Col>
                  <Col md="4">
                    <TextInput
                      lableText="اولویت نمایش"
                      name="viewOrder"
                      placeholder="1"
                      significant
                    />
                  </Col>
                </Row>

                <SubmitButton
                  isLoading={addMutation.isLoading}
                  initialValue={initialValue}
                  schema={addActivityMeasurmentUnitValidation}
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

export { AddActivityMeasurementUnit };
