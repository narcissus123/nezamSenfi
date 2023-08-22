import React from "react";
import { User } from "react-feather";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";


interface IPropTypes {
  cell: {
    row: {
      values: { id: number , name:any , role : string };
    };
  };
}

const Actions: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id , name , role },
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
          switch (role) {
            case "ادمین":
              history.push({
                pathname: "/Unions/UnionEdit/admin/" + id,
                state: { unionName: name },
              });
              break;
            case "مدیر":
              history.push({
                pathname: "/Unions/UnionEdit/" + id,
                state: { unionName: name },
              });
              break;
          }
        }}
      >
        کاربران &nbsp;
        <User
          style={{ position: "relative", top: "-2px" }}
          size={12}
          color="white"
        />
      </Button>

      {/* <Button
        style={{ margin: "3px" }}
        size="sm"
        color="warning"
        onClick={() => {
          setSelectedUser(id)
          setShowEditModal(true)
        }}
      >
        ویرایش &nbsp;
        <Edit
          style={{ position: "relative", top: "-2px" }}
          size={12}
          color="white"
        />
      </Button> */}

      {/* <Button
        style={{ margin: "3px" }}
        size="sm"
        color="danger"
        onClick={() => {
          deleteClickHandler(id);
        }}
      >
        حذف &nbsp;
        <FileMinus
          style={{ position: "relative", top: "-2px" }}
          size={12}
          color="white"
        />
      </Button> */}
    </div>
  );
};

export { Actions };
