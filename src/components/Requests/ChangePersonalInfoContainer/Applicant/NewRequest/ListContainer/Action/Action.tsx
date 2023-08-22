import React from "react";
import { Edit } from "react-feather";
import { Button } from "reactstrap";
import { GoToTruePage } from "../../../../../../../core/utils/context/StatusProvider";

interface IPropTypes {
  cell: {
    row: {
      values: { id: number };
      original: { identityChangeStatus: number };
    };
  };
  flow: string;
}

const Action: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id },
      original: { identityChangeStatus },
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
        onClick={() => GoToTruePage(+identityChangeStatus, flow, String(id))}
      >
        ادامه درخواست &nbsp;
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
