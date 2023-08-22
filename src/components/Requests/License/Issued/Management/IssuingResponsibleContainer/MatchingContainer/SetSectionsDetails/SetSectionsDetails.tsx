import React, { FC} from "react";
import { useParams } from "react-router-dom";
import { Col, Row } from "reactstrap";
import { ToastTypes } from "../../../../../../../../core/enums";
import { useConfirmRoutingAndPlanMap } from "../../../../../../../../core/services/api";
import { showToast } from "../../../../../../../../core/utils";
import { SimpleSubmitButton } from "../../../../../../../common/Form";
import { FallBackSpinner } from "../../../../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { PrintRequestList } from "./PrintRequestList/PrintRequestList";

interface IPropTypes { 
  sections: any
  licenseRequestDetails: any
  refetch: any
}
const SetSectionsDetails: FC<IPropTypes> = ({ sections, licenseRequestDetails, refetch }) => {

  const setMutation = useConfirmRoutingAndPlanMap();
  const { req_id } = useParams<any>();

  let newSections: any = [];
  if(sections){
    const copySections: any = [...sections];
    copySections.forEach((row: any) => {
      newSections.push({
        farmName: row.farmName,
        id: row.id,
        roundedArea: parseFloat(row.area).toFixed(2),
      });
    });
  }

  return (
    <>
      {!sections ? (
        <FallBackSpinner />
      ) : (
        <>
          <Row>
            <Col>
              <PrintRequestList sections={newSections} />
            </Col>
          </Row>
          {/* <Row>
            <Col>
              <SimpleSubmitButton
                disabled={licenseRequestDetails}
                isLoading={setMutation.isLoading}
                btnText="ثبت"
                onCLick={() => {
                  const obj = {
                    licenseRequestId: +req_id,
                  };

                  setMutation.mutate(obj, {
                    onSuccess: (val: any) => {
                      showToast(["با موفقیت انجام شد."], ToastTypes.success);
                      refetch();
                    },
                  });
                }}
              />
            </Col>
          </Row> */}
        </>
      )}
    </>
  );
};

export { SetSectionsDetails };
