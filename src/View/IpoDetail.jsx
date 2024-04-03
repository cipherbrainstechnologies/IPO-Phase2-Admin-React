import React from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import AppContentLayout from "../Components/AppContentLayout";
import PageHeading from "../Components/PageHeading";
import Tabs from "../../src/Components/Tabs/Tabs";
import { getIpoById } from "../redux/slice/mainLineIpoSlices";
import { Field, Form, Formik } from "formik";
import blankImage from "../assets/media/offer/blank-image.svg";
import DatePicker from "react-datepicker";

const IpoDetail = () => {
  const { getIPODataById, getAllMainLineIpoData } = useSelector(
    (state) => state?.mainLineIpoSlice
  );
  const location = useLocation();
  const IPOdata = location?.state?.data;
  const dispatch = useDispatch();
  useEffect(() => {
    const payload = {
      id: IPOdata?.id,
      CategoryForIPOS: IPOdata?.CategoryForIPOS,
    };
    dispatch(getIpoById({ payload }));
  }, [dispatch]);
  const DatePickerField = ({ name, value, onChange }) => {
    return (
      <DatePicker
        selected={(value && new Date(value)) || null}
        className="form-control"
        dateFormat="MMM d, yyyy"
        disabled
        onChange={(val) => {
          onChange(name, val);
        }}
      />
    );
  };
  return (
    <>
      <PageHeading title={"IPO Details"} />
      <AppContentLayout>
        <Formik
          enableReinitialize
          initialValues={{
            IPOstatus: getIPODataById?.IPOstatus,
            IPOOpenDate: getIPODataById?.IPOOpenDate,
            IPOCloseDate: getIPODataById?.IPOCloseDate,
            IPOAllotmentDate: getIPODataById?.IPOAllotmentDate,
            IPORefundsInitiation: getIPODataById?.IPORefundsInitiation,
            IPODematTransfer: getIPODataById?.IPODematTransfer,
            IPOListingDate: getIPODataById?.IPOListingDate,
          }}
        >
          {({ values, setFieldValue }) => (
            <Form>
              <div
                id="edit_ipo_form"
                className="form d-flex flex-column flex-lg-row"
                data-kt-redirect="../../demo1/dist/apps/ecommerce/catalog/products.html"
              >
                <div className="d-flex flex-column gap-7 gap-lg-10 w-100 w-lg-300px min-w-lg-300px mb-7 me-lg-10">
                  <div className="card card-flush py-4">
                    <div className="card-header">
                      <div className="card-title">
                        <h4>Company Logo</h4>
                      </div>
                    </div>

                    <div className="card-body text-center pt-0">
                      <div
                        className="image-input image-input-empty image-input-outline image-input-placeholder mb-3"
                        // data-kt-image-input="true"
                      >
                        <div className="image-input-wrapper w-150px h-150px file_preview_wrapper">
                          <div className="preview">
                            <img
                              className=" w-150px h-150px"
                              src={IPOdata?.file ? IPOdata?.file : blankImage}
                              alt="preview"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="card card-flush py-4">
                    <div className="card-header">
                      <div className="card-title">
                        <h2>Status</h2>
                      </div>

                      <div className="card-toolbar">
                        {values.IPOstatus === "Live" ? (
                          <div
                            className="rounded-circle bg-danger w-15px h-15px"
                            id="kt_ipo_status"
                          ></div>
                        ) : values.IPOstatus === "WaitingAllotment" ? (
                          <div
                            className="rounded-circle bg-warning w-15px h-15px"
                            id="kt_ipo_status"
                          ></div>
                        ) : values.IPOstatus === "AllotmentToday" ? (
                          <div
                            className="rounded-circle bg-primary w-15px h-15px"
                            id="kt_ipo_status"
                          ></div>
                        ) : values.IPOstatus === "AllotmentOut" ? (
                          <div
                            className="rounded-circle bg-primary w-15px h-15px"
                            id="kt_ipo_status"
                          ></div>
                        ) : values.IPOstatus === "Upcoming" ? (
                          <div
                            className="rounded-circle bg-success w-15px h-15px"
                            id="kt_ipo_status"
                          ></div>
                        ) : values.IPOstatus === "Listed" ? (
                          <div
                            className="rounded-circle bg-success w-15px h-15px"
                            id="kt_ipo_status"
                          ></div>
                        ) : (
                          <div
                            className="rounded-circle bg-none w-15px h-15px"
                            id="kt_ipo_status"
                          ></div>
                        )}
                      </div>
                    </div>

                    <div className="card-body pt-0">
                      <Field
                        as="select"
                        className="form-select mb-2"
                        id="kt_ipo_status_select"
                        name="IPOStatus"
                        disabled
                      >
                        <option>{values?.IPOstatus}</option>
                      </Field>

                      <div className="text-muted fs-7">Set the ipo status.</div>
                    </div>
                  </div>

                  <div className="card card-flush py-4">
                    <div className="card-header">
                      <div className="card-title">
                        <h2>Tentative Timetable</h2>
                      </div>
                    </div>
                    <div className="card-body pt-0">
                      <div className="w-100 fv-row mb-10">
                        <label className="form-label">IPO Open Date</label>
                        <DatePickerField
                          name="IPOOpenDate"
                          className="form-control mb-2"
                          value={values?.IPOOpenDate}
                          onChange={setFieldValue}
                        />
                      </div>

                      <div className="w-100 fv-row mb-10">
                        <label className="form-label">IPO Close Date</label>
                        <DatePickerField
                          name="IPOCloseDate"
                          className="form-control mb-2"
                          value={values?.IPOCloseDate}
                          onChange={setFieldValue}
                        />
                      </div>
                      <div className="w-100 fv-row mb-10">
                        <label className="form-label">IPO Allotment Date</label>
                        <DatePickerField
                          name="IPOAllotmentDate"
                          className="form-control mb-2"
                          value={values?.IPOAllotmentDate}
                          onChange={setFieldValue}
                        />
                      </div>
                      <div className="w-100 fv-row mb-10">
                        <label className="form-label">
                          IPO Refunds Initiation
                        </label>
                        <DatePickerField
                          name="IPORefundsInitiation"
                          className="form-control mb-2"
                          value={values?.IPORefundsInitiation}
                          onChange={setFieldValue}
                        />
                      </div>
                      <div className="w-100 fv-row mb-10">
                        <label className="form-label">IPO Demat Transfer</label>
                        <DatePickerField
                          name="IPODematTransfer"
                          className="form-control mb-2"
                          value={values?.IPODematTransfer}
                          onChange={setFieldValue}
                        />
                      </div>
                      <div className="w-100 fv-row">
                        <label className="form-label">IPO Listing Date</label>
                        <DatePickerField
                          name="IPOListingDate"
                          className="form-control mb-2"
                          value={values?.IPOListingDate}
                          onChange={setFieldValue}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className="d-flex flex-column flex-row-fluid gap-7 gap-lg-10">
                  <Tabs ipoDetail="ipoDetail" />
                  <div className="d-flex justify-content-end"></div>
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </AppContentLayout>
    </>
  );
};

export default IpoDetail;
