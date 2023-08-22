import React, { FC } from "react";
import { useGetUserMachineByExpert } from "../../../../../core/services/api";

interface IPropTypes {
  id: any
}

const UserMachineInfo: FC<IPropTypes> = ({ id }) => {

  const {
    data: userMachineData,
    isFetching: userMachineIsFetching,
    refetch: userMachineRefetch,
    isSuccess: userMachineIsSuccess,
  } = useGetUserMachineByExpert(+id);

  return (
    <>
      {userMachineData &&
      userMachineData.data &&
      userMachineData.data.result &&
      userMachineData.data.result.length > 0 ? (
        <ul>
          {userMachineData.data.result.map((row: any) => {
            return <li>{row.name}</li>;
          })}
        </ul>
      ) : (
        <p> ندارد.</p>
      )}
    </>
  );
};

export { UserMachineInfo };
