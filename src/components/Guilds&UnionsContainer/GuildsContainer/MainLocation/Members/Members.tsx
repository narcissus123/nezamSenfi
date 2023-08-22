import React, { FC, useState } from "react";
import { Card } from "reactstrap";

import { MainLocationList } from "./MainLocationList/MainLocationList";


interface IPropTypes {

}

const Members: FC<IPropTypes> = ({}) => {

   const [fetchRefresh , setFetchRefresh] = useState<boolean>(false)

  return (
    <Card>
       <MainLocationList setFetchRefresh={()=>{ setFetchRefresh((val:any) => !val)}} fetchRefresh={fetchRefresh} />
    </Card> 
  );
};

export { Members };
