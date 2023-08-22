import React, { useState } from "react";
import { Button, Spinner } from "reactstrap";
import { ToastTypes } from "../../../../../core/enums";
import { login } from "../../../../../core/services/authentication/authentication.service";
import { showToast } from "../../../../../core/utils";


export interface IPropsType {
  isLoading: boolean;
}

const RegisterFormButton: React.FC<IPropsType> = ({ isLoading }) => {
  const [loading, setLoading] = useState(false);

  const redirectToLogin = () => {
    setLoading(true);
    showToast(["در حال انتقال به صفحه ورود"], ToastTypes.info);
    login();     
  };

  return (
    <div className="d-flex justify-content-start">
      <Button
        className="d-flex align-items-center justify-content-center"
        color="primary"
        type="submit"
        disabled={isLoading}
      >
        {isLoading && <Spinner color="white" size="sm" />}
        <span className="ml-50">ثبت نام</span>
      </Button>

      <Button
        color="primary"
        outline
        className="ml-1 d-flex justify-content-center align-items-center"
        type="button"
        onClick={redirectToLogin}
        disabled={loading}
      >
        {loading && <Spinner color="pureple" size="sm" />}
        <span className={`ml-50`}> ورود </span>
      </Button>
    </div>
  );
};

export { RegisterFormButton };
