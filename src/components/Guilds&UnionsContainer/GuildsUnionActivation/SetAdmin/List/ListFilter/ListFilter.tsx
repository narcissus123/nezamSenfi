import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { Button, Row, Col, Spinner } from "reactstrap";
import { SimpleTextInput } from "../../../../../common/Form";
import BasicSelectOption from "../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";

export interface IPropsProps {
  resetFilter?: () => void;
  getMutation: any;
  isProvinceAdmin? : boolean
  ownedProvince : any
  ownedProvinceLoading : any
  isAdminCounty : any
  ownedCounty : any
  ownedCountyLoading : any
  setOwnedCounties : any
  setFieldValue : any
  getAllCountyMutation : any
}

const ListFilter: React.FC<IPropsProps> = ({
  resetFilter,
  getMutation,
  isProvinceAdmin,
  ownedProvince,
  ownedProvinceLoading,
  isAdminCounty,
  ownedCounty,
  ownedCountyLoading,
  setOwnedCounties,
  setFieldValue,
  getAllCountyMutation
}) => {
  // const noChangeAllServiceState = [
  //   {
  //     label: " نقش را انتخاب کنید",
  //     options: [
  //       {
  //         value: UserRoleOfCountyGuildRoom.CountyGuildRoomManager,
  //         label: "مدیر اتاق اصناف شهرستان",
  //       },
  //       {
  //         value: UserRoleOfCountyGuildRoom.CountySecretariat,
  //         label: UserRolesPersian.CountySecretariat,
  //       },
  //       {
  //         value: UserRoleOfCountyGuildRoom.CountyTreasurer,
  //         label: UserRolesPersian.CountyTreasurer,
  //       },
  //     ],
  //   },
  // ];

  const [provinceList , setProvinceList] = useState<any>([
    {
      label:'سرلیست استان',
      options:[]
    },
  ])

  const history = useHistory();
  
  return (
    <>
      <Row className="d-flex align-items-start">
        {(isProvinceAdmin || isAdminCounty) && (
          <Col lg="3">
            <BasicSelectOption
              isLoading={ownedProvinceLoading}
              name="provinceId"
              placeHolder="انتخاب استان ..."
              data={ownedProvince}
              lableText="انتخاب استان"
              onChange={(opt, e) => {
                setFieldValue("provinceId", {
                  value: opt.value,
                  label: opt.label,
                });

                getAllCountyMutation.mutate(opt.value, {
                  onSuccess: (val: any) => {
                    let queryData: any = val;
                    let newOptions: any = [];
                    let newCounties: any = [
                      {
                        label: "سرلیست شهرستان",
                        options: [],
                      },
                    ];

                    queryData.data.result.forEach((row: any) => {
                      newOptions.push({ value: row.id, label: row.title });
                    });
                    newCounties[0].options = newOptions;
                    setOwnedCounties(newCounties);
                  },
                });
              }}
            />
          </Col>
        )}
        {(isAdminCounty) && (
          <Col lg="3">
            <BasicSelectOption
              isLoading={ownedCountyLoading}
              name="countyId"
              placeHolder="انتخاب شهرستان ..."
              data={ownedCounty}
              lableText="انتخاب شهرستان"
              onChange={(opt, e) => {
                setFieldValue("countyId", {
                  value: opt.value,
                  label: opt.label,
                });
                history.push(`?id=${opt.value}`)

              }}
            />
          </Col>
        )}
        <Col lg="3">
          <SimpleTextInput lableText="نام" name="name" placeholder=" نام ..." />
        </Col>

        <Col lg="3">
          <SimpleTextInput
            lableText="کد ملی"
            name="userNationalCode"
            placeholder="کد ملی ..."
          />
        </Col>
        </Row>
        <Row> 
        <Col style={{ paddingTop: "23px" }} lg="1">
          <Button
            color="primary"
            className="d-flex align-items-center justify-content-center"
            type="submit"
          >
            {getMutation.isLoading && <Spinner color="white" size="sm" />}
            <span className="ml-50">جستجو</span>
          </Button>
        </Col>
        </Row>
      
    </>
  );
};

export { ListFilter };
