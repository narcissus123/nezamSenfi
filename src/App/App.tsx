import React from "react";
import "react-perfect-scrollbar/dist/css/styles.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Route, Router, Switch } from "react-router-dom";
import { FailPage } from "../components/WalletContainer/FailPage/FailPage";
import { SuccessPage } from "../components/WalletContainer/SuccessPage/SuccessPage";
import { useUserAuth } from "../core/utils/context/AuthenticationContext";
import { AuthenticatedApp } from "./AuthenticatedApp";
import { UnAuthenticatedApp } from "./UnAuthenticatedApp";
import { history } from "../history";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      cacheTime: 0,
      staleTime: 0,
      refetchOnWindowFocus: false,
    },
    mutations: {
      retry: false,
    },
  },
});

const App: React.FC = () => {
  const { token, setTokenState } = useUserAuth();
  // const [intervalId, setIntervalId] = useState<any>(0);

  // useEffect(() => {
  //   if (token) {
  //     const interval = setInterval(
  //       (function (scope) {
  //         return async function () {
  //           const isExpiry = getItem("isExpiry");
  //           if (!isExpiry || isExpiry === "false") {
  //             const expiry = getItem("expiry");
  //             setItem("isExpiry", true);

  //             const access_token = await CheckGreaterTimeStamp(
  //               expiry ? +expiry : null
  //             );
  //             if (access_token) setTokenState(access_token);
  //             setItem("isExpiry", false);
  //             setTimeout(() => {
  //               setItem("isExpiry", false);
  //             }, 500);
  //           }
  //         };
  //       })(this),
  //       15000
  //     );
  //     setIntervalId(interval);
  //   }
  //   return () => {
  //     if (token) clearInterval(intervalId);
  //   };
  // }, []);

  return (
    <QueryClientProvider client={queryClient}>
      {token ? <AuthenticatedApp /> : <UnAuthenticatedApp />}
    </QueryClientProvider>
  );
};
export { App };
