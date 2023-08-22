import { Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import {
  Alert,
  Button,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
} from "reactstrap";
import { ToastTypes } from "../../../../../../../../core/enums";
import { useGetUserByNationalCode } from "../../../../../../../../core/services/api";
import {
  isLimitedNumberRegex,
  showToast,
} from "../../../../../../../../core/utils";
import * as Yup from "yup";
import { InputGroupSearch } from "../../../../../../../common/Form/InputComponents/InputGroupSearch/InputGroupSearch";
import { SubmitButton } from "../../../../../../../common/Form";

interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  // hasSecretariat: boolean;
  useMutate: any;
  //getUserQuery: any;
}

const ChangeSecretariat: FC<IPropTypes> = ({
  isOpen,
  toggleModal,
  // hasSecretariat,
  useMutate,
  // getUserQuery,
}) => {
  const validate = Yup.object().shape({
    nationalId: Yup.string()
      .matches(isLimitedNumberRegex(10, 10), "کد ملی صحیح نیست")
      .required("کد ملی نباید خالی باشد")
      .typeError("لطفا کد ملی را درست وارد کنید"),
  });

  const [initialValue, setInitialValue] = useState<any>({ nationalId: "" });
  const [userInfo, setUserInfo] = useState<any>(null);
  const getUserByNationalIdMutation = useGetUserByNationalCode();
  const setUser = useMutate();
  const { id }: any = useParams();

  // const getUser = getUserQuery();

  // useEffect(() => {
  //   if (isOpen) {
  //     getUser.mutate(id);
  //   }
  // }, [isOpen]);

  // useEffect(() => {
  //   if (getUser.isSuccess) {
  //     const result = getUser.data.data.result;
  //     if (result) {
  //       const userObj = {
  //         nationalCode: result.username,
  //         id: result.userId,
  //         fullName: `${result.firstName} ${result.lastName}`,
  //       };
  //       setUserInfo(userObj);
  //       setInitialValue({ nationalId: result.username });
  //     }
  //   }
  // }, [getUser.isSuccess]);

  const onSearchUser = (userSearch: string) => {
    setUserInfo(null);
    if (userSearch)
      getUserByNationalIdMutation.mutate(userSearch, {
        onSuccess: (val: any) => {
          if (val.data && val.data.result) {
            const user = val.data.result;
            const userObj = {
              nationalCode: user.nationalCode,
              id: user.id,
              fullName: `${user.name} ${user.lastName}`,
              email: user.email,
            };
            setUserInfo(userObj);
          }
        },
        onError: (err: any) => {
          //showToast(['مشکلی پیش آمد!'],'error')
        },
      });
    else showToast(["لطفا کد ملی کاربر را وارد کنید"], ToastTypes.error);
  };

  const onSubmit = (values: any) => {
    if (!values.nationalId) {
      return showToast(["لطفا کد ملی را وارد کنید"], ToastTypes.error);
    }

    if (userInfo) {
      setUser.mutate(
        {
          licenseRequestId: id,
          userId: userInfo.id,
        },
        {
          onSuccess: () => {
            showToast(["با موفقیت انجام شد"], ToastTypes.success);
            toggleModal();
          },
        }
      );
    } else {
      getUserByNationalIdMutation.mutate(values.nationalId, {
        onSuccess: (val: any) => {
          if (val.data && val.data.result) {
            const user = val.data.result;
            setUser.mutate(
              {
                licenseRequestId: id,
                userId: user.id,
              },
              {
                onSuccess: () => {
                  showToast(["با موفقیت انجام شد"], ToastTypes.success);
                  toggleModal();
                },
              }
            );
          }
        },
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggleModal}
      unmountOnClose={true}
      className="modal-dialog-centered"
    >
      <ModalHeader toggle={toggleModal}>تغییر دبیرخانه</ModalHeader>

      <Formik
        initialValues={initialValue}
        onSubmit={onSubmit}
        enableReinitialize
        validationSchema={validate}
      >
        {({ values, handleChange }) => (
          <>
            <Form>
              <ModalBody>
                <FormGroup>
                  <InputGroupSearch
                    handleChange={handleChange}
                    name="nationalId"
                    placeholder="لطفا کد ملی کاربر را وارد کنید"
                    value={values.nationalId}
                    loading={getUserByNationalIdMutation.isLoading}
                    significant
                    lableText="کد ملی"
                    onSearch={() => onSearchUser(values.nationalId)}
                  />
                </FormGroup>
                <FormGroup>
                  {userInfo && (
                    <Alert color="success">
                      <p>اطلاعات کاربر:</p>
                      <p>نام و نام خانوادگی : {userInfo.fullName} </p>
                      {userInfo.email && <p>ایمیل : {userInfo.email} </p>}
                      {!userInfo.email && (
                        <p>کد ملی: {userInfo.nationalCode}</p>
                      )}
                      <p>
                        <Link
                          target="_blank"
                          to={`/UserList/RealUsersList/${userInfo.id}`}
                        >
                          <Button size="md" color="warning" onClick={() => {}}>
                            نمایش جزئیات کاربر &nbsp;
                          </Button>
                        </Link>
                      </p>
                    </Alert>
                  )}
                </FormGroup>
              </ModalBody>
              <ModalFooter className="justify-content-start">
                <SubmitButton
                  isLoading={setUser.isLoading}
                  btnText="ثبت"
                  clearable
                  clearableDisable={setUser.isLoading}
                  clearableTxt="انصراف"
                  onClear={toggleModal}
                />
              </ModalFooter>
            </Form>
          </>
        )}
      </Formik>
    </Modal>
  );
};

export { ChangeSecretariat };
