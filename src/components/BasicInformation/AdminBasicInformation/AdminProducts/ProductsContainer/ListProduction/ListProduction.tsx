import { Form, Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { OptionRow } from "../../../../../../core/models";
import {
  useGetAllProductCategory,
  useGetAllProductUnitId,
  useGetJobProductByFilter,
} from "../../../../../../core/services/api/job.api";
import { refetchContext } from "../../../../../../core/utils/context/EventContext";
import { SubmitButton, TextInput } from "../../../../../common/Form";
import BasicSelectOption from "../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { ListTable } from "../../../../../common/ListTable";
import { columns } from "./ListProductionColumn";

const ListProduction: React.FC = () => {
  const [tableData, setTableData] = useState([]);
  const [pageCount, setPageCount] = useState(1);

  const [repeatData, setRepeatData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [
        { value: 1, label: "دارد" },
        { value: 2, label: "ندارد" },
      ],
    },
  ]);
  const [unitData, setUnitData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const [initialPage, setInitialPage] = useState(0);

  const [searchValues, setSearchValues] = useState<any>({
    title: "",
    code: "",
    status: true,
    viewOrder: 0,
    productUnitId: 0,
    productCategoryId: 0,
  });
  const [filterList, setFilterList] = useState({
    page: 1,
    pageSize: 10,
    title: "",
    code: "",
    status: true,
    viewOrder: 0,
    productUnitId: 0,
    productCategoryId: 0,
  });

  const defaultVal = {
    page: 1,
    pageSize: 10,
    title: "",
    code: "",
    status: true,
    viewOrder: 0,
    productUnitId: 0,
    productCategoryId: 0,
  };

  const getList = useGetJobProductByFilter();
  const getProductCategory = useGetAllProductCategory();

  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

  const {
    data: productionUnitData,
    isFetching: productionUnitIsFetching,
    isSuccess: productionUnitIsSuccess,
  } = useGetAllProductUnitId();

  useEffect(() => {
    if (productionUnitData && productionUnitData.data) {
      const result = productionUnitData.data.result;

      let pro: any = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      result.forEach((unit: any) => {
        pro[0].options.push({
          value: unit.id,
          label: unit.title,
        });
      });
      setUnitData(pro);
    }
  }, [productionUnitIsSuccess]);

  useEffect(() => {
    getList.mutate(filterList);
  }, [refetchEvent.productionList, filterList.pageSize]);

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
          status: values.status ? values.status : 0,
          viewOrder: values.viewOrder,
          productUnitId: values.productUnitId ? values.productUnitId.value : 0,
          productCategoryId: values.productCategoryId
            ? values.productCategoryId.value
            : 0,
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
                <BasicSelectOption
                  lableText="دسته"
                  significant={true}
                  hasLabel
                  placeHolder="انتخاب کنید..."
                  name="productCategoryId"
                  data={
                    getProductCategory.data?.data.result
                      ? getProductCategory.data?.data.result.map(
                          (item: OptionRow) => ({
                            value: item.id,
                            label: item.title,
                          })
                        )
                      : []
                  }
                  isLoading={getProductCategory.isFetching}
                />
              </Col>
              <Col sm="4">
                <BasicSelectOption
                  lableText="واحد"
                  significant={true}
                  placeHolder="انتخاب کنید..."
                  name="productUnitId"
                  data={unitData}
                  isLoading={productionUnitIsFetching}
                />
              </Col>
              <Col sm="4">
                <TextInput
                  name="title"
                  placeholder="عنوان"
                  lableText="عنوان محصول"
                />
              </Col>
              <Col sm="4">
                <TextInput lableText="کد" name="code" placeholder="کد" />
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

export { ListProduction };
