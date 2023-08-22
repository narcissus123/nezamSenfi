import { AxiosResponse } from "axios";
import { IAxiosResult } from "../../models/axios-result.model";
import methods from "../interceptors/http.interceptor";
import { useMutation, useQuery } from "react-query";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const GetLicenseRequestRateById = async (
  licenseRequestId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequest/GetLicenseRequestRateById?licenseRequestId=${licenseRequestId}`
  );
};
const ReportRoutingMap = async (
  licenseRequestId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequest/ReportRoutingMapForUser?licenseRequestId=${licenseRequestId}`
  );
};
const ReportRoutingMapForUnionIssuingResponsibleAndUnionSecretariat = async (
  licenseRequestId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequest/ReportRoutingMapForUnionIssuingResponsibleAndUnionSecretariat?licenseRequestId=${licenseRequestId}`
  );
};
const ReportPlanSectionMapForUser = async (data: {
  licenseRequestId: number;
  sectionId: number;
}): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequest/ReportPlanSectionMapForUser?licenseRequestId=${data.licenseRequestId}&SectionId=${data.sectionId}`
  );
};
const ReportPlanSectionMapForUnionIssuingResponsibleAndUnionSecretariat = async (data: {
  licenseRequestId: number;
  sectionId: number;
}): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequest/ReportPlanSectionMapForUnionIssuingResponsibleAndUnionSecretariat?licenseRequestId=${data.licenseRequestId}&SectionId=${data.sectionId}`
  );
};

const ConfirmByIssuingManagerAfterMatchingPeyment = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequest/ConfirmByIssuingManagerAfterMatchingPeyment`,
    data
  );
};
const RejectByIssuingManagerAfterMatchingPeyment = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequest/RejectByIssuingManagerAfterMatchingPeyment`,
    data
  );
};
const GetLicenseRequestRequiredTabs = async (
  licenseRequestId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetLicenseRequestRequiredTabsByExpert?licenseRequestId=${licenseRequestId}`
  );
};
const GetLicenseRequestRequiredTabsByIssuingResponsible = async (
  licenseRequestId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetLicenseRequestRequiredTabsByIssuingResponsible?licenseRequestId=${licenseRequestId}`
  );
};
const GetLicenseRequestRequiredTabsByJahadCenterManager = async (
  licenseRequestId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetLicenseRequestRequiredTabsByJahadCenterManager?licenseRequestId=${licenseRequestId}`
  );
};
const GetLicenseRequestDetailByExpert = async (
  licenseRequestId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetLicenseRequestDetailByExpert?licenseRequestId=${licenseRequestId}`
  );
};
const GetLicenseRequestDetailByIssuingResponsible = async (
  licenseRequestId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetLicenseRequestDetailByEmployee?licenseRequestId=${licenseRequestId}`
  );
};
const GetLicenseRequestDetailByJahadCenterManager = async (
  licenseRequestId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetLicenseRequestDetailByJahadCenterManager?licenseRequestId=${licenseRequestId}`
  );
};
const GetActiveLiceseRequestExpert = async (
  licenseRequestId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequest/GetActiveLiceseRequestExpert?licenseRequestId=${licenseRequestId}`
  );
};

const GetTreesOfLicenseRequestSection = async (
  licenseRequestId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetTreesOfLicenseRequestSectionByExpert?licenseRequestSectionId=${licenseRequestId}`
  );
};

const GetAgriculturalMechanizationServiceOfLicenseRequestSectionByExpert =
  async (licenseRequestId: number): Promise<AxiosResponse<IAxiosResult>> => {
    return await methods.get(
      `${MainUrl}/api/LicenseRequestGet/GetAgriculturalMechanizationServiceOfLicenseRequestSectionByExpert?licenseRequestSectionId=${licenseRequestId}`
    );
  };
const CheckLicenseRequesSectiontIntersectsByExpert = async (
  sectionId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestMatching/CheckLicenseRequesSectiontIntersectsByExpert?sectionId=${sectionId}`
  );
};
const GetAgriculturalMechanizationServiceOfLicenseRequestByExpert = async (
  licenseRequestId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetAgriculturalMechanizationServiceOfLicenseRequestByExpert?licenseRequestId=${licenseRequestId}`
  );
};

const GetAgriculturalMechanizationServiceOfLicenseRequestSectionByIssuingResponsible =
  async (licenseRequestId: number): Promise<AxiosResponse<IAxiosResult>> => {
    return await methods.get(
      `${MainUrl}/api/LicenseRequestGet/GetAgriculturalMechanizationServiceOfLicenseRequestSectionByIssuingResponsible?licenseRequestSectionId=${licenseRequestId}`
    );
  };
const GetAgriculturalMechanizationServiceOfLicenseRequestByIssuingResponsible =
  async (licenseRequestId: number): Promise<AxiosResponse<IAxiosResult>> => {
    return await methods.get(
      `${MainUrl}/api/LicenseRequestGet/GetAgriculturalMechanizationServiceOfLicenseRequestByIssuingResponsible?licenseRequestId=${licenseRequestId}`
    );
  };
const GetAgriculturalMechanizationServiceOfLicenseRequestSectionByJahadCenterManager =
  async (licenseRequestId: number): Promise<AxiosResponse<IAxiosResult>> => {
    return await methods.get(
      `${MainUrl}/api/LicenseRequestGet/GetAgriculturalMechanizationServiceOfLicenseRequestSectionByJahadCenterManager?licenseRequestSectionId=${licenseRequestId}`
    );
  };
const GetAgriculturalMechanizationServiceOfLicenseRequestByJahadCenterManager =
  async (licenseRequestId: number): Promise<AxiosResponse<IAxiosResult>> => {
    return await methods.get(
      `${MainUrl}/api/LicenseRequestGet/GetAgriculturalMechanizationServiceOfLicenseRequestByJahadCenterManager?licenseRequestId=${licenseRequestId}`
    );
  };

export const useGetAgriculturalMechanizationServiceOfLicenseRequestSectionByExpert =
  (id: number) => {
    return useQuery(
      "GetAgriculturalMechanizationServiceOfLicenseRequestSectionByExpert",
      () =>
        GetAgriculturalMechanizationServiceOfLicenseRequestSectionByExpert(id),
      { enabled: false }
    );
  };
export const useCheckLicenseRequesSectiontIntersectsByExpert = () => {
  return useMutation(CheckLicenseRequesSectiontIntersectsByExpert, {});
};
export const useGetAgriculturalMechanizationServiceOfLicenseRequestByExpert = (
  id: number
) => {
  return useQuery(
    "GetAgriculturalMechanizationServiceOfLicenseRequestByExpert",
    () => GetAgriculturalMechanizationServiceOfLicenseRequestByExpert(id),
    { enabled: false }
  );
};

export const useGetAgriculturalMechanizationServiceOfLicenseRequestSectionByIssuingResponsible =
  (id: number) => {
    return useQuery(
      "GetAgriculturalMechanizationServiceOfLicenseRequestSectionByIssuingResponsible",
      () =>
        GetAgriculturalMechanizationServiceOfLicenseRequestSectionByIssuingResponsible(
          id
        ),
      { enabled: false }
    );
  };
export const useGetAgriculturalMechanizationServiceOfLicenseRequestByIssuingResponsible =
  (id: number) => {
    return useQuery(
      "GetAgriculturalMechanizationServiceOfLicenseRequestByIssuingResponsible",
      () =>
        GetAgriculturalMechanizationServiceOfLicenseRequestByIssuingResponsible(
          id
        ),
      { enabled: false }
    );
  };

export const useGetAgriculturalMechanizationServiceOfLicenseRequestSectionByJahadCenterManager =
  (id: number) => {
    return useQuery(
      "GetAgriculturalMechanizationServiceOfLicenseRequestSectionByJahadCenterManager",
      () =>
        GetAgriculturalMechanizationServiceOfLicenseRequestSectionByJahadCenterManager(
          id
        ),
      { enabled: false }
    );
  };

export const useGetAgriculturalMechanizationServiceOfLicenseRequestByJahadCenterManager =
  (id: number) => {
    return useQuery(
      "GetAgriculturalMechanizationServiceOfLicenseRequestByJahadCenterManager",
      () =>
        GetAgriculturalMechanizationServiceOfLicenseRequestByJahadCenterManager(
          id
        ),
      { enabled: false }
    );
  };

const GetTreesOfLicenseRequestSectionByIssuingResponsible = async (
  licenseRequestId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetTreesOfLicenseRequestSectionByIssuingResponsible?licenseRequestSectionId=${licenseRequestId}`
  );
};


const GetRoutingMap = async (
  licenseRequestId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestMatching/GetRoutingMap?LicenseRequestId=${licenseRequestId}`
  );
};

const GetTreesOfLicenseRequestSectionByJahadCenterManager = async (
  licenseRequestId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetTreesOfLicenseRequestSectionByJahadCenterManager?licenseRequestSectionId=${licenseRequestId}`
  );
};

const postGetAllJobByCountyAndUseType = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequest/GetAllJobByCountyAndUseType`,
    data
  );
};
const ConfirmExpertMacthing = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestMatching/ConfirmExpertMacthing`,
    data
  );
};
const RejectExpertMatching = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestMatching/RejectExpertMatching`,
    data
  );
};
const RejectUserApplicantMatching = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestMatching/RejectUserApplicantMatching`,
    data
  );
};
const ConfirmUserApplicantMacthing = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestMatching/ConfirmUserApplicantMacthing`,
    data
  );
};
const RegisterRoutingMap = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestMatching/RegisterRoutingMap`,
    data
  );
};
const SetExpertIdeaLicenseRequestSection = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestExpert/SetExpertIdeaLicenseRequestSection`,
    data
  );
};

const SetExpertIdeaLicenseRequest = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestExpert/SetExpertIdeaLicenseRequest`,
    data
  );
};

