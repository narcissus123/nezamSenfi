import React, { useContext, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { Col, Modal, Row, ModalBody, ModalHeader } from "reactstrap";
import { useEditSeedlingPreparationCenter } from "../../../../../../../../core/services/api";
import { refetchContext } from "../../../../../../../../core/utils/context/EventContext";
import { showToast } from "../../../../../../../../core/utils";
import { ToastTypes } from "../../../../../../../../core/enums";
import { AddMotorPowerValide } from "../../../../../../../../core/validations/admin-motor-power.validation";
import { SubmitButton, TextInput, Toggle } from "../../../../../../../common/Form";

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

  const editMutation = useEditSeedlingPreparationCenter()

  const [initialValue , setInitialValues] = useState<any>({
    name: "",
    code: "",
    order: "",
    editStatus: false,
  });


  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

    useEffect(() => {
      if (currentId) {
        setInitialValues({
          name: data.name,
          code: data.code,
          editStatus : data.status === 1 ? true : false,
          order: data.viewOrder,
        });
      }
    }, [currentId, isOpen]);
  
    const onSubmit = (values:any) => {
  
      const proximityEditObj = {
        id : data.id,
        name: values.name,
        code: values.code,
        status : values.editStatus ? 1 : 0,
        viewOrder: values.order,
      };
  
      editMutation.mutate(proximityEditObj, {
        onSuccess: (val: any) => {
          toggleModal();
          showToast(["با موفقیت انجام شد."], ToastTypes.success);
          const newEvent = { ...refetchEvent };
          newEvent.seedlingPreparationCenter = !newEvent.seedlingPreparationCenter;
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
        validationSchema={AddMotorPowerValide}
        onSubmit={onSubmit}
      >
        {({ values , setFieldValue }) => {
          return (
            <Form>
              <>
                <Row>
                  <Col>
                    <TextInput
                      id="name"
                      lableText="نام نهال / بذرv"
                      name="name"
                      placeholder="نام نهال / بذر"
                      significant={true}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TextInput
                      id="code"
                      lableText="کد نهال / بذر"
                      name="code"
                      placeholder="کد نهال / بذر"
                      significant={true}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TextInput
                      id="order"
                      type="number"
                      lableText="ترتیب نمایش"
                      name="order"
                      placeholder="ترتیب نمایش"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Toggle
                      id="editStatus"
                      name="editStatus"
                      lableText="وضعیت"
                      significant
                      direction="ltr"
                      className="my-1"
                      onChange={(opt: any) => {
                        setFieldValue("editStatus", opt.target.checked);
                      }}
                    />
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <SubmitButton
                      isLoading={editMutation.isLoading}
                      initialValue={initialValue}
                      schema={AddMotorPowerValide}
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
