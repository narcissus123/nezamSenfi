import React, { useContext, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { Col, Modal, Row, ModalBody, ModalHeader } from "reactstrap";
import { refetchContext } from "../../../../../../core/utils/context/EventContext";
import { useUpdateCanceletionReason } from "../../../../../../core/services/api/cancelation.api";
import { showToast } from "../../../../../../core/utils";
import { ToastTypes } from "../../../../../../core/enums";
import { CancelationReasonValidate } from "../../../../../../core/validations/cancelation-reason.api";
import { SubmitButton, TextArea, TextInput } from "../../../../../common/Form";



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

  const editMutation = useUpdateCanceletionReason()

  const [initialValue , setInitialValues] = useState<any>({
    title: "",
    description: "",
  });


  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

    useEffect(() => {
      if (currentId) {
        setInitialValues({
          title: data.title,
          description: data.description,
        });
      }
    }, [currentId, isOpen]);
  
    const onSubmit = (values:any) => {
  
      const updateCancelationReason = {
        id : data.id,
        title: values.title,
        description: values.description
      };
  
      editMutation.mutate(updateCancelationReason, {
        onSuccess: (val: any) => {
          toggleModal();
          showToast(["با موفقیت انجام شد."], ToastTypes.success);
          const newEvent = { ...refetchEvent };
          newEvent.cancelationReasonList = !newEvent.cancelationReasonList;
          setRefetchEvent(newEvent);
        },
      });
      
    };

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
        initialValues={initialValue}
        validationSchema={CancelationReasonValidate}
        onSubmit={onSubmit}
      >
        {({ values , setFieldValue }) => {
          return (
            <Form>
              <>
                <Row>
                  <Col>
                    <TextInput
                      lableText="دلیل"
                      name="title"
                      placeholder="نام دلیل ..."
                      significant
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
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
                      initialValue={initialValue}
                      schema={CancelationReasonValidate}
                      values={values}
                      isDisabled={false}
                    />
                  </Col>
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
