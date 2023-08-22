import React, { FC, useEffect } from "react";

import { columns } from "./TransactionColumns";
import { TransactionList } from "../TransactionList";
import { useGetMyTransactions } from "../../../../core/services/api";
import { SearchTransaction } from "../SearchTransaction";



const UserTransactionListContainer: FC = () => {
  const myTransaction = useGetMyTransactions();

  useEffect(() => {
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
      unionId: 0,
      userId: 0,
      countyGuildroomId: 0,
      provinceGuildroomId: 0,
    };

    myTransaction.mutate(transactionFilter);
  }, []);

  return (
    <TransactionList
      SearchTransaction={SearchTransaction}
      useMutate={myTransaction}
      columns={columns}
    />
  );
};

export { UserTransactionListContainer };
