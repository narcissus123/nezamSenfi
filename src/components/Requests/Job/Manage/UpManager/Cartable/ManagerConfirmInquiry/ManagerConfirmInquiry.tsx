import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ListTable } from "../../../../../../common/ListTable/ListTable";
import { columns } from "./Columns";

interface IPropTypes {
  getMutation: any;
  from?: string;
  isOpen?: boolean;
  status?: number;
  secretariatId:any
}

const ManagerConfirmInquiry: FC<IPropTypes> = ({
  getMutation: getParentMutation,
  from = "County",
  isOpen,
  status,
  secretariatId
}) => {
  const [state, setState] = useState<any>([]);
  const [pageCountList, setPageCount] = useState<any>(0);

  const [pageSize, setPageSize] = useState<any>(10);
  const [initialPage, setInitialPage] = useState(0);

  let { id } = useParams<any>();

  const getMutation = getParentMutation();

  useEffect(() => {
    if (isOpen) getMutation.mutate(id);
  }, [pageSize, isOpen]);

  useEffect(() => {
    if (getMutation.data) {
      try {
        let newState: any = [];

        getMutation.data.data.result.forEach((row: any) => {
          newState.push(row);
          // {
          //   id: row.id,
          //   letterTitle: row.letterTitle,
          //   inquiryId: row.inquiryId,
          //   appendix: row.appendix,
          //   creditStartDate: row.creditStartDate,
          //   letterNumber: row.letterNumber
          //     ? row.letterNumber
          //     : row.letterNumber.toString(),
          //   organizationTitle: row.organizationTitle,
          //   destinationCityTitle: row.destinationCityTitle,
          //   letterCotent: row.letterCotent,
          // }
        });
        // console.log("dsdadsafs");
        setState(newState);
        setPageCount(
          Math.ceil(getMutation.data.data.result.totalCount / pageSize)
        );
      } catch (e) {}
    }
  }, [getMutation.isSuccess]);

  return (
    <>
      {/* <SweetAlertCallback
        mutation={confirmMutation}
        title="آیا مطمئنید؟"
        onCancel={() => {
          setShowConfirmation(false);
        }}
        onClose={() => {
          setShowConfirmation(false);
        }}
        onConfirm={() => {
          setShowConfirmation(false);
          confirmMutation.mutate(id, {
            onSuccess: (val: any) => {
              setShowConfirmation(false);
              showToast(["با موفقیت انجام شد."], ToastTypes.success);

              let locArray = location.pathname.split("/");
              locArray[3] = "11";
              let newLocArray = [...locArray];
              let newLoc = newLocArray.join("/");
              history.push(newLoc);
            },
          });
        }}
        show={showConfirmation}
      >
        آیا از تأیید این درخواست مطمئنید؟
      </SweetAlertCallback> */}

      <ListTable
        columns={columns}
        isLoading={getMutation.isLoading}
        onPageChange={({ page, pageSize }) => {
          getMutation.mutate(id);
        }}
        tableData={state}
        pageCountList={pageCountList}
        getCustomProps={{ status: status , from : from , secretariatId : secretariatId }}
        customPageSize={pageSize}
        setPageSize={(val: any) => setPageSize(val)}
        setInitialPage={setInitialPage}
      >
        {{
          headerTable: <div style={{ width: "200px" }}></div>,
        }}
      </ListTable>
    </>
  );
};

export { ManagerConfirmInquiry };
