import { useMutation } from "react-query";
import methods from "../interceptors/http.interceptor";
import { useQuery } from "react-query";
import { AxiosResponse } from "axios";
import { IAxiosResult } from "../../models/axios-result.model";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const postSetProvinceGuildRoom = async (data: any) => {
  return await methods.post(
    `${MainUrl}​/api/GuildRoom/SetProvinceGuildRoom`,
    data
  );
};
const postGetCountyUnionByCountyIdForMainLocationAdmin = async (data: any) => {
  return await methods.post(
    `${MainUrl}​/api/Union/GetCountyUnionByCountyIdForMainLocationAdmin`,
    data
  );
};
const postGetUsersOfMainLocationGuildRooms = async (data: any) => {
  return await methods.post(
    `${MainUrl}/api/GuildRoom/GetUsersOfMainLocationGuildRooms`,
    data
  );
};
const postSetUserToCountyAdmin = async (data: any) => {
  return await methods.post(
    `${MainUrl}/api/GuildRoom/SetUserToCountyAdmin`,
    data
  );
};
const postSetUserToProvinceAdmin = async (data: any) => {
  return await methods.post(
    `${MainUrl}/api/GuildRoom/SetUserToProvinceAdmin`,
    data
  );
};
const GetAllMainLocationAdminsByMainLocationAdmin = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/GuildRoom/GetAllMainLocationAdminsByMainLocationAdmin`,
    data
  );
};
const GetAllProvinceAdminByProvinceid = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/GuildRoom/GetAllProvinceAdminByProvinceid`,
    data
  );
};
const GetAllCountyAdminByCountyId = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/GuildRoom/GetAllCountyAdminByCountyId`,
    data
  );
};
const RemoveAdminInCounty = async (data: any): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/GuildRoom/RemoveAdminInCounty`,
    data
  );
};
const RemoveAdminInProvince = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/GuildRoom/RemoveAdminInProvince`,
    data
  );
};
const GetAllUnionAdminByUnionId = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/Union/GetAllUnionAdminByUnionId`,
    data
  );
};
const RemoveAdminInUnion = async (data: any): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}/api/Union/RemoveAdminInUnion`, data);
};






const SetMianLocationGuildRoomRequestUsers = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/GuildRoom/SetMianLocationGuildRoomUsers`,
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};
const SetMianLocationGuildRoomLocation = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/GuildRoom/SetMianLocationGuildRoomLocation`,
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};
const SetMainLocationGuildRoomDocument = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/GuildRoom/SetMainLocationGuildRoomDocument`,
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};








const postSetProvinceGuildRoomRequestUsers = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/GuildRoomRequest/SetProvinceGuildRoomRequestUsers`,
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};

const postSetProvinceGuildRoomRequestLocation = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/GuildRoomRequest/SetProvinceGuildRoomRequestLocation`,
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};
const postSetCountyGuildRoomRequestUsers = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/GuildRoomRequest/SetCountyGuildRoomRequestUsers`,
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};
const postSetCountyGuildRoomRequestLocation = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/GuildRoomRequest/SetCountyGuildRoomRequestLocation`,
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};
const GetOwnedUserProvinceGuildRoomsForAdmin = async (): Promise<
  AxiosResponse<any>
> => {
  return await methods.get(
    `${MainUrl}/api/GuildRoom/GetOwnedUserProvinceGuildRoomsForAdmin`
  );
};
const postSetCountyGuildRoom = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}​/api/GuildRoom/SetCountyGuildRoom`,
    data
  );
};

const ConfirmCountyGuildRoomById = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}​/api/GuildRoom/ConfirmCountyGuildRoomById?countyId=${id}`
  );
};

const getAllWatingForConfirmationCountyGuildRoomByFilter = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/GuildRoom/GetAllWatingForConfirmationCountyGuildRoomByFilter`,
    data
  );
};

export const useGetAllWatingForConfirmationCountyGuildRoomByFilter = () => {
  return useMutation(getAllWatingForConfirmationCountyGuildRoomByFilter, {});
};

export const useConfirmCountyGuildRoom = () => {
  return useMutation(ConfirmCountyGuildRoomById, {});
};

const getOwnedUserProvinceGuildRooms = async (): Promise<
  AxiosResponse<any>
> => {
  return await methods.get(
    `${MainUrl}​/api/GuildRoom/GetOwnedUserProvinceGuildRooms`
  );
};

const GetOwnedUserCountyGuildRoomsForAdmin = async (): Promise<
  AxiosResponse<any>
> => {
  return await methods.get(
    `${MainUrl}​/api/GuildRoom/GetOwnedUserCountyGuildRoomsForAdmin`
  );
};

const getOwnedUserCountyGuildRooms = async (): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}​/api/GuildRoom/GetOwnedUserCountyGuildRooms`
  );
};
const GetOwnedUserCountyGuildRoomsForSecretariat = async (): Promise<
  AxiosResponse<any>
