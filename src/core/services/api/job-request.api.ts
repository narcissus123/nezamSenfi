import { useMutation, useQuery } from "react-query";

const GetAllJobRequests = async () => {
  const response = await fetch(
    "https://run.mocky.io/v3/5c1c0507-3deb-46d9-9581-82e28c5cc065"
  );
  return await response.json();
};

const PostJobRequest = async (obj: any) => {
  const response = await fetch("https://602a23af6c995100176edf79.mockapi.io/JobRequest", {
    method: "POST", // *GET, POST, PUT, DELETE, etc.
    body: JSON.stringify(obj), // body data type must match "Content-Type" header
  });
  return await response.json();
};

export const usePostJobRequest = () => {
  return useMutation("PostJobRequest", PostJobRequest, {});
};

export const useGetAllJobRequests = () => {
  return useQuery("GetAllJobRequests", GetAllJobRequests, {
    refetchOnWindowFocus: false,
    retry: false,
    cacheTime: 0,
  });
};
