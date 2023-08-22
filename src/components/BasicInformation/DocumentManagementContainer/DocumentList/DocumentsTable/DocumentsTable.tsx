import { Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { DocumentCategoryData } from "../../../../../core/data/document-category.data";
import { OptionRowSel } from "../../../../../core/models";
import { useAllDocument } from "../../../../../core/services/api";
import { SubmitButton, TextInput } from "../../../../common/Form";
import BasicSelectOption from "../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { ListTable } from "../../../../common/ListTable/ListTable";
import { columns } from "../DocumentListColumn";

interface IInitialObj {
  type: OptionRowSel | null;
  title: string;
}

interface ISearchObj {
  type: OptionRowSel | number;
  title: string;
  page: number;
  pageSize: number;
}

interface IPropTypes {
  refetch: boolean;
}

const DocumentsTable: FC<IPropTypes> = ({ refetch }) => {
 
  const [tableData, setTableData] = useState<any>([]);
  const [initialPage, setInitialPage] = useState<number>(0);
  const [pageCount, setPageCount] = useState<number>(0);
  const [initialValues, setInitialValues] = useState<IInitialObj>({
    title: "",
    type: null,
  });

  const [searchObj, setSearchObj] = useState<ISearchObj>({
    title: "",
    type: 0,
    page: 1,
    pageSize: 10,
  });

  const getAllDoc = useAllDocument();

  useEffect(() => {
    setSearchObj((old: ISearchObj) => ({ ...old, page: initialPage + 1 }));
  }, [initialPage]);

  useEffect(() => {
    if (initialPage === 0) {
      getAllDoc.mutate({ ...searchObj, page: 1 });
    } else getAllDoc.mutate(searchObj);
  }, [searchObj.pageSize, refetch]);

  useEffect(() => {
    if (getAllDoc.isSuccess) {
      const result = getAllDoc.data?.data.result;
      let newData: any = [];

      
      if (result) {
        result.items.forEach((row: any) => {
          let jobCategories: string= ""
          if(row.jobCategoryEnums){
            row.jobCategoryEnums.forEach((row: any) => {
              jobCategories += row.jobCategoryTitle + ", ";
            })
          }

          newData.push({
            id: row.id,
            title: row.title,
            description: row.description,
            categoryTitle: row.typeTitle,
            jobCategoryEnums: jobCategories,
          });
        });

        setTableData(newData);
        setPageCount(Math.ceil(result.totalCount / searchObj.pageSize));
      }
    }
  }, [getAllDoc.isSuccess]);

  const history = useHistory();
  // const deleteDocumentByIdMutation = useDeleteDocumentById();
  // const allDocumentByCategoryIdMutation = useAllDocumentByCategoryId();

  const handleCategoryChange = (value: IInitialObj) => {
    if (value) {
      const searchObjLocaly: ISearchObj | any = {
        ...searchObj,
        title: value.title,
        type: value.type ? value.type.value : 0,
      };
      setSearchObj(searchObjLocaly);
      setInitialPage(0);
      getAllDoc.mutate(searchObjLocaly);
    }
  };

  const onClear = (resetForm: () => void) => {
    setSearchObj({ ...searchObj, title: "", type: 0 });
    getAllDoc.mutate({ ...searchObj, title: "", type: 0 });
    resetForm();
  };

  return (
    <div>
      <div style={{ marginBottom: "30px" }}>
        <Formik
          initialValues={initialValues}
          enableReinitialize
          onSubmit={handleCategoryChange}
        >
          {({ resetForm }) => (
            <Form>
              <Row>
                <Col sm="3">
                  <TextInput
                    name="title"
                    placeholder="عنوان را وارد کنید..."
                    hasLabel
                    lableText="عنوان"
                  />
                </Col>
                <Col sm="3">
                  <BasicSelectOption
                    data={DocumentCategoryData}
                    name="type"
                    lableText="نوع سند"
                    hasLabel
                    placeHolder="انتخاب کنید..."
                  />
                </Col>
                <Col sm="6" className="mt-2">
                  <SubmitButton
                    isLoading={getAllDoc.isLoading}
                    btnText="جستجو"
                    clearable
                    clearableTxt="پاک کردن"
                    clearableDisable={getAllDoc.isLoading}
                    onClear={() => onClear(resetForm)}
                  />
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </div>
      <ListTable
        isLoading={getAllDoc.isLoading}
        columns={columns}
        pageCountList={pageCount}
        setPageSize={(val: number) =>
          setSearchObj((old: ISearchObj) => ({ ...old, pageSize: val }))
        }
        customPageSize={searchObj.pageSize}
        setInitialPage={setInitialPage}
        initialPage={initialPage}
        tableData={tableData}
        getCustomProps={{
          setrefetchDocumnts: () => getAllDoc.mutate(searchObj),
        }}
        onPageChange={({ page, pageSize }) => {
          const newSearchObj: ISearchObj = {
            ...searchObj,
            page: page,
            pageSize: pageSize,
          };
          setSearchObj(newSearchObj);
          getAllDoc.mutate(newSearchObj);
        }}
      >
        {{ headerTable: <p></p> }}
      </ListTable>
    </div>
  );
};

export { DocumentsTable };