> => {
  return await methods.get(
    `${MainUrl}​/api/GuildRoom/GetOwnedUserCountyGuildRoomsForSecretariat`
  );
};
const getUserRolsInProvinceByUserId = async (obj: {
  userId: number;
  provinceId: number;
}): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}​/api/GuildRoom/GetUserRolsInProvinceByUserId?userId=${obj.userId}&provinceId=${obj.provinceId}`
  );
};

const getUserRolsInMainLocation = async (obj: {
  userId: any;
  mainLocationId: any;
}): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}​/api/GuildRoom/GetUserRolsInMainLocation?userId=${obj.userId}&mainLocationId=${obj.mainLocationId}`
  );
};

const getCountyGuildRoomsByProvinceId = async (
  provinceId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}​/api/GuildRoom/GetCountyGuildRoomsByProvinceId?provinceId=${provinceId}`
  );
};

const getUserRolsInCountyByUserId = async (obj: {
  userId: number;
  countyId: number;
}): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}​/api/GuildRoom/GetUserRolsInCountyByUserId?userId=${obj.userId}&countyId=${obj.countyId}`
  );
};

const getAllNotDefineCountyGuildRoomByProvinceId = async (
  provinceId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}​/api/Location/GetAllNotDefineCountyGuildRoomByProvinceId?provinceId=${provinceId}`
  );
};

const postGetAllProvinceGuildRoomsByFilter = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}​/api/GuildRoom/GetAllProvinceGuildRoomsByFilter`,
    data
  );
};

const postCreateUserProvinceGuildRoom = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/GuildRoom/SetUserProvinceGuildRoom`,
    data
  );
};

const postSetUserInMainLocationGuildRoom = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/GuildRoom/SetUserInMainLocationGuildRoom`,
    data
  );
};

const postCreateUserCountyGuildRoom = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/GuildRoom/SetUserCountyGuildRoom`,
    data
  );
};

const postGetAllCountyGuildRoomsByFilter = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/GuildRoom/GetAllCountyGuildRoomsByProvinceIdWithFilter`,
    data
  );
};

const postGetAllCountyGuildRoomsByFilterForMainLocationAdmin = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/GuildRoom/GetAllCountyGuildRoomsByFilterForMainLocationAdmin`,
    data
  );
};

const getUserProvinceGuildRoomsByProvinceId = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/GuildRoom/GetUserProvinceGuildRoomsByProvinceId`,
    data
  );
};

const getUserCountyGuildRoomsByCountyId = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/GuildRoom/GetUserCountyGuildRoomsByCountyId`,
    data
  );
};

const GetAllProvinceGuildRoomsForDropDown = async (): Promise<
  AxiosResponse<any>
> => {
  return await methods.get(
    `${MainUrl}/api/GuildRoom/GetAllProvinceGuildRoomsForDropDown`
  );
};
const GetOwnedUserCountyGuildRoomsForTreasurer = async (): Promise<
  AxiosResponse<any>
> => {
  return await methods.get(
    `${MainUrl}/api/GuildRoom/GetOwnedUserCountyGuildRoomsForTreasurer`
  );
};
const GetOwnedUserProvinceGuildRoomsForSecretariat = async (): Promise<
  AxiosResponse<any>
> => {
  return await methods.get(
    `${MainUrl}/api/GuildRoom/GetOwnedUserProvinceGuildRoomsForSecretariat`
  );
};
const GetOwnedUserProvinceGuildRoomsForTreasurer = async (): Promise<
  AxiosResponse<any>
> => {
  return await methods.get(
    `${MainUrl}/api/GuildRoom/GetOwnedUserProvinceGuildRoomsForTreasurer`
  );
};
const GetAllCountyGuildRoomsByProvinceIdForDropDown = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/GuildRoom/GetAllCountyGuildRoomsByProvinceIdForDropDown?provinceId=${id}`
  );
};

