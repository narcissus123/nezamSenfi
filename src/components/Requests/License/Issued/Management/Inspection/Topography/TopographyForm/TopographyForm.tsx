import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
import {
  beforProductionSystems,
  DuringProductionSystems,
  endProductionSystems,
  slopePercent,
  soilCondition,
  soilPatterns,
  topographyStatus,
  waterExploitationSystems,
  waterQuality,
  waterSupplySources,
} from "../../../../../../../../core/data";
import { ToastTypes } from "../../../../../../../../core/enums";
import { DocumentTypeEnum } from "../../../../../../../../core/enums/document-category-type.enum";
import {
  useGetDocumentByDocumentCategoryTypeEnum,
  useSetTopographyOfLicenseReuest,
} from "../../../../../../../../core/services/api";
import {
  fullOption,
  getCustomDate,
  showToast,
} from "../../../../../../../../core/utils";
import { useGlobalState } from "../../../../../../../../core/utils/context/GlobalContext";
import { inspectionPotoraphyValidation } from "../../../../../../../../core/validations/inspection-potography.validation";
import {
  FieldWrapper,
  InpuLable,
  ModernDatePicker,
  MultiSelectOption,
  SubmitButton,
  TextInput,
  Toggle,
} from "../../../../../../../common/Form";
import BasicSelectOption from "../../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { FallBackSpinner } from "../../../../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { TwoColumn } from "../../../../../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";
import { ExploitationInputs } from "./ExploitationInputs";
import { SoilDecompositionForm } from "./SoilDecompositionForm";
import { SoilNutrientsForm } from "./SoilNutrientsForm";

interface IPropTypes {
  useMutation: any;
  isExpert: boolean;
}

