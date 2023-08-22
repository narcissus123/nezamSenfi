import React from "react";
import { ErrorPage } from "./ErrorPage/ErrorPage";

class ErrorBoundary extends React.Component {
  state = { hasError: false };
  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    //this.setState()
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // You can render any custom fallback UI
      return <ErrorPage />;
    }

    return this.props.children;
  }
}
export { ErrorBoundary };
