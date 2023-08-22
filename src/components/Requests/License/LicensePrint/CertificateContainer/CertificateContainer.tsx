import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { SimpleSubmitButton } from "../../../../common/Form";
import { FallBackSpinner } from "../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import Style from './CertificateContainer.module.scss';



interface IPropTypes {
  getMutation: any;
}

const CertificateContainer: FC<IPropTypes> = ({ getMutation }) => {
  //@ts-ignore
  document.getElementsByTagName("body")[0].style.backgroundColor = "#fff";

  const [details, setDetails] = useState<any>({});
  const [waterSourceEmptySize, setWaterSourceEmptySize] = useState<any>(new Array(10));
  const [waterSource, setWaterSource] = useState<any>([]);

  const [sectionActivityInfosEmptySize, setSetectionActivityInfosEmptySize] = useState<any>(new Array(23));
  const [sectionActivityInfos, setSectionActivityInfos] = useState<any>([]);


  const [topographySectionsEmptySize, setTopographySectionsEmptySize] = useState<any>(new Array(10));
  const [topographySections, setTopographySections] = useState<any>([]);

  const [sectionAgriculturalMechanizationServicesEmptySize, setSectionAgriculturalMechanizationServicesEmptySize] = useState<any>(new Array(10));
  const [sectionAgriculturalMechanizationServices, setSectionAgriculturalMechanizationServices] = useState<any>([]);
  
  
  const [sectionProductInfosEmptySize, setSectionProductInfosEmptySize] = useState<any>(new Array(10));
  const [sectionProductInfos, setSectionProductInfos] = useState<any>([]);


  const [productionFactorCosumptionInfoSectionsEmptySize, setProductionFactorCosumptionInfoSectionsEmptySize] = useState<any>(new Array(20));
  const [productionFactorCosumptionInfoSections, setProductionFactorCosumptionInfoSections] = useState<any>([]);


  const getDetailsMutation = getMutation();
  const { id, section_id } = useParams<any>();

  useEffect(() => {
    getDetailsMutation.mutate(+id, {
      onSuccess: (val: any) => {
        const result = val.data.result;

        let arr: any = [];
        if (result.waterSupplySpecificationsSections.length) {
          for (
            let i = 0;
            i <= 9 - result.waterSupplySpecificationsSections.length;
            i++
          ) {
            arr.push("t");
          }
          setWaterSourceEmptySize(arr);
          setWaterSource(result.waterSupplySpecificationsSections)
        }


        let activityArr: any = [];
        if (result.sectionActivityInfos.length) {
          for (
            let i = 0;
            i <= 22 - result.sectionActivityInfos.length;
            i++
          ) {
            activityArr.push("t");
          }
          setSetectionActivityInfosEmptySize(activityArr);
          setSectionActivityInfos(result.sectionActivityInfos)
        }


        let topographySectionsEmptySize: any = [];
        if (result.topographySections.length) {
          for (
            let i = 0;
            i <= 9 - result.topographySections.length;
            i++
          ) {
            topographySectionsEmptySize.push("t");
          }
          setTopographySectionsEmptySize(topographySectionsEmptySize);
          setTopographySections(result.topographySections);
        }
        



        let sectionAgriculturalMechanizationServices: any = [];
        if (result.sectionAgriculturalMechanizationServices.length) {
          for (
            let i = 0;
            i <= 9 - result.sectionAgriculturalMechanizationServices.length;
            i++
          ) {
            sectionAgriculturalMechanizationServices.push("t");
          }
          setSectionAgriculturalMechanizationServicesEmptySize(sectionAgriculturalMechanizationServices);
          setSectionAgriculturalMechanizationServices(result.sectionAgriculturalMechanizationServices);
        }



        let sectionProductInfos: any = [];
        if (result.sectionProductInfos.length) {
          for (
            let i = 0;
            i <= 9 - result.sectionProductInfos.length;
            i++
          ) {
            sectionProductInfos.push("t");
          }
          setSectionProductInfosEmptySize(sectionProductInfos);
          setSectionProductInfos(result.sectionProductInfos);
        }
        

        let productionFactorCosumptionInfoSections: any = [];
        if (result.productionFactorCosumptionInfoSections.length) {
          for (
            let i = 0;
            i <= 19 - result.productionFactorCosumptionInfoSections.length;
            i++
          ) {
            productionFactorCosumptionInfoSections.push("t");
          }
          setProductionFactorCosumptionInfoSectionsEmptySize(productionFactorCosumptionInfoSections);
          setProductionFactorCosumptionInfoSections(
            result.productionFactorCosumptionInfoSections
          );
        }

      },
    });
  }, []);

  return (
    <>
      {getDetailsMutation.isLoading ? (
        <FallBackSpinner />
      ) : (
        <>
          <div className={Style.paper}>
            <div>
              <table style={{ width: "100%" }}>
                <tr>
                  <td style={{ border: "1px solid #ccc", textAlign: "center" }}>
                    مشخصات منبع تامین آب
                  </td>
                </tr>
              </table>
              <table style={{ width: "100%" }} className={Style.tableContainer}>
                <thead style={{ width: "100%" }}>
                  <th>َشماره منبع آب</th>
                  <th>نام منبع آب</th>
                  <th>شماره قطعه</th>
                  <th>وضعیت مجوز</th>
                  <th>شماره مجوز</th>
                  <th>تاریخ ثبت</th>
                  <th>میزان تخصیص</th>
                  <th>
                    <tr>
                      <td
                        colSpan={3}
                        style={{
                          border: "unset",
                        }}
                      >
                        آزمایش آب
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan={1}
                        style={{
                          border: "unset",
                          padding: "3px",
                          borderLeft: "1px solid #ddd",
                        }}
                      >
                        PH
                      </td>
                      <td
                        colSpan={1}
                        style={{
                          border: "unset",
                          padding: "3px",
                          borderLeft: "1px solid #ddd",
                        }}
                      >
                        EC
                      </td>
                      <td
                        colSpan={1}
                        style={{
                          border: "unset",
                          padding: "3px",
                        }}
                      >
                        کیفیت
                      </td>
                    </tr>
                  </th>
                </thead>

                {waterSource.map((row: any, i: any) => {
                  return (
                    <tr>
                      <td>{i + 1}</td>
                      <td>{row.sourceOfWater}</td>
                      <td></td>
                      <td></td>
                      <td>{row.waterexploitationsystemLicenseNumber}</td>
                      <td>{row.waterexploitationsystemLicenseDate}</td>
                      <td>{row.waterImpurities}</td>
                      <td>
                        <tr>
                          <td>{row.ph}</td>
                          <td>{row.ec}</td>
                          <td>{row.waterQualityWithTaste}</td>
                        </tr>
                      </td>
                    </tr>
                  );
                })}
                {waterSourceEmptySize.map((row: any, i: any) => {
                  return (
                    <tr>
                      <td>{i + 1 + waterSource.length}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>{}</td>
                      <td>{}</td>
                      <td>{}</td>
                    </tr>
                  );
                })}
              </table>
            </div>

            <div style={{ marginTop: "60px" }}>
              <table style={{ width: "100%" }}>
                <tr>
                  <td style={{ border: "1px solid #ccc", textAlign: "center" }}>
                    مشخصات فعالیت
                  </td>
                </tr>
              </table>
              <table style={{ width: "100%" }} className={Style.tableContainer}>
                <thead style={{ width: "100%" }}>
                  <th>شماره قطعه</th>
                  <th>موقعیت کاشت</th>
                  <th>نوع کاربری</th>
                  <th>نام گیاه</th>
                  <th>رقم</th>
                  <th>میزان بذر/ نهال</th>
                  <th>فاصله کاشت</th>
                  <th>سن درخت</th>
                  <th>مرکز تهیه نهال / بذر</th>
                  <th>نوع پایه درخت</th>
                </thead>

                {sectionActivityInfos.map((row: any, i: any) => {
                  return (
                    <tr>
                      <td>{i + 1}</td>
                      <td>{row.sectionName}</td>
                      <td>{row.useTypeType}</td>
                      <td></td>
                      <td>{row.waterexploitationsystemLicenseNumber}</td>
                      <td>{row.waterexploitationsystemLicenseDate}</td>
                      <td>{row.waterImpurities}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  );
                })}
                {sectionActivityInfosEmptySize.map((row: any, i: any) => {
                  return (
                    <tr>
                      <td>{i + 1 + sectionActivityInfos.length}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>{}</td>
                      <td>{}</td>
                      <td>{}</td>
                      <td>{}</td>
                      <td>{}</td>
                    </tr>
                  );
                })}
              </table>
            </div>

            <div style={{ marginTop: "60px" }}>
              <table style={{ width: "100%" }}>
                <tr>
                  <td style={{ border: "1px solid #ccc", textAlign: "center" }}>
                    مشخصات توپوگرافی و بهره برداری
                  </td>
                </tr>
              </table>
              <table style={{ width: "100%" }} className={Style.tableContainer}>
                <thead style={{ width: "100%" }}>
                  <th>شماره قطعه</th>
                  <th>وضعیت شیب</th>
                  <th>وضعیت خاک</th>
                  <th>وضعیت کاشت</th>
                  <th>وضعیت داشت</th>
                  <th>وضعیت برداشت</th>
                  <th>
                    <tr>
                      <td
                        colSpan={3}
                        style={{
                          border: "unset",
                        }}
                      >
                        آزمایش خاک
                      </td>
                    </tr>
                    <tr>
                      <td
                        colSpan={1}
                        style={{
                          border: "unset",
                          padding: "3px",
                          borderLeft: "1px solid #ddd",
                        }}
                      >
                        PH
                      </td>
                      <td
                        colSpan={1}
                        style={{
                          border: "unset",
                          padding: "3px",
                          borderLeft: "1px solid #ddd",
                        }}
                      >
                        EC
                      </td>
                      <td
                        colSpan={1}
                        style={{
                          border: "unset",
                          padding: "3px",
                        }}
                      >
                        کیفیت
                      </td>
                    </tr>
                  </th>
                </thead>

                {topographySections.map((row: any, i: any) => {
                  return (
                    <tr>
                      <td>{i + 1}</td>
                      <td>{row.topographyStatus}</td>
                      <td>{row.soilStatus}</td>
                      <td>{row.planting}</td>
                      <td>{row.holding}</td>
                      <td>{row.harvest}</td>
                      <td>
                        <tr>
                          <td></td>
                          <td></td>
                          <td></td>
                        </tr>
                      </td>
                    </tr>
                  );
                })}
                {topographySectionsEmptySize.map((row: any, i: any) => {
                  return (
                    <tr>
                      <td>{i + 1 + topographySections.length}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>{}</td>
                      <td>{}</td>
                    </tr>
                  );
                })}
              </table>
            </div>

            <div style={{ marginTop: "60px" }}>
              <table style={{ width: "100%" }}>
                <tr>
                  <td style={{ border: "1px solid #ccc", textAlign: "center" }}>
                    مشخصات مکانیزاسیون
                  </td>
                </tr>
              </table>
              <table style={{ width: "100%" }} className={Style.tableContainer}>
                <thead style={{ width: "100%" }}>
                  <th>نوع ماشین</th>
                  <th>نام ماشین</th>
                  <th>نوع ادوات خدمات</th>
                  <th>نام ادوات خدمات</th>
                  <th>شماره پلاک</th>
                  <th>شماره موتور</th>
                  <th>شماره شاسی</th>
                  <th>مدل</th>
                </thead>

                {sectionAgriculturalMechanizationServices.map(
                  (row: any, i: any) => {
                    return (
                      <tr>
                        <td>{i + 1}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    );
                  }
                )}
                {sectionAgriculturalMechanizationServicesEmptySize.map(
                  (row: any, i: any) => {
                    return (
                      <tr>
                        <td>
                          {i +
                            1 +
                            sectionAgriculturalMechanizationServices.length}
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{}</td>
                        <td>{}</td>
                        <td>{}</td>
                      </tr>
                    );
                  }
                )}
              </table>
            </div>

            <div style={{ marginTop: "60px" }}>
              <table style={{ width: "100%" }}>
                <tr>
                  <td style={{ border: "1px solid #ccc", textAlign: "center" }}>
                    مشخصات محصولات
                  </td>
                </tr>
              </table>
              <table style={{ width: "100%" }} className={Style.tableContainer}>
                <thead style={{ width: "100%" }}>
                  <th>عامل تولید</th>
                  <th>میزان فعالیت</th>
                  <th>نام محصول</th>
                  <th>رقم/نژاد</th>
                  <th>کد 18 رقمی محصول</th>
                  <th>QR کد محصول</th>
                  <th>ظرفیت تولید</th>
                  <th>سال تولید</th>
                </thead>

                {sectionProductInfos.map((row: any, i: any) => {
                  return (
                    <tr>
                      <td>{i + 1}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                    </tr>
                  );
                })}
                {sectionProductInfosEmptySize.map((row: any, i: any) => {
                  return (
                    <tr>
                      <td>{i + 1 + sectionProductInfos.length}</td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td></td>
                      <td>{}</td>
                      <td>{}</td>
                      <td>{}</td>
                    </tr>
                  );
                })}
              </table>
            </div>

            <div style={{ marginTop: "60px" }}>
              <table style={{ width: "100%" }}>
                <tr>
                  <td style={{ border: "1px solid #ccc", textAlign: "center" }}>
                    مشخصات نهاد های مصرفی
                  </td>
                </tr>
              </table>
              <table style={{ width: "100%" }} className={Style.tableContainer}>
                <thead style={{ width: "100%" }}>
                  <th>کود فسفاته</th>
                  <th>کود پتاسه</th>
                  <th>کود نیتراته</th>
                  <th>انواع کوهای مایع</th>
                  <th>کود دامی</th>
                  <th>کود طیور</th>
                  <th>QR کد محصول</th>
                  <th>ظرفیت تولید</th>
                  <th>سال تولید</th>
                </thead>

                {productionFactorCosumptionInfoSections.map(
                  (row: any, i: any) => {
                    return (
                      <tr>
                        <td>{i + 1}</td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                      </tr>
                    );
                  }
                )}
                {productionFactorCosumptionInfoSectionsEmptySize.map(
                  (row: any, i: any) => {
                    return (
                      <tr>
                        <td>
                          {i +
                            1 +
                            productionFactorCosumptionInfoSections.length}
                        </td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td>{}</td>
                        <td>{}</td>
                        <td>{}</td>
                        <td>{}</td>
                      </tr>
                    );
                  }
                )}
              </table>
            </div>

            <div style={{ marginTop: "100px" }}>
              <SimpleSubmitButton
                isLoading={false}
                btnText="چاپ"
                onCLick={() => {
                  window.print();
                }}
              />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export { CertificateContainer };