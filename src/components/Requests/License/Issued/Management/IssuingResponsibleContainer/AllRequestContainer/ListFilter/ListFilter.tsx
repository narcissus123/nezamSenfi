import React, { useEffect, useState } from "react";
import { Button, Row, Col, Spinner } from "reactstrap";
import { LicenseRequestStatusData } from "../../../../../../../../core/data/license-requests-status.data";
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
  ownedUserUnion?: any;
  submitForm: () => void;
}

const ListFilter: React.FC<IPropsProps> = ({
  setFieldValue,
  getMutation,
  onResetClick,
  ownedUserUnion,
  submitForm,
}) => {
  const [userUnionOption, setUserUnionOption] = useState<FullOptionSel[] | any>(
    []
  );
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

  const getAllcity = useGetAllCitiesWithPartByCountyId();
  const getAllvillage = useGetAllVillagesWithPartByCountyId();

  useEffect(() => {
    if (ownedUserUnion?.isSuccess) {
      try {
        const result = ownedUserUnion.data.data.result.unions;
        let userUnion: FullOptionSel[] | any = [
          { label: "انتخاب کنید...", options: [] },
        ];

        result.forEach((row: any) => {
          userUnion[0].options.push({
            value: row.unionId,
            label: row.unionTitle,
            countyId: row.countyId,
            countyTitle: row.countyTitle,
          });
        });

        setUserUnionOption(userUnion);
        setFieldValue("unionId", userUnion[0].options[0]);
        console.log(userUnion);

        getAllcity.mutate(userUnion[0].options[0].countyId);
        getAllvillage.mutate(userUnion[0].options[0].countyId);
        submitForm();
        setTimeout(() => {
          setFieldValue("unionId", userUnion[0].options[0]);
        }, 100);
      } catch (error) {}
    }
  }, [ownedUserUnion?.isSuccess]);

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

  const [fixedOrMobieTypeData, setFixedOrMobieTypeData] = useState<any>([
    {
      label: "انتخاب کنید...",
      options: [
        { value: 1, label: "ثابت" },
        { value: 2, label: "سیار" },
      ],
    },
  ]);

  const onUnionChange = (opt: any, e: any) => {
    setFieldValue("unionId", opt);

    getAllcity.mutate(opt.countyId);
    getAllvillage.mutate(opt.countyId);
    setFieldValue("cityId", null);
    setFieldValue("villageId", null);
  };

  const onCityChange = (opt: any, e: any) => {
    setFieldValue("cityId", {
      value: opt.value,
      label: opt.label,
    });
    setFieldValue("villageId", null);
  };

  const onVillageChange = (opt: any, e: any) => {
    setFieldValue("villageId", {
      value: opt.value,
      label: opt.label,
    });
    setFieldValue("cityId", null);
  };

  return (
    <>
      <Row className="d-flex align-items-start">
        <Col md="3">
          <BasicSelectOption
            lableText="نوع واحد صنفی"
            placeHolder="انتخاب کنید..."
            name="fixedOrMobieType"
            data={fixedOrMobieTypeData}
          />
        </Col>

        <Col lg="3">
          <BasicSelectOption
            isLoading={ownedUserUnion ? ownedUserUnion.isLoading : false}
            name="unionId"
            placeHolder="انتخاب اتحادیه ..."
            data={userUnionOption}
            lableText="انتخاب اتحادیه"
            onChange={onUnionChange}
          />
        </Col>

        <Col lg="3">
          <BasicSelectOption
            lableText="شهر محل سکونت"
            name="cityId"
            placeHolder="انتخاب کنید..."
            data={city}
            isLoading={getAllcity.isLoading}
            onChange={onCityChange}
          />
        </Col>
        <Col lg="3">
          <BasicSelectOption
            lableText="روستاي محل سکونت"
            placeHolder="انتخاب کنید..."
            name="villageId"
            data={village}
            isLoading={getAllvillage.isLoading}
            onChange={onVillageChange}
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
