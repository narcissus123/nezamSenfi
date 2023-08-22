import React, { FC, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGetMyTransactions } from "../../../../../../../core/services/api";

import { columns } from "./TransactionColumns";
import { TransactionList } from "./TransactionList/TransactionList";




const UserTransactionListContainer: FC = () => {
  const myTransaction = useGetMyTransactions();

  const [tableData, setTableData] = useState([]);

  const { req_id } = useParams<any>();
  useEffect(() => {
    const transactionFilter = {
      page: 1,
      pageSize: 1000,
      amount: 0,
      description: "",
      status: 0,
      type: 0,
      transactionSection: 0,
      positionRequestId: 0,
      licenseRequestId: req_id,
      bankId: 0,
      unionId: 0,
      userId: 0,
      countyGuildroomId: 0,
      provinceGuildroomId: 0,
    };

    myTransaction.mutate(transactionFilter, {
      onSuccess: (val: any) => {
        setTableData(val.data.result.transactions);
      },
    });
  }, []);

  return (
    <TransactionList
      useMutate={myTransaction}
      columns={columns}
      tableData={tableData}
    />
  );
};

export { UserTransactionListContainer };
