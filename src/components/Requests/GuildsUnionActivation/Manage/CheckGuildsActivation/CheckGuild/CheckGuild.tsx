import { Form, Formik } from "formik";
import React, { FC } from "react";
import { useHistory, useLocation, useParams } from "react-router";
import { Modal, ModalBody, ModalHeader } from "reactstrap";
import { ToastTypes } from "../../../../../../core/enums";
import { IsIncludes, showToast } from "../../../../../../core/utils";
import { isSameString } from "../../../../../../core/utils/same-string.utils";
import { validationGuildConfirmModal } from "../../../../../../core/validations/secretariat-check-guild.validation";
import { SubmitButton, TextArea } from "../../../../../common/Form";

interface IPropTypes {
  isOpen: boolean;
  toggle: () => void;
  type: string;
  title: string;
  useMutate: any;
  isItManager?: boolean;
  isManager?: boolean;
}

const CheckGuild: FC<IPropTypes> = ({
  isOpen,
  toggle,
  title,
  type,
  useMutate,
  isItManager,
  isManager,
}) => {
  const checkRequest = useMutate();
  const { id }: any = useParams();
  const history = useHistory();
  const location = useLocation();

  const onSubmit = ({ description }: any) => {
    const checkRequestObj = {
      description: description,
      requestId: +id,
    };
    checkRequest.mutate(checkRequestObj, {
      onSuccess: () => {
        showToast(["با موفقیت انجام شد"], ToastTypes.success);
        if (isItManager) {
          if (isSameString(type, "county"))
            history.push("/GuildsActivation/CountyItManagerCartable");
          else if (isSameString(type, "province"))
            history.push("/GuildsActivation/ProvinceItManagerCartable");
          else if (isSameString(type, "union"))
            history.push("/UnionsActivation/UnionItManagerCartable");
        } else if (isManager) {
          if(IsIncludes(location.pathname, '/GuildsActivation/ProvinceViceManager/Confirm')){
            history.push("/GuildsActivation/ProvinceViceManagerCartable");
          }
          else if(IsIncludes(location.pathname, '/GuildsActivation/CountyViceManager/Confirm')){
            history.push("/GuildsActivation/CountyViceManagerCartable");
          }
          else if(IsIncludes(location.pathname, '/UnionsActivation/UnionViceManager/Confirm')){
            history.push("/UnionsActivation/UnionViceManagerCartable");
          }
          else if(IsIncludes(location.pathname, '/GuildsActivation/ProvinceExecutiveManager/Confirm')){
            history.push("/GuildsActivation/ProvinceExecutiveManagerCartable");
          }
          else if(IsIncludes(location.pathname, '/GuildsActivation/CountyExecutiveManager/Confirm')){
            history.push("/GuildsActivation/CountyExecutiveManagerCartable");
          }
          else if(IsIncludes(location.pathname, '/UnionsActivation/UnionExecutiveManager/Confirm')){
            history.push("/UnionsActivation/UnionExecutiveManagerCartable");
          }
          else if (isSameString(type, "county"))
            history.push("/GuildsActivation/CountyManagerCartable");
          else if (isSameString(type, "province"))
            history.push("/GuildsActivation/ProvinceManagerCartable");
          else if (isSameString(type, "union"))
            history.push("/UnionsActivation/UnionManagerCartable");
        } else if (isSameString(type, "county"))
          history.push("/GuildsActivation/CountySecretariatCartable");
        else if (isSameString(type, "province"))
          history.push("/GuildsActivation/ProvinceSecretariatCartable");
        else if (isSameString(type, "union"))
          history.push("/UnionsActivation/UnionSecretariatCartable");
      },
    });
  };

  console.log(isManager);

  return (
    <Modal
      isOpen={isOpen}
      toggle={toggle}
      unmountOnClose={true}
      className="modal-dialog-centered"
    >
      <ModalHeader toggle={toggle}>
        {isManager ? "ثبت نظر" : `${title} درخواست`}
      </ModalHeader>
      <ModalBody>
        <Formik
          initialValues={{ description: "" }}
          onSubmit={onSubmit}
          validationSchema={validationGuildConfirmModal}
        >
          {({ values }) => (
            <Form>
              <TextArea
                lableText="توضیحات"
                name="description"
                placeholder="توضیحات را وارد کنید"
                significant
              />

              <SubmitButton
                isLoading={checkRequest.isLoading}
                btnText={`${
                  isItManager
                    ? "فعال سازی"
                    : `${isManager ? "ثبت نظر" : `${title} درخواست`}`
                }`}
                clearable
                clearableTxt="انصراف"
                clearableDisable={checkRequest.isLoading}
                onClear={toggle}
                values={values}
                schema={validationGuildConfirmModal}
              />
            </Form>
          )}
        </Formik>
      </ModalBody>
    </Modal>
  );
};

export { CheckGuild };
