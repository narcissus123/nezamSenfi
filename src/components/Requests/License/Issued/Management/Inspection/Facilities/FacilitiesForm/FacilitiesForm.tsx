import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { ToastTypes } from "../../../../../../../../core/enums";
import * as Yup from "yup";
import {
  useGetSelcetOptionOfEnum,
  useSetBuildingOfLicenseReuestSection,
} from "../../../../../../../../core/services/api";
import { showToast } from "../../../../../../../../core/utils";
import { inpectionFacilitiesValidation } from "../../../../../../../../core/validations/inpection-facilities.validation";
import {
  FieldWrapper,
  MultiSelectOption,
  SubmitButton,
  TextArea,
  TextInput,
  Toggle,
} from "../../../../../../../common/Form";
import BasicSelectOption from "../../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { TwoColumn } from "../../../../../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";
import { EquipmentStatusInputs } from "./EquipmentStatusInputs";
import { FacilitiesList } from "./FacilitiesList/FacilitiesList";
import { FacilitiesStatusInputs } from "./FacilitiesStatusInputs";
import { LandDetails } from "./LandDetails/LandDetails";
import { LicenseBuildingInputs } from "./LicenseBuildingInputs";
import { TelecommunicationsInputs } from "./TelecommunicationsInputs";
import { WaterSupplyStatusInputs } from "./WaterSupplyStatusInputs";
import { WaterWellInputs } from "./WaterWellInputs";

interface IPropTypes {
  refetch: any;
  facilityData: any;
  facilityDataIsFetching: boolean;
  buildingsData: any;
  isExpert?: boolean;
  getSection: any;
}

