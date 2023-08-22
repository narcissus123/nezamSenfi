import React, { FC } from "react";
import { Plus } from "react-feather";
import { useHistory, useParams } from "react-router-dom";
import { Button, Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import { LicenseRequestStatusEnum } from "../../../../../../../../core/enums/license-request-status.enums";
import { ListTable } from "../../../../../../../common/ListTable/ListTable";

import { columns } from "./Columns";

interface IPropTypes {
  sectionIds: { sectionId: number }[];
  isLoading: boolean;
  status: number;
  licenseRequestDetails: any;
  setSectionIds: any;
}

const PiecesList: FC<IPropTypes> = ({
  sectionIds,
  isLoading,
  status,
  licenseRequestDetails,
  setSectionIds
}) => {
  const history = useHistory();

  const { id } = useParams<{ id: string }>();

  return (
    <Card>
      <CardHeader>
        <CardTitle>اطلاعات قطعه (ها)</CardTitle>
      </CardHeader>
      <CardBody>
        <ListTable
          columns={columns}
          isLoading={isLoading}
          onPageChange={() => {}}
          pageCountList={0}
          tableData={sectionIds}
          customPageSize={100}
          getCustomProps={{
            status: status,
            rejectStatus: licenseRequestDetails.rejectExpertStatus,
            setSectionIds: setSectionIds
          }}
        >
          {{
            headerTable: (
              <Button
                className="mb-1"
                size="md"
                color="primary"
                outline
                disabled={
                  (status !== LicenseRequestStatusEnum.Expertise &&
                    status !== LicenseRequestStatusEnum.Matching) ||
                  (licenseRequestDetails &&
                    status === LicenseRequestStatusEnum.Matching &&
                    licenseRequestDetails.rejectExpertStatus !== 1)
                }
                onClick={() => history.push(`/License/Land/Track/${id}`)}
              >
                <Plus size={18} stopColor="white" />
                &nbsp; قطعه جدید
              </Button>
            ),
          }}
        </ListTable>
      </CardBody>
    </Card>
  );
};

export { PiecesList };
