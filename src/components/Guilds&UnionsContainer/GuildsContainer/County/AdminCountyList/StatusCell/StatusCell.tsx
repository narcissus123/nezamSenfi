import React from "react";
import { Badge } from "reactstrap";


interface IPropTypes {
  cell: {
    row: {
      values: { status : any };
    };
  };
}

const StatusCell: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { status },
    },
  },
}) => {
  return (
    <div>
      {status === "تایید شده" ? (
        <Badge color="success">{status}</Badge>
      ) : (
        <Badge color="warning">{status}</Badge>
      )}
    </div>
  );
};

export { StatusCell };
