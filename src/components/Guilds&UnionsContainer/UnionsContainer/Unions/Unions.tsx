import React, { useState } from "react";
import { Card } from "reactstrap";
import { useGetOwnedUserCountyGuildRooms } from "../../../../core/services/api";
import { UnionList } from "./UnionList";



const Unions = () => {

  const unionsQuery = useGetOwnedUserCountyGuildRooms()

  const [fetchRefresh , setFetchRefresh] = useState<boolean>(false)
  return (
    <>
      {/* <Card>
        <CardHeader>
          <CardTitle>افزودن اتحادیه</CardTitle>
        </CardHeader>
        <CardBody>
          <AddUnion unionsQuery={unionsQuery} setFetchRefresh={()=>{ setFetchRefresh((val:any) => !val)}} />
        </CardBody>
      </Card> */}
      <Card> 
        <UnionList unionsQuery={unionsQuery} setFetchRefresh={()=>{ setFetchRefresh((val:any) => !val)}} fetchRefresh={fetchRefresh} />
      </Card>
    </>
  );
  
};

export { Unions };
