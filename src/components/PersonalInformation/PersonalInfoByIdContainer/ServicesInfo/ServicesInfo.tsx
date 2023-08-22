import React, { FC, useEffect, useState } from "react";
import { CardTitle, Col, ListGroup, Row } from "reactstrap";
import { useGetAllUserAgriculturalToolsAndServiceByUserId } from "../../../../core/services/api";
import { FallBackSpinner } from "../../../common/Spinner/FallBackSpinner/FallbackSpinner";

import { List } from "./List/List";

interface IPropTypes {
  id: string;
}

const ServicesInfo: FC<IPropTypes> = ({ id }) => {
  const [tableData, setTableData] = useState<any>([]);

  const [userData, setUserData] = useState<any>("");

  const userInfo = useGetAllUserAgriculturalToolsAndServiceByUserId(+id);


  useEffect(() => {
    if (userInfo.data && userInfo.data.data) {
      const result = userInfo.data.data.result;

      setTableData(result);
    }
  }, [userInfo.isSuccess]);

  const getValue = (val: any) => {
    return val ? val : "تعیین نشده";
  };

  return userInfo.isFetching ? (
    <FallBackSpinner />
  ) : (
    <ListGroup tag="div">
      <CardTitle>اطلاعات ادوات و خدمات</CardTitle>

      <Row style={{ marginTop: "25px" }}>
        <Col>
          <List tableData={tableData} setTableData={setTableData} />
        </Col>
      </Row>
    </ListGroup>
  );
};

export { ServicesInfo };
