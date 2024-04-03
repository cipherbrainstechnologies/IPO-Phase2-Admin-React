import { Field, Form, Formik } from "formik";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { modules } from "../Constants/commonConstants";
import {
  createAllotment,
  getAllAllotment,
  updateAllotment,
} from "../redux/slice/ipoAllotSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const IpoAllotmentTips = () => {
  const dispatch = useDispatch();
  const { updateIpoAllotData, createIpoAllotData, getAllIpoAllotData } =
    useSelector((state) => state.ipoAllotReducer);

  useEffect(() => {
    dispatch(getAllAllotment());
  }, [createIpoAllotData, updateIpoAllotData]);

  const handleSubmit = (values) => {
    const payload = {
      AllotmentTips: values?.AllotmentTips,
    };
    if (getAllIpoAllotData[0]?.id) {
      payload.id = getAllIpoAllotData[0]?.id;
      dispatch(updateAllotment({ payload }));
    } else {
      dispatch(createAllotment({ payload }));
    }
  };
  return (
    <div className="app-main flex-column flex-row-fluid" id="kt_app_main">
      <div className="d-flex flex-column flex-column-fluid">
        <div id="kt_app_toolbar" className="app-toolbar py-3 py-lg-6">
          <div
            id="kt_app_toolbar_container"
            className="app-container container-xxl d-flex flex-stack"
          >
            <div className="page-title d-flex flex-column justify-content-center flex-wrap me-3">
              <h1 className="page-heading d-flex text-dark fw-bold fs-3 flex-column justify-content-center my-0">
                IPO Allotment Tips
              </h1>
            </div>
          </div>
        </div>

        <div id="kt_app_content" className="app-content flex-column-fluid">
          <div
            id="kt_app_content_container"
            className="app-container container-xxl"
          >
            <div className="card">
              <div className="card-body">
                <Formik
                  enableReinitialize
                  initialValues={
                    getAllIpoAllotData?.[0]?.id
                      ? {
                          AllotmentTips: getAllIpoAllotData[0]?.AllotmentTips,
                        }
                      : {
                          AllotmentTips: "",
                        }
                  }
                  onSubmit={(values) => handleSubmit(values)}
                >
                  <Form>
                    <div>
                      <div
                        id="ipo_allotment_tips_content"
                        name="ipo_allotment_tips_content"
                        className="min-h-500px h-500px mb-2"
                      >
                        <Field name="AllotmentTips">
                          {({ field }) => (
                            <ReactQuill
                              className="min-h-200px h-200px "
                              modules={modules}
                              value={field.value}
                              onChange={field.onChange(field.name)}
                            />
                          )}
                        </Field>
                      </div>
                    </div>
                    <div className="d-flex justify-content-end mt-15">
                      <button className="btn btn-primary" type="submit">
                        Save Changes
                      </button>
                    </div>
                  </Form>
                </Formik>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default IpoAllotmentTips;
