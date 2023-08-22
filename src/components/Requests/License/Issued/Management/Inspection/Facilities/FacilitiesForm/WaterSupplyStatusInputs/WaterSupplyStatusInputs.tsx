import React, { useEffect, useState } from "react";
import { DocumentTypeEnum } from "../../../../../../../../../core/enums/document-category-type.enum";
import {
  useGetDocumentByDocumentCategoryTypeEnum,
  useGetSelcetOptionOfEnum,
} from "../../../../../../../../../core/services/api";
import { fullOption } from "../../../../../../../../../core/utils";
import {
  FormDivider,
  MultiSelectOption,
} from "../../../../../../../../common/Form";
import BasicSelectOption from "../../../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { TwoColumn } from "../../../../../../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";

interface IPropTypes {
  // setInitialValue: (val: any) => void;
  // values: any;
  // isInEditMode: boolean;
  disabled: boolean;
  setFieldValue: any;
}

const WaterSupplyStatusInputs: React.FC<IPropTypes> = ({
  setFieldValue,
  disabled,
}) => {
  const [powerSourceData, setPowerSourceData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const [waterSourceData, setWaterSourceData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const [fuelSourceData, setFuelSourceData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const [electricityTariffData, setElectricityTariffData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const [electricPowerData, setElectricPowerData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const [waterTariffData, setWaterTariffData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const powerSupplySourceEnumMutation = useGetSelcetOptionOfEnum();
  const fuelSupplySourceEnumMutation = useGetSelcetOptionOfEnum();
  const waterSupplySourceEnumMutation = useGetSelcetOptionOfEnum();
  const electricPowerEnumMutation = useGetSelcetOptionOfEnum();
  const electricityTariffEnumMutation = useGetSelcetOptionOfEnum();
  const watherTariffEnumMutation = useGetSelcetOptionOfEnum();

  const [facilityDocumentsData, setFacilityDocumentsDataDocumentsData] =
    useState<any>([
      {
        label: " انتخاب کنید ...",
        options: [],
      },
    ]);

  const getFacilityTypeMutation = useGetDocumentByDocumentCategoryTypeEnum();

  useEffect(() => {
    getFacilityTypeMutation.mutate(DocumentTypeEnum.Facilities, {
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
        setFacilityDocumentsDataDocumentsData(newLicenseTypes);
      },
    });
  }, []);

  useEffect(() => {
    powerSupplySourceEnumMutation.mutate("PowerSupplySourceEnum", {
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
          setPowerSourceData(newList);
        }
      },
    });
  }, []);

  // useEffect(() => {
  //   if (
  //     powerSourceData &&
  //     powerSourceData[0].options.length > 0 &&
  //     values.powerSource
  //   ) {
  //     try {
  //       setInitialValue((val: any) => ({
  //         ...val,
  //         powerSource: fullOption(values.powerSource.value, powerSourceData),
  //       }));
  //     } catch (error) {}
  //   }
  // }, [powerSourceData, isInEditMode]);

  useEffect(() => {
    fuelSupplySourceEnumMutation.mutate("FuelSupplySourceEnum", {
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

          setFuelSourceData(newList);
        }
      },
    });
  }, []);
  useEffect(() => {
    waterSupplySourceEnumMutation.mutate("SourceOfWaterEnum", {
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

          setWaterSourceData(newList);
        }
      },
    });
  }, []);

  useEffect(() => {
    electricPowerEnumMutation.mutate("ElectricPowerEnum", {
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

          setElectricPowerData(newList);
        }
      },
    });
  }, []);

  useEffect(() => {
    electricityTariffEnumMutation.mutate("ElectricityTariffEnum", {
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
          setElectricityTariffData(newList);
        }
      },
    });
  }, []);

  useEffect(() => {
    watherTariffEnumMutation.mutate("WatherTariffEnum", {
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

          setWaterTariffData(newList);
        }
      },
    });
  }, []);
  return (
    <>
      <FormDivider
        classNames="my-1"
        textHeader="وضعیت تامین آب و انرژی مصرفی در ساختمان "
      >
        <TwoColumn>
          <div>
            <BasicSelectOption
              lableText="منبع تامین برق"
              name="powerSource"
              data={powerSourceData}
              significant
              placeHolder="انتخاب کنید ..."
              isDisabled={disabled}
              isLoading={powerSupplySourceEnumMutation.isLoading}
            />
            <BasicSelectOption
              lableText="منبع تامین آب"
              name="waterSource"
              data={waterSourceData}
              significant
              placeHolder="انتخاب کنید ..."
              isDisabled={disabled}
              isLoading={waterSupplySourceEnumMutation.isLoading}
            />
            <BasicSelectOption
              lableText="تعرفه برق"
              name="electricityTariff"
              data={electricityTariffData}
              significant
              placeHolder="انتخاب کنید ..."
              isDisabled={disabled}
              isLoading={electricityTariffEnumMutation.isLoading}
            />

            <MultiSelectOption
              options={facilityDocumentsData}
              name="facilityDocumentIds"
              hasLabel
              labelText="اسناد تاسیسات"
              significant={false}
              onChange={(e) => setFieldValue("facilityDocumentIds", e)}
              isLoading={getFacilityTypeMutation.isLoading}
              placeHolder="انتخاب کنید ..."
              isDisabled={disabled}
            />
          </div>
          <div>
            <BasicSelectOption
              lableText="منبع تامین سوخت"
              name="fuelSource"
              data={fuelSourceData}
              significant
              placeHolder="انتخاب کنید ..."
              isDisabled={disabled}
              isLoading={fuelSupplySourceEnumMutation.isLoading}
            />
            <BasicSelectOption
              lableText="توان برق"
              name="electricPower"
              data={electricPowerData}
              significant
              placeHolder="انتخاب کنید ..."
              isDisabled={disabled}
              isLoading={electricPowerEnumMutation.isLoading}
            />
            <BasicSelectOption
              lableText="تعرفه آب"
              name="waterTariff"
              data={waterTariffData}
              significant
              placeHolder="انتخاب کنید ..."
              isDisabled={disabled}
              isLoading={watherTariffEnumMutation.isLoading}
            />
          </div>
        </TwoColumn>
      </FormDivider>
    </>
  );
};

export { WaterSupplyStatusInputs };
