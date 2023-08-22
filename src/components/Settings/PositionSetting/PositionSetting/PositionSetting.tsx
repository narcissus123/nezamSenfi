import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Check } from "react-feather";
import { Alert, Col, ListGroup, ListGroupItem, Row } from "reactstrap";
import { ToastTypes } from "../../../../core/enums";
import {
  FullOptionSel,
  OptionRow,
  OptionRowSel,
} from "../../../../core/models";
import {
  ConvertUtcToDate,
  getCurrentJalaliDate,
  showToast,
} from "../../../../core/utils";
import {
  CheckBoxPositionValidation,
  SetPositionValidation,
} from "../../../../core/validations/position-setting.validations";
import { ModernDatePicker } from "../../../common/Form";
import BasicSelectOption from "../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { SubmitButton } from "../../../common/Form/SubmitButtonComponent/SubmitButton/SubmitButton";
import { ComponentSpinner } from "../../../common/Spinner/LoadingSpinner";
import { CanRenderByPath } from "../../../common/Wrapper/CanRenderByPath/CanRenderByPath";
import { TwoColumn } from "../../../common/Wrapper/ColumnWrapper/TwoColumn/TwoColumn";
import { PositionCheckBox } from "./PositionCheckBox/PositionCheckBox";
import Styled from "./PositionSetting.module.scss";

export interface IPropsType {
  getProvince?: any;
  getCounty?: any;
  getUnion?: any;
  getMainLocation?: any;
  getCurPosition: any;
  useMutate: any;
}

