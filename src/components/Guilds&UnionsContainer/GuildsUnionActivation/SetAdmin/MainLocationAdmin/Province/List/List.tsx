import React, { FC, useContext, useEffect, useState } from "react";
import {Card, CardBody, CardHeader, CardTitle} from "reactstrap";

import { useHistory, useParams } from "react-router-dom";

import { columns } from "./UserColumns";
import { Form, Formik } from "formik";
import { ListTable } from "../../../../../../common/ListTable/ListTable";
import { ListFilter } from "./ListFilter/ListFilter";
import { useGetAllProvinceAdminByProvinceid, useGetAllprovinces } from "../../../../../../../core/services/api";
import { refetchContext } from "../../../../../../../core/utils/context/EventContext";


interface IPropTypes {
}

const List: FC<IPropTypes> = ({  }) => {
  const { id } = useParams<{ id: string }>();

  const [tableData, setTableData] = useState([]);

  const [ownedProvince, setOwnedProvince] = useState<any>([]);
  const [ownedCounties, setOwnedCounties] = useState<any>([]);

  const [pageCountList, setPageCount] = useState<any>(0);
  const [pageSize, setPageSize] = useState<any>(10);
  const [filterState, setFilterState] = useState<any>({
    userNationalCode: "",
    name: "",
    page: 1,
    pageSize: pageSize,
    provinceId : null
  });
  const getMutation = useGetAllProvinceAdminByProvinceid()

  const { data, isSuccess, isFetching } = useGetAllprovinces();
  
  const {refetchEvent,setRefetchEvent} = useContext(refetchContext)

  useEffect(()=>{
      if (data) {
        let queryData: any = data;
        let newOptions: any = [];
        let newProvinces: any = [
          {
            label: "سرلیست استان",
            options: [],
          },
        ];

        queryData.data.result.forEach((row: any) => {
          newOptions.push({ value: row.id, label: row.title });
        });
        newProvinces[0].options = newOptions;
        setOwnedProvince(newProvinces);

        // getAllCountyMutation.mutate(newProvinces[0].options[0].value , {onSuccess:(val:any)=>{

        // }})  
        history.push(`?id=${newProvinces[0].options[0].value}`)

        getMutation.mutate({
          page: 1,
          pageSize: pageSize,
          provinceId: newProvinces[0].options[0].value,
        });
        setFilterState((prev: any) => {
          return { ...prev, provinceId: newProvinces[0].options[0] };
        });
      }
  }, [ isSuccess , pageSize , refetchEvent.provinceAdminRemove  ])



  useEffect(() => {
    if (getMutation.data && getMutation.data.data.result) {
      let newState: any = [];
      getMutation.data.data.result.items.forEach((row: any) => {
        newState.push({
          id: row.id,
          name: `${row.name} ${row.lastName}`,
          email: row.email,
          userNationalCode: row.nationalCode ? row.nationalCode : "نامشخص",
          provinceId : filterState.provinceId
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
          history.push(`?id=${value.provinceId.value}`)
          const obj: any = {
            nationalCode: value.userNationalCode,
            name: value.name,
            page: 1,
            pageSize: pageSize,
            provinceId : value.provinceId.value
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
                  <ListFilter setFieldValue={setFieldValue} ownedProvinceLoading={isFetching} getMutation={getMutation} ownedProvince={ownedProvince}/>
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
