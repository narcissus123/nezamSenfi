import { Form, Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { OptionRow } from "../../../../../../core/models";
import { useGetAllTreeCategory } from "../../../../../../core/services/api/base-tree-category.api";
import { useGetTreeList } from "../../../../../../core/services/api/base-tree.api";
import { refetchContext } from "../../../../../../core/utils/context/EventContext";
import { SimpleTextInput, SubmitButton, TextInput, Toggle } from "../../../../../common/Form";
import BasicSelectOption from "../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { ListTable } from "../../../../../common/ListTable/ListTable";
import { columns } from "./Column";

const List: React.FC = () => {
  const [tableData, setTableData] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [pageSize, setPageSize] = useState<any>(10);

  const [filterList, setFilterList] = useState<any>({
    page: 1,
    pageSize: 10,
    title: "",
    baseTreeCategoryId: null,
  });

  const getList = useGetTreeList();
  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);
  const { isFetching, data } = useGetAllTreeCategory();

  useEffect(() => {
    getList.mutate({ ...filterList });
  }, [pageSize, refetchEvent.treeList]);

  useEffect(() => {
    if (getList.isSuccess) {
      const result = getList.data?.data.result;
      let newList : any = [];

      if(result.items) {
        result.items.forEach((row: any) => {
          newList.push({ ...row, isActive: row.isActive ? "فعال" : "غیرفعال" });
        });
      }
      setTableData(newList);
      setPageCount(Math.ceil(result.totalCount / filterList.pageSize));
    }
  }, [getList.isSuccess]);
 
  const onSubmit = (value: any) => {
    const listSearchObj: any = {
      page: value.page,
      pageSize: pageSize,
      title: value.title,
      baseTreeCategoryId: value.baseTreeCategoryId
        ? value.baseTreeCategoryId.value
        : null,
    };

    if (value.isActiveList && value.isActiveList.value !== 3) {
      listSearchObj.isActive = value.isActiveList.value === 1 ? true : false;
    }

    getList.mutate(listSearchObj);
  };

  return (
    <>
      <Formik
        enableReinitialize={true}
        initialValues={filterList}
        onSubmit={onSubmit}
      >
        {({ values , resetForm, setFieldValue}) => {
          return (
            <Form>
              <Card>
                <CardHeader>
                  <CardTitle>جستجو</CardTitle>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col md="4">
                      <BasicSelectOption
                        lableText="عنوان دسته بندی درخت"
                        significant={true}
                        placeHolder="انتخاب کنید..."
                        name="baseTreeCategoryId"
                        isClearable
                        data={
                          data?.data.result
                            ? data?.data.result.map((item: OptionRow) => ({
                                value: item.id,
                                label: item.title,
                              }))
                            : []
                        }
                        isLoading={isFetching}
                      />
                    </Col>
                    <Col md="4">
                      <TextInput
                        lableText="عنوان درخت"
                        name="title"
                        placeholder="عنوان درخت ..."
                        significant
                      />
                    </Col>
                    <Col md="4">
                      <BasicSelectOption
                        isClearable
                        lableText="وضعیت"
                        placeHolder="انتخاب کنید..."
                        name="isActiveList"
                        data={[
                          { value: 1, label: "فعال" },
                          { value: 2, label: "غیر فعال" },
                          { value: 3, label: "هردو" },
                        ]}
                        isLoading={false}
                      />
                    </Col>
                  </Row>
                  <Row style={{ marginBottom: "25px" }}>
                    <Col md="6 align-items-center d-flex">
                      <SubmitButton
                        isLoading={getList.isLoading}
                        btnText="جستجو"
                      />
                    </Col>
                  </Row>
                </CardBody>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>لیست درختان</CardTitle>
                </CardHeader>
                <CardBody>
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
                        page: page,
                        pageSize: pageSize,
                        title: values.title,
                        baseTreeCategoryId: values.baseTreeCategoryId
                          ? values.baseTreeCategoryId.value
                          : null,
                      });
                    }}
                  ></ListTable>
                </CardBody>
              </Card>
            </Form>
          );
        }}
      </Formik>
    </>
  );
};

export { List };
