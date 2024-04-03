import { Field, FieldArray, Form, Formik } from "formik";
import React, { useEffect } from "react";
import { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormContext } from "../../../App";
import {
  createMainLineIpo,
  getIpoById,
  updateIPO,
} from "../../../redux/slice/mainLineIpoSlices";
import { TabContext } from "../Tabs";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const RegistrarInfoTab = ({ ipoEdit, ipoPrefillData }) => {
  const dispatch = useDispatch();
  const { ALGOLIAID, ID, getIPODataById, updatedIpo } = useSelector(
    (state) => state?.mainLineIpoSlice
  );
  const { tabData, setTabData } = useContext(TabContext);
  const ipoType = localStorage.getItem("ipoType");

  const handleSubmit = (values) => {
    const payload = {
      CategoryForIPOS: ipoType,
      address: values?.address,
      companyPhone: values?.companyPhone,
      email: values?.email,
      website: values?.website,
      registerName: values?.registerName,
      registerPhone: values?.registerPhone,
      registerEmail: values?.registerEmail,
      registerWebsite: values?.registerWebsite,
      allotmentLink: values?.allotmentLink,
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
  return (
    <>
      <div>
        <Formik
          enableReinitialize
          initialValues={
            ipoEdit
              ? {
                  address: getIPODataById?.address,
                  companyPhone: getIPODataById?.companyPhone,
                  email: getIPODataById?.email,
                  website: getIPODataById?.website,
                  registerName: getIPODataById?.registerName,
                  registerPhone: getIPODataById?.registerPhone,
                  registerEmail: getIPODataById?.registerEmail,
                  registerWebsite: getIPODataById?.registerWebsite,
                  allotmentLink: getIPODataById?.allotmentLink,
                }
              : {
                  address: tabData?.address,
                  companyPhone: tabData?.companyPhone,
                  email: tabData?.email,
                  website: tabData?.website,
                  registerName: tabData?.registerName,
                  registerPhone: tabData?.registerPhone,
                  registerEmail: tabData?.registerEmail,
                  registerWebsite: tabData?.registerWebsite,
                  allotmentLink: tabData?.allotmentLink,
                }
          }
          onSubmit={(values) => {
            let Data = { ...tabData, ...values };
            setTabData(Data);
            handleSubmit(values);
          }}
        >
          {({ values }) => (
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
                      name="address"
                      className="form-control"
                      as="textarea"
                    />
                  </div>

                  <div className="d-flex flex-wrap gap-5">
                    <div className="w-100 fv-row flex-md-root">
                      <label className="form-label">Phone</label>
                      <Field
                        type="tel"
                        name="companyPhone"
                        className="form-control"
                      />
                    </div>

                    <div className="w-100 fv-row flex-md-root">
                      <label className="form-label">Email</label>
                      <Field
                        name="email"
                        type="email"
                        className="form-control"
                      />
                    </div>

                    <div className="w-100 fv-row flex-md-root">
                      <label className="form-label">Website</label>
                      <Field
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
                      type="text"
                      name="registerName"
                      className="form-control"
                    />
                  </div>

                  <div className="d-flex flex-wrap gap-5 mb-10">
                    <div className="w-100 fv-row flex-md-root">
                      <label className="form-label">Email</label>
                      <Field
                        type="text"
                        className="form-control"
                        name="registerEmail"
                      />
                    </div>

                    <div className="w-100 fv-row flex-md-root">
                      <label className="form-label">Website</label>
                      <Field
                        type="text"
                        className="form-control"
                        name="registerWebsite"
                      />
                    </div>
                  </div>

                  <div className="fv-row">
                    <label className="form-label">Allotment Link</label>
                    <Field
                      type="text"
                      className="form-control"
                      name="allotmentLink"
                    />
                  </div>
                  <div className="w-100 fv-row flex-md-root">
                    <label className="form-label mt-4">Phone</label>
                    {/* <Field
                        type="text"
                        className="form-control"
                        name="registerPhone"
                      /> */}
                    <FieldArray
                      name="registerPhone"
                      render={(arrayHelpers) => (
                        <div>
                          {values?.registerPhone?.map(
                            (registerPhone, index) => (
                              <div key={index}>
                                <div className="col-md-8 d-flex">
                                  <Field
                                    type="phone"
                                    className="form-control mt-2"
                                    name={`registerPhone[${index}].phone`}
                                  />
                                  <div className="col-md-4">
                                    <button
                                      type="button"
                                      data-repeater-delete
                                      style={{
                                        marginLeft: "20px",
                                      }}
                                      className="btn btn-sm btn-light-danger mb-2 mt-3"
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      <i className="la la-trash-o"></i>
                                      Delete
                                    </button>
                                  </div>
                                </div>
                              </div>
                            )
                          )}
                          <button
                            type="button"
                            className="btn btn-light-primary mt-2"
                            onClick={(e) => {
                              e.preventDefault();
                              arrayHelpers.push({ phone: "" });
                            }}
                          >
                            <i className="la la-plus" /> Add
                          </button>
                        </div>
                      )}
                    />
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

export default RegistrarInfoTab;
