import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { FullOptionSel } from "../../../../../../../../core/models";
import {
  useGetAllCitiesWithPartByCountyId,
  useGetAllCountyByProvinceId,
  useGetAllprovinces,
  useGetAllVillagesWithPartByCountyId,
  useGetCountyUnionByCountyId,
} from "../../../../../../../../core/services/api";
import { SubmitButton } from "../../../../../../../common/Form";
import BasicSelectOption from "../../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";

export interface IPropsProps {
  setFieldValue: any;
  getMutation: any;
  onResetClick: any;
  jahadCenter: FullOptionSel[];
  isJahadLoading: boolean;
}

const ListFilter: React.FC<IPropsProps> = ({
  setFieldValue,
  getMutation,
  onResetClick,
  jahadCenter,
  isJahadLoading,
}) => {
  const [ownedProvince, setOwnedProvince] = useState<any>([]);
  const [ownedCounties, setOwnedCounties] = useState<any>([]);
  const [city, setCity] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);
  const [village, setVillage] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const { data, isSuccess, isFetching } = useGetAllprovinces();
  const getAllCountyMutation = useGetAllCountyByProvinceId();
  const getAllUnionMutation = useGetCountyUnionByCountyId();
  const getAllcity = useGetAllCitiesWithPartByCountyId();
  const getAllvillage = useGetAllVillagesWithPartByCountyId();

  useEffect(() => {
    if (getAllcity.data && getAllcity.data.data) {
      const result = getAllcity.data.data.result;

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
      setCity(allCity);
    }
  }, [getAllcity.isSuccess]);

  useEffect(() => {
    if (getAllvillage.data && getAllvillage.data.data) {
      const result = getAllvillage.data.data.result;

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
      setVillage(allVillage);
    }
  }, [getAllvillage.isSuccess]);

  useEffect(() => {
    if (data) {
      let queryData: any = data;
      let newOptions: any = [];
      let newProvinces: any = [
        {
          label: "سرلیست استان",
          options: [],
        },
      ];

      queryData.data.result.forEach((row: any) => {
        newOptions.push({ value: row.id, label: row.title });
      });
      newProvinces[0].options = newOptions;
      setOwnedProvince(newProvinces);
    }
  }, [isSuccess]);

  return (
    <>
      <Row className="d-flex align-items-start">
        <Col md="4">
          <BasicSelectOption
            lableText="مرکز جهاد"
            placeHolder="انتخاب کنید..."
            name="jahadCenterId"
            data={jahadCenter}
            isLoading={isJahadLoading}
          />
        </Col>
        <Col lg="4">
          <BasicSelectOption
            isLoading={isFetching}
            name="provinceId"
            placeHolder="انتخاب استان ..."
            data={ownedProvince}
            lableText="انتخاب استان"
            onChange={(opt, e) => {
              if (opt) {
                setFieldValue("provinceId", {
                  value: opt.value,
                  label: opt.label,
                });

                setFieldValue("countyId", null);
                setFieldValue("cityId", null);
                setFieldValue("villageId", null);
                setOwnedCounties([]);
                setCity([]);
                setVillage([]);
                setFieldValue("unionId", null);

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
              }
            }}
          />
        </Col>
        <Col lg="4">
          <BasicSelectOption
            isLoading={getAllCountyMutation.isLoading}
            name="countyId"
            placeHolder="انتخاب شهرستان ..."
            data={ownedCounties}
            lableText="انتخاب شهرستان"
            onChange={(opt, e) => {
              if (opt) {
                setFieldValue("countyId", {
                  value: opt.value,
                  label: opt.label,
                });

                getAllcity.mutate(opt.value);
                getAllvillage.mutate(opt.value);
                setFieldValue("cityId", null);
                setFieldValue("villageId", null);
                setFieldValue("unionId", null);
                setCity([]);
                setVillage([]);
              }
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col lg="4">
          <BasicSelectOption
            lableText="شهر محل سکونت"
            name="cityId"
            placeHolder="انتخاب کنید..."
            data={city}
            isLoading={getAllcity.isLoading}
            onChange={(opt: any, e: any) => {
              setFieldValue("cityId", {
                value: opt.value,
                label: opt.label,
              });
              setFieldValue("villageId", null);
            }}
          />
        </Col>
        <Col lg="4">
          <BasicSelectOption
            lableText="روستاي محل سکونت"
            placeHolder="انتخاب کنید..."
            name="villageId"
            data={village}
            isLoading={getAllvillage.isLoading}
            onChange={(opt: any, e: any) => {
              setFieldValue("villageId", {
                value: opt.value,
                label: opt.label,
              });
              setFieldValue("cityId", null);
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col style={{ paddingTop: "23px" }} lg="1">
          <SubmitButton
            isLoading={getMutation.isLoading}
            btnText="جستجو"
            clearable
            clearableDisable={getMutation.isLoading}
            clearableTxt="پاکسازی"
            onClear={onResetClick}
          />
        </Col>
      </Row>
    </>
  );
};

export { ListFilter };
