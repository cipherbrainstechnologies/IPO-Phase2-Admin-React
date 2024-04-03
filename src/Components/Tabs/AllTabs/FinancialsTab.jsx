import { Field, FieldArray, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useContext } from "react";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import {
  createMainLineIpo,
  getIpoById,
  updateIPO,
} from "../../../redux/slice/mainLineIpoSlices";
import { TabContext } from "../Tabs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const FinancialsTab = ({ ipoEdit, ipoPrefillData }) => {
  const dispatch = useDispatch();
  const { tabData, setTabData } = useContext(TabContext);
  const ipoType = localStorage.getItem("ipoType");

  const { ALGOLIAID, ID, getIPODataById, updatedIpo } = useSelector(
    (state) => state.mainLineIpoSlice
  );
  const handleSubmit = (values) => {
    const payload = {
      CategoryForIPOS: ipoType,
      earningPerShare: values?.earningPerShare,
      earningPERatio: values?.earningPERatio,
      returnonNetWorth: values?.returnonNetWorth,
      netAssetValue: values?.netAssetValue,
      companyFinancials: values?.companyFinancials,
      financialLotsize: values?.financialLotsize,
      peersComparison: values?.peersComparison,
    };
    if (ipoEdit) {
      payload.id = getIPODataById?.id;
      payload.algoliaID = getIPODataById?.algoliaID;
      dispatch(updateIPO({ payload }));
    } else {
      if (ID) {
        if (ALGOLIAID) {
          payload.id = ID;
          payload.algoliaID = ALGOLIAID;
          dispatch(createMainLineIpo({ payload }));
        } else {
          payload.id = ID;
          payload.algoliaID = null;
          dispatch(createMainLineIpo({ payload }));
        }
      } else {
        payload.id = null;
        dispatch(createMainLineIpo({ payload }));
      }
    }
  };
  useEffect(() => {
    if (ipoPrefillData?.data?.id) {
      const payload = {
        id: ipoPrefillData?.data?.id,
        CategoryForIPOS: ipoType,
      };
      dispatch(getIpoById({ payload }));
    }
  }, [updatedIpo]);

  useEffect(() => {
    if (ipoEdit) {
      setTabData(getIPODataById);
    } else {
      setTabData({});
    }
  }, [updatedIpo]);
  const DatePickerField = ({ name, value, onChange }) => {
    return (
      <DatePicker
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
          initialValues={
            ipoEdit
              ? {
                  companyFinancials: getIPODataById?.companyFinancials,
                  earningPerShare: getIPODataById?.earningPerShare,
                  financialLotsize: getIPODataById?.financialLotsize,
                  peersComparison: getIPODataById?.peersComparison,
                  earningPERatio: getIPODataById?.earningPERatio,
                  returnonNetWorth: getIPODataById?.returnonNetWorth,
                  netAssetValue: getIPODataById?.netAssetValue,
                }
              : {
                  companyFinancials: tabData?.companyFinancials,
                  earningPerShare: tabData?.earningPerShare,
                  financialLotsize: [],
                  peersComparison: tabData?.peersComparison,
                  earningPERatio: tabData?.earningPERatio,
                  returnonNetWorth: tabData?.returnonNetWorth,
                  netAssetValue: tabData?.netAssetValue,
                }
          }
          onSubmit={(values) => {
            let Data = { ...tabData, ...values };
            setTabData(Data);
            handleSubmit(values);
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
                                            type="number"
                                            className="form-control "
                                            name={`companyFinancials.${index}.assets`}
                                          />
                                        </div>
                                        <div className="col-md-2">
                                          <Field
                                            type="number"
                                            className="form-control "
                                            name={`companyFinancials.${index}.revenue`}
                                          />
                                        </div>
                                        <div className="col-md-2">
                                          <Field
                                            type="number"
                                            className="form-control "
                                            name={`companyFinancials.${index}.profit`}
                                          />
                                        </div>
                                      </div>
                                      <div className="col-md-2">
                                        <button
                                          className="btn btn-sm btn-light-danger"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            arrayHelpers.remove(index);
                                          }}
                                        >
                                          <i className="la la-trash-o"></i>
                                          Delete
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )
                              )}

                              <div className="form-group mt-5">
                                <button
                                  className="btn btn-light-primary"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    arrayHelpers.push({
                                      period: "",
                                      assets: "",
                                      revenue: "",
                                      profit: "",
                                    });
                                  }}
                                >
                                  <i className="la la-plus"></i>Add
                                </button>
                              </div>
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
                      <div className="input-group">
                        <span className="input-group-text">₹</span>
                        <Field
                          type="number"
                          name="earningPerShare"
                          className="form-control"
                        />
                      </div>
                    </div>

                    <div className="w-100 fv-row flex-md-root">
                      <label className="form-label">
                        Price/Earning P/E Ratio
                      </label>
                      <Field
                        name="earningPERatio"
                        type="number"
                        className="form-control"
                      />
                    </div>

                    <div className="w-100 fv-row flex-md-root">
                      <label className="form-label">
                        Return on Net Worth (RoNW)s
                      </label>
                      <div className="input-group">
                        <Field
                          type="number"
                          name="returnonNetWorth"
                          className="form-control"
                        />
                        <span className="input-group-text">%</span>
                      </div>
                    </div>

                    <div className="w-100 fv-row flex-md-root">
                      <label className="form-label">
                        Net Asset Value (NAV)
                      </label>
                      <div className="input-group">
                        <span className="input-group-text">₹</span>
                        <Field
                          type="number"
                          name="netAssetValue"
                          className="form-control"
                        />
                      </div>
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
                                            type="text"
                                            className="form-control"
                                            name={`financialLotsize.${index}.application`}
                                          />
                                        </div>
                                        <div className="col-md-2">
                                          <Field
                                            type="number"
                                            className="form-control "
                                            name={`financialLotsize.${index}.lots`}
                                          />
                                        </div>
                                        <div className="col-md-2">
                                          <Field
                                            type="number"
                                            className="form-control "
                                            name={`financialLotsize.${index}.shares`}
                                          />
                                        </div>
                                        <div className="col-md-2">
                                          <div className="input-group">
                                            <span className="input-group-text">
                                              ₹
                                            </span>
                                            <Field
                                              type="number"
                                              className="form-control "
                                              name={`financialLotsize.${index}.amount`}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                      <div className="col-md-2">
                                        <button
                                          className="btn btn-sm btn-light-danger"
                                          onClick={(e) => {
                                            e.preventDefault();
                                            arrayHelpers.remove(index);
                                          }}
                                        >
                                          <i className="la la-trash-o"></i>
                                          Delete
                                        </button>
                                      </div>
                                    </div>
                                  </div>
                                )
                              )}

                              <div className="form-group mt-5">
                                <button
                                  className="btn btn-light-primary"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    arrayHelpers.push({
                                      application: "",
                                      lots: "",
                                      shares: "",
                                      amount: "",
                                    });
                                  }}
                                >
                                  <i className="la la-plus"></i>Add
                                </button>
                              </div>
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
                        {/* <div className="col-md-2">
                          <label className="form-label">P/B</label>
                        </div>
                        <div className="col-md-2">
                          <label className="form-label">P/E</label>
                        </div>
                        <div className="col-md-2">
                          <label className="form-label">RoNW</label>
                        </div>
                        <div className="col-md-2">
                          <label className="form-label">Revenue</label>
                        </div> */}
                      </div>
                      <div>
                        <FieldArray
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

                              <div className="form-group mt-5">
                                <button
                                  className="btn btn-light-primary"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    arrayHelpers.push({
                                      company_name: "",
                                    });
                                  }}
                                >
                                  <i className="la la-plus"></i>Add
                                </button>
                              </div>
                            </div>
                          )}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <button type="submit" className="btn btn-primary">
                  <span className="indicator-label">Save Changes</span>
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <ToastContainer />
    </>
  );
};

export default FinancialsTab;