const TopographyForm: React.FC<IPropTypes> = ({ isExpert, useMutation }) => {
  const [soilDecompositionList, setSoilDecompositionList] = useState<any>([]);
  const [soilNutrientList, setSoilNutrientList] = useState<any>([]);
  const [initialValues, setinitialValues] = useState<any>({
    topographyStatus: { value: 0, label: "انتخاب کنید" },
    northSteep: false,
    eastSteep: false,
    southSteep: false,
    westSteep: false,
    slopePercentage: { value: 0, label: "انتخاب کنید" },
    soilCondition: { value: 0, label: "انتخاب کنید" },
    waterSupplySource: { value: 0, label: "انتخاب کنید" },
    license: false,
    licenseNumber: "",
    licenseDate: "",
    waterTest: false,
    wellDocuments: null,
    PH: 0,
    EC: 0,
    impurity: 0,
    waterQuality: { value: 0, label: "انتخاب کنید" },
    soilTest: false,
    // وضعیت بهره بردار
    waterExploitationSystem: { value: 0, label: "انتخاب کنید" },
    beforProductionSystem: { value: 0, label: "انتخاب کنید" },
    DuringProductionSystem: { value: 0, label: "انتخاب کنید" },
    endProductionSystem: { value: 0, label: "انتخاب کنید" },
  });

  const { topographyList } = useGlobalState();

  const { section_id } = useParams<{ section_id: string }>();

  const getTopography = useMutation(+section_id);

  const setTopography = useSetTopographyOfLicenseReuest();

  const [wellDocumentsData, setWellDocumentsData] = useState<any>([
    {
      label: " انتخاب کنید ...",
      options: [],
    },
  ]);
  const getWellTypeMutation = useGetDocumentByDocumentCategoryTypeEnum();

  useEffect(() => {
    getWellTypeMutation.mutate(DocumentTypeEnum.Well, {
      onSuccess: (val: any) => {
        const result = val.data.result;
        const newLicenseTypes: any = [];
        result.forEach((category: any) => {
          let opt: any = [];
          category.documents.forEach((row: any) => {
            opt.push({ value: row.documentId, label: row.documentTitle });
          });

          newLicenseTypes.push({ label: category.categoryTitle, options: opt });
        });
        setWellDocumentsData(newLicenseTypes);
      },
    });
  }, []);

  useEffect(() => {
    if (getTopography.isSuccess && !topographyList[0]) {
      const result = getTopography.data.data.result;

      let wellDocuments: any = [];

      if (result.documentIds) {
        result.documentIds.forEach((row: any) => {
          wellDocuments.push({ value: row, label: "" });
        });
      }

      setinitialValues({
        wellDocuments: wellDocuments,
        DuringProductionSystem: fullOption(
          result.holding,
          DuringProductionSystems
        )
          ? fullOption(result.holding, DuringProductionSystems)
          : { value: 0, label: "لطفا یک گزینه انتخاب کنید..." },
        EC: result.ec,
        PH: result.ph,
        eastSteep: result.eastSteep,
        beforProductionSystem: fullOption(
          result.planting,
          beforProductionSystems
        )
          ? fullOption(result.planting, beforProductionSystems)
          : { value: 0, label: "لطفا یک گزینه انتخاب کنید..." },
        waterExploitationSystem: fullOption(
          result.waterExploitationSystem,
          waterExploitationSystems
        )
          ? fullOption(result.waterExploitationSystem, waterExploitationSystems)
          : { value: 0, label: "لطفا یک گزینه انتخاب کنید..." },
        topographyStatus: fullOption(result.status, topographyStatus)
          ? fullOption(result.status, topographyStatus)
          : { value: 0, label: "لطفا یک گزینه انتخاب کنید..." },
        licenseDate: result.waterExploitationSystemLicenseDate
          ? getCustomDate(result.waterExploitationSystemLicenseDate)
          : "",
        endProductionSystem: fullOption(result.harvest, endProductionSystems)
          ? fullOption(result.harvest, endProductionSystems)
          : { value: 0, label: "لطفا یک گزینه انتخاب کنید..." },
        impurity: result.waterImpurities,
        licenseNumber: result.waterExploitationSystemLicenseNumber
          ? result.waterExploitationSystemLicenseNumber
          : "",
        license: result.isHaveWaterExploitationSystemLicense,
        northSteep: result.northSteep,
        slopePercentage: result.slopePercentageEnum
          ? fullOption(result.slopePercentageEnum, slopePercent)
          : { value: 0, label: "لطفا یک گزینه انتخاب کنید..." },
        southSteep: result.southSteep,
        westSteep: result.westSteep,
        waterQuality: { value: result.waterQualityWithTasteEnum, label: "" }, // edit later this is select option
        soilTest: result.isHaveSoilExperiment,
        waterTest: result.isHaveWaterExperiment,
        soilCondition: fullOption(result.soilStatus, soilCondition)
          ? fullOption(result.soilStatus, soilCondition)
          : { value: 0, label: "لطفا یک گزینه انتخاب کنید..." },
        waterSupplySource: fullOption(result.sourceOfWater, waterSupplySources)
          ? fullOption(result.sourceOfWater, waterSupplySources)
          : { value: 0, label: "لطفا یک گزینه انتخاب کنید..." },
      });

      const decompositionOfSoilsVm: any = [];

      try {
        if (result.decompositionOfSoilsVm) {
          result.decompositionOfSoilsVm.forEach((item: any) => {
            decompositionOfSoilsVm.push({
              depthOfSampling: item.depthOfSampling,
              percentOfSand: item.percentOfSand,
              percentOfClay: item.percentOfClay,
              organicMatter: item.percentageOfOrganicMatter,
              aciditySaturation: item.totalSaturatedAcidity,
              PercentOfNeutralizingMatter:
                item.percentageOfNeutralizingSubstances,
              organicCarbon: item.organicCarbon,
              organicSaturation: item.saturationPercentage,
              percentOfLay: item.siltPersent,
              ECSoil: item.electricalConductivity,
              soilPattern: fullOption(item.soilPattern, soilPatterns),
            });
          });
        }

        setSoilDecompositionList(decompositionOfSoilsVm);

        const nutrientsVm: any = [];
        if (result.nutrientsVm) {
          result.nutrientsVm.forEach((item: any) => {
            nutrientsVm.push({
              depthOfSampling: item.depthOfSampling,
              Phosphorus: item.absorbablePhosphorus,
              Magnesium: item.magnesium,
              Manganese: item.manganese,
              Copper: item.copper,
              Calcium: item.percentageOfCalcium,
              percentageOfNitrogen: item.percentageOfTotalNitrogen,
              potassium: item.absorbablePotassium,
              Iron: item.iron,
              Roy: item.roy,
              bor: item.boron,
            });
          });
        }

        setSoilNutrientList(nutrientsVm);

        topographyList[1]({
          DuringProductionSystem: fullOption(
            result.holding,
            DuringProductionSystems
          )
            ? fullOption(result.holding, DuringProductionSystems)
            : { value: 0, label: "لطفا یک گزینه انتخاب کنید..." },
          EC: result.ec,
          PH: result.ph,
          eastSteep: result.eastSteep,
          beforProductionSystem: fullOption(
            result.planting,
            beforProductionSystems
          )
            ? fullOption(result.planting, beforProductionSystems)
            : { value: 0, label: "لطفا یک گزینه انتخاب کنید..." },
          waterExploitationSystem: fullOption(
            result.waterExploitationSystem,
            waterExploitationSystems
          )
            ? fullOption(
                result.waterExploitationSystem,
                waterExploitationSystems
              )
            : { value: 0, label: "لطفا یک گزینه انتخاب کنید..." },
          topographyStatus: fullOption(result.status, topographyStatus)
            ? fullOption(result.status, topographyStatus)
            : { value: 0, label: "لطفا یک گزینه انتخاب کنید..." },
          licenseDate: result.waterExploitationSystemLicenseDate
            ? getCustomDate(result.waterExploitationSystemLicenseDate)
            : "",
          endProductionSystem: fullOption(result.harvest, endProductionSystems)
            ? fullOption(result.harvest, endProductionSystems)
            : { value: 0, label: "لطفا یک گزینه انتخاب کنید..." },
          impurity: result.waterImpurities,
          licenseNumber: result.waterExploitationSystemLicenseNumber
            ? result.waterExploitationSystemLicenseNumber
            : "",
          license: result.isHaveWaterExploitationSystemLicense,
          northSteep: result.northSteep,
          slopePercentage: result.slopePercentageEnum
            ? fullOption(result.slopePercentageEnum, slopePercent)
            : { value: 0, label: "لطفا یک گزینه انتخاب کنید..." },
          southSteep: result.southSteep,
          westSteep: result.westSteep,
          waterQuality: { value: result.waterQualityWithTasteEnum, label: "" }, // edit later this is select option
          soilTest: result.isHaveSoilExperiment,
          waterTest: result.isHaveWaterExperiment,
          soilCondition: fullOption(result.soilStatus, soilCondition)
            ? fullOption(result.soilStatus, soilCondition)
            : { value: 0, label: "لطفا یک گزینه انتخاب کنید..." },
          waterSupplySource: fullOption(
            result.sourceOfWater,
            waterSupplySources
          )
            ? fullOption(result.sourceOfWater, waterSupplySources)
            : { value: 0, label: "لطفا یک گزینه انتخاب کنید..." },
          nutrientsVm: nutrientsVm,
          decompositionOfSoilsVm: decompositionOfSoilsVm,
        });
      } catch (error) {}
    } else if (topographyList[0]) {
      let contextTopographyObj = topographyList[0];
      setSoilDecompositionList(contextTopographyObj.decompositionOfSoilsVm);
      setSoilNutrientList(contextTopographyObj.nutrientsVm);

      setinitialValues(contextTopographyObj);
    }
  }, [getTopography.isSuccess]);

  const onSubmit = (values: any) => {
    if (values.soilTest && soilDecompositionList.length === 0) {
      return showToast(
        ["لطفا تجزیه فیزیک و شیمایی خاک ثبت کنید"],
        ToastTypes.error
      );
    }
    if (values.soilTest && soilNutrientList.length === 0) {
      return showToast(
        ["لطفا عناصر غذایی موجود در خاک ثبت کنید"],
        ToastTypes.error
      );
    }

    const decompositionOfSoilsVm: any = [];

    soilDecompositionList.forEach((item: any) => {
      decompositionOfSoilsVm.push({
        depthOfSampling: item.depthOfSampling,
        percentOfSand: item.percentOfSand,
        percentOfClay: item.percentOfClay,
        percentageOfOrganicMatter: item.organicMatter,
        totalSaturatedAcidity: item.aciditySaturation,
        percentageOfNeutralizingSubstances: item.PercentOfNeutralizingMatter,
        organicCarbon: item.organicCarbon,
        saturationPercentage: item.organicSaturation,
        siltPersent: item.percentOfLay,
        electricalConductivity: item.ECSoil,
        soilPattern: item.soilPattern.value,
      });
    });

    const nutrientsVm: any = [];

    soilNutrientList.forEach((item: any) => {
      nutrientsVm.push({
        depthOfSampling: item.depthOfSampling,
        absorbablePhosphorus: item.Phosphorus,
        magnesium: item.Magnesium,
        manganese: item.Manganese,
        copper: item.Copper,
        percentageOfCalcium: item.Calcium,
        percentageOfTotalNitrogen: item.percentageOfNitrogen,
        absorbablePotassium: item.potassium,
        iron: item.Iron,
        roy: item.Roy,
        boron: item.bor,
      });
    });

    let documentIds: any = [];

    if (values.wellDocuments) {
      values.wellDocuments.forEach((row: any) => {
        documentIds.push(row.value);
      });
    }

    const topographyObj = {
      status: values.topographyStatus.value,
      northSteep: values.northSteep,
      eastSteep: values.eastSteep,
      southSteep: values.southSteep,
      westSteep: values.westSteep,
      slopePercentageEnum: values.slopePercentage.value,
      soilStatus: values.soilCondition.value,
      sourceOfWater: values.waterSupplySource.value,
      documentIds: documentIds,

      isHaveWaterExploitationSystemLicense: values.license,
      waterExploitationSystemLicenseNumber: values.license
        ? values.licenseNumber
        : "",
      waterExploitationSystemLicenseDate: values.license
        ? values.licenseDate
        : "",
      isHaveWaterExperiment: values.waterTest,
      ph: values.waterTest ? values.PH : 0,
      ec: values.waterTest ? values.EC : 0,
      waterImpurities: values.waterTest ? values.impurity : 0,
      waterExploitationSystem: values.waterExploitationSystem.value,
      planting: values.beforProductionSystem.value,
      holding: values.DuringProductionSystem.value,
      harvest: values.endProductionSystem.value,
      isHaveSoilExperiment: values.soilTest,
      licenseRequestSectionId: +section_id,
      decompositionOfSoilsVm: decompositionOfSoilsVm,
      nutrientsVm: nutrientsVm,
      waterQualityWithTasteEnum: values.waterQuality
        ? values.waterQuality.value
        : 0,
    };

    setTopography.mutate(topographyObj, {
      onSuccess: () => {
        showToast(["با موفقیت ثبت گردید"], ToastTypes.success);
        topographyList[1](null);
      },
    });
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={inspectionPotoraphyValidation}
      onSubmit={isExpert ? onSubmit : () => {}}
      enableReinitialize={true}
    >
      {({ setFieldError, values, setFieldValue, handleSubmit }) => (
        <FieldWrapper setFieldError={setFieldError} useMutate={() => null}>
          <>
            {initialValues.topographyStatus.value === 0 &&
            getTopography.isLoading ? (
              <FallBackSpinner />
            ) : (
              <>
                <TwoColumn>
                  <Form>
                    <div>
                      <BasicSelectOption
                        lableText="وضعیت توپوگرافی"
                        name="topographyStatus"
                        data={topographyStatus}
                        placeHolder="لطفا یک گزینه انتخاب کنید..."
                        significant
                        isDisabled={!isExpert}
                      />
                      <Col>
                        <Row>
                          <Col sm="12">
                            <InpuLable
                              significant={false}
                              lableText="جهت شیب:"
                              className="h6 mb-1"
                            />
                          </Col>
                          <Col sm="6">
                            <Toggle
                              id="northSteep"
                              name="northSteep"
                              lableText="شمال"
                              significant
                              disabled={!isExpert}
                              direction="ltr"
                            />
                          </Col>
                          <Col sm="6">
                            <Toggle
                              id="eastSteep"
                              name="eastSteep"
                              lableText="شرق"
                              significant
                              disabled={!isExpert}
                              direction="ltr"
                            />
                          </Col>
                          <Col sm="6">
                            <Toggle
                              id="southSteep"
                              name="southSteep"
                              lableText="جنوب"
                              significant
                              disabled={!isExpert}
                              direction="ltr"
                            />
                          </Col>
                          <Col sm="6">
                            <Toggle
                              id="westSteep"
                              name="westSteep"
                              lableText="غرب"
                              significant
                              disabled={!isExpert}
                              direction="ltr"
                            />
                          </Col>
                        </Row>
                      </Col>
                      <BasicSelectOption
                        lableText="درصد شیب "
                        name="slopePercentage"
                        placeHolder="لطفا یک گزینه انتخاب کنید..."
                        data={slopePercent}
                        significant
                        isDisabled={!isExpert}
                      />
                      <BasicSelectOption
                        lableText="وضعیت خاک"
                        name="soilCondition"
                        data={soilCondition}
                        placeHolder="لطفا یک گزینه انتخاب کنید..."
                        significant
                        isDisabled={!isExpert}
                      />
                      <BasicSelectOption
                        lableText="منبع تامین آب "
                        name="waterSupplySource"
                        data={waterSupplySources}
                        placeHolder="لطفا یک گزینه انتخاب کنید..."
                        significant
                        isDisabled={!isExpert}
                      />
                      {values.waterSupplySource.value < 7 && (
                        <>
                          <Toggle
                            id="license"
                            name="license"
                            lableText=" : مجوز"
                            significant
                            direction="ltr"
                            disabled={!isExpert}
                          />
                          {values.license && (
                            <div>
                              <TextInput
                                lableText="شماره مجوز"
                                name="licenseNumber"
                                placeholder="شماره مجوز"
                                significant
                                disabled={!isExpert}
                              />
                              <ModernDatePicker
                                lableText="تاریخ مجوز"
                                name="licenseDate"
                                placeholder="تاریخ مجوز"
                                significant
                                initialValue={values.licenseDate}
                                hasMaximum={false}
                                disabled={!isExpert}
                              />
                              {(values.waterSupplySource.value === 6 ||
                                values.waterSupplySource.value === 5 ||
                                values.waterSupplySource.value === 4) && (
                                <MultiSelectOption
                                  options={wellDocumentsData}
                                  name="wellDocuments"
                                  hasLabel
                                  labelText="اسناد چاه"
                                  significant={false}
                                  isDisabled={!isExpert}
                                  onChange={(e) =>
                                    setFieldValue("wellDocuments", e)
                                  }
                                  isLoading={getWellTypeMutation.isLoading}
                                  placeHolder="انتخاب کنید ..."
                                />
                              )}
                            </div>
                          )}
                        </>
                      )}

                      <Toggle
                        id="waterTest"
                        name="waterTest"
                        lableText=" : آزمایش آب"
                        significant
                        direction="ltr"
                        disabled={!isExpert}
                      />
                      {values.waterTest && (
                        <div>
                          <TextInput
                            lableText="اسید PH"
                            name="PH"
                            placeholder="اسید PH"
                            significant
                            disabled={!isExpert}
                          />
                          <TextInput
                            lableText="هدایت EC"
                            name="EC"
                            placeholder="هدایت EC"
                            significant
                            disabled={!isExpert}
                          />
                          <TextInput
                            lableText="ناخالصی"
                            name="impurity"
                            placeholder="ناخالصی"
                            significant
                            disabled={!isExpert}
                          />
                        </div>
                      )}
                      {!values.waterTest && (
                        <div>
                          <BasicSelectOption
                            lableText="کیفیت آب با حس چشائی "
                            name="waterQuality"
                            placeHolder="لطفا یک گزینه انتخاب کنید..."
                            data={waterQuality}
                            significant
                            isDisabled={!isExpert}
                          />
                        </div>
                      )}

                      <Toggle
                        id="soilTest"
                        name="soilTest"
                        lableText=" : آزمایش خاک"
                        significant
                        disabled={!isExpert}
                        direction="ltr"
                      />
                    </div>
                  </Form>
                  <div>
                    <ExploitationInputs disabled={!isExpert} />
                    {values.soilTest && (
                      <>
                        <SoilDecompositionForm
                          setSoilDecompositionList={setSoilDecompositionList}
                          soilDecompositionList={soilDecompositionList}
                          disabled={!isExpert}
                        />
                        <SoilNutrientsForm
                          setSoilNutrientList={setSoilNutrientList}
                          soilNutrientList={soilNutrientList}
                          disabled={!isExpert}
                        />
                      </>
                    )}
                  </div>
                </TwoColumn>
                {isExpert && (
                  <SubmitButton
                    isLoading={setTopography.isLoading}
                    initialValue={values}
                    btnText="ثبت"
                    type="button"
                    onClick={handleSubmit}
                    values={values}
                    schema={inspectionPotoraphyValidation}
                  />
                )}
              </>
            )}
          </>
        </FieldWrapper>
      )}
    </Formik>
  );
};

export { TopographyForm };
