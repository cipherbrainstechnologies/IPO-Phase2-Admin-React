import { Field, FieldArray, Form, Formik } from "formik";
import DatePicker from "react-datepicker";
import React from "react";
import { useSelector } from "react-redux";

const DisabledSubscriptionTab = () => {
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
            subscriptionDetails: getIPODataById?.subscriptionDetails,
            qualifiedInstitutions: getIPODataById?.qualifiedInstitutions,
            nonInstitutionalBuyers: getIPODataById?.nonInstitutionalBuyers,
            bNII: getIPODataById?.bNII,
            sNII: getIPODataById?.sNII,
            retailInvestors: getIPODataById?.retailInvestors,
            employees: getIPODataById?.employees,
            others: getIPODataById?.others,
            total: getIPODataById?.total,
          }}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div className="card card-flush py-4">
                <div className="card-header">
                  <div className="card-title">
                    <h2>Subscription Details</h2>
                  </div>
                </div>

                <div className="card-body pt-0">
                  <div id="kt_subscription_repeater">
                    <div className="form-group">
                      <div className="form-group row">
                        <div className="col-md-3">
                          <label className="form-label">Date</label>
                        </div>
                        <div className="col-md-2">
                          <label className="form-label">QIB</label>
                        </div>
                        <div className="col-md-2">
                          <label className="form-label">NII</label>
                        </div>
                        <div className="col-md-2">
                          <label className="form-label">Retail</label>
                        </div>
                        <div className="col-md-2">
                          <label className="form-label">Total</label>
                        </div>
                      </div>
                      <div data-repeater-list="kt_subscription_repeater">
                        <div data-repeater-item>
                          <FieldArray
                            name="subscriptionDetails"
                            render={(arrayHelpers) => (
                              <div>
                                {values.subscriptionDetails?.map(
                                  (subscriptionDetails, index) => (
                                    <div data-repeater-item>
                                      <div
                                        key={index}
                                        className="form-group row mb-5"
                                      >
                                        <div className="form-group row mb-5">
                                          <div className="col-md-3">
                                            <DatePickerField
                                              name={`subscriptionDetails.${index}.Date`}
                                              value={subscriptionDetails?.Date}
                                              onChange={setFieldValue}
                                            />
                                          </div>
                                          <div className="col-md-2">
                                            <Field
                                              disabled
                                              type="number"
                                              className="form-control"
                                              name={`subscriptionDetails.${index}.QIB`}
                                            />
                                          </div>
                                          <div className="col-md-2">
                                            <Field
                                              disabled
                                              type="number"
                                              className="form-control "
                                              name={`subscriptionDetails.${index}.NII`}
                                            />
                                          </div>
                                          <div className="col-md-2">
                                            <Field
                                              disabled
                                              type="number"
                                              className="form-control "
                                              name={`subscriptionDetails.${index}.Retail`}
                                            />
                                          </div>
                                          <div className="col-md-2">
                                            <Field
                                              disabled
                                              type="number"
                                              className="form-control "
                                              name={`subscriptionDetails.${index}.Total`}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            )}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="card card-flush py-4">
                <div className="card-header">
                  <div className="card-title">
                    <h2>Live Subscription</h2>
                  </div>
                </div>

                <div className="card-body pt-0">
                  <div className="table-responsive">
                    <table className="table table-row-dashed table-row-gray-300 gy-7">
                      <thead>
                        <tr className="fw-semibold fs-6 text-gray-800 border-bottom border-gray-200">
                          <th>Investor Category</th>
                          <th>Subscription (times)</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>Qualified Institutions</td>
                          <td>
                            <Field
                              disabled
                              type="number"
                              className="form-control"
                              name="qualifiedInstitutions"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Non-Institutional Buyers</td>
                          <td>
                            <Field
                              disabled
                              type="number"
                              className="form-control"
                              name="nonInstitutionalBuyers"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>bNII (bids above ₹10L)</td>
                          <td>
                            <Field
                              disabled
                              type="number"
                              className="form-control"
                              name="bNII"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>sNII (bids below ₹10L)</td>
                          <td>
                            <Field
                              disabled
                              type="number"
                              className="form-control"
                              name="sNII"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Retail Investors</td>
                          <td>
                            <Field
                              disabled
                              type="number"
                              className="form-control"
                              name="retailInvestors"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Employees</td>
                          <td>
                            <Field
                              disabled
                              type="number"
                              className="form-control"
                              name="employees"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td>Others</td>
                          <td>
                            <Field
                              disabled
                              type="number"
                              className="form-control"
                              name="others"
                            />
                          </td>
                        </tr>
                        <tr>
                          <td className="fw-bold">Total</td>
                          <td>{values.total}</td>
                        </tr>
                      </tbody>
                    </table>
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

export default DisabledSubscriptionTab;
