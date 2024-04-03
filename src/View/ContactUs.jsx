import moment from "moment/moment";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import CommonSearchIcon from "../assets/media/Icons/CommonSearchIcon";
import AppContentLayout from "../Components/AppContentLayout";
import PageHeading from "../Components/PageHeading";
import SpinnerLoader from "../Components/SpinnerLoader";
import { getAllContacts } from "../redux/slice/contactUsSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ContactUs = () => {
  const { getAllData, isLoading } = useSelector(
    (state) => state.contactUsReducer
  );
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(10);
  const [totalPageLimit, setTotalPageLimit] = useState(10);
  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1);
  };
  const dispatch = useDispatch();
  const timeFormat = (secs) => {
    if (secs) {
      let output = new Date(secs * 1000);
      let formatTime = moment(output).format("D MMM LT");
      return formatTime;
    }
  };
  const handleSearch = (val) => {
    const payload = {
      page: 1,
      limit: 10,
      search: val ? val : "",
    };
    dispatch(getAllContacts({ payload }));
  };
  useEffect(() => {
    let payload = {
      page: currentPage,
      limit: totalPageLimit,
    };
    dispatch(getAllContacts({ payload }));
  }, [totalPageLimit, currentPage]);
  useEffect(() => {
    if (getAllData?.Total !== undefined) {
      let totalCount = Math.ceil(getAllData?.Total / totalPageLimit);
      setTotalPage(totalCount);
      return;
    }
  }, [getAllData?.Total, totalPageLimit]);

  return (
    <>
      <PageHeading title={"Contact Us Entries"} />
      <AppContentLayout>
        <div className="card">
          <div className="card-header border-0 pt-6">
            <div className="d-flex align-items-center position-relative my-1">
              <span className="svg-icon svg-icon-1 position-absolute ms-6">
                <CommonSearchIcon />
              </span>
              <input
                type="text"
                data-kt-user-table-filter="search"
                className="form-control form-control-solid w-250px ps-14"
                placeholder="Search Contacts"
                onChange={(e) => handleSearch(e.target.value)}
              />
            </div>
          </div>
          <div className="card-body">
            {isLoading ? (
              <SpinnerLoader />
            ) : (
              <div className="dataTables_wrapper dt-bootstrap4 no-footer">
                <div className="table-responsive">
                  <table
                    className="table table-striped table-row-bordered gy-5 gs-7 border rounded"
                    id="contact_entries_table"
                  >
                    <thead>
                      <tr className="text-start text-gray-400 fw-bold fs-7 text-uppercase gs-0">
                        <th className="min-w-125px">Name</th>
                        <th className="min-w-125px">Email</th>
                        <th className="min-w-125px">Phone</th>
                        <th className="min-w-125px">Subject</th>
                        <th className="min-w-125px">Date</th>
                        <th className="min-w-125px">Message</th>
                      </tr>
                    </thead>

                    <tbody className="fw-semibold text-gray-600">
                      {getAllData?.AllContact?.map((contactInfo) => {
                        return (
                          <tr key={contactInfo?.id}>
                            <td>
                              {contactInfo?.firstName} {contactInfo?.lastName}
                            </td>
                            <td>{contactInfo?.email}</td>
                            <td>{contactInfo?.phone}</td>
                            <td>{contactInfo?.subject}</td>
                            <td>
                              {" "}
                              {timeFormat(
                                contactInfo?.createdAt?._seconds
                              )?.toString()
                                ? timeFormat(
                                    contactInfo?.createdAt?._seconds
                                  )?.toString()
                                : "N/A"}
                            </td>
                            <td className="mw-350px">{contactInfo?.message}</td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            <div className="d-flex">
              <div className="dataTables_length d-flex w-auto align-items-center ">
                <select
                  style={{
                    minWidth: "fit-content",
                  }}
                  className="form-select form-select-sm form-select-solid"
                  onChange={(e) => setTotalPageLimit(e.target.value)}
                >
                  {" "}
                  <option value="10">10</option>
                  <option value="25">25</option>
                  <option value="50">50</option>
                  <option value="100">100</option>
                </select>
                <span
                  style={{
                    minWidth: "fit-content",
                  }}
                >
                  {" "}
                  Showing 1 to {getAllData?.AllContact?.length} of{" "}
                  {getAllData?.Total} records
                </span>
              </div>
              <div className="pagination">
                <ReactPaginate
                  breakLabel="..."
                  nextLabel=">"
                  onPageChange={handlePageClick}
                  pageRangeDisplayed={0}
                  pageCount={totalPage}
                  previousLabel="<"
                  renderOnZeroPageCount={1}
                />
              </div>
            </div>
          </div>
        </div>
      </AppContentLayout>
      <ToastContainer />
    </>
  );
};

export default ContactUs;
