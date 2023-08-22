import React, { useEffect, useState } from "react";
import { DocumentTypeEnum } from "../../../../../../../../../core/enums/document-category-type.enum";
import { useGetDocumentByDocumentCategoryTypeEnum } from "../../../../../../../../../core/services/api";
import {
  FormDivider,
  MultiSelectOption,
} from "../../../../../../../../common/Form";
import BasicSelectOption from "../../../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";

interface IPropsTypes {
  disabled: boolean;
  setFieldValue: any;
}

const FacilitiesStatusInputs: React.FC<IPropsTypes> = ({
  disabled,
  setFieldValue,
}) => {
  const ventilationData = [
    { value: 1, label: "خوب" },
    { value: 2, label: "متوسط" },
    { value: 3, label: "نامطلوب" },
  ];

  const ElectricityData = [
    { value: 1, label: "شبکه کابل کشی کامل" },
    { value: 2, label: "شبکه کابل کشی ناقص" },
    { value: 3, label: "موتور برق سیار و کابل کشی ناقص" },
    { value: 4, label: "فاقد کابل کشی" },
    { value: 5, label: "سایر" },
  ];

  const waterData = [
    { value: 1, label: "شبکه آبرسانی کامل مکانیزه" },
    { value: 2, label: "شبکه آبرسانی ناقص و نیمه مکانیزه" },
    { value: 3, label: "آبرسانی سنتی و فاقد هرگونه شبکه" },
    { value: 4, label: "سایر" },
  ];

  const WastewaterData = [
    { value: 1, label: "شبکه یا کانال کشی کامل و دارای سپتیک تانک" },
    { value: 2, label: "شبکه یا کانال کشی ناقص و فاقد سپتیک تانک" },
    { value: 3, label: "فاقد هرگونه شبکه و کانال" },
    { value: 4, label: "سایر" },
  ];

  const coldAndWarmthData = [
    { value: 1, label: "دارای سیستم گرمایشی مدرن" },
    { value: 2, label: "دارای سیستم گرمایشی سنتی" },
    { value: 3, label: "دارای سیستم سرمایشی مدرن" },
    { value: 4, label: "دارای سیستم سرمایشی سنتی" },
    { value: 5, label: "فاقد هرگونه سیستم گرمایش و سرمایش" },
  ];

  return (
    <>
      <FormDivider textHeader="وضعیت تأسیسات">
        <BasicSelectOption
          lableText="نور و تهویه"
          name="ventilation"
          data={ventilationData}
          significant
          placeHolder="انتخاب کنید ..."
          isDisabled={disabled}
        />
        <BasicSelectOption
          lableText="برق "
          name="Electricity"
          data={ElectricityData}
          significant
          placeHolder="انتخاب کنید ..."
          isDisabled={disabled}
        />
        <BasicSelectOption
          lableText="آب"
          name="water"
          data={waterData}
          significant
          isDisabled={disabled}
          placeHolder="انتخاب کنید ..."
        />
        <BasicSelectOption
          lableText="فاضلاب "
          name="Wastewater"
          data={WastewaterData}
          significant
          placeHolder="انتخاب کنید ..."
          isDisabled={disabled}
        />
        <BasicSelectOption
          lableText="سرما و گرما  "
          name="coldAndWarmth"
          data={coldAndWarmthData}
          isDisabled={disabled}
          significant
          placeHolder="انتخاب کنید ..."
        />
      </FormDivider>
    </>
  );
};

export { FacilitiesStatusInputs };
