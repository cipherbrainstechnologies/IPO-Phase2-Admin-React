import { Field, FieldArray, Form, Formik } from "formik";
import React from "react";
import { useEffect } from "react";
import ReactQuill from "react-quill";
import { useDispatch, useSelector } from "react-redux";
import { modules, modulesForFaq } from "../Constants/commonConstants";
import { createFaq, getAllFaqs, updateFaq } from "../redux/slice/faqsSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";
const Faqs = () => {
  const { createFaqData, getAllFaqData, updateFaqData } = useSelector(
    (state) => state.faqsReducer
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getAllFaqs());
  }, [createFaqData, updateFaqData]);

  const handleSubmit = (values) => {
    const payload = {
      faq: values.faqs,
    };
    if (getAllFaqData[0]?.id) {
      payload.id = getAllFaqData[0]?.id;

      dispatch(updateFaq({ payload }));
    } else {
      dispatch(createFaq({ payload }));
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
                FAQs
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
                <div id="kt_faq_repeater">
                  <Formik
                    enableReinitialize
                    initialValues={
                      getAllFaqData[0]?.id
                        ? {
                            faqs:
                              getAllFaqData &&
                              getAllFaqData[0]?.faq?.length <= 0
                                ? [{ Que: "", ans: "" }]
                                : getAllFaqData[0]?.faq,
                          }
                        : {
                            faqs: [{ Que: "", ans: "" }],
                          }
                    }
                    onSubmit={handleSubmit}
                  >
                    {({ values }) => (
                      <Form>
                        <div className="form-group">
                          <div data-repeater-list="kt_faq_repeater">
                            {
                              <FieldArray
                                name="faqs"
                                render={(arrayHelpers) => (
                                  <div>
                                    {values?.faqs?.map((faqs, index) => (
                                      <div key={index}>
                                        <br />
                                        <br />
                                        <br />
                                        {/* {/* both these conventions do the same /} */}
                                        <div className="form-group row mb-5 mt-4">
                                          <div className="col-md-4">
                                            <label className="form-label mt-4">
                                              FAQ Question
                                            </label>
                                            <br />
                                            <Field
                                              name={`faqs[${index}].Que`}
                                              className="min-h-100px h-100px  w-100"
                                              as="textarea"
                                            />
                                          </div>
                                          <div className="col-md-6 faqTest">
                                            <label className="form-label">
                                              FAQ Answer
                                            </label>
                                            <Field name={`faqs[${index}].ans`}>
                                              {({ field }) => (
                                                <ReactQuill
                                                  className="min-h-100px h-100px "
                                                  modules={modulesForFaq}
                                                  value={field.value}
                                                  onChange={field.onChange(
                                                    field.name
                                                  )}
                                                />
                                              )}
                                            </Field>
                                          </div>

                                          <div className="col-md-2">
                                            <button
                                              type="button"
                                              data-repeater-delete
                                              style={{
                                                marginLeft: "20px",
                                              }}
                                              className="btn btn-sm btn-light-danger mb-2 mt-3 "
                                              onClick={() =>
                                                arrayHelpers.remove(index)
                                              }
                                            >
                                              <i className="la la-trash-o"></i>
                                              Delete
                                            </button>
                                          </div>
                                        </div>
                                      </div>
                                    ))}
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <br />
                                    <div className="form-group mt-5">
                                      <button
                                        type="button"
                                        className="btn btn-light-primary"
                                        onClick={(e) => {
                                          e.preventDefault();
                                          arrayHelpers.push({
                                            Que: "",
                                            ans: "",
                                          });
                                        }}
                                      >
                                        <i className="la la-plus" /> Add
                                      </button>
                                    </div>
                                  </div>
                                )}
                              />
                            }
                          </div>
                        </div>
                        <div className="d-flex justify-content-end mt-15">
                          <button type="submit" className="btn btn-primary">
                            Save Changes
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Faqs;
