import { Form, Formik } from "formik";
import React, { useState } from "react";
import { ListTablePaginate } from "../../../../../../../../common/ListTablePaginate/ListTablePaginate";
import { columns } from "./TreesListColumn";

interface IPropTypes {
  tableData: any;
  setTableData: any;
  setInitialValues: any;
  setIsInEditMode: any;
  setEditRowID: any;
  isExpert: boolean;
  listRowErrors: any
}

const TreesList: React.FC<IPropTypes> = ({
  tableData,
  setTableData,
  setInitialValues,
  setIsInEditMode,
  setEditRowID,
  isExpert,
  listRowErrors
}) => {
  const [pageCount, setPageCount] = useState(1);

  const [pageSize, setPageSize] = useState<any>(10);

  const [filterList, setFilterList] = useState<any>({
    page: 1,
    pageSize: 10,
    name: "",
    code: "",
  });

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={filterList}
        onSubmit={() => {}}
      >
        {({ values, resetForm }) => {
          return (
            <Form>
              <ListTablePaginate
                columns={columns}
                setPageCountList={setPageCount}
                isLoading={false}
                onPageChange={() => {}}
                pageCountList={pageCount}
                customPageSize={pageSize}
                listRowErrors={listRowErrors}
                errorIdentifier="productionFactorId"
                getCustomProps={{
                  setTableData,
                  tableData,
                  setInitialValues,
                  setIsInEditMode,
                  setEditRowID,
                  isExpert,
                }}
                tableData={tableData}
              >
                {{
                  headerTable: <></>,
                }}
              </ListTablePaginate>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export { TreesList };
