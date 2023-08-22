import React from "react";
import { NaturalRegisterForm } from "../../../../components/Authentication/RegisterContainer/NaturalRegisterForm/NaturalRegisterForm";
import { RegisterWrapper } from "../../../../components/Authentication/RegisterContainer/RegisterWrapper/RegisterWrapper";

const RealUserRegister: React.FC = () => {
  return (
    <RegisterWrapper>
      <NaturalRegisterForm />
    </RegisterWrapper>
  );
};

export { RealUserRegister };
