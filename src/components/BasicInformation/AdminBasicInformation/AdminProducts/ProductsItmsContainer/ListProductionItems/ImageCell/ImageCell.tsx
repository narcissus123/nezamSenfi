import React, { useContext, useEffect, useState } from "react";
import { getAccessToken } from "../../../../../../../core/services/authentication/authentication.service";
import { ShowImage } from "../../../../../../common/DownloadRow/ShowImage/ShowImage";

interface IPropTypes {
  cell: {
    row: {
      values: { id: number , images : any};
      original : any;
    };
  };
}

const ImageCell: React.FC<IPropTypes> = ({
  cell: {
    row: {
      values: { id , images },
      original
    },
  },
}) => {

  const [ imageUrl , setImageUrl] = useState<any>("")
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    if (images.length > 0) {
      serve(images);
    }
        
  }, [images]);

  const serve = async (files : any) => {
    const MainUrl = process.env.REACT_APP_PUBLIC_PATH;
    const token = getAccessToken();
   
      const result = await fetch(
        MainUrl + "/api/Upload/ServePublicPicture?fileName=" + files[0],
        {
          headers: {
            Authorization: token ? "Bearer " + token : "",
          },
        }
      );

      const arrayBuffer = await result.arrayBuffer();
      const blob = new Blob([arrayBuffer]);

      const url = URL.createObjectURL(blob);

      setImageUrl(url)
  
  };

  return (
    <div className="d-flex justify-content-center align-content-center">
      {isShow && (
        <ShowImage
          isOpen={isShow}
          toggle={() => setIsShow(false)}
          image={imageUrl}
        />
      )}
      {images.length > 0 && (
        <img
          src={imageUrl}
          alt="product"
          width="50"
          height="50"
          style={{ cursor: "pointer" }}
          onClick={() => setIsShow(true)}
        />
      )}
    </div>
  );
};

export { ImageCell };

