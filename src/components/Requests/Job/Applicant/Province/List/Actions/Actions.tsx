import React from "react";
import { Edit } from "react-feather";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import { GoToTruePage } from "../../../../../../../core/utils/context/StatusProvider";

interface IPropTypes {
  cell: {
    row: {
      values: { id: number };
      original: { statusId: number };
    };
  };
}

const Actions: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id },
      original: { statusId },
    },
  },
}) => {
  const history = useHistory();

  return (
    <div className="d-flex justify-content-center align-content-center">
      <Button
        style={{ margin: "3px" }}
        size="sm"
        color="warning"
        onClick={() =>
          GoToTruePage(+statusId, "ProvinceJobRequestFlow", id.toString())
        }
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

export { Actions };
