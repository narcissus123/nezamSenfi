import React from "react";
import { ServicesForm } from "./ServicesForm/ServicesForm";

interface IPropTypes {
  businessServiceData: any;
  refetchBusinessService: any;
  conversionIndustriesData: any;
  refetchConversionIndustries: any;
  consultingServicesData: any;
  refetchConsultingServices: any;
  isExpert: boolean;
  screen?: string;
  fixedOrMobieTypeByExpert?: number;
  mechanizationServicesData:any
  refetchMechanizationServices:any
}

const ServicesStatus: React.FC<IPropTypes> = ({
  businessServiceData,
  refetchBusinessService,
  conversionIndustriesData,
  refetchConversionIndustries,
  consultingServicesData,
  isExpert,
  refetchConsultingServices,
  screen,
  fixedOrMobieTypeByExpert = 1,
  mechanizationServicesData,
  refetchMechanizationServices
}) => {
  return (
    <>
      <ServicesForm
        businessServiceData={businessServiceData}
        refetchBusinessService={refetchBusinessService}
        conversionIndustriesData={conversionIndustriesData}
        refetchConversionIndustries={refetchConversionIndustries}
        consultingServicesData={consultingServicesData}
        refetchConsultingServices={refetchConsultingServices}
        isExpert={isExpert}
        screen={screen}
        fixedOrMobieTypeByExpert={fixedOrMobieTypeByExpert}
        mechanizationServicesData={mechanizationServicesData}
        refetchMechanizationServices={refetchMechanizationServices}

      />
    </>
  );
};

export { ServicesStatus };
