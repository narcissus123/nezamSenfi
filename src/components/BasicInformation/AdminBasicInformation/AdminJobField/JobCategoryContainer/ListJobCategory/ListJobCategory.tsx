import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import {
  useGetAllJobSection,
  useGetAllJobSubSectionByJobSectionId,
  useGetJobCategoryByFilter,
} from "../../../../../../core/services/api";
import { searchJobCategoryValidation } from "../../../../../../core/validations/admin-job-tools.validation";
import { SubmitButton, TextInput } from "../../../../../common/Form";
import BasicSelectOption from "../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { ListTable } from "../../../../../common/ListTable/ListTable";
import { columns } from "./JobCategoryColumns";

interface IPropTypes {
  refetch: boolean;
}

const ListJobCategory: React.FC<IPropTypes> = ({ refetch }) => {
  const [tableData, setTableData] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [sections, setSections] = useState<any>([]);
  const [subSections, setSubSections] = useState<any>([]);
  const [initialPage, setInitialPage] = useState(0);
  const [searchValues, setSearchValues] = useState<any>({
    title: "",
    code: "",
    jobSubSectionId: 0,
    jobSectionId: 0,
  });
  const [filterList, setFilterList] = useState({
    page: 1,
    pageSize: 10,
    title: "",
    code: "",
    jobSubSectionId: 0,
    jobSectionId: 0,
  });

  const defaultVal = {
    page: 1,
    pageSize: 10,
    title: "",
    code: "",
    jobSubSectionId: 0,
    jobSectionId: 0,
  };

  const getSection = useGetAllJobSection();
  const getSubSection = useGetAllJobSubSectionByJobSectionId();
  const getList = useGetJobCategoryByFilter();

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

  const onSectionChange = (e: any, setFieldValue: any) => {
    setFieldValue("jobSectionId", e);
    setFieldValue("jobSubSectionId", null);
    getSubSection.mutate(e.value, {
      onSuccess: (val: any) => {
        const subSectionList: any = [
          {
            label: "یک گزینه را انتخاب کنید",
            options: [],
          },
        ];

        val.forEach((item: any) => {
          subSectionList[0].options.push({
            value: item.id,
            label: item.title,
          });
        });
        setSubSections(subSectionList);
      },
    });
  };

  const onSearch = (values: any, {}, reset: boolean = false) => {
    !reset
      ? getList.mutate({
          ...filterList,
          title: values.title,
          code: values.code,
          jobSubSectionId: values.jobSubSectionId
            ? values.jobSubSectionId.value
            : 0,
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
        validationSchema={searchJobCategoryValidation}
      >
        {({ setFieldValue, resetForm, values }) => (
          <Form>
            <Row>
              <Col sm="3">
                <TextInput
                  name="title"
                  placeholder="عنوان را وارد کنید"
                  lableText="عنوان"
                />
              </Col>
              <Col sm="3">
                <TextInput
                  lableText="کد گروه"
                  name="code"
                  placeholder="کد زمینه فعالیت را وارد کنید"
                />
              </Col>
              <Col md="3">
                <BasicSelectOption
                  data={sections}
                  name="jobSectionId"
                  lableText="بخش"
                  isLoading={getSection.isLoading}
                  placeHolder="بخش مورد نظر را انتخاب کنید"
                  onChange={(e) => onSectionChange(e, setFieldValue)}
                />
              </Col>
              <Col md="3">
                <BasicSelectOption
                  data={subSections}
                  name="jobSubSectionId"
                  lableText="قسمت"
                  isLoading={getSubSection.isLoading}
                  placeHolder="قسمت مورد نظر را انتخاب کنید"
                />
              </Col>
            </Row>
            <SubmitButton
              isLoading={getList.isLoading}
              btnText="جستجو"
              clearable
              values={values}
              schema={searchJobCategoryValidation}
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

export { ListJobCategory };
