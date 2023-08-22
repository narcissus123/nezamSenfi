
import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router";
import { Button, Row } from "reactstrap";
import { ListTable } from "../../../../../../common/ListTable/ListTable";
import { FilesModal } from "./GuarantorAction/FilesModal/FilesModal";
import { columns } from "./GuarantorsColumn";

interface IPropTypes {
  getGuarantorsMutation: any;
  initialValues: any;
  isOpen: boolean;
}

const GuarantorsList: FC<IPropTypes> = ({
  initialValues,
  getGuarantorsMutation,
  isOpen,
}) => {
  const [tableData, setTableData]: any = useState([]);

  const [pageSize, setPageSize] = useState(500)
  const [pageCountList, setPageCount] = useState<any>(0);
  const [initialPage, setInitialPage] = useState(0);
  const [showSelectModal, setShowSelectModal] = useState<any>(false);
  const [attachments, setAttachments] = useState<any>([]);
  const [userId, setUserId] = useState<any>(0);

  const { id } = useParams<any>();

  const guarantorsMutation = getGuarantorsMutation()

  useEffect(() => {
    if (isOpen) {
      guarantorsMutation.mutate(+id);
    }
  }, [guarantorsMutation && isOpen]);

  useEffect(() => {
    if (guarantorsMutation && guarantorsMutation.data && guarantorsMutation.data.data) {
      const result = guarantorsMutation.data.data.result;
      
      console.log('--guarantors details ---' , result);
      let newTableData : any = []

      result.guarantors.forEach((row: any) => {
        newTableData.push({ ...row, userId: result.userId });
      });
       
      console.log('newtabledata---' , newTableData);
      

      setTableData(newTableData);
      setAttachments(result.attachments)
      setUserId(result.userId)
      //setPageCount(Math.ceil(result.totalCount / pageSize));
    }
  }, [guarantorsMutation && guarantorsMutation.isSuccess]);

  console.log('---attachments---' , attachments);
  
  return (
    <>
      {showSelectModal && (
        <FilesModal
          backdrop={true}
          data={attachments}
          userId={userId}
          isOpen={showSelectModal}
          toggleModal={() => setShowSelectModal((val: any) => !val)}
        />
      )}
      <Row>
        <Button color="primary" onClick={()=>{
          setShowSelectModal(true)
        }}>پیوست های قرارداد</Button>
      </Row>
      <ListTable
        columns={columns}
        isLoading={guarantorsMutation && guarantorsMutation.isLoading}
        onPageChange={() => {}}
        tableData={tableData}
        pageCountList={pageCountList}
        customPageSize={pageSize}
        setInitialPage={setInitialPage}
      >
        {{ headerTable: <p></p> }}
      </ListTable>
    </>
  );
};

export { GuarantorsList };
