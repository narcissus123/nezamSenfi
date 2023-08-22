import React, { FC, useEffect } from "react";

import { useGetOwnedUserUnionForAdmin } from "../../../../../../../core/services/api";

interface IPropTypes {
  setState: any;
  setAdminLoading: any;
}

const GetOwnedAdmin: FC<IPropTypes> = ({ setState, setAdminLoading }) => {
  const { data, isFetching, isSuccess } = useGetOwnedUserUnionForAdmin();

  useEffect(() => {
    try {
      let newState: any = [];
      data?.data.result.unions.forEach((row: any) => {
        newState.push({
          id: row.id,
          title: row.unionTitle,
          name: row.unionTitle,
          role: "ادمین",
        });
      });

      setState((prev: any) => {
        return [...prev, ...newState];
      });
    } catch (e) {}
  }, [isSuccess]);

  useEffect(() => {
    setAdminLoading(isFetching);
  }, [isFetching]);

  return <></>;
};

export { GetOwnedAdmin };
