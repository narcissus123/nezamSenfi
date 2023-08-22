import * as React from "react";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";

interface IPropTypes {
  cell: {
    row: {
      values: { id: number };
      id: string;
    };
  };
}

const RealUserListActions: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id },
      id: dataId,
    },
  },
  ...props
}) => {
  // delete and edit icon in row
  const history = useHistory();

  return (
    <div className="d-flex justify-content-center align-content-center">
      <Button
        onClick={() => history.push("/UserList/RealUsersList/" + id)}
        className="btn btn-info"
      >
        مشاهده
      </Button>
    </div>
  );
};

export { RealUserListActions };
