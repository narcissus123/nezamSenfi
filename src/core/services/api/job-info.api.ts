import { useMutation } from "react-query";
import methods from "../interceptors/http.interceptor";
import { useQuery } from "react-query";
import { AxiosResponse } from "axios";
import { IAxiosResult } from "../../models/axios-result.model";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;
const url = MainUrl + "/api/Profile/GetUserRealJobInformation";
const urlById = MainUrl + "/api/Profile/GetUserRealJobInformationById";
const urlLegalById = MainUrl + "/api/Profile/GetUserLegalJobInformationById";
const postUrl = MainUrl + "/api/Profile/SetUserRealJobInformation";

const getJobInfoData = async (): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(url);
};

const postJobInfoData = async (data: any): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(postUrl, data);
};

const getJobInfoDataById = async (id: number): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(urlById + "?id=" + id, {
    headers: {
      "Content-Type": "application/json-patch+json",
    },
  });
};

const AddUserRealJobInformation = async (data: any): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}/api/Profile/AddUserRealJobInformation`, data);
};

const EditUserRealJobInformation = async (data: any): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}/api/Profile/EditUserRealJobInformation`, data);
};

const DeleteUserRealJobInformation = async (id: any): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(`${MainUrl}/api/Profile/DeleteUserRealJobInformation?userJobId=${id}`);
};

const GetAllUserMachinesByUserId = async (id: any): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(`${MainUrl}/api/MachineData/GetAllUserMachinesByUserId?userId=${id}`);
};

const GetAllUserAgriculturalToolsAndServiceByUserId = async (id: any): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(`${MainUrl}/api/AgriculturalToolsData/GetAllUserAgriculturalToolsAndServiceByUserId?userId=${id}`);
};


const UserLegalJobInfoById = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(urlLegalById + "?id=" + id, {
    headers: {
      "Content-Type": "application/json-patch+json",
    },
  });
};

export const useUserLegalJobById = (id: number) => {
  return useQuery("UserLegalJobInfoById", () => UserLegalJobInfoById(id), {
    refetchOnWindowFocus: false,
    retry: false,
    cacheTime: 0,
  });
};

export const useJobInfoDataById = (id: number) => {
  return useQuery("getJobInfoDataById", () => getJobInfoDataById(id), {
    refetchOnWindowFocus: false,
    cacheTime: 0,
    retry: false,
  });
};

export const useGetAllUserMachinesByUserId = (id: number) => {
  return useQuery("GetAllUserMachinesByUserId", () => GetAllUserMachinesByUserId(id), {
    refetchOnWindowFocus: false,
  });
};

export const useGetAllUserAgriculturalToolsAndServiceByUserId = (id: number) => {
  return useQuery("GetAllUserAgriculturalToolsAndServiceByUserId", () => GetAllUserAgriculturalToolsAndServiceByUserId(id), {
    refetchOnWindowFocus: false,
  });
};

export const useJobInfoData = () => {
  return useQuery("getJobInfoData", getJobInfoData, {
    onError: (error) => {},
    refetchOnWindowFocus: false,
    enabled: false,
    cacheTime: 0,
  });
};


export const usePostJobInfoData = () => {
  return useMutation(postJobInfoData, {});
};

export const useAddUserRealJobInformation = () => {
  return useMutation(AddUserRealJobInformation, {});
};
export const useEditUserRealJobInformation = () => {
  return useMutation(EditUserRealJobInformation, {});
};
export const useDeleteUserRealJobInformation = () => {
  return useMutation(DeleteUserRealJobInformation, {});
};