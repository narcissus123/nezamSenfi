import React, { FC } from "react";
import { useHistory } from "react-router";
import { FormGroup } from "reactstrap";
import { ToastTypes } from "../../../../../core/enums";
import {
  useSendUnionRequestForInvestigation,
  useSendGuildRoomRequestForInvestigation,
} from "../../../../../core/services/api";
import { showToast } from "../../../../../core/utils";
import { useGlobalState } from "../../../../../core/utils/context/GlobalContext";
import { isSameString } from "../../../../../core/utils/same-string.utils";
import { SimpleSubmitButton } from "../../../../common/Form";

interface IPropTypes {
  type: string;
}

const SendFinalyRequest: FC<IPropTypes> = ({ type }) => {
  const { req_id } = useGlobalState();
  const sendFinaly = useSendGuildRoomRequestForInvestigation();
  const sendUnionFinaly = useSendUnionRequestForInvestigation();
  const history = useHistory();

  return (
    <FormGroup className="d-flex justify-content-center">
      <SimpleSubmitButton
        isLoading={sendFinaly.isLoading || sendUnionFinaly.isLoading}
        btnText="ثبت نهایی"
        color="success"
        onCLick={() => {
          if (isSameString(type, "Union"))
            sendUnionFinaly.mutate(+req_id[0], {
              onSuccess: () => {
                showToast(["با موفقیت ثبت گردید"], ToastTypes.success);
                history.push("/UnionsRequests/Union/List");
              },
            });
          else
            sendFinaly.mutate(+req_id[0], {
              onSuccess: () => {
                showToast(["با موفقیت ثبت گردید"], ToastTypes.success);
                if (isSameString(type, "County"))
                  history.push("/GuildsRequests/County/List");
                else history.push("/GuildsRequests/Province/List");
              },
            });
        }}
      />
    </FormGroup>
  );
};

export { SendFinalyRequest };
