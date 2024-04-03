import React, { useEffect, useRef } from "react";
import { useState } from "react";
import UserImage from "../assets/media/user/300-1.jpg";
import DarkModeIcon from "../assets/media/Icons/DarkModeIcon";
import HeaderMenuToggleIcon from "../assets/media/Icons/HeaderMenuToggleIcon";
import LightModeIcon from "../assets/media/Icons/LightModeIcon";
import SidebarMobileToggleIcon from "../assets/media/Icons/SidebarMobileToggleIcon";
import SystemDefaultModeIcon from "../assets/media/Icons/SystemDefaultModeIcon";
import ThemeDarkShowIcon from "../assets/media/Icons/ThemeDarkShowIcon";
import ThemeLightShowIcon from "../assets/media/Icons/ThemeLightShowIcon";
import DefaultSmallLogo from "../assets/media/logos/default-small.svg";
import "../assets/css/navbarDropdownStyle.css";
import { Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  mobileActiveClass,
  setActiveClass,
  setAnim,
} from "../redux/slice/sidebarToggleSlice";
// src\assets\media\user\300-1.jpg
const NavBar = () => {
  const { mobileActive } = useSelector((state) => state.toggleReducer);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleOpenDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    return navigate("/");
  };

  const handleToggle = () => {
    dispatch(mobileActiveClass(!mobileActive));
  };

  return (
    <>
      <div id="kt_app_header" className="app-header">
        <div
          className="app-container container-fluid d-flex align-items-stretch justify-content-between"
          id="kt_app_header_container"
        >
          <div
            className="d-flex align-items-center d-lg-none ms-n3 me-1 me-md-2"
            title="Show sidebar menu"
            onClick={handleToggle}
          >
            <div
              className="btn btn-icon btn-active-color-primary w-35px h-35px "
              id="kt_app_sidebar_mobile_toggle"
            >
              <span className="svg-icon svg-icon-2 svg-icon-md-1">
                <SidebarMobileToggleIcon />
              </span>
            </div>
          </div>

          <div className="d-flex align-items-center flex-grow-1 flex-lg-grow-0">
            <a href="#" className="d-lg-none">
              <img alt="Logo" src={DefaultSmallLogo} className="h-30px" />
            </a>
          </div>
          <div
            className="d-flex align-items-stretch justify-content-end flex-lg-grow-1"
            id="kt_app_header_wrapper"
          >
            <div className="app-navbar flex-shrink-0">
              <div className="app-navbar-item ms-1 ms-md-3">
                <a
                  href="#"
                  className="btn btn-icon btn-custom btn-icon-muted btn-active-light btn-active-color-primary w-30px h-30px w-md-40px h-md-40px "
                  data-kt-menu-trigger="{default: click, lg: hover}"
                  data-kt-menu-attach="parent"
                  data-kt-menu-placement="bottom-end"
                >
                  <span className="svg-icon theme-light-show svg-icon-2">
                    <ThemeLightShowIcon />
                  </span>
                  <span className="svg-icon theme-dark-show svg-icon-2">
                    <ThemeDarkShowIcon />
                  </span>
                </a>
                <div
                  className="menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-title-gray-700 menu-icon-muted menu-active-bg menu-state-color fw-semibold py-4 fs-base w-150px"
                  data-kt-menu="true"
                  data-kt-element="theme-mode-menu"
                >
                  <div className="menu-item px-3 my-0">
                    <a
                      href="#"
                      className="menu-link px-3 py-2"
                      data-kt-element="mode"
                      data-kt-value="light"
                    >
                      <span className="menu-icon" data-kt-element="icon">
                        <span className="svg-icon svg-icon-3">
                          <LightModeIcon />
                        </span>
                      </span>
                      <span className="menu-title">Light</span>
                    </a>
                  </div>
                  <div className="menu-item px-3 my-0">
                    <a
                      href="#"
                      className="menu-link px-3 py-2"
                      data-kt-element="mode"
                      data-kt-value="dark"
                    >
                      <span className="menu-icon" data-kt-element="icon">
                        <span className="svg-icon svg-icon-3">
                          <DarkModeIcon />
                        </span>
                      </span>
                      <span className="menu-title">Dark</span>
                    </a>
                  </div>
                  <div className="menu-item px-3 my-0">
                    <a
                      href="#"
                      className="menu-link px-3 py-2"
                      data-kt-element="mode"
                      data-kt-value="system"
                    >
                      <span className="menu-icon" data-kt-element="icon">
                        <span className="svg-icon svg-icon-3">
                          <SystemDefaultModeIcon />
                        </span>
                      </span>
                      <span className="menu-title">System</span>
                    </a>
                  </div>
                </div>
              </div>
              <div
                className="app-navbar-item ms-1 ms-md-3"
                id="kt_header_user_menu_toggle"
              >
                <div
                  className="cursor-pointer symbol symbol-30px symbol-md-40px show menu-dropdown"
                  data-kt-menu-trigger={{ default: "click", lg: "hover" }}
                  data-kt-menu-attach="parent"
                  data-kt-menu-placement="bottom-end"
                  onClick={handleOpenDropdown}
                >
                  <img src={UserImage} alt="user" />
                </div>
                <div
                  className={`navbarDropdown ${
                    isOpen ? "show" : ""
                  } menu menu-sub menu-sub-dropdown menu-column menu-rounded menu-gray-800 menu-state-bg menu-state-color fw-semibold py-4 fs-6 w-275px`}
                  data-kt-menu="true"
                >
                  <div className="separator my-2"></div>
                  <div className="menu-item px-5">
                    <button
                      onClick={handleLogout}
                      className="btn btn-primary w-100"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
              <div
                className="app-navbar-item d-lg-none ms-2 me-n3"
                title="Show header menu"
              >
                <div
                  className="btn btn-icon btn-active-color-primary w-30px h-30px w-md-35px h-md-35px"
                  id="kt_app_header_menu_toggle"
                >
                  <span className="svg-icon svg-icon-2 svg-icon-md-1">
                    <HeaderMenuToggleIcon />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {mobileActive && (
        <div
          onClick={handleToggle}
          style={{ zIndex: "105" }}
          className="drawer-overlay"
        ></div>
      )}
    </>
  );
};

export default NavBar;
