import React from "react";
import { VerificationForm } from "../../../../components/Authentication/RegisterContainer/VerificationContainer/VerificationForm";
import { VerificationWrapper } from "../../../../components/Authentication/RegisterContainer/VerificationContainer/VerificationWrapper";

const VerificationCode: React.FC = () => {
  return (
    <VerificationWrapper>
      <VerificationForm />
    </VerificationWrapper>
  );
};

export { VerificationCode };
