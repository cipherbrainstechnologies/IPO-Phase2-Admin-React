import React from "react";
import AppContentLayout from "../Components/AppContentLayout";
import CommonAddIcon from "../assets/media/Icons/CommonAddIcon";
import CommonSearchIcon from "../assets/media/Icons/CommonSearchIcon";
import PageHeading from "../Components/PageHeading";
import CommonEditIcon from "../assets/media/Icons/CommonEditIcon";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
// import OffersModal from "../Components/OffersModal";
import PopupcardsModel from "../Components/PopupcardsModel";
import blankImage from "../assets/media/offer/blank-image.svg";
// import { getAllOffers, setOfferData } from "../redux/slice/offersSlice";
import { getPopupcardsById } from "../redux/slice/popcardsSlice";
import SpinnerLoader from "../Components/SpinnerLoader";
import ReactPaginate from "react-paginate";
import { useState } from "react";
import BannerDeleteModal from "../Components/BannerDeleteModal";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Popupcards = () => {
  const {
    isLoading,
  getAllPopupcardsData,
  
  
  addPopupcardData,
  editPopupcardData,
  
  } = useSelector((state) => state.popcardsReducer);
console.log("popupcard data" , getAllPopupcardsData)
  const [showModal, setShowModal] = useState({
    showClass: "",
    displayClass: "",
    modalBackdrop: "",
  });
  
 
  const [singleData, setSingleData] = useState(null);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [totalPage, setTotalPage] = useState(10);
//   const [totalPageLimit, setTotalPageLimit] = useState(10);
  const dispatch = useDispatch();
//   const handlePageClick = (e) => {
//     setCurrentPage(e.selected + 1);
//   };
  useEffect(() => {
    let payload = {
    //   page: currentPage,
    //   limit: totalPageLimit,
    id:"YSqNMSNPCdnC1RraayeZ",
   
    };
    dispatch(getPopupcardsById({ payload }));
  }, [
    addPopupcardData,
    editPopupcardData,
   
  ]);
//   const handleSearch = (val) => {
//     let payload = {
//       page: 1,
//       limit: 10,
//       search: val ? val : "",
//     };
//     dispatch(getAllBanners({ payload }));

//   }
//   useEffect(() => {
//     if (getAllBannersData?.Total !== undefined) {
//       let totalCount = Math.ceil(getAllBannersData?.Total / totalPageLimit);
//       setTotalPage(totalCount);
//     }
//   }, [getAllBannersData?.Total, totalPageLimit]);

  return (
    <>
      <PageHeading />
      <AppContentLayout>
        <div className="card">
          <div className="card-header border-0 pt-6 d-flex ">
          <div className="card-title d-flex ">
            <h4>Popup Card</h4>
            </div>
            {/* <div className="card-title">
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
            </div> */}

            {/* <div className="card-toolbar">
              <div
                className=""
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
                    <span style={{ marginLeft: "0.5rem" }}>Add Popup</span>
                  </span>
                </button>
              </div>
            </div> */}
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
                        <th className="min-w-125px">Android Link</th>
                        {/* <th className="min-w-125px mw-350px">
                          Offer Description
                        </th> */}
                        <th className="min-w-125px">Ios Link</th>
                        <th className="min-w-125px">Status</th>
                        <th className="text-end min-w-100px">Actions</th>
                      </tr>
                    </thead>

                    <tbody className="text-gray-600 fw-semibold">
  {getAllPopupcardsData.map((popupcard) => (
    <tr key={popupcard.id}>
      <td>
        <img
          src={popupcard.file ? popupcard.file : blankImage}
          alt="banner"
          className="mh-75px"
        />
      </td>
      <td>{popupcard.androidLink}</td>
      <td>{popupcard.iosLink}</td>
      <td>
        <span
          className={`${
            popupcard.status === "Deactive"
              ? "badge badge-light-danger"
              : "badge badge-light-primary"
          }`}
        >
          {popupcard.status}
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
            setSingleData(popupcard);
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
      </td>
    </tr>
  ))}
</tbody>

                  </table>
                </div>
              </div>
            )}
           
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
        <PopupcardsModel
          singleData={singleData}
          setSingleData={setSingleData}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </div>
      
      <ToastContainer />
    </>
  );
};

export default Popupcards;
