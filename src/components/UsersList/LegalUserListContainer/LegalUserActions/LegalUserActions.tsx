import React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";

interface IPropTypes {
  cell: {
    row: {
      values: { id: number };
    };
  };
}

const LegalUserActions: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id },
    },
  },
}) => {
  // delete and edit icon in row
  const history = useHistory();

  return (
    <div className="d-flex justify-content-center align-content-center">
      <Button
        onClick={() => history.push("/UserList/LegalUsersList/" + id)}
        className="btn btn-info"
      >
        مشاهده
      </Button>
    </div>
  );
};

export { LegalUserActions };
