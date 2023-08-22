import { AxiosResponse } from "axios";
import { useMutation, useQuery } from "react-query";
import { IAllCountyPositionRequest } from "../../models";
import { IAxiosResult } from "../../models/axios-result.model";
import { IAllUnionPositionRequest } from "../../models/union-position-request.model";
import methods from "../interceptors/http.interceptor";
import { IAllProvincePositionRequest } from "./../../models/province-position-request.model";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const postCreatePositionRequestInCountyUnion = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}​/api/CountyUnionPositionRequset/CreatePositionRequestInCountyUnion`,
    data
  );
};
const getCountyGuildRoomPositionRequestInquiries = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/CountyGuildRoomPositionRequset/GetCountyGuildRoomPositionRequestInquiries?positionRequestId=${id}`
  );
};
const getCountyGuildRoomPositionRequestGuarantorCount = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/CountyGuildRoomPositionRequset/GetCountyGuildRoomPositionRequestGuarantorCount?positionRequestId=${id}`
  );
};
const getCountyUnionPositionRequestGuarantorCount = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/CountyUnionPositionRequset/GetCountyUnionPositionRequestGuarantorCount?positionRequestId=${id}`
  );
};
const getMainLocationGuildRoomPositionRequestGuarantorCount = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/MainLocationGuildRoomPositionRequset/GetMainLocationGuildRoomPositionRequestGuarantorCount?positionRequestId=${id}`
  );
};
const getProvinceGuildRoomPositionRequestGuarantorCount = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/ProvinceGuildRoomPositionRequset/GetProvinceGuildRoomPositionRequestGuarantorCount?positionRequestId=${id}`
  );
};

export const useGetProvinceGuildRoomPositionRequestGuarantorCount = (
  id: string | number
) => {
  return useQuery("getProvinceGuildRoomPositionRequestGuarantorCount", () =>
    getProvinceGuildRoomPositionRequestGuarantorCount(id)
  );
};
export const useGetMainLocationGuildRoomPositionRequestGuarantorCount = (
  id: string | number
) => {
  return useQuery("getMainLocationGuildRoomPositionRequestGuarantorCount", () =>
    getMainLocationGuildRoomPositionRequestGuarantorCount(id)
  );
};
export const useGetCountyUnionPositionRequestGuarantorCount = (
  id: string | number
) => {
  return useQuery("getCountyUnionPositionRequestGuarantorCount", () =>
    getCountyUnionPositionRequestGuarantorCount(id)
  );
};
export const useGetCountyGuildRoomPositionRequestGuarantorCount = (
  id: string | number
) => {
  return useQuery("getCountyGuildRoomPositionRequestGuarantorCount", () =>
    getCountyGuildRoomPositionRequestGuarantorCount(id)
  );
};
const GetGuarantorsRequiermentOfCountyGuildRoomPositionRequest = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/CountyGuildRoomPositionRequset/GetGuarantorsRequiermentOfCountyGuildRoomPositionRequest?positionRequestId=${id}`
  );
};
const GetGuarantorsRequiermentOfCountyUnionPositionRequest = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/CountyUnionPositionRequset/GetGuarantorsRequiermentOfCountyUnionPositionRequest?positionRequestId=${id}`
  );
};
const GetGuarantorsRequiermentOfMainLocationGuildRoomPositionRequest = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/MainLocationGuildRoomPositionRequset/GetGuarantorsRequiermentOfMainLocationGuildRoomPositionRequest?positionRequestId=${id}`
  );
};
const GetGuarantorsRequiermentOfProvinceGuildRoomPositionRequest = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/ProvinceGuildRoomPositionRequset/GetGuarantorsRequiermentOfProvinceGuildRoomPositionRequest?positionRequestId=${id}`
  );
};
export const useGetGuarantorsRequiermentOfCountyGuildRoomPositionRequest = (
  id: string | number
) => {
  return useQuery(
    "GetGuarantorsRequiermentOfCountyGuildRoomPositionRequest",
    () => GetGuarantorsRequiermentOfCountyGuildRoomPositionRequest(id)
  );
};
export const useGetGuarantorsRequiermentOfCountyUnionPositionRequest = (
  id: string | number
) => {
  return useQuery("GetGuarantorsRequiermentOfCountyUnionPositionRequest", () =>
    GetGuarantorsRequiermentOfCountyUnionPositionRequest(id)
  );
};
export const useGetGuarantorsRequiermentOfMainLocationGuildRoomPositionRequest =
  (id: string | number) => {
    return useQuery(
      "GetGuarantorsRequiermentOfMainLocationGuildRoomPositionRequest",
      () => GetGuarantorsRequiermentOfMainLocationGuildRoomPositionRequest(id)
    );
  };
export const useGetGuarantorsRequiermentOfProvinceGuildRoomPositionRequest = (
  id: string | number
) => {
  return useQuery(
    "GetGuarantorsRequiermentOfProvinceGuildRoomPositionRequest",
    () => GetGuarantorsRequiermentOfProvinceGuildRoomPositionRequest(id)
  );
};
const GetCountyGuildRoomPositionRequestGuarantorsAndAttachment = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/CountyGuildRoomPositionRequset/GetCountyGuildRoomPositionRequestGuarantorsAndAttachment?positionRequestId=${id}`
  );
};
const GetCountyUnionPositionRequestGuarantorsAndAttachments = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/CountyUnionPositionRequset/GetCountyUnionPositionRequestGuarantorsAndAttachments?positionRequestId=${id}`
  );
};
const GetMainLocationGuildRoomPositionRequestGuarantorsAndAttachments = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/MainLocationGuildRoomPositionRequset/GetMainLocationGuildRoomPositionRequestGuarantorsAndAttachments?positionRequestId=${id}`
  );
};
const GetProvinceGuildRoomPositionRequestGuarantorsAndAttachments = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/ProvinceGuildRoomPositionRequset/GetProvinceGuildRoomPositionRequestGuarantorsAndAttachments?positionRequestId=${id}`
  );
};
export const useGetCountyGuildRoomPositionRequestGuarantorsAndAttachment =
  () => {
    return useMutation(
      GetCountyGuildRoomPositionRequestGuarantorsAndAttachment,
      {}
    );
  };
export const useGetCountyUnionPositionRequestGuarantorsAndAttachments = () => {
  return useMutation(GetCountyUnionPositionRequestGuarantorsAndAttachments, {});
};
export const useGetMainLocationGuildRoomPositionRequestGuarantorsAndAttachments =
  () => {
    return useMutation(
      GetMainLocationGuildRoomPositionRequestGuarantorsAndAttachments,
      {}
    );
  };
export const useGetProvinceGuildRoomPositionRequestGuarantorsAndAttachments =
  () => {
    return useMutation(
      GetProvinceGuildRoomPositionRequestGuarantorsAndAttachments,
      {}
    );
  };
const getUserSignature = async (): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(`${MainUrl}/api/PositionRequest/GetUserSignature`);
};
const getCountyUnionPositionRequestInquiries = async (
  id: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/CountyUnionPositionRequset/GetCountyUnionPositionRequestInquiries?positionRequestId=${id}`
  );
};
const getMainLocationGuildRoomPositionRequestInquiries = async (
  id: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/MainLocationGuildRoomPositionRequset/GetMainLocationGuildRoomPositionRequestInquiries?positionRequestId=${id}`
  );
};

const getProvinceGuildRoomPositionRequestInquiries = async (
  id: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/ProvinceGuildRoomPositionRequset/GetProvinceGuildRoomPositionRequestInquiries?positionRequestId=${id}`
  );
};
const getConfirmInquiriesByManager = async (
  id: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/PositionRequest/ConfirmInquiriesByManager?positionRequestId=${id}`
  );
};
const postGetMyPositionRequestsIncountyUnionByFilter = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}​/api/CountyUnionPositionRequset/GetMyPositionRequestsIncountyUnionByFilter`,
    data
  );
};
const getMyCountyUnionPositionRequestDetailsById = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}​/api/CountyUnionPositionRequset/GetMyCountyUnionPositionRequestDetailsById?positionRequestId=${id}`
  );
};
const postCreatePositionRequestInCountyGuildRoom = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}​/api/CountyGuildRoomPositionRequset/CreatePositionRequestInCountyGuildRoom`,
    data
  );
};
const postGetMyCountyPositionRequestsByFilter = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}​/api/CountyGuildRoomPositionRequset/GetMyCountyPositionRequestsByFilter`,
    data
  );
};
const postGetMainLocationGuildRoomPosition = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}​/api/Position/GetMainLocationGuildRoomPosition`,
    data
  );
};
const postCreatePositionRequestInMainGuildRoom = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}​/api/MainLocationGuildRoomPositionRequset/CreatePositionRequestInProvincGuildRoom`,
    data
  );
};

const postGetMyMainLocationPositionRequestsByFilter = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/MainLocationGuildRoomPositionRequset/GetMyMainLocationPositionRequestsByFilter`,
    data
  );
};

const postGetAllPositionRequestInMainLocationGuildRoomByFilter = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/MainLocationGuildRoomPositionRequset/GetAllPositionRequestInMainLocationGuildRoomByFilter`,
    data
  );
};
const postGetSecretariatCartableOfPositionRequestInMainLocationGuildRoomByFilter =
  async (data: any): Promise<AxiosResponse<IAxiosResult>> => {
    return await methods.post(
      `${MainUrl}/api/MainLocationGuildRoomPositionRequset/GetSecretariatCartableOfPositionRequestInMainLocationGuildRoomByFilter`,
      data
    );
  };
