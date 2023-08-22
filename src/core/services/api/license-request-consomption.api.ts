import { AxiosResponse } from "axios";
import { IAxiosResult } from "../../models/axios-result.model";
import methods from "../interceptors/http.interceptor";
import { useMutation, useQuery } from "react-query";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const GetAllConsumptionForDropDown = async (
  type: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestConsomption/GetAllConsumptionForDropDown?type=${type}`
  );
};
const GetConsumptionCostForDropDownById = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestConsomption/GetConsumptionCostForDropDownById?consumptionCostId=${id}`
  );
};
const GetEnergyConsomptionByExpert = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetEnergyConsomptionByExpert?energyConsomptionId=${id}`
  );
};
const GetPoisonConsumptionByExpert = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetPoisonConsumptionByExpert?poisonConsumptionId=${id}`
  );
};
const GetFertilizerConsomptionByExpert = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetFertilizerConsomptionByExpert?fertilizerConsomptionId=${id}`
  );
};
const GetFertilizerConsomptionByIssuingResponsible = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetFertilizerConsomptionByIssuingResponsible?fertilizerConsomptionId=${id}`
  );
};
const GetFertilizerConsomptionByJahadCenterManager = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetFertilizerConsomptionByJahadCenterManager?fertilizerConsomptionId=${id}`
  );
};
const GetPoisonConsumptionByIssuingResponsible = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetPoisonConsumptionByIssuingResponsible?poisonConsumptionId=${id}`
  );
};
const GetEnergyConsomptionByIssuingResponsible = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetEnergyConsomptionByIssuingResponsible?energyConsomptionId=${id}`
  );
};
const GetPoisonConsumptionByJahadCenterManager = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetPoisonConsumptionByJahadCenterManager?poisonConsumptionId=${id}`
  );
};
const GetEnergyConsomptionByJahadCenterManager = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetEnergyConsomptionByJahadCenterManager?energyConsomptionId=${id}`
  );
};
const GetEnginOrGearBoxRepairsConsumptionByExpert = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetEnginOrGearBoxRepairsConsumptionByExpert?enginOrGearBoxRepairsId=${id}`
  );
};

const GetEnginOrGearBoxRepairsConsumptionByIssuingResponsible = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetEnginOrGearBoxRepairsConsumptionByIssuingResponsible?enginOrGearBoxRepairsId=${id}`
  );
};

const GetEnginOrGearBoxRepairsConsumptionByJahadCenterManager = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetEnginOrGearBoxRepairsConsumptionByJahadCenterManager?enginOrGearBoxRepairsId=${id}`
  );
};

const GetElectricityRepairsConsumptionByExpert = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetElectricityRepairsConsumptionByExpert?electricityRepairsConsumptionId=${id}`
  );
};
const GetElectricityRepairsConsumptionByIssuingResponsible = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetElectricityRepairsConsumptionByIssuingResponsible?electricityRepairsConsumptionId=${id}`
  );
};
const GetElectricityRepairsConsumptionByJahadCenterManager = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetElectricityRepairsConsumptionByJahadCenterManager?electricityRepairsConsumptionId=${id}`
  );
};
const GetTireConsumptionByExpert = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetTireConsumptionByExpert?tireConsumptionId=${id}`
  );
};
const GetTireConsumptionByIssuingResponsible = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetTireConsumptionByIssuingResponsible?tireConsumptionId=${id}`
  );
};
const GetTireConsumptionByJahadCenterManager = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetTireConsumptionByJahadCenterManager?tireConsumptionId=${id}`
  );
};
const GetLubricantConsumptionByExpert = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetLubricantConsumptionByExpert?lubricantConsumptionId=${id}`
  );
};
const GetLubricantConsumptionByIssuingResponsible = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetLubricantConsumptionByIssuingResponsible?lubricantConsumptionId=${id}`
  );
};
const GetLubricantConsumptionByJahadCenterManager = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetLubricantConsumptionByJahadCenterManager?lubricantConsumptionId=${id}`
  );
};

const GetBuildingRepairsConsumptionByExpert = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetBuildingRepairsConsumptionByExpert?buildingRepairsConsumptionId=${id}`
  );
};
const GetBuildingRepairsConsumptionByIssuingResponsible = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetBuildingRepairsConsumptionByIssuingResponsible?buildingRepairsConsumptionId=${id}`
  );
};
const GetBuildingRepairsConsumptionByJahadCenterManager = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetBuildingRepairsConsumptionByJahadCenterManager?buildingRepairsConsumptionId=${id}`
  );
};

const GetEquipmentRepairsConsumptionByExpert = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetEquipmentRepairsConsumptionByExpert?equipmentRepairsConsumptionId=${id}`
  );
};
const GetEquipmentRepairsConsumptionByIssuingResponsible = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetEquipmentRepairsConsumptionByIssuingResponsible?equipmentRepairsConsumptionId=${id}`
  );
};
const GetEquipmentRepairsConsumptionByJahadCenterManager = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetEquipmentRepairsConsumptionByJahadCenterManager?equipmentRepairsConsumptionId=${id}`
  );
};

const GetConversionIndustriesConsumptionByExpert = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetConversionIndustriesConsumptionByExpert?conversionIndustriesConsumptionId=${id}`
  );
};
const GetConversionIndustriesConsumptionByIssuingResponsible = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetConversionIndustriesConsumptionByIssuingResponsible?conversionIndustriesConsumptionId=${id}`
  );
};
const GetConversionIndustriesConsumptionByJahadCenterManager = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetConversionIndustriesConsumptionByJahadCenterManager?conversionIndustriesConsumptionId=${id}`
  );
};

const GetWaterUsedAmount = async (
  waterAmountGroupEnum: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetWaterUsedAmount?waterAmountGroupEnum=${waterAmountGroupEnum}`
  );
};
const GetSeedUsedAmount = async (
  oilUsedAmountEnum: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetSeedUsedAmount?seedUsedAmountGroupEnum=${oilUsedAmountEnum}`
  );
};
const GetOilUsedAmount = async (
  seedUsedAmountGroupEnum: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetOilUsedAmount?oilUsedAmountEnum=${seedUsedAmountGroupEnum}`
  );
};
const GetPoisonUsedAmount = async (
  poisonUsedAmountEnum: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetPoisonUsedAmount?poisonUsedAmountEnum=${poisonUsedAmountEnum}`
  );
};
const SetAgriculturalWaterConsumption = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestConsomption/SetAgriculturalWaterConsumption`,
    data
  );
};
const SetWaterConsumption = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestConsomption/SetWaterConsumption`,
    data
  );
};

const SetConversionIndustriesConsumption = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestConsomption/SetConversionIndustriesConsumption`,
    data
  );
};

const SetAgricultureEnergyConsumption = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestConsomption/SetAgricultureEnergyConsumption`,
    data
  );
};

const SetAnimalsEnergyConsumption = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestConsomption/SetAnimalsEnergyConsumption`,
    data
  );
};

const SetPoisonsConsumption = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestConsomption/SetPoisonsConsumption`,
    data
  );
};

const SetFertilizerConsumption = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestConsomption/SetFertilizerConsumption`,
    data
  );
};
const SetIndustryEnergyConsumption = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestConsomption/SetIndustryEnergyConsumption`,
    data
  );
};

const SetEnginRepairsConsumption = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestConsomption/SetEnginRepairsConsumption`,
    data
  );
};
const SetGearBoxRepairsConsumption = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestConsomption/SetGearBoxRepairsConsumption`,
    data
  );
};
const SetElectricityRepairsConsumption = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestConsomption/SetElectricityRepairsConsumption`,
    data
  );
};
const SetLubricantConsumption = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestConsomption/SetLubricantConsumption`,
    data
  );
};
const SetTireConsumption = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestConsomption/SetTireConsumption`,
    data
  );
};
const SetEquipmentRepairsConsumption = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestConsomption/SetEquipmentRepairsConsumption`,
    data
  );
};
const SetBuildingRepairsConsumption = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestConsomption/SetBuildingRepairsConsumption`,
    data
  );
};
export const useSetAgriculturalWaterConsumption = () => {
  return useMutation(SetAgriculturalWaterConsumption, {});
};
export const useSetWaterConsumption = () => {
  return useMutation(SetWaterConsumption, {});
};
export const useSetConversionIndustriesConsumption = () => {
  return useMutation(SetConversionIndustriesConsumption, {});
};
export const useGetWaterUsedAmount = () => {
  return useMutation(GetWaterUsedAmount, {});
};
export const useGetSeedUsedAmount = () => {
  return useMutation(GetSeedUsedAmount, {});
};
export const useGetOilUsedAmount = () => {
  return useMutation(GetOilUsedAmount, {});
};
export const useGetPoisonUsedAmount = () => {
  return useMutation(GetPoisonUsedAmount, {});
};
export const useSetAnimalsEnergyConsumption = () => {
  return useMutation(SetAnimalsEnergyConsumption, {});
};

export const useSetFertilizerConsumption = () => {
  return useMutation(SetFertilizerConsumption, {});
};

export const useSetPoisonsConsumption = () => {
  return useMutation(SetPoisonsConsumption, {});
};

export const useSetAgricultureEnergyConsumption = () => {
  return useMutation(SetAgricultureEnergyConsumption, {});
};

export const useSetIndustryEnergyConsumption = () => {
  return useMutation(SetIndustryEnergyConsumption, {});
};

// export const useGetAllConsumptionForDropDown = (type: number) => {
//   return useQuery("GetLicenseRequestRateById" + type, () =>
//     GetAllConsumptionForDropDown(type)
//   );
// };

export const useGetAllConsumptionForDropDown2 = () => {
  return useMutation(GetAllConsumptionForDropDown, {});
};

export const useGetConsumptionCostForDropDownById = () => {
  return useMutation(GetConsumptionCostForDropDownById, {});
};

export const useGetEnergyConsomptionByExpert = () => {
  return useMutation(GetEnergyConsomptionByExpert);
};

export const useGetPoisonConsumptionByExpert = () => {
  return useMutation(GetPoisonConsumptionByExpert);
};

export const useGetFertilizerConsomptionByExpert = () => {
  return useMutation(GetFertilizerConsomptionByExpert);
};

export const useGetFertilizerConsomptionByIssuingResponsible = () => {
  return useMutation(GetFertilizerConsomptionByIssuingResponsible);
};

export const useGetFertilizerConsomptionByJahadCenterManager = () => {
  return useMutation(GetFertilizerConsomptionByJahadCenterManager);
};

export const useGetPoisonConsumptionByIssuingResponsible = () => {
  return useMutation(GetPoisonConsumptionByIssuingResponsible);
};

export const useGetEnergyConsomptionByIssuingResponsible = () => {
  return useMutation(GetEnergyConsomptionByIssuingResponsible);
};

export const useGetPoisonConsumptionByJahadCenterManager = () => {
  return useMutation(GetPoisonConsumptionByJahadCenterManager);
};

export const useGetEnergyConsomptionByJahadCenterManager = () => {
  return useMutation(GetEnergyConsomptionByJahadCenterManager);
};
export const useGetEnginOrGearBoxRepairsConsumptionByExpert = () => {
  return useMutation(GetEnginOrGearBoxRepairsConsumptionByExpert);
};
export const useGetEnginOrGearBoxRepairsConsumptionByIssuingResponsible =
  () => {
    return useMutation(GetEnginOrGearBoxRepairsConsumptionByIssuingResponsible);
  };
export const useGetEnginOrGearBoxRepairsConsumptionByJahadCenterManager =
  () => {
    return useMutation(GetEnginOrGearBoxRepairsConsumptionByJahadCenterManager);
  };
export const useGetElectricityRepairsConsumptionByExpert = () => {
  return useMutation(GetElectricityRepairsConsumptionByExpert);
};
export const useGetElectricityRepairsConsumptionByIssuingResponsible = () => {
  return useMutation(GetElectricityRepairsConsumptionByIssuingResponsible);
};
export const useGetElectricityRepairsConsumptionByJahadCenterManager = () => {
  return useMutation(GetElectricityRepairsConsumptionByJahadCenterManager);
};
export const useGetTireConsumptionByExpert = () => {
  return useMutation(GetTireConsumptionByExpert);
};
export const useGetTireConsumptionByIssuingResponsible = () => {
  return useMutation(GetTireConsumptionByIssuingResponsible);
};
export const useGetTireConsumptionByJahadCenterManager = () => {
  return useMutation(GetTireConsumptionByJahadCenterManager);
};
export const useGetLubricantConsumptionByExpert = () => {
  return useMutation(GetLubricantConsumptionByExpert);
};
export const useGetLubricantConsumptionByIssuingResponsible = () => {
  return useMutation(GetLubricantConsumptionByIssuingResponsible);
};
export const useGetLubricantConsumptionByJahadCenterManager = () => {
  return useMutation(GetLubricantConsumptionByJahadCenterManager);
};

export const useGetBuildingRepairsConsumptionByExpert = () => {
  return useMutation(GetBuildingRepairsConsumptionByExpert);
};
export const useGetBuildingRepairsConsumptionByIssuingResponsible = () => {
  return useMutation(GetBuildingRepairsConsumptionByIssuingResponsible);
};
export const useGetBuildingRepairsConsumptionByJahadCenterManager = () => {
  return useMutation(GetBuildingRepairsConsumptionByJahadCenterManager);
};

export const useGetEquipmentRepairsConsumptionByExpert = () => {
  return useMutation(GetEquipmentRepairsConsumptionByExpert);
};
export const useGetEquipmentRepairsConsumptionByIssuingResponsible = () => {
  return useMutation(GetEquipmentRepairsConsumptionByIssuingResponsible);
};
export const useGetEquipmentRepairsConsumptionByJahadCenterManager = () => {
  return useMutation(GetEquipmentRepairsConsumptionByJahadCenterManager);
};

export const useGetConversionIndustriesConsumptionByExpert = () => {
  return useMutation(GetConversionIndustriesConsumptionByExpert);
};

export const useGetConversionIndustriesConsumptionByIssuingResponsible = () => {
  return useMutation(GetConversionIndustriesConsumptionByIssuingResponsible);
};

export const useGetConversionIndustriesConsumptionByJahadCenterManager = () => {
  return useMutation(GetConversionIndustriesConsumptionByJahadCenterManager);
};
export const useSetEnginRepairsConsumption = () => {
  return useMutation(SetEnginRepairsConsumption);
};
export const useSetGearBoxRepairsConsumption = () => {
  return useMutation(SetGearBoxRepairsConsumption);
};
export const useSetElectricityRepairsConsumption = () => {
  return useMutation(SetElectricityRepairsConsumption);
};
export const useSetLubricantConsumption = () => {
  return useMutation(SetLubricantConsumption);
};
export const useSetTireConsumption = () => {
  return useMutation(SetTireConsumption);
};
export const useSetBuildingRepairsConsumption = () => {
  return useMutation(SetBuildingRepairsConsumption);
};
export const useSetEquipmentRepairsConsumption = () => {
  return useMutation(SetEquipmentRepairsConsumption);
};
