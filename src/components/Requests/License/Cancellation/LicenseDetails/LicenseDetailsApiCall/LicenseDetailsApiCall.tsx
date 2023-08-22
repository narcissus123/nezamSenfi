import React, { FC, useEffect, useState } from "react";
import { User } from "react-feather";
import { Link, useParams } from "react-router-dom";
import { Button, Col, Collapse, ListGroup, ListGroupItem, Row } from "reactstrap";



interface IPropTypes {
  getCancellationDetailsQuery: any
  setRequestInfo:any
}

const LicenseDetailsApiCall: FC<IPropTypes> = ({
  getCancellationDetailsQuery,
  setRequestInfo,
}) => {
  const { id } = useParams<any>();

  const { isLoading, data, isSuccess, isFetching } =
    getCancellationDetailsQuery(id);

  useEffect(() => {
    try {
      if (data && data.data) {
        let result = data.data.result;
        setRequestInfo(result);
      }
    } catch (err) {}
  }, [isSuccess]);

  return <></>;
};

export { LicenseDetailsApiCall };
