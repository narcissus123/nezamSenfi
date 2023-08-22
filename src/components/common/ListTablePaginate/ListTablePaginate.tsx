import { Formik } from "formik";
import React, {
  Fragment,
  useMemo,
  useState,
  useEffect,
  FC,
  ReactNode,
} from "react";
import { ChevronLeft, ChevronRight } from "react-feather";
import ReactPaginate from "react-paginate";
import {
  useFilters,
  useFlexLayout,
  usePagination,
  useResizeColumns,
  useTable,
} from "react-table";
import { Alert, Col, FormGroup, Table } from "reactstrap";
import { NotFoundData } from "../NotFoundData/NotFoundData";
import { SelectOption } from "../SelectOption";
import { ComponentSpinner } from "../Spinner/LoadingSpinner";
import Styled from "./ListTable.module.scss";

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
  setPageCountList: (val: number) => void;
  customPageSize?: number;
  setPageSize?: (val: number) => void;
  onPageChange: ({ page, pageSize }: IPageChange) => void;
  getCustomProps?: any; // {props1:... , prop2:...}
  setInitialPage?: (val: number) => void;
  initialPage?: number;
  listRowErrors?: number[];
  errorIdentifier?: string;
}

const ListTablePaginate: FC<IPropTypes> = ({
  isLoading,
  tableData,
  columns,
  children,
  pageCountList,
  customPageSize,
  onPageChange,
  setPageSize,
  getCustomProps,
  setPageCountList,
  isSccess,
  setInitialPage = (val) => {},
  initialPage = 0,
  listRowErrors,
  errorIdentifier,
}) => {
  const defaultColumn = useMemo(
    () => ({
      maxWidth: 400,
    }),
    []
  );
  const defaultData = React.useMemo(() => [], []);
  const [currentData, setCurrentData] = useState([]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    prepareRow,
  }: any = useTable(
    {
      columns,
      data: isLoading ? defaultData : currentData,
      defaultColumn,
    },
    useResizeColumns,
    useFilters,
    usePagination,
    useFlexLayout
  );

  const pageSizeItem = [
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

  useEffect(() => {
    if (tableData.length > 0) {
      onPageChanges(0);
    }
  }, [tableData, customPageSize]);

  useEffect(() => {
    const pageSize = customPageSize ? customPageSize : 8;
    setPageCountList(Math.ceil(tableData.length / pageSize));
  }, [tableData, customPageSize]);

  const onPageChanges = (page: any) => {
    const pageSize = customPageSize ? customPageSize : 8;
    const users: any = [];
    if (tableData.length > 0) {
      const data = tableData.map((item: any, index: number) => {
        if (
          (page + 1) * pageSize - 1 >= index &&
          (page + 1) * pageSize - pageSize <= index
        ) {
          users.push(item);
        }
      });
      console.log(users);
      setCurrentData(users);
    }
  };

  return (
    <Fragment>
      <Col
        className={`d-flex justify-content-between align-items-center ${Styled["header-style"]} p-0`}
      >
        {children?.headerTable}

        {setPageSize && (
          <Formik initialValues={{}} onSubmit={() => {}}>
            <SelectOption
              isClearable={false}
              options={pageSizeItem}
              onChange={(value) => {
                setInitialPage(0);
                setPageSize(+value.id);
              }}
              selectType={1}
              defaultValue={{
                id: String(customPageSize),
                title: String(customPageSize),
              }}
            />
          </Formik>
        )}
      </Col>
      <Table
        className="rounded position-relative overflow-hidden"
        bordered
        {...getTableProps()}
        hover
        striped
        responsive
      >
        <thead
          className={`${Styled["table-header"]} ${Styled["headeroftable"]}`}
        >
          {headerGroups.map((headerGroup: any) => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map((column: any) => (
                <th {...column.getHeaderProps()}>
                  <div className="d-flex justify-content-center align-items-center">
                    {column.render("Header")}
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
        ) : tableData.length > 0 ? (
          <tbody
            {...getTableBodyProps()}
            className="position-relative overflow-hidden"
          >
            {page.map((row: any) => {
              prepareRow(row);     
              return (
                <tr
                  className={
                    listRowErrors && errorIdentifier
                      ? listRowErrors.includes(row.original[errorIdentifier])
                        ? Styled["has-error"]
                        : ""
                      : ""
                  }
                  {...row.getRowProps()}
                >
                  {row.cells.map((cell: any) => {
                    return (
                      <td
                        {...cell.getCellProps()}
                        className={`text-center ${Styled["text-centered"]}`}
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
            onPageChange={(page) => {
              setInitialPage(page.selected);
              onPageChanges(page.selected);
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

export { ListTablePaginate };
