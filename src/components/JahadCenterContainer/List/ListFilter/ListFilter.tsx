import React, { useEffect, useState } from "react";
import { Button, Row, Col, Spinner } from "reactstrap";
import { useGetAllCitiesWithPartByCountyId, useGetAllVillagesWithPartByCountyId, useGetOwnedUserCountyGuildRoomsForAdmin } from "../../../../core/services/api";
import { SimpleSubmitButton } from "../../../common/Form";
import BasicSelectOption from "../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";

export interface IPropsProps {
  getMutation:any
  setFieldValue : any
  isCountyFetching : any
  countyData : any

}

const ListFilter: React.FC<IPropsProps> = ({
  getMutation,
  setFieldValue,
  isCountyFetching,
  countyData
}) => {



  const [cityData, setCityData] = useState<any>([]);
  const [villageData, setVillageData] = useState<any>([]);


  const getAllcity = useGetAllCitiesWithPartByCountyId();
  const getAllvillage = useGetAllVillagesWithPartByCountyId();

  const onCountyChange = (opt: any, e: any, setFieldValue: any) => {
    setFieldValue("county", { value: opt.value, label: opt.label });
    setFieldValue("city", null);
    setFieldValue("village", null);

    setVillageData([]);
    setCityData([]);

    getAllcity.mutate(opt.value, {
      onSuccess: (value: any) => {
        const result = value.data.result;

        let allCity: any = [];

        result.forEach((county: any) => {
          county.citis.forEach((eachCity: any) => {
            delete Object.assign(eachCity, { value: eachCity["id"] })["id"];
            delete Object.assign(eachCity, { label: eachCity["title"] })[
              "title"
            ];
          });

          allCity.push({
            label: county.partTitle,
            options: county.citis,
          });
        });
        setCityData(allCity);
      },
    });
    getAllvillage.mutate(opt.value, {
      onSuccess: (value: any) => {
        const result = value.data.result;

        let allVillage: any = [
          {
            label: "انتخاب کنید...",
            options: [],
          },
        ];
        result.forEach((village: any) => {
          village.villages.forEach((eachVillage: any) => {
            delete Object.assign(eachVillage, { value: eachVillage["id"] })[
              "id"
            ];
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
      },
    });
  };

  const cityOnChange = (opt: any, e: any, setFieldValue: any) => {
    if(opt){
      setFieldValue("city", {
        value: opt.value,
        label: opt.label,
      });
    setFieldValue("village", null);
    }else{
      setFieldValue("city", null);
    }
    
  };

  const villageOnChange = (opt: any, e: any, setFieldValue: any) => {
    if (opt) {
      setFieldValue("village", {
        value: opt.value,
        label: opt.label,
      });
      setFieldValue("city", null);
    } else {
      setFieldValue("village", null);
    }
  };


  return (
    <>
      <Row className="d-flex align-items-start">
        <Col md="4">
          <BasicSelectOption
            isLoading={isCountyFetching}
            name="county"
            placeHolder="انتخاب شهرستان ..."
            data={countyData}
            onChange={(opt, e) => onCountyChange(opt, e, setFieldValue)}
            lableText="انتخاب شهرستان"
          />
        </Col>
        <Col md="4">
          <BasicSelectOption
            isLoading={getAllcity.isLoading}
            name="city"
            placeHolder="انتخاب شهر ..."
            data={cityData}
            lableText="شهر"
            onChange={(opt: any, e: any) => cityOnChange(opt, e, setFieldValue)}
            isClearable={true}
          />
        </Col>
        <Col md="4">
          <BasicSelectOption
            isLoading={getAllvillage.isLoading}
            name="village"
            placeHolder="انتخاب روستا ..."
            data={villageData}
            lableText="روستا"
            onChange={(opt: any, e: any) =>
              villageOnChange(opt, e, setFieldValue)
            }
            isClearable={true}
          />
        </Col>
      </Row>
      <Row>
        <Col style={{ paddingTop: "23px" }} lg="1">
          <SimpleSubmitButton
            isLoading={getMutation.isLoading}
            btnText="جستجو"
          />
        </Col>
      </Row>
    </>
  );
};

export { ListFilter };
