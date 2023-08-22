import * as React from "react";
import { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import {
  useGetAllCountyGuildRoomsByProvinceIdForDropDown,
  useGetAllProvinceGuildRoomsForDropDown,
  useGetAllUnioinByCountyGuildroomIdForDropDown,
} from "../../../../../../../core/services/api";
import { ModernDatePicker, SubmitButton, TextInput } from "../../../../../../common/Form";
import BasicSelectOption from "../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";

export interface IPropsProps {
  mutation: any;
  onResetClick: () => void;
  setFieldValue: any;
}

const ListFilter: React.FC<IPropsProps> = ({
  mutation,
  onResetClick,
  setFieldValue,
}) => {
  const yearOfServicesData = [
    {
      label: "انتخاب کنید ...",
      options: [
        { value: 1, label: "1 سال" },
        { value: 2, label: "2 سال" },
        { value: 3, label: "3 سال" },
        { value: 4, label: "4 سال" },
        { value: 5, label: "5 سال" },
        { value: 6, label: "6 تا 10 سال" },
        { value: 7, label: "11 تا 15 سال" },
        { value: 8, label: "16 تا 20 سال" },
        { value: 9, label: "21 تا 25 سال" },
        { value: 10, label: "26 تا 30 سال" },
      ],
    },
  ];

  const [
    employmentLicenseStatusData,
    setEmploymentLicenseStatusData,
  ] = useState<any>([
    {
      label: "انتخاب کنید ...",
      options: [
        { value: 1, label: "دارای اعتبار" },
        { value: 2, label: "فاقد اعتبار" },
      ],
    },
  ]);

  const [positionData, setPositionData] = useState<any>([
    {
      label: "انتخاب کنید ...",
      options: [{ value: 1, label: "سمت یک" }],
    },
  ]);

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

  const {
    data,
    isSuccess,
    isFetching,
  } = useGetAllProvinceGuildRoomsForDropDown();
  const countyGuildRoomsMutation = useGetAllCountyGuildRoomsByProvinceIdForDropDown();
  const unionGuildRoomsMutation = useGetAllUnioinByCountyGuildroomIdForDropDown();

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
      if (countyGuildRoomsMutation.data && countyGuildRoomsMutation.data.data) {
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
      if (unionGuildRoomsMutation.data && unionGuildRoomsMutation.data.data) {
        let queryData: any = unionGuildRoomsMutation.data;
        let newOptions: any = [];
        let newUnions = [
          {
            label: "انتخاب کنید ...",
            options: [],
          },
        ];

        queryData.data.result.forEach((row: any) => {
          newOptions.push({ value: row.id, label: row.title });
        });
        newUnions[0].options = newOptions;
        setUnion(newUnions);
      }
    } catch (e) {}
  }, [unionGuildRoomsMutation.isSuccess, unionGuildRoomsMutation.data]);

  return (
    <>
      <Row>
        <Col lg="3">
          <TextInput
            lableText="نام سازمان"
            name="OrganizationTitle"
            placeholder="نام سازمان"
          />
        </Col>
        <Col lg="3">
          <ModernDatePicker
            clearable={true}
            lableText="از تاریخ"
            name="StartDate"
            placeholder="از تاریخ"
            //initialValue={startCreateDateInitial}
          />
        </Col>
        <Col lg="3">
          <ModernDatePicker
            clearable={true}
            lableText="تا تاریخ"
            name="EndDate"
            placeholder="تا تاریخ"
            //initialValue={endCreateDateInitial}
          />
        </Col>
        <Col lg="3">
          <BasicSelectOption
            lableText="سمت انتخابی"
            name="PositionId"
            placeHolder="انتخاب کنید ..."
            data={positionData}
            isLoading={isFetching}
          />
        </Col>
      </Row>
      <Row>
        <Col lg="3">
          <BasicSelectOption
            lableText="استان"
            name="province"
            placeHolder="انتخاب کنید..."
            data={province}
            isLoading={isFetching}
            onChange={(opt, e) => {
              setFieldValue("province", {
                value: opt.value,
                label: opt.label,
              });
              setFieldValue("countyId", null);
              setCounty([]);
              countyGuildRoomsMutation.mutate(opt.value);
            }}
          />
        </Col>
        <Col lg="3">
          <BasicSelectOption
            lableText="شهرستان"
            name="CountyId"
            placeHolder="انتخاب کنید..."
            data={county}
            isLoading={countyGuildRoomsMutation.isLoading}
          />
        </Col>
        <Col lg="6" style={{ paddingTop: "24px" }}>
          <SubmitButton
            isLoading={mutation.isLoading}
            clearable
            btnText="جستجو"
            clearableTxt="پاک کردن"
            onClear={onResetClick}
          />
        </Col>
      </Row>
      <Row></Row>
    </>
  );
};

export { ListFilter };
