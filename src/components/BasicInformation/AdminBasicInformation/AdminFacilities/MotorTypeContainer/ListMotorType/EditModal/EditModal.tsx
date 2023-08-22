import React, { useContext, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { Col, Modal, Row, ModalBody, ModalHeader } from "reactstrap";
import { refetchContext } from "../../../../../../../core/utils/context/EventContext";
import { MultiSelectOption, SubmitButton, TextArea, TextInput, Toggle } from "../../../../../../common/Form";
import { showToast } from "../../../../../../../core/utils";
import { ToastTypes } from "../../../../../../../core/enums";
import { AddMotorPowerValide } from "../../../../../../../core/validations/admin-motor-power.validation";
import { useEditEnginePower, useGetAllEnginePower } from "../../../../../../../core/services/api/parts-and-facilities.api";


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

  const editMutation = useEditEnginePower()

  const [initialValue , setInitialValues] = useState<any>({
    name: "",
    code: "",
    order: "",
    editStatus: false,
  });

  const [engineTypePowerIdsData , setEngineTypePowerIdsData] = useState<any>()

  const {
    data: enginePowerData,
    isFetching: enginePowerIsFetching,
    isSuccess: enginePowerIsSuccess,
  } = useGetAllEnginePower();

  useEffect(() => {
    if (enginePowerData && enginePowerData.data) {
      const result = enginePowerData.data.result;
      let newOptions: any = [];
      result.forEach((row: any) => {
        newOptions.push({ value: row.id, label: row.name });
      });
      setEngineTypePowerIdsData(newOptions);
    }
  }, [enginePowerIsSuccess]);

  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

    useEffect(() => {
      if (currentId) {
        setInitialValues({
          name: data.name,
          code: data.code,
          description: data.description,
          order: data.viewOrder,
        });
      }
    }, [currentId, isOpen]);
  
    const onSubmit = (value:any) => {

      let engineIds : any = []

      value.engineTypePowerIds.forEach((row: any) => {
        engineIds.push(row.value);
      });
  
      const proximityEditObj = {
        id : data.id,
        name: value.name,
        code: value.code,
        description: value.description,
        viewOrder: value.order,
        engineTypePowerIds: engineIds
      };
  
      editMutation.mutate(proximityEditObj, {
        onSuccess: (val: any) => {
          toggleModal();
          showToast(["با موفقیت انجام شد."], ToastTypes.success);
          const newEvent = { ...refetchEvent };
          newEvent.engineTypeList = !newEvent.engineTypeList;
          setRefetchEvent(newEvent);
        },
      });
      
    };

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
        initialValues={initialValue}
        validationSchema={AddMotorPowerValide}
        onSubmit={onSubmit}
      >
        {({ values , setFieldValue }) => {
          return (
            <Form>
              <>
                <TextInput
                  lableText="نام "
                  name="name"
                  placeholder="نام"
                  significant
                />
                <TextInput
                  lableText="کد"
                  name="code"
                  placeholder="کد"
                  significant
                />
                <TextArea
                  lableText="توضیحات"
                  name="description"
                  placeholder="توضیحات"
                />

                <TextInput
                  lableText="ترتیب نمایش"
                  name="order"
                  placeholder="ترتیب نمایش"
                  significant
                />
                <MultiSelectOption
                  labelText="قدرت موتور"
                  name="engineTypePowerIds"
                  placeHolder="انتخاب کنید..."
                  significant={true}
                  isLoading={enginePowerIsFetching}
                  options={engineTypePowerIdsData}
                  onChange={(e) => setFieldValue("engineTypePowerIds", e)}
                  hasLabel={true}
                />
                <Row>
                  <Col>
                    <SubmitButton
                      isLoading={editMutation.isLoading}
                      initialValue={initialValue}
                      schema={AddMotorPowerValide}
                      values={values}
                      isDisabled={false}
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
};

export { EditModal };
