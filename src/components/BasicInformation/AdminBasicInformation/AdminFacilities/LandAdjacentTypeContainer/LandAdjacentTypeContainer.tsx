import React,{useContext,useState} from 'react';
import { FacilitiesWrapper } from '../FacilitiesWrapper';
import { AddLandAdjacentType } from './AddLandAdjacentType';
import { LandAdjacentTypeList } from './LandAdjacentTypeList';



 
 
export interface IAdminMachineContext{
  fetchRefresh:boolean
  setFetchRefresh:any
}

const AdminServicesTypesContext = React.createContext<IAdminMachineContext | null>(null)

export const useServicesTypesContext = () => {
  const pc = useContext(AdminServicesTypesContext);
  if (pc === null) {
    throw new Error("useRegisterContext Must be inside of Provider");
  }
  return pc;
};


const LandAdjacentTypeContainer: React.FC = () => {

  const [fetchRefresh , setFetchRefresh] = useState<boolean>(false)

  return (  
    <>
      <AdminServicesTypesContext.Provider value={
        {
          fetchRefresh,
          setFetchRefresh: () => setFetchRefresh(prev => !prev)
        }
      }>
      <FacilitiesWrapper text="ثبت و مدیریت انواع  مجاورت زمین">
        <AddLandAdjacentType />
      </FacilitiesWrapper>
      <FacilitiesWrapper text="لیست انواع  مجاورت زمین">
        <LandAdjacentTypeList />
      </FacilitiesWrapper>    
      </AdminServicesTypesContext.Provider>
    </>
  );
}
 
export { LandAdjacentTypeContainer }