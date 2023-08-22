import React, { useEffect, useState } from "react";
import {
  useGetAllEnginePower,
  useGetAllEngineType,
  useGetAllWaterWellWall,
  useGetEnginePowerEngineTypeByEngineTypeId,
} from "../../../../../../../../../core/services/api";
import BasicSelectOption from "../../../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";

interface IPropsTypes {
  disabled: boolean;
  setFieldValue: any;
}

const WaterWellInputs: React.FC<IPropsTypes> = ({
  disabled,
  setFieldValue,
}) => {
  const [waterWellWallIdData, setWaterWellWallIdData] = useState<any>([]);
  const [enginePowerEngineTypeIdData, setEnginePowerEngineTypeIdData] =
    useState<any>([]);
  const [engineTypeData, setEngineTypeData] = useState<any>([]);

  const {
    data: waterWellWallData,
    isFetching: waterWellWallIsFetching,
    isSuccess: waterWellWallIsSuccess,
  } = useGetAllWaterWellWall();
  const {
    data: engineTypeApiData,
    isFetching: engineTypeIsFetching,
    isSuccess: engineTypeIsSuccess,
  } = useGetAllEngineType();
  const getEnginePowerEngineTypeMutation =
    useGetEnginePowerEngineTypeByEngineTypeId();

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

  const depthOfWellData = [
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

  const [wellLocationEnumData, setWellLocationEnum] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [
        { value: 2, label: "خارج از قطعه" },
        { value: 1, label: "داخل قطعه" },
      ],
    },
  ]);
  
  useEffect(() => {
    if (waterWellWallData && waterWellWallData.data) {
      const result = waterWellWallData.data.result;
      let newOptions: any = [];
      result.forEach((row: any) => {
        newOptions.push({ value: row.id, label: row.name });
      });
      setWaterWellWallIdData(newOptions);
    }
  }, [waterWellWallIsSuccess]);

  useEffect(() => {
    if (engineTypeApiData && engineTypeApiData.data) {
      const result = engineTypeApiData.data.result;
      let newOptions: any = [];
      result.forEach((row: any) => {
        newOptions.push({ value: row.id, label: row.name });
      });
      setEngineTypeData(newOptions);
    }
  }, [engineTypeIsSuccess]);

  const engineTypeOnChange = (opt: any, e: any, setFieldValue: any) => {
    setEnginePowerEngineTypeIdData([]);
    setFieldValue("engineType", {
      value: opt.value,
      label: opt.label,
    });
    setFieldValue("enginePowerEngineTypeId", null);
    if (opt.value !== 0) {
      getEnginePowerEngineTypeMutation.mutate(opt.value, {
        onSuccess: (val: any) => {
          const result = val.data.result;
          let newOptions: any = [];
          result.forEach((row: any) => {
            newOptions.push({ value: row.id, label: row.enginePowerTitle });
          });
          setEnginePowerEngineTypeIdData(newOptions);
        },
      });
    }
  };

  return (
    <>
      <BasicSelectOption
        lableText="موقعیت چاه"
        name="wellLocationEnum"
        data={wellLocationEnumData}
        isLoading={false}
        significant
        isDisabled={disabled}
        placeHolder="انتخاب کنید ..."
      />
      <BasicSelectOption
        lableText="نوع جداره "
        name="waterWellWallId"
        data={waterWellWallIdData}
        isLoading={waterWellWallIsFetching}
        significant
        isDisabled={disabled}
        placeHolder="انتخاب کنید ..."
      />
      {/* <BasicSelectOption
        lableText="نوع پمپاژ"
        name="PumpingTypeId"
        data={[]}
        significant
        placeHolder="انتخاب کنید ..."
      /> */}
      <BasicSelectOption
        lableText="نوع موتور"
        name="engineType"
        data={engineTypeData}
        isLoading={engineTypeIsFetching}
        significant
        isDisabled={disabled}
        placeHolder="انتخاب کنید ..."
        onChange={(opt: any, e: any) =>
          engineTypeOnChange(opt, e, setFieldValue)
        }
      />
      <BasicSelectOption
        lableText="قدرت موتور"
        name="enginePowerEngineTypeId"
        data={enginePowerEngineTypeIdData}
        isLoading={getEnginePowerEngineTypeMutation.isLoading}
        significant
        placeHolder="انتخاب کنید ..."
      />
      <BasicSelectOption
        lableText="عمق چاه  "
        name="depthOfWell"
        data={depthOfWellData}
        significant
        isDisabled={disabled}
        placeHolder="انتخاب کنید ..."
      />
      <BasicSelectOption
        lableText="عمق نصب پمپ "
        name="depthOfPumpInstallation"
        data={depthOfPumpInstallationData}
        isDisabled={disabled}
        significant
        placeHolder="انتخاب کنید ..."
      />
    </>
  );
};

export { WaterWellInputs };
