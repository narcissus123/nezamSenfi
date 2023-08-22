import * as React from 'react';
import {Row,Col} from "reactstrap"
import { SimpleTextInput } from '../../../common/Form';

export interface IPropsProps {
  
}
 
const RealUserListFilter: React.FC<IPropsProps> = () => {
  return (  
    <>
      <Row>
        <Col lg="3">
          <SimpleTextInput lableText="نام" name="name" placeholder="نام"/>       
        </Col>
        <Col lg="3">
          <SimpleTextInput lableText="نام خانوادگی" name="lastName" placeholder="نام خانوادگی"/>                            
        </Col>
        <Col lg="3">
          <SimpleTextInput lableText="کد ملی" name="nationalCode" placeholder="کد ملی"/>                         
        </Col>
        <Col lg="3">
          <SimpleTextInput lableText="ایمیل" name="email" placeholder="ایمیل" />                         
        </Col>
      </Row>
    </>
  );
}
 
export {RealUserListFilter}