import React from "react";
import { Row, Col } from "reactstrap";
import { LicenseRequestStatusData } from "../../../../../../../core/data/license-requests-status.data";
import { LicenseRequestTypeEnum } from "../../../../../../../core/enums/license-request-type.enums";
import { FullOptionSel } from "../../../../../../../core/models";
import { SubmitButton } from "../../../../../../common/Form";
import BasicSelectOption from "../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";

export interface IPropsProps {
  mutation: any;
  onResetClick: () => void;
  setFieldValue: any;
}
export const licenseTypeData: FullOptionSel[] = [
  {
    label: "انتخاب کنید ...",
    options: [
      { value: LicenseRequestTypeEnum.Issuing, label: "صدور" },
      { value: LicenseRequestTypeEnum.Cancelation, label: "ابطال" },
      { value: LicenseRequestTypeEnum.Extension, label: "تمدید" },
    ],
  },
]; 

const ListFilter: React.FC<IPropsProps> = ({
  mutation,
  onResetClick,
}) => {

  return (
    <>
      <Row>
        <Col lg="3">
          <BasicSelectOption
            isClearable={true}
            lableText="وضعیت"
            name="status"
            placeHolder="انتخاب کنید..."
            data={LicenseRequestStatusData}
            isLoading={false}
          />
        </Col>
      </Row>
      <Row></Row>
      <Row>
        <Col lg="4">
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
