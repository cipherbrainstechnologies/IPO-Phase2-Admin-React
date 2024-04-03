import React from "react";

const TabPaneLayout = ({ children }) => {
  return (
    <div className="tab-pane fade show active" role="tab-panel">
      <div className="d-flex flex-column gap-7 gap-lg-10">{children}</div>
    </div>
  );
};

export default TabPaneLayout;
