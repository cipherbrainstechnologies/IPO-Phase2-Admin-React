import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import "../../../assets/css/style.bundle.css";
import "../../../assets/plugins/global/plugins.bundle.css";
import { modules } from "../../../Constants/commonConstants";
import { Formik, Form, Field, FieldArray , useFormikContext} from "formik";
import slugify from 'react-slugify';
import {
  createMainLineIpo,
  getAllMainLineIpo,
  getIpoById,
  updateIPO,
} from "../../../redux/slice/mainLineIpoSlices";
import { useDispatch, useSelector } from "react-redux";
import MultiSelect from "../../MultiSelect";
import { useContext } from "react";
import { TabContext } from "../Tabs";
import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as Yup from 'yup';
import { SketchPicker } from "react-color";

const GeneralTab = ({ ipoEdit, ipoPrefillData }) => {
  const validationSchema = Yup.object().shape({
    DRHPDraft: Yup.string().url('Invalid URL'),
    RHPDraft: Yup.string().url('Invalid URL'),
    checkLiveSubscriptionUrl: Yup.string().url('Invalid URL'),
    AnchorInvestors: Yup.string().url('Invalid URL'),
  });
  const dispatch = useDispatch();
  const [showColorPicker, setShowColorPicker] = useState(false);
  const handleColorChange = (newColor, setFieldValue) => {
    const hexColor = newColor.hex; // Get hex value of selected color
    setFieldValue('toolTipColor', hexColor); // Update color property in toolTipData object
    setColor(hexColor); // Update local color state
  };
  const ipoType = localStorage.getItem("ipoType");
  const { activeTab } = useContext(TabContext);
  const { ID, ALGOLIAID, getIPODataById, getAllMainLineIpoData, updatedIpo , isLoading } =
    useSelector((state) => state.mainLineIpoSlice);
    const { values, setFieldValue } = useFormikContext()?? {};

    useEffect(() => {
      // Update the slug whenever companyName changes
      if (values && values.companyName)  {
        setFieldValue('slug', slugify(values?.companyName));
      }
    }, [values?.companyName, setFieldValue,values?.slug]);
  useEffect(() => {
    if (ipoPrefillData?.data?.id) {
      const payload = {
        id: ipoPrefillData?.data?.id,
        CategoryForIPOS: ipoType,
      };
      dispatch(getIpoById({ payload }));
    }
  }, []);
  const [color, setColor] = useState(getIPODataById.toolTipData && getIPODataById.toolTipData[1] ? getIPODataById.toolTipData[1] :'#ff0000'); // Initial color is white

  useEffect(() => {
    let newID = localStorage.getItem("ID");
    const payload = {
      id: newID,
      CategoryForIPOS: ipoType,
    };
    dispatch(getIpoById({ payload }));
  }, [activeTab]);

  useEffect(() => {
    localStorage.setItem("ID", ipoPrefillData?.data?.id);
  }, []);
  const [slug, setSlug] = useState('');

  const handleSubmit = (values) => {
    const payload = {
      CategoryForIPOS: ipoType,
      slug:values?.slug,
      companyName: values?.companyName,
      toolTipData: [values?.toolTip, color],
      leadManagerName:values?.leadManagerName,
      companyDescription: values?.companyDescription,
      ObjectOfIssue: values?.ObjectOfIssue,
      faceValue: values?.faceValue,
      fromPrice: values?.fromPrice,
      toPrice: values?.toPrice,
      lotSize: values?.lotSize,
      issueSize: values?.issueSize,
      freshIssue: values?.freshIssue,
      offerForSale: values?.offerForSale,
      reatailQuota: values?.reatailQuota,
      qibQuota: values?.qibQuota,
      nilQuota: values?.nilQuota,
      retailApp: values?.retailApp,
      SHNI: values?.SHNI,
      BHNI: values?.BHNI,
      issueType: values?.issueType,
      listingAt: values?.listingAt,
      shortText: values?.shortText,
      DRHPDraft: values?.DRHPDraft,
      RHPDraft: values?.RHPDraft,
      AnchorInvestors: values?.AnchorInvestors,
      disclaimer: values?.disclaimer,
      checkLiveSubscriptionUrl: values?.checkLiveSubscriptionUrl,
      preIssueShareHolding: values?.preIssueShareHolding,
      postIssueShareHolding: values?.postIssueShareHolding,
      promotersName: values?.promotersName,
      Strength: values?.Strength,
      Risk: values?.Risk,
      checkAllotment: values?.checkAllotment,
    };
    console.log("payload", payload)
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
        payload.algoliaID = null;

        dispatch(createMainLineIpo({ payload }));
      }
    }
  };
  console.log("tooltip data", getIPODataById?.toolTipData)
  return (
    <>
      <div>
        <Formik
          enableReinitialize
          initialValues={
            ipoEdit
              ? {
                companyName: getIPODataById?.companyName,
                companyDescription: getIPODataById?.companyDescription,
                ObjectOfIssue: getIPODataById?.ObjectOfIssue,
                faceValue: getIPODataById?.faceValue,
                fromPrice: getIPODataById?.fromPrice,
                toPrice: getIPODataById?.toPrice,
                lotSize: getIPODataById?.lotSize,
                leadManagerName:getIPODataById?.leadManagerName,
                issueSize: getIPODataById?.issueSize,
                freshIssue: getIPODataById?.freshIssue,
                slug:getIPODataById?.slug,
                offerForSale: getIPODataById?.offerForSale,
                reatailQuota: getIPODataById?.reatailQuota,
                qibQuota: getIPODataById?.qibQuota,
                nilQuota: getIPODataById?.nilQuota,
                retailApp: getIPODataById?.retailApp,
                SHNI: getIPODataById?.SHNI,
                BHNI: getIPODataById?.BHNI,
                issueType: getIPODataById?.issueType,
                shortText: getIPODataById?.shortText,
                listingAt: getIPODataById?.listingAt,
                DRHPDraft: getIPODataById?.DRHPDraft,
                RHPDraft: getIPODataById?.RHPDraft,
                AnchorInvestors: getIPODataById?.AnchorInvestors,
                preIssueShareHolding: getIPODataById?.preIssueShareHolding,
                postIssueShareHolding: getIPODataById?.postIssueShareHolding,
                promotersName: getIPODataById?.promotersName,
                Strength: getIPODataById?.Strength,
                Risk: getIPODataById?.Risk,
                toolTip: getIPODataById?.toolTipData?.[0],
                toolTipColor:getIPODataById?.toolTipData?.[1],
                disclaimer: getIPODataById?.disclaimer,
                checkLiveSubscriptionUrl:
                  getIPODataById?.checkLiveSubscriptionUrl,
                checkAllotment: getIPODataById?.checkAllotment,
              }
              : {
                companyName: "",
                companyDescription: "",
                ObjectOfIssue: "",
                faceValue: "",
                fromPrice: "",
                toPrice: "",
                lotSize: "",
                issueSize: "",
                freshIssue: "",
                offerForSale: "",
                reatailQuota: "",
                slug:"",
                qibQuota: "",
                nilQuota: "",
                retailApp: "",
                SHNI: "",
                BHNI: "",
                issueType: "",
                shortText: "",
                listingAt: "",
                DRHPDraft: "",
                RHPDraft: "",
                AnchorInvestors: "",
                preIssueShareHolding: "",
                postIssueShareHolding: "",
                promotersName: [],
                leadManagerName:[],
                Strength: [],
                toolTip: "",
                toolTipColor:"",
                Risk: [],
                disclaimer: "No financial information published within this application, including but not limited to information regarding securities or IPOs, should be considered as advice to buy or sell securities or to invest in IPOs, or as a guide to doing so in any way whatsoever. All content published in this application is provided solely for educational and informational purposes, and under no circumstances should it be used for making investment decisions. We are not a SEBI registered analyst.Readers must consult a qualified financial advisor before making any actual investment decisions based on information published in this application. The information in this application is based on information available as of the date of publication, along with market perceptions, and may be subject to change without notice.",
                checkLiveSubscriptionUrl: "",
                checkAllotment: "",
              }
          }
          validationSchema={validationSchema}
          onSubmit={(values) => {
            handleSubmit(values);
          }}
        >
          {({ values, errors, touched , setFieldValue }) => (
            <Form>
           <div className="card card-flush py-4">
                <div className="card-header">
                  <div className="card-title">
                    <h2>IPO Info</h2>
                  </div>
                </div>

                <div className="card-body pt-0">
                  <div className="mb-10 fv-row">
                    <label className="required form-label">Company Name</label>
                    <Field
                      type="text"
                      name="companyName"
                      className="form-control mb-2"
                      placeholder="Comapny Name"
                      required
                      onChange={(e) => {
                        // Manually update field value
                        setFieldValue("companyName", e.target.value);
                        setFieldValue("slug",slugify(e.target.value))
                        // Optionally, perform other actions based on the change
                      }}
                    />
                  </div>
                  <div className="mb-10 fv-row">
                    <label className="required form-label">Slug</label>
                    <Field
                      type="text"
                      name="slug"
                      className="form-control "
                      placeholder="Slug"
                      disabled
                    />
                  </div>

                  <div className="mb-10">
                    <label className="form-label ">Comapny Description</label>
                    <Field name="companyDescription">
                      {({ field }) => (
                        <ReactQuill
                          className="min-h-200px h-200px "
                          modules={modules}
                          value={field.value}
                          onChange={field.onChange(field.name)}
                        />
                      )}
                    </Field>{" "}
                  </div>
                  <br />
                  <br />
                  <div className="mt-4 mb-16">
                    <label className="form-label ">Objects of the Issue</label>
                    <Field name="ObjectOfIssue">
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

                  <div className="w-100 fv-row flex-md-root mb-4">
                    <label className="form-label">Disclaimer</label>
                    <Field name="disclaimer">
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
              </div>
              <br />

              <div className="card card-flush py-4">
                <div className="card-header">
                  <div className="card-title">
                    <h2>IPO Details</h2>
                  </div>
                </div>

                <div className="card-body pt-0">
                  <div className="d-flex flex-wrap gap-5 mb-10">
                    <div className="w-100 fv-row flex-md-root">
                      <label className="form-label">Face Value</label>
                      <div className="input-group">
                        <span className="input-group-text">₹</span>
                        <Field
                          type="number"
                          name="faceValue"
                          className="form-control"
                        />
                        <span className="input-group-text">Per Share</span>
                      </div>
                    </div>

                    <div className="w-100 fv-row flex-md-root">
                      <label className="form-label">Price</label>
                      <div className="input-group">
                        <span className="input-group-text">₹</span>
                        <Field
                          type="number"
                          name="fromPrice"
                          className="form-control"
                        />
                        <span className="input-group-text">to</span>
                        <Field
                          type="number"
                          name="toPrice"
                          className="form-control"
                        />
                        <span className="input-group-text">Per Share</span>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex flex-wrap gap-5 mb-10">
                    <div className="w-100 fv-row flex-md-root">
                      <label className="form-label">Lot Size</label>
                      <div className="input-group">
                        <Field
                          type="number"
                          name="lotSize"
                          className="form-control"
                        />
                        <span className="input-group-text">Share</span>
                      </div>
                    </div>

                    <div className="w-100 fv-row flex-md-root">
                      <label className="form-label">Issue Size</label>
                      <div className="input-group">
                        <span className="input-group-text">Approx</span>
                        <span className="input-group-text">₹</span>
                        <Field
                          type="number"
                          name="issueSize"
                          className="form-control"
                        />
                        <span className="input-group-text">Crores</span>
                      </div>
                    </div>
                  </div>
                  <div className="d-flex flex-wrap gap-5 mb-10">
                    <div className="w-100 fv-row flex-md-root">
                      <label className="form-label">Fresh Issue</label>
                      <div className="input-group">
                        <span className="input-group-text">Approx</span>
                        <span className="input-group-text">₹</span>
                        <Field
                          type="number"
                          name="freshIssue"
                          className="form-control"
                        />
                        <span className="input-group-text">Crores</span>
                      </div>
                    </div>

                    <div className="w-100 fv-row flex-md-root">
                      <label className="form-label">Offer for Sale</label>
                      <div className="input-group">
                        <span className="input-group-text">Approx</span>
                        <span className="input-group-text">₹</span>
                        <Field
                          type="number"
                          name="offerForSale"
                          className="form-control"
                        />
                        <span className="input-group-text">Crores</span>
                      </div>
                    </div>
                    <div className="w-100 fv-row flex-md-root">
                      <label className="form-label">check Allotment url</label>
                      <Field
                        type="text"
                        name="checkAllotment"
                        className="form-control"
                      />
                    </div>
                  </div>
                  <div className="d-flex flex-wrap gap-5 mb-10">
                    <div className="w-100 fv-row flex-md-root">
                      <label className="form-label">Retail Quota</label>
                      <div className="input-group">
                        <Field
                          type="number"
                          name="reatailQuota"
                          className="form-control"
                        />
                        <span className="input-group-text">%</span>
                      </div>
                    </div>

                    <div className="w-100 fv-row flex-md-root">
                      <label className="form-label">QIB Quota</label>
                      <div className="input-group">
                        <Field
                          name="qibQuota"
                          type="number"
                          className="form-control"
                        />
                        <span className="input-group-text">%</span>
                      </div>
                    </div>

                    <div className="w-100 fv-row flex-md-root">
                      <label className="form-label">HNI Quota</label>
                      <div className="input-group">
                        <Field
                          type="number"
                          name="nilQuota"
                          className="form-control"
                        />
                        <span className="input-group-text">%</span>
                      </div>
                    </div>
                  </div>
                  {/* jaimin Add */}
                  <div className="d-flex flex-wrap gap-5 mb-10">
                    <div className="w-100 fv-row flex-md-root">
                      <label className="form-label">Retail App</label>
                      <div className="input-group">

                        <span className="input-group-text">₹</span>
                        <Field
                          type="number"
                          name="retailApp"
                          className="form-control"
                        />
                        <span className="input-group-text">Approx</span>
                      </div>
                    </div>

                    <div className="w-100 fv-row flex-md-root">
                      <label className="form-label">S-HNI App</label>
                      <div className="input-group">

                        <span className="input-group-text">₹</span>
                        <Field
                          type="number"
                          name="SHNI"
                          className="form-control"
                        />
                        <span className="input-group-text">Approx</span>
                      </div>
                    </div>
                    <div className="w-100 fv-row flex-md-root">
                      <label className="form-label">B-HNI App</label>
                      <div className="input-group">

                        <span className="input-group-text">₹</span>
                        <Field
                          type="number"
                          name="BHNI"
                          className="form-control"
                        />
                        <span className="input-group-text">Approx</span>
                      </div>
                    </div>
                  </div>
                  {/* jaimin Add */}
                  <div className="d-flex flex-wrap gap-5 mb-10">
                    <div className="w-100 fv-row flex-md-root">
                      <label className="form-label">Issue Type</label>
                      <Field
                        type="text"
                        name="issueType"
                        className="form-control"
                      />
                    </div>
                    <div className="w-100 fv-row flex-md-root">
                      <label className="form-label">Short Text</label>
                      <Field
                        type="text"
                        name="shortText"
                        className="form-control"
                      />
                    </div>

                    <div className="w-100 fv-row flex-md-root">
                      <label className="form-label">Listing At</label>
                      <Field
                        name="listingAt"
                        placeholder="Multi Select"
                        isMulti={true}
                        component={MultiSelect}
                        options={[
                          { value: "BSE", label: "BSE" },
                          { value: "NSE", label: "NSE" },
                        ]}
                      />
                    </div>
                  </div>
                  <div className="d-flex flex-wrap gap-5 mb-10">
                    <div className="w-100 fv-row flex-md-root">
                      <label className="form-label">DRHP Draft (URL Only)</label>
                      <Field
                        type="text"
                        name="DRHPDraft"
                        className="form-control"
                      />
                      {errors.DRHPDraft && touched.DRHPDraft && (
                        <div className="text-danger">{errors.DRHPDraft}</div>
                      )}
                    </div>
                    <div className="w-100 fv-row flex-md-root">
                      <label className="form-label">RHP Draft (URL Only)</label>
                      <Field
                        type="text"
                        name="RHPDraft"
                        className="form-control"
                      />
                      {errors.RHPDraft && touched.RHPDraft && (
                        <div className="text-danger">{errors.RHPDraft}</div>
                      )}
                    </div>

                    <div className="w-100 fv-row flex-md-root">
                      <label className="form-label">
                        Live Subscription Url (URL Only)
                      </label>
                      <Field
                        type="text"
                        name="checkLiveSubscriptionUrl"
                        className="form-control"
                      />
                      {errors.checkLiveSubscriptionUrl && touched.checkLiveSubscriptionUrl && (
                        <div className="text-danger">{errors.checkLiveSubscriptionUrl}</div>
                      )}
                    </div>
                  </div>
                  {/* jaimin changes */}
                  <div className="d-flex flex-wrap gap-5">
                    <div className="w-100 fv-row flex-md-root">
                      <label className="form-label">Anchor Investors List (URL Only)</label>
                      <Field
                        type="text"
                        name="AnchorInvestors"
                        className="form-control"
                      />
                      {errors.AnchorInvestors && touched.AnchorInvestors && (
                        <div className="text-danger">{errors.AnchorInvestors}</div>
                      )}
                    </div>

                  </div>
                  {/* jaimin changes */}
                </div>
              </div>
              {/* zala changes */}
              <div className="mb-10 fv-row mt-10" style={{ backgroundColor: "white", padding: 25, borderRadius: 5 }}>
                <label className=" form-label">Tool Tip</label>

                <Field name="toolTip">
                  {({ field }) => (
                    <textarea
                      {...field}
                      type="textarea"
                      name="toolTip"
                      className="form-control mb-2"
                      placeholder="Tool TIP"
                      style={{ height: "100px", width: "100%", backgroundColor: (values.toolTipColor ) ? values.toolTipColor + 25 : color + 25, color: (values.toolTipColor ) ? values.toolTipColor : color }}
                      onFocus={() => setShowColorPicker(false)}

                    />
                  )}
                </Field>{" "}
                {showColorPicker && (
                  <SketchPicker color={(values.toolTipColor ) ? values.toolTipColor : color} onChange={(newColor) => handleColorChange(newColor, setFieldValue)} />
                )}
                <Field
                  type="text"
                  name="toolTipColor"
                  className="form-control mb-2"
                  placeholder="Tool Tip color"
                  value={(values.toolTipColor) ? values.toolTipColor : color}

                  onFocus={() => setShowColorPicker(true)}

                />
              </div>

              <div className="card card-flush py-4 ">
                <div className="card-header">
                  <div className="card-title">
                    <h2>Strength and Risk</h2>
                  </div>
                </div>

                <div className="card-body pt-0 ">
                  <div id="kt_Strength_list" class="mb-10">
                    <div className="form-group">
                      <label className="form-label">Strength</label>
                      <div data-repeater-list="kt_Strength_list">
                        <FieldArray
                          name="Strength"
                          render={(arrayHelpers) => (
                            <div>
                              {values?.Strength?.map((Strength, index) => (
                                <div key={index} className="col-md-8 d-flex">
                                  <Field
                                    className="form-control mt-2"
                                    name={`Strength[${index}]`}
                                  />
                                  <div className="col-md-4">
                                    <button
                                      type="button"
                                      data-repeater-delete
                                      style={{ marginLeft: "20px" }}
                                      className="btn btn-sm btn-light-danger mb-2 mt-3"
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      <i className="la la-trash-o"></i>Delete
                                    </button>
                                  </div>
                                </div>
                              ))}
                              <button
                                type="button"
                                className="btn btn-light-primary mt-2"
                                onClick={(e) => {
                                  e.preventDefault();
                                  arrayHelpers.push("");
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

                  <div id="kt_Risk_list">
                    <div className="form-group">
                      <label className="form-label">Risk</label>
                      <div data-repeater-list="kt_Risk_list">
                        <FieldArray
                          name="Risk"
                          render={(arrayHelpers) => (
                            <div>
                              {values?.Risk?.map((Risk, index) => (
                                <div key={index} className="col-md-8 d-flex">
                                  <Field
                                    className="form-control mt-2"
                                    name={`Risk[${index}]`}
                                  />
                                  <div className="col-md-4">
                                    <button
                                      type="button"
                                      data-repeater-delete
                                      style={{ marginLeft: "20px" }}
                                      className="btn btn-sm btn-light-danger mb-2 mt-3"
                                      onClick={() => arrayHelpers.remove(index)}
                                    >
                                      <i className="la la-trash-o"></i>Delete
                                    </button>
                                  </div>
                                </div>
                              ))}
                              <button
                                type="button"
                                className="btn btn-light-primary mt-2"
                                onClick={(e) => {
                                  e.preventDefault();
                                  arrayHelpers.push("");
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
                </div>
              </div>




              {/* jaimin changes */}
              <div className="card card-flush py-4">
                <div className="card-header">
                  <div className="card-title">
                    <h2>Promoters</h2>
                  </div>
                </div>

                <div className="card-body pt-0">
                  <div className="d-flex flex-wrap gap-5 mb-10">
                    <div className="w-100 fv-row flex-md-root">
                      <label className="form-label">
                        Pre Issue Share Holding
                      </label>
                      <div className="input-group">
                        <Field
                          name="preIssueShareHolding"
                          type="number"
                          className="form-control"
                        />
                        <span className="input-group-text">%</span>
                      </div>
                    </div>

                    <div className="w-100 fv-row flex-md-root">
                      <label className="form-label">
                        Post Issue Share Holding
                      </label>
                      <div className="input-group">
                        <Field
                          name="postIssueShareHolding"
                          type="number"
                          className="form-control"
                        />
                        <span className="input-group-text">%</span>
                      </div>
                    </div>
                  </div>

                  <div id="kt_promoters_list">
                    <div className="form-group">
                      <label className="form-label">Promoters Name</label>
                      <div data-repeater-list="kt_promoters_list">
                        <FieldArray
                          name="promotersName"
                          render={(arrayHelpers) => (
                            <div>
                              {values?.promotersName?.map(
                                (promotersName, index) => (
                                  <div key={index}>
                                    {/* {/* both these conventions do the same /} */}
                                    <div className="col-md-8 d-flex">
                                      <Field
                                        className="form-control mt-2"
                                        name={`promotersName[${index}].name`}
                                      />
                                      <div className="col-md-4">
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
                                )
                              )}
                              <button
                                type="button"
                                className="btn btn-light-primary mt-2"
                                onClick={(e) => {
                                  e.preventDefault();
                                  arrayHelpers.push({ name: "" });
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
                </div>
                {/* <div className="d-flex justify-content-end">
                  <button
                    type="submit"
                    // disabled={!Formik.dirty}
                    className="btn btn-primary"
                  >
                    <span className="indicator-label">Save Changes</span>
                  </button>
                </div> */}
              </div>

              {/* Pradhyuman add  */}
              <div className="card card-flush py-4">
                <div className="card-header">
                  <div className="card-title">
                    <h2>Lead Managers List</h2>
                  </div>
                </div>

                <div className="card-body pt-0">
               

                  <div id="kt_promoters_list">
                    <div className="form-group">
                      <label className="form-label">Lead Manager Name</label>
                      <div data-repeater-list="kt_promoters_list">
                        <FieldArray
                          name="leadManagerName"
                          render={(arrayHelpers) => (
                            <div>
                              {values?.leadManagerName?.map(
                                (leadManagerName, index) => (
                                  <div key={index}>
                                    {/* {/* both these conventions do the same /} */}
                                    <div className="col-md-8 d-flex">
                                      <Field
                                        className="form-control mt-2"
                                        name={`leadManagerName[${index}].name`}
                                      />
                                      <div className="col-md-4">
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
                                )
                              )}
                              <button
                                type="button"
                                className="btn btn-light-primary mt-2"
                                onClick={(e) => {
                                  e.preventDefault();
                                  arrayHelpers.push({ name: "" });
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
                </div>
                <div className="d-flex justify-content-end">
                { isLoading ? null : <button
                    type="submit"
                    // disabled={!Formik.dirty}
                    className="btn btn-primary"
                  >
                    <span className="indicator-label">Save Changes</span>
                  </button>}
                </div>
              </div>
            </Form>
          )}
        </Formik>
      </div>
      <ToastContainer />
    </>
  );
};

export default React.memo(GeneralTab);
