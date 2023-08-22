import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { Col, Modal, Row, ModalBody, ModalHeader } from "reactstrap";
import { TextInput } from "../../../../../../common/Form";
import { SubmitButton } from "../../../../../../common/Form/SubmitButtonComponent/SubmitButton";
import { ICreateServicesName } from "./../../../../../../../core/models";
import { addServicesValidations } from "../../../../../../../core/validations/services-tools.validation";
import { useEditSevicesName } from "./../../../../../../../core/services/api";
import BasicSelectOption from "../../../../../../common/Form/SelectOptionComponent/BasicSelectOption";
import { useServicesNameContext } from "./../../AdminServicesNameContainer";
import { useGetServicesTypesForAdmin } from "./../../../../../../../core/services/api";
import { simpleOption, updateListById } from "../../../../../../../core/utils";

interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  backdrop: boolean;
  currentId: number;
  data: any;
  setSelectedUser: any;
}

const initialValue: ICreateServicesName = {
  title: "",
  agriculturalToolsTypeId: { value: 0, label: "انتخاب کنید" },
};

const ServicesNameModal: React.FC<IPropTypes> = ({
  isOpen,
  toggleModal,
  backdrop,
  setSelectedUser,
  currentId,
  data,
}) => {
  const { setListData, listData } = useServicesNameContext();

  const [state, setState] = useState(initialValue);
  const EditServices = useEditSevicesName();

  const {
    data: allServicesType,
    isLoading: isLoadingType,
    isSuccess: isSuccessType,
  }: any = useGetServicesTypesForAdmin(); //types

  const [allServicesTypes, setAllServicesTypes] = useState([
    {
      label: "نام خدمات را انتخاب کنید",
      options: [],
    },
  ]);

  useEffect(() => {
    // save machin-types to state
    if (allServicesType) {
      let pro: any = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      allServicesType.forEach((county: any) => {
        pro[0].options.push({ value: county.id, label: county.title });
      });
      setAllServicesTypes(pro);
    }
  }, [isSuccessType]);

  useEffect(() => {
    if (currentId) {
      let selectedGuild = data.find((guild: any) => guild.id === currentId);

      setState({
        title: selectedGuild.title,
        agriculturalToolsTypeId: {
          value: selectedGuild.agriculturalToolTypeId,
          label: selectedGuild.agriculturalToolTypeTitle,
        },
      });
    }
  }, [currentId, isOpen]);

  const onSubmit = (value: any) => {
    EditServices.mutate(
      {
        title: value.title,
        id: currentId,
        agriculturalToolsTypeId: value.agriculturalToolsTypeId.value,
      },
      {
        onSuccess: (result: any) => {
          const newList = updateListById(listData, result.data.result, {
            title: value.title,
            id: currentId,
            agriculturalToolTypeId: value.agriculturalToolsTypeId.value,
            agriculturalToolTypeTitle: simpleOption(
              value.agriculturalToolsTypeId.value,
              allServicesTypes[0].options
            )?.label,
          });
          setListData(newList);
          toggleModal();
        },
      }
    );
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
            initialValues={state}
            validationSchema={addServicesValidations}
            onSubmit={(value) => onSubmit(value)}
          >
            {({ values }) => {
              return (
                <Form>
                  <TextInput
                    id="title"
                    lableText="نام خدمات"
                    name="title"
                    placeholder="نام خدمات"
                  />
                  <BasicSelectOption
                    lableText="نوع خدمات"
                    significant={true}
                    name="agriculturalToolsTypeId"
                    data={allServicesTypes}
                    isLoading={isLoadingType}
                  />
                  <Row>
                    <Col>
                      <SubmitButton
                        isLoading={EditServices.isLoading}
                        initialValue={initialValue}
                        schema={addServicesValidations}
                        values={values}
                        isDisabled={EditServices.isLoading}
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

export { ServicesNameModal };
