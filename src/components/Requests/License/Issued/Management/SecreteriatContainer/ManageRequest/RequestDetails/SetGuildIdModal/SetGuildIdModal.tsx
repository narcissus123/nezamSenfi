import React, { useContext, useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { Col, Modal, Row, ModalBody, ModalHeader } from "reactstrap";
import { showToast } from "../../../../../../../../../core/utils";
import { ToastTypes } from "../../../../../../../../../core/enums";
import { useHistory, useParams } from "react-router-dom";
import { useSetGuildIdBySecratriate } from "../../../../../../../../../core/services/api";
import { SubmitButton, TextInput } from "../../../../../../../../common/Form";
import { SetGuildIdValidate } from "../../../../../../../../../core/validations/set-guild-id.validation";


interface IPropTypes {
  isOpen: boolean;
  toggleModal: () => void;
  backdrop: boolean;
}

const SetGuildIdModal: React.FC<IPropTypes> = ({
  isOpen,
  toggleModal,
  backdrop,
}) => {

  const [initialValue , setInitialValue] = useState<any>({
    guildId : "",
  })

  const setMutation = useSetGuildIdBySecratriate();

  const history = useHistory();
  const { id } = useParams<any>();

  const onSubmit = (value: any) => {
      const CostEditObj = {
        guildId : value.guildId,
        licenseRequestId : id
      };
      setMutation.mutate(CostEditObj, {
        onSuccess: (val: any) => {
          toggleModal();
          showToast(["با موفقیت انجام شد."], ToastTypes.success);
          history.push(`/ManageLicense/Secreteriat/MyCartable`);
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
        <ModalHeader toggle={toggleModal}>ثبت شناسه صنفی</ModalHeader>
        <ModalBody>
          <Formik
            enableReinitialize={true}
            initialValues={initialValue}
            validationSchema={SetGuildIdValidate}
            onSubmit={onSubmit}
          >
            {({ values, setFieldValue }) => {
              return (
                <Form>
                  <Row>
                    <Col>
                      <TextInput
                        name="guildId"
                        placeholder="وارد کنید ..."
                        lableText="شناسه صنفی"
                        significant
                      />
                    </Col>
                  </Row>

                  <Row>
                    <Col>
                      <SubmitButton
                        isLoading={setMutation.isLoading}
                        values={values}
                        schema={SetGuildIdValidate}
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

export { SetGuildIdModal };
