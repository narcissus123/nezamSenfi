import React, { FC } from "react";
import { useGetUserAgriculturalToolsAndServicesByExpert, useGetUserMachineByExpert } from "../../../../../core/services/api";

interface IPropTypes {
  id: any
}

const UserServicesInfo: FC<IPropTypes> = ({ id }) => {

  const {
    data: userServiceData,
    isFetching: userServiceIsFetching,
    refetch: userServiceRefetch,
    isSuccess: userServiceSuccess,
  } = useGetUserAgriculturalToolsAndServicesByExpert(+id);

  return (
    <>
      {userServiceData &&
      userServiceData.data &&
      userServiceData.data.result &&
      userServiceData.data.result.length > 0 ? (
        <ul>
          {userServiceData.data.result.map((row: any) => {
            return <li>{row.name}</li>;
          })}
        </ul>
      ) : (
        <p> ندارد.</p>
      )}
    </>
  );
};

export { UserServicesInfo };
