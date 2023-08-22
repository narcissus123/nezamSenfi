export interface ICreateServicesType {
  title:string
}
export interface IUpdateServicesType {
  title:string
  id:number
}

export interface ICreateServicesName {
  title:string
  agriculturalToolsTypeId: {value:null | number,label:string}
}
export interface IUpdateServicesName {
  title:string
  id:number
  agriculturalToolsTypeId: {value:null | number,label:string}
}