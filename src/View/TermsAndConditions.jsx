import { Field, Form, Formik } from "formik";
import React from "react";
import { useEffect } from "react";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { modules } from "../Constants/commonConstants";
import {
  createTermsConditions,
  getAllTermsConditions,
  updateTermsConditions,
} from "../redux/slice/termsAndConditionsSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const TermsAndConditions = () => {
  const { createData, updateData, getAllData } = useSelector(
    (state) => state.termsConditionsReducer
  );
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllTermsConditions());
  }, [createData, updateData]);

  const handleSubmit = (values) => {
    const payload = {
      termsAndCondition: values?.termsAndCondition,
    };
    if (getAllData[0]?.id) {
      payload.id = getAllData[0]?.id;
      dispatch(updateTermsConditions({ payload }));
    } else {
      dispatch(createTermsConditions({ payload }));
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
                Terms & Conditions
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
                    getAllData?.[0]?.id
                      ? {
                          termsAndCondition: getAllData[0]?.termsAndCondition,
                        }
                      : { termsAndCondition: "" }
                  }
                  onSubmit={(values) => handleSubmit(values)}
                >
                  <Form>
                    <div>
                      <div
                        id="terms_conditions_content"
                        name="terms_conditions_content"
                        className="min-h-500px h-500px mb-2"
                      >
                        <Field name="termsAndCondition">
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
                      <button type="submit" className="btn btn-primary">
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

export default TermsAndConditions;
