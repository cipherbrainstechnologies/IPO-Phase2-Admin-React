import { Field, Form, Formik } from "formik";
import React from "react";
import { useContext } from "react";
import { FormContext } from "../../../App";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  createMainLineIpo,
  updateIPO,
} from "../../../redux/slice/mainLineIpoSlices";
import moment from "moment/moment";
import { TabContext } from "../Tabs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const ListedInfoTab = ({ ipoEdit }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { ID } = useSelector((state) => state.mainLineIpoSlice);
  const { tabData, setTabData } = useContext(TabContext);
  const { ALGOLIAID, getIPODataById, getAllMainLineIpoData } = useSelector(
    (state) => state?.mainLineIpoSlice
  );
  const ipoType = localStorage.getItem("ipoType");
  const handleSubmit = (values) => {
    const payload = {
      CategoryForIPOS: ipoType,
      listingDate: values?.listingDate,
      listingPrice: values?.listingPrice,
      listingPosition: values?.listingPosition,
      listingDifferent: values?.listingDifferent,
      NSECode: values?.NSECode,
      BSEScript: values?.BSEScript,
      closingDate: values?.closingDate,
      closingPrice: values?.closingPrice,
      scriptPosition: values?.scriptPosition,
      closingDifferent: values?.closingDifferent,
      weekHigh: values?.weekHigh,
      weekLow: values?.weekLow,
    };
    if (ipoEdit) {
      payload.id = getIPODataById?.id;
      payload.algoliaID = getIPODataById?.algoliaID;
      dispatch(updateIPO({ payload }));
      if (ipoType === "MainlineIPO") {
        navigate("/mainline_ipo");
      } else {
        navigate("/sme_ipo");
      }
    } else {
      if (ID) {
        if (ALGOLIAID) {
          payload.id = ID;
          payload.algoliaID = ALGOLIAID;
          dispatch(createMainLineIpo({ payload }));
          if (ipoType === "MainlineIPO") {
            navigate("/mainline_ipo");
          } else {
            navigate("/sme_ipo");
          }
        }
      } else {
        payload.id = null;
        payload.algoliaID = null;
        dispatch(createMainLineIpo({ payload }));
        if (ipoType === "MainlineIPO") {
          navigate("/mainline_ipo");
        } else {
          navigate("/sme_ipo");
        }
      }
    }
  };
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
          enableReinitialize
          initialValues={
            ipoEdit
              ? {
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
                }
              : {
                  listingDate: tabData?.listingDate,
                  listingPrice: tabData?.listingPrice,
                  listingPosition: tabData?.listingPosition,
                  listingDifferent: tabData?.listingDifferent,
                  NSECode: tabData?.NSECode,
                  BSEScript: tabData?.BSEScript,
                  closingDate: tabData?.closingDate,
                  closingPrice: tabData?.closingPrice,
                  scriptPosition: tabData?.scriptPosition,
                  closingDifferent: tabData?.closingDifferent,
                  weekHigh: tabData?.weekHigh,
                  weekLow: tabData?.weekLow,
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
                            className="form-check-input"
                            type="radio"
                            value="Positive"
                            name="listingPosition"
                          />
                          <label className="form-check-label">Positive</label>
                        </div>

                        <div className="form-check form-check-custom form-check-danger form-check-solid">
                          <Field
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
                        type="number"
                        className="form-control"
                        name="NSECode"
                      />
                    </div>

                    <div className="w-100 fv-row flex-md-root">
                      <label className="form-label">BSE Script</label>
                      <Field
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
                            className="form-check-input"
                            type="radio"
                            value="Positive"
                            name="scriptPosition"
                          />
                          <label className="form-check-label">Positive</label>
                        </div>

                        <div className="form-check form-check-custom form-check-danger form-check-solid">
                          <Field
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
                          type="number"
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
                          type="number"
                          className="form-control"
                          name="weekLow"
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

export default ListedInfoTab;
