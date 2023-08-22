import React, { useContext, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { Col, Modal, Row, ModalBody, ModalHeader } from "reactstrap";
import { SubmitButton, TextInput } from "../../../../../../../common/Form";
import { addProductionUnitValidation } from "../../../../../../../../core/validations/product-unit.validation";
import { useEditProductUnit } from "../../../../../../../../core/services/api/job.api";
import { showToast } from "../../../../../../../../core/utils";
import { ToastTypes } from "../../../../../../../../core/enums";
import { refetchContext } from "../../../../../../../../core/utils/context/EventContext";


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

  const editMutation = useEditProductUnit()

  const [initialValues, setInitialValues] = useState<any>({
    title: null,
    abbreviation: "",
  });

  useEffect(() => {
    if (currentId) {
      setInitialValues({
        title: data.title ,
        abbreviation: data.abbreviation,
      });
    }
  }, [currentId, isOpen]);
  
  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);
  
  const onSubmit = (value:any) => {

    const editProductionUnitObject = {
      id : data.id,
      title: value.title ,
      abbreviation: value.abbreviation,
    }

    editMutation.mutate(editProductionUnitObject, {
      onSuccess: (val: any) => {
        toggleModal();
        showToast(["با موفقیت انجام شد"], ToastTypes.success);
        const newEvent = { ...refetchEvent };
        newEvent.productionUnitList = !newEvent.productionUnitList;
        setRefetchEvent(newEvent);
      },
    });

  }

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
            validationSchema={addProductionUnitValidation}
            onSubmit={onSubmit}
          >
            {({ values }) => {
              return (
                <Form>
                  <>
                    <Row>
                      <Col md="12">
                        <TextInput
                          lableText="نام واحد"
                          name="title"
                          placeholder="نام"
                          significant
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col md="12">
                        <TextInput
                          lableText="کلمه اختصاری"
                          name="abbreviation"
                          placeholder="کلمه اختصاری"
                          significant
                        />
                      </Col>
                    </Row>

                    <Row>
                      <Col>
                        <SubmitButton
                          isLoading={editMutation.isLoading}
                          schema={addProductionUnitValidation}
                          values={values}
                          initialValue={initialValues}
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
