import React from "react";
import { Edit } from "react-feather";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import { LicenseRequestStatusEnum } from "../../../../../../core/enums/license-request-status.enums";
import { GoToTruePage } from "../../../../../../core/utils/context/StatusProvider";
import { StatusWrapper } from "../../../../../common/Wrapper/StatusWrapper/StatusWrapper";

interface IPropTypes {
  cell: {
    row: {
      values: { id: number };
      original: { identityChangeStatus: number, userType: number };
    };
  };
  flow: string;
}

const Action: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id },
      original: { identityChangeStatus, userType },
    },
  },
  flow,
}) => {
  const history = useHistory();

  return (
    <div className="d-flex justify-content-center align-content-center">
      {/* <StatusWrapper
        curStatus={[+status]}
        guildStatus={[LicenseRequestStatusEnum.WatingForJahadInvastigation]}
      > */}{" "}
      <Button
        style={{ margin: "3px" }}
        size="sm"
        color="primary"
        onClick={() =>
          GoToTruePage(+identityChangeStatus, flow, String(id + "/" + userType))
        }
      >
        بررسی درخواست &nbsp;
        <Edit
          style={{ position: "relative", top: "-2px" }}
          size={12}
          color="white"
        />
      </Button>
      {/* </StatusWrapper> */}
    </div>
  );
};

export { Action };
