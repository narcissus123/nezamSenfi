import { Form, Formik } from "formik";
import { string } from "prop-types";
import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { LicenseRequestStatusData } from "../../../../../../core/data/license-requests-status.data";
import { useGetExpertActivitiesReport } from "../../../../../../core/services/api";
import {
  ModernDatePicker,
  SubmitButton,
  TextInput,
} from "../../../../../common/Form";
import BasicSelectOption from "../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { ListTable } from "../../../../../common/ListTable/ListTable";
import { columns } from "./ReportColumns";

const ExpertReportList: FC = () => {
  const { id, expertId } = useParams<{ id: string; expertId: string }>();

  const [filterState, setFilterState] = useState({
    page: 1,
    pageSize: 10,
    unionId: id,
    expertId: expertId,
    fromDate: "",
    toDate: "",
    status: 0,
    area: 0,
  });
  const [tableData, setTableData] = useState<any>([]);
  const [pageCount, setPageCount] = useState(1);

  const getList = useGetExpertActivitiesReport();

  useEffect(() => {
    getList.mutate({ ...filterState, page: 1 });
  }, [filterState.pageSize]);

  useEffect(() => {
    if (getList.isSuccess) {
      const result = getList.data?.data.result;
      console.log(result);
      try {
        setTableData(result.items);

        setPageCount(Math.ceil(result.totalCount / filterState.pageSize));
      } catch (error) {}
    }
  }, [getList.isSuccess]);

  const onSearch = (value: any) => {
    const searchObj = {
      ...filterState,
      fromDate: value.fromDate,
      toDate: value.toDate,
      area: value.area ? value.area : 0,
      status: value.status ? value.status.value : 0,
    };
    getList.mutate(searchObj);
    setFilterState(searchObj);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>جستجو</CardTitle>
        </CardHeader>
        <CardBody>
          <Formik
            initialValues={{ fromDate: "", toDate: "", status: null, area: "" }}
            onSubmit={onSearch}
          >
            {({ resetForm }) => (
              <Form>
                <Row>
                  <Col sm="3">
                    <TextInput
                      name="area"
                      placeholder="سطح را وارد کنید..."
                      lableText="سطح"
                    />
                  </Col>
                  <Col sm="3">
                    <ModernDatePicker
                      name="fromDate"
                      placeholder="...تاریخ را وارد کنید"
                      lableText="از تاریخ"
                      hasMaximum
                    />
                  </Col>
                  <Col sm="3">
                    <ModernDatePicker
                      name="toDate"
                      placeholder="...تاریخ را وارد کنید"
                      lableText="تا تاریخ"
                      hasMaximum
                    />
                  </Col>
                  <Col sm="3">
                    <BasicSelectOption
                      name="status"
                      placeHolder="انتخاب کنید..."
                      lableText="وضعیت"
                      data={LicenseRequestStatusData}
                    />
                  </Col>
                </Row>
                <SubmitButton
                  isLoading={getList.isLoading}
                  btnText="جستجو"
                  clearable
                  clearableTxt="پاکسازی"
                  clearableDisable={getList.isLoading}
                  onClear={resetForm}
                />
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>لیست گزارشات</CardTitle>
        </CardHeader>
        <CardBody>
          <ListTable
            columns={columns}
            isLoading={getList.isLoading}
            onPageChange={({ page, pageSize }) => {
              getList.mutate({
                ...filterState,
                page: page,
              });

              setFilterState((val) => ({
                ...val,
                page: page,
              }));
            }}
            pageCountList={pageCount}
            tableData={tableData}
            customPageSize={filterState.pageSize}
            setPageSize={(val) =>
              setFilterState((old) => ({ ...old, pageSize: val }))
            }
            initialPage={filterState.page - 1}
            setInitialPage={(val: number) =>
              setFilterState((old: any) => ({ ...old, page: val + 1 }))
            }
          >
            {{ headerTable: <p></p> }}
          </ListTable>
        </CardBody>
      </Card>
    </>
  );
};

export { ExpertReportList };
