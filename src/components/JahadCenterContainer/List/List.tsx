import React, { FC, useContext, useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";

import { useHistory, useParams } from "react-router-dom";

import { columns } from "./UserColumns";
import { Form, Formik } from "formik";

import { useGetAllCountyJahadCenterByFilter } from "../../../core/services/api/jahad-center.api";
import { ListTable } from "../../common/ListTable/ListTable";
import { ListFilter } from "./ListFilter/ListFilter";
import { refetchContext } from "../../../core/utils/context/EventContext";
import { useGetOwnedUserCountyGuildRoomsForAdmin } from "../../../core/services/api";
import { stringShorter } from "../../../core/utils";

interface IPropTypes {}

const List: FC<IPropTypes> = ({}) => {
  const { id } = useParams<{ id: string }>();

  const [tableData, setTableData] = useState([]);
  const [countyData, setCountyData] = useState<any>([]);

  const [pageCountList, setPageCount] = useState<any>(0);
  const [pageSize, setPageSize] = useState<any>(10);
  const [filterState, setFilterState] = useState<any>({
    page: 1,
    pageSize: pageSize,
    county: null,
    village: null,
    city: null,
  });
  const getMutation = useGetAllCountyJahadCenterByFilter();

  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

  const { data, isFetching, isSuccess } =
    useGetOwnedUserCountyGuildRoomsForAdmin();

  const history = useHistory();

  const fillForm = (val: any) => {
    let newState: any = [];
    console.log("---vall--", val);

    try {
      val.data.result.items.forEach((row: any) => {
        let cityOrVilagesTitle = "";
        row.cityIds.forEach((row: any) => {
          cityOrVilagesTitle += row.title + ",";
        });
        row.vilageIds.forEach((row: any) => {
          cityOrVilagesTitle += row.title + ",";
        });

        cityOrVilagesTitle = stringShorter(cityOrVilagesTitle, 150);

        newState.push({
          id: row.id,
          title: row.title,
          code: row.code,
          description: row.description,
          cityOrVilages: row.cityOrVilages,
          cityOrVilagesTitle: cityOrVilagesTitle,
        });
      });
    } catch (error) {}
    setTableData(newState);
    setPageCount(Math.ceil(val.data.result.totalCount / pageSize));
  };

  useEffect(() => {
    if (data) {
      try {
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
        setCountyData(newCounties);

        try {
          getMutation.mutate(
            {
              page: 1,
              pageSize: pageSize,
              countyId: newCounties[0].options[0].value,
            },
            {
              onSuccess: (val) => {
                fillForm(val);
              },
            }
          );
        } catch (error) {}
        setFilterState((prev: any) => {
          return { ...prev, county: newCounties[0].options[0] };
        });
      } catch (error) {}
    }
  }, [isSuccess, pageSize, refetchEvent.jahadCenterList]);

  return (
    <>
      <Formik
        initialValues={filterState}
        onSubmit={(value) => {
          const obj: any = {
            page: 1,
            pageSize: pageSize,
            countyId: value.county.value,
            cityOrVilageId: value.city
              ? value.city.value
              : value.village
              ? value.village.value
              : 0,
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
                    countyData={countyData}
                    isCountyFetching={isFetching}
                    getMutation={getMutation}
                    setFieldValue={setFieldValue}
                  />
                </CardBody>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle> لیست جهاد ها </CardTitle>
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
