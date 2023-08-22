import React, { FC, useContext, useEffect, useState } from "react";
import {Card, CardBody, CardHeader, CardTitle, Col, Row} from "reactstrap";

import { useHistory, useParams } from "react-router-dom";

import { columns } from "./UserColumns";
import { Form, Formik } from "formik";
import { refetchContext } from "../../../../../core/utils/context/EventContext";
import { ListTable } from "../../../../common/ListTable/ListTable";
import BasicSelectOption from "../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { FullOptionSel } from "../../../../../core/models";
import { ModernDatePicker, SubmitButton, TextInput } from "../../../../common/Form";
import { useGetAllTarrif } from "../../../../../core/services/api/tarrif.api";



interface IPropTypes {
}

const List: FC<IPropTypes> = ({  }) => {
  const { id } = useParams<{ id: string }>();

  const [tableData, setTableData] = useState([]);

  const [pageCountList, setPageCount] = useState<any>(0);
  const [pageSize, setPageSize] = useState<any>(10);
  const [filterState, setFilterState] = useState<any>({
    page: 1,
    pageSize: pageSize,
  });
  const getMutation = useGetAllTarrif()

  const [landTypeData, setLandTypeData] = useState<FullOptionSel[]>([
    {
      label: "انتخاب کنید ...",
      options: [],
    },
  ]);

  const {refetchEvent,setRefetchEvent} = useContext(refetchContext)


  const history = useHistory();

  const fillForm = (val:any) => {
    setTableData(val.data.result.items);
    setPageCount(Math.ceil(val.data.result.totalCount / pageSize));
  }

  useEffect(()=>{
      getMutation.mutate(
        {
          page: 1,
          pageSize: pageSize,
        },
        {
          onSuccess: (val: any) => {
            fillForm(val);
          },
        }
      );
}, [ pageSize, refetchEvent.tariffList  ])

  return (
    <>
      <Formik
        initialValues={filterState}
        onSubmit={(value) => {
          const obj: any = {
            page: 1,
            pageSize: pageSize,
            title: value.title,
            description: value.description,
            letterNumber: value.letterNumber,
            letterDate: value.letterDate,
          };
          getMutation.mutate(obj, {
            onSuccess: (val: any) => {
              fillForm(val);
            },
          });
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
                  <Row>
                    <Col md="4">
                      <TextInput
                        lableText="عنوان تعرفه"
                        name="title"
                        placeholder="عنوان تعرفه را وارد کنید ... ..."
                      />
                    </Col>
                    <Col md="4">
                      <TextInput
                        lableText="توضیحات"
                        name="description"
                        placeholder="توضیحات"
                      />
                    </Col>
                    <Col md="4">
                      <TextInput
                        lableText="شماره نامه"
                        name="letterNumber"
                        placeholder="وارد کنید ..."
                        
                      />
                    </Col>
                    <Col md="4">
                      <ModernDatePicker
                        name="letterDate"
                        lableText="تاریخ نامه"
                        placeholder="وارد کنید..."
                        hasMaximum={false}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="4">
                      <SubmitButton
                        isLoading={getMutation.isLoading}
                        values={values}
                      />
                    </Col>
                  </Row>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle> لیست </CardTitle>
                </CardHeader>
                <CardBody>
                  <ListTable
                    columns={columns}
                    isLoading={getMutation.isLoading}
                    onPageChange={({ page, pageSize }) => {
                      getMutation.mutate({
                        page: page,
                        pageSize: pageSize,
                        inspectionTableTypeLandArea:
                          values.inspectionTableTypeLandArea
                            ? values.inspectionTableTypeLandArea.value
                            : 0,
                      });
                    }}
                    tableData={tableData}
                    pageCountList={pageCountList}
                    customPageSize={pageSize}
                    setPageSize={(val: any) => setPageSize(val)}
                    getCustomProps={{}}
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
