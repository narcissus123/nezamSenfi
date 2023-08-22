import * as React from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { columns } from "./Columns";
import { ListTable } from "../../../../../../common/ListTable/ListTable";
import { useEffect, useState } from "react";
import { useGetMyLicense } from "../../../../../../../core/services/api";
import { Form, Formik } from "formik";
import { ListFilter } from "./ListFilter/ListFilter";

const List = () => {
  const [state, setState] = useState<any>([]);
  const [pageCountList, setPageCount] = useState<any>(0);

  const [pageSize, setPageSize] = useState<any>(10);

  const [initialValue, setinitialValue] = useState<any>({
    cityOrVillageId: null,
    unionId: null,
    finalLicenseStatusEnum: null,
    provinceId: null,
    countyId: null,
    cityId: null,
    villageId: null,
    isValid: { value: 1, label: "دارای اعتبار" },
  });

  const [filterState, setFilterState] = useState<any>({
    page: 1,
    pageSize: pageSize,
    cityOrVillageId: 0,
    provinceId: 0,
    countyId: 0,
    cityId: 0,
    villageId: 0,
  });

  const getListMutation = useGetMyLicense();

  useEffect(() => {
    getListMutation.mutate({
      ...filterState,
      page: 1,
      pageSize: pageSize,
    });

    setFilterState({
      ...filterState,
      page: 1,
      pageSize: pageSize,
    });
  }, [pageSize]);

  useEffect(() => {
    if (getListMutation.data && getListMutation.data.data.result) {
      if (getListMutation.data && getListMutation.data.data.result) {
        let newArr: any = []
        getListMutation.data.data.result.items.forEach((row:any)=>{
          newArr.push({
            ...row,
            isValidTitle: row.isValid ? "دارای اعتبار" : " فاقد اعتبار",
          });
        })
        
        setState(newArr);
        setPageCount(
          Math.ceil(getListMutation.data.data.result.totalCount / pageSize)
        );
      }
    }
  }, [getListMutation.isSuccess]);

  return (
    <Formik
      initialValues={initialValue}
      onSubmit={(value) => {
        const searchObj: any = {
          page: 1,
          pageSize: pageSize,
          isValid: value.isValid
            ? value.isValid.value === 1
              ? true
              : false
            : false,
          finalLicenseStatusEnum: value.finalLicenseStatusEnum
            ? value.finalLicenseStatusEnum.value
            : 0,
          cityOrVillageId: value.cityId
            ? value.cityId.value
            : value.villageId
            ? value.villageId.value
            : 0,
        };
        getListMutation.mutate(searchObj, {
          onSuccess: () => {
            setFilterState((old: any) => ({
              ...old,
              page: 1,
              pageSize: pageSize,
              isValid: value.isValid
                ? value.isValid.value === 1
                  ? true
                  : false
                : false,
              finalLicenseStatusEnum: value.finalLicenseStatusEnum
                ? value.finalLicenseStatusEnum.value
                : 0,
              cityOrVillageId: value.cityId
                ? value.cityId.value
                : value.villageId
                ? value.villageId.value
                : 0,
            }));
          },
        });
      }}
      enableReinitialize={true}
    >
      {({ values, errors, handleChange, resetForm, setFieldValue }) => (
        <Form>
          <Card>
            <CardHeader>
              <CardTitle> جستجو </CardTitle>
            </CardHeader>
            <CardBody>
              <ListFilter
                setFieldValue={setFieldValue}
                getMutation={getListMutation}
                onResetClick={resetForm}
                // setFilterState={setFilterState}
              />
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>لیست پروانه ها</CardTitle>
            </CardHeader>
            <CardBody>
              <ListTable
                columns={columns}
                isLoading={getListMutation.isLoading}
                onPageChange={({ page, pageSize }) => {
                  getListMutation.mutate({
                    ...filterState,
                    page: page,
                    pageSize: pageSize,
                  });
                }}
                tableData={state}
                setPageSize={(val: any) => setPageSize(val)}
                pageCountList={pageCountList}
                initialPage={filterState.page - 1}
                setInitialPage={(val) =>
                  setFilterState((old: any) => ({ ...old, page: val + 1 }))
                }
                customPageSize={pageSize}
                getCustomProps={{ flow: "ApplicantLicenseCancellationFlow" }}
              >
                {{
                  headerTable: <div style={{ width: "200px" }}></div>,
                }}
              </ListTable>
            </CardBody>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

export { List };
