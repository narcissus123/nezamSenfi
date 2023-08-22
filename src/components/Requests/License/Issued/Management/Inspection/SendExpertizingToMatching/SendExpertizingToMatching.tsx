import React, { FC, useState } from "react";
import { useHistory } from "react-router-dom";
import { Alert, Card } from "reactstrap";
import { ToastTypes } from "../../../../../../../core/enums";
import { useSendExpertisingToMacthing } from "../../../../../../../core/services/api";
import { showToast } from "../../../../../../../core/utils";
import { useGlobalState } from "../../../../../../../core/utils/context/GlobalContext";
import { FormDivider, SimpleSubmitButton } from "../../../../../../common/Form";
import { SweetAlertCallback } from "../../../../../../common/SweetAlert/SweetALertCallback/SweetALertCallback";

const SendExpertizingToMatching: FC = () => {
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const history = useHistory();

  const { req_id } = useGlobalState();

  return (
    <Card>
      <FormDivider textHeader="">
        <Alert
          color="primary"
          className="d-flex justify-content-center align-items-center mt-1"
        >
          <SimpleSubmitButton
            btnText="پرونده بهره بردار"
            outLine
            isLoading={false}
            disabled={false}
            onCLick={() => {
              history.push(`/License/SetPrimaryInfo/Issued/${req_id[0]}`);
            }}
            className="mr-1"
          />
        </Alert>
      </FormDivider>
    </Card>
  );
};

export { SendExpertizingToMatching };
