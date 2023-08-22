import React from "react";
import { toast, ToastContainer } from "react-toastify";

const notifyDefault = (text: string): React.ReactText => toast(text);
const notifySuccess = (text: string): React.ReactText => toast.success(text);
const notifyError = (text: string): React.ReactText => toast.error(text);
const notifyInfo = (text: string): React.ReactText => toast.info(text);
const notifyWarning = (text: string): React.ReactText => toast.warning(text);

const Toastr: React.FC = () => {
  return (
    <ToastContainer
      //position="top-right"
      autoClose={3000}
      newestOnTop
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable
      pauseOnHover
    />
  );
};

export {
  Toastr,
  notifyDefault,
  notifyError,
  notifyInfo,
  notifySuccess,
  notifyWarning,
};
