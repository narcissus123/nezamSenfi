import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CardBody, Col, Row } from "reactstrap";
import { NumberOfStepsUsedEnum } from "../../../../../../../../../core/data/fertilizer-consumption.data";
import {
  HowToUesPosionEnum,
  NameOfBioPoisonEnum,
  NameOfBugPoisonEnum,
  NameOfFungicidalPoisonEnum,
  NameOfHerbicidePoisonEnum,
  PoisonShoppingCenterEnum,
} from "../../../../../../../../../core/data/poisons-consumption.data";
import { ToastTypes } from "../../../../../../../../../core/enums";
import {
  FullOptionSel,
  OptionRow,
  OptionRowSel,
} from "../../../../../../../../../core/models";
import {
  useGetAllConsumptionForDropDown2,
  useGetConsumptionCostForDropDownById,
  useGetPoisonUsedAmount,
  useGetSelcetOptionOfEnum,
  useSetPoisonsConsumption,
} from "../../../../../../../../../core/services/api";
import { checkConsumptionExistsInData, fullOption, showToast } from "../../../../../../../../../core/utils";
import { createConsumptionValueLabel } from "../../../../../../../../../core/utils/create-consumption-value-label.utils";
import { getCost } from "../../../../../../../../../core/utils/get-cost.utils";
import { PoisonsConsumptionValidation } from "../../../../../../../../../core/validations/inpection-poisons.validation";
import {
  FormDivider,
  MultiSelectOption,
  SubmitButton,
} from "../../../../../../../../common/Form";
import BasicSelectOption from "../../../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";

interface IPropTypes {
  parentData: any;
  id: number | undefined;
  useGetMutation: any;
  isExpert: boolean;
}

