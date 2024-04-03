import { Field, FieldArray, Form, Formik } from "formik";
import React, { useContext } from "react";
import ReactDatePicker from "react-datepicker";
import { useSelector } from "react-redux";

const DisabledFinancialsTab = () => {
  const { getIPODataById } = useSelector((state) => state?.mainLineIpoSlice);
  const DatePickerField = ({ name, value, onChange }) => {
    return (
      <ReactDatePicker
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
      <Formik
        enableReinitialize
        initialValues={{
          companyFinancials: getIPODataById?.companyFinancials,
          earningPerShare: getIPODataById?.earningPerShare,
          financialLotsize: getIPODataById?.financialLotsize,
          peersComparison: getIPODataById?.peersComparison,
          earningPERatio: getIPODataById?.earningPERatio,
          returnonNetWorth: getIPODataById?.returnonNetWorth,
          netAssetValue: getIPODataById?.netAssetValue,
        }}
      >
        {({ values, setFieldValue }) => (
          <Form>
            <div className="card card-flush py-4">
              <div className="card-header">
                <div className="card-title">
                  <h2>Company Financials (in Crore)</h2>
                </div>
              </div>

              <div className="card-body pt-0">
                <div id="kt_financial_info">
                  <div className="form-group">
                    <div className="form-group row">
                      <div className="col-md-4">
                        <label className="form-label">Period</label>
                      </div>
                      <div className="col-md-2">
                        <label className="form-label">Assets</label>
                      </div>
                      <div className="col-md-2">
                        <label className="form-label">Revenue</label>
                      </div>
                      <div className="col-md-2">
                        <label className="form-label">Profit</label>
                      </div>
                    </div>
                    <div>
                      <FieldArray
                        name="companyFinancials"
                        render={(arrayHelpers) => (
                          <div>
                            {values.companyFinancials?.map(
                              (companyFinancials, index) => (
                                <div data-repeater-item>
                                  <div
                                    key={index}
                                    className="form-group row mb-5"
                                  >
                                    <div className="form-group row mb-5">
                                      <div className="col-md-4">
                                        <DatePickerField
                                          className="form-control mb-2"
                                          value={companyFinancials?.period}
                                          onChange={setFieldValue}
                                          name={`companyFinancials.${index}.period`}
                                        />
                                      </div>
                                      <div className="col-md-2">
                                        <Field
                                          disabled
                                          className="form-control "
                                          name={`companyFinancials.${index}.assets`}
                                        />
                                      </div>
                                      <div className="col-md-2">
                                        <Field
                                          disabled
                                          className="form-control "
                                          name={`companyFinancials.${index}.revenue`}
                                        />
                                      </div>
                                      <div className="col-md-2">
                                        <Field
                                          disabled
                                          className="form-control "
                                          name={`companyFinancials.${index}.profit`}
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

            <div className="card card-flush py-4">
              <div className="card-header">
                <div className="card-title">
                  <h2>Valuations</h2>
                </div>
              </div>

              <div className="card-body pt-0">
                <div className="d-flex flex-wrap gap-5">
                  <div className="w-100 fv-row flex-md-root">
                    <label className="form-label">
                      Earning Per Share (EPS)
                    </label>
                    <Field
                      disabled
                      type="text"
                      name="earningPerShare"
                      className="form-control"
                    />
                  </div>

                  <div className="w-100 fv-row flex-md-root">
                    <label className="form-label">
                      Price/Earning P/E Ratio
                    </label>
                    <Field
                      disabled
                      name="earningPERatio"
                      type="text"
                      className="form-control"
                    />
                  </div>

                  <div className="w-100 fv-row flex-md-root">
                    <label className="form-label">
                      Return on Net Worth (RoNW)s
                    </label>
                    <Field
                      disabled
                      type="text"
                      name="returnonNetWorth"
                      className="form-control"
                    />
                  </div>

                  <div className="w-100 fv-row flex-md-root">
                    <label className="form-label">Net Asset Value (NAV)</label>
                    <Field
                      disabled
                      type="text"
                      name="netAssetValue"
                      className="form-control"
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="card card-flush py-4">
              <div className="card-header">
                <div className="card-title">
                  <h2>Lot Size</h2>
                </div>
              </div>

              <div className="card-body pt-0">
                <div id="kt_ipo_lot_size_repeater">
                  <div className="form-group">
                    <div className="form-group row">
                      <div className="col-md-4">
                        <label className="form-label">Application</label>
                      </div>
                      <div className="col-md-2">
                        <label className="form-label">Lots</label>
                      </div>
                      <div className="col-md-2">
                        <label className="form-label">Shares</label>
                      </div>
                      <div className="col-md-2">
                        <label className="form-label">Amount</label>
                      </div>
                    </div>
                    <div>
                      <FieldArray
                        name="financialLotsize"
                        render={(arrayHelpers) => (
                          <div>
                            {values?.financialLotsize?.map(
                              (financialLotsize, index) => (
                                <div data-repeater-item>
                                  <div
                                    key={index}
                                    className="form-group row mb-5"
                                  >
                                    <div className="form-group row mb-5">
                                      <div className="col-md-4">
                                        <Field
                                          disabled
                                          type="text"
                                          className="form-control"
                                          name={`financialLotsize.${index}.application`}
                                        />
                                      </div>
                                      <div className="col-md-2">
                                        <Field
                                          disabled
                                          className="form-control "
                                          name={`financialLotsize.${index}.lots`}
                                        />
                                      </div>
                                      <div className="col-md-2">
                                        <Field
                                          disabled
                                          className="form-control "
                                          name={`financialLotsize.${index}.shares`}
                                        />
                                      </div>
                                      <div className="col-md-2">
                                        <Field
                                          disabled
                                          className="form-control "
                                          name={`financialLotsize.${index}.amount`}
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

            <div className="card card-flush py-4">
              <div className="card-header">
                <div className="card-title">
                  <h2>Peers Group</h2>
                </div>
              </div>

              <div className="card-body pt-0">
                <div id="kt_ipo_peers_comparison_repeater">
                  <div className="form-group">
                    <div className="form-group row">
                      <div className="col-md-2">
                        <label className="form-label">Company Name</label>
                      </div>
                    </div>
                    <div>
                      <FieldArray
                        disabled
                        name="peersComparison"
                        render={(arrayHelpers) => (
                          <div>
                            {values.peersComparison?.map(
                              (peersComparison, index) => (
                                <div data-repeater-item>
                                  <div
                                    key={index}
                                    className="form-group row mb-5"
                                  >
                                    <div className="form-group row mb-5">
                                      <div className="col-md-6">
                                        <Field
                                          type="text"
                                          className="form-control"
                                          name={`peersComparison.${index}.company_name`}
                                        />
                                      </div>
                                      <div className="col-md-2">
                                        <button
                                          className="btn btn-sm btn-light-danger"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            arrayHelpers.remove(index);
                                          }}
                                          disabled
                                        >
                                          <i className="la la-trash-o"></i>
                                          Delete
                                        </button>
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
          </Form>
        )}
      </Formik>
    </>
  );
};

export default DisabledFinancialsTab;
