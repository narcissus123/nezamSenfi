import { ToastTypes } from "./../../enums";
import { useMutation, useQuery } from "react-query";
import { showToast } from "../../utils";
import methods from "../interceptors/http.interceptor";
import { IAxiosResult } from "../../models/axios-result.model";
import { AxiosResponse } from "axios";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

interface IUseTypes {
  id: number;
}

export interface IUnionList {
  page: number;
  pageSize: number;
  title: string;
}

export interface IUnionObj {
  title: string;
  useTypes: IUseTypes[];
}

const getAllUseTypes = async (): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(`${MainUrl}​/api/Union/GetAllUseTypes`);
};

const getOwnedUserUnion = async (): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(`${MainUrl}​/api/Union/GetOwnedUserUnion`);
};

const getUnionById = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(`${MainUrl}​/api/Union/GetUnionById?unionId=${id}`);
};

const ConfirmUnionById = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}​/api/Union/ConfirmUnionById?countyUnionId=${id}`
  );
};

const CreateUnion = async (
  obj: IUnionObj
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}​/api/Union/CreateUnion`, obj);
};
const GetJobsByUseTypes = async (obj: {
  useTypeIds: number[];
}): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}​/api/Union/GetJobsByUseTypes`, obj);
};
const GetConsomptionTabsByExpert = async (
  consomptionObj: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}​/api/LicenseRequestGet/GetConsomptionTabsByExpert`,
    consomptionObj
  );
};
const GetConsomptionTabsByIssuingResponsible = async (
  consomptionObj: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}​/api/LicenseRequestGet/GetConsomptionTabsByIssuingResponsible`,
    consomptionObj
  );
};
const GetConsomptionTabsByJahadCenterManager = async (
  consomptionObj: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}​/api/LicenseRequestGet/GetConsomptionTabsByJahadCenterManager`,
    consomptionObj
  );
};
const getAllUnionsByFilter = async (
  obj: IUnionList
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}​/api/Union/GetAllUnionsByFilter`, obj);
};

const getAllUnions = async (): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(`${MainUrl}/api/Union/GetAllUnions`);
};

const UpdateUnion = async (obj: any): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.put(`${MainUrl}​/api/Union/EditUnion`, obj);
};

const GetAllUnionsNotConfirmByFilter = async (
  obj: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}​/api/Union/GetAllUnionsNotConfirmByFilter`,
    obj
  );
};

export const useGetAllUnionsNotConfirmByFilter = () => {
  return useMutation(GetAllUnionsNotConfirmByFilter, {});
};

export const useConfirmUnionById = () => {
  return useMutation(ConfirmUnionById, {});
};

export const useGetUnionById = () => {
  return useMutation(getUnionById, {});
};

export const useAllUseTypes = () => {
  return useQuery("getAllUseTypes", getAllUseTypes, {
    refetchOnWindowFocus: false,
  });
};

export const useOwnedUserUnion = () => {
  return useQuery("useOwnedUserUnion", getOwnedUserUnion, {
    refetchOnWindowFocus: false,
  });
};

export const useGetAllUnions = () => {
  return useMutation((obj: IUnionList) => getAllUnionsByFilter(obj), {});
};

export const useGetAllUnionsWithOutFilter = () => {
  return useQuery("getAllUnions", getAllUnions, {
    refetchOnWindowFocus: false,
  });
};

export const useUpdateUnion = () => {
  return useMutation(UpdateUnion, {});
};
export const useGetJobsByUseTypes = () => {
  return useMutation(GetJobsByUseTypes, {});
};

export const useGetConsomptionTabsByExpert = () => {
  return useMutation(GetConsomptionTabsByExpert, {});
};

export const useGetConsomptionTabsByIssuingResponsible = () => {
  return useMutation(GetConsomptionTabsByIssuingResponsible, {});
};
export const useGetConsomptionTabsByJahadCenterManager = () => {
  return useMutation(GetConsomptionTabsByJahadCenterManager, {});
};
export const useCreateUnion = () => {
  return useMutation(CreateUnion, {
    onSuccess: (data: any) => {
      showToast(["با موفقیت ذخیره شد"], ToastTypes.success);
    },
  });
};
