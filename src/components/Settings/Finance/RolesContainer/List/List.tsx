import React, { FC, useContext, useEffect, useState } from "react";
import {Card, CardBody, CardHeader, CardTitle, Col, Row} from "reactstrap";

import { useParams } from "react-router-dom";

import { columns } from "./UserColumns";
import { Form, Formik } from "formik";
import { refetchContext } from "../../../../../core/utils/context/EventContext";
import { ListTable } from "../../../../common/ListTable/ListTable";
import { useGetAllPayableValues, } from "../../../../../core/services/api";
import BasicSelectOption from "../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { SubmitButton } from "../../../../common/Form";
import { useGetAllTarrif } from "../../../../../core/services/api/tarrif.api";
import { OptionRowSel } from "../../../../../core/models";


interface IPropTypes {
  tableData: any;
  setTableData: any;
  setInitialValue: any;
  setIsInEditMode: any;
  setEditRowID: any;
  payableTypesData: any;
  rolesData: any;
  isLoading: boolean;
  setCounter: any;
  activeTariff: any;
  activeTariffSuccess: boolean
}

const List: FC<IPropTypes> = ({activeTariff, tableData, setTableData, setCounter, setInitialValue , payableTypesData, rolesData, isLoading, activeTariffSuccess  }) => {
  const { id } = useParams<{ id: string }>();
  const [pageCountList, setPageCount] = useState<any>(0);
  const [tariffsData, setTariffsData] = useState<OptionRowSel[]>([]);

  const [pageSize, setPageSize] = useState<any>(10);
  const [filterState, setFilterState] = useState<any>({
    page: 1,
    pageSize: pageSize,
    tariffId: 0,
    payableValueTypeIdSearch: null,
    roleIdSearch: null,
  });
  const getMutation = useGetAllPayableValues();
  const getAllTariffMutation = useGetAllTarrif()

  const fillList = (
    val: any,
    values: any,
    isFromSearch: boolean,
    setFilterState: any,
    setTableData: any,
    setPageCount: any,
    pageSize: any,
    isInitialization: boolean
  ) => {
    try {
      const result = val.data.result;
      if (result && result.items) {
        let newTable: any = [];
        result.items.forEach((row: any) => {
          newTable.push({
            payableValueTypeTitle: row.title,
            payableValueTypeId: row.payableValueTypeId,
            roleTitle: row.roleTitle,
            roleId: row.roleId,
            inSharingTitle: row.inSharing ? "بله" : "خیر",
            inSharing: row.inSharing,
            tariffLetterNumber: row.tariffLetterNumber,
          });
        });
        if(isInitialization){
          setFilterState((old: any) => ({
            ...old,
            payableValueTypeIdSearch: values.payableValueTypeIdSearch
              ? values.payableValueTypeIdSearch
              : null,
            roleIdSearch: values.roleIdSearch ? values.roleIdSearch : null,
            page: isFromSearch ? 1 : old.page,
          }));
        }else{
          setFilterState((old: any) => ({
            ...old,
            payableValueTypeIdSearch: values.payableValueTypeIdSearch
              ? values.payableValueTypeIdSearch
              : null,
            roleIdSearch: values.roleIdSearch ? values.roleIdSearch : null,
            tariffId: values.tariffId,
            page: isFromSearch ? 1 : old.page,
          }));
        }
       
        setTableData(newTable);
        setPageCount(Math.ceil(result.totalCount / pageSize));
      }
    } catch (err) {}
  };

  const fillForm = (val: any, activeTariff: any) => {
    if (val.data && val.data.result) {
      if (val.data.result.items) {
        let newTariffsData: OptionRowSel[] = [];
        val.data.result.items.forEach((row: any) => {
          newTariffsData.push({ label: row.title, value: row.id });
        });
        setTariffsData(newTariffsData);
        setFilterState((oldState: any) => ({
          ...oldState,
          tariffId: activeTariff ? { value: activeTariff, label: "" } : null,
        }));
      }
    }
  };

  useEffect(() => {
    if (activeTariffSuccess) {
      getAllTariffMutation.mutate(
        {
          page: 1,
          pageSize: 10000,
        },
        {
          onSuccess: (val: any) => {
            fillForm(val, activeTariff ? activeTariff.id : null);
          },
        }
      );
    }
  }, [activeTariffSuccess]);


  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

    useEffect(() => {
      if (activeTariffSuccess) {
        getMutation.mutate(
          {
            ...filterState,
            tariffId: filterState.tariffId
              ? filterState.tariffId.value
              : null
              ? filterState.tariffId.value
              : activeTariff.id,
            pageSize: pageSize,
            userRole: filterState.roleIdSearch
              ? filterState.roleIdSearch.value
              : null,
            payableValueType: filterState.payableValueTypeIdSearch
              ? filterState.payableValueTypeIdSearch.value
              : null,
          },
          {
            onSuccess: (val: any) => {
              fillList(
                val,
                filterState,
                false,
                setFilterState,
                setTableData,
                setPageCount,
                pageSize,
                true
              );
            },
          }
        );
      }
    }, [pageSize, refetchEvent.rolesContainerList, activeTariffSuccess]);

  const Search = (values: any) => {
    let obj = {
      page: 1,
      pageSize: pageSize,
      userRole: values.roleIdSearch ? values.roleIdSearch.value : null,
      payableValueType: values.payableValueTypeIdSearch
        ? values.payableValueTypeIdSearch.value
        : null,
      tariffId: values.tariffId ? values.tariffId.value : null,
    };

    getMutation.mutate(obj, {
      onSuccess: (val: any) => {
        fillList(
          val,
          values,
          true,
          setFilterState,
          setTableData,
          setPageCount,
          pageSize,
          false
        );
      },
    })
  }
  
  return (
    <>
      <Formik
        initialValues={filterState}
        onSubmit={(value) => {}}
        enableReinitialize={true}
      >
        {({ values, errors, handleChange, resetForm, setFieldValue }) => (
          <>
            <Form>
              <Card>
                <CardHeader>
                  <CardTitle>جستجو</CardTitle>
                </CardHeader>
                <CardBody>
                  <Row>
                    <Col sm="4">
                      <BasicSelectOption
                        isLoading={isLoading}
                        name="payableValueTypeIdSearch"
                        isClearable={true}
                        placeHolder="انتخاب کنید ..."
                        data={payableTypesData}
                        lableText="نوع پرداختی"
                      />
                    </Col>
                    <Col sm="4">
                      <BasicSelectOption
                        isLoading={false}
                        name="roleIdSearch"
                        isClearable={true}
                        placeHolder="انتخاب کنید ..."
                        data={rolesData}
                        lableText="نقش"
                      />
                    </Col>
                    <Col sm="4">
                      <BasicSelectOption
                        isLoading={getAllTariffMutation.isLoading}
                        significant={true}
                        name="tariffId"
                        placeHolder="انتخاب کنید ..."
                        data={tariffsData}
                        lableText="تعرفه"
                        isClearable
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col>
                      <SubmitButton
                        btnText="جستجو"
                        isLoading={getMutation.isLoading}
                        onClick={() => Search(values)}
                        type="button"
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
                    isLoading={
                      getMutation.isLoading ||
                      getAllTariffMutation.isLoading ||
                      activeTariff.id === 0
                    }
                    onPageChange={({ page, pageSize }) => {
                      getMutation.mutate(
                        {
                          tariffId: values.tariffId
                            ? values.tariffId.value
                            : null,
                          userRole: values.roleIdSearch
                            ? values.roleIdSearch.value
                            : null,
                          payableValueType: values.payableValueTypeIdSearch
                            ? values.payableValueTypeIdSearch.value
                            : null,
                          page: page,
                          pageSize: pageSize,
                        },
                        {
                          onSuccess: (val: any) => {
                            fillList(
                              val,
                              values,
                              false,
                              setFilterState,
                              setTableData,
                              setPageCount,
                              pageSize,
                              false
                            );
                          },
                        }
                      );
                    }}
                    tableData={tableData}
                    setPageSize={(val: any) => setPageSize(val)}
                    pageCountList={pageCountList}
                    initialPage={filterState.page - 1}
                    setInitialPage={(val) =>
                      setFilterState((old: any) => ({
                        ...old,
                        roleIdSearch: values.roleIdSearch,
                        payableValueTypeIdSearch:
                          values.payableValueTypeIdSearch,
                        tariffId: values.tariffId,
                        page: val + 1,
                      }))
                    }
                    customPageSize={pageSize}
                  >
                    {{
                      headerTable: <div style={{ width: "200px" }}></div>,
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
