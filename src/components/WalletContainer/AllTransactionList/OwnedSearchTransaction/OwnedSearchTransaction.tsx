import { Formik, Form } from "formik";
import React, { FC, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { FormGroup } from "reactstrap";
import * as Yup from "yup";

import {
  FinancialSection,
  FinancialStatus,
  FinancialType,
} from "../../../../core/data/transaction.data";
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
  ownedProvince?: any;
  ownedCounty?: any;
  ownedUnion?: any;
}

const OwnedSearchTransaction: FC<IPropTypes> = ({
  ownedCounty,
  ownedProvince,
  ownedUnion,
  onSearch,
  isLoading,
}) => {
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
    username: "",
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

  useEffect(() => {
    if (ownedProvince && ownedProvince.data && ownedProvince.data.data) {
      const result = ownedProvince.data.data.result;

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
      setInitialValues((state: any) => {
        return {
          ...state,
          province: province2[0].options[0],
        };
      });
    }
  }, [ownedProvince ? ownedProvince.isSuccess : false]);

  useEffect(() => {
    if (ownedCounty && ownedCounty.data && ownedCounty.data.data) {
      const result = ownedCounty.data.data.result;

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
      setInitialValues((state: any) => {
        return {
          ...state,
          county: county2[0].options[0],
        };
      });
    }
  }, [ownedCounty ? ownedCounty.isSuccess : false]);

  useEffect(() => {
    if (ownedUnion && ownedUnion.data && ownedUnion.data.data) {
      const result = ownedUnion.data.data.result.unions;
      let unions: any = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      result.forEach((union: any) => {
        unions[0].options.push({ value: union.unionId, label: union.unionTitle });
      });
      setUnion(unions);
      setInitialValues((state: any) => {
        return {
          ...state,
          union: unions[0].options[0],
        };
      });
    }
  }, [ownedUnion ? ownedUnion.isSuccess : false]);

  const onSubmit = (value: any) => {
    onSearch(value);
  };

  const onClear = (resetForm: any) => {
    setAmount("");
    resetForm();
    onSearch({
      ...defaultValue,
      province: initialValues.province,
      county: initialValues.county,
      union: initialValues.union,
    });
  };

  const location = useLocation();

  return (
    <Formik
      initialValues={initialValues}
      enableReinitialize
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

              {IsSameUrl(location.pathname, "/Wallet/ProvinceTransactions") && (
                <BasicSelectOption
                  data={province}
                  name="province"
                  hasLabel
                  lableText="استان"
                  isLoading={ownedProvince ? ownedProvince.isLoading : false}
                  placeHolder="انتخاب کنید..."
                />
              )}

              {IsSameUrl(location.pathname, "/Wallet/CountyTransactions") && (
                <BasicSelectOption
                  data={county}
                  name="county"
                  hasLabel
                  lableText="شهرستان"
                  placeHolder="انتخاب کنید..."
                  isLoading={ownedCounty ? ownedCounty.isLoading : false}
                />
              )}

              {IsSameUrl(location.pathname, "/Wallet/UnionTransactions") && (
                <BasicSelectOption
                  data={union}
                  name="union"
                  hasLabel
                  lableText="اتحادیه"
                  placeHolder="انتخاب کنید..."
                  isLoading={ownedUnion ? ownedUnion.isLoading : false}
                />
              )}

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

              <TextInput
                name="username"
                placeholder="شناسه یا کد ملی را وارد کنید"
                hasLabel
                lableText="شناسه یا کد ملی"
              />
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

export { OwnedSearchTransaction };
