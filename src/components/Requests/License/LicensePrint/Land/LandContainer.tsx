import React, { FC, useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import Style from './LandContainer.module.scss';



interface IPropTypes {

}

const LandContainer: FC<IPropTypes> = ({

}) => {


  return (
    <div className={Style.paper}>
      <div className={Style.map}></div>

      <div>
        <table className={Style.tableContainer}>
          <thead>
            <tr>
              <td className={Style.noborder} style={{ width: "30%" }}></td>
              <td className={Style.noborder} style={{ width: "70%" }}></td>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td colSpan={2} style={{ padding: 0, border: "none" }}>
                {/* <img
                  src="http://old.sabak.org/images/006-compass-pointing-north-1.png"
                  className="north"
                /> */}
              </td>
            </tr>
            <tr>
              <td rowSpan={2} className={`${Style.noborder} ${Style.padzero}`}>
                <table
                  className={`${Style.tableContainer} ${Style.tablebordercollapse}`}
                >
                  <tbody className="td-pad-0-3">
                    <tr>
                      <td>مقیاس نقشه</td>
                      <td>-</td>
                    </tr>
                    <tr>
                      <td>عنوان نقشه</td>
                      <td>پلان موقعیت زمین</td>
                    </tr>
                    <tr>
                      <td>متقاضی</td>
                      <td>دهقان رستمی</td>
                    </tr>
                    <tr>
                      <td>کارفرما</td>
                      <td>نظام صنفی کشاورزی</td>
                    </tr>
                    <tr>
                      <td>زمینه فعالیت</td>
                      <td>
                        {" "}
                        کاشت غلات ،حبوبات ،دانه های روغنی و گیاهان صنعتی{" "}
                      </td>
                    </tr>
                    <tr>
                      <td>عنوان قطعه</td>
                      <td>2222</td>
                    </tr>
                    <tr>
                      <td>مساحت</td>
                      <td>6254.62</td>
                    </tr>
                    <tr>
                      <td>پیرامون</td>
                      <td>323.537</td>
                    </tr>
                    <tr>
                      <td>استان</td>
                      <td>مازندران</td>
                    </tr>
                    <tr>
                      <td>شهرستان</td>
                      <td>بهشهر</td>
                    </tr>
                    <tr>
                      <td>محل فعالیت</td>
                      <td>
                        <span>شهر:</span> رستمکلا
                      </td>
                    </tr>
                    <tr>
                      <td>تاریخ ثبت</td>
                      <td>1398/07/02</td>
                    </tr>
                  </tbody>
                </table>
              </td>

              <td className={`${Style.noborder} ${Style.padzero}`}>
                <table
                  className={`${Style.tableContainer} ${Style.tablebordercollapse}`}
                >
                  <tbody>
                    <tr>
                      <td>توپوگرافی</td>
                      <td> دشت و مسطح </td>
                      <td>وضعیت خاک</td>
                      <td> ترکیبی </td>
                    </tr>
                    <tr>
                      <td>جهت شیب</td>
                      <td>شمال </td>
                      <td>منبع تأمین آب</td>
                      <td> ذخیره مخزنی/آب بندان </td>
                    </tr>
                    <tr>
                      <td>درصد شیب</td>
                      <td>بین 5 تا 10 درصد</td>
                      <td>کیفیت آب</td>
                      <td> شیرین </td>
                    </tr>
                    <tr>
                      <td>موقعیت مکانی</td>
                      <td> داخل بافت (حریم) شهری </td>
                      <td>سیستم بهره برداری از آب</td>
                      <td> غرقابی </td>
                    </tr>
                  </tbody>
                </table>

                <hr />
                <h4 style={{ textAlign: "center" }}>محصولات</h4>
                <table
                  className="table table-bordered table-border-collapsed no-fix"
                  style={{
                    borderCollapse: "collapse",
                    fontSize: "80%",
                    border: "1px solid #ddd",
                    marginTop: "3px",
                  }}
                >
                  <thead>
                    <tr>
                      <th>ردیف </th>
                      <th>شغل </th>
                      <th>عامل تولید</th>
                      <th>محصول اصلی</th>
                      <th>رقم محصول اصلی</th>
                      <th>ظرفیت سالانه</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>زراعت کار برنج(برنج کار)</td>
                      <td>زراعت </td>
                      <td>شلتوک برنج </td>
                      <td>کشوری</td>
                      <td>150,000</td>
                    </tr>
                  </tbody>
                </table>

                <hr />
                <h4 style={{ textAlign: "center" }}>درختان</h4>
                <table
                  className="table table-bordered table-border-collapsed no-fix"
                  style={{
                    borderCollapse: "collapse",
                    fontSize: "80%",
                    border: "1px solid #ddd",
                    marginTop: "3px",
                  }}
                >
                  <thead>
                    <tr>
                      <th>کد</th>
                      <th>نوع درختان</th>
                      <th>محصول</th>
                      <th>رقم</th>
                      <th>پایه نهال</th>
                      <th>تعداد اصله</th>
                      <th>سطح زیر کشت</th>
                      <th>سن درختان</th>
                      <th>ابعاد</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>20264</td>
                      <td>درخت محوطه و باغچه ها</td>
                      <td>سیب</td>
                      <td>فوجی</td>
                      <td>بذر</td>
                      <td>10</td>
                      <td>100</td>
                      <td>2 سال</td>
                      <td>5 × 5</td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
            <tr>
              <td className="noborder pad-0">
                <table
                  className="table table-bordered table-border-collapsed no-fix"
                  style={{
                    borderCollapse: "collapse",
                    fontSize: "80%",
                    border: "1px solid #ddd",
                    marginTop: "3px",
                  }}
                >
                  <tbody>
                    <tr>
                      <td>
                        <div className="surv pull-right">
                          <div className="pull-right">
                            <strong>مشخصات کارشناس</strong>
                            <br />
                            نام کارشناس: کارشناس بهشهر
                            <br />
                            شماره نظام:
                            <br />
                            شماره پروانه اشتغال:
                          </div>
                        </div>
                        <div className="pull-left">
                          <table style={{ width: "auto", height: "25mm" }}>
                            <tbody>
                              <tr>
                                <td
                                  style={{ border: 0, verticalAlign: "middle" }}
                                >
                                  {/* <img
                                    src=""
                                    style={{ width: "auto", height: "25mm" }}
                                  /> */}
                                </td>
                              </tr>
                            </tbody>
                          </table>
                        </div>
                      </td>
                      <td>
                        <div className="surv pull-right">
                          <div className="pull-right">
                            <strong>نظام صنفی کشاورزی</strong>
                            <br />
                            تایید کننده: محمد جواد خاکزاد رستمی
                            <br />
                            پست سازمانی: دبیر اجرایی
                            <br />
                            &nbsp;
                          </div>
                          <div className="pull-left">
                            <table style={{ width: "auto", height: "25mm" }}>
                              <tbody>
                                <tr>
                                  <td
                                    style={{
                                      border: "0",
                                      verticalAlign: "middle",
                                    }}
                                  >
                                    {/* <img
                                      src=""
                                      style={{ width: "auto", height: "25mm" }}
                                    /> */}
                                  </td>
                                </tr>
                              </tbody>
                            </table>
                          </div>
                        </div>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};

export { LandContainer };
