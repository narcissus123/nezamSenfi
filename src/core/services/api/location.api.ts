import { useMutation } from "react-query";
import methods from "../interceptors/http.interceptor";
import { useQuery } from "react-query";
import { AxiosResponse } from "axios";
import { IAxiosResult } from "../../models/axios-result.model";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;
const locationInformationUrl = MainUrl + "/api/Location/LocationInformation";
const allNotDefineProvinceGuildRoomUrl =
  MainUrl + "/api/Location/GetAllNotDefineProvinceGuildRoom";
const getAllCountriesUrl = MainUrl + "/api/Location/GetAllCountries";
const getAllCountyByProvinceIdUrl =
  MainUrl + "/api/Location/GetAllCountyByProvinceId";
const getAllCiyOrVillageByCountyIdUrl =
  MainUrl + "/api/Location/GetAllCiyOrVillageByCountyId";
const getAllCitiesByCountyIdUrl =
  MainUrl + "/api/Location/GetAllCitiesByCountyId";
const getAllVillagesByCountyIdUrl =
  MainUrl + "/api/Location/GetAllVillagesByCountyId";

const getLocationInformation = async (
  locationId: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    locationInformationUrl + `?locationId=${locationId}`
  );
};

const getAllMainLocations = async (): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(`${MainUrl}/api/Location/GetAllMainLocations`);
};
const getAllprovinces = async (): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(`${MainUrl}/api/Location/GetAllprovinces`);
};

const getAllNotDefineProvinceGuildRoom = async (
  locationId: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(allNotDefineProvinceGuildRoomUrl);
};

const getAllCountries = async (): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(getAllCountriesUrl);
};
const getAllprovinceByMainLocationId = async (
  mainLocationId: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(MainUrl + "/api/Location/GetAllprovinces");
};
const getAllCountyByProvinceId = async (
  provinceId: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    getAllCountyByProvinceIdUrl + `?provinceId=${provinceId}`
  );
};
const getAllCiyOrVillageByCountyId = async (
  countyId: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    getAllCiyOrVillageByCountyIdUrl + `?countyId=${countyId}`
  );
};

const getAllCitiesByCountyId = async (
  countyId: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(getAllCitiesByCountyIdUrl + `?countyId=${countyId}`);
};
const GetAllCitiesWithPartByCountyId = async (
  countyId: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    MainUrl +
      `/api/Location/GetAllCitiesWithPartByCountyId?countyId=${countyId}`
  );
};
const GetAllVillagesWithPartByCountyId = async (
  countyId: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    MainUrl +
      `/api/Location/GetAllVillagesWithPartByCountyId?countyId=${countyId}`
  );
};

const getAllVillagesByCountyId = async (
  countyId: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    getAllVillagesByCountyIdUrl + `?countyId=${countyId}`
  );
};

export const useGetLocationInformation = () => {
  return useMutation(getLocationInformation, {});
};
export const useGetAllVillagesWithPartByCountyId = () => {
  return useMutation(GetAllVillagesWithPartByCountyId, {});
};
export const useGetAllCitiesWithPartByCountyId = () => {
  return useMutation(GetAllCitiesWithPartByCountyId, {});
};

export const useGetAllCountries = () => {
  return useQuery("useGetAllCountries", getAllCountries);
};

export const useGetAllprovinces = () => {
  return useQuery("getAllprovinces", getAllprovinces);
};

export const useGetAllMainLocations = () => {
  return useQuery("getAllprovinces", getAllMainLocations);
};
export const useGetAllprovinceByMainLocationId = () => {
  return useMutation(getAllprovinceByMainLocationId, {});
};
export const useGetAllNotDefineProvinceGuildRoom = () => {
  return useQuery(
    "useGetAllNotDefineProvinceGuildRoom",
    getAllNotDefineProvinceGuildRoom
  );
};

export const useGetAllCountyByProvinceId = () => {
  return useMutation(getAllCountyByProvinceId, {});
};

export const useGetAllCiyOrVillageByCountyId = () => {
  return useMutation(getAllCiyOrVillageByCountyId, {});
};

export const useGetAllCitiesByCountyId = () => {
  return useMutation(getAllCitiesByCountyId, {});
};

export const useGetAllVillagesByCountyId = () => {
  return useMutation(getAllVillagesByCountyId, {});
};
