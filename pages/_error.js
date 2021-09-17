import React from "react";
import Router from "next/router";

export default function _error() {
  React.useEffect(() => {
    // for all bad energy and bad days
    Router.push("/error");
    // Amen
  });

  return <div />;
}
