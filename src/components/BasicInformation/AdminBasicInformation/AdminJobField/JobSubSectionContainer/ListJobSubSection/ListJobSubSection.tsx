import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import {
  useGetAllJobSection,
  useGetJobSubSectionByFilter,
} from "../../../../../../core/services/api";
import { searchJobSubSectionValidation } from "../../../../../../core/validations/admin-job-tools.validation";
import { SubmitButton, TextInput } from "../../../../../common/Form";
import BasicSelectOption from "../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { ListTable } from "../../../../../common/ListTable/ListTable";
import { columns } from "./JobSubSectionColumns";

interface IPropTypes {
  refetch: boolean;
}

const ListJobSubSection: React.FC<IPropTypes> = ({ refetch }) => {
  const [tableData, setTableData] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [sections, setSections] = useState<any>([]);
  const [subSections, setSubSections] = useState<any>([]);
  const [initialPage, setInitialPage] = useState(0);
  const [searchValues, setSearchValues] = useState<any>({
    title: "",
    code: "",
    jobSectionId: 0,
  });
  const [filterList, setFilterList] = useState({
    page: 1,
    pageSize: 10,
    title: "",
    code: "",
    jobSectionId: 0,
  });

  const defaultVal = {
    page: 1,
    pageSize: 10,
    title: "",
    code: "",
    jobSectionId: 0,
  };

  const getSection = useGetAllJobSection();
  const getList = useGetJobSubSectionByFilter();

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

  useEffect(() => {
    if (getSection.isSuccess) {
      const result: any = getSection.data;
      const sectionList: any = [
        {
          label: "یک گزینه را انتخاب کنید",
          options: [],
        },
      ];

      result.forEach((item: any) => {
        sectionList[0].options.push({
          value: item.id,
          label: item.title,
        });
      });
      setSections(sectionList);
    }
  }, [getSection.isSuccess]);

  const onSearch = (values: any, {}, reset: boolean = false) => {
    !reset
      ? getList.mutate({
          ...filterList,
          title: values.title,
          code: values.code,
          jobSectionId: values.jobSectionId ? values.jobSectionId.value : 0,
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
        validationSchema={searchJobSubSectionValidation}
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
                  lableText="کد قسمت"
                  name="code"
                  placeholder="کد قسمت را وارد کنید"
                />
              </Col>
              <Col md="4">
                <BasicSelectOption
                  data={sections}
                  name="jobSectionId"
                  lableText="بخش"
                  isLoading={getSection.isLoading}
                  placeHolder="بخش مورد نظر را انتخاب کنید"
                />
              </Col>
            </Row>
            <SubmitButton
              isLoading={getList.isLoading}
              btnText="جستجو"
              clearable
              values={values}
              schema={searchJobSubSectionValidation}
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

export { ListJobSubSection };
