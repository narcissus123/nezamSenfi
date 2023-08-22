import React from "react";
import { Edit } from "react-feather";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import { LicenseRequestStatusEnum } from "../../../../../../../../core/enums/license-request-status.enums";
import { GoToTruePage } from "../../../../../../../../core/utils/context/StatusProvider";

interface IPropTypes {
  cell: {
    row: {
      values: { id: number };
      original: { status: number };
    };
  };
  flow: string;
}

const Action: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id },
      original: { status },
      original,
    },
  },
  flow,
}) => {
  const history = useHistory();
  console.log(original);

  return (
    <div className="d-flex justify-content-center align-content-center">
      <Button
        style={{ margin: "3px" }}
        size="sm"
        color="primary"
        onClick={() => GoToTruePage(99, flow, String(id))}
      >
        جزئیات &nbsp;
        <Edit
          style={{ position: "relative", top: "-2px" }}
          size={12}
          color="white"
        />
      </Button>
      {+status < LicenseRequestStatusEnum.WattingForIssuingManagerAfterPay &&
        +status !== LicenseRequestStatusEnum.WaitingForPaymentAfterMatching && (
          <Button
            style={{ margin: "3px" }}
            size="sm"
            color="warning"
            onClick={() => GoToTruePage(+status, flow, String(id))}
          >
            بررسی درخواست &nbsp;
            <Edit
              style={{ position: "relative", top: "-2px" }}
              size={12}
              color="white"
            />
          </Button>
        )}
      {+status ===
        LicenseRequestStatusEnum.CancellationInvestigationbyIssuingResponsible && (
        <Button
          style={{ margin: "3px" }}
          size="sm"
          color="warning"
          onClick={() => GoToTruePage(+status, flow, String(id))}
        >
          بررسی درخواست &nbsp;
          <Edit
            style={{ position: "relative", top: "-2px" }}
            size={12}
            color="white"
          />
        </Button>
      )}
    </div>
  );
};

export { Action };
