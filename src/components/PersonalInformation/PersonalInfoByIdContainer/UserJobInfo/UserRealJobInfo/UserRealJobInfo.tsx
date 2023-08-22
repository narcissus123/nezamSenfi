import React, { FC, useEffect, useState } from "react";
import { CardTitle, Col, ListGroup, ListGroupItem, Row } from "reactstrap";

import { useJobInfoDataById } from "../../../../../core/services/api";
import { useGetLocationInformation } from "../../../../../core/services/api";
import { fullOption, simpleOption } from "../../../../../core/utils";

import { FallBackSpinner } from "../../../../common/Spinner/FallBackSpinner/FallbackSpinner";

import { List } from "./List/List";

interface IPropTypes {
  id: string;
}

const UserRealJobInfo: FC<IPropTypes> = ({ id }) => {
  const [tableData, setTableData] = useState<any>([]);

  const [userData, setUserData] = useState<any>("");

  const userInfo = useJobInfoDataById(+id);
  const locationInfo = useGetLocationInformation();

  const [jobStatusOptions, setJobStatusOptions] = useState<any>([
    { value: "1", label: "استخدام رسمی یا بازنشسته" },
    { value: "2", label: "استخدام رسمی و یا بازخرید" },
    { value: "3", label: "قراردادی موقت طبق قانون کار" },
    { value: "4", label: "پیمانی با مدت مشخص" },
    { value: "5", label: "خویش فرمایی" },
    { value: "6", label: "فاقد شغل دولتی / شرکتی / خویش فرمایی" },
    { value: "7", label: "کارگری آزاد" },
  ]);
  const [workplaceOptions, setWorkplaceOptions] = useState<any>([
    {
      label: "انتخاب نوع سازمان محل کار",
      options: [
        { value: "1", label: "سازمان ها و ادارات دولتی" },
        { value: "2", label: "سازمان ها و ادارات نیمه دولتی" },
        { value: "3", label: "سازمان ها و شعبات خصوصی" },
        { value: "4", label: "سازمان های مردم نهاد" },
        { value: "5", label: "اتاق اصناف" },
        { value: "6", label: "اتاق بازرگانی" },
        { value: "7", label: "اتاق تعاون" },
        { value: "8", label: "نظام های سازمانی تخصصی" },
      ],
    },
  ]);

  const [insuranceHistoryOptions, setInsuranceHistoryOptions] = useState<any>([
    {
      label: "انتخاب کنید ...",
      options: [
        { value: "0", label: "ندارد" },
        { value: "1", label: "1 سال" },
        { value: "2", label: "2 سال" },
        { value: "3", label: "3 سال" },
        { value: "4", label: "4 سال" },
        { value: "5", label: "5 سال" },
        { value: "6", label: "6 سال" },
        { value: "7", label: "7 سال" },
        { value: "8", label: "8 سال" },
        { value: "9", label: "9 سال" },
        { value: "10", label: "10 سال" },
        { value: "11", label: "11 سال" },
        { value: "12", label: "12 سال" },
        { value: "13", label: "13 سال" },
        { value: "14", label: "14 سال" },
        { value: "15", label: "15 سال" },
        { value: "16", label: "16 سال" },
        { value: "17", label: "17 سال" },
        { value: "18", label: "18 سال" },
        { value: "19", label: "19 سال" },
        { value: "20", label: "20 سال" },
        { value: "21", label: "21 سال" },
        { value: "22", label: "22 سال" },
        { value: "23", label: "23 سال" },
        { value: "24", label: "24 سال" },
        { value: "25", label: "25 سال" },
        { value: "26", label: "26 سال" },
        { value: "27", label: "27 سال" },
        { value: "28", label: "28 سال" },
        { value: "29", label: "29 سال" },
        { value: "30", label: "30 سال" },
      ],
    },
  ]);
  const [skillCertificationOptions, setSkillCertificationOptions] =
    useState<any>([
      {
        label: "گواهی مهارت ...",
        options: [
          { value: "1", label: "سازمان جهاد" },
          { value: "2", label: "سازمان فنی و حرفه ای" },
          { value: "3", label: "صنعت و معدن" },
          { value: "4", label: "سایر" },
          { value: "5", label: "فاقد گواهی مهارت" },
        ],
      },
    ]);

  const [insuranceTypeOptions, setInsuranceTypeOptions] = useState<any>([
    {
      label: "انتخاب نوع بیمه",
      options: [
        { value: "1", label: "تامین اجتماعی" },
        { value: "2", label: "خدمات درمانی" },
        { value: "3", label: "بیمه سلامت" },
        { value: "4", label: "خدمات درمانی نیروهای مسلح و کارکنان دولت" },
        { value: "5", label: "روستایی و عشایری" },
        { value: "6", label: "فاقد بیمه پایه" },
      ],
    },
  ]);

  useEffect(() => {
    if (userInfo.data && userInfo.data.data) {
      const result = userInfo.data.data.result.userJobs;
      let newTable: any = [];
      result.forEach((row: any) => {
        newTable.push({
          id: row.id,
          employmentStatusTitle: simpleOption(
            row.employmentStatus.toString(),
            jobStatusOptions
          ).label,
          employmentStatus: row.employmentStatus,
          workplaceOrganizationTitle: row.workplaceOrganization
            ? fullOption(row.workplaceOrganization.toString(), workplaceOptions)
                .label
            : "",
          workplaceOrganization: row.workplaceOrganization,
          organizationName: row.organizationName,
          workExperience: row.workExperience,
          workExperienceTitle: row.workExperience
            ? fullOption(row.workExperience.toString(), insuranceHistoryOptions)
                .label
            : "",
          workPositionTitle: row.workPosition
            ? fullOption(row.workPosition.toString(), workplaceOptions).label
            : "",
          workPosition: row.workPosition,
          skillCertificateTitle: row.skillCertificate
            ? fullOption(
                row.skillCertificate.toString(),
                skillCertificationOptions
              ).label
            : "",
          skillCertificate: row.skillCertificate,
          skillsField: row.skillsField,
          appreciationTitle: row.appreciation ? "بله" : "خیر",
          appreciation: row.appreciation,
          skillCertificateFromORGTitle: row.skillCertificateFromORG
            ? "بله"
            : "خیر",
          skillCertificateFromORG: row.skillCertificateFromORG,
          insuranceTypeTitle: row.insuranceType
            ? fullOption(row.insuranceType.toString(), insuranceTypeOptions)
                .label
            : "",
          insuranceType: row.insuranceType,
          perfectedInsuranceTitle: row.perfectedInsurance ? "بله" : "خیر",
          perfectedInsurance: row.perfectedInsurance,
          perfectedInsuranceType: row.perfectedInsuranceType,
          insuranceDurationTitle: row.insuranceDuration
            ? fullOption(
                row.insuranceDuration.toString(),
                insuranceHistoryOptions
              ).label
            : "",
          insuranceDuration: row.insuranceDuration,
          locationTitle: row.locationTitle,
          locationId: row.locationId,
          workPostalCode: row.workPostalCode ? row.workPostalCode : "",
          workEmail: row.workEmail ? row.workEmail : "",
          workPhone: row.workPhone ? row.workPhone : "",
          economicActivity: row.economicActivity ? row.economicActivity : "",
        });
      });

      setTableData(newTable);
    }
  }, [userInfo.isSuccess]);

  const getValue = (val: any) => {
    return val ? val : "تعیین نشده";
  };

  return userInfo.isFetching ? (
    <FallBackSpinner />
  ) : (
    <ListGroup tag="div">
      <CardTitle>اطلاعات شغلی</CardTitle>

      <Row style={{ marginTop: "25px" }}>
        <Col>
          <List tableData={tableData} setTableData={setTableData} />
        </Col>
      </Row>
    </ListGroup>
  );
};

export { UserRealJobInfo };
