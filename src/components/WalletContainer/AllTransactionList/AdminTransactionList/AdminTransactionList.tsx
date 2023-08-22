import React, { FC, useEffect } from "react";

import { columns } from "../../AllTransactionColumns";
import { TransactionList } from "../TransactionList";
import { useGetAllTransactions } from "../../../../core/services/api";
import { SearchTransaction } from "../SearchTransaction";



const AdminTransactionList: FC = () => {
  const allTransaction = useGetAllTransactions();

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

    allTransaction.mutate(transactionFilter);
  }, []);

  return (
    <TransactionList
      SearchTransaction={SearchTransaction}
      columns={columns}
      useMutate={allTransaction}
    />
  );
};

export { AdminTransactionList };
