import { Formik , Form } from "formik";
import React, { FC, useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { useGetAllNotDefineUnionInCounty, usePostCreateCountyUnion } from "../../../../../core/services/api";

import { showToast } from "../../../../../core/utils";
import { AddUnionValidate } from "../../../../../core/validations/add-unions.validations";
import BasicSelectOption from "../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { SubmitButton } from "../../../../common/Form";



interface IPropTypes {
  setFetchRefresh : () => void,
  unionsQuery : any
}

const AddUnion: FC<IPropTypes> = ({setFetchRefresh , unionsQuery}) => {
  const [unionList , setUnionList] = useState<any>([])
  const [countyList , setCountyList] = useState<any>([])

  const getCountyUnionMutation = useGetAllNotDefineUnionInCounty()
    const addUnionGuildMutation = usePostCreateCountyUnion()

  const [initialValues , setInitialValues] = useState<any>({
    unionName : null , 
    unionCounty : null , 
    fakeName : ""
  })

  useEffect(()=>{
    if(unionsQuery.data){
      let queryData : any = unionsQuery.data
       let newOptions : any = []
      let newCounties = [
        {
          label: "سرلیست استان",
          options: [],
        },
      ];
       
      queryData.data.result.forEach((row : any)=>{
        newOptions.push({value : row.id , label : row.countyTitle})
      })
      newCounties[0].options = newOptions
      setCountyList(newCounties);
    }
  },[unionsQuery.isSuccess , unionsQuery.data])

  useEffect(()=>{
    if(getCountyUnionMutation.data){
      let unionData : any = getCountyUnionMutation.data
      let newOptions : any = []
      let newUnions = [
        {
          label: "لیست اتحادیه ها",
          options: [],
        },
      ];
      unionData.data.result.forEach((row : any)=>{
        newOptions.push({value : row.id , label : row.title})
      })
      newUnions[0].options = newOptions
      
      setUnionList(newUnions);
    }

  },[getCountyUnionMutation.isSuccess , getCountyUnionMutation.data])

  const onSubmit = (value:any , {setFieldValue , resetForm}:any) => {
    const unionValues = {
      unionId: value.unionName.value,
      countyId: value.unionCounty.value
    }
     addUnionGuildMutation.mutate(unionValues,{onSuccess:(val:any)=>{
      
       setFetchRefresh()
       resetForm()
       getCountyUnionMutation.mutate(value.unionCounty.value)
       showToast(['با موفقیت اضافه شد!'],"success")
     },onError:(err:any)=>{  
       showToast(['مشکلی پیش آمد!'],"error")
     }})
  }

  return (
      <>
       <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={AddUnionValidate}
        onSubmit={onSubmit}
      >
        {({ values, errors, handleChange, touched, getFieldProps , setFieldValue }) => {
          return (
            <Form>
              <>
                <Row>
                  <Col md="6">
                    <BasicSelectOption
                      isLoading={unionsQuery.isLoading}
                      significant={true}
                      name="unionCounty"
                      placeHolder="انتخاب شهرستان ..."
                      data={countyList}
                      lableText="انتخاب شهرستان"
                      onChange={(opt,e)=>{
                        setFieldValue('unionCounty' , {value:opt.value , label : opt.label})
                        getCountyUnionMutation.mutate(opt.value)
                      }}
                    />
                  </Col>
                  <Col md="6">
                    <BasicSelectOption
                      isLoading={getCountyUnionMutation.isLoading}
                      significant={true}
                      name="unionName"
                      placeHolder="انتخاب اتحادیه ..."
                      data={unionList}
                      lableText="انتخاب اتحادیه"
                      onChange={(opt, e) => {
                        setFieldValue("unionName", {
                          value: opt.value,
                          label: opt.label,
                        });
                        setFieldValue(
                          "fakeName",
                          `اتاق صنفی برای ${opt.label}`
                        );
                      }}
                    />
                  </Col>
                  {/* <Col md="6">
                   <TextInput id="fakeName" lableText="نام اتاق" name="fakeName" placeholder="" disabled  />
                  </Col> */}
                </Row>
                <Row>
                  <Col>
                    <SubmitButton
                      isLoading={addUnionGuildMutation.isLoading} 
                      schema={AddUnionValidate}
                      values={values}
                      initialValue={initialValues}
                    />
                  </Col>
                </Row>
              </>
            </Form>
          );
        }}
      </Formik>
      </>
  )
  
};

export { AddUnion };
