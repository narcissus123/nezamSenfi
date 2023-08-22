import React, { useContext, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { Col, Modal, Row, ModalBody, ModalHeader } from "reactstrap";
import { refetchContext } from "../../../../../../../core/utils/context/EventContext";
import { SubmitButton, TextArea, TextInput } from "../../../../../../common/Form";
import { showToast } from "../../../../../../../core/utils";
import { ToastTypes } from "../../../../../../../core/enums";
import { useEditWaterWellWall } from "../../../../../../../core/services/api/parts-and-facilities.api";
import { AddWaterWellWalValidate } from "../../../../../../../core/validations/admin-water-well-wall.validation";


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

  const editMutation = useEditWaterWellWall()

  const [initialValue , setInitialValues] = useState<any>({
    name: "",
    code: "",
    order: "",
    describe: "",
  });


  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

    useEffect(() => {
      if (currentId) {
        setInitialValues({
          name: data.name,
          code: data.code,
          describe: data.description,
          order: data.viewOrder,
        });
      }
    }, [currentId, isOpen]);
  
    const onSubmit = (values:any) => {
  
      const proximityEditObj = {
        id : data.id,
        name: values.name,
        code: values.code,
        description: values.describe,
        viewOrder: values.order,
      };
  
      editMutation.mutate(proximityEditObj, {
        onSuccess: (val: any) => {
          toggleModal();
          showToast(["با موفقیت انجام شد."], ToastTypes.success);
          const newEvent = { ...refetchEvent };
          newEvent.waterWellList = !newEvent.waterWellList;
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
        validationSchema={AddWaterWellWalValidate}
        onSubmit={onSubmit}
      >
        {({ values }) => {
          return (
            <Form>
              <>
                <Row>
                  <Col>
                    <TextInput
                      id="name"
                      lableText="نام"
                      name="name"
                      placeholder="نام"
                      significant={true}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <TextInput
                      id="code"
                      lableText="کد"
                      name="code"
                      placeholder="کد"
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
                    <TextArea
                      lableText="توضیحات"
                      name="describe"
                      placeholder="توضیحات"
                    />
                  </Col>
                </Row>

                <Row>
                  <Col>
                    <SubmitButton
                      isLoading={editMutation.isLoading}
                      initialValue={initialValue}
                      schema={AddWaterWellWalValidate}
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
