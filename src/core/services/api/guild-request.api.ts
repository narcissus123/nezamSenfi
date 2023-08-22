import { AxiosResponse } from "axios";
import { useMutation } from "react-query";
import { IAxiosResult } from "../../models/axios-result.model";
import methods from "../interceptors/http.interceptor";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const SetProvinceGuildRoomRequestDocument = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/GuildRoomRequest/SetProvinceGuildRoomRequestDocument`,
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};
const SetMainLocationGuildRoomBankInfo = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/GuildRoom/SetMainLocationGuildRoomBankInfo`,
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};
const SetProvinceGuildRoomRequestBankInfo = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/GuildRoomRequest/SetProvinceGuildRoomRequestBankInfo`,
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};
const SetCountyGuildRoomRequestBankInfo = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/GuildRoomRequest/SetCountyGuildRoomRequestBankInfo`,
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};
const SetUnionRequestBankInfo = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/UnionRequest/SetUnionRequestBankInfo`,
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};
const GetAllProvinceGuildRoomRequestsByManagerAndSecretariat = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/GuildRoomRequest/GetAllProvinceGuildRoomRequestsByManagerAndSecretariat`,
    data
  );
};
const GetMyProvinceGuildRoomRequestsByProvinceId = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/GuildRoomRequest/GetMyProvinceGuildRoomRequestsByProvinceId`,
    data
  );
};
const SetCountyGuildRoomRequestDocument = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/GuildRoomRequest/SetCountyGuildRoomRequestDocument`,
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};
const GetMyCountyGuildRoomRequestsByCountyId = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/GuildRoomRequest/GetMyCountyGuildRoomRequestsByCountyId`,
    data
  );
};
const GetAllCountyGuildRoomRequestsByManagerAndSecretariat = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/GuildRoomRequest/GetAllCountyGuildRoomRequestsByManagerAndSecretariat`,
    data
  );
};
const GetSecretariatCartableOfCountyGuildRoomRequests = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/GuildRoomRequest/GetSecretariatCartableOfCountyGuildRoomRequests`,
    data
  );
};
const GetManagerCartableOfProvinceGuildRoomRequests = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/GuildRoomRequest/GetManagerCartableOfProvinceGuildRoomRequests`,
    data
  );
};
const GetManagerCartableOfCountyGuildRoomRequests = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/GuildRoomRequest/GetManagerCartableOfCountyGuildRoomRequests`,
    data
  );
};
const GetViceManagerCartableOfProvinceGuildRoomRequests = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/GuildRoomRequest/GetViceManagerCartableOfProvinceGuildRoomRequests`,
    data
  );
};
const GetExecutiveManagerCartableOfProvinceGuildRoomRequests = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/GuildRoomRequest/GetExecutiveManagerCartableOfProvinceGuildRoomRequests`,
    data
  );
};
const GetExecutiveManagerCartableCountyGuildRoomRequests = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/GuildRoomRequest/GetExecutiveManagerCartableCountyGuildRoomRequests`,
    data
  );
};
const GetViceManagerCartableCountyGuildRoomRequests = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/GuildRoomRequest/GetViceManagerCartableCountyGuildRoomRequests`,
    data
  );
};
const InvastigationAndAcceptByProvinceSecretriatForCountyGuildRoomRequest =
  async (data: any): Promise<AxiosResponse<IAxiosResult>> => {
    return await methods.post(
      `${MainUrl}/api/GuildRoomRequest/InvastigationAndAcceptByProvinceSecretriatForCountyGuildRoomRequest`,
      data
    );
  };
const InvastigationAndAcceptByMainlocationSecretriatForProvinceGuildRoomRequest =
  async (data: any): Promise<AxiosResponse<IAxiosResult>> => {
    return await methods.post(
      `${MainUrl}/api/GuildRoomRequest/InvastigationAndAcceptByMainlocationSecretriatForProvinceGuildRoomRequest`,
      data
    );
  };
const InvastigationAndRejectByMainlocationSecretriatForProvinceGuildRoomRequest =
  async (data: any): Promise<AxiosResponse<IAxiosResult>> => {
    return await methods.post(
      `${MainUrl}/api/GuildRoomRequest/InvastigationAndRejectByMainlocationSecretriatForProvinceGuildRoomRequest`,
      data
    );
  };
const InvastigationAndRejectByProvinceSecretriatForCountyGuildRoomRequest =
  async (data: any): Promise<AxiosResponse<IAxiosResult>> => {
    return await methods.post(
      `${MainUrl}/api/GuildRoomRequest/InvastigationAndRejectByProvinceSecretriatForCountyGuildRoomRequest`,
      data
    );
  };
const SetManagerIdeaAboutProvinceGuildRoomRequest = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/GuildRoomRequest/SetManagerIdeaAboutProvinceGuildRoomRequest`,
    data
  );
};
const SetMangerIdeaAboutCountyGuildRoomRequest = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/GuildRoomRequest/SetMangerIdeaAboutCountyGuildRoomRequest`,
    data
  );
};
const GetSecretariatCartableOfProvinceGuildRoomRequests = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/GuildRoomRequest/GetSecretariatCartableOfProvinceGuildRoomRequests`,
    data
  );
};
const GetItManagerCartableCountyGuildRoomRequests = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/GuildRoomRequest/GetItManagerCartableCountyGuildRoomRequests`,
    data
  );
};
const ActiveProvinceGuildRoomByItManger = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/GuildRoomRequest/ActiveProvinceGuildRoomByItManger`,
    data
  );
};
const ActiveCountyGuildRoomByItManger = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/GuildRoomRequest/ActiveCountyGuildRoomByItManger`,
    data
  );
};
const GetItManagerCartableOfProvinceGuildRoomRequests = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/GuildRoomRequest/GetItManagerCartableOfProvinceGuildRoomRequests`,
    data
  );
};
const GetProvinceGuildRoomRequestDetails = async (
  guildRoomRequestId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/GuildRoomRequest/GetProvinceGuildRoomRequestDetails?guildRoomRequestId=${guildRoomRequestId}`
  );
};
const GetCountyGuildRoomRequestDetails = async (
  guildRoomRequestId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/GuildRoomRequest/GetCountyGuildRoomRequestDetails?guildRoomRequestId=${guildRoomRequestId}`
  );
};
const GetCountyRequestForItManager = async (
  guildRoomRequestId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/GuildRoomRequest/GetCountyGuildRoomRequestDetailsForItManager?guildRoomRequestId=${guildRoomRequestId}`
  );
};
const GetSecretariatOfCountyGuildRoomRequest = async (
  guildRoomRequestId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/GuildRoomRequest/GetSecretariatOfCountyGuildRoomRequest?positionRequestId=${guildRoomRequestId}`
  );
};
const GetSecretariatOfProvinceCountyGuildRoomRequest = async (
  guildRoomRequestId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/GuildRoomRequest/GetSecretariatOfProvinceCountyGuildRoomRequest?positionRequestId=${guildRoomRequestId}`
  );
};
const GetProvinceGuildRoomRequestDetailsForProvinceAdmin = async (
  guildRoomRequestId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/GuildRoomRequest/GetProvinceGuildRoomRequestDetailsForProvinceAdmin?guildRoomRequestId=${guildRoomRequestId}`
  );
};

