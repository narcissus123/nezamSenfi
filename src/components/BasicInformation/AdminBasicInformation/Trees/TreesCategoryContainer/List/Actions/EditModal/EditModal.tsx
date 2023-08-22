import React,{ useContext, useEffect, useState} from 'react';
import { Formik,Form } from "formik"
import {
  Col,
  Modal,
  ModalBody,
  ModalHeader,
  Row,
} from "reactstrap";
import { SubmitButton, TextInput, Toggle } from '../../../../../../../common/Form';
import { TreeCategoryValidation } from '../../../../../../../../core/validations/tree-category.validation';
import { useEditTreeCategory } from '../../../../../../../../core/services/api/base-tree-category.api';
import { showToast } from '../../../../../../../../core/utils';
import { ToastTypes } from '../../../../../../../../core/enums';
import { refetchContext } from '../../../../../../../../core/utils/context/EventContext';

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

  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);
  
  const editMutation = useEditTreeCategory();
  const [initialValues, setInitialValues] = useState<any>({
    title: "",
    isActiveEdit: "",
  });
  
  useEffect(() => {
    if (currentId) {
      setInitialValues({
        title: data.title,
        isActiveEdit: data.isActive === "فعال" ? true : false,
      });
    }
  }, [currentId, isOpen]);

  const onSubmit = (value: any) => {
    const setObj = {
      id: data.id,
      title: value.title,
      isActive: value.isActiveEdit,
    };

    editMutation.mutate(setObj , {
      onSuccess: (val : any) => {
        showToast(["با موفقیت ویرایش شد."], ToastTypes.success);
        const newEvent = { ...refetchEvent };
        newEvent.treesCategoryList = !newEvent.treesCategoryList;
        setRefetchEvent(newEvent);
        toggleModal();
      }
    })

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
            initialValues={initialValues}
            validationSchema={TreeCategoryValidation}
            onSubmit={onSubmit}
          >
            {({ values, setFieldValue }) => {
              return (
                <Form>
                  <>
                    <Row>
                      <Col md="12">
                        <TextInput
                          lableText="نام دسته بندی درخت"
                          name="title"
                          placeholder="نام دسته بندی درخت ..."
                          significant
                        />
                      </Col>
                      <Col md="12">
                        <Toggle
                          id="isActiveEdit"
                          name="isActiveEdit"
                          lableText="وضعیت"
                          significant
                          direction="ltr"
                          className="my-1"
                          onChange={(opt: any) => {
                            setFieldValue("isActiveEdit", opt.target.checked);
                          }}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <SubmitButton
                          isLoading={editMutation.isLoading}
                          initialValue={initialValues}
                          schema={TreeCategoryValidation}
                          values={values}
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
 
export {EditModal};