import React, { FC, useState } from "react";
import { Card } from "reactstrap";
import { UnionList } from "./UnionList/UnionList";

const Members: FC = () => {
  const [fetchRefresh, setFetchRefresh] = useState<boolean>(false);
  // const { id } = useParams<{ id: string }>();

  // const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

  // const [tableData, setTableData] = useState([]);

  // const [pageCountList, setPageCount] = useState<any>(0);
  // const [pageSize, setPageSize] = useState<any>(10);

  // const [unionList, setUnionList] = useState<any>([
  //   {
  //     label: "لیست اتحادیه ها",
  //     options: [],
  //   },
  // ]);

  // const [filterState, setFilterState] = useState<any>({
  //   userNationalCode: "",
  //   name: "",
  //   page: 1,
  //   pageSize: pageSize,
  //   userRole: null,
  //   countyUnionId: null,
  // });

  // //const [state,setState] = useState([])

  // const getUserUnionMutation = useGetUserUnionByUnionId();
  // const { isLoading, isSuccess, data, isFetching } = useOwnedUserUnion();

  // useEffect(() => {
  //   if (data) {
  //     let queryData: any = data;
  //     let newOptions: any = [];
  //     let newUnions = [
  //       {
  //         label: "لیست اتحادیه ها",
  //         options: [],
  //       },
  //     ];

  //     queryData.data.result.unions.forEach((row: any) => {
  //       newOptions.push({ value: row.id, label: row.unionTitle });
  //     });
  //     try {
  //       newUnions[0].options = newOptions;
  //       setFilterState({
  //         ...filterState,
  //         countyUnionId: {
  //           value: data.data.result.unions[0].id,
  //           label: data.data.result.unions[0].unionTitle,
  //         },
  //       });
  //       setUnionList(newUnions);
  //     } catch (error) {}
  //   }
  // }, [isSuccess, data]);

  // useEffect(() => {
  //   if (data && data.data.result) {
  //     if (data.data.result.unions[0]) {
  //       getUserUnionMutation.mutate({
  //         page: 1,
  //         pageSize: pageSize,
  //         countyUnionId: parseInt(data.data.result.unions[0].id),
  //         userRole: 0,
  //       });
  //     }
  //   }
  // }, [data, pageSize]);

  // useEffect(() => {
  //   if (getUserUnionMutation.data && getUserUnionMutation.data.data.result) {
  //     let newState: any = [];
  //     getUserUnionMutation.data.data.result.userUnions.forEach((row: any) => {
  //       let newRoles = "";
  //       row.roles.forEach((role: any) => {
  //         newRoles += `${role},`;
  //       });
  //       newState.push({
  //         id: row.userId,
  //         name: `${row.userFirstName} ${row.userLastName}`,
  //         userNationalCode: row.userNationalCode
  //           ? row.userNationalCode
  //           : "نامشخص",
  //         role: newRoles,
  //       });
  //     });
  //     setTableData(newState);
  //     setPageCount(
  //       Math.ceil(getUserUnionMutation.data.data.result.totalCount / pageSize)
  //     );
  //   }
  // }, [getUserUnionMutation.isSuccess]);

  // const defaultColumn = React.useMemo(
  //   () => ({
  //     maxWidth: 400,
  //   }),
  //   []
  // );

  // const history = useHistory();

  return (
    <Card>
      <UnionList
        setFetchRefresh={() => {
          setFetchRefresh((val: any) => !val);
        }}
        fetchRefresh={fetchRefresh}
      />
      {/* <Formik
        initialValues={filterState}
        onSubmit={(value) => {
          const obj: any = {
            userNationalCode: value.userNationalCode,
            name: value.name,
            page: 1,
            pageSize: pageSize,
            userRole: value.userRole ? value.userRole.value : 0,
            countyUnionId: value.countyUnionId.value,
          };
          getUserUnionMutation.mutate(obj);
        }}
        enableReinitialize
      >
        {({ values, errors, handleChange, resetForm, setFieldValue }) => {
          return (
            <>
              <Form>
                <Row className="d-flex align-items-start clearfix">
                  <ListFilter getUserUnionMutation={getUserUnionMutation} />
                </Row>
                <Row>
                  <ListTable
                    columns={columns}
                    isLoading={getUserUnionMutation.isLoading || isFetching}
                    onPageChange={({ page, pageSize }) => {
                      getUserUnionMutation.mutate({
                        page: page,
                        pageSize: pageSize,
                        countyUnionId: values.countyUnionId.value,
                        userRole: 0,
                      });
                    }}
                    tableData={tableData}
                    pageCountList={pageCountList}
                    customPageSize={pageSize}
                    setPageSize={(val) => setPageSize(val)}
                  >
                    {{
                      headerTable: (
                        <div style={{ width: "200px" }}>
                          <BasicSelectOption
                            name="countyUnionId"
                            lableText="اتحادیه"
                            placeHolder="انتخاب کنید..."
                            data={unionList}
                            isClearable={false}
                            isLoading={isFetching}
                            onChange={(opt, e) => {
                              setFieldValue("countyUnionId", {
                                value: opt.value,
                                label: opt.label,
                              });
                              const obj: any = {
                                userNationalCode: values.userNationalCode,
                                name: values.name,
                                page: 1,
                                pageSize: pageSize,
                                userRole: values.userRole
                                  ? values.userRole.value
                                  : 0,
                                countyUnionId: opt.value,
                              };
                              getUserUnionMutation.mutate(obj);
                            }}
                          />
                        </div>
                      ),
                    }}
                  </ListTable>
                </Row>
              </Form>
            </>
          );
        }}
      </Formik> */}
    </Card>
  );
};

export { Members };
