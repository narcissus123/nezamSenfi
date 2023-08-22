import React, { useEffect, useState } from "react";
import { Col, Row } from "reactstrap";
import { DocumentTypeEnum } from "../../../../../../../../../core/enums/document-category-type.enum";
import { useGetDocumentByDocumentCategoryTypeEnum } from "../../../../../../../../../core/services/api";
import {
  TextInput,
  FormDivider,
  Toggle,
  ModernDatePicker,
  MultiSelectOption,
} from "../../../../../../../../common/Form";
import TreeColumn from "../../../../../../../../common/Wrapper/ColumnWrapper/ThreeColumn/ThreeColumn";
import { DependentInput } from "../../../../../../../../common/Wrapper/DependentInput/DependentInput";

export interface IPropsTypes {
  values: any;
  disabled: boolean;
  setFieldValue: any;
}

const LicenseBuildingInputs: React.FC<IPropsTypes> = ({
  values,
  disabled,
  setFieldValue,
}) => {
  const [buildingLicenseDocumentsData, setBuildingLicenseDocumentsData] =
    useState<any>([
      {
        label: " انتخاب کنید ...",
        options: [],
      },
    ]);

  const getbuildingLicenseTypeMutation =
    useGetDocumentByDocumentCategoryTypeEnum();

  useEffect(() => {
    getbuildingLicenseTypeMutation.mutate(DocumentTypeEnum.Building, {
      onSuccess: (val: any) => {
        const result = val.data.result;
        const newLicenseTypes: any = [];
        result.forEach((category: any) => {
          let opt: any = [];
          category.documents.forEach((row: any) => {
            opt.push({ value: row.documentId, label: row.documentTitle });
          });

          newLicenseTypes.push({ label: category.categoryTitle, options: opt });
        });
        setBuildingLicenseDocumentsData(newLicenseTypes);
      },
    });
  }, []);

  return (
    <>
      <FormDivider textHeader="پروانه ساختمانی ">
        <Row>
          <Col
            md="3"
            style={{ display: "flex", alignItems: "center", padding: "15px" }}
          >
            {" "}
            <Toggle
              id="buildingLicense"
              name="buildingLicense"
              lableText="پروانه ساختمانی"
              significant
              disabled={disabled}
              direction="ltr"
              className="py-0 my-0"
            />
          </Col>
          {values.buildingLicense && (
            <Col md="3">
              {" "}
              <MultiSelectOption
                options={buildingLicenseDocumentsData}
                name="mainBuildingDocumentsIds"
                hasLabel
                labelText="اسناد پروانه ساختمانی"
                significant={false}
                onChange={(e) => setFieldValue("mainBuildingDocumentsIds", e)}
                isLoading={getbuildingLicenseTypeMutation.isLoading}
                placeHolder="انتخاب کنید ..."
                isDisabled={disabled}
              />
            </Col>
          )}

          {values.buildingLicense && (
            <Col md="3">
              <TextInput
                lableText="شماره پروانه ساختمانی"
                name="buildingLicenseNumber"
                id="buildingLicenseNumber"
                placeholder="شماره پروانه ساختمانی"
                significant
                disabled={disabled}
              />
            </Col>
          )}
          {values.buildingLicense && (
            <Col md="3">
              <ModernDatePicker
                lableText="تاریخ پروانه ساختمانی"
                name="buildingLicenseDate"
                placeholder="تاریخ پروانه ساختمانی"
                significant
                hasMaximum={false}
                disabled={disabled}
                initialValue={values.buildingLicenseDate}
              />
            </Col>
          )}
        </Row>
      </FormDivider>
    </>
  );
};

export { LicenseBuildingInputs };
