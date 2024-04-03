import React from "react";
import AppContentLayout from "../Components/AppContentLayout";
import CommonAddIcon from "../assets/media/Icons/CommonAddIcon";
import CommonSearchIcon from "../assets/media/Icons/CommonSearchIcon";
import PageHeading from "../Components/PageHeading";
import CommonEditIcon from "../assets/media/Icons/CommonEditIcon";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import OffersModal from "../Components/OffersModal";
import blankImage from "../assets/media/offer/blank-image.svg";
import { getAllOffers, setOfferData } from "../redux/slice/offersSlice";
import SpinnerLoader from "../Components/SpinnerLoader";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import OfferDeleteModal from "../Components/OfferDeleteModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Offers = () => {
  const {
    getAllOffersData,
    addOfferData,
    editOfferData,
    offerImage,
    deleteOffer,
    isLoading,
  } = useSelector((state) => state.offersReducer);

  const [showModal, setShowModal] = useState({
    showClass: "",
    displayClass: "",
    modalBackdrop: "",
  });
  const [showDeleteModal, setShowDeleteModal] = useState({
    showClass: "",
    displayClass: "",
    modalBackdrop: "",
  });
  const [deleteText, setDeleteText] = useState("");
  const [singleData, setSingleData] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(10);
  const [totalPageLimit, setTotalPageLimit] = useState(10);
  const dispatch = useDispatch();
  const handlePageClick = (e) => {
    setCurrentPage(e.selected + 1);
  };
  useEffect(() => {
    let payload = {
      page: currentPage,
      limit: totalPageLimit,
    };
    dispatch(getAllOffers({ payload }));
  }, [
    addOfferData,
    editOfferData,
    deleteOffer,
    offerImage,
    currentPage,
    totalPage,
  ]);
  const handleSearch = (val) => {
    let payload = {
      page: 1,
      limit: 10,
      search: val ? val : "",
    };
    dispatch(getAllOffers({ payload }));

  }
  useEffect(() => {
    if (getAllOffersData?.Total !== undefined) {
      let totalCount = Math.ceil(getAllOffersData?.Total / totalPageLimit);
      setTotalPage(totalCount);
    }
  }, [getAllOffersData?.Total, totalPageLimit]);

  return (
    <>
      <PageHeading title={"Offers"} />
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
                  data-kt-user-table-filter="search"
                  className="form-control form-control-solid w-250px ps-14"
                  placeholder="Search News"
                  onChange={(e) => handleSearch(e.target.value)}
                />
              </div>
            </div>

            <div className="card-toolbar">
              <div
                className="d-flex justify-content-end"
                data-kt-user-table-toolbar="base"
              >
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
                    <span style={{ marginLeft: "0.5rem" }}>Add Offers</span>
                  </span>
                </button>
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
                    id="offer_table"
                  >
                    <thead>
                      <tr className="text-start text-muted fw-bold fs-7 text-uppercase gs-0">
                        <th className="min-w-125px">Image</th>
                        <th className="min-w-125px">Offer Title</th>
                        <th className="min-w-125px mw-350px">
                          Offer Description
                        </th>
                        <th className="min-w-125px">Offer Sequence</th>
                        <th className="min-w-125px">Status</th>
                        <th className="text-end min-w-100px">Actions</th>
                      </tr>
                    </thead>

                    <tbody className="text-gray-600 fw-semibold">
                      {getAllOffersData?.AllOffers?.map((offer) => {
                        return (
                          <tr key={offer?.id}>
                            <td>
                              <img
                                src={offer?.file ? offer?.file : blankImage}
                                alt="offer"
                                className="mh-75px"
                              />
                            </td>
                            <td>{offer?.offerTitle}</td>
                            <td className="mw-350px">
                              {offer.offerDescription}
                            </td>
                            <td>{offer?.offerSequence}</td>
                            <td>
                              <span
                                className={`${offer?.offerStatus === "Deactive"
                                  ? "badge badge-light-danger"
                                  : "badge badge-light-primary"
                                  }`}
                              >
                                {offer?.offerStatus}
                              </span>
                            </td>
                            <td className="text-end">
                              <button
                                onClick={() => {
                                  setShowModal({
                                    ...showModal,
                                    showClass: "show",
                                    displayClass: "block",
                                    modalBackdrop: "modal-backdrop",
                                  });
                                  setSingleData(offer);
                                }}
                                type="button"
                                className="btn btn-light btn-active-light-primary btn-sm"
                                data-bs-toggle="modal"
                                data-bs-target=".kt_modal_edit_offer"
                              >
                                <span className="svg-icon svg-icon-muted svg-icon-1hx">
                                  <CommonEditIcon />
                                </span>
                                Edit
                              </button>
                              <button
                                // to="/mainline_ipo/ipo_detail"
                                // state={{ data: Itm }}
                                className="btn btn-light btn-light-danger btn-sm px-3"
                                onClick={() => {
                                  setDeleteText(offer);
                                  setShowDeleteModal({
                                    ...showDeleteModal,
                                    showClass: "show",
                                    displayClass: "block",
                                    modalBackdrop: "modal-backdrop",
                                  });
                                }}
                              >
                                <i className="bi bi-trash fs-2 pe-0"></i>
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
                  Showing 1 to {getAllOffersData?.AllOffers?.length} of
                  {getAllOffersData?.Total} records
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
        <OffersModal
          singleData={singleData}
          setSingleData={setSingleData}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </div>
      <div
        className={`${showDeleteModal.modalBackdrop} fade ${showDeleteModal.showClass}`}
      ></div>
      <div
        className={`modal fade kt_modal_delete_user ${showDeleteModal.showClass}`}
        id="kt_modal_delete_user"
        tabIndex={-1}
        aria-hidden="true"
        style={{ display: `${showDeleteModal.displayClass}` }}
        role="dialog"
      >
        <OfferDeleteModal
          showModal={showDeleteModal}
          deleteText={deleteText}
          setShowModal={setShowDeleteModal}
        />
      </div>
      <ToastContainer />
    </>
  );
};

export default Offers;
