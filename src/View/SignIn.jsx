import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../FirebaseConfig";
import { Field, Form, Formik } from "formik";
import React from "react";
import "../assets/css/SignInStyle.css";
import defaultLogo from "../assets/media/logos/logo.png";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
// import darkLogo from "../assets/media/logos/logo-dark.png";
import "react-toastify/dist/ReactToastify.css";

const SignIn = () => {
  const navigate = useNavigate();
  const handleSubmit = (values) => {
    signInWithEmailAndPassword(auth, values?.email, values?.password)
      .then((response) => {
        localStorage.setItem("userID", response?.user?.uid);
        localStorage.setItem("access_token", response?.user?.accessToken);
        return navigate("/mainline_ipo");
      })
      .catch((error) => {
        toast.error(error?.message);
      });
  };
  return (
    <>
      <div
        data-kt-name="metronic"
        id="kt_body"
        className="app-blank app-blank bgi-size-cover bgi-position-center bgi-no-repeat"
      >
        <div
          className="d-flex flex-column flex-root main-bg-image-div"
          id="kt_app_root"
        >
          <div className="d-flex flex-column flex-lg-row flex-column-fluid">
            <div className="d-flex flex-lg-row-fluid">
              <div className="d-flex flex-column flex-center pb-0 pb-lg-10 p-10 w-100">
                <img
                  className="theme-light-show mx-auto mw-100 w-150px w-lg-300px mb-10 mb-lg-20"
                  src={defaultLogo}
                  alt=""
                />
                <img
                  className="theme-dark-show mx-auto mw-100 w-150px w-lg-300px mb-10 mb-lg-20"
                  src={defaultLogo}
                  alt=""
                />

                <h1 className="text-gray-800 fs-2qx fw-bold text-center mb-7">
                  IPO Details, Updates
                </h1>

                <div className="text-gray-600 fs-base text-center fw-semibold">
                  Stay Ahead of the Game with 'IPODekho' - The Ultimate Mobile
                  App for the Latest IPO News, Details,
                  <br />
                  and Alerts in India! Get Informed about Mainline and SME IPOs
                  with Live Subscriptions,
                  <br />
                  and Never Miss Out on the Hottest IPO Opportunities Again.
                </div>
              </div>
            </div>

            <div className="d-flex flex-column-fluid flex-lg-row-auto justify-content-center justify-content-lg-end p-12">
              <div className="bg-body d-flex flex-center rounded-4 w-md-600px p-10">
                <Formik
                  initialValues={{
                    email: "",
                    password: "",
                  }}
                  onSubmit={(values) => {
                    handleSubmit(values);
                  }}
                >
                  <Form>
                    <div className="w-md-400px">
                      <div className="text-center mb-11">
                        <h1 className="text-dark fw-bolder mb-3">Sign In</h1>

                        <div className="text-gray-500 fw-semibold fs-6">
                          Your Social Campaigns
                        </div>
                      </div>

                      <div className="fv-row mb-8">
                        <Field
                          type="text"
                          placeholder="Email"
                          name="email"
                          // autocomplete="off"
                          className="form-control bg-transparent"
                        />
                      </div>

                      <div className="fv-row mb-3">
                        <Field
                          type="password"
                          placeholder="Password"
                          name="password"
                          // autocomplete="off"
                          className="form-control bg-transparent"
                        />
                      </div>

                      <div className="d-grid mb-10">
                        <button
                          type="submit"
                          // id="kt_sign_in_submit"
                          className="btn btn-primary"
                        >
                          <span className="indicator-label">Sign In</span>
                          {/* 
                          <span className="indicator-progress">
                            Please wait...
                            <span className="spinner-border spinner-border-sm align-middle ms-2"></span>
                          </span> */}
                        </button>
                      </div>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
            <ToastContainer />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