const ConfirmDraftOfMatching = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestMatching/ConfirmDraftOfMatching`,
    data
  );
};
const SetOwnershipOfLicenseRequest = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestExpert/SetOwnershipOfLicenseRequest`,
    data
  );
};

const GetAllWaitingForIssuingResponsibleLicenseRequestByUnionId = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestMatching/GetAllWaitingForIssuingResponsibleLicenseRequestByUnionId`,
    data
  );
};

const GetAllLicenseRequestBySecretariat = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequest/GetAllLicenseRequestBySecretariat`,
    data
  );
};

const GetSecretariatLicenseRequestCartableByFilter = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequest/GetCaratableOfLicenseRequestSecretariat`,
    data
  );
};

const GetIssuingResponsibleLicenseCartableOfLicenseRequestByFilter = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestMatching/GetIssuingResponsibleLicenseCartableOfLicenseRequestByFilter`,
    data
  );
};

const GetIssuingManagerLicenseCartableOfLicenseRequestByFilter = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestMatching/GetIssuingManagerLicenseCartableOfLicenseRequestByFilter`,
    data
  );
};

const AcceptLicenseReqestExpertiseByExpert = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequest/AcceptLicenseReqestExpertiseByExpert`,
    data
  );
};

const RequestOrginalDocumentByIssuingResponsible = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestMatching/RequestOrginalDocumentByIssuingResponsible`,
    data
  );
};

const RejectLicenseReqestExpertiseByExpert = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequest/RejectLicenseReqestExpertiseByExpert`,
    data
  );
};
const postGetExpertLicenseRequestCartableByFilter = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequest/GetExpertLicenseRequestCartableByFilter`,
    data
  );
};

const GetAllLicenseRequestByUnionManager = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequest/GetAllLicenseRequestByUnionManager`,
    data
  );
};

const ChangeIssuingResponsibleByUnionManager = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestMatching/ChangeIssuingResponsibleByUnionManager`,
    data
  );
};

const ChangeLicenseRequestSecretariat = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequest/ChangeLicenseRequestSecretariat`,
    data
  );
};

const GetJahadCartableForLicenseRequest = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestMatching/GetJahadCartableForLicenseRequest`,
    data
  );
};
const postGetAllLicenseRequesByFilter = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequest/GetAllLicenseRequesByFilter`,
    data
  );
};
const SendLicenseRequestToExpert = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequest/SendLicenseRequestToExpert`,
    data
  );
};
const CreateLicenseRequestSection = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestExpert/CreateLicenseRequestSection`,
    data
  );
};
const GetCurrentDistrictCourIntersectionByIssuingResponsuble = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestMatching/GetCurrentDistrictCourIntersectionByIssuingResponsuble`,
    data
  );
};
const GetProductionFactorConsumptionByExpert = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestGet/GetProductionFactorConsumptionByExpert`,
    data
  );
};
const GetProductionFactorConsumptionByIssuingResponsible = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestGet/GetProductionFactorConsumptionByIssuingResponsible`,
    data
  );
};
const GetProductionFactorConsumptionByJahadCenterManager = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestGet/GetProductionFactorConsumptionByJahadCenterManager`,
    data
  );
};

const UpdateLicenseRequestSection = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestExpert/UpdateLicenseRequestSection`,
    data
  );
};
const SendToJahad = async (data: any): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestMatching/SendToJahad`,
    data
  );
};
const CreateLetterToJahad = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestMatching/CreateLetterToJahad`,
    data
  );
};
const CreateJahadResponseLetterToIssuingResponsible = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestMatching/CreateJahadResponseLetterToIssuingResponsible`,
    data
  );
};
const RegisterBuildingSectionMap = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestMatching/RegisterBuildingSectionMap`,
    data
  );
};
const SetFacilityAndOperationLicense = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestMatching/SetFacilityAndOperationLicense`,
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};
const SetDistrictCourtResult = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestMatching/SetDistrictCourtResult`,
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};
const SendJahadIdeaForLicenseRequest = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestMatching/SendJahadIdeaForLicenseRequest`,
    data,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
};
const ConfirmJahadIdeaByIssuingResponsible = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestMatching/ConfirmJahadIdeaByIssuingResponsible`,
    data
  );
};
const GetLicenseRequestHistoryByExpert = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestHistory/GetLicenseRequestHistoryByExpert`,
    data
  );
};
const GetLicenseRequestHistoryByUser = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestHistory/GetLicenseRequestHistoryByUser`,
    data
  );
};
const GetLicenseRequestHistoryByIssuingResponsible = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestHistory/GetLicenseRequestHistoryByIssuingResponsible`,
    data
  );
};
const GetLicenseRequestHistoryBySecretariat = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestHistory/GetLicenseRequestHistoryBySecretariat`,
    data
  );
};

const RejectByIssuingResponsibleAfterJahadRejection = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestMatching/RejectByIssuingResponsibleAfterJahadRejection`,
    data
  );
};
const GetMyLicenseRequest = async (
  licenseRequestId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequest/GetMyLicenseRequestById?licenseRequestId=${licenseRequestId}`
  );
};
const GetLicenseByQrCode = async (qrCode: {
  qrCode: string;
}): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/License/GetLicenseByQrCode`,
    qrCode
  );
};
const SendIntersectionToDistrictCourt = async (
  licenseRequestId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestMatching/SendIntersectionToDistrictCourt?licenseRequestId=${licenseRequestId}`
  );
};
const DownloadJahadLeterByLicenseRequestIdByIssuingResponsible = async (
  licenseRequestId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestMatching/DownloadJahadLeterByLicenseRequestIdByIssuingResponsible?licenseRequestId=${licenseRequestId}`
  );
};
const DownloadLetterOfIntersctionForDIstrictCourt = async (
  licenseRequestId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestMatching/DownloadLetterOfIntersctionForDIstrictCourt?licenseRequestId=${licenseRequestId}`,
    {
      responseType: "blob",
    }
  );
};
const DownloadLicenseBySecratraite = async (
  licenseRequestId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequest/DownloadLicenseBySecratraite?licenseRequestId=${licenseRequestId}`,
    {
      responseType: "blob",
    }
  );
};
const DownloadLicenseByUserApplicant = async (
  licenseRequestId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequest/DownloadLicenseByUserApplicant?licenseRequestId=${licenseRequestId}`,
    {
      responseType: "blob",
    }
  );
};
const DownloadCertificateByUserApplicant = async (
  licenseRequestId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequest/DownloadCertificateByUserApplicant?licenseRequestId=${licenseRequestId}`,
    {
      responseType: "blob",
    }
  );
};
const DownloadCertificateBySecratraite = async (
  licenseRequestId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequest/DownloadCertificateBySecratraite?licenseRequestId=${licenseRequestId}`,
    {
      responseType: "blob",
    }
  );
};

const ServeLicenseRequestFile = async (obj: {
  fileName: string;
  licenseRequestId: number;
}): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/Upload/ServeLicenseRequestFile?fileName=${obj.fileName}&licenseRequestId=${obj.licenseRequestId}`,
    {
      responseType: "blob",
    }
  );
};
const DownloadJahadLeterByLicenseRequestIdByJahadManager = async (
  licenseRequestId: string
): Promise<AxiosResponse<IAxiosResult>> => {
  return methods.get(
    `${MainUrl}/api/LicenseRequestMatching/DownloadJahadLeterByLicenseRequestIdByJahadManager?licenseRequestId=` +
      licenseRequestId
    // {
    //   responseType: "blob",
    // }
  );
};
const GetMachineryConsumptionByExpert = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetMachineryConsumptionByExpert?machineryConsumptionId=${id}`
  );
};
const GetMachineryConsumptionByIssuingResponsible = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetMachineryConsumptionByIssuingResponsible?machineryConsumptionId=${id}`
  );
};
const GetMachineryConsumptionByJahadCenterManager = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetMachineryConsumptionByJahadCenterManager?machineryConsumptionId=${id}`
  );
};

const GetRequirementDocumentOfLicenseRequest = async (
  licenseRequestId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestMatching/GetRequirementDocumentOfLicenseRequest?licenseRequestId=${licenseRequestId}`
  );
};

const GetLicenseRequestSectionExpertIdeaByExpert = async (
  licenseRequestSectionId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetLicenseRequestSectionExpertIdeaByExpert?licenseRequestSectionId=${licenseRequestSectionId}`
  );
};

const GetLicenseRequestExpertIdeaByExpert = async (
  licenseRequestId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetLicenseRequestExpertIdeaByExpert?licenseRequesId=${licenseRequestId}`
  );
};

const GetLicenseRequestSectionExpertIdeaByJahadCenterManager = async (
  licenseRequestSectionId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetLicenseRequestSectionExpertIdeaByJahadCenterManager?licenseRequestSectionId=${licenseRequestSectionId}`
  );
};

const GetLicenseRequestExpertIdeaByJahadCenterManager = async (
  licenseRequestId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetLicenseRequestExpertIdeaByJahadCenterManager?licenseRequestId=${licenseRequestId}`
  );
};

const GetSectionLicenseRequestSectionExpertIdeaByIssuingResponsible = async (
  licenseRequestSectionId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetSectionLicenseRequestSectionExpertIdeaByIssuingResponsible?licenseRequestSectionId=${licenseRequestSectionId}`
  );
};

const GetLicenseRequestExpertIdeaByIssuingResponsible = async (
  licenseRequestId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetLicenseRequestExpertIdeaByIssuingResponsible?licenseRequestId=${licenseRequestId}`
  );
};

