import React, { useContext, useEffect, useState } from 'react';
import { Formik , Form } from "formik";

import { TextInput } from '../../../../../common/Form/InputComponents/TextInputComponents/TextInput/TextInput';
import { TwoColumn } from '../../../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn';
import BasicSelectOption from '../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption';
import { TextArea } from '../../../../../common/Form/InputComponents/TextArea/TextArea';
import { SubmitButton } from '../../../../../common/Form/SubmitButtonComponent/SubmitButton/SubmitButton';
import { AddBuildingTypeValidation } from '../../../../../../core/validations/admin-building-type.validation';
import { refetchContext } from '../../../../../../core/utils/context/EventContext';
import { useCreateFacilityBuildings, useGetAllFacilityBuildings } from '../../../../../../core/services/api/parts-and-facilities.api';
import { ToastTypes } from '../../../../../../core/enums';
import { showToast } from '../../../../../../core/utils';
import { useGetSelcetOptionOfEnum } from '../../../../../../core/services/api';
import { FullOptionSel, OptionRow } from '../../../../../../core/models';



const initialValue: any = {
  name:"",
  code:"",
  order:"",
  roof:null,
  status:null,
  describe:"",
  form : null,
  buildingType: null
}



const AddBuildingType: React.FC = () => {

  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

  const createMutation = useCreateFacilityBuildings()

  const roofData = [
    {value : 1 , label : 'می باشد'},
    {value : 2 , label : 'نمی باشد'},
  ]

   const statusData = [
    {value : 1 , label : 'فعال'},
    {value : 2 , label : 'غیرفعال'},
  ]

  const [buildingTypeData, setBuildingTypeData] = useState<any>([]);
  
  const getEnumMutation = useGetSelcetOptionOfEnum();

  useEffect(() => {
    getEnumMutation.mutate("FacilityBuildingsTypeEnum", {
      onSuccess: (val) => {
        try {
          const result = val.data.result;
          let typeList: FullOptionSel[] = [
            { label: "انتخاب کنید...", options: [] },
          ];

          result.forEach((item: OptionRow) => {
            typeList[0].options.push({ value: +item.id, label: item.title });
          });

          setBuildingTypeData(typeList);
        } catch (error) {}
      },
    });
  }, []);
 


  const onSubmit = (value : any) => {

    let facilityBuildingsIds = [];

    if(value.facilityBuildingsIds){
      value.facilityBuildingsIds.forEach((row:any)=>{
        facilityBuildingsIds.push(row.id)
      })
      
    }
    
    const createBuildingObj = {
      name: value.name,
      code: value.code,
      description: value.describe,
      roofType: value.roof.value,
      status: value.status.value,
      viewOrder: value.order,
      buildingType: value.buildingType.value
    }

    createMutation.mutate(createBuildingObj,{
      onSuccess : (val : any) => {
        showToast(["با موفقیت انجام شد."], ToastTypes.success);
        const newEvent = { ...refetchEvent };
        newEvent.buildingTypeList = !newEvent.buildingTypeList;
        setRefetchEvent(newEvent);
      }
    })

  }
  

  return (  
    <>
      <Formik
        enableReinitialize={true}
        initialValues={initialValue}
        validationSchema={AddBuildingTypeValidation}
        onSubmit={onSubmit}
      >
        {({ values,setFieldValue }) => {
          return (
            <Form>
              <>
                <TwoColumn>
                  <div>
                    <TextInput
                      lableText="نام "
                      name="name"
                      placeholder="نام"
                      significant
                    />
                    <TextInput
                      lableText="کد"
                      name="code"
                      placeholder="کد"
                      significant
                    />
                    <BasicSelectOption
                      lableText="مسقف"
                      significant={true}
                      placeHolder="انتخاب کنید..."
                      name="roof"
                      data={roofData}
                      isLoading={false}
                    />

                    <BasicSelectOption
                      lableText="نوع تأسیسات"
                      significant={true}
                      placeHolder="انتخاب کنید..."
                      name="buildingType"
                      data={buildingTypeData}
                      isLoading={false}
                    />
                  </div>
                  <div>
                    <TextInput
                      lableText="ترتیب نمایش"
                      name="order"
                      placeholder="ترتیب نمایش"
                      significant
                    />
                    <BasicSelectOption
                      lableText="وضعیت"
                      significant={true}
                      placeHolder="انتخاب کنید..."
                      name="status"
                      data={statusData}
                      isLoading={false}
                    />
                    <TextArea
                      lableText="توضیحات"
                      name="describe"
                      placeholder="توضیحات"
                    />
                  </div>
                </TwoColumn>
                <SubmitButton
                  isLoading={createMutation.isLoading}
                  initialValue={initialValue}
                  schema={AddBuildingTypeValidation}
                  values={values}
                />
              </>
            </Form>
          );
        }}
      </Formik>
    </>
  );
}
 
export { AddBuildingType }