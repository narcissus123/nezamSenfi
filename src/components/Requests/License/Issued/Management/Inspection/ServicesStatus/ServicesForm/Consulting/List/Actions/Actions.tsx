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
          let serviceType: any = [];
          original.serviceType.forEach((row: any, index: any) => {
            serviceType.push({ value: row.serviceType, label: "" });
          });
          let useTypeId: any = [];
          original.useTypeId.forEach((row: any, index: any) => {
            useTypeId.push({ value: row.id, label: "" });
          });
          let ownTools: any = [];

          original.ownTools.forEach((row: any, index: any) => {
            ownTools.push({ value: row.ownTools, label: "" });
          });
          let softwareSkils: any = [];

          original.softwareSkils.forEach((row: any, index: any) => {
            softwareSkils.push({ value: row.softwareSkils, label: "" });
          });

          setInitialValues({
            gradeStatus: {
              value: original.ratingStatusEnum,
              label: original.ratingStatusEnumTitle,
            },
            employmentLicenseStatus: {
              value: original.employmentLicenseStatusEnum,
              label: original.employmentLicenseStatusEnumTitle,
            },
            consultingServiceType: serviceType,
            useTypes: useTypeId,
            ownedTools: ownTools,
            softwareKnowledge: softwareSkils,
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
