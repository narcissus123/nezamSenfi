import React from "react";
import { User } from "react-feather";
import { UseMutationResult } from "react-query";
import { useHistory } from "react-router-dom";
import { Button } from "reactstrap";
import { File } from 'react-feather'

interface IPropTypes {
  cell: {
    row: {
      values: { id: number , name : any};
    };
  };
  mutation : UseMutationResult
  setShowEditModal : (id:any) => void,
  setSelectedUser : (id:any) => void,
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
          history.push( {
            pathname: "/Guilds/CountyEdit/" + id,
            state: { countyName: name }
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
          history.push("/GuildsDetails/County/" + id + "/RegisteryDocs");
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
