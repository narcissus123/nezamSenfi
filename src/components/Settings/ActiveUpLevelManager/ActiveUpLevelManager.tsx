import { Form, Formik } from "formik";
import React, { FC, useContext, useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { SubmitButton, Toggle } from "../../common/Form";
import { FallBackSpinner } from "../../common/Spinner/FallBackSpinner/FallbackSpinner";
import {
  useGetActiveUplevelManager,
  usePostSetActiveUplevelManager,
} from "../../../core/services/api";
import { showToast } from "../../../core/utils";
import { ToastTypes } from "../../../core/enums";
import { List } from "./List/List";
import { refetchContext } from "../../../core/utils/context/EventContext";

interface IInitialValues {
  countyUnionIsActive: boolean;
  countyGuildRoomIsActive: boolean;
  provinceGuildRoomIsActive: boolean;
}

const ActiveUpLevelManager: FC = () => {
  const [initialValues, setInitialValues] = useState<IInitialValues>({
    countyUnionIsActive: false,
    countyGuildRoomIsActive: false,
    provinceGuildRoomIsActive: false,
  });

  const setActiveUpLevel = usePostSetActiveUplevelManager();
  const getActiveUpLevel = useGetActiveUplevelManager();
  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);


  useEffect(() => {
    if (getActiveUpLevel.isSuccess) {
      const result = getActiveUpLevel.data.data.result;
      setInitialValues(result);
    }
  }, [getActiveUpLevel.isSuccess]);

  const onSubmit = (value: any) => {
    setActiveUpLevel.mutate(value, {
      onSuccess: () => {
        showToast(["با موفقیت ثبت گردید"], ToastTypes.success);
        const newEvent = { ...refetchEvent };
        newEvent.activeUpManagerHistoryList = !newEvent.activeUpManagerHistoryList;
        setRefetchEvent(newEvent);
      },
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>تنظیمات تاییدیه مدیر سطح بالاتر در جذب و پذیرش</CardTitle>
        </CardHeader>
        <CardBody>
          {getActiveUpLevel.isLoading ? (
            <FallBackSpinner />
          ) : (
            <Formik
              initialValues={initialValues}
              onSubmit={onSubmit}
              enableReinitialize={true}
            >
              {({ values, setFieldValue }) => {
                return (
                  <>
                    {false ? (
                      <FallBackSpinner setHeight={300} />
                    ) : (
                      <>
                        <Form>
                          <Row>
                            {/* <Col md="6">
                            <Toggle
                              id="countyUnionIsActive"
                              name="countyUnionIsActive"
                              placeholder="فعال سازی تایید مدیر اتحادیه"
                              lableText="فعال سازی تایید مدیر اتحادیه"
                            />
                          </Col> */}
                            <Col md="6">
                              <Toggle
                                id="countyUnionIsActive"
                                name="countyUnionIsActive"
                                placeholder="فعال سازی تایید مدیر شهرستانی برای درخواست شغل اتحادیه"
                                lableText="فعال سازی تایید مدیر شهرستانی برای درخواست شغل اتحادیه"
                              />
                            </Col>
                            <Col md="6">
                              <Toggle
                                id="countyGuildRoomIsActive"
                                name="countyGuildRoomIsActive"
                                placeholder="فعال سازی تایید مدیر استانی برای درخواست شغل شهرستانی"
                                lableText="فعال سازی تایید مدیر استانی برای درخواست شغل شهرستانی"
                              />
                            </Col>
                            <Col md="6">
                              <Toggle
                                id="provinceGuildRoomIsActive"
                                name="provinceGuildRoomIsActive"
                                placeholder="فعال سازی تایید مدیر کشوری برای درخواست شغل استانی"
                                lableText="فعال سازی تایید مدیر کشوری برای درخواست شغل استانی"
                              />
                            </Col>
                          </Row>

                          <Row>
                            <Col>
                              <SubmitButton
                                isLoading={setActiveUpLevel.isLoading}
                                initialValue={initialValues}
                                // schema={NotificationSettingValidate}
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
          )}
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
    </>
  );
};

export { ActiveUpLevelManager };
