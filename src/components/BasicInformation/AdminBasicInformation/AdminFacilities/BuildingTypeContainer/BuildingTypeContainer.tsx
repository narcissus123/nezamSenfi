import React,{useContext,useState} from 'react';
import { FacilitiesWrapper } from '../FacilitiesWrapper';
import { AddBuildingType } from './AddBuildingType';
import { ListBuildingType } from './ListBuildingType';


 
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


const BuildingTypeContainer: React.FC = () => {

  const [fetchRefresh , setFetchRefresh] = useState<boolean>(false)

  return (  
    <>
      <AdminServicesTypesContext.Provider value={
        {
          fetchRefresh,
          setFetchRefresh: () => setFetchRefresh(prev => !prev)
        }
      }>
      <FacilitiesWrapper text="ثبت و مدیریت انواع ساختمان و تاسیسات">
        <AddBuildingType />
      </FacilitiesWrapper>
      <FacilitiesWrapper text="لیست انواع انواع ساختمان و تاسیسات">
        <ListBuildingType />
      </FacilitiesWrapper>    
      </AdminServicesTypesContext.Provider>
    </>
  );
}
 
export { BuildingTypeContainer }