import * as React from "react";
import { useEffect, useState } from "react";
import { Row, Col } from "reactstrap";
import { IdentityChangeStatusData } from "../../../../../../../core/data/identity-change-status.data";
import { statusTypeRequest } from "../../../../../../../core/data/status-requests.data";

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
  const { data, isSuccess, isFetching } =
    useGetAllProvinceGuildRoomsForDropDown();

  return (
    <>
      <Row>
        <Col lg="3">
          <BasicSelectOption
            isClearable={true}
            lableText="وضعیت"
            name="identityChangeStatus"
            placeHolder="انتخاب کنید..."
            data={IdentityChangeStatusData}
            isLoading={false}
          />
        </Col>
        <Col lg="3">
          <ModernDatePicker
            clearable={true}
            lableText="تاریخ"
            name="dateTime"
            placeholder="تاریخ"
            //initialValue={startCreateDateInitial}
          />
        </Col>

        <Col lg="3">
          <TextInput
            lableText="توضیحات"
            name="description"
            placeholder="توضیحات"
          />
        </Col>
      </Row>
      <Row>
        <Col lg="7">
          <SubmitButton
            isLoading={mutation.isLoading}
            btnText="جستجو"
            clearable
            clearableTxt="پاک کردن"
            onClear={onResetClick}
          />
        </Col>
      </Row>
    </>
  );
};

export { ListFilter };
