import React, { useContext, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { Col, Modal, Row, ModalBody, ModalHeader } from "reactstrap";
import { refetchContext } from "../../../../../core/utils/context/EventContext";
import { showToast } from "../../../../../core/utils";
import { ToastTypes } from "../../../../../core/enums";
import { useGetJahadCenterById, useUpdateJahadCenter } from "../../../../../core/services/api/jahad-center.api";



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
}) => {

  const editMutation = useUpdateJahadCenter()

  const [initialValue , setInitialValues] = useState<any>({
    name: "",
    code: "",
    order: "",
    editStatus: false,
  });


  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

  const { data , isSuccess , isFetching } = useGetJahadCenterById(currentId)


    const onSubmit = (values:any) => {
  
    //   const proximityEditObj = {
    //     id : currentId,
    //     name: values.name,
    //     code: values.code,
    //     status : values.editStatus ? 1 : 0,
    //     viewOrder: values.order,
    //   };
  
    //   editMutation.mutate(proximityEditObj, {
    //     onSuccess: (val: any) => {
    //       toggleModal();
    //       showToast(["با موفقیت انجام شد."], ToastTypes.success);
    //       const newEvent = { ...refetchEvent };
    //       newEvent.jahadCenterList = !newEvent.jahadCenterList;
    //       setRefetchEvent(newEvent);
    //     },
    //   });
      
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
        //validationSchema={AddMotorPowerValide}
        onSubmit={onSubmit}
      >
        {({ values , setFieldValue }) => {
          return (
            <Form>
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
