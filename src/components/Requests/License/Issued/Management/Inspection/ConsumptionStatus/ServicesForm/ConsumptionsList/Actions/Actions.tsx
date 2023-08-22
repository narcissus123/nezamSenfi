import React from "react";
import { File } from "react-feather";
import { Link, useHistory, useParams } from "react-router-dom";
import { Button } from "reactstrap";

interface IPropTypes {
  cell: {
    row: {
      values: { id: number };
      original: {
        jobTitle: string;
        job: number;
        productionFactorTitle: string;
        productionFactorId: number;
        year: number;
        activityRate: number;
      };
    };
  };
  setInitialValues: any;
  getConsomptionTabs: any;
  setConsomptionTabs: any;
  setUseTypeId: any;
}

const Actions: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id },
      original: {
        jobTitle,
        job,
        productionFactorTitle,
        productionFactorId,
        year,
        activityRate,
      },
    },
  },
  setInitialValues,
  getConsomptionTabs,
  setConsomptionTabs,
  setUseTypeId,
}) => {
  const history = useHistory();
  const { section_id } = useParams<{ section_id: string }>();

  return (
    <div
      className="d-flex justify-content-center align-content-center"
      style={{ flexWrap: "wrap" }}
    >
      <Button
        style={{ margin: "3px" }}
        size="sm"
        color="warning"
        onClick={() => {

          setInitialValues((old: any) => ({
            ...old,
            hasAgriculturalWaterConsumption: false,
            hasFertilizerConsumption: false,
            hasPoisonsConsumption: false,
            hasFuelConsumption: false,
            hasBirdsFuelConsumption: false,
            hasIndustryFuelConsumption: false,
            hasBirdsWaterConsumption: false,
            hasForageConsumption: false,
            hasMedicineConsumption: false,
            hasIndustryWaterConsumption: false,
            hasEngineRepairs: false,
            GearboxRepairs: false,
            hasChassisRepairs: false,
            hasTireDepreciation: false,
            hasOilConsumption: false,
            hasEquipmentRepair: false,
            hasBuildingRepairs: false,
            ConversionAndComplementaryIndustriesConsumption: false,
            machineryConsumption: false,
          }));

          const consomptionObj = {
            productionFactorId: productionFactorId,
            sectionId: +section_id,
            year: year,
          };

          getConsomptionTabs.mutate(consomptionObj, {
            onSuccess: (val: any) => {
              const result = val.data.result;
              try {
                setConsomptionTabs(result.tabs);
                setUseTypeId(result.useTypeId);

                setInitialValues((old: any) => ({
                  ...old,
                  hasConsumption: true,
                  job: { value: job, label: jobTitle },
                  productionFactor: {
                    value: productionFactorId,
                    label: productionFactorTitle,
                  },
                  productionYear: { value: year, label: year },
                  hasAgriculturalWaterConsumption: result.tabs.find(
                    (item: any) => item.consomptionTabsEnum === 1
                  )?.isHave,
                  hasFertilizerConsumption: result.tabs.find(
                    (item: any) => item.consomptionTabsEnum === 2
                  )?.isHave,
                  hasPoisonsConsumption: result.tabs.find(
                    (item: any) => item.consomptionTabsEnum === 3
                  )?.isHave,
                  hasFuelConsumption: result.tabs.find(
                    (item: any) => item.consomptionTabsEnum === 4
                  )?.isHave,
                  ConversionAndComplementaryIndustriesConsumption:
                    result.tabs.find(
                      (item: any) => item.consomptionTabsEnum === 5
                    )?.isHave,
                  machineryConsumption: result.tabs.find(
                    (item: any) => item.consomptionTabsEnum === 6
                  )?.isHave,
                  hasBirdsWaterConsumption: result.tabs.find(
                    (item: any) => item.consomptionTabsEnum === 7
                  )?.isHave,
                  hasForageConsumption: result.tabs.find(
                    (item: any) => item.consomptionTabsEnum === 8
                  )?.isHave,
                  hasMedicineConsumption: result.tabs.find(
                    (item: any) => item.consomptionTabsEnum === 9
                  )?.isHave,
                  hasIndustryWaterConsumption: result.tabs.find(
                    (item: any) => item.consomptionTabsEnum === 10
                  )?.isHave,
                  hasEngineRepairs: result.tabs.find(
                    (item: any) => item.consomptionTabsEnum === 11
                  )?.isHave,
                  GearboxRepairs: result.tabs.find(
                    (item: any) => item.consomptionTabsEnum === 12
                  )?.isHave,
                  hasChassisRepairs: result.tabs.find(
                    (item: any) => item.consomptionTabsEnum === 13
                  )?.isHave,
                  hasTireDepreciation: result.tabs.find(
                    (item: any) => item.consomptionTabsEnum === 14
                  )?.isHave,
                  hasOilConsumption: result.tabs.find(
                    (item: any) => item.consomptionTabsEnum === 15
                  )?.isHave,
                  hasEquipmentRepair: result.tabs.find(
                    (item: any) => item.consomptionTabsEnum === 16
                  )?.isHave,
                  hasBuildingRepairs: result.tabs.find(
                    (item: any) => item.consomptionTabsEnum === 17
                  )?.isHave,
                  activityTime: result.activityRate,
                }));
              } catch (error) {}
            },
          });
        }}
      >
        جزییات &nbsp;
        <File
          style={{ position: "relative", top: "-2px" }}
          size={12}
          color="white"
        />
      </Button>
    </div>
  );
};

export { Actions };
