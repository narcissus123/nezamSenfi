import { useMutation } from "react-query";
import methods from "../interceptors/http.interceptor";
import { useQuery } from "react-query";
import { AxiosResponse } from "axios";
import { IAxiosResult } from "../../models/axios-result.model";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

export interface ISelectInquiry {
  positionRequestId: number;
  inquiries: { inquiryId: number }[];
}
const GetProvinceGuildRoomPositionRequestInquiries = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/ProvinceGuildRoomPositionRequset/GetProvinceGuildRoomPositionRequestInquiries?positionRequestId=${id}`
  );
};

const GetCountyGuildRoomPositionRequestInquiries = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/CountyGuildRoomPositionRequset/GetCountyGuildRoomPositionRequestInquiries?positionRequestId=${id}`
  );
};
const GetPositionRequestInquiriesByIdByUserApplicantForUserApplicant = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/PositionRequest/GetPositionRequestInquiriesByIdByUserApplicantForUserApplicant?positionRequestId=${id}`
  );
};

const GetCountyGuildRooomPostionRequestSignatureByManager = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/CountyGuildRoomPositionRequset/GetCountyGuildRooomPostionRequestSignatureByManager?positionRequestId=${id}`
  );
};
const GetCountyUnionPostionRequestSignatureByManager = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/CountyUnionPositionRequset/GetCountyUnionPostionRequestSignatureByManager?positionRequestId=${id}`
  );
};
const GetMainLocationGuildRoomPostionRequestSignatureByManager = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/MainLocationGuildRoomPositionRequset/GetMainLocationGuildRoomPostionRequestSignatureByManager?positionRequestId=${id}`
  );
};
const GetPostionRequestSignatureByUserAppliacant = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/PositionRequest/GetPostionRequestSignatureByUserAppliacant?positionRequestId=${id}`
  );
};
const GetProvinceGuildRoomPostionRequestSignatureByManager = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/ProvinceGuildRoomPositionRequset/GetProvinceGuildRoomPostionRequestSignatureByManager?positionRequestId=${id}`
  );
};

const GetCountyGuildRooomPostionRequestSignatureBySecretriat = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/CountyGuildRoomPositionRequset/GetCountyGuildRooomPostionRequestSignatureBySecretriat?positionRequestId=${id}`
  );
};
const GetCountyUnionPostionRequestSignatureBySecretriat = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/CountyUnionPositionRequset/GetCountyUnionPostionRequestSignatureBySecretriat?positionRequestId=${id}`
  );
};
const GetMainLocationGuildRoomPostionRequestSignatureBySecretriat = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/MainLocationGuildRoomPositionRequset/GetMainLocationGuildRoomPostionRequestSignatureBySecretriat?positionRequestId=${id}`
  );
};
const GetProvinceGuildRoomPostionRequestSignatureBySecretriat = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/ProvinceGuildRoomPositionRequset/GetProvinceGuildRoomPostionRequestSignatureBySecretriat?positionRequestId=${id}`
  );
};

const GetCountyUnionPositionRequestInquiries = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/CountyUnionPositionRequset/GetCountyUnionPositionRequestInquiries?positionRequestId=${id}`
  );
};
const GetMainLocationGuildRoomPositionRequestInquiries = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/MainLocationGuildRoomPositionRequset/GetMainLocationGuildRoomPositionRequestInquiries?positionRequestId=${id}`
  );
};
const SendPositionRequestLettersToApplicantInCountyGuildRoom = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/CountyGuildRoomPositionRequset/SendPositionRequestLettersToApplicantInCountyGuildRoom?positionRequestId=${id}`
  );
};
const SendPositionRequestLettersToApplicantInCountyUnion = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/CountyUnionPositionRequset/SendPositionRequestLettersToApplicantInCountyUnion?positionRequestId=${id}`
  );
};
const SendPositionRequestLettersToApplicantInMainLocationGuildRoom = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/MainLocationGuildRoomPositionRequset/SendPositionRequestLettersToApplicantInMainLocationGuildRoom?positionRequestId=${id}`
  );
};
const SendPositionRequestLettersToApplicantInProvinceGuildRoom = async (
  id: string | number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/ProvinceGuildRoomPositionRequset/SendPositionRequestLettersToApplicantInProvinceGuildRoom?positionRequestId=${id}`
  );
};
const postCreateInquery = async (data: any): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}/api/Inquiry/CreateInquery`, data);
};






const DeleteInquery = async (id: any): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.delete(`${MainUrl}/api/Inquiry/DeleteInquery?inquiryId=${id}`);
};
const EditInquiry = async (data: any): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}/api/Inquiry/EditInquiry`, data);
};




