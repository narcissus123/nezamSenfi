import React, { useState } from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { ProvinceList } from "./ProvinceList/ProvinceList";

const MainLocation = () => {

  const [fetchRefresh , setFetchRefresh] = useState<boolean>(false)
  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>لیست اصناف</CardTitle>
        </CardHeader>
        <CardBody>
          <ProvinceList setFetchRefresh={()=>{ setFetchRefresh((val:any) => !val)}} fetchRefresh={fetchRefresh} />
        </CardBody>
      </Card>
    </>
  );
  
};

export { MainLocation };
