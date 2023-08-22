import React, { useEffect, useState } from "react";
import { User } from "react-feather";
import { Col, Row } from "reactstrap";
import { getAccessToken } from "../../../core/services/authentication/authentication.service";
import { ShowImage } from "../DownloadRow/ShowImage/ShowImage";


interface IPropTypes {
  profilePic: string | null

}

const ProfilePictureServer: React.FC<IPropTypes> = ({
  profilePic

}) => {


  const [expertPicture, setExpertPicture] = useState<any>(null);
  const [isShow, setIsShow] = useState(false);

  const loadProfile = async () => {
    const MainUrl = process.env.REACT_APP_PUBLIC_PATH;
    const token = getAccessToken();

    const result = await fetch(
      MainUrl +
        "​/api/Upload/ServeProfilePicture?fileName=" +
        profilePic,
      {
        headers: {
          Authorization: token ? "Bearer " + token : "",
        },
      }
    );
    if (result.status === 200 || result.ok) {
      const arrayBuffer = await result.arrayBuffer();
      const blob = new Blob([arrayBuffer]);

      const url = URL.createObjectURL(blob);
      setExpertPicture(url);
    } else {
      setExpertPicture(null);
    }
  };

  useEffect(()=>{ 
    if (profilePic) {
      loadProfile();
    } else {
      setExpertPicture(null);
    }
    
  },[profilePic])


  return (
    <>
      <Row style={{ margin: "25px" }}>
        {expertPicture && (
          <ShowImage
            isOpen={isShow}
            modalSize="md"
            toggle={() => setIsShow(false)}
            image={expertPicture}
          />
        )}
        <Col className="d-flex justify-content-center" md="12">
          {expertPicture ? (
            <img
              src={expertPicture}
              className="round"
              height="200"
              width="200"
              alt="avatar"
              style={{
                border: "1px solid #ccc",
                boxShadow: "0px 0px 1px 1px #ccc",
                cursor: "pointer",
              }}
              onClick={() => setIsShow(true)}
            />
          ) : (
            <User
              width="200"
              height="200"
              className="round"
              style={{
                border: "1px solid #ccc",
                boxShadow: "0px 0px 1px 1px #ccc",
              }}
            />
          )}
        </Col>
      </Row>
    </>
  );
};

export { ProfilePictureServer };
