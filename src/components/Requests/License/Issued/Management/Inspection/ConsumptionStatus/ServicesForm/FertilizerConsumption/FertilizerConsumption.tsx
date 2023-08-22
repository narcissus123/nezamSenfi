import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CardBody, Col, Row } from "reactstrap";
import {
  FertilizerShoppingCenterEnum,
  HowToUseAnimalFertilizerEnum,
  HowToUseBioFertilizerEnum,
  HowToUseGranularFertilizerEnum,
  NameOfAnimalFertilizerEnum,
  NameOfBioFertilizerEnum,
  NameOfLiquidFertilizerEnum,
  NameOfNitrateFertilizerEnum,
  NameOfPhosphateFertilizerEnum,
  NameOfPotassiumFertilizerEnum,
  NameOfSulfurFertilizerEnum,
  NumberOfStepsUsedEnum,
  SeedShoppingCenterEnum,
} from "../../../../../../../../../core/data/fertilizer-consumption.data";
import { ToastTypes } from "../../../../../../../../../core/enums";
import {
  FullOptionSel,
  OptionRow,
  OptionRowSel,
} from "../../../../../../../../../core/models";
import {
  useGetAllConsumptionForDropDown2,
  useGetConsumptionCostForDropDownById,
  useGetSeedUsedAmount,
  useGetSelcetOptionOfEnum,
  useGetWaterUsedAmount,
  useSetFertilizerConsumption,
} from "../../../../../../../../../core/services/api";
import { checkConsumptionExistsInData, fullOption, showToast } from "../../../../../../../../../core/utils";
import { createConsumptionValueLabel } from "../../../../../../../../../core/utils/create-consumption-value-label.utils";
import { getCost } from "../../../../../../../../../core/utils/get-cost.utils";
import { FertilizerConsumptionValidation } from "../../../../../../../../../core/validations/inpection-fertilizer.validation";
import {
  FormDivider,
  MultiSelectOption,
  SubmitButton,
} from "../../../../../../../../common/Form";
import BasicSelectOption from "../../../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { FertilizerNamesJson } from "./FertilizerNamesJson/FertilizerNamesJson";

interface IPropTypes {
  parentData: any;
  id: number | undefined;
  useGetMutation: any;
  isExpert: boolean;
}

