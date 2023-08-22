import { Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import {
  Alert,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Col,
  FormGroup,
  Row,
} from "reactstrap";
import { ToastTypes } from "../../../../core/enums";
import {
  useGetAllCountyGuildRoomsByProvinceIdForDropDown,
  useGetAllProvinceGuildRoomsForDropDown,
} from "../../../../core/services/api";
import {
  useDeletePositionRequestRateInCounty,
  useGetAllCountyPositionRequestRateWithFilter,
  useGetCurrentRateOfCountyGuildRoomPositionRequest,
  useSetPositionRequestRateInCounty,
} from "../../../../core/services/api/position-request-rate.api";
import {
  getCurrentJalaliDate,
  RemoveCurrencyMask,
  showToast,
} from "../../../../core/utils";
import { MergedSetTariffCountyValidation } from "../../../../core/validations/tariff.validations";
import {
  ModernDatePicker,
  MoneyMask,
  SubmitButton,
  TextInput,
} from "../../../common/Form";
import BasicSelectOption from "../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { FallBackSpinner } from "../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { HistoryList } from "../HistoryList/HistoryList";
import { SearchHistoryFilter } from "./SearchHistoryFilter";

const SetCountyTariff: FC = () => {
  const [initialValue, setInitialValue] = useState<any>({
    amount: "",
    startDate: "",
    percentage: "",
    province: null,
    county: null,
  });

  const [disableCounty, setDisableCounty] = useState(false);

  const [province, setProvince] = useState([]);
  const [refetch, setRefetch] = useState<boolean>(false);

  const [currentRate, setCurrentRate] = useState<number>(0);
  const [county, setCounty] = useState([]);
  const [getTariffObj, setGetTariffObj] = useState({
    type: 1,
    provinceId: 0,
    countyId: 0,
  });

  const getAllProvince = useGetAllProvinceGuildRoomsForDropDown();

  const getAllCountyByProvinceIdMutation =
    useGetAllCountyGuildRoomsByProvinceIdForDropDown();

  const setTariff = useSetPositionRequestRateInCounty();
  const getTariff = useGetCurrentRateOfCountyGuildRoomPositionRequest();

  useEffect(() => {
    if (getTariff.data && getTariff.data.data) {
      try {
        const result = getTariff.data.data.result;
        // console.log(result);
        setCurrentRate(result);
      } catch (error) {}
    }
  }, [getTariff.isSuccess]);

  useEffect(() => {
    if (getAllProvince.isSuccess) {
      const result = getAllProvince.data.data.result;
      console.log(result);
      const provinces: any = [
        {
          label: "انتخاب کنید...",
          options: [{ value: 0, label: "پیشفرض استان ها" }],
        },
      ];

      result.forEach((item: any) => {
        provinces[0].options.push({ value: item.id, label: item.title });
      });
      setProvince(provinces);
      setInitialValue((old: any) => ({
        ...old,
        province: { value: 0, label: "پیشفرض استان ها" },
      }));
      setDisableCounty(true);

      getTariff.mutate(getTariffObj);
    }
  }, [getAllProvince.isSuccess]);

  const onSubmit = (values: any) => {
    let percentIncreaseToRate: number = 0;
    if (values.percentage) {
      const plusAmount: number = (currentRate * +values.percentage) / 100;
      percentIncreaseToRate = currentRate + plusAmount;
    }

    const tariffObj = {
      rate:
        percentIncreaseToRate !== 0
          ? percentIncreaseToRate
          : RemoveCurrencyMask(values.amount),
      startDate: values.startDate,
      type: values.province.value === 0 ? 1 : values.county.value === 0 ? 2 : 3,
      provinceId: values.county
        ? values.county.value !== 0
          ? 0
          : values.province.value
        : 0,
      countyId: values.province.value === 0 ? 0 : values.county.value,
    };

    setTariff.mutate(tariffObj, {
      onSuccess: () => {
        showToast(["با موفقیت انجام شد"], ToastTypes.success);
        getTariff.mutate(getTariffObj);
        setRefetch(!refetch);
      },
    });
  };

  const handleOnProvinceChange = (e: any, setFieldValue: any) => {
    if (e.value !== 0) {
      setDisableCounty(false);
      getAllCountyByProvinceIdMutation.mutate(e.value, {
        onSuccess: (val) => {
          let counties: any = [
            {
              label: "انتخاب کنید...",
              options: [{ value: 0, label: "پیشفرض در استان" }],
            },
          ];
          val.data.result.forEach((row: any) => {
            counties[0].options.push({
              value: row.id,
              label: row.title,
            });
          });

          setCounty(counties);
        },
      });
      const getTariffObj2 = {
        type: 2,
        provinceId: e.value,
        countyId: 0,
      };

      setGetTariffObj(getTariffObj2);

      getTariff.mutate(getTariffObj2);
      setFieldValue("county", {
        value: 0,
        label: "پیشفرض در استان",
      });
    } else {
      setDisableCounty(true);
      setFieldValue("county", null);
      setGetTariffObj({
        type: 1,
        provinceId: 0,
        countyId: 0,
      });
      getTariff.mutate({
        type: 1,
        provinceId: 0,
        countyId: 0,
      });
    }

    setFieldValue("province", e);
  };

  const handleOnCountyChange = (e: any, setFieldValue: any, values: any) => {
    setFieldValue("county", e);
    if (e.value === 0) {
      setGetTariffObj({
        type: 2,
        provinceId: values.province.value,
        countyId: 0,
      });
      getTariff.mutate({
        type: 2,
        provinceId: values.province.value,
        countyId: 0,
      });
    } else {
      setGetTariffObj({
        type: 3,
        provinceId: 0,
        countyId: e.value,
      });
      getTariff.mutate({
        type: 3,
        provinceId: 0,
        countyId: e.value,
      });
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>تعرفه جذب شهرستانی</CardTitle>
        </CardHeader>
        <CardBody>
          <Formik
            initialValues={initialValue}
            onSubmit={onSubmit}
            enableReinitialize
            validationSchema={MergedSetTariffCountyValidation}
          >
            {({ values, errors, touched, setFieldValue }) => {
              return (
                <>
                  {getAllProvince.isLoading || getTariff.isLoading ? (
                    <FallBackSpinner />
                  ) : (
                    <Form>
                      <Alert color="info">
                        تعرفه فعلی {currentRate} ریال میباشد
                      </Alert>
                      <Row>
                        <Col sm="6">
                          <BasicSelectOption
                            lableText="استان ها"
                            hasLabel
                            name="province"
                            placeHolder="انتخاب کنید"
                            onChange={(e) =>
                              handleOnProvinceChange(e, setFieldValue)
                            }
                            significant
                            isLoading={getAllProvince.isLoading}
                            data={province}
                          />
                        </Col>
                        <Col sm="6">
                          <BasicSelectOption
                            lableText="شهرستان ها"
                            hasLabel
                            name="county"
                            isDisabled={disableCounty}
                            placeHolder="انتخاب کنید"
                            onChange={(e) =>
                              handleOnCountyChange(e, setFieldValue, values)
                            }
                            significant
                            isLoading={
                              getAllCountyByProvinceIdMutation.isLoading
                            }
                            data={county}
                          />
                        </Col>
                      </Row>
                      <Row>
                        <Col sm="4">
                          <MoneyMask
                            lableText="مبلغ جدید"
                            name="amount"
                            errors={errors}
                            touched={touched}
                            value={values.amount}
                            onChange={(val: string) => {
                              setFieldValue("amount", val);
                            }}
                            significant
                            disabled={values.percentage ? true : false}
                            placeholder="مبلغ جدید به ریال"
                          />
                        </Col>
                        <Col sm="4">
                          <TextInput
                            lableText="درصد افزایش"
                            name="percentage"
                            disabled={values.amount ? true : false}
                            significant
                            placeholder="درصد افزایش به نسبت آخرین مبلغ را وارد کنید"
                          />
                        </Col>
                        <Col sm="4">
                          <ModernDatePicker
                            lableText="تاریخ شروع اعمال مبلغ"
                            name="startDate"
                            placeholder="تاریخ شروع را وارد کنید"
                            minimumDate={getCurrentJalaliDate()}
                            hasMaximum={false}
                            significant
                            initialValue={values.startDate}
                          />
                        </Col>
                      </Row>

                      <FormGroup>
                        <SubmitButton
                          btnText="ثبت"
                          isLoading={setTariff.isLoading}
                          initialValue={initialValue}
                          values={values}
                          schema={MergedSetTariffCountyValidation}
                        />
                      </FormGroup>
                    </Form>
                  )}
                </>
              );
            }}
          </Formik>
        </CardBody>
      </Card>

      <HistoryList
        deleteMutation={useDeletePositionRequestRateInCounty}
        useGetHistoryList={useGetAllCountyPositionRequestRateWithFilter}
        refetch={refetch}
        setRefetch={setRefetch}

      >
        {{ FilterSearch: SearchHistoryFilter }}
      </HistoryList>
    </>
  );
};

export { SetCountyTariff };
