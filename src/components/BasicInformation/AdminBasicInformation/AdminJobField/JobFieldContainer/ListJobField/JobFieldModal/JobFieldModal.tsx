import React,{ useEffect, useState} from 'react';
import { Formik,Form } from "formik"
import {
  Col,
  Modal,
  Row,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { TextInput } from '../../../../../../common/Form/InputComponents/TextInputComponents/TextInput';
import { SubmitButton } from '../../../../../../common/Form/SubmitButtonComponent/SubmitButton';
import { ICreateMachineType } from './../../../../../../../core/models/admin-machinery-tools.model';
import { addMachineTypeValidate } from '../../../../../../../core/validations/admin-machinery-tools.validation';
import { useEditMachineType } from "../../../../../../../core/services/api/admin-machinery-type.api";
import BasicSelectOption from '../../../../../../common/Form/SelectOptionComponent/BasicSelectOption';

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
 
const JobFieldModal: React.FC<IPropTypes> = ({ isOpen, toggleModal,setSelectedUser , backdrop , currentId , data }) => {

  const [state,setState] = useState(initialValue)
  const editMachineType = useEditMachineType()
  


  useEffect(() => {
    // if (currentId) {
    //   let selectedGuild = ListState.find((guild: any) => guild.id === currentId);
    //   setState({
    //     title: selectedGuild.title,
    //   });
    // }
  }, [currentId]);

  const onSubmit = (value:ICreateMachineType) => {

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
                  <BasicSelectOption
                    lableText="نام بخش "
                    significant={true}
                    name="productionType"
                    placeHolder="انتخاب کنید"
                    data={[]}
                  />
                  <BasicSelectOption
                    lableText="نام زیر بخش "
                    significant={true}
                    name="productionType"
                    placeHolder="انتخاب کنید"
                    data={[]}
                  />
                  <BasicSelectOption
                    lableText="نام رسته "
                    significant={true}
                    name="productionType"
                    placeHolder="انتخاب کنید"
                    data={[]}
                  />                    
                  <TextInput id="sectionCode" significant={true} lableText="نام زمینه فعالیت" name="sectionCode" placeholder="نام زمینه فعالیت" />
                  <TextInput id="sectionCode" significant={true} lableText="کد زمینه فعالیت" name="sectionCode" placeholder="کد زمینه فعالیت" />
            
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
 
export {JobFieldModal}