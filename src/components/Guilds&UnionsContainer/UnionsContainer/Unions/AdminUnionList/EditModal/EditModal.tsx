import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { Col, Modal, Row, ModalBody, ModalHeader } from "reactstrap";
import { GuildsAddProvinceValidate } from "../../../../../../core/validations/guilds-add-province.validations";
import { TextArea } from "../../../../../common/Form";
import { SubmitButton } from "../../../../../common/Form";
import { AddUnionValidate } from "../../../../../../core/validations/add-unions.validations";

interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  backdrop: boolean;
  currentId: number;
  data: any;
  setFetchRefresh: () => void;
}

const EditModal: React.FC<IPropTypes> = ({
  isOpen,
  toggleModal,
  backdrop,
  currentId,
  data,
  setFetchRefresh,
}) => {
  const [initialValues, setInitialValues] = useState<any>({
    unionName: null,
    unionDescription: "",
    fakeName: "",
  });

  //const getAllProvinceMutation = useGetAllprovinceByMainLocationId()
  //const useSetProvinceMutation = useSetProvinceGuildRoom()

  useEffect(() => {
    if (currentId) {
      let selectedUnion = data.find((union: any) => union.id === currentId);
      setInitialValues({
        unionName: { value: selectedUnion.id, label: "" },
        fakeName: `اتاق صنفی برای ${selectedUnion.name}`,
        unionDescription: selectedUnion.unionDescription,
      });
    }
  }, [currentId, isOpen]);

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
              let selectedUnion = data.find(
                (union: any) => union.id === currentId
              );
              // useSetProvinceMutation.mutate({
              //   provinceId : value.provinceName.value,
              //   description : value.provinceDescription ,
              //   title : selectedGuild.name
              // },{
              //   onSuccess: (val : any) => {
              //     showToast(['با موفقیت انجام شد!'],"success")
              //     setFetchRefresh()
              //   },
              //   onError: (er : any)=>{
              //     showToast(['مشکلی پیش آمد!'],"error")
              //   }
              // }

              // )
            }}
          >
            {({ values }) => {
              return (
                <Form>
                  <>
                    <Row>
                      <Col md="12">
                        <TextArea
                          name="unionDescription"
                          lableText="توضیحات"
                          placeholder="توضیحات ..."
                          id="provinceDescription"
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <SubmitButton
                          isLoading={false} //useSetProvinceMutation.isLoading}
                          schema={AddUnionValidate}
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
};

export { EditModal };
