import { AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";
import { IAxiosResult } from "../../models/axios-result.model";
import methods from "../interceptors/http.interceptor";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const SetPositionRequestRateInMainLocation = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}​/api/PositionRequestRate/SetPositionRequestRateInMainLocation`,
    data
  );
};
const GetCurrentRateOfMainLocationGuildRoomPositionRequest = async (): Promise<
  AxiosResponse<any>
> => {
  return await methods.get(
    `${MainUrl}​/api/PositionRequestRate/GetCurrentRateOfMainLocationGuildRoomPositionRequest`
  );
};
const GetAllMainLocationPositionRequestRateWithFilter = async (
  data: any
): Promise<AxiosResponse<any>> => {
  return await methods.post(
    `${MainUrl}​/api/PositionRequestRate/GetAllMainLocationPositionRequestRateWithFilter`,
    data
  );
};
const GetAllProvincePositionRequestRateWithFilter = async (
  data: any
): Promise<AxiosResponse<any>> => {
  return await methods.post(
    `${MainUrl}​/api/PositionRequestRate/GetAllProvincePositionRequestRateWithFilter`,
    data
  );
};

const GetAllCountyPositionRequestRateWithFilter = async (
  data: any
): Promise<AxiosResponse<any>> => {
  return await methods.post(
    `${MainUrl}​/api/PositionRequestRate/GetAllCountyPositionRequestRateWithFilter`,
    data
  );
};







const DeletePositionRequestRateInMainLocation = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/PositionRequestRate/DeletePositionRequestRateInMainLocation?positionRequestRateId=${id}`
  );
};
const DeletePositionRequestRateInCounty = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/PositionRequestRate/DeletePositionRequestRateInCounty?positionRequestRateId=${id}`
  );
};
const DeletePositionRequestRateInProvince = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/PositionRequestRate/DeletePositionRequestRateInProvince?positionRequestRateId=${id}`
  );
};
const DeletePositionRequestRateInUnion = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/PositionRequestRate/DeletePositionRequestRateInUnion?positionRequestRateId=${id}`
  );
};









const GetAllUnionPositionRequestRateWithFilter = async (
  data: any
): Promise<AxiosResponse<any>> => {
  return await methods.post(
    `${MainUrl}​/api/PositionRequestRate/GetAllUnionPositionRequestRateWithFilter`,
    data
  );
};

const SetPositionRequestRateInProvince = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}​/api/PositionRequestRate/SetPositionRequestRateInProvince`,
    data
  );
};
const SetPositionRequestRateInCounty = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}​/api/PositionRequestRate/SetPositionRequestRateInCounty`,
    data
  );
};
const SetPositionRequestRateInUnion = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}​/api/PositionRequestRate/SetPositionRequestRateInUnion`,
    data
  );
};
const GetCurrentRateOfProvinceGuildRoomPositionRequest = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}​/api/PositionRequestRate/GetCurrentRateOfProvinceGuildRoomPositionRequest`,
    data
  );
};
const GetCurrentRateOfCountyGuildRoomPositionRequest = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}​/api/PositionRequestRate/GetCurrentRateOfCountyGuildRoomPositionRequest`,
    data
  );
};
const GetCurrentRateOfCountyUnionPositionRequest = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}​/api/PositionRequestRate/GetCurrentRateOfCountyUnionPositionRequest`,
    data
  );
};
export const useGetCurrentRateOfMainLocationGuildRoomPositionRequest = () => {
  return useQuery(
    "GetCurrentRateOfMainLocationGuildRoomPositionRequest",
    GetCurrentRateOfMainLocationGuildRoomPositionRequest
  );
};
export const useGetAllMainLocationPositionRequestRateWithFilter = () => {
  return useMutation(GetAllMainLocationPositionRequestRateWithFilter);
};
export const useGetAllProvincePositionRequestRateWithFilter = () => {
  return useMutation(GetAllProvincePositionRequestRateWithFilter);
};
export const useGetAllCountyPositionRequestRateWithFilter = () => {
  return useMutation(GetAllCountyPositionRequestRateWithFilter);
};
export const useGetAllUnionPositionRequestRateWithFilter = () => {
  return useMutation(GetAllUnionPositionRequestRateWithFilter);
};
export const useGetCurrentRateOfCountyUnionPositionRequest = () => {
  return useMutation(GetCurrentRateOfCountyUnionPositionRequest, {});
};
export const useGetCurrentRateOfCountyGuildRoomPositionRequest = () => {
  return useMutation(GetCurrentRateOfCountyGuildRoomPositionRequest, {});
};
export const useGetCurrentRateOfProvinceGuildRoomPositionRequest = () => {
  return useMutation(GetCurrentRateOfProvinceGuildRoomPositionRequest, {});
};
export const useSetPositionRequestRateInUnion = () => {
  return useMutation(SetPositionRequestRateInUnion, {});
};
export const useSetPositionRequestRateInCounty = () => {
  return useMutation(SetPositionRequestRateInCounty, {});
};
export const useSetPositionRequestRateInProvince = () => {
  return useMutation(SetPositionRequestRateInProvince, {});
};

export const useSetPositionRequestRateInMainLocation = () => {
  return useMutation(SetPositionRequestRateInMainLocation, {});
};




export const useDeletePositionRequestRateInMainLocation = () => {
  return useMutation(DeletePositionRequestRateInMainLocation, {});
};
export const useDeletePositionRequestRateInCounty = () => {
  return useMutation(DeletePositionRequestRateInCounty, {});
};
export const useDeletePositionRequestRateInProvince = () => {
  return useMutation(DeletePositionRequestRateInProvince, {});
};
export const useDeletePositionRequestRateInUnion = () => {
  return useMutation(DeletePositionRequestRateInUnion, {});
};