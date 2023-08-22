// ------------------------------ machineType ----------------------------------
export interface ICreateMachineType {
  title: string;
}
export interface IUpdateMachineType {
  title: string;
  id: number;
}

// ------------------------------ ManufacturerType ----------------------------------
export interface ICreateManufacturerType {
  title: string;
}

// ------------------------------ Insurance ----------------------------------
export interface ICreateInsurance {
  title: string;
}
export interface ICreateJobCategory {
  title: string;
  code: string;
  jobSubClassId: number;
}
export interface ICreateJob {
  title: string;
  code: string;
  jubSubSectionId: number;
  useTypeId : number
}
export interface IUpdateInsurance {
  title: string;
  id: number;
}
// ------------------------------ Machine ----------------------------------
export interface ICreateMachine {
  title: string;
  productionType: number | null;
}
export interface IUpdateMachine {
  productionType: any;
  title: string;
  id: number;
}
