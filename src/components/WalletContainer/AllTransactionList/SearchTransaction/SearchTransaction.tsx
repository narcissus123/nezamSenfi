import { Formik, Form } from "formik";
import React, { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FormGroup } from "reactstrap";
import * as Yup from "yup";

import {
  FinancialSection,
  FinancialStatus,
  FinancialType,
} from "../../../../core/data";
import {
  useGetAllCountyGuildRoomsByProvinceIdForDropDown,
  useGetAllProvinceGuildRoomsForDropDown,
  useGetAllUnioinByCountyGuildroomIdForDropDown,
} from "../../../../core/services/api";
import { IsSameUrl } from "../../../../core/utils";
import { RemoveCurrencyMask } from "../../../../core/utils";
import BasicSelectOption from "../../../common/Form/SelectOptionComponent/BasicSelectOption";
import { MoneyMask } from "../../../common/Form";
import { SubmitButton } from "../../../common/Form";
import { TextArea } from "../../../common/Form";
import { TextInput } from "../../../common/Form";
import TreeColumn from "../../../common/Wrapper/ColumnWrapper/ThreeColumn/ThreeColumn";

interface IPropTypes {
  onSearch: (val: any) => void;
  isLoading?: boolean;
}

const SearchTransaction: FC<IPropTypes> = ({ onSearch, isLoading }) => {
  const [amount, setAmount] = useState("");

  const validate = Yup.object().shape({
    amount: Yup.string().test("amount", "مقدار را صحیح وارد کنید", (val: any) =>
      val ? RemoveCurrencyMask(val) >= 0 : true
    ),
  });

  const defaultValue = {
    amount: 0,
    description: "",
    status: null,
    type: null,
    transactionSection: null,
  };

  const [initialValues, setInitialValues] = useState({
    amount: amount,
    description: "",
    status: null,
    type: null,
    transactionSection: null,
    province: null,
    county: null,
    union: null,
    username: "",
  });

  const [province, setProvince] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);
  const [county, setCounty] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);
  const [union, setUnion] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const getAllprovince = useGetAllProvinceGuildRoomsForDropDown();
  const getAllCountyByProvinceId = useGetAllCountyGuildRoomsByProvinceIdForDropDown();
  const {
    data: allUnions,
    isLoading: unionLoading,
    isSuccess: unionSuccess,
    mutate: mutateUnion,
  } = useGetAllUnioinByCountyGuildroomIdForDropDown();

  useEffect(() => {
    if (getAllprovince.data && getAllprovince.data.data) {
      const result = getAllprovince.data.data.result;

      let province2: any = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      result.forEach((item: any) => {
        province2[0].options.push({ value: item.id, label: item.title });
      });
      setProvince(province2);
    }
  }, [getAllprovince.isSuccess]);

  useEffect(() => {
    if (getAllCountyByProvinceId.data && getAllCountyByProvinceId.data.data) {
      const result = getAllCountyByProvinceId.data.data.result;

      let county2: any = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      result.forEach((county: any) => {
        county2[0].options.push({ value: county.id, label: county.title });
      });
      setCounty(county2);
    }
  }, [getAllCountyByProvinceId.isSuccess]);

  useEffect(() => {
    if (allUnions && allUnions.data) {
      const result = allUnions.data.result;
      let unions: any = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      result.forEach((union: any) => {
        unions[0].options.push({ value: union.id, label: union.title });
      });
      setUnion(unions);
    }
  }, [unionSuccess]);

  const onSubmit = (value: any) => {
    onSearch(value);
  };

  const onClear = (resetForm: any) => {
    setAmount("");
    resetForm();
    onSearch(defaultValue);
  };

  const provinceOnChange = (opt: any, e: any, setFieldValue: any) => {
    getAllCountyByProvinceId.mutate(opt.value);
    setFieldValue("province", {
      value: opt.value,
      label: opt.label,
    });
    setFieldValue("county", null);
  };

  const townshipOnChange = (opt: any, e: any, setFieldValue: any) => {
    mutateUnion(opt.value);
    setFieldValue("county", {
      value: opt.value,
      label: opt.label,
    });
  };

  const location = useLocation();

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={(value) => onSubmit(value)}
      validationSchema={validate}
    >
      {({
        values,
        errors,
        touched,
        resetForm,
        setSubmitting,
        setFieldValue,
      }) => (
        <Form>
          <TreeColumn>
            <div>
              <MoneyMask
                errors={errors}
                name="amount"
                lableText="مبلغ دلخواه"
                onChange={(val: string) => {
                  setFieldValue("amount", val);
                  setAmount(val);
                }}
                touched={touched}
                value={amount}
              />

              <BasicSelectOption
                data={province}
                name="province"
                hasLabel
                lableText="استان"
                isLoading={getAllprovince.isLoading}
                onChange={(opt: any, e: any) =>
                  provinceOnChange(opt, e, setFieldValue)
                }
                placeHolder="انتخاب کنید..."
              />
              <TextArea
                name="description"
                lableText="توضیحات"
                placeholder="توضیحات"
              />
            </div>
            <div>
              <BasicSelectOption
                data={FinancialStatus}
                name="status"
                hasLabel
                lableText="وضعیت پرداخت"
                placeHolder="انتخاب کنید..."
              />

              <BasicSelectOption
                data={county}
                name="county"
                hasLabel
                lableText="شهرستان"
                placeHolder="انتخاب کنید..."
                isLoading={getAllCountyByProvinceId.isLoading}
                onChange={(opt: any, e: any) =>
                  townshipOnChange(opt, e, setFieldValue)
                }
              />

              <BasicSelectOption
                data={FinancialSection}
                name="transactionSection"
                hasLabel
                lableText="بخش تراکنش"
                placeHolder="انتخاب کنید..."
              />
            </div>

            <div>
              <BasicSelectOption
                data={FinancialType}
                name="type"
                hasLabel
                lableText="نوع تراکنش"
                placeHolder="انتخاب کنید..."
              />

              <BasicSelectOption
                data={union}
                name="union"
                hasLabel
                lableText="اتحادیه"
                placeHolder="انتخاب کنید..."
                isLoading={unionLoading}
              />

              {!IsSameUrl(location.pathname, "/Wallet/UserTransactions") && (
                <TextInput
                  name="username"
                  placeholder="شناسه یا کد ملی را وارد کنید"
                  hasLabel
                  lableText="شناسه یا کد ملی"
                />
              )}
            </div>
          </TreeColumn>

          <FormGroup>
            <SubmitButton
              isLoading={isLoading ? isLoading : false}
              clearable
              btnText="جستجو"
              onClear={() => onClear(resetForm)}
            />
          </FormGroup>
        </Form>
      )}
    </Formik>
  );
};

export { SearchTransaction };
