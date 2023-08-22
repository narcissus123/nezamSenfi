import React, {  FC, useEffect, useState } from "react";
import { Col } from "reactstrap";
import { UserRolesAdmin } from "../../../../../core/enums/user-role-admin.enum";
import { useGetAllCountyGuildRoomsByProvinceIdForDropDown, useGetAllProvinceGuildRoomsForDropDown, useGetAllUnioinByCountyGuildroomIdForDropDown, useGetPaymentType } from "../../../../../core/services/api";
import BasicSelectOption from "../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { locationType } from "../FixedPayableValueContainer";

interface IPropTypes {
  setFieldValue : any
  setUnion: any
  setPayableTypesData: any
  payableTypesData: any
  provinceMutation: any
  countyMutation: any
  isCounty?: boolean
  type: locationType
}

const MainLocation: FC<IPropTypes> = ({
  setFieldValue,
  setUnion,
  setPayableTypesData,
  payableTypesData,
  provinceMutation,
  countyMutation,
  isCounty,
  type
}) => {
  const { data, isSuccess, isFetching } = provinceMutation();
  const countyGuildRoomsMutation = countyMutation();
  const unionMutation = useGetAllUnioinByCountyGuildroomIdForDropDown();

  const {
    data: paymentData,
    isLoading: paymentIsLoading,
    isSuccess: paymentIsSuccess,
  } = useGetPaymentType(
    type === "mainlocation"
      ? UserRolesAdmin.Admin
      : type === "province"
      ? UserRolesAdmin.ProvinceGuildRoomAdmin
      : UserRolesAdmin.CountyGuildRoomAdmin
  );

  useEffect(() => {
    if (paymentData && paymentData.data) {
      try {
        let newOptions: any = [];
        let newPayableTypes = [
          {
            label: "انتخاب کنید ...",
            options: [],
          },
        ];

        const result = paymentData.data.result;
        result.forEach((row: any) => {
          newOptions.push({
            value: row.payableValueTypeId,
            label: row.payableTypeTitle,
            maxValue: row.maxValue,
            inSharing: row.inSharing,
            payableValueType: row.payableValueType,
          });
        });

        newPayableTypes[0].options = newOptions;

        setPayableTypesData(newPayableTypes);
      } catch (er) {}
    }
  }, [paymentIsSuccess]);

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

  useEffect(() => {
    if (data) {
      let queryData: any = data;
      let newOptions: any = [];
      let newProvinces = [
        {
          label: "انتخاب کنید ...",
          options: [],
        },
      ];

      queryData.data.result.forEach((row: any) => {
        newOptions.push({ value: row.id, label: row.title });
      });
      newProvinces[0].options = newOptions;
      setProvince(newProvinces);
    }
  }, [isSuccess, data]);

  useEffect(() => {
    try {
      if (data) {
        let queryData: any = countyGuildRoomsMutation.data;
        let newOptions: any = [];
        let newCounties = [
          {
            label: "انتخاب کنید ...",
            options: [],
          },
        ];

        queryData.data.result.forEach((row: any) => {
          newOptions.push({ value: row.id, label: row.title });
        });
        newCounties[0].options = newOptions;
        setCounty(newCounties);
      }
    } catch (e) {}
  }, [countyGuildRoomsMutation.isSuccess, countyGuildRoomsMutation.data]);

  useEffect(() => {
    try {
      if (unionMutation.data) {
        let queryData: any = unionMutation.data;
        let newOptions: any = [];
        let newUnions = [
          {
            label: "انتخاب کنید ...",
            options: [],
          },
        ];

        queryData.data.result.forEach((row: any) => {
          newOptions.push({ value: row.countyUnionId, label: row.title });
        });
        newUnions[0].options = newOptions;
        setUnion(newUnions);
      }
    } catch (e) {}
  }, [unionMutation.isSuccess, unionMutation.data]);

  return (
    <>
      <Col sm="4">
        <BasicSelectOption
          isLoading={paymentIsLoading}
          significant={true}
          name="payableTypes"
          placeHolder="انتخاب کنید ..."
          data={payableTypesData}
          lableText="نوع پرداختی"
        />
      </Col>
      {!isCounty && (
        <Col sm="4">
          <BasicSelectOption
            lableText="استان"
            significant={true}
            name="province"
            placeHolder="انتخاب کنید..."
            data={province}
            isLoading={isFetching}
            onChange={(opt, e) => {
              setFieldValue("province", {
                value: opt.value,
                label: opt.label,
              });
              setFieldValue("county", null);
              setCounty([]);
              setUnion([]);
              countyGuildRoomsMutation.mutate(opt.value);
            }}
          />
        </Col>
      )}
      <Col sm="4">
        <BasicSelectOption
          lableText="شهرستان"
          significant={true}
          name="county"
          placeHolder="انتخاب کنید..."
          data={county}
          isLoading={countyGuildRoomsMutation.isLoading}
          onChange={(opt, e) => {
            setFieldValue("county", {
              value: opt.value,
              label: opt.label,
            });
            setUnion([]);
            unionMutation.mutate(opt.value);
          }}
        />
      </Col>
    </>
  );
};

export { MainLocation };
