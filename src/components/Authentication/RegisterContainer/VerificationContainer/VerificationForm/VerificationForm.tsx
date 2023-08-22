import React from "react";
import { Formik, Form } from "formik";
import { useTimer } from "react-timer-hook";

import { TextInput } from "../../../../common/Form";
import { Timer } from "../../../../common/Timer/Timer";
import { verificationValidation } from "../../../../../core/validations/verify-code-validation";
import { useRegisterContext } from "../../RegisterContainer";
import { UseVerificationCode } from "../../../../../core/services/api";
import { VerificationFormButton } from "./VerificationFormButton";
import { ObjectPersianToEnglish } from "../../../../../core/utils";


const initialValue = { verificationCode: "" };

const VerificationForm: React.FC = () => {
  const stopWatchOffset = new Date();
  const startTime = stopWatchOffset.setSeconds(
    stopWatchOffset.getSeconds() + 300
  );

  const { userInfoRegister } = useRegisterContext();
  const verificationCodeMutation = UseVerificationCode();

  const { seconds, minutes, isRunning, restart } = useTimer({
    expiryTimestamp: startTime,
  });

  const onSubmit = (value: any) => {
    value = ObjectPersianToEnglish(value);
    verificationCodeMutation.mutate({
      ...value,
      cellphone: userInfoRegister.cellphone,
    });
  };

  return (
    <div className="p-2">
      <Timer seconds={seconds} minutes={minutes} />
      <Formik
        initialValues={initialValue}
        validationSchema={verificationValidation}
        onSubmit={onSubmit}
      >
        {(props) => (
          <Form>
            <TextInput
              lableText="کد پیامک شده"
              name="verificationCode"
              placeholder="کد تایید"
              significant
            />

            <VerificationFormButton
              isLoading={verificationCodeMutation.isLoading}
              isRunning={isRunning}
              reStart={restart}
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export { VerificationForm };