export const useGetAllCountyGuildRoomsByProvinceIdForDropDown = () => {
  return useMutation(GetAllCountyGuildRoomsByProvinceIdForDropDown, {});
};

export const useSetProvinceGuildRoom = () => {
  return useMutation(postSetProvinceGuildRoom, {});
};

export const usePostSetUserToCountyAdmin = () => {
  return useMutation(postSetUserToCountyAdmin, {});
};
export const usePostSetUserToProvinceAdmin = () => {
  return useMutation(postSetUserToProvinceAdmin, {});
};
export const useGetOwnedUserProvinceGuildRoomsForAdmin = () => {
  return useQuery(
    "GetOwnedUserProvinceGuildRoomsForAdmin",
    GetOwnedUserProvinceGuildRoomsForAdmin,
    {
      refetchOnWindowFocus: false,
    }
  );
};
export const useOwnedUserProvinceGuildRooms = () => {
  return useQuery(
    "useOwnedUserProvinceGuildRooms",
    getOwnedUserProvinceGuildRooms,
    {
      refetchOnWindowFocus: false,
    }
  );
};
export const useGetOwnedUserCountyGuildRoomsForAdmin = () => {
  return useQuery(
    "GetOwnedUserCountyGuildRoomsForAdmin",
    GetOwnedUserCountyGuildRoomsForAdmin,
    {
      refetchOnWindowFocus: false,
    }
  );
};
export const useGetOwnedUserCountyGuildRoomsForTreasurer = () => {
  return useQuery(
    "GetOwnedUserCountyGuildRoomsForTreasurer",
    GetOwnedUserCountyGuildRoomsForTreasurer,
    {
      refetchOnWindowFocus: false,
    }
  );
};
export const useGetOwnedUserProvinceGuildRoomsForTreasurer = () => {
  return useQuery(
    "GetOwnedUserProvinceGuildRoomsForTreasurer",
    GetOwnedUserProvinceGuildRoomsForTreasurer,
    {
      refetchOnWindowFocus: false,
    }
  );
};
export const useGetOwnedUserCountyGuildRoomsForSecretariat = () => {
  return useQuery(
    "useGetOwnedUserCountyGuildRoomsForSecretariat",
    GetOwnedUserCountyGuildRoomsForSecretariat,
    {
      refetchOnWindowFocus: false,
    }
  );
};
export const useGetOwnedUserProvinceGuildRoomsForSecretariat = () => {
  return useQuery(
    "GetOwnedUserProvinceGuildRoomsForSecretariat",
    GetOwnedUserProvinceGuildRoomsForSecretariat,
    {
      refetchOnWindowFocus: false,
    }
  );
};
export const useGetAllProvinceGuildRoomsForDropDown = () => {
  return useQuery(
    "GetAllProvinceGuildRoomsForDropDown",
    GetAllProvinceGuildRoomsForDropDown,
    {
      refetchOnWindowFocus: false,
    }
  );
};

export const useSetCountyGuildRoom = () => {
  return useMutation(postSetCountyGuildRoom, {});
};

export const usePostCreateUserProvinceGuildRoom = () => {
  return useMutation(postCreateUserProvinceGuildRoom, {});
};

export const usePostSetUserInMainLocationGuildRoom = () => {
  return useMutation(postSetUserInMainLocationGuildRoom, {});
};

export const usePostCreateUserCountyGuildRoom = () => {
  return useMutation(postCreateUserCountyGuildRoom, {});
};

export const useGetCountyGuildRoomsByProvinceId = () => {
  return useMutation(getCountyGuildRoomsByProvinceId, {});
};

export const useGetUserRolsInProvinceByUserId = () => {
  return useMutation(getUserRolsInProvinceByUserId);
};

export const useGetUserRolsInMainLocation = () => {
  return useMutation(getUserRolsInMainLocation);
};

export const useGetUserRolsInCountyByUserId = () => {
  return useMutation(getUserRolsInCountyByUserId);
};

export const useGetAllNotDefineCountyGuildRoomByProvinceId = () => {
  return useMutation(getAllNotDefineCountyGuildRoomByProvinceId);
};