const FacilitiesForm: React.FC<IPropTypes> = ({
  refetch,
  facilityData,
  facilityDataIsFetching,
  buildingsData,
  isExpert,
  getSection,
}) => {
  const [validationControll, setValidationControll] = useState(false);
  const [point, setPoint] = useState<{ lat: number; lng: number }>({
    lat: 0,
    lng: 0,
  });

  const [floor, setFloor] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);
  const [buildingLicense, setBuildingLicense] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [
        { value: 1, label: "دارای مجوز" },
        { value: 2, label: "فاقد مجوز" },
      ],
    },
  ]);
  const [wallCovering, setWallCovering] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);
  const [roofCovering, setRoofCovering] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);
  const [floorCovering, setFloorCovering] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const [fencesTypeListData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [
        { value: 1, label: "دیوار" },
        { value: 2, label: "فنس" },
        { value: 3, label: "سیم خاردار" },
        { value: 4, label: "نرده فلزی" },
        { value: 5, label: "پرچین و چپر" },
      ],
    },
  ]);
  const [geographicalDirectionsListData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [
        { value: 1, label: "شمال" },
        { value: 2, label: "جنوب" },
        { value: 3, label: "شرق" },
        { value: 4, label: "غرب" },
      ],
    },
  ]);
  const [materialsTypeListData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [
        { value: 1, label: "سنگ" },
        { value: 2, label: "سیمان" },
        { value: 3, label: "آجر" },
        { value: 4, label: "بلوک" },
        { value: 5, label: "خشت خام" },
        { value: 6, label: "کاه گل" },
        { value: 7, label: "پروفیل فلزی" },
      ],
    },
  ]);

  const [initialValues, setInitialValues] = useState<any>({
    // must create model in core
    hasFacilitie: false,
    buildingLicense: false,
    buildingLicenseNumber: "",
    buildingLicenseDate: "",
    depthOfPumpInstallation: null,
    buildingType: null,
    length: 0,
    width: 0,
    area: 0,
    longitude: 0,
    latitude: 0,
    Floor: null,
    buildingLicenseStatus: null,
    buldingAge: null,
    wallCovering: null,
    floorCovering: null,
    roofCovering: null,
    washability: false,
    describe: "",
    ventilation: null,
    Electricity: null,
    water: null,
    Wastewater: null,
    coldAndWarmth: null,

    powerSource: null,
    waterSource: null,
    electricityTariff: null,
    fuelSource: null,
    electricPower: null,
    waterTariff: null,

    wellLocationEnum: null,
    fencesTypeList: null,
    geographicalDirectionsList: null,
    materialsTypeList: null,
    perimeter: "",
  });

  const setValuesToDefault = () => {
    setInitialValues({
      hasFacilitie: true,
      buildingLicense: false,
      buildingLicenseNumber: "",
      buildingLicenseDate: "",
      depthOfPumpInstallation: null,
      buildingType: null,
      length: 0,
      width: 0,
      area: 0,
      longitude: 0,
      latitude: 0,
      Floor: null,
      buildingLicenseStatus: null,
      buldingAge: null,
      wallCovering: null,
      floorCovering: null,
      roofCovering: null,
      washability: false,
      describe: "",
      ventilation: null,
      Electricity: null,
      water: null,
      Wastewater: null,
      coldAndWarmth: null,

      powerSource: null,
      waterSource: null,
      electricityTariff: null,
      fuelSource: null,
      electricPower: null,
      waterTariff: null,

      fencesTypeList: null,
      geographicalDirectionsList: null,
      materialsTypeList: null,
      perimeter: "",
    });
  };

  const [buildingTypes, setBuildingTypes] = useState<any>([]);
  const [counter, setCounter] = useState<number>(1);
  const [isInEditMode, setIsInEditMode] = useState<boolean>(false);
  const [editRowID, setEditRowID] = useState<number>(0);
  const [tableData, setTableData] = useState<any>([]);
  const [polyLine, setPolyline] = useState<{ lat: number; lng: number }[]>([]);

  const { section_id } = useParams<{ section_id: string }>();

  const [buldingAgeData, setBuildingAgeData] = useState<any>([]);

  const setMutation = useSetBuildingOfLicenseReuestSection();

  const floorEnumMutation = useGetSelcetOptionOfEnum();
  const buildingAgeEnumMutation = useGetSelcetOptionOfEnum();
  const buildingLicenseEnumMutation = useGetSelcetOptionOfEnum();
  const wallCoveringEnumMutation = useGetSelcetOptionOfEnum();
  const roofCoveringEnumMutation = useGetSelcetOptionOfEnum();
  const floorCoveringEnumMutation = useGetSelcetOptionOfEnum();

  useEffect(() => {
    floorEnumMutation.mutate("FloorEnum", {
      onSuccess: (val: any) => {
        const result = val.data.result;
        if (result) {
          let newOptions: any = [];
          let newList = [
            {
              label: "انتخاب کنید ...",
              options: [],
            },
          ];

          result.forEach((row: any) => {
            newOptions.push({ value: row.id, label: row.title });
          });
          newList[0].options = newOptions;
          setFloor(newList);
        }
      },
    });
  }, []);
  // useEffect(() => {
  //   buildingLicenseEnumMutation.mutate("BuildingLicenseEnum", {
  //     onSuccess: (val: any) => {
  //       const result = val.data.result;
  //       if (result) {
  //         let newOptions: any = [];
  //         let newList = [
  //           {
  //             label: "انتخاب کنید ...",
  //             options: [],
  //           },
  //         ];

  //         result.forEach((row: any) => {
  //           newOptions.push({ value: row.id, label: row.title });
  //         });
  //         newList[0].options = newOptions;
  //         setBuildingLicense(newList);
  //       }
  //     },
  //   });
  // }, []);

  useEffect(() => {
    buildingAgeEnumMutation.mutate("BuildingAgeEnum", {
      onSuccess: (val: any) => {
        const result = val.data.result;
        if (result) {
          let newOptions: any = [];
          let newList = [
            {
              label: "انتخاب کنید ...",
              options: [],
            },
          ];

          result.forEach((row: any) => {
            newOptions.push({ value: row.id, label: row.title });
          });
          newList[0].options = newOptions;
          setBuildingAgeData(newList);
        }
      },
    });
  }, []);

  useEffect(() => {
    wallCoveringEnumMutation.mutate("WallCoveringEnum", {
      onSuccess: (val: any) => {
        const result = val.data.result;
        if (result) {
          let newOptions: any = [];
          let newList = [
            {
              label: "انتخاب کنید ...",
              options: [],
            },
          ];

          result.forEach((row: any) => {
            newOptions.push({ value: row.id, label: row.title });
          });
          newList[0].options = newOptions;
          setWallCovering(newList);
        }
      },
    });
  }, []);
  useEffect(() => {
    roofCoveringEnumMutation.mutate("RoofCoveringEnum", {
      onSuccess: (val: any) => {
        const result = val.data.result;
        if (result) {
          let newOptions: any = [];
          let newList = [
            {
              label: "انتخاب کنید ...",
              options: [],
            },
          ];

          result.forEach((row: any) => {
            newOptions.push({ value: row.id, label: row.title });
          });
          newList[0].options = newOptions;
          setRoofCovering(newList);
        }
      },
    });
  }, []);

  useEffect(() => {
    floorCoveringEnumMutation.mutate("FloorCoveringEnum", {
      onSuccess: (val: any) => {
        const result = val.data.result;
        if (result) {
          let newOptions: any = [];
          let newList = [
            {
              label: "انتخاب کنید ...",
              options: [],
            },
          ];

          result.forEach((row: any) => {
            newOptions.push({ value: row.id, label: row.title });
          });
          newList[0].options = newOptions;
          setFloorCovering(newList);
        }
      },
    });
  }, []);

  useEffect(() => {
    let initialCounter = 1;
    if (buildingsData && buildingsData.data) {
      const buildingsResult = buildingsData.data.result.buildings;
      const wellsResult = buildingsData.data.result.wells;
      const fencesResult = buildingsData.data.result.fences;

      if (
        (buildingsResult && buildingsResult.length > 0) ||
        (wellsResult && wellsResult.length) ||
        (fencesResult && fencesResult.length)
      ) {
        setInitialValues((prev: any) => {
          return { ...prev, hasFacilitie: true };
        });

        buildingsResult.forEach((row: any) => {
          console.log("---in get building --", row.facilityBuildingsId);

          const obj = {
            hasFacilitie: true,
            id: initialCounter,

            facilityDocumentIds: row.facilityDocumentIds,
            mainBuildingDocumentsIds: row.mainBuildingDocumentsIds,

            isHaveLicenseNumber: row.isHaveLicenseNumber,
            buildingLicenseNumber: row.buildingLicenseNumber,
            buildingLicenseDate: row.buildingLicenseDate,

            buildingType: row.facilityBuildingsId ? row.facilityBuildingsId : 0,
            buildingTypeTitle: row.facilityBuildingsTitle
              ? row.facilityBuildingsTitle
              : "",
            buildingTypeForm: 1,
            length: row.length,
            width: row.width,
            area: row.length * row.width,
            centerPointX: row.centerPointX,
            centerPointY: row.centerPointY,
            floor: row.floor ? row.floor : 0,
            floorTitle: row.floorTitle ? row.floorTitle : "",
            buildingPermitStatus: row.buildingPermitStatus
              ? row.buildingPermitStatus
              : 0,
            buildingPermitStatusTitle: row.buildingPermitStatusTitle
              ? row.buildingPermitStatusTitle
              : "",
            buldingAge: row.buildingAge ? row.buildingAge : 0,
            buldingAgeTitle: row.buldingAgeTitle ? row.buldingAgeTitle : "",
            wallCovering: row.wallCovering ? row.wallCovering : 0,
            wallCoveringTitle: row.wallCoveringTitle
              ? row.wallCoveringTitle
              : "",
            floorCovering: row.floorCovering ? row.floorCovering : 0,
            floorCoveringTitle: row.floorCoveringTitle
              ? row.floorCoveringTitle
              : "",
            roofCovering: row.roofCovering ? row.roofCovering : 0,
            roofCoveringTitle: row.roofCoveringTitle
              ? row.roofCoveringTitle
              : "",
            washability: row.washability,
            otherDetails: row.otherDetails,
            lightingAndVentilation: row.lightingAndVentilation
              ? row.lightingAndVentilation
              : 0,
            lightingAndVentilationTitle: row.lightingAndVentilationTitle
              ? row.lightingAndVentilationTitle
              : "",
            electricityStatus: row.electricityStatus
              ? row.electricityStatus
              : 0,
            electricityStatusTitle: row.electricityStatusTitle
              ? row.electricityStatusTitle
              : "",
            watherStatus: row.watherStatus ? row.watherStatus : 0,
            watherStatusTitle: row.watherStatusTitle
              ? row.watherStatusTitle
              : "",
            wastewaterStatus: row.wastewaterStatus ? row.wastewaterStatus : 0,
            wastewaterStatusitle: row.wastewaterStatusitle
              ? row.wastewaterStatusitle
              : "",
            refrigerationStatus: row.refrigerationStatus
              ? row.refrigerationStatus
              : 0,
            refrigerationStatusTitle: row.refrigerationStatusTitle
              ? row.refrigerationStatusTitle
              : "",

            powerSupplySourceEnum: row.powerSupplySourceEnum
              ? row.powerSupplySourceEnum
              : 0,
            powerSupplySourceEnumTitle: row.powerSupplySourceEnumTitle
              ? row.powerSupplySourceEnumTitle
              : "",
            waterSupplySourceEnum: row.waterSupplySourceEnum
              ? row.waterSupplySourceEnum
              : 0,
            waterSupplySourceEnumTitle: row.waterSupplySourceEnumTitle
              ? row.waterSupplySourceEnumTitle
              : "",
            electricityTariffEnum: row.electricityTariffEnum
              ? row.electricityTariffEnum
              : 0,
            electricityTariffEnumTitle: row.electricityTariffEnumTitle
              ? row.electricityTariffEnumTitle
              : "",
            fuelSupplySourceEnum: row.fuelSupplySourceEnum
              ? row.fuelSupplySourceEnum
              : 0,
            fuelSupplySourceEnumTitle: row.fuelSupplySourceEnumTitle
              ? row.fuelSupplySourceEnumTitle
              : "",
            electricPowerEnum: row.electricPowerEnum
              ? row.electricPowerEnum
              : 0,
            electricPowerEnumTitle: row.electricPowerEnumTitle
              ? row.electricPowerEnumTitle
              : "",
            watherTariffEnum: row.watherTariffEnum ? row.watherTariffEnum : 0,
            watherTariffEnumTitle: row.watherTariffEnumTitle
              ? row.watherTariffEnumTitle
              : "",

            isHaveTelephon: row.isHaveTelephon,
            isHaveInternet: row.isHaveInternet,
            isHaveCCTV: row.isHaveCCTV,
            isHaveAdministrativeSystem: row.isHaveAdministrativeSystem,
            isHaveFertilizerDryingSystem: row.isHaveFertilizerDryingSystem,
            isHaveClassificationEquipment: row.isHaveClassificationEquipment,
            isHaveWeighingEquipment: row.isHaveWeighingEquipment,
            isHaveFeedProductionSystem: row.isHaveFeedProductionSystem,
            isHaveAtumaticWaterAndPower: row.isHaveAtumaticWaterAndPower,
            isHaveQualityControlSystem: row.isHaveQualityControlSystem,
            isHaveTransferEquipment: row.isHaveTransferEquipment,

            waterWellWallId: row.waterWellWallId ? row.waterWellWallId : 0,
            waterWellWallIdTitle: row.waterWellWallId
              ? row.waterWellWallId.label
              : 0,
            // enginePowerTitle: row.enginePowerTitle,
            enginePowerEngineTypeId: row.enginePowerEngineTypeId
              ? row.enginePowerEngineTypeId
              : 0,
            enginePowerTitle: row.enginePowerTitle ? row.enginePowerTitle : 0,
            engineTypeTitle: row.engineTypeTitle ? row.engineTypeTitle : 0,
            depthOfWell: row.depthOfWell ? row.depthOfWell : 0,
            depthOfWellTitle: row.depthOfWellTitle ? row.depthOfWellTitle : "",
            depthOfPumpInstallation: row.depthOfPumpInstallation
              ? row.depthOfPumpInstallation
              : 0,
            depthOfPumpInstallationTitle: row.depthOfPumpInstallationTitle
              ? row.depthOfPumpInstallationTitle
              : "",
            facilityBuildingsId: row.facilityBuildingsId
              ? row.facilityBuildingsId
              : 0,
          };

          setTableData((prev: any) => {
            return [...prev, obj];
          });

          initialCounter = initialCounter + 1;
        });
        wellsResult.forEach((row: any) => {
          const obj = {
            id: initialCounter,
            isHaveLicenseNumber: row.isHaveLicenseNumber,
            buildingLicenseNumber: row.buildingLicenseNumber,
            buildingLicenseDate: row.buildingLicenseDate,

            buildingType: row.facilityBuildingsId ? row.facilityBuildingsId : 0,
            buildingTypeTitle: row.facilityBuildingsTitle
              ? row.facilityBuildingsTitle
              : "",
            buildingTypeForm: 2,
            length: row.length,
            width: row.width,
            area: row.length * row.width,
            centerPointX: row.centerPointX,
            centerPointY: row.centerPointY,
            floor: row.floor ? row.floor : 0,
            floorTitle: row.floorTitle ? row.floorTitle : "",
            buildingPermitStatus: row.buildingPermitStatus
              ? row.buildingLicenseStatus
              : 0,
            buildingPermitStatusTitle: row.buildingPermitStatusTitle
              ? row.buildingPermitStatusTitle
              : "",
            buldingAge: row.buldingAge ? row.buldingAge : 0,
            buldingAgeTitle: row.buldingAgeTitle ? row.buldingAgeTitle : "",
            wallCovering: row.wallCovering ? row.wallCovering : 0,
            wallCoveringTitle: row.wallCoveringTitle
              ? row.wallCoveringTitle
              : "",
            floorCovering: row.floorCovering ? row.floorCovering : 0,
            floorCoveringTitle: row.floorCoveringTitle
              ? row.floorCoveringTitle
              : "",
            roofCovering: row.roofCovering ? row.roofCovering : 0,
            roofCoveringTitle: row.roofCoveringTitle
              ? row.roofCoveringTitle
              : "",

            wellLocationEnum: row.wellLocationResult.id,
            wellLocationEnumTitle: row.wellLocationResult
              ? row.wellLocationResult.title
              : "",
            washability: row.washability,
            otherDetails: row.otherDetails,
            lightingAndVentilation: row.lightingAndVentilation
              ? row.lightingAndVentilation
              : 0,
            lightingAndVentilationTitle: row.lightingAndVentilationTitle
              ? row.lightingAndVentilationTitle
              : "",
            electricityStatus: row.electricityStatus
              ? row.electricityStatus
              : 0,
            electricityStatusTitle: row.electricityStatusTitle
              ? row.electricityStatusTitle
              : "",
            watherStatus: row.watherStatus ? row.water : 0,
            watherStatusTitle: row.watherStatusTitle
              ? row.watherStatusTitle
              : "",
            wastewaterStatus: row.wastewaterStatus ? row.wastewaterStatus : 0,
            wastewaterStatusitle: row.wastewaterStatusitle
              ? row.wastewaterStatusitle
              : "",
            refrigerationStatus: row.coldAndWarmth ? row.coldAndWarmth : 0,
            refrigerationStatusTitle: row.refrigerationStatusTitle
              ? row.refrigerationStatusTitle
              : "",

            powerSupplySourceEnum: row.powerSupplySourceEnum
              ? row.powerSupplySourceEnum
              : 0,
            powerSupplySourceEnumTitle: row.powerSupplySourceEnumTitle
              ? row.powerSupplySourceEnumTitle
              : "",
            waterSupplySourceEnum: row.waterSupplySourceEnum
              ? row.waterSupplySourceEnum
              : 0,
            waterSupplySourceEnumTitle: row.waterSupplySourceEnumTitle
              ? row.waterSupplySourceEnumTitle
              : "",
            electricityTariffEnum: row.electricityTariffEnum
              ? row.electricityTariffEnum
              : 0,
            electricityTariffEnumTitle: row.electricityTariffEnumTitle
              ? row.electricityTariffEnumTitle
              : "",
            fuelSupplySourceEnum: row.fuelSupplySourceEnum
              ? row.fuelSupplySourceEnum
              : 0,
            fuelSupplySourceEnumTitle: row.fuelSupplySourceEnumTitle
              ? row.fuelSupplySourceEnumTitle
              : "",
            electricPowerEnum: row.electricPowerEnum
              ? row.electricPowerEnum
              : 0,
            electricPowerEnumTitle: row.electricPowerEnumTitle
              ? row.electricPowerEnumTitle
              : "",
            watherTariffEnum: row.watherTariffEnum ? row.watherTariffEnum : 0,
            watherTariffEnumTitle: row.watherTariffEnumTitle
              ? row.watherTariffEnumTitle
              : "",

            isHaveTelephon: row.isHaveTelephon,
            isHaveInternet: row.isHaveInternet,
            isHaveCCTV: row.isHaveCCTV,
            isHaveAdministrativeSystem: row.isHaveAdministrativeSystem,
            isHaveFertilizerDryingSystem: row.isHaveFertilizerDryingSystem,
            isHaveClassificationEquipment: row.isHaveClassificationEquipment,
            isHaveWeighingEquipment: row.isHaveWeighingEquipment,
            isHaveFeedProductionSystem: row.isHaveFeedProductionSystem,
            isHaveAtumaticWaterAndPower: row.isHaveAtumaticWaterAndPower,
            isHaveQualityControlSystem: row.isHaveQualityControlSystem,
            isHaveTransferEquipment: row.isHaveTransferEquipment,

            waterWellWallId: row.waterWellWallId ? row.waterWellWallId : 0,
            waterWellWallIdTitle: row.waterWellWallId
              ? row.waterWellWallId.label
              : 0,
            enginePowerEngineTypeId: row.enginePowerEngineTypeId
              ? row.enginePowerEngineTypeId
              : 0,
            engineTypeTitle: row.engineTypeTitle ? row.engineTypeTitle : 0,
            enginePowerTitle: row.enginePowerTitle ? row.enginePowerTitle : 0,
            depthOfWell: row.depthOfWell ? row.depthOfWell : 0,
            depthOfWellTitle: row.depthOfWellTitle ? row.depthOfWellTitle : "",
            depthOfPumpInstallation: row.depthOfPumpInstallation
              ? row.depthOfPumpInstallation
              : 0,
            depthOfPumpInstallationTitle: row.depthOfPumpInstallationTitle
              ? row.depthOfPumpInstallationTitle
              : "",
            facilityBuildingsId: row.facilityBuildingsId
              ? row.facilityBuildingsId
              : 0,
          };

          setTableData((prev: any) => {
            return [...prev, obj];
          });

          initialCounter = initialCounter + 1;
        });


        fencesResult.forEach((row: any) => {


          let fencesTypeList: any = [];
        
          let geographicalDirectionsList: any = [];
        
          let materialsTypeList: any = [];
  
          
          try {
             
            if (row.fencesTypeList) {
              row.fencesTypeList.forEach((row: any) => {
                fencesTypeList.push( row.id);
              });
            }
            if (row.geographicalDirectionsList) {
              row.geographicalDirectionsList.forEach((row: any) => {
                geographicalDirectionsList.push(row.id);
              });
            }
            if (row.materialsTypeList) {
              row.materialsTypeList.forEach((row: any) => {
                materialsTypeList.push(row.id);
              });
            }
  
          } catch (error) {
            console.log(error);
          }
  

          const obj = {
            id: initialCounter,
            isHaveLicenseNumber: row.isHaveLicenseNumber,
            buildingLicenseNumber: row.buildingLicenseNumber,
            buildingLicenseDate: row.buildingLicenseDate,

            fencesTypeList: fencesTypeList,
            geographicalDirectionsList: geographicalDirectionsList,
            materialsTypeList: materialsTypeList,
            perimeter: row.perimeter,

            buildingType: row.facilityBuildingsId ? row.facilityBuildingsId : 0,
            buildingTypeTitle: row.facilityBuildingsTitle
              ? row.facilityBuildingsTitle
              : "",
            buildingTypeForm: 3,
            length: row.length,
            width: row.width,
            area: "",
            centerPointX: row.centerPointX,
            centerPointY: row.centerPointY,
            floor: row.floor ? row.floor : 0,
            floorTitle: row.floorTitle ? row.floorTitle : "",
            buildingPermitStatus: row.buildingPermitStatus
              ? row.buildingLicenseStatus
              : 0,
            buildingPermitStatusTitle: row.buildingPermitStatusTitle
              ? row.buildingPermitStatusTitle
              : "",
            buldingAge: row.buldingAge ? row.buldingAge : 0,
            buldingAgeTitle: row.buldingAgeTitle ? row.buldingAgeTitle : "",
            wallCovering: row.wallCovering ? row.wallCovering : 0,
            wallCoveringTitle: row.wallCoveringTitle
              ? row.wallCoveringTitle
              : "",
            floorCovering: row.floorCovering ? row.floorCovering : 0,
            floorCoveringTitle: row.floorCoveringTitle
              ? row.floorCoveringTitle
              : "",
            roofCovering: row.roofCovering ? row.roofCovering : 0,
            roofCoveringTitle: row.roofCoveringTitle
              ? row.roofCoveringTitle
              : "",

            wellLocationEnum: row.wellLocationEnum,
            wellLocationEnumTitle: row.wellLocationEnumTitle
              ? row.wellLocationEnumTitle
              : "",
            washability: row.washability,
            otherDetails: row.otherDetails,
            lightingAndVentilation: row.lightingAndVentilation
              ? row.lightingAndVentilation
              : 0,
            lightingAndVentilationTitle: row.lightingAndVentilationTitle
              ? row.lightingAndVentilationTitle
              : "",
            electricityStatus: row.electricityStatus
              ? row.electricityStatus
              : 0,
            electricityStatusTitle: row.electricityStatusTitle
              ? row.electricityStatusTitle
              : "",
            watherStatus: row.watherStatus ? row.water : 0,
            watherStatusTitle: row.watherStatusTitle
              ? row.watherStatusTitle
              : "",
            wastewaterStatus: row.wastewaterStatus ? row.wastewaterStatus : 0,
            wastewaterStatusitle: row.wastewaterStatusitle
              ? row.wastewaterStatusitle
              : "",
            refrigerationStatus: row.coldAndWarmth ? row.coldAndWarmth : 0,
            refrigerationStatusTitle: row.refrigerationStatusTitle
              ? row.refrigerationStatusTitle
              : "",

            powerSupplySourceEnum: row.powerSupplySourceEnum
              ? row.powerSupplySourceEnum
              : 0,
            powerSupplySourceEnumTitle: row.powerSupplySourceEnumTitle
              ? row.powerSupplySourceEnumTitle
              : "",
            waterSupplySourceEnum: row.waterSupplySourceEnum
              ? row.waterSupplySourceEnum
              : 0,
            waterSupplySourceEnumTitle: row.waterSupplySourceEnumTitle
              ? row.waterSupplySourceEnumTitle
              : "",
            electricityTariffEnum: row.electricityTariffEnum
              ? row.electricityTariffEnum
              : 0,
            electricityTariffEnumTitle: row.electricityTariffEnumTitle
              ? row.electricityTariffEnumTitle
              : "",
            fuelSupplySourceEnum: row.fuelSupplySourceEnum
              ? row.fuelSupplySourceEnum
              : 0,
            fuelSupplySourceEnumTitle: row.fuelSupplySourceEnumTitle
              ? row.fuelSupplySourceEnumTitle
              : "",
            electricPowerEnum: row.electricPowerEnum
              ? row.electricPowerEnum
              : 0,
            electricPowerEnumTitle: row.electricPowerEnumTitle
              ? row.electricPowerEnumTitle
              : "",
            watherTariffEnum: row.watherTariffEnum ? row.watherTariffEnum : 0,
            watherTariffEnumTitle: row.watherTariffEnumTitle
              ? row.watherTariffEnumTitle
              : "",

            isHaveTelephon: row.isHaveTelephon,
            isHaveInternet: row.isHaveInternet,
            isHaveCCTV: row.isHaveCCTV,
            isHaveAdministrativeSystem: row.isHaveAdministrativeSystem,
            isHaveFertilizerDryingSystem: row.isHaveFertilizerDryingSystem,
            isHaveClassificationEquipment: row.isHaveClassificationEquipment,
            isHaveWeighingEquipment: row.isHaveWeighingEquipment,
            isHaveFeedProductionSystem: row.isHaveFeedProductionSystem,
            isHaveAtumaticWaterAndPower: row.isHaveAtumaticWaterAndPower,
            isHaveQualityControlSystem: row.isHaveQualityControlSystem,
            isHaveTransferEquipment: row.isHaveTransferEquipment,

            waterWellWallId: row.waterWellWallId ? row.waterWellWallId : 0,
            waterWellWallIdTitle: row.waterWellWallId
              ? row.waterWellWallId.label
              : 0,
            enginePowerEngineTypeId: row.enginePowerEngineTypeId
              ? row.enginePowerEngineTypeId
              : 0,
            engineTypeTitle: row.engineTypeTitle ? row.engineTypeTitle : 0,
            enginePowerTitle: row.enginePowerTitle ? row.enginePowerTitle : 0,
            depthOfWell: row.depthOfWell ? row.depthOfWell : 0,
            depthOfWellTitle: row.depthOfWellTitle ? row.depthOfWellTitle : "",
            depthOfPumpInstallation: row.depthOfPumpInstallation
              ? row.depthOfPumpInstallation
              : 0,
            depthOfPumpInstallationTitle: row.depthOfPumpInstallationTitle
              ? row.depthOfPumpInstallationTitle
              : "",
            facilityBuildingsId: row.facilityBuildingsId
              ? row.facilityBuildingsId
              : 0,
          };

          setTableData((prev: any) => {
            return [...prev, obj];
          });

          initialCounter = initialCounter + 1;
        });






        
        setCounter((prev: number) => {
          return initialCounter;
        });
      }
    }
  }, [buildingsData]);

  const onSubmit = (value: any, { setFieldError }: any) => {
    let facilityDocumentIds: any = [];
    if (value.facilityDocumentIds) {
      value.facilityDocumentIds.forEach((row: any) => {
        facilityDocumentIds.push(row.value);
      });
    }

    let mainBuildingDocumentsIds: any = [];
    if (value.mainBuildingDocumentsIds) {
      value.mainBuildingDocumentsIds.forEach((row: any) => {
        mainBuildingDocumentsIds.push(row.value);
      });
    }


  let fencesTypeList: any = [];
  if (value.fencesTypeList) {
    value.fencesTypeList.forEach((row: any) => {
      fencesTypeList.push(row.value);
    });
  }

  let geographicalDirectionsList: any = [];
  if (value.geographicalDirectionsList) {
    value.geographicalDirectionsList.forEach((row: any) => {
      geographicalDirectionsList.push(row.value);
    });
  }

  let materialsTypeList: any = [];
  if (value.materialsTypeList) {
    value.materialsTypeList.forEach((row: any) => {
      materialsTypeList.push(row.value);
    });
  }



    console.log("---0---", value);
    if (isInEditMode) {
      const obj = {
        id: editRowID,

        facilityDocumentIds: facilityDocumentIds,
        mainBuildingDocumentsIds: mainBuildingDocumentsIds,
        isHaveLicenseNumber: value.buildingLicense,
        buildingLicenseNumber: value.buildingLicenseNumber,
        buildingLicenseDate: value.buildingLicenseDate,

        fencesTypeList: fencesTypeList,
        geographicalDirectionsList: geographicalDirectionsList,
        materialsTypeList: materialsTypeList,
        perimeter: value.perimeter,

        buildingType: value.buildingType ? value.buildingType.value : 0,
        buildingTypeTitle: value.buildingType ? value.buildingType.label : 0,
        buildingTypeForm: value.buildingType ? value.buildingType.form : 0,
        length: value.length,
        width: value.width,
        area: value.width * value.length,
        centerPointX: value.longitude,
        centerPointY: value.latitude,
        floor: value.Floor ? value.Floor.value : 0,
        floorTitle: value.Floor ? value.Floor.label : 0,
        buildingPermitStatus: value.buildingLicenseStatus
          ? value.buildingLicenseStatus.value
          : null,
        buildingPermitStatusTitle: value.buildingLicenseStatus
          ? value.buildingLicenseStatus.label
          : null,
        buldingAge: value.buldingAge ? value.buldingAge.value : 0,
        buldingAgeTitle: value.buldingAge ? value.buldingAge.label : 0,
        wallCovering: value.wallCovering ? value.wallCovering.value : 0,
        wallCoveringTitle: value.wallCovering ? value.wallCovering.label : 0,

        wellLocationEnum: value.wellLocationEnum
          ? value.wellLocationEnum.value
          : 0,
        wellLocationEnumTitle: value.wellLocationEnum
          ? value.wellLocationEnum.label
          : 0,

        floorCovering: value.floorCovering ? value.floorCovering.value : 0,
        floorCoveringTitle: value.floorCovering ? value.floorCovering.label : 0,
        roofCovering: value.roofCovering ? value.roofCovering.value : 0,
        roofCoveringTitle: value.roofCovering ? value.roofCovering.label : 0,
        washability: value.washability,
        otherDetails: value.describe,
        lightingAndVentilation: value.ventilation ? value.ventilation.value : 0,
        lightingAndVentilationTitle: value.ventilation
          ? value.ventilation.label
          : 0,
        electricityStatus: value.Electricity ? value.Electricity.value : 0,
        electricityStatusTitle: value.Electricity ? value.Electricity.label : 0,
        watherStatus: value.water ? value.water.value : 0,
        watherStatusTitle: value.water ? value.water.label : 0,
        wastewaterStatus: value.Wastewater ? value.Wastewater.value : 0,
        wastewaterStatusitle: value.Wastewater ? value.Wastewater.label : 0,
        refrigerationStatus: value.coldAndWarmth
          ? value.coldAndWarmth.value
          : 0,
        refrigerationStatusTitle: value.coldAndWarmth
          ? value.coldAndWarmth.label
          : 0,

        powerSupplySourceEnum: value.powerSource ? value.powerSource.value : 0,
        powerSupplySourceEnumTitle: value.powerSource
          ? value.powerSource.label
          : 0,
        waterSupplySourceEnum: value.waterSource ? value.waterSource.value : 0,
        waterSupplySourceEnumTitle: value.waterSource
          ? value.waterSource.label
          : 0,
        electricityTariffEnum: value.electricityTariff
          ? value.electricityTariff.value
          : 0,
        electricityTariffEnumTitle: value.electricityTariff
          ? value.electricityTariff.label
          : 0,
        fuelSupplySourceEnum: value.fuelSource ? value.fuelSource.value : 0,
        fuelSupplySourceEnumTitle: value.fuelSource
          ? value.fuelSource.label
          : 0,
        electricPowerEnum: value.electricPower ? value.electricPower.value : 0,
        electricPowerEnumTitle: value.electricPower
          ? value.electricPower.label
          : 0,
        watherTariffEnum: value.waterTariff ? value.waterTariff.value : 0,
        watherTariffEnumTitle: value.waterTariff ? value.waterTariff.label : 0,

        isHaveTelephon: value.isHaveTelephon,
        isHaveInternet: value.isHaveInternet,
        isHaveCCTV: value.isHaveCCTV,
        isHaveAdministrativeSystem: value.isHaveAdministrativeSystem,
        isHaveFertilizerDryingSystem: value.isHaveFertilizerDryingSystem,
        isHaveClassificationEquipment: value.isHaveClassificationEquipment,
        isHaveWeighingEquipment: value.isHaveWeighingEquipment,
        isHaveFeedProductionSystem: value.isHaveFeedProductionSystem,
        isHaveAtumaticWaterAndPower: value.isHaveAtumaticWaterAndPower,
        isHaveQualityControlSystem: value.isHaveQualityControlSystem,
        isHaveTransferEquipment: value.isHaveTransferEquipment,

        waterWellWallId: value.waterWellWallId
          ? value.waterWellWallId.value
          : 0,
        waterWellWallIdTitle: value.waterWellWallId
          ? value.waterWellWallId.label
          : 0,
        enginePowerEngineTypeId: value.enginePowerEngineTypeId
          ? value.enginePowerEngineTypeId.value
          : 0,
        enginePowerEngineTypeIdTitle: value.enginePowerEngineTypeId
          ? value.enginePowerEngineTypeId.label
          : 0,
        depthOfWell: value.depthOfWell ? value.depthOfWell.value : 0,
        depthOfWellTitle: value.depthOfWell ? value.depthOfWell.label : 0,
        depthOfPumpInstallation: value.depthOfPumpInstallation
          ? value.depthOfPumpInstallation.value
          : 0,
        depthOfPumpInstallationTitle: value.depthOfPumpInstallation
          ? value.depthOfPumpInstallation.label
          : 0,
        facilityBuildingsId: value.buildingType ? value.buildingType.value : 0,
      };

      setTableData((prev: any) => {
        const lastState = [...prev];
        let findIDIndex = lastState.findIndex(
          (row: any) => row.id === editRowID
        );
        lastState[findIDIndex] = obj;
        return lastState;
      });

      setIsInEditMode(false);
      setEditRowID(0);
    } else {
      let facilityDocumentIds: any = [];
      if (value.facilityDocumentIds) {
        value.facilityDocumentIds.forEach((row: any) => {
          facilityDocumentIds.push(row.value);
        });
      }

      let mainBuildingDocumentsIds: any = [];
      if (value.mainBuildingDocumentsIds) {
        value.mainBuildingDocumentsIds.forEach((row: any) => {
          mainBuildingDocumentsIds.push(row.value);
        });
      }

      const obj = {
        id: counter,

        facilityDocumentIds: facilityDocumentIds,
        mainBuildingDocumentsIds: mainBuildingDocumentsIds,

        isHaveLicenseNumber: value.buildingLicense,
        buildingLicenseNumber: value.buildingLicenseNumber,
        buildingLicenseDate: value.buildingLicenseDate,



        fencesTypeList: fencesTypeList,
        geographicalDirectionsList: geographicalDirectionsList,
        materialsTypeList: materialsTypeList,
        perimeter: value.perimeter,



        buildingType: value.buildingType ? value.buildingType.value : 0,
        buildingTypeTitle: value.buildingType ? value.buildingType.label : 0,
        buildingTypeForm: value.buildingType ? value.buildingType.form : 0,
        length: value.length,
        width: value.width,
        area: value.width * value.length,
        centerPointX: value.longitude,
        centerPointY: value.latitude,
        floor: value.Floor ? value.Floor.value : 0,
        floorTitle: value.Floor ? value.Floor.label : 0,
        buildingPermitStatus: value.buildingLicenseStatus
          ? value.buildingLicenseStatus.value
          : null,
        buildingPermitStatusTitle: value.buildingLicenseStatus
          ? value.buildingLicenseStatus.label
          : null,
        buldingAge: value.buldingAge ? value.buldingAge.value : 0,
        buldingAgeTitle: value.buldingAge ? value.buldingAge.label : 0,
        wallCovering: value.wallCovering ? value.wallCovering.value : 0,
        wallCoveringTitle: value.wallCovering ? value.wallCovering.label : 0,
        floorCovering: value.floorCovering ? value.floorCovering.value : 0,

        wellLocationEnum: value.wellLocationEnum
          ? value.wellLocationEnum.value
          : 0,
        wellLocationEnumTitle: value.wellLocationEnum
          ? value.wellLocationEnum.label
          : 0,

        floorCoveringTitle: value.floorCovering ? value.floorCovering.label : 0,
        roofCovering: value.roofCovering ? value.roofCovering.value : 0,
        roofCoveringTitle: value.roofCovering ? value.roofCovering.label : 0,
        washability: value.washability,
        otherDetails: value.describe,
        lightingAndVentilation: value.ventilation ? value.ventilation.value : 0,
        lightingAndVentilationTitle: value.ventilation
          ? value.ventilation.label
          : 0,
        electricityStatus: value.Electricity ? value.Electricity.value : 0,
        electricityStatusTitle: value.Electricity ? value.Electricity.label : 0,
        watherStatus: value.water ? value.water.value : 0,
        watherStatusTitle: value.water ? value.water.label : 0,
        wastewaterStatus: value.Wastewater ? value.Wastewater.value : 0,
        wastewaterStatusitle: value.Wastewater ? value.Wastewater.label : 0,
        refrigerationStatus: value.coldAndWarmth
          ? value.coldAndWarmth.value
          : 0,
        refrigerationStatusTitle: value.coldAndWarmth
          ? value.coldAndWarmth.label
          : 0,

        powerSupplySourceEnum: value.powerSource ? value.powerSource.value : 0,
        powerSupplySourceEnumTitle: value.powerSource
          ? value.powerSource.label
          : 0,
        waterSupplySourceEnum: value.waterSource ? value.waterSource.value : 0,
        waterSupplySourceEnumTitle: value.waterSource
          ? value.waterSource.label
          : 0,
        electricityTariffEnum: value.electricityTariff
          ? value.electricityTariff.value
          : 0,
        electricityTariffEnumTitle: value.electricityTariff
          ? value.electricityTariff.label
          : 0,
        fuelSupplySourceEnum: value.fuelSource ? value.fuelSource.value : 0,
        fuelSupplySourceEnumTitle: value.fuelSource
          ? value.fuelSource.label
          : 0,
        electricPowerEnum: value.electricPower ? value.electricPower.value : 0,
        electricPowerEnumTitle: value.electricPower
          ? value.electricPower.label
          : 0,
        watherTariffEnum: value.waterTariff ? value.waterTariff.value : 0,
        watherTariffEnumTitle: value.waterTariff ? value.waterTariff.label : 0,

        isHaveTelephon: value.isHaveTelephon,
        isHaveInternet: value.isHaveInternet,
        isHaveCCTV: value.isHaveCCTV,
        isHaveAdministrativeSystem: value.isHaveAdministrativeSystem,
        isHaveFertilizerDryingSystem: value.isHaveFertilizerDryingSystem,
        isHaveClassificationEquipment: value.isHaveClassificationEquipment,
        isHaveWeighingEquipment: value.isHaveWeighingEquipment,
        isHaveFeedProductionSystem: value.isHaveFeedProductionSystem,
        isHaveAtumaticWaterAndPower: value.isHaveAtumaticWaterAndPower,
        isHaveQualityControlSystem: value.isHaveQualityControlSystem,
        isHaveTransferEquipment: value.isHaveTransferEquipment,

        waterWellWallId: value.waterWellWallId
          ? value.waterWellWallId.value
          : 0,
        waterWellWallIdTitle: value.waterWellWallId
          ? value.waterWellWallId.label
          : 0,
        enginePowerEngineTypeId: value.enginePowerEngineTypeId
          ? value.enginePowerEngineTypeId.value
          : 0,
        enginePowerEngineTypeIdTitle: value.enginePowerEngineTypeId
          ? value.enginePowerEngineTypeId.label
          : 0,
        depthOfWell: value.depthOfWell ? value.depthOfWell.value : 0,
        depthOfWellTitle: value.depthOfWell ? value.depthOfWell.label : 0,
        depthOfPumpInstallation: value.depthOfPumpInstallation
          ? value.depthOfPumpInstallation.value
          : 0,
        depthOfPumpInstallationTitle: value.depthOfPumpInstallation
          ? value.depthOfPumpInstallation.label
          : 0,
        facilityBuildingsId: value.buildingType ? value.buildingType.value : 0,
      };

      setTableData((prev: any) => {
        return [...prev, obj];
      });
      setCounter((prev: number) => {
        return prev + 1;
      });
    }

    setValuesToDefault();
  };

  useEffect(() => {
    if (facilityData && facilityData.data) {
      const result = facilityData.data.result;

      let pro: any = [
        {
          label: "مسقف",
          options: [],
        },
        {
          label: "غیر مسقف",
          options: [],
        },
      ];
      result.forEach((facility: any) => {
        if (facility.roofType === 1) {
          pro[0].options.push({
            value: facility.id,
            label: facility.name,
            form: facility.form,
          });
        } else {
          pro[1].options.push({
            value: facility.id,
            label: facility.name,
            form: facility.form,
          });
        }
      });
      setBuildingTypes(pro);
    }
  }, [facilityData]);

  const onFinalSubmit = () => {
    let wellsArray: any = [];
    let facilitiesArray: any = [];
    let fencesArray: any = [];

    tableData.forEach((row: any) => {
      if (row.buildingTypeForm === 1) {
        facilitiesArray.push({
          facilityDocumentIds: row.facilityDocumentIds,
          mainBuildingDocumentsIds: row.mainBuildingDocumentsIds,
          isHaveLicenseNumber: row.isHaveLicenseNumber,
          buildingLicenseNumber: row.buildingLicenseNumber,
          buildingLicenseDate: row.buildingLicenseDate,
          length: row.length,
          width: row.width,
          centerPointX: row.centerPointX,
          centerPointY: row.centerPointY,
          floor: row.floor,
          buildingPermitStatus: row.buildingPermitStatus,
          buildingAge: row.buldingAge,
          wallCovering: row.wallCovering,
          roofCovering: row.roofCovering,
          floorCovering: row.floorCovering,
          washability: row.washability,
          otherDetails: row.otherDetails,
          lightingAndVentilation: row.lightingAndVentilation,
          electricityStatus: row.electricityStatus,
          watherStatus: row.watherStatus,
          wastewaterStatus: row.wastewaterStatus,
          refrigerationStatus: row.refrigerationStatus,
          isHaveTelephon: row.isHaveTelephon,
          isHaveInternet: row.isHaveInternet,
          isHaveCCTV: row.isHaveCCTV,
          isHaveAdministrativeSystem: row.isHaveAdministrativeSystem,
          isHaveFertilizerDryingSystem: row.isHaveFertilizerDryingSystem,
          isHaveQualityControlSystem: row.isHaveQualityControlSystem,
          isHaveClassificationEquipment: row.isHaveClassificationEquipment,
          isHaveAtumaticWaterAndPower: row.isHaveAtumaticWaterAndPower,
          isHaveFeedProductionSystem: row.isHaveFeedProductionSystem,
          isHaveTransferEquipment: row.isHaveTransferEquipment,
          isHaveWeighingEquipment: row.isHaveWeighingEquipment,
          powerSupplySourceEnum: row.powerSupplySourceEnum,
          fuelSupplySourceEnum: row.fuelSupplySourceEnum,
          waterSupplySourceEnum: row.waterSupplySourceEnum,
          electricPowerEnum: row.electricPowerEnum,
          electricityTariffEnum: row.electricityTariffEnum,
          watherTariffEnum: row.watherTariffEnum,
          facilityBuildingsId: row.facilityBuildingsId,
        });
      } else if (row.buildingTypeForm === 2) {
        wellsArray.push({
          length: row.length,
          width: row.width,
          centerPointX: row.centerPointX,
          centerPointY: row.centerPointY,
          otherDetails: row.otherDetails,
          waterWellWallId: row.waterWellWallId,
          enginePowerEngineTypeId: row.enginePowerEngineTypeId,
          depthOfWell: row.depthOfWell,
          depthOfPumpInstallation: row.depthOfPumpInstallation,
          wellLocationEnum: row.wellLocationEnum,
          facilityBuildingsId: row.facilityBuildingsId,
        });
      } else {
        fencesArray.push({
          facilityBuildingsId: row.facilityBuildingsId,
          fencesTypeList: row.fencesTypeList,
          geographicalDirectionsList: row.geographicalDirectionsList,
          materialsTypeList: row.materialsTypeList,
          perimeter: row.perimeter,
        });
      }
    });

    const setFacilitiesObj = {
      licenseRequestSectionId: +section_id,
      buildings: facilitiesArray,
      wells: wellsArray,
      fences: fencesArray,
      industries: []
    };

    setMutation.mutate(setFacilitiesObj, {
      onSuccess: (val: any) => {
        showToast(["با موفقیت انجام شد."], ToastTypes.success);
        refetch();
      },
    });
  };

  const checkOnPolygon = (point: any) => {
    // @ts-ignore
    const bermudaTriangle = new google.maps.Polygon({
      paths: polyLine,
    });
    const curPoint: any = { lat: () => point.lat, lng: () => point.lng };
    // @ts-ignore
    const resultPath = google.maps.geometry.poly.containsLocation(
      curPoint,
      bermudaTriangle
    );
    return resultPath;
  };

  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={Yup.lazy((value: any) => {
          return value.hasFacilitie
            ? inpectionFacilitiesValidation
            : Yup.object();
        })}
        onSubmit={isExpert ? onSubmit : () => {}}
        enableReinitialize={true}
      >
        {({ values, errors, setFieldError, setFieldValue, setErrors }) => {
          return (
            <FieldWrapper setFieldError={setFieldError} useMutate={() => null}>
              <Form>
                <Toggle
                  id="hasFacilitie"
                  name="hasFacilitie"
                  lableText="ساختمان، تأسیسات و تجهیزات "
                  significant
                  direction="ltr"
                  disabled={!isExpert || tableData.length > 0}
                  className="my-1"
                  onChange={(opt: any) => {
                    setFieldValue("hasFacilitie", opt.target.checked);
                    setValidationControll(opt.target.checked);
                  }}
                />
                {values.hasFacilitie && (
                  <>
                    {values.buildingType &&
                      values.buildingType.form !== 2 &&
                      values.buildingType.form !== 3 && (
                        <LicenseBuildingInputs
                          setFieldValue={setFieldValue}
                          values={values}
                          disabled={!isExpert}
                        />
                      )}

                    <TwoColumn>
                      <div>
                        <BasicSelectOption
                          lableText="نوع ساختمان"
                          name="buildingType"
                          isDisabled={!isExpert}
                          data={buildingTypes}
                          isLoading={facilityDataIsFetching}
                          significant
                          onChange={(opt: any, e: any) => {
                            console.log("-opt-", opt);
                            
                            setFieldValue("buildingType", {
                              value: opt.value,
                              label: opt.label,
                              form: opt.form,
                            });
                          }}
                          placeHolder="انتخاب کنید ..."
                        />

                        {values.buildingType && values.buildingType.form === 3 && (
                          <>
                            <MultiSelectOption
                              labelText="نوع حصار"
                              name="fencesTypeList"
                              placeHolder="انتخاب کنید..."
                              significant={true}
                              isLoading={false}
                              options={fencesTypeListData}
                              onChange={(e) =>
                                setFieldValue("fencesTypeList", e)
                              }
                              hasLabel={true}
                            />
                            <MultiSelectOption
                              labelText="جهت جغرافیایی"
                              name="geographicalDirectionsList"
                              placeHolder="انتخاب کنید..."
                              significant={true}
                              isLoading={false}
                              options={geographicalDirectionsListData}
                              onChange={(e) =>
                                setFieldValue("geographicalDirectionsList", e)
                              }
                              hasLabel={true}
                            />
                            <MultiSelectOption
                              labelText="نوع مصالح"
                              name="materialsTypeList"
                              placeHolder="انتخاب کنید..."
                              significant={true}
                              isLoading={false}
                              options={materialsTypeListData}
                              onChange={(e) =>
                                setFieldValue("materialsTypeList", e)
                              }
                              hasLabel={true}
                            />

                            <TextInput
                              lableText="محیط پیرامون"
                              name="perimeter"
                              placeholder="محیط"
                              disabled={!isExpert}
                              significant
                              type="number"
                            />
                          </>
                        )}

                        {values.buildingType && values.buildingType.form !== 3 && (
                          <>
                            <TextInput
                              lableText="طول (متر)"
                              name="length"
                              placeholder="طول (متر)"
                              disabled={!isExpert}
                              significant
                              type="number"
                            />
                            <TextInput
                              lableText="عرض (متر) "
                              name="width"
                              placeholder="عرض (متر)"
                              significant
                              type="number"
                              disabled={!isExpert}
                            />
                            <TextInput
                              lableText="مساحت (متر)"
                              name="area"
                              placeholder="مساحت (متر)"
                              significant
                              type="number"
                              disabled={true}
                              value={(values.width * values.length).toString()}
                            />

                            <TextInput
                              lableText="طول جغرافیایی"
                              name="longitude"
                              placeholder="عرض (متر)"
                              significant
                              type="number"
                              disabled={!isExpert}
                              hasInfo
                              infoUniqueId="longitudeHint"
                              infoTitle="راهنما"
                              info="می تواند از نقشه موجود در انتهای صفحه مختصات مورد نظر را انتخاب کنید."
                            />
                            <TextInput
                              lableText="عرض جغرافیایی"
                              name="latitude"
                              placeholder="مساحت (متر)"
                              significant
                              disabled={!isExpert}
                              type="number"
                              hasInfo
                              infoUniqueId="latitudeHint"
                              infoTitle="راهنما"
                              info="می تواند از نقشه موجود در انتهای صفحه مختصات مورد نظر را انتخاب کنید."
                            />
                          </>
                        )}
                        {values.buildingType &&
                          values.buildingType.form !== 2 &&
                          values.buildingType.form !== 3 && (
                            <>
                              <BasicSelectOption
                                lableText="طبقه"
                                name="Floor"
                                data={floor}
                                significant
                                isDisabled={!isExpert}
                                placeHolder="انتخاب کنید ..."
                                isLoading={floorEnumMutation.isLoading}
                              />

                              <BasicSelectOption
                                lableText="وضعیت مجوز بنا"
                                name="buildingLicenseStatus"
                                data={buildingLicense}
                                isLoading={
                                  buildingLicenseEnumMutation.isLoading
                                }
                                significant
                                isDisabled={!isExpert}
                                placeHolder="انتخاب کنید ..."
                              />

                              <BasicSelectOption
                                lableText="سن بنا "
                                name="buldingAge"
                                data={buldingAgeData}
                                significant
                                isDisabled={!isExpert}
                                placeHolder="انتخاب کنید ..."
                                isLoading={buildingAgeEnumMutation.isLoading}
                              />

                              <BasicSelectOption
                                lableText="پوشش دیوار"
                                name="wallCovering"
                                data={wallCovering}
                                significant
                                placeHolder="انتخاب کنید ..."
                                isLoading={wallCoveringEnumMutation.isLoading}
                                isDisabled={!isExpert}
                              />

                              <BasicSelectOption
                                lableText="پوشش سقف "
                                name="roofCovering"
                                data={roofCovering}
                                significant
                                placeHolder="انتخاب کنید ..."
                                isLoading={roofCoveringEnumMutation.isLoading}
                                isDisabled={!isExpert}
                              />

                              <BasicSelectOption
                                lableText="پوشش کف "
                                name="floorCovering"
                                data={floorCovering}
                                significant
                                placeHolder="انتخاب کنید ..."
                                isLoading={floorCoveringEnumMutation.isLoading}
                                isDisabled={!isExpert}
                              />
                              <Toggle
                                id="washability"
                                name="washability"
                                lableText="قابلیت شستشو"
                                significant
                                direction="ltr"
                                disabled={!isExpert}
                              />
                            </>
                          )}

                        {values.buildingType &&
                          values.buildingType.form === 2 &&
                          values.buildingType.form !== 3 && (
                            <WaterWellInputs
                              disabled={!isExpert}
                              setFieldValue={setFieldValue}
                            />
                          )}
                        {values.buildingType &&
                          values.buildingType.form !== 3 && (
                            <TextArea
                              lableText="توضیحات"
                              disabled={!isExpert}
                              name="describe"
                              placeholder="توضیحات"
                            />
                          )}
                      </div>
                      {values.buildingType &&
                        values.buildingType.form !== 2 &&
                        values.buildingType.form !== 3 && (
                          <div>
                            <FacilitiesStatusInputs
                              disabled={!isExpert}
                              setFieldValue={setFieldValue}
                            />

                            <TelecommunicationsInputs disabled={!isExpert} />

                            <EquipmentStatusInputs disabled={!isExpert} />
                            <WaterSupplyStatusInputs
                              disabled={!isExpert}
                              setFieldValue={setFieldValue}
                              // setInitialValue={setInitialValues}
                              // values={values}
                              // isInEditMode={isInEditMode}
                            />
                          </div>
                        )}
                    </TwoColumn>
                    {isExpert && (
                      <SubmitButton
                        btnText={isInEditMode ? "ثبت ویرایش" : "ثبت موقت"}
                        clearable={isInEditMode ? true : false}
                        clearableTxt="لغو ویرایش"
                        onClear={() => {
                          setIsInEditMode(false);
                          setEditRowID(0);
                          setValuesToDefault();
                        }}
                        isLoading={false}
                      ></SubmitButton>
                    )}
                    <Row style={{ marginTop: "25px" }}>
                      <Col>
                        <FacilitiesList
                          tableData={tableData}
                          setTableData={setTableData}
                          setInitialValues={setInitialValues}
                          setIsInEditMode={setIsInEditMode}
                          setEditRowID={setEditRowID}
                          isExpert={isExpert}
                          getSection={getSection}
                        />
                      </Col>
                    </Row>

                    {isExpert && (
                      <Row>
                        <Col>
                          <SubmitButton
                            btnText="ثبت نهایی"
                            isLoading={setMutation.isLoading}
                            onClick={onFinalSubmit}
                          />{" "}
                        </Col>
                      </Row>
                    )}

                    <LandDetails
                      buildingsData={tableData}
                      getSection={getSection}
                      point={{ lat: values.latitude, lng: values.longitude }}
                      setPoint={(point) => {
                        setFieldValue("longitude", point.lng);
                        setFieldValue("latitude", point.lat);
                      }}
                      setPolyline={setPolyline}
                      polyLine={polyLine}
                      buildingType={values.buildingType}
                      wellLocationEnum={values.wellLocationEnum}
                    />
                  </>
                )}
              </Form>
            </FieldWrapper>
          );
        }}
      </Formik>
    </>
  );
};

export { FacilitiesForm };
