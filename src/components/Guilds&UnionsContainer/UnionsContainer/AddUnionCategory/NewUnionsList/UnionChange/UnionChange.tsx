import { Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import {
  Button,
  Col,
  Modal,
  ModalBody,
  ModalFooter,
  ModalHeader,
  Spinner,
} from "reactstrap";
import { TextInput } from "../../../../../common/Form";
import { MultiSelectOption } from "../../../../../common/Form";
import { AddNewUnionType } from "../../../../../../core/validations/add-unions.validations";
import {
  useAllUseTypes,
  useGetUnionById,
  useUpdateUnion,
} from "../../../../../../core/services/api";

interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  values: any;
  reloadData: () => void;
}

const UnionChange: FC<IPropTypes> = ({
  isOpen,
  toggleModal,
  values,
  reloadData,
}) => {
  const [initialValues, setInitialValues] = useState<any>({
    unionName: values.title,
    unionTypes: null,
  });

  const [unionTypes, setUnionTypes] = React.useState([]);

  const unionById = useGetUnionById();
  const allUseTypes = useAllUseTypes();

  useEffect(() => {
    if (allUseTypes.data && allUseTypes.data.data) {
      const result = allUseTypes.data.data.result;
      const types: any = [
        {
          label: " نوع کاربری اتحادیه را انتخاب کنید",
          options: [],
        },
      ];

      result.forEach((item: any) => {
        types[0].options.push({ value: item.id, label: item.title });
      });
      setUnionTypes(types);
    }
  }, [allUseTypes.isSuccess]);

  useEffect(() => {
    if (isOpen) {
      unionById.mutate(values.id);
    }
  }, [isOpen]);

  useEffect(() => {
    if (unionById.data && unionById.data.data) {
      const result = unionById.data.data.result[0];

      let selectedTypes: any = [];

      result.useTypes.map((item: any) => {
        selectedTypes.push({
          label: item.titleUseType,
          value: item.id,
        });
      });

      setInitialValues({ unionName: result.title, unionTypes: selectedTypes });
      setUnionId(selectedTypes);
    }
  }, [unionById.isSuccess]);

  const [unionId, setUnionId] = useState([]);

  const updateUnion = useUpdateUnion();

  const onSubmit = (value: any) => {
    let useTypes: any = [];
    unionId.forEach((item: any) => {
      useTypes.push({ id: item.value });
    });

    const obj: any = {
      id: values.id,
      title: value.unionName,
      useTypes: useTypes,
    };

    updateUnion.mutate(obj);
  };

  const handleOnChange = (e: any, setFieldValue: any) => {
    setFieldValue("unionTypes", e);
    setUnionId(e);
  };

  useEffect(() => {
    if (updateUnion.isSuccess) {
      reloadData();
    }
  }, [updateUnion.isSuccess]);

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggleModal}
      unmountOnClose={true}
      className="modal-dialog-centered"
    >
      <ModalHeader toggle={toggleModal}>ویرایش اتحادیه</ModalHeader>
      <Formik
        initialValues={initialValues}
        validationSchema={AddNewUnionType}
        enableReinitialize
        onSubmit={(value) => onSubmit(value)}
      >
        {({
          values,
          errors,
          handleChange,
          handleSubmit,
          setFieldTouched,
          setFieldValue,
        }) => {
          return (
            <React.Fragment>
              <ModalBody>
                <TextInput
                  name="unionName"
                  placeholder="نام اتحادیه را وارد کنید"
                  hasLabel
                  lableText="نام اتحادیه"
                  significant
                  type="text"
                />

                <MultiSelectOption
                  hasLabel
                  labelText="نوع کاربری اتحادیه"
                  name="unionTypes"
                  significant
                  options={unionTypes}
                  isLoading={unionById.isLoading || allUseTypes.isLoading}
                  placeHolder="انواع اتحادیه را انتخاب کنید"
                  value={unionId}
                  onChange={(e) => handleOnChange(e, setFieldValue)}
                />
              </ModalBody>
              <ModalFooter>
                <Col className="d-flex align-items-center justify-content-left">
                  <Button
                    className="d-flex align-items-center justify-content-center"
                    color="primary"
                    style={{ marginLeft: "10px" }}
                    onClick={(val: any) => handleSubmit(val)}
                  >
                    {updateUnion.isLoading && (
                      <Spinner color="white" size="sm" />
                    )}
                    <span className="ml-50">ذخیره</span>
                  </Button>
                  <Button
                    className="d-flex align-items-center justify-content-center"
                    color="danger"
                    outline
                    onClick={() => toggleModal()}
                  >
                    <span className="ml-50">انصراف</span>
                  </Button>
                </Col>
              </ModalFooter>
            </React.Fragment>
          );
        }}
      </Formik>
    </Modal>
  );
};

export { UnionChange };
