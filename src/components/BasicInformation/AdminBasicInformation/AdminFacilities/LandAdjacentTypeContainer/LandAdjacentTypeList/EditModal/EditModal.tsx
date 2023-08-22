import React, { useContext, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { Col, Modal, Row, ModalBody, ModalHeader } from "reactstrap";
import { useEditSectionProximity } from "../../../../../../../core/services/api/parts-and-facilities.api";
import { refetchContext } from "../../../../../../../core/utils/context/EventContext";
import { SubmitButton, TextArea, TextInput } from "../../../../../../common/Form";
import BasicSelectOption from "../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { showToast } from "../../../../../../../core/utils";
import { ToastTypes } from "../../../../../../../core/enums";
import { AddLandAdjacentTypeValidation } from "../../../../../../../core/validations/land-adjacent-type.validation";


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

  const editMutation = useEditSectionProximity()

  const [initialValue , setInitialValues] = useState<any>({
    name: "",
    code: "",
    order: "",
    describe: "",
    type : null
  });
  
  const typeData = [
    {value : 1 , label : 'عوارض طبیعی'},
    {value : 2 , label : ' عوارض'}
  ]


  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

    useEffect(() => {
      if (currentId) {
        setInitialValues({
          name: data.name,
          code: data.code,
          describe: data.description,
          order: data.viewOrder,
          type: { value: data.type, label: data.typeTitle },
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
        type: values.type.value,
      };
  
      editMutation.mutate(proximityEditObj, {
        onSuccess: (val: any) => {
          toggleModal();
          showToast(["با موفقیت انجام شد."], ToastTypes.success);
          const newEvent = { ...refetchEvent };
          newEvent.sectionProximityList = !newEvent.sectionProximityList;
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
        validationSchema={AddLandAdjacentTypeValidation}
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
                    <BasicSelectOption
                      lableText="نوع"
                      significant={true}
                      name="type"
                      placeHolder="انتخاب کنید ..."
                      data={typeData}
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
                      schema={AddLandAdjacentTypeValidation}
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
