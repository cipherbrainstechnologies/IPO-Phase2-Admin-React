import React from "react";
import AppContentLayout from "../Components/AppContentLayout";
import CommonAddIcon from "../assets/media/Icons/CommonAddIcon";
import CommonSearchIcon from "../assets/media/Icons/CommonSearchIcon";
import PageHeading from "../Components/PageHeading";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getAllNews } from "../redux/slice/newsSlice";
import CommonEditIcon from "../assets/media/Icons/CommonEditIcon";
import { Link, useParams } from "react-router-dom";
import blankImage from "../assets/media/offer/blank-image.svg";
import moment from "moment/moment";
import { useState } from "react";
import ReactPaginate from "react-paginate";
import "../assets/css/customModalStyle.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NewsDeleteModal from "../Components/NewsDeleteModal";
const News = () => {
  const { newsData, addNews, editNews, editNewsImage, deleteNews } =
    useSelector((state) => state.newsReducer);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPage, setTotalPage] = useState(10);
  const [totalPageLimit, setTotalPageLimit] = useState(10);
  const [newsID, setNewsID] = useState("");
  const [showModal, setShowModal] = useState({
    showClass: "",
    displayClass: "",
    modalBackdrop: "",
  });
  const dispatch = useDispatch();
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

  const handleSearch = (val) => {
    let payload = {
      page: 1,
      limit: 10,
      search: val ? val : "",
    };
    dispatch(getAllNews({ payload }));
  };
  useEffect(() => {
    if (newsData?.Total <= totalPageLimit) {
      setCurrentPage(1);
      let payload = {
        page: 1,
        limit: totalPageLimit,
      };
      dispatch(getAllNews({ payload }));
    } else {
      let payload = {
        page: currentPage,
        limit: totalPageLimit,
      };
      dispatch(getAllNews({ payload }));
    }
  }, [
    addNews,
    editNews,
    editNewsImage,
    currentPage,
    totalPageLimit,
    deleteNews,
  ]);
  useEffect(() => {
    if (newsData?.Total !== undefined) {
      let totalCount = Math.ceil(newsData?.Total / totalPageLimit);
      setTotalPage(totalCount);
      return;
    }
  }, [newsData?.Total, totalPageLimit]);

  return (
    <>
      <PageHeading title={"News"} />
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
                <Link
                  to="/news/news_add"
                  type="button"
                  className="btn btn-primary"
                >
                  <span className="svg-icon svg-icon-2">
                    <CommonAddIcon />
                  </span>
                  Add News
                </Link>
              </div>

              <div
                className="d-flex justify-content-end align-items-center d-none"
                data-kt-user-table-toolbar="selected"
              >
                <div className="fw-bold me-5">
                  <span
                    className="me-2"
                    data-kt-user-table-select="selected_count"
                  ></span>
                  Selected
                </div>
                <button
                  type="button"
                  className="btn btn-danger"
                  data-kt-user-table-select="delete_selected"
                >
                  Delete Selected
                </button>
              </div>
            </div>
          </div>
          <div className="card-body py-4">
            <div className="dataTables_wrapper dt-bootstrap4 no-footer">
              <div className="table-responsive">
                <table
                  className="table align-middle table-row-dashed fs-6 gy-5"
                  id="news_table"
                >
                  <thead>
                    <tr className="text-start text-muted fw-bold fs-7 text-uppercase gs-0">
                      <th className="min-w-125px">Featured Image</th>
                      <th className="min-w-125px mw-350px">News Title</th>
                      <th className="min-w-125px">News Date</th>
                      <th className="text-end min-w-100px">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="text-gray-600 fw-semibold">
                    {newsData?.AllNews?.map((news) => {
                      return (
                        <tr key={news?.id}>
                          <td>
                            <img
                              src={news?.file ? news?.file : blankImage}
                              alt="news-image"
                              className="mh-75px"
                            />
                          </td>
                          <td className="mw-350px">{news?.Title}</td>
                          <td>
                            {/* {timeFormat(news?.createdAt?._seconds)?.toString()} */}
                            {moment(news?.Date).format(
                              "MMMM Do YYYY, h:mm:ss a"
                            )}
                          </td>
                          <td className="text-end">
                            <Link
                              to={`/news/news_edit/${news?.id}`}
                              className="btn btn-light btn-active-light-primary btn-sm"
                            >
                              <span className="svg-icon svg-icon-muted svg-icon-1hx">
                                <CommonEditIcon />
                              </span>
                              Edit
                            </Link>
                            <button
                              // to="/mainline_ipo/ipo_detail"
                              // state={{ data: Itm }}
                              className="btn btn-light btn-light-danger btn-sm px-3"
                              onClick={() => {
                                setNewsID(news);
                                setShowModal({
                                  ...showModal,
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
                  Showing {newsData?.AllNews?.length} to{" "}
                  {newsData?.AllNews?.length} of {newsData?.Total} records
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
                  // renderOnZeroPageCount={1}
                  forcePage={currentPage - 1}
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
        tabIndex={-1}
        aria-hidden="true"
        style={{ display: `${showModal.displayClass}` }}
        role="dialog"
      >
        <NewsDeleteModal
          newsID={newsID}
          showModal={showModal}
          setShowModal={setShowModal}
        />
      </div>
      <ToastContainer />
    </>
  );
};

export default News;
