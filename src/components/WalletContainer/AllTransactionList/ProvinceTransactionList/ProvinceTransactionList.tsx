import React, { FC, useEffect } from "react";

import { columns } from "../../AllTransactionColumns";
import { TransactionList } from "../TransactionList";
import { useGetProvinceGuildRoomTransaction } from "../../../../core/services/api";
import { OwnedSearchTransaction } from "../OwnedSearchTransaction";
import { useGetOwnedUserProvinceGuildRooms } from "../../../../core/services/api";



const ProvinceTransactionList: FC = () => {
  const provinceTransactionList = useGetProvinceGuildRoomTransaction();

  const getOwnedProvinceGuildRoom = useGetOwnedUserProvinceGuildRooms();

  useEffect(() => {
    if (getOwnedProvinceGuildRoom.isSuccess) {
      const provinceGuildroomId = getOwnedProvinceGuildRoom.data.data.result;

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
        provinceGuildroomId:
          provinceGuildroomId.length > 0 ? provinceGuildroomId[0].id : 0,
      };

      provinceTransactionList.mutate(transactionFilter);
    }
  }, [getOwnedProvinceGuildRoom.isSuccess]);

  return (
    <TransactionList
      SearchTransaction={OwnedSearchTransaction}
      ownedProvince={getOwnedProvinceGuildRoom}
      useMutate={provinceTransactionList}
      columns={columns}
    />
  );
};

export { ProvinceTransactionList };
