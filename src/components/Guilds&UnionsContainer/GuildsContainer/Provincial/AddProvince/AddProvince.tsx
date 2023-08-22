import { Formik , Form } from "formik";
import React, { FC, useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { useSetProvinceGuildRoom } from "../../../../../core/services/api/guilds.api";
import { useGetAllNotDefineProvinceGuildRoom } from "../../../../../core/services/api/location.api";
import { showToast } from "../../../../../core/utils/show-toast";
import { GuildsAddProvinceValidate } from "../../../../../core/validations/guilds-add-province.validations";
import BasicSelectOption from "../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { SubmitButton } from "../../../../common/Form/SubmitButtonComponent/SubmitButton/SubmitButton";
import { TextArea } from "../../../../common/Form/InputComponents/TextArea/TextArea";
import { TextInput } from "../../../../common/Form/InputComponents/TextInputComponents/TextInput/TextInput";

interface IPropTypes {
  setFetchRefresh : () => void
}

const AddProvince: FC<IPropTypes> = ({setFetchRefresh}) => {
  const [provinceList , setProvinceList] = useState<any>([])

  const [initialValues , setInitialValues] = useState<any>({
    provinceName : null , 
    provinceDescription : "",
    fakeName : ""
  })

  const {isLoading , refetch , isError , data } = useGetAllNotDefineProvinceGuildRoom()
  const addProvinceGuildMutation = useSetProvinceGuildRoom()

  useEffect(() => {
    if (data) {
      if (data.data) {
        if (data && data.data.result) {
          let newProvinces = [
            {
              label: "سرلیست استان",
              options: [],
            },
          ];
          let newOptions: any = [];
          data.data.result.forEach((row: any) => {
            newOptions.push({ value: row.id, label: row.title });
          });
          newProvinces[0].options = newOptions;
          setProvinceList(newProvinces);
        }
      }
    }
  }, [data]);
  
  return (
      <>
       <Formik
        enableReinitialize={true}
        initialValues={initialValues}
        validationSchema={GuildsAddProvinceValidate}
        onSubmit={(value) => {
          const obj = {
            title: value.provinceName.label,
            description: value.provinceDescription,
            provinceId: value.provinceName.value
          }
          addProvinceGuildMutation.mutate(obj, {
            onSuccess: (val: any) => {

              setFetchRefresh();
              refetch();
              setInitialValues({
                provinceName : null , 
                provinceDescription : "",
                fakeName : ""
              })
              showToast(["با موفقیت اضافه شد!"], "success");
            },
            onError: (err: any) => {
              showToast(["مشکلی پیش آمد!"], "error");
            },
          });
        }}
      >
        {({ values, errors, handleChange, touched, getFieldProps , setFieldValue }) => {
          return (
            <Form>
              <>
                <Row>
                  <Col md="6">
                    <BasicSelectOption
                      isLoading={isLoading}
                      significant={true}
                      name="provinceName"
                      placeHolder="انتخاب استان ..."
                      data={provinceList}
                      lableText="انتخاب استان"
                      onChange={(opt , e)=>{
                        setFieldValue('provinceName',{value : opt.value , label : opt.label})
                        setFieldValue('fakeName',`اتاق صنفی برای ${opt.label}`)
                      }}
                    />
                  </Col>
                  <Col md="6">
                   <TextInput id="fakeName" lableText="نام اتاق" name="fakeName" placeholder="" disabled  />
                  </Col>
                </Row>
                <Row>
                  <Col md="6">
                    <TextArea
                      name="provinceDescription"
                      lableText="توضیحات"
                      placeholder="توضیحات ..."
                      id="provinceDescription"
                    />
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <SubmitButton
                      isLoading={addProvinceGuildMutation.isLoading}
                      schema={GuildsAddProvinceValidate}
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

export { AddProvince };
