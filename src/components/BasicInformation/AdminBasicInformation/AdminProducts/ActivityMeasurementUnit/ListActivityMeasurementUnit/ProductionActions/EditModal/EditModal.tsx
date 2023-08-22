import React, { useContext, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { Col, Modal, Row, ModalBody, ModalHeader } from "reactstrap";
import { SubmitButton, TextInput } from "../../../../../../../common/Form";
import { addProductionUnitValidation } from "../../../../../../../../core/validations/product-unit.validation";
import { useEditActivityMeasurementUnit } from "../../../../../../../../core/services/api/job.api";
import { showToast } from "../../../../../../../../core/utils";
import { ToastTypes } from "../../../../../../../../core/enums";
import { refetchContext } from "../../../../../../../../core/utils/context/EventContext";
import { addActivityMeasurmentUnitValidation } from "../../../../../../../../core/validations/activity-measurment-unit.validation";


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

  const editMutation = useEditActivityMeasurementUnit()

  const [initialValues, setInitialValues] = useState<any>({
    title: "",
    code: "",
    viewOrder:0
  });

  useEffect(() => {
    if (currentId) {
      setInitialValues({
        title: data.title ,
        code: data.code,
        viewOrder:data.viewOrder
      });
    }
  }, [currentId, isOpen]);
  
  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);
  
  const onSubmit = (value:any) => {

    const editActivityMeasurmentUnitObject = {
      id : data.id,
      title: value.title ,
      code: value.code,
      viewOrder: value.viewOrder
    }

    editMutation.mutate(editActivityMeasurmentUnitObject, {
      onSuccess: (val: any) => {
        toggleModal();
        showToast(["با موفقیت انجام شد"], ToastTypes.success);
        const newEvent = { ...refetchEvent };
        newEvent.ActivityMeasurementUnitList = !newEvent.ActivityMeasurementUnitList;
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
                          lableText="کد"
                          name="code"
                          placeholder="کد"
                          significant
                        />
                      </Col>
                      
                    </Row>
                    <Row>
                      <Col md="12">
                        <TextInput
                          lableText="اولویت نمایش"
                          name="viewOrder"
                          placeholder="اولویت نمایش"
                          significant
                        />
                      </Col>
                      
                    </Row>
                    <Row>
                      <Col>
                        <SubmitButton
                          isLoading={editMutation.isLoading}
                          schema={addActivityMeasurmentUnitValidation}
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
