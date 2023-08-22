import React, { useState, useEffect, useContext } from "react";
import { Row, Col, Button } from "reactstrap";
import { Formik, Form } from "formik";

import { columns } from "./LandAdjacentTypeListColumns";
import { SimpleTextInput, SubmitButton } from "../../../../../common/Form";
import { ListTable } from "../../../../../common/ListTable/ListTable";
import {  useGetSectionProximityByFilter } from "../../../../../../core/services/api/parts-and-facilities.api";
import BasicSelectOption from "../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { refetchContext } from "../../../../../../core/utils/context/EventContext";

const LandAdjacentTypeList: React.FC = () => {
 
  const [tableData, setTableData] = useState([]);
  const [pageCount, setPageCount] = useState(1);

  const [pageSize, setPageSize] = useState<any>(10);

  
  const [filterList, setFilterList] = useState<any>({
    page: 1,
    pageSize: 10,
    name: "",
    code: "",
    type: 0
  });

  const typeData = [
    {value : 1 , label : 'عوارض طبیعی'},
    {value : 2 , label : 'عوارض'}
  ]

  const getList = useGetSectionProximityByFilter();
  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

  useEffect(() => {
    getList.mutate(filterList);
  }, [pageSize , refetchEvent.sectionProximityList]);

  useEffect(() => {
    if (getList.isSuccess) {
      const result = getList.data?.data.result;
      setTableData(result.items);
      setPageCount(Math.ceil(result.totalCount / filterList.pageSize));
    }
  }, [getList.isSuccess]);
 
  const onSubmit = (value: any) => {

    const listSearchObj = {
      page: value.page,
      pageSize: pageSize,
      name: value.name,
      code: value.code,
      type: value.type ? value.type.value : 0
    }

    getList.mutate(listSearchObj)
   
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={filterList}
        onSubmit={onSubmit}
      >
        {({ values , resetForm }) => {
          return (
            <Form>
              <Row>
                <Col md="4">
                  <SimpleTextInput
                    id="name"
                    lableText="نام "
                    name="name"
                    placeholder="نام"
                  />
                </Col>
                <Col md="4">
                  <SimpleTextInput
                    id="code"
                    lableText="کد"
                    name="code"
                    placeholder="کد"
                  />
                </Col>
                <Col md="4">
                  <BasicSelectOption
                    lableText="نوع"
                    significant={true}
                    name="type"
                    placeHolder="انتخاب کنید ..."
                    data={typeData}
                  />
                </Col>
              </Row>
              <Row style={{marginBottom:'25px'}}>
                <Col md="6 align-items-center d-flex">
                <SubmitButton
                  isLoading={getList.isLoading}
                  btnText="جستجو"
                  clearable
                  clearableDisable={getList.isLoading}
                  clearableTxt="پاکسازی"
                  onClear={resetForm}
                />
                </Col>
              </Row>
              <ListTable
                isLoading={getList.isLoading}
                columns={columns}
                pageCountList={pageCount}
                tableData={tableData}
                //getCustomProps={{ setShowEditModal, setSelectedUser }}
                setPageSize={(val: any) => setPageSize(val)}
                customPageSize={pageSize}
                onPageChange={({ page, pageSize }) => {
                  getList.mutate({
                    name: values.name,
                    code: values.code,
                    type: values.type ? values.type.value : 0,
                    page: page,
                    pageSize: pageSize,
                  });
                }}
              ></ListTable>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export { LandAdjacentTypeList };

