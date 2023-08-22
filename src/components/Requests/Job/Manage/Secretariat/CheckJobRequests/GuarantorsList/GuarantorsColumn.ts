import { GuarantorAction } from "./GuarantorAction/GuarantorAction";


export const columns = [
  {
    Header: "شماره",
    accessor: "guaranteeTypeNumber",
    width:230,
    disableFilters: true,
  },
  {
    Header: "نام و نام خانوادگی",
    accessor: "fullName",
    width:230,
    disableFilters: true,
  },
  {
    Header: "کد ملی ضامن",
    accessor: "nationalCode",
    width:230,
    disableFilters: true,
  },
  {
    Header: "شماره تلفن ضامن",
    accessor: "phoneNumber",
    width:230,
    disableFilters: true,
  },
  {
    Header: "جنسیت ضامن",
    accessor: "genderTitle",
    width:230,
    disableFilters: true,
  },
  {
    Header: "میزان ضمانت",
    accessor: "amount",
    width:230,
    disableFilters: true,
  },
  {
    Header: "تاریخ",
    accessor: "doDate",
    width:230,
    disableFilters: true,
  },
  {
    Header: "تلفن ثابت",
    accessor: "homePhone",
    width:230,
    disableFilters: true,
  },
  {
    Header: "آدرس",
    accessor: "addres",
    width:430,
    disableFilters: true,
  },
  {
    Header: "آدرس محل کار",
    accessor: "workAddres",
    width:430,
    disableFilters: true,
  },
  {
    Header: "کد پستی",
    accessor: "postalCode",
    width:230,
    disableFilters: true,
  },
  {
    Header: "عملیات",
    accessor: "operations",
    disableFilters: true,
    width: 180,
    Cell: GuarantorAction,
    getProps: (props: any) => ({
      mutation: props.mutation,
      setInitialPage: props.setInitialPage,
    }),
  },
];
