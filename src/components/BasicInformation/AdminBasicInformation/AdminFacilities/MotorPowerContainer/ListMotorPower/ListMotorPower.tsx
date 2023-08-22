import React, { useContext, useEffect, useState } from "react";
import { ListTable } from "../../../../../common/ListTable/ListTable";

import { columns } from "./ListMotorPowerColumn";
import { refetchContext } from "../../../../../../core/utils/context/EventContext";
import { Form, Formik } from "formik";
import { Col, Row } from "reactstrap";
import { SimpleTextInput, SubmitButton } from "../../../../../common/Form";
import { useGetEnginePowerByFilter } from "../../../../../../core/services/api/parts-and-facilities.api";


const ListMotorPower: React.FC = () => {
  const [tableData, setTableData] = useState([]);
  const [pageCount, setPageCount] = useState(1);

  const [pageSize, setPageSize] = useState<any>(10);

  
  const [filterList, setFilterList] = useState<any>({
    page: 1,
    pageSize: 10,
    name: "",
    code: "",
  });


  const getList = useGetEnginePowerByFilter();
  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

  useEffect(() => {
    getList.mutate(filterList);
  }, [pageSize , refetchEvent.engineMotorList]);

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

export { ListMotorPower };
