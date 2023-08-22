import React,{useState} from 'react';
import { Formik,Form } from "formik"
import {
  Col,
  Modal,
  Row,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { TextInput } from '../../../../../../common/Form/InputComponents/TextInputComponents/TextInput/TextInput';
import { SubmitButton } from '../../../../../../common/Form/SubmitButtonComponent/SubmitButton/SubmitButton';
import BasicSelectOption from '../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption';
import { TextArea } from '../../../../../../common/Form/InputComponents/TextArea/TextArea';
import { AddLandAdjacentTypeValidation } from '../../../../../../../core/validations/land-adjacent-type.validation';


interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  backdrop:boolean,
  currentId : number,
  data :any,
  setSelectedUser:any
}
 
const initialValue = {
  name:"",
  code:"",
  type:{value:0,label:"انتخاب کنید"},
  order:null,
  describe:""
}
 
const LandAdjacentTypeModal: React.FC<IPropTypes> = ({ isOpen, toggleModal , backdrop , currentId , data }) => {

  const [state,setState] = useState(initialValue)
  // const EditServices = useEditSevicesType()

  // const {setFetchRefresh} = useServicesTypesContext()

  // useEffect(() => {
  //   if (currentId) {
  //     let selectedGuild = data.find((guild: any) => guild.id === currentId);
  //     setState({
  //       title: selectedGuild.title,
  //     });
  //   }
  // }, [currentId]);

  // const onSubmit = (value:ICreateServicesType) => {
  //   EditServices.mutate({
  //     title:value.title,
  //     id:currentId
  //   },{
  //     onSuccess:() => {
  //       setFetchRefresh()
  //       setSelectedUser(null)
  //     }
  //   })
  // }

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
            validationSchema={AddLandAdjacentTypeValidation}
            onSubmit={(value) => alert("ss")}
          >
            {({
              values,
            }) => {
              return (
                <Form>
                  <TextInput id="name" lableText="نام" name="name" placeholder="نام" significant={true}/>
                  <TextInput id="code" lableText="کد" name="code" placeholder="کد" significant={true}/>
                  <BasicSelectOption
                    lableText="نوع"
                    significant={true}
                    name="type"
                    data={[]}
                  />
                  <TextInput id="order" type="number" lableText="ترتیب نمایش" name="order" placeholder="ترتیب نمایش" />
                  <TextArea
                    lableText="توضیحات"
                    name="describe"
                    placeholder="توضیحات"
                  />   
                  <Row>
                    <Col>
                      <SubmitButton
                        isLoading={false}
                        initialValue={initialValue}
                        schema={AddLandAdjacentTypeValidation}
                        values={values}
                        isDisabled={false}
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
 
export {LandAdjacentTypeModal}