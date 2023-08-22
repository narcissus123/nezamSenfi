import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { IAxiosResult } from "../../models/axios-result.model";
import methods from "../interceptors/http.interceptor";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const postGetProvinceGuildRoomPosition = async (data: any): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}​/api/Position/GetProvinceGuildRoomPosition`,
    data
  );
};
const postGetAllProvinceGuildRoomPosition = async (data: any): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}​/api/Position/GetAllProvinceGuildRoomPosition`,
    data
  );
};
const postGetContyGuildRoomPosition = async (data: any): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}​/api/Position/GetContyGuildRoomPosition`,
    data
  );
};
const postGetUnionCountyPosition = async (data: any): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}​/api/Position/GetUnionCountyPosition`,
    data
  );
};

const SetPositionInProvinceGuildRoom = async (data: any): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/ProvinceGuildRoomPositionRequset/SetPositionInProvinceGuildRoom`,
    data
  );
};
const SetPositionInMainLocationGuildRoom = async (data: any): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/MainLocationGuildRoomPositionRequset/SetPositionInMainLocationGuildRoom`,
    data
  );
};
const GetAllMainLocationGuildRoomPosition = async (data: any): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/Position/GetAllMainLocationGuildRoomPosition`,
    data
  );
};
const GetAllContyGuildRoomPosition = async (data: any): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/Position/GetAllContyGuildRoomPosition`,
    data
  );
};

const GetAllUnionCountyPosition = async (data: any): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/Position/GetAllUnionCountyPosition`,
    data
  );
};
const SetPositionInCountyUnion = async (data: any): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/CountyUnionPositionRequset/SetPositionInCountyUnion`,
    data
  );
};
const SetPositionInCountyGuildRoom = async (data: any): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/CountyGuildRoomPositionRequset/SetPositionInCountyGuildRoom`,
    data
  );
};
export const useGetAllUnionCountyPosition = () => {
  return useMutation(GetAllUnionCountyPosition, {});
};
export const useGetAllMainLocationGuildRoomPosition = () => {
  return useMutation(GetAllMainLocationGuildRoomPosition, {});
};
export const useGetAllContyGuildRoomPosition = () => {
  return useMutation(GetAllContyGuildRoomPosition, {});
};
export const useSetPositionInProvinceGuildRoom = () => {
  return useMutation(SetPositionInProvinceGuildRoom, {});
};
export const useSetPositionInCountyGuildRoom = () => {
  return useMutation(SetPositionInCountyGuildRoom, {});
};
export const useSetPositionInCountyUnion = () => {
  return useMutation(SetPositionInCountyUnion, {});
};
export const useSetPositionInMainLocationGuildRoom = () => {
  return useMutation(SetPositionInMainLocationGuildRoom, {});
};

export const usePostGetProvinceGuildRoomPosition = () => {
  return useMutation(postGetProvinceGuildRoomPosition, {});
};
export const usePostGetAllProvinceGuildRoomPosition = () => {
  return useMutation(postGetAllProvinceGuildRoomPosition, {});
};
export const usePostGetContyGuildRoomPosition = () => {
  return useMutation(postGetContyGuildRoomPosition, {});
};
export const usePostGetUnionCountyPosition = () => {
  return useMutation(postGetUnionCountyPosition, {});
};
