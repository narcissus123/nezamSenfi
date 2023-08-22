import React from "react";

import { Card } from "reactstrap";
import { useOwnedUserProvinceGuildRooms } from "../../../../core/services/api";
import { CountyList } from "./CountyList";

const County = () => {
  const provinceQuery = useOwnedUserProvinceGuildRooms();

  return (
    <>
      {/* <Card>
        <CardHeader>
          <CardTitle>افزودن صنف شهرستانی</CardTitle>
        </CardHeader>
        <CardBody>
          <AddCounty provinceQuery={provinceQuery} />
        </CardBody>
      </Card> */}
      <Card>
        <CountyList provinceQuery={provinceQuery} />
      </Card>
    </>
  );
};

export { County };
