import { Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
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
} from "reactstrap";
import { InpuLable, MultiSelectOption } from "../../../../../../common/Form";
import { fullOption } from "../../../../../../../core/utils";

interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  currentUser: number;
  userNationalCode: any;
  roles: any;
  setTableData: any;
  AllServiceState: any;
  noChangeAllServiceState: any;
}

const UserChangeRoles: FC<IPropTypes> = ({
  isOpen,
  toggleModal,
  currentUser,
  userNationalCode,
  roles,
  setTableData,
  AllServiceState,
  noChangeAllServiceState,
}) => {
  const [servicesId, setServicesId] = React.useState<any>([]);
  const [initialValue, setInitialValue] = useState<any>({
    roles: [],
  });

  const validate = Yup.object().shape({
    roles: Yup.array()
      .of(
        Yup.object().shape({
          value: Yup.number(),
          label: Yup.string().nullable(),
        })
      )
      .typeError("لفطا یکی از گزینه ها را انتخاب کنید!")
      .required("لطفا یکی از گزینه ها را انتخاب کنید!")
  });

  const handleOnchange = (e: any, setFieldValue: any) => {
    setFieldValue("roles", e);
    setServicesId(e);
  };

  useEffect(() => {
    if (roles && isOpen) {
      let newSelectedRoles: any = [];
      roles.forEach((el: any) => {
        newSelectedRoles.push(fullOption(el, noChangeAllServiceState));
      });
      setInitialValue({
        roles: newSelectedRoles,
      });
      setServicesId(newSelectedRoles);
    }
  }, [roles, isOpen, currentUser]);

  const onSubmit = (value: any) => {
    let selectedRoles: any = [];
    servicesId.forEach((row: any) => {
      selectedRoles.push(row.value);
    });

    setTableData((prev: any) => {
      let newData = [...prev];
      let row = newData.findIndex((x: any) => x.id === currentUser);
      newData[row].role = selectedRoles;
      return newData;
    });

    toggleModal();
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
          {({
            values,
            errors,
            handleChange,
            handleSubmit,
            setFieldTouched,
            setFieldValue,
          }) => {
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
                        <span className="ml-50">ذخیره</span>
                      </Button>
                      <Button
                        className="d-flex align-items-center justify-content-center"
                        color="danger"
                        outline
                        onClick={() => toggleModal()}
                      >
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
