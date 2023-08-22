import React from 'react';
import { Col, Row } from 'reactstrap';

export interface IPropsType {
  style?:any,
  className?:string
}
 
const TreeColumn: React.FC<IPropsType> = ({children,style,className}) => {
  const childrenArray = React.Children.toArray(children)
  return (  
    <Row className={className} style={style}>
      <Col lg="4" md="6" sm="12" >
        {childrenArray[0]}
      </Col>
      <Col lg="4" md="6" sm="12" >
        {childrenArray[1]}
      </Col>
      <Col lg="4" md="6" sm="12" >
        {childrenArray[2]}
      </Col>          
  </Row>
  );
}
 
export default TreeColumn;