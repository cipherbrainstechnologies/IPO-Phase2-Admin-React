import React from "react";
import { useRef } from "react";
import { useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import DefaultDarkLogo from "../assets/media/logos/default-dark.svg";
import DefaultSmallLogo from "../assets/media/logos/default-small.svg";
import ContactUsIcon from "../assets/media/Icons/ContactUsIcon";
import FaqsIcon from "../assets/media/Icons/FaqsIcon";
import IpoAllotmentIcon from "../assets/media/Icons/IpoAllotmentIcon";
import MainLineIpoIcon from "../assets/media/Icons/MainLineIpoIcon";
import NewsIcon from "../assets/media/Icons/NewsIcon";
import NotificationsIcon from "../assets/media/Icons/NotificationsIcon";
import OffersIcon from "../assets/media/Icons/OffersIcon";
import PrivacyPolicyIcon from "../assets/media/Icons/PrivacyPolicyIcon";
import SidebarToggleIcon from "../assets/media/Icons/SidebarToggleIcon";
import SmeIpoIcon from "../assets/media/Icons/SmeIpoIcon";
import TermsAndConditionsIcon from "../assets/media/Icons/TermsAndConditionsIcon";
import UserIcon from "../assets/media/Icons/UserIcon";
import { useDispatch, useSelector } from "react-redux";
import { setActiveClass, setAnim } from "../redux/slice/sidebarToggleSlice";

const Sidebar = () => {
  const minimizeSidebar = useRef({ body: document.body, animate: "" });
  const dispatch = useDispatch();
  const { activeClass, anim, mobileActive } = useSelector(
    (state) => state.toggleReducer
  );
  // const [active, setActive] = useState(false);
  // const [anim, setAnim] = useState();

  const handleToggle = () => {
    dispatch(setActiveClass(!activeClass));
    dispatch(setAnim("animating"));
    setTimeout(() => {
      dispatch(setAnim(""));
    }, 100);
  };

  if (activeClass) {
    minimizeSidebar.current.body.setAttribute(
      "data-kt-app-sidebar-minimize",
      "on"
    );
  } else {
    minimizeSidebar.current.body.removeAttribute(
      "data-kt-app-sidebar-minimize"
    );
  }

  return (
    <>
      {/* Sidebar */}
      <div
        id="kt_app_sidebar"
        ref={minimizeSidebar.animate}
        className={`app-sidebar flex-column ${anim} ${
          mobileActive ? "drawer drawer-start drawer-on" : ""
        }`}
        data-kt-drawer="true"
        data-kt-drawer-name="app-sidebar"
        data-kt-drawer-activate="{default: true, lg: false}"
        data-kt-drawer-overlay="true"
        data-kt-drawer-width="225px"
        data-kt-drawer-direction="start"
        data-kt-drawer-toggle="#kt_app_sidebar_mobile_toggle"
      >
        <div className="app-sidebar-logo px-6" id="kt_app_sidebar_logo">
          <NavLink to="/mainline_ipo">
            <img
              alt="Logo"
              src={DefaultDarkLogo}
              className="h-25px app-sidebar-logo-default"
            />
            <img
              alt="Logo"
              src={DefaultSmallLogo}
              className="h-20px app-sidebar-logo-minimize"
            />
          </NavLink>
          {/* Sidebar Toggle */}
          <div
            id="kt_app_sidebar_toggle"
            className={`app-sidebar-toggle btn btn-icon btn-shadow btn-sm btn-color-muted btn-active-color-primary body-bg h-30px w-30px position-absolute top-50 start-100 translate-middle rotate ${
              activeClass ? "active" : ""
            }`}
            onClick={handleToggle}
            data-kt-toggle="true"
            data-kt-toggle-state="active"
            data-kt-toggle-target="body"
            data-kt-toggle-name="app-sidebar-minimize"
          >
            <span className="svg-icon svg-icon-2 rotate-180">
              <SidebarToggleIcon />
            </span>
          </div>
        </div>

        <div className="app-sidebar-menu overflow-hidden flex-column-fluid">
          <div
            id="kt_app_sidebar_menu_wrapper"
            className="app-sidebar-wrapper hover-scroll-overlay-y my-5"
            data-kt-scroll="true"
            data-kt-scroll-activate="true"
            data-kt-scroll-height="auto"
            data-kt-scroll-dependencies="#kt_app_sidebar_logo, #kt_app_sidebar_footer"
            data-kt-scroll-wrappers="#kt_app_sidebar_menu"
            data-kt-scroll-offset="5px"
            data-kt-scroll-save-state="true"
          >
            <div
              className="menu menu-column menu-rounded menu-sub-indention px-3"
              id="#kt_app_sidebar_menu"
              data-kt-menu="true"
              data-kt-menu-expand="false"
            >
              <div className="menu-item">
                <NavLink
                  to="/mainline_ipo"
                  className="menu-link"
                  activeclassname="active"
                >
                  <MainLineIpoIcon />
                  <span className="menu-title">Mainline IPO</span>
                </NavLink>
              </div>

              <div className="menu-item">
                <NavLink to="/sme_ipo" className="menu-link">
                  <SmeIpoIcon />
                  <span className="menu-title">SME IPO</span>
                </NavLink>
              </div>

              <div className="menu-item">
                <NavLink to="/news" className="menu-link">
                  <NewsIcon />
                  <span className="menu-title">News</span>
                </NavLink>
              </div>

              <div className="menu-item">
                <NavLink to="/offers" className="menu-link">
                  <OffersIcon />
                  <span className="menu-title">Offers</span>
                </NavLink>
              </div>
              <div className="menu-item">
                <NavLink to="/banners" className="menu-link">
                  <OffersIcon />
                  <span className="menu-title">Banners</span>
                </NavLink>
              </div>
              <div className="menu-item">
                <NavLink to="/popupcards" className="menu-link">
                  <OffersIcon />
                  <span className="menu-title">Popup Card</span>
                </NavLink>
              </div>
              <div className="menu-item">
                <NavLink to="/faqs" className="menu-link" href="faqs.html">
                  <FaqsIcon />
                  <span className="menu-title">FAQs</span>
                </NavLink>
              </div>

              <div className="menu-item">
                <NavLink to="/ipo_allotment_tips" className="menu-link">
                  <IpoAllotmentIcon />
                  <span className="menu-title">IPO Allotment Tips</span>
                </NavLink>
              </div>

              <div className="menu-item">
                <NavLink to="/privacy_policy" className="menu-link">
                  <PrivacyPolicyIcon />
                  <span className="menu-title">Privacy Policy</span>
                </NavLink>
              </div>

              <div className="menu-item">
                <NavLink to="/terms_conditions" className="menu-link">
                  <TermsAndConditionsIcon />
                  <span className="menu-title">Terms & Conditions</span>
                </NavLink>
              </div>

              <div className="menu-item">
                <NavLink to="/contact_us" className="menu-link">
                  <ContactUsIcon />
                  <span className="menu-title">Contact Us</span>
                </NavLink>
              </div>

              <div className="menu-item">
                <NavLink to="/user" className="menu-link">
                  <UserIcon />
                  <span className="menu-title">User</span>
                </NavLink>
              </div>

              <div className="menu-item">
                <NavLink to="/premium-user" className="menu-link">
                  <UserIcon />
                  <span className="menu-title">Premium User</span>
                </NavLink>
              </div>

              <div className="menu-item">
                <NavLink to="/notifications" className="menu-link">
                  <NotificationsIcon />
                  <span className="menu-title">Notifications</span>
                </NavLink>
              </div>
              <div className="menu-item">
                <NavLink to="/VersionControl" className="menu-link">
                  <NotificationsIcon />
                  <span className="menu-title">Version Control</span>
                </NavLink>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default Sidebar;
