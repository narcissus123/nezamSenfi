import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
import {
  FullOptionSel,
  OptionRow,
  OptionRowSel,
} from "../../../../../../../../core/models";
import {
  useGetBuildingRepairsConsumptionByExpert,
  useGetBuildingRepairsConsumptionByIssuingResponsible,
  useGetBuildingRepairsConsumptionByJahadCenterManager,
  useGetConversionIndustriesConsumptionByExpert,
  useGetConversionIndustriesConsumptionByIssuingResponsible,
  useGetConversionIndustriesConsumptionByJahadCenterManager,
  useGetCurrentYear,
  useGetElectricityRepairsConsumptionByExpert,
  useGetElectricityRepairsConsumptionByIssuingResponsible,
  useGetElectricityRepairsConsumptionByJahadCenterManager,
  useGetEnergyConsomptionByExpert,
  useGetEnergyConsomptionByIssuingResponsible,
  useGetEnergyConsomptionByJahadCenterManager,
  useGetEnginOrGearBoxRepairsConsumptionByExpert,
  useGetEnginOrGearBoxRepairsConsumptionByIssuingResponsible,
  useGetEnginOrGearBoxRepairsConsumptionByJahadCenterManager,
  useGetEquipmentRepairsConsumptionByExpert,
  useGetEquipmentRepairsConsumptionByIssuingResponsible,
  useGetEquipmentRepairsConsumptionByJahadCenterManager,
  useGetFertilizerConsomptionByExpert,
  useGetFertilizerConsomptionByIssuingResponsible,
  useGetFertilizerConsomptionByJahadCenterManager,
  useGetLubricantConsumptionByExpert,
  useGetLubricantConsumptionByIssuingResponsible,
  useGetLubricantConsumptionByJahadCenterManager,
  useGetMachinaryConsomptionTabsByExpert,
  useGetMachinaryConsomptionTabsByIssuingResponsible,
  useGetMachinaryConsomptionTabsByJahadCenterManager,
  useGetPoisonConsumptionByExpert,
  useGetPoisonConsumptionByIssuingResponsible,
  useGetPoisonConsumptionByJahadCenterManager,
  useGetProductionFactorConsumptionByExpert,
  useGetProductionFactorConsumptionByIssuingResponsible,
  useGetProductionFactorConsumptionByJahadCenterManager,
  useGetTireConsumptionByExpert,
  useGetTireConsumptionByIssuingResponsible,
  useGetTireConsumptionByJahadCenterManager,
  useGetWaterConsumptionByIdByExpert,
  useGetWaterConsumptionByIdByIssuingResponsible,
  useGetWaterConsumptionByIdByJahadCenterManager,
  useSetAgricultureEnergyConsumption,
  useSetAnimalsEnergyConsumption,
  useSetBuildingRepairsConsumption,
  useSetElectricityRepairsConsumption,
  useSetEnginRepairsConsumption,
  useSetEquipmentRepairsConsumption,
  useSetGearBoxRepairsConsumption,
  useSetIndustryEnergyConsumption,
  useSetLubricantConsumption,
  useSetTireConsumption,
} from "../../../../../../../../core/services/api";
import { useGetAllJobProductionFactorByJobId } from "../../../../../../../../core/services/api/job.api";
import {
  FieldWrapper,
  FormDivider,
  TextInput,
  Toggle,
} from "../../../../../../../common/Form";
import BasicSelectOption from "../../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { FallBackSpinner } from "../../../../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { ShowConsompotionToggle } from "../../../../../../../common/Wrapper/ShowConsompotionToggle/ShowConsompotionToggle";
import { AgriculturalFuelConsumption } from "./AgriculturalFuelConsumption/AgriculturalFuelConsumption";
import { AgriculturalWaterConsumption } from "./AgriculturalWaterConsumption/AgriculturalWaterConsumption";
import { BirdsForageConsumption } from "./BirdsForageConsumption/BirdsForageConsumption";
import { BirdsMedicineConsumption } from "./BirdsMedicineConsumption/BirdsMedicineConsumption";
import { BirdsWaterConsumption } from "./BirdsWaterConsumption/BirdsWaterConsumption";
import { ElectricityRepairsConsumption } from "./ElectricityRepairsConsumption/ElectricityRepairsConsumption";
import { FertilizerConsumption } from "./FertilizerConsumption/FertilizerConsumption";
import { HasUsedIndustries } from "./HasUsedIndustries/HasUsedIndustries";
import { IndustryHasBuildingRepairs } from "./IndustryHasBuildingRepairs/IndustryHasBuildingRepairs";
import { IndustryHasEquipmentRepair } from "./IndustryHasEquipmentRepair/IndustryHasEquipmentRepair";
import { IndustryHasOilConsumption } from "./IndustryHasOilConsumption/IndustryHasOilConsumption";
import { IndustryHasTireDepreciation } from "./IndustryHasTireDepreciation/IndustryHasTireDepreciation";
import { IndustryMotorAndGearBoxRepair } from "./IndustryMotorAndGearBoxRepair/IndustryMotorAndGearBoxRepair";
import { IndustryWaterConsumption } from "./IndustryWaterConsumption/IndustryWaterConsumption";
import { LubricantConsumption } from "./LubricantConsumption/LubricantConsumption";
import { PoisonsConsumption } from "./PoisonsConsumption/PoisonsConsumption";
import { BuildingRepairsConsumption } from "./BuildingRepairsConsumption/BuildingRepairsConsumption";
import { EquipmentRepairsConsumption } from "./EquipmentRepairsConsumption/EquipmentRepairsConsumption";
import { MachineryConsumption } from "./MachineryConsumption/MachineryConsumption";
import { List } from "./ConsumptionsList/";