const postGetAllPosition = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}/api/Position/GetAllPosition`, data);
};
const getMyMainLocationPositionRequestDetailsById = async (
  id: string | number
) => {
  return await methods.get(
    `${MainUrl}​/api/MainLocationGuildRoomPositionRequset/GetMyMainLocationPositionRequestDetailsById?positionRequestId=${id}`
  );
};

const getGetMainLocationGuildRoomPositionRequestDetailsById = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}​/api/MainLocationGuildRoomPositionRequset/GetMainLocationGuildRoomPositionRequestDetailsById?positionRequestId=${id}`
  );
};
const getSelectPositionRequestInMainLocationGuildRoomByIdBySecretariat = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}​/api/MainLocationGuildRoomPositionRequset/SelectPositionRequestInMainLocationGuildRoomByIdBySecretariat?positionRequestId=${id}`
  );
};
const getSelectPositionRequestInCountyGuildRoomByIdBySecretariat = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}​/api/CountyGuildRoomPositionRequset/SelectPositionRequestInCountyGuildRoomByIdBySecretariat?positionRequestId=${id}`
  );
};
const getSelectPositionRequestInCountyUnionByIdBySecretariat = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}​/api/CountyUnionPositionRequset/SelectPositionRequestInCountyUnionByIdBySecretariat?positionRequestId=${id}`
  );
};
const getMyCountyPositionRequestDetailsById = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}​/api/CountyGuildRoomPositionRequset/GetMyCountyPositionRequestDetailsById?positionRequestId=${id}`
  );
};

const postCreatePositionRequestInProvincGuildRoom = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}​​/api/ProvinceGuildRoomPositionRequset/CreatePositionRequestInProvincGuildRoom`,
    data
  );
};
const postGetMyProvincePositionRequestsByFilter = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}​/api/ProvinceGuildRoomPositionRequset/GetMyProvincePositionRequestsByFilter`,
    data
  );
};

const postGetAllPositionRequestInCountyGuildRoomByFilter = async (
  data: IAllProvincePositionRequest
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/ProvinceGuildRoomPositionRequset/GetAllPositionRequestInProvinceGuildRoomByFilter`,
    data
  );
};
const postGetSecretariatCartableOfPositionRequestInProvinceGuildRoomByFilter =
  async (
    data: IAllProvincePositionRequest
  ): Promise<AxiosResponse<IAxiosResult>> => {
    return await methods.post(
      `${MainUrl}/api/ProvinceGuildRoomPositionRequset/GetSecretariatCartableOfPositionRequestInProvinceGuildRoomByFilter`,
      data
    );
  };

const postGetSecretariatCartableOfPositionRequestInCountyGuildRoomByFilter =
  async (
    data: IAllCountyPositionRequest
  ): Promise<AxiosResponse<IAxiosResult>> => {
    return await methods.post(
      `${MainUrl}/api/CountyGuildRoomPositionRequset/GetSecretariatCartableOfPositionRequestInCountyGuildRoomByFilter`,
      data
    );
  };

const postGetSecretariatCartableOfPositionRequestInCountyUnionByFilter = async (
  data: IAllUnionPositionRequest
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/CountyUnionPositionRequset/GetSecretariatCartableOfPositionRequestInCountyUnionByFilter`,
    data
  );
};

const postGetAllPositionRequestInCounty2GuildRoomByFilter = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/CountyGuildRoomPositionRequset/GetAllPositionRequestInCountyGuildRoomByFilter`,
    data
  );
};

const postGetMyPositionRequestHistory = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/PositionRequest/GetMyPositionRequestHistory`,
    data
  );
};

const getCountyGuildRoomPositionRequestDetailsById = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}​/api/CountyGuildRoomPositionRequset/GetCountyGuildRoomPositionRequestDetailsById?positionRequestId=${id}`
  );
};
const getCountyUnionPositionRequestDetailsById = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}​/api/CountyUnionPositionRequset/GetCountyUnionPositionRequestDetailsById?positionRequestId=${id}`
  );
};
const getProvinceGuildRoomPositionRequestDetailsById = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}​/api/ProvinceGuildRoomPositionRequset/GetProvinceGuildRoomPositionRequestDetailsById?positionRequestId=${id}`
  );
};
const postGetAllPositionRequestInUnionGuildRoomByFilter = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/CountyUnionPositionRequset/GetAllPositionRequestInCountyUnionByFilter`,
    data
  );
};

const getMyProvincePositionRequestDetailsById = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}​/api/ProvinceGuildRoomPositionRequset/GetMyProvincePositionRequestDetailsById?positionRequestId=${id}`
  );
};
const postCreateResumeInPositionRequest = async (
  document: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return methods.post(
    `${MainUrl}/api/Position/CreateResumeInPositionRequest`,
    document,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};

const SetCountyGuildRoomAttachmentsAndGuarantors = async (
  document: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return methods.post(
    `${MainUrl}/api/CountyGuildRoomPositionRequset/SetCountyGuildRoomAttachmentsAndGuarantors`,
    document,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};
const SetCountyUnionAttachmentsAndGuarantors = async (
  document: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return methods.post(
    `${MainUrl}/api/CountyUnionPositionRequset/SetCountyUnionAttachmentsAndGuarantors`,
    document,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};
const SetMainLocationGuildRoomAttachmentsAndGuarantors = async (
  document: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return methods.post(
    `${MainUrl}/api/MainLocationGuildRoomPositionRequset/SetMainLocationGuildRoomAttachmentsAndGuarantors`,
    document,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};
const SetProvinceGuildRoomAttachmentsAndGuarantors = async (
  document: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return methods.post(
    `${MainUrl}/api/ProvinceGuildRoomPositionRequset/SetProvinceGuildRoomAttachmentsAndGuarantors`,
    document,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};

export const useSetProvinceGuildRoomAttachmentsAndGuarantors = () => {
  return useMutation(SetProvinceGuildRoomAttachmentsAndGuarantors, {});
};
export const useSetMainLocationGuildRoomAttachmentsAndGuarantors = () => {
  return useMutation(SetMainLocationGuildRoomAttachmentsAndGuarantors, {});
};
export const useSetCountyUnionAttachmentsAndGuarantors = () => {
  return useMutation(SetCountyUnionAttachmentsAndGuarantors, {});
};
export const useSetCountyGuildRoomAttachmentsAndGuarantors = () => {
  return useMutation(SetCountyGuildRoomAttachmentsAndGuarantors, {});
};

const postUpdateMyPositionRequest = async (
  document: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return methods.post(
    `${MainUrl}/api/PositionRequest/UpdateMyPositionRequest`,
    document,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};
const UploadProvinceGuildRoomPositionRequestInquiryResponseBySecretriat =
  async (document: any): Promise<AxiosResponse<IAxiosResult>> => {
    return methods.post(
      `${MainUrl}/api/ProvinceGuildRoomPositionRequset/UploadProvinceGuildRoomPositionRequestInquiryResponseBySecretriat`,
      document,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  };

const UploadCountyGuildRooomPositionRequestInquiryResponseBySecretriat = async (
  document: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return methods.post(
    `${MainUrl}/api/CountyGuildRoomPositionRequset/UploadCountyGuildRooomPositionRequestInquiryResponseBySecretriat`,
    document,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};
const UploadPositionRequestInquiryResponseByApplicant = async (
  document: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return methods.post(
    `${MainUrl}/api/PositionRequest/UploadPositionRequestInquiryResponseByApplicant`,
    document,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};

const UploadCountyUnionPositionRequestInquiryResponseBySecretriat = async (
  document: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return methods.post(
    `${MainUrl}/api/CountyUnionPositionRequset/UploadCountyUnionPositionRequestInquiryResponseBySecretriat`,
    document,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};
const UploadMainLocationGuildRoomPositionRequestInquiryResponseBySecretriat =
  async (document: any): Promise<AxiosResponse<IAxiosResult>> => {
    return methods.post(
      `${MainUrl}/api/MainLocationGuildRoomPositionRequset/UploadMainLocationGuildRoomPositionRequestInquiryResponseBySecretriat`,
      document,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
  };
const SetUserSignature = async (
  document: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return methods.post(
    `${MainUrl}/api/PositionRequest/SetUserSignature`,
    document,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};
const postGetMyResumesInPositionRequest = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/Position/GetMyResumesInPositionRequest`,
    data
  );
};
const postSelectPositionRequestInProvinceGuildRoomByIdBySecretariat = async (
  id: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/ProvinceGuildRoomPositionRequset/SelectPositionRequestInProvinceGuildRoomByIdBySecretariat?positionRequestId=${id}`
  );
};
const GetCountyGuildRoomPostionRequestContractFile = async (
  id: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/CountyGuildRoomPositionRequset/GetCountyGuildRoomPostionRequestContractFile?positionRequestId=${id}`,
    {
      responseType: "blob",
    }
  );
};
const GetCountyUnionPostionRequestContractFile = async (
  id: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/CountyUnionPositionRequset/GetCountyUnionPostionRequestContractFile?positionRequestId=${id}`,
    {
      responseType: "blob",
    }
  );
};
const GetMainLocationGuildRoomPostionRequestContractFile = async (
  id: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/MainLocationGuildRoomPositionRequset/GetMainLocationGuildRoomPostionRequestContractFile?positionRequestId=${id}`,
    {
      responseType: "blob",
    }
  );
};
const GetProvinceGuildRoomPostionRequestContractFile = async (
  id: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/ProvinceGuildRoomPositionRequset/GetProvinceGuildRoomPostionRequestContractFile?positionRequestId=${id}`,
    {
      responseType: "blob",
    }
  );
};
const GetDetailsProvinceGuildRooomPositionRequestByTreasurer = async (
  id: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/ProvinceGuildRoomPositionRequset/GetDetailsProvinceGuildRooomPositionRequestByTreasurer?positionRequestId=${id}`
  );
};
const GetCountyUnionPositionRequestInquiryLetter = async (
  id: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/CountyUnionPositionRequset/GetCountyUnionPositionRequestInquiryLetter?positionRequestInquiryId=${id}`,
    {
      responseType: "blob",
    }
  );
};
const GetCountyGuildRoomPositionRequestInquiryLetter = async (
  id: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/CountyGuildRoomPositionRequset/GetCountyGuildRoomPositionRequestInquiryLetter?positionRequestInquiryId=${id}`,
    {
      responseType: "blob",
    }
  );
};
const GetProvinceGuildRoomPositionRequestInquiryLetter = async (
  id: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/ProvinceGuildRoomPositionRequset/GetProvinceGuildRoomPositionRequestInquiryLetter?positionRequestInquiryId=${id}`,
    {
      responseType: "blob",
    }
  );
};
const GetMainLocationGuildRoomPositionRequestInquiryLetter = async (
  id: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/MainLocationGuildRoomPositionRequset/GetMainLocationGuildRoomPositionRequestInquiryLetter?positionRequestInquiryId=${id}`,
    {
      responseType: "blob",
    }
  );
};
const GetPositionRequestInquiryLetterByIdForUserApplicant = async (
  id: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/PositionRequest/GetPositionRequestInquiryLetterByIdForUserApplicant?positionRequestInquiryId=${id}`,
    {
      responseType: "blob",
    }
  );
};

export const useGetPositionRequestInquiryLetterByIdForUserApplicant = (
  id: string | number
) => {
  return useQuery("GetPositionRequestInquiryLetterByIdForUserApplicant", () =>
    GetPositionRequestInquiryLetterByIdForUserApplicant(id)
  );
};

export const useGetMainLocationGuildRoomPositionRequestInquiryLetter = (
  id: string | number
) => {
  return useQuery("GetMainLocationGuildRoomPositionRequestInquiryLetter", () =>
    GetMainLocationGuildRoomPositionRequestInquiryLetter(id)
  );
};
export const useGetProvinceGuildRoomPositionRequestInquiryLetter = (
  id: string | number
) => {
  return useQuery("GetProvinceGuildRoomPositionRequestInquiryLetter", () =>
    GetProvinceGuildRoomPositionRequestInquiryLetter(id)
  );
};
export const useGetCountyGuildRoomPositionRequestInquiryLetter = (
  id: string | number
) => {
  return useQuery("GetCountyGuildRoomPositionRequestInquiryLetter", () =>
    GetCountyGuildRoomPositionRequestInquiryLetter(id)
  );
};
export const useGetCountyUnionPositionRequestInquiryLetter = (
  id: string | number
) => {
  return useQuery("GetCountyUnionPositionRequestInquiryLetter", () =>
    GetCountyUnionPositionRequestInquiryLetter(id)
  );
};
const GetDetailsMainLocationGuildRooomPositionRequestByTreasurer = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/MainLocationGuildRoomPositionRequset/GetDetailsMainLocationGuildRooomPositionRequestByTreasurer?positionRequestId=${id}`
  );
};
const GetDetailsCountyUnionPositionRequestByTreasurer = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/CountyUnionPositionRequset/GetDetailsCountyUnionPositionRequestByTreasurer?positionRequestId=${id}`
  );
};
const GetDetailsCountyGuildRoomPositionRequestByTreasurer = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/CountyGuildRoomPositionRequset/GetDetailsCountyGuildRoomPositionRequestByTreasurer?positionRequestId=${id}`
  );
};

