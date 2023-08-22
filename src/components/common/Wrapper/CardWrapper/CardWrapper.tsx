import * as React from 'react';
import { CardHeader ,CardTitle,CardBody,Card} from 'reactstrap';

export interface IPropsTypes {
  text:string
}

const CardWrapper: React.FC<IPropsTypes> = ({children,text}) => {
  return ( 
    <> 
    <Card>
      <CardHeader>
        <CardTitle>{text}</CardTitle>
      </CardHeader>
      <CardBody>
          {children}
      </CardBody>
    </Card> 
    </>   
  );
}


export {CardWrapper};