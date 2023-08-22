import React from "react";
import { Edit, File } from "react-feather";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
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
    },
  },
  flow,
}) => {

  const history = useHistory();
  
  return (
    <div className="d-flex justify-content-center align-content-center">
      <Button
        style={{ margin: "3px" }}
        size="sm"
        color="warning"
        onClick={() => GoToTruePage(+status, flow, String(id))}
      >
        ادامه درخواست &nbsp;
        <Edit
          style={{ position: "relative", top: "-2px" }}
          size={12}
          color="white"
        />
      </Button>

      <Button
        style={{ margin: "3px" }}
        size="sm"
        color="info"
        onClick={() => {
          history.push(`/License/Issued/${status}/history/${id}`);
        }}
      >
        تاریخچه درخواست &nbsp;
        <File
          style={{ position: "relative", top: "-2px" }}
          size={12}
          color="white"
        />
      </Button>
    </div>
  );
};

export { Action };
