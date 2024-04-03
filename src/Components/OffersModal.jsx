import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonMultiplyIcon from "../assets/media/Icons/CommonMultiplyIcon";
import blankImage from "../assets/media/offer/blank-image.svg";
import "../assets/css/FilePreviewer.css";
import {
  createOffer,
  getOfferById,
  updateOffer,
  updateOfferImage,
} from "../redux/slice/offersSlice";

const OffersModal = ({
  setShowModal,
  showModal,
  singleData,
  setSingleData,
}) => {
  const [imageMsg, setImageMsg] = useState("");
  const formData = new FormData();
  const formDataImg = new FormData();
  const dispatch = useDispatch();

  const imageMimeType = /image\/(png|jpg|jpeg)/i;
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);

  const changeHandler = (e) => {
    const MAX_FILE_SIZE = 4096; // 2MB

    const file = e.target.files[0];
    const fileSizeKiloBytes = file.size / 1024;

    if (fileSizeKiloBytes > MAX_FILE_SIZE) {
      setFile("");
      setImageMsg("File size is greater than maximum limit*");
    } else if (!file.type.match(imageMimeType)) {
      setFile("");
      setImageMsg("Image type is not valid*");
    } else {
      setImageMsg("");
      setFile(file);
      if (singleData?.id && file) {
        formDataImg.append("file", file);
        let payloadImage = {
          payload: formDataImg,
          payloadId: { id: singleData?.id },
        };
        dispatch(updateOfferImage({ payloadImage }));
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

  const handleRemoveImage = () => {
    // setFile("");
    let file = "";
    formDataImg.append("file", file);
    let payloadImage = {
      payload: formDataImg,
      payloadId: { id: singleData?.id },
    };
    dispatch(updateOfferImage({ payloadImage }));
    setFileDataURL("");
  };

  const handleSubmit = (values) => {
    formData.append("offerTitle", values.offerTitle);
    formData.append("offerDescription", values.offerDescription);
    formData.append("offerSequence", Number(values.offerSequence));
    formData.append("offerLink", values.offerLink);
    formData.append("algoliaID", null);
    formData.append("offerStatus", values.offerStatus);
    formData.append("file", file);

    if (singleData?.id) {
      const payload = {
        id: singleData?.id,
        offerTitle: values?.offerTitle,
        offerDescription: values?.offerDescription,
        offerLink: values?.offerLink,
        offerSequence: values?.offerSequence,
        offerStatus: values?.offerStatus,
        algoliaID: singleData?.algoliaID,
      };
      dispatch(updateOffer({ payload }));
      setSingleData("");
    } else {
      let payload = formData;
      dispatch(createOffer({ payload }));
      setFile("");
      setFileDataURL("");
    }
    // dispatch(setModalType(""));
    setSingleData("");
    setShowModal({
      ...showModal,
      showClass: "",
      displayClass: "",
      modalBackdrop: "",
    });
  };

  useEffect(() => {
    setFileDataURL(singleData?.file);
  }, [singleData?.file]);

  return (
    <div className="modal-dialog modal-dialog-centered mw-650px">
      <div className="modal-content">
        <div className="modal-header" id="kt_modal_edit_user_header">
          <h2 className="fw-bold">Add Offer</h2>

          <div
            className="btn btn-icon btn-sm btn-active-icon-primary"
            data-bs-dismiss="modal"
            onClick={() => {
              setSingleData("");
              setShowModal({
                ...showModal,
                showClass: "",
                displayClass: "",
                modalBackdrop: "",
              });
            }}
          >
            <CommonMultiplyIcon />
          </div>
        </div>

        <div className="modal-body scroll-y mx-5 mx-xl-15 my-7">
          <Formik
            enableReinitialize
            initialValues={
              singleData?.id
                ? {
                  offerTitle: singleData?.offerTitle,
                  offerDescription: singleData?.offerDescription,
                  offerSequence: singleData?.offerSequence,
                  offerStatus: singleData?.offerStatus,
                  offerLink: singleData?.offerLink,
                }
                : {
                  offerTitle: "",
                  offerDescription: "",
                  offerSequence: "",
                  offerStatus: "",
                  offerLink: "",
                }
            }
            onSubmit={(values, { resetForm }) => {
              handleSubmit(values);
              resetForm({ values: "" });
              setFileDataURL("");
            }}
          >
            {({ values }) => (
              <Form>
                <div id="kt_modal_add_offer_form" className="form">
                  <div
                    className="d-flex flex-column scroll-y"
                    id="kt_modal_add_offer_scroll"
                    data-kt-scroll="true"
                    data-kt-scroll-activate="{default: false, lg: true}"
                    data-kt-scroll-max-height="auto"
                    data-kt-scroll-dependencies="#kt_modal_add_offer_header"
                    data-kt-scroll-wrappers="#kt_modal_add_offer_scroll"
                    data-kt-scroll-offset="300px"
                    style={{ maxHeight: "494px" }}
                  >
                    <div className="fv-row mb-7">
                      <label className="d-block fw-semibold fs-6 mb-5">
                        Image
                      </label>

                      <div
                        className="image-input image-input-outline image-input-placeholder"
                        data-kt-image-input="true"
                      >
                        <div className="file_preview_wrapper w-125px h-125px btn-container m-auto position-relative">
                          <div>
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
                          </div>

                          <div className="preview w-125px h-125px">
                            <img
                              className="w-125px h-125px"
                              src={fileDataURL ? fileDataURL : blankImage}
                              alt="preview"
                            />
                          </div>
                          {fileDataURL && (
                            <div
                              onClick={handleRemoveImage}
                              className="btn btn_delete btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                            >
                              <i className="bi bi-x fs-2"></i>
                            </div>
                          )}
                        </div>
                      </div>
                      <div className="text-danger fs-5 mt-2">{imageMsg}</div>

                      <div className="form-text" style={{ marginTop: "3rem" }}>
                        Allowed file types: png, jpg, jpeg.
                      </div>
                    </div>

                    <div className="fv-row mb-7">
                      <label className="fw-semibold fs-6 mb-2">
                        Offer Title
                      </label>

                      <Field
                        required
                        type="text"
                        name="offerTitle"
                        className="form-control form-control-solid mb-3 mb-lg-0"
                        placeholder="Offer Title"
                      />
                    </div>

                    <div className="fv-row mb-7">
                      <label className="fw-semibold fs-6 mb-2">
                        Offer Description
                      </label>

                      <Field
                        name="offerDescription"
                        as="textarea"
                        className="form-control form-control-solid mb-3 mb-lg-0"
                      />
                    </div>
                    <div className="fv-row mb-7">
                      <label className="fw-semibold fs-6 mb-2">
                        Offer Link
                      </label>

                      <Field
                        name="offerLink"
                        type="text"
                        className="form-control form-control-solid mb-3 mb-lg-0"
                        placeholder="Offer Link"
                      />
                    </div>
                    <div className="fv-row mb-7">
                      <label className="fw-semibold fs-6 mb-2">
                        Offer Sequence
                      </label>

                      <Field
                        name="offerSequence"
                        type="number"
                        className="form-control form-control-solid mb-3 mb-lg-0"
                        placeholder="Offer Sequence"
                      />
                    </div>

                    <div className="fv-row mb-7">
                      <label className="fw-semibold fs-6 mb-2">Status</label>

                      <div className="d-flex">
                        <div className="form-check form-check-custom form-check-success form-check-solid me-10">
                          <label className="form-check-label">
                            <Field
                              className="form-check-input"
                              type="radio"
                              value="Active"
                              name="offerStatus"
                            />
                            Active
                          </label>
                        </div>

                        <div className="form-check form-check-custom form-check-danger form-check-solid">
                          <label className="form-check-label">
                            <Field
                              className="form-check-input"
                              type="radio"
                              value="Deactive"
                              name="offerStatus"
                            />
                            Deactive
                          </label>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="text-center pt-15">
                    <button
                      onClick={() => {
                        setSingleData("");
                        setShowModal({
                          ...showModal,
                          showClass: "",
                          displayClass: "",
                          modalBackdrop: "",
                        });
                      }}
                      type="reset"
                      className="btn btn-light me-3"
                      data-bs-dismiss="modal"
                    >
                      Discard
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Submit
                    </button>
                  </div>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default OffersModal;
