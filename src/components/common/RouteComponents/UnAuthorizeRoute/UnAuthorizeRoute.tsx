import React, {useState, Suspense ,useEffect} from "react";
import { Route ,useHistory,useLocation,Redirect} from "react-router-dom";
import { AllStatusType } from "../../../../core/models";

import { ContextLayout } from "../../../../core/utils/context/Layout";
import { useStatusPermission } from "../../../../core/utils/context/StatusProvider";
import { FallBackSpinner } from "../../Spinner/FallBackSpinner/FallbackSpinner";


interface IPropTypes {
  component: any;
  Layout: any;
  path: string;
  status?: AllStatusType[];
  statusKey?: string;
  exact?: boolean;
  redirectPath?:string
  redirectName?:string
}

interface ICanStatus{
  status?: AllStatusType[];
  statusKey?: string;
  redirectPath?:string
  redirectName?:string
}


const CanStatus:React.FC<ICanStatus> = ({children,status=["default-have-access"],statusKey,redirectPath,redirectName}) => {

    const [haveAccess,setHaveAccess] = useState(true)
    const history = useHistory()
    const location = useLocation()
    const {statusInfo} = useStatusPermission()
    let Key = statusKey ? statusKey : ""

    useEffect(() => {

      if(status[0] !== "default-have-access"){
        let match = status.some((p:any) => p === statusInfo[Key])
        if(!match){
          setHaveAccess(false)
        }
      }    
    },[location])

    if(haveAccess){
      return <>
        {
          children
        }
      </>
    }else{
        return <Redirect to='/access-denied' />
    }
  
}

const UnAuthorizeRoute: React.FC<IPropTypes> = ({
  component: Component,
  path,
  status,
  exact,
  Layout,
  statusKey,
  redirectPath,
  redirectName
}) => {
  
  return (
    <Route
      path={path}
      exact={exact}
      render={(props) => {
        return (
          <ContextLayout.Consumer>
            {(context) => {
              return (
                <Layout {...props}>
                  <CanStatus status={status} statusKey={statusKey} redirectPath={redirectPath} redirectName={redirectName}>
                      <Suspense fallback={<FallBackSpinner />}>
                        <Component {...props}/>
                      </Suspense>
                  </CanStatus>
                </Layout>
              );
            }}
          </ContextLayout.Consumer>
        );
      }}
    />
  );
};

export { UnAuthorizeRoute };


