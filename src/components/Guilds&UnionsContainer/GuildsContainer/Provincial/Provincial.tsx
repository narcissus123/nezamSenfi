import React, { useState } from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { ProvinceList } from "./ProvinceList/ProvinceList";

const Provincial = () => {

  const [fetchRefresh , setFetchRefresh] = useState<boolean>(false)
  return (
    <>
      {/* <Card>
        <CardHeader>
          <CardTitle>افزودن صنف استانی</CardTitle>
        </CardHeader>
        <CardBody>
          <AddProvince setFetchRefresh={()=>{ setFetchRefresh((val:any) => !val)}} />
        </CardBody>
      </Card> */}
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

export { Provincial };
