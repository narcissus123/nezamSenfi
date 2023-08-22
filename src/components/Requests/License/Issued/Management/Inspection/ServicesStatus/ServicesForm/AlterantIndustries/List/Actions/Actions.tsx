import React from "react";
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

const Actions: React.FC<IPropTypes> = ({
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
            productionYearNum: {
              value: original.productionYearNum,
              label: original.productionYearNumTitle,
            },
            consumptionStatusEnum: {
              value: original.consumptionStatusEnum,
              label: original.consumptionStatusEnumTitle,
            },
            unitHealthStatusEnum: {
              value: original.unitHealthStatusEnum,
              label: original.unitHealthStatusEnumTitle,
            },
            licenseNumber: original.licenseNumber,
            issueDate: original.issueDate,
            validityDuration: original.validityDuration,
            healthCode: original.healthCode,
            machineryId: {
              value: original.machineryId,
              label: original.machineryIdTitle,
            },
            machineManufacturerId: {
              value: original.machineManufacturerId,
              label: original.machineManufacturerIdTitle,
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

export { Actions };
