import React from "react";
import { Edit } from "react-feather";
import { Button } from "reactstrap";
import { JobRequestStatus } from "../../../../../../../core/enums/job-request-status";
import { GoToTruePage } from "../../../../../../../core/utils/context/StatusProvider";

interface IPropTypes {
  cell: {
    row: {
      values: { id: number };
      original: { status: any };
    };
  };
  flow: string;
}

const Action: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id },
      original: { status },
    },
  },
  flow,
}) => {
  return (
    <div className="d-flex justify-content-center align-content-center">
      <Button
        style={{ margin: "3px" }}
        size="sm"
        color="warning"
        onClick={() => GoToTruePage(+status, flow, String(id))}
      >
        {JobRequestStatus.InvestigationByManager === +status ||
        JobRequestStatus.ConfirmPayment === +status ||
        +status === JobRequestStatus.SendInquiryLetterBySecretariat
          ? "بررسی درخواست"
          : "جزییات"}
        &nbsp;
        <Edit
          style={{ position: "relative", top: "-2px" }}
          size={12}
          color="white"
        />
      </Button>
    </div>
  );
};

export { Action };
