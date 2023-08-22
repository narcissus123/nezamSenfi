import React, { FC } from "react";
import { Link } from "react-router-dom";
import { CardBody, Col, Row } from "reactstrap";
import { FormDivider, SimpleSubmitButton } from "../../../../../../common/Form";
import { ListTable } from "../../../../../../common/ListTable/ListTable";

import { columns } from "./Columns";

interface IPropTypes {
  sections: any;
  id: any
  isSecretariat?: boolean
}

const PrintRequestList: FC<IPropTypes> = ({ sections, id, isSecretariat }): JSX.Element => {

  return (
    <FormDivider textHeader="گزارشات">
      <CardBody>
        <Row style={{ marginBottom: "10px" }}>
          <Col>
            <Link
              to={`/license/utm/land/${
                isSecretariat ? "secretariat/" : ""
              }Routing/${id}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              <SimpleSubmitButton
                isLoading={false}
                btnText="گزارش کروکی"
                onCLick={() => {}}
              />
            </Link>
          </Col>
        </Row>
        <ListTable
          columns={columns}
          isLoading={false}
          onPageChange={() => {}}
          pageCountList={0}
          customPageSize={1000}
          tableData={sections}
          getCustomProps={{
            reqId: id,
            isSecretariat: isSecretariat,
          }}
        >
          {{
            headerTable: <></>,
          }}
        </ListTable>
      </CardBody>
    </FormDivider>
  );
};

export { PrintRequestList };
