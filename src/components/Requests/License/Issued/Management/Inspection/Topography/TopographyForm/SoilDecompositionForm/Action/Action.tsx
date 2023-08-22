import React from "react";
import { Delete, Edit } from "react-feather";
import { Button } from "reactstrap";

interface IPropTypes {
  cell: {
    row: {
      values: any;
      original: any;
    };
  };
  setSoilDecompositionList: (val: any) => void;
  setInitialValue: (val: any) => void;
  disabled: boolean;
}

const Action: React.FC<IPropTypes> = ({
  cell: {
    row: { values, original },
  },
  setSoilDecompositionList,
  setInitialValue,
  disabled,
}) => {
  const onDelete = () => {
    setSoilDecompositionList((old: any) =>
      old.filter((item: any) => item !== original)
    );
  };

  return (
    <div className="d-flex justify-content-center align-content-center">
      <Button
        style={{ margin: "3px" }}
        size="sm"
        color="warning"
        onClick={() => setInitialValue(original)}
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
        onClick={onDelete}
        disabled={disabled}
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
