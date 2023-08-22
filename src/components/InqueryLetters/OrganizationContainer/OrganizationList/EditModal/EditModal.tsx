import React, { useContext, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { Col, Modal, Row, ModalBody, ModalHeader } from "reactstrap";
import { showToast } from "../../../../../core/utils";
import { AddOrganizationValide } from "../../../../../core/validations/organization-add.validations";
import { SubmitButton, TextArea, TextInput } from "../../../../common/Form";
import { usePostEditOrganization } from "../../../../../core/services/api";
import { refetchContext } from "../../../../../core/utils/context/EventContext";


interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  backdrop: boolean;
  currentId: number;
  data: any;
}

const EditModal: React.FC<IPropTypes> = ({
  isOpen,
  toggleModal,
  backdrop,
  currentId,
  data,
}) => {

  const [ initialValues , setInitialValues] = useState<any>({
    id:0,
    title:"",
    description:""
  })

  const editMutation = usePostEditOrganization()

  const {refetchEvent,setRefetchEvent} = useContext(refetchContext)
  

  useEffect(() => {
    if (currentId) {
      setInitialValues({
        id: currentId,
        title: data.title,
        description: data.description,
      });
    }
  }, [currentId, isOpen]);

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
            initialValues={initialValues}
            validationSchema={AddOrganizationValide}
            onSubmit={(value) => {

              editMutation.mutate(
                {
                  id: value.id,
                  description: value.description,
                  title: value.title,
                },
                {
                  onSuccess: (val: any) => {
                    showToast(["با موفقیت انجام شد!"], "success");
                    const newEvent = { ...refetchEvent };
                    newEvent.organizationList = !newEvent.organizationList;
                    setRefetchEvent(newEvent);
                    toggleModal();
                  },
                  onError: (er: any) => {
                    showToast(["مشکلی پیش آمد!"], "error");
                  },
                }
              );
            }}
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
                  <Row>
                    <Col md="12">
                      <TextInput
                        lableText="عنوان سازمان"
                        name="title"
                        placeholder="عنوان سازمان"
                        significant
                      />
                    </Col>
                    <Col md="12">
                      <TextArea
                        lableText="توضیحات"
                        name="description"
                        placeholder="توضیحات"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <SubmitButton
                        isLoading={editMutation.isLoading}
                        schema={AddOrganizationValide}
                        values={values}
                        initialValue={initialValues}
                      />
                    </Col>
                  </Row>

             
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
