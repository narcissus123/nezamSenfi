import * as Yup from "yup";

const FertilizerConsumptionValidation = Yup.object().shape({
  seedUsedAmountGroupEnum: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  seedUsedAmount: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  nahalUsedAmountGroupEnum: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  nashaUsedAmount: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  plantUsedAmountGroupEnum: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  plantUsedAmount: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  seedShoppingCenterEnum: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  nitrateFertilizerUsedAmount: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  numberOfStepsUsedNitrateEnum: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  nitrateFertilizerShoppingCenterEnumJson: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.number(),
        label: Yup.string().nullable(),
      })
    )
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  nitrateFertilizerCostOfConsomptionId: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  phosphateFertilizerUsedAmount: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  numberOfStepsUsedPhosphateEnum: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  phosphateFertilizerShoppingCenterEnumJson: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.number(),
        label: Yup.string().nullable(),
      })
    )
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  phosphateFertilizerCostOfConsomptionId: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  potassiumFertilizerUsedAmount: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  numberOfStepsUsedPotassiumEnum: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  potassiumFertilizerShoppingCenterEnumJson: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.number(),
        label: Yup.string().nullable(),
      })
    )
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  potassiumFertilizerCostOfConsomptionId: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  sulfurFertilizerUsedAmount: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  numberOfStepsUsedSulfurEnum: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  sulfurFertilizerShoppingCenterEnumJson: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.number(),
        label: Yup.string().nullable(),
      })
    )
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  sulfurFertilizerCostOfConsomptionId: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  bioFertilizerUsedAmount: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  numberOfStepsUsedBioEnum: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  bioFertilizerShoppingCenterEnumJson: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.number(),
        label: Yup.string().nullable(),
      })
    )
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  bioFertilizerCostOfConsomptionId: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  animalFertilizerUsedAmount: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  numberOfStepsUsedAnimalEnum: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  animalFertilizerShoppingCenterEnumJson: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.number(),
        label: Yup.string().nullable(),
      })
    )
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  animalFertilizerCostOfConsomptionId: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  liquidFertilizerUsedAmount: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  numberOfStepsUsedLiquidEnum: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  liquidFertilizerShoppingCenterEnumJson: Yup.array()
    .of(
      Yup.object().shape({
        value: Yup.number(),
        label: Yup.string().nullable(),
      })
    )
    .required("این فیلد باید پر شود!")
    .typeError("لطفا یکی از گزینه ها را انتخاب کنید!"),
  liquidFertilizerCostOfConsomptionId: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  howToUseGranularFertilizerEnum: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  howToUseBioFertilizerEnum: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  howToUseAnimalFertilizerEnum: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  liquidFertilizerUsedAmountGroupEnum: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  animalFertilizerUsedAmountGroupEnum: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  bioFertilizerUsedAmountGroupEnum: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  sulfurFertilizerUsedAmountGroupEnum: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  potassiumFertilizerUsedAmountGroupEnum: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  phosphateFertilizerUsedAmountGroupEnum: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
  nitrateFertilizerUsedAmountGroupEnum: Yup.object()
    .shape({
      value: Yup.number(),
      label: Yup.string().nullable(),
    })
    .required("لطفا یک گزینه را انتخاب کنید")
    .typeError("لطفا یک گزینه را انتخاب کنید"),
});

export { FertilizerConsumptionValidation };
