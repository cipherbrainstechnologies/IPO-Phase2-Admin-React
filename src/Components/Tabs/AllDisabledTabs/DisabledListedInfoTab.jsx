import { Field, Form, Formik } from "formik";
import DatePicker from "react-datepicker";
import React from "react";
import { useSelector } from "react-redux";

const DisabledListedInfoTab = () => {
  const { getIPODataById } = useSelector((state) => state?.mainLineIpoSlice);

  const DatePickerField = ({ name, value, onChange }) => {
    return (
      <DatePicker
        disabled
        selected={(value && new Date(value)) || null}
        className="form-control"
        dateFormat="MMM d, yyyy"
        onChange={(val) => {
          onChange(name, val);
        }}
      />
    );
  };
  return (
    <>
      <div>
        <Formik
          enableReinitialize
          initialValues={{
            listingDate: getIPODataById?.listingDate,
            listingPrice: getIPODataById?.listingPrice,
            listingPosition: getIPODataById?.listingPosition,
            listingDifferent: getIPODataById?.listingDifferent,
            NSECode: getIPODataById?.NSECode,
            BSEScript: getIPODataById?.BSEScript,
            closingDate: getIPODataById?.closingDate,
            closingPrice: getIPODataById?.closingPrice,
            scriptPosition: getIPODataById?.scriptPosition,
            closingDifferent: getIPODataById?.closingDifferent,
            weekHigh: getIPODataById?.weekHigh,
            weekLow: getIPODataById?.weekLow,
          }}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="card card-flush py-4">
                <div className="card-header">
                  <div className="card-title">
                    <h2>Listing Info</h2>
                  </div>
                </div>

                <div className="card-body pt-0">
                  <div className="d-flex flex-wrap gap-5 mb-10">
                    <div className="w-100 fv-row flex-md-root">
                      <label className="form-label">Listing Date</label>
                      <DatePickerField
                        name="listingDate"
                        value={values?.listingDate}
                        onChange={setFieldValue}
                      />
                    </div>

                    <div className="w-100 fv-row flex-md-root">
                      <label className="form-label">Listing Price</label>
                      <div className="input-group">
                        <span className="input-group-text">₹</span>
                        <Field
                          disabled
                          type="number"
                          className="form-control"
                          name="listingPrice"
                        />
                      </div>
                    </div>

                    <div className="w-100 fv-row flex-md-root">
                      <label className="form-label">Listing Position</label>
                      <div className="d-flex">
                        <div className="form-check form-check-custom form-check-success form-check-solid me-10">
                          <Field
                            disabled
                            className="form-check-input"
                            type="radio"
                            value="Positive"
                            name="listingPosition"
                          />
                          <label className="form-check-label">Positive</label>
                        </div>

                        <div className="form-check form-check-custom form-check-danger form-check-solid">
                          <Field
                            disabled
                            className="form-check-input"
                            type="radio"
                            value="Negative"
                            name="listingPosition"
                          />
                          <label className="form-check-label">Negative</label>
                        </div>
                      </div>
                    </div>

                    <div className="w-100 fv-row flex-md-root">
                      <label className="form-label">Listing Different</label>
                      <div className="input-group">
                        <Field
                          disabled
                          type="number"
                          className="form-control"
                          name="listingDifferent"
                        />
                        <span className="input-group-text">%</span>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex flex-wrap gap-5 mb-10">
                    <div className="w-100 fv-row flex-md-root">
                      <label className="form-label">NSE Code</label>
                      <Field
                        disabled
                        type="number"
                        className="form-control"
                        name="NSECode"
                      />
                    </div>

                    <div className="w-100 fv-row flex-md-root">
                      <label className="form-label">BSE Script</label>
                      <Field
                        disabled
                        type="text"
                        className="form-control"
                        name="BSEScript"
                      />
                    </div>
                  </div>
                  <div className="d-flex flex-wrap gap-5 mb-10">
                    <div className="w-100 fv-row flex-md-root">
                      <label className="form-label">Closing Date</label>
                      <DatePickerField
                        name="closingDate"
                        value={values?.closingDate}
                        onChange={setFieldValue}
                      />
                    </div>

                    <div className="w-100 fv-row flex-md-root">
                      <label className="form-label">Closing Price</label>
                      <div className="input-group">
                        <span className="input-group-text">₹</span>
                        <Field
                          disabled
                          type="number"
                          className="form-control"
                          name="closingPrice"
                        />
                      </div>
                    </div>

                    <div className="w-100 fv-row flex-md-root">
                      <label className="form-label">Script Position</label>
                      <div className="d-flex">
                        <div className="form-check form-check-custom form-check-success form-check-solid me-10">
                          <Field
                            disabled
                            className="form-check-input"
                            type="radio"
                            value="Positive"
                            name="scriptPosition"
                          />
                          <label className="form-check-label">Positive</label>
                        </div>

                        <div className="form-check form-check-custom form-check-danger form-check-solid">
                          <Field
                            disabled
                            className="form-check-input"
                            type="radio"
                            value="Negative"
                            name="scriptPosition"
                          />
                          <label className="form-check-label">Negative</label>
                        </div>
                      </div>
                    </div>

                    <div className="w-100 fv-row flex-md-root">
                      <label className="form-label">Closing Different</label>
                      <div className="input-group">
                        <Field
                          disabled
                          type="text"
                          className="form-control"
                          name="closingDifferent"
                        />
                        <span className="input-group-text">%</span>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex flex-wrap gap-5 mb-10">
                    <div className="w-100 fv-row flex-md-root">
                      <label className="form-label">52 Week High</label>
                      <div className="input-group">
                        <span className="input-group-text">₹</span>
                        <Field
                          disabled
                          type="number"
                          className="form-control"
                          name="weekHigh"
                        />
                      </div>
                    </div>

                    <div className="w-100 fv-row flex-md-root">
                      <label className="form-label">52 Week Low</label>
                      <div className="input-group">
                        <span className="input-group-text">₹</span>
                        <Field
                          disabled
                          type="number"
                          className="form-control"
                          name="weekLow"
                        />
                      </div>
                    </div>
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

export default DisabledListedInfoTab;
