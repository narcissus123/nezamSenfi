import { Actions } from "./Actions/Actions";


export const columns = [
  {
    Header: "شناسه",
    width: 50,
    accessor: "id",
    disableFilters: true,
  },
  {
    Header: "نوع تضمین",
    accessor: "guaranteeTypeTitle",
    disableFilters: true,
  },
  {
    Header: "تاریخ",
    accessor: "date",
    disableFilters: true,
  },
  {
    Header: "نام و نام خانوادگی ضامن",
    accessor: "sponsorName",
    disableFilters: true,
  },
  {
    Header: "عملیات",
    accessor: "operations",
    disableFilters: true,
    width: 180,
    Cell: Actions,
    getProps: (props: any) => ({
      setFormData: props.setFormData,
      formData: props.formData,
    }),
  },
];
