import { Field, Form, Formik } from "formik";
import React, { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import CommonMultiplyIcon from "../assets/media/Icons/CommonMultiplyIcon";
import blankImage from "../assets/media/offer/blank-image.svg";
import { setModalIsOpen } from "../redux/slice/modalSlice";
import { getUserById, updateUsers } from "../redux/slice/usersSlice";
import "react-phone-input-2/lib/style.css";

import "../assets/css/FilePreviewer.css";
import "yup-phone";
import PhoneInput from "react-phone-input-2";
import { AVATARBASE64 } from "../Constants/commonConstants";
const UserModal = ({
  singleUserData,
  setSingleUserData,
  setShowModal,
  showModal,
}) => {
  const [imageMsg, setImageMsg] = useState("");
  const formData = new FormData();
  const formDataId = new FormData();
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
    setFile("");
    let placeholder = AVATARBASE64.imageConstant.replace(/\s/g, "");
    setFileDataURL(`data:image/jpg;base64,${placeholder}`);
  };

  const handleSubmit = (values) => {
    // formData.append("displayName", values?.displayName);
    // formData.append("email", values?.email);
    // formData.append("phoneNumber", "+" + values?.phoneNumber);
    // formData.append("photoURL", file);
    // formData.append("uid", singleUserData?.uid);
    console.log("onsubmit" , values.isPremium)
    let payload = {
      payload: {
        displayName: values?.displayName,
        email: values?.email,
        // photoURL: fileDataURL,
        phoneNumber: values?.phoneNumber,
        id: singleUserData?.uid,
        customClaims:{
          isPremium:values.isPremium
        }
        // algoliaID: singleUserData?.algoliaID,
      },
    };
    dispatch(updateUsers({ payload }));
    // setFileDataURL("");
    setShowModal({
      ...showModal,
      showClass: "",
      displayClass: "",
      modalBackdrop: "",
    });
  };

  useEffect(() => {
    setFileDataURL(singleUserData?.photoURL);
  }, [singleUserData]);

  return (
    <div className="modal-dialog modal-dialog-centered mw-650px">
      <div className="modal-content">
        <div className="modal-header" id="kt_modal_edit_user_header">
          <h2 className="fw-bold">Edit User</h2>

          <div
            className="btn btn-icon btn-sm btn-active-icon-primary"
            data-bs-dismiss="modal"
            onClick={() => {
              // setFileDataURL("");
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
            initialValues={{
              displayName: singleUserData?.displayName,
              email: singleUserData?.email,
              phoneNumber: singleUserData?.phoneNumber,
              isPremium: singleUserData?.customClaims?.isPremium
            }}
            onSubmit={(values, { resetForm }) => {
              handleSubmit(values);

              resetForm({ values: {} });
            }}
          >
            {({ values, touched, errors }) => (
              <Form>
                <div id="kt_modal_edit_user_form" className="form">
                  <div
                    className="d-flex flex-column scroll-y me-n7 pe-7"
                    id="kt_modal_edit_user_scroll"
                    data-kt-scroll="true"
                    data-kt-scroll-activate="{default: false, lg: true}"
                    data-kt-scroll-max-height="auto"
                    data-kt-scroll-dependencies="#kt_modal_edit_user_header"
                    data-kt-scroll-wrappers="#kt_modal_edit_user_scroll"
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
                          <div className="preview w-125px h-125px">
                            <img
                              className="w-125px h-125px"
                              src={fileDataURL ? fileDataURL : blankImage}
                              alt="preview"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="text-danger fs-5 mt-2">{imageMsg}</div>
                      <div className="form-text" style={{ marginTop: "3rem" }}>
                        Allowed file types: png, jpg, jpeg.
                      </div>
                    </div>

                    <div className="fv-row mb-7">
                      <label className="fw-semibold fs-6 mb-2">
                        first Name
                      </label>

                      <Field
                        type="text"
                        name="displayName"
                        className="form-control form-control-solid mb-3 mb-lg-0"
                        placeholder="first name"
                      />
                    </div>

                    <div className="fv-row mb-7">
                      <label className="fw-semibold fs-6 mb-2">Email</label>

                      <Field
                        name="email"
                        type="email"
                        className="form-control form-control-solid mb-3 mb-lg-0"
                        placeholder="email"
                      />
                    </div>

                    <div className="fv-row mb-7">
                      <label className="fw-semibold fs-6 mb-2">Phone</label>
                      <Field name="phoneNumber">
                        {({ field }) => (
                          <PhoneInput
                            country={"in"}
                            value={field.value}
                            onChange={field.onChange(field.name)}
                          />
                        )}
                      </Field>
                    </div>
                    {/* <div className="fv-row mb-7">
                      <label className="fw-semibold fs-6 mb-2">
                        Premium
                      </label>

                      <Field
                        type="text"
                        name="isPremium"
                        className="form-control form-control-solid mb-3 mb-lg-0"
                        placeholder="Premium"
                      />
                    </div> */}
                  <div className="fv-row mb-7">
  <label className="fw-semibold fs-6 mb-2">Premium</label>
  
  <div>
    <label className="form-check-label me-3">
      <Field
        type="radio"
        name="isPremium"
        value="true"
        className="form-check-input"
        checked={values?.isPremium == true}
      />
      True
    </label>
    <label className="form-check-label">
      <Field
        type="radio"
        name="isPremium"
        value="false"
        className="form-check-input"
        checked={values.isPremium !== true}
      />
      False
    </label>
  </div>
</div>
                  </div>

                  <div className="text-center pt-15">
                    <button
                      onClick={() => {
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

export default UserModal;
