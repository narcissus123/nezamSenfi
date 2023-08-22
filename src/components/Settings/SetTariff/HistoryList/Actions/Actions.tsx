import React from "react";
import { FileMinus } from "react-feather";
import { Button } from "reactstrap";

interface IPropTypes {
  cell: {
    row: {
      values: any;
      original: { createdByName: string; createdByLastName: string };
    };
  };
}

const Actions: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values,
      original: { createdByLastName, createdByName },
    },
  },
}) => {
  return (
    <div
      className="d-flex justify-content-center align-content-center"
      style={{ flexWrap: "wrap" }}
    >
      <p style={{ margin: "0" }}>
        {createdByName} {createdByLastName}
      </p>
    </div>
  );
};

export { Actions };
