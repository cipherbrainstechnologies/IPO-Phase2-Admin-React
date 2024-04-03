import React from "react";
import NavBar from "../Components/NavBar";
import Sidebar from "../Components/Sidebar";
import Footer from "../Components/Footer";

const Layout = ({ children }) => {
  return (
    <div className="d-flex flex-column flex-root app-root" id="kt_app_root">
      <div className="app-page flex-column flex-column-fluid" id="kt_app_page">
        <NavBar />
        <div
          className="app-wrapper flex-column flex-row-fluid"
          id="kt_app_wrapper"
        >
          <Sidebar />
          <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
            <div className="d-flex flex-column flex-column-fluid">
              {children}
            </div>
          </div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Layout;
