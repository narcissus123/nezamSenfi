import { DocumentTypeEnumPersian } from "../enums/document-category-type-persian.enum";
import { DocumentTypeEnum } from "../enums/document-category-type.enum";
import { FullOptionSel } from "../models";

export const DocumentCategoryData: FullOptionSel[] = [
  {
    label: "انتخاب کنید...",
    options: [
      {
        value: DocumentTypeEnum.IdentityDocuments,
        label: DocumentTypeEnumPersian.IdentityDocuments,
      },
      {
        value: DocumentTypeEnum.Building,
        label: DocumentTypeEnumPersian.Building,
      },
      {
        value: DocumentTypeEnum.Facilities,
        label: DocumentTypeEnumPersian.Facilities,
      },
      {
        value: DocumentTypeEnum.ActivityLicense,
        label: DocumentTypeEnumPersian.ActivityLicense,
      },
      { value: DocumentTypeEnum.Well, label: DocumentTypeEnumPersian.Well },
      {
        value: DocumentTypeEnum.OwenerShip,
        label: DocumentTypeEnumPersian.OwenerShip,
      },
      {
        value: DocumentTypeEnum.EducationalDocuments_PhdPlus,
        label: DocumentTypeEnumPersian.EducationalDocuments_PhdPlus,
      },
      {
        value: DocumentTypeEnum.EducationalDocuments_Phd,
        label: DocumentTypeEnumPersian.EducationalDocuments_Phd,
      },
      {
        value: DocumentTypeEnum.EducationalDocuments_Master,
        label: DocumentTypeEnumPersian.EducationalDocuments_Master,
      },
      {
        value: DocumentTypeEnum.EducationalDocuments_Bachelor,
        label: DocumentTypeEnumPersian.EducationalDocuments_Bachelor,
      },
      {
        value: DocumentTypeEnum.EducationalDocuments_CertificatePlus,
        label: DocumentTypeEnumPersian.EducationalDocuments_CertificatePlus,
      },
      {
        value: DocumentTypeEnum.EducationalDocuments_Certificate,
        label: DocumentTypeEnumPersian.EducationalDocuments_Certificate,
      },
      {
        value: DocumentTypeEnum.EducationalDocuments_MiddleSchoolDegree,
        label: DocumentTypeEnumPersian.EducationalDocuments_MiddleSchoolDegree,
      },
      {
        value: DocumentTypeEnum.Certificate1,
        label: DocumentTypeEnumPersian.Certificate1,
      },
      {
        value: DocumentTypeEnum.Certificate2,
        label: DocumentTypeEnumPersian.Certificate2,
      },
      {
        value: DocumentTypeEnum.LackOfbackgroundDocuments,
        label: DocumentTypeEnumPersian.LackOfbackgroundDocuments,
      },
      {
        value: DocumentTypeEnum.NoAddictionDocuments,
        label: DocumentTypeEnumPersian.NoAddictionDocuments,
      },
      {
        value: DocumentTypeEnum.HaveEndCArd,
        label: DocumentTypeEnumPersian.HaveEndCArd,
      },
      {
        value: DocumentTypeEnum.HaveExemptionCard,
        label: DocumentTypeEnumPersian.HaveExemptionCard,
      },
      {
        value: DocumentTypeEnum.Official,
        label: DocumentTypeEnumPersian.Official,
      },
    ],
  },
];