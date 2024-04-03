import React from "react";

const Footer = () => {
  return (
    <div id="kt_app_footer" className="app-footer">
      <div className="app-container container-fluid d-flex flex-column flex-md-row flex-center flex-md-stack py-3">
        <div className="text-dark order-2 order-md-1">
          <span className="text-muted fw-semibold me-1">2022 &copy;</span>
          <a
            href="https://cipherbrains.com"
            target="_blank"
            className="text-gray-800 text-hover-primary"
          >
            Cipherbrains Technologies
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
