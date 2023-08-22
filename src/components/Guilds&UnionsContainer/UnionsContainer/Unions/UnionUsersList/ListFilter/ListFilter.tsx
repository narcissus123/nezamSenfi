import React from 'react';
import { Button,Row,Col, Spinner} from "reactstrap"

import { UserRoleOfUnion } from '../../../../../../core/enums';
import BasicSelectOption from '../../../../../common/Form/SelectOptionComponent/BasicSelectOption/BasicSelectOption';
import { SimpleTextInput } from '../../../../../common/Form';


export interface IPropsProps {
  resetFilter?:() => void
  allUnionUserMutation : any
}
 
const ListFilter: React.FC<IPropsProps> = ({resetFilter , allUnionUserMutation}) => {

  const noChangeAllServiceState = [
    {
      label: " نقش را انتخاب کنید",
      options: [
        {
          value: UserRoleOfUnion.UnionManager,
          label: "مدیر اتحادیه",
        },
        {
          value: UserRoleOfUnion.UnionIssuingManager,
          label: "مدیر صدور اتحادیه",
        },
        {
          value: UserRoleOfUnion.UnionIssuingResponsible,
          label: "مسئول صدور اتحادیه",
        },
        {
          value: UserRoleOfUnion.UnionSecretariat,
          label: "دبیرخانه اتحادیه",
        },
        {
          value: UserRoleOfUnion.UnionExpert,
          label: "کارشناس اتحادیه",
        },
        {
          value: UserRoleOfUnion.UnionJahadExpert,
          label: "کارشناس جهاد اتحادیه",
        },
        {
          value: UserRoleOfUnion.UnionTreasurer,
          label: "خزانه دار اتحایه",
        },
      ],
    },
  ]
  
  return (
    <>
      <Row className="d-flex align-items-start">
        <Col lg="2">
          <SimpleTextInput lableText="نام" name="name" placeholder="" />
        </Col>
        <Col lg="2">
          <SimpleTextInput
            lableText="کد ملی"
            name="userNationalCode"
            placeholder=""
          />
        </Col>
        <Col lg="3">
          <BasicSelectOption
            name="userRole"
            lableText="نقش"
            placeHolder="انتخاب کنید..."
            data={noChangeAllServiceState}
            isClearable={true}
          />
        </Col>
        <Col style={{paddingTop:'23px'}} lg="5">        
        <Button
            color="primary"
            className="d-flex align-items-center justify-content-center"
            type="submit"
          >
            {allUnionUserMutation.isLoading && (
              <Spinner color="white" size="sm" />
            )}
            <span className="ml-50">جستجو</span>
          </Button>
        </Col>

      </Row>
    </>
  );
}
 
export {ListFilter}