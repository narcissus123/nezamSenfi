import { useMutation } from "react-query";
import methods from "../interceptors/http.interceptor";
import { useQuery } from "react-query";
import { AxiosResponse } from "axios";
import { IAxiosResult } from "../../models/axios-result.model";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const postSetMessageSetting = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}​/api/Setting/SetMessageSetting`, data);
};
const AddConsomptionCost = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}/api/LicenseRequestConsomption/AddConsomptionCost`, data);
};
const UpdateConsomptionCost = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}/api/LicenseRequestConsomption/UpdateConsomptionCost`, data);
};
const GetConsomptionCostByFilter = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}/api/LicenseRequestConsomption/GetConsomptionCostByFilter`, data);
};
const postSetActiveUplevelManager = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}​/api/Setting/SetActiveUplevelManager`,
    data
  );
};
const SetLicenseRequestRate = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestRate/SetLicenseRequestRate`,
    data
  );
};
const GetMessageSettingHistory = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/Setting/GetMessageSettingHistory`,
    data
  );
};
const GetActiveUplevelManagerHistory = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/Setting/GetActiveUplevelManagerHistory`,
    data
  );
};
const GetLicenSeRequestRate = async (): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestRate/GetLicenSeRequestRate`,
  );
};
const SetCountyPoligon = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}​/api/Location/SetCountyPoligon`, data);
};
const GetSelcetOptionOfEnum = async (
  enumName: string
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}​/api/Setting/GetSelcetOptionOfEnum?enumName=${enumName}`
  );
};

const GetPositionRequestContract = async (
  contractType: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}​/api/Setting/GetPositionRequestContract?contractType=${contractType}`,
    {
      responseType: "blob",
    }
  );
};
const DeleteConsumptionCost = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestConsomption/DeleteConsumptionCost?consumptionCostId=${id}`,
  );
};

const SetPositionRequestContract = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}​/api/Setting/SetPositionRequestContract`,
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};
const GetActiveUplevelManager = async (): Promise<
  AxiosResponse<IAxiosResult>
> => {
  return await methods.get(`${MainUrl}​/api/Setting/GetActiveUplevelManager`);
};
const GetCurrentYear = async (): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(`${MainUrl}​/api/Setting/GetCurrentYear`);
};
const getAllMessageSetting = async (): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(`${MainUrl}​/api/Setting/GetCurrentMessageSetting`);
};
export const usePostSetActiveUplevelManager = () => {
  return useMutation(postSetActiveUplevelManager, {});
};
export const useSetCountyPoligon = () => {
  return useMutation(SetCountyPoligon, {});
};
export const usePostSetPositionRequestContract = () => {
  return useMutation(SetPositionRequestContract, {});
};
export const usePostSetMessageSetting = () => {
  return useMutation(postSetMessageSetting, {});
};
export const useAddConsomptionCost = () => {
  return useMutation(AddConsomptionCost, {});
};
export const useUpdateConsomptionCost = () => {
  return useMutation(UpdateConsomptionCost, {});
};
export const useGetConsomptionCostByFilter = () => {
  return useMutation(GetConsomptionCostByFilter, {});
};
export const useGetSelcetOptionOfEnum = () => {
  return useMutation(GetSelcetOptionOfEnum, {});
};
export const useDeleteConsumptionCost = () => {
  return useMutation(DeleteConsumptionCost, {});
};
export const useGetMessageSettingHistory = () => {
  return useMutation(GetMessageSettingHistory, {});
};
export const useGetActiveUplevelManagerHistory = () => {
  return useMutation(GetActiveUplevelManagerHistory, {});
};
export const useGetActiveUplevelManager = () => {
  return useQuery("GetActiveUplevelManager", GetActiveUplevelManager, {
    refetchOnWindowFocus: false,
  });
};
export const useGetAllMessageSetting = () => {
  return useQuery("useGetAllMessageSetting", getAllMessageSetting, {
    refetchOnWindowFocus: false,
  });
};
export const useGetCurrentYear = () => {
  return useQuery("GetCurrentYear", GetCurrentYear);
};
export const useGetPositionRequestContract = () => {
  return useMutation(GetPositionRequestContract, {
    onSettled: async (value: any, variables, context) => {
      const result = value.data;
      let data = new Blob([result]);
      let csvURL = window.URL.createObjectURL(data);
      let tempLink = document.createElement("a");
      tempLink.href = csvURL;
      tempLink.setAttribute("download", "contract.doc");
      tempLink.click();
    },
  });
};
export const useSetLicenseRequestRate = () => {
  return useMutation(SetLicenseRequestRate, {});
};
export const useGetLicenSeRequestRate = () => {
  return useQuery("GetLicenSeRequestRate", GetLicenSeRequestRate, {
    refetchOnWindowFocus: false,
  });
};
