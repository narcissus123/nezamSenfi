import React from "react";
import { FileMinus } from "react-feather";
import { Link, useHistory } from "react-router-dom";
import { Button } from "reactstrap";

interface IPropTypes {
  cell: {
    row: {
      values: { id: number };
      original: any;
    };
  };
  setTableData: any
}

const Actions: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id },
      original,
    },
  },
  setTableData
}) => {
  const history = useHistory();

  const onDelete = () => {
    setTableData((prev:any) => {
      return prev.filter((val: any) => val.id !== id);
    })
  }

  return (
    <div
      className="d-flex justify-content-center align-content-center"
      style={{ flexWrap: "wrap" }}
    >
       <Button
        style={{ margin: "3px" }}
        size="sm"
        color="danger"
        onClick={onDelete}
      >
        حذف &nbsp;
        <FileMinus
          style={{ position: "relative", top: "-2px" }}
          size={12}
          color="white"
        />
      </Button>
    </div>
  );
};

export { Actions };
