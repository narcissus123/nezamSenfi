import React, { useState } from "react";
import { Eye } from "react-feather";
import { useHistory, useLocation, useParams } from "react-router-dom";
import { Button } from "reactstrap";
import { useUserAuth } from "../../../../../../../../core/utils/context/AuthenticationContext";
import { FilesModal } from '../FilesModal/FilesModal'

interface IPropTypes {
  cell: {
    row: {
      values: { id: number; name: any , inquiryId : any };
      original: {
        appendix: any;
        creditStartDate: any;
        letterNumber: any;
        organizationTitle: any;
        destinationCityTitle: any;
        letterTitle: any;
        letterCotent: any;
      };
    };
  };
  status: number;
  from : string;
  secretariatId : any
}

const Actions: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id: letterId, name , inquiryId},
      original: {
        appendix,
        creditStartDate,
        letterNumber,
        organizationTitle,
        destinationCityTitle,
        letterTitle,
        letterCotent,
      },
    },
  },
  status,
  from,
  secretariatId
}) => {
  const history = useHistory();
  let { id } = useParams<any>();

  const location = useLocation();

  const [showSelectModal, setShowSelectModal] = useState<any>(false);

  const { userInfo, role } = useUserAuth();

   console.log("---userinfoooid--", userInfo.userInfoId, secretariatId);
   
  const onLetterClickHandler = () => {
    switch (from) {
      case "County":
        history.push(
          `/ManageRequests/ManagerInquiry/${status}/ConfirmCounty/${id}/letter/${letterId}`
        );
        break;
      case "Province":
        history.push(
          `/ManageRequests/ManagerInquiry/${status}/ConfirmProvince/${id}/letter/${letterId}`
        );
        break;
      case "MainLocation":
        history.push(
          `/ManageRequests/ManagerInquiry/${status}/ConfirmMainLocation/${id}/letter/${letterId}`
        );
        break;
      case "Union":
        history.push(
          `/ManageRequests/ManagerInquiry/${status}/ConfirmUnion/${id}/letter/${letterId}`
        );
        break;
    }
  };

  return (
    <div className="d-flex justify-content-center align-content-center">
      <FilesModal
        backdrop={true}
        from={from}
        inquiryId={letterId}
        isOpen={showSelectModal}
        toggleModal={() => setShowSelectModal((val: any) => !val)}
      />
      <Button
        style={{ margin: "3px" }}
        size="sm"
        color="info"
        onClick={onLetterClickHandler}
      >
        نمایش &nbsp;
        <Eye
          style={{ position: "relative", top: "-2px" }}
          size={12}
          color="white"
        />
      </Button>
      {userInfo.userInfoId === secretariatId && (
        <Button
          style={{ margin: "3px" }}
          size="sm"
          color="primary"
          onClick={() => {
            setShowSelectModal(true);
          }}
        >
          پیوست ها &nbsp;
          <Eye
            style={{ position: "relative", top: "-2px" }}
            size={12}
            color="white"
          />
        </Button>
      )}{" "}
    </div>
  );
};

export { Actions };
