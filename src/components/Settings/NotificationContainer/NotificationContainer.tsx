import { Form, Formik } from "formik";
import React, { FC, Fragment, useContext, useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { ToastTypes } from "../../../core/enums";
import {
  useGetAllMessageSetting,
  usePostSetMessageSetting,
} from "../../../core/services/api";
import { showToast } from "../../../core/utils";
import { refetchContext } from "../../../core/utils/context/EventContext";
import { NotificationSettingValidate } from "../../../core/validations/notification-setting.validations";
import { SubmitButton, Toggle } from "../../common/Form";
import { FallBackSpinner } from "../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { List } from "./List/List";

interface IInitialValues {
  isSmsActive: boolean;
  isEmailActive: boolean;
  isTicketActive: boolean;
}

const NotificationContainer: FC = () => {
  const [initialValues, setInitialValues] = useState<IInitialValues>({
    isSmsActive: false,
    isEmailActive: false,
    isTicketActive: false,
  });

  const notificationMutation = usePostSetMessageSetting();

  const { data, isFetching, isSuccess } = useGetAllMessageSetting();

  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

  const onSubmit = (value: any) => {
    const notificationSettingPostObject: IInitialValues = {
      isSmsActive: value.isSmsActive,
      isEmailActive: value.isEmailActive,
      isTicketActive: value.isTicketActive,
    };

    notificationMutation.mutate(notificationSettingPostObject, {
      onSuccess: (val: any) => {
        showToast(["با موفقیت انجام شد!"], ToastTypes.success);
        const newEvent = { ...refetchEvent };
        newEvent.notificationHistoryList = !newEvent.notificationHistoryList;
        setRefetchEvent(newEvent);
      },
    });
  };

  useEffect(() => {
    if (data) {
      try {
        const result = data.data.result;

        setInitialValues({
          isSmsActive: result.isSmsActive,
          isEmailActive: result.isEmailActive,
          isTicketActive: result.isTicketActive,
        });
      } catch (e) {}
    }
  }, [isSuccess, data]);

  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle>تنظیمات اعلان ها</CardTitle>
        </CardHeader>
        <CardBody>
          <Formik
            initialValues={initialValues}
            validationSchema={NotificationSettingValidate}
            onSubmit={onSubmit}
            enableReinitialize={true}
          >
            {({ values, setFieldValue }) => {
              return (
                <>
                  {isFetching ? (
                    <FallBackSpinner setHeight={300} />
                  ) : (
                    <>
                      <Form>
                        <Row>
                          <Col md="4">
                            <Toggle
                              id="isSmsActive"
                              name="isSmsActive"
                              placeholder="اس ام اس"
                              lableText="فعال سازی ارسال اعلان از طریق اس ام اس"
                            />
                          </Col>
                          <Col md="4">
                            <Toggle
                              id="isEmailActive"
                              name="isEmailActive"
                              placeholder="ایمیل"
                              lableText="فعال سازی ارسال اعلان از طریق ایمیل"
                            />
                          </Col>
                          <Col md="4">
                            <Toggle
                              id="isTicketActive"
                              name="isTicketActive"
                              placeholder="تیکت"
                              lableText="فعال سازی ارسال اعلان از طریق تیکت"
                            />
                          </Col>
                        </Row>
                        <Row>
                          <Col>
                            <SubmitButton
                              isLoading={notificationMutation.isLoading}
                              initialValue={initialValues}
                              schema={NotificationSettingValidate}
                              values={values}
                              isDisabled={false}
                            />
                          </Col>
                        </Row>
                      </Form>
                    </>
                  )}
                </>
              );
            }}
          </Formik>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>تاریخچه</CardTitle>
        </CardHeader>
        <CardBody>
          <List />
        </CardBody>
      </Card>
    </Fragment>
  );
};

export { NotificationContainer };
