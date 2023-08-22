import * as React from 'react';
import { UnionsContainer } from '../../../components/Guilds&UnionsContainer/UnionsContainer/UnionsContainer';

export interface UnionsProps {
  
}
 
const Unions: React.FC<UnionsProps> = () => {
  return (  
    <>

       <UnionsContainer /> 
    </>
  );
}
 
export {Unions};