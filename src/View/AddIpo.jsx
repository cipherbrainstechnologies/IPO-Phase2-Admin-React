/* eslint-disable */

import { Field, Form, Formik } from "formik";
import React from "react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import AppContentLayout from "../Components/AppContentLayout";
import PageHeading from "../Components/PageHeading";
import "../assets/css/customStepperStyle.css";
import { useDispatch, useSelector } from "react-redux";
import Tabs from "../Components/Tabs/Tabs";
import { createMainLineIpo, uploadIMG } from "../redux/slice/mainLineIpoSlices";
import { useEffect } from "react";
import blankImage from "../assets/media/offer/blank-image.svg";
import moment from "moment/moment";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../assets/css/FilePreviewer.css";
import { dateFormator } from "../Constants/commonConstants";
const AddIpo = () => {
  const [imageMsg, setImageMsg] = useState("");
  const [ipoDates, setIpoDates] = useState("");
  const dispatch = useDispatch();
  const ipoType = localStorage.getItem("ipoType");
  const { ID, ALGOLIAID, getIPODataById, uploadImage, isLoading } = useSelector(
    (state) => state?.mainLineIpoSlice
  );
  const DatePickerField = ({ name, value, onChange }) => {
    return (
      <DatePicker
        selected={value || null}
        className="form-control"
        dateFormat="MMM d, yyyy"
        onChange={(val) => {
          onChange(name, val);
          setIpoDates(name, val);
        }}
      />
    );
  };

  // const handleIpoStatus = (e) => {
  //   // setIpoStatus(e?.target?.value);
  //   if (e?.target?.value === "Upcoming") {
  //     let date = moment();

  //     let currentDate = date.format();
  //     let payload = {
  //       CategoryForIPOS: ipoType,
  //       id: getIPODataById?.id,
  //       IPOStatus: e?.target?.value,
  //       IPOUpcomingDate: currentDate,
  //       algoliaID: getIPODataById?.algoliaID,
  //     };
  //     dispatch(updateIPO({ payload }));
  //   } else {
  //     let payload = {
  //       CategoryForIPOS: ipoType,
  //       id: getIPODataById?.id,
  //       IPOStatus: e?.target?.value,
  //       algoliaID: getIPODataById?.algoliaID,
  //     };
  //     dispatch(updateIPO({ payload }));
  //   }
  // };
  const handleIpoStatus = (e) => {
    let payload = {
      CategoryForIPOS: ipoType,
      IPOStatus: e?.target?.value,
    };
    if (ID) {
      if (e?.target?.value === "Upcoming") {
        let date = moment();
        let currentDate = date.format();
        let payload = {
          CategoryForIPOS: ipoType,
          id: ID,
          IPOStatus: e?.target?.value,
          IPOUpcomingDate: currentDate,
          algoliaID: ALGOLIAID,
        };
        dispatch(createMainLineIpo({ payload }));
      } else {
        let payload = {
          CategoryForIPOS: ipoType,
          id: ID,
          IPOStatus: e?.target?.value,
          algoliaID: ALGOLIAID,
        };
        dispatch(createMainLineIpo({ payload }));
      }
    } else {
      if (e?.target?.value === "Upcoming") {
        let date = moment();
        let currentDate = date.format();
        let payload = {
          CategoryForIPOS: ipoType,
          id: null,
          IPOStatus: e?.target?.value,
          IPOUpcomingDate: currentDate,
          algoliaID: null,
        };
        dispatch(createMainLineIpo({ payload }));
      } else {
        let payload = {
          CategoryForIPOS: ipoType,
          id: null,
          IPOStatus: e?.target?.value,
          algoliaID: null,
        };

        dispatch(createMainLineIpo({ payload }));
      }
    }
  };
  const handleSubmit = (values) => {
    let payload = {
      CategoryForIPOS: ipoType,
      IPOOpenDate: values?.IPOOpenDate
        ? dateFormator(values?.IPOOpenDate)
        : values?.IPOOpenDate,
      IPOCloseDate: values?.IPOCloseDate
        ? dateFormator(values?.IPOCloseDate)
        : values?.IPOCloseDate,
      IPOAllotmentDate: values?.IPOAllotmentDate
        ? dateFormator(values?.IPOAllotmentDate)
        : values?.IPOAllotmentDate,
      IPORefundsInitiation: values?.IPORefundsInitiation
        ? dateFormator(values?.IPORefundsInitiation)
        : values?.IPORefundsInitiation,
      IPODematTransfer: values?.IPODematTransfer
        ? dateFormator(values?.IPODematTransfer)
        : values?.IPODematTransfer,
      IPOListingDate: values?.IPOListingDate
        ? dateFormator(values?.IPOListingDate)
        : values?.IPOListingDate,
      secondDate: values?.secondDate
        ? dateFormator(values?.secondDate)
        : values?.secondDate,
      Thirddate: values?.Thirddate
        ? dateFormator(values?.Thirddate)
        : values?.Thirddate,
    };

    if (ID) {
      payload.id = ID;
      payload.algoliaID = ALGOLIAID;
      dispatch(createMainLineIpo({ payload }));
    } else {
      payload.id = null;
      payload.algoliaID = null;
      dispatch(createMainLineIpo({ payload }));
    }
  };

  const formData = new FormData();
  const formDataImg = new FormData();
  const imageMimeType = /image\/(png|jpg|jpeg)/i;
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState("");
  const handleRemoveImage = () => {
    setFile("");
    setFileDataURL("");
    const file = "";
    formDataImg.append("file", file);
    if (ID.length !== 0) {
      let payload = { payload: formDataImg, id: { id: ID } };
      dispatch(uploadIMG({ payload }));
      setImageMsg("");
    } else {
      let payload = { payload: formDataImg, id: { id: null } };
      dispatch(uploadIMG({ payload }));
      setImageMsg("");
    }
  };

  const changeHandler = (e) => {
    const MAX_FILE_SIZE = 4096; // 2MB
    const file = e.target.files[0];
    const fileSizeKiloBytes = file && file?.size / 1024;

    if (fileSizeKiloBytes > MAX_FILE_SIZE) {
      setFile("");
      setImageMsg("File size is greater than maximum limit*");
    } else if (!file.type.match(imageMimeType)) {
      setFile("");
      setImageMsg("Image type is not valid*");
    } else {
      if (ID) {
        if (ALGOLIAID) {
          formData.append("file", file);
          formData.append("algoliaID", ALGOLIAID);
          formData.append("CategoryForIPOS", ipoType);
          let payload = { payload: formData, id: { id: ID } };
          dispatch(uploadIMG({ payload }));
        } else {
          formData.append("file", file);
          formData.append("algoliaID", null);
          let payload = { payload: formData, id: { id: ID } };
          dispatch(uploadIMG({ payload }));
        }
      } else {
        formData.append("file", file);
        formData.append("algoliaID", null);
        formData.append("CategoryForIPOS", ipoType);
        let payload = { payload: formData, id: { id: null } };
        dispatch(uploadIMG({ payload }));
        setImageMsg("");
        setFile(file);
      }
    }
  };

  useEffect(() => {
    let fileReader,
      isCancel = false;

    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);

  return (
    <>
      <PageHeading title={"IPO Add"} />
      <AppContentLayout>
        <div
          className="form d-flex flex-column flex-lg-row"
          data-kt-redirect="../../demo1/dist/apps/ecommerce/catalog/products.html"
        >
          <div className="d-flex flex-column gap-7 gap-lg-10 w-100 w-lg-300px min-w-lg-300px mb-7 me-lg-10">
            <div className="card card-flush py-4">
              <div className="card-header">
                <div className="card-title">
                  <h4>Company Logo</h4>
                </div>
              </div>

              <div className="card-body text-center pt-0">
                <div
                  class="image-input image-input-empty image-input-outline image-input-placeholder mb-3"
                  data-kt-image-input="true"
                >
                  <div className="btn-container w-150px h-150px m-auto position-relative file_preview_wrapper">
                    <p>
                      <label
                        htmlFor="image"
                        className="btn position-absolute edit_btn btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                      >
                        <i className="bi bi-pencil-fill fs-7" />
                      </label>
                      <input
                        name="file"
                        type="file"
                        id="image"
                        onChange={changeHandler}
                        hidden
                        accept=".png, .jpg, .jpeg"
                      />
                    </p>

                    <div className="preview w-150px h-150px">
                      <img
                        src={fileDataURL ? fileDataURL : blankImage}
                        alt="preview"
                      />
                    </div>
                    {fileDataURL && (
                      <div
                        onClick={handleRemoveImage}
                        className="btn btn_delete btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                      >
                        <i class="bi bi-x fs-2"></i>
                      </div>
                    )}
                  </div>
                  <div className="text-danger fs-5 mt-2">{imageMsg}</div>
                </div>
                <div className="text-muted fs-7">
                  Set the product thumbnail image. Only .png, .jpg and *.jpeg
                  image files are accepted
                </div>
              </div>
            </div>

            <Formik enableReinitialize initialValues={{ IPOStatus: "" }}>
              {({ values }) => (
                <Form onChange={handleIpoStatus}>
                  <div className="card card-flush py-4">
                    <div className="card-header">
                      <div className="card-title">
                        <h2>Status</h2>
                      </div>

                      <div className="card-toolbar">
                        {values?.IPOStatus === "draft" ? (
                          <div
                            className="rounded-circle bg-warning w-15px h-15px"
                            id="kt_ipo_status"
                          ></div>
                        ) : values?.IPOStatus === "Live" ? (
                          <div
                            className="rounded-circle bg-danger w-15px h-15px"
                            id="kt_ipo_status"
                          ></div>
                        ) : values?.IPOStatus === "WaitingAllotment" ? (
                          <div
                            className="rounded-circle bg-warning w-15px h-15px"
                            id="kt_ipo_status"
                          ></div>
                        ): values?.IPOStatus === "AllotmentToday" ? (
                          <div
                            className="rounded-circle bg-primary w-15px h-15px"
                            id="kt_ipo_status"
                          ></div>
                        ): values?.IPOStatus === "AllotmentOut" ? (
                          <div
                            className="rounded-circle bg-primary w-15px h-15px"
                            id="kt_ipo_status"
                          ></div>
                        ) : values?.IPOStatus === "Upcoming" ? (
                          <div
                            className="rounded-circle bg-info w-15px h-15px"
                            id="kt_ipo_status"
                          ></div>
                        ) : values?.IPOStatus === "Listed" ? (
                          <div
                            className="rounded-circle bg-success w-15px h-15px"
                            id="kt_ipo_status"
                          ></div>
                        ) : (
                          <div
                            className="rounded-circle bg-none w-15px h-15px"
                            id="kt_ipo_status"
                          ></div>
                        )}
                      </div>
                    </div>

                    <div className="card-body pt-0">
                      <Field
                        as="select"
                        className="form-control mb-2"
                        name="IPOStatus"
                      >
                        <option value="draft">Draft</option>{" "}
                        <option value="Live">Live</option>
                        <option value="WaitingAllotment">
                          Waiting Allotment
                        </option>
                        <option value="AllotmentToday">Allotment Today</option>
                        <option value="AllotmentOut">Allotment Out</option>
                        <option value="Upcoming">Upcoming</option>
                        <option value="Listed">Listed</option>
                      </Field>
                      <div className="text-muted fs-7">
                        Set the ipo status.{" "}
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
            <Formik
              initialValues={{
                IPOOpenDate: "",
                IPOCloseDate: "",
                IPOAllotmentDate: "",
                IPORefundsInitiation: "",
                IPODematTransfer: "",
                IPOListingDate: "",
                secondDate: "",
                Thirddate: "",
              }}
              onSubmit={(values) => {
                handleSubmit(values);
              }}
            >
              {({ values, setFieldValue }) => (
                <Form>
                  <div className="card card-flush py-4">
                    <div className="card-header">
                      <div className="card-title">
                        <h2>Tentative Timetable</h2>
                      </div>
                    </div>

                    <div className="card-body pt-0">
                      <div className="w-100 fv-row mb-10">
                        <label className="form-label">IPO Open Date</label>
                        <DatePickerField
                          name="IPOOpenDate"
                          className="form-control mb-2"
                          value={values?.IPOOpenDate}
                          onChange={setFieldValue}
                        />
                      </div>

                      <div className="w-100 fv-row mb-10">
                        <label className="form-label">IPO Close Date</label>
                        <DatePickerField
                          name="IPOCloseDate"
                          className="form-control mb-2"
                          value={values?.IPOCloseDate}
                          onChange={setFieldValue}
                        />
                      </div>
                      <div className="w-100 fv-row mb-10">
                        <label className="form-label">IPO Second Date</label>
                        <DatePickerField
                          name="secondDate"
                          className="form-control mb-2"
                          value={values?.secondDate}
                          onChange={setFieldValue}
                        />
                      </div>
                      <div className="w-100 fv-row mb-10">
                        <label className="form-label">IPO Third Date</label>
                        <DatePickerField
                          name="Thirddate"
                          className="form-control mb-2"
                          value={values?.Thirddate}
                          onChange={setFieldValue}
                        />
                      </div>
                      <div className="w-100 fv-row mb-10">
                        <label className="form-label">IPO Allotment Date</label>
                        <DatePickerField
                          name="IPOAllotmentDate"
                          className="form-control mb-2"
                          value={values?.IPOAllotmentDate}
                          onChange={setFieldValue}
                        />
                      </div>
                      <div className="w-100 fv-row mb-10">
                        <label className="form-label">
                          IPO Refunds Initiation
                        </label>
                        <DatePickerField
                          name="IPORefundsInitiation"
                          className="form-control mb-2"
                          value={values?.IPORefundsInitiation}
                          onChange={setFieldValue}
                        />
                      </div>
                      <div className="w-100 fv-row mb-10">
                        <label className="form-label">IPO Demat Transfer</label>
                        <DatePickerField
                          name="IPODematTransfer"
                          className="form-control mb-2"
                          value={values?.IPODematTransfer}
                          onChange={setFieldValue}
                        />
                      </div>
                      <div className="w-100 fv-row mb-10">
                        <label className="form-label">IPO Listing Date</label>
                        <DatePickerField
                          name="IPOListingDate"
                          className="form-control mb-2"
                          value={values?.IPOListingDate}
                          onChange={setFieldValue}
                        />
                      </div>

                      <div className="d-flex justify-content-center mt-4">
                        <button type="submit" className="btn btn-primary" ss>
                          Save Changes
                        </button>
                      </div>
                    </div>
                  </div>
                </Form>
              )}
            </Formik>
          </div>

          <div className="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
            <div className="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
              <Tabs IpoAdd={"IpoAdd"} />
            </div>
          </div>
        </div>
      </AppContentLayout>

      <ToastContainer />
    </>
  );
};

export default AddIpo;
