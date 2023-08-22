import { Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useTimer } from "react-timer-hook";
import {
  Alert,
  Button,
  Col,
  FormGroup,
  ModalBody,
  ModalFooter,
  Spinner,
} from "reactstrap";
import * as Yup from "yup";
import {
  useChangePhoneNumberConfirm,
  useUserChangeNumber,
} from "../../../../core/services/api";
import { useGlobalState } from "../../../../core/utils/context/GlobalContext";

import { ObjectPersianToEnglish } from "../../../../core/utils";
import { isLimitedNumberRegex } from "../../../../core/utils";
import { TextInput } from "../../../common/Form";
import { Timer } from "../../../common/Timer/Timer";

interface IPropTypes {
  cancell: () => void;
  phoneNumber: string;
}

const CallTimer: React.FC<IPropTypes> = ({ cancell, phoneNumber }) => {
  const validate = Yup.object().shape({
    code: Yup.string()
      .matches(isLimitedNumberRegex(6, 6), "بايد شش عدد وارد شود")
      .required("کد پيامک شده را وارد کنيد"),
  });

  const [newVerify, setNewVerify] = useState("");

  const stopWatchOffset = new Date();
  const startTime = stopWatchOffset.setSeconds(
    stopWatchOffset.getSeconds() + 300
  );

  const { seconds, minutes, isRunning, restart, pause } = useTimer({
    expiryTimestamp: startTime,
  });

  const setNewTime = () => {
    const stopWatchOffset = new Date();
    const startTime = stopWatchOffset.setSeconds(
      stopWatchOffset.getSeconds() + 300
    );
    restart(startTime);
  };

  const confirmCode = useChangePhoneNumberConfirm();

  const { phoneNumber: phoneState } = useGlobalState();
  const changePhoneReq = useUserChangeNumber();

  const onSubmit = async (value: any) => {
    value = ObjectPersianToEnglish(value);

    const obj = {
      cellphone: phoneNumber,
      verificationCode: value.code,
    };

    confirmCode.mutate(obj);
  };

  useEffect(() => {
    if (confirmCode.data && confirmCode.data.data) {
      phoneState[1](phoneNumber);
      cancell();
    }
    return () => {};
  }, [confirmCode.isSuccess]);

  const requestAgainCode = () => {
    changePhoneReq.mutate(phoneNumber);
  };

  useEffect(() => {
    if (changePhoneReq.data && changePhoneReq.data.data) {
      setNewVerify(changePhoneReq.data.data.result);
      setNewTime();
    }
    return () => {};
  }, [changePhoneReq.isSuccess]);

  return (
    <Formik
      initialValues={{
        code: "",
      }}
      validationSchema={validate}
      onSubmit={(value) => onSubmit(value)}
    >
      {({ values, errors, handleChange, touched, handleSubmit }) => {
        return (
          <div>
            <ModalBody>
              <FormGroup>
                <Alert color="info">
                  <div style={{ textAlign: "center" }}>ورود کد پيامک شده</div>
                </Alert>
                <Timer seconds={seconds} minutes={minutes} />

                <TextInput
                  name="code"
                  placeholder="کد پيامک شده"
                  lableText="کد پيامک شده "
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Col className="d-flex justify-content-between">
                {isRunning ? (
                  <Button
                    color="success"
                    className="d-flex align-items-center justify-content-center"
                    onClick={(val: any) => handleSubmit(val)}
                  >
                    {confirmCode.isLoading && (
                      <Spinner color="white" size="sm" />
                    )}
                    <span className="ml-50">تایید</span>
                  </Button>
                ) : (
                  <Button
                    className="d-flex align-items-center justify-content-center"
                    color="success"
                    onClick={requestAgainCode}
                  >
                    {changePhoneReq.isLoading && (
                      <Spinner color="white" size="sm" />
                    )}
                    <span className="ml-50">ارسال مجدد کد</span>
                  </Button>
                )}
                <Button
                  color="danger"
                  onClick={() => {
                    pause();
                    cancell();
                  }}
                >
                  انصراف
                </Button>
              </Col>
            </ModalFooter>
          </div>
        );
      }}
    </Formik>
  );
};

export { CallTimer };