const GetOwenUserJahadForManager = async (): Promise<
  AxiosResponse<IAxiosResult>
> => {
  return await methods.get(
    `${MainUrl}/api/JahadCenter/GetOwenUserJahadForManager`
  );
};
const CheckLicenseRequestIntersects = async (
  licenseRequestId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestMatching/CheckLicenseRequestIntersects?licenseRequestId=${licenseRequestId}`
  );
};
const GetPlanSectionMap = async (
  licenseRequestId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestMatching/GetPlanSectionMap?LicenseRequestSectionId=${licenseRequestId}`
  );
};
const GetBuildingSectionMap = async (
  sectionId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestMatching/GetBuildingSectionMap?BuildingSectionId=${sectionId}`
  );
};
const GetTopographyOfLicenseReuest = async (
  licenseRequestSectionId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetTopographyOfLicenseReuestByExpert?licenseRequestSectionId=${licenseRequestSectionId}`
  );
};

const GetTopographyOfLicenseReuestByIssuingResponsible = async (
  licenseRequestSectionId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetTopographyOfLicenseReuestByIssuingResponsible?licenseRequestSectionId=${licenseRequestSectionId}`
  );
};

const GetTopographyOfLicenseReuestByJahadCenterManager = async (
  licenseRequestSectionId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetTopographyOfLicenseReuestByJahadCenterManager?licenseRequestSectionId=${licenseRequestSectionId}`
  );
};

const GetBoundariesOfLicenseRequestSection = async (
  licenseRequestSectionId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetBoundariesOfLicenseRequestSectionByExpert?licenseRequestSectionId=${licenseRequestSectionId}`
  );
};
const GetBoundariesOfLicenseRequestSectionByIssuingResponsible = async (
  licenseRequestSectionId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetBoundariesOfLicenseRequestSectionByIssuingResponsible?licenseRequestSectionId=${licenseRequestSectionId}`
  );
};
const GetBoundariesOfLicenseRequestSectionByJahadCenterManager = async (
  licenseRequestSectionId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetBoundariesOfLicenseRequestSectionByJahadCenterManager?licenseRequestSectionId=${licenseRequestSectionId}`
  );
};
const GetUserSection = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequest/GetUserSection?UserInfoId=${id}`
  );
};

// get ownership
const GetOwnershipOfLicenseRequest = async (
  licenseRequestSectionId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetOwnershipOfLicenseRequestByExpert?licenseRequestSectionId=${licenseRequestSectionId}`
  );
};

// get ownership
const GetOwnershipOfLicenseRequestByIssuingResponsible = async (
  licenseRequestSectionId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetOwnershipOfLicenseRequestByIssuingResponsible?licenseRequestSectionId=${licenseRequestSectionId}`
  );
};

// get ownership
const GetOwnershipOfLicenseRequestByJahadCenterManager = async (
  licenseRequestSectionId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetOwnershipOfLicenseRequestByJahadCenterManager?licenseRequestSectionId=${licenseRequestSectionId}`
  );
};

// get polygon of section
const GetSectionOfLicenseRequestById = async (
  licenseRequestSectionId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetSectionOfLicenseRequestByIdByExpert?liceseRequestSectionId=${licenseRequestSectionId}`
  );
};
// get polygon of section
const GetSectionOfLicenseRequestByIdByIssuingResponsible = async (
  licenseRequestSectionId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetSectionOfLicenseRequestByIdByIssuingResponsible?liceseRequestSectionId=${licenseRequestSectionId}`
  );
}; // get polygon of section
const GetSectionOfLicenseRequestByIdByJahadCenterManager = async (
  licenseRequestSectionId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetSectionOfLicenseRequestByIdByJahadCenterManager?liceseRequestSectionId=${licenseRequestSectionId}`
  );
};
const GetActivityOfLicenseRequestSection = async (
  licenseRequestSectionId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetActivityOfLicenseRequestSectionByExpert?licenseRequestSectionId=${licenseRequestSectionId}`
  );
};
const GetActivityOfLicenseRequestByExpert = async (
  licenseRequestSectionId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetActivityOfLicenseRequestByExpert?licenseRequestId=${licenseRequestSectionId}`
  );
};

const GetActivityOfLicenseRequestSectionByIssuingResponsible = async (
  licenseRequestSectionId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetActivityOfLicenseRequestSectionByIssuingResponsible?licenseRequestSectionId=${licenseRequestSectionId}`
  );
};

const GetActivityOfLicenseRequestByIssuingResponsible = async (
  licenseRequestSectionId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetActivityOfLicenseRequestByIssuingResponsible?licenseRequestId=${licenseRequestSectionId}`
  );
};

const GetWaterConsumptionByIdByExpert = async (
  AgriculturalWaterConsumptionId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetWaterConsumptionByIdByExpert?AgriculturalWaterConsumptionId=${AgriculturalWaterConsumptionId}`
  );
};

const GetWaterConsumptionByIdByIssuingResponsible = async (
  AgriculturalWaterConsumptionId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetWaterConsumptionByIdByIssuingResponsible?AgriculturalWaterConsumptionId=${AgriculturalWaterConsumptionId}`
  );
};

const GetWaterConsumptionByIdByJahadCenterManager = async (
  AgriculturalWaterConsumptionId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetWaterConsumptionByIdByJahadCenterManager?AgriculturalWaterConsumptionId=${AgriculturalWaterConsumptionId}`
  );
};

const GetActivityOfLicenseRequestSectionByJahadCenterManager = async (
  licenseRequestSectionId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetActivityOfLicenseRequestSectionByJahadCenterManager?licenseRequestSectionId=${licenseRequestSectionId}`
  );
};
const GetActivityOfLicenseRequestByJahadCenterManager = async (
  licenseRequestSectionId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetActivityOfLicenseRequestByJahadCenterManager?licenseRequestId=${licenseRequestSectionId}`
  );
};
const GetBuildingOfLicenseReuestSection = async (
  licenseRequestSectionId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetBuildingOfLicenseReuestSectionByExpert?licenseRequestSectionId=${licenseRequestSectionId}`
  );
};
const GetBuildingOfLicenseReuestSectionByIssuingResponsible = async (
  licenseRequestSectionId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetBuildingOfLicenseReuestSectionByIssuingResponsible?licenseRequestSectionId=${licenseRequestSectionId}`
  );
};
const GetBuildingOfLicenseReuestSectionByJahadCenterManager = async (
  licenseRequestSectionId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetBuildingOfLicenseReuestSectionByJahadCenterManager?licenseRequestSectionId=${licenseRequestSectionId}`
  );
};
const GetBusinessServiceOfLicenseRequestSection = async (
  licenseRequestSectionId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetBusinessServiceOfLicenseRequestSectionByExpert?licenseRequestSectionId=${licenseRequestSectionId}`
  );
};
const GetBusinessServiceOfLicenseRequestByExpert = async (
  licenseRequestSectionId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetBusinessServiceOfLicenseRequestByExpert?licenseRequestId=${licenseRequestSectionId}`
  );
};
const GetBusinessServiceOfLicenseRequestSectionByIssuingResponsible = async (
  licenseRequestSectionId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetBusinessServiceOfLicenseRequestSectionByIssuingResponsible?licenseRequestSectionId=${licenseRequestSectionId}`
  );
};

const GetBusinessServiceOfLicenseRequestByIssuingResponsible = async (
  licenseRequestId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetBusinessServiceOfLicenseRequestByIssuingResponsible?licenseRequestId=${licenseRequestId}`
  );
};

const GetBusinessServiceOfLicenseRequestSectionByJahadCenterManager = async (
  licenseRequestSectionId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetBusinessServiceOfLicenseRequestSectionByJahadCenterManager?licenseRequestSectionId=${licenseRequestSectionId}`
  );
};

const GetBusinessServiceOfLicenseRequestByJahadCenterManager = async (
  licenseRequestSectionId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetBusinessServiceOfLicenseRequestByJahadCenterManager?licenseRequestId=${licenseRequestSectionId}`
  );
};

const GetDraftOfMatching = async (
  licenseRequestId: number
): Promise<AxiosResponse<any>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestMatching/GetDraftOfMatching?licenseRequestId=${licenseRequestId}`,
    {
      responseType: "blob",
    }
  );
};

const GetConversionIndustriesServiceOfLicenseRequestSection = async (
  licenseRequestSectionId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetConversionIndustriesServiceOfLicenseRequestSectionByExpert?licenseRequestSectionId=${licenseRequestSectionId}`
  );
};

