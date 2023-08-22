import React, { FC, useEffect, useState } from "react";
import {Card, CardBody, CardHeader, CardTitle} from "reactstrap";

import { useHistory, useParams } from "react-router-dom";

import { columns } from "./UserColumns";
import { Form, Formik } from "formik";
import { ListTable } from "../../../../../../common/ListTable/ListTable";
import { ListFilter } from "./ListFilter/ListFilter";
import { useGetAllCountyAdminByCountyId, useGetAllCountyByProvinceId, useGetAllprovinces } from "../../../../../../../core/services/api";


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
    CountyId : null
  });
  const getMutation = useGetAllCountyAdminByCountyId()

  const { data, isSuccess, isFetching } = useGetAllprovinces();
  const getAllCountyMutation = useGetAllCountyByProvinceId();

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
          newOptions.push({
            value: row.id,
            label: row.title 
          });
        });
        newProvinces[0].options = newOptions;
        setOwnedProvince(newProvinces);

        getAllCountyMutation.mutate(newProvinces[0].options[0].value, {
          onSuccess: (val: any) => {
            console.log("valll-0------", val);

            let queryData: any = val;
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
                label: row.title 
              });
            });
            newCounties[0].options = newOptions;
            setOwnedCounties(newCounties);

            getMutation.mutate({
              page: 1,
              pageSize: pageSize,
              countyId: newCounties[0].options[0].value,
            });
            setFilterState((prev: any) => {
              return { ...prev, countyId: newCounties[0].options[0] , provinceId : newProvinces[0].options[0]  };
            });
          },
        });
      }
  }, [ isSuccess , pageSize ])



  useEffect(() => {
    if (getMutation.data && getMutation.data.data.result) {
      let newState: any = [];
      getMutation.data.data.result.items.forEach((row: any) => {
        newState.push({
          id: row.id,
          name: `${row.name} ${row.lastName}`,
          email: row.email,
          userNationalCode: row.nationalCode ? row.nationalCode : "نامشخص",
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
          const obj: any = {
            nationalCode: value.userNationalCode,
            name: value.name,
            page: 1,
            pageSize: pageSize,
            countyId : value.countyId.value
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
                  <ListFilter getAllCountyMutation={getAllCountyMutation} setOwnedCounties={setOwnedCounties} setFieldValue={setFieldValue} ownedCountyLoading={getAllCountyMutation.isLoading} ownedProvinceLoading={isFetching} getMutation={getMutation} ownedProvince={ownedProvince} ownedCounties={ownedCounties}/>
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