const postInvestigateAndAcceptBySecretriat = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/PositionRequest/InvestigateAndAcceptBySecretriat`,
    data
  );
};
const postInvestigateAndAcceptByManager = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/PositionRequest/InvestigateAndAcceptByManager`,
    data
  );
};
const postRejectBySecretriat = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/PositionRequest/RejectBySecretriat`,
    data
  );
};
const postRejectByManager = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/PositionRequest/RejectByManager`,
    data
  );
};

const postGetTreasurerCartableOfPositionRequestInCountyUnionByFilter = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/CountyUnionPositionRequset/GetAllCountyUnionPositionRequestByTreasurer`,
    data
  );
};
const postGetTreasurerCartableOfPositionRequestInCountyGuildRoomByFilter =
  async (data: any): Promise<AxiosResponse<IAxiosResult>> => {
    return await methods.post(
      `${MainUrl}/api/CountyGuildRoomPositionRequset/GetAllCountyGuildRoomPositionRequestByTreasurer`,
      data
    );
  };
const postGetTreasurerCartableOfPositionRequestInMainLocationGuildRoomByFilter =
  async (data: any): Promise<AxiosResponse<IAxiosResult>> => {
    return await methods.post(
      `${MainUrl}/api/MainLocationGuildRoomPositionRequset/GetAllMainLocationGuildRooomPositionRequestByTreasurer`,
      data
    );
  };
const postGetTreasurerCartableOfPositionRequestInProvinceGuildRoomByFilter =
  async (data: any): Promise<AxiosResponse<IAxiosResult>> => {
    return await methods.post(
      `${MainUrl}/api/ProvinceGuildRoomPositionRequset/GetAllProvinceGuildRooomPositionRequestByTreasurer`,
      data
    );
  };
const getCountyGuildRoomPositionRequestDetailsByIdByTreasurer = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/CountyGuildRoomPositionRequset/GetDetailsCountyGuildRoomPositionRequestByTreasurer?positionRequestId=${id}`
  );
};
const getCountyUnionPositionRequestDetailsByIdByTreasurer = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/CountyUnionPositionRequset/GetDetailsCountyUnionPositionRequestByTreasurer?positionRequestId=${id}`
  );
};
const getMainLocationGuildRoomPositionRequestDetailsByIdByTreasurer = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/MainLocationGuildRoomPositionRequset/GetDetailsMainLocationGuildRooomPositionRequestByTreasurer?positionRequestId=${id}`
  );
};
const getProvinceGuildRoomPositionRequestDetailsByIdByTreasurer = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/ProvinceGuildRoomPositionRequset/GetDetailsProvinceGuildRooomPositionRequestByTreasurer?positionRequestId=${id}`
  );
};

const getCountyGuildRoomInquiryLetter = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/CountyGuildRoomPositionRequset/GetCountyGuildRoomInquiryLetter?positionRequestId=${data.positionRequestId}&inquiryId=${data.inquiryId}`
  );
};
const getMainLocationGuildRoomInquiryLetter = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/MainLocationGuildRoomPositionRequset/GetMainLocationGuildRoomInquiryLetter?positionRequestId=${data.positionRequestId}&inquiryId=${data.inquiryId}`
  );
};
const GetCountyGuildRooomPositionRequestInquiryFiles = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/CountyGuildRoomPositionRequset/GetCountyGuildRooomPositionRequestInquiryFiles?positionRequestInquiryId=${data}`
  );
};
const GetCountyUnionPositionRequestInquiryFiles = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/CountyUnionPositionRequset/GetCountyUnionPositionRequestInquiryFiles?positionRequestInquiryId=${data}`
  );
};
const GetMainLocationGuildRoomPositionRequestInquiryFiles = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/MainLocationGuildRoomPositionRequset/GetMainLocationGuildRoomPositionRequestInquiryFiles?positionRequestInquiryId=${data}`
  );
};
const GetProvinceGuildRoomPositionRequestInquiryFiles = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/ProvinceGuildRoomPositionRequset/GetProvinceGuildRoomPositionRequestInquiryFiles?positionRequestInquiryId=${data}`
  );
};
const getCountyUnionInquiryLetter = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/CountyUnionPositionRequset/GetCountyUnionInquiryLetter?positionRequestId=${data.positionRequestId}&inquiryId=${data.inquiryId}`
  );
};
const getProvinceGuildRoomInquiryLetter = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/ProvinceGuildRoomPositionRequset/GetProvinceGuildRoomInquiryLetter?positionRequestId=${data.positionRequestId}&inquiryId=${data.inquiryId}`
  );
};
const IsActiveUpLevelMangerInProvinceGuildRooom = async (): Promise<
  AxiosResponse<any>
> => {
  return await methods.get(
    `${MainUrl}/api/ProvinceGuildRoomPositionRequset/IsActiveUpLevelMangerInProvinceGuildRooom`
  );
};
const IsActiveUpLevelMangerInCountyGuildRoom = async (): Promise<
  AxiosResponse<any>
> => {
  return await methods.get(
    `${MainUrl}/api/CountyGuildRoomPositionRequset/IsActiveUpLevelMangerInCountyGuildRoom`
  );
};
const IsActiveUpLevelMangerInCountyUnion = async (): Promise<
  AxiosResponse<any>
> => {
  return await methods.get(
    `${MainUrl}/api/CountyUnionPositionRequset/IsActiveUpLevelMangerInCountyUnion`
  );
};
const IsActiveUpLevelMangerInMainLocationGuildRooom = async (): Promise<
  AxiosResponse<any>
> => {
  return await methods.get(
    `${MainUrl}/api/MainLocationGuildRoomPositionRequset/IsActiveUpLevelMangerInMainLocationGuildRooom`
  );
};
const postGetCountyGuildRoomMyPositionRequestHistoryByFilter = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/CountyGuildRoomPositionRequset/GetCountyGuildRoomPositionRequestHistoryByFilter`,
    data
  );
};
const postGetCountyUnionMyPositionRequestHistoryByFilter = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/CountyUnionPositionRequset/GetCountyUnionPositionRequestHistoryByFilter`,
    data
  );
};
const postGetResumesInCountyUnionPositionRequestByFilter = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/CountyUnionPositionRequset/GetResumesInCountyUnionPositionRequestByFilter`,
    data
  );
};

