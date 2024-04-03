import React, { useState } from "react";
import "react-quill/dist/quill.snow.css";
import ReactQuill from "react-quill";
import "../../../assets/css/style.bundle.css";
import "../../../assets/plugins/global/plugins.bundle.css";
import { modules } from "../../../Constants/commonConstants";
import { Formik, Form, Field, FieldArray } from "formik";
import SpinnerLoader from "../../../Components/SpinnerLoader";
import blankImage from "../../../assets/media/offer/blank-image.svg";
import ImagePicker from "./ImagePicker";
import {
    createMainLineIpo,
    getAllMainLineIpo,
    getIpoById,
    uploadIMG,
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
import { useLocation } from "react-router-dom";


const SEOTab = ({ ipoEdit }) => {
    const location = useLocation();
    const { uploadImage, isLoading , metaImage } = useSelector(
        (state) => state?.mainLineIpoSlice
    );
    const [imageMsg, setImageMsg] = useState("");
    const ipoPrefillData = location.state;
    const [ipoDates, setIpoDates] = useState("");
    const formData = new FormData();
    const formDataImg = new FormData();
    const imageMimeType = /image\/(png|jpg|jpeg)/i;
    const [file, setFile] = useState(null);
    const [fileDataURL, setFileDataURL] = useState(ipoPrefillData?.data?.metaImage);
    console.log("image url-=============?", metaImage)
  
    const ipoType = localStorage.getItem("ipoType");

    const validationSchema = Yup.object().shape({
        DRHPDraft: Yup.string().url('Invalid URL'),
        RHPDraft: Yup.string().url('Invalid URL'),
        checkLiveSubscriptionUrl: Yup.string().url('Invalid URL'),
        AnchorInvestors: Yup.string().url('Invalid URL'),
    });
    const dispatch = useDispatch();
    const { activeTab } = useContext(TabContext);
    const { ID, ALGOLIAID, getIPODataById, getAllMainLineIpoData, updatedIpo } =
        useSelector((state) => state.mainLineIpoSlice);
    useEffect(() => {
        if (ipoPrefillData?.data?.id) {
            const payload = {
                id: ipoPrefillData?.data?.id,
                CategoryForIPOS: ipoType,
            };
            dispatch(getIpoById({ payload }));
        }
    }, []);

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
    const handleSubmit = (values) => {
        console.log("handle submit" , values)
        const payload = {
            CategoryForIPOS: ipoType,
            metaTtile : values?.metaTtile,
            metaDescription: values?.metaDescription,
           
        
        };
   
        console.log("payload while submit" , payload)
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
    const changeHandler = (e) => {
        console.log("handle chnage call")
        const MAX_FILE_SIZE = 4096; // 2MB

        const file = e.target.files[0];
        const fileSizeKiloBytes = file.size / 1024;

        if (fileSizeKiloBytes > MAX_FILE_SIZE) {
            setFile("");
            setImageMsg("File size is greater than maximum limit*");
        } else if (!file.type.match(imageMimeType)) {
            setFile("");
            setImageMsg("Image type is not valid*");
        } else {
            formData.append("metaImage", file);
            formDataImg.append("metaImage", file);
            // formDataImg.append("CategoryForIPOS", ipoType);
            // formDataImg.append("algoliaID", getIPODataById?.algoliaID);
            //   let payload = {
            //     payload: formDataImg,
            //     id: { id: ipoPrefillData?.data?.id },
            //   };
            console.log("formdataimg" , formDataImg)

            //   dispatch(uploadIMG({ payload }));
            setImageMsg("");
            setFile(file);
        }
    };
    const handleRemoveImage = () => {
        setFile("");
        setFileDataURL("");
        const file = "";
        formDataImg.append("file", file);
        formDataImg.append("algoliaID", getIPODataById?.algoliaID);
        // let payload = {
        //   payload: formDataImg,
        //   id: { id: ipoPrefillData?.data?.id },
        // };

        // dispatch(uploadIMG({ payload }));
        setImageMsg("");
    };
    return (
        <>
            <div>
               { isLoading ? 
                <SpinnerLoader/> :
                <Formik
                    enableReinitialize
                    initialValues={
                        ipoEdit
                            ? {
                                metaTtile: getIPODataById?.metaTtile,
                                metaDescription: getIPODataById?.metaDescription,
                                previewImage: getIPODataById?.metaImage,
                                metaImage : getIPODataById?.metaImage

                            }
                            : {
                                metaTtile: "",
                                metaDescription: "",
                                previewImage: getIPODataById?.metaImage,
                                metaImage : getIPODataById?.metaImage

                            }
                    }

                    onSubmit={(values) => {
                        handleSubmit(values);
                    }}
                >
                    {({ values, errors, touched }) => (
                        <Form>
                            <div className="card card-flush py-4">
                                <div className="card-header">
                                    <div className="card-title">
                                        <h2>SEO</h2>
                                    </div>
                                </div>

                                <div className="card-body pt-0">
                                    <div className="mb-10 fv-row">
                                        <label className="form-label">Meta Title</label>
                                        <Field
                                            type="text"
                                            name="metaTtile"
                                            className="form-control mb-2"
                                            placeholder="Meta Title"

                                        />
                                    </div>

                                    <div className="mb-10">
                                        <label className="form-label ">Meta Description</label>
                                        <Field name="metaDescription">
                                            {({ field }) => (
                                                <textarea
                                                {...field}
                                                    type="textarea"
                                                    name="metaDescription"
                                                    className="form-control mb-2"
                                                    placeholder="Meta Description"
                                                    style={{ height: "200px", width: "100%" }}
                                                />
                                            )}
                                        </Field>{" "}
                                    </div>
                                    <div className="mb-10">
                                        <label className="form-label ">Meta Image</label>
                                        <div style={
                                            {
                                                border: '1px solid #e1e3ea',
                                                padding: 20,
                                                borderRadius: 10
                                            }
                                        }>
                                            {console.log("id pass in image picker" ,ipoPrefillData?.data?.id)}
                                            {console.log("id pass in image picker" ,ipoPrefillData?.data)}
                                            <Field name="metaImage">
                                                {({ field, form }) => <ImagePicker field={field} form={form} id={ipoPrefillData?.data?.id} ALID={ipoPrefillData?.data?.algoliaID} fileDataURL={fileDataURL}/>}
                                            </Field>
                                        </div>

                                        <div className="text-muted fs-7">
                                            Set the Feature image. Only .png, .jpg, and *.jpeg image files are accepted
                                        </div>
                                    </div>
                                    <br />
                                    <br />
                                    <div className="d-flex justify-content-end">
                                        <button
                                            type="submit"
                                            // disabled={!Formik.dirty}
                                            className="btn btn-primary"
                                        >
                                            <span className="indicator-label">Save Changes</span>
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </Form>
                    )}
                </Formik>}
            </div>
            <ToastContainer />
        </>
    );
};

export default React.memo(SEOTab);