const GetConversionIndustriesServiceOfLicenseRequestByExpert = async (
  licenseRequestSectionId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetConversionIndustriesServiceOfLicenseRequestByExpert?licenseRequestId=${licenseRequestSectionId}`
  );
};

const GetConversionIndustriesServiceOfLicenseRequestSectionByIssuingResponsible =
  async (
    licenseRequestSectionId: number
  ): Promise<AxiosResponse<IAxiosResult>> => {
    return await methods.get(
      `${MainUrl}/api/LicenseRequestGet/GetConversionIndustriesServiceOfLicenseRequestSectionByIssuingResponsible?licenseRequestSectionId=${licenseRequestSectionId}`
    );
  };

const GetConversionIndustriesServiceOfLicenseRequestByIssuingResponsible =
  async (
    licenseRequestSectionId: number
  ): Promise<AxiosResponse<IAxiosResult>> => {
    return await methods.get(
      `${MainUrl}/api/LicenseRequestGet/GetConversionIndustriesServiceOfLicenseRequestByIssuingResponsible?licenseRequestId=${licenseRequestSectionId}`
    );
  };

const GetConversionIndustriesServiceOfLicenseRequestSectionByJahadCenterManager =
  async (
    licenseRequestSectionId: number
  ): Promise<AxiosResponse<IAxiosResult>> => {
    return await methods.get(
      `${MainUrl}/api/LicenseRequestGet/GetConversionIndustriesServiceOfLicenseRequestSectionByJahadCenterManager?licenseRequestSectionId=${licenseRequestSectionId}`
    );
  };

const GetConversionIndustriesServiceOfLicenseRequestByJahadCenterManager =
  async (
    licenseRequestSectionId: number
  ): Promise<AxiosResponse<IAxiosResult>> => {
    return await methods.get(
      `${MainUrl}/api/LicenseRequestGet/GetConversionIndustriesServiceOfLicenseRequestByJahadCenterManager?licenseRequestId=${licenseRequestSectionId}`
    );
  };

const GetConsultingServicesOfLicenseRequestSection = async (
  licenseRequestSectionId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetConsultingServicesOfLicenseRequestSectionByExpert?licenseRequestSectionId=${licenseRequestSectionId}`
  );
};

const GetConsultingServicesOfLicenseRequestByExpert = async (
  licenseRequestSectionId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetConsultingServicesOfLicenseRequestByExpert?licenseRequestId=${licenseRequestSectionId}`
  );
};

const GetConsultingServicesOfLicenseRequestSectionByIssuingResponsible = async (
  licenseRequestSectionId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetConsultingServicesOfLicenseRequestSectionByIssuingResponsible?licenseRequestSectionId=${licenseRequestSectionId}`
  );
};

const DownloadOtherInfoCertificateByUserApplicant = async (
  id: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequest/DownloadOtherInfoCertificateByUserApplicant?licenseRequestId=${id}`
  );
};

const GetConsultingServicesOfLicenseRequestByIssuingResponsible = async (
  licenseRequestSectionId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetConsultingServicesOfLicenseRequestByIssuingResponsible?licenseRequestId=${licenseRequestSectionId}`
  );
};
const GetConsultingServicesOfLicenseRequestSectionByJahadCenterManager = async (
  licenseRequestSectionId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetConsultingServicesOfLicenseRequestSectionByJahadCenterManager?licenseRequestSectionId=${licenseRequestSectionId}`
  );
};
const GetConsultingServicesOfLicenseRequestByJahadCenterManager = async (
  licenseRequestSectionId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestGet/GetConsultingServicesOfLicenseRequestByJahadCenterManager?licenseRequestId=${licenseRequestSectionId}`
  );
};

const postAcceptLicenseReqestExpertiseByExpert = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequest/AcceptLicenseReqestExpertiseByExpert`,
    data
  );
};
const GetMachinaryConsomptionTabsByExpert = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestGet/GetMachinaryConsomptionTabsByExpert`,
    data
  );
};

const GetMachinaryConsomptionTabsByIssuingResponsible = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestGet/GetMachinaryConsomptionTabsByIssuingResponsible`,
    data
  );
};

const GetMachinaryConsomptionTabsByJahadCenterManager = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestGet/GetMachinaryConsomptionTabsByJahadCenterManager`,
    data
  );
};

const SetSoilMachineryConsumption = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestConsomption/SetSoilMachineryConsumption`,
    data
  );
};

const SetPlantingMachineryConsumption = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestConsomption/SetPlantingMachineryConsumption`,
    data
  );
};

const SetKeepMachineryConsumption = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestConsomption/SetKeepMachineryConsumption`,
    data
  );
};

const SetHarvestMachineryConsumption = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestConsomption/SetHarvestMachineryConsumption`,
    data
  );
};

const SetAfterHarvestMachineryConsumption = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestConsomption/SetAfterHarvestMachineryConsumption`,
    data
  );
};

const SetAnimalsHarvestMachineryConsumption = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestConsomption/SetAnimalsHarvestMachineryConsumption`,
    data
  );
};

const SetBuildingOfLicenseReuestSection = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestExpert/SetBuildingOfLicenseReuestSection`,
    data
  );
};

const GetExpertActivitiesReport = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestReport/GetExpertActivitiesReport`,
    data
  );
};

const RejectByJahad = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestMatching/RejectByJahad`,
    data
  );
};

const SetLicenseRequestVisitDateByExpert = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestExpert/SetLicenseRequestVisitDateByExpert`,
    data
  );
};
const SetPrimaryInformationOfLicenseRequestByExpert = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestExpert/SetPrimaryInformationOfLicenseRequestByExpert`,
    data
  );
};
const AcceptAfterVisit = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestExpert/AcceptAfterVisit`,
    data
  );
};
const RejectAfterVisit = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestExpert/RejectAfterVisit`,
    data
  );
};
const SetConfirmationOfLicenseRequestDocumentation = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestMatching/SetConfirmationOfLicenseRequestDocumentation`,
    data
  );
};
const ConfirmAllDocumentByIssuingResponsible = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestMatching/ConfirmAllDocumentByIssuingResponsible`,
    data
  );
};
const RegisterPlanSectionMap = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestMatching/RegisterPlanSectionMap`,
    data
  );
};
const RejectAllDocumentByIssuingResponsible = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestMatching/RejectAllDocumentByIssuingResponsible`,
    data
  );
};

const postRejectLicenseReqestExpertiseByExpert = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequest/RejectLicenseReqestExpertiseByExpert`,
    data
  );
};
const postSetTreesOfLicenseRequestSection = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestExpert/SetTreesOfLicenseRequestSection`,
    data
  );
};
const SetAgriculturalMechanizationServiceOfLicenseRequestSection = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestExpert/SetAgriculturalMechanizationServiceOfLicenseRequestSection`,
    data
  );
};
const SetAgriculturalMechanizationServiceOfLicenseRequest = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestExpert/SetAgriculturalMechanizationServiceOfLicenseRequest`,
    data
  );
};

const SetActivityOfLicenseRequestSection = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestExpert/SetActivityOfLicenseRequestSection`,
    data
  );
};

const SetActivityOfLicenseRequest = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestExpert/SetActivityOfLicenseRequest`,
    data
  );
};

const SetTreesOfLicenseRequestSection = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestExpert/SetTreesOfLicenseRequestSection`,
    data
  );
};
const postSetLicensRequest = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequest/SetLicensRequest`,
    data
  );
};
const ConfirmRoutingAndPlanMap = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestMatching/ConfirmRoutingAndPlanMap`,
    data
  );
};
const CompleteRequiredDocumentAndSendToMathing = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestExpert/CompleteRequiredDocumentAndSendToMathing?licenseRequestId=${id}`
  );
};
const DeleteLicenseRequestSection = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestExpert/DeleteLicenseRequestSection?licenseRequsetSectionId=${id}`
  );
};
export const useGetLicenseRequestDetailByExpert = (id: number) => {
  return useQuery("GetLicenseRequestDetailByExpert", () =>
    GetLicenseRequestDetailByExpert(id)
  );
};
export const useGetLicenseRequestDetailByJahadCenterManager = (id: number) => {
  return useQuery("GetLicenseRequestDetailByJahadCenterManager", () =>
    GetLicenseRequestDetailByJahadCenterManager(id)
  );
};

export const useGetLicenseRequestDetailByIssuingResponsible = (id: number) => {
  return useQuery("GetLicenseRequestDetailByIssuingResponsible", () =>
    GetLicenseRequestDetailByIssuingResponsible(id)
  );
};
export const useGetLicenseRequestDetailByIssuingResponsibleWithRefetch = (
  id: number
) => {
  return useQuery(
    "GetLicenseRequestDetailByIssuingResponsible",
    () => GetLicenseRequestDetailByIssuingResponsible(id),
    { enabled: false }
  );
};
export const useGetTreesOfLicenseRequestSection = (id: number) => {
  return useQuery(
    "GetTreesOfLicenseRequestSection",
    () => GetTreesOfLicenseRequestSection(id),
    { enabled: false }
  );
};
export const useGetTreesOfLicenseRequestSectionByIssuingResponsible = (
  id: number
) => {
  return useQuery(
    "GetTreesOfLicenseRequestSectionByIssuingResponsible",
    () => GetTreesOfLicenseRequestSectionByIssuingResponsible(id),
    { enabled: false }
  );
};
export const useGetTreesOfLicenseRequestSectionByJahadCenterManager = (
  id: number
) => {
  return useQuery(
    "GetTreesOfLicenseRequestSectionByJahadCenterManager",
    () => GetTreesOfLicenseRequestSectionByJahadCenterManager(id),
    { enabled: false }
  );
};
export const useGetLicenseRequestRateById = (id: number) => {
  return useQuery("GetLicenseRequestRateById", () =>
    GetLicenseRequestRateById(id)
  );
};

export const usePostGetLicenseRequestRateById = () => {
  return useMutation(GetLicenseRequestRateById, {});
};

export const useConfirmByIssuingManagerAfterMatchingPeyment = () => {
  return useMutation(ConfirmByIssuingManagerAfterMatchingPeyment, {});
};

export const useRejectByIssuingManagerAfterMatchingPeyment = () => {
  return useMutation(RejectByIssuingManagerAfterMatchingPeyment, {});
};

