import React from "react";
import { User } from "react-feather";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import { File } from "react-feather";

interface IPropTypes {
  cell: {
    row: {
      values: { id: number , name : any };
    };
  };
}

const Actions: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id, name },
    },
  },
}) => {
  const history = useHistory();

  return (
    <div className="d-flex justify-content-center align-content-center">
      <Button
        style={{ margin: "3px" }}
        size="sm"
        color="info"
        onClick={() => {
          history.push({
            pathname: "/Unions/UnionEdit/" + id,
            state: { unionName: name },
          });
        }}
      >
        کاربران &nbsp;
        <User
          style={{ position: "relative", top: "-2px" }}
          size={12}
          color="white"
        />
      </Button>
      
      <Button
        style={{ margin: "3px" }}
        size="sm"
        color="warning"
        onClick={() => {
          history.push("/UnionsDetails/Union/" + id + "/RegisteryDocs");
        }}
      >
        جزئیات &nbsp;
        <File
          style={{ position: "relative", top: "-2px" }}
          size={12}
          color="white"
        />
      </Button>
    </div>
  );
};

export { Actions };
