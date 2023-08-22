import React from "react";
import { User } from "react-feather";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";


interface IPropTypes {
  cell: {
    row: {
      values: { id: number , name:any , role : string , title : any};
    };
  };
}

const Actions: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id , name , role , title },
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
                pathname: "/Guilds/province/admin/" + id,
                state: { provinceName: title , title: name },
              });
              break;
            case "مدیر":
              history.push({
                pathname: "/Guilds/province/" + id,
                state: { provinceName: title , title : name },
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
