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
  useDeletePositionRequestRateInMainLocation,
  useGetAllMainLocationPositionRequestRateWithFilter,
  useGetCurrentRateOfMainLocationGuildRoomPositionRequest,
  useSetPositionRequestRateInMainLocation,
} from "../../../../core/services/api";
import {
  getCurrentJalaliDate,
  RemoveCurrencyMask,
  showToast,
} from "../../../../core/utils";
import { SetTariffValidation } from "../../../../core/validations/tariff.validations";
import {
  ModernDatePicker,
  MoneyMask,
  SubmitButton,
} from "../../../common/Form";
import { FallBackSpinner } from "../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { HistoryList } from "../HistoryList";
import { SearchHistoryFilter } from "./SearchHistoryFilter/SearchHistoryFilter";

const SetMainLocationTariff: FC = () => {
  const [initialValue, setInitialValue] = useState({
    amount: "",
    startDate: "",
  });

  const [currentRate, setCurrentRate] = useState<number>(0);
  const [refetch, setRefetch] = useState<boolean>(false);

  const setTariff = useSetPositionRequestRateInMainLocation();
  const getTariff = useGetCurrentRateOfMainLocationGuildRoomPositionRequest();

  useEffect(() => {
    if (getTariff.data && getTariff.data.data) {
      try {
        const result = getTariff.data.data.result;
        // console.log(result);
        setCurrentRate(result);
      } catch (error) {}
    }
  }, [getTariff.isSuccess]);

  const onSubmit = (values: any) => {
    console.log(values);
    const tariffObject = {
      rate: RemoveCurrencyMask(values.amount),
      startDate: values.startDate,
    };

    setTariff.mutate(tariffObject, {
      onSuccess: () => {
        showToast(["با موفقیت انجام شد"], ToastTypes.success);
        getTariff.refetch();
        setRefetch(!refetch);
      },
    });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>تعرفه جذب کشوری</CardTitle>
        </CardHeader>
        <CardBody>
          {getTariff.isLoading ? (
            <FallBackSpinner />
          ) : (
            <>
              <Alert color="info">تعرفه فعلی {currentRate} ریال میباشد</Alert>
              <Formik
                initialValues={initialValue}
                onSubmit={onSubmit}
                validationSchema={SetTariffValidation}
              >
                {({ values, errors, touched, setFieldValue }) => (
                  <Form>
                    <Row>
                      <Col sm="4">
                        <MoneyMask
                          lableText="مبلغ"
                          name="amount"
                          errors={errors}
                          touched={touched}
                          value={values.amount}
                          onChange={(val: string) =>
                            setFieldValue("amount", val)
                          }
                          significant
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
                        schema={SetTariffValidation}
                      />
                    </FormGroup>
                  </Form>
                )}
              </Formik>
            </>
          )}
        </CardBody>
      </Card>

      <HistoryList
        deleteMutation={useDeletePositionRequestRateInMainLocation}
        useGetHistoryList={useGetAllMainLocationPositionRequestRateWithFilter}
        refetch={refetch}
        setRefetch={setRefetch}
      >
        {{ FilterSearch: SearchHistoryFilter }}
      </HistoryList>
    </>
  );
};

export { SetMainLocationTariff };
