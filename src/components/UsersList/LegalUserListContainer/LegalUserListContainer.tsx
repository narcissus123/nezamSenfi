import React, { useEffect, useState } from "react";
import { Formik, Form } from "formik";
import { Card, CardBody, Col, Button, Row } from "reactstrap";

import { ILegalUsersListFilter } from "../../../core/models/legal-user-list-filter.model";
import { LegalUserListFilter } from "./LegalUserListFilter/LegalUserListFilter";
import { useGetLegalUsersList } from "../../../core/services/api/legall-user-list.model";
import { columns } from "./LegalUserColumns";

import {
  useGetAllCitiesByCountyId,
  useGetAllCountyByProvinceId,
  useGetAllprovinceByMainLocationId,
  useGetAllVillagesByCountyId,
} from "../../../core/services/api/location.api";
import BasicSelectOption from "../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { ListTable } from "../../common/ListTable/ListTable";

const LegalUserListContainer: React.FC = () => {
  const [province, setProvince] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);
  const [township, setTownship] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);
  const [city, setCity] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);
  const [village, setVillage] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const [initialPage, setInitialPage] = useState(0);
  const getAllprovince = useGetAllprovinceByMainLocationId();
  const getAllcounty = useGetAllCountyByProvinceId();
  const getAllcity = useGetAllCitiesByCountyId();
  const getAllvillage = useGetAllVillagesByCountyId();

  const legalUserListMutation: any = useGetLegalUsersList();

  const [pageSize, setPageSize] = useState<any>(10);

  const [filterState] = useState<ILegalUsersListFilter>({
    nationalId: "",
    email: "",
    companyType: 0,
    locationId: 0,
    name: "",
    page: 1,
    pageSize: 10,
    username: "",
    economicCode: "",
  });
  const [state, setState] = useState([]);
  const [pageCountList, setPageCount] = useState(0);

  useEffect(() => {
    legalUserListMutation.mutate({
      ...filterState,
      page: 1,
      pageSize: pageSize,
    });
  }, [pageSize]);

  useEffect(() => {
    getAllprovince.mutate(1);
  }, []);

  useEffect(() => {
    if (getAllprovince.data && getAllprovince.data.data) {
      const result = getAllprovince.data.data.result;

      let pro: any = [
        {
          label: "انتخاب کنید...",
          options: [{ value: 0, label: "هیچ کدام" }],
        },
      ];
      result.forEach((county: any) => {
        pro[0].options.push({ value: county.id, label: county.title });
      });
      setProvince(pro);
    }
  }, [getAllprovince.isSuccess]);

  useEffect(() => {
    if (getAllcity.data && getAllcity.data.data) {
      const result = getAllcity.data.data.result;

      let pro: any = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      result.forEach((county: any) => {
        pro[0].options.push({ value: county.id, label: county.title });
      });
      setCity(pro);
    }
  }, [getAllcity.isSuccess]);

  useEffect(() => {
    if (getAllcounty.data && getAllcounty.data.data) {
      const result = getAllcounty.data.data.result;

      let pro: any = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      result.forEach((county: any) => {
        pro[0].options.push({ value: county.id, label: county.title });
      });
      setTownship(pro);
    }
  }, [getAllcounty.isSuccess]);

  useEffect(() => {
    if (getAllvillage.data && getAllvillage.data.data) {
      const result = getAllvillage.data.data.result;

      let pro: any = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      result.forEach((county: any) => {
        pro[0].options.push({ value: county.id, label: county.title });
      });
      setVillage(pro);
    }
  }, [getAllvillage.isSuccess]);

  useEffect(() => {
    if (legalUserListMutation.data) {
      setState(legalUserListMutation.data.users);
      setPageCount(
        Math.ceil(legalUserListMutation.data.totalCount / filterState.pageSize)
      );
    }
  }, [legalUserListMutation.isSuccess]);

  const resetFilter = (setFieldValue: any, reset: any) => {
    reset();

    setFieldValue("locationId", 0);
    setFieldValue("township", null);
    setFieldValue("city", null);
    setFieldValue("village", null);
    setFieldValue("province", null);
  };

  const provinceOnChange = (opt: any, e: any, setFieldValue: any) => {
    if (opt.value !== 0) {
      getAllcounty.mutate(opt.value);
    }
    setFieldValue("locationId", opt.value);
    setFieldValue("province", {
      value: opt.value,
      label: opt.label,
    });
    setFieldValue("township", null);
    setFieldValue("city", null);
    setFieldValue("village", null);
    setTownship([]);
    setCity([]);
    setVillage([]);
  };

  const townshipOnChange = (opt: any, e: any, setFieldValue: any) => {
    getAllcity.mutate(opt.value);
    getAllvillage.mutate(opt.value);
    setFieldValue("locationId", opt.value);
    setFieldValue("township", {
      value: opt.value,
      label: opt.label,
    });
    setFieldValue("city", null);
    setFieldValue("village", null);
    setCity([]);
    setVillage([]);
  };

  const cityOnChange = (opt: any, e: any, setFieldValue: any) => {
    setFieldValue("locationId", opt.value);
    setFieldValue("city", {
      value: opt.value,
      label: opt.label,
    });
    setFieldValue("village", null);
  };

  const villageOnChange = (opt: any, e: any, setFieldValue: any) => {
    setFieldValue("locationId", opt.value);
    setFieldValue("village", {
      value: opt.value,
      label: opt.label,
    });
    setFieldValue("city", null);
  };

  const onSubmit = (value: any) => {
    const submitData: ILegalUsersListFilter = {
      nationalId: value.nationalId,
      email: value.email,
      companyType: value.companyType.value ? value.companyType.value : 0,
      locationId: value.locationId,
      name: value.name,
      page: 1,
      pageSize: pageSize,
      username: value.username,
      economicCode: value.economicCode,
    };
    legalUserListMutation.mutate(submitData);
    setInitialPage(0);
  };

  return (
    <Formik
      initialValues={filterState}
      onSubmit={(value) => {
        onSubmit(value);
      }}
      enableReinitialize={true}
    >
      {({ values, resetForm, setFieldValue }) => (
        <Form>
          <Card>
            <CardBody>
              <LegalUserListFilter />

              <Row className="my-2">
                <Col lg="3">
                  <BasicSelectOption
                    lableText="استان محل سکونت"
                    significant={false}
                    name="province"
                    placeHolder="انتخاب کنید..."
                    data={province}
                    isLoading={getAllprovince.isLoading}
                    onChange={(opt: any, e: any) =>
                      provinceOnChange(opt, e, setFieldValue)
                    }
                  />
                </Col>
                <Col lg="3">
                  <BasicSelectOption
                    lableText="شهرستان محل سکونت"
                    significant={false}
                    name="township"
                    placeHolder="انتخاب کنید..."
                    data={township}
                    isLoading={getAllcounty.isLoading}
                    onChange={(opt: any, e: any) =>
                      townshipOnChange(opt, e, setFieldValue)
                    }
                  />
                </Col>
                <Col lg="3">
                  <BasicSelectOption
                    lableText="شهر محل سکونت"
                    significant={false}
                    name="city"
                    placeHolder="انتخاب کنید..."
                    data={city}
                    isLoading={getAllcity.isLoading}
                    onChange={(opt: any, e: any) =>
                      cityOnChange(opt, e, setFieldValue)
                    }
                  />
                </Col>
                <Col lg="3">
                  <BasicSelectOption
                    lableText="روستاي محل سکونت"
                    significant={false}
                    placeHolder="انتخاب کنید..."
                    name="village"
                    data={village}
                    isLoading={getAllvillage.isLoading}
                    onChange={(opt: any, e: any) =>
                      villageOnChange(opt, e, setFieldValue)
                    }
                  />
                </Col>
              </Row>

              <Button color="primary" className="m-0" type="submit">
                جستوجو
              </Button>
              <Button
                color="primary"
                outline
                className="m-0 mx-1"
                type="button"
                onClick={() => resetFilter(setFieldValue, resetForm)}
              >
                پاک کردن
              </Button>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <ListTable
                customPageSize={pageSize}
                setPageSize={(val: any) => setPageSize(val)}
                isLoading={legalUserListMutation.isLoading}
                columns={columns}
                pageCountList={pageCountList}
                tableData={state}
                initialPage={initialPage}
                setInitialPage={setInitialPage}
                onPageChange={({ page, pageSize }: any) =>
                  legalUserListMutation.mutate({
                    ...values,
                    page: page,
                    pageSize: pageSize,
                  })
                }
              ></ListTable>
            </CardBody>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

export { LegalUserListContainer };
