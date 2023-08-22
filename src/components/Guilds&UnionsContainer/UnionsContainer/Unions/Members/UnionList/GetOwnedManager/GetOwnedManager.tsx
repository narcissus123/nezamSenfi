import React, { FC, useEffect } from "react";

import { useGetOwnedUserUnion } from "../../../../../../../core/services/api";

interface IPropTypes {
  setState: any;
  setManagerLoading: any;
}

const GetOwnedManager: FC<IPropTypes> = ({ setState, setManagerLoading }) => {
  const {
    data: managerData,
    isFetching: managerFetching,
    isSuccess: managerIsSucess,
  } = useGetOwnedUserUnion();

  useEffect(() => {
    let newState: any = [];
    managerData?.data.result.unions.forEach((row: any) => {
      newState.push({
        id: row.id,
        title: row.unionTitle,
        name: row.unionTitle,
        role: "مدیر",
      });
    });

    setState((prev: any) => {
      return [...prev, ...newState];
    });
  }, [managerIsSucess]);

  useEffect(() => {
    setManagerLoading(managerFetching);
  }, [managerFetching]);

  return <></>;
};

export { GetOwnedManager };
