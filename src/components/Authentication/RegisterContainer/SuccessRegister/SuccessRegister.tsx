import React, { useState } from "react";
import { RegisterWrapper } from "../RegisterWrapper";
import { Button } from "reactstrap";
import { ToastTypes } from "../../../../core/enums";
import { showToast } from "../../../../core/utils";
import { login } from "../../../../core/services/authentication/authentication.service";
import { Spinner } from "reactstrap";

const SuccessRegister: React.FC = () => {
  const [loading, setLoading] = useState(false);

  const redirectToLogin = () => {
    setLoading(true);
    showToast(["در حال انتقال به صفحه ورود"], ToastTypes.info);
    login();
  };

  return (
    <>
      <RegisterWrapper>
        <div className="d-flex justify-content-start my-3">
          <Button
            color="primary"
            outline
            className="ml-2 d-flex justify-content-center align-items-center"
            type="button"
            onClick={redirectToLogin}
            disabled={loading}
          >
            {loading && <Spinner color="pureple" size="sm" />}
            <span className={`ml-50`}> ورود </span>
          </Button>
        </div>
      </RegisterWrapper>
    </>
  );
};

export default SuccessRegister;
