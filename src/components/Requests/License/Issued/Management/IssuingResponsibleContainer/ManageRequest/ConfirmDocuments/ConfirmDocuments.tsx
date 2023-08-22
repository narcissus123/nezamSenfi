import React, { FC, useEffect, useState } from "react";
import { useHistory, useParams } from "react-router-dom";
import { Card, CardBody } from "reactstrap";
import { ToastTypes } from "../../../../../../../../core/enums";
import {
  useGetRequirementDocumentOfLicenseRequest,
  useSetConfirmationOfLicenseRequestDocumentation,
} from "../../../../../../../../core/services/api";
import { showToast } from "../../../../../../../../core/utils";
import {
  FormDivider,
  SimpleSubmitButton,
  SubmitButton,
} from "../../../../../../../common/Form";
import { ListTable } from "../../../../../../../common/ListTable/ListTable";
import { CheckConfirmModal } from "./CheckConfirmModal/CheckConfirmModal";
import { CheckRejectModal } from "./CheckRejectModal/CheckRejectModal";
import { columns } from "./Columns";

interface IDocument {
  title: string;
  documents: {
    id: number;
    title: string;
    isConfirm: boolean;
    files: string[];
    userInfoId: number;
  }[];
}

const ConfirmDocuments: FC = () => {
  const [isConfirmAll, setIsConfirmAll] = useState<boolean>(false);
  const [isRejectAll, setIsRejectAll] = useState<boolean>(false);
  const [tableData, setTableData] = useState<IDocument[]>([]);
  const [documentIds, setDocumentIds] = useState<number[]>([]);
  const { id } = useParams<{ id: string }>();
  const history = useHistory();

  const getDocuments = useGetRequirementDocumentOfLicenseRequest(+id);
  const confirmDocument = useSetConfirmationOfLicenseRequestDocumentation();

  useEffect(() => {
    if (getDocuments.isSuccess) {
      const result: any = getDocuments.data.data.result;
      console.log(result);

      try {
        const localTableData: IDocument[] = [];
        let docIds: number[] = [];
        result.forEach((item: any) => {
          let local: IDocument = { title: item.title, documents: [] };

          item.documents.forEach((doc: any) => {
            let label: string = doc.documentTitle;
            if (doc.userLicenseDocumentId) {
              label += ` با درخواست به شماره ${doc.licenseId}`;
              if (doc.sectionId) {
                label += ` و قطعه به شماره ${doc.sectionId} به مساحت ${doc.sectionArea}`;
                if (doc.cityOdVillageTitle) {
                  label += ` در ${doc.cityOdVillageTitle}`;
                }
                if (doc.farmName) {
                  label += ` در ${doc.farmName}`;
                }
              } else if (doc.cityOdVillageTitle) {
                label += ` در ${doc.cityOdVillageTitle}`;
              }
              if (doc.requirementDocumentStatusTitle) {
                label += ` (${doc.requirementDocumentStatusTitle})`;
              }
            }

            local.documents.push({
              title: label,
              id: doc.userLicenseDocumentId
                ? doc.userLicenseDocumentId
                : doc.documentId,
              isConfirm: doc.isConfirm,
              files: doc.files,
              userInfoId: doc.userInfoId,
            });

            if (item.isConfirm) docIds.push(doc.documentId);
          });

          localTableData.push(local);
        });

        setTableData(localTableData);

        setDocumentIds(docIds);
      } catch (error) {}
    }
  }, [getDocuments.isSuccess]);

  const onSubmit = () => {
    const documentObj: {
      licenseRequestId: number;
      userLIcenseDocumentIds: number[];
    } = {
      licenseRequestId: +id,
      userLIcenseDocumentIds: documentIds,
    };

    confirmDocument.mutate(documentObj, {
      onSuccess: () => {
        showToast(["با موفقیت ثبت گردید"], ToastTypes.success);
        // history.push("/ManageLicense/IssuingResponsible/MyCartable");
      },
    });
  };

  return (
    <Card>
      <CardBody>
        <CheckConfirmModal
          isOpen={isConfirmAll}
          toggleModal={() => setIsConfirmAll(false)}
          backdrop
        />
        {isRejectAll && (
          <CheckRejectModal
            isOpen={isRejectAll}
            toggleModal={() => setIsRejectAll(false)}
            backdrop
          />
        )}
        <FormDivider textHeader="دریافت اصل اسناد">
          <CardBody>
            <ListTable
              columns={columns}
              isLoading={getDocuments.isLoading}
              onPageChange={() => {}}
              pageCountList={0}
              tableData={tableData}
              customPageSize={10}
              getCustomProps={{ setDocumentIds: setDocumentIds }}
            ></ListTable>

            <SimpleSubmitButton
              isLoading={confirmDocument.isLoading}
              disabled={confirmDocument.isLoading || getDocuments.isLoading}
              btnText="ثبت اسناد"
              onCLick={onSubmit}
              outLine
            />
          </CardBody>
        </FormDivider>
        <SubmitButton
          isLoading={false}
          clearable
          btnText="تایید نهایی"
          clearableTxt="رد اسناد"
          onClick={() => setIsConfirmAll(true)}
          onClear={() => setIsRejectAll(true)}
        />
      </CardBody>
    </Card>
  );
};

export { ConfirmDocuments };
