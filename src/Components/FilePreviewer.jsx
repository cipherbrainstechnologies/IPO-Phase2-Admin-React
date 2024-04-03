import { useEffect } from "react";
import { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import "../assets/css/FilePreviewer.css";
import blankImage from "../assets/media/offer/blank-image.svg";
import { uploadIMG } from "../redux/slice/mainLineIpoSlices";

const FilePreviewer = ({
  addImage,
  newsImage,
  offerModal,
  editImage,
  ipoPrefillData,
  newsAdd,
}) => {
  const [imagePreview, setImagePreview] = useState(ipoPrefillData);
  const dispatch = useDispatch();
  const filePicekerRef = useRef(null);
  const { ID, ALGOLIAID } = useSelector((state) => state.mainLineIpoSlice);

  const previewFile = (e) => {
    const reader = new FileReader();
    const imageFile = e.target.files[0];
    // reader.addEventListener("load", (e) => {
    //   setImagePreview(e.target.result);
    // });
    if (imageFile) {
      reader.readAsDataURL(imageFile);
    }
    reader.onload = (readerEvent) => {
      if (imageFile.type.includes("image")) {
        setImagePreview(readerEvent.target.result);
      }
    };

    let formData = new FormData();
    if (editImage) {
      formData.append("file", e?.target?.files[0]);
      // formData.append()
      let payload = { payload: formData, id: { id: ID } };
      dispatch(uploadIMG({ payload }));
    } else {
      if (ID) {
        if (ALGOLIAID) {
          formData.append("file", e?.target?.files[0]);
          formData.append("algoliaID", ALGOLIAID);
          let payload = { payload: formData, id: { id: ID } };
          dispatch(uploadIMG({ payload }));
        } else {
          formData.append("file", e?.target?.files[0]);
          formData.append("algoliaID", null);
          let payload = { payload: formData, id: { id: ID } };
          dispatch(uploadIMG({ payload }));
        }
      } else {
        formData.append("file", e?.target?.files[0]);
        let payload = { payload: formData, id: { id: null } };
        dispatch(uploadIMG({ payload }));
      }
    }
  };

  function clearFiles() {
    setImagePreview();
  }

  return (
    <>
      <input
        ref={filePicekerRef}
        accept="image/*"
        onChange={previewFile}
        type="file"
        hidden
      />
      <button
        className="btn position-absolute edit_btn btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
        onClick={() => filePicekerRef.current.click()}
      >
        <i class="bi bi-pencil-fill fs-7"></i>
      </button>
      {imagePreview && (
        <button
          className="btn btn_delete btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
          onClick={clearFiles}
        >
          <i class="bi bi-x fs-2"></i>
        </button>
      )}
      {addImage ? (
        <div className="preview w-150px h-150px">
          {imagePreview != null && (
            <img className="image_position" src={imagePreview} alt="" />
          )}
        </div>
      ) : newsImage ? (
        <div className="preview w-400px h-400px">
          {imagePreview != null && (
            <img className="image_position" src={imagePreview} alt="" />
          )}
        </div>
      ) : offerModal ? (
        <div className="preview w-125px h-125px">
          {imagePreview != null && (
            <img className="image_position" src={imagePreview} alt="" />
          )}
        </div>
      ) : (
        newsAdd && (
          <div className="preview w-400px h-400px">
            {imagePreview != null && (
              <img className="image_position" src={imagePreview} alt="" />
            )}
          </div>
        )
      )}
    </>
  );
};

export default FilePreviewer;
