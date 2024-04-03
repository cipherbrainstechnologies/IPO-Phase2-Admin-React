import React, { Suspense } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ClipLoader } from "react-spinners";
import Footer from "../Components/Footer";
import NavBar from "../Components/NavBar";
import Sidebar from "../Components/Sidebar";

const ProtectedRoute = (props) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { Component } = props;
  const checkUserToken = () => {
    const userToken = localStorage.getItem("access_token");
    if (!userToken || userToken === "undefined") {
      setIsLoggedIn(false);
      navigate("/");
    } else {
      setIsLoggedIn(true);
    }
  };
  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);
  return (
    <>
      <div className="d-flex flex-column flex-root app-root" id="kt_app_root">
        <div
          className="app-page flex-column flex-column-fluid"
          id="kt_app_page"
        >
          <NavBar />
          <div
            className="app-wrapper flex-column flex-row-fluid"
            id="kt_app_wrapper"
          >
            <Sidebar />
            <div
              className="app-main flex-column flex-row-fluid"
              id="kt_app_main"
            >
              <div className="d-flex flex-column flex-column-fluid">
                <Suspense
                  fallback={<ClipLoader color="#009270" width={"100%"} />}
                >
                  <Component />
                </Suspense>
              </div>
            </div>
            <Footer />
          </div>
        </div>
      </div>
    </>
  );
};

export default ProtectedRoute;
