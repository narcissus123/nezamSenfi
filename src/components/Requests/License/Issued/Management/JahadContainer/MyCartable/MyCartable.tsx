import { Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import {
  useGetJahadCartableForLicenseRequest,
  useGetOwenUserJahadForManager,
} from "../../../../../../../core/services/api";
import { ListTable } from "../../../../../../common/ListTable/ListTable";
import { ListFilter } from "./ListFilter";
import { columns } from "./Columns";
import { FullOptionSel, OptionRowSel } from "../../../../../../../core/models";

interface IFilterState {
  page: number;
  pageSize: number;
  jahadCenterId: OptionRowSel | null;
  cityOrVillageId: OptionRowSel | null;
}

const MyCartable: FC = () => {
  const [state, setState] = useState<any>([]);
  const [pageCountList, setPageCount] = useState<any>(0);
  const [jahadCenter, setJahadCenter] = useState<FullOptionSel[]>([]);
  const [jahadLoaded, setjahadLoaded] = useState<boolean>(false);

  const [filterState, setFilterState] = useState<IFilterState | any>({
    page: 1,
    pageSize: 10,
    jahadCenterId: null,
    cityOrVillageId: null,
  });

  const getJahadCenter = useGetOwenUserJahadForManager();

  useEffect(() => {
    if (getJahadCenter.isSuccess) {
      const result = getJahadCenter.data.data.result.jahads;

      let jahadCenterList: FullOptionSel[] = [
        { label: "انتخاب کنید", options: [] },
      ];
      result.forEach((item: any) => {
        jahadCenterList[0].options.push({
          value: item.jahadCenterId,
          label: item.jahadCenterTitle,
        });
      });
      setJahadCenter(jahadCenterList);

      setFilterState((old: IFilterState) => ({
        ...old,
        jahadCenterId: jahadCenterList[0].options[0],
      }));
      setjahadLoaded(true);
    }
  }, [getJahadCenter.isSuccess]);

  const getListMutation = useGetJahadCartableForLicenseRequest();

  useEffect(() => {
    if (jahadLoaded) {
      const obj: any = {
        page: 1,
        pageSize: filterState.pageSize,
        cityOrVillageId: filterState.cityOrVillageId
          ? filterState.cityOrVillageId.value
          : 0,
        jahadCenterId: filterState.jahadCenterId
          ? filterState.jahadCenterId.value
          : 0,
      };
      getListMutation.mutate(obj);
    }
  }, [filterState.pageSize, jahadLoaded]);

  useEffect(() => {
    if (getListMutation.data && getListMutation.data.data.result) {
      if (getListMutation.data && getListMutation.data.data.result) {
        setState(getListMutation.data.data.result.items);
        setPageCount(
          Math.ceil(
            getListMutation.data.data.result.totalCount / filterState.pageSize
          )
        );
      }
    }
  }, [getListMutation.isSuccess]);

  return (
    <Formik
      initialValues={{
        ...filterState,
        cityId: null,
        villageId: null,
        countyId: null,
        provinceId: null,
      }}
      onSubmit={(value: any) => {
        const searchObj: IFilterState = {
          ...filterState,
          cityOrVillageId: value.cityId
            ? value.cityId.value
            : value.villageId
            ? value.villageId.value
            : 0,
          jahadCenterId: value.jahadCenterId ? value.jahadCenterId.value : 0,
          page: 1,
        };
        setFilterState((old: IFilterState) => ({
          ...old,
          page: 1,
          jahadCenterId: value.jahadCenterId,
        }));
        getListMutation.mutate(searchObj);
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
                jahadCenter={jahadCenter}
                onResetClick={() => {
                  resetForm();
                  setFilterState((old: IFilterState) => ({
                    ...old,
                    jahadCenterId: old.jahadCenterId,
                  }));
                }}
                isJahadLoading={getJahadCenter.isLoading}
              />
            </CardBody>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>لیست درخواست ها</CardTitle>
            </CardHeader>
            <CardBody>
              <ListTable
                columns={columns}
                isLoading={getListMutation.isLoading}
                onPageChange={({ page, pageSize }) => {
                  getListMutation.mutate({
                    ...filterState,
                    cityOrVillageId: values.cityId
                      ? values.cityId.value
                      : values.villageId
                      ? values.villageId.value
                      : 0,
                    jahadCenterId: filterState.jahadCenterId
                      ? filterState.jahadCenterId.value
                      : 0,
                    page: page,
                    pageSize: pageSize,
                  });
                  setFilterState((old: IFilterState) => ({
                    ...old,
                    page: page,
                    pageSize: pageSize,
                    jahadCenterId: values.jahadCenterId,
                  }));
                }}
                tableData={state}
                setPageSize={(val: any) =>
                  setFilterState((old: IFilterState) => ({
                    ...old,
                    pageSize: val,
                    jahadCenterId: values.jahadCenterId,
                  }))
                }
                pageCountList={pageCountList}
                initialPage={filterState.page - 1}
                setInitialPage={(val: number) =>
                  setFilterState((old: IFilterState) => ({
                    ...old,
                    page: val + 1,
                  }))
                }
                customPageSize={filterState.pageSize}
                getCustomProps={{ flow: "JahadLicenseIssuedFlow" }}
              >
                {{
                  headerTable: <p></p>,
                }}
              </ListTable>
            </CardBody>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

export { MyCartable };
