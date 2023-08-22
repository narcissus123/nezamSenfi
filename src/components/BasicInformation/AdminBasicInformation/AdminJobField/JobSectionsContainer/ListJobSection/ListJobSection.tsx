import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { useGetJobSectionByFilter } from "../../../../../../core/services/api/job.api";
import { searchJobSectionValidation } from "../../../../../../core/validations/admin-job-tools.validation";
import { SubmitButton, TextInput } from "../../../../../common/Form";
import { ListTable } from "../../../../../common/ListTable/ListTable";
import { columns } from "./JobSubSectionColumns";

interface IPropTypes {
  refetch: boolean;
}

const ListJobSection: React.FC<IPropTypes> = ({ refetch }) => {
  const [tableData, setTableData] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [initialPage, setInitialPage] = useState(0);
  const [searchValues, setSearchValues] = useState<any>({
    title: "",
    code: "",
  });
  const [filterList, setFilterList] = useState({
    page: 1,
    pageSize: 10,
    title: "",
    code: "",
  });

  const defaultVal = {
    page: 1,
    pageSize: 10,
    title: "",
    code: "",
  };

  const getList = useGetJobSectionByFilter();

  useEffect(() => {
    getList.mutate(filterList);
  }, [refetch]);

  useEffect(() => {
    if (getList.isSuccess) {
      const result = getList.data?.data.result;
      setTableData(result.items);
      setPageCount(Math.ceil(result.totalCount / filterList.pageSize));
    }
  }, [getList.isSuccess]);

  const onSearch = (values: any, {}, reset: boolean = false) => {
    !reset
      ? getList.mutate({
          ...filterList,
          title: values.title,
          code: values.code,
        })
      : getList.mutate(defaultVal);

    setInitialPage(0);
  };

  return (
    <>
      <Formik
        initialValues={searchValues}
        onSubmit={onSearch}
        enableReinitialize
        validationSchema={searchJobSectionValidation}
      >
        {({ setFieldValue, resetForm, values }) => (
          <Form>
            <Row>
              <Col sm="4">
                <TextInput
                  name="title"
                  placeholder="عنوان را وارد کنید"
                  lableText="عنوان"
                />
              </Col>
              <Col sm="4">
                <TextInput
                  lableText="کد بخش"
                  name="code"
                  placeholder="کد بخش را وارد کنید"
                />
              </Col>
            </Row>
            <SubmitButton
              isLoading={getList.isLoading}
              btnText="جستجو"
              clearable
              values={values}
              schema={searchJobSectionValidation}
              onClear={() => {
                setFilterList(defaultVal);
                resetForm();
                onSearch(values, {}, true);
              }}
            />
          </Form>
        )}
      </Formik>

      <ListTable
        isLoading={getList.isLoading}
        columns={columns}
        pageCountList={pageCount}
        tableData={tableData}
        onPageChange={({ page, pageSize }) => {
          getList.mutate({ ...filterList, page: page, pageSize: pageSize });
          setFilterList({ ...filterList, page: page, pageSize: pageSize });
        }}
        customPageSize={10}
        initialPage={initialPage}
        setInitialPage={setInitialPage}
        setPageSize={(val) => setFilterList({ ...filterList, pageSize: val })}
        getCustomProps={{
          refetch: () => {
            getList.mutate(filterList);
          },
        }}
      >
        {{ headerTable: <p></p> }}
      </ListTable>
    </>
  );
};

export { ListJobSection };
