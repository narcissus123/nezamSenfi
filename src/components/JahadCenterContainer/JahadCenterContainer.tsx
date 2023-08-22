import { Formik, Form } from "formik";
import React, {  useContext, useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { ToastTypes } from "../../core/enums";
import { useGetAllCitiesWithPartByCountyId, useGetAllVillagesWithPartByCountyId, useGetOwnedUserCountyGuildRoomsForAdmin } from "../../core/services/api";
import { useAddJahadCenter } from "../../core/services/api/jahad-center.api";
import { showToast } from "../../core/utils";
import { refetchContext } from "../../core/utils/context/EventContext";
import { AddJahadCenterValidate } from "../../core/validations/add-jahad-center.validation";
import { MultiSelectOption, SubmitButton, TextArea, TextInput } from "../common/Form";
import BasicSelectOption from "../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { List } from "./List/List";




const JahadCenterContainer = () => {


  const [initialValue , setInitialValue] = useState<any>({
    county : null,
    title : "",
    description : "",
    code : "",
    city : null ,
    village : null
  })
  const [countyData, setCountyData] = useState<any>([]);
  const [cityData, setCityData] = useState<any>([]);
  const [villageData, setVillageData] = useState<any>([]);

  const addMutation = useAddJahadCenter();

  const { data , isFetching , isSuccess} = useGetOwnedUserCountyGuildRoomsForAdmin()
  const getAllcity = useGetAllCitiesWithPartByCountyId();
  const getAllvillage = useGetAllVillagesWithPartByCountyId();

  const { refetchEvent, setRefetchEvent } = useContext(refetchContext);

  useEffect(() => {
    if (data) {
      let queryData: any = data;
      let newOptions: any = [];
      let newCounties = [
        {
          label: "سرلیست شهرستان",
          options: [],
        },
      ];

      queryData.data.result.forEach((row: any) => {
        newOptions.push({
          value: row.id,
          label: `${row.countyTitle ? row.countyTitle : ""} (${row.title ? row.title : ""})`
          
        });
      });
      newCounties[0].options = newOptions;
      setCountyData(newCounties);
    }
  }, [isSuccess, data]);


  
  const onCountyChange = (opt: any, e: any, setFieldValue: any) => {
    setFieldValue("county", { value: opt.value, label: opt.label });
    setFieldValue("city", null );
    setFieldValue("village", null );

    setVillageData([])
    setCityData([])

    getAllcity.mutate(opt.value , {
      onSuccess : (value : any ) => {
        const result = value.data.result;

        let allCity: any = [];
  
        result.forEach((county: any) => {
          county.citis.forEach((eachCity: any) => {
            delete Object.assign(eachCity, { value: eachCity["id"] })["id"];
            delete Object.assign(eachCity, { label: eachCity["title"] })["title"];
          });
  
          allCity.push({
            label: county.partTitle,
            options: county.citis,
          });
        });
        setCityData(allCity);
      }
    });
    getAllvillage.mutate(opt.value ,{
      onSuccess : (value : any ) => {
        const result = value.data.result;

      let allVillage: any = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      result.forEach((village: any) => {
        village.villages.forEach((eachVillage: any) => {
          delete Object.assign(eachVillage, { value: eachVillage["id"] })["id"];
          delete Object.assign(eachVillage, { label: eachVillage["title"] })[
            "title"
          ];
        });

        allVillage.push({
          label: village.partTitle,
          options: village.villages,
        });
      });
      setVillageData(allVillage);
       
      }
    })
  };


  const onSubmit = (values:any) => {

    let cityOrVillageIds : Array<number> = []

    
    if(values.city){
      values.city.forEach((row: any) => {
        cityOrVillageIds.push(row.value);
      });
    }
    
    if (values.village) {
      values.village.forEach((row: any) => {
        cityOrVillageIds.push(row.value);
      });
    }


    const addJahadObj = {
      countyId: values.county.value,
      title: values.title,
      description: values.description,
      code: values.code,
      cityOrVillageIds: cityOrVillageIds,
    };

    addMutation.mutate(addJahadObj , {onSuccess : (val : any) => {
      showToast(["با موفقیت انجام شد."], ToastTypes.success);
      const newEvent = { ...refetchEvent };
      newEvent.jahadCenterList = !newEvent.jahadCenterList;
      setRefetchEvent(newEvent);
    }})
  }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>افزودن مرکز جهاد</CardTitle>
        </CardHeader>
        <CardBody>


          <Formik
            enableReinitialize={true}
            initialValues={initialValue}
            validationSchema={AddJahadCenterValidate}
            onSubmit={onSubmit}
          >
            {({
              values,
              errors,
              handleChange,
              touched,
              getFieldProps,
              setFieldValue,
            }) => {
              console.log("---file", values.File);
              return (
                <Form>
                  <Row>
                    <Col sm="4">
                      <TextInput
                        name="title"
                        placeholder="نام مرکز جهاد را وارد کنید"
                        lableText="نام"
                        significant
                      />
                    </Col>
                    <Col sm="4">
                      <TextInput
                        name="code"
                        placeholder="کد مرکز جهاد را وارد کنید"
                        lableText="کد"
                        significant
                      />
                    </Col>
                    <Col sm="4">
                      <BasicSelectOption
                        isLoading={isFetching}
                        significant={true}
                        name="county"
                        placeHolder="انتخاب شهرستان ..."
                        data={countyData}
                        onChange={(opt, e) =>
                          onCountyChange(opt, e, setFieldValue)
                        }
                        lableText="انتخاب شهرستان"
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="4">
                      <TextArea
                        lableText="توضیحات"
                        name="description"
                        placeholder="توضیحات"
                      />
                    </Col>
                    <Col sm="4">
                      <MultiSelectOption
                        labelText="شهر"
                        name="city"
                        placeHolder="انتخاب کنید..."
                        significant={false}
                        options={cityData}
                        onChange={(e) => setFieldValue("city", e)}
                        isLoading={getAllcity.isLoading}
                        hasLabel={true}
                      />
                    </Col>
                    <Col sm="4">
                      <MultiSelectOption
                        labelText="روستا"
                        name="village"
                        placeHolder="انتخاب کنید..."
                        significant={false}
                        options={villageData}
                        onChange={(e) => setFieldValue("village", e)}
                        isLoading={getAllvillage.isLoading}
                        hasLabel={true}
                      />
                    </Col>
                  </Row>
                  <Row>
                    <Col sm="4">
                      <SubmitButton
                        isLoading={addMutation.isLoading}
                        schema={AddJahadCenterValidate}
                        values={values}
                        initialValue={initialValue}
                      />
                    </Col>
                  </Row>
                </Form>
              );
            }}
          </Formik>
        </CardBody>
      </Card>
    
      <List />

   
    </>
  );
};

export { JahadCenterContainer };
