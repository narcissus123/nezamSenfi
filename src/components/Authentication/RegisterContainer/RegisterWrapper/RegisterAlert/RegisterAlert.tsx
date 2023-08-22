import React from "react";
import { Row, Col, Alert } from "reactstrap";
import { useLocation } from "react-router-dom";
import { IsSameUrl } from "../../../../../core/utils";
import { useRegisterContext } from "../../RegisterContainer";

const RegisterAlert: React.FC = () => {
  const location = useLocation();
  const { userInfoRegister } = useRegisterContext();

  return (
    <Row>
      <Col
        sm="12"
        xl="12"
        lg="12"
        md="12"
        className={`d-flex justify-content-center`}
      >
        {IsSameUrl(location.pathname, "/Register/LegalRegister") && (
          <div className="bg-white w-100 rounded">
            <Alert color="info" className="w-100 m-0 text-center">
              تکمیل اطلاعات ثبت نام
            </Alert>
          </div>
        )}
        {IsSameUrl(location.pathname, "/Register/NaturalRegister") && (
          <div className="bg-white w-100 rounded">
            <Alert color="info" className="w-100 m-0 text-center">
              تکمیل اطلاعات ثبت نام
            </Alert>
          </div>
        )}
        {IsSameUrl(location.pathname, "/Register/SuccessRegister") && (
          <div className="bg-white w-100 rounded">
            <Alert color="success" className="w-100 m-0 text-center">
              <div className="alert-heading">
                {" "}
                ثبت نام شما با موفقیت انجام شد{" "}
              </div>
              نام کاربری شما{" "}
              {userInfoRegister.userType === 1
                ? userInfoRegister.nationalCode
                : userInfoRegister.nationalId}
            </Alert>
          </div>
        )}
      </Col>
    </Row>
  );
};

export { RegisterAlert };
