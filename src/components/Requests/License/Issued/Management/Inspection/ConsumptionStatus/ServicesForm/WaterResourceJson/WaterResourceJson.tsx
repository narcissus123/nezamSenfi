import { Field, Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { CardBody, Col, Row } from "reactstrap";
import {
  FullOptionSel,
  OptionRow,
} from "../../../../../../../../../core/models";
import { useGetSelcetOptionOfEnum } from "../../../../../../../../../core/services/api";
import { fullOption } from "../../../../../../../../../core/utils";
import { WaterResourceJsonValidation } from "../../../../../../../../../core/validations/water-consumption.validations";
import {
  FormDivider,
  ModernDatePicker,
  SubmitButton,
  TextInput,
} from "../../../../../../../../common/Form";
import BasicSelectOption from "../../../../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption";
import { ListTable } from "../../../../../../../../common/ListTable/ListTable";
import { columns } from "./Columns";

interface IPropTypes {
  setTableData: (val: any) => void;
  tableData: any;
  waterResource: any;
  isExpert: boolean;
}

const WaterResourceJson: FC<IPropTypes> = ({
  setTableData,
  tableData,
  waterResource,
  isExpert,
}) => {
  const [amountOfWaterSupplied, setAmountOfWaterSupplied] = useState<
    FullOptionSel[]
  >([]);

  const WaterResourceEnumOption: FullOptionSel[] = [
    {
      label: "انتخاب کنید...",
      options: [
        { value: 1, label: "چاه سطحی " },
        { value: 2, label: "چاه نیمه عمیق " },
        { value: 3, label: "چاه عمیق " },
        { value: 4, label: "آب بندان" },
        { value: 5, label: "سد " },
        { value: 6, label: "آب شهری / روستایی " },
        { value: 7, label: "رودخانه نقلی " },
        { value: 8, label: "رودخانه پمپاژ " },
      ],
    },
  ];

  const WaterUsePerHourEnumOption: FullOptionSel[] = [
    {
      label: "انتخاب کنید...",
      options: [
        { value: 1, label: "1 ساعت" },
        { value: 2, label: "2 ساعت" },
        { value: 3, label: "3 ساعت" },
        { value: 4, label: "4 ساعت" },
        { value: 5, label: "5 ساعت" },
        { value: 6, label: "6 ساعت" },
        { value: 7, label: "7 ساعت" },
        { value: 8, label: "8 ساعت" },
        { value: 9, label: "9 ساعت" },
        { value: 10, label: "10 ساعت" },
        { value: 11, label: "11 ساعت" },
        { value: 12, label: "12 ساعت" },
        { value: 13, label: "13 ساعت" },
        { value: 14, label: "14 ساعت" },
        { value: 15, label: "15 ساعت" },
        { value: 16, label: "16 ساعت" },
        { value: 17, label: "17 ساعت" },
        { value: 18, label: "18 ساعت" },
        { value: 19, label: "19 ساعت" },
        { value: 20, label: "20 ساعت" },
        { value: 21, label: "21 ساعت" },
        { value: 22, label: "22 ساعت" },
        { value: 23, label: "23 ساعت" },
        { value: 24, label: "24 ساعت" },
      ],
    },
  ];

  const licenseStatusOption: FullOptionSel[] = [
    {
      label: "انتخاب کنید...",
      options: [
        { value: 1, label: "دارای مجوز" },
        { value: 2, label: "فاقد مجوز" },
      ],
    },
  ];
  const licenseTypeOption: FullOptionSel[] = [
    {
      label: "انتخاب کنید...",
      options: [
        {
          value: 1,
          label: "پروانه بهره برداری",
        },
        {
          value: 2,
          label: "گواهی یا تاییدیه بهره برداری",
        },
      ],
    },
  ];

  const licenseCreditOption: FullOptionSel[] = [
    {
      label: "انتخاب کنید...",
      options: [
        { value: 1, label: "دارای اعتبار" },
        {
          value: 2,
          label: "فاقد اعتبار",
        },
      ],
    },
  ];

  const [listInitialValue, setListInitialValue] = useState<any>({
    licenseStatus: null,
    waterSupplyCenter: null,
    waterInOneLevelHour: null,
    waterSupplied: null,
    licenseType: null,
    licenseNumber: "",
    issueDate: "",
    waterResourceLicenseCreditEnum: null,
    id: null,
  });

  useEffect(() => {
    if (waterResource && waterResource.length > 0) {
      let oldListTable: any[] = [];
      waterResource.forEach((item: any) => {
        oldListTable.push({
          licenseStatus: fullOption(
            item.waterResourceLicenseStatus,
            licenseStatusOption
          ),
          waterSupplyCenter: fullOption(
            item.waterResourceEnum,
            amountOfWaterSupplied
          ),
          waterInOneLevelHour: fullOption(
            item.waterUsePerHourEnum,
            amountOfWaterSupplied
          ),
          waterSupplied: fullOption(
            item.theAmountOfWaterSupplied,
            amountOfWaterSupplied
          ),
          licenseType: fullOption(
            item.waterResourceLicenseType,
            licenseTypeOption
          ),
          licenseNumber: item.licenseNumber,
          issueDate: item.licenseDate,
          waterResourceLicenseCreditEnum: fullOption(
            item.waterResourceLicenseCreditEnum,
            licenseCreditOption
          ),
        });

        setTableData(oldListTable);
      });
    }
  }, [waterResource, amountOfWaterSupplied]);

  const getAmountOfWaterSupplied = useGetSelcetOptionOfEnum();

  useEffect(() => {
    getAmountOfWaterSupplied.mutate("TheAmountOfWaterSupplied", {
      onSuccess: (val) => {
        const result = val.data.result;
        let amountOfWaterList: FullOptionSel[] = [
          { label: "انتخاب کنید...", options: [] },
        ];
        result.forEach((item: OptionRow) => {
          amountOfWaterList[0].options.push({
            value: +item.id,
            label: item.title,
          });
        });

        setAmountOfWaterSupplied(amountOfWaterList);
      },
    });
  }, []);

  const onSubmit = (values: any, { resetForm }: any) => {
    if (values.id) {
      const index = tableData.findIndex(({ id }: any) => id === values.id);
      const allJsons = tableData;
      allJsons[index] = values;
      setTableData([]);
      setTableData(allJsons);
    } else
      setTableData((old: any) => [
        ...old,
        {
          ...values,
          id:
            old.length > 0
              ? Math.max.apply(
                  Math,
                  old.map((o: any) => o.id)
                ) + 1
              : 1,
        },
      ]);
    setListInitialValue({
      licenseStatus: null,
      waterSupplyCenter: null,
      waterInOneLevelHour: null,
      waterSupplied: null,
      licenseType: null,
      licenseNumber: "",
      issueDate: "",
      waterResourceLicenseCreditEnum: null,
      id: null,
    });
    resetForm();
  };

  return (
    <Formik
      initialValues={listInitialValue}
      onSubmit={onSubmit}
      enableReinitialize
      validationSchema={WaterResourceJsonValidation}
    >
      {({ values, resetForm }) => (
        <Form>
          <FormDivider textHeader="منبع آب">
            <CardBody>
              <Field name="id" style={{ display: "none" }} />
              <Row>
                <Col sm="6">
                  <BasicSelectOption
                    lableText="منبع تامین آب"
                    name="waterSupplyCenter"
                    data={WaterResourceEnumOption}
                    isDisabled={!isExpert}
                    placeHolder="انتخاب کنید ..."
                    significant
                  />
                </Col>
                <Col sm="6">
                  <BasicSelectOption
                    lableText="آب مصرفی در هر محله به ساعت"
                    name="waterInOneLevelHour"
                    isDisabled={!isExpert}
                    data={WaterUsePerHourEnumOption}
                    placeHolder="انتخاب کنید..."
                    significant
                  />
                </Col>

                <Col sm="6">
                  <BasicSelectOption
                    lableText="میزان حجم آب تامین شده (لیتر بر ثانیه)"
                    name="waterSupplied"
                    isDisabled={!isExpert}
                    data={amountOfWaterSupplied}
                    placeHolder="انتخاب کنید ..."
                    significant
                  />
                </Col>
                <Col sm="6">
                  <BasicSelectOption
                    lableText="وضعیت مجوز"
                    name="licenseStatus"
                    data={licenseStatusOption}
                    isDisabled={!isExpert}
                    placeHolder="انتخاب کنید ..."
                    significant
                  />
                </Col>
                {values.licenseStatus && values.licenseStatus.value === 1 && (
                  <Col sm="6">
                    <BasicSelectOption
                      lableText="نوع مجوز"
                      name="licenseType"
                      isDisabled={!isExpert}
                      data={licenseTypeOption}
                      placeHolder="انتخاب کنید ..."
                      significant
                    />
                  </Col>
                )}

                {values.licenseStatus && values.licenseStatus.value === 1 && (
                  <>
                    <Col sm="6">
                      <TextInput
                        lableText="شماره مجوز"
                        disabled={!isExpert}
                        name="licenseNumber"
                        placeholder="شماره مجوز را وارد کنید..."
                        significant
                      />
                    </Col>

                    <Col sm="6">
                      <ModernDatePicker
                        lableText="تاریخ صدور"
                        name="issueDate"
                        placeholder="تاریخ اعتبار"
                        initialValue={values.issueDate}
                        disabled={!isExpert}
                        // hasMaximum
                        significant
                      />
                    </Col>
                  </>
                )}

                {values.licenseStatus && values.licenseStatus.value === 1 && (
                  <Col sm="6">
                    <BasicSelectOption
                      lableText="اعتبار مجوز منابع آب"
                      name="waterResourceLicenseCreditEnum"
                      data={licenseCreditOption}
                      isDisabled={!isExpert}
                      placeHolder="انتخاب کنید ..."
                      significant
                    />
                  </Col>
                )}
              </Row>
              {isExpert && (
                <SubmitButton
                  isLoading={false}
                  btnText={values.id ? "ویرایش" : "ثبت"}
                  // submitOutLine
                  values={values}
                  clearable
                  clearableTxt="پاکسازی"
                  onClear={() => {
                    resetForm();
                    setListInitialValue({
                      licenseStatus: null,
                      waterSupplyCenter: null,
                      waterInOneLevelHour: null,
                      waterSupplied: null,
                      licenseType: null,
                      licenseNumber: "",
                      issueDate: "",
                      waterResourceLicenseCreditEnum: null,
                    });
                  }}
                  schema={WaterResourceJsonValidation}
                />
              )}
              <hr />
              <ListTable
                columns={columns}
                isLoading={false}
                onPageChange={() => {}}
                customPageSize={1000}
                pageCountList={0}
                getCustomProps={{
                  setTableData: setTableData,
                  setListInitialValue: setListInitialValue,
                  isExpert,
                }}
                tableData={tableData}
              ></ListTable>
            </CardBody>
          </FormDivider>
        </Form>
      )}
    </Formik>
  );
};

export { WaterResourceJson };
