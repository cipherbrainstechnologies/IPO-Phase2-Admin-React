import { Field, Form, Formik } from "formik";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { dateFormator, modules } from "../Constants/commonConstants";
import DatePicker from "react-datepicker";
import { useDispatch, useSelector } from "react-redux";
import {
  createNews,
  getNewsById,
  updateNews,
  updateNewsImage,
} from "../redux/slice/newsSlice";
import AppContentLayout from "../Components/AppContentLayout";
import PageHeading from "../Components/PageHeading";
import blankImage from "../assets/media/offer/blank-image.svg";
import "react-datepicker/dist/react-datepicker.css";
const NewsEdit = () => {
  const [imageMsg, setImageMsg] = useState("");
  const { getDataById } = useSelector((state) => state.newsReducer);
  const params = useParams();

  const dispatch = useDispatch();
  const navigate = useNavigate();
  //   const formData = new FormData();
  const formDataImg = new FormData();

  const imageMimeType = /image\/(png|jpg|jpeg)/i;
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);

  const DatePickerField = ({ name, value, onChange }) => {
    return (
      <DatePicker
        // selected={startDate}
        selected={(value && new Date(value)) || null}
        className="form-control"
        // onChange={(date) => setStartDate(date)}
        onChange={(val) => {
          onChange(name, val);
        }}
        timeInputLabel="Time:"
        dateFormat="MMMM d,yyy h:mm aa"
        showTimeInput
      />
    );
  };

  const changeHandler = (e) => {
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
      setImageMsg("");
      setFile(file);
      if (file) {
        let payloadImage = {
          id: getDataById?.id,
          payload: formDataImg,
        };
        formDataImg.append("file", file);
        dispatch(updateNewsImage({ payloadImage }));
      }
    }
  };

  useEffect(() => {
    let fileReader,
      isCancel = false;
    if (file) {
      fileReader = new FileReader();
      fileReader.onload = (e) => {
        const { result } = e.target;
        if (result && !isCancel) {
          setFileDataURL(result);
        }
      };
      fileReader.readAsDataURL(file);
    }
    return () => {
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
    };
  }, [file]);
  const handleRemoveImage = () => {
    setFile("");
    let payloadImage = {
      id: getDataById?.id,
      payload: formDataImg,
    };
    formDataImg.append("file", file);
    dispatch(updateNewsImage({ payloadImage }));
    setFileDataURL("");
  };

  const handleSubmit = (values) => {
    let payload = {
      id: getDataById?.id,
      Content: values?.Content,
      Title: values?.Title,
      url: values?.url,
      Date: dateFormator(values?.newsDate),
      algoliaID: getDataById?.algoliaID,
    };
    dispatch(updateNews({ payload }));
    navigate("/news");
  };

  useEffect(() => {
    const payload = {
      id: params?.newsId,
    };
    setFileDataURL(getDataById?.file);
    dispatch(getNewsById({ payload }));
  }, [getDataById?.file]);

  return (
    <>
      <PageHeading title={"News Edit"} />
      <AppContentLayout>
        <div className="card">
          <div className="card-body">
            <Formik
              enableReinitialize
              initialValues={{
                Content: getDataById?.Content,
                url: getDataById?.url,
                Title: getDataById?.Title,
                newsDate: dateFormator(getDataById?.Date),
              }}
              onSubmit={(values, { resetForm }) => {
                handleSubmit(values);
                resetForm({ values: "" });
              }}
            >
              {({ values, setFieldValue }) => (
                <Form>
                  <label className="form-label d-block">News Image</label>

                  <div
                    className="image-input image-input-empty image-input-outline image-input-placeholder mb-3"
                    data-kt-image-input="true"
                    style={{ position: "relative" }}
                  >
                    <div
                      style={{
                        backgroundSize: "contain",
                        backgroundPosition: "center",
                      }}
                    >
                      <img
                        className="image-input-wrapper w-400px h-400px"
                        src={fileDataURL ? fileDataURL : blankImage}
                        alt="preview"
                      />
                    </div>

                    <label
                      htmlFor="image"
                      data-kt-image-input-action="change"
                      className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                    >
                      <i className="bi bi-pencil-fill fs-7" />

                      <input
                        name="file"
                        type="file"
                        id="image"
                        onChange={changeHandler}
                        hidden
                        accept=".png, .jpg, .jpeg"
                        value={values?.file}
                      />
                    </label>

                    {fileDataURL && (
                      <div
                        style={{
                          position: "absolute",
                          right: "-12px",
                          bottom: "-12px",
                        }}
                        onClick={handleRemoveImage}
                        className="btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
                      >
                        <i class="bi bi-x fs-2"></i>
                      </div>
                    )}
                    <div
                      style={{ textAlign: "center" }}
                      className="text-danger fs-5 mt-2"
                    >
                      {imageMsg}
                    </div>
                  </div>

                  <div className="text-muted fs-7">
                    Set the News image. Only .png, .jpg and *.jpeg image files
                    are accepted
                  </div>

                  <div className="w-100 fv-row mt-10">
                    <label className="form-label">Date</label>
                    <DatePickerField
                      name="newsDate"
                      // className="form-control mb-2"
                      value={values?.newsDate}
                      onChange={setFieldValue}
                    />
                  </div>

                  <div className="w-100 fv-row mt-10">
                    <label className="form-label">Title</label>
                    <Field
                      name="Title"
                      type="text"
                      className="form-control mb-2"
                    />
                  </div>
                  <div className="w-100 fv-row mt-10">
                    <label className="form-label">News Url</label>
                    <Field
                      name="url"
                      type="text"
                      className="form-control mb-2"
                    />
                  </div>
                  <div className="mt-10">
                    <label className="form-label">Content</label>
                    <Field
                      name="Content"
                      as="textarea"
                      className="form-control"
                    />
                  </div>

                  <div className="d-flex justify-content-end mt-15">
                    <Link to="/news" className="btn btn-light me-5">
                      Back to List
                    </Link>
                    <button type="submit" className="btn btn-primary">
                      Save Changes
                    </button>
                  </div>
                </Form>
              )}
            </Formik>
          </div>
        </div>
      </AppContentLayout>
    </>
  );
};

export default NewsEdit;
