import React from "react";
import { Eye } from "react-feather";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";


interface IPropTypes {
  cell: {
    row: {
      values: { id: number , name:any };
    };
  };
}

const Actions: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id , name },
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
            pathname: "/Tickets/MyTickets/" + id,
          });
        }}
      >
        نمایش &nbsp;
        <Eye
          style={{ position: "relative", top: "-2px" }}
          size={12}
          color="white"
        />
      </Button>
    </div>
  );
};

export { Actions };
