import React, { useContext, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { Col, Modal, Row, ModalBody, ModalHeader } from "reactstrap";
import { refetchContext } from "../../../../../../core/utils/context/EventContext";
import {
  useGetJahadCenterById,
  useUpdateJahadCenter,
} from "../../../../../../core/services/api/jahad-center.api";
import { SubmitButton, TextInput } from "../../../../../common/Form";
import { useUpdateConsomptionCost } from "../../../../../../core/services/api";
import BasicSelectOption from "../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { fullOption, showToast } from "../../../../../../core/utils";
import { ToastTypes } from "../../../../../../core/enums";
import { AddCostManagementValidate } from "../../../../../../core/validations/add-cost-management.validation";

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
  data
}) => {

  const [initialValue , setInitialValue] = useState<any>({
    from1 : "",
    from2 : "",
    oprator  : null,
    type : null,
  })

  const [operatorData, setOperatorData] = useState<any>([
    {
      label: "انتخاب کنید ...",
      options: [
        { value: 1, label: "مساوی" },
        { value: 2, label: "بزرگتر" },
        { value: 3, label: "کوچک تر" },
        { value: 4, label: "مابین" },
      ],
    },
  ]);
  const [typeData, setTypeData] = useState<any>([
    {
      label: "انتخاب کنید ...",
      options: [
        { value: 1, label: "هزینه آب" },
        { value: 2, label: "هزینه برق سالیانه" },
        { value: 3, label: "هزینه گازشهری" },
        { value: 4, label: "هزینه کود" },
        { value: 5, label: "هزینه سم" },
        { value: 6, label: "هزینه تعمیرات" },
        { value: 7, label: "هزینه لاستیک" },
      ],
    },
  ]);
  

  const editMutation = useUpdateConsomptionCost();

  
  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);


  useEffect(() => {
    if (currentId) {
      setInitialValue({
        from1: data.from1,
        from2: data.from2,
        oprator: fullOption(data.oprator , operatorData),
        type: fullOption(data.type , typeData),
      });
    }
  }, [currentId, isOpen]);


  const onSubmit = (value: any) => {
      const CostEditObj = {
        id : currentId,
        from1: value.from1,
        from2: value.type.value === 4 ? value.from2 : value.from1,
        type: value.type.value,
        oprator: value.oprator.value,
      };
      editMutation.mutate(CostEditObj, {
        onSuccess: (val: any) => {
          toggleModal();
          showToast(["با موفقیت انجام شد."], ToastTypes.success);
          const newEvent = { ...refetchEvent };
          newEvent.costManagementList = !newEvent.costManagementList;
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
            validationSchema={AddCostManagementValidate}
            onSubmit={onSubmit}
          >
            {({ values, setFieldValue }) => {
              return (
                <Form>
                  <Row>
                    <Col>
                      <BasicSelectOption
                        isLoading={false}
                        significant={true}
                        name="type"
                        placeHolder="انتخاب کنید ..."
                        data={typeData}
                        lableText="قسمت مورد استفاده"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <BasicSelectOption
                        isLoading={false}
                        significant={true}
                        name="oprator"
                        placeHolder="انتخاب کنید ..."
                        data={operatorData}
                        lableText="حالات قیمت"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <TextInput
                        name="from1"
                        placeholder="عدد وارد کنید ..."
                        lableText={
                          values.oprator && values.oprator.value === 4
                            ? "قیمت - از (ریال)"
                            : "قیمت (ریال)"
                        }
                        significant
                      />
                    </Col>
                  </Row>
                  {values.oprator && values.oprator.value === 4 && (
                    <Row>
                      <Col>
                        <TextInput
                          name="from2"
                          placeholder="عدد وارد کنید ..."
                          lableText="قیمت - تا (ریال)"
                          significant
                        />
                      </Col>
                    </Row>
                  )}
                  <Row>
                    <Col>
                      <SubmitButton
                        isLoading={editMutation.isLoading}
                        values={values}
                        initialValue={initialValue}
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
};

export { EditModal };
