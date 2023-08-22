import React ,{ FC, useEffect } from "react";
import { useGetOwnedUserCountyGuildRooms } from "../../../../../../../core/services/api";

interface IPropTypes {
  setState:any
  setManagerLoading : any
}

const GetOwnedManager: FC<IPropTypes> = ({ setState , setManagerLoading }) => {


  const { data : managerData , isFetching : managerFetching , isSuccess : managerIsSucess} = useGetOwnedUserCountyGuildRooms()


  useEffect(() => {


      let newState: any = [];
      console.log('---dataaa-' , managerData?.data.result );
      
      managerData?.data.result.forEach((row: any) => {
        newState.push({
          id: row.id,
          title: row.countyTitle,
          name: row.title,
          role: "مدیر",
        });
      });

      setState((prev:any)=>{
        return [...prev , ...newState]
      });

  }, [ managerIsSucess]);

  useEffect(() => {
    setManagerLoading(managerFetching)
  }, [ managerFetching]);
  
  return (
    <>
    </>
  );
};

export { GetOwnedManager };