interface IPropTypes {
  jobs: any[];
  useGetConsomptionTabs: any;
  isExpert?: boolean;
  isIssueingResponsible?: boolean;
  isJahadManager?: boolean;
  isExpertUser?: boolean;
}

const ServicesForm: React.FC<IPropTypes> = ({
  jobs,
  useGetConsomptionTabs,
  isExpert = false,
  isIssueingResponsible = false,
  isJahadManager = false,
  isExpertUser
}) => {

  const [initialValues, setInitialValues] = useState({
    // must create model in core
    hasConsumption: false,
    job: null,
    productionFactor: null,
    productionYear: null,
    activityTime: "",
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
  });
  const [validationControll, setValidationControll] = useState<boolean>(false);
  const [productionFactorData, setProductionFactorData] = useState<
    FullOptionSel[]
  >([]);
  const [productionYearData, setProductionYearData] = useState<OptionRowSel[]>(
    []
  );
  const [consomptionTabs, setConsomptionTabs] = useState<
    { id: number; consomptionTabsEnum: number; isHave: boolean }[]
  >([]);
  const [useTypeId, setUseTypeId] = useState<number>(0);

  const { section_id } = useParams<{ section_id: string }>();

  const getConsomptionTabs = useGetConsomptionTabs();
  const getProductionFactor = useGetAllJobProductionFactorByJobId();
  const {
    data: currentYearData,
    isSuccess: currentYearIsSuccess,
    isFetching: currentYearIsFetching,
  } = useGetCurrentYear();

  useEffect(() => {
    if (currentYearIsSuccess) {
      const result = currentYearData?.data.result;
      let year = result + 1;
      let pro: OptionRowSel[] = [];
      for (let i = 0; i < 3; i++) {
        pro.push({ value: year, label: year });
        year = year - 1;
      }
      setProductionYearData(pro);
    }
  }, [currentYearIsSuccess]);

  const onJobChange = (
    opt: { value: number; label: string },
    setFieldValue: any
  ) => {
    setFieldValue("job", opt);
    setFieldValue("productionFactor", null);
    setFieldValue("productionYear", null);
    setInitialValues((old: any) => ({
      ...old,
      job: opt,
      productionFactor: null,
      productionYear: null,
    }));
    if (opt) {
      getProductionFactor.mutate(opt.value, {
        onSuccess: (val) => {
          const result: OptionRow[] = val.data.result;
          let productionFactor: FullOptionSel[] = [
            { label: "انتخاب کنید...", options: [] },
          ];

          result.forEach((pro: any) => {
            productionFactor[0].options.push({
              value: pro.id,
              label: pro.title,
            });
          });

          setProductionFactorData(productionFactor);
        },
      });
    }
  };

  const onProductionYearChange = (
    opt: { value: number; label: string },
    setFieldValue: any,
    values: any
  ) => {
    setFieldValue("productionYear", opt);
    setInitialValues((old: any) => ({
      ...old,
      productionYear: opt,
    }));
    if (opt) {
      const consomptionObj = {
        productionFactorId: values.productionFactor.value,
        sectionId: +section_id,
        year: opt.value,
      };

      getConsomptionTabs.mutate(consomptionObj, {
        onSuccess: (val: any) => {
          const result = val.data.result;
          try {
            setConsomptionTabs(result.tabs);
            setUseTypeId(result.useTypeId);

            setInitialValues((old) => ({
              ...old,
              hasAgriculturalWaterConsumption: result.tabs.find(
                (item: any) => item.consomptionTabsEnum === 1
              )?.isHave,
              hasFertilizerConsumption: result.tabs.find(
                (item: any) => item.consomptionTabsEnum === 2
              )?.isHave,
              hasPoisonsConsumption: result.tabs.find(
                (item: any) => item.consomptionTabsEnum === 3
              )?.isHave,
              machineryConsumption: result.tabs.find(
                (item: any) => item.consomptionTabsEnum === 6
              )?.isHave,
              hasFuelConsumption: result.tabs.find(
                (item: any) => item.consomptionTabsEnum === 4
              )?.isHave,
              ConversionAndComplementaryIndustriesConsumption: result.tabs.find(
                (item: any) => item.consomptionTabsEnum === 5
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
    }
  };

  const onSubmit = (value: any) => {};

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      enableReinitialize={true}
    >
      {({ values, setFieldError, setFieldValue }) => {
        return (
          <FieldWrapper setFieldError={setFieldError} useMutate={() => null}>
            <Form>
              <Toggle
                id="hasConsumption"
                name="hasConsumption"
                lableText="وضعیت مصرف آب و نهاده"
                significant
                direction="ltr"
                className="my-1"
                onChange={(opt: any) => {
                  setFieldValue("hasConsumption", opt.target.checked);
                  setValidationControll(opt.target.checked);
                  setInitialValues((old) => ({
                    ...old,
                    hasConsumption: opt.target.checked,
                  }));
                }}
              />
              {values.hasConsumption && (
                <>
                  <Row>
                    <Col md="3">
                      <BasicSelectOption
                        data={jobs}
                        name="job"
                        lableText="شغل"
                        significant
                        isLoading={false}
                        onChange={(opt) => onJobChange(opt, setFieldValue)}
                        placeHolder="انتخاب کنید ..."
                      />
                    </Col>

                    <Col md="3">
                      <BasicSelectOption
                        lableText="عامل تولید"
                        name="productionFactor"
                        placeHolder="انتخاب کنید..."
                        significant={true}
                        data={productionFactorData}
                        isLoading={getProductionFactor.isLoading}
                        onChange={(e) => {
                          setFieldValue("productionFactor", e);
                          setFieldValue("productionYear", null);
                          setInitialValues((old: any) => ({
                            ...old,
                            productionFactor: e,
                            productionYear: null,
                          }));
                        }}
                      />
                    </Col>
                    <Col md="3">
                      <BasicSelectOption
                        lableText="سال تولید"
                        name="productionYear"
                        placeHolder="انتخاب کنید..."
                        significant
                        isDisabled={values.productionFactor ? false : true}
                        data={productionYearData}
                        onChange={(e) =>
                          onProductionYearChange(e, setFieldValue, values)
                        }
                        isLoading={currentYearIsFetching}
                      />
                    </Col>

                    <Col md="3">
                      <TextInput
                        lableText="میزان فعالیت"
                        name="activityTime"
                        placeholder="میزان فعالیت را وارد کنید..."
                        significant
                      />
                    </Col>
                  </Row>
                </>
              )}
            </Form>
            {getConsomptionTabs.isLoading ? (
              <FallBackSpinner setHeight={300} />
            ) : (
              <>
                {values.hasConsumption && (
                  <>
                    <ShowConsompotionToggle
                      dataList={consomptionTabs}
                      objToSearch={1}
                    >
                      <Col md="12">
                        <Toggle
                          id="hasAgriculturalWaterConsumption"
                          name="hasAgriculturalWaterConsumption"
                          lableText="مصرف آب کشاورزی"
                          significant
                          direction="ltr"
                          className="my-1"
                          onChange={(opt: any) => {
                            setFieldValue(
                              "hasAgriculturalWaterConsumption",
                              opt.target.checked
                            );
                          }}
                        />
                      </Col>
                    </ShowConsompotionToggle>

                    <Col md="12">
                      {values.hasAgriculturalWaterConsumption && (
                        <AgriculturalWaterConsumption
                          isExpert={isExpert}
                          parentData={values}
                          id={
                            consomptionTabs.find(
                              (item: any) => item.consomptionTabsEnum === 1
                            )?.id
                          }
                          useGetMutation={
                            isExpertUser
                              ? useGetWaterConsumptionByIdByExpert
                              : isIssueingResponsible
                              ? useGetWaterConsumptionByIdByIssuingResponsible
                              : useGetWaterConsumptionByIdByJahadCenterManager
                          }
                        />
                      )}
                    </Col>

                    <ShowConsompotionToggle
                      dataList={consomptionTabs}
                      objToSearch={2}
                    >
                      <Col md="12">
                        <Toggle
                          id="hasFertilizerConsumption"
                          name="hasFertilizerConsumption"
                          lableText="مصرف انواع کود بذر و نهال"
                          significant
                          direction="ltr"
                          className="my-1"
                          onChange={(opt: any) => {
                            setFieldValue(
                              "hasFertilizerConsumption",
                              opt.target.checked
                            );
                          }}
                        />
                      </Col>
                    </ShowConsompotionToggle>

                    <Col md="12">
                      {values.hasFertilizerConsumption && (
                        <FertilizerConsumption
                          parentData={values}
                          isExpert={isExpert}
                          id={
                            consomptionTabs.find(
                              (item: any) => item.consomptionTabsEnum === 2
                            )?.id
                          }
                          useGetMutation={
                            isExpertUser
                              ? useGetFertilizerConsomptionByExpert
                              : isIssueingResponsible
                              ? useGetFertilizerConsomptionByIssuingResponsible
                              : useGetFertilizerConsomptionByJahadCenterManager
                          }
                        />
                      )}
                    </Col>

                    <ShowConsompotionToggle
                      dataList={consomptionTabs}
                      objToSearch={3}
                    >
                      <Col md="12">
                        <Toggle
                          id="hasPoisonsConsumption"
                          name="hasPoisonsConsumption"
                          lableText="مصرف انواع سموم"
                          significant
                          direction="ltr"
                          className="my-1"
                          onChange={(opt: any) => {
                            setFieldValue(
                              "hasPoisonsConsumption",
                              opt.target.checked
                            );
                          }}
                        />
                      </Col>
                    </ShowConsompotionToggle>

                    <Col md="12">
                      {values.hasPoisonsConsumption && (
                        <PoisonsConsumption
                          parentData={values}
                          id={
                            consomptionTabs.find(
                              (item: any) => item.consomptionTabsEnum === 3
                            )?.id
                          }
                          useGetMutation={
                            isExpertUser
                              ? useGetPoisonConsumptionByExpert
                              : isIssueingResponsible
                              ? useGetPoisonConsumptionByIssuingResponsible
                              : useGetPoisonConsumptionByJahadCenterManager
                          }
                          isExpert={isExpert}
                        />
                      )}
                    </Col>

                    <ShowConsompotionToggle
                      dataList={consomptionTabs}
                      objToSearch={4}
                    >
                      <Col md="12">
                        <Toggle
                          id="hasFuelConsumption"
                          name="hasFuelConsumption"
                          lableText="مصرف انواع سوخت و انرژی"
                          significant
                          direction="ltr"
                          className="my-1"
                          onChange={(opt: any) => {
                            setFieldValue(
                              "hasFuelConsumption",
                              opt.target.checked
                            );
                            setValidationControll(opt.target.checked);
                          }}
                        />
                      </Col>
                    </ShowConsompotionToggle>

                    <Col md="12">
                      {values.hasFuelConsumption && (
                        <>
                          {(useTypeId === 1 ||
                            useTypeId === 2 ||
                            useTypeId === 7) && (
                            <AgriculturalFuelConsumption
                              isExpert={isExpert}
                              setMutation={useSetAgricultureEnergyConsumption}
                              parentData={values}
                              id={
                                consomptionTabs.find(
                                  (item: any) => item.consomptionTabsEnum === 4
                                )?.id
                              }
                              useGetMutation={
                                isExpertUser
                                  ? useGetEnergyConsomptionByExpert
                                  : isIssueingResponsible
                                  ? useGetEnergyConsomptionByIssuingResponsible
                                  : useGetEnergyConsomptionByJahadCenterManager
                              }
                            />
                          )}

                          {(useTypeId === 3 ||
                            useTypeId === 4 ||
                            useTypeId === 5) && (
                            <AgriculturalFuelConsumption
                              setMutation={useSetIndustryEnergyConsumption}
                              id={
                                consomptionTabs.find(
                                  (item: any) => item.consomptionTabsEnum === 4
                                )?.id
                              }
                              useGetMutation={
                                isExpertUser
                                  ? useGetEnergyConsomptionByExpert
                                  : isIssueingResponsible
                                  ? useGetEnergyConsomptionByIssuingResponsible
                                  : useGetEnergyConsomptionByJahadCenterManager
                              }
                              parentData={values}
                              isExpert={isExpert}
                            />
                          )}

                          {(useTypeId === 6 || useTypeId === 8) && (
                            <AgriculturalFuelConsumption
                              setMutation={useSetAnimalsEnergyConsumption}
                              id={
                                consomptionTabs.find(
                                  (item: any) => item.consomptionTabsEnum === 4
                                )?.id
                              }
                              useGetMutation={
                                isExpertUser
                                  ? useGetEnergyConsomptionByExpert
                                  : isIssueingResponsible
                                  ? useGetEnergyConsomptionByIssuingResponsible
                                  : useGetEnergyConsomptionByJahadCenterManager
                              }
                              parentData={values}
                              isExpert={isExpert}
                            />
                          )}
                        </>
                      )}
                    </Col>

                    <ShowConsompotionToggle
                      dataList={consomptionTabs}
                      objToSearch={6}
                    >
                      <Col md="12">
                        <Toggle
                          id="machineryConsumption"
                          name="machineryConsumption"
                          lableText="مصرف ماشین آلات و ادوات"
                          significant
                          direction="ltr"
                          className="my-1"
                          onChange={(opt: any) => {
                            setFieldValue(
                              "machineryConsumption",
                              opt.target.checked
                            );
                            setValidationControll(opt.target.checked);
                          }}
                        />
                      </Col>
                    </ShowConsompotionToggle>
                    <Col md="12">
                      {values.machineryConsumption && (
                        <MachineryConsumption
                          parentData={values}
                          useGetMutation={
                            isExpertUser
                              ? useGetMachinaryConsomptionTabsByExpert
                              : isIssueingResponsible
                              ? useGetMachinaryConsomptionTabsByIssuingResponsible
                              : useGetMachinaryConsomptionTabsByJahadCenterManager
                          }
                          isExpert={isExpert}
                          isIssueingResponsible={isIssueingResponsible}
                          isJahadManager={isJahadManager}
                        />
                      )}
                    </Col>

                    <ShowConsompotionToggle
                      dataList={consomptionTabs}
                      objToSearch={7}
                    >
                      <Col md="12">
                        <Toggle
                          id="hasBirdsWaterConsumption"
                          name="hasBirdsWaterConsumption"
                          lableText="مصرف آب دام / طیور / آبزیان"
                          significant
                          direction="ltr"
                          className="my-1"
                          onChange={(opt: any) => {
                            setFieldValue(
                              "hasBirdsWaterConsumption",
                              opt.target.checked
                            );
                            setValidationControll(opt.target.checked);
                          }}
                        />
                      </Col>
                    </ShowConsompotionToggle>
                    <Col md="12">
                      {values.hasBirdsWaterConsumption && (
                        <BirdsWaterConsumption
                          parentData={values}
                          id={
                            consomptionTabs.find(
                              (item: any) => item.consomptionTabsEnum === 7
                            )?.id
                          }
                          useGetMutation={
                            isExpertUser
                              ? useGetWaterConsumptionByIdByExpert
                              : isIssueingResponsible
                              ? useGetWaterConsumptionByIdByIssuingResponsible
                              : useGetWaterConsumptionByIdByJahadCenterManager
                          }
                          isExpert={isExpert}
                        />
                      )}
                    </Col>

                    <ShowConsompotionToggle
                      dataList={consomptionTabs}
                      objToSearch={8}
                    >
                      <Col md="12">
                        <Toggle
                          id="hasForageConsumption"
                          name="hasForageConsumption"
                          lableText="مصرف انواع نهاده و علوف"
                          significant
                          direction="ltr"
                          className="my-1"
                          onChange={(opt: any) => {
                            setFieldValue(
                              "hasForageConsumption",
                              opt.target.checked
                            );
                            setValidationControll(opt.target.checked);
                          }}
                        />
                      </Col>
                    </ShowConsompotionToggle>

                    <Col md="12">
                      {values.hasForageConsumption && (
                        <BirdsForageConsumption setFieldValue={setFieldValue} />
                      )}
                    </Col>

                    <ShowConsompotionToggle
                      dataList={consomptionTabs}
                      objToSearch={9}
                    >
                      <Col md="12">
                        <Toggle
                          id="hasMedicineConsumption"
                          name="hasMedicineConsumption"
                          lableText="مصرف انواع دارو و مکمل ها"
                          significant
                          direction="ltr"
                          className="my-1"
                          onChange={(opt: any) => {
                            setFieldValue(
                              "hasMedicineConsumption",
                              opt.target.checked
                            );
                            setValidationControll(opt.target.checked);
                          }}
                        />
                      </Col>
                    </ShowConsompotionToggle>

                    <Col md="12">
                      {values.hasMedicineConsumption && (
                        <BirdsMedicineConsumption
                          setFieldValue={setFieldValue}
                        />
                      )}
                    </Col>
                    <ShowConsompotionToggle
                      dataList={consomptionTabs}
                      objToSearch={10}
                    >
                      <Col md="12">
                        <Toggle
                          id="hasIndustryWaterConsumption"
                          name="hasIndustryWaterConsumption"
                          lableText="مصرف آب صنعت و خدمات"
                          significant
                          direction="ltr"
                          className="my-1"
                          onChange={(opt: any) => {
                            setFieldValue(
                              "hasIndustryWaterConsumption",
                              opt.target.checked
                            );
                            setValidationControll(opt.target.checked);
                          }}
                        />
                      </Col>
                    </ShowConsompotionToggle>

                    <Col md="12">
                      {values.hasIndustryWaterConsumption && (
                        <IndustryWaterConsumption
                          parentData={values}
                          id={
                            consomptionTabs.find(
                              (item: any) => item.consomptionTabsEnum === 10
                            )?.id
                          }
                          useGetMutation={
                            isExpertUser
                              ? useGetWaterConsumptionByIdByExpert
                              : isIssueingResponsible
                              ? useGetWaterConsumptionByIdByIssuingResponsible
                              : useGetWaterConsumptionByIdByJahadCenterManager
                          }
                          isExpert={isExpert}
                        />
                      )}
                    </Col>

                    <ShowConsompotionToggle
                      dataList={consomptionTabs}
                      objToSearch={11}
                    >
                      <Col md="12">
                        <Toggle
                          id="hasEngineRepairs"
                          name="hasEngineRepairs"
                          lableText="تعمیرات موتور"
                          significant
                          direction="ltr"
                          className="my-1"
                          onChange={(opt: any) => {
                            setFieldValue(
                              "hasEngineRepairs",
                              opt.target.checked
                            );
                            setValidationControll(opt.target.checked);
                          }}
                        />
                      </Col>
                    </ShowConsompotionToggle>

                    <Col md="12">
                      {values.hasEngineRepairs && (
                        <IndustryMotorAndGearBoxRepair
                          setMutation={useSetEnginRepairsConsumption}
                          type={1}
                          parentData={values}
                          id={
                            consomptionTabs.find(
                              (item: any) => item.consomptionTabsEnum === 11
                            )?.id
                          }
                          useGetMutation={
                            isExpertUser
                              ? useGetEnginOrGearBoxRepairsConsumptionByExpert
                              : isIssueingResponsible
                              ? useGetEnginOrGearBoxRepairsConsumptionByIssuingResponsible
                              : useGetEnginOrGearBoxRepairsConsumptionByJahadCenterManager
                          }
                        />
                      )}
                    </Col>

                    <ShowConsompotionToggle
                      dataList={consomptionTabs}
                      objToSearch={12}
                    >
                      <Col md="12">
                        <Toggle
                          id="GearboxRepairs"
                          name="GearboxRepairs"
                          lableText="تعمیرات گیربکس"
                          significant
                          direction="ltr"
                          className="my-1"
                          onChange={(opt: any) => {
                            setFieldValue("GearboxRepairs", opt.target.checked);
                            setValidationControll(opt.target.checked);
                          }}
                        />
                      </Col>
                    </ShowConsompotionToggle>

                    <Col md="12">
                      {values.GearboxRepairs && (
                        <IndustryMotorAndGearBoxRepair
                          setMutation={useSetGearBoxRepairsConsumption}
                          type={2}
                          parentData={values}
                          id={
                            consomptionTabs.find(
                              (item: any) => item.consomptionTabsEnum === 12
                            )?.id
                          }
                          useGetMutation={
                            isExpertUser
                              ? useGetEnginOrGearBoxRepairsConsumptionByExpert
                              : isIssueingResponsible
                              ? useGetEnginOrGearBoxRepairsConsumptionByIssuingResponsible
                              : useGetEnginOrGearBoxRepairsConsumptionByJahadCenterManager
                          }
                        />
                      )}
                    </Col>

                    <ShowConsompotionToggle
                      dataList={consomptionTabs}
                      objToSearch={13}
                    >
                      <Col md="12">
                        <Toggle
                          id="hasChassisRepairs"
                          name="hasChassisRepairs"
                          lableText="تعمیرات شاسی و برق"
                          significant
                          direction="ltr"
                          className="my-1"
                          onChange={(opt: any) => {
                            setFieldValue(
                              "hasChassisRepairs",
                              opt.target.checked
                            );
                            setValidationControll(opt.target.checked);
                          }}
                        />
                      </Col>
                    </ShowConsompotionToggle>

                    <Col md="12">
                      {values.hasChassisRepairs && (
                        <ElectricityRepairsConsumption
                          setMutation={useSetElectricityRepairsConsumption}
                          parentData={values}
                          id={
                            consomptionTabs.find(
                              (item: any) => item.consomptionTabsEnum === 13
                            )?.id
                          }
                          useGetMutation={
                            isExpertUser
                              ? useGetElectricityRepairsConsumptionByExpert
                              : isIssueingResponsible
                              ? useGetElectricityRepairsConsumptionByIssuingResponsible
                              : useGetElectricityRepairsConsumptionByJahadCenterManager
                          }
                        />
                      )}
                    </Col>

                    <ShowConsompotionToggle
                      dataList={consomptionTabs}
                      objToSearch={14}
                    >
                      <Col md="12">
                        <Toggle
                          id="hasTireDepreciation"
                          name="hasTireDepreciation"
                          lableText="استهلاک لاستیک"
                          significant
                          direction="ltr"
                          className="my-1"
                          onChange={(opt: any) => {
                            setFieldValue(
                              "hasTireDepreciation",
                              opt.target.checked
                            );
                            setValidationControll(opt.target.checked);
                          }}
                        />
                      </Col>
                    </ShowConsompotionToggle>

                    <Col md="12">
                      {values.hasTireDepreciation && (
                        <IndustryHasTireDepreciation
                          setFieldValue={setFieldValue}
                          parentData={values}
                          isExpert={isExpert}
                          setMutation={useSetTireConsumption}
                          id={
                            consomptionTabs.find(
                              (item: any) => item.consomptionTabsEnum === 14
                            )?.id
                          }
                          useGetMutation={
                            isExpertUser
                              ? useGetTireConsumptionByExpert
                              : isIssueingResponsible
                              ? useGetTireConsumptionByIssuingResponsible
                              : useGetTireConsumptionByJahadCenterManager
                          }
                        />
                      )}
                    </Col>

                    <ShowConsompotionToggle
                      dataList={consomptionTabs}
                      objToSearch={15}
                    >
                      <Col md="12">
                        <Toggle
                          id="hasOilConsumption"
                          name="hasOilConsumption"
                          lableText="مصرف روغن و روانکار ها"
                          significant
                          direction="ltr"
                          className="my-1"
                          onChange={(opt: any) => {
                            setFieldValue(
                              "hasOilConsumption",
                              opt.target.checked
                            );
                            setValidationControll(opt.target.checked);
                          }}
                        />
                      </Col>
                    </ShowConsompotionToggle>

                    <Col md="12">
                      {values.hasOilConsumption && (
                        <LubricantConsumption
                          setMutation={useSetLubricantConsumption}
                          parentData={values}
                          id={
                            consomptionTabs.find(
                              (item: any) => item.consomptionTabsEnum === 15
                            )?.id
                          }
                          useGetMutation={
                            isExpertUser
                              ? useGetLubricantConsumptionByExpert
                              : isIssueingResponsible
                              ? useGetLubricantConsumptionByIssuingResponsible
                              : useGetLubricantConsumptionByJahadCenterManager
                          }
                        />
                      )}
                    </Col>

                    <ShowConsompotionToggle
                      dataList={consomptionTabs}
                      objToSearch={16}
                    >
                      <Col md="12">
                        <Toggle
                          id="hasEquipmentRepair"
                          name="hasEquipmentRepair"
                          lableText="تعمیرات تجهیزات"
                          significant
                          direction="ltr"
                          className="my-1"
                          onChange={(opt: any) => {
                            setFieldValue(
                              "hasEquipmentRepair",
                              opt.target.checked
                            );
                            setValidationControll(opt.target.checked);
                          }}
                        />
                      </Col>
                    </ShowConsompotionToggle>

                    <Col md="12">
                      {values.hasEquipmentRepair && (
                        <EquipmentRepairsConsumption
                          setMutation={useSetEquipmentRepairsConsumption}
                          parentData={values}
                          id={
                            consomptionTabs.find(
                              (item: any) => item.consomptionTabsEnum === 16
                            )?.id
                          }
                          useGetMutation={
                            isExpertUser
                              ? useGetEquipmentRepairsConsumptionByExpert
                              : isIssueingResponsible
                              ? useGetEquipmentRepairsConsumptionByIssuingResponsible
                              : useGetEquipmentRepairsConsumptionByJahadCenterManager
                          }
                        />
                      )}
                    </Col>

                    <ShowConsompotionToggle
                      dataList={consomptionTabs}
                      objToSearch={17}
                    >
                      <Col md="12">
                        <Toggle
                          id="hasBuildingRepairs"
                          name="hasBuildingRepairs"
                          lableText="تعمیرات ساختمان و تاسیسات"
                          significant
                          direction="ltr"
                          className="my-1"
                          onChange={(opt: any) => {
                            setFieldValue(
                              "hasBuildingRepairs",
                              opt.target.checked
                            );
                            setValidationControll(opt.target.checked);
                          }}
                        />
                      </Col>
                    </ShowConsompotionToggle>

                    <Col md="12">
                      {values.hasBuildingRepairs && (
                        <BuildingRepairsConsumption
                          setMutation={useSetBuildingRepairsConsumption}
                          parentData={values}
                          id={
                            consomptionTabs.find(
                              (item: any) => item.consomptionTabsEnum === 17
                            )?.id
                          }
                          useGetMutation={
                            isExpertUser
                              ? useGetBuildingRepairsConsumptionByExpert
                              : isIssueingResponsible
                              ? useGetBuildingRepairsConsumptionByIssuingResponsible
                              : useGetBuildingRepairsConsumptionByJahadCenterManager
                          }
                        />
                      )}
                    </Col>

                    <ShowConsompotionToggle
                      dataList={consomptionTabs}
                      objToSearch={5}
                    >
                      <Col md="12">
                        <Toggle
                          id="ConversionAndComplementaryIndustriesConsumption"
                          name="ConversionAndComplementaryIndustriesConsumption"
                          lableText="نحوه فروش محصول و صنایع مورد استفاده"
                          significant
                          direction="ltr"
                          className="my-1"
                          onChange={(opt: any) => {
                            setFieldValue(
                              "ConversionAndComplementaryIndustriesConsumption",
                              opt.target.checked
                            );
                            setValidationControll(opt.target.checked);
                          }}
                        />
                      </Col>
                    </ShowConsompotionToggle>

                    <Col md="12">
                      {values.ConversionAndComplementaryIndustriesConsumption && (
                        <HasUsedIndustries
                          id={
                            consomptionTabs.find(
                              (item: any) => item.consomptionTabsEnum === 5
                            )?.id
                          }
                          useGetMutation={
                            isExpertUser
                              ? useGetConversionIndustriesConsumptionByExpert
                              : isIssueingResponsible
                              ? useGetConversionIndustriesConsumptionByIssuingResponsible
                              : useGetConversionIndustriesConsumptionByJahadCenterManager
                          }
                          parentData={values}
                          isExpert={isExpert}
                        />
                      )}
                    </Col>
                  </>
                )}
                <Col md={12}>
                  <FormDivider textHeader="مصارف ثبت شده">
                    <List
                      setConsomptionTabs={setConsomptionTabs}
                      setUseTypeId={setUseTypeId}
                      getConsomptionTabs={getConsomptionTabs}
                      jobs={jobs}
                      setInitialValues={setInitialValues}
                      getListMutation={
                        isExpertUser
                          ? useGetProductionFactorConsumptionByExpert
                          : isIssueingResponsible
                          ? useGetProductionFactorConsumptionByIssuingResponsible
                          : useGetProductionFactorConsumptionByJahadCenterManager
                      }
                    />
                  </FormDivider>
                </Col>
              </>
            )}
          </FieldWrapper>
        );
      }}
    </Formik>
  );
};

export { ServicesForm };
