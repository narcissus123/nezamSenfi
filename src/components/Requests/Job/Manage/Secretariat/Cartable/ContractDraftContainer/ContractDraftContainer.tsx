import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { FallBackSpinner } from "../../../../../../common/Spinner/FallBackSpinner/FallbackSpinner";
import { AddAttachments } from "./AddAttachments/AddAttachments";
import { ContractDraftList } from "./ContractDraftList/ContractDraftList";
import { NewContractDraft } from "./NewContractDraft/NewContractDraft";


interface IPropTypes {
  guarantorMutation : any
  type:string
  guarantorsCountQuery:any
}


const ContractDraftContainer: React.FC<IPropTypes> = ({
  guarantorMutation,
  type,
  guarantorsCountQuery
}) => {
  const [formData, setFormData] = useState<any>([]);

  const { id } = useParams<{ id: string }>();
  
  const { isFetching, refetch, isSuccess, data } = guarantorsCountQuery(+id);



  return (
    <>
      {isFetching ? (
        <FallBackSpinner />
      ) : (
        <>
          <NewContractDraft guaratorsRequirements={data.data.result} setFormData={setFormData} />
          <ContractDraftList setFormData={setFormData} formData={formData} />
          <AddAttachments
            type={type}
            formData={formData}
            getGuarantorsMutation={guarantorMutation}
            guaratorsRequirements={data.data.result}
          />
        </>
      )}
    </>
  );
};

export { ContractDraftContainer };
