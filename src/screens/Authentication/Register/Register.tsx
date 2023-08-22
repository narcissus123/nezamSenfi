import React from "react";
import { RegisterForm } from "../../../components/Authentication/RegisterContainer/RegisterForm";
import { RegisterWrapper } from "../../../components/Authentication/RegisterContainer/RegisterWrapper";

import "../../../assets/scss/pages/authentication.scss";

const Register: React.FC = () => {
  return (
    <RegisterWrapper>
      <RegisterForm />
    </RegisterWrapper>
  );
};

export { Register };
