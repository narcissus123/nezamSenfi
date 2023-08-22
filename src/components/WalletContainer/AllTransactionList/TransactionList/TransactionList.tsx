import React, { FC, Fragment, useEffect, useState } from "react";
import { Card, CardBody, CardTitle, FormGroup } from "reactstrap";
import {
  FinancialTransactionSection,
  FinancialTransactionSectionName,
  FinancialTransactionStatus,
  FinancialTransactionStatusName,
  FinancialTransactionType,
  FinancialTransactionTypeName,
} from "../../../../core/enums";
import { CurrencyMask, RemoveCurrencyMask } from "../../../../core/utils";
import { ListTable } from "../../../common/ListTable";

interface IPropTypes {
  columns: any;
  useMutate: any;
  getCustomProps?: any;
  SearchTransaction: any;
  ownedProvince?: any;
  ownedCounty?: any;
  ownedUnion?: any;
}

const TransactionList: FC<IPropTypes> = ({
  columns,
  useMutate,
  getCustomProps,
  SearchTransaction,
  ownedCounty,
  ownedProvince,
  ownedUnion,
}) => {
  const [tableData, setTableData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [first, setFirst] = useState(false);

  const [pageSize, setPageSize] = useState(8);
  const [pageCount, setPageCount] = useState(1);
  const [status, setStatus] = useState(0);
  const [type, setType] = useState(0);
  const [amount, setAmount] = useState(0);
  const [userId, setUserId] = useState(0);
  const [username, setUsername] = useState("");
  const [transactionSection, setTransactionSection] = useState(0);
  const [description, setDescription] = useState("");
  const [province, setProvince] = useState(0);
  const [county, setCounty] = useState(0);
  const [union, setUnion] = useState(0);
  const [initialPage, setInitialPage] = useState(0);

  useEffect(() => {
    const transactionFilter = {
      page: 1,
      pageSize: pageSize,
      amount: amount,
      description: description,
      status: status,
      type: type,
      transactionSection: transactionSection,
      positionRequestId: 0,
      licenseRequestId: 0,
      bankId: 0,
      unionId: 0,
      userId: userId,
      countyGuildroomId: 0,
      provinceGuildroomId: 0,
      username: "",
    };

    if (first) {
      useMutate.mutate(transactionFilter);
    }
    setFirst(true);
  }, [pageSize]);

  useEffect(() => {
    if (useMutate.data && useMutate.data.data) {
      const result = useMutate.data.data.result;

      let userData: any = [];
      result.transactions.forEach((item: any) => {
        userData.push({
          userId: item.userId,
          statusTitle: item.statusTitle,
          type:
            item.type === FinancialTransactionType.ChargeWallet
              ? FinancialTransactionTypeName.ChargeWallet
              : item.type === FinancialTransactionType.PayFromBank
              ? FinancialTransactionTypeName.PayFromBank
              : FinancialTransactionTypeName.PayFromWallet,
          transactionSection:
            item.transactionSection ===
            FinancialTransactionSection.PositionRequest
              ? FinancialTransactionSectionName.PositionRequest
              : item.transactionSection ===
                FinancialTransactionSection.LicensRequest
              ? FinancialTransactionSectionName.LicensRequest
              : FinancialTransactionSectionName.Wallet,
          description: item.description,
          createdDateTime: item.createdDateTime,
          amount: item.amount ? CurrencyMask(item.amount) + " ریال" : "0 ریال",
          locationTitle: item.locationTitle ? item.locationTitle : "",
          username: item.username ? item.username : "نامعلوم",
        });
      });
      setTableData(userData);
      setAllData(result.transactions);
      setPageCount(Math.ceil(result.totalCount / pageSize));
    }
  }, [useMutate.isSuccess]);

  const onPageChange = ({ page, pageSize }: any) => {
    const transactionFilter = {
      page: page,
      pageSize: pageSize,
      amount: amount,
      description: description,
      status: status,
      type: type,
      transactionSection: transactionSection,
      positionRequestId: 0,
      licenseRequestId: 0,
      bankId: 0,
      unionId: union,
      userId: userId,
      countyGuildroomId: county,
      provinceGuildroomId: province,
      username: username,
    };

    useMutate.mutate(transactionFilter);
  };

  const onSearch = (value: any) => {
    const transactionFilter = {
      page: 1,
      pageSize: pageSize,
      amount: value.amount ? RemoveCurrencyMask(value.amount) : 0,
      description: value.description ? value.description : "",
      status: value.status ? value.status.value : 0,
      type: value.type ? value.type.value : 0,
      transactionSection: value.transactionSection
        ? value.transactionSection.value
        : 0,
      positionRequestId: 0,
      licenseRequestId: 0,
      bankId: 0,
      countyGuildroomId: value.county ? value.county.value : 0,
      provinceGuildroomId: value.province ? value.province.value : 0,
      unionId: value.union ? value.union.value : 0,
      userId: userId,
      username: value.username ? value.username : "",
    };
    useMutate.mutate(transactionFilter);

    setAmount(RemoveCurrencyMask(value.amount));
    setStatus(value.status ? value.status.value : 0);
    setType(value.type ? value.type.value : 0);
    setTransactionSection(
      value.transactionSection ? value.transactionSection.value : 0
    );
    setUserId(value.userId ? value.userId : 0);
    setUsername(value.username ? value.username : "");
    setProvince(value.province ? value.province.value : 0);
    setCounty(value.county ? value.county.value : 0);
    setUnion(value.union ? value.union.value : 0);

    //reset page
    setInitialPage(0);
  };

  return (
    <Fragment>
      <Card>
        <CardBody>
          <SearchTransaction
            onSearch={onSearch}
            isLoading={useMutate.isLoading}
            ownedProvince={ownedProvince}
            ownedCounty={ownedCounty}
            ownedUnion={ownedUnion}
          />
        </CardBody>
      </Card>
      <Card>
        <CardBody>
          <Card>
            <ListTable
              columns={columns}
              isLoading={
                (ownedProvince && ownedProvince.isLoading) ||
                (ownedCounty && ownedCounty.isLoading) ||
                (ownedUnion && ownedUnion.isLoading) ||
                useMutate.isLoading
              }
              onPageChange={onPageChange}
              pageCountList={pageCount}
              getCustomProps={getCustomProps}
              setPageSize={setPageSize}
              tableData={tableData}
              customPageSize={pageSize}
              initialPage={initialPage}
              setInitialPage={setInitialPage}
            >
              {{
                headerTable: (
                  <FormGroup>
                    <CardTitle>لیست تراکنش ها</CardTitle>
                  </FormGroup>
                ),
              }}
            </ListTable>
          </Card>
        </CardBody>
      </Card>
    </Fragment>
  );
};

export { TransactionList };
