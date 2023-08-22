import classnames from "classnames";
import { Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import { Switch, useHistory, useLocation } from "react-router-dom";
import { Col, CustomInput, FormGroup, Nav, NavItem, NavLink, Row, TabContent } from "reactstrap";
import { IsSameUrl } from "../../../../../../../../core/utils";
import { useGlobalState } from "../../../../../../../../core/utils/context/GlobalContext";
import { useStatusPermission } from "../../../../../../../../core/utils/context/StatusProvider";
import { FieldWrapper, SubmitButton, Toggle } from "../../../../../../../common/Form";
import { SimpleProtectedRoute } from "../../../../../../../common/RouteComponents/SimpleProtectedRoute/SimpleProtectedRoute";
import { AlterantIndustries } from "./AlterantIndustries/AlterantIndustries";
import { Consulting } from "./Consulting/Consulting";
import { Mechanisation } from "./Mechanisation/Mechanisation";
import { MerchantServices } from "./MerchantServices/MechantServices";
import Styled from "./ServicesForm.module.scss";

interface IPropTypes {
  businessServiceData: any;
  refetchBusinessService: any;
  conversionIndustriesData: any;
  refetchConversionIndustries: any;
  consultingServicesData: any;
  isExpert: boolean;
  refetchConsultingServices: any;
  screen?: string;
  fixedOrMobieTypeByExpert?: number;
  mechanizationServicesData: any;
  refetchMechanizationServices: any;
}

const ServicesForm: React.FC<IPropTypes> = ({
  businessServiceData,
  refetchBusinessService,
  conversionIndustriesData,
  refetchConversionIndustries,
  consultingServicesData,
  refetchConsultingServices,
  isExpert,
  screen = "",
  fixedOrMobieTypeByExpert = 1,
  mechanizationServicesData,
  refetchMechanizationServices,
}) => {

  const { req_id, section_id } = useGlobalState();

  const { status, setStatus } = useStatusPermission();

  const history = useHistory();
  const location = useLocation();

  const [ initialValue , setInitialValue] = useState<any>(false)
  
  const onSubmit = (value: any) => {};

  useEffect(() => {
    if(businessServiceData && businessServiceData.data && conversionIndustriesData.data && conversionIndustriesData && consultingServicesData && consultingServicesData.data && mechanizationServicesData && mechanizationServicesData.data  ){
        
      let businessService =
        businessServiceData.data.result.businessServices;
      let conversionIndustries =
        conversionIndustriesData.data.result.conversionIndustries;
      let consultingServices =
        consultingServicesData.data.result.consultingServices;
      let mechanizationServices =
        mechanizationServicesData.data.result.agriculturalMechanizations;

      if (
        (businessService && businessService.length > 0) ||
        (conversionIndustries && conversionIndustries.length) ||
        (consultingServices && consultingServices.length) ||
        (mechanizationServices && mechanizationServices.length)
      ) {
        console.log('---2---');
        
        setInitialValue(true);
      }
    }

  }, [
    businessServiceData,
    conversionIndustriesData,
    consultingServicesData,
    mechanizationServicesData,
  ]);

  return (
    <>
      <p>
        <Row>
          <Col>
            <FormGroup>
              <span style={{lineHeight:0, marginLeft:'14px', top:'-7px', position:'relative'}}>ارائه خدمات و تولید</span>
              <CustomInput
                type="switch"
                id={"toggleInitialValue"}
                name="isBool"
                checked={initialValue}
                defaultChecked={initialValue}
                inline
                onChange={(opt: any) => {
                  setInitialValue(opt.target.checked);
                }}
              >
                
              </CustomInput>
            </FormGroup>
          </Col>
        </Row>

        {initialValue && (
          <Row>
            <Col sm="3" style={{ borderLeft: "1px solid #ccc" }}>
              <TabContent>
                <Nav vertical>
                  <NavItem className={Styled.navItemCenter}>
                    <NavLink
                      style={{ color: "#000" }}
                      className={classnames(
                        {
                          [Styled.isActive]: IsSameUrl(
                            location.pathname,
                            `${screen}/Inspection/${status}/ServicesStatus/${req_id[0]}/${section_id[0]}/consulting`
                          ),
                        },
                        { [Styled.navItemLink]: true }
                      )}
                      onClick={() => {
                        history.push(
                          `${screen}/Inspection/${status}/ServicesStatus/${req_id[0]}/${section_id[0]}/consulting`
                        );
                      }}
                    >
                      خدمات حرفه ای، مشاوره فنی و مهندسی کشاورزی
                    </NavLink>
                  </NavItem>
                  <NavItem className={Styled.navItemCenter}>
                    <NavLink
                      style={{ color: "#000" }}
                      className={classnames(
                        {
                          [Styled.isActive]: IsSameUrl(
                            location.pathname,
                            `${screen}/Inspection/${status}/ServicesStatus/${req_id[0]}/${section_id[0]}/mechanisation`
                          ),
                        },
                        { [Styled.navItemLink]: true }
                      )}
                      onClick={() => {
                        history.push(
                          `${screen}/Inspection/${status}/ServicesStatus/${req_id[0]}/${section_id[0]}/mechanisation`
                        );
                      }}
                    >
                      خدمات مکانیزاسیون کشاورزی
                    </NavLink>
                  </NavItem>
                  <NavItem className={Styled.navItemCenter}>
                    <NavLink
                      style={{ color: "#000" }}
                      className={classnames(
                        {
                          [Styled.isActive]: IsSameUrl(
                            location.pathname,
                            `${screen}/Inspection/${status}/ServicesStatus/${req_id[0]}/${section_id[0]}/alterantindustries`
                          ),
                        },
                        { [Styled.navItemLink]: true }
                      )}
                      onClick={() => {
                        history.push(
                          `${screen}/Inspection/${status}/ServicesStatus/${req_id[0]}/${section_id[0]}/alterantindustries`
                        );
                      }}
                    >
                      خدمات صنایع تبدیلی و تکمیلی
                    </NavLink>
                  </NavItem>
                  <NavItem className={Styled.navItemCenter}>
                    <NavLink
                      style={{ color: "#000" }}
                      className={classnames(
                        {
                          [Styled.isActive]: IsSameUrl(
                            location.pathname,
                            `${screen}/Inspection/${status}/ServicesStatus/${req_id[0]}/${section_id[0]}/merchantservices`
                          ),
                        },
                        { [Styled.navItemLink]: true }
                      )}
                      onClick={() => {
                        history.push(
                          `${screen}/Inspection/${status}/ServicesStatus/${req_id[0]}/${section_id[0]}/merchantservices`
                        );
                      }}
                    >
                      خدمات بازرگانی و فروش
                    </NavLink>
                  </NavItem>
                  {/* <NavItem className={Styled.navItemCenter}>
                  <NavLink
                    style={{ color: "#000" }}
                    className={classnames(
                      {
                        [Styled.isActive]: IsSameUrl(
                          location.pathname,
                          `${screen}/Inspection/${status}/ServicesStatus/${req_id[0]}/${section_id[0]}/test5`
                        ),
                      },
                      { [Styled.navItemLink]: true }
                    )}
                    onClick={() => {
                      history.push(
                        `${screen}/Inspection/${status}/ServicesStatus/${req_id[0]}/${section_id[0]}/test5`
                      );
                    }}
                  >
                    خدمات دامپزشکی
                  </NavLink>
                </NavItem> */}
                </Nav>
              </TabContent>
            </Col>
            <Col sm="9">
              <TabContent className="py-50">
                <Switch>
                  <SimpleProtectedRoute
                    component={() => (
                      <Consulting
                        consultingServicesData={consultingServicesData}
                        refetchConsultingServices={refetchConsultingServices}
                        isExpert={isExpert}
                        fixedOrMobieTypeByExpert={fixedOrMobieTypeByExpert}
                      />
                    )}
                    path={`${screen}/Inspection/:status/ServicesStatus/:req_id/:section_id/consulting`}
                    exact
                  />
                  <SimpleProtectedRoute
                    component={() => (
                      <Mechanisation
                        isExpert={isExpert}
                        fixedOrMobieTypeByExpert={fixedOrMobieTypeByExpert}
                        mechanizationServicesData={mechanizationServicesData}
                        refetchMechanizationServices={
                          refetchMechanizationServices
                        }
                      />
                    )}
                    path={`${screen}/Inspection/:status/ServicesStatus/:req_id/:section_id/mechanisation`}
                    exact
                  />
                  <SimpleProtectedRoute
                    component={() => (
                      <AlterantIndustries
                        conversionIndustriesData={conversionIndustriesData}
                        refetchConversionIndustries={
                          refetchConversionIndustries
                        }
                        isExpert={isExpert}
                        fixedOrMobieTypeByExpert={fixedOrMobieTypeByExpert}
                      />
                    )}
                    path={`${screen}/Inspection/:status/ServicesStatus/:req_id/:section_id/alterantindustries`}
                    exact
                  />
                  <SimpleProtectedRoute
                    component={() => (
                      <MerchantServices
                        businessServiceData={businessServiceData}
                        refetchBusinessService={refetchBusinessService}
                        isExpert={isExpert}
                        fixedOrMobieTypeByExpert={fixedOrMobieTypeByExpert}
                      />
                    )}
                    path={`${screen}/Inspection/:status/ServicesStatus/:req_id/:section_id/merchantservices`}
                    exact
                  />
                </Switch>
              </TabContent>
            </Col>
          </Row>
        )}
      </p>
    </>
  );
};

export { ServicesForm };
