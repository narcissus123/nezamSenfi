
import { useMutation, useQuery } from "react-query";
import methods from "../interceptors/http.interceptor";
import { IAxiosResult } from "../../models/axios-result.model";
import { AxiosResponse } from "axios";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

interface ICreateSectionProximity {
  name: string;
  code: string;
  description: string;
  type: number;
  viewOrder: number;
}

interface IEditSectionProximity {
  id: number;
  name: string;
  code: string;
  description: string;
  type: number;
  viewOrder: number;
}

interface IGetSectionProximityByFilter {
  page: number;
  pageSize: number;
  name: string | null;
  code: string | null;
  type: number | null;
}

const DeleteSectionProximity = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/PartsAndFacilities/DeleteSectionProximity?proximityId=${id}`
  );
};

const GetAllSectionProximity = async (): Promise<
  AxiosResponse<IAxiosResult>
> => {
  return await methods.get(
    `${MainUrl}/api/PartsAndFacilities/GetAllSectionProximity`
  );
};

const CreateSectionProximity = async (
  obj: ICreateSectionProximity
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}​/api/PartsAndFacilities/CreateSectionProximity`,
    obj
  );
};

const EditSectionProximity = async (
  obj: IEditSectionProximity
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/PartsAndFacilities/EditSectionProximity`,
    obj
  );
};

const GetSectionProximityByFilter = async (
  obj: IGetSectionProximityByFilter
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/PartsAndFacilities/GetSectionProximityByFilter`,
    obj
  );
};

export const useGetAllSectionProximity = () => {
  return useMutation(GetAllSectionProximity, {});
};




const CreateWaterWellWall = async (
  obj: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}​/api/PartsAndFacilities/CreateWaterWellWall`,
    obj
  );
};

const EditWaterWellWall = async (
  obj: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}​/api/PartsAndFacilities/EditWaterWellWall`, obj);
};

const DeleteWaterWellWall = async ( id: number): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(`${MainUrl}/api/PartsAndFacilities/DeleteWaterWellWall?waterWellWallId=${id}`);
};

const GetWaterWellWallByFilter = async (
  obj: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/PartsAndFacilities/GetWaterWellWallByFilter`,
    obj
  );
};

const GetAllWaterWellWall = async (
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/PartsAndFacilities/GetAllWaterWellWall`
  );
};
const GetAllEnginePower = async (
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/PartsAndFacilities/GetAllEnginePower`
  );
};

const CreateEnginePower = async (
  obj: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}​/api/PartsAndFacilities/CreateEnginePower`, obj);
};
const EditEnginePower = async (
  obj: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}​/api/PartsAndFacilities/EditEnginePower`, obj);
};
const GetEngineTypeByFilter = async (
  obj: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}/api/PartsAndFacilities/GetEngineTypeByFilter`, obj);
};
const DeleteEnginePower = async ( id: number): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(`${MainUrl}/api/PartsAndFacilities/DeleteEnginePower?enginePowerId=${id}`);
};


const CreateEngineType = async (
  obj: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}​/api/PartsAndFacilities/CreateEngineType`,
    obj
  );
};

const GetEnginePowerByFilter = async (
  obj: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}​/api/PartsAndFacilities/GetEnginePowerByFilter`, obj);
};

const DeleteEngineType = async ( id: number): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(`${MainUrl}/api/PartsAndFacilities/DeleteEngineType?engineTypeId=${id}`);
};
const GetEnginePowerEngineTypeByEngineTypeId = async ( id: number): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(`${MainUrl}/api/PartsAndFacilities/GetEnginePowerEngineTypeByEngineTypeId?engineTypeId=${id}`);
};
const GetAllEngineType = async (
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/PartsAndFacilities/GetAllEngineType`
  );
};

const CreateFacilityBuildings = async (
  obj: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}/api/PartsAndFacilities/CreateFacilityBuildings`, obj);
};
const EditFacilityBuildings = async (
  obj: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}/api/PartsAndFacilities/EditFacilityBuildings`, obj);
};
const GetFacilityBuildingsByFilter = async (
  obj: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}​/api/PartsAndFacilities/GetFacilityBuildingsByFilter`, obj);
};
const GetAllFacilityBuildings = async (
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(`${MainUrl}​/api/PartsAndFacilities/GetAllFacilityBuildings`);
};
const GetAllFacilityBuildingsWithType = async (
  id: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}​/api/PartsAndFacilities/GetAllFacilityBuildings?facilityBuildingsTypeEnum=${id}`
  );
};
const DeleteFacilityBuildings = async ( id: number): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(`${MainUrl}/api/PartsAndFacilities/DeleteFacilityBuildings?facilityBuildingsId=${id}`);
};



export const useCreateFacilityBuildings = () => {
  return useMutation(CreateFacilityBuildings, {});
};
export const useEditFacilityBuildings = () => {
  return useMutation(EditFacilityBuildings, {});
};
export const useGetFacilityBuildingsByFilter = () => {
  return useMutation(GetFacilityBuildingsByFilter, {});
};
export const useDeleteFacilityBuildings = () => {
  return useMutation(DeleteFacilityBuildings, {});
};






export const useCreateEnginePower = () => {
  return useMutation(CreateEnginePower, {});
};
export const useEditEnginePower = () => {
  return useMutation(EditEnginePower, {});
};
export const useGetEnginePowerByFilter = () => {
  return useMutation(GetEnginePowerByFilter, {});
};
export const useDeleteEnginePower = () => {
  return useMutation(DeleteEnginePower, {});
};


export const useCreateWaterWellWall = () => {
  return useMutation(CreateWaterWellWall, {});
};
export const useEditWaterWellWall = () => {
  return useMutation(EditWaterWellWall, {});
};
export const useDeleteWaterWellWall = () => {
  return useMutation(DeleteWaterWellWall, {});
};
export const useGetWaterWellWallByFilter = () => {
  return useMutation(GetWaterWellWallByFilter, {});
};
export const useDeleteSectionProximity = () => {
  return useMutation(DeleteSectionProximity, {});
};
export const useCreateSectionProximity = () => {
  return useMutation(CreateSectionProximity, {});
};

export const useEditSectionProximity = () => {
  return useMutation(EditSectionProximity, {});
};
export const useGetSectionProximityByFilter = () => {
  return useMutation(GetSectionProximityByFilter, {});
};
export const useGetAllFacilityBuildings = () => {
  return useQuery("GetAllFacilityBuildings",GetAllFacilityBuildings , {  enabled : false });
};
export const useGetAllFacilityBuildings2 = () => {
  return useQuery("GetAllFacilityBuildings",GetAllFacilityBuildings);
};
export const useGetAllWaterWellWall = () => {
  return useQuery("GetAllWaterWellWall",GetAllWaterWellWall);
};
export const useGetAllEnginePower = () => {
  return useQuery("GetAllEnginePower",GetAllEnginePower);
};

export const useCreateEngineType = () => {
  return useMutation(CreateEngineType, {});
};
export const useGetEngineTypeByFilter = () => {
  return useMutation(GetEngineTypeByFilter, {});
};

export const useDeleteEngineType = () => {
  return useMutation(DeleteEngineType, {});
};
export const useGetAllFacilityBuildingsWithType = () => {
  return useMutation(GetAllFacilityBuildingsWithType, {});
};
export const useGetEnginePowerEngineTypeByEngineTypeId = () => {
  return useMutation(GetEnginePowerEngineTypeByEngineTypeId, {});
};
export const useGetAllEngineType = () => {
  return useQuery("GetAllEngineType",GetAllEngineType);
};