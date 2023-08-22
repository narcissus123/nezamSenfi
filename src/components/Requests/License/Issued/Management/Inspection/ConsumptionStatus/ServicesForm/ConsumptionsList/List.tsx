import React, { FC, useEffect, useState } from "react";
import {Card, CardBody, CardHeader, CardTitle} from "reactstrap";

import { useHistory, useParams } from "react-router-dom";

import { columns } from "./UserColumns";
import { Form, Formik } from "formik";
import { ListFilter } from "./ListFilter/ListFilter";
import { ListTable } from "../../../../../../../../common/ListTable/ListTable";

interface IPropTypes {
  getListMutation: any;
  jobs: any;
  setInitialValues: any;
  getConsomptionTabs: any;
  setConsomptionTabs: any;
  setUseTypeId: any;
}

const List: FC<IPropTypes> = ({
  getListMutation,
  jobs,
  setInitialValues,
  getConsomptionTabs,
  setConsomptionTabs,
  setUseTypeId,
}) => {
  const { id } = useParams<{ id: string }>();

  const [tableData, setTableData] = useState([]);

  const [pageCountList, setPageCount] = useState<any>(0);
  const [pageSize, setPageSize] = useState<any>(10);
  const [filterState, setFilterState] = useState<any>({
    productionFactorId: 0,
    year: "",
    page: 1,
    pageSize: pageSize,
    activityRate: "",
  });

  const history = useHistory();
  const { section_id } = useParams<{ section_id: string }>();

  const getMutation = getListMutation();

  useEffect(() => {
    getMutation.mutate({
      productionFactorId: 0,
      year: 0,
      page: 1,
      pageSize: pageSize,
      activityRate: 0,
      sectionId: +section_id,
    });
  }, [pageSize]);

  useEffect(() => {
    if (getMutation.data && getMutation.data.data.result) {
      setTableData(getMutation.data.data.result.items);
      setPageCount(
        Math.ceil(getMutation.data.data.result.totalCount / pageSize)
      );
    }
  }, [getMutation.isSuccess]);

  return (
    <>
      <Formik
        initialValues={filterState}
        onSubmit={(value) => {
          const obj: any = {
            productionFactorId: value.productionFactorId
              ? value.productionFactorId.value
              : 0,
            year: value.year ? value.year.value : 0,
            page: 1,
            pageSize: pageSize,
            activityRate:
              value.activityRate.length > 0 ? value.activityRage : 0,
            sectionId: +section_id,
          };
          getMutation.mutate(obj);
        }}
        enableReinitialize={true}
      >
        {({ values, errors, handleChange, resetForm, setFieldValue }) => (
          <>
            <Form>
              <Card>
                <CardHeader>
                  <CardTitle> جستجو </CardTitle>
                </CardHeader>
                <CardBody>
                  <ListFilter
                    jobs={jobs}
                    values={values}
                    setFieldValue={setFieldValue}
                    getMutation={getMutation}
                  />
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>لیست مصارف ثبت شده</CardTitle>
                </CardHeader>
                <CardBody>
                  <ListTable
                    columns={columns}
                    isLoading={getMutation.isLoading}
                    onPageChange={({ page, pageSize }) => {
                      getMutation.mutate({
                        page: page,
                        pageSize: pageSize,
                      });
                    }}
                    tableData={tableData}
                    pageCountList={pageCountList}
                    customPageSize={pageSize}
                    setPageSize={(val: any) => setPageSize(val)}
                    getCustomProps={{
                      setInitialValues: setInitialValues,
                      getConsomptionTabs: getConsomptionTabs,
                      setConsomptionTabs : setConsomptionTabs,
                      setUseTypeId : setUseTypeId
                    }}
                  >
                    {{
                      headerTable: (
                        <div
                          className="d-flex flex-wrap justify-content-left"
                          style={{ width: "100%" }}
                        ></div>
                      ),
                    }}
                  </ListTable>
                </CardBody>
              </Card>
            </Form>
          </>
        )}
      </Formik>
    </>
  );
};

export { List };
