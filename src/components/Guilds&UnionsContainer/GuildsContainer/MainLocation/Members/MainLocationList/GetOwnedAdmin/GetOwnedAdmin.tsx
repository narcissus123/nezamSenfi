import React ,{ FC, useEffect } from "react";
import { useGetOwnedUserProvinceGuildRoomsForAdmin } from "../../../../../../../core/services/api";

interface IPropTypes {
  setState: any
  setAdminLoading : any
}

const GetOwnedAdmin: FC<IPropTypes> = ({ setState , setAdminLoading }) => {



  const { data , isFetching , isSuccess} = useGetOwnedUserProvinceGuildRoomsForAdmin()

  useEffect(() => {

    try {
      let newState: any = [];
      console.log('---dataaa-' , data?.data.result );
      data?.data.result.forEach((row: any) => {
        newState.push({
          id: row.id,
          title: row.countyTitle,
          name: row.title,
          role: "ادمین",
        });
      });

      setState((prev: any) => {
        return [...prev, ...newState];
      });
    } catch (e) {}
  }, [isSuccess]);

  useEffect(() => {
    setAdminLoading(isFetching)
  }, [ isFetching]);
  

  return (
    <>
    
    </>
  );
};

export { GetOwnedAdmin };
