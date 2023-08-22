import { Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col } from "reactstrap";
import {
  useGetMachineryConsumptionByExpert,
  useGetMachineryConsumptionByIssuingResponsible,
  useGetMachineryConsumptionByJahadCenterManager,
  useSetAfterHarvestMachineryConsumption,
  useSetAnimalsHarvestMachineryConsumption,
  useSetHarvestMachineryConsumption,
  useSetKeepMachineryConsumption,
  useSetPlantingMachineryConsumption,
  useSetSoilMachineryConsumption,
} from "../../../../../../../../../core/services/api";
import { FormDivider, Toggle } from "../../../../../../../../common/Form";
import { ShowConsompotionToggle } from "../../../../../../../../common/Wrapper/ShowConsompotionToggle/ShowConsompotionToggle";
import { SetMachineryConsumption } from "./SetMachineryConsumption/SetMachineryConsumption";

interface IPropTypes {
  useGetMutation: any;
  parentData: any;
  isExpert: any;
  isIssueingResponsible: any;
  isJahadManager: any;
}

const MachineryConsumption: FC<IPropTypes> = ({
  useGetMutation,
  parentData,
  isExpert,
  isIssueingResponsible,
  isJahadManager,
}) => {

  const [initialValues, setInitialValues] = useState<any>({
    hasSoil: false,
    hasPlanting: false,
    hasKeep: false,
    hasHarvest: false,
    hasAfterHarvest: false,
    hasAnimals: false,
  });

  const [consomptionTabs, setConsomptionTabs] = useState<
    { id: number; machineryConsumptionTypeEnum: number; isHave: boolean }[]
  >([]);
  
  const { section_id } = useParams<{ section_id: string }>();

  const getTabs = useGetMutation();

  useEffect(() => {
    const data = {
      productionFactorId: parentData.productionFactor.value,
      year: parentData.productionYear.value,
      sectionId: +section_id,
    };

    getTabs.mutate(data, {
      onSuccess: (val: any) => {
        const result = val.data.result;
        console.log(result);
        setConsomptionTabs(result)

        try {
          setInitialValues((old: any) => ({
            hasSoil: result.find(
              (item: any) => item.machineryConsumptionTypeEnum === 1
            )?.isHave,
            hasPlanting: result.find(
              (item: any) => item.machineryConsumptionTypeEnum === 2
            )?.isHave,
            hasKeep: result.find(
              (item: any) => item.machineryConsumptionTypeEnum === 3
            )?.isHave,
            hasHarvest: result.find(
              (item: any) => item.machineryConsumptionTypeEnum === 4
            )?.isHave,
            hasAfterHarvest: result.find(
              (item: any) => item.machineryConsumptionTypeEnum === 5
            )?.isHave,
            hasAnimals: result.find(
              (item: any) => item.machineryConsumptionTypeEnum === 6
            )?.isHave,
          }));
        } catch (error) {
          
        }
      },
    });
  }, []);

  return (
    <FormDivider textHeader="مصرف ماشین آلات و ادوات">
      <Formik enableReinitialize={true} initialValues={initialValues} onSubmit={() => {}}>
        {({ values, setFieldValue }) => (
          <>
            <ShowConsompotionToggle dataList={consomptionTabs} objToSearch={1} isFromMachinery={true}>
              <Col md="12">
                <Toggle
                  id="hasSoil"
                  name="hasSoil"
                  lableText="مصرف ماشین آلات و ادوات خاکورزی"
                  significant
                  direction="ltr"
                  className="my-1"
                  onChange={(opt: any) => {
                    setFieldValue("hasSoil", opt.target.checked);
                    // setValidationControll(opt.target.checked);
                  }}
                />
              </Col>
            </ShowConsompotionToggle>

            {values.hasSoil && (
              <SetMachineryConsumption
                setMutation={useSetSoilMachineryConsumption}
                textHeader="مصرف ماشین آلات و ادوات خاکورزی"
                parentData={parentData}
                isExpert={isExpert}
                isIssueingResponsible={isIssueingResponsible}
                isJahadManager={isJahadManager}
                id={
                  consomptionTabs.find(
                    (item: any) => item.machineryConsumptionTypeEnum === 1
                  )?.id
                }
                useGetMutation={
                  isExpert
                    ? useGetMachineryConsumptionByExpert
                    : isIssueingResponsible
                    ? useGetMachineryConsumptionByIssuingResponsible
                    : useGetMachineryConsumptionByJahadCenterManager
                }
              />
            )}
            <ShowConsompotionToggle dataList={consomptionTabs} objToSearch={2} isFromMachinery={true}>
              <Col md="12">
                <Toggle
                  id="hasPlanting"
                  name="hasPlanting"
                  lableText="مصرف ماشین آلات و ادوات کاشت"
                  significant
                  direction="ltr"
                  className="my-1"
                  onChange={(opt: any) => {
                    setFieldValue("hasPlanting", opt.target.checked);
                    // setValidationControll(opt.target.checked);
                  }}
                />
              </Col>
            </ShowConsompotionToggle>
            {values.hasPlanting && (
              <SetMachineryConsumption
                setMutation={useSetPlantingMachineryConsumption}
                textHeader="مصرف ماشین آلات و ادوات کاشت"
                parentData={parentData}
                isExpert={isExpert}
                isIssueingResponsible={isIssueingResponsible}
                isJahadManager={isJahadManager}
                id={
                  consomptionTabs.find(
                    (item: any) => item.machineryConsumptionTypeEnum === 2
                  )?.id
                }
                useGetMutation={
                  isExpert
                    ? useGetMachineryConsumptionByExpert
                    : isIssueingResponsible
                    ? useGetMachineryConsumptionByIssuingResponsible
                    : useGetMachineryConsumptionByJahadCenterManager
                }
              />
            )}
            <ShowConsompotionToggle dataList={consomptionTabs} objToSearch={3} isFromMachinery={true}>
              <Col md="12">
                <Toggle
                  id="hasKeep"
                  name="hasKeep"
                  lableText="مصرف ماشین آلات و ادوات داشت"
                  significant
                  direction="ltr"
                  className="my-1"
                  onChange={(opt: any) => {
                    setFieldValue("hasKeep", opt.target.checked);
                    // setValidationControll(opt.target.checked);
                  }}
                />
              </Col>
            </ShowConsompotionToggle>
            {values.hasKeep && (
              <SetMachineryConsumption
                setMutation={useSetKeepMachineryConsumption}
                textHeader="مصرف ماشین آلات و ادوات داشت"
                parentData={parentData}
                isExpert={isExpert}
                isIssueingResponsible={isIssueingResponsible}
                isJahadManager={isJahadManager}
                id={
                  consomptionTabs.find(
                    (item: any) => item.machineryConsumptionTypeEnum === 3
                  )?.id
                }
                useGetMutation={
                  isExpert
                    ? useGetMachineryConsumptionByExpert
                    : isIssueingResponsible
                    ? useGetMachineryConsumptionByIssuingResponsible
                    : useGetMachineryConsumptionByJahadCenterManager
                }
              />
            )}
            <ShowConsompotionToggle dataList={consomptionTabs} objToSearch={4} isFromMachinery={true}>
              <Col md="12">
                <Toggle
                  id="hasHarvest"
                  name="hasHarvest"
                  lableText="مصرف ماشین آلات و ادوات برداشت"
                  significant
                  direction="ltr"
                  className="my-1"
                  onChange={(opt: any) => {
                    setFieldValue("hasHarvest", opt.target.checked);
                    // setValidationControll(opt.target.checked);
                  }}
                />
              </Col>
            </ShowConsompotionToggle>
            {values.hasHarvest && (
              <SetMachineryConsumption
                setMutation={useSetHarvestMachineryConsumption}
                textHeader="مصرف ماشین آلات و ادوات برداشت"
                parentData={parentData}
                isExpert={isExpert}
                isIssueingResponsible={isIssueingResponsible}
                isJahadManager={isJahadManager}
                id={
                  consomptionTabs.find(
                    (item: any) => item.machineryConsumptionTypeEnum === 4
                  )?.id
                }
                useGetMutation={
                  isExpert
                    ? useGetMachineryConsumptionByExpert
                    : isIssueingResponsible
                    ? useGetMachineryConsumptionByIssuingResponsible
                    : useGetMachineryConsumptionByJahadCenterManager
                }
              />
            )}
            <ShowConsompotionToggle dataList={consomptionTabs} objToSearch={5} isFromMachinery={true}>
              <Col md="12">
                <Toggle
                  id="hasAfterHarvest"
                  name="hasAfterHarvest"
                  lableText="مصرف ماشین آلات و ادوات پس از برداشت"
                  significant
                  direction="ltr"
                  className="my-1"
                  onChange={(opt: any) => {
                    setFieldValue("hasAfterHarvest", opt.target.checked);
                    // setValidationControll(opt.target.checked);
                  }}
                />
              </Col>
            </ShowConsompotionToggle>

            {values.hasAfterHarvest && (
              <SetMachineryConsumption
                setMutation={useSetAfterHarvestMachineryConsumption}
                textHeader="مصرف ماشین آلات و ادوات پس از برداشت"
                parentData={parentData}
                isExpert={isExpert}
                isIssueingResponsible={isIssueingResponsible}
                isJahadManager={isJahadManager}
                id={
                  consomptionTabs.find(
                    (item: any) => item.machineryConsumptionTypeEnum === 5
                  )?.id
                }
                useGetMutation={
                  isExpert
                    ? useGetMachineryConsumptionByExpert
                    : isIssueingResponsible
                    ? useGetMachineryConsumptionByIssuingResponsible
                    : useGetMachineryConsumptionByJahadCenterManager
                }
              />
            )}
            <ShowConsompotionToggle dataList={consomptionTabs} objToSearch={6} isFromMachinery={true}>
              <Col md="12">
                <Toggle
                  id="hasAnimals"
                  name="hasAnimals"
                  lableText="مصرف ماشین آلات و ادوات پرورش دام و طیور و شیلات"
                  significant
                  direction="ltr"
                  className="my-1"
                  onChange={(opt: any) => {
                    setFieldValue("hasAnimals", opt.target.checked);
                    // setValidationControll(opt.target.checked);
                  }}
                />
              </Col>
            </ShowConsompotionToggle>
            {values.hasAnimals && (
              <SetMachineryConsumption
                setMutation={useSetAnimalsHarvestMachineryConsumption}
                textHeader="مصرف ماشین آلات و ادوات پرورش دام و طیور و شیلات"
                parentData={parentData}
                isExpert={isExpert}
                isIssueingResponsible={isIssueingResponsible}
                isJahadManager={isJahadManager}
                id={
                  consomptionTabs.find(
                    (item: any) => item.machineryConsumptionTypeEnum === 6
                  )?.id
                }
                useGetMutation={
                  isExpert
                    ? useGetMachineryConsumptionByExpert
                    : isIssueingResponsible
                    ? useGetMachineryConsumptionByIssuingResponsible
                    : useGetMachineryConsumptionByJahadCenterManager
                }
              />
            )}
          </>
        )}
      </Formik>
    </FormDivider>
  );
};

export { MachineryConsumption };

// [Description("مصرف ماشین آلات و ادوات خاکورزی ")]
// Soil = 1,

// [Description("مصرف ماشین آلات و ادوات کاشت ")]
// Planting = 2,

// [Description("مصرف ماشین آلات و ادوات داشت ")]
// Keep = 3,

// [Description("مصرف ماشین آلات و ادوات برداشت ")]
// Harvest = 4,

// [Description("مصرف ماشین آلات و ادوات پس از برداشت ")]
// AfterHarvest = 5,

// [Description("مصرف ماشین آلات و ادوات پرورش دام و طیور و شیلات ")]
// Animals = 6,
