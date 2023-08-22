import React, { FC } from "react";
import {
  Button,
  FormGroup,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "reactstrap";
import { TextInput } from "../../../../../common/Form";
import { TextArea } from "../../../../../common/Form";
import { Formik } from "formik";

interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  values: any;
}

const CountyDetails: FC<IPropTypes> = ({ isOpen, toggleModal, values }) => {
  return (
    <Modal
      isOpen={isOpen}
      toggle={toggleModal}
      unmountOnClose={true}
      className="modal-dialog-centered"
    >
      <ModalHeader toggle={toggleModal}>ویرایش اتحادیه</ModalHeader>
      <ModalBody>
        <Formik
          initialValues={{
            name: values.title,
            county: values.countyTitle,
            desc: values.description,
          }}
          onSubmit={() => {}}
        >
          <FormGroup>
            <TextInput
              lableText="نام صنف"
              hasLabel
              disabled
              name="name"
              placeholder="نام صنف"
            />

            <TextInput
              lableText="شهرستان"
              hasLabel
              disabled
              name="county"
              placeholder="نام صنف"
            />

            <TextArea
              lableText="توضیحات"
              placeholder="توضیحات صنف"
              name="desc"
              disabled
              value={values.description}
            />
          </FormGroup>
        </Formik>
      </ModalBody>

      <ModalFooter>
        <Button
          className="d-flex align-items-center justify-content-center"
          color="primary"
          outline
          onClick={() => toggleModal()}
        >
          {false && <Spinner color="white" size="sm" />}
          <span className="ml-50">بازگشت</span>
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export { CountyDetails };
