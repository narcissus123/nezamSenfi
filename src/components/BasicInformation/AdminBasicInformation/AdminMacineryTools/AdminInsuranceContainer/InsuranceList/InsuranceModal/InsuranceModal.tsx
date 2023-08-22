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
import { ICreateInsurance } from './../../../../../../../core/models';
import { addInsuranceValidate } from '../../../../../../../core/validations/admin-machinery-tools.validation';
import { useEditInsurance } from './../../../../../../../core/services/api/admin-machiner-insurance.api';
import { useAdminInsuranceContext } from './../../AdminInsuranceContainer';

interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  backdrop:boolean,
  currentId : number,
  data? :any,
  setSelectedUser:any
}
 
const initialValue:ICreateInsurance = {
  title:""
}
 
const InsuranceModal: React.FC<IPropTypes> = ({ isOpen, toggleModal , backdrop ,data , currentId  }) => {

  const {setListData,listData} = useAdminInsuranceContext()

  const [state,setState] = useState(initialValue)
  const EditInsurance = useEditInsurance()

  useEffect(() => {
    if (currentId) {
      let selectedGuild = data.find((guild: any) => guild.id === currentId);
      setState({
        title: selectedGuild.title,
      });
    }
  }, [currentId,isOpen]);

  const onSubmit = (value:ICreateInsurance) => {
    EditInsurance.mutate({
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
            validationSchema={addInsuranceValidate}
            onSubmit={(value) => onSubmit(value)}
          >
            {({
              values,
            }) => {
              return (
                <Form>
                    <TextInput id="title" lableText="نام شرکت بیمه" name="title" placeholder="نام شرکت بیمه" />
                  <Row>
                    <Col>
                      <SubmitButton
                        isLoading={EditInsurance.isLoading}
                        initialValue={initialValue}
                        schema={addInsuranceValidate}
                        values={values}
                        isDisabled={EditInsurance.isLoading}
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
 
export {InsuranceModal}