import React, { FC, useState } from "react";
import { useParams } from "react-router-dom";
import { Col } from "reactstrap";
import {
  useCreateLetterToJahad,
  useDownloadJahadLeterByLicenseRequestIdByIssuingResponsible,
  useServeLicenseRequestFile,
} from "../../../../../../../../core/services/api";
import { SimpleSubmitButton } from "../../../../../../../common/Form";
import { SendToJahadModal } from "../../SendToJahadModal/SendToJahadModal";

interface IPropTypes {}

const JahadLetterOperations: FC<IPropTypes> = ({}) => {
  const [isCreateLetterToJahad, setIsCreateLetterToJahad] =
    useState<boolean>(false);

  const getLetterMutation =
    useDownloadJahadLeterByLicenseRequestIdByIssuingResponsible();
  const downloadLetterMutation = useServeLicenseRequestFile();

  const { id } = useParams<{ id: string }>();

  const downloadLetter = () => {
    getLetterMutation.mutate(+id, {
      onSuccess: (val: any) => {
        console.log("---vall---", val);
        downloadLetterMutation.mutate({
          fileName: val.data.result,
          licenseRequestId: +id,
        });
      },
    });
  };

  // const serve = async (files : any) => {
  //   const MainUrl = process.env.REACT_APP_PUBLIC_PATH;
  //   const token = getAccessToken();
  //   const result = [];
  //   await files.forEach(async (item : any) => {
  //     const result = await fetch(
  //       MainUrl + "​/api/Upload/ServeProfilePicture?fileName=" + item,
  //       {
  //         headers: {
  //           Authorization: token ? "Bearer " + token : "",
  //         },
  //       }
  //     );

  //     const arrayBuffer = await result.arrayBuffer();
  //     const blob = new Blob([arrayBuffer]);

  //     const url = URL.createObjectURL(blob);
  //     setAllowToRefetch(0);
  //     setUserProfilePicture(url);
  //   });
  // };

  return (
    <>
      <SendToJahadModal
        title="ایجاد نامه جدید"
        isOpen={isCreateLetterToJahad}
        toggleModal={() => setIsCreateLetterToJahad(false)}
        sendMutation={useCreateLetterToJahad}
        isRedirect={false}
      />
      <Col md="auto">
        <SimpleSubmitButton
          type="button"
          isLoading={false}
          btnText="ایجاد نامه جدید"
          onCLick={() => setIsCreateLetterToJahad(true)}
        />
      </Col>
      <Col md="auto">
        <SimpleSubmitButton
          type="button"
          isLoading={
            getLetterMutation.isLoading || downloadLetterMutation.isLoading
          }
          btnText="دانلود نامه جهاد"
          onCLick={downloadLetter}
        />
      </Col>
    </>
  );
};

export { JahadLetterOperations };