export const useGetAllProvinceGuildRoomsByFilter = () => {
  return useMutation(postGetAllProvinceGuildRoomsByFilter, {});
};

export const usePostGetAllCountyGuildRoomsByFilter = () => {
  return useMutation(postGetAllCountyGuildRoomsByFilter, {});
};
// const getAllProvinceGuildRoomsForDropDown = async (mainLocationId: any) => {
//   return await methods.get(
//     MainUrl + "/api/GuildRoom/GetAllProvinceGuildRoomsForDropDown"
//   );
// };
export const usePostGetAllCountyGuildRoomsByFilterForMainLocationAdmin = () => {
  return useMutation(
    postGetAllCountyGuildRoomsByFilterForMainLocationAdmin,
    {}
  );
};

export const useGetUserProvinceGuildRoomsByProvinceId = () => {
  return useMutation(getUserProvinceGuildRoomsByProvinceId, {});
};

export const useGetUserCountyGuildRoomsByCountyId = () => {
  return useMutation(getUserCountyGuildRoomsByCountyId, {});
};

const getAllProvinceGuildRooms = async (): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(`${MainUrl}/api/GuildRoom/GetAllProvinceGuildRooms`);
};

const GetOwnedUserProvinceGuildRooms = async (): Promise<
  AxiosResponse<any>
> => {
  return await methods.get(
    `${MainUrl}/api/GuildRoom/GetOwnedUserProvinceGuildRooms`
  );
};

export const useGetAllProvinceGuildRooms = () => {
  return useQuery("useGetAllProvinceGuildRooms", getAllProvinceGuildRooms, {
    refetchOnWindowFocus: false,
  });
};

export const useGetOwnedUserProvinceGuildRooms = () => {
  return useQuery(
    "GetOwnedUserProvinceGuildRooms",
    GetOwnedUserProvinceGuildRooms,
    {
      refetchOnWindowFocus: false,
    }
  );
};

export const useGetOwnedUserCountyGuildRooms = () => {
  return useQuery(
    "getOwnedUserCountyGuildRooms",
    getOwnedUserCountyGuildRooms,
    {
      refetchOnWindowFocus: false,
    }
  );
};


export const useSetMianLocationGuildRoomRequestUsers = () => {
  return useMutation(SetMianLocationGuildRoomRequestUsers, {});
};
export const useSetMianLocationGuildRoomLocation = () => {
  return useMutation(SetMianLocationGuildRoomLocation, {});
};
export const useSetMainLocationGuildRoomDocument = () => {
  return useMutation(SetMainLocationGuildRoomDocument, {});
};

export const usePostSetProvinceGuildRoomRequestUsers = () => {
  return useMutation(postSetProvinceGuildRoomRequestUsers, {});
};
export const usePostSetProvinceGuildRoomRequestLocation = () => {
  return useMutation(postSetProvinceGuildRoomRequestLocation, {});
};
export const usePostSetCountyGuildRoomRequestUsers = () => {
  return useMutation(postSetCountyGuildRoomRequestUsers, {});
};
export const usePostSetCountyGuildRoomRequestLocation = () => {
  return useMutation(postSetCountyGuildRoomRequestLocation, {});
};
export const usePostGetCountyUnionByCountyIdForMainLocationAdmin = () => {
  return useMutation(postGetCountyUnionByCountyIdForMainLocationAdmin);
};
export const usePostGetUsersOfMainLocationGuildRooms = () => {
  return useMutation(postGetUsersOfMainLocationGuildRooms);
};
export const useGetAllMainLocationAdminsByMainLocationAdmin = () => {
  return useMutation(GetAllMainLocationAdminsByMainLocationAdmin, {});
};
export const useGetAllProvinceAdminByProvinceid = () => {
  return useMutation(GetAllProvinceAdminByProvinceid, {});
};
export const useGetAllCountyAdminByCountyId = () => {
  return useMutation(GetAllCountyAdminByCountyId, {});
};
export const useRemoveAdminInCounty = () => {
  return useMutation(RemoveAdminInCounty, {});
};
export const useRemoveAdminInProvince = () => {
  return useMutation(RemoveAdminInProvince, {});
};
export const useGetAllUnionAdminByUnionId = () => {
  return useMutation(GetAllUnionAdminByUnionId, {});
};
export const useRemoveAdminInUnion = () => {
  return useMutation(RemoveAdminInUnion, {});
};