const GetAllProvinceGuilDRooomRequestHistory = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/GuildRoomRequest/GetAllProvinceGuilDRooomRequestHistory`,
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
const GetAllCountyGuilDRooomRequestHistory = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/GuildRoomRequest/GetAllCountyGuilDRooomRequestHistory`,
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
const SendGuildRoomRequestForInvestigation = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/GuildRoomRequest/SendGuildRoomRequestForInvestigation?requestId=${id}`
  );
};
const SelectCountyGuildRoomRequestByIdBySecretariat = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/GuildRoomRequest/SelectCountyGuildRoomRequestByIdBySecretariat?requestId=${id}`
  );
};
const SelectProvinceGuildRoomRequestByIdBySecretariat = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/GuildRoomRequest/SelectProvinceGuildRoomRequestByIdBySecretariat?requestId=${id}`
  );
};
export const useGetProvinceGuildRoomRequestDetailsForProvinceAdmin = () => {
  return useMutation(GetProvinceGuildRoomRequestDetailsForProvinceAdmin, {});
};
export const useGetSecretariatOfProvinceCountyGuildRoomRequest = () => {
  return useMutation(GetSecretariatOfProvinceCountyGuildRoomRequest, {});
};
export const useGetSecretariatOfCountyGuildRoomRequest = () => {
  return useMutation(GetSecretariatOfCountyGuildRoomRequest, {});
};
export const useGetItManagerCartableOfProvinceGuildRoomRequests = () => {
  return useMutation(GetItManagerCartableOfProvinceGuildRoomRequests, {});
};
export const useActiveCountyGuildRoomByItManger = () => {
  return useMutation(ActiveCountyGuildRoomByItManger, {});
};
export const useActiveProvinceGuildRoomByItManger = () => {
  return useMutation(ActiveProvinceGuildRoomByItManger, {});
};
export const useGetItManagerCartableCountyGuildRoomRequests = () => {
  return useMutation(GetItManagerCartableCountyGuildRoomRequests, {});
};
export const useGetSecretariatCartableOfProvinceGuildRoomRequests = () => {
  return useMutation(GetSecretariatCartableOfProvinceGuildRoomRequests, {});
};
export const useSelectProvinceGuildRoomRequestByIdBySecretariat = () => {
  return useMutation(SelectProvinceGuildRoomRequestByIdBySecretariat, {});
};
export const useInvastigationAndRejectByProvinceSecretriatForCountyGuildRoomRequest =
  () => {
    return useMutation(
      InvastigationAndRejectByProvinceSecretriatForCountyGuildRoomRequest,
      {}
    );
  };
export const useInvastigationAndRejectByMainlocationSecretriatForProvinceGuildRoomRequest =
  () => {
    return useMutation(
      InvastigationAndRejectByMainlocationSecretriatForProvinceGuildRoomRequest,
      {}
    );
  };
export const useSelectCountyGuildRoomRequestByIdBySecretariat = () => {
  return useMutation(SelectCountyGuildRoomRequestByIdBySecretariat, {});
};
export const useInvastigationAndAcceptByMainlocationSecretriatForProvinceGuildRoomRequest =
  () => {
    return useMutation(
      InvastigationAndAcceptByMainlocationSecretriatForProvinceGuildRoomRequest,
      {}
    );
  };
export const useInvastigationAndAcceptByProvinceSecretriatForCountyGuildRoomRequest =
  () => {
    return useMutation(
      InvastigationAndAcceptByProvinceSecretriatForCountyGuildRoomRequest,
      {}
    );
  };

export const useGetSecretariatCartableOfCountyGuildRoomRequests = () => {
  return useMutation(GetSecretariatCartableOfCountyGuildRoomRequests, {});
};
export const useGetAllCountyGuildRoomRequestsByManagerAndSecretariat = () => {
  return useMutation(GetAllCountyGuildRoomRequestsByManagerAndSecretariat, {});
};
export const useGetAllProvinceGuildRoomRequestsByManagerAndSecretariat = () => {
  return useMutation(
    GetAllProvinceGuildRoomRequestsByManagerAndSecretariat,
    {}
  );
};
export const useSendGuildRoomRequestForInvestigation = () => {
  return useMutation(SendGuildRoomRequestForInvestigation, {});
};
export const useGetCountyRequestForItManager = () => {
  return useMutation(GetCountyRequestForItManager, {});
};
export const useGetCountyGuildRoomRequestDetails = () => {
  return useMutation(GetCountyGuildRoomRequestDetails, {});
};
export const useGetProvinceGuildRoomRequestDetails = () => {
  return useMutation(GetProvinceGuildRoomRequestDetails, {});
};
export const useGetMyCountyGuildRoomRequestsByCountyId = () => {
  return useMutation(GetMyCountyGuildRoomRequestsByCountyId, {});
};
export const useGetMyProvinceGuildRoomRequestsByProvinceId = () => {
  return useMutation(GetMyProvinceGuildRoomRequestsByProvinceId, {});
};
export const useSetCountyGuildRoomRequestDocument = () => {
  return useMutation(SetCountyGuildRoomRequestDocument, {});
};
export const useSetProvinceGuildRoomRequestDocument = () => {
  return useMutation(SetProvinceGuildRoomRequestDocument, {});
};
export const useSetMainLocationGuildRoomBankInfo = () => {
  return useMutation(SetMainLocationGuildRoomBankInfo, {});
};
export const useSetProvinceGuildRoomRequestBankInfo = () => {
  return useMutation(SetProvinceGuildRoomRequestBankInfo, {});
};
export const useSetCountyGuildRoomRequestBankInfo = () => {
  return useMutation(SetCountyGuildRoomRequestBankInfo, {});
};
export const useSetUnionRequestBankInfo = () => {
  return useMutation(SetUnionRequestBankInfo, {});
};
export const useGetManagerCartableOfProvinceGuildRoomRequests = () => {
  return useMutation(GetManagerCartableOfProvinceGuildRoomRequests, {});
};
export const useGetViceManagerCartableCountyGuildRoomRequests = () => {
  return useMutation(GetViceManagerCartableCountyGuildRoomRequests, {});
};
export const useGetExecutiveManagerCartableOfProvinceGuildRoomRequests = () => {
  return useMutation(
    GetExecutiveManagerCartableOfProvinceGuildRoomRequests,
    {}
  );
};
export const useGetExecutiveManagerCartableCountyGuildRoomRequests = () => {
  return useMutation(GetExecutiveManagerCartableCountyGuildRoomRequests, {});
};
export const useGetViceManagerCartableOfProvinceGuildRoomRequests = () => {
  return useMutation(GetViceManagerCartableOfProvinceGuildRoomRequests, {});
};
export const useGetManagerCartableOfCountyGuildRoomRequests = () => {
  return useMutation(GetManagerCartableOfCountyGuildRoomRequests, {});
};
export const useSetManagerIdeaAboutProvinceGuildRoomRequest = () => {
  return useMutation(SetManagerIdeaAboutProvinceGuildRoomRequest, {});
};
export const useSetMangerIdeaAboutCountyGuildRoomRequest = () => {
  return useMutation(SetMangerIdeaAboutCountyGuildRoomRequest, {});
};
export const useGetAllProvinceGuilDRooomRequestHistory = () => {
  return useMutation(GetAllProvinceGuilDRooomRequestHistory, {});
};
export const useGetMyProvinceGuilDRooomRequestHistory = () => {
  return useMutation(GetMyProvinceGuilDRooomRequestHistory, {});
};
export const useGetAllCountyGuilDRooomRequestHistory = () => {
  return useMutation(GetAllCountyGuilDRooomRequestHistory, {});
};
export const useGetMyCountyGuilDRooomRequestHistory = () => {
  return useMutation(GetMyCountyGuilDRooomRequestHistory, {});
};
