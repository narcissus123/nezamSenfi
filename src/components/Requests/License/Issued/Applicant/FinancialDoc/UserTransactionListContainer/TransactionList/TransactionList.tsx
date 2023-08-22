import React, { FC, Fragment, useEffect, useState } from "react";
import { Card, CardBody, CardTitle, FormGroup } from "reactstrap";
import { ListTable } from "../../../../../../../common/ListTable/ListTable";


interface IPropTypes {
  columns: any;
  useMutate: any;
  tableData: any 
}

const TransactionList: FC<IPropTypes> = ({
  columns,
  useMutate,
  tableData
}) => {

  const [pageSize, setPageSize] = useState(1000);
  const [pageCount, setPageCount] = useState(1);
  const [initialPage, setInitialPage] = useState(0);


  return (
    <Fragment>
      <Card>
        <CardBody>
          <Card>
            <ListTable
              columns={columns}
              isLoading={useMutate.isLoading}
              onPageChange={() => {}}
              pageCountList={pageCount}
              tableData={tableData}
              initialPage={initialPage}
              setInitialPage={setInitialPage}
            >
              {{
                headerTable: (
                  <FormGroup>
                    <CardTitle>لیست تراکنش ها</CardTitle>
                  </FormGroup>
                ),
              }}
            </ListTable>
          </Card>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export { TransactionList };
