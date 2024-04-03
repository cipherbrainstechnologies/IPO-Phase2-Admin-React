import { Field, Form, Formik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import CommonMultiplyIcon from "../assets/media/Icons/CommonMultiplyIcon";
import "../assets/css/FilePreviewer.css";
import { setModalIsOpen } from "../redux/slice/modalSlice";
import { createNotification } from "../redux/slice/notificationsSlice";

const NotificationModal = ({ setShowModal, showModal }) => {
  const dispatch = useDispatch();

  const handleSubmit = (values) => {
    const payload = {
      notificationTitle: values?.notificationTitle,
      notificationDescription: values?.notificationDescription,
      Redirect: values?.Redirect,
    };
    dispatch(createNotification({ payload }));
    setShowModal({
      ...showModal,
      showClass: "",
      displayClass: "",
      modalBackdrop: "",
    });
  };
  return (
    <div className="modal-dialog modal-dialog-centered mw-650px">
      <div className="modal-content">
        <div className="modal-header" id="kt_modal_edit_user_header">
          <h2 className="fw-bold">Edit Notification</h2>

          <div
            className="btn btn-icon btn-sm btn-active-icon-primary"
            data-bs-dismiss="modal"
            onClick={() =>
              setShowModal({
                ...showModal,
                showClass: "",
                displayClass: "",
                modalBackdrop: "",
              })
            }
          >
            <CommonMultiplyIcon />
          </div>
        </div>

        <div className="modal-body scroll-y mx-5 mx-xl-15 my-7">
          <Formik
            enableReinitialize
            initialValues={{
              notificationTitle: "",
              notificationDescription: "",
              Redirect: "",
            }}
            onSubmit={(values, { resetForm }) => {
              handleSubmit(values);
              resetForm({ values: "" });
            }}
          >
            <Form>
              <div id="kt_modal_add_offer_form" className="form">
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
                    <label className="fw-semibold fs-6 mb-2">
                      Notification Title
                    </label>

                    <Field
                      required
                      type="text"
                      name="notificationTitle"
                      className="form-control form-control-solid mb-3 mb-lg-0"
                      placeholder="Notification Title"
                    />
                  </div>

                  <div className="fv-row mb-7">
                    <label className="fw-semibold fs-6 mb-2">
                      Notification Description
                    </label>

                    <Field
                      name="notificationDescription"
                      as="textarea"
                      className="form-control form-control-solid mb-3 mb-lg-0"
                    />
                  </div>

                  <div className="fv-row mb-7">
                    <label className="fw-semibold fs-6 mb-2">Redirect</label>

                    <Field
                      name="Redirect"
                      type="text"
                      className="form-control form-control-solid mb-3 mb-lg-0"
                      placeholder="Redirect"
                    />
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
          </Formik>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
