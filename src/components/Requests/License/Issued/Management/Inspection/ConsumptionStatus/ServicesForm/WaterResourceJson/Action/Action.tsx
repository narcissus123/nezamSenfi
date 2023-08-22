import React from "react";
import { Delete, Edit } from "react-feather";
import { useHistory, useParams } from "react-router-dom";
import { Button } from "reactstrap";

interface IPropTypes {
  cell: {
    row: {
      values: { id: number };
      original: any;
    };
  };
  setTableData: (val: any) => void;
  setListInitialValue: (val: any) => void;
  isExpert: boolean;
}

const Action: React.FC<IPropTypes> = ({
  cell: {
    row: { values, original },
  },
  setTableData,
  setListInitialValue,
  isExpert,
}) => {
  const onDelete = () => {
    setTableData((old: any) => old.filter((item: any) => item !== original));
  };
  return (
    <div className="d-flex justify-content-center align-content-center">
      <Button
        style={{ margin: "3px" }}
        size="sm"
        color="primary"
        type="button"
        onClick={() => setListInitialValue(original)}
      >
        جزییات &nbsp;
        <Edit
          style={{ position: "relative", top: "-2px" }}
          size={12}
          color="white"
        />
      </Button>
      <Button
        style={{ margin: "3px" }}
        size="sm"
        color="danger"
        type="button"
        disabled={!isExpert}
        onClick={() => onDelete()}
      >
        حذف &nbsp;
        <Delete
          style={{ position: "relative", top: "-2px" }}
          size={12}
          color="white"
        />
      </Button>
    </div>
  );
};

export { Action };
