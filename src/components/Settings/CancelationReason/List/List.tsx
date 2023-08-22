import * as React from "react";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { columns } from "./Columns";
import { useContext, useEffect, useState } from "react";
import { Form, Formik } from "formik";
import { useGetMessageSettingHistory } from "../../../../core/services/api";
import { ListTable } from "../../../common/ListTable/ListTable";
import { refetchContext } from "../../../../core/utils/context/EventContext";
import { useGetCnacellationResultByFilter } from "../../../../core/services/api/cancelation.api";
import { SubmitButton, TextArea, TextInput } from "../../../common/Form";

const List = () => {
  const [state, setState] = useState<any>([]);
  const [pageCountList, setPageCount] = useState<any>(0);

  const [pageSize, setPageSize] = useState<any>(10);

  const [initialValue, setinitialValue] = useState<any>({
    startDate: "",
    toDate: ""

  });

  const [filterState, setFilterState] = useState<any>({
    page:1,
    pageSize: pageSize,
    title: "",
    description:""

  });

  const getListMutation = useGetCnacellationResultByFilter();
  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

  useEffect(() => {
    getListMutation.mutate(filterState);

    setFilterState({
      ...filterState,
      page: 1,
      pageSize: pageSize,
    });
  }, [pageSize, refetchEvent.cancelationReasonList]);

  useEffect(() => {
    if (getListMutation.data && getListMutation.data.data.result) {
      if (getListMutation.data && getListMutation.data.data.result) {
        let items = getListMutation.data.data.result.items ;
        setState(items);
        setPageCount(
          Math.ceil(getListMutation.data.data.result.totalCount / pageSize)
        );
      }
    }
  }, [getListMutation.isSuccess]);

  return (
    <Formik
      initialValues={initialValue}
      onSubmit={(value) => {
        getListMutation.mutate({
          page: 1,
          pageSize: pageSize,
          title: value.title,
          descirption: value.description,
        });

        setFilterState({
          title: value.title,
          descirption: value.description,
          page: 1,
          pageSize: pageSize,
        });
      }}
      enableReinitialize={true}
    >
      {({ values, errors, handleChange, resetForm, setFieldValue }) => (
        <>
          <Form>
            <Card>
              <CardHeader>
                <CardTitle>جستجو</CardTitle>
              </CardHeader>
              <CardBody>
                <Row>
                  <Col md="4">
                    <TextInput
                      lableText="دلیل"
                      name="title"
                      placeholder="نام دلیل ..."
                      significant
                    />
                  </Col>
                  <Col md="4">
                    <TextInput
                      lableText="توضیحات"
                      name="description"
                      placeholder="توضیحات ..."
                      significant
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <SubmitButton
                      isLoading={getListMutation.isLoading}
                      values={values}
                      isDisabled={false}
                      btnText="جستجو"
                    />
                  </Col>
                </Row>
              </CardBody>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>لیست</CardTitle>
              </CardHeader>
              <CardBody>
                <ListTable
                  columns={columns}
                  isLoading={getListMutation.isLoading}
                  onPageChange={({ page, pageSize }) => {
                    getListMutation.mutate({
                      ...filterState,
                      page: page,
                      pageSize: pageSize,
                    });
                  }}
                  tableData={state}
                  setPageSize={(val: any) => setPageSize(val)}
                  pageCountList={pageCountList}
                  initialPage={filterState.page - 1}
                  setInitialPage={(val) =>
                    setFilterState((old: any) => ({ ...old, page: val + 1 }))
                  }
                  customPageSize={pageSize}
                >
                  {{
                    headerTable: <div style={{ width: "200px" }}></div>,
                  }}
                </ListTable>
              </CardBody>
            </Card>
          </Form>
        </>
      )}
    </Formik>
  );
};

export { List };
