import { Form, Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { TypeOfDependenceEnum } from "../../../../../../core/enums/type-of-dependence.enums";
import { useGetJobFigureByFilter, useGetJobProductionFactorByFilter, useGetProductCategoryByFilter } from "../../../../../../core/services/api/job.api";
import { refetchContext } from "../../../../../../core/utils/context/EventContext";
import { SubmitButton, TextInput } from "../../../../../common/Form";
import BasicSelectOption from "../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { ListTable } from "../../../../../common/ListTable/ListTable";
import { columns } from "./Column";

const ListProductionCategory: React.FC = () => {
  const [tableData, setTableData] = useState([]);
  const [pageCount, setPageCount] = useState(1);

  const [initialPage, setInitialPage] = useState(0);

  const [searchValues, setSearchValues] = useState<any>({
    title: "",
    cpcCode: "",
  });
  const [filterList, setFilterList] = useState({
    page: 1,
    pageSize: 10,
    title: "",
    cpcCode: "",
  });

  const defaultVal = {
    page: 1,
    pageSize: 10,
    title: "",
    cpcCode: "",
  };


  const getList = useGetProductCategoryByFilter();

  
const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

  useEffect(() => {
    getList.mutate(filterList);
  }, [refetchEvent.productionCategoryList , filterList.pageSize]);

  useEffect(() => {
    if (getList.isSuccess) {
      const result = getList.data?.data.result;
      
      let newState : any = [];

      result.items.forEach((row: any) => {
        newState.push({
          ...row,
          cpcCodePlus: row.cpcCode,
          cpcCode: row.cpcCode.substring(0, 5),
        });
      })
      setTableData(newState);
      setPageCount(Math.ceil(result.totalCount / filterList.pageSize));
    }
  }, [getList.isSuccess]);

  const onSearch = (values: any, {}, reset: boolean = false) => {
    !reset
      ? getList.mutate({
          ...filterList,
          title: values.title,
          cpcCode: values.cpcCode,
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
                  placeholder="نام دسته"
                  lableText="نام دسته"
                />
              </Col>
              <Col sm="4">
                <TextInput lableText="کد CPC" name="cpcCode" placeholder="کد" />
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

export { ListProductionCategory };

