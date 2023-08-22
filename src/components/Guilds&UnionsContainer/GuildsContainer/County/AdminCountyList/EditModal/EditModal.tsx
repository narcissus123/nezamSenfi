import React,{useContext, useEffect, useState} from 'react';
import { Formik,Form } from "formik"
import {
  Col,
  Modal,
  Row,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { GuildsAddCountyValidate } from '../../../../../../core/validations/guilds-add-county.validations';
import { TextInput } from '../../../../../common/Form';
import { TextArea } from '../../../../../common/Form';
import { SubmitButton } from '../../../../../common/Form';
import { useSetCountyGuildRoom } from '../../../../../../core/services/api';
import { showToast } from '../../../../../../core/utils';
import { refetchContext } from '../../../../../../core/utils/context/EventContext';


interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  backdrop:boolean,
  currentId : number,
  data :any 
}
 
const EditModal: React.FC<IPropTypes> = ({ isOpen, toggleModal , backdrop , currentId , data}) => {


    
      const [initialValues , setInitialValues] = useState<any>({
        countyName : null , 
        countyDescription : "",
        fakeName : ""
      })
  
      const useSetCountyMutation = useSetCountyGuildRoom()
      const {refetchEvent,setRefetchEvent} = useContext(refetchContext)

      useEffect(() => {
        if (currentId) {
          let selectedGuild = data.find((guild: any) => guild.id === currentId)
          setInitialValues({
            countyName: {value : selectedGuild.id, label:''},
            fakeName: `اتاق صنفی برای ${selectedGuild.name}`,
            countyDescription: selectedGuild.countyDescription,
          });
          
        //   getAllcountyMutation.mutate(1, {
        //     onSuccess: (val) => {
        //       if (val && val.data.result) {
        //         let newcountys = {
        //           label: "سرلیست استان",
        //           options: [],
        //         };
        //         let newOptions = [];
        //         val.data.result.forEach((row: any) => {
        //           newOptions.push({ value: row.id, label: row.title });
        //         });
        //         setcountyList(newcountys);
        //       }
        //     },
        //   });
        }
      }, [currentId , isOpen ]);
      
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
            initialValues={initialValues}
            validationSchema={GuildsAddCountyValidate}
            enableReinitialize
            onSubmit={(value) => {
              let selectedGuild = data.find((guild: any) => guild.id === currentId)
              useSetCountyMutation.mutate(
                {
                  countyId: value.countyName.value,
                  description: value.countyDescription,
                  title: selectedGuild.name,
                },
                {
                  onSuccess: (val: any) => {
                    showToast(["با موفقیت انجام شد!"], "success");
                    const newEvent = { ...refetchEvent };
                    newEvent.countyGuildList = !newEvent.countyGuildList;
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
                  <>
                    {/* <Row>
                       <Col md="12">
                        <BasicSelectOption
                          isLoading={getAllcountyMutation.isLoading}
                          significant={true}
                          name="countyName"
                          placeHolder="انتخاب استان ..."
                          data={countyList}
                          lableText="انتخاب استان"
                          onChange={(opt, e) => {
                            setFieldValue("countyName", {
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
                          value={values.countyDescription}
                          name="countyDescription"
                          lableText="توضیحات"
                          placeholder="توضیحات ..."
                          id="countyDescription"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <SubmitButton
                          isLoading={useSetCountyMutation.isLoading}
                          schema={GuildsAddCountyValidate}
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