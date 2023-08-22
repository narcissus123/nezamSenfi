import React,{ useEffect, useState} from 'react';
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
import { ICreateMachineType } from './../../../../../../../core/models';
import { addMachineTypeValidate } from '../../../../../../../core/validations/admin-machinery-tools.validation';
import { useEditMachineType } from "../../../../../../../core/services/api";
import { useMachineTypeContext } from './../../AdminMacineTypesContainer';
import { updateListById } from "../../../../../../../core/utils"

interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  backdrop:boolean,
  currentId : number,
  data :any,
  setSelectedUser : (id:any) => void,
}
 
const initialValue:ICreateMachineType = {
  title:""
}
 
const MachineTypeModal: React.FC<IPropTypes> = ({ isOpen, toggleModal , backdrop , currentId , data }) => {

  const [state,setState] = useState(initialValue)
  const editMachineType = useEditMachineType()
  

  
  const {setListData,listData} = useMachineTypeContext()

  useEffect(() => {
    if (currentId) {
      let selectedGuild = data.find((guild: any) => guild.id === currentId);
      setState({
        title: selectedGuild.title,
      });
    }
  }, [currentId,isOpen]);

  const onSubmit = (value:ICreateMachineType) => {
    editMachineType.mutate({
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
            validationSchema={addMachineTypeValidate}
            onSubmit={(value) => onSubmit(value)}
          >
            {({
              values,
            }) => {
              return (
                <Form>
                  <TextInput id="title" lableText="نوع ماشین" name="title" placeholder="نوع ماشین" />
                  <Row>
                    <Col>
                      <SubmitButton
                        isLoading={editMachineType.isLoading}
                        initialValue={initialValue}
                        schema={addMachineTypeValidate}
                        values={values}
                        isDisabled={editMachineType.isLoading}
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
 
export {MachineTypeModal}