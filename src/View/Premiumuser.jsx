import moment from "moment/moment";
import React, { useEffect, useState } from "react";
import ReactModal from "react-modal";
import ReactPaginate from "react-paginate";
import { useDispatch, useSelector } from "react-redux";
import CommonEditIcon from "../assets/media/Icons/CommonEditIcon";
import CommonMultiplyIcon from "../assets/media/Icons/CommonMultiplyIcon";
import CommonSearchIcon from "../assets/media/Icons/CommonSearchIcon";
import AppContentLayout from "../Components/AppContentLayout";
import PageHeading from "../Components/PageHeading";
import SpinnerLoader from "../Components/SpinnerLoader";
import UserModal from "../Components/UserModal";
import { setModalIsOpen } from "../redux/slice/modalSlice";
import { getAllUsers, getUserById  , getAllPremiumUsers} from "../redux/slice/usersSlice";
import { ToastContainer } from "react-toastify";
import UserImage from "../../src/assets/media/ipo/man.png";
import "react-toastify/dist/ReactToastify.css";
const Users = () => {
  const [singleUserData, setSingleUserData] = useState("");
  const [showModal, setShowModal] = useState({
    showClass: "",
    displayClass: "",
    modalBackdrop: "",
  });
  const { updateData, premiumUsers, isLoading } = useSelector(
    (state) => state.userReducer
  );
  const [currentPage, setCurrentPage] = useState(1);

  const [filteredDataSource, setFilteredDataSource] = useState(1);
  const [search, setSearch] = useState("");

  const [recordsPerPage, setRecordsPerPage] = useState(10);
  const userRecord = premiumUsers && premiumUsers ? premiumUsers : [];
  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = userRecord.slice(
    indexOfFirstRecord,
    indexOfLastRecord
  );
  const totalPage = Math.ceil(userRecord.length / recordsPerPage);

  const dispatch = useDispatch();

  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1);
  };
  useEffect(() => {
    dispatch(getAllPremiumUsers({ payload: { isPremium: true } })).then((res)=>console.log("res",premiumUsers.length))
  }, [updateData]);

  const searchFilterFunction = (text) => {
    if (text) {
      const newData = userRecord.filter(function (item) {
        const itemData = item.displayName
          ? item.displayName.toUpperCase()
          : "".toUpperCase();
        const textData = text.toUpperCase();
        return itemData.indexOf(textData) > -1;
      });
      setFilteredDataSource(newData);
      setSearch(text);
    } else {
      setFilteredDataSource(userRecord);
      setSearch(text);
    }
  };

  return (
    <>
      <PageHeading title={"Users"} />
      <AppContentLayout>
        <div className="card">
          <div className="card-header border-0 pt-6">
            <div className="card-title">
              <div className="d-flex align-items-center position-relative my-1">
                <span className="svg-icon svg-icon-1 position-absolute ms-6">
                  <CommonSearchIcon />
                </span>

                <input
                  type="text"
                  // data-kt-user-table-filter="search"
                  className="form-control form-control-solid w-250px ps-14"
                  placeholder="Search user"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    searchFilterFunction(e.target.value);
                  }}
                />
              </div>
            </div>
          </div>

          <div className="card-body py-4">
            {isLoading ? (
              <SpinnerLoader />
            ) : (
              <div className="dataTables_wrapper dt-bootstrap4 no-footer">
                <div className="table-responsive">
                  <table
                    className="table align-middle table-row-dashed fs-6 gy-5"
                    id="kt_table_users"
                  >
                    <thead>
                      <tr className="text-start text-muted fw-bold fs-7 text-uppercase gs-0">
                        <th className="min-w-125px">User</th>
                        <th className="min-w-125px">Phone</th>
                        <th className="min-w-125px">Joined Date</th>
                        <th className="text-end min-w-100px">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="text-gray-600 fw-semibold">
                      {search === ""
                        ? currentRecords.map((userInfo) => {
                            return (
                              <tr key={userInfo?.uid}>
                                <td className="d-flex align-items-center">
                                  <div className="symbol symbol-circle symbol-50px overflow-hidden me-3">
                                    <div className="symbol-label">
                                      <img
                                        src={UserImage}
                                        alt="user image"
                                        className="w-100"
                                      />
                                    </div>
                                  </div>
                                  <div className="d-flex flex-column">
                                    <span className="text-gray-800 mb-1">
                                      {userInfo?.displayName}
                                    </span>
                                    <span>
                                      {userInfo?.providerData?.[0]?.email}
                                    </span>
                                  </div>
                                </td>
                                <td>{userInfo?.phoneNumber}</td>
                                <td>
                                  {moment(
                                    userInfo?.metadata?.creationTime
                                  ).format("MMM D yyyy ")
                                    ? moment(
                                        userInfo?.metadata?.creationTime
                                      ).format("MMM D yyyy hh:mm:ss a")
                                    : "N/A"}
                                </td>
                                <td className="text-end">
                                  <button
                                    onClick={() => {
                                      setSingleUserData(userInfo);
                                      setShowModal({
                                        ...showModal,
                                        showClass: "show",
                                        displayClass: "block",
                                        modalBackdrop: "modal-backdrop",
                                      });
                                    }}
                                    type="button"
                                    className="btn btn-light btn-light-primary btn-sm"
                                    data-bs-toggle="modal"
                                    data-bs-target=".kt_modal_edit_user"
                                  >
                                    <span className="svg-icon svg-icon-muted svg-icon-size-3">
                                      <CommonEditIcon />
                                    </span>
                                    Edit
                                  </button>
                                </td>
                              </tr>
                            );
                          })
                        : filteredDataSource.map((userInfo) => {
                            return (
                              <tr key={userInfo?.uid}>
                                <td className="d-flex align-items-center">
                                  <div className="symbol symbol-circle symbol-50px overflow-hidden me-3">
                                    <div className="symbol-label">
                                      <img
                                        src={userInfo?.photoURL}
                                        alt="user image"
                                        className="w-100"
                                      />
                                    </div>
                                  </div>
                                  <div className="d-flex flex-column">
                                    <span className="text-gray-800 mb-1">
                                      {userInfo?.displayName}
                                    </span>
                                    <span>{userInfo?.email}</span>
                                  </div>
                                </td>
                                <td>{userInfo?.phoneNumber}</td>
                                <td>
                                  {moment(
                                    userInfo?.metadata?.creationTime
                                  ).format("MMM d yyyy LT")
                                    ? moment(
                                        userInfo?.metadata?.creationTime
                                      ).format("MMM d yyyy LT")
                                    : "N/A"}
                                </td>
                                <td className="text-end">
                                  <button
                                    onClick={() => {
                                      setSingleUserData(userInfo);
                                      setShowModal({
                                        ...showModal,
                                        showClass: "show",
                                        displayClass: "block",
                                        modalBackdrop: "modal-backdrop",
                                      });
                                    }}
                                    type="button"
                                    className="btn btn-light btn-light-primary btn-sm"
                                    data-bs-toggle="modal"
                                    data-bs-target=".kt_modal_edit_user"
                                  >
                                    <span className="svg-icon svg-icon-muted svg-icon-size-3">
                                      <CommonEditIcon />
                                    </span>
                                    Edit
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
            {search.length <= 0 ? (
              <div className="d-flex">
                <div className="dataTables_length d-flex w-auto align-items-center">
                  <select
                    style={{
                      minWidth: "fit-content",
                    }}
                    className="form-select form-select-sm form-select-solid"
                    onChange={(e) => {setRecordsPerPage(e.target.value);
                       setCurrentPage(1)}}
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
                    Showing 1 to {currentRecords.length} of
                    {premiumUsers?.length} records
                  </span>
                </div>
                <div className="pagination">
                  <ReactPaginate
                    breakLabel="..."
                    nextLabel=">"
                    onPageChange={(e) => handlePageClick(e)}
                    pageRangeDisplayed={0}
                    pageCount={totalPage ? totalPage : 10}
                    previousLabel="<"
                    renderOnZeroPageCount={1}
                  />
                </div>
              </div>
            ) : null}
          </div>
        </div>
      </AppContentLayout>
      <div
        className={`${showModal.modalBackdrop} fade ${showModal.showClass}`}
      ></div>
      <div
        className={`modal fade kt_modal_edit_user ${showModal.showClass}`}
        id="kt_modal_edit_user"
        tabIndex={-1}
        aria-hidden="true"
        style={{ display: `${showModal.displayClass}` }}
        role="dialog"
      >
        <UserModal
          singleUserData={singleUserData}
          setSingleUserData={setSingleUserData}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </div>

      <ToastContainer />
    </>
  );
};

export default Users;