const postGetResumesInCountyGuildRoomPositionRequestByFilter = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/CountyGuildRoomPositionRequset/GetResumesInCountyGuildRoomPositionRequestByFilter`,
    data
  );
};
const postGetResumesInProvinceGuildRoomPositionRequestByFilter = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/ProvinceGuildRoomPositionRequset/GetResumesInProvinceGuildRoomPositionRequestByFilter`,
    data
  );
};
const postGetMainLocationGuildRoomMyPositionRequestHistoryByFilter = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/MainLocationGuildRoomPositionRequset/GetMainLocationGuildRoomPositionRequestHistoryByFilter`,
    data
  );
};

const postGetResumesInMainLocationGuildRoomPositionRequestByFilter = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/MainLocationGuildRoomPositionRequset/GetResumesInMainLocationGuildRoomPositionRequestByFilter`,
    data
  );
};

const postGetProvinceGuildRoomPositionRequestHistoryByFilter = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/ProvinceGuildRoomPositionRequset/GetProvinceGuildRoomPositionRequestHistoryByFilter`,
    data
  );
};

const postArchiveBySecrtriatInMainLocationGuildRoom = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/MainLocationGuildRoomPositionRequset/ArchiveBySecrtriatInMainLocationGuildRoom`,
    data
  );
};
const postArchiveBySecrtriatInProvinceGuildRoom = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/ProvinceGuildRoomPositionRequset/ArchiveBySecrtriatInProvinceGuildRoom`,
    data
  );
};

const postArchiveBySecrtriatInCountyUnion = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/CountyUnionPositionRequset/ArchiveBySecrtriatInCountyUnion`,
    data
  );
};
const postArchiveBySecrtriatInCountyGuildRoom = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/CountyGuildRoomPositionRequset/ArchiveBySecrtriatInCountyGuildRoom`,
    data
  );
};
export const usePostGetProvinceGuildRoomPositionRequestInquiryFiles = () => {
  return useMutation(GetProvinceGuildRoomPositionRequestInquiryFiles, {});
};
export const usePostGetMainLocationGuildRoomPositionRequestInquiryFiles =
  () => {
    return useMutation(GetMainLocationGuildRoomPositionRequestInquiryFiles, {});
  };
export const usePostGetCountyUnionPositionRequestInquiryFiles = () => {
  return useMutation(GetCountyUnionPositionRequestInquiryFiles, {});
};
export const usePostGetCountyGuildRooomPositionRequestInquiryFiles = () => {
  return useMutation(GetCountyGuildRooomPositionRequestInquiryFiles, {});
};
export const usePostGetResumesInMainLocationGuildRoomPositionRequestByFilter =
  () => {
    return useMutation(
      postGetResumesInMainLocationGuildRoomPositionRequestByFilter,
      {}
    );
  };
export const usePostArchiveBySecrtriatInCountyUnion = () => {
  return useMutation(postArchiveBySecrtriatInCountyUnion, {});
};
export const usePostArchiveBySecrtriatInCountyGuildRoom = () => {
  return useMutation(postArchiveBySecrtriatInCountyGuildRoom, {});
};
export const usePostArchiveBySecrtriatInMainLocationGuildRoom = () => {
  return useMutation(postArchiveBySecrtriatInMainLocationGuildRoom, {});
};
export const usePostArchiveBySecrtriatInProvinceGuildRoom = () => {
  return useMutation(postArchiveBySecrtriatInProvinceGuildRoom, {});
};
const getCountyGuildRoomPositionRequestDetailsByIdByUpManager = async (
  id: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/CountyGuildRoomPositionRequset/GetCountyGuildRoomPositionRequestDetailsByIdByUpManager?positionRequestId=${id}`
  );
};
const postGetResumesInCountyGuildRoomPositionRequestByFilterByUpManager =
  async (data: any): Promise<AxiosResponse<IAxiosResult>> => {
    return await methods.post(
      `${MainUrl}/api/CountyGuildRoomPositionRequset/GetResumesInCountyGuildRoomPositionRequestByFilterByUpManager`,
      data
    );
  };
const postConfirmCountyUnionPositionRequestByUpLevelManger = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/CountyUnionPositionRequset/ConfirmCountyUnionPositionRequestByUpLevelManger`,
    data
  );
};
const postRejectCountyUnionPositionRequestByUpLevelManger = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/CountyUnionPositionRequset/RejectCountyUnionPositionRequestByUpLevelManger`,
    data
  );
};

const postRejectCountyGuildRoomPositionRequestByUpLevelManger = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/CountyGuildRoomPositionRequset/RejectCountyGuildRoomPositionRequestByUpLevelManger`,
    data
  );
};
const postConfirmCountyGuildRoomPositionRequestByUpLevelManger = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/CountyGuildRoomPositionRequset/ConfirmCountyGuildRoomPositionRequestByUpLevelManger`,
    data
  );
};
const postConfirmProvinceGuildRoomPositionRequestByUpLevelManger = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/ProvinceGuildRoomPositionRequset/ConfirmProvinceGuildRoomPositionRequestByUpLevelManger`,
    data
  );
};

const postRejectProvinceGuildRoomPositionRequestByUpLevelManger = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/ProvinceGuildRoomPositionRequset/RejectProvinceGuildRoomPositionRequestByUpLevelManger`,
    data
  );
};
const getCountyUnionPositionRequestDetailsByIdByUpManager = async (
  id: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/CountyUnionPositionRequset/GetCountyUnionPositionRequestDetailsByIdByUpManager?positionRequestId=${id}`
  );
};
const postGetResumesInCountyUnionPositionRequestByFilterByUpManager = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/CountyUnionPositionRequset/GetResumesInCountyUnionPositionRequestByFilterByUpManager`,
    data
  );
};
const getProvinceGuildRoomPositionRequestDetailsByIdByUpManager = async (
  id: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/ProvinceGuildRoomPositionRequset/GetProvinceGuildRoomPositionRequestDetailsByIdByUpManager?positionRequestId=${id}`
  );
};
const postGetResumesInProvinceGuildRoomPositionRequestByFilterByUpManager =
  async (data: any): Promise<AxiosResponse<IAxiosResult>> => {
    return await methods.post(
      `${MainUrl}/api/ProvinceGuildRoomPositionRequset/GetResumesInProvinceGuildRoomPositionRequestByFilterByUpManager`,
      data
    );
  };
const postGetUpManagerCartableOfPositionRequestInCountyGuildRoomByFilter =
  async (data: any): Promise<AxiosResponse<IAxiosResult>> => {
    return await methods.post(
      `${MainUrl}/api/CountyGuildRoomPositionRequset/GetUpManagerCartableOfPositionRequestInCountyGuildRoomByFilter`,
      data
    );
  };
const postGetUpManagerCartableOfPositionRequestInCountyUnionByFilter = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/CountyUnionPositionRequset/GetUpManagerCartableOfPositionRequestInCountyUnionByFilter`,
    data
  );
};
const postGetUpManagerCartableOfPositionRequestInProvinceGuildRoomByFilter =
  async (data: any): Promise<AxiosResponse<IAxiosResult>> => {
    return await methods.post(
      `${MainUrl}/api/ProvinceGuildRoomPositionRequset/GetUpManagerCartableOfPositionRequestInProvinceGuildRoomByFilter`,
      data
    );
  };
const postAcceptProvinceGuildRoomPositionRequestInuiryResponseBySecretriat =
  async (data: any): Promise<AxiosResponse<IAxiosResult>> => {
    return await methods.post(
      `${MainUrl}/api/ProvinceGuildRoomPositionRequset/AcceptProvinceGuildRoomPositionRequestInuiryResponseBySecretriat`,
      data
    );
  };
