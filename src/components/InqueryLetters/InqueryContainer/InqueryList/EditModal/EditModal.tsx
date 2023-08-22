import React, { useContext, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { Col, Modal, Row, ModalBody, ModalHeader } from "reactstrap";
import { showToast } from "../../../../../core/utils";
import { SubmitButton, TextArea, TextInput } from "../../../../common/Form";
import { useEditInquiry, useGetAllOrganization } from "../../../../../core/services/api";
import { refetchContext } from "../../../../../core/utils/context/EventContext";
import BasicSelectOption from "../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { AddInqueryValidate } from "../../../../../core/validations/inquery-add.validations";


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

  const [initialValues, setInitialValues] = useState<any>({
    id: 0,
    inqueryTitle: "",
    description: "",
    defaultLetterContent: "",
    defaultLetterTitle: "",
    organizationId: null,
  });

  const editMutation = useEditInquiry()

  const {refetchEvent,setRefetchEvent} = useContext(refetchContext)

  useEffect(() => {
    if (currentId) {

      setInitialValues({
        id: currentId,
        inqueryTitle: data.title,
        description: data.description,
        defaultLetterContent: data.defaultLetterContent,
        defaultLetterTitle: data.defualtLetterTitle,
        organizationId: { value: data.organizationId , label: data.organizationTitle },
      });
    }
  }, [currentId, isOpen]);


  const [ organizationData , setOrganizationData] = useState<any>([{
    label : 'انتخاب کنید ...',
    options: []
  }])

  const { data : orgData , isFetching , isSuccess } = useGetAllOrganization();
  React.useEffect(()=>{
    if(orgData){
      try{
        let newOrganization = [
          {
            label: "انتخاب کنید ...",
            options: [],
          },
        ];
        let newOptions: any = [];
        orgData.data.result.forEach((row: any) => {
          newOptions.push({ value: row.id, label: row.title });
        });
        newOrganization[0].options = newOptions;
        setOrganizationData(newOrganization);
      }catch(e){

      }
    }
  },[isSuccess , orgData])
  
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
            validationSchema={AddInqueryValidate}
            onSubmit={(value) => {

              editMutation.mutate(
                {
                  id: value.id,
                  title: value.inqueryTitle,
                  description: value.description,
                  defaultLetterContent: value.defaultLetterContent,
                  defaultLetterTitle: value.defaultLetterTitle,
                  organizationId: value.organizationId.value,
                },
                {
                  onSuccess: (val: any) => {
                    showToast(["با موفقیت انجام شد!"], "success");
                    const newEvent = { ...refetchEvent };
                    newEvent.inqueryList = !newEvent.inqueryList;
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
                        lableText="موضوع استعلام"
                        name="inqueryTitle"
                        placeholder="موضوع استعلام"
                        significant
                      />
                    </Col>
                    <Col md="12">
                      <TextInput
                        lableText="موضوع پیشفرض نامه"
                        name="defaultLetterTitle"
                        placeholder="موضوع"
                        significant
                      />
                    </Col>
                    <Col md="12">
                      <BasicSelectOption
                        lableText="نام سازمان"
                        name="organizationId"
                        placeHolder="انتخاب نام سازمان "
                        data={organizationData}
                        isLoading={isFetching}
                        significant
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col md="12">
                      <TextArea
                        lableText="توضیحات"
                        name="description"
                        placeholder="توضیحات"
                      />
                    </Col>
                    <Col md="12">
                      <TextArea
                        lableText="محتوای پیشفرض نامه"
                        name="defaultLetterContent"
                        placeholder="محتوا"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <SubmitButton
                        isLoading={editMutation.isLoading}
                        schema={AddInqueryValidate}
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
