import { Formik , Form } from "formik";
import React, { FC, useContext, useEffect, useState } from "react";
import { UseQueryResult } from "react-query";
import { Col, Row } from "reactstrap";
import {  useGetAllNotDefineCountyGuildRoomByProvinceId, useSetCountyGuildRoom } from "../../../../../core/services/api";
import { refetchContext } from "../../../../../core/utils/context/EventContext";
import { showToast } from "../../../../../core/utils";
import { GuildsAddCountyValidate } from "../../../../../core/validations/guilds-add-county.validations";
import BasicSelectOption from "../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { SubmitButton } from "../../../../common/Form";
import { TextArea } from "../../../../common/Form";
import { TextInput } from "../../../../common/Form";


interface IPropTypes {
  provinceQuery:UseQueryResult
}

const AddCounty: FC<IPropTypes> = ({ provinceQuery}) => {


  const [countyList , setCountyList] = useState<any>([
    {
      label:'سرلیست شهرستان',
      options:[]
    },
  ])
    const [provinceList , setProvinceList] = useState<any>([
    {
      label:'سرلیست استان',
      options:[]
    },
  ])
  const getNotDefinedCountyByProvinceIdMutation = useGetAllNotDefineCountyGuildRoomByProvinceId()

  useEffect(()=>{
    if(provinceQuery.data){
      let queryData : any = provinceQuery.data
       let newOptions : any = []
      let newProvinces = [
        {
          label: "سرلیست استان",
          options: [],
        },
      ];
       
      queryData.data.result.forEach((row : any)=>{
        newOptions.push({value : row.id , label : row.proviceTitle})
      })
      newProvinces[0].options = newOptions
      setProvinceList(newProvinces);
    }
  },[provinceQuery.isSuccess , provinceQuery.data])

  const {refetchEvent,setRefetchEvent} = useContext(refetchContext)

    useEffect(()=>{
    if(getNotDefinedCountyByProvinceIdMutation.data){
      let countyData : any = getNotDefinedCountyByProvinceIdMutation.data
      let newOptions : any = []
      let newCounties = [
        {
          label: "سرلیست شهرستان ها",
          options: [],
        },
      ];
      countyData.data.result.forEach((row : any)=>{
        newOptions.push({value : row.id , label : row.title})
      })
      newCounties[0].options = newOptions
      setCountyList(newCounties);
    }

  },[getNotDefinedCountyByProvinceIdMutation.isSuccess , getNotDefinedCountyByProvinceIdMutation.data])

  const [initialValues , setInitialValues] = useState<any>({
    provinceName : null,
    countyName : null , 
    countyDescription : "",
    fakeName : ""
  })

  const addCountyGuildMutation = useSetCountyGuildRoom()
  
  const onSubmit = (value:any) => {
    const countyInfo = {
      title: value.countyName.label,
      description: value.countyDescription,
      countyId: value.countyName.value,
    };
    addCountyGuildMutation.mutate(countyInfo, {
      onSuccess: (val: any) => {
        setInitialValues({
          provinceName : null ,
          countyName : null , 
          countyDescription : "",
          fakeName : ""
        })
        const newEvent = {...refetchEvent}
        newEvent.countyGuildList = !newEvent.countyGuildList
        setRefetchEvent(newEvent)
        showToast(["با موفقیت اضافه شد!"], "success");
      },
      onError: (err: any) => {
        showToast(["مشکلی پیش آمد!"], "error");
      },
    });
  }

  return (
      <>
       <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={GuildsAddCountyValidate}
        onSubmit={onSubmit}
      >
        {({ values, errors, handleChange, touched, getFieldProps , setFieldValue }) => {
          return (
            <Form>
              <>
                <Row>
                  <Col md="6">
                    <BasicSelectOption
                      isLoading={provinceQuery.isLoading}
                      significant={true}
                      name="provinceName"
                      placeHolder="انتخاب استان ..."
                      data={provinceList}
                      lableText="انتخاب استان"
                      onChange={(opt,e)=>{
                        setFieldValue('provinceName' , {value : opt.value , label : opt.label})
                        setFieldValue('countyName' , null)
                        getNotDefinedCountyByProvinceIdMutation.mutate(opt.value)
                      }}
                    />
                  </Col>
                  <Col md="6">
                    <BasicSelectOption
                      isLoading={getNotDefinedCountyByProvinceIdMutation.isLoading}
                      significant={true}
                      name="countyName"
                      placeHolder="انتخاب شهرستان ..."
                      data={countyList}
                      lableText="انتخاب شهرستان"
                      onChange={(opt , e) => {
                        setFieldValue('countyName' , {value : opt.value , label : opt.label})
                        setFieldValue('fakeName' , `اتاق صنفی شهرستان ${opt.label}`)
                      }}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <TextInput
                      id="fakeName"
                      lableText="نام اتاق"
                      name="fakeName"
                      placeholder=""
                      disabled
                    />
                  </Col>
                  <Col md="6">
                    <TextArea
                      name="countyDescription"
                      lableText="توضیحات"
                      placeholder="توضیحات ..."
                      id="countyDescription"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <SubmitButton
                      isLoading={addCountyGuildMutation.isLoading}
                      schema={GuildsAddCountyValidate}
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

export { AddCounty };
