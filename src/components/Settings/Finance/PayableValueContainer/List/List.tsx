import React, { FC, useContext, useEffect, useState } from "react";
import {Card, CardBody, CardHeader, CardTitle, Col, Row} from "reactstrap";

import { useParams } from "react-router-dom";

import { columns } from "./UserColumns";
import { Form, Formik } from "formik";
import { refetchContext } from "../../../../../core/utils/context/EventContext";
import { ListTable } from "../../../../common/ListTable/ListTable";
import { useGetAllPayableTypeMaximum } from "../../../../../core/services/api";
import BasicSelectOption from "../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { SubmitButton } from "../../../../common/Form";
import { OptionRowSel } from "../../../../../core/models";
import { useGetAllTarrif } from "../../../../../core/services/api/tarrif.api";



interface IPropTypes {
  tableData: any;
  setTableData: any;
  setInitialValue: any;
  setIsInEditMode: any;
  setEditRowID: any;
  payableTypesData: any;
  isLoading: boolean;
  setCounter: any;
  activeTariff: any;
  activeTariffSuccess: boolean;
}

const List: FC<IPropTypes> = ({activeTariff, tableData, setCounter, setTableData, payableTypesData, isLoading, activeTariffSuccess  }) => {
  const { id } = useParams<{ id: string }>();

  const [pageSize, setPageSize] = useState<any>(10);
  const [tariffsData, setTariffsData] = useState<OptionRowSel[]>([]);
  const [pageCountList, setPageCount] = useState<any>(0);
  const [filterState, setFilterState] = useState<any>({
    page: 1,
    pageSize: pageSize,
    payableValueTypeEnumSearch: null,
    tariffId: 0,
  });
  const getMutation = useGetAllPayableTypeMaximum();

  const getAllTariffMutation = useGetAllTarrif();

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
            payableValueTypeTitle: row.payableValueTypeTitle,
            value: row.value,
            tariffLetterNumber: row.tariffLetterNumber,
          });
        });

        if(isInitialization){
          setFilterState((old: any) => ({
            ...old,
            payableValueTypeEnumSearch: values.payableValueTypeEnumSearch
              ? values.payableValueTypeEnumSearch
              : null,
            page: isFromSearch ? 1 : old.page,
          }));
        }else{
          setFilterState((old: any) => ({
            ...old,
            payableValueTypeEnumSearch: values.payableValueTypeEnumSearch
              ? values.payableValueTypeEnumSearch
              : null,
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
          payableValueType: filterState.payableValueTypeEnumSearch
            ? filterState.payableValueTypeEnumSearch.value
            : null,
          tariffId: filterState.tariffId
            ? filterState.tariffId.value
            : activeTariff.id,
          pageSize: pageSize,
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
  }, [pageSize, refetchEvent.payableValueList, activeTariffSuccess]);

  const Search = (values: any) => {
    let obj = {
      page: 1,
      pageSize: pageSize,
      payableValueType: values.payableValueTypeEnumSearch
        ? values.payableValueTypeEnumSearch.value
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
    });
  };

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
                        name="payableValueTypeEnumSearch"
                        placeHolder="انتخاب کنید ..."
                        data={payableTypesData}
                        lableText="نوع پرداختی"
                        isClearable
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
                          ...filterState,
                          payableValueType: values.payableValueTypeEnumSearch
                            ? values.payableValueTypeEnumSearch.value
                            : null,
                          tariffId: values.tariffId
                            ? values.tariffId.value
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
                        payableValueTypeEnumSearch:
                          values.payableValueTypeEnumSearch,
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
