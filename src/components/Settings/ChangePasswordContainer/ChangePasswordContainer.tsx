import { Form, Formik } from "formik";
import React from "react";
import { Card, CardBody, CardHeader, CardTitle, Col, Row,} from "reactstrap";
import { ToastTypes } from "../../../core/enums";
import { useChangePassword } from "../../../core/services/api/change-user-identity-request.api";
import { showToast } from "../../../core/utils";
import { ChangePasswordValidate } from "../../../core/validations/change-password.validation";
import { PasswordInput, SubmitButton } from "../../common/Form";

const ChangePasswordContainer = () => {
  const setMutation = useChangePassword();

  const onSubmit = (value: any) => {
    const data = {
      currentPassword: value.oldPassword,
      newPassword: value.password,
      confirmPassword: value.repeatPassword,
    };

    setMutation.mutate(data, {
      onSuccess: (val: any) => {
        showToast(["رمز عبور با موفقیت تغییر یافت."], ToastTypes.success);
      },
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle> تغییر رمز عبور </CardTitle>
        </CardHeader>
        <CardBody>
          <Formik
            initialValues={{
              oldPassword: "",
              password: "",
              repeatPassword: "",
            }}
            onSubmit={onSubmit}
            validationSchema={ChangePasswordValidate}
            enableReinitialize={true}
          >
            <Form>
              <Row>
                <Col md="4">
                  <PasswordInput
                    lableText="کلمه عبور فعلی"
                    name="oldPassword"
                    placeholder="کلمه عبور"
                    significant
                  />
                </Col>
                <Col md="4">
                  <PasswordInput
                    lableText="کلمه عبور جدید"
                    name="password"
                    placeholder="کلمه عبور"
                    significant
                  />
                </Col>
                <Col md="4">
                  <PasswordInput
                    lableText="تکرار کلمه عبور جدید"
                    name="repeatPassword"
                    placeholder=" تکرار کلمه عبور"
                    significant
                  />
                </Col>
              </Row>
              {/* Pass121314@ */}
              <Row>
                <Col>
                  <SubmitButton isLoading={setMutation.isLoading} />
                </Col>
              </Row>
            </Form>
          </Formik>
        </CardBody>
      </Card>
    </>
  );
};

export { ChangePasswordContainer };
