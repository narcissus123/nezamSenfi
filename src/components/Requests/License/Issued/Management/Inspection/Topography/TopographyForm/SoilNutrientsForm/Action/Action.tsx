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
  setSoilNutrientList: (val: any) => void;
  setInitialValue: (val: any) => void;
  disabled: boolean;
}

const Action: React.FC<IPropTypes> = ({
  cell: {
    row: { values, original },
  },
  setSoilNutrientList,
  setInitialValue,
  disabled,
}) => {
  const onDelete = () => {
    setSoilNutrientList((old: any) =>
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
        disabled={disabled}
        onClick={onDelete}
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