const PoisonsConsumption: React.FC<IPropTypes> = ({
  parentData,
  id,
  useGetMutation,
  isExpert,
}) => {
  const [initialValues, setInitialValues] = useState<any>({
    fungicidalPoisonAmountGroupEnum: null,
    fungicidalPoisonAmount: null,
    numberOfStepsUsedFungicidalEnum: null,
    fungicidalPoisonNamesVm: null,
    fungicidalPoisonShoppingCenterEnumVm: null,
    herbicidePoisonAmountGroupEnum: null,
    herbicidePoisonAmount: null,
    numberOfStepsUsedHerbicideEnum: null,
    herbicidePoisonNamesVm: null,
    herbicidePoisonShoppingCenterEnumVm: null,
    bugPoisonAmountGroupEnum: null,
    bugPoisonAmount: null,
    numberOfStepsUsedBugEnum: null,
    bugPoisonNamesVm: null,
    bugPoisonShoppingCenterEnumVm: null,
    bioPoisonAmountGroupEnum: null,
    bioPoisonAmount: null,
    numberOfStepsUsedBioEnum: null,
    bioPoisonNamesVm: null,
    bioPoisonShoppingCenterEnumVm: null,
    howToUesPosionEnum: null,
    poisonCostOfConsomptionId: null,
  });

  const [fungicidalUsedAmount, setFungicidalUsedAmount] = useState<
    FullOptionSel[]
  >([]);
  const [herbicidePoisonAmount, setHerbicidePoisonAmount] = useState<
    FullOptionSel[]
  >([]);
  const [bugPoisonAmount, setBugPoisonAmount] = useState<FullOptionSel[]>([]);
  const [bioPoisonAmount, setBioPoisonAmount] = useState<FullOptionSel[]>([]);
  const [PoisonAmountGroupEnum, setPoisonAmountGroupEnum] = useState<
    FullOptionSel[]
  >([]);
  const [poisonsCost, setPoisonsCost] = useState<FullOptionSel[]>([]);

  // const [poisonUsedAmountGroupEnum, setPoisonUsedAmountGroupEnum] = useState<
  //   FullOptionSel[]
  // >([]);

  const getFungicidalPoisonUsedAmount = useGetPoisonUsedAmount();
  const getHerbicidePoisonUsedAmount = useGetPoisonUsedAmount();
  const getBugPoisonUsedAmount = useGetPoisonUsedAmount();
  const getBioPoisonUsedAmount = useGetPoisonUsedAmount();
  const getEnum = useGetSelcetOptionOfEnum();


  const setPoisons = useSetPoisonsConsumption();
  const getPoisonDetail = useGetMutation();

  const getPoisonsCost = useGetAllConsumptionForDropDown2();
  useEffect(()=>{
    getPoisonsCost.mutate(5)
  },[])

  const getPoisonCostOfConsomptionIdMutation = useGetConsumptionCostForDropDownById();

  useEffect(() => {
    if (id && id !== 0) {
      getPoisonDetail.mutate(id, {
        onSuccess: (val: any) => {
          const result = val.data.result;
          if (poisonsCost && poisonsCost[0].options && poisonsCost[0].options.length > 0) {
            if (
              !checkConsumptionExistsInData(result.poisonCostOfConsomptionId, poisonsCost)
            ) {
              getPoisonCostOfConsomptionIdMutation.mutate(
                result.poisonCostOfConsomptionId,
                {
                  onSuccess: (val: any) => {
                    let data = val.data.result;
                    setInitialValues((old: any) => ({
                      ...old,
                      poisonCostOfConsomptionId: createConsumptionValueLabel(data) ,
                    }));
                  },
                }
              );
            }

          }
 
          setInitialValues({
            fungicidalPoisonAmountGroupEnum: null,
            fungicidalPoisonAmount: {
              value: result.fungicidalPoisonAmount,
              label: result.fungicidalPoisonAmount + " لیتر",
            },
            numberOfStepsUsedFungicidalEnum: {
              value: result.numberOfStepsUsedFungicidalEnum,
              label: result.numberOfStepsUsedFungicidalEnumTitle,
            },
            fungicidalPoisonNamesVm: result.fungicidalPoisonNamesVm
              ? result.fungicidalPoisonNamesVm.map((item: number) =>
                  fullOption(item, NameOfFungicidalPoisonEnum)
                )
              : null,
            fungicidalPoisonShoppingCenterEnumVm:
              result.fungicidalPoisonShoppingCenterEnumVm
                ? result.fungicidalPoisonShoppingCenterEnumVm.map(
                    (item: number) => fullOption(item, PoisonShoppingCenterEnum)
                  )
                : null,
            herbicidePoisonAmountGroupEnum: null,
            herbicidePoisonAmount: {
              value: result.herbicidePoisonAmount,
              label: result.herbicidePoisonAmount + " لیتر",
            },
            numberOfStepsUsedHerbicideEnum: {
              value: result.numberOfStepsUsedHerbicideEnum,
              label: result.numberOfStepsUsedHerbicideEnumTitle,
            },
            herbicidePoisonNamesVm: result.herbicidePoisonNamesVm
              ? result.herbicidePoisonNamesVm.map((item: number) =>
                  fullOption(item, NameOfHerbicidePoisonEnum)
                )
              : null,
            herbicidePoisonShoppingCenterEnumVm:
              result.herbicidePoisonShoppingCenterEnumVm
                ? result.herbicidePoisonShoppingCenterEnumVm.map(
                    (item: number) => fullOption(item, PoisonShoppingCenterEnum)
                  )
                : null,
            bugPoisonAmountGroupEnum: null,
            bugPoisonAmount: {
              value: result.bugPoisonAmount,
              label: result.bugPoisonAmount + " لیتر",
            },
            numberOfStepsUsedBugEnum: {
              value: result.numberOfStepsUsedBugEnum,
              label: result.numberOfStepsUsedBugEnumTitle,
            },
            bugPoisonNamesVm: result.bugPoisonNamesVm
              ? result.bugPoisonNamesVm.map((item: number) =>
                  fullOption(item, NameOfBugPoisonEnum)
                )
              : null,
            bugPoisonShoppingCenterEnumVm: result.bugPoisonShoppingCenterEnumVm
              ? result.bugPoisonShoppingCenterEnumVm.map((item: number) =>
                  fullOption(item, PoisonShoppingCenterEnum)
                )
              : null,
            bioPoisonAmountGroupEnum: null,
            bioPoisonAmount: {
              value: result.bioPoisonAmount,
              label: result.bioPoisonAmount + " لیتر",
            },
            numberOfStepsUsedBioEnum: {
              value: result.numberOfStepsUsedBioEnum,
              label: result.numberOfStepsUsedBioEnumTitle,
            },
            bioPoisonNamesVm: result.bioPoisonNamesVm
              ? result.bioPoisonNamesVm.map((item: number) =>
                  fullOption(item, NameOfBioPoisonEnum)
                )
              : null,
            bioPoisonShoppingCenterEnumVm: result.bioPoisonShoppingCenterEnumVm
              ? result.bioPoisonShoppingCenterEnumVm.map((item: number) =>
                  fullOption(item, PoisonShoppingCenterEnum)
                )
              : null,
            howToUesPosionEnum: {
              value: result.howToUesPosionEnum,
              label: result.howToUesPosionEnumTitle,
            },
            poisonCostOfConsomptionId: {
              value: result.poisonCostOfConsomptionId,
              label: "",
            },
          });
          // console.log(result);
        },
      });
    }
  }, [id, poisonsCost]);

  useEffect(() => {
    getEnum.mutate("PoisonUsedAmountEnum", {
      onSuccess: (val) => {
        try {
          let newEnumList: FullOptionSel[] = [
            { label: "انتخاب کنید...", options: [] },
          ];

          val.data.result.forEach((item: OptionRow) => {
            newEnumList[0].options.push({ value: +item.id, label: item.title });
          });

          setPoisonAmountGroupEnum(newEnumList);
        } catch (error) {}
      },
    });
  }, []);

  useEffect(() => {
    if (getPoisonsCost.isSuccess) {
      const result = getPoisonsCost.data?.data.result;
      let waterCost: FullOptionSel[] = [
        { label: "انتخاب کنید...", options: [] },
      ];

      result.forEach((item: any) => {
        waterCost[0].options.push({
          value: item.id,
          label: getCost(item),
        });
      });
      setPoisonsCost(waterCost);
    }
  }, [getPoisonsCost.isSuccess]);

  const onFungicidalConsumptionChange = (
    opt: OptionRowSel,
    setFieldValue: any
  ) => {
    setFieldValue("fungicidalPoisonAmountGroupEnum", opt);

    if (opt.value === 11 || opt.label.includes("فاقد مقدار مصرفی")) {
      setFieldValue("fungicidalPoisonAmount", {
        value: 0,
        label: "فاقد مقدار مصرفی",
      });
      setFieldValue("fungicidalPoisonNamesVm", [
        {
          value: 0,
          label: "فاقد مقدار مصرفی",
        },
      ]);
      setFieldValue("fungicidalPoisonShoppingCenterEnumVm", [
        {
          value: 0,
          label: "فاقد مقدار مصرفی",
        },
      ]);
      setFieldValue("numberOfStepsUsedFungicidalEnum", {
        value: 0,
        label: "فاقد مقدار مصرفی",
      });
    } else if (opt.value !== 11 || !opt.label.includes("فاقد مقدار مصرفی")) {
      setFieldValue("fungicidalPoisonAmount", null);
      setFieldValue("fungicidalPoisonNamesVm", null);
      setFieldValue("fungicidalPoisonShoppingCenterEnumVm", null);
      setFieldValue("numberOfStepsUsedFungicidalEnum", null);
      getFungicidalPoisonUsedAmount.mutate(opt.value, {
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

          setFungicidalUsedAmount(waterUsedList);
        },
      });
    }
  };
  const onHerbicideConsumptionChange = (
    opt: OptionRowSel,
    setFieldValue: any
  ) => {
    setFieldValue("herbicidePoisonAmountGroupEnum", opt);

    if (opt.value === 11 || opt.label.includes("فاقد مقدار مصرفی")) {
      setFieldValue("herbicidePoisonAmount", {
        value: 0,
        label: "فاقد مقدار مصرفی",
      });
      setFieldValue("herbicidePoisonNamesVm", [
        {
          value: 0,
          label: "فاقد مقدار مصرفی",
        },
      ]);
      setFieldValue("herbicidePoisonShoppingCenterEnumVm", [
        {
          value: 0,
          label: "فاقد مقدار مصرفی",
        },
      ]);
      setFieldValue("numberOfStepsUsedHerbicideEnum", {
        value: 0,
        label: "فاقد مقدار مصرفی",
      });
    } else if (opt.value !== 11 || !opt.label.includes("فاقد مقدار مصرفی")) {
      setFieldValue("herbicidePoisonAmount", null);
      setFieldValue("herbicidePoisonNamesVm", null);
      setFieldValue("herbicidePoisonShoppingCenterEnumVm", null);
      setFieldValue("numberOfStepsUsedHerbicideEnum", null);
      getHerbicidePoisonUsedAmount.mutate(opt.value, {
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

          setHerbicidePoisonAmount(waterUsedList);
        },
      });
    }
  };
  const onBugConsumptionChange = (opt: OptionRowSel, setFieldValue: any) => {
    setFieldValue("bugPoisonAmountGroupEnum", opt);

    if (opt.value === 11 || opt.label.includes("فاقد مقدار مصرفی")) {
      setFieldValue("bugPoisonAmount", {
        value: 0,
        label: "فاقد مقدار مصرفی",
      });
      setFieldValue("bugPoisonNamesVm", [
        {
          value: 0,
          label: "فاقد مقدار مصرفی",
        },
      ]);
      setFieldValue("bugPoisonShoppingCenterEnumVm", [
        {
          value: 0,
          label: "فاقد مقدار مصرفی",
        },
      ]);
      setFieldValue("numberOfStepsUsedBugEnum", {
        value: 0,
        label: "فاقد مقدار مصرفی",
      });
    } else if (opt.value !== 11 || !opt.label.includes("فاقد مقدار مصرفی")) {
      setFieldValue("bugPoisonAmount", null);
      setFieldValue("bugPoisonNamesVm", null);
      setFieldValue("bugPoisonShoppingCenterEnumVm", null);
      setFieldValue("numberOfStepsUsedBugEnum", null);
      getBugPoisonUsedAmount.mutate(opt.value, {
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

          setBugPoisonAmount(waterUsedList);
        },
      });
    }
  };
  const onBioPoisonConsumptionChange = (
    opt: OptionRowSel,
    setFieldValue: any
  ) => {
    setFieldValue("bioPoisonAmountGroupEnum", opt);

    if (opt.value === 11 || opt.label.includes("فاقد مقدار مصرفی")) {
      setFieldValue("bioPoisonAmount", {
        value: 0,
        label: "فاقد مقدار مصرفی",
      });
      setFieldValue("bioPoisonNamesVm", [
        {
          value: 0,
          label: "فاقد مقدار مصرفی",
        },
      ]);
      setFieldValue("bioPoisonShoppingCenterEnumVm", [
        {
          value: 0,
          label: "فاقد مقدار مصرفی",
        },
      ]);
      setFieldValue("numberOfStepsUsedBioEnum", {
        value: 0,
        label: "فاقد مقدار مصرفی",
      });
    } else if (opt.value !== 11 || !opt.label.includes("فاقد مقدار مصرفی")) {
      setFieldValue("bioPoisonAmount", null);
      setFieldValue("bioPoisonNamesVm", null);
      setFieldValue("bioPoisonShoppingCenterEnumVm", null);
      setFieldValue("numberOfStepsUsedBioEnum", null);
      getBioPoisonUsedAmount.mutate(opt.value, {
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

          setBioPoisonAmount(waterUsedList);
        },
      });
    }
  };

  const { section_id } = useParams<{ section_id: string }>();

  const onSubmit = (values: any) => {
    const setPoisonsConsumption = {
      fungicidalPoisonAmount: values.fungicidalPoisonAmount.value,
      numberOfStepsUsedFungicidalEnum:
        values.numberOfStepsUsedFungicidalEnum.value,
      fungicidalPoisonNamesVm: values.fungicidalPoisonNamesVm.map(
        (item: OptionRowSel) => item.value
      ),
      fungicidalPoisonShoppingCenterEnumVm:
        values.fungicidalPoisonShoppingCenterEnumVm.map(
          (item: OptionRowSel) => item.value
        ),
      herbicidePoisonAmount: values.herbicidePoisonAmount.value,
      numberOfStepsUsedHerbicideEnum:
        values.numberOfStepsUsedHerbicideEnum.value,
      herbicidePoisonNamesVm: values.herbicidePoisonNamesVm.map(
        (item: OptionRowSel) => item.value
      ),
      herbicidePoisonShoppingCenterEnumVm:
        values.herbicidePoisonShoppingCenterEnumVm.map(
          (item: OptionRowSel) => item.value
        ),
      bugPoisonAmount: values.bugPoisonAmount.value,
      numberOfStepsUsedBugEnum: values.numberOfStepsUsedBugEnum.value,
      bugPoisonNamesVm: values.bugPoisonNamesVm.map(
        (item: OptionRowSel) => item.value
      ),
      bugPoisonShoppingCenterEnumVm: values.bugPoisonShoppingCenterEnumVm.map(
        (item: OptionRowSel) => item.value
      ),
      bioPoisonAmount: values.bioPoisonAmount.value,
      numberOfStepsUsedBioEnum: values.numberOfStepsUsedBioEnum.value,
      bioPoisonNamesVm: values.bioPoisonNamesVm.map(
        (item: OptionRowSel) => item.value
      ),
      bioPoisonShoppingCenterEnumVm: values.bioPoisonShoppingCenterEnumVm.map(
        (item: OptionRowSel) => item.value
      ),
      howToUesPosionEnum:
        values.bioPoisonAmount &&
        values.bugPoisonAmount &&
        values.herbicidePoisonAmount &&
        values.fungicidalPoisonAmount &&
        values.bioPoisonAmount.value === 0 &&
        values.bugPoisonAmount.value === 0 &&
        values.herbicidePoisonAmount.value === 0 &&
        values.fungicidalPoisonAmount.value === 0
          ? 0
          : values.howToUesPosionEnum.value,
      poisonCostOfConsomptionId:
        values.bioPoisonAmount &&
        values.bugPoisonAmount &&
        values.herbicidePoisonAmount &&
        values.fungicidalPoisonAmount &&
        values.bioPoisonAmount.value === 0 &&
        values.bugPoisonAmount.value === 0 &&
        values.herbicidePoisonAmount.value === 0 &&
        values.fungicidalPoisonAmount.value === 0
          ? 0
          : values.poisonCostOfConsomptionId.value,
    };

    const poisonsObj = {
      productionFactorId: parentData.productionFactor.value,
      sectionId: +section_id,
      year: parentData.productionYear.value,
      activityRate: parentData.activityTime,
      setPoisonsConsumption: setPoisonsConsumption,
    };

    setPoisons.mutate(poisonsObj, {
      onSuccess: () => showToast(["با موفقیت انجام شد"], ToastTypes.success),
    });
  };

  return (
    <FormDivider textHeader="مصرف انواع سموم">
      <CardBody>
        <Formik
          initialValues={initialValues}
          onSubmit={onSubmit}
          validationSchema={PoisonsConsumptionValidation}
          enableReinitialize
        >
          {({ values, setFieldValue }) => {
            if (
              values.bioPoisonAmount &&
              values.bugPoisonAmount &&
              values.herbicidePoisonAmount &&
              values.fungicidalPoisonAmount &&
              values.bioPoisonAmount.value === 0 &&
              values.bugPoisonAmount.value === 0 &&
              values.herbicidePoisonAmount.value === 0 &&
              values.fungicidalPoisonAmount.value === 0 &&
              !values.poisonCostOfConsomptionId
            ) {
              setFieldValue("poisonCostOfConsomptionId", {
                value: 0,
                label: "فاقد سم",
              });
            }
            if (
              values.bioPoisonAmount &&
              values.bugPoisonAmount &&
              values.herbicidePoisonAmount &&
              values.fungicidalPoisonAmount &&
              values.bioPoisonAmount.value === 0 &&
              values.bugPoisonAmount.value === 0 &&
              values.herbicidePoisonAmount.value === 0 &&
              values.fungicidalPoisonAmount.value === 0 &&
              !values.howToUesPosionEnum
            ) {
              setFieldValue("howToUesPosionEnum", {
                value: 0,
                label: "فاقد سم",
              });
            }
            return (
              <Form>
                <Row>
                  <Col sm="6">
                    <BasicSelectOption
                      lableText=" استفاده قارچ کش مصرفی"
                      name="fungicidalPoisonAmountGroupEnum"
                      data={PoisonAmountGroupEnum}
                      isLoading={getEnum.isLoading}
                      placeHolder="انتخاب کنید..."
                      significant
                      isDisabled={!isExpert}
                      onChange={(opt) =>
                        onFungicidalConsumptionChange(opt, setFieldValue)
                      }
                    />
                  </Col>

                  <Col sm="6">
                    <BasicSelectOption
                      lableText="تعداد مراحل مورد استفاده قارچ کش"
                      name="numberOfStepsUsedFungicidalEnum"
                      data={NumberOfStepsUsedEnum}
                      isDisabled={
                        !isExpert ||
                        (values.fungicidalPoisonAmount
                          ? values.fungicidalPoisonAmount.value === 0
                          : false)
                      }
                      // isLoading={getNahalUsedAmount.isLoading}
                      placeHolder="انتخاب کنید..."
                      significant
                    />
                  </Col>
                  <Col sm="6">
                    <BasicSelectOption
                      lableText="میزان مصرف قارچ کش"
                      name="fungicidalPoisonAmount"
                      isDisabled={
                        !isExpert ||
                        (values.fungicidalPoisonAmount
                          ? values.fungicidalPoisonAmount.value === 0
                          : false)
                      }
                      data={fungicidalUsedAmount}
                      isLoading={getFungicidalPoisonUsedAmount.isLoading}
                      placeHolder="انتخاب کنید..."
                      significant
                    />
                  </Col>
                  <Col sm="6">
                    <MultiSelectOption
                      labelText="نامهای سم قارچ کش"
                      name="fungicidalPoisonNamesVm"
                      isDisabled={
                        !isExpert ||
                        (values.fungicidalPoisonAmount
                          ? values.fungicidalPoisonAmount.value === 0
                          : false)
                      }
                      options={NameOfFungicidalPoisonEnum}
                      significant
                      placeHolder="انتخاب کنید..."
                      hasLabel
                    />
                  </Col>

                  <Col sm="6">
                    <BasicSelectOption
                      lableText=" استفاده سم علف کش مصرفی"
                      name="herbicidePoisonAmountGroupEnum"
                      data={PoisonAmountGroupEnum}
                      isLoading={getEnum.isLoading}
                      isDisabled={!isExpert}
                      placeHolder="انتخاب کنید..."
                      significant
                      onChange={(opt) =>
                        onHerbicideConsumptionChange(opt, setFieldValue)
                      }
                    />
                  </Col>

                  <Col sm="6">
                    <MultiSelectOption
                      labelText="مرکز خرید سم قارچ کش"
                      name="fungicidalPoisonShoppingCenterEnumVm"
                      options={PoisonShoppingCenterEnum}
                      isDisabled={
                        !isExpert ||
                        (values.fungicidalPoisonAmount
                          ? values.fungicidalPoisonAmount.value === 0
                          : false)
                      }
                      significant
                      placeHolder="انتخاب کنید..."
                      hasLabel
                    />
                  </Col>

                  <Col sm="6">
                    <BasicSelectOption
                      lableText="میزان سم علف کش"
                      name="herbicidePoisonAmount"
                      isDisabled={
                        !isExpert ||
                        (values.herbicidePoisonAmount
                          ? values.herbicidePoisonAmount.value === 0
                          : false)
                      }
                      data={herbicidePoisonAmount}
                      isLoading={getHerbicidePoisonUsedAmount.isLoading}
                      placeHolder="انتخاب کنید..."
                      significant
                    />
                  </Col>
                  <Col sm="6">
                    <BasicSelectOption
                      lableText="تعداد مراحل استفاده از علف کش"
                      name="numberOfStepsUsedHerbicideEnum"
                      data={NumberOfStepsUsedEnum}
                      isDisabled={
                        !isExpert ||
                        (values.herbicidePoisonAmount
                          ? values.herbicidePoisonAmount.value === 0
                          : false)
                      }
                      placeHolder="انتخاب کنید..."
                      significant
                    />
                  </Col>
                  <Col sm="6">
                    <MultiSelectOption
                      labelText="نامهای سم علف کش"
                      name="herbicidePoisonNamesVm"
                      options={NameOfHerbicidePoisonEnum}
                      significant
                      isDisabled={
                        !isExpert ||
                        (values.herbicidePoisonAmount
                          ? values.herbicidePoisonAmount.value === 0
                          : false)
                      }
                      placeHolder="انتخاب کنید..."
                      hasLabel
                    />
                  </Col>
                  <Col sm="6">
                    <MultiSelectOption
                      labelText="مرکز خرید سم علف کش"
                      name="herbicidePoisonShoppingCenterEnumVm"
                      options={PoisonShoppingCenterEnum}
                      isDisabled={
                        !isExpert ||
                        (values.herbicidePoisonAmount
                          ? values.herbicidePoisonAmount.value === 0
                          : false)
                      }
                      significant
                      placeHolder="انتخاب کنید..."
                      hasLabel
                    />
                  </Col>

                  <Col sm="6">
                    <BasicSelectOption
                      lableText=" استفاده سم حشره کش"
                      name="bugPoisonAmountGroupEnum"
                      data={PoisonAmountGroupEnum}
                      isLoading={getEnum.isLoading}
                      isDisabled={!isExpert}
                      placeHolder="انتخاب کنید..."
                      significant
                      onChange={(opt) =>
                        onBugConsumptionChange(opt, setFieldValue)
                      }
                    />
                  </Col>

                  <Col sm="6">
                    <BasicSelectOption
                      lableText="تعداد مراحل استفاده از حشره کش"
                      name="numberOfStepsUsedBugEnum"
                      data={NumberOfStepsUsedEnum}
                      isDisabled={
                        !isExpert ||
                        (values.bugPoisonAmount
                          ? values.bugPoisonAmount.value === 0
                          : false)
                      }
                      placeHolder="انتخاب کنید..."
                      significant
                    />
                  </Col>
                  <Col sm="6">
                    <BasicSelectOption
                      lableText="میزان سم حشره کش"
                      name="bugPoisonAmount"
                      isDisabled={
                        !isExpert ||
                        (values.bugPoisonAmount
                          ? values.bugPoisonAmount.value === 0
                          : false)
                      }
                      data={bugPoisonAmount}
                      isLoading={getHerbicidePoisonUsedAmount.isLoading}
                      placeHolder="انتخاب کنید..."
                      significant
                    />
                  </Col>
                  <Col sm="6">
                    <MultiSelectOption
                      labelText="نامهای سم حشره کش"
                      name="bugPoisonNamesVm"
                      options={NameOfBugPoisonEnum}
                      isDisabled={
                        !isExpert ||
                        (values.bugPoisonAmount
                          ? values.bugPoisonAmount.value === 0
                          : false)
                      }
                      significant
                      placeHolder="انتخاب کنید..."
                      hasLabel
                    />
                  </Col>
                  <Col sm="6">
                    <BasicSelectOption
                      lableText=" استفاده سم زیستی"
                      name="bioPoisonAmountGroupEnum"
                      data={PoisonAmountGroupEnum}
                      isLoading={getEnum.isLoading}
                      placeHolder="انتخاب کنید..."
                      significant
                      isDisabled={!isExpert}
                      onChange={(opt) =>
                        onBioPoisonConsumptionChange(opt, setFieldValue)
                      }
                    />
                  </Col>
                  <Col sm="6">
                    <MultiSelectOption
                      labelText="مرکز خرید سم حشره کش"
                      name="bugPoisonShoppingCenterEnumVm"
                      options={PoisonShoppingCenterEnum}
                      isDisabled={
                        !isExpert ||
                        (values.bugPoisonAmount
                          ? values.bugPoisonAmount.value === 0
                          : false)
                      }
                      significant
                      placeHolder="انتخاب کنید..."
                      hasLabel
                    />
                  </Col>

                  <Col sm="6">
                    <BasicSelectOption
                      lableText="میزان سم زیستی"
                      name="bioPoisonAmount"
                      data={bioPoisonAmount}
                      isDisabled={
                        !isExpert ||
                        (values.bioPoisonAmount
                          ? values.bioPoisonAmount.value === 0
                          : false)
                      }
                      isLoading={getBioPoisonUsedAmount.isLoading}
                      placeHolder="انتخاب کنید..."
                      significant
                    />
                  </Col>
                  <Col sm="6">
                    <BasicSelectOption
                      lableText="تعداد مراحل استفاده از سم زیستی"
                      name="numberOfStepsUsedBioEnum"
                      isDisabled={
                        !isExpert ||
                        (values.bioPoisonAmount
                          ? values.bioPoisonAmount.value === 0
                          : false)
                      }
                      data={NumberOfStepsUsedEnum}
                      placeHolder="انتخاب کنید..."
                      significant
                    />
                  </Col>
                  <Col sm="6">
                    <MultiSelectOption
                      labelText="نامهای سم زیستی"
                      name="bioPoisonNamesVm"
                      isDisabled={
                        !isExpert ||
                        (values.bioPoisonAmount
                          ? values.bioPoisonAmount.value === 0
                          : false)
                      }
                      options={NameOfBioPoisonEnum}
                      significant
                      placeHolder="انتخاب کنید..."
                      hasLabel
                    />
                  </Col>
                  <Col sm="6">
                    <MultiSelectOption
                      labelText="مرکز خرید سم زیستی"
                      name="bioPoisonShoppingCenterEnumVm"
                      options={PoisonShoppingCenterEnum}
                      isDisabled={
                        !isExpert ||
                        (values.bioPoisonAmount
                          ? values.bioPoisonAmount.value === 0
                          : false)
                      }
                      significant
                      placeHolder="انتخاب کنید..."
                      hasLabel
                    />
                  </Col>
                  {values.bioPoisonAmount &&
                  values.bugPoisonAmount &&
                  values.herbicidePoisonAmount &&
                  values.fungicidalPoisonAmount &&
                  values.bioPoisonAmount.value === 0 &&
                  values.bugPoisonAmount.value === 0 &&
                  values.herbicidePoisonAmount.value === 0 &&
                  values.fungicidalPoisonAmount.value === 0 ? (
                    <></>
                  ) : (
                    <Col sm="6">
                      <BasicSelectOption
                        lableText="نحوه استفاده از سم"
                        name="howToUesPosionEnum"
                        data={HowToUesPosionEnum}
                        isDisabled={!isExpert}
                        placeHolder="انتخاب کنید..."
                        significant
                      />
                    </Col>
                  )}

                  {values.bioPoisonAmount &&
                  values.bugPoisonAmount &&
                  values.herbicidePoisonAmount &&
                  values.fungicidalPoisonAmount &&
                  values.bioPoisonAmount.value === 0 &&
                  values.bugPoisonAmount.value === 0 &&
                  values.herbicidePoisonAmount.value === 0 &&
                  values.fungicidalPoisonAmount.value === 0 ? (
                    <></>
                  ) : (
                    <Col sm="6">
                      <BasicSelectOption
                        lableText="هزینه مصرف سم"
                        name="poisonCostOfConsomptionId"
                        data={poisonsCost}
                        isDisabled={
                          !isExpert ||
                          (values.bioPoisonAmount &&
                          values.bugPoisonAmount &&
                          values.herbicidePoisonAmount &&
                          values.fungicidalPoisonAmount
                            ? values.bioPoisonAmount.value === 0 &&
                              values.bugPoisonAmount.value === 0 &&
                              values.herbicidePoisonAmount.value === 0 &&
                              values.fungicidalPoisonAmount.value === 0
                            : false)
                        }
                        isLoading={getPoisonsCost.isLoading}
                        placeHolder="انتخاب کنید..."
                        significant
                      />
                    </Col>
                  )}
                </Row>

                {isExpert && (
                  <SubmitButton
                    btnText="ثبت"
                    isLoading={setPoisons.isLoading}
                    values={values}
                    schema={PoisonsConsumptionValidation}
                  />
                )}
              </Form>
            );
          }}
        </Formik>
      </CardBody>
    </FormDivider>
  );
};

export { PoisonsConsumption };
