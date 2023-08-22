import React, { FC } from "react";
import { useParams } from "react-router";
import { Card, CardBody } from "reactstrap";
import { useGetLicenseRequestHistoryByExpert } from "../../../../../../../core/services/api";
import { FormDivider } from "../../../../../../common/Form";
import { HistoryLicenseRequest } from "../../HistoryLicenseRequest/HistoryLicenseRequest";

import Styles from "./HistoryComponent.module.scss";

interface IUserType {
 
}
interface IPropTypes {

}

const HistoryComponent: FC<IPropTypes> = ({  }) => {

  const { id } = useParams<any>();
  
  return (
    <Card>
      <CardBody>
        <FormDivider textHeader="تاریخچه درخواست">
          <CardBody>
            <HistoryLicenseRequest
              getMutation={useGetLicenseRequestHistoryByExpert}
              isOpen={true}
              id={+id}
            />
          </CardBody>
        </FormDivider>
      </CardBody>
    </Card>
  );
};

export { HistoryComponent };
