import React,{useEffect, useState} from 'react';
import { Formik,Form } from "formik"
import {
  Col,
  Modal,
  Row,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { TextInput } from '../../../../../../common/Form';
import { SubmitButton } from '../../../../../../common/Form';
import { ICreateServicesType } from './../../../../../../../core/models';
import { addServicesTypedValidations } from '../../../../../../../core/validations/services-tools.validation';
import { useEditSevicesType } from './../../../../../../../core/services/api';
import { useServicesTypesContext } from './../../AdminServicesTypesContainer';
import { updateListById } from "../../../../../../../core/utils"

interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  backdrop:boolean,
  currentId : number,
  data :any,
  setSelectedUser:any
}
 
const initialValue:ICreateServicesType = {
  title:""
}
 
const ServicesTypesModal: React.FC<IPropTypes> = ({ isOpen, toggleModal,setSelectedUser , backdrop , currentId , data }) => {

  const [state,setState] = useState(initialValue)
  const EditServices = useEditSevicesType()

  const {setListData,listData} = useServicesTypesContext()

  useEffect(() => {
    if (currentId) {
      let selectedGuild = data.find((guild: any) => guild.id === currentId);
      setState({
        title: selectedGuild.title,
      });
    }
  }, [currentId,isOpen]);

  const onSubmit = (value:ICreateServicesType) => {
    EditServices.mutate({
      title:value.title,
      id:currentId
    },{
      onSuccess:(result:any) => {
        const newList =updateListById(listData,result.data.result,
          {
            title:value.title,
            id:currentId
          }
        ) 
        setListData(newList)
        toggleModal()
      }
    })
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
            initialValues={state}
            validationSchema={addServicesTypedValidations}
            onSubmit={(value) => onSubmit(value)}
          >
            {({
              values,
            }) => {
              return (
                <Form>
                  <TextInput id="title" lableText="نوع خدمات" name="title" placeholder="نوع خدمات" />
                  <Row>
                    <Col>
                      <SubmitButton
                        isLoading={EditServices.isLoading}
                        initialValue={initialValue}
                        schema={addServicesTypedValidations}
                        values={values}
                        isDisabled={EditServices.isLoading}
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
}
 
export {ServicesTypesModal}