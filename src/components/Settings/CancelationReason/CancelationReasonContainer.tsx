import { Form, Formik } from "formik";
import React, { FC, Fragment, useContext, useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { ToastTypes } from "../../../core/enums";
import {
  useGetAllMessageSetting,
  usePostSetMessageSetting,
} from "../../../core/services/api";
import {  useAddCancellationReason } from "../../../core/services/api/cancelation.api";
import { showToast } from "../../../core/utils";
import { refetchContext } from "../../../core/utils/context/EventContext";
import { CancelationReasonValidate } from "../../../core/validations/cancelation-reason.api";
import { NotificationSettingValidate } from "../../../core/validations/notification-setting.validations";
import { SubmitButton, TextArea, TextInput, Toggle } from "../../common/Form";
import { FallBackSpinner } from "../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { List } from "./List/List";

const CancelationReasonContainer: FC = () => {
  const [initialValues, setInitialValues] = useState<any>({
    title: "",
    description: "",
  });

  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

  const setMutation = useAddCancellationReason();


  const onSubmit = (value: any) => {
    const newCancelationReasonObj: any = {
      title: value.title,
      description: value.description,
    };

    setMutation.mutate(newCancelationReasonObj, {
      onSuccess: (val: any) => {
        showToast(["با موفقیت انجام شد!"], ToastTypes.success);
        const newEvent = { ...refetchEvent };
        newEvent.cancelationReasonList = !newEvent.cancelationReasonList;
        setRefetchEvent(newEvent);
      },
    });
  };

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle>افزودن دلیل</CardTitle>
        </CardHeader>
        <CardBody>
          <Formik
            initialValues={initialValues}
            validationSchema={CancelationReasonValidate}
            onSubmit={onSubmit}
            enableReinitialize={true}
          >
            {({ values, setFieldValue }) => {
              return (
                <>
                  <Form>
                    <Row>
                      <Col md="4">
                        <TextInput
                          lableText="دلیل"
                          name="title"
                          placeholder="نام دلیل ..."
                          significant
                        />
                      </Col>
                      <Col md="4">
                        <TextArea
                          lableText="توضیحات"
                          name="description"
                          placeholder="توضیحات"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <SubmitButton
                          isLoading={setMutation.isLoading}
                          initialValue={initialValues}
                          schema={CancelationReasonValidate}
                          values={values}
                          isDisabled={false}
                        />
                      </Col>
                    </Row>
                  </Form>
                </>
              );
            }}
          </Formik>
        </CardBody>
      </Card>

      <List />
    </Fragment>
  );
};

export { CancelationReasonContainer };
