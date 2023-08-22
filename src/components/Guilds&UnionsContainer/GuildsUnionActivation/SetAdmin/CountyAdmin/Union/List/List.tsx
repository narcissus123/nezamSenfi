import React, { FC, useContext, useEffect, useState } from "react";
import {Card, CardBody, CardHeader, CardTitle} from "reactstrap";

import { useHistory, useParams } from "react-router-dom";

import { columns } from "./UserColumns";
import { Form, Formik } from "formik";
import { ListTable } from "../../../../../../common/ListTable/ListTable";
import { ListFilter } from "./ListFilter/ListFilter";
import { useGetAllUnionAdminByUnionId, useGetCountyUnionByCountyId, useGetOwnedUserCountyGuildRoomsForAdmin } from "../../../../../../../core/services/api";
import { refetchContext } from "../../../../../../../core/utils/context/EventContext";


interface IPropTypes {
}

const List: FC<IPropTypes> = ({  }) => {
  const { id } = useParams<{ id: string }>();

  const [tableData, setTableData] = useState([]);

  const [ownedCounties, setOwnedCounties] = useState<any>([]);
  const [ownedUnions, setOwnedUnions] = useState<any>([]);

  const [pageCountList, setPageCount] = useState<any>(0);
  const [pageSize, setPageSize] = useState<any>(10);
  const [filterState, setFilterState] = useState<any>({
    userNationalCode: "",
    name: "",
    page: 1,
    pageSize: pageSize,
    unionId : null
  });
  const getMutation = useGetAllUnionAdminByUnionId()

  const { data, isSuccess, isFetching }  = useGetOwnedUserCountyGuildRoomsForAdmin()
  const getAllUnionMutation = useGetCountyUnionByCountyId()

  const {refetchEvent,setRefetchEvent} = useContext(refetchContext)

  useEffect(()=>{
      if (data) {
            let queryData: any = data;
            let newOptions: any = [];
            let newCounties: any = [
              {
                label: "سرلیست شهرستان",
                options: [],
              },
            ];

            queryData.data.result.forEach((row: any) => {
              newOptions.push({
                value: row.id,
                label: `${row.countyTitle ? row.countyTitle : ""} (${
                  row.title ? row.title : ""
                })`,
              });
            });
            newCounties[0].options = newOptions;
            setOwnedCounties(newCounties);

            getAllUnionMutation.mutate(
              {
                page: 1,
                pageSize: 200,
                countyId: newCounties[0].options[0].value,
              },
              {
                onSuccess: (val: any) => {
                  const result = val.data.result.unions;
                  let newOptions: any = [];
                  let newUnions: any = [
                    {
                      label: "سرلیست اتحادیه",
                      options: [],
                    },
                  ];

                  result.forEach((row: any) => {
                    newOptions.push({
                      value: row.unionId,
                      label: `${row.unionTitle ? row.unionTitle : ""} (${
                        row.title ? row.title : ""
                      })`,
                    });
                  });
                  newUnions[0].options = newOptions;
                  setOwnedUnions(newUnions);
                  if(result.length > 0){
                     getMutation.mutate({
                      page: 1,
                      pageSize: pageSize,
                      unionId: newUnions[0].options[0].value,
                    });
                    history.push(`?id=${newUnions[0].options[0].value}`)
                    setFilterState((prev: any) => {
                      return {
                        ...prev,
                        unionId: newUnions[0].options[0],
                      };
                    });
                  }
                    setFilterState((prev: any) => {
                      return {
                        ...prev,
                        countyId: newCounties[0].options[0],
                      };
                    });
                }
             })
            }
  }, [ isSuccess , pageSize , refetchEvent.unionAdminRemove ])



  useEffect(() => {
    if (getMutation.data && getMutation.data.data.result) {
      let newState: any = [];
      getMutation.data.data.result.items.forEach((row: any) => {
        newState.push({
          id: row.id,
          name: `${row.name} ${row.lastName}`,
          email: row.email,
          userNationalCode: row.nationalCode ? row.nationalCode : "نامشخص",
          unionId: filterState.unionId,
        });
      });
      setTableData(newState);
      setPageCount(
        Math.ceil(getMutation.data.data.result.totalCount / pageSize)
      );
    }
  }, [getMutation.isSuccess]);

  const history = useHistory();


  return (
    <>
      <Formik
        initialValues={filterState}
        onSubmit={(value) => {
          history.push(`?id=${value.unionId.value}`)
          const obj: any = {
            nationalCode: value.userNationalCode,
            name: value.name,
            page: 1,
            pageSize: pageSize,
            unionId : value.unionId.value
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
                  <ListFilter setOwnedUnions={setOwnedUnions} ownedUnions={ownedUnions} getAllUnionLoading={getAllUnionMutation.isLoading} getAllUnionMutation={getAllUnionMutation}  setFieldValue={setFieldValue} ownedCountyLoading={isFetching} getMutation={getMutation} ownedCounties={ownedCounties}/>
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle> لیست ادمین ها</CardTitle>
                </CardHeader>
                <CardBody>
                  <ListTable
                    columns={columns}
                    isLoading={getMutation.isLoading || isFetching}
                    onPageChange={({ page, pageSize }) => {
                      getMutation.mutate({
                        page: page,
                        pageSize: pageSize,
                        provinceId: 0,
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
