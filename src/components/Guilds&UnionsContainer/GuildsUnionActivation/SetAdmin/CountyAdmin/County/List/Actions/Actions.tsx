import React from "react";
import { File } from "react-feather";
import { Link, useHistory } from "react-router-dom";
import { Button } from "reactstrap";

interface IPropTypes {
  cell: {
    row: {
      values: { id: number };
      original: any;
    };
  };
}

const Actions: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id },
      original,
    },
  },
}) => {
  const history = useHistory();

  return (
    <div
      className="d-flex justify-content-center align-content-center"
      style={{ flexWrap: "wrap" }}
    >
      <Link target="_blank" to={`/UserList/RealUsersList/${id}`}>
        <Button
          style={{ margin: "3px" }}
          size="sm"
          color="warning"
          onClick={() => {}}
        >
          جزییات &nbsp;
          <File
            style={{ position: "relative", top: "-2px" }}
            size={12}
            color="white"
          />
        </Button>
      </Link>
    </div>
  );
};

export { Actions };
