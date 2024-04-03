import { Field, FieldArray, Form, Formik } from "formik";
import React from "react";
import { useSelector } from "react-redux";

const DisabledRegistrarInfoTab = () => {
  const { getIPODataById } = useSelector((state) => state?.mainLineIpoSlice);
  return (
    <>
      <div>
        <Formik
          enableReinitialize
          initialValues={{
            address: getIPODataById?.address,
            companyPhone: getIPODataById?.companyPhone,
            email: getIPODataById?.email,
            website: getIPODataById?.website,
            registerName: getIPODataById?.registerName,
            registerPhone: getIPODataById?.registerPhone,
            registerEmail: getIPODataById?.registerEmail,
            registerWebsite: getIPODataById?.registerWebsite,
            allotmentLink: getIPODataById?.allotmentLink,
          }}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="card card-flush py-4">
                <div className="card-header">
                  <div className="card-title">
                    <h2>Comapny Contact Info</h2>
                  </div>
                </div>

                <div className="card-body pt-0">
                  <div className="mb-10 fv-row">
                    <label className="form-label">Address</label>
                    <Field
                      disabled
                      name="address"
                      className="form-control"
                      as="textarea"
                    />
                  </div>

                  <div className="d-flex flex-wrap gap-5">
                    <div className="w-100 fv-row flex-md-root">
                      <label className="form-label">Phone</label>
                      <Field
                        disabled
                        type="tel"
                        name="companyPhone"
                        className="form-control"
                      />
                    </div>

                    <div className="w-100 fv-row flex-md-root">
                      <label className="form-label">Email</label>
                      <Field
                        disabled
                        name="email"
                        type="email"
                        className="form-control"
                      />
                    </div>

                    <div className="w-100 fv-row flex-md-root">
                      <label className="form-label">Website</label>
                      <Field
                        disabled
                        name="website"
                        type="text"
                        className="form-control"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="card card-flush py-4">
                <div className="card-header">
                  <div className="card-title">
                    <h2>Registrar Contact Info</h2>
                  </div>
                </div>

                <div className="card-body pt-0">
                  <div className="mb-10 fv-row">
                    <label className="form-label">Registrar Name</label>
                    <Field
                      disabled
                      type="text"
                      name="registerName"
                      className="form-control"
                    />
                  </div>

                  <div className="d-flex flex-wrap gap-5 mb-10">
                    <div className="w-100 fv-row flex-md-root">
                      <label className="form-label">Phone</label>
                      <FieldArray
                        name="registerPhone"
                        render={(arrayHelpers) => (
                          <div>
                            {values?.registerPhone?.map((phone, index) => (
                              <div key={index}>
                                <Field
                                  disabled
                                  className="form-control mt-2"
                                  name={`registerPhone[${index}].phone`}
                                />
                              </div>
                            ))}
                          </div>
                        )}
                      />
                    </div>

                    <div className="w-100 fv-row flex-md-root">
                      <label className="form-label">Email</label>
                      <Field
                        disabled
                        type="text"
                        className="form-control"
                        name="registerEmail"
                      />
                    </div>

                    <div className="w-100 fv-row flex-md-root">
                      <label className="form-label">Website</label>
                      <Field
                        disabled
                        type="text"
                        className="form-control"
                        name="registerWebsite"
                      />
                    </div>
                  </div>

                  <div className="fv-row">
                    <label className="form-label">Allotment Link</label>
                    <Field
                      disabled
                      type="text"
                      className="form-control"
                      name="allotmentLink"
                    />
                  </div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default DisabledRegistrarInfoTab;
