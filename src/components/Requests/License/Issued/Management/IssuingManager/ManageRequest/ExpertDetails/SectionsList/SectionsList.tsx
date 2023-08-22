import React, { FC } from "react";
import { Col, Row } from "reactstrap";
import { ListTable } from "../../../../../../../../common/ListTable/ListTable";
import { columns } from "./Columns";


interface IPropTypes {
  sections: any[];
}

const SectionsList: FC<IPropTypes> = ({ sections,  }) => {

  return (
    <>
      <Row>
        <Col>
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
        </Col>
      </Row>
    </>
  );
};

export { SectionsList };
