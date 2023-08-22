import { Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { fullOption } from "../../../../../core/utils";
import { SubmitButton, TextInput } from "../../../../common/Form";
import BasicSelectOption from "../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { ListTable } from "../../../../common/ListTable/ListTable";

interface IPropTypes {
  getProvinceList?: any;
  getCountyList?: any;
  columns: any;
  useOwnedProvinceAdmin?: any;
  useOwnedCountyAdmin?: any;
  flow?: string;
  isUnion?: boolean;
}

const GuildsRequestList: FC<IPropTypes> = ({
  getCountyList,
  getProvinceList,
  columns,
  useOwnedCountyAdmin = () => {},
  useOwnedProvinceAdmin = () => {},
  flow,
  isUnion,
}) => {
  const getOwnedProvince = useOwnedProvinceAdmin();
  const getOwnedCounty = useOwnedCountyAdmin();
  const [province, setProvince] = useState<any>([]);
  const [initialValue, setInitialValue] = useState({
    province: null,
    county: null,
    name: "",
    nationalId: "",
  });
  const [county, setCounty] = useState<any>([]);
  const [tableData, setTableData] = useState<any>([]);
  const [initialPage, setInitialPage] = useState<number>(0);
  const [pageSize, setPageSize] = useState<number>(10);
  const [pageCount, setPageCount] = useState<number>(0);
  const [searchObj, setSearchObj] = useState<any>({
    page: 1,
    name: "",
    nationalId: "",
    countyId: 0,
    provinceId: 0,
  });

  useEffect(() => {
    if (getProvinceList && getOwnedProvince.isSuccess) {
      try {
        const result = getOwnedProvince.data.data.result;
        const newProvince: any = [{ label: "انتخاب کنید", options: [] }];
        result.forEach((item: any) => {
          newProvince[0].options.push({
            value: item.id,
            label: item.proviceTitle ? item.proviceTitle : item.title,
          });
        });
        setProvince(newProvince);

        getProvinceList.mutate({
          ...searchObj,
          pageSize: pageSize,
          provinceId: newProvince[0].options[0].value,
        });

        setInitialValue({
          ...initialValue,
          province: newProvince[0].options[0],
        });

        setSearchObj({
          ...searchObj,
          pageSize: pageSize,
          provinceId: newProvince[0].options[0].value,
        });
      } catch (error) {}
    }
  }, [getProvinceList && getOwnedProvince.isSuccess]);

  useEffect(() => {
    if (getCountyList && getOwnedCounty.isSuccess) {
      try {
        const result = getOwnedCounty.data.data.result;
        const newCounty: any = [{ label: "انتخاب کنید", options: [] }];
        result.forEach((item: any) => {
          newCounty[0].options.push({
            value: item.id,
            label: item.countyTitle ? item.countyTitle : item.title,
          });
        });
        setCounty(newCounty);

        getCountyList.mutate({
          ...searchObj,
          pageSize: pageSize,
          countyId: newCounty[0].options[0].value,
        });
        setInitialValue({
          ...initialValue,
          county: newCounty[0].options[0],
        });

        setSearchObj({
          ...searchObj,
          pageSize: pageSize,
          countyId: newCounty[0].options[0].value,
        });
      } catch (error) {}
    }
  }, [getCountyList && getOwnedCounty.isSuccess]);

  useEffect(() => {
    if (getCountyList && getCountyList.isSuccess) {
      try {
        const result = getCountyList.data.data.result;

        setPageCount(
          Math.ceil(getCountyList.data.data.result.totalCount / pageSize)
        );
        setTableData(result.items);
      } catch (error) {}
    }
  }, [getCountyList && getCountyList.isSuccess]);

  useEffect(() => {
    if (getProvinceList && getProvinceList.isSuccess) {
      try {
        const result = getProvinceList.data.data.result;

        setPageCount(
          Math.ceil(getProvinceList.data.data.result.totalCount / pageSize)
        );
        setTableData(result.items);
      } catch (error) {}
    }
  }, [getProvinceList && getProvinceList.isSuccess]);

  const onSearch = (values: any) => {
    const newSearchObj = {
      ...searchObj,
      page: 1,
      pageSize: pageSize,
      provinceId: values.province ? values.province.value : 0,
      countyId: values.county ? values.county.value : 0,
      name: values.name,
      nationalId: values.nationalId,
    };

    setSearchObj(newSearchObj);

    if (getProvinceList) getProvinceList.mutate(newSearchObj);
    else getCountyList.mutate(newSearchObj);

    setInitialPage(0);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>
            جستجو{" "}
            {getProvinceList ? "استانی" : isUnion ? "اتحادیه" : "شهرستانی"}
          </CardTitle>
        </CardHeader>

        <CardBody>
          <Formik
            initialValues={initialValue}
            onSubmit={onSearch}
            enableReinitialize
          >
            {({ values, resetForm }) => (
              <Form>
                <Row>
                  <Col sm="4">
                    {getProvinceList ? (
                      <BasicSelectOption
                        data={province}
                        isLoading={getOwnedProvince.isLoading}
                        name="province"
                        lableText="استان"
                        placeHolder="استان مورد نظر را وارد کنید"
                      />
                    ) : (
                      <BasicSelectOption
                        data={county}
                        name="county"
                        isLoading={getOwnedCounty.isLoading}
                        lableText="شهرستان"
                        placeHolder="شهرستان مورد نظر را وارد کنید"
                      />
                    )}
                  </Col>

                  <Col sm="4">
                    <TextInput
                      name="name"
                      placeholder="نام صنف را وارد کنید"
                      lableText="نام صنف"
                    />
                  </Col>

                  <Col sm="4">
                    <TextInput
                      name="nationalId"
                      placeholder="شناسه ملی را وارد کنید"
                      lableText="شناسه ملی"
                    />
                  </Col>
                </Row>

                <SubmitButton
                  isLoading={
                    (getProvinceList && getProvinceList.isLoading) ||
                    (getCountyList && getCountyList.isLoading)
                  }
                  btnText="جستجو"
                  clearable
                  clearableTxt="پاک کردن"
                  onClear={() => {
                    setSearchObj({
                      ...searchObj,
                      page: 1,
                      pageSize: pageSize,
                      name: "",
                      nationalId: "",
                    });
                    resetForm();

                    setInitialValue((old: any) => ({
                      ...old,
                      county: fullOption(searchObj.countyId, county)
                        ? fullOption(searchObj.countyId, county)
                        : null,
                      province: fullOption(searchObj.provinceId, province)
                        ? fullOption(searchObj.provinceId, province)
                        : null,
                    }));
                    if (getProvinceList)
                      getProvinceList.mutate({
                        ...searchObj,
                        page: 1,
                        pageSize: pageSize,
                        name: "",
                        nationalId: "",
                      });
                    else
                      getCountyList.mutate({
                        ...searchObj,
                        page: 1,
                        pageSize: pageSize,
                        name: "",
                        nationalId: "",
                      });
                  }}
                />
              </Form>
            )}
          </Formik>
        </CardBody>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>
            لیست درخواست{" "}
            {getProvinceList ? "استانی" : isUnion ? "اتحادیه" : "شهرستانی"}
          </CardTitle>
        </CardHeader>

        <CardBody>
          <ListTable
            columns={columns}
            isLoading={
              (getProvinceList && getProvinceList.isLoading) ||
              (getCountyList && getCountyList.isLoading) ||
              (getOwnedProvince && getOwnedProvince.isLoading) ||
              (getOwnedCounty && getOwnedCounty.isLoading)
            }
            onPageChange={({ page, pageSize }) => {
              if (getProvinceList)
                getProvinceList.mutate({
                  ...searchObj,
                  page: page,
                  pageSize: pageSize,
                });
              else
                getCountyList.mutate({
                  ...searchObj,
                  page: page,
                  pageSize: pageSize,
                });
              setSearchObj({
                ...searchObj,
                page: page,
                pageSize: pageSize,
              });
            }}
            pageCountList={pageCount}
            tableData={tableData}
            setPageSize={setPageSize}
            customPageSize={10}
            initialPage={initialPage}
            getCustomProps={{ flow: flow }}
          >
            {{ headerTable: <p></p> }}
          </ListTable>
        </CardBody>
      </Card>
    </>
  );
};

export { GuildsRequestList };
