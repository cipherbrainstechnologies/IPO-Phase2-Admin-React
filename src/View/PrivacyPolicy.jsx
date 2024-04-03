import React from "react";
import AppContentLayout from "../Components/AppContentLayout";
import PageHeading from "../Components/PageHeading";
import "../assets/css/style.bundle.css";
import "../assets/plugins/global/plugins.bundle.css";

import { useState } from "react";
import ReactQuill from "react-quill";
import { modules } from "../Constants/commonConstants";
import { Field, Form, Formik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import {
  createPrivacyPolicy,
  getAllPrivacyPolicy,
  updatePrivacyPolicy,
} from "../redux/slice/privacyPolicySlice";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const PrivacyPolicy = () => {
  const {
    createPrivacyPolicyData,
    getAllPrivacyPolicyData,
    updatePrivacyPolicyData,
  } = useSelector((state) => state.privacyPolicyReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllPrivacyPolicy());
  }, [createPrivacyPolicyData, updatePrivacyPolicyData]);

  const handleSubmit = (values) => {
    const payload = {
      PrivacyPolicy: values?.PrivacyPolicy,
    };
    if (getAllPrivacyPolicyData[0]?.id) {
      payload.id = getAllPrivacyPolicyData[0]?.id;
      dispatch(updatePrivacyPolicy({ payload }));
    } else {
      dispatch(createPrivacyPolicy({ payload }));
    }
  };

  return (
    <>
      <PageHeading title={"Privacy Policy"} />
      <AppContentLayout>
        <div id="kt_app_content" className="app-content flex-column-fluid">
          <div
            id="kt_app_content_container"
            className="app-container container-xxl"
          >
            <div className="card">
              <div className="card-body">
                {/* <div className="min-h-500px h-500px mb-2"></div> */}
                <Formik
                  enableReinitialize
                  initialValues={
                    getAllPrivacyPolicyData?.[0]?.id
                      ? {
                          PrivacyPolicy:
                            getAllPrivacyPolicyData[0]?.PrivacyPolicy,
                        }
                      : {
                          PrivacyPolicy: "",
                        }
                  }
                  onSubmit={(values) => handleSubmit(values)}
                >
                  <Form>
                    <Field name="PrivacyPolicy">
                      {({ field }) => (
                        <ReactQuill
                          className="min-h-200px h-200px"
                          modules={modules}
                          value={field.value}
                          onChange={field.onChange(field.name)}
                        />
                      )}
                    </Field>
                    <div className="d-flex justify-content-end mt-15">
                      <button className="btn btn-primary">Save Changes</button>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </AppContentLayout>
      <ToastContainer />
    </>
  );
};

export default PrivacyPolicy;
