import React, { FC, useEffect } from "react";

import { columns } from "../../AllTransactionColumns";
import { TransactionList } from "../TransactionList";
import { useGetUnionTransactions } from "../../../../core/services/api";
import { useGetOwnedUserUnion } from "../../../../core/services/api";
import { OwnedSearchTransaction } from "../OwnedSearchTransaction";



const UnionTransactionList: FC = () => {
  const unionTransactionlist = useGetUnionTransactions();
  const getOwnedUserUnion = useGetOwnedUserUnion();
  useEffect(() => {
    if (getOwnedUserUnion.isSuccess) {
      const getOwnedUserUnionId = getOwnedUserUnion.data.data.result.unions;

      const transactionFilter = {
        page: 1,
        pageSize: 8,
        amount: 0,
        description: "",
        status: 0,
        type: 0,
        transactionSection: 0,
        positionRequestId: 0,
        licenseRequestId: 0,
        bankId: 0,
        unionId: getOwnedUserUnionId.length > 0 ? getOwnedUserUnionId[0].id : 0,
        userId: 0,
        countyGuildroomId: 0,
        provinceGuildroomId: 0,
      };

      unionTransactionlist.mutate(transactionFilter);
    }
  }, [getOwnedUserUnion.isSuccess]);

  return (
    <TransactionList
      columns={columns}
      SearchTransaction={OwnedSearchTransaction}
      useMutate={unionTransactionlist}
      ownedUnion={getOwnedUserUnion}
    />
  );
};

export { UnionTransactionList };
