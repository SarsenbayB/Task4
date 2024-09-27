import React from "react";

import Footer from "../components/Footer/Footer";
import Header from "../components/Header/Header";

export const Layout = ({ children }) => {
  return (
    <React.Fragment>
      <Header />
      {children}
      <Footer />
    </React.Fragment>
  );
};
