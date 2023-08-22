import methods from "../interceptors/http.interceptor";
import { useMutation, useQuery } from "react-query";
import { AxiosResponse } from "axios";
import { IAxiosResult } from "../../models/axios-result.model";

const MainUrl = process.env.REACT_APP_PUBLIC_PATH;

const upload = async (document: any): Promise<AxiosResponse<IAxiosResult>> => {
  return methods.post(`${MainUrl}/api/Upload/UploadFiles`, document, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const SetProfilePicture = async (
  document: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return methods.post(`${MainUrl}/api/Profile/SetProfilePicture`, document, {
    headers: { "Content-Type": "multipart/form-data" },
  });
};

const ServeFile = async (
  fileName: string
): Promise<AxiosResponse<IAxiosResult>> => {
  return methods.get(`${MainUrl}/api/Upload/ServeFile?fileName=` + fileName, {
    responseType: "blob",
  });
};

const ServeFileByAdmins = async (
  file: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return methods.get(
    `${MainUrl}/api/Upload/ServeFileByAdmins?fileName=${file.fileName}&userId=${file.folderName}`,
    {
      responseType: "blob",
    }
  );
};






const ServePayableValueDocument = async (
  file: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return methods.get(
    `${MainUrl}/api/Upload/ServePayableValueDocument?fileName=${file.fileName}`,
    {
      responseType: "blob",
    }
  );
};
const ServePayableValueDocumentOfSharingPercent = async (
  file: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return methods.get(
    `${MainUrl}/api/Upload/ServePayableValueDocumentOfSharingPercent?fileName=${file.fileName}`,
    {
      responseType: "blob",
    }
  );
};
const ServeTariffDocument = async (
  file: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return methods.get(
    `${MainUrl}/api/Upload/ServeTariffDocument?fileName=${file.fileName}&folderName=${file.folderName}`,
    {
      responseType: "blob",
    }
  );
};





const ServePublicPicture = async (
  fileName: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return methods.get(
    `${MainUrl}/api/Upload/ServePublicPicture?fileName=${fileName}`,
    {
      responseType: "blob",
    }
  );
};
const ServeGuildRoomFileByAdmins = async (
  file: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return methods.get(
    `${MainUrl}/api/Upload/ServeGuildRoomFileByAdmins?fileName=${file.fileName}&guildRoomRequestId=${file.guildRoomRequestId}`,
    {
      responseType: "blob",
    }
  );
};
const ServeMainLocationGuildRoomFileByAdmins = async (
  file: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return methods.get(
    `${MainUrl}/api/Upload/ServeMainLocationGuildRoomFileByAdmins?fileName=${file.fileName}&guildRoomRequestId=${file.guildRoomRequestId}`,
    {
      responseType: "blob",
    }
  );
};
const ServeUnionFileByAdmins = async (
  file: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return methods.get(
    `${MainUrl}/api/Upload/ServeUnionFileByAdmins?fileName=${file.fileName}&unionRequestId=${file.guildRoomRequestId}`,
    {
      responseType: "blob",
    }
  );
};
const ServeProfilePicture = async (
  file: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return methods.get(
    `${MainUrl}/api/Upload/ServeProfilePicture?fileName=${file}`,
    {
      responseType: "blob",
    }
  );
};
const ServeLicenseRequestFile = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return methods.get(
    `${MainUrl}/api/Upload/ServeLicenseRequestFile?fileName=${data.fileName}&licenseRequestId=${data.licenseRequestId}`,
    {
      responseType: "blob",
    }
  );
};

const ServeMyLicenseRequestFile = async (
  data: any
): Promise<AxiosResponse<IAxiosResult>> => {
  return methods.get(
    `${MainUrl}/api/Upload/ServeMyLicenseRequestFile?fileName=${data.fileName}&licenseRequestId=${data.licenseRequestId}`,
    {
      responseType: "blob",
    }
  );
};
const GetMyProfilePicture = async (): Promise<AxiosResponse<IAxiosResult>> => {
  return methods.get(`${MainUrl}/api/Profile/GetMyProfilePicture`);
};
const RemoveMyProfilePicture = async (): Promise<
  AxiosResponse<IAxiosResult>
> => {
  return methods.post(`${MainUrl}/api/Profile/RemoveMyProfilePicture`);
};
export const useServeFileByAdmins = () => {
  return useMutation(ServeFileByAdmins, {
    onSettled: async (value: any, variables, context) => {
      const result = value.data;
      let data = new Blob([result]);
      let csvURL = window.URL.createObjectURL(data);
      let tempLink = document.createElement("a");
      tempLink.href = csvURL;
      tempLink.setAttribute("download", context.fileName);
      tempLink.click();
    },
  });
};



export const useServePayableValueDocument = () => {
  return useMutation(ServePayableValueDocument, {
    onSettled: async (value: any, variables, context) => {
      const result = value.data;
      let data = new Blob([result]);
      let csvURL = window.URL.createObjectURL(data);
      let tempLink = document.createElement("a");
      tempLink.href = csvURL;
      tempLink.setAttribute("download", context.fileName);
      tempLink.click();
    },
  });
};
export const useServeTariffDocument = () => {
  return useMutation(ServeTariffDocument, {
    onSettled: async (value: any, variables, context) => {
      const result = value.data;
      let data = new Blob([result]);
      let csvURL = window.URL.createObjectURL(data);
      let tempLink = document.createElement("a");
      tempLink.href = csvURL;
      tempLink.setAttribute("download", context.fileName);
      tempLink.click();
    },
  });
};

export const useServePayableValueDocumentOfSharingPercent = () => {
  return useMutation(ServePayableValueDocumentOfSharingPercent, {
    onSettled: async (value: any, variables, context) => {
      const result = value.data;
      let data = new Blob([result]);
      let csvURL = window.URL.createObjectURL(data);
      let tempLink = document.createElement("a");
      tempLink.href = csvURL;
      tempLink.setAttribute("download", context.fileName);
      tempLink.click();
    },
  });
};

export const useServeGuildRoomFileByAdmins = () => {
  return useMutation(ServeGuildRoomFileByAdmins, {
    onSettled: async (value: any, variables, context) => {
      const result = value.data;
      let data = new Blob([result]);
      let csvURL = window.URL.createObjectURL(data);
      let tempLink = document.createElement("a");
      tempLink.href = csvURL;
      tempLink.setAttribute("download", context.fileName);
      tempLink.click();
    },
  });
};
export const useServeMainLocationGuildRoomFileByAdmins = () => {
  return useMutation(ServeMainLocationGuildRoomFileByAdmins, {
    onSettled: async (value: any, variables, context) => {
      const result = value.data;
      let data = new Blob([result]);
      let csvURL = window.URL.createObjectURL(data);
      let tempLink = document.createElement("a");
      tempLink.href = csvURL;
      tempLink.setAttribute("download", context.fileName);
      tempLink.click();
    },
  });
};
export const useServeUnionFileByAdmins = () => {
  return useMutation(ServeUnionFileByAdmins, {
    onSettled: async (value: any, variables, context) => {
      const result = value.data;
      let data = new Blob([result]);
      let csvURL = window.URL.createObjectURL(data);
      let tempLink = document.createElement("a");
      tempLink.href = csvURL;
      tempLink.setAttribute("download", context.fileName);
      tempLink.click();
    },
  });
};
export const useUpload = () => {
  return useMutation(upload, {});
};
export const useRemoveMyProfilePicture = () => {
  return useMutation(RemoveMyProfilePicture, {});
};
export const useSetProfilePicture = () => {
  return useMutation(SetProfilePicture, {});
};
export const useGetMyProfilePicture = () => {
  return useQuery("GetMyProfilePicture", GetMyProfilePicture, {
    refetchOnWindowFocus: false,
    enabled: false,
  });
};
export const useServe = () => {
  return useMutation(ServeFile, {
    onSettled: async (value: any, variables, context) => {
      const result = value.data;
      let data = new Blob([result]);
      let csvURL = window.URL.createObjectURL(data);
      let tempLink = document.createElement("a");
      tempLink.href = csvURL;
      tempLink.setAttribute("download", context);
      tempLink.click();
    },
  });
};
export const useServeProfilePicture = () => {
  return useMutation(ServeProfilePicture, {
    onSettled: async (value: any, variables, context) => {
      const result = value.data;
      let data = new Blob([result]);
      let csvURL = window.URL.createObjectURL(data);
      let tempLink = document.createElement("a");
      tempLink.href = csvURL;
      tempLink.setAttribute("download", context);
      tempLink.click();
    },
  });
};
export const useServeLicenseRequestFile = () => {
  return useMutation(ServeLicenseRequestFile, {
    onSettled: async (value: any, variables, context) => {
      const result = value.data;
      let data = new Blob([result], { type: "application/octet-stream" });
      let csvURL = window.URL.createObjectURL(data);
      let tempLink = document.createElement("a");
      tempLink.href = csvURL;
      tempLink.setAttribute("download", "JahadLetter.docx");
      tempLink.click();
    },
  });
};

export const useServeLicenseRequestFileCancellation = () => {
  return useMutation(ServeLicenseRequestFile, {
    onSettled: async (value: any, variables, context) => {
      const result = value.data;
      let data = new Blob([result]);
      let csvURL = window.URL.createObjectURL(data);
      let tempLink = document.createElement("a");
      tempLink.href = csvURL;
      tempLink.setAttribute("download", context.fileName);
      tempLink.click();
    },
  });
};
export const useServeMyLicenseRequestFile = () => {
  return useMutation(ServeMyLicenseRequestFile, {
    onSettled: async (value: any, variables, context) => {
      const result = value.data;
      let data = new Blob([result]);
      let csvURL = window.URL.createObjectURL(data);
      let tempLink = document.createElement("a");
      tempLink.href = csvURL;
      tempLink.setAttribute("download", context.fileName);
      tempLink.click();
    },
  });
};
export const useServeLicenseRequestFileWithoutDownload = () => {
  return useMutation(ServeLicenseRequestFile, {});
};

export const useServeShowFile = () => {
  return useMutation(ServeFile, {});
};

export const useServeShowFileByAdmin = () => {
  return useMutation(ServeFileByAdmins, {});
};
export const useShowServeGuildRoomFileByAdmins = () => {
  return useMutation(ServeGuildRoomFileByAdmins, {});
};
export const useShowServeMainLocationGuildRoomFileByAdmins = () => {
  return useMutation(ServeMainLocationGuildRoomFileByAdmins, {});
};
export const useShowServeUnionFileByAdmins = () => {
  return useMutation(ServeUnionFileByAdmins, {});
};
export const useServePublicPicture = () => {
  return useMutation(ServePublicPicture, {});
};