export const useGetLicenseRequestRequiredTabs = () => {
  return useMutation(GetLicenseRequestRequiredTabs, {});
};
export const useGetLicenseRequestRequiredTabsByIssuingResponsible = () => {
  return useMutation(GetLicenseRequestRequiredTabsByIssuingResponsible, {});
};
export const useGetLicenseRequestRequiredTabsByJahadCenterManager = () => {
  return useMutation(GetLicenseRequestRequiredTabsByJahadCenterManager, {});
};
export const useGetActiveLiceseRequestExpert = (id: number) => {
  return useQuery(
    "GetActiveLiceseRequestExpert",
    () => GetActiveLiceseRequestExpert(id),
    {
      enabled: false,
    }
  );
};
const postGetAllMyLicenseRequest = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequest/GetAllMyLicenseRequest`,
    data
  );
};
const GetMyLicense = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(`${MainUrl}/api/License/GetMyLicense`, data);
};
const postSetConsultingServicesOfLicenseRequestSection = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestExpert/SetConsultingServicesOfLicenseRequestSection`,
    data
  );
};

const SetConsultingServicesOfLicenseRequest = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestExpert/SetConsultingServicesOfLicenseRequest`,
    data
  );
};

const postSetBusinessServiceOfLicenseRequestSection = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestExpert/SetBusinessServiceOfLicenseRequestSection`,
    data
  );
};

const SetBusinessServiceOfLicenseRequest = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestExpert/SetBusinessServiceOfLicenseRequest`,
    data
  );
};

const postSetConversionIndustriesServiceOfLicenseRequestSection = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestExpert/SetConversionIndustriesServiceOfLicenseRequestSection`,
    data
  );
};

const SetConversionIndustriesServiceOfLicenseRequest = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestExpert/SetConversionIndustriesServiceOfLicenseRequest`,
    data
  );
};

const SetLicenseRequestBoundaries = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestExpert/SetLicenseRequestBoundaries`,
    data
  );
};

