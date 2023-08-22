import React, { useState } from "react";
import { Edit, FileMinus } from "react-feather";
import { Button } from "reactstrap";
import {
  fullOption,
  simpleOption,
} from "../../../../../../../../../../core/utils";

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

const FacilitiesListActions: React.FC<IPropTypes> = ({
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

  const ventilationData = [
    {
      label: "انتخاب کنید ",
      options: [
        { value: 1, label: "خوب" },
        { value: 2, label: "متوسط" },
        { value: 3, label: "نامطلوب" },
      ],
    },
  ];

  const buildingLicense = [
    {
      label: "انتخاب کنید...",
      options: [
        { value: 1, label: "دارای مجوز" },
        { value: 2, label: "فاقد مجوز" },
      ],
    },
  ];

  const ElectricityData = [
    {
      label: "انتخاب کنید ",
      options: [
        { value: 1, label: "شبکه کابل کشی کامل" },
        { value: 2, label: "شبکه کابل کشی ناقص" },
        { value: 3, label: "موتور برق سیار و کابل کشی ناقص" },
        { value: 4, label: "فاقد کابل کشی" },
        { value: 5, label: "سایر" },
      ],
    },
  ];

  const waterData = [
    {
      label: "انتخاب کنید ",
      options: [
        { value: 1, label: "شبکه آبرسانی کامل مکانیزه" },
        { value: 2, label: "شبکه آبرسانی ناقص و نیمه مکانیزه" },
        { value: 3, label: "آبرسانی سنتی و فاقد هرگونه شبکه" },
        { value: 4, label: "سایر" },
      ],
    },
  ];

  const WastewaterData = [
    {
      label: "انتخاب کنید ",
      options: [
        { value: 1, label: "شبکه یا کانال کشی کامل و دارای سپتیک تانک" },
        { value: 2, label: "شبکه یا کانال کشی ناقص و فاقد سپتیک تانک" },
        { value: 3, label: "فاقد هرگونه شبکه و کانال" },
        { value: 4, label: "سایر" },
      ],
    },
  ];

  const coldAndWarmthData = [
    {
      label: "انتخاب کنید ",
      options: [
        { value: 1, label: "دارای سیستم گرمایشی مدرن" },
        { value: 2, label: "دارای سیستم گرمایشی سنتی" },
        { value: 3, label: "دارای سیستم سرمایشی مدرن" },
        { value: 4, label: "دارای سیستم سرمایشی سنتی" },
        { value: 5, label: "فاقد هرگونه سیستم سرمایشی و گرمایشی" },
      ],
    },
  ];

  const depthOfPumpInstallationData = [
    { value: 1, label: "کمتر از 20 متر" },
    { value: 2, label: "20 الی 50 متر" },
    { value: 3, label: "50 الی 75 متر" },
    { value: 4, label: "75 الی 100 متر" },
    { value: 5, label: "100 الی 150 متر" },
    { value: 6, label: "150 الی 200 متر" },
    { value: 7, label: "200 الی 250 متر" },
    { value: 8, label: "250 الی 300 متر" },
    { value: 9, label: "300 الی 350 متر" },
    { value: 10, label: "350 الی 400 متر" },
    { value: 11, label: "400 الی 450 متر" },
    { value: 12, label: "بیش از 450 متر" },
  ];

  return (
    <div className="d-flex justify-content-center align-content-center">
      <Button
        style={{ margin: "3px" }}
        size="sm"
        color="warning"
        onClick={() => {
          let facilityDocumentIds: any = [];

          try {
            if (original.facilityDocumentIds) {
              original.facilityDocumentIds.forEach((row: any) => {
                facilityDocumentIds.push({ value: row, label: "" });
              });
            }
          } catch (error) {
            console.log(error);
          }

          let mainBuildingDocumentsIds: any = [];

          try {
            if (original.mainBuildingDocumentsIds) {
              original.mainBuildingDocumentsIds.forEach((row: any) => {
                mainBuildingDocumentsIds.push({ value: row, label: "" });
              });
            }
          } catch (error) {
            console.log(error);
          }


          let fencesTypeList: any = [];
        
          let geographicalDirectionsList: any = [];
        
          let materialsTypeList: any = [];


          try {
           
            if (original.fencesTypeList) {
              original.fencesTypeList.forEach((row: any) => {
                fencesTypeList.push({ value: row, label: "" });
              });
            }
            if (original.geographicalDirectionsList) {
              original.geographicalDirectionsList.forEach((row: any) => {
                geographicalDirectionsList.push({ value: row, label: "" });
              });
            }
            if (original.materialsTypeList) {
              original.materialsTypeList.forEach((row: any) => {
                materialsTypeList.push({ value: row, label: "" });
              });
            }

          } catch (error) {
            console.log(error);
          }

          //setInitialValues(null);



          setInitialValues({
            hasFacilitie: true,

            facilityDocumentIds: facilityDocumentIds,
            mainBuildingDocumentsIds: mainBuildingDocumentsIds,

            buildingLicense: original.isHaveLicenseNumber,
            buildingLicenseNumber: original.buildingLicenseNumber,
            buildingLicenseDate: original.buildingLicenseDate,

            fencesTypeList: fencesTypeList,
            geographicalDirectionsList: geographicalDirectionsList,
            materialsTypeList: materialsTypeList,
            perimeter:original.perimeter,

            buildingType: {
              value: original.buildingType,
              label: original.buildingTypeTitle,
              form: original.buildingTypeForm,
            },
            length: original.length,
            width: original.width,
            area: original.width * original.length,
            longitude: original.centerPointX,
            latitude: original.centerPointY,
            Floor: { value: original.floor, label: original.floorTitle },
            buildingLicenseStatus: fullOption(
              original.buildingPermitStatus,
              buildingLicense
            ),
            buldingAge: {
              value: original.buldingAge,
              label: original.buldingAgeTitle,
            },
            wallCovering: {
              value: original.wallCovering,
              label: original.wallCoveringTitle,
            },
            floorCovering: {
              value: original.floorCovering,
              label: original.floorCoveringTitle,
            },

            wellLocationEnum: {
              value: original.wellLocationEnum,
              label: original.wellLocationEnumTitle
                ? original.wellLocationEnumTitle
                : "",
            },

            roofCovering: {
              value: original.roofCovering,
              label: original.roofCoveringTitle,
            },
            washability: original.washability,
            describe: original.otherDetails,
            ventilation: fullOption(
              original.lightingAndVentilation,
              ventilationData
            ),
            Electricity: fullOption(
              original.electricityStatus,
              ElectricityData
            ),
            water: fullOption(original.watherStatus, waterData),
            Wastewater: fullOption(original.wastewaterStatus, WastewaterData),
            coldAndWarmth: fullOption(
              original.refrigerationStatus,
              coldAndWarmthData
            ),
            powerSource: {
              value: original.powerSupplySourceEnum,
              label: original.powerSupplySourceEnumTitle,
            },
            waterSource: {
              value: original.waterSupplySourceEnum,
              label: original.waterSupplySourceEnumTitle,
            },
            electricityTariff: {
              value: original.electricityTariffEnum,
              label: original.electricityTariffEnumTitle,
            },
            fuelSource: {
              value: original.fuelSupplySourceEnum,
              label: original.fuelSupplySourceEnumTitle,
            },
            electricPower: {
              value: original.electricPowerEnum,
              label: original.electricPowerEnumTitle,
            },
            waterTariff: {
              value: original.watherTariffEnum,
              label: original.watherTariffEnumTitle,
            },

            isHaveTelephon: original.isHaveTelephon,
            isHaveInternet: original.isHaveInternet,
            isHaveCCTV: original.isHaveCCTV,
            isHaveAdministrativeSystem: original.isHaveAdministrativeSystem,
            isHaveFertilizerDryingSystem: original.isHaveFertilizerDryingSystem,
            isHaveClassificationEquipment:
              original.isHaveClassificationEquipment,
            isHaveWeighingEquipment: original.isHaveWeighingEquipment,
            isHaveFeedProductionSystem: original.isHaveFeedProductionSystem,
            isHaveAtumaticWaterAndPower: original.isHaveAtumaticWaterAndPower,
            isHaveQualityControlSystem: original.isHaveQualityControlSystem,
            isHaveTransferEquipment: original.isHaveTransferEquipment,

            waterWellWallId: {
              value: original.waterWellWallId,
              label: original.waterWellWallIdTitle,
            },
            enginePowerEngineTypeId: {
              value: original.enginePowerEngineTypeId,
              label: original.enginePowerTitle,
            },
            engineType: {
              value: 0,
              label: original.engineTypeTitle,
            },
            depthOfWell: {
              value: original.depthOfWell,
              label: original.depthOfWellTitle,
            },
            depthOfPumpInstallation: simpleOption(
              original.depthOfPumpInstallation,
              depthOfPumpInstallationData
            ),
            facilityBuildingsId: {
              value: original.facilityBuildingsId,
              label: original.facilityBuildingsTitle,
            },
          });

         
          setIsInEditMode(true);
          setEditRowID(id);
        }}
      >
        {!isExpert ? "جزییات" : "ویرایش"} &nbsp;
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

export { FacilitiesListActions };
