import React, { useState, useContext } from "react";

export const profileContext = React.createContext<any>(null);

export const useRefetchState = () => {
  const pc = useContext(profileContext);
  if (pc === null) {
    throw new Error("useRefetchState Must be inside of Provider");
  }
  return pc;
};

const ProfileProvider: React.FC = ({ children }) => {
  const [userProfilePicture, setUserProfilePicture] = useState<Blob|null>(null); 
  const [allowToRefetch, setAllowToRefetch] = useState<number>(1); 

  return (
    <profileContext.Provider
      value={{
        userProfilePicture,
        setUserProfilePicture: (val: any) => {
          setUserProfilePicture(val);
        },
        allowToRefetch,
        setAllowToRefetch: (val: any) => {
          setAllowToRefetch(val);
        },
      }}
    >
      {children}
    </profileContext.Provider>
  );
};

export { ProfileProvider };
