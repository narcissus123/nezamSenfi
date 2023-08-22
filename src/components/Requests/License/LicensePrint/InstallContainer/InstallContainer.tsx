import React, { FC, useEffect, useState } from "react";
import { Card, CardBody, CardHeader, CardTitle } from "reactstrap";
import Style from './InstallContainer.module.scss';



interface IPropTypes {

}

const InstallContainer: FC<IPropTypes> = ({

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
                <hr />
                <h4 style={{ textAlign: "center" }}>تاسیسات</h4>
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
                      <th>ردیف</th>
                      <th>کد</th>
                      <th>مسقف</th>
                      <th>نوع ساختمان</th>
                      <th>ابعاد</th>
                      <th>پوشش دیوار</th>
                      <th>پوشش سقف</th>
                      <th>پوشش کف</th>
                      <th>مختصات</th>
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <td>1</td>
                      <td>19702</td>
                      <td> </td>
                      <td>ساختمان اداری</td>
                      <td>1 × 2</td>
                      <td>سرامیک</td>
                      <td>حلب</td>
                      <td>سرامیک</td>
                      <td>
                        عرض: 36.7389734 <br />
                        طول: 53.48292098
                        <hr />
                        <span> 39S </span> &nbsp; <span> 721693 </span> &nbsp;{" "}
                        <span> 4068791 </span>
                      </td>
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

export { InstallContainer };
