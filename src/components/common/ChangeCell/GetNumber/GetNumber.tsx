import { Formik } from "formik";
import React, { useEffect } from "react";
import { Button, FormGroup, ModalBody, ModalFooter, Spinner } from "reactstrap";
import * as Yup from "yup";
import { useUserChangeNumber } from "../../../../core/services/api";

import { ObjectPersianToEnglish } from "../../../../core/utils";
import { checkNumber } from "../../../../core/validations/register-validation";
import { TextInput } from "../../../common/Form";

interface IPropTypes {
  changeNumber: () => void;
  setPhone: (val: string) => void;
}

const GetNumber: React.FC<IPropTypes> = ({ changeNumber, setPhone }) => {
  const validate = Yup.object().shape({
    phone: Yup.string()
      .test("cellphone", "شماره تلفن وارد شده نامعتبر است", (value) =>
        checkNumber(value)
      )
      .required("شماره موبايل جديد خود را ثبت کنید"),
  });
  const changePhoneReq = useUserChangeNumber();

  const onSubmit = async (value: any) => {
    value = ObjectPersianToEnglish(value);
    setPhone(value.phone);
    changePhoneReq.mutate(value.phone);
  };

  useEffect(() => {
    if (changePhoneReq.data && changePhoneReq.data.data) {
      changeNumber();
    }
    return () => {};
  }, [changePhoneReq.isSuccess]);

  return (
    <Formik
      initialValues={{
        phone: "",
      }}
      validationSchema={validate}
      onSubmit={(value) => onSubmit(value)}
    >
      {({ values, errors, handleChange, touched, handleSubmit, setErrors }) => {
        if (changePhoneReq.isError && !errors.phone) {
          try {
            setErrors({ phone: "شماره موبایل تکراری است" });
          } catch (error) {}
        }

        return (
          <React.Fragment>
            <ModalBody>
              <FormGroup>
                <TextInput
                  name="phone"
                  type="tell"
                  placeholder="مثلا 09111231234"
                  lableText="شماره: "
                />
              </FormGroup>
            </ModalBody>
            <ModalFooter>
              <Button
                className="d-flex align-items-center justify-content-center"
                color="primary"
                onClick={(val: any) => handleSubmit(val)}
              >
                {changePhoneReq.isLoading && (
                  <Spinner color="white" size="sm" />
                )}
                <span className="ml-50"> دريافت کد</span>
              </Button>
            </ModalFooter>
          </React.Fragment>
        );
      }}
    </Formik>
  );
};

export { GetNumber };
