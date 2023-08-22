import React, { Fragment, ReactNode, useRef, useState } from "react";
import ReactPaginate from "react-paginate";
import {
  useFilters,
  useFlexLayout,
  usePagination,
  useResizeColumns,
  useSortBy,
  useTable,
} from "react-table";
import * as FileSaver from "file-saver";
import { Button, Col, FormGroup, Table } from "reactstrap";
import { ChevronLeft, ChevronRight, Download } from "react-feather";

import { NotFoundData } from "../NotFoundData";
import { SelectOption } from "../SelectOption";
import XLSX from "xlsx";
import { jsPDF } from "jspdf";
import { FullOption } from "../../../core/models";
import { OptionRow } from "../../../core/models";
import { ExportModal } from "./ExportModal/ExportModal";
import { ComponentSpinner } from "../Spinner/LoadingSpinner";

import Styled from "./ListTable.module.scss";
import "jspdf-autotable";
import { jsPdfFont } from "../../../core/data/IRANSansWeb-normal";

interface IPageChange {
  page: number;
  pageSize: number;
}

interface IPropTypes {
  isLoading: boolean;
  tableData: any;
  columns: any;
  children?: {
    headerTable?: ReactNode;
  };
  isSccess?: boolean;
  pageCountList: number;
  customPageSize?: number;
  setPageSize?: (val: number) => void;
  onPageChange: ({ page, pageSize }: IPageChange) => void;
  getCustomProps?: any; // {props1:... , prop2:...}
  setInitialPage?: (val: number) => void;
  initialPage?: number;
  showPrint?: boolean;
}

