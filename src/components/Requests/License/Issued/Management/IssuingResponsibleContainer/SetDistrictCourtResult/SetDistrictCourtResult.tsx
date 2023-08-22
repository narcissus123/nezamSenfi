import { Form, Formik } from "formik";
import React, { FC, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { CardBody } from "reactstrap";
import { ToastTypes } from "../../../../../../../core/enums";
import {
  useGetCurrentDistrictCourIntersectionByIssuingResponsuble,
  useSetDistrictCourtResult,
} from "../../../../../../../core/services/api";
import { showToast } from "../../../../../../../core/utils";
import { SetDistrictValidate } from "../../../../../../../core/validations/set-district-result.validations";
import {
  FileInput,
  FormDivider,
  ModernDatePicker,
  SubmitButton,
  TextArea,
  TextInput,
} from "../../../../../../common/Form";
import { ListTable } from "../../../../../../common/ListTable/ListTable";
import { CardWrapper } from "../../../../../../common/Wrapper/CardWrapper";
import { TwoColumn } from "../../../../../../common/Wrapper/ColumnWrapper/TwoColumn";
import { columns } from "./Columns";

interface ISetDistrict {
  letterNumber: string;
  letterDate: string;
  files: FileList | any;
  description: string;
}

const SetDistrictCourtResult: FC = () => {
  const [intersectData, setIntersectData] = useState<any[]>([]);
  const [intersectId, setIntersectId] = useState<any[]>([]);

  const { id } = useParams<{ id: string }>();

  const getCurrentIntersect =
    useGetCurrentDistrictCourIntersectionByIssuingResponsuble();
  const setDistrict = useSetDistrictCourtResult();

  useEffect(() => {
    const currentListPage = {
      page: 1,
      pageSize: 100,
      licenseRequestId: +id,
    };

    getCurrentIntersect.mutate(currentListPage, {
      onSuccess: (val) => {
        try {
          const result = val.data.result;
          console.log(result.items);
          setIntersectData(result.items);
          let userIntersect: any = [];
          result.items.forEach((item: any) => {
            userIntersect.push({
              intersectionLicenseRequestId: item.licenseRequestId,
              districtCourtResultEnum: 1,
            });
          });

          setIntersectId(userIntersect);
        } catch (error) {}
      },
    });
  }, []);

  const history = useHistory();

  const onSubmit = (values: ISetDistrict) => {
    if (!values.files) {
      return showToast(["لطفا فایل ها را بارگذاری کنید"], ToastTypes.error);
    }
    const formData = new FormData();

    if (values.files && values.files.length > 0) {
      values.files.forEach((item: File) => {
        formData.append("Files", item);
      });
    }

    formData.append("LicenseRequestId", id);
    formData.append("LetterDate", values.letterDate);
    formData.append("LetterNumber", values.letterNumber);
    formData.append("Description", values.description);

    intersectId.forEach((item, index) => {
      formData.append(
        `Results[${index}].IntersectionLicenseRequestId`,
        item.intersectionLicenseRequestId.toString()
      );
      formData.append(
        `Results[${index}].DistrictCourtResultEnum`,
        item.districtCourtResultEnum.toString()
      );
    });

    setDistrict.mutate(formData, {
      onSuccess: () => {
        showToast(["با موفقیت انجام شد"], ToastTypes.success);
        history.push(
          `/ManageLicense/IssuingResponsible/Matching/11/ExpertDetails/${id}`
        );
      },
    });
  };

  return (
    <CardWrapper text="">
      <FormDivider textHeader="تکمیل اطلاعات پاسخ هیات بدوی">
        <CardBody>
          <Formik
            initialValues={{
              letterNumber: "",
              letterDate: "",
              files: null,
              description: "",
            }}
            onSubmit={onSubmit}
            enableReinitialize
            validationSchema={SetDistrictValidate}
          >
            {({ values, setFieldValue }) => (
              <Form>
                <TwoColumn>
                  <>
                    <TextInput
                      name="letterNumber"
                      placeholder="شماره نامه را وارد کنید..."
                      lableText="شماره نامه"
                      significant
                    />

                    <TextArea
                      lableText="توضیحات"
                      name="description"
                      placeholder="توضیحات را وارد کنید..."
                      significant
                    />

                    {/* <InpuLable significant lableText="وضعیت بخش ها" />
                    <CheckBoxList
                      data={checkBoxData}
                      setCheckBoxData={setCheckBoxData}
                    /> */}
                  </>

                  <>
                    <ModernDatePicker
                      name="letterDate"
                      lableText="تاریخ نامه"
                      placeholder="...تاریخ نامه را وارد کنید"
                      significant
                    />

                    <FileInput
                      files={values.files}
                      setFieldValue={(val: any) => setFieldValue("files", val)}
                      outLine
                    />
                  </>
                </TwoColumn>

                <hr />

                <ListTable
                  columns={columns}
                  isLoading={getCurrentIntersect.isLoading}
                  onPageChange={({ page, pageSize }) => {}}
                  pageCountList={0}
                  tableData={intersectData}
                  customPageSize={1000}
                  getCustomProps={{ setIntersectId: setIntersectId }}
                >
                  {{ headerTable: <p></p> }}
                </ListTable>

                <SubmitButton
                  isLoading={setDistrict.isLoading}
                  btnText="ثبت"
                  values={values}
                  schema={SetDistrictValidate}
                />
              </Form>
            )}
          </Formik>
        </CardBody>
      </FormDivider>
    </CardWrapper>
  );
};

export { SetDistrictCourtResult };
