import React from "react";

import { Formik, Form } from "formik";
import { Col, Modal, Row, ModalBody, ModalHeader } from "reactstrap";

interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  backdrop: boolean;
  currentId: number;
  data: any;
  setFetchRefresh: () => void;
}

const EditModal: React.FC<IPropTypes> = ({
  isOpen,
  toggleModal,
  backdrop,
  currentId,
  data,
  setFetchRefresh,
}) => {
  return (
    <>
      <Modal
        isOpen={isOpen}
        toggle={toggleModal}
        className="modal-dialog-centered"
        backdrop={backdrop}
      >
        <ModalHeader toggle={toggleModal}>ویرایش</ModalHeader>
        <ModalBody>
          <Formik
            enableReinitialize={true}
            initialValues={{}}
            onSubmit={(value) => {}}
          >
            {({
              values,
              errors,
              handleChange,
              touched,
              getFieldProps,
              setFieldValue,
            }) => {
              return (
                <Form>
                  <>
                    {/* <Row>
                       <Col md="12">
                        <BasicSelectOption
                          isLoading={getAllProvinceMutation.isLoading}
                          significant={true}
                          name="provinceName"
                          placeHolder="انتخاب استان ..."
                          data={provinceList}
                          lableText="انتخاب استان"
                          onChange={(opt, e) => {
                            setFieldValue("provinceName", {
                              value: opt.value,
                              label: opt.label,
                            });
                            setFieldValue(
                              "fakeName",
                              `اتاق صنفی برای ${opt.label}`
                            );
                          }}
                        />
                      </Col>
                    </Row> */}
                    <Row>
                      <Col md="12"></Col>
                    </Row>
                    <Row>
                      <Col md="12"></Col>
                    </Row>
                    <Row>
                      <Col></Col>
                    </Row>
                  </>
                </Form>
              );
            }}
          </Formik>
        </ModalBody>
      </Modal>
    </>
  );
};

export { EditModal };