const ListTable: React.FC<IPropTypes> = ({
  isLoading,
  tableData,
  columns,
  children,
  pageCountList,
  customPageSize,
  onPageChange,
  setPageSize,
  getCustomProps,
  isSccess,
  setInitialPage = (val: any) => {},
  initialPage = 0,
  showPrint,
}) => {
  const defaultColumn = React.useMemo(
    () => ({
      maxWidth: 400,
    }),
    []
  );
  const defaultData = React.useMemo(() => [], []);
  const customNewPageSize: any = { pageSize: 20000 };
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
  }: any = useTable(
    {
      columns,
      data: isLoading ? defaultData : tableData ? tableData : [],
      defaultColumn,
      initialState: customNewPageSize,
    },
    useResizeColumns,
    useFilters,
    useSortBy,
    usePagination,
    useFlexLayout
  );

  const tableRef: any = useRef();

  const pageSizeItem: FullOption[] = [
    {
      label: "اندازه صفحه",
      options: [
        {
          id: "4",
          title: "4",
        },
        {
          id: "6",
          title: "6",
        },
        {
          id: "8",
          title: "8",
        },
        {
          id: "10",
          title: "10",
        },
      ],
    },
  ];

  const [exportModal, setExportModal] = useState(false);

  const handleExport = (fileName: string, fileFormat: any) => {
    const bookType = fileFormat;
    const wbObj: any = {
      sheet: "اطلاعات",
    };
    const wb = XLSX.utils.table_to_book(tableRef.current, wbObj);
    const wbout = XLSX.write(wb, { bookType, bookSST: true, type: "binary" });

    const s2ab = (s: any) => {
      const buf = new ArrayBuffer(s.length);
      const view = new Uint8Array(buf);
      for (let i = 0; i < s.length; i++) view[i] = s.charCodeAt(i) & 0xff;
      return buf;
    };
    const file = fileName.length
      ? `${fileName}.${fileFormat}`
      : `excel-sheet.${fileFormat}`;

    return FileSaver.saveAs(
      new Blob([s2ab(wbout)], { type: "application/octet-stream" }),
      file
    );
  };

  const exportPDF = (fileName: string) => {
    const unit = "pt";
    const size = "A4"; // Use A1, A2, A3 or A4
    const orientation = "portrait"; // portrait or landscape

    const marginLeft = 475;
    const doc: any = new jsPDF(orientation, unit, size);

    doc.setFontSize(14);

    const title = "لیست اطلاعات";
    let headers: any = [[]];
    let data: any = [];

    columns.reverse().forEach((item: any) => {
      if (
        !item.accessor.includes("action") &&
        !item.accessor.includes("operation")
      ) {
        data.push([]);
      }
    });
    columns.forEach((item: any) => {
      if (
        !item.accessor.includes("action") &&
        !item.accessor.includes("operation")
      ) {
        headers[0].push(item.Header);
      }
    });

    tableData.forEach((tableRow: any, index: any) => {
      columns.forEach((item: any) => {
        if (
          !item.accessor.includes("action") &&
          !item.accessor.includes("operation")
        ) {
          try {
            data[index].push(tableRow[item.accessor]);
          } catch (error) {}
        }
      });
    });
    console.log(columns);

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
    doc.save(fileName + ".pdf");
  };

  return (
    <Fragment>
      <ExportModal
        handleExport={handleExport}
        exportPDF={exportPDF}
        isOpen={exportModal}
        toggleModal={() => setExportModal(false)}
      />
      <Col
        className={`d-flex justify-content-between align-items-center ${Styled["header-style"]} p-0`}
      >
        {children?.headerTable}

        {setPageSize && (
          <FormGroup className="d-flex">
            <SelectOption
              isClearable={false}
              options={pageSizeItem}
              onChange={(value: OptionRow) => {
                setInitialPage(0);
                setPageSize(+value.id);
              }}
              selectType={1}
              defaultValue={{
                id: String(customPageSize),
                title: String(customPageSize),
              }}
            />
            <Button
              style={{ marginRight: "10px" }}
              color="primary"
              outline
              onClick={() => setExportModal(true)}
            >
              <Download size={15} />
            </Button>
          </FormGroup>
        )}
        {showPrint && (
          <FormGroup className="d-flex justify-content-end w-100">
            <Button
              style={{ marginRight: "10px" }}
              color="primary"
              outline
              onClick={() => setExportModal(true)}
            >
              <Download size={15} />
            </Button>
          </FormGroup>
        )}
      </Col>
      <Table
        innerRef={tableRef}
        className="rounded position-relative overflow-hidden"
        bordered
        {...getTableProps()}
        hover
        striped
        responsive
      >
        <thead className="table-header">
          {headerGroups.map((headerGroup: any) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                  <div className="d-flex justify-content-center align-items-center">
                    {column.render("Header")}
                    <span>
                      {column.isSorted
                        ? column.isSortedDesc
                          ? " 🔽"
                          : " 🔼"
                        : ""}
                    </span>
                  </div>
                  {column.canResize && (
                    <div
                      {...column.getResizerProps()}
                      className={`resizer ${
                        column.isResizing ? "isResizing" : ""
                      }`}
                    />
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        {isLoading ? (
          <ComponentSpinner isRelative={true} />
        ) : tableData && tableData.length > 0 ? (
          <tbody
            {...getTableBodyProps()}
            className="position-relative overflow-hidden"
          >
            {page.map((row: any) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell: any) => {
                    console.log(cell.column.accessor());

                    return (
                      <td
                        {...cell.getCellProps()}
                        className={`text-center ${Styled["text-centered"]} ${
                          cell.row.original.hasBetweenVal && Styled["no-border"]
                        }`}
                      >
                        {cell.render("Cell", {
                          ...getCustomProps,
                          setInitialPage: setInitialPage,
                        })}
                      </td>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        ) : (
          <NotFoundData />
        )}
      </Table>
      {pageCountList > 1 && (
        <div
          className={`text-center`}
          style={isLoading ? { display: "none" } : {}}
        >
          <ReactPaginate
            previousLabel={
              <span className={`${Styled["page-prev"]}`}>
                <ChevronRight size={15} />
              </span>
            }
            nextLabel={
              <span className={`${Styled["page-prev"]}`}>
                <ChevronLeft size={15} />
              </span>
            }
            breakLabel="..."
            breakClassName="break-me"
            pageCount={pageCountList}
            containerClassName={`disabled-pagination-btn ${Styled["pagination-holder"]}`}
            activeClassName={`${Styled["page-active"]}`}
            forcePage={initialPage}
            pageRangeDisplayed={2}
            marginPagesDisplayed={2}
            onPageChange={(page: any) => {
              setInitialPage(page.selected);
              onPageChange({
                page: page.selected + 1,
                pageSize: customPageSize ? customPageSize : 10,
              });
            }}
          />
        </div>
      )}
    </Fragment>
  );
};

export { ListTable };
