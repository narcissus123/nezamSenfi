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
  setDistancesBoundariesList: (value: any) => void;
  setInitialValues: (value: any) => void;
  isExpert: boolean;
}

const Action: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id },
      original,
    },
  },
  setDistancesBoundariesList,
  setInitialValues,
  isExpert,
}) => {
  const deleteItem = () => {
    setDistancesBoundariesList((old: any) => {
      const newList = old.filter((item: any) => item.id !== id);
      return newList;
    });
  };

  const editBoundaries = () => {
    setInitialValues({
      ...original,
      distance: parseFloat(original.distance).toFixed(2),
      realDistance: original.distance,
      hasBoundaries: true,
    });
  };

  return (
    <div className="d-flex justify-content-center align-content-center">
      <Button
        style={{ margin: "3px" }}
        size="sm"
        color="warning"
        onClick={editBoundaries}
        disabled={!isExpert}
      >
        ویرایش &nbsp;
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
        onClick={deleteItem}
        disabled={!isExpert}
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
