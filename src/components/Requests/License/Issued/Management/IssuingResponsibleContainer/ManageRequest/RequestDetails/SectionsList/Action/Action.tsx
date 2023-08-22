import React from "react";
import { Edit } from "react-feather";
import { Link, useParams } from "react-router-dom";
import { Button } from "reactstrap";

interface IPropTypes {
  cell: {
    row: {
      values: { id: number };
    };
  };
}

const Action: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id },
    },
  },
}) => {
  const { id: req_id } = useParams<any>();

  return (
    <div className="d-flex justify-content-center align-content-center">
      <Link
        target="_blank"
        to={`/IssueingResponsible/Inspection/10/GeographicalLocation/${req_id}/${id}`}
      >
        <Button
          style={{ margin: "3px" }}
          size="sm"
          color="warning"
          onClick={() => {}}
        >
          جزییات &nbsp;
          <Edit
            style={{ position: "relative", top: "-2px" }}
            size={12}
            color="white"
          />
        </Button>
      </Link>
    </div>
  );
};

export { Action };
