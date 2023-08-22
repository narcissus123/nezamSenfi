import React,{ useEffect, useState} from 'react';
import { Formik,Form } from "formik"
import {
  Col,
  Modal,
  Row,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { GuildsAddProvinceValidate } from '../../../../../../core/validations/guilds-add-province.validations';
import { TextInput } from '../../../../../common/Form/InputComponents/TextInputComponents/TextInput/TextInput';
import { TextArea } from '../../../../../common/Form/InputComponents/TextArea/TextArea';
import { SubmitButton } from '../../../../../common/Form/SubmitButtonComponent/SubmitButton/SubmitButton';
import { useSetProvinceGuildRoom } from '../../../../../../core/services/api/guilds.api';
import { showToast } from '../../../../../../core/utils/show-toast';



interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  backdrop:boolean,
  currentId : number,
  data :any,
  setFetchRefresh : () => void
}
 
const EditModal: React.FC<IPropTypes> = ({ isOpen, toggleModal , backdrop , currentId , data , setFetchRefresh}) => {

    const [provinceList , setProvinceList] = useState<any>([
        {
          label:'سرلیست استان',
          options:[
            {value : 1 , label:'استان تست یک'},
            {value : 2 , label:'استان تست دو'},
            {value : 3 , label:'استان تست سه'},
            {value : 4 , label:'استان تست چهار'}
          ]
        },
      ])
    
      const [initialValues , setInitialValues] = useState<any>({
        //provinceName : null , 
        provinceDescription : "",
        fakeName : ""
      })
  
      //const getAllProvinceMutation = useGetAllprovinceByMainLocationId()
      const useSetProvinceMutation = useSetProvinceGuildRoom()
    
      useEffect(() => {
        if (currentId) {
          let selectedGuild = data.find((guild: any) => guild.id === currentId);
          setInitialValues({
            provinceName: {value : selectedGuild.id, label:''},
            fakeName: `اتاق صنفی برای ${selectedGuild.name}`,
            provinceDescription: selectedGuild.provinceDescription,
          });
        //   getAllProvinceMutation.mutate(1, {
        //     onSuccess: (val) => {
        //       if (val && val.data.result) {
        //         
        //         let newProvinces = {
        //           label: "سرلیست استان",
        //           options: [],
        //         };
        //         let newOptions = [];
        //         val.data.result.forEach((row: any) => {
        //           newOptions.push({ value: row.id, label: row.title });
        //         });
        //         setProvinceList(newProvinces);
        //       }
        //     },
        //   });
        }
      }, [currentId , isOpen]);
      
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
            validationSchema={GuildsAddProvinceValidate}
            onSubmit={(value) => {
              let selectedGuild = data.find((guild: any) => guild.id === currentId);
              useSetProvinceMutation.mutate({
                provinceId : value.provinceName.value,
                description : value.provinceDescription , 
                title : selectedGuild.name
              },{
                onSuccess: (val : any) => {
                  showToast(['با موفقیت انجام شد!'],"success")
                  setFetchRefresh()
                  toggleModal()
                },
                onError: (er : any)=>{
                  showToast(['مشکلی پیش آمد!'],"error")
                }
              }
              
              )
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
                  <>
                   {/* <Row>
                       <Col md="12">
                        <BasicSelectOption
                          isLoading={getAllProvinceMutation.isLoading}
                          significant={true}
                          name="provinceName"
                          placeHolder="انتخاب استان ..."
                          data={provinceList}
                          lableText="انتخاب استان"
                          onChange={(opt, e) => {
                            setFieldValue("provinceName", {
                              value: opt.value,
                              label: opt.label,
                            });
                            setFieldValue(
                              "fakeName",
                              `اتاق صنفی برای ${opt.label}`
                            );
                          }}
                        />
                      </Col>
                    </Row> */}
                    <Row>
                      <Col md="12">
                        <TextInput
                          id="fakeName"
                          lableText="نام اتاق"
                          name="fakeName"
                          placeholder=""
                          disabled
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col md="12">
                        <TextArea
                          value={values.provinceDescription}
                          name="provinceDescription"
                          lableText="توضیحات"
                          placeholder="توضیحات ..."
                          id="provinceDescription"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <SubmitButton
                          isLoading={useSetProvinceMutation.isLoading}
                          schema={GuildsAddProvinceValidate}
                          values={values}
                          initialValue={initialValues}
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
}
 
export {EditModal};