import { useMutation } from "react-query";
import methods from "../interceptors/http.interceptor";
import { useQuery } from "react-query";
import { AxiosResponse } from "axios";
import { IAxiosResult } from "../../models/axios-result.model";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const postSetUserUnion = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}​/api/Union/SetUserUnion`, data);
};

const postCreateCountyUnion = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}​/api/Union/CreateCountyUnion`, data);
};

const getAllNotDefineUnionInCounty = async (
  countyId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}​/api/Union/GetAllNotDefineUnionInCounty?countyId=${countyId}`
  );
};
const GetUnionUseTypeByUnionId = async (
  unionId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}​/api/Union/GetUnionUseTypeByUnionId?unionId=${unionId}`
  );
};
const GetUnionJobByUnionUseTypeId = async (
  unionUseTypeId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}​/api/Union/GetUnionJobByUnionUseTypeId?unionUseTypeId=${unionUseTypeId}`
  );
};

const GetAllUnioinByCountyGuildroomIdForDropDown = async (
  countyId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}​/api/Union/GetAllUnioinByCountyGuildroomIdForDropDown?countyId=${countyId}`
  );
};

const getUserRolesInUnion = async (obj: {
  userId: number;
  countyUnionId: number;
}): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}​/api/Union/GetUserRolesInUnion?userId=${obj.userId}&countyUnionId=${obj.countyUnionId}`
  );
};
const GetOwnedUserUnion = async (): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(`${MainUrl}​/api/Union/GetOwnedUserUnion`);
};

const GetOwnedUserUnionForAdmin = async (): Promise<
  AxiosResponse<IAxiosResult>
> => {
  return await methods.get(`${MainUrl}​/api/Union/GetOwnedUserUnionForAdmin`);
};

const GetOwnedUserUnionForSecretariat = async (): Promise<
  AxiosResponse<IAxiosResult>
> => {
  return await methods.get(
    `${MainUrl}​/api/Union/GetOwnedUserUnionForSecretariat`
  );
};
const GetOwnedUserUnionForTreasurer = async (): Promise<
  AxiosResponse<IAxiosResult>
> => {
  return await methods.get(
    `${MainUrl}​/api/Union/GetOwnedUserUnionForTreasurer`
  );
};
const getCountyUnionByCountyId = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/Union/GetCountyUnionByCountyId`,
    data
  );
};

const getCountyUnionByCountyIdForMainLocationAdmin = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/Union/GetCountyUnionByCountyIdForMainLocationAdmin`,
    data
  );
};
const SetUserToUnionAdmin = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}/api/Union/SetUserToUnionAdmin`, data);
};
const getUserUnionByUnionId = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}/api/Union/GetUserUnionByUnionId`, data);
};

export const useGetOwnedUserUnion = () => {
  return useQuery("GetOwnedUserUnion", GetOwnedUserUnion, {
    refetchOnWindowFocus: false,
  });
};
export const useGetOwnedUserUnionForAdmin = () => {
  return useQuery("GetOwnedUserUnionForAdmin", GetOwnedUserUnionForAdmin, {
    refetchOnWindowFocus: false,
  });
};
export const useGetOwnedUserUnionForSecretariat = () => {
  return useQuery(
    "GetOwnedUserUnionForSecretariat",
    GetOwnedUserUnionForSecretariat,
    {
      refetchOnWindowFocus: false,
    }
  );
};
export const useGetOwnedUserUnionForTreasurer = () => {
  return useQuery(
    "GetOwnedUserUnionForTreasurer",
    GetOwnedUserUnionForTreasurer,
    {
      refetchOnWindowFocus: false,
    }
  );
};
export const useSetUserToUnionAdmin = () => {
  return useMutation(SetUserToUnionAdmin, {});
};
export const useGetAllUnioinByCountyGuildroomIdForDropDown = () => {
  return useMutation(GetAllUnioinByCountyGuildroomIdForDropDown, {});
};
export const useGetUnionUseTypeByUnionId = () => {
  return useMutation(GetUnionUseTypeByUnionId, {});
};
export const useGetUnionJobByUnionUseTypeId = () => {
  return useMutation(GetUnionJobByUnionUseTypeId, {});
};

export const useGetAllNotDefineUnionInCounty = () => {
  return useMutation(getAllNotDefineUnionInCounty, {});
};

export const useGetCountyUnionByCountyId = () => {
  return useMutation(getCountyUnionByCountyId, {});
};

export const useGetCountyUnionByCountyIdForMainLocationAdmin = () => {
  return useMutation(getCountyUnionByCountyIdForMainLocationAdmin, {});
};

export const useGetUserUnionByUnionId = () => {
  return useMutation(getUserUnionByUnionId, {});
};

export const usePostSetUserUnion = () => {
  return useMutation(postSetUserUnion, {});
};

export const usePostCreateCountyUnion = () => {
  return useMutation(postCreateCountyUnion, {});
};

export const useGetUserRolesInUnion = () => {
  return useMutation(getUserRolesInUnion);
};
