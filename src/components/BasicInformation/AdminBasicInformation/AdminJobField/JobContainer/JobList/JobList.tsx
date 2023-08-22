import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import {
  useAllUseTypes,
  useGetAllJobCategoryByJobSubSectionId,
  useGetAllJobClassByJobCategoryId,
  useGetAllJobSection,
  useGetAllJobSubClassByJobClassId,
  useGetAllJobSubSectionByJobSectionId,
  useGetJobByFilter,
} from "../../../../../../core/services/api";
import { searchJobValidation } from "../../../../../../core/validations/admin-job-tools.validation";
import { SubmitButton, TextInput } from "../../../../../common/Form";
import BasicSelectOption from "../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { ListTable } from "../../../../../common/ListTable/ListTable";
import { columns } from "./SubJobClassColumns";

interface IPropTypes {
  refetch: boolean;
}

const JobList: React.FC<IPropTypes> = ({ refetch }) => {
  const [tableData, setTableData] = useState([]);
  const [pageCount, setPageCount] = useState(1);
  const [sections, setSections] = useState<any>([]);
  const [subSections, setSubSections] = useState<any>([]);
  const [initialPage, setInitialPage] = useState(0);
  const [jobClass, setJobClass] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [searchValues, setSearchValues] = useState<any>({
    title: "",
    code: "",
    jobSubSectionId: null,
    jobSectionId: null,
    jobCategoryId: null,
    jobSubClassId: null,
    useTypeId: null,
  });
  const [filterList, setFilterList] = useState({
    page: 1,
    pageSize: 10,
    title: "",
    code: "",
    jobSubClassId: 0,
    useTypeId: 0,
  });

  const defaultVal = {
    page: 1,
    pageSize: 10,
    title: "",
    code: "",
    jobSubClassId: 0,
    useTypeId: 0,
  };

  const [useTypeData, setUseTypeData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const [jobSubClass, setJobSubClass] = useState<any>([]);

  const {
    data: useTypesData,
    isFetching: useTypesIsFetching,
    isSuccess: useTypesIsSuccess,
  } = useAllUseTypes();
  const getSection = useGetAllJobSection();
  const getSubSection = useGetAllJobSubSectionByJobSectionId();
  const getList = useGetJobByFilter();
  const getCategory = useGetAllJobCategoryByJobSubSectionId();
  const getJobClass = useGetAllJobClassByJobCategoryId();
  const getJobSubClass = useGetAllJobSubClassByJobClassId();

  useEffect(() => {
    if (useTypesData && useTypesData.data) {
      const result = useTypesData.data.result;

      console.log("---usetypedata----", useTypesData);

      let pro: any = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      result.forEach((useType: any) => {
        pro[0].options.push({
          value: useType.id,
          label: useType.title,
          useTypeEnum: useType.useTypeEnum,
        });
      });
      setUseTypeData(pro);
    }
  }, [useTypesIsSuccess]);

  useEffect(() => {
    getList.mutate(filterList);
  }, [refetch]);

  useEffect(() => {
    if (getList.isSuccess) {
      const result = getList.data?.data.result;
      let newTableData: any = []

      result.items.forEach((row: any) => {
        let newConcatedCode1 = row.concatedCode.substring(0, 6);
        let newConcatedCode2 = row.concatedCode.substring(1, 8); 
        newTableData.push({
          ...row,
          code: newConcatedCode2 ,
          concatedCode: newConcatedCode1  ,
        });
      });
      setTableData(newTableData);
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
    setFieldValue("jobCategoryId", null);
    setFieldValue("jobClassId", null);
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

  const onSubSectionChange = (e: any, setFieldValue: any) => {
    setFieldValue("jobSubSectionId", e);
    setFieldValue("jobCategoryId", null);
    setFieldValue("jobClassId", null);
    getCategory.mutate(e.value, {
      onSuccess: (val: any) => {
        const catgoriesList: any = [
          {
            label: "یک گزینه را انتخاب کنید",
            options: [],
          },
        ];

        val.forEach((item: any) => {
          catgoriesList[0].options.push({
            value: item.id,
            label: item.title,
          });
        });
        setCategories(catgoriesList);
      },
    });
  };

  const onCategoryChange = (e: any, setFieldValue: any) => {
    setFieldValue("jobCategoryId", e);
    setFieldValue("jobClassId", null);
    getJobClass.mutate(e.value, {
      onSuccess: (val: any) => {
        const classList: any = [
          {
            label: "یک گزینه را انتخاب کنید",
            options: [],
          },
        ];

        val.forEach((item: any) => {
          classList[0].options.push({
            value: item.id,
            label: item.title,
          });
        });
        setJobClass(classList);
      },
    });
  };

  const onSearch = (values: any, {}, reset: boolean = false) => {
    !reset
      ? getList.mutate({
          ...filterList,
          title: values.title,
          code: values.code,
          jobSectionId: values.jobSectionId ? values.jobSectionId.value : 0,
          jobSubSectionId: values.jobSubSectionId
            ? values.jobSubSectionId.value
            : 0,
          jobCategoryId: values.jobCategoryId ? values.jobCategoryId.value : 0,
          jobClassId: values.jobClassId ? values.jobClassId.value : 0,
          jobSubClassId: values.jobSubClassId ? values.jobSubClassId.value : 0,
          useTypeId: values.useTypeId ? values.useTypeId.value : 0,
        })
      : getList.mutate(defaultVal);

    setInitialPage(0);
  };

  const onJobClassChange = (e: any, setFieldValue: any) => {
    setFieldValue("jobClassId", e);
    setFieldValue("jobSubClassId", null);
    getJobSubClass.mutate(e.value, {
      onSuccess: (val: any) => {
        const classList: any = [
          {
            label: "یک گزینه را انتخاب کنید",
            options: [],
          },
        ];

        val.forEach((item: any) => {
          classList[0].options.push({
            value: item.id,
            label: item.title,
          });
        });
        setJobSubClass(classList);
      },
    });
  };

  return (
    <>
      <Formik
        initialValues={searchValues}
        onSubmit={onSearch}
        enableReinitialize
        validationSchema={searchJobValidation}
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
                  lableText="کد"
                  name="code"
                  placeholder="کد را وارد کنید"
                />
              </Col>
              <Col md="4">
                <BasicSelectOption
                  data={useTypeData}
                  name="useTypeId"
                  lableText="نوع کاربری"
                  isLoading={useTypesIsSuccess}
                  placeHolder="بخش مورد نظر را انتخاب کنید"
                />
              </Col>
              <Col md="4">
                <BasicSelectOption
                  data={sections}
                  name="jobSectionId"
                  lableText="بخش"
                  isLoading={getSection.isLoading}
                  placeHolder="بخش مورد نظر را انتخاب کنید"
                  onChange={(e) => onSectionChange(e, setFieldValue)}
                />
              </Col>
              <Col md="4">
                <BasicSelectOption
                  data={subSections}
                  name="jobSubSectionId"
                  lableText="قسمت"
                  onChange={(e) => onSubSectionChange(e, setFieldValue)}
                  isLoading={getSubSection.isLoading}
                  placeHolder="قسمت مورد نظر را انتخاب کنید"
                />
              </Col>
              <Col md="4">
                <BasicSelectOption
                  data={categories}
                  name="jobCategoryId"
                  lableText="گروه"
                  isLoading={getCategory.isLoading}
                  placeHolder="گروه مورد نظر را انتخاب کنید"
                  onChange={(e) => onCategoryChange(e, setFieldValue)}
                />
              </Col>
              <Col md="4">
                <BasicSelectOption
                  data={jobClass}
                  name="jobClassId"
                  lableText="طبقه"
                  isLoading={getJobClass.isLoading}
                  onChange={(e) => onJobClassChange(e, setFieldValue)}
                  placeHolder="طبقه مورد نظر را انتخاب کنید"
                />
              </Col>

              <Col md="4">
                <BasicSelectOption
                  data={jobSubClass}
                  name="jobSubClassId"
                  lableText="زیر طبقه ها"
                  isLoading={getJobSubClass.isLoading}
                  placeHolder="زیر طبقه مورد نظر را انتخاب کنید"
                />
              </Col>
            </Row>
            <SubmitButton
              isLoading={getList.isLoading}
              btnText="جستجو"
              clearable
              values={values}
              schema={searchJobValidation}
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

export { JobList };
