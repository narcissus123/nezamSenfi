import { AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";
import { IAxiosResult } from "../../models/axios-result.model";
import methods from "../interceptors/http.interceptor";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const SetUnionRequestUsers = async (data: any) => {
  return await methods.post(
    `${MainUrl}/api/UnionRequest/SetUnionRequestUsers`,
    data
  );
};
const SetUnionRequestLocation = async (data: any) => {
  return await methods.post(
    `${MainUrl}/api/UnionRequest/SetUnionRequestLocation`,
    data
  );
};
const SetUnionRequestDocument = async (data: any) => {
  return await methods.post(
    `${MainUrl}/api/UnionRequest/SetUnionRequestDocument`,
    data
  );
};
const GetMyUnionRequestsByCountyId = async (data: any) => {
  return await methods.post(
    `${MainUrl}/api/UnionRequest/GetMyUnionRequestsByCountyId`,
    data
  );
};
const GetAllUnionRequestsByManagerAndSecretariat = async (data: any) => {
  return await methods.post(
    `${MainUrl}/api/UnionRequest/GetAllUnionRequestsByManagerAndSecretariat`,
    data
  );
};
const GetViceManagerCartableOfUnionRequests = async (data: any) => {
  return await methods.post(
    `${MainUrl}/api/UnionRequest/GetViceManagerCartableOfUnionRequests`,
    data
  );
};
const GetExecutiveManagerCartableOfUnionRequests = async (data: any) => {
  return await methods.post(
    `${MainUrl}/api/UnionRequest/GetExecutiveManagerCartableOfUnionRequests`,
    data
  );
};
const GetSecretariatCartableOfUnionRequests = async (data: any) => {
  return await methods.post(
    `${MainUrl}/api/UnionRequest/GetSecretariatCartableOfUnionRequests`,
    data
  );
};
const GetManagerCartableOfUnionRequests = async (data: any) => {
  return await methods.post(
    `${MainUrl}/api/UnionRequest/GetManagerCartableOfUnionRequests`,
    data
  );
};
const GetItManagerCartableOfUnionRequests = async (data: any) => {
  return await methods.post(
    `${MainUrl}/api/UnionRequest/GetItManagerCartableOfUnionRequests`,
    data
  );
};
const InvastigationAndAcceptByMainlocationSecretriatForUnionRequest = async (
  data: any
) => {
  return await methods.post(
    `${MainUrl}/api/UnionRequest/InvastigationAndAcceptByMainlocationSecretriatForUnionRequest`,
    data
  );
};
const InvastigationAndRejectByMainlocationSecretriatForUnionRequest = async (
  data: any
) => {
  return await methods.post(
    `${MainUrl}/api/UnionRequest/InvastigationAndRejectByMainlocationSecretriatForUnionRequest`,
    data
  );
};
const GetAllUnionRequestHistory = async (data: any) => {
  return await methods.post(
    `${MainUrl}/api/UnionRequest/GetAllUnionRequestHistory`,
    data
  );
};
const ActiveUnionByItManger = async (data: any) => {
  return await methods.post(
    `${MainUrl}/api/UnionRequest/ActiveUnionByItManger`,
    data
  );
};
const SetManagerIdeaAboutUnionRequest = async (data: any) => {
  return await methods.post(
    `${MainUrl}/api/UnionRequest/SetManagerIdeaAboutUnionRequest`,
    data
  );
};
const GetMyUnionRequestHistory = async (data: any) => {
  return await methods.post(
    `${MainUrl}/api/UnionRequest/GetMyUnionRequestHistory`,
    data
  );
};
const GetMyCountyGuilDRooomRequestHistory = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/GuildRoomRequest/GetMyCountyGuilDRooomRequestHistory`,
    data
  );
};
const GetMyProvinceGuilDRooomRequestHistory = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/GuildRoomRequest/GetMyProvinceGuilDRooomRequestHistory`,
    data
  );
};
const SetUnionRequestUseTypeAndJob = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/UnionRequest/SetUnionRequestUseTypeAndJob`,
    data
  );
};
const ChangeSecretariatOfProvinceGuildRoomRequestByManger = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/GuildRoomRequest/ChangeSecretariatOfProvinceGuildRoomRequestByManger`,
    data
  );
};
const ChangeSecretariatOfCountyGuildRoomRequestByManger = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/GuildRoomRequest/ChangeSecretariatOfCountyGuildRoomRequestByManger`,
    data
  );
};
const ChangeSecretariatOfUnionRequestByManger = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/UnionRequest/ChangeSecretariatOfUnionRequestByManger`,
    data
  );
};
const GetUnionRequestDetails = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/UnionRequest/GetUnionRequestDetails?requestId=${id}`
  );
};
const GetMianLocationGuildRoomRequestDetails = async (): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/GuildRoom/GetMainLocationGuildRoomDetails`
  );
};
const GetCountyGuildRoomDetails = async ( id : number): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/GuildRoom/GetCountyGuildRoomDetails?countyId=${id}`
  );
};
const GetUnionDetails = async ( id : number): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/Union/GetUnionDetails?unionId=${id}`
  );
};
const GetProvinceGuildRoomDetails = async ( id : number): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/GuildRoom/GetProvinceGuildRoomDetails?provincId=${id}`
  );
};
const GetUnionRequestDetailsForItManager = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/UnionRequest/GetUnionRequestDetailsForItManager?requestId=${id}`
  );
};
const SendUnionRequestForInvestigation = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/UnionRequest/SendUnionRequestForInvestigation?requestId=${id}`
  );
};
const SelectUnionRequestByIdBySecretariat = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/UnionRequest/SelectUnionRequestByIdBySecretariat?requestId=${id}`
  );
};
const GetUnionRequestUseTypeAndJobsDetails = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/UnionRequest/GetUnionRequestUseTypeAndJobsDetails2?requestId=${id}`
  );
};

const GetUnionRequestUseTypeAndJobsDetailsWithMutation = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/UnionRequest/GetUnionRequestUseTypeAndJobsDetails2?requestId=${id}`
  );
};

const GetSecretariatOfUnionRequest = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/UnionRequest/GetSecretariatOfUnionRequest?unionRequestId=${id}`
  );
};
export const useGetUnionRequestUseTypeAndJobsDetails = (id: number) => {
  return useQuery("GetUnionRequestUseTypeAndJobsDetails", () =>
    GetUnionRequestUseTypeAndJobsDetails(id)
  );
};
export const useGetUnionRequestUseTypeAndJobsDetailsWithMutation = () => {
  return useMutation(GetUnionRequestUseTypeAndJobsDetailsWithMutation, {});
};
export const useGetSecretariatOfUnionRequest = () => {
  return useMutation(GetSecretariatOfUnionRequest, {});
};

export const useChangeSecretariatOfUnionRequestByManger = () => {
  return useMutation(ChangeSecretariatOfUnionRequestByManger, {});
};
export const useChangeSecretariatOfCountyGuildRoomRequestByManger = () => {
  return useMutation(ChangeSecretariatOfCountyGuildRoomRequestByManger, {});
};
export const useChangeSecretariatOfProvinceGuildRoomRequestByManger = () => {
  return useMutation(ChangeSecretariatOfProvinceGuildRoomRequestByManger, {});
};
export const useSetUnionRequestUseTypeAndJob = () => {
  return useMutation(SetUnionRequestUseTypeAndJob, {});
};
export const useGetMyProvinceGuilDRooomRequestHistory = () => {
  return useMutation(GetMyProvinceGuilDRooomRequestHistory, {});
};
export const useGetMyCountyGuilDRooomRequestHistory = () => {
  return useMutation(GetMyCountyGuilDRooomRequestHistory, {});
};
export const useGetMyUnionRequestHistory = () => {
  return useMutation(GetMyUnionRequestHistory, {});
};
export const useSetManagerIdeaAboutUnionRequest = () => {
  return useMutation(SetManagerIdeaAboutUnionRequest, {});
};
export const useActiveUnionByItManger = () => {
  return useMutation(ActiveUnionByItManger, {});
};
export const useGetAllUnionRequestHistory = () => {
  return useMutation(GetAllUnionRequestHistory, {});
};
export const useInvastigationAndRejectByMainlocationSecretriatForUnionRequest =
  () => {
    return useMutation(
      InvastigationAndRejectByMainlocationSecretriatForUnionRequest,
      {}
    );
  };
export const useInvastigationAndAcceptByMainlocationSecretriatForUnionRequest =
  () => {
    return useMutation(
      InvastigationAndAcceptByMainlocationSecretriatForUnionRequest,
      {}
    );
  };
export const useSelectUnionRequestByIdBySecretariat = () => {
  return useMutation(SelectUnionRequestByIdBySecretariat, {});
};
export const useSendUnionRequestForInvestigation = () => {
  return useMutation(SendUnionRequestForInvestigation, {});
};
export const useGetItManagerCartableOfUnionRequests = () => {
  return useMutation(GetItManagerCartableOfUnionRequests, {});
};
export const useGetManagerCartableOfUnionRequests = () => {
  return useMutation(GetManagerCartableOfUnionRequests, {});
};
export const useGetSecretariatCartableOfUnionRequests = () => {
  return useMutation(GetSecretariatCartableOfUnionRequests, {});
};
export const useGetExecutiveManagerCartableOfUnionRequests = () => {
  return useMutation(GetExecutiveManagerCartableOfUnionRequests, {});
};
export const useGetViceManagerCartableOfUnionRequests = () => {
  return useMutation(GetViceManagerCartableOfUnionRequests, {});
};
export const useGetAllUnionRequestsByManagerAndSecretariat = () => {
  return useMutation(GetAllUnionRequestsByManagerAndSecretariat, {});
};
export const useGetMyUnionRequestsByCountyId = () => {
  return useMutation(GetMyUnionRequestsByCountyId, {});
};
export const useGetUnionRequestDetailsForItManager = () => {
  return useMutation(GetUnionRequestDetailsForItManager, {});
};
export const useGetMianLocationGuildRoomRequestDetails = () => {
  return useMutation(GetMianLocationGuildRoomRequestDetails, {});
};
export const useGetCountyGuildRoomDetails = () => {
  return useMutation(GetCountyGuildRoomDetails, {});
};
export const useGetUnionDetails = () => {
  return useMutation(GetUnionDetails, {});
};
export const useGetProvinceGuildRoomDetails = () => {
  return useMutation(GetProvinceGuildRoomDetails, {});
};
export const useGetUnionRequestDetails = () => {
  return useMutation(GetUnionRequestDetails, {});
};
export const useSetUnionRequestDocument = () => {
  return useMutation(SetUnionRequestDocument, {});
};
export const useSetUnionRequestUsers = () => {
  return useMutation(SetUnionRequestUsers, {});
};
export const useSetUnionRequestLocation = () => {
  return useMutation(SetUnionRequestLocation, {});
};
