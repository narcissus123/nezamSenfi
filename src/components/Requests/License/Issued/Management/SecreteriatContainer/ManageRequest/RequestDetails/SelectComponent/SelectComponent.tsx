import React, { FC, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { SimpleSubmitButton } from "../../../../../../../../common/Form";
import { SweetAlertCallback } from "../../../../../../../../common/SweetAlert/SweetALertCallback/SweetALertCallback";

interface IPropTypes {
  selectMutation: any;
}

const SelectComponent: FC<IPropTypes> = ({ selectMutation }) => {
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  let { id } = useParams<any>();
  const history = useHistory();

  const selectRequest = selectMutation();

  return (
    <>
      <SweetAlertCallback
        mutation={selectRequest}
        title="اضافه کردن به کارتابل"
        onCancel={() => {
          setShowConfirmation(false);
        }}
        onClose={() => {
          setShowConfirmation(false);
        }}
        onConfirm={() => {
          setShowConfirmation(false);
          selectRequest.mutate(id, {
            onSuccess: () => {
              setShowConfirmation(false);

              history.push(
                `/ManageLicense/Secreteriat/Cartable/DetailsRequest/${id}`
              );
            },
          });
        }}
        show={showConfirmation}
      >
        آیا این درخواست به کارتابل شما اضافه شود؟
      </SweetAlertCallback>

      <SimpleSubmitButton
        isLoading={selectRequest.isLoading}
        disabled={selectRequest.isLoading}
        btnText="اضافه کردن به کارتابل من"
        onCLick={() => setShowConfirmation(true)}
        className="mt-2"
      />
    </>
  );
};

export { SelectComponent };