const FertilizerConsumption: React.FC<IPropTypes> = ({
  parentData,
  id,
  useGetMutation,
  isExpert,
}) => {
  const [initialValues, setInitialValues] = useState<any>({
    seedUsedAmountGroupEnum: null,
    seedUsedAmount: null,
    nahalUsedAmountGroupEnum: null,
    nashaUsedAmount: null,
    plantUsedAmountGroupEnum: null,
    plantUsedAmount: null,
    seedShoppingCenterEnum: null,
    nitrateFertilizerUsedAmount: null,
    numberOfStepsUsedNitrateEnum: null,
    nitrateFertilizerShoppingCenterEnumJson: null,
    nitrateFertilizerCostOfConsomptionId: null,
    phosphateFertilizerUsedAmount: null,
    numberOfStepsUsedPhosphateEnum: null,
    phosphateFertilizerShoppingCenterEnumJson: null,
    phosphateFertilizerCostOfConsomptionId: null,
    potassiumFertilizerUsedAmount: null,
    numberOfStepsUsedPotassiumEnum: null,
    potassiumFertilizerShoppingCenterEnumJson: null,
    potassiumFertilizerCostOfConsomptionId: null,
    sulfurFertilizerUsedAmount: null,
    numberOfStepsUsedSulfurEnum: null,
    sulfurFertilizerShoppingCenterEnumJson: null,
    sulfurFertilizerCostOfConsomptionId: null,
    bioFertilizerUsedAmount: null,
    numberOfStepsUsedBioEnum: null,
    bioFertilizerShoppingCenterEnumJson: null,
    bioFertilizerCostOfConsomptionId: null,
    animalFertilizerUsedAmount: null,
    numberOfStepsUsedAnimalEnum: null,
    animalFertilizerShoppingCenterEnumJson: null,
    animalFertilizerCostOfConsomptionId: null,
    liquidFertilizerUsedAmount: null,
    numberOfStepsUsedLiquidEnum: null,
    liquidFertilizerShoppingCenterEnumJson: null,
    liquidFertilizerCostOfConsomptionId: null,
    howToUseGranularFertilizerEnum: null,
    howToUseBioFertilizerEnum: null,
    howToUseAnimalFertilizerEnum: null,
    liquidFertilizerUsedAmountGroupEnum: null,
    animalFertilizerUsedAmountGroupEnum: null,
    bioFertilizerUsedAmountGroupEnum: null,
    sulfurFertilizerUsedAmountGroupEnum: null,
    potassiumFertilizerUsedAmountGroupEnum: null,
    phosphateFertilizerUsedAmountGroupEnum: null,
    nitrateFertilizerUsedAmountGroupEnum: null,
  });

  const [seedUsedAmount, setSeedUsedAmount] = useState<FullOptionSel[]>([]);
  const [seedUsedAmountGroupEnum, setSeedUsedAmountGroupEnum] = useState<
    FullOptionSel[]
  >([]);
  const [nahalUsedAmountGroupEnum, setNahalUsedAmountGroupEnum] = useState<
    FullOptionSel[]
  >([]);
  const [liquidUsedAmountGroupEnum, setLiquidUsedAmountGroupEnum] = useState<
    FullOptionSel[]
  >([]);
  const [plantUsedAmountGroupEnum, setPlantUsedAmountGroupEnum] = useState<
    FullOptionSel[]
  >([]);
  const [phosphateFertilizerUsedAmount, setPhosphateFertilizerUsedAmount] =
    useState<FullOptionSel[]>([]);
  const [nitrateFertilizerUsedAmount, setNitrateFertilizerUsedAmount] =
    useState<FullOptionSel[]>([]);
  const [potasiumFertilizerUsedAmount, setPotasiumFertilizerUsedAmount] =
    useState<FullOptionSel[]>([]);
  const [sulfurFertilizerUsedAmount, setSulfurFertilizerUsedAmount] = useState<
    FullOptionSel[]
  >([]);
  const [bioFertilizerUsedAmount, setBioFertilizerUsedAmount] = useState<
    FullOptionSel[]
  >([]);
  const [animalFertilizerUsedAmount, setAnimalFertilizerUsedAmount] = useState<
    FullOptionSel[]
  >([]);
  const [liquidFertilizerUsedAmount, setLiquidFertilizerUsedAmount] = useState<
    FullOptionSel[]
  >([]);

  const [nahalUsedAmount, setNahalUsedAmount] = useState<FullOptionSel[]>([]);
  const [plantUsedAmount, setPlantUsedAmount] = useState<FullOptionSel[]>([]);

  const [nitrateFertilizerNamesJson, setNitrateFertilizerNamesJson] = useState<
    any[]
  >([]);
  const [phosphateFertilizerNamesJson, setPhosphateFertilizerNamesJson] =
    useState<any[]>([]);
  const [potassiumFertilizerNamesJson, setPotassiumFertilizerNamesJson] =
    useState<any[]>([]);
  const [sulfurFertilizerNamesJson, setSulfurFertilizerNamesJson] = useState<
    any[]
  >([]);
  const [bioFertilizerNamesJson, setBioFertilizerNamesJson] = useState<any[]>(
    []
  );
  const [animalFertilizerNamesJson, setAnimalFertilizerNamesJson] = useState<
    any[]
  >([]);
  const [liquidFertilizerNamesJson, setLiquidFertilizerNamesJson] = useState<
    any[]
  >([]);

  const [fertilizerCost, setFertilizerCost] = useState<FullOptionSel[]>([]);

  const getSeedUsedAmount = useGetSeedUsedAmount();
  const getNitrateUsedAmount = useGetSeedUsedAmount();
  const getPhosphateUsedAmount = useGetSeedUsedAmount();
  const getPotasiumUsedAmount = useGetSeedUsedAmount();
  const getSulfurUsedAmount = useGetSeedUsedAmount();
  const getAnimalUsedAmount = useGetSeedUsedAmount();
  const getBioUsedAmount = useGetSeedUsedAmount();
  const getSeedEnum = useGetSelcetOptionOfEnum();
  const getEnum = useGetSelcetOptionOfEnum();
  const getNahalUsedAmount = useGetWaterUsedAmount();
  const getPlantUsedAmount = useGetWaterUsedAmount();
  const getLiquidUsedAmount = useGetWaterUsedAmount();
  const setFerilizer = useSetFertilizerConsumption();

  const getFertilizerCost = useGetAllConsumptionForDropDown2();
  useEffect(()=>{
    getFertilizerCost.mutate(4);
  },[])

  const getFertilizerDetail = useGetMutation();
  
  const getNitrateFertilizerCostOfConsomptionIdMutation = useGetConsumptionCostForDropDownById();
  const getPhosphateFertilizerCostOfConsomptionIdMutation = useGetConsumptionCostForDropDownById();
  const getPotassiumFertilizerCostOfConsomptionIdMutation = useGetConsumptionCostForDropDownById();
  const getSulfurFertilizerCostOfConsomptionIdMutation = useGetConsumptionCostForDropDownById();
  const getBioFertilizerCostOfConsomptionIdMutation = useGetConsumptionCostForDropDownById();
  const getAnimalFertilizerCostOfConsomptionIdMutation = useGetConsumptionCostForDropDownById();
  const getLiquidFertilizerCostOfConsomptionIdMutation = useGetConsumptionCostForDropDownById();

  useEffect(() => {
    if (id && id !== 0) {
      getFertilizerDetail.mutate(id, {
        onSuccess: (val: any) => {
          const result = val.data.result;

          try {
            if (fertilizerCost && fertilizerCost.length > 0) {
              if (
                !checkConsumptionExistsInData(
                  result.nitrateFertilizerCostOfConsomptionId,
                  fertilizerCost
                )
              ) {
                getNitrateFertilizerCostOfConsomptionIdMutation.mutate(
                  result.nitrateFertilizerCostOfConsomptionId,
                  {
                    onSuccess: (val: any) => {
                      let data = val.data.result;
                      setInitialValues((old: any) => ({
                        ...old,
                        nitrateFertilizerCostOfConsomptionId: createConsumptionValueLabel(data),
                      }));
                    },
                  }
                );
              }

              if (
                !checkConsumptionExistsInData(
                  result.phosphateFertilizerCostOfConsomptionId,
                  fertilizerCost
                )
              ) {
                getPhosphateFertilizerCostOfConsomptionIdMutation.mutate(
                  result.phosphateFertilizerCostOfConsomptionId,
                  {
                    onSuccess: (val: any) => {
                      let data = val.data.result;
                      setInitialValues((old: any) => ({
                        ...old,
                        phosphateFertilizerCostOfConsomptionId: createConsumptionValueLabel(data),
                      }));
                    },
                  }
                );
              }

              if (
                !checkConsumptionExistsInData(
                  result.potassiumFertilizerCostOfConsomptionId,
                  fertilizerCost
                )
              ) {
                getPotassiumFertilizerCostOfConsomptionIdMutation.mutate(
                  result.potassiumFertilizerCostOfConsomptionId,
                  {
                    onSuccess: (val: any) => {
                      let data = val.data.result;
                      setInitialValues((old: any) => ({
                        ...old,
                        potassiumFertilizerCostOfConsomptionId: createConsumptionValueLabel(data),
                      }));
                    },
                  }
                );
              }

              if (
                !checkConsumptionExistsInData(
                  result.sulfurFertilizerCostOfConsomptionId,
                  fertilizerCost
                )
              ) {
                getSulfurFertilizerCostOfConsomptionIdMutation.mutate(
                  result.sulfurFertilizerCostOfConsomptionId,
                  {
                    onSuccess: (val: any) => {
                      let data = val.data.result;
                      setInitialValues((old: any) => ({
                        ...old,
                        sulfurFertilizerCostOfConsomptionId: createConsumptionValueLabel(data),
                      }));
                    },
                  }
                );
              }

              if (
                !checkConsumptionExistsInData(
                  result.bioFertilizerCostOfConsomptionId,
                  fertilizerCost
                )
              ) {
                getBioFertilizerCostOfConsomptionIdMutation.mutate(
                  result.bioFertilizerCostOfConsomptionId,
                  {
                    onSuccess: (val: any) => {
                      let data = val.data.result;
                      setInitialValues((old: any) => ({
                        ...old,
                        bioFertilizerCostOfConsomptionId: createConsumptionValueLabel(data),
                      }));
                    },
                  }
                );
              }

              if (
                !checkConsumptionExistsInData(
                  result.animalFertilizerCostOfConsomptionId,
                  fertilizerCost
                )
              ) {
                getAnimalFertilizerCostOfConsomptionIdMutation.mutate(
                  result.animalFertilizerCostOfConsomptionId,
                  {
                    onSuccess: (val: any) => {
                      let data = val.data.result;
                      setInitialValues((old: any) => ({
                        ...old,
                        animalFertilizerCostOfConsomptionId: createConsumptionValueLabel(data),
                      }));
                    },
                  }
                );
              }

              if (
                !checkConsumptionExistsInData(
                  result.liquidFertilizerCostOfConsomptionId,
                  fertilizerCost
                )
              ) {
                getLiquidFertilizerCostOfConsomptionIdMutation.mutate(
                  result.liquidFertilizerCostOfConsomptionId,
                  {
                    onSuccess: (val: any) => {
                      let data = val.data.result;
                      setInitialValues((old: any) => ({
                        ...old,
                        liquidFertilizerCostOfConsomptionId: createConsumptionValueLabel(data),
                      }));
                    },
                  }
                );
              }
            }

            setInitialValues({
              seedUsedAmount: {
                value: result.seedUsedAmount,
                label: result.seedUsedAmount + " کیلوگرم",
              },
              nashaUsedAmount: {
                value: result.nashaUsedAmount,
                label: result.nashaUsedAmount + " لیتر",
              },
              plantUsedAmount: {
                value: result.plantUsedAmount,
                label: result.plantUsedAmount + " لیتر",
              },
              seedShoppingCenterEnum: {
                value: result.seedShoppingCenterEnum,
                label: "",
              },
              nitrateFertilizerUsedAmount: {
                value: result.nitrateFertilizerUsedAmount,
                label: result.nitrateFertilizerUsedAmount + " کیلوگرم",
              },
              numberOfStepsUsedNitrateEnum: {
                value: result.numberOfStepsUsedNitrateEnum,
                label: result.numberOfStepsUsedNitrateEnumTitle,
              },
              nitrateFertilizerShoppingCenterEnumJson:
                result.nitrateFertilizerShoppingCenterEnumVm
                  ? result.nitrateFertilizerShoppingCenterEnumVm.map(
                      (item: number) =>
                        fullOption(item, FertilizerShoppingCenterEnum)
                    )
                  : null,
              nitrateFertilizerCostOfConsomptionId: {
                value: result.nitrateFertilizerCostOfConsomptionId,
                label: "",
              },
              phosphateFertilizerUsedAmount: {
                value: result.phosphateFertilizerUsedAmount,
                label: result.phosphateFertilizerUsedAmount + " کیلوگرم",
              },
              numberOfStepsUsedPhosphateEnum: {
                value: result.numberOfStepsUsedPhosphateEnum,
                label: result.numberOfStepsUsedPhosphateEnumTitle,
              },
              phosphateFertilizerShoppingCenterEnumJson:
                result.phosphateFertilizerShoppingCenterEnumVm
                  ? result.phosphateFertilizerShoppingCenterEnumVm.map(
                      (item: number) =>
                        fullOption(item, FertilizerShoppingCenterEnum)
                    )
                  : null,
              phosphateFertilizerCostOfConsomptionId: {
                value: result.phosphateFertilizerCostOfConsomptionId,
                label: "",
              },
              potassiumFertilizerUsedAmount: {
                value: result.potassiumFertilizerUsedAmount,
                label: result.potassiumFertilizerUsedAmount + " کیلوگرم",
              },
              numberOfStepsUsedPotassiumEnum: {
                value: result.numberOfStepsUsedPotassiumEnum,
                label: result.numberOfStepsUsedPotassiumEnumTitle,
              },
              potassiumFertilizerShoppingCenterEnumJson:
                result.potassiumFertilizerShoppingCenterEnumVm
                  ? result.potassiumFertilizerShoppingCenterEnumVm.map(
                      (item: number) =>
                        fullOption(item, FertilizerShoppingCenterEnum)
                    )
                  : null,
              potassiumFertilizerCostOfConsomptionId: {
                value: result.potassiumFertilizerCostOfConsomptionId,
                label: "",
              },
              sulfurFertilizerUsedAmount: {
                value: result.sulfurFertilizerUsedAmount,
                label: result.sulfurFertilizerUsedAmount + " کیلوگرم",
              },
              numberOfStepsUsedSulfurEnum: {
                value: result.numberOfStepsUsedSulfurEnum,
                label: result.numberOfStepsUsedSulfurEnumTitle,
              },
              sulfurFertilizerShoppingCenterEnumJson:
                result.sulfurFertilizerShoppingCenterEnumVm
                  ? result.sulfurFertilizerShoppingCenterEnumVm.map(
                      (item: number) =>
                        fullOption(item, FertilizerShoppingCenterEnum)
                    )
                  : null,
              sulfurFertilizerCostOfConsomptionId: {
                value: result.sulfurFertilizerCostOfConsomptionId,
                label: "",
              },
              bioFertilizerUsedAmount: {
                value: result.bioFertilizerUsedAmount,
                label: result.bioFertilizerUsedAmount + " کیلوگرم",
              },
              numberOfStepsUsedBioEnum: {
                value: result.numberOfStepsUsedBioEnum,
                label: result.numberOfStepsUsedBioEnumTitle,
              },
              bioFertilizerShoppingCenterEnumJson:
                result.bioFertilizerShoppingCenterEnumVm
                  ? result.bioFertilizerShoppingCenterEnumVm.map(
                      (item: number) =>
                        fullOption(item, FertilizerShoppingCenterEnum)
                    )
                  : null,
              bioFertilizerCostOfConsomptionId: {
                value: result.bioFertilizerCostOfConsomptionId,
                label: "",
              },
              animalFertilizerUsedAmount: {
                value: result.animalFertilizerUsedAmount,
                label: result.animalFertilizerUsedAmount + " کیلوگرم",
              },
              numberOfStepsUsedAnimalEnum: {
                value: result.numberOfStepsUsedAnimalEnum,
                label: result.numberOfStepsUsedAnimalEnumTitle,
              },
              animalFertilizerShoppingCenterEnumJson:
                result.animalFertilizerShoppingCenterEnumVm
                  ? result.animalFertilizerShoppingCenterEnumVm.map(
                      (item: number) =>
                        fullOption(item, FertilizerShoppingCenterEnum)
                    )
                  : null,
              animalFertilizerCostOfConsomptionId: {
                value: result.animalFertilizerCostOfConsomptionId,
                label: "",
              },
              liquidFertilizerUsedAmount: {
                value: result.liquidFertilizerUsedAmount,
                label: result.liquidFertilizerUsedAmount + " لبتر",
              },
              numberOfStepsUsedLiquidEnum: {
                value: result.numberOfStepsUsedLiquidEnum,
                label: result.numberOfStepsUsedLiquidEnumTitle,
              },
              liquidFertilizerShoppingCenterEnumJson:
                result.liquidFertilizerShoppingCenterEnumVm
                  ? result.liquidFertilizerShoppingCenterEnumVm.map(
                      (item: number) =>
                        fullOption(item, FertilizerShoppingCenterEnum)
                    )
                  : null,
              liquidFertilizerCostOfConsomptionId: {
                value: result.liquidFertilizerCostOfConsomptionId,
                label: "",
              },
              howToUseGranularFertilizerEnum: {
                value: result.howToUseGranularFertilizerEnum,
                label: result.howToUseGranularFertilizerEnumTitle,
              },
              howToUseBioFertilizerEnum: {
                value: result.howToUseBioFertilizerEnum,
                label: result.howToUseBioFertilizerEnumTitle,
              },
              howToUseAnimalFertilizerEnum: {
                value: result.howToUseAnimalFertilizerEnum,
                label: result.howToUseAnimalFertilizerEnumTitle,
              },
            });
          } catch (error) {
            console.log(error);
          }

          try {
            setAnimalFertilizerNamesJson(
              result.animalFertilizerNamesVm
                ? result.animalFertilizerNamesVm.map((item: any) => ({
                    nameOfFertilizerEnum: fullOption(
                      item.nameOfAnimalFertilizerEnum,
                      NameOfAnimalFertilizerEnum
                    ),
                    amount: {
                      value: item.amount,
                      label: item.amount + " کيلوگرم",
                    },
                  }))
                : []
            );

            setNitrateFertilizerNamesJson(
              result.nitrateFertilizerNamesVm
                ? result.nitrateFertilizerNamesVm.map((item: any) => ({
                    nameOfFertilizerEnum: fullOption(
                      item.nameOfNitrateFertilizerEnum,
                      NameOfNitrateFertilizerEnum
                    ),
                    amount: {
                      value: item.amount,
                      label: item.amount + " کيلوگرم",
                    },
                  }))
                : []
            );

            setPhosphateFertilizerNamesJson(
              result.phosphateFertilizerNamesVm
                ? result.phosphateFertilizerNamesVm.map((item: any) => ({
                    nameOfFertilizerEnum: fullOption(
                      item.nameOfPhosphateFertilizerEnum,
                      NameOfPhosphateFertilizerEnum
                    ),
                    amount: {
                      value: item.amount,
                      label: item.amount + " کيلوگرم",
                    },
                  }))
                : []
            );
            setPotassiumFertilizerNamesJson(
              result.potassiumFertilizerNamesVm
                ? result.potassiumFertilizerNamesVm.map((item: any) => ({
                    nameOfFertilizerEnum: fullOption(
                      item.nameOfPotassiumFertilizerEnum,
                      NameOfPotassiumFertilizerEnum
                    ),
                    amount: {
                      value: item.amount,
                      label: item.amount + " کيلوگرم",
                    },
                  }))
                : []
            );

            setSulfurFertilizerNamesJson(
              result.sulfurFertilizerNamesVm
                ? result.sulfurFertilizerNamesVm.map((item: any) => ({
                    nameOfFertilizerEnum: fullOption(
                      item.nameOfSulfurFertilizerEnum,
                      NameOfSulfurFertilizerEnum
                    ),
                    amount: {
                      value: item.amount,
                      label: item.amount + " کيلوگرم",
                    },
                  }))
                : []
            );

            setBioFertilizerNamesJson(
              result.bioFertilizerNamesVm
                ? result.bioFertilizerNamesVm.map((item: any) => ({
                    nameOfFertilizerEnum: fullOption(
                      item.nameOfBioFertilizerEnum,
                      NameOfBioFertilizerEnum
                    ),
                    amount: {
                      value: item.amount,
                      label: item.amount + " کيلوگرم",
                    },
                  }))
                : []
            );
            setLiquidFertilizerNamesJson(
              result.liquidFertilizerNamesVm
                ? result.liquidFertilizerNamesVm.map((item: any) => ({
                    nameOfFertilizerEnum: fullOption(
                      item.nameOfLiquidFertilizerEnum,
                      NameOfLiquidFertilizerEnum
                    ),
                    amount: {
                      value: item.amount,
                      label: item.amount + " ليتر",
                    },
                  }))
                : []
            );
          } catch (error) {}
        },
      });
    }
  }, [id, fertilizerCost]);

  useEffect(() => {
    getSeedEnum.mutate("SeedUsedAmountGroupEnum", {
      onSuccess: (val) => {
        try {
          let newEnumList: FullOptionSel[] = [
            { label: "انتخاب کنید...", options: [] },
          ];

          val.data.result.forEach((item: OptionRow) => {
            newEnumList[0].options.push({ value: +item.id, label: item.title });
          });

          setSeedUsedAmountGroupEnum(newEnumList);
        } catch (error) {}
      },
    });
  }, []);

  useEffect(() => {
    getEnum.mutate("WaterAmountGroupEnum", {
      onSuccess: (val) => {
        try {
          let newEnumList: FullOptionSel[] = [
            { label: "انتخاب کنید...", options: [] },
          ];

          val.data.result.forEach((item: OptionRow) => {
            newEnumList[0].options.push({ value: +item.id, label: item.title });
          });

          const nahal: FullOptionSel[] = newEnumList.map((row) => {
            const option = row.options.map((item) => ({
              value: item.value,
              label: item.label + " اصله",
            }));

            return { label: row.label, options: option };
          });

          const plant: FullOptionSel[] = newEnumList.map((row) => {
            const option = row.options.map((item) => ({
              value: item.value,
              label: item.label + " بسته",
            }));

            return { label: row.label, options: option };
          });

          const liquid: FullOptionSel[] = newEnumList.map((row) => {
            const option = row.options.map((item) => ({
              value: item.value,
              label: item.label + " لیتر",
            }));

            return { label: row.label, options: option };
          });

          setNahalUsedAmountGroupEnum(nahal);
          setPlantUsedAmountGroupEnum(plant);
          setLiquidUsedAmountGroupEnum(liquid);
        } catch (error) {}
      },
    });
  }, []);

  useEffect(() => {
    if (getFertilizerCost.isSuccess) {
      const result = getFertilizerCost.data?.data.result;
      let waterCost: FullOptionSel[] = [
        { label: "انتخاب کنید...", options: [] },
      ];

      result.forEach((item: any) => {
        waterCost[0].options.push({
          value: item.id,
          label: getCost(item),
        });
      });
      setFertilizerCost(waterCost);
    }
  }, [getFertilizerCost.isSuccess]);

  const onSeedConsumptionChange = (opt: OptionRowSel, setFieldValue: any) => {
    setFieldValue("seedUsedAmountGroupEnum", opt);

    if (opt.value === 42 || opt.label.includes("فاقد مقدار مصرفی")) {
      setFieldValue("seedUsedAmount", { value: 0, label: "فاقد مقدار" });
    } else {
      setFieldValue("seedUsedAmount", null);
      getSeedUsedAmount.mutate(opt.value, {
        onSuccess: (val) => {
          const result = val.data.result;
          let waterUsedList: FullOptionSel[] = [
            { label: "انتخاب کنید...", options: [] },
          ];

          result.forEach((item: number) => {
            waterUsedList[0].options.push({
              value: item,
              label: item + " کیلوگرم",
            });
          });

          setSeedUsedAmount(waterUsedList);
        },
      });
    }
  };

  const onNitrateFertilizerChange = (opt: OptionRowSel, setFieldValue: any) => {
    setFieldValue("nitrateFertilizerUsedAmountGroupEnum", opt);

    if (opt.value === 42 || opt.label.includes("فاقد مقدار")) {
      setFieldValue("nitrateFertilizerUsedAmount", {
        value: 0,
        label: "فاقد مقدار مصرفی",
      });
      setFieldValue("numberOfStepsUsedNitrateEnum", {
        value: 0,
        label: "فاقد مقدار مصرفی",
      });
      setFieldValue("nitrateFertilizerShoppingCenterEnumJson", [
        {
          value: 0,
          label: "فاقد مقدار مصرفی",
        },
      ]);
      setFieldValue("nitrateFertilizerCostOfConsomptionId", {
        value: 0,
        label: "فاقد مقدار مصرفی",
      });
    } else {
      setFieldValue("nitrateFertilizerUsedAmount", null);
      setFieldValue("numberOfStepsUsedNitrateEnum", null);
      setFieldValue("nitrateFertilizerShoppingCenterEnumJson", null);
      setFieldValue("nitrateFertilizerCostOfConsomptionId", null);
      getNitrateUsedAmount.mutate(opt.value, {
        onSuccess: (val) => {
          const result = val.data.result;
          let waterUsedList: FullOptionSel[] = [
            { label: "انتخاب کنید...", options: [] },
          ];

          result.forEach((item: number) => {
            waterUsedList[0].options.push({
              value: item,
              label: item + " کیلوگرم",
            });
          });

          setNitrateFertilizerUsedAmount(waterUsedList);
        },
      });
    }
  };
  const onPhosphateFertilizerChange = (
    opt: OptionRowSel,
    setFieldValue: any
  ) => {
    setFieldValue("phosphateFertilizerUsedAmountGroupEnum", opt);

    if (opt.value === 42 || opt.label.includes("فاقد مقدار")) {
      setFieldValue("phosphateFertilizerUsedAmount", {
        value: 0,
        label: "فاقد مقدار مصرفی",
      });
      setFieldValue("numberOfStepsUsedPhosphateEnum", {
        value: 0,
        label: "فاقد مقدار مصرفی",
      });
      setFieldValue("phosphateFertilizerShoppingCenterEnumJson", [
        {
          value: 0,
          label: "فاقد مقدار مصرفی",
        },
      ]);
      setFieldValue("phosphateFertilizerCostOfConsomptionId", {
        value: 0,
        label: "فاقد مقدار مصرفی",
      });
    } else {
      setFieldValue("phosphateFertilizerUsedAmount", null);
      setFieldValue("numberOfStepsUsedPhosphateEnum", null);
      setFieldValue("phosphateFertilizerShoppingCenterEnumJson", null);
      setFieldValue("phosphateFertilizerCostOfConsomptionId", null);
      getPhosphateUsedAmount.mutate(opt.value, {
        onSuccess: (val) => {
          const result = val.data.result;
          let waterUsedList: FullOptionSel[] = [
            { label: "انتخاب کنید...", options: [] },
          ];

          result.forEach((item: number) => {
            waterUsedList[0].options.push({
              value: item,
              label: item + " کیلوگرم",
            });
          });

          setPhosphateFertilizerUsedAmount(waterUsedList);
        },
      });
    }
  };
  const onPotassiumFertilizerChange = (
    opt: OptionRowSel,
    setFieldValue: any
  ) => {
    setFieldValue("potassiumFertilizerUsedAmountGroupEnum", opt);

    if (opt.value === 42 || opt.label.includes("فاقد مقدار")) {
      setFieldValue("potassiumFertilizerUsedAmount", {
        value: 0,
        label: "فاقد مقدار مصرفی",
      });
      setFieldValue("numberOfStepsUsedPotassiumEnum", {
        value: 0,
        label: "فاقد مقدار مصرفی",
      });
      setFieldValue("potassiumFertilizerShoppingCenterEnumJson", [
        {
          value: 0,
          label: "فاقد مقدار مصرفی",
        },
      ]);
      setFieldValue("potassiumFertilizerCostOfConsomptionId", {
        value: 0,
        label: "فاقد مقدار مصرفی",
      });
    } else {
      setFieldValue("potassiumFertilizerUsedAmount", null);
      setFieldValue("numberOfStepsUsedPotassiumEnum", null);
      setFieldValue("potassiumFertilizerShoppingCenterEnumJson", null);
      setFieldValue("potassiumFertilizerCostOfConsomptionId", null);
      getPotasiumUsedAmount.mutate(opt.value, {
        onSuccess: (val) => {
          const result = val.data.result;
          let waterUsedList: FullOptionSel[] = [
            { label: "انتخاب کنید...", options: [] },
          ];

          result.forEach((item: number) => {
            waterUsedList[0].options.push({
              value: item,
              label: item + " کیلوگرم",
            });
          });

          setPotasiumFertilizerUsedAmount(waterUsedList);
        },
      });
    }
  };
  const onSulfutFertilizerChange = (opt: OptionRowSel, setFieldValue: any) => {
    setFieldValue("sulfurFertilizerUsedAmountGroupEnum", opt);

    if (opt.value === 42 || opt.label.includes("فاقد مقدار")) {
      setFieldValue("sulfurFertilizerUsedAmount", {
        value: 0,
        label: "فاقد مقدار مصرفی",
      });
      setFieldValue("numberOfStepsUsedSulfurEnum", {
        value: 0,
        label: "فاقد مقدار مصرفی",
      });
      setFieldValue("sulfurFertilizerShoppingCenterEnumJson", [
        {
          value: 0,
          label: "فاقد مقدار مصرفی",
        },
      ]);
      setFieldValue("sulfurFertilizerCostOfConsomptionId", {
        value: 0,
        label: "فاقد مقدار مصرفی",
      });
    } else {
      setFieldValue("sulfurFertilizerUsedAmount", null);
      setFieldValue("numberOfStepsUsedSulfurEnum", null);
      setFieldValue("sulfurFertilizerShoppingCenterEnumJson", null);
      setFieldValue("sulfurFertilizerCostOfConsomptionId", null);
      getSulfurUsedAmount.mutate(opt.value, {
        onSuccess: (val) => {
          const result = val.data.result;
          let waterUsedList: FullOptionSel[] = [
            { label: "انتخاب کنید...", options: [] },
          ];

          result.forEach((item: number) => {
            waterUsedList[0].options.push({
              value: item,
              label: item + " کیلوگرم",
            });
          });

          setSulfurFertilizerUsedAmount(waterUsedList);
        },
      });
    }
  };
  const onBioFertilizerChange = (opt: OptionRowSel, setFieldValue: any) => {
    setFieldValue("bioFertilizerUsedAmountGroupEnum", opt);

    if (opt.value === 42 || opt.label.includes("فاقد مقدار")) {
      setFieldValue("bioFertilizerUsedAmount", {
        value: 0,
        label: "فاقد مقدار مصرفی",
      });
      setFieldValue("numberOfStepsUsedBioEnum", {
        value: 0,
        label: "فاقد مقدار مصرفی",
      });
      setFieldValue("bioFertilizerShoppingCenterEnumJson", [
        {
          value: 0,
          label: "فاقد مقدار مصرفی",
        },
      ]);
      setFieldValue("bioFertilizerCostOfConsomptionId", {
        value: 0,
        label: "فاقد مقدار مصرفی",
      });
      setFieldValue("howToUseBioFertilizerEnum", {
        value: 0,
        label: "فاقد مقدار مصرفی",
      });
    } else {
      setFieldValue("bioFertilizerUsedAmount", null);
      setFieldValue("numberOfStepsUsedBioEnum", null);
      setFieldValue("bioFertilizerShoppingCenterEnumJson", null);
      setFieldValue("bioFertilizerCostOfConsomptionId", null);
      setFieldValue("howToUseBioFertilizerEnum", null);
      getBioUsedAmount.mutate(opt.value, {
        onSuccess: (val) => {
          const result = val.data.result;
          let waterUsedList: FullOptionSel[] = [
            { label: "انتخاب کنید...", options: [] },
          ];

          result.forEach((item: number) => {
            waterUsedList[0].options.push({
              value: item,
              label: item + " کیلوگرم",
            });
          });

          setBioFertilizerUsedAmount(waterUsedList);
        },
      });
    }
  };
  const onAnimalFertilizerChange = (opt: OptionRowSel, setFieldValue: any) => {
    setFieldValue("animalFertilizerUsedAmountGroupEnum", opt);

    if (opt.value === 42 || opt.label.includes("فاقد مقدار")) {
      setFieldValue("animalFertilizerUsedAmount", {
        value: 0,
        label: "فاقد مقدار مصرفی",
      });
      setFieldValue("numberOfStepsUsedAnimalEnum", {
        value: 0,
        label: "فاقد مقدار مصرفی",
      });
      setFieldValue("animalFertilizerShoppingCenterEnumJson", [
        {
          value: 0,
          label: "فاقد مقدار مصرفی",
        },
      ]);
      setFieldValue("animalFertilizerCostOfConsomptionId", {
        value: 0,
        label: "فاقد مقدار مصرفی",
      });
      setFieldValue("howToUseAnimalFertilizerEnum", {
        value: 0,
        label: "فاقد مقدار مصرفی",
      });
    } else {
      setFieldValue("animalFertilizerUsedAmount", null);
      setFieldValue("numberOfStepsUsedAnimalEnum", null);
      setFieldValue("animalFertilizerShoppingCenterEnumJson", null);
      setFieldValue("animalFertilizerCostOfConsomptionId", null);
      setFieldValue("howToUseAnimalFertilizerEnum", null);
      getAnimalUsedAmount.mutate(opt.value, {
        onSuccess: (val) => {
          const result = val.data.result;
          let waterUsedList: FullOptionSel[] = [
            { label: "انتخاب کنید...", options: [] },
          ];

          result.forEach((item: number) => {
            waterUsedList[0].options.push({
              value: item,
              label: item + " کیلوگرم",
            });
          });

          setAnimalFertilizerUsedAmount(waterUsedList);
        },
      });
    }
  };
  const onLiquidFertilizerChange = (opt: OptionRowSel, setFieldValue: any) => {
    setFieldValue("liquidFertilizerUsedAmountGroupEnum", opt);

    if (opt.value === 42 || opt.label.includes("فاقد مقدار")) {
      setFieldValue("liquidFertilizerUsedAmount", {
        value: 0,
        label: "فاقد مقدار مصرفی",
      });
      setFieldValue("numberOfStepsUsedLiquidEnum", {
        value: 0,
        label: "فاقد مقدار مصرفی",
      });
      setFieldValue("liquidFertilizerShoppingCenterEnumJson", [
        {
          value: 0,
          label: "فاقد مقدار مصرفی",
        },
      ]);
      setFieldValue("liquidFertilizerCostOfConsomptionId", {
        value: 0,
        label: "فاقد مقدار مصرفی",
      });
    } else {
      setFieldValue("liquidFertilizerUsedAmount", null);
      setFieldValue("numberOfStepsUsedLiquidEnum", null);
      setFieldValue("liquidFertilizerShoppingCenterEnumJson", null);
      setFieldValue("liquidFertilizerCostOfConsomptionId", null);
      getLiquidUsedAmount.mutate(opt.value, {
        onSuccess: (val) => {
          const result = val.data.result;
          let waterUsedList: FullOptionSel[] = [
            { label: "انتخاب کنید...", options: [] },
          ];

          result.forEach((item: number) => {
            waterUsedList[0].options.push({
              value: item,
              label: item + " لیتر",
            });
          });

          setLiquidFertilizerUsedAmount(waterUsedList);
        },
      });
    }
  };

  const onNahalConsumptionChange = (opt: OptionRowSel, setFieldValue: any) => {
    setFieldValue("nahalUsedAmountGroupEnum", opt);

    if (opt.value === 42 || opt.label.includes("فاقد مقدار")) {
      setFieldValue("nashaUsedAmount", { value: 0, label: "فاقد مقدار مصرفی" });
    } else {
      setFieldValue("nashaUsedAmount", null);
      getNahalUsedAmount.mutate(opt.value, {
        onSuccess: (val) => {
          const result = val.data.result;
          let waterUsedList: FullOptionSel[] = [
            { label: "انتخاب کنید...", options: [] },
          ];

          result.forEach((item: number) => {
            waterUsedList[0].options.push({
              value: item,
              label: item + " اصله",
            });
          });

          setNahalUsedAmount(waterUsedList);
        },
      });
    }
  };

  const onPlantConsumptionChange = (opt: OptionRowSel, setFieldValue: any) => {
    setFieldValue("plantUsedAmountGroupEnum", opt);

    if (opt.value === 42 || opt.label.includes("فاقد مقدار")) {
      setFieldValue("plantUsedAmount", { value: 0, label: "فاقد مقدار مصرفی" });
    } else {
      setFieldValue("plantUsedAmount", null);
      getPlantUsedAmount.mutate(opt.value, {
        onSuccess: (val) => {
          const result = val.data.result;
          let waterUsedList: FullOptionSel[] = [
            { label: "انتخاب کنید...", options: [] },
          ];

          result.forEach((item: number) => {
            waterUsedList[0].options.push({
              value: item,
              label: item + " بسته",
            });
          });

          setPlantUsedAmount(waterUsedList);
        },
      });
    }
  };

  const { section_id } = useParams<{ section_id: string }>();

  const onSubmit = (values: any) => {
    if (
      nitrateFertilizerNamesJson.length === 0 &&
      values.nitrateFertilizerUsedAmount.value !== 0
    ) {
      return showToast(["اطلاعات کودهای نیترات را کنید"], ToastTypes.error);
    }
    if (
      phosphateFertilizerNamesJson.length === 0 &&
      values.phosphateFertilizerUsedAmount.value !== 0
    ) {
      return showToast(["اطلاعات کودهای فسفات را کنید"], ToastTypes.error);
    }
    if (
      potassiumFertilizerNamesJson.length === 0 &&
      values.potassiumFertilizerUsedAmount.value !== 0
    ) {
      return showToast(["اطلاعات کودهای پتاسیم را کنید"], ToastTypes.error);
    }
    if (
      sulfurFertilizerNamesJson.length === 0 &&
      values.sulfurFertilizerUsedAmount.value !== 0
    ) {
      return showToast(["اطلاعات کودهای گوگرد را کنید"], ToastTypes.error);
    }
    if (
      bioFertilizerNamesJson.length === 0 &&
      values.bioFertilizerUsedAmount.value !== 0
    ) {
      return showToast(["اطلاعات کودهای زیستی را کنید"], ToastTypes.error);
    }
    if (
      animalFertilizerNamesJson.length === 0 &&
      values.animalFertilizerUsedAmount.value !== 0
    ) {
      return showToast(["اطلاعات کودهای حیوانی را کنید"], ToastTypes.error);
    }
    if (
      liquidFertilizerNamesJson.length === 0 &&
      values.liquidFertilizerUsedAmount.value !== 0
    ) {
      return showToast(["اطلاعات کودهای مایع را کنید"], ToastTypes.error);
    }

    const fertilizerConsumption = {
      seedUsedAmount: values.seedUsedAmount.value,
      plantUsedAmount: values.plantUsedAmount.value,
      nashaUsedAmount: values.nashaUsedAmount.value,
      seedShoppingCenterEnum: values.seedShoppingCenterEnum.value,
      nitrateFertilizerUsedAmount: values.nitrateFertilizerUsedAmount.value,
      numberOfStepsUsedNitrateEnum: values.numberOfStepsUsedNitrateEnum.value,
      nitrateFertilizerNamesVm: nitrateFertilizerNamesJson.map((item) => ({
        nameOfNitrateFertilizerEnum: item.nameOfFertilizerEnum.value,
        amount: item.amount.value,
      })),
      nitrateFertilizerShoppingCenterEnumVm:
        values.nitrateFertilizerShoppingCenterEnumJson.map(
          (item: OptionRowSel) => item.value
        ),
      nitrateFertilizerCostOfConsomptionId:
        values.nitrateFertilizerCostOfConsomptionId.value,
      phosphateFertilizerUsedAmount: values.phosphateFertilizerUsedAmount.value,
      numberOfStepsUsedPhosphateEnum:
        values.numberOfStepsUsedPhosphateEnum.value,
      phosphateFertilizerNamesVm: phosphateFertilizerNamesJson.map((item) => ({
        nameOfPhosphateFertilizerEnum: item.nameOfFertilizerEnum.value,
        amount: item.amount.value,
      })),
      phosphateFertilizerShoppingCenterEnumVm:
        values.phosphateFertilizerShoppingCenterEnumJson.map(
          (item: OptionRowSel) => item.value
        ),
      phosphateFertilizerCostOfConsomptionId:
        values.phosphateFertilizerCostOfConsomptionId.value,
      potassiumFertilizerUsedAmount: values.potassiumFertilizerUsedAmount.value,
      numberOfStepsUsedPotassiumEnum:
        values.numberOfStepsUsedPotassiumEnum.value,
      potassiumFertilizerNamesVm: potassiumFertilizerNamesJson.map((item) => ({
        nameOfPotassiumFertilizerEnum: item.nameOfFertilizerEnum.value,
        amount: item.amount.value,
      })),
      potassiumFertilizerShoppingCenterEnumVm:
        values.potassiumFertilizerShoppingCenterEnumJson.map(
          (item: OptionRowSel) => item.value
        ),
      potassiumFertilizerCostOfConsomptionId:
        values.potassiumFertilizerCostOfConsomptionId.value,
      sulfurFertilizerUsedAmount: values.sulfurFertilizerUsedAmount.value,
      numberOfStepsUsedSulfurEnum: values.numberOfStepsUsedSulfurEnum.value,
      sulfurFertilizerNamesVm: sulfurFertilizerNamesJson.map((item) => ({
        nameOfSulfurFertilizerEnum: item.nameOfFertilizerEnum.value,
        amount: item.amount.value,
      })),
      sulfurFertilizerShoppingCenterEnumVm:
        values.sulfurFertilizerShoppingCenterEnumJson.map(
          (item: OptionRowSel) => item.value
        ),
      sulfurFertilizerCostOfConsomptionId:
        values.sulfurFertilizerCostOfConsomptionId.value,
      bioFertilizerUsedAmount: values.bioFertilizerUsedAmount.value,
      numberOfStepsUsedBioEnum: values.numberOfStepsUsedBioEnum.value,
      bioFertilizerNamesVm: bioFertilizerNamesJson.map((item) => ({
        nameOfBioFertilizerEnum: item.nameOfFertilizerEnum.value,
        amount: item.amount.value,
      })),
      bioFertilizerShoppingCenterEnumVm:
        values.bioFertilizerShoppingCenterEnumJson.map(
          (item: OptionRowSel) => item.value
        ),
      bioFertilizerCostOfConsomptionId:
        values.bioFertilizerCostOfConsomptionId.value,
      animalFertilizerUsedAmount: values.animalFertilizerUsedAmount.value,
      numberOfStepsUsedAnimalEnum: values.numberOfStepsUsedAnimalEnum.value,
      animalFertilizerNamesVm: animalFertilizerNamesJson.map((item) => ({
        nameOfAnimalFertilizerEnum: item.nameOfFertilizerEnum.value,
        amount: item.amount.value,
      })),
      animalFertilizerShoppingCenterEnumVm:
        values.animalFertilizerShoppingCenterEnumJson.map(
          (item: OptionRowSel) => item.value
        ),
      animalFertilizerCostOfConsomptionId:
        values.animalFertilizerCostOfConsomptionId.value,
      liquidFertilizerUsedAmount: values.liquidFertilizerUsedAmount.value,
      numberOfStepsUsedLiquidEnum: values.numberOfStepsUsedLiquidEnum.value,
      liquidFertilizerNamesVm: liquidFertilizerNamesJson.map((item) => ({
        nameOfLiquidFertilizerEnum: item.nameOfFertilizerEnum.value,
        amount: item.amount.value,
      })),
      liquidFertilizerShoppingCenterEnumVm:
        values.liquidFertilizerShoppingCenterEnumJson.map(
          (item: OptionRowSel) => item.value
        ),
      liquidFertilizerCostOfConsomptionId:
        values.liquidFertilizerCostOfConsomptionId.value,
      howToUseGranularFertilizerEnum:
        values.howToUseGranularFertilizerEnum.value,
      howToUseBioFertilizerEnum: values.howToUseBioFertilizerEnum.value,
      howToUseAnimalFertilizerEnum: values.howToUseAnimalFertilizerEnum.value,
    };

    const fertilizerObj = {
      productionFactorId: parentData.productionFactor.value,
      sectionId: +section_id,
      year: parentData.productionYear.value,
      activityRate: parentData.activityTime,
      fertilizerConsumption: fertilizerConsumption,
    };

    setFerilizer.mutate(fertilizerObj, {
      onSuccess: () => {
        showToast(["با موفقیت انجام شد"], ToastTypes.success);
      },
    });
  };

  return (
    <FormDivider textHeader="مصرف انواع کود بذر و نهال">
      <CardBody>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={FertilizerConsumptionValidation}
          enableReinitialize
        >
          {({ values, setFieldValue }) => {
            if (
              values.seedUsedAmount &&
              values.plantUsedAmount &&
              values.plantUsedAmount.value === 0 &&
              values.seedUsedAmount.value === 0 &&
              !!values.seedShoppingCenterEnum === false
            ) {
              setFieldValue("seedShoppingCenterEnum", {
                value: 0,
                label: "فاقد کود",
              });
            }

            return (
              <Row>
                <Col md="6">
                  <Form>
                    <BasicSelectOption
                      lableText=" استفاده بذر مصرفی"
                      name="seedUsedAmountGroupEnum"
                      data={seedUsedAmountGroupEnum}
                      isLoading={getSeedEnum.isLoading}
                      placeHolder="انتخاب کنید..."
                      isDisabled={!isExpert}
                      significant
                      onChange={(opt) =>
                        onSeedConsumptionChange(opt, setFieldValue)
                      }
                    />
                    <BasicSelectOption
                      lableText="میزان مصرف بذر"
                      name="seedUsedAmount"
                      isDisabled={
                        (values.seedUsedAmount &&
                          values.seedUsedAmount.value === 0) ||
                        !isExpert
                      }
                      data={seedUsedAmount}
                      isLoading={getSeedUsedAmount.isLoading}
                      placeHolder="انتخاب کنید..."
                      significant
                    />
                    <BasicSelectOption
                      lableText=" استفاده نهال مصرفی"
                      name="nahalUsedAmountGroupEnum"
                      data={nahalUsedAmountGroupEnum}
                      isDisabled={!isExpert}
                      isLoading={getEnum.isLoading}
                      placeHolder="انتخاب کنید..."
                      significant
                      onChange={(opt) =>
                        onNahalConsumptionChange(opt, setFieldValue)
                      }
                    />
                    <BasicSelectOption
                      lableText="تعداد نهال مصرفی"
                      name="nashaUsedAmount"
                      isDisabled={
                        (values.nashaUsedAmount &&
                          values.nashaUsedAmount.value === 0) ||
                        !isExpert
                      }
                      data={nahalUsedAmount}
                      isLoading={getNahalUsedAmount.isLoading}
                      placeHolder="انتخاب کنید..."
                      significant
                    />
                    <BasicSelectOption
                      lableText=" استفاده نشا مصرفی"
                      name="plantUsedAmountGroupEnum"
                      data={plantUsedAmountGroupEnum}
                      isLoading={getEnum.isLoading}
                      placeHolder="انتخاب کنید..."
                      isDisabled={!isExpert}
                      significant
                      onChange={(opt) =>
                        onPlantConsumptionChange(opt, setFieldValue)
                      }
                    />
                    <BasicSelectOption
                      lableText="تعداد نشا مصرفی"
                      name="plantUsedAmount"
                      isDisabled={
                        (values.plantUsedAmount &&
                          values.plantUsedAmount.value === 0) ||
                        !isExpert
                      }
                      data={plantUsedAmount}
                      isLoading={getPlantUsedAmount.isLoading}
                      placeHolder="انتخاب کنید..."
                      significant
                    />
                    <BasicSelectOption
                      lableText="مرکز خرید بذر / نشا"
                      name="seedShoppingCenterEnum"
                      isDisabled={
                        (values.seedShoppingCenterEnum &&
                          values.seedShoppingCenterEnum.value === 0) ||
                        !isExpert
                      }
                      data={SeedShoppingCenterEnum}
                      placeHolder="انتخاب کنید..."
                      significant
                    />

                    <BasicSelectOption
                      lableText=" استفاده کود نيترات"
                      name="nitrateFertilizerUsedAmountGroupEnum"
                      data={seedUsedAmountGroupEnum}
                      isLoading={getSeedEnum.isLoading}
                      isDisabled={!isExpert}
                      placeHolder="انتخاب کنید..."
                      significant
                      onChange={(opt) =>
                        onNitrateFertilizerChange(opt, setFieldValue)
                      }
                    />
                    <BasicSelectOption
                      lableText="میزان مصرف کود نیترات"
                      name="nitrateFertilizerUsedAmount"
                      isDisabled={
                        (values.nitrateFertilizerUsedAmount &&
                          values.nitrateFertilizerUsedAmount.value === 0) ||
                        !isExpert
                      }
                      data={nitrateFertilizerUsedAmount}
                      isLoading={getNitrateUsedAmount.isLoading}
                      placeHolder="انتخاب کنید..."
                      significant
                    />

                    <BasicSelectOption
                      lableText="تعداد مراحل  مورد استفاده نیترات"
                      name="numberOfStepsUsedNitrateEnum"
                      data={NumberOfStepsUsedEnum}
                      isDisabled={
                        (values.nitrateFertilizerUsedAmount &&
                          values.nitrateFertilizerUsedAmount.value === 0) ||
                        !isExpert
                      }
                      placeHolder="انتخاب کنید..."
                      significant
                    />
                    <MultiSelectOption
                      labelText="مراکز خرید کود نیترات"
                      name="nitrateFertilizerShoppingCenterEnumJson"
                      options={FertilizerShoppingCenterEnum}
                      significant
                      placeHolder="انتخاب کنید..."
                      isDisabled={
                        (values.nitrateFertilizerUsedAmount &&
                          values.nitrateFertilizerUsedAmount.value === 0) ||
                        !isExpert
                      }
                      hasLabel
                    />
                    <BasicSelectOption
                      lableText="هزینه مصرف کود نیترات"
                      name="nitrateFertilizerCostOfConsomptionId"
                      data={fertilizerCost}
                      isDisabled={
                        (values.nitrateFertilizerUsedAmount &&
                          values.nitrateFertilizerUsedAmount.value === 0) ||
                        !isExpert
                      }
                      isLoading={getFertilizerCost.isLoading}
                      placeHolder="انتخاب کنید..."
                      significant
                    />

                    <BasicSelectOption
                      lableText=" استفاده کود فسفات"
                      name="phosphateFertilizerUsedAmountGroupEnum"
                      data={seedUsedAmountGroupEnum}
                      isLoading={getSeedEnum.isLoading}
                      isDisabled={!isExpert}
                      placeHolder="انتخاب کنید..."
                      significant
                      onChange={(opt) =>
                        onPhosphateFertilizerChange(opt, setFieldValue)
                      }
                    />
                    <BasicSelectOption
                      lableText="میزان مصرف کود فسفات"
                      name="phosphateFertilizerUsedAmount"
                      isDisabled={
                        (values.phosphateFertilizerUsedAmount &&
                          values.phosphateFertilizerUsedAmount.value === 0) ||
                        !isExpert
                      }
                      data={phosphateFertilizerUsedAmount}
                      isLoading={getPhosphateUsedAmount.isLoading}
                      placeHolder="انتخاب کنید..."
                      significant
                    />
                    <BasicSelectOption
                      lableText="تعداد مراحل  مورد استفاده فسفات"
                      name="numberOfStepsUsedPhosphateEnum"
                      isDisabled={
                        (values.phosphateFertilizerUsedAmount &&
                          values.phosphateFertilizerUsedAmount.value === 0) ||
                        !isExpert
                      }
                      data={NumberOfStepsUsedEnum}
                      placeHolder="انتخاب کنید..."
                      significant
                    />
                    <MultiSelectOption
                      labelText="مراکز خرید کود فسفات"
                      name="phosphateFertilizerShoppingCenterEnumJson"
                      options={FertilizerShoppingCenterEnum}
                      isDisabled={
                        (values.phosphateFertilizerUsedAmount &&
                          values.phosphateFertilizerUsedAmount.value === 0) ||
                        !isExpert
                      }
                      significant
                      placeHolder="انتخاب کنید..."
                      hasLabel
                    />
                    <BasicSelectOption
                      lableText="هزینه مصرف کود فسفات"
                      name="phosphateFertilizerCostOfConsomptionId"
                      data={fertilizerCost}
                      isDisabled={
                        (values.phosphateFertilizerUsedAmount &&
                          values.phosphateFertilizerUsedAmount.value === 0) ||
                        !isExpert
                      }
                      isLoading={getFertilizerCost.isLoading}
                      placeHolder="انتخاب کنید..."
                      significant
                    />

                    <BasicSelectOption
                      lableText=" استفاده کود پتاسيم"
                      name="potassiumFertilizerUsedAmountGroupEnum"
                      data={seedUsedAmountGroupEnum}
                      isLoading={getSeedEnum.isLoading}
                      isDisabled={!isExpert}
                      placeHolder="انتخاب کنید..."
                      significant
                      onChange={(opt) =>
                        onPotassiumFertilizerChange(opt, setFieldValue)
                      }
                    />
                    <BasicSelectOption
                      lableText="میزان مصرف کود پتاسیم"
                      name="potassiumFertilizerUsedAmount"
                      isDisabled={
                        (values.potassiumFertilizerUsedAmount &&
                          values.potassiumFertilizerUsedAmount.value === 0) ||
                        !isExpert
                      }
                      isLoading={getPotasiumUsedAmount.isLoading}
                      data={potasiumFertilizerUsedAmount}
                      placeHolder="انتخاب کنید..."
                      significant
                    />
                    <BasicSelectOption
                      lableText="تعداد مراحل  مورد استفاده پتاسیم"
                      name="numberOfStepsUsedPotassiumEnum"
                      isDisabled={
                        (values.potassiumFertilizerUsedAmount &&
                          values.potassiumFertilizerUsedAmount.value === 0) ||
                        !isExpert
                      }
                      data={NumberOfStepsUsedEnum}
                      placeHolder="انتخاب کنید..."
                      significant
                    />
                    <MultiSelectOption
                      labelText="مراکز خرید کود پتاسیم"
                      name="potassiumFertilizerShoppingCenterEnumJson"
                      options={FertilizerShoppingCenterEnum}
                      significant
                      isDisabled={
                        (values.potassiumFertilizerUsedAmount &&
                          values.potassiumFertilizerUsedAmount.value === 0) ||
                        !isExpert
                      }
                      placeHolder="انتخاب کنید..."
                      hasLabel
                    />
                    <BasicSelectOption
                      lableText="هزینه مصرف کود پتاسیم"
                      name="potassiumFertilizerCostOfConsomptionId"
                      data={fertilizerCost}
                      isDisabled={
                        (values.potassiumFertilizerUsedAmount &&
                          values.potassiumFertilizerUsedAmount.value === 0) ||
                        !isExpert
                      }
                      isLoading={getFertilizerCost.isLoading}
                      placeHolder="انتخاب کنید..."
                      significant
                    />

                    <BasicSelectOption
                      lableText=" استفاده کود گوگرد"
                      name="sulfurFertilizerUsedAmountGroupEnum"
                      data={seedUsedAmountGroupEnum}
                      isLoading={getSeedEnum.isLoading}
                      placeHolder="انتخاب کنید..."
                      isDisabled={!isExpert}
                      significant
                      onChange={(opt) =>
                        onSulfutFertilizerChange(opt, setFieldValue)
                      }
                    />
                    <BasicSelectOption
                      lableText="میزان مصرف کود گوگرد"
                      name="sulfurFertilizerUsedAmount"
                      data={sulfurFertilizerUsedAmount}
                      isDisabled={
                        (values.sulfurFertilizerUsedAmount &&
                          values.sulfurFertilizerUsedAmount.value === 0) ||
                        !isExpert
                      }
                      placeHolder="انتخاب کنید..."
                      significant
                    />
                    <BasicSelectOption
                      lableText="تعداد مراحل  مورد استفاده پتاسیم"
                      name="numberOfStepsUsedSulfurEnum"
                      data={NumberOfStepsUsedEnum}
                      isDisabled={
                        (values.sulfurFertilizerUsedAmount &&
                          values.sulfurFertilizerUsedAmount.value === 0) ||
                        !isExpert
                      }
                      placeHolder="انتخاب کنید..."
                      significant
                    />
                    <MultiSelectOption
                      labelText="مراکز خرید کود گوگرد"
                      name="sulfurFertilizerShoppingCenterEnumJson"
                      options={FertilizerShoppingCenterEnum}
                      isDisabled={
                        (values.sulfurFertilizerUsedAmount &&
                          values.sulfurFertilizerUsedAmount.value === 0) ||
                        !isExpert
                      }
                      significant
                      placeHolder="انتخاب کنید..."
                      hasLabel
                    />
                    <BasicSelectOption
                      lableText="هزینه مصرف کود گوگرد"
                      name="sulfurFertilizerCostOfConsomptionId"
                      isDisabled={
                        (values.sulfurFertilizerUsedAmount &&
                          values.sulfurFertilizerUsedAmount.value === 0) ||
                        !isExpert
                      }
                      data={fertilizerCost}
                      isLoading={getFertilizerCost.isLoading}
                      placeHolder="انتخاب کنید..."
                      significant
                    />

                    <BasicSelectOption
                      lableText=" استفاده کود زیستی"
                      name="bioFertilizerUsedAmountGroupEnum"
                      data={seedUsedAmountGroupEnum}
                      isLoading={getSeedEnum.isLoading}
                      isDisabled={!isExpert}
                      placeHolder="انتخاب کنید..."
                      significant
                      onChange={(opt) =>
                        onBioFertilizerChange(opt, setFieldValue)
                      }
                    />
                    <BasicSelectOption
                      lableText="میزان مصرف کود زیستی"
                      name="bioFertilizerUsedAmount"
                      isDisabled={
                        (values.bioFertilizerUsedAmount &&
                          values.bioFertilizerUsedAmount.value === 0) ||
                        !isExpert
                      }
                      data={bioFertilizerUsedAmount}
                      isLoading={getBioUsedAmount.isLoading}
                      placeHolder="انتخاب کنید..."
                      significant
                    />
                    <BasicSelectOption
                      lableText="تعداد مراحل  مورد استفاده کود زیستی"
                      name="numberOfStepsUsedBioEnum"
                      isDisabled={
                        (values.bioFertilizerUsedAmount &&
                          values.bioFertilizerUsedAmount.value === 0) ||
                        !isExpert
                      }
                      data={NumberOfStepsUsedEnum}
                      placeHolder="انتخاب کنید..."
                      significant
                    />
                    <MultiSelectOption
                      labelText="مراکز خرید کود زیستی"
                      name="bioFertilizerShoppingCenterEnumJson"
                      isDisabled={
                        (values.bioFertilizerUsedAmount &&
                          values.bioFertilizerUsedAmount.value === 0) ||
                        !isExpert
                      }
                      options={FertilizerShoppingCenterEnum}
                      significant
                      placeHolder="انتخاب کنید..."
                      hasLabel
                    />
                    <BasicSelectOption
                      lableText="هزینه مصرف کود زیستی"
                      name="bioFertilizerCostOfConsomptionId"
                      isDisabled={
                        (values.bioFertilizerUsedAmount &&
                          values.bioFertilizerUsedAmount.value === 0) ||
                        !isExpert
                      }
                      data={fertilizerCost}
                      isLoading={getFertilizerCost.isLoading}
                      placeHolder="انتخاب کنید..."
                      significant
                    />

                    <BasicSelectOption
                      lableText=" استفاده کود حیوانی"
                      name="animalFertilizerUsedAmountGroupEnum"
                      data={seedUsedAmountGroupEnum}
                      isLoading={getSeedEnum.isLoading}
                      placeHolder="انتخاب کنید..."
                      significant
                      isDisabled={!isExpert}
                      onChange={(opt) =>
                        onAnimalFertilizerChange(opt, setFieldValue)
                      }
                    />
                    <BasicSelectOption
                      lableText="میزان مصرف کود حیوانی"
                      name="animalFertilizerUsedAmount"
                      isDisabled={
                        (values.animalFertilizerUsedAmount &&
                          values.animalFertilizerUsedAmount.value === 0) ||
                        !isExpert
                      }
                      data={animalFertilizerUsedAmount}
                      isLoading={getAnimalUsedAmount.isLoading}
                      placeHolder="انتخاب کنید..."
                      significant
                    />
                    <BasicSelectOption
                      lableText="تعداد مراحل  مورد استفاده کود حیوانی"
                      name="numberOfStepsUsedAnimalEnum"
                      data={NumberOfStepsUsedEnum}
                      isDisabled={
                        (values.animalFertilizerUsedAmount &&
                          values.animalFertilizerUsedAmount.value === 0) ||
                        !isExpert
                      }
                      placeHolder="انتخاب کنید..."
                      significant
                    />
                    <MultiSelectOption
                      labelText="مراکز خرید کود حیوانی"
                      name="animalFertilizerShoppingCenterEnumJson"
                      isDisabled={
                        (values.animalFertilizerUsedAmount &&
                          values.animalFertilizerUsedAmount.value === 0) ||
                        !isExpert
                      }
                      options={FertilizerShoppingCenterEnum}
                      significant
                      placeHolder="انتخاب کنید..."
                      hasLabel
                    />
                    <BasicSelectOption
                      lableText="هزینه مصرف کود حیوانی"
                      isDisabled={
                        (values.animalFertilizerUsedAmount &&
                          values.animalFertilizerUsedAmount.value === 0) ||
                        !isExpert
                      }
                      name="animalFertilizerCostOfConsomptionId"
                      data={fertilizerCost}
                      isLoading={getFertilizerCost.isLoading}
                      placeHolder="انتخاب کنید..."
                      significant
                    />

                    <BasicSelectOption
                      lableText=" استفاده کود مایع"
                      name="liquidFertilizerUsedAmountGroupEnum"
                      data={liquidUsedAmountGroupEnum}
                      isLoading={getSeedEnum.isLoading}
                      isDisabled={!isExpert}
                      placeHolder="انتخاب کنید..."
                      significant
                      onChange={(opt) =>
                        onLiquidFertilizerChange(opt, setFieldValue)
                      }
                    />
                    <BasicSelectOption
                      lableText="میزان مصرف کود مایع"
                      name="liquidFertilizerUsedAmount"
                      data={liquidFertilizerUsedAmount}
                      isDisabled={
                        (values.liquidFertilizerUsedAmount &&
                          values.liquidFertilizerUsedAmount.value === 0) ||
                        !isExpert
                      }
                      isLoading={getLiquidUsedAmount.isLoading}
                      placeHolder="انتخاب کنید..."
                      significant
                    />
                    <BasicSelectOption
                      lableText="تعداد مراحل  مورد استفاده کود مایع"
                      name="numberOfStepsUsedLiquidEnum"
                      isDisabled={
                        (values.liquidFertilizerUsedAmount &&
                          values.liquidFertilizerUsedAmount.value === 0) ||
                        !isExpert
                      }
                      data={NumberOfStepsUsedEnum}
                      placeHolder="انتخاب کنید..."
                      significant
                    />
                    <MultiSelectOption
                      labelText="مراکز خرید کود مایع"
                      name="liquidFertilizerShoppingCenterEnumJson"
                      options={FertilizerShoppingCenterEnum}
                      isDisabled={
                        (values.liquidFertilizerUsedAmount &&
                          values.liquidFertilizerUsedAmount.value === 0) ||
                        !isExpert
                      }
                      significant
                      placeHolder="انتخاب کنید..."
                      hasLabel
                    />
                    <BasicSelectOption
                      lableText="هزینه مصرف کود مایع"
                      name="liquidFertilizerCostOfConsomptionId"
                      data={fertilizerCost}
                      isDisabled={
                        (values.liquidFertilizerUsedAmount &&
                          values.liquidFertilizerUsedAmount.value === 0) ||
                        !isExpert
                      }
                      isLoading={getFertilizerCost.isLoading}
                      placeHolder="انتخاب کنید..."
                      significant
                    />

                    <BasicSelectOption
                      lableText="نحوه استفاده از کود گرانول"
                      name="howToUseGranularFertilizerEnum"
                      isDisabled={!isExpert}
                      data={HowToUseGranularFertilizerEnum}
                      placeHolder="انتخاب کنید..."
                      significant
                    />
                    <BasicSelectOption
                      lableText="نحوه استفاده از کود زيستي"
                      name="howToUseBioFertilizerEnum"
                      data={HowToUseBioFertilizerEnum}
                      isDisabled={
                        (values.howToUseBioFertilizerEnum &&
                          values.howToUseBioFertilizerEnum.value === 0) ||
                        !isExpert
                      }
                      placeHolder="انتخاب کنید..."
                      significant
                    />
                    <BasicSelectOption
                      lableText="نحوه استفاده از کود حيواني"
                      name="howToUseAnimalFertilizerEnum"
                      isDisabled={
                        (values.howToUseAnimalFertilizerEnum &&
                          values.howToUseAnimalFertilizerEnum.value === 0) ||
                        !isExpert
                      }
                      data={HowToUseAnimalFertilizerEnum}
                      placeHolder="انتخاب کنید..."
                      significant
                    />

                    {isExpert && (
                      <SubmitButton
                        isLoading={setFerilizer.isLoading}
                        btnText="ثبت"
                        values={values}
                        schema={FertilizerConsumptionValidation}
                      />
                    )}
                  </Form>
                </Col>
                <Col sm="6">
                  {values.nitrateFertilizerUsedAmount &&
                  values.nitrateFertilizerUsedAmount.value === 0 ? (
                    <></>
                  ) : (
                    <FertilizerNamesJson
                      fertilizerNamesJson={nitrateFertilizerNamesJson}
                      setFertilizerNamesJson={setNitrateFertilizerNamesJson}
                      isExpert={isExpert}
                      nameOfFertilizerEnum={NameOfNitrateFertilizerEnum}
                      amounValidate={
                        values.nitrateFertilizerUsedAmount
                          ? values.nitrateFertilizerUsedAmount.value
                          : 0
                      }
                      FertilizerEnumGroup={nitrateFertilizerUsedAmount}
                      textHeader=" کود نیترات"
                    />
                  )}
                  {values.phosphateFertilizerUsedAmount &&
                  values.phosphateFertilizerUsedAmount.value === 0 ? (
                    <></>
                  ) : (
                    <FertilizerNamesJson
                      fertilizerNamesJson={phosphateFertilizerNamesJson}
                      isExpert={isExpert}
                      setFertilizerNamesJson={setPhosphateFertilizerNamesJson}
                      nameOfFertilizerEnum={NameOfPhosphateFertilizerEnum}
                      textHeader=" کودهای فسفاته"
                      amounValidate={
                        values.phosphateFertilizerUsedAmount
                          ? values.phosphateFertilizerUsedAmount.value
                          : 0
                      }
                      FertilizerEnumGroup={phosphateFertilizerUsedAmount}
                    />
                  )}

                  {values.potassiumFertilizerUsedAmount &&
                  values.potassiumFertilizerUsedAmount.value === 0 ? (
                    <></>
                  ) : (
                    <FertilizerNamesJson
                      isExpert={isExpert}
                      fertilizerNamesJson={potassiumFertilizerNamesJson}
                      setFertilizerNamesJson={setPotassiumFertilizerNamesJson}
                      nameOfFertilizerEnum={NameOfPotassiumFertilizerEnum}
                      textHeader=" کودهای پتاسیمی"
                      amounValidate={
                        values.potassiumFertilizerUsedAmount
                          ? values.potassiumFertilizerUsedAmount.value
                          : 0
                      }
                      FertilizerEnumGroup={potasiumFertilizerUsedAmount}
                    />
                  )}

                  {values.sulfurFertilizerUsedAmount &&
                  values.sulfurFertilizerUsedAmount.value === 0 ? (
                    <></>
                  ) : (
                    <FertilizerNamesJson
                      fertilizerNamesJson={sulfurFertilizerNamesJson}
                      isExpert={isExpert}
                      setFertilizerNamesJson={setSulfurFertilizerNamesJson}
                      nameOfFertilizerEnum={NameOfSulfurFertilizerEnum}
                      textHeader=" کودهای گوگردی"
                      amounValidate={
                        values.sulfurFertilizerUsedAmount
                          ? values.sulfurFertilizerUsedAmount.value
                          : 0
                      }
                      FertilizerEnumGroup={sulfurFertilizerUsedAmount}
                    />
                  )}

                  {values.bioFertilizerUsedAmount &&
                  values.bioFertilizerUsedAmount.value === 0 ? (
                    <></>
                  ) : (
                    <FertilizerNamesJson
                      fertilizerNamesJson={bioFertilizerNamesJson}
                      setFertilizerNamesJson={setBioFertilizerNamesJson}
                      isExpert={isExpert}
                      nameOfFertilizerEnum={NameOfBioFertilizerEnum}
                      textHeader=" کودهای زیستی"
                      amounValidate={
                        values.animalFertilizerUsedAmount
                          ? values.animalFertilizerUsedAmount.value
                          : 0
                      }
                      FertilizerEnumGroup={bioFertilizerUsedAmount}
                    />
                  )}

                  {values.animalFertilizerUsedAmount &&
                  values.animalFertilizerUsedAmount.value === 0 ? (
                    <></>
                  ) : (
                    <FertilizerNamesJson
                      fertilizerNamesJson={animalFertilizerNamesJson}
                      isExpert={isExpert}
                      setFertilizerNamesJson={setAnimalFertilizerNamesJson}
                      nameOfFertilizerEnum={NameOfAnimalFertilizerEnum}
                      textHeader=" کودهای حیوانی"
                      amounValidate={
                        values.animalFertilizerUsedAmount
                          ? values.animalFertilizerUsedAmount.value
                          : 0
                      }
                      FertilizerEnumGroup={animalFertilizerUsedAmount}
                    />
                  )}

                  {values.liquidFertilizerUsedAmount &&
                  values.liquidFertilizerUsedAmount.value === 0 ? (
                    <></>
                  ) : (
                    <FertilizerNamesJson
                      fertilizerNamesJson={liquidFertilizerNamesJson}
                      setFertilizerNamesJson={setLiquidFertilizerNamesJson}
                      isExpert={isExpert}
                      nameOfFertilizerEnum={NameOfLiquidFertilizerEnum}
                      textHeader=" کودهای مایع"
                      amounValidate={
                        values.liquidFertilizerUsedAmount
                          ? values.liquidFertilizerUsedAmount.value
                          : 0
                      }
                      FertilizerEnumGroup={liquidFertilizerUsedAmount}
                    />
                  )}
                </Col>
              </Row>
            );
          }}
        </Formik>
      </CardBody>
    </FormDivider>
  );
};

export { FertilizerConsumption };
