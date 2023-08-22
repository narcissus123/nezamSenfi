export interface IMachinery {
  plateNumber:number            // شماره پلاک
  engineNumber:number           // شماره موتور
  chassisNumber:number         // شماره شاسی
  serialNumberOrModel:number  //  مودل /شماره سریال
  locationOfServices:number   // نام محل ارایه خدمات
  typeOfOwnership:number  // نوع مالکیت
  userInfoId:number
  machineryId:number // نام ماشین
  typeMachineId:number  // نوع ماشین
  machineManufacturerId:number // نام شرکت سازنده
  
  thirdPartyInsuranceId:number
  hallInsuranceId:number
  thirdPartyInsuranceValidityDate: string,
  hallInsuranceValidityDate: string,
  hallInsuranceStatus: boolean,    // بیمه بدنه
  thirdPartyInsuranceStatus: boolean,  // بیمه شخص ثالث

  typeOfMachineUse:number  // نوع استفاده از ماشین
}
