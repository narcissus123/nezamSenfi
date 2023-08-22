import React, { useState } from 'react'
import { useGetAllMachineByTypes } from '../../../../../../../core/services/api';
import { useGetAllAgriculturalToolsAndServiceByTypesID } from '../../../../../../../core/services/api/job.api';
import { FullOptionCreater } from '../../../../../../../core/utils/full-option-creater.utils';
import { MultiSelectOption } from '../../../../../../common/Form';
import BasicSelectOption from '../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption';
import { TwoColumn } from '../../../../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn';


interface IPropTypes {
  index: number;
  setFieldValue: any;
  values: any;
  machineTypesData: any;
  isGetAllMachinTypesLoading: any;
  toolsTypeData: any
}

const NewMachinery: React.FC<IPropTypes> = ({
  machineTypesData,
  isGetAllMachinTypesLoading,
  setFieldValue,
  index,
  values,
  toolsTypeData
}) => {

  const [machineryData, setMachineryData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);
  const [servicesIdData, setServicesIdData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const getMachineMutation = useGetAllMachineByTypes();
  const getToolsByToolsTypeMutation = useGetAllAgriculturalToolsAndServiceByTypesID()

  return (
    <TwoColumn>
      <div>
        <BasicSelectOption
          lableText="نوع ماشین"
          placeHolder="انتخاب کنید..."
          name={`machinery.${index}.machineTypes`}
          data={machineTypesData}
          isLoading={isGetAllMachinTypesLoading}
          onChange={(opt) => {
            setFieldValue(`machinery.${index}.machineTypes`, opt);
            let Ids: any = [opt.value];
            getMachineMutation.mutate(
              { typeIds: Ids },
              {
                onSuccess: (val: any) => {
                  const result = val.data.result;
                  let newMachineData: {
                    value: number;
                    label: string;
                  }[] = [];
                  result.forEach((row: { id: number; title: string }) => {
                    newMachineData.push({
                      value: row.id,
                      label: row.title,
                    });
                  });
                  setMachineryData(newMachineData);
                },
              }
            );
          }}
        />

        <BasicSelectOption
          lableText="نام ماشین"
          significant={true}
          placeHolder="انتخاب کنید..."
          name={`machinery.${index}.machineryIds`}
          data={machineryData}
          isLoading={getMachineMutation.isLoading}
        />
      </div>
      <div>
        <MultiSelectOption
          labelText="نوع ادوات و خدمات"
          significant={false}
          hasLabel
          placeHolder="انتخاب کنید..."
          name={`machinery.${index}.servicesType`}
          options={toolsTypeData}
          isLoading={false}
          onChange={(opt) => {
            setFieldValue(`machinery.${index}.servicesType`, opt);
            if (opt && opt.length > 0) {
              let queryString = "";
              opt.forEach((row: any) => {
                queryString +=
                  "agriculturalToolsAndServiceType=" + row.value + "&";
              });
              getToolsByToolsTypeMutation.mutate(queryString, {
                onSuccess: (val: any) => {
                  const result = val.data.result;
                  setServicesIdData(FullOptionCreater(result, "id", "title"));
                },
              });
            }
          }}
        />
        <MultiSelectOption
          labelText="نام ادوات و خدمات"
          significant={true}
          hasLabel
          placeHolder="انتخاب کنید..."
          name={`machinery.${index}.servicesIds`}
          options={servicesIdData}
          isLoading={false}
          onChange={(opt) =>
            setFieldValue(`machinery.${index}.servicesIds`, opt)
          }
        />
      </div>
    </TwoColumn>
  );
};

export { NewMachinery };
