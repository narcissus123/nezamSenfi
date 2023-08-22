import { Form, Formik } from "formik";
import React, { useContext, useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { TypeOfDependenceEnum } from "../../../../../../core/enums/type-of-dependence.enums";
import { useGetJobProductionFactorByFilter } from "../../../../../../core/services/api/job.api";
import { refetchContext } from "../../../../../../core/utils/context/EventContext";
import { SubmitButton, TextInput } from "../../../../../common/Form";
import BasicSelectOption from "../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { ListTable } from "../../../../../common/ListTable";
import { columns } from "./ListProductionFactorColumn";

const ListProductionFactor: React.FC = () => {
  const [tableData, setTableData] = useState([]);
  const [pageCount, setPageCount] = useState(1);

  const [dependTypeData, setDependTypeData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [
        {value: TypeOfDependenceEnum.Machinery , label : 'ماشین آلات'},
        {value: TypeOfDependenceEnum.AreaOfBuildingsAndFacilities  , label : 'مساحت ساختمان و تاسیسات'},
        {value: TypeOfDependenceEnum.Trees  , label : 'درختان'},
        {value: TypeOfDependenceEnum.TotalArea  , label : 'مساحت کل'},
      ],
    },
  ]);

  const [repeatData, setRepeatData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [
        {value: 1 , label : 'دارد'},
        {value: 2 , label : 'ندارد'},
      ],
    },
  ]);

  const [initialPage, setInitialPage] = useState(0);

  const [searchValues, setSearchValues] = useState<any>({
    title: "",
    code: "",
    status: true,
    viewOrder: 0,
    typeOfDependence: 0,
    possibilityOfRepetition: 0,
    jobId: 0,
  });
  const [filterList, setFilterList] = useState({
    page: 1,
    pageSize: 10,
    title: "",
    code: "",
    status: true,
    viewOrder: 0,
    typeOfDependence: 0,
    possibilityOfRepetition: 0,
    jobId: 0,
  });

  const defaultVal = {
    page: 1,
    pageSize: 10,
    title: "",
    code: "",
    status: true,
    viewOrder: 0,
    typeOfDependence: 0,
    possibilityOfRepetition: 0,
    jobId: 0,
  };


  const getList = useGetJobProductionFactorByFilter();

  
const {refetchEvent,setRefetchEvent} = useContext(refetchContext)



  useEffect(() => {
    getList.mutate(filterList);
  }, [refetchEvent.productionFactorList , filterList.pageSize]);

  useEffect(() => {
    if (getList.isSuccess) {
      const result = getList.data?.data.result;
      console.log('result----' , result);
      
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
          typeOfDependence: values.typeOfDependence ? values.typeOfDependence.value : 0,
          possibilityOfRepetition: values.possibilityOfRepetition ? values.possibilityOfRepetition.value : 0,
          jobId: values.jobId ? values.jobId.value : 0,
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
                  placeholder="عنوان عامل تولید"
                  lableText="عنوان عامل تولید"
                />
              </Col>
              <Col sm="4">
                <TextInput
                  lableText="کد عامل تولید"
                  name="code"
                  placeholder="کد عامل تولید"
                />
              </Col>
              <Col sm="4">
                <TextInput
                  lableText="ترتیب نمایش"
                  name="viewOrder"
                  placeholder="ترتیب نمایش"
                  significant
                />
              </Col>
            </Row>
            <Row>
              <Col sm="4">
                <BasicSelectOption
                  lableText="نوع وابستگی"
                  significant={true}
                  placeHolder="انتخاب کنید..."
                  name="typeOfDependence"
                  data={dependTypeData}
                  isLoading={false}
                />
              </Col>
              <Col sm="4">
                <BasicSelectOption
                  lableText="امکان تکرار"
                  significant={true}
                  placeHolder="انتخاب کنید..."
                  name="possibilityOfRepetition"
                  data={repeatData}
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

            <ListTable
              isLoading={getList.isLoading}
              columns={columns}
              pageCountList={pageCount}
              tableData={tableData}
              onPageChange={({ page, pageSize }) => {
                getList.mutate({
                  ...filterList,
                  title: values.title,
                  code: values.code,
                  status: values.status ? values.status : 0,
                  viewOrder: values.viewOrder,
                  typeOfDependence: values.typeOfDependence
                    ? values.typeOfDependence.value
                    : 0,
                  possibilityOfRepetition: values.possibilityOfRepetition
                    ? values.possibilityOfRepetition.value
                    : 0,
                  jobId: values.jobId ? values.jobId.value : 0,
                  page: page,
                  pageSize: pageSize,
                });
                setFilterList({
                  ...filterList,
                  page: page,
                  pageSize: pageSize,
                });
              }}
              customPageSize={10}
              initialPage={initialPage}
              setInitialPage={setInitialPage}
              setPageSize={(val) =>
                setFilterList({ ...filterList, pageSize: val })
              }
              getCustomProps={{
                refetch: () => {
                  getList.mutate(filterList);
                },
              }}
            >
              {{ headerTable: <p></p> }}
            </ListTable>
          </Form>
        )}
      </Formik>
    </>
  );
};

export { ListProductionFactor };

