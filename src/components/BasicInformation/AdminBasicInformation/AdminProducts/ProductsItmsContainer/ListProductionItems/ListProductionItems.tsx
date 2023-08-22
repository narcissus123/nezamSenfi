import { Form, Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { TypeOfDependenceEnum } from "../../../../../../core/enums/type-of-dependence.enums";
import { FullOptionSel, OptionRow } from "../../../../../../core/models";
import { useGetAllJobProductByProductCategoryId, useGetAllProductCategory, useGetJobFigureByFilter, useGetJobProductionFactorByFilter } from "../../../../../../core/services/api/job.api";
import { refetchContext } from "../../../../../../core/utils/context/EventContext";
import { SubmitButton, TextInput } from "../../../../../common/Form";
import BasicSelectOption from "../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { ListTable } from "../../../../../common/ListTable";
import { columns } from "./ListProductionItemsColumn";


interface IPropTypes {
  productCategories: any
}
const ListProductionItems: React.FC<IPropTypes> = ({ productCategories }) => {
  const [tableData, setTableData] = useState([]);
  const [pageCount, setPageCount] = useState(1);

  const [initialPage, setInitialPage] = useState(0);

  const [searchValues, setSearchValues] = useState<any>({
    title: "",
    code: "",
    status: true,
    viewOrder: 0,
    productionCycle: 0,
    productId: 0,
  });
  const [filterList, setFilterList] = useState({
    page: 1,
    pageSize: 10,
    title: "",
    code: "",
    status: true,
    viewOrder: 0,
    productionCycle: 0,
    productId: 0,
  });

  const defaultVal = {
    page: 1,
    pageSize: 10,
    title: "",
    code: "",
    status: true,
    viewOrder: 0,
    productionCycle: 0,
    productId: 0,
  };

  const getList = useGetJobFigureByFilter();
  const getProductCategory = useGetAllProductCategory();
  const getProductMutation = useGetAllJobProductByProductCategoryId();

  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

  const [periodProductData, setPeriodProductData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [
        { value: 1, label: "1 ماه" },
        { value: 2, label: "45 روز" },
        { value: 3, label: "2 ماهه" },
        { value: 4, label: "3 ماهه" },
        { value: 5, label: "4 ماهه" },
        { value: 6, label: "5 ماهه" },
        { value: 7, label: " 6 ماهه" },
        { value: 8, label: "7 ماهه" },
        { value: 9, label: "8 ماهه" },
        { value: 10, label: "9 ماهه" },
        { value: 11, label: "10 ماهه" },
        { value: 12, label: "11 ماهه" },
        { value: 13, label: "1 سال" },
        { value: 14, label: "2 ساله" },
        { value: 15, label: "3 ساله" },
        { value: 16, label: "4 ساله" },
        { value: 17, label: "5 ساله" },
        { value: 18, label: " 6 ساله" },
        { value: 19, label: "7 ساله" },
        { value: 20, label: "8 ساله" },
        { value: 21, label: "9 ساله" },
        { value: 22, label: "10 ساله" },
        { value: 23, label: "11 ساله" },
        { value: 24, label: "12 ساله" },
        { value: 25, label: "13 ساله" },
        { value: 26, label: "14 ساله" },
        { value: 27, label: "15 ساله" },
      ],
    },
  ]);

  const [productData, setProductData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  useEffect(() => {
    getList.mutate(filterList);
  }, [refetchEvent.productionFigureList, filterList.pageSize]);

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
          productionCycle: values.productionCycle
            ? values.productionCycle.value
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
                  lableText="دسته بندی محصول"
                  placeHolder="انتخاب کنید..."
                  name="productCategory"
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
                  isLoading={getProductCategory.isLoading}
                  onChange={(opt: any, e: any) => {
                    setFieldValue("productCategory", {
                      value: opt.value,
                      label: opt.label,
                    });
                    setFieldValue("product", null);

                    if (opt) {
                      getProductMutation.mutate(opt.value, {
                        onSuccess: (val: any) => {
                          let data = val.data.result;

                          if (data) {
                            let pro: any = [
                              {
                                label: "انتخاب کنید...",
                                options: [],
                              },
                            ];
                            data.forEach((job: any) => {
                              pro[0].options.push({
                                value: job.id,
                                label: job.title,
                              });
                            });
                            setProductData(pro);
                          }
                        },
                      });
                    }
                  }}
                />
              </Col>
              <Col sm="4">
                <BasicSelectOption
                  lableText="محصول"
                  placeHolder="انتخاب کنید..."
                  name="product"
                  data={productData}
                  isLoading={getProductMutation.isLoading}
                />
              </Col>
              <Col sm="4">
                <TextInput
                  name="title"
                  placeholder=" ... نام رقم"
                  lableText="نام رقم"
                />
              </Col>
            </Row>
            <Row>
              <Col sm="4">
                <BasicSelectOption
                  lableText="دوره محصول"
                  placeHolder="انتخاب کنید..."
                  name="periodProduct"
                  data={periodProductData}
                  isLoading={false}
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

export { ListProductionItems };

