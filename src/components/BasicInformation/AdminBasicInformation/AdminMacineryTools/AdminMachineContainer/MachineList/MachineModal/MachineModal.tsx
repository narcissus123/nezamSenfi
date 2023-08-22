import React,{useEffect, useState} from 'react';
import { Formik,Form } from "formik"
import {
  Col,
  Modal,
  Row,
  ModalBody,
  ModalHeader,
} from "reactstrap";
import { TextInput } from '../../../../../../common/Form/InputComponents/TextInputComponents/TextInput';
import { SubmitButton } from '../../../../../../common/Form';
import { addMachineTypeValidate } from '../../../../../../../core/validations/admin-machinery-tools.validation';
import BasicSelectOption from '../../../../../../common/Form/SelectOptionComponent/BasicSelectOption';
import { productionType, productionType as productionTypeArray } from './../../../../../../../core/data';
import { useEditMachine, useGetAllMachineManufacturer, useGetAllMachineTypes } from '../../../../../../../core/services/api';
import { useAdminMachineContext } from '../../AdminMachineContainer';
import { simpleOption } from '../../../../../../../core/utils';

interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  backdrop:boolean,
  currentId : number,
  data :any,
  setSelectedUser:any
}
 
const initialValue = {
  title:"",
  productionType:{value:0,label:"انتخاب کنید"},
  typeMachineId:{value:0,label:"انتخاب کنید"},
  machineManufacturerId:{value:0,label:"انتخاب کنید"}

}
 
const MachineModal: React.FC<IPropTypes> = ({ isOpen, toggleModal , backdrop , currentId ,data }) => {

  const {setListData,listData} = useAdminMachineContext()

  const [state,setState] = useState<any>(initialValue)
  const editMachineType = useEditMachine()

  const [typeMachineIdData , setTypeMachineIdData] = useState<any>([]);
  const [machineManufacturerIdData , setMachineManufacturerIdData] = useState<any>([]);

  const {
    data: getAllMachinTypes,
    isSuccess: isGetAllMachinTypsSuccess,
    isLoading: isGetAllMachinTypesLoading,
    isFetching: isGetAllMachinTypesFetching,
  } = useGetAllMachineTypes();

  const {
    data: getAllMachineManufacturer,
    isSuccess: isMachineManufacturerSuccess,
    isLoading: isMachineManufacturerLoading,
    isFetching : isMachineManufacturerIsFetching,
  } = useGetAllMachineManufacturer();

  useEffect(() => {
    if (getAllMachineManufacturer?.data.result) {
      const result = getAllMachineManufacturer.data.result;
      let pro: any = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      result.forEach((county: any) => {
        pro[0].options.push({ value: county.id, label: county.title });
      });
      setMachineManufacturerIdData(pro);
    }
  }, [isMachineManufacturerSuccess]);

  useEffect(() => {
    // save machin-types to state
    if (getAllMachinTypes?.data.result) {
      const result = getAllMachinTypes.data.result;
      let pro: any = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      result.forEach((county: any) => {
        pro[0].options.push({ value: county.id, label: county.title });
      });
      setTypeMachineIdData(pro);
    }
  }, [isGetAllMachinTypsSuccess]);

  useEffect(() => {
    if (currentId) {
      let selectedMachine = data.find((guild: any) => guild.id === currentId); // check data or listData
      setState({
        title: selectedMachine.title,
        typeMachineId: { value: selectedMachine.typeMachineId, label:selectedMachine.typeMachineTitle},
        machineManufacturerId: {value : selectedMachine.machineManufacturerId, label :selectedMachine.machineManufacturerTitle},
        productionType:{value:selectedMachine.productionType , label:selectedMachine.productionTypeTitle}
      });
    }
  }, [currentId,isOpen]);

  const onSubmit = (value:any) => {
    const submitValue = {
      title: value.title,
      id: currentId,
      productionType: value.productionType?.value,
      typeMachineId: value.typeMachineId.value,
      machineManufacturerId: value.machineManufacturerId.value,
    };     
    editMachineType.mutate(submitValue,{
      onSuccess:(valu:any) => {
        const newList = [...listData]
        const foundIndex = newList.findIndex((x:any) => x.id === valu.data.result);
        newList[foundIndex] = {
          ...submitValue,
          productionTypeTitle:simpleOption(value.productionType?.value,productionTypeArray[0].options)?.label,
          typeMachineTitle:simpleOption(value.typeMachineId?.value,typeMachineIdData[0].options)?.label,
          machineManufacturerTitle:simpleOption(value.machineManufacturerId?.value,machineManufacturerIdData[0].options)?.label,
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
            validationSchema={addMachineTypeValidate}
            onSubmit={(value:any) => onSubmit(value)}
          >
            {({
              values,
            }) => {
              return (
                <Form>
                  <TextInput
                    id="title"
                    lableText="نام ماشین"
                    name="title"
                    placeholder="نام ماشین"
                    significant={true}
                  />
                  <BasicSelectOption
                    lableText="نوع ماشین"
                    significant={true}
                    name="typeMachineId"
                    data={typeMachineIdData}
                  />
                  <BasicSelectOption
                    lableText="نوع ساخت ماشین"
                    significant={true}
                    name="productionType"
                    data={productionType}
                    isLoading={isGetAllMachinTypesFetching}
                  />
                  <BasicSelectOption
                    lableText="شرکت سازنده"
                    significant={true}
                    name="machineManufacturerId"
                    data={machineManufacturerIdData}
                    isLoading={isMachineManufacturerIsFetching}
                  />
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
 
export {MachineModal}