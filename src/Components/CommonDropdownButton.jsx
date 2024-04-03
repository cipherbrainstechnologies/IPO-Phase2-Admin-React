import React from "react";
import CommonButton from "./CommonButton";
import CommonFilterIcon from "./CommonFilterIcon";

const CommonDropdownButton = () => {
  return (
    <>
      <button
        type="button"
        class="btn btn-light-primary me-3"
        data-kt-menu-trigger="click"
        data-kt-menu-placement="bottom-end"
      >
        <span class="svg-icon svg-icon-2">
          <CommonFilterIcon />
        </span>
        Filter
      </button>

      <div
        class="menu menu-sub menu-sub-dropdown w-300px w-md-325px"
        data-kt-menu="true"
      >
        <div class="px-7 py-5">
          <div class="fs-5 text-dark fw-bold">Filter Options</div>
        </div>

        <div class="separator border-gray-200"></div>

        <div class="px-7 py-5" data-kt-user-table-filter="form">
          <div class="mb-10">
            <label class="form-label fs-6 fw-semibold">IPO Status:</label>
            <select
              class="form-select form-select-solid fw-bold"
              data-kt-select2="true"
              data-placeholder="Select option"
              data-allow-clear="true"
              data-kt-user-table-filter="status"
              data-hide-search="true"
            >
              <option></option>
              <option value="Live">Live</option>
              <option value="Waiting Allotment">Waiting Allotment</option>
              <option value="Allotment Out">Allotment Out</option>
              <option value="Upcoming">Upcoming</option>
              <option value="Listed">Listed</option>
            </select>
          </div>

          <div class="d-flex justify-content-end">
            <button
              type="reset"
              class="btn btn-light btn-active-light-primary fw-semibold me-2 px-6"
              data-kt-menu-dismiss="true"
              data-kt-user-table-filter="reset"
            >
              Reset
            </button>

            <button
              type="submit"
              class="btn btn-primary fw-semibold px-6"
              data-kt-menu-dismiss="true"
              data-kt-user-table-filter="filter"
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default CommonDropdownButton;
