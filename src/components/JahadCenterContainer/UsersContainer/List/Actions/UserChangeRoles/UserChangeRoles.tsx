import { Form, Formik } from "formik";
import React, { FC, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Select from "react-select";
import * as Yup from "yup";
import {
  Alert,
  Button,
  Col,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "reactstrap";
import { UserRolesPersian } from "../../../../../../core/enums";
import { UserRoleOfJahadCenter } from "../../../../../../core/enums/user-role-of-jahad.enums";
import {
  useGetUserRolsInJahadCenter,
  useSetUserJahadCenter,
} from "../../../../../../core/services/api/jahad-center.api";
import { refetchContext } from "../../../../../../core/utils/context/EventContext";
import { fullOption, showToast } from "../../../../../../core/utils";
import { InpuLable, MultiSelectOption } from "../../../../../common/Form";

interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  currentUser: number;
  userNationalCode: any;
}

const UserChangeRoles: FC<IPropTypes> = ({
  isOpen,
  toggleModal,
  currentUser,
  userNationalCode,
}) => {
  const getUserRolesMutation = useGetUserRolsInJahadCenter();
  const { id } = useParams<{ id: string }>();

  const [servicesId, setServicesId] = React.useState<any>(null);
  const [initialValue, setInitialValue] = useState<any>({
    roles: null,
  });

  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

  const validate = Yup.object().shape({
    roles: Yup.array()
      .of(
        Yup.object().shape({
          value: Yup.number(),
          label: Yup.string().nullable(),
        })
      )
      .required("لطفا یکی از گزینه ها را انتخاب کنید!")
      .typeError("لطفا یکی از گزینه ها را انتخاب کنید!")
  });

  const noChangeAllServiceState = [
    {
      label: " نقش را انتخاب کنید",
      options: [
        {
          value: UserRoleOfJahadCenter.JahadCenterExpert,
          label: UserRolesPersian.JahadCenterExpert,
        },
        {
          value: UserRoleOfJahadCenter.JahadCenterManager,
          label: UserRolesPersian.JahadCenterManager,
        },
      ],
    },
  ];

  const [AllServiceState, setAllServiceState] = React.useState([
    {
      label: " نقش را انتخاب کنید",
      options: [
        {
          value: UserRoleOfJahadCenter.JahadCenterExpert,
          label: UserRolesPersian.JahadCenterExpert,
        },
        {
          value: UserRoleOfJahadCenter.JahadCenterManager,
          label: UserRolesPersian.JahadCenterManager,
        },
      ],
    },
  ]);

  const handleOnchange = (e: any, setFieldValue: any) => {
    setFieldValue("roles", e);
    setServicesId(e);
  };

  useEffect(() => {
    if (currentUser && isOpen) {
      getUserRolesMutation.mutate(
        { userId: currentUser, jahadCenterId: parseInt(id) },
        {
          onSuccess: (val: any) => {
            if (val.data && val.data.result) {
              let newSelectedRoles: any = [];

              val.data.result.allowedRoles.forEach((el: any) => {
                newSelectedRoles.push(fullOption(el, noChangeAllServiceState));
              });

              setInitialValue({
                roles: newSelectedRoles,
              });
              setServicesId(newSelectedRoles);
            }
          },
        }
      );
    }
  }, [currentUser, isOpen]);

  const postCreateUserCountyGuildRoomMutation = useSetUserJahadCenter();

  const onSubmit = (value: any) => {
    let ids: any = [];

    value.roles.forEach((el: any) => {
      ids.push(el.value);
    });

    const obj: any = {
      userId: currentUser,
      allowedRoles: ids,
      jahadCenterId: parseInt(id),
    };

    postCreateUserCountyGuildRoomMutation.mutate(obj, {
      onSuccess: (val: any) => {
        showToast(["با موفقیت انجام شد!"], "success");
        const newEvent = { ...refetchEvent };
        newEvent.jahadCenterUsers = !newEvent.jahadCenterUsers;
        setRefetchEvent(newEvent);
        toggleModal();
      },
    });
  };

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggleModal}
      unmountOnClose={true}
      className="modal-dialog-centered"
    >
      <ModalHeader toggle={toggleModal}>تغییر نقش کاربر</ModalHeader>
      <ModalBody>
        <Formik
          enableReinitialize
          initialValues={initialValue}
          validationSchema={validate}
          onSubmit={onSubmit}
        >
          {({ handleSubmit, setFieldTouched, setFieldValue }) => {
            return (
              <React.Fragment>
                <Form>
                  <ModalBody>
                    <Alert color="info">نام کاربری: {userNationalCode} </Alert>
                    <MultiSelectOption
                      labelText="نقش ها"
                      name="roles"
                      placeHolder="انتخاب کنید..."
                      onChange={(e) => handleOnchange(e, setFieldValue)}
                      significant={true}
                      options={AllServiceState}
                      hasLabel={true}
                      isDisabled={getUserRolesMutation.isLoading}
                      isLoading={getUserRolesMutation.isLoading}
                    />
                  </ModalBody>
                  <ModalFooter>
                    <Col className="d-flex align-items-center justify-content-left">
                      <Button
                        className="d-flex align-items-center justify-content-center"
                        color="primary"
                        style={{ marginLeft: "10px" }}
                        onClick={(val: any) => handleSubmit(val)}
                      >
                        {postCreateUserCountyGuildRoomMutation.isLoading && (
                          <Spinner color="white" size="sm" />
                        )}
                        <span className="ml-50">ذخیره</span>
                      </Button>
                      <Button
                        className="d-flex align-items-center justify-content-center"
                        color="danger"
                        outline
                        onClick={() => toggleModal()}
                      >
                        {false && <Spinner color="white" size="sm" />}
                        <span className="ml-50">انصراف</span>
                      </Button>
                    </Col>
                  </ModalFooter>
                </Form>
              </React.Fragment>
            );
          }}
        </Formik>
      </ModalBody>
    </Modal>
  );
};

export { UserChangeRoles };
