import { Form, Formik } from "formik";
import * as React from "react";
import { useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { useGetAllMyIdentityChangeRequest } from "../../../../../../core/services/api/identity-change-request";
import { ListTable } from "../../../../../common/ListTable/ListTable";
import { columns } from "./Columns";
import { ListFilter } from "./ListFilter/ListFilter";

const ListContainer = () => {
  const [initialPage, setInitialPage] = useState(0);
  const [state, setState] = useState<any>([]);
  const [pageSize, setPageSize] = useState(8);
  const [pageCountList, setPageCount] = useState<any>(0);

  const getAllRequest = useGetAllMyIdentityChangeRequest()

  const [filterState, setFilterState] = useState<any>({
    page: 1,
    pageSize: pageSize,
    userName: "",
    id: 0,
    identityChangeStatus: null,
    description: "",
    dateTime: "",
  });

  useEffect(() => {
    getAllRequest.mutate({ page: 1, pageSize: pageSize });
  }, [pageSize]);

  useEffect(() => {
    if (getAllRequest.data && getAllRequest.data.data) {
      const result = getAllRequest.data.data.result.items;
      try {
        setState(result);
        setPageCount(
          Math.ceil(getAllRequest.data.data.result.totalCount / pageSize)
        );
      } catch (error) {}
    }
  }, [getAllRequest.isSuccess]);

  const onSubmit = (value: any) => {
    const searchObj: any = {
      ...filterState,
      userName: value.userName,
      id: 0,
      unionId: value.unionId ? value.unionId.value : 0,
      identityChangeStatus: value.identityChangeStatus
        ? value.identityChangeStatus.value
        : 0,
      description: value.description,
      dateTime: value.dateTime,
    };
    getAllRequest.mutate(searchObj);
  }

  return (
    <>
      <Formik
        initialValues={{
          page: 1,
          pageSize: pageSize,
          userName: "",
          id: 0,
          identityChangeStatus: null,
          description: "",
          dateTime: "",
          unionId: null,
        }}
        onSubmit={onSubmit}
        enableReinitialize={true}
        onReset={(a: any) => {}}
      >
        {({ values, errors, handleChange, resetForm, setFieldValue }) => (
          <Form>
            <Card>
              <CardHeader>
                <CardTitle>جستجو</CardTitle>
              </CardHeader>
              <CardBody>
                <ListFilter
                  mutation={getAllRequest}
                  onResetClick={resetForm}
                  setFieldValue={setFieldValue}
                />
              </CardBody>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>درخواست ها</CardTitle>
              </CardHeader>
              <CardBody>
                <ListTable
                  customPageSize={pageSize}
                  setPageSize={(val: any) => setPageSize(val)}
                  isLoading={getAllRequest.isLoading}
                  columns={columns}
                  pageCountList={0}
                  tableData={state}
                  initialPage={initialPage}
                  setInitialPage={setInitialPage}
                  getCustomProps={{ flow: "ApplicantIdentityChangeFlow" }}
                  onPageChange={({ page, pageSize }) => {
                    getAllRequest.mutate({
                      ...filterState,
                      page: page,
                      pageSize: pageSize,
                    });
                  }}
                >
                  {{
                    headerTable: <div style={{ width: "200px" }}></div>,
                  }}
                </ListTable>
              </CardBody>
            </Card>
          </Form>
        )}
      </Formik>
    </>
  );
};

export { ListContainer };
