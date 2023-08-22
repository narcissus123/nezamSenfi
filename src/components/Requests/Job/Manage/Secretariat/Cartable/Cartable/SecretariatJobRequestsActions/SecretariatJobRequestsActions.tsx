import React from "react";
import { Edit } from "react-feather";
import { Button } from "reactstrap";
import { JobRequestStatus } from "../../../../../../../../core/enums/job-request-status";
import { GoToTruePage } from "../../../../../../../../core/utils/context/StatusProvider";

interface IPropTypes {
  archiveMutation: any;
  cell: {
    row: {
      values: { id: number };
      original: {
        status: number;
      };
    };
  };
  flow: string;
}

const SecretariatJobRequestsActions: React.FC<IPropTypes> = ({
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
      {(status === 18 || status === 14 || status === 11 || status === 9) && (
        <Button
          style={{ margin: "3px" }}
          size="sm"
          color="warning"
          onClick={() => GoToTruePage(8, flow, String(id))}
        >
          جزییات &nbsp;
          <Edit
            style={{ position: "relative", top: "-2px" }}
            size={12}
            color="white"
          />
        </Button>
      )}

      <Button
        style={{ margin: "3px" }}
        size="sm"
        color="warning"
        onClick={() =>
          GoToTruePage(+status === 21 ? +status - 1 : +status, flow, String(id))
        }
      >
        {status === 21 || status === 23 ? "جزییات" : "بررسی درخواست"} &nbsp;
        <Edit
          style={{ position: "relative", top: "-2px" }}
          size={12}
          color="white"
        />
      </Button>

      {status === JobRequestStatus.WaitingForAttachmentsAndGuarantors && (
        <Button
          style={{ margin: "3px" }}
          size="sm"
          color="primary"
          onClick={() => GoToTruePage(+status, flow, String(id))}
        >
          ثبت ضامن &nbsp;
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

export { SecretariatJobRequestsActions };
