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
import { ICreateMachineType } from './../../../../../../../core/models';
import { addMachineManufactorerValidate } from '../../../../../../../core/validations/admin-machinery-tools.validation';
import { useEditMachineManufacturer } from '../../../../../../../core/services/api';
import { useMachineManufacturerContext } from './../../AdminMachineManufacturerContainer';

interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  backdrop:boolean,
  currentId : number,
  data :any,
  setSelectedUser:any
}
 
const initialValue:ICreateMachineType = {
  title:""
}
 
const MachineManufacturerModal: React.FC<IPropTypes> = ({ isOpen, toggleModal , backdrop , currentId , data }) => {

  const [state,setState] = useState(initialValue)
  const editMachineManufacturer = useEditMachineManufacturer()

  const {setListData,listData} = useMachineManufacturerContext()

  useEffect(() => {
    if (currentId) {
      let selectedGuild = data.find((guild: any) => guild.id === currentId);
      setState({
        title: selectedGuild.title,
      });
    }
  }, [currentId,isOpen]);

  const onSubmit = (value:ICreateMachineType) => {
    editMachineManufacturer.mutate({
      title:value.title,
      id:currentId
    },{
      onSuccess:(result:any) => {
        const newList = [...listData]
        const foundIndex = newList.findIndex((x:any) => x.id === result.data.result);
        newList[foundIndex] = {
          title:value.title,
          id:currentId
        };
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
            validationSchema={addMachineManufactorerValidate}
            onSubmit={(value) => onSubmit(value)}
          >
            {({
              values,
            }) => {
              return (
                <Form>
                  <TextInput id="title" lableText="نام شرکت" name="title" placeholder="نام شرکت" />
                  <Row>
                    <Col>
                      <SubmitButton
                        isLoading={editMachineManufacturer.isLoading}
                        initialValue={initialValue}
                        schema={addMachineManufactorerValidate}
                        values={values}
                        isDisabled={editMachineManufacturer.isLoading}
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
 
export {MachineManufacturerModal}