import React, { FC, useEffect, useState } from "react";
import {Card, CardBody, CardHeader, CardTitle} from "reactstrap";

import { useHistory, useParams } from "react-router-dom";

import { columns } from "./UserColumns";
import { Form, Formik } from "formik";
import { ListTable } from "../../../../common/ListTable/ListTable";
import { ListFilter } from "./ListFilter/ListFilter";
import { useGetAllCountyByProvinceId, useGetAllprovinces, useGetOwnedUserProvinceGuildRoomsForAdmin } from "../../../../../core/services/api";


interface IPropTypes {
  // toggleAdd: (val: boolean) => void;
  isAdmin ?  : boolean
  getUserMutation : any
  isAdminMainLocation? : any
  isProvinceAdmin ? : boolean
  mainLocationAdminUser? : boolean
  removeAdminMutation? : any
  isAdminProvince ? : any
  isAdminCounty ? : boolean
}

const List: FC<IPropTypes> = ({ removeAdminMutation , isAdminCounty , isAdminProvince ,  isAdmin, getUserMutation , isAdminMainLocation , isProvinceAdmin , mainLocationAdminUser }) => {
  const { id } = useParams<{ id: string }>();

  const [tableData, setTableData] = useState([]);


  const { data, isSuccess, isFetching } = useGetAllprovinces();
  const getAllCountyMutation = useGetAllCountyByProvinceId();
  const { data : ownedProvinceData, isSuccess: ownedProvinceIsSuccess, isFetching : ownedProvinceIsFetching } = useGetOwnedUserProvinceGuildRoomsForAdmin();
    
  const [ownedProvince, setOwnedProvince] = useState<any>([]);
  const [ownedCounties, setOwnedCounties] = useState<any>([]);

  const [pageCountList, setPageCount] = useState<any>(0);
  const [pageSize, setPageSize] = useState<any>(10);
  const [filterState, setFilterState] = useState<any>({
    userNationalCode: "",
    name: "",
    page: 1,
    pageSize: pageSize,
    provinceId: 0,
    countyId: 0,
    unionId: 0,
  });
  const getMutation = getUserMutation()

  useEffect(()=>{
    if(mainLocationAdminUser && isProvinceAdmin){
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

        getMutation.mutate({
          page: 1,
          pageSize: pageSize,
          provinceId: newProvinces[0].options[0].value,
        });
        setFilterState((prev: any) => {
          return { ...prev, provinceId: newProvinces[0].options[0] };
        });
      }
      
    }
    
  }, [ isSuccess , pageSize ])

  
  useEffect(()=>{
    if(mainLocationAdminUser && isAdminCounty){
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

        getAllCountyMutation.mutate(newProvinces[0].options[0].value, {
          onSuccess: (val: any) => {
            console.log("valll-0------", val);

            let queryData: any = data;
            let newOptions: any = [];
            let newCounties: any = [
              {
                label: "سرلیست شهرستان",
                options: [],
              },
            ];

            queryData.data.result.forEach((row: any) => {
              newOptions.push({ value: row.id, label: row.title });
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
    }
    
  }, [ isSuccess , pageSize ])

  useEffect(() => {
    if( getMutation.data && getMutation.data.data.result ){
      let newState : any = []
      getMutation.data.data.result.items.forEach((row:any)=>{
        newState.push({
          id: row.id,
          name: `${row.name} ${row.lastName}`,
          email: row.email,
          userNationalCode: row.nationalCode ? row.nationalCode : "نامشخص",
          provinceId: filterState.provinceId,
        });
      })
      setTableData(newState)
      setPageCount(Math.ceil(getMutation.data.data.result.totalCount / pageSize))
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
            countyId: value.countyId.value,
            provinceId: value.provinceId.value,
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
                    ownedProvince={ownedProvince}
                    ownedProvinceLoading={isFetching || ownedProvinceIsFetching}
                    isProvinceAdmin={isProvinceAdmin}
                    isAdminCounty = {isAdminCounty}
                    getMutation={getMutation}
                    ownedCounty={ownedCounties}
                    ownedCountyLoading={getAllCountyMutation.isLoading}
                    setOwnedCounties={setOwnedCounties}
                    getAllCountyMutation={getAllCountyMutation}
                    setFieldValue={setFieldValue}
                  />
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle> لیست ادمین ها</CardTitle>
                </CardHeader>
                <CardBody>
                  <ListTable
                    columns={columns}
                    isLoading={getMutation.isLoading}
                    onPageChange={({ page, pageSize }) => {
                      getMutation.mutate({
                        page: page,
                        pageSize: pageSize,
                        countyId: 0,
                        provinceId: 0,
                        userRole: 0,
                      });
                    }}
                    tableData={tableData}
                    pageCountList={pageCountList}
                    customPageSize={pageSize}
                    setPageSize={(val: any) => setPageSize(val)}
                    getCustomProps={{
                      isAdminMainLocation: isAdminMainLocation,
                      removeAdminMutation : removeAdminMutation,
                      isAdminProvince : isAdminProvince,
                      isAdminCounty : isAdminCounty
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
              </Card>{" "}
            </Form>
          </>
        )}
      </Formik>
    </>
  );
};

export { List };
