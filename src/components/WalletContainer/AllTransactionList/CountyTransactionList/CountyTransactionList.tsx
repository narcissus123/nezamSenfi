import React, { FC, useEffect } from "react";

import { columns } from "../../AllTransactionColumns";
import { TransactionList } from "../TransactionList";
import { useGetCountyTransaction } from "../../../../core/services/api";
import { useGetOwnedUserCountyGuildRooms } from "../../../../core/services/api";
import { OwnedSearchTransaction } from "../OwnedSearchTransaction";



const CountyTransactionList: FC = () => {
  const countyTransactionlist = useGetCountyTransaction();
  const getOwnedCountyGuildRoom = useGetOwnedUserCountyGuildRooms();

  useEffect(() => {
    if (getOwnedCountyGuildRoom.isSuccess) {
      const countyGuildroomId = getOwnedCountyGuildRoom.data.data.result;
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
        countyGuildroomId:
          countyGuildroomId.length > 0 ? countyGuildroomId[0].id : 0,
        provinceGuildroomId: 0,
      };

      countyTransactionlist.mutate(transactionFilter);
    }
  }, [getOwnedCountyGuildRoom.isSuccess]);

  return (
    <TransactionList
      columns={columns}
      SearchTransaction={OwnedSearchTransaction}
      useMutate={countyTransactionlist}
      ownedCounty={getOwnedCountyGuildRoom}
    />
  );
};

export { CountyTransactionList };