const postGetAllInquiryByFilter = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/Inquiry/GetAllInquiryByFilter`,
    data
  );
};
const postSetNumberAndDateBySecrteriatInProvinceGuildRoom = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/ProvinceGuildRoomPositionRequset/SetNumberAndDateBySecrteriatInProvinceGuildRoom`,
    data
  );
};

const postSetNumberAndDateBySecrteriatInMainLocationGuildRoom = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/MainLocationGuildRoomPositionRequset/SetNumberAndDateBySecrteriatInMainLocationGuildRoom`,
    data
  );
};

const postSetNumberAndDateBySecrteriatInCountyGuildRoom = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/CountyGuildRoomPositionRequset/SetNumberAndDateBySecrteriatInCountyGuildRoom`,
    data
  );
};
const getPositionRequestInquiryLetterById = async (
  id: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/PositionRequest/GetPositionRequestInquiryLetterById?positionRequestInquiryId=${id}`
  );
};
const postSetNumberAndDateBySecrteriatInCountyUnion = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/CountyUnionPositionRequset/SetNumberAndDateBySecrteriatInCountyUnion`,
    data
  );
};

const postSetProvinceGuildRoomInquiryLetter = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/ProvinceGuildRoomPositionRequset/SetProvinceGuildRoomInquiryLetter`,
    data
  );
};
const postSetMainLocationGuildRoomInquiryLetter = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/MainLocationGuildRoomPositionRequset/SetMainLocationGuildRoomInquiryLetter`,
    data
  );
};
const postSetCountyUnionInquiryLetter = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/CountyUnionPositionRequset/SetCountyUnionInquiryLetter`,
    data
  );
};
const postSetCountyGuildRoomInquiryLetter = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/CountyGuildRoomPositionRequset/SetCountyGuildRoomInquiryLetter`,
    data
  );
};
const postSetDefaultInquiryLetter = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/PositionRequest/SetDefaultInquiryLetter`,
    data
  );
};

export const usePostSetDefaultInquiryLetter = () => {
  return useMutation(postSetDefaultInquiryLetter, {});
};
export const usePostSetProvinceGuildRoomInquiryLetter = () => {
  return useMutation(postSetProvinceGuildRoomInquiryLetter, {});
};
export const usePostSetMainLocationGuildRoomInquiryLetter = () => {
  return useMutation(postSetMainLocationGuildRoomInquiryLetter, {});
};

export const usePostSetCountyUnionInquiryLetter = () => {
  return useMutation(postSetCountyUnionInquiryLetter, {});
};
export const usePostSetCountyGuildRoomInquiryLetter = () => {
  return useMutation(postSetCountyGuildRoomInquiryLetter, {});
};

const getGetAllInquiries = async () => {
  return await methods.get(`${MainUrl}/api/Inquiry/GetAllInquiries`);
};

export const usePostCreateInquery = () => {
  return useMutation(postCreateInquery, {});
};

export const useDeleteInquery = () => {
  return useMutation(DeleteInquery, {});
};

export const useEditInquiry = () => {
  return useMutation(EditInquiry, {});
};

export const useSendPositionRequestLettersToApplicantInCountyGuildRoom = () => {
  return useMutation(
    SendPositionRequestLettersToApplicantInCountyGuildRoom,
    {}
  );
};
export const useSendPositionRequestLettersToApplicantInMainLocationGuildRoom =
  () => {
    return useMutation(
      SendPositionRequestLettersToApplicantInMainLocationGuildRoom,
      {}
    );
  };
export const useSendPositionRequestLettersToApplicantInProvinceGuildRoom =
  () => {
    return useMutation(
      SendPositionRequestLettersToApplicantInProvinceGuildRoom,
      {}
    );
  };
export const useSendPositionRequestLettersToApplicantInCountyUnion = () => {
  return useMutation(SendPositionRequestLettersToApplicantInCountyUnion, {});
};
export const usePostSetNumberAndDateBySecrteriatInProvinceGuildRoom = () => {
  return useMutation(postSetNumberAndDateBySecrteriatInProvinceGuildRoom, {});
};

export const usePostSetNumberAndDateBySecrteriatInCountyUnion = () => {
  return useMutation(postSetNumberAndDateBySecrteriatInCountyUnion, {});
};

export const usePostSetNumberAndDateBySecrteriatInCountyGuildRoom = () => {
  return useMutation(postSetNumberAndDateBySecrteriatInCountyGuildRoom, {});
};

export const usePostSetNumberAndDateBySecrteriatInMainLocationGuildRoom =
  () => {
    return useMutation(
      postSetNumberAndDateBySecrteriatInMainLocationGuildRoom,
      {}
    );
  };

export const usePostGetAllInquiryByFilter = () => {
  return useMutation(postGetAllInquiryByFilter, {});
};

export const useGetGetAllInquiries = () => {
  return useQuery("useGetGetAllInquiries", getGetAllInquiries);
};
export const useGetProvinceGuildRoomPositionRequestInquiries = (
  id: string | number
) => {
  return useQuery("GetProvinceGuildRoomPositionRequestInquiries", () =>
    GetProvinceGuildRoomPositionRequestInquiries(id)
  );
};
export const useGetMainLocationGuildRoomPositionRequestInquiries = (
  id: string | number
) => {
  return useQuery("GetMainLocationGuildRoomPositionRequestInquiries", () =>
    GetMainLocationGuildRoomPositionRequestInquiries(id)
  );
};

export const useGetCountyGuildRoomPositionRequestInquiries = (
  id: string | number
) => {
  return useQuery("GetCountyGuildRoomPositionRequestInquiries", () =>
    GetCountyGuildRoomPositionRequestInquiries(id)
  );
};
export const useGetPositionRequestInquiriesByIdByUserApplicantForUserApplicant =
  (id: string | number) => {
    return useQuery(
      "GetPositionRequestInquiriesByIdByUserApplicantForUserApplicant",
      () => GetPositionRequestInquiriesByIdByUserApplicantForUserApplicant(id)
    );
  };

export const useGetCountyUnionPositionRequestInquiries = (
  id: string | number
) => {
  return useQuery("GetCountyUnionPositionRequestInquiries", () =>
    GetCountyUnionPositionRequestInquiries(id)
  );
};

const SelectCountyGuildRoomPositionRequestInquriesBySecretriat = async (
  data: ISelectInquiry
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    MainUrl +
      "​/api/CountyGuildRoomPositionRequset/SelectCountyGuildRoomPositionRequestInquriesBySecretriat",
    data
  );
};

const SelectProvinceGuildRoomPositionRequestInquriesBySecretriat = async (
  data: ISelectInquiry
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    MainUrl +
      "​/api/ProvinceGuildRoomPositionRequset/SelectProvinceGuildRoomPositionReuestInquriesBySecretriate",
    data
  );
};

const SelectUnionGuildRoomPositionRequestInquriesBySecretriat = async (
  data: ISelectInquiry
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    MainUrl +
      "​/api/CountyUnionPositionRequset/SelectCountyUnionPositionRequestInquriesBySecretriat",
    data
  );
};
const SelectMainLocationGuildRoomPositionReuestInquriesBySecretriat = async (
  data: ISelectInquiry
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    MainUrl +
      "​/api/MainLocationGuildRoomPositionRequset/SelectMainLocationGuildRoomPositionReuestInquriesBySecretriat",
    data
  );
};
export const useSelectCountyGuildRoomPositionRequestInquriesBySecretriat =
  () => {
    return useMutation(
      SelectCountyGuildRoomPositionRequestInquriesBySecretriat,
      {}
    );
  };
export const useSelectProvinceGuildRoomPositionRequestInquriesBySecretriat =
  () => {
    return useMutation(
      SelectProvinceGuildRoomPositionRequestInquriesBySecretriat,
      {}
    );
  };
export const useGetPositionRequestInquiryLetterById = () => {
  return useMutation(getPositionRequestInquiryLetterById, {});
};
export const useSelectUnionGuildRoomPositionRequestInquriesBySecretriat =
  () => {
    return useMutation(
      SelectUnionGuildRoomPositionRequestInquriesBySecretriat,
      {}
    );
  };
export const useSelectMainLocationGuildRoomPositionReuestInquriesBySecretriat =
  () => {
    return useMutation(
      SelectMainLocationGuildRoomPositionReuestInquriesBySecretriat,
      {}
    );
  };

export const useGetProvinceGuildRoomPostionRequestSignatureBySecretriat = (
  id: string | number
) => {
  return useQuery(
    "GetProvinceGuildRoomPostionRequestSignatureBySecretriat",
    () => GetProvinceGuildRoomPostionRequestSignatureBySecretriat(id)
  );
};
export const useGetMainLocationGuildRoomPostionRequestSignatureBySecretriat = (
  id: string | number
) => {
  return useQuery(
    "GetMainLocationGuildRoomPostionRequestSignatureBySecretriat",
    () => GetMainLocationGuildRoomPostionRequestSignatureBySecretriat(id)
  );
};
export const useGetCountyUnionPostionRequestSignatureBySecretriat = (
  id: string | number
) => {
  return useQuery("GetCountyUnionPostionRequestSignatureBySecretriat", () =>
    GetCountyUnionPostionRequestSignatureBySecretriat(id)
  );
};
export const useGetCountyGuildRooomPostionRequestSignatureBySecretriat = (
  id: string | number
) => {
  return useQuery(
    "GetCountyGuildRooomPostionRequestSignatureBySecretriat",
    () => GetCountyGuildRooomPostionRequestSignatureBySecretriat(id)
  );
};
export const useGetProvinceGuildRoomPostionRequestSignatureByManager = (
  id: string | number
) => {
  return useQuery("GetProvinceGuildRoomPostionRequestSignatureByManager", () =>
    GetProvinceGuildRoomPostionRequestSignatureByManager(id)
  );
};
export const useGetMainLocationGuildRoomPostionRequestSignatureByManager = (
  id: string | number
) => {
  return useQuery(
    "GetMainLocationGuildRoomPostionRequestSignatureByManager",
    () => GetMainLocationGuildRoomPostionRequestSignatureByManager(id)
  );
};
export const useGetPostionRequestSignatureByUserAppliacant = (
  id: string | number
) => {
  return useQuery("GetPostionRequestSignatureByUserAppliacant", () =>
    GetPostionRequestSignatureByUserAppliacant(id)
  );
};
export const useGetCountyUnionPostionRequestSignatureByManager = (
  id: string | number
) => {
  return useQuery("GetCountyUnionPostionRequestSignatureByManager", () =>
    GetCountyUnionPostionRequestSignatureByManager(id)
  );
};
export const useGetCountyGuildRooomPostionRequestSignatureByManager = (
  id: string | number
) => {
  return useQuery("GetCountyGuildRooomPostionRequestSignatureByManager", () =>
    GetCountyGuildRooomPostionRequestSignatureByManager(id)
  );
};
