import React, { FC, Fragment, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { Card, CardBody, CardHeader, CardTitle, Col, Row } from "reactstrap";
import { useAllUnUsedDocument } from "../../../../core/services/api";
import { SubmitButton } from "../../../common/Form";
import { FallBackSpinner } from "../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import  "./IssuingDocumentsContainer.module.scss";
import "jspdf-autotable";
import { jsPDF } from "jspdf";
import { jsPdfFont } from "../../../../core/data/IRANSansWeb-normal";

const IssuingDocuemtsContainer: FC = () => {

  const { data, isFetching, refetch, isSuccess } = useAllUnUsedDocument();

  useEffect(() => {
    refetch();
  },[]);

  useEffect(() => {
    if (data && data.data.result) {
      const result = data.data.result;
      // setDocumentTypeOptions(result);
    }
  }, [isSuccess, data]);
  
  const [documentTypeOptions, setDocumentTypeOptions] = useState<any>([
    {
      categoryTitle: "اسناد هویتی",
      categoryDescription: "بارگزاری تصویر اصل کلیه اسناد هویتی الزامیست",
      documents: [
        {
          documentTitle: "شناسنامه",
        },
        {
          documentTitle: "کارت ملی",
        },
        {
          documentTitle: "کارت",
        },
        {
          documentTitle: "تمام صفحات شناسنامه",
        },
        {
          documentTitle: "کارت پایان خدمت",
        },
        {
          documentTitle: "کارت معافیت",
        },
        {
          documentTitle: "عکس ( 3*4 رنگی تمام رخ)",
        },
        {
          documentTitle: "کارت ملی",
        },
        {
          documentTitle: "شناسنامه (تمام صفحات)",
        },
      ],
    },

    {
      categoryTitle: "اسناد مالکیتی",
      categoryDescription:
        "بازگذاری تصویر اصل یکی از اسناد رسمی یا یکی از اسناد عادی به همراه استشهادیه الزامی است",
      documents: [
        {
          documentTitle: "کشاورزی",
        },
        {
          documentTitle: "سند رسمی",
        },
        {
          documentTitle: "سند عادی مبایعه نامه (قولنامه)",
        },
        {
          documentTitle: "سند عادی مورثی (تقسیم نامه)",
        },
        {
          documentTitle: "سند عادی استشهادیه",
        },
        {
          documentTitle: "سند عادی استیجاری (اجاره نامه)",
        },
        {
          documentTitle: "سند رسمی مشاع",
        },
        {
          documentTitle: "سند عادی مشاع",
        },
      ],
    },

    {
      categoryTitle: "اسناد تاسیسات",
      categoryDescription:
        "بارگذاری تصویر اصل اسناد تاسیسات در صورت موجود بودن الزامی است",
      documents: [
        {
          documentTitle: "تاسیس",
        },
        {
          documentTitle: "اشتراک آب شهری/ روستایی",
        },
        {
          documentTitle: "اشتراک گاز",
        },
        {
          documentTitle: "اشتراک برق",
        },
      ],
    },

    {
      categoryTitle: "اسناد مجوز فعالیت",
      categoryDescription:
        "بارگذاری تصویر اصل اسناد مجوز فعالیت برای واحد های صنعتی و نیمه صنعتی الزامی است ",
      documents: [
        {
          documentTitle: "پروانه تاسیس",
        },
        {
          documentTitle: "پروانه بهره برداری ",
        },
        {
          documentTitle: "پروانه تاسیس بهداشتی",
        },
        {
          documentTitle: "پروانه بهره برداری بهداشتی",
        },
        {
          documentTitle: "تاییدیه بهره برداری",
        },
      ],
    },

    {
      categoryTitle: "اسناد چاه",
      categoryDescription:
        "بارگذاری تصویر اصل اسناد منبع تامین آب در صورت موجود بودن الزامی است",
      documents: [
        {
          documentTitle: "پروانه حفر چاه",
        },
        {
          documentTitle: "پروانه بهره برداری آب",
        },
        {
          documentTitle: "حق آبه",
        },
        {
          documentTitle: "سایر مجوزات بهره برداری آب",
        },
      ],
    },

    {
      categoryTitle: "اسناد ساختمانی",
      categoryDescription:
        "بارگذاری تصویر اصل مجوزات ساختمانی برای واحد های صنعتی و نیمه صنعتی الزامی است",
      documents: [
        {
          documentTitle: "پروانه ساختمانی",
        },
        {
          documentTitle: "پایان کار ساختمانی",
        },
        {
          documentTitle: "نقشه ساختمانی",
        },
        {
          documentTitle: "سایر مجوزات ساختمانی",
        },
      ],
    },
  ]);

  const downloadPdf = () => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 475;
    const doc: any = new jsPDF(orientation, unit, size);

    doc.setFontSize(14);

    const title = "اسناد مورد نیاز";
    let headers: any = [["نوع سند", "توضیحات", "نام سند"]];
    let data: any = [];

    documentTypeOptions.forEach((row: any) => {
      row.documents.forEach((row2:any)=>{
        data.push([
          row.categoryTitle.toString(),
          row.categoryDescription.toString(),
          row2.documentTitle.toString(),
        ]);
      })
      
    });


    doc.addFileToVFS("IRANSansWeb-normal.ttf", jsPdfFont);
    doc.addFont("IRANSansWeb-normal.ttf", "IRANSansWeb", "normal");

    doc.setFont("IRANSansWeb"); // set font

    doc.text(title, marginLeft, 40);
    doc.setFontSize(10);
    doc.autoTable({
      startY: 50,
      head: headers,
      theme: "grid",
      body: data,
      alternateRowStyles: { direction: "rtl" },
      styles: {
        fontSize: 9,
        font: "IRANSansWeb",
        direction: "rtl",
        halign: "center",
        cellPadding: 5,
      },
    });
    doc.save("اسناد_موردنیاز_ابطال.pdf");
  }

  
  const componentRef = useRef<any>();

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  
  return (
    <Fragment>
      <Card>
        <CardHeader>
          <CardTitle> اسناد مورد نیاز صدور</CardTitle>
        </CardHeader>
        <CardBody>
          {isFetching ? (
            <FallBackSpinner />
          ) : (
            <>
              <table
                dir="rtl"
                ref={componentRef}
                style={{
                  direction: "rtl",
                  textAlign: "right",
                  margin: "20px auto",
                  width: "95%",
                }}
              >
                <tr style={{ backgroundColor: "#30b854", color: "#fff" }}>
                  <th>اسناد مورد نیاز</th>
                </tr>
                <tr>
                  <table>
                    <tr
                      style={{
                        backgroundColor: "rgba(34, 41, 47, 0.05)",
                      }}
                    >
                      <td style={{ width: "33%" }}> نوع سند </td>
                      <td style={{ width: "66%" }}> نام سند </td>
                    </tr>
                  </table>
                  {documentTypeOptions &&
                    documentTypeOptions.map((row: any) => {
                      return (
                        <table>
                          <tr>
                            <table>
                              <tr>
                                <td
                                  style={{
                                    width: "33%",
                                  }}
                                >
                                  {row.categoryTitle}
                                </td>
                              </tr>
                              <tr>
                                <td>{row.categoryDescription}</td>
                              </tr>
                            </table>

                            <td style={{ width: "66%", padding: "0" }}>
                              <table>
                                {row.documents &&
                                  row.documents.map((row2: any) => {
                                    return (
                                      <>
                                        <tr>
                                          <td>{row2.documentTitle}</td>
                                        </tr>
                                      </>
                                    );
                                  })}
                              </table>
                            </td>
                          </tr>
                        </table>
                      );
                    })}
                </tr>
              </table>
              <Row className="mt-2">
                <Col md="6">
                  <SubmitButton
                    isLoading={false}
                    btnText="چاپ اسناد مورد نیاز"
                    onClick={handlePrint}
                    clearable
                    clearableTxt="ذخیره اسناد مورد نیاز بصورت PDF"
                    onClear={downloadPdf}
                  />
                </Col>
              </Row>
            </>
          )}
        </CardBody>
      </Card>
    </Fragment>
  );
};

export { IssuingDocuemtsContainer };
