import React from "react";

const PageHeading = ({ title }) => {
  return (
    <>
      <div id="kt_app_toolbar" className="app-toolbar py-3 py-lg-6">
        <div
          id="kt_app_toolbar_container"
          className="app-container container-xxl d-flex flex-stack"
        >
          <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
            <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
              {title}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
};

export default PageHeading;
