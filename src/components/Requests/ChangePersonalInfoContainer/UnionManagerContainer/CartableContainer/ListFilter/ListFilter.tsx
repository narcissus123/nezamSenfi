import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { IdentityChangeStatusData } from "../../../../../../core/data/identity-change-status.data";
import { FullOptionSel } from "../../../../../../core/models";
import {
  useGetAllCitiesWithPartByCountyId,
  useGetAllCountyByProvinceId,
  useGetAllprovinces,
  useGetAllVillagesWithPartByCountyId,
  useGetCountyUnionByCountyId,
} from "../../../../../../core/services/api";
import { ModernDatePicker, SubmitButton, TextInput } from "../../../../../common/Form";
import BasicSelectOption from "../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";

export interface IPropsProps {
  setFieldValue: any;
  getMutation: any;
  onResetClick: any;
  ownedUnions: any;
  getAllUnionLoading: any;
}

const ListFilter: React.FC<IPropsProps> = ({
  setFieldValue,
  getMutation,
  onResetClick,
  ownedUnions,
  getAllUnionLoading,
}) => {
  const [ownedCounties, setOwnedCounties] = useState<any>([]);


  const { data, isSuccess, isFetching } = useGetAllprovinces();


  return (
    <>
      <Row className="d-flex align-items-start">
        <Col lg="4">
          <TextInput
            lableText="نام کاربری"
            name="userName"
            placeholder="نام کاربری ..."
          />
        </Col>
        <Col lg="4">
          <TextInput
            lableText="توضیحات"
            name="description"
            placeholder="توضیحات ...."
          />
        </Col>
        <Col lg="4">
          <ModernDatePicker
            clearable={true}
            lableText="تاریخ"
            name="dateTime"
            placeholder="تاریخ"
          />
        </Col>
        <Col lg="4">
          <BasicSelectOption
            isLoading={getAllUnionLoading}
            name="unionId"
            placeHolder="انتخاب اتحادیه ..."
            data={ownedUnions}
            significant
            lableText="انتخاب اتحادیه"
          />
        </Col>
        <Col lg="4">
          <BasicSelectOption
            isLoading={false}
            name="identityChangeStatus"
            placeHolder="وضعیت درخواست ..."
            data={IdentityChangeStatusData}
            lableText="وضعیت درخواست"
            isClearable
          />
        </Col>
      </Row>
      <Row>
        <Col style={{ paddingTop: "23px" }} lg="1">
          <SubmitButton
            isLoading={getMutation.isLoading}
            btnText="جستجو"
            clearable
            clearableDisable={getMutation.isLoading}
            clearableTxt="پاکسازی"
            onClear={onResetClick}
          />
        </Col>
      </Row>
    </>
  );
};

export { ListFilter };
