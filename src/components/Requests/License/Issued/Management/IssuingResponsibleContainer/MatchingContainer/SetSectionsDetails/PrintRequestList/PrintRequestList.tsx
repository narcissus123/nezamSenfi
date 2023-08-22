import React, { FC } from "react";
import { useHistory, useParams } from "react-router-dom";
import { CardBody, Col, Row } from "reactstrap";
import { FormDivider, SimpleSubmitButton } from "../../../../../../../../common/Form";
import { ListTable } from "../../../../../../../../common/ListTable/ListTable";
import { columns } from "./Columns";

interface IPropTypes {
  sections: any;
}

const PrintRequestList: FC<IPropTypes> = ({ sections }): JSX.Element => {

  const history = useHistory();

  const { status, req_id } = useParams<any>();

  return (
    <>
      <Row>
        <Col>
          <SimpleSubmitButton
            btnText="ثبت کروکی"
            outLine
            onCLick={() => {
              history.push(
                `/ManageLicense/IssuingResponsible/Sketching/${status}/${req_id}/`
              );
            }}
            isLoading={false}
          />
        </Col>
      </Row>
      <FormDivider textHeader="لیست قطعات">
        <CardBody>
          <ListTable
            columns={columns}
            isLoading={false}
            onPageChange={() => {}}
            pageCountList={0}
            customPageSize={1000}
            tableData={sections}
          >
            {{
              headerTable: <></>,
            }}
          </ListTable>
        </CardBody>
      </FormDivider>
    </>
  );
};

export { PrintRequestList };
