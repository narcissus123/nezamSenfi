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

const CapacityListActions: React.FC<IPropTypes> = ({
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
            job: { value: original.job, label: original.jobTitle },
            productionFactor: {
              value: original.productionFactorId,
              label: original.productionFactorIdTitle,
              typeOfDependence: original.typeOfDependence,
            },
            activityRate: original.activityRate,
            numberOfyears: {
              value: original.periodInYearEnum,
              label: original.periodInYearEnumTitle,
            },
            productionYearNum: {
              value: original.productionYearNum,
              label: original.productionYearNum,
            },
            mainProductName: {
              value: original.mainProductName,
              label: original.mainProductNameTitle,
              maximumCapacity: original.maximumCapacity,
            },
            mainProductItem: {
              value: original.figureId,
              label: original.figureIdTitle,
            },
            productionUnitOfActivity: original.productionUniPerYear,
            productionFactorMachineId: {
              value: original.productionFactorMachineId,
              label: original.productionFactorMachineIdTitle,
              machineId: original.machineId,
            },
            productionFactorMachineAgricultureToolsAndServiceId: {
              value:
                original.productionFactorMachineAgricultureToolsAndServiceId,
              label:
                original.productionFactorMachineAgricultureToolsAndServiceIdTitle,
              agricultureToolsAndServiceId:
                original.agricultureToolsAndServiceId,
            },
            numberOfAgriculturalToolsAndService:
              original.numberOfAgriculturalToolsAndService,
            ownToolsEnum: {
              value: original.ownToolsEnum,
              label: original.ownToolsEnumTitle,
            },
            productId: {
              value: original.productId,
              label: original.productIdTitle,
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

export { CapacityListActions };
