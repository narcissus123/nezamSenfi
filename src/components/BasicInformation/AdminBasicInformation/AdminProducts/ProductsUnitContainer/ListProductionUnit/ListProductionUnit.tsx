import { Form, Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { useGetProductUnitByFilter } from "../../../../../../core/services/api/job.api";
import { refetchContext } from "../../../../../../core/utils/context/EventContext";
import { SubmitButton, TextInput } from "../../../../../common/Form";
import { ListTable } from "../../../../../common/ListTable/ListTable";
import { columns } from "./ListProductionUnitColumn";

const ListProductionUnit: React.FC = () => {
  const [tableData, setTableData] = useState([]);
  const [pageCount, setPageCount] = useState(1);

  const [initialPage, setInitialPage] = useState(0);

  const [searchValues, setSearchValues] = useState<any>({
    title: "",
    abbreviation: "",
  });
  const [filterList, setFilterList] = useState({
    page: 1,
    pageSize: 10,
    title: "",
    abbreviation: "",

  });

  const defaultVal = {
    page: 1,
    pageSize: 10,
    title: "",
    abbreviation: "",
  };


  const getList = useGetProductUnitByFilter();

  
const {refetchEvent,setRefetchEvent} = useContext(refetchContext)



  useEffect(() => {
    getList.mutate(filterList);
  }, [refetchEvent.productionUnitList , filterList.pageSize]);

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
          abbreviation: values.abbreviation,
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
      >
        {({ setFieldValue, resetForm, values }) => (
          <Form>
            <Row>
              <Col sm="4">
                <TextInput
                  name="title"
                  placeholder="عنوان واحد"
                  lableText="عنوان"
                />
              </Col>
              <Col sm="4">
                <TextInput
                  lableText="کلمه اختصاری"
                  name="abbreviation"
                  placeholder="کلمه اختصاری را وارد کنید"
                />
              </Col>
             
            </Row>
            <SubmitButton
              isLoading={getList.isLoading}
              btnText="جستجو"
              clearable
              values={values}
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

export { ListProductionUnit };
