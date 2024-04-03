import moment from "moment/moment";
import React, { useState } from "react";
import { useEffect } from "react";
import ReactModal from "react-modal";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import CommonAddIcon from "../assets/media/Icons/CommonAddIcon";
import AppContentLayout from "../Components/AppContentLayout";
import NotificationModal from "../Components/NotificationModal";
import PageHeading from "../Components/PageHeading";
import SpinnerLoader from "../Components/SpinnerLoader";
import { setModalIsOpen } from "../redux/slice/modalSlice";
import { getAllNotifications } from "../redux/slice/notificationsSlice";

const Notifications = () => {
  const customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "50%",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
      zIndex: "200",
      maxWidth: "650px",
    },
  };
  const [showModal, setShowModal] = useState({
    showClass: "",
    displayClass: "",
    modalBackdrop: "",
  });
  const { createData, getAllData, isLoading } = useSelector(
    (state) => state.notificationReducer
  );
  const { modalIsOpen } = useSelector((state) => state.modalReducer);
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(10);
  const [totalPageLimit, setTotalPageLimit] = useState(10);
  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1);
  };
  const timeFormat = (secs) => {
    if (secs) {
      let output = new Date(secs * 1000);
      let formatTime = moment(output).format("MMM D, yyyy LT");

      return formatTime;
    }
  };
  useEffect(() => {
    if (getAllData?.Total <= totalPageLimit) {
      let payload = {
        page: 1,
        limit: totalPageLimit,
      };
      dispatch(getAllNotifications({ payload }));
    } else {
      let payload = {
        page: currentPage,
        limit: totalPageLimit,
      };
      dispatch(getAllNotifications({ payload }));
    }
  }, [createData, totalPageLimit]);
  useEffect(() => {
    if (getAllData?.Total !== undefined) {
      let totalCount = Math.ceil(getAllData?.Total / totalPageLimit);
      setTotalPage(totalCount);
      return;
    }
  }, [getAllData?.Total, totalPageLimit]);
  return (
    <>
      <PageHeading title={"Notification Entries"} />
      <AppContentLayout>
        <div className="card">
          <div className="card-header border-0 pt-6">
            <div className="card-title">
              <div className="d-flex align-items-center position-relative my-1">
                {/* dropdown here */}
              </div>
            </div>

            <div className="card-toolbar">
              <div
                className="d-flex justify-content-end"
                data-kt-user-table-toolbar="base"
              >
                <div className="d-flex align-items-center position-relative">
                  <span>Search:</span>
                  <input
                    type="text"
                    data-kt-news-table-filter="search"
                    className="form-control form-control-sm form-control-solid w-180px mx-2"
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  data-bs-toggle="modal"
                  data-bs-target="#kt_modal_add_offer"
                  onClick={() => {
                    setShowModal({
                      ...showModal,
                      showClass: "show",
                      displayClass: "block",
                      modalBackdrop: "modal-backdrop",
                    });
                  }}
                >
                  <span className="svg-icon svg-icon-2">
                    <CommonAddIcon />
                    <span style={{ marginLeft: "0.5rem" }}>
                      Add Notification
                    </span>
                  </span>
                </button>
              </div>
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
                        <th className="min-w-125px">Sr No.</th>
                        <th className="min-w-125px">Title</th>
                        <th className="min-w-125px mw-350px">Description</th>
                        <th className="min-w-125px">Redirect</th>
                        <th className="min-w-125px">Date</th>
                      </tr>
                    </thead>

                    <tbody className="fw-semibold text-gray-600">
                      {getAllData?.AllNotification?.map((data, index) => {
                        return (
                          <tr key={data?.id}>
                            <td>{index + 1}</td>
                            <td>{data?.notificationTitle}</td>
                            <td className="mw-350px">
                              {data?.notificationDescription}
                            </td>
                            <td>{data?.Redirect}</td>
                            <td>
                              {timeFormat(data?.createdAt?._seconds)?.toString()
                                ? timeFormat(
                                    data?.createdAt?._seconds
                                  )?.toString()
                                : "N/A"}
                            </td>
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
                  Showing 1 to {getAllData?.AllNotification?.length} of{" "}
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
      <div
        className={`${showModal.modalBackdrop} fade ${showModal.showClass}`}
      ></div>
      <div
        className={`modal fade kt_modal_edit_user ${showModal.showClass}`}
        id="kt_modal_edit_user"
        tabIndex="-1"
        aria-hidden="true"
        style={{ display: `${showModal.displayClass}` }}
        role="dialog"
      >
        <NotificationModal showModal={showModal} setShowModal={setShowModal} />
      </div>
    </>
  );
};

export default Notifications;
