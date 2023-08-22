import React, { useState } from "react";
import { Edit, FileMinus } from "react-feather";
import { Button } from "reactstrap";

interface IPropTypes {
  cell: {
    row: {
      values: { id: number };
      original: any;
    };
  };
  setTableData: any;
  setInitialValues: any;
  setIsInEditMode: any;
  setEditRowID: any;
  isExpert: boolean;
}

const TreesListActions: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id },
      original,
    },
  },
  setTableData,
  setInitialValues,
  setIsInEditMode,
  setEditRowID,
  isExpert,
}) => {
  const deleteClickHandler = () => {
    setTableData((prev: any) => {
      return prev.filter((val: any) => val.id !== id);
    });
  };

  return (
    <div className="d-flex justify-content-center align-content-center">
      <Button
        style={{ margin: "3px" }}
        size="sm"
        color="warning"
        onClick={() => {
          setInitialValues({
            hasTree: true,
            treesType: {
              value: original.treeTypeEnum,
              label: original.treeTypeEnumTitle,
            },
            productItem: {
              value: original.figureId,
              label: original.figureIdTitle,
            },
            seedlingBase: {
              value: original.seedlingBaseEnum,
              label: original.seedlingBaseEnumTitle,
            },
            seedlingPreparationCenter: {
              value: original.seedlingPreparationCenterId,
              label: original.seedlingPreparationCenterIdTitle,
            },
            areaUnderCultivation: original.cultivatedArea,
            treeAge: {
              value: original.ageOfTreesEnum,
              label: original.ageOfTreesEnumTitle,
            },
            treeLength: original.treeDimensionsLength,
            treeWidth: original.treeDimensionsWidth,
            productFactor: {
              value: original.productionFactorId,
              label: original.productionFactorTitle,
            },
            productName: {
              value: original.productId,
              label: original.productTitle,
            },
          });
          setIsInEditMode(true);
          setEditRowID(id);
        }}
      >
        {isExpert ? "ویرایش" : "جزییات"} &nbsp;
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
        disabled={!isExpert}
        onClick={() => {
          deleteClickHandler();
        }}
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

export { TreesListActions };
