import React, { FC, useContext, useEffect, useState } from "react";
import {Card, CardBody, CardHeader, CardTitle} from "reactstrap";

import { useHistory, useParams } from "react-router-dom";

import { columns } from "./UserColumns";
import { Form, Formik } from "formik";
import { refetchContext } from "../../../../core/utils/context/EventContext";
import { useGetConsomptionCostByFilter } from "../../../../core/services/api";
import { SearchCostManagementValidate } from "../../../../core/validations/add-cost-management.validation";
import { ListFilter } from "./ListFilter/ListFilter";
import { ListTable } from "../../../common/ListTable/ListTable";
import { fullOption } from "../../../../core/utils";


interface IPropTypes {
}

const List: FC<IPropTypes> = ({  }) => {
  const { id } = useParams<{ id: string }>();

  const [tableData, setTableData] = useState([]);
  const [countyData, setCountyData] = useState<any>([]);

  const [pageCountList, setPageCount] = useState<any>(0);
  const [pageSize, setPageSize] = useState<any>(10);
  const [filterState, setFilterState] = useState<any>({
    page: 1,
    pageSize: pageSize,
    from1 : "",
    from2: "",
    type: null,
    oprator:null
  });
  const getMutation = useGetConsomptionCostByFilter()

  const {refetchEvent,setRefetchEvent} = useContext(refetchContext)

  const [operatorData, setOperatorData] = useState<any>([
    {
      label: "انتخاب کنید ...",
      options: [
        { value: 1, label: "مساوی" },
        { value: 2, label: "بزرگتر" },
        { value: 3, label: "کوچک تر" },
        { value: 4, label: "مابین" },
      ],
    },
  ]);
  const [typeData, setTypeData] = useState<any>([
    {
      label: "انتخاب کنید ...",
      options: [
        {value : 1, label : "هزینه آب" },
        {value : 2, label : "هزینه برق سالیانه" },
        {value : 3, label : "هزینه گازشهری" },
        {value : 4, label : "هزینه کود" },
        {value : 5, label : "هزینه سم" },
        {value : 6, label : "هزینه تعمیرات" },
        {value : 7, label : "هزینه لاستیک" },
      ],
    },
  ]);


  const history = useHistory();

  const fillForm = (val:any) => {

    let newState: any = [];
    console.log('---vall--' , val);
    
    val.data.result.items.forEach((row: any) => {
      newState.push({
        id: row.id,
        from1: row.from1,
        from2: row.from2,
        oprator: row.oprator,
        opratorTitle: fullOption(row.oprator, operatorData)?.label,
        type: row.type,
        typeTitle: fullOption(row.type, typeData)?.label,
      });
    });
    setTableData(newState);
    setPageCount(
      Math.ceil(val.data.result.totalCount / pageSize)
    );

  }

  useEffect(()=>{
      getMutation.mutate(
        {
          page: 1,
          pageSize: pageSize,
          from1: 0,
          from2: 0,
          oprator: 0,
          type: 0,
        },
        {
          onSuccess: (val: any) => {
            fillForm(val);
          },
        }
      );
}, [ pageSize  , refetchEvent.costManagementList ])

  return (
    <>
      <Formik
        initialValues={filterState}
        validationSchema={SearchCostManagementValidate}
        onSubmit={(value) => {
          const obj: any = {
            page: 1,
            pageSize: pageSize,
            from1: +value.from1,
            from2: +value.from2,
            type: value.type ? value.type.value : 0,
            oprator: value.oprator ? value.type.oprator : 0,
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
                  <ListFilter
                    getMutation={getMutation}
                    setFieldValue={setFieldValue}
                  />
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle> لیست هزینه ها </CardTitle>
                </CardHeader>
                <CardBody>
                  <ListTable
                    columns={columns}
                    isLoading={getMutation.isLoading}
                    onPageChange={({ page, pageSize }) => {
                      getMutation.mutate({
                        page: page,
                        pageSize: pageSize,
                        from1: 0,
                        from2: 0,
                        oprator: 0,
                        type: 0,
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