const RejectProvinceGuildRoomPositionRequestInuiryResponseBySecretriat = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/ProvinceGuildRoomPositionRequset/RejectProvinceGuildRoomPositionRequestInuiryResponseBySecretriat`,
    data
  );
};
const AcceptMainLocationGuildRoomPositionRequestInuiryResponseBySecretriat =
  async (data: any): Promise<AxiosResponse<IAxiosResult>> => {
    return await methods.post(
      `${MainUrl}/api/MainLocationGuildRoomPositionRequset/AcceptMainLocationGuildRoomPositionRequestInuiryResponseBySecretriat`,
      data
    );
  };
const RejectMainLocationGuildRoomPositionRequestInuiryResponseBySecretriat =
  async (data: any): Promise<AxiosResponse<IAxiosResult>> => {
    return await methods.post(
      `${MainUrl}/api/MainLocationGuildRoomPositionRequset/RejectMainLocationGuildRoomPositionRequestInuiryResponseBySecretriat`,
      data
    );
  };
const AcceptCountyUnionPositionRequestInuiryResponseBySecretriat = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/CountyUnionPositionRequset/AcceptCountyUnionPositionRequestInuiryResponseBySecretriat`,
    data
  );
};
const RejectCountyUnionPositionRequestInuiryResponseBySecretriat = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/CountyUnionPositionRequset/RejectCountyUnionPositionRequestInuiryResponseBySecretriat`,
    data
  );
};
const AcceptCountyGuildRooomPositionRequestInuiryResponseBySecretriat = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/CountyGuildRoomPositionRequset/AcceptCountyGuildRooomPositionRequestInuiryResponseBySecretriat`,
    data
  );
};
const RejectCountyGuildRooomPositionRequestInuiryResponseBySecretriat = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/CountyGuildRoomPositionRequset/RejectCountyGuildRooomPositionRequestInuiryResponseBySecretriat`,
    data
  );
};
const ConfirmProvinceGuildRooomPositionRequestByManger = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/ProvinceGuildRoomPositionRequset/ConfirmProvinceGuildRooomPositionRequestByManger`,
    data
  );
};
const ConfirmMainLocationGuildRooomPositionRequestByManger = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/MainLocationGuildRoomPositionRequset/ConfirmMainLocationGuildRooomPositionRequestByManger`,
    data
  );
};
const RejectProvinceGuildRooomPositionRequestByManger = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/ProvinceGuildRoomPositionRequset/RejectProvinceGuildRooomPositionRequestByManger`,
    data
  );
};
const RejectMainLocationGuildRooomPositionRequestByManger = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/MainLocationGuildRoomPositionRequset/RejectMainLocationGuildRooomPositionRequestByManger`,
    data
  );
};
const ConfirmCountyUnionPositionRequestByManger = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/CountyUnionPositionRequset/ConfirmCountyUnionPositionRequestByManger`,
    data
  );
};
const RejectCountyUnionPositionRequestByManger = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/CountyUnionPositionRequset/RejectCountyUnionPositionRequestByManger`,
    data
  );
};
const ConfirmCountyGuildRoomPositionRequestByManger = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/CountyGuildRoomPositionRequset/ConfirmCountyGuildRoomPositionRequestByManger`,
    data
  );
};
const RejectCountyGuildRoomPositionRequestByManger = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/CountyGuildRoomPositionRequset/RejectCountyGuildRoomPositionRequestByManger`,
    data
  );
};
const SendProvinceGuildRoomPositionRequestInvitationToApplicant = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/ProvinceGuildRoomPositionRequset/SendProvinceGuildRoomPositionRequestInvitationToApplicant`,
    data
  );
};
const SendMainLocationGuildRoomPositionRequestInvitationToApplicant = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/MainLocationGuildRoomPositionRequset/SendMainLocationGuildRoomPositionRequestInvitationToApplicant`,
    data
  );
};
const SendCountyUnionPositionRequestInvitationToApplicant = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/CountyUnionPositionRequset/SendCountyUnionPositionRequestInvitationToApplicant`,
    data
  );
};
const SendCountyGuildRoomPositionRequestInvitationToApplicant = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/CountyGuildRoomPositionRequset/SendCountyGuildRoomPositionRequestInvitationToApplicant`,
    data
  );
};
const GetAllPositionRequestInCountyGuildRoomByFilterForManager = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/CountyGuildRoomPositionRequset/GetAllPositionRequestInCountyGuildRoomByFilterForManager`,
    data
  );
};
const GetAllPositionRequestInProvinceGuildRoomByFilterForManager = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/ProvinceGuildRoomPositionRequset/GetAllPositionRequestInCountyGuildRoomByFilterForManager`,
    data
  );
};
const GetAllPositionRequestInCountyUnionByFilterForManager = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/CountyUnionPositionRequset/GetAllPositionRequestInCountyUnionByFilterForManager`,
    data
  );
};
const GetAllPositionRequestInMainLocationGuildRoomByFilterForManager = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/MainLocationGuildRoomPositionRequset/GetAllPositionRequestInMainLocationGuildRoomByFilterForManager`,
    data
  );
};
const ChangeSecretariatOfCountyGuildRoomPositionRequestByManger = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/CountyGuildRoomPositionRequset/ChangeSecretariatOfCountyGuildRoomPositionRequestByManger`,
    data
  );
};
const ChangeSecretariatOfMainLocationGuildRoomPositionRequestByManger = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/MainLocationGuildRoomPositionRequset/ChangeSecretariatOfMainLocationGuildRoomPositionRequestByManger`,
    data
  );
};
const ChangeSecretariatOfCountyUnionPositionRequestByManger = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/CountyUnionPositionRequset/ChangeSecretariatOfCountyUnionPositionRequestByManger`,
    data
  );
};
const ChangeSecretariatOfProvinceGuildRoomPositionRequestByManger = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/ProvinceGuildRoomPositionRequset/ChangeSecretariatOfProvinceGuildRoomPositionRequestByManger`,
    data
  );
};
const GetAllPositionRequestInCountyGuildRoomByFilterForViceManager = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/CountyGuildRoomPositionRequset/GetAllPositionRequestInCountyGuildRoomByFilterForViceManager`,
    data
  );
};
const GetAllPositionRequestInProvinceGuildRoomByFilterForViceManager = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/ProvinceGuildRoomPositionRequset/GetAllPositionRequestInProvinceGuildRoomByFilterForViceManager`,
    data
  );
};
const GetAllPositionRequestInMainLocationGuildRoomByFilterForViceManager =
  async (data: any): Promise<AxiosResponse<IAxiosResult>> => {
    return await methods.post(
      `${MainUrl}/api/MainLocationGuildRoomPositionRequset/GetAllPositionRequestInMainLocationGuildRoomByFilterForViceManager`,
      data
    );
  };
const GetAllPositionRequestInCountyUnionByFilterForViceManager = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/CountyUnionPositionRequset/GetAllPositionRequestInCountyUnionByFilterForViceManager`,
    data
  );
};
const GetAllPositionRequestInCountyUnionByFilterForExecutiveManager = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/CountyUnionPositionRequset/GetAllPositionRequestInCountyUnionByFilterForExecutiveManager`,
    data
  );
};
const GetAllPositionRequestInCountyGuildRoomByFilterForExecutiveManager =
  async (data: any): Promise<AxiosResponse<IAxiosResult>> => {
    return await methods.post(
      `${MainUrl}/api/CountyGuildRoomPositionRequset/GetAllPositionRequestInCountyGuildRoomByFilterForExecutiveManager`,
      data
    );
  };
const GetAllPositionRequestInMainLocationGuildRoomByFilterForExecutiveManager =
  async (data: any): Promise<AxiosResponse<IAxiosResult>> => {
    return await methods.post(
      `${MainUrl}/api/MainLocationGuildRoomPositionRequset/GetAllPositionRequestInMainLocationGuildRoomByFilterForExecutiveManager`,
      data
    );
  };
const GetAllPositionRequestInProvinceGuildRoomByFilterForExecutiveManager =
  async (data: any): Promise<AxiosResponse<IAxiosResult>> => {
    return await methods.post(
      `${MainUrl}/api/ProvinceGuildRoomPositionRequset/GetAllPositionRequestInProvinceGuildRoomByFilterForExecutiveManager`,
      data
    );
  };
const GetSecretariatOfCountyCountyGuildRoomPositionRequest = async (
  positionRequestId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/CountyGuildRoomPositionRequset/GetSecretariatOfCountyCountyGuildRoomPositionRequest?positionRequestId=${positionRequestId}`
  );
};
const GetSecretariatOfCountyUnionPositionRequest = async (
  positionRequestId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/CountyUnionPositionRequset/GetSecretariatOfCountyUnionPositionRequest?positionRequestId=${positionRequestId}`
  );
};
const GetSecretariatOfMainLocationGuildRoomPositionRequest = async (
  positionRequestId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/MainLocationGuildRoomPositionRequset/GetSecretariatOfMainLocationGuildRoomPositionRequest?positionRequestId=${positionRequestId}`
  );
};
const GetSecretariatOfProvinceGuildRoomPositionRequest = async (
  positionRequestId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/ProvinceGuildRoomPositionRequset/GetSecretariatOfProvinceGuildRoomPositionRequest?positionRequestId=${positionRequestId}`
  );
};
const GetOwnedUserProvinceGuildRoomsForViceManager = async (): Promise<
  AxiosResponse<any>
> => {
  return await methods.get(
    `${MainUrl}/api/GuildRoom/GetOwnedUserProvinceGuildRoomsForViceManager`
  );
};
const GetOwnedUserProvinceGuildRoomsExecutiveManager = async (): Promise<
  AxiosResponse<any>
> => {
  return await methods.get(
    `${MainUrl}/api/GuildRoom/GetOwnedUserProvinceGuildRoomsExecutiveManager`
  );
};
const GetOwnedUserCountyGuildRoomsForExecutiveManager = async (): Promise<
  AxiosResponse<any>
> => {
  return await methods.get(
    `${MainUrl}/api/GuildRoom/GetOwnedUserCountyGuildRoomsForExecutiveManager`
  );
};
const GetOwnedUserUnionForUnionExecutiveManager = async (): Promise<
  AxiosResponse<any>
> => {
  return await methods.get(
    `${MainUrl}/api/Union/GetOwnedUserUnionForUnionExecutiveManager`
  );
};
const GetOwnedUserCountyGuildRoomsForViceManager = async (): Promise<
  AxiosResponse<any>
> => {
  return await methods.get(
    `${MainUrl}/api/GuildRoom/GetOwnedUserCountyGuildRoomsForViceManager`
  );
};
const GetOwnedUserUnionForViceManager = async (): Promise<
  AxiosResponse<any>
> => {
  return await methods.get(
    `${MainUrl}/api/Union/GetOwnedUserUnionForViceManager`
  );
};
export const useGetOwnedUserUnionForViceManager = () => {
  return useQuery(
    "GetOwnedUserUnionForViceManager",
    GetOwnedUserUnionForViceManager
  );
};
export const useGetOwnedUserCountyGuildRoomsForViceManager = () => {
  return useQuery(
    "GetOwnedUserCountyGuildRoomsForViceManager",
    GetOwnedUserCountyGuildRoomsForViceManager
  );
};
export const useGetOwnedUserUnionForUnionExecutiveManager = () => {
  return useQuery(
    "GetOwnedUserUnionForUnionExecutiveManager",
    GetOwnedUserUnionForUnionExecutiveManager
  );
};
export const useGetOwnedUserCountyGuildRoomsForExecutiveManager = () => {
  return useQuery(
    "GetOwnedUserCountyGuildRoomsForExecutiveManager",
    GetOwnedUserCountyGuildRoomsForExecutiveManager
  );
};
export const useGetOwnedUserProvinceGuildRoomsExecutiveManager = () => {
  return useQuery(
    "GetOwnedUserProvinceGuildRoomsExecutiveManager",
    GetOwnedUserProvinceGuildRoomsExecutiveManager
  );
};
export const useGetOwnedUserProvinceGuildRoomsForViceManager = () => {
  return useQuery(
    "GetOwnedUserProvinceGuildRoomsForViceManager",
    GetOwnedUserProvinceGuildRoomsForViceManager
  );
};
export const useGetAllPositionRequestInProvinceGuildRoomByFilterForExecutiveManager =
  () => {
    return useMutation(
      GetAllPositionRequestInProvinceGuildRoomByFilterForExecutiveManager,
      {}
    );
  };
export const useGetAllPositionRequestInMainLocationGuildRoomByFilterForExecutiveManager =
  () => {
    return useMutation(
      GetAllPositionRequestInMainLocationGuildRoomByFilterForExecutiveManager,
      {}
    );
  };
export const useGetAllPositionRequestInCountyGuildRoomByFilterForExecutiveManager =
  () => {
    return useMutation(
      GetAllPositionRequestInCountyGuildRoomByFilterForExecutiveManager,
      {}
    );
  };
export const useGetAllPositionRequestInCountyUnionByFilterForExecutiveManager =
  () => {
    return useMutation(
      GetAllPositionRequestInCountyUnionByFilterForExecutiveManager,
      {}
    );
  };
export const useGetAllPositionRequestInCountyUnionByFilterForViceManager =
  () => {
    return useMutation(
      GetAllPositionRequestInCountyUnionByFilterForViceManager,
      {}
    );
  };
export const useGetAllPositionRequestInMainLocationGuildRoomByFilterForViceManager =
  () => {
    return useMutation(
      GetAllPositionRequestInMainLocationGuildRoomByFilterForViceManager,
      {}
    );
  };
export const useGetAllPositionRequestInProvinceGuildRoomByFilterForViceManager =
  () => {
    return useMutation(
      GetAllPositionRequestInProvinceGuildRoomByFilterForViceManager,
      {}
    );
  };
export const useGetAllPositionRequestInCountyGuildRoomByFilterForViceManager =
  () => {
    return useMutation(
      GetAllPositionRequestInCountyGuildRoomByFilterForViceManager,
      {}
    );
  };
export const useGetSecretariatOfProvinceGuildRoomPositionRequest = () => {
  return useMutation(GetSecretariatOfProvinceGuildRoomPositionRequest, {});
};
export const useChangeSecretariatOfProvinceGuildRoomPositionRequestByManger =
  () => {
    return useMutation(
      ChangeSecretariatOfProvinceGuildRoomPositionRequestByManger,
      {}
    );
  };
export const useGetSecretariatOfMainLocationGuildRoomPositionRequest = () => {
  return useMutation(GetSecretariatOfMainLocationGuildRoomPositionRequest, {});
};
export const useGetSecretariatOfCountyUnionPositionRequest = () => {
  return useMutation(GetSecretariatOfCountyUnionPositionRequest, {});
};
export const useChangeSecretariatOfCountyUnionPositionRequestByManger = () => {
  return useMutation(ChangeSecretariatOfCountyUnionPositionRequestByManger, {});
};
export const useGetSecretariatOfCountyCountyGuildRoomPositionRequest = () => {
  return useMutation(GetSecretariatOfCountyCountyGuildRoomPositionRequest, {});
};
export const useChangeSecretariatOfMainLocationGuildRoomPositionRequestByManger =
  () => {
    return useMutation(
      ChangeSecretariatOfMainLocationGuildRoomPositionRequestByManger,
      {}
    );
  };
export const useChangeSecretariatOfCountyGuildRoomPositionRequestByManger =
  () => {
    return useMutation(
      ChangeSecretariatOfCountyGuildRoomPositionRequestByManger,
      {}
    );
  };
export const usePostGetAllPositionRequestInMainLocationGuildRoomByFilterForManager =
  () => {
    return useMutation(
      GetAllPositionRequestInMainLocationGuildRoomByFilterForManager,
      {}
    );
  };
export const usePostGetAllPositionRequestInCountyUnionByFilterForManager =
  () => {
    return useMutation(
      GetAllPositionRequestInCountyUnionByFilterForManager,
      {}
    );
  };
export const usePostGetAllPositionRequestInProvinceGuildRoomByFilterForManager =
  () => {
    return useMutation(
      GetAllPositionRequestInProvinceGuildRoomByFilterForManager,
      {}
    );
  };
export const usePostGetAllPositionRequestInCountyGuildRoomByFilterForManager =
  () => {
    return useMutation(
      GetAllPositionRequestInCountyGuildRoomByFilterForManager,
      {}
    );
  };
export const usePostSendCountyGuildRoomPositionRequestInvitationToApplicant =
  () => {
    return useMutation(
      SendCountyGuildRoomPositionRequestInvitationToApplicant,
      {}
    );
  };
export const usePostSendCountyUnionPositionRequestInvitationToApplicant =
  () => {
    return useMutation(SendCountyUnionPositionRequestInvitationToApplicant, {});
  };
export const usePostSendMainLocationGuildRoomPositionRequestInvitationToApplicant =
  () => {
    return useMutation(
      SendMainLocationGuildRoomPositionRequestInvitationToApplicant,
      {}
    );
  };
export const usePostSendProvinceGuildRoomPositionRequestInvitationToApplicant =
  () => {
    return useMutation(
      SendProvinceGuildRoomPositionRequestInvitationToApplicant,
      {}
    );
  };
export const usePostRejectCountyGuildRoomPositionRequestByManger = () => {
  return useMutation(RejectCountyGuildRoomPositionRequestByManger, {});
};
export const usePostConfirmCountyGuildRoomPositionRequestByManger = () => {
  return useMutation(ConfirmCountyGuildRoomPositionRequestByManger, {});
};
export const usePostRejectCountyUnionPositionRequestByManger = () => {
  return useMutation(RejectCountyUnionPositionRequestByManger, {});
};
export const usePostConfirmCountyUnionPositionRequestByManger = () => {
  return useMutation(ConfirmCountyUnionPositionRequestByManger, {});
};
export const usePostRejectMainLocationGuildRooomPositionRequestByManger =
  () => {
    return useMutation(RejectMainLocationGuildRooomPositionRequestByManger, {});
  };
export const usePostConfirmMainLocationGuildRooomPositionRequestByManger =
  () => {
    return useMutation(
      ConfirmMainLocationGuildRooomPositionRequestByManger,
      {}
    );
  };
export const usePostRejectProvinceGuildRooomPositionRequestByManger = () => {
  return useMutation(RejectProvinceGuildRooomPositionRequestByManger, {});
};
export const usePostConfirmProvinceGuildRooomPositionRequestByManger = () => {
  return useMutation(ConfirmProvinceGuildRooomPositionRequestByManger, {});
};
export const usePostRejectCountyGuildRooomPositionRequestInuiryResponseBySecretriat =
  () => {
    return useMutation(
      RejectCountyGuildRooomPositionRequestInuiryResponseBySecretriat,
      {}
    );
  };
export const usePostAcceptCountyGuildRooomPositionRequestInuiryResponseBySecretriat =
  () => {
    return useMutation(
      AcceptCountyGuildRooomPositionRequestInuiryResponseBySecretriat,
      {}
    );
  };
export const usePostRejectCountyUnionPositionRequestInuiryResponseBySecretriat =
  () => {
    return useMutation(
      RejectCountyUnionPositionRequestInuiryResponseBySecretriat,
      {}
    );
  };
export const usePostAcceptCountyUnionPositionRequestInuiryResponseBySecretriat =
  () => {
    return useMutation(
      AcceptCountyUnionPositionRequestInuiryResponseBySecretriat,
      {}
    );
  };
export const usePostRejectMainLocationGuildRoomPositionRequestInuiryResponseBySecretriat =
  () => {
    return useMutation(
      RejectMainLocationGuildRoomPositionRequestInuiryResponseBySecretriat,
      {}
    );
  };
export const usePostAcceptMainLocationGuildRoomPositionRequestInuiryResponseBySecretriat =
  () => {
    return useMutation(
      AcceptMainLocationGuildRoomPositionRequestInuiryResponseBySecretriat,
      {}
    );
  };
export const usePostRejectProvinceGuildRoomPositionRequestInuiryResponseBySecretriat =
  () => {
    return useMutation(
      RejectProvinceGuildRoomPositionRequestInuiryResponseBySecretriat,
      {}
    );
  };
export const usePostAcceptProvinceGuildRoomPositionRequestInuiryResponseBySecretriat =
  () => {
    return useMutation(
      postAcceptProvinceGuildRoomPositionRequestInuiryResponseBySecretriat,
      {}
    );
  };
export const usePostGetUpManagerCartableOfPositionRequestInProvinceGuildRoomByFilter =
  () => {
    return useMutation(
      postGetUpManagerCartableOfPositionRequestInProvinceGuildRoomByFilter,
      {}
    );
  };
export const usePostGetUpManagerCartableOfPositionRequestInCountyUnionByFilter =
  () => {
    return useMutation(
      postGetUpManagerCartableOfPositionRequestInCountyUnionByFilter,
      {}
    );
  };
export const usePostGetUpManagerCartableOfPositionRequestInCountyGuildRoomByFilter =
  () => {
    return useMutation(
      postGetUpManagerCartableOfPositionRequestInCountyGuildRoomByFilter,
      {}
    );
  };

export const usePostGetCountyGuildRoomMyPositionRequestHistoryByFilter = () => {
  return useMutation(
    postGetCountyGuildRoomMyPositionRequestHistoryByFilter,
    {}
  );
};
export const usePostGetCountyUnionMyPositionRequestHistoryByFilter = () => {
  return useMutation(postGetCountyUnionMyPositionRequestHistoryByFilter, {});
};
export const usePostGetResumesInCountyUnionPositionRequestByFilter = () => {
  return useMutation(postGetResumesInCountyUnionPositionRequestByFilter, {});
};
export const usePostGetResumesInCountyGuildRoomPositionRequestByFilter = () => {
  return useMutation(
    postGetResumesInCountyGuildRoomPositionRequestByFilter,
    {}
  );
};

export const usePostGetResumesInProvinceGuildRoomPositionRequestByFilter =
  () => {
    return useMutation(
      postGetResumesInProvinceGuildRoomPositionRequestByFilter,
      {}
    );
  };

export const usePostGetMainLocationGuildRoomMyPositionRequestHistoryByFilter =
  () => {
    return useMutation(
      postGetMainLocationGuildRoomMyPositionRequestHistoryByFilter,
      {}
    );
  };
export const usePostGetProvinceGuildRoomPositionRequestHistoryByFilter = () => {
  return useMutation(
    postGetProvinceGuildRoomPositionRequestHistoryByFilter,
    {}
  );
};
export const useGetConfirmInquiriesByManager = () => {
  return useMutation(getConfirmInquiriesByManager, {});
};
export const useGetProvinceGuildRoomPositionRequestDetailsByIdByTreasurer =
  () => {
    return useMutation(
      getProvinceGuildRoomPositionRequestDetailsByIdByTreasurer,
      {}
    );
  };
export const useGetMainLocationGuildRoomPositionRequestDetailsByIdByTreasurer =
  () => {
    return useMutation(
      getMainLocationGuildRoomPositionRequestDetailsByIdByTreasurer,
      {}
    );
  };
export const useGetCountyUnionPositionRequestDetailsByIdByTreasurer = () => {
  return useMutation(getCountyUnionPositionRequestDetailsByIdByTreasurer, {});
};
export const useGetCountyGuildRoomPositionRequestDetailsByIdByTreasurer =
  () => {
    return useMutation(
      getCountyGuildRoomPositionRequestDetailsByIdByTreasurer,
      {}
    );
  };
export const useGetCountyGuildRoomInquiryLetter = () => {
  return useMutation(getCountyGuildRoomInquiryLetter, {});
};
export const useGetProvinceGuildRoomInquiryLetter = () => {
  return useMutation(getProvinceGuildRoomInquiryLetter, {});
};
export const useGetMainLocationGuildRoomInquiryLetter = () => {
  return useMutation(getMainLocationGuildRoomInquiryLetter, {});
};
export const useGetCountyUnionInquiryLetter = () => {
  return useMutation(getCountyUnionInquiryLetter, {});
};
export const usePostGetTreasurerCartableOfPositionRequestInCountyGuildRoomByFilter =
  () => {
    return useMutation(
      postGetTreasurerCartableOfPositionRequestInCountyGuildRoomByFilter,
      {}
    );
  };
export const usePostGetTreasurerCartableOfPositionRequestInMainLocationGuildRoomByFilter =
  () => {
    return useMutation(
      postGetTreasurerCartableOfPositionRequestInMainLocationGuildRoomByFilter,
      {}
    );
  };
export const usePostGetTreasurerCartableOfPositionRequestInProvinceGuildRoomByFilter =
  () => {
    return useMutation(
      postGetTreasurerCartableOfPositionRequestInProvinceGuildRoomByFilter,
      {}
    );
  };
export const usePostGetTreasurerCartableOfPositionRequestInCountyUnionByFilter =
  () => {
    return useMutation(
      postGetTreasurerCartableOfPositionRequestInCountyUnionByFilter,
      {}
    );
  };
export const usePostInvestigateAndAcceptBySecretriat = () => {
  return useMutation(postInvestigateAndAcceptBySecretriat, {});
};
export const usePostInvestigateAndAcceptByManager = () => {
  return useMutation(postInvestigateAndAcceptByManager, {});
};
export const usePostGetMyPositionRequestHistory = () => {
  return useMutation(postGetMyPositionRequestHistory, {});
};
export const usePostRejectBySecretriat = () => {
  return useMutation(postRejectBySecretriat, {});
};
export const usePostRejectByManager = () => {
  return useMutation(postRejectByManager, {});
};
export const usePostSelectPositionRequestInProvinceGuildRoomByIdBySecretariat =
  () => {
    return useMutation(
      postSelectPositionRequestInProvinceGuildRoomByIdBySecretariat,
      {}
    );
  };

export const usePostGGetSecretariatCartableOfPositionRequestInProvinceGuildRoomByFilter =
  () => {
    return useMutation(
      postGetSecretariatCartableOfPositionRequestInProvinceGuildRoomByFilter,
      {}
    );
  };

export const usePostGetSecretariatCartableOfPositionRequestInCountyUnionByFilter =
  () => {
    return useMutation(
      postGetSecretariatCartableOfPositionRequestInCountyUnionByFilter,
      {}
    );
  };
export const usePostGetSecretariatCartableOfPositionRequestInCountyGuildRoomByFilter =
  () => {
    return useMutation(
      postGetSecretariatCartableOfPositionRequestInCountyGuildRoomByFilter,
      {}
    );
  };

export const usePostCreatePositionRequestInCountyUnion = () => {
  return useMutation(postCreatePositionRequestInCountyUnion, {});
};

export const usePostGetAllPositionRequestInCountyGuildRoomByFilter = () => {
  return useMutation(postGetAllPositionRequestInCountyGuildRoomByFilter, {});
};

export const usePostGetAllPositionRequestInCounty2GuildRoomByFilter = () => {
  return useMutation(postGetAllPositionRequestInCounty2GuildRoomByFilter, {});
};

export const usePostGetAllPositionRequestInUnionGuildRoomByFilter = () => {
  return useMutation(postGetAllPositionRequestInUnionGuildRoomByFilter, {});
};

export const usePostGetMyPositionRequestsIncountyUnionByFilter = () => {
  return useMutation(postGetMyPositionRequestsIncountyUnionByFilter, {});
};

export const useGetMyCountyUnionPositionRequestDetailsById = () => {
  return useMutation(getMyCountyUnionPositionRequestDetailsById, {});
};

export const usePostCreatePositionRequestInCountyGuildRoom = () => {
  return useMutation(postCreatePositionRequestInCountyGuildRoom, {});
};

export const usePostGetMyCountyPositionRequestsByFilter = () => {
  return useMutation(postGetMyCountyPositionRequestsByFilter, {});
};

export const useGetMyCountyPositionRequestDetailsById = () => {
  return useMutation(getMyCountyPositionRequestDetailsById, {});
};

export const usePostCreatePositionRequestInProvincGuildRoom = () => {
  return useMutation(postCreatePositionRequestInProvincGuildRoom, {});
};
export const useGetCountyGuildRoomPositionRequestDetailsById = () => {
  return useMutation(getCountyGuildRoomPositionRequestDetailsById, {});
};

export const useGetCountyUnionPositionRequestDetailsById = () => {
  return useMutation(getCountyUnionPositionRequestDetailsById, {});
};
export const useGetProvinceGuildRoomPositionRequestDetailsById = () => {
  return useMutation(getProvinceGuildRoomPositionRequestDetailsById, {});
};
export const usePostGetMyProvincePositionRequestsByFilter = () => {
  return useMutation(postGetMyProvincePositionRequestsByFilter, {});
};

export const useGetMyProvincePositionRequestDetailsById = () => {
  return useMutation(getMyProvincePositionRequestDetailsById, {});
};
export const usePostGetMainLocationGuildRoomPosition = () => {
  return useMutation(postGetMainLocationGuildRoomPosition, {});
};
export const usePostCreatePositionRequestInMainGuildRoom = () => {
  return useMutation(postCreatePositionRequestInMainGuildRoom, {});
};
export const usePostGetMyMainLocationPositionRequestsByFilter = () => {
  return useMutation(postGetMyMainLocationPositionRequestsByFilter, {});
};
export const usePostGetAllPositionRequestInMainLocationGuildRoomByFilter =
  () => {
    return useMutation(
      postGetAllPositionRequestInMainLocationGuildRoomByFilter,
      {}
    );
  };
export const useGetCountyGuildRoomPositionRequestInquiriesManager = () => {
  return useMutation(getCountyGuildRoomPositionRequestInquiries, {});
};
export const useGetCountyUnionPositionRequestInquiriesManager = () => {
  return useMutation(getCountyUnionPositionRequestInquiries, {});
};
export const useGetMainLocationGuildRoomPositionRequestInquiriesManager =
  () => {
    return useMutation(getMainLocationGuildRoomPositionRequestInquiries, {});
  };
export const useGetProvinceGuildRoomPositionRequestInquiriesManager = () => {
  return useMutation(getProvinceGuildRoomPositionRequestInquiries, {});
};
export const usePostGetSecretariatCartableOfPositionRequestInMainLocationGuildRoomByFilter =
  () => {
    return useMutation(
      postGetSecretariatCartableOfPositionRequestInMainLocationGuildRoomByFilter,
      {}
    );
  };
export const useGetMyMainLocationPositionRequestDetailsById = () => {
  return useMutation(getMyMainLocationPositionRequestDetailsById, {});
};
export const useGetGetMainLocationGuildRoomPositionRequestDetailsById = () => {
  return useMutation(getGetMainLocationGuildRoomPositionRequestDetailsById, {});
};
export const useGetSelectPositionRequestInMainLocationGuildRoomByIdBySecretariat =
  () => {
    return useMutation(
      getSelectPositionRequestInMainLocationGuildRoomByIdBySecretariat,
      {}
    );
  };
export const useGetSelectPositionRequestInCountyGuildRoomByIdBySecretariat =
  () => {
    return useMutation(
      getSelectPositionRequestInCountyGuildRoomByIdBySecretariat,
      {}
    );
  };
export const useGetSelectPositionRequestInCountyUnionByIdBySecretariat = () => {
  return useMutation(
    getSelectPositionRequestInCountyUnionByIdBySecretariat,
    {}
  );
};
export const usePostCreateResumeInPositionRequest = () => {
  return useMutation(postCreateResumeInPositionRequest, {});
};
export const usePostUpdateMyPositionRequest = () => {
  return useMutation(postUpdateMyPositionRequest, {});
};
export const usePostUploadProvinceGuildRoomPositionRequestInquiryResponseBySecretriat =
  () => {
    return useMutation(
      UploadProvinceGuildRoomPositionRequestInquiryResponseBySecretriat,
      {}
    );
  };
export const usePostUploadCountyGuildRooomPositionRequestInquiryResponseBySecretriat =
  () => {
    return useMutation(
      UploadCountyGuildRooomPositionRequestInquiryResponseBySecretriat,
      {}
    );
  };
export const usePostUploadPositionRequestInquiryResponseByApplicant = () => {
  return useMutation(UploadPositionRequestInquiryResponseByApplicant, {});
};
export const usePostUploadCountyUnionPositionRequestInquiryResponseBySecretriat =
  () => {
    return useMutation(
      UploadCountyUnionPositionRequestInquiryResponseBySecretriat,
      {}
    );
  };
export const usePostUploadMainLocationGuildRoomPositionRequestInquiryResponseBySecretriat =
  () => {
    return useMutation(
      UploadMainLocationGuildRoomPositionRequestInquiryResponseBySecretriat,
      {}
    );
  };
export const useSetUserSignature = () => {
  return useMutation(SetUserSignature, {});
};
export const useGetUserSignature = () => {
  return useQuery("getUserSignature", getUserSignature);
};
export const useIsActiveUpLevelMangerInProvinceGuildRooom = () => {
  return useMutation(IsActiveUpLevelMangerInProvinceGuildRooom, {});
};
export const useIsActiveUpLevelMangerInCountyGuildRoom = () => {
  return useMutation(IsActiveUpLevelMangerInCountyGuildRoom, {});
};
export const useIsActiveUpLevelMangerInCountyUnion = () => {
  return useMutation(IsActiveUpLevelMangerInCountyUnion, {});
};
export const useIsActiveUpLevelMangerInMainLocationGuildRooom = () => {
  return useMutation(IsActiveUpLevelMangerInMainLocationGuildRooom, {});
};
export const usePostGetMyResumesInPositionRequest = () => {
  return useMutation(postGetMyResumesInPositionRequest, {});
};
export const usePostGetAllPosition = () => {
  return useMutation(postGetAllPosition, {});
};

export const useGetDetailsProvinceGuildRooomPositionRequestByTreasurer = (
  id: string | number
) => {
  return useQuery(
    "GetDetailsProvinceGuildRooomPositionRequestByTreasurer",
    () => GetDetailsProvinceGuildRooomPositionRequestByTreasurer(id)
  );
};
export const useGetDetailsMainLocationGuildRooomPositionRequestByTreasurer = (
  id: string | number
) => {
  return useQuery(
    "GetDetailsMainLocationGuildRooomPositionRequestByTreasurer",
    () => GetDetailsMainLocationGuildRooomPositionRequestByTreasurer(id)
  );
};
export const useGetDetailsCountyUnionPositionRequestByTreasurer = (
  id: string | number
) => {
  return useQuery("GetDetailsCountyUnionPositionRequestByTreasurer", () =>
    GetDetailsCountyUnionPositionRequestByTreasurer(id)
  );
};
export const useGetDetailsCountyGuildRoomPositionRequestByTreasurer = (
  id: string | number
) => {
  return useQuery("GetDetailsCountyGuildRoomPositionRequestByTreasurer", () =>
    GetDetailsCountyGuildRoomPositionRequestByTreasurer(id)
  );
};

export const usePostGetResumesInProvinceGuildRoomPositionRequestByFilterByUpManager =
  () => {
    return useMutation(
      postGetResumesInProvinceGuildRoomPositionRequestByFilterByUpManager,
      {}
    );
  };
export const useGetProvinceGuildRoomPositionRequestDetailsByIdByUpManager =
  () => {
    return useMutation(
      getProvinceGuildRoomPositionRequestDetailsByIdByUpManager,
      {}
    );
  };
export const usePostGetResumesInCountyUnionPositionRequestByFilterByUpManager =
  () => {
    return useMutation(
      postGetResumesInCountyUnionPositionRequestByFilterByUpManager,
      {}
    );
  };
export const useGetCountyUnionPositionRequestDetailsByIdByUpManager = () => {
  return useMutation(getCountyUnionPositionRequestDetailsByIdByUpManager, {});
};
export const usePostGetResumesInCountyGuildRoomPositionRequestByFilterByUpManager =
  () => {
    return useMutation(
      postGetResumesInCountyGuildRoomPositionRequestByFilterByUpManager,
      {}
    );
  };
export const usePetCountyGuildRoomPositionRequestDetailsByIdByUpManager =
  () => {
    return useMutation(
      getCountyGuildRoomPositionRequestDetailsByIdByUpManager,
      {}
    );
  };
export const usePostRejectProvinceGuildRoomPositionRequestByUpLevelManger =
  () => {
    return useMutation(
      postRejectProvinceGuildRoomPositionRequestByUpLevelManger,
      {}
    );
  };
export const usePostConfirmProvinceGuildRoomPositionRequestByUpLevelManger =
  () => {
    return useMutation(
      postConfirmProvinceGuildRoomPositionRequestByUpLevelManger,
      {}
    );
  };
export const usePostConfirmCountyGuildRoomPositionRequestByUpLevelManger =
  () => {
    return useMutation(
      postConfirmCountyGuildRoomPositionRequestByUpLevelManger,
      {}
    );
  };
export const usePostRejectCountyGuildRoomPositionRequestByUpLevelManger =
  () => {
    return useMutation(
      postRejectCountyGuildRoomPositionRequestByUpLevelManger,
      {}
    );
  };
export const usePostRejectCountyUnionPositionRequestByUpLevelManger = () => {
  return useMutation(postRejectCountyUnionPositionRequestByUpLevelManger, {});
};
export const usePostConfirmCountyUnionPositionRequestByUpLevelManger = () => {
  return useMutation(postConfirmCountyUnionPositionRequestByUpLevelManger, {});
};
export const useGetProvinceGuildRoomPostionRequestContractFile = () => {
  return useMutation(GetProvinceGuildRoomPostionRequestContractFile, {
    onSuccess: async (value: any) => {
      const result = value.data;
      let data = new Blob([result]);
      let csvURL = window.URL.createObjectURL(data);
      let tempLink = document.createElement("a");
      tempLink.href = csvURL;
      tempLink.setAttribute("download", "contract.doc");
      tempLink.click();
    },
  });
};
export const useGetMainLocationGuildRoomPostionRequestContractFile = () => {
  return useMutation(GetMainLocationGuildRoomPostionRequestContractFile, {
    onSuccess: async (value: any) => {
      const result = value.data;
      let data = new Blob([result]);
      let csvURL = window.URL.createObjectURL(data);
      let tempLink = document.createElement("a");
      tempLink.href = csvURL;
      tempLink.setAttribute("download", "contract.doc");
      tempLink.click();
    },
  });
};
export const useGetCountyUnionPostionRequestContractFile = () => {
  return useMutation(GetCountyUnionPostionRequestContractFile, {
    onSuccess: async (value: any) => {
      const result = value.data;
      let data = new Blob([result]);
      let csvURL = window.URL.createObjectURL(data);
      let tempLink = document.createElement("a");
      tempLink.href = csvURL;
      tempLink.setAttribute("download", "contract.doc");
      tempLink.click();
    },
  });
};
export const useGetCountyGuildRoomPostionRequestContractFile = () => {
  return useMutation(GetCountyGuildRoomPostionRequestContractFile, {
    onSuccess: async (value: any) => {
      const result = value.data;
      console.log(result);

      let data = new Blob([result]);
      let csvURL = window.URL.createObjectURL(data);
      let tempLink = document.createElement("a");
      tempLink.href = csvURL;
      tempLink.setAttribute("download", "contract.doc");
      tempLink.click();
    },
  });
};