const SetGuildIdBySecratriate = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequest/SetGuildIdBySecratriate`,
    data
  );
};
const SetTopographyOfLicenseReuest = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.post(
    `${MainUrl}/api/LicenseRequestExpert/SetTopographyOfLicenseReuest`,
    data
  );
};
const GetUserMachineByExpert = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestExpert/GetUserMachineByExpert?licenseRequestId=${id}`
  );
};
const GetUserAgriculturalToolsAndServicesByExpert = async (
  id: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/LicenseRequestExpert/GetUserAgriculturalToolsAndServicesByExpert?licenseRequestId=${id}`
  );
};
const GetCountyPoligon = async (
  countyId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    `${MainUrl}/api/Location/GetCountyPoligon?countyId=${countyId}`
  );
};

const GetAllMyLicenseRequest = async (
  countyId: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    MainUrl + `/api/LicenseRequest/GetAllMyLicenseRequest`
  );
};
const SendExpertisingToMacthing = async (
  licenseRequestId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    MainUrl +
      `/api/LicenseRequestExpert/SendExpertisingToMacthing?licenseRequestId=${licenseRequestId}`
  );
};
const SelectLicenseRequestByUnionIssuingResponsible = async (
  licenseRequestId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    MainUrl +
      `/api/LicenseRequestMatching/SelectLicenseRequestByUnionIssuingResponsible?licenseRequestId=${licenseRequestId}`
  );
};
const SelectLicenseRequestBySecretariat = async (
  licenseRequestId: number
): Promise<AxiosResponse<IAxiosResult>> => {
  return await methods.get(
    MainUrl +
      `/api/LicenseRequest/SelectLicenseRequestBySecretariat?licenseReqiestId=${licenseRequestId}`
  );
};
const GetOwnedUserUnionForUnionUnionIssuingResponsible = async (): Promise<
  AxiosResponse<IAxiosResult>
> => {
  return await methods.get(
    MainUrl + `/api/Union/GetOwnedUserUnionForUnionUnionIssuingResponsible`
  );
};
const GetOwnedUserUnionForUnionUnionIssuingManager = async (): Promise<
  AxiosResponse<IAxiosResult>
> => {
  return await methods.get(
    MainUrl + `/api/Union/GetOwnedUserUnionForUnionUnionIssuingManager`
  );
};
const GetOwnedUserUnionForUnionUnionExpert = async (): Promise<
  AxiosResponse<IAxiosResult>
> => {
  return await methods.get(
    MainUrl + `/api/Union/GetOwnedUserUnionForUnionUnionExpert`
  );
};
export const useGetOwnedUserUnionForUnionUnionExpert = () => {
  return useQuery(
    "GetOwnedUserUnionForUnionUnionExpert",
    GetOwnedUserUnionForUnionUnionExpert,
    {}
  );
};
export const useGetOwnedUserUnionForUnionUnionIssuingResponsible = () => {
  return useQuery(
    "GetOwnedUserUnionForUnionUnionIssuingResponsible",
    GetOwnedUserUnionForUnionUnionIssuingResponsible,
    {}
  );
};
export const useGetOwnedUserUnionForUnionUnionIssuingManager = () => {
  return useQuery(
    "GetOwnedUserUnionForUnionUnionIssuingManager",
    GetOwnedUserUnionForUnionUnionIssuingManager,
    {}
  );
};

export const usePostGetAllMyLicenseRequest = () => {
  return useMutation(postGetAllMyLicenseRequest, {});
};

export const useGetMyLicense = () => {
  return useMutation(GetMyLicense, {});
};

export const usePostSetConsultingServicesOfLicenseRequestSection = () => {
  return useMutation(postSetConsultingServicesOfLicenseRequestSection, {});
};

export const useSetConsultingServicesOfLicenseRequest = () => {
  return useMutation(SetConsultingServicesOfLicenseRequest, {});
};

export const usePostSetBusinessServiceOfLicenseRequestSection = () => {
  return useMutation(postSetBusinessServiceOfLicenseRequestSection, {});
};

export const useSetBusinessServiceOfLicenseRequest = () => {
  return useMutation(SetBusinessServiceOfLicenseRequest, {});
};

export const usePostSetConversionIndustriesServiceOfLicenseRequestSection =
  () => {
    return useMutation(
      postSetConversionIndustriesServiceOfLicenseRequestSection,
      {}
    );
  };

export const useSetConversionIndustriesServiceOfLicenseRequest = () => {
  return useMutation(SetConversionIndustriesServiceOfLicenseRequest, {});
};

export const useSetLicenseRequestBoundaries = () => {
  return useMutation(SetLicenseRequestBoundaries, {});
};

export const useSetGuildIdBySecratriate = () => {
  return useMutation(SetGuildIdBySecratriate, {});
};

export const useSetTopographyOfLicenseReuest = () => {
  return useMutation(SetTopographyOfLicenseReuest, {});
};

export const useGetCountyPoligon = () => {
  return useMutation(GetCountyPoligon, {});
};

export const useSetOwnershipOfLicenseRequest = () => {
  return useMutation(SetOwnershipOfLicenseRequest, {});
};

export const useGetAllWaitingForIssuingResponsibleLicenseRequestByUnionId =
  () => {
    return useMutation(
      GetAllWaitingForIssuingResponsibleLicenseRequestByUnionId,
      {}
    );
  };

export const useGetAllLicenseRequestBySecretariat = () => {
  return useMutation(GetAllLicenseRequestBySecretariat, {});
};

export const useGetSecretariatLicenseRequestCartableByFilter = () => {
  return useMutation(GetSecretariatLicenseRequestCartableByFilter, {});
};

export const useGetIssuingResponsibleLicenseCartableOfLicenseRequestByFilter =
  () => {
    return useMutation(
      GetIssuingResponsibleLicenseCartableOfLicenseRequestByFilter,
      {}
    );
  };
export const useGetIssuingManagerLicenseCartableOfLicenseRequestByFilter =
  () => {
    return useMutation(
      GetIssuingManagerLicenseCartableOfLicenseRequestByFilter,
      {}
    );
  };

export const usePostSetLicensRequest = () => {
  return useMutation(postSetLicensRequest, {});
};

export const useCompleteRequiredDocumentAndSendToMathing = () => {
  return useMutation(CompleteRequiredDocumentAndSendToMathing, {});
};

export const useDeleteLicenseRequestSection = () => {
  return useMutation(DeleteLicenseRequestSection, {});
};

export const usePostSetTreesOfLicenseRequestSection = () => {
  return useMutation(postSetTreesOfLicenseRequestSection, {});
};

export const useSetAgriculturalMechanizationServiceOfLicenseRequestSection =
  () => {
    return useMutation(
      SetAgriculturalMechanizationServiceOfLicenseRequestSection,
      {}
    );
  };

export const useSetAgriculturalMechanizationServiceOfLicenseRequest = () => {
  return useMutation(SetAgriculturalMechanizationServiceOfLicenseRequest, {});
};

export const useSetActivityOfLicenseRequestSection = () => {
  return useMutation(SetActivityOfLicenseRequestSection, {});
};

export const useSetActivityOfLicenseRequest = () => {
  return useMutation(SetActivityOfLicenseRequest, {});
};

export const useSetTreesOfLicenseRequestSection = () => {
  return useMutation(SetTreesOfLicenseRequestSection, {});
};

export const usePostGetAllJobByCountyAndUseType = () => {
  return useMutation(postGetAllJobByCountyAndUseType, {});
};

export const useConfirmExpertMacthing = () => {
  return useMutation(ConfirmExpertMacthing, {});
};

export const useRejectExpertMatching = () => {
  return useMutation(RejectExpertMatching, {});
};

export const useSendExpertisingToMacthing = () => {
  return useMutation(SendExpertisingToMacthing, {});
};
export const useSelectLicenseRequestByUnionIssuingResponsible = () => {
  return useMutation(SelectLicenseRequestByUnionIssuingResponsible, {});
};
export const useSelectLicenseRequestBySecretariat = () => {
  return useMutation(SelectLicenseRequestBySecretariat, {});
};
export const useGetAllMyLicenseRequest = () => {
  return useQuery("GetAllMyLicenseRequest", GetAllMyLicenseRequest);
};

export const useGetTopographyOfLicenseReuest = (id: number) => {
  return useQuery("GetTopographyOfLicenseReuest", () =>
    GetTopographyOfLicenseReuest(id)
  );
};

export const useGetTopographyOfLicenseReuestByIssuingResponsible = (
  id: number
) => {
  return useQuery("GetTopographyOfLicenseReuestByIssuingResponsible", () =>
    GetTopographyOfLicenseReuestByIssuingResponsible(id)
  );
};

export const useGetTopographyOfLicenseReuestByJahadCenterManager = (
  id: number
) => {
  return useQuery("GetTopographyOfLicenseReuestByJahadCenterManager", () =>
    GetTopographyOfLicenseReuestByJahadCenterManager(id)
  );
};

export const useGetBoundariesOfLicenseRequestSection = (id: number) => {
  return useQuery("GetBoundariesOfLicenseRequestSection", () =>
    GetBoundariesOfLicenseRequestSection(id)
  );
};

export const useGetBoundariesOfLicenseRequestSectionByIssuingResponsible = (
  id: number
) => {
  return useQuery(
    "GetBoundariesOfLicenseRequestSectionByIssuingResponsible",
    () => GetBoundariesOfLicenseRequestSectionByIssuingResponsible(id)
  );
};

export const useGetBoundariesOfLicenseRequestSectionByJahadCenterManager = (
  id: number
) => {
  return useQuery(
    "GetBoundariesOfLicenseRequestSectionByJahadCenterManager",
    () => GetBoundariesOfLicenseRequestSectionByJahadCenterManager(id)
  );
};

export const useGetOwnershipOfLicenseRequest = (id: number) => {
  return useQuery("GetOwnershipOfLicenseRequest", () =>
    GetOwnershipOfLicenseRequest(id)
  );
};

export const useGetOwnershipOfLicenseRequestByIssuingResponsible = (
  id: number
) => {
  return useQuery("GetOwnershipOfLicenseRequestByIssuingResponsible", () =>
    GetOwnershipOfLicenseRequestByIssuingResponsible(id)
  );
};

export const useGetOwnershipOfLicenseRequestByJahadCenterManager = (
  id: number
) => {
  return useQuery("GetOwnershipOfLicenseRequestByJahadCenterManager", () =>
    GetOwnershipOfLicenseRequestByJahadCenterManager(id)
  );
};

export const useGetSectionOfLicenseRequestById = (id: number) => {
  return useQuery("GetSectionOfLicenseRequestById", () =>
    GetSectionOfLicenseRequestById(id)
  );
};
export const useGetSectionOfLicenseRequestByIdByIssuingResponsible = (
  id: number
) => {
  return useQuery("GetSectionOfLicenseRequestByIdByIssuingResponsible", () =>
    GetSectionOfLicenseRequestByIdByIssuingResponsible(id)
  );
};
export const usePostGetSectionOfLicenseRequestByIdByIssuingResponsible = () => {
  return useMutation(GetSectionOfLicenseRequestByIdByIssuingResponsible);
};
export const useGetSectionOfLicenseRequestByIdByJahadCenterManager = (
  id: number
) => {
  return useQuery("GetSectionOfLicenseRequestByIdByJahadCenterManager", () =>
    GetSectionOfLicenseRequestByIdByJahadCenterManager(id)
  );
};

export const useGetActivityOfLicenseRequestSection = (id: number) => {
  return useQuery(
    "GetActivityOfLicenseRequestSection",
    () => GetActivityOfLicenseRequestSection(id),
    { enabled: false }
  );
};

export const useGetActivityOfLicenseRequestByExpert = (id: number) => {
  return useQuery(
    "GetActivityOfLicenseRequestByExpert",
    () => GetActivityOfLicenseRequestByExpert(id),
    { enabled: false }
  );
};

export const useGetActivityOfLicenseRequestSectionByIssuingResponsible = (
  id: number
) => {
  return useQuery(
    "GetActivityOfLicenseRequestSectionByIssuingResponsible",
    () => GetActivityOfLicenseRequestSectionByIssuingResponsible(id),
    { enabled: false }
  );
};
export const useGetActivityOfLicenseRequestByIssuingResponsible = (
  id: number
) => {
  return useQuery(
    "GetActivityOfLicenseRequestByIssuingResponsible",
    () => GetActivityOfLicenseRequestByIssuingResponsible(id),
    { enabled: false }
  );
};
export const useGetActivityOfLicenseRequestSectionByJahadCenterManager = (
  id: number
) => {
  return useQuery(
    "GetActivityOfLicenseRequestSectionByJahadCenterManager",
    () => GetActivityOfLicenseRequestSectionByJahadCenterManager(id),
    { enabled: false }
  );
};
export const useGetActivityOfLicenseRequestByJahadCenterManager = (
  id: number
) => {
  return useQuery(
    "GetActivityOfLicenseRequestByJahadCenterManager",
    () => GetActivityOfLicenseRequestByJahadCenterManager(id),
    { enabled: false }
  );
};
export const useGetBuildingOfLicenseReuestSection = (id: number) => {
  return useQuery(
    "GetBuildingOfLicenseReuestSection",
    () => GetBuildingOfLicenseReuestSection(id),
    { enabled: false }
  );
};
export const useGetBuildingOfLicenseReuestSectionByIssuingResponsible = (
  id: number
) => {
  return useQuery(
    "GetBuildingOfLicenseReuestSectionByIssuingResponsible",
    () => GetBuildingOfLicenseReuestSectionByIssuingResponsible(id),
    { enabled: false }
  );
};
export const useGetBuildingOfLicenseReuestSectionByJahadCenterManager = (
  id: number
) => {
  return useQuery(
    "GetBuildingOfLicenseReuestSectionByJahadCenterManager",
    () => GetBuildingOfLicenseReuestSectionByJahadCenterManager(id),
    { enabled: false }
  );
};

export const useGetBusinessServiceOfLicenseRequestSection = (id: number) => {
  return useQuery(
    "GetBusinessServiceOfLicenseRequestSection",
    () => GetBusinessServiceOfLicenseRequestSection(id),
    { enabled: false }
  );
};

export const useGetBusinessServiceOfLicenseRequestByExpert = (id: number) => {
  return useQuery(
    "GetBusinessServiceOfLicenseRequestByExpert",
    () => GetBusinessServiceOfLicenseRequestByExpert(id),
    { enabled: false }
  );
};

export const useGetBusinessServiceOfLicenseRequestSectionByIssuingResponsible =
  (id: number) => {
    return useQuery(
      "GetBusinessServiceOfLicenseRequestSectionByIssuingResponsible",
      () => GetBusinessServiceOfLicenseRequestSectionByIssuingResponsible(id),
      { enabled: false }
    );
  };

export const useGetBusinessServiceOfLicenseRequestByIssuingResponsible = (
  id: number
) => {
  return useQuery(
    "GetBusinessServiceOfLicenseRequestByIssuingResponsible",
    () => GetBusinessServiceOfLicenseRequestByIssuingResponsible(id),
    { enabled: false }
  );
};

export const useGetBusinessServiceOfLicenseRequestSectionByJahadCenterManager =
  (id: number) => {
    return useQuery(
      "GetBusinessServiceOfLicenseRequestSectionByJahadCenterManager",
      () => GetBusinessServiceOfLicenseRequestSectionByJahadCenterManager(id),
      { enabled: false }
    );
  };

export const useGetBusinessServiceOfLicenseRequestByJahadCenterManager = (
  id: number
) => {
  return useQuery(
    "GetBusinessServiceOfLicenseRequestByJahadCenterManager",
    () => GetBusinessServiceOfLicenseRequestByJahadCenterManager(id),
    { enabled: false }
  );
};

export const useGetDraftOfMatching = (id: number) => {
  return useQuery("GetDraftOfMatching", () => GetDraftOfMatching(id), {
    enabled: false,
  });
};

export const useGetConversionIndustriesServiceOfLicenseRequestSection = (
  id: number
) => {
  return useQuery(
    "GetConversionIndustriesServiceOfLicenseRequestSection",
    () => GetConversionIndustriesServiceOfLicenseRequestSection(id),
    { enabled: false }
  );
};

export const useGetConversionIndustriesServiceOfLicenseRequestByExpert = (
  id: number
) => {
  return useQuery(
    "GetConversionIndustriesServiceOfLicenseRequestByExpert",
    () => GetConversionIndustriesServiceOfLicenseRequestByExpert(id),
    { enabled: false }
  );
};
export const useGetConversionIndustriesServiceOfLicenseRequestSectionByIssuingResponsible =
  (id: number) => {
    return useQuery(
      "GetConversionIndustriesServiceOfLicenseRequestSectionByIssuingResponsible",
      () =>
        GetConversionIndustriesServiceOfLicenseRequestSectionByIssuingResponsible(
          id
        ),
      { enabled: false }
    );
  };
export const useGetConversionIndustriesServiceOfLicenseRequestByIssuingResponsible =
  (id: number) => {
    return useQuery(
      "GetConversionIndustriesServiceOfLicenseRequestByIssuingResponsible",
      () =>
        GetConversionIndustriesServiceOfLicenseRequestByIssuingResponsible(id),
      { enabled: false }
    );
  };

export const useGetConversionIndustriesServiceOfLicenseRequestSectionByJahadCenterManager =
  (id: number) => {
    return useQuery(
      "GetConversionIndustriesServiceOfLicenseRequestSectionByJahadCenterManager",
      () =>
        GetConversionIndustriesServiceOfLicenseRequestSectionByJahadCenterManager(
          id
        ),
      { enabled: false }
    );
  };

export const useGetConversionIndustriesServiceOfLicenseRequestByJahadCenterManager =
  (id: number) => {
    return useQuery(
      "GetConversionIndustriesServiceOfLicenseRequestByJahadCenterManager",
      () =>
        GetConversionIndustriesServiceOfLicenseRequestByJahadCenterManager(id),
      { enabled: false }
    );
  };

export const useGetConsultingServicesOfLicenseRequestSection = (id: number) => {
  return useQuery(
    "GetConsultingServicesOfLicenseRequestSection",
    () => GetConsultingServicesOfLicenseRequestSection(id),
    { enabled: false }
  );
};

export const useGetConsultingServicesOfLicenseRequestByExpert = (
  id: number
) => {
  return useQuery(
    "GetConsultingServicesOfLicenseRequestByExpert",
    () => GetConsultingServicesOfLicenseRequestByExpert(id),
    { enabled: false }
  );
};

export const useGetConsultingServicesOfLicenseRequestSectionByIssuingResponsible =
  (id: number) => {
    return useQuery(
      "GetConsultingServicesOfLicenseRequestSectionByIssuingResponsible",
      () =>
        GetConsultingServicesOfLicenseRequestSectionByIssuingResponsible(id),
      { enabled: false }
    );
  };

export const useGetConsultingServicesOfLicenseRequestByIssuingResponsible = (
  id: number
) => {
  return useQuery(
    "GetConsultingServicesOfLicenseRequestByIssuingResponsible",
    () => GetConsultingServicesOfLicenseRequestByIssuingResponsible(id),
    { enabled: false }
  );
};

export const useGetConsultingServicesOfLicenseRequestSectionByJahadCenterManager =
  (id: number) => {
    return useQuery(
      "GetConsultingServicesOfLicenseRequestSectionByJahadCenterManager",
      () =>
        GetConsultingServicesOfLicenseRequestSectionByJahadCenterManager(id),
      { enabled: false }
    );
  };

export const useGetConsultingServicesOfLicenseRequestByJahadCenterManager = (
  id: number
) => {
  return useQuery(
    "GetConsultingServicesOfLicenseRequestByJahadCenterManager",
    () => GetConsultingServicesOfLicenseRequestByJahadCenterManager(id),
    { enabled: false }
  );
};

export const useGetMyLicenseRequest = () => {
  return useMutation(GetMyLicenseRequest);
};

export const useGetLicenseByQrCode = () => {
  return useMutation(GetLicenseByQrCode);
};

export const useGetWaterConsumptionByIdByExpert = () => {
  return useMutation(GetWaterConsumptionByIdByExpert);
};

export const useGetWaterConsumptionByIdByIssuingResponsible = () => {
  return useMutation(GetWaterConsumptionByIdByIssuingResponsible);
};

export const useGetWaterConsumptionByIdByJahadCenterManager = () => {
  return useMutation(GetWaterConsumptionByIdByJahadCenterManager);
};

export const useSendIntersectionToDistrictCourt = () => {
  return useMutation(SendIntersectionToDistrictCourt);
};

export const useGetRequirementDocumentOfLicenseRequest = (id: number) => {
  return useQuery("GetRequirementDocumentOfLicenseRequest", () =>
    GetRequirementDocumentOfLicenseRequest(id)
  );
};

export const useGetLicenseRequestSectionExpertIdeaByExpert = (id: number) => {
  return useQuery("GetLicenseRequestSectionExpertIdeaByExpert", () =>
    GetLicenseRequestSectionExpertIdeaByExpert(id)
  );
};

export const useGetLicenseRequestExpertIdeaByExpert = (id: number) => {
  return useQuery("GetLicenseRequestExpertIdeaByExpert", () =>
    GetLicenseRequestExpertIdeaByExpert(id)
  );
};
export const useGetLicenseRequestSectionExpertIdeaByJahadCenterManager = (
  id: number
) => {
  return useQuery(
    "GetLicenseRequestSectionExpertIdeaByJahadCenterManager",
    () => GetLicenseRequestSectionExpertIdeaByJahadCenterManager(id)
  );
};

export const useGetLicenseRequestExpertIdeaByJahadCenterManager = (
  id: number
) => {
  return useQuery("GetLicenseRequestExpertIdeaByJahadCenterManager", () =>
    GetLicenseRequestExpertIdeaByJahadCenterManager(id)
  );
};

export const useGetSectionLicenseRequestSectionExpertIdeaByIssuingResponsible =
  (id: number) => {
    return useQuery(
      "GetSectionLicenseRequestSectionExpertIdeaByIssuingResponsible",
      () => GetSectionLicenseRequestSectionExpertIdeaByIssuingResponsible(id)
    );
  };

export const useGetLicenseRequestExpertIdeaByIssuingResponsible = (
  id: number
) => {
  return useQuery("GetLicenseRequestExpertIdeaByIssuingResponsible", () =>
    GetLicenseRequestExpertIdeaByIssuingResponsible(id)
  );
};
export const useGetOwenUserJahadForManager = () => {
  return useQuery("GetOwenUserJahadForManager", GetOwenUserJahadForManager);
};

export const useGetUserAgriculturalToolsAndServicesByExpert = (id: number) => {
  return useQuery("GetUserAgriculturalToolsAndServicesByExpert", () =>
    GetUserAgriculturalToolsAndServicesByExpert(id)
  );
};
export const useGetUserMachineByExpert = (id: number) => {
  return useQuery("GetUserMachineByExpert", () => GetUserMachineByExpert(id));
};

export const useCheckLicenseRequestIntersects = () => {
  return useMutation(CheckLicenseRequestIntersects);
};

export const usePostGetExpertLicenseRequestCartableByFilter = () => {
  return useMutation(postGetExpertLicenseRequestCartableByFilter, {});
};

export const useGetAllLicenseRequestByUnionManager = () => {
  return useMutation(GetAllLicenseRequestByUnionManager, {});
};

export const useChangeIssuingResponsibleByUnionManager = () => {
  return useMutation(ChangeIssuingResponsibleByUnionManager, {});
};

export const useChangeLicenseRequestSecretariat = () => {
  return useMutation(ChangeLicenseRequestSecretariat, {});
};

export const useGetJahadCartableForLicenseRequest = () => {
  return useMutation(GetJahadCartableForLicenseRequest, {});
};
export const useSendLicenseRequestToExpert = () => {
  return useMutation(SendLicenseRequestToExpert, {});
};
export const useCreateLicenseRequestSection = () => {
  return useMutation(CreateLicenseRequestSection, {});
};
export const useGetMachineryConsumptionByExpert = () => {
  return useMutation(GetMachineryConsumptionByExpert, {});
};
export const useGetMachineryConsumptionByIssuingResponsible = () => {
  return useMutation(GetMachineryConsumptionByIssuingResponsible, {});
};
export const useGetMachineryConsumptionByJahadCenterManager = () => {
  return useMutation(GetMachineryConsumptionByJahadCenterManager, {});
};
export const useGetCurrentDistrictCourIntersectionByIssuingResponsuble = () => {
  return useMutation(
    GetCurrentDistrictCourIntersectionByIssuingResponsuble,
    {}
  );
};
export const useGetProductionFactorConsumptionByExpert = () => {
  return useMutation(GetProductionFactorConsumptionByExpert, {});
};
export const useGetProductionFactorConsumptionByIssuingResponsible = () => {
  return useMutation(GetProductionFactorConsumptionByIssuingResponsible, {});
};
export const useGetProductionFactorConsumptionByJahadCenterManager = () => {
  return useMutation(GetProductionFactorConsumptionByJahadCenterManager, {});
};
export const useUpdateLicenseRequestSection = () => {
  return useMutation(UpdateLicenseRequestSection, {});
};
export const useSendToJahad = () => {
  return useMutation(SendToJahad, {});
};
export const useCreateLetterToJahad = () => {
  return useMutation(CreateLetterToJahad, {});
};
export const useCreateJahadResponseLetterToIssuingResponsible = () => {
  return useMutation(CreateJahadResponseLetterToIssuingResponsible, {});
};
export const useSetFacilityAndOperationLicense = () => {
  return useMutation(SetFacilityAndOperationLicense, {});
};
export const useSetDistrictCourtResult = () => {
  return useMutation(SetDistrictCourtResult, {});
};
export const useDownloadOtherInfoCertificateByUserApplicant = () => {
  return useMutation(DownloadOtherInfoCertificateByUserApplicant, {});
};
export const useSendJahadIdeaForLicenseRequest = () => {
  return useMutation(SendJahadIdeaForLicenseRequest, {});
};
export const useConfirmJahadIdeaByIssuingResponsible = () => {
  return useMutation(ConfirmJahadIdeaByIssuingResponsible, {});
};
export const useGetLicenseRequestHistoryByExpert = () => {
  return useMutation(GetLicenseRequestHistoryByExpert, {});
};
export const useGetLicenseRequestHistoryByUser = () => {
  return useMutation(GetLicenseRequestHistoryByUser, {});
};
export const useGetLicenseRequestHistoryByIssuingResponsible = () => {
  return useMutation(GetLicenseRequestHistoryByIssuingResponsible, {});
};
export const useGetLicenseRequestHistoryBySecretariat = () => {
  return useMutation(GetLicenseRequestHistoryBySecretariat, {});
};
export const useRejectByIssuingResponsibleAfterJahadRejection = () => {
  return useMutation(RejectByIssuingResponsibleAfterJahadRejection, {});
};
export const usePostGetAllLicenseRequesByFilter = () => {
  return useMutation(postGetAllLicenseRequesByFilter, {});
};
export const usePostAcceptLicenseReqestExpertiseByExpert = () => {
  return useMutation(postAcceptLicenseReqestExpertiseByExpert, {});
};

export const useGetMachinaryConsomptionTabsByExpert = () => {
  return useMutation(GetMachinaryConsomptionTabsByExpert, {});
};

export const useGetMachinaryConsomptionTabsByIssuingResponsible = () => {
  return useMutation(GetMachinaryConsomptionTabsByIssuingResponsible, {});
};

export const useGetMachinaryConsomptionTabsByJahadCenterManager = () => {
  return useMutation(GetMachinaryConsomptionTabsByJahadCenterManager, {});
};

export const useSetSoilMachineryConsumption = () => {
  return useMutation(SetSoilMachineryConsumption, {});
};

export const useSetPlantingMachineryConsumption = () => {
  return useMutation(SetPlantingMachineryConsumption, {});
};

export const useSetKeepMachineryConsumption = () => {
  return useMutation(SetKeepMachineryConsumption, {});
};

export const useSetHarvestMachineryConsumption = () => {
  return useMutation(SetHarvestMachineryConsumption, {});
};

export const useSetAfterHarvestMachineryConsumption = () => {
  return useMutation(SetAfterHarvestMachineryConsumption, {});
};

export const useSetAnimalsHarvestMachineryConsumption = () => {
  return useMutation(SetAnimalsHarvestMachineryConsumption, {});
};

export const useRequestOrginalDocumentByIssuingResponsible = () => {
  return useMutation(RequestOrginalDocumentByIssuingResponsible, {});
};
export const useSetLicenseRequestVisitDateByExpert = () => {
  return useMutation(SetLicenseRequestVisitDateByExpert, {});
};
export const useSetPrimaryInformationOfLicenseRequestByExpert = () => {
  return useMutation(SetPrimaryInformationOfLicenseRequestByExpert, {});
};
export const usePostRejectLicenseReqestExpertiseByExpert = () => {
  return useMutation(postRejectLicenseReqestExpertiseByExpert, {});
};
export const useAcceptLicenseReqestExpertiseByExpert = () => {
  return useMutation(AcceptLicenseReqestExpertiseByExpert, {});
};
export const useRejectLicenseReqestExpertiseByExpert = () => {
  return useMutation(RejectLicenseReqestExpertiseByExpert, {});
};
export const useAcceptAfterVisit = () => {
  return useMutation(AcceptAfterVisit, {});
};
export const useSetConfirmationOfLicenseRequestDocumentation = () => {
  return useMutation(SetConfirmationOfLicenseRequestDocumentation, {});
};
export const useConfirmAllDocumentByIssuingResponsible = () => {
  return useMutation(ConfirmAllDocumentByIssuingResponsible, {});
};
export const useRejectAllDocumentByIssuingResponsible = () => {
  return useMutation(RejectAllDocumentByIssuingResponsible, {});
};
export const useRejectAfterVisit = () => {
  return useMutation(RejectAfterVisit, {});
};
export const useRegisterPlanSectionMap = () => {
  return useMutation(RegisterPlanSectionMap, {});
};
export const useGetPlanSectionMap = () => {
  return useMutation(GetPlanSectionMap, {});
};
export const useSetBuildingOfLicenseReuestSection = () => {
  return useMutation(SetBuildingOfLicenseReuestSection, {});
};
export const useGetExpertActivitiesReport = () => {
  return useMutation(GetExpertActivitiesReport, {});
};
export const useRejectByJahad = () => {
  return useMutation(RejectByJahad, {});
};
export const useConfirmDraftOfMatching = () => {
  return useMutation(ConfirmDraftOfMatching, {});
};
export const useConfirmUserApplicantMacthing = () => {
  return useMutation(ConfirmUserApplicantMacthing, {});
};
export const useSetExpertIdeaLicenseRequestSection = () => {
  return useMutation(SetExpertIdeaLicenseRequestSection, {});
};

export const useSetExpertIdeaLicenseRequest = () => {
  return useMutation(SetExpertIdeaLicenseRequest, {});
};

export const useRegisterRoutingMap = () => {
  return useMutation(RegisterRoutingMap, {});
};

export const useGetRoutingMap = () => {
  return useMutation(GetRoutingMap, {});
};

export const useRejectUserApplicantMatching = () => {
  return useMutation(RejectUserApplicantMatching, {});
};
export const useGetUserSection = () => {
  return useMutation(GetUserSection, {});
};
export const useGetBuildingSectionMap = () => {
  return useMutation(GetBuildingSectionMap, {});
};
export const useRegisterBuildingSectionMap = () => {
  return useMutation(RegisterBuildingSectionMap, {});
};
export const useConfirmRoutingAndPlanMap = () => {
  return useMutation(ConfirmRoutingAndPlanMap, {});
};
export const useReportRoutingMap = () => {
  return useMutation(ReportRoutingMap, {});
};
export const useReportRoutingMapForUnionIssuingResponsibleAndUnionSecretariat = () => {
  return useMutation(ReportRoutingMapForUnionIssuingResponsibleAndUnionSecretariat, {});
};
export const useReportPlanSectionMapForUser = () => {
  return useMutation(ReportPlanSectionMapForUser, {});
};
export const useReportPlanSectionMapForUnionIssuingResponsibleAndUnionSecretariat = () => {
  return useMutation(ReportPlanSectionMapForUnionIssuingResponsibleAndUnionSecretariat, {});
};
export const useDownloadJahadLeterByLicenseRequestIdByIssuingResponsible =
  () => {
    return useMutation(
      DownloadJahadLeterByLicenseRequestIdByIssuingResponsible,
      {}
    );
  };
export const useDownloadLetterOfIntersctionForDIstrictCourt = () => {
  return useMutation(DownloadLetterOfIntersctionForDIstrictCourt, {
    onSettled: async (value: any, variables, context) => {
      const result = value.data;
      let data = new Blob([result], { type: "application/octet-stream" });
      let csvURL = window.URL.createObjectURL(data);
      let tempLink = document.createElement("a");
      tempLink.href = csvURL;
      tempLink.setAttribute("download", "Letter.docx");
      tempLink.click();
    },
  });
};
export const useDownloadLicenseBySecratraite = () => {
  return useMutation(DownloadLicenseBySecratraite, {
    onSettled: async (value: any, variables, context) => {
      const result = value.data;
      let data = new Blob([result], { type: "application/pdf" });
      let csvURL = window.URL.createObjectURL(data);
      let tempLink = document.createElement("a");
      tempLink.href = csvURL;
      tempLink.setAttribute("download", "license.pdf");
      tempLink.click();
    },
  });
};
export const useDownloadLicenseByUserApplicant = () => {
  return useMutation(DownloadLicenseByUserApplicant, {
    onSettled: async (value: any, variables, context) => {
      const result = value.data;
      let data = new Blob([result], { type: "application/pdf" });
      let csvURL = window.URL.createObjectURL(data);
      let tempLink = document.createElement("a");
      tempLink.href = csvURL;
      tempLink.setAttribute("download", "license.pdf");
      tempLink.click();
    },
  });
};
export const useDownloadCertificateByUserApplicant = () => {
  return useMutation(DownloadCertificateByUserApplicant, {
    onSettled: async (value: any, variables, context) => {
      const result = value.data;
      let data = new Blob([result], { type: "application/pdf" });
      let csvURL = window.URL.createObjectURL(data);
      let tempLink = document.createElement("a");
      tempLink.href = csvURL;
      tempLink.setAttribute("download", "certificate.pdf");
      tempLink.click();
    },
  });
};
export const useDownloadCertificateBySecratraite = () => {
  return useMutation(DownloadCertificateBySecratraite, {
    onSettled: async (value: any, variables, context) => {
      const result = value.data;
      let data = new Blob([result], { type: "application/pdf" });
      let csvURL = window.URL.createObjectURL(data);
      let tempLink = document.createElement("a");
      tempLink.href = csvURL;
      tempLink.setAttribute("download", "certificate.pdf");
      tempLink.click();
    },
  });
};
export const useServeJahadLeterByLicenseRequestIdByJahadManager = () => {
  return useMutation(ServeLicenseRequestFile, {
    onSettled: async (value: any, variables, context) => {
      const result = value.data;
      let data = new Blob([result], { type: "application/octet-stream" });
      let csvURL = window.URL.createObjectURL(data);
      let tempLink = document.createElement("a");
      tempLink.href = csvURL;
      tempLink.setAttribute("download", "Letter.docx");
      tempLink.click();
    },
  });
};

export const useDownloadJahadLeterByLicenseRequestIdByJahadManager = () => {
  return useMutation(DownloadJahadLeterByLicenseRequestIdByJahadManager, {
    //   onSettled: async (value: any, variables, context) => {
    //     try {
    //       const result = value.data;
    //       let data = new Blob([result]);
    //       let csvURL = window.URL.createObjectURL(data);
    //       let tempLink = document.createElement("a");
    //       tempLink.href = csvURL;
    //       tempLink.setAttribute("download", context);
    //       tempLink.click();
    //     } catch (error) {}
    //   },
  });
};
