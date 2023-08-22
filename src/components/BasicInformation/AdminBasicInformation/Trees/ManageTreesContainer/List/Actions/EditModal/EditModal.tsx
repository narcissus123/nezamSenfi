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
import { useGetAllTreeCategory } from "../../../../../../../../core/services/api/base-tree-category.api";
import { showToast } from '../../../../../../../../core/utils';
import { ToastTypes } from '../../../../../../../../core/enums';
import { refetchContext } from '../../../../../../../../core/utils/context/EventContext';
import { NewTreeValidation } from '../../../../../../../../core/validations/new-tree.validation';
import { OptionRow } from '../../../../../../../../core/models';
import BasicSelectOption from '../../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption';
import { useEditTree } from '../../../../../../../../core/services/api/base-tree.api';

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
  const { isFetching, data: categoryData } = useGetAllTreeCategory();
  
  const editMutation = useEditTree();
  const [initialValues, setInitialValues] = useState<any>({
    title: "",
    baseTreeCategoryId: null,
    isActiveEdit: false,
  });
  
  useEffect(() => {
    if (currentId) {
      setInitialValues({
        title: data.title,
        isActiveEdit: data.isActive === "فعال" ? true : false,
        baseTreeCategoryId: {
          value: data.baseTreeCategoryId,
          label: data.baseTreeCategoryTitle,
        },
      });
    }
  }, [currentId, isOpen]);

  const onSubmit = (value: any) => {
    const setObj = {
      id: data.id,
      title: value.title,
      isActive: value.isActiveEdit,
      baseTreeCategoryId: value.baseTreeCategoryId.value,
    };

    editMutation.mutate(setObj , {
      onSuccess: (val : any) => {
        showToast(["با موفقیت ویرایش شد."], ToastTypes.success);
        const newEvent = { ...refetchEvent };
        newEvent.treeList = !newEvent.treeList;
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
            validationSchema={NewTreeValidation}
            onSubmit={onSubmit}
          >
            {({ values, setFieldValue }) => {
              return (
                <Form>
                  <>
                    <Row>
                      <Col md="12">
                        <BasicSelectOption
                          lableText="عنوان دسته بندی درخت"
                          significant={true}
                          placeHolder="انتخاب کنید..."
                          name="baseTreeCategoryId"
                          data={
                            categoryData?.data.result
                              ? categoryData?.data.result.map(
                                  (item: OptionRow) => ({
                                    value: item.id,
                                    label: item.title,
                                  })
                                )
                              : []
                          }
                          isLoading={isFetching}
                        />
                      </Col>
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
                          schema={NewTreeValidation}
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