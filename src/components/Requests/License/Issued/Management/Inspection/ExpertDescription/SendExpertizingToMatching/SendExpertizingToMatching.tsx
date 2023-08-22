import React, { FC, useState } from "react";
import { useHistory } from "react-router-dom";
import { Alert, Card } from "reactstrap";
import { ToastTypes } from "../../../../../../../../core/enums";
import { useSendExpertisingToMacthing } from "../../../../../../../../core/services/api";
import { showToast } from "../../../../../../../../core/utils";
import { useGlobalState } from "../../../../../../../../core/utils/context/GlobalContext";
import { FormDivider, SimpleSubmitButton } from "../../../../../../../common/Form";
import { SweetAlertCallback } from "../../../../../../../common/SweetAlert/SweetALertCallback/SweetALertCallback";


const SendExpertizingToMatching: FC = () => {
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const sendToMatching = useSendExpertisingToMacthing();
  const history = useHistory();

  const { req_id } = useGlobalState();

  return (
    <Card>
      <FormDivider textHeader="">
        <SweetAlertCallback
          mutation={sendToMatching}
          title="تایید نهایی"
          onCancel={() => {
            setShowConfirmation(false);
          }}
          onClose={() => {
            setShowConfirmation(false);
          }}
          onConfirm={() => {
            setShowConfirmation(false);
            sendToMatching.mutate(+req_id[0], {
              onSuccess: () => {
                showToast(["با موفقیت انجام شد"], ToastTypes.success);
                history.push("/ManageLicense/MyCartable");
              },
            });
          }}
          show={showConfirmation}
        >
          آیا از تایید این درخواست اطمینان دارید؟
        </SweetAlertCallback>
        <Alert
          color="primary"
          className="d-flex justify-content-center align-items-center mt-1"
        >
          <SimpleSubmitButton
            btnText="تایید نهایی کارشناسی"
            isLoading={sendToMatching.isLoading}
            disabled={sendToMatching.isLoading}
            onCLick={() => setShowConfirmation(true)}
            className="mr-1"
          />
        </Alert>
      </FormDivider>
    </Card>
  );
};

export { SendExpertizingToMatching };
