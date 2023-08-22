import React, { ReactNode, useContext, useEffect } from "react";
import {
  useGetMyProfilePicture,
  useServeProfilePicture,
} from "../../../../../core/services/api";
import { getAccessToken } from "../../../../../core/services/authentication/authentication.service";
import { refetchContext } from "../../../../../core/utils/context/EventContext";
import { profileContext } from "../../../../../core/utils/context/ProfileContext";

interface IPropTypes {}

const LoadProfile: React.FC<IPropTypes> = ({}) => {
  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);
  const {
    userProfilePicture,
    setUserProfilePicture,
    allowToRefetch,
    setAllowToRefetch,
  } = useContext(profileContext);
  const { data, isSuccess, isFetching, refetch } = useGetMyProfilePicture();

  useEffect(() => {
    if (allowToRefetch === 1) {
      refetch();
    }
  }, [refetchEvent.profileRefetch]);

  useEffect(() => {
    if (data && data.data && isSuccess) {
      if (data.data.result != null) {
        serve([data.data.result]);
      }
    }
  }, [isSuccess, data]);

  const serve = async (files: any) => {
    const MainUrl = process.env.REACT_APP_PUBLIC_PATH;
    const token = getAccessToken();
    const result = [];
    await files.forEach(async (item: any) => {
      const result = await fetch(
        MainUrl + "​/api/Upload/ServeProfilePicture?fileName=" + item,
        {
          headers: {
            Authorization: token ? "Bearer " + token : "",
          },
        }
      );
      if (result.status === 200 || result.ok) {
        const arrayBuffer = await result.arrayBuffer();
        const blob = new Blob([arrayBuffer]);

        const url = URL.createObjectURL(blob);
        setAllowToRefetch(0);
        setUserProfilePicture(url);
      }
    });
  };

  return <></>;
};

export { LoadProfile };
