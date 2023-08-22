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
import { FullOptionSel } from "../../../../core/models";
import { useGetAllProvinceGuildRoomsForDropDown } from "../../../../core/services/api";
import {
  useDeletePositionRequestRateInProvince,
  useGetAllProvincePositionRequestRateWithFilter,
  useGetCurrentRateOfProvinceGuildRoomPositionRequest,
  useSetPositionRequestRateInProvince,
} from "../../../../core/services/api/position-request-rate.api";
import {
  getCurrentJalaliDate,
  RemoveCurrencyMask,
  showToast,
} from "../../../../core/utils";
import { MergedSetTariffProvinceValidation } from "../../../../core/validations/tariff.validations";
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

const SetProvinceTariff: FC = () => {
  const [initialValue, setInitialValue] = useState({
    amount: "",
    startDate: "",
    percentage: "",
    province: null,
  });
  const [province, setProvince] = useState<FullOptionSel[]>([
    {
      label: "انتخاب کنید...",
      options: [{ value: 0, label: "پیشفرض استان ها" }],
    },
  ]);
  const [currentRate, setCurrentRate] = useState<number>(0);
  const [refetch, setRefetch] = useState<boolean>(false);

  const getAllProvince = useGetAllProvinceGuildRoomsForDropDown();

  const setTariff = useSetPositionRequestRateInProvince();
  const getTariff = useGetCurrentRateOfProvinceGuildRoomPositionRequest();

  const [getTariffObj, setGetTariffObj] = useState({
    type: 1,
    provinceId: 0,
  });

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
      // console.log(result);
      const provinces: any = province;

      result.forEach((item: any) => {
        provinces[0].options.push({ value: item.id, label: item.title });
      });
      setProvince(provinces);

      setInitialValue((old: any) => ({
        ...old,
        province: { value: 0, label: "پیشفرض استان ها" },
      }));

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
      type: values.province.value === 0 ? 1 : 2,
      provinceId: values.province.value,
    };

    setTariff.mutate(tariffObj, {
      onSuccess: () => {
        showToast(["با موفقیت انجام شد"], ToastTypes.success);
        getTariff.mutate(getTariffObj);
        setRefetch(!refetch);
      },
    });
  };

  const handleOnProvinceChange = (opt: any, e: any, setFieldValue: any) => {
    setFieldValue("province", { value: opt.value, label: opt.label });
    if (opt.value === 0) {
      setGetTariffObj({
        type: 1,
        provinceId: 0,
      });
      getTariff.mutate({
        type: 1,
        provinceId: 0,
      });
    } else {
      setGetTariffObj({
        type: 2,
        provinceId: opt.value,
      });
      getTariff.mutate({
        type: 2,
        provinceId: opt.value,
      });
    }
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>تعرفه جذب استانی</CardTitle>
        </CardHeader>
        <CardBody>
          <Formik
            initialValues={initialValue}
            onSubmit={onSubmit}
            enableReinitialize
            validationSchema={MergedSetTariffProvinceValidation}
          >
            {({ values, errors, touched, setFieldValue }) => (
              <>
                {getAllProvince.isLoading || getTariff.isLoading ? (
                  <FallBackSpinner />
                ) : (
                  <Form>
                    <Alert color="info">
                      تعرفه فعلی {currentRate} ریال میباشد
                    </Alert>
                    <Row>
                      <Col sm="4">
                        <BasicSelectOption
                          lableText="استان ها"
                          hasLabel
                          name="province"
                          placeHolder="انتخاب کنید"
                          onChange={(opt, e) =>
                            handleOnProvinceChange(opt, e, setFieldValue)
                          }
                          significant
                          isLoading={getAllProvince.isLoading}
                          data={province}
                        />
                      </Col>
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
                        schema={MergedSetTariffProvinceValidation}
                      />
                    </FormGroup>
                  </Form>
                )}
              </>
            )}
          </Formik>
        </CardBody>
      </Card>

      <HistoryList
        deleteMutation={useDeletePositionRequestRateInProvince}
        useGetHistoryList={useGetAllProvincePositionRequestRateWithFilter}
        refetch={refetch}
        setRefetch={setRefetch}
      >
        {{ FilterSearch: SearchHistoryFilter }}
      </HistoryList>
    </>
  );
};

export { SetProvinceTariff };