const PositionSetting: React.FC<IPropsType> = ({
  getCounty,
  getMainLocation,
  getProvince,
  getUnion,
  getCurPosition,
  useMutate,
}) => {
  const [initialValue, setInitialValue] = useState({
    province: getProvince
      ? null
      : { value: 0, label: "یک گزینه را انتخاب کنید..." },
    county: getCounty
      ? null
      : { value: 0, label: "یک گزینه را انتخاب کنید..." },
    union: getUnion ? null : { value: 0, label: "یک گزینه را انتخاب کنید..." },
    mainLocation: getMainLocation
      ? null
      : { value: 0, label: "یک گزینه را انتخاب کنید..." },
    positionType: {
      value: 1,
      label: "پرسنلی",
    },
    positions: { value: 0, label: "یک گزینه را انتخاب کنید..." },
  });

  const [mainLocation, setMainLocation] = useState<FullOptionSel[]>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);
  const [province, setProvince] = useState<FullOptionSel[]>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);
  const [county, setCounty] = useState<FullOptionSel[]>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);
  const [union, setUnion] = useState<FullOptionSel[]>([
    {
      label: "انتخاب کنید...",
      options: [],
    },
  ]);

  const [selectOptionList, setSelectOptionList] = useState<FullOptionSel[]>([
    {
      label: " نوع شغل را انتخاب کنید",
      options: [
        {
          value: 1,
          label: "پرسنلی",
        },
        {
          value: 2,
          label: "پیمانکاری",
        },
      ],
    },
  ]);

  useEffect(() => {
    if (getMainLocation && getMainLocation.data && getMainLocation.data.data) {
      try {
        const result = getMainLocation.data.data.result;

        let mainLocation2: FullOptionSel[] = [
          {
            label: "انتخاب کنید...",
            options: [],
          },
        ];
        result.forEach((item: OptionRow) => {
          mainLocation2[0].options.push({
            value: +item.id,
            label: item.title ? item.title : "",
          });
        });
        setMainLocation(mainLocation2);
        setInitialValue((old) => ({
          ...old,
          mainLocation: mainLocation2[0].options[0],
        }));

        getCurPosition.mutate(
          {
            positionType: 1,
            mainLocationId: mainLocation2[0].options[0].value,
          },
          {
            onSuccess: (value: any) => {
              const result = value.data.result;
              let currentPositions: any = [];

              result.forEach((item: any) => {
                // currentPositions = currentPositions.filter(
                //   (curPos: any) => curPos.value !== item.id
                // );

                currentPositions.push({
                  value: item.id,
                  label: item.title,
                  fromDate: item.fromDate,
                  toDate: item.toDate,
                  isSelected: item.isSelected,
                });
              });

              setPositionList(currentPositions);
            },
          }
        );
      } catch (error) {}
    }
  }, [getMainLocation ? getMainLocation.isSuccess : false]);
  useEffect(() => {
    if (getProvince && getProvince.data && getProvince.data.data) {
      const result = getProvince.data.data.result;

      let province2: FullOptionSel[] = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      result.forEach((item: OptionRow) => {
        province2[0].options.push({
          value: +item.id,
          label: item.title ? item.title : "",
        });
      });
      setProvince(province2);
    }
  }, [getProvince ? getProvince.isSuccess : false]);

  useEffect(() => {
    if (getCounty && getCounty.data && getCounty.data.data) {
      const result = getCounty.data.data.result;

      let county2: FullOptionSel[] = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      result.forEach((county: OptionRow) => {
        county2[0].options.push({
          value: +county.id,
          label: county.title ? county.title : "",
        });
      });
      setCounty(county2);
    }
  }, [getCounty ? getCounty.isSuccess : false]);

  useEffect(() => {
    if (getUnion && getUnion.data && getUnion.data.data) {
      const result = getUnion.data.data.result;
      let unions: FullOptionSel[] = [
        {
          label: "انتخاب کنید...",
          options: [],
        },
      ];
      result.forEach((union: OptionRow | any) => {
        unions[0].options.push({
          value: union.countyUnionId,
          label: union.title ? union.title : "",
        });
      });
      setUnion(unions);
    }
  }, [getUnion ? getUnion.isSuccess : false]);

  const [positionList, setPositionList] = useState([]);

  const onSubmit = (value: any) => {
    if (!positionList.some((item: any) => item.isSelected)) {
      return showToast(["لطفا یک شغل را انتخاب کنید"], ToastTypes.error);
    }
    const positions: any = [];
    positionList.forEach((item: any) => {
      if (item.isSelected) {
        positions.push({
          positionId: item.value,
          startDate: item.fromDate,
          endDate: item.toDate,
        });
      }
    });
    const positionInProvince = {
      provinceGuildRoomId:
        value.county.value !== 0
          ? 0
          : value.province
          ? value.province.value
          : 0,
      positions: positions,
      countyUnionId: value.union ? value.union.value : 0,
      countyGuildRoomId:
        value.union.value !== 0 ? 0 : value.county ? value.county.value : 0,
      mainLoactionGuildRoomId: value.mainLocation
        ? value.mainLocation.value
        : 0,
      type: value.positionType.value,
    };

    useMutate.mutate(positionInProvince, {
      onSuccess: () => {
        showToast(["با موفقیت انجام شد"], ToastTypes.success);
      },
    });
  };

  const MainLocationUrls = ["/Position/SetMainLocationPosition"];

  const ProvinceUrls = ["/Position/SetProvincePosition"];

  const CountyUrls = ["/Position/SetCountyPosition"];

  const UnionUrls = ["/Position/SetUnionPosition"];

  const PositionTypeChange = (
    opt: OptionRowSel,
    e: any,
    setFieldValue: any,
    values: any
  ) => {
    setFieldValue("positionType", { value: opt.value, label: opt.label });
    // setFieldValue(
    //   "mainLocation",
    //   getMainLocation ? null : { value: 0, label: "یک گزینه را انتخاب کنید..." }
    // );
    // setFieldValue(
    //   "province",
    //   getProvince ? null : { value: 0, label: "یک گزینه را انتخاب کنید..." }
    // );
    // setFieldValue(
    //   "county",
    //   getCounty ? null : { value: 0, label: "یک گزینه را انتخاب کنید..." }
    // );
    // setFieldValue(
    //   "union",
    //   getUnion ? null : { value: 0, label: "یک گزینه را انتخاب کنید..." }
    // );
    setFieldValue("positions", null);

    if (getMainLocation && values.mainLocation)
      getCurPosition.mutate(
        {
          positionType: opt.value,
          mainLocationId: values.mainLocation.value,
        },
        {
          onSuccess: (value: any) => {
            const result = value.data.result;
            let currentPositions: any = [];

            result.forEach((item: any) => {
              // currentPositions = currentPositions.filter(
              //   (curPos: any) => curPos.value !== item.id
              // );

              currentPositions.push({
                value: item.id,
                label: item.title,
                fromDate: item.fromDate,
                toDate: item.toDate,
                isSelected: item.isSelected,
              });
            });

            setPositionList(currentPositions);
          },
        }
      );
    else if (getProvince && !getCounty && values.province)
      getCurPosition.mutate(
        {
          positionType: opt.value,
          provinceId: values.province.value,
        },
        {
          onSuccess: (value: any) => {
            const result = value.data.result;
            let currentPositions: any = [];

            result.forEach((item: any) => {
              // currentPositions = currentPositions.filter(
              //   (curPos: any) => curPos.value !== item.id
              // );

              currentPositions.push({
                value: item.id,
                label: item.title,
                fromDate: item.fromDate,
                toDate: item.toDate,
                isSelected: item.isSelected,
              });
            });

            setPositionList(currentPositions);
          },
        }
      );
    else if (getCounty && !getUnion && values.county)
      getCurPosition.mutate(
        {
          positionType: opt.value,
          countyId: values.county.value,
        },
        {
          onSuccess: (value: any) => {
            const result = value.data.result;
            let currentPositions: any = [];

            result.forEach((item: any) => {
              // currentPositions = currentPositions.filter(
              //   (curPos: any) => curPos.value !== item.id
              // );

              currentPositions.push({
                value: item.id,
                label: item.title,
                fromDate: item.fromDate,
                toDate: item.toDate,
                isSelected: item.isSelected,
              });
            });

            setPositionList(currentPositions);
          },
        }
      );
    else if (getUnion && values.union)
      getCurPosition.mutate(
        {
          positionType: opt.value,
          countyUnoinId: values.union.value,
        },
        {
          onSuccess: (value: any) => {
            const result = value.data.result;
            let currentPositions: any = [];

            result.forEach((item: any) => {
              // currentPositions = currentPositions.filter(
              //   (curPos: any) => curPos.value !== item.id
              // );

              currentPositions.push({
                value: item.id,
                label: item.title,
                fromDate: item.fromDate,
                toDate: item.toDate,
                isSelected: item.isSelected,
              });
            });

            setPositionList(currentPositions);
          },
        }
      );
  };

  const onProvinceChange = (
    opt: any,
    e: any,
    setFieldValue: any,
    values: any
  ) => {
    setFieldValue("province", { value: opt.value, label: opt.label });
    setFieldValue("positions", null);
    getCurPosition.mutate(
      {
        positionType: values.positionType ? +values.positionType.value : 1,
        provinceId: opt.value,
      },
      {
        onSuccess: (value: any) => {
          const result = value.data.result;
          let currentPositions: any = [];

          result.forEach((item: any) => {
            // currentPositions = currentPositions.filter(
            //   (curPos: any) => curPos.value !== item.id
            // );

            currentPositions.push({
              value: item.id,
              label: item.title,
              fromDate: item.fromDate,
              toDate: item.toDate,
              isSelected: item.isSelected,
            });
          });

          setPositionList(currentPositions);
          setFieldValue("positions", currentPositions);
        },
      }
    );
  };

  const onCountyChange = (
    opt: any,
    e: any,
    setFieldValue: any,
    values: any
  ) => {
    setFieldValue("county", { value: opt.value, label: opt.label });
    setFieldValue("positions", null);
    getCurPosition.mutate(
      {
        positionType: values.positionType ? +values.positionType.value : 1,
        countyId: opt.value,
      },
      {
        onSuccess: (value: any) => {
          const result = value.data.result;
          let currentPositions: any = [];

          result.forEach((item: any) => {
            // currentPositions = currentPositions.filter(
            //   (curPos: any) => curPos.value !== item.id
            // );

            currentPositions.push({
              value: item.id,
              label: item.title,
              fromDate: item.fromDate,
              toDate: item.toDate,
              isSelected: item.isSelected,
            });
          });

          setPositionList(currentPositions);
          setFieldValue("positions", currentPositions);
        },
      }
    );
  };

  const onCountyChangeInUnion = (
    opt: any,
    e: any,
    setFieldValue: any,
    values: any
  ) => {
    setFieldValue("county", { value: opt.value, label: opt.label });
    setFieldValue("union", null);
    setFieldValue("positions", null);
    getUnion.mutate(opt.value);
  };

  const onProvinceChangeInCounty = (
    opt: any,
    e: any,
    setFieldValue: any,
    values: any
  ) => {
    setFieldValue("province", { value: opt.value, label: opt.label });
    setFieldValue("county", null);
    setFieldValue("positions", null);
    getCounty.mutate(opt.value);
  };

  const onMainLocationChange = (
    opt: any,
    e: any,
    setFieldValue: any,
    values: any
  ) => {
    setFieldValue("mainLocation", { value: opt.value, label: opt.label });
    setFieldValue("positions", null);
    getCurPosition.mutate(
      {
        positionType: values.positionType ? +values.positionType.value : 1,
        mainLocationId: opt.value,
      },
      {
        onSuccess: (value: any) => {
          const result = value.data.result;
          let currentPositions: any = [];

          result.forEach((item: any) => {
            // currentPositions = currentPositions.filter(
            //   (curPos: any) => curPos.value !== item.id
            // );

            currentPositions.push({
              value: item.id,
              label: item.title,
              fromDate: item.fromDate,
              toDate: item.toDate,
              isSelected: item.isSelected,
            });
          });

          setPositionList(currentPositions);
          setFieldValue("positions", currentPositions);
        },
      }
    );
  };

  const onUnionChange = (opt: any, e: any, setFieldValue: any, values: any) => {
    setFieldValue("union", { value: opt.value, label: opt.label });
    setFieldValue("positions", null);
    getCurPosition.mutate(
      {
        positionType: values.positionType ? +values.positionType.value : 1,
        countyUnoinId: opt.value,
      },
      {
        onSuccess: (value: any) => {
          const result = value.data.result;
          let currentPositions: any = [];

          result.forEach((item: any) => {
            // currentPositions = currentPositions.filter(
            //   (curPos: any) => curPos.value !== item.id
            // );

            currentPositions.push({
              value: item.id,
              label: item.title,
              fromDate: item.fromDate,
              toDate: item.toDate,
              isSelected: item.isSelected,
            });
          });

          setPositionList(currentPositions);
          setFieldValue("positions", currentPositions);
        },
      }
    );
  };

  const onChangeSetPosition = (value: any, id: number, formData: any) => {
    const newVal: any = positionList.map((item: any) => {
      if (item.value === id) {
        return {
          ...item,
          isSelected: value,
          fromDate: formData.fromDate,
          toDate: formData.toDate,
        };
      } else return item;
    });
    setPositionList(newVal);
  };

  const onSubmitLocaly = (value: any) => {
    // console.log(value);
  };

  return (
    <Formik
      initialValues={initialValue}
      onSubmit={onSubmit}
      enableReinitialize
      validationSchema={SetPositionValidation}
    >
      {({ setFieldValue, errors, setFieldTouched, touched, values }) => (
        <Form>
          <div className="py-1">
            <TwoColumn>
              <div>
                <CanRenderByPath url={MainLocationUrls}>
                  <BasicSelectOption
                    data={mainLocation}
                    name="mainLocation"
                    hasLabel
                    significant
                    isDisabled
                    lableText="کشور"
                    isLoading={
                      getMainLocation ? getMainLocation.isLoading : false
                    }
                    placeHolder="انتخاب کنید..."
                    onChange={(opt, e) =>
                      onMainLocationChange(opt, e, setFieldValue, values)
                    }
                  />
                </CanRenderByPath>
                <CanRenderByPath url={ProvinceUrls}>
                  <BasicSelectOption
                    data={province}
                    name="province"
                    hasLabel
                    onChange={(opt, e) =>
                      onProvinceChange(opt, e, setFieldValue, values)
                    }
                    significant
                    lableText="استان"
                    isLoading={getProvince ? getProvince.isLoading : false}
                    placeHolder="انتخاب کنید..."
                  />
                </CanRenderByPath>

                <CanRenderByPath url={CountyUrls}>
                  <BasicSelectOption
                    data={province}
                    name="province"
                    hasLabel
                    onChange={(opt, e) =>
                      onProvinceChangeInCounty(opt, e, setFieldValue, values)
                    }
                    significant
                    lableText="استان"
                    isLoading={getProvince ? getProvince.isLoading : false}
                    placeHolder="انتخاب کنید..."
                  />
                  <BasicSelectOption
                    data={county}
                    name="county"
                    hasLabel
                    significant
                    onChange={(opt, e) =>
                      onCountyChange(opt, e, setFieldValue, values)
                    }
                    lableText="شهرستان"
                    placeHolder="انتخاب کنید..."
                    isLoading={getCounty ? getCounty.isLoading : false}
                  />
                </CanRenderByPath>

                <CanRenderByPath url={UnionUrls}>
                  <BasicSelectOption
                    data={county}
                    name="county"
                    hasLabel
                    significant
                    onChange={(opt, e) =>
                      onCountyChangeInUnion(opt, e, setFieldValue, values)
                    }
                    lableText="شهرستان"
                    placeHolder="انتخاب کنید..."
                    isLoading={getCounty ? getCounty.isLoading : false}
                  />
                  <BasicSelectOption
                    data={union}
                    name="union"
                    hasLabel
                    significant
                    lableText="اتحادیه"
                    onChange={(opt, e) =>
                      onUnionChange(opt, e, setFieldValue, values)
                    }
                    placeHolder="انتخاب کنید..."
                    isLoading={getUnion ? getUnion.isLoading : false}
                  />
                </CanRenderByPath>
              </div>
              <div className="h-100">
                <BasicSelectOption
                  lableText="نوع شغل"
                  name="positionType"
                  placeHolder="نوع شغل را انتخاب کنید"
                  data={selectOptionList}
                  isLoading={false}
                  significant
                  onChange={(opt, e) =>
                    PositionTypeChange(opt, e, setFieldValue, values)
                  }
                />
              </div>
            </TwoColumn>
            <div className={Styled["list-header-margin"]}>
              <Alert color="info" className="w-100 m-0 text-center">
                شغل های انتخاب شده
              </Alert>
            </div>
            <div>
              {getCurPosition.isLoading ? (
                <ComponentSpinner isRelative={true} />
              ) : (
                <>
                  {positionList.length > 0 && (
                    <ListGroup tag="div" className="mt-1">
                      <ListGroupItem tag="a" active className="text-center">
                        {values.positionType.label}
                      </ListGroupItem>
                      {positionList.map((item: any, index) => {
                        return (
                          <Formik
                            key={index}
                            initialValues={{
                              fromDate: item.fromDate,
                              toDate: item.toDate,
                            }}
                            onSubmit={onSubmitLocaly}
                            validationSchema={CheckBoxPositionValidation}
                          >
                            {({ values: valueFormik, submitForm }) => {
                              return (
                                <Form>
                                  <ListGroupItem
                                    tag="a"
                                    className={`d-flex justify-content-between ${Styled.responsiveList}`}
                                  >
                                    <Col
                                      sm="4"
                                      style={{ marginBottom: "15px" }}
                                    >
                                      <span>
                                        <PositionCheckBox
                                          color="primary"
                                          valueForm={valueFormik}
                                          schema={CheckBoxPositionValidation}
                                          submitForm={submitForm}
                                          icon={
                                            <Check
                                              className="vx-icon"
                                              size={16}
                                            />
                                          }
                                          label={item.label}
                                          defaultChecked={item.isSelected}
                                          onChange={(val: boolean) =>
                                            onChangeSetPosition(
                                              val,
                                              item.value,
                                              valueFormik
                                            )
                                          }
                                        />
                                      </span>
                                    </Col>
                                    <Row>
                                      <Col sm="6">
                                        <ModernDatePicker
                                          hasLabel={false}
                                          name="fromDate"
                                          placeholder="تاریخ شروع اعتبار"
                                          significant
                                          disabled={item.isSelected}
                                          initialValue={item.fromDate}
                                          hasMaximum={false}
                                          minimumDate={getCurrentJalaliDate()}
                                        />
                                      </Col>
                                      <Col sm="6">
                                        <ModernDatePicker
                                          hasLabel={false}
                                          name="toDate"
                                          placeholder="تاریخ پایان اعتبار"
                                          significant
                                          disabled={item.isSelected}
                                          hasMaximum={false}
                                          minimumDate={
                                            valueFormik.fromDate
                                              ? ConvertUtcToDate(
                                                  valueFormik.fromDate
                                                )
                                              : getCurrentJalaliDate()
                                          }
                                          initialValue={item.toDate}
                                        />
                                      </Col>
                                    </Row>
                                  </ListGroupItem>
                                </Form>
                              );
                            }}
                          </Formik>
                        );
                      })}
                    </ListGroup>
                  )}
                </>
              )}
            </div>
          </div>
          <SubmitButton
            isLoading={useMutate.isLoading}
            values={values}
            schema={SetPositionValidation}
            //isDisabled={CreateAndServiceMutation.isLoading}
          />
        </Form>
      )}
    </Formik>
  );
};

export { PositionSetting };
