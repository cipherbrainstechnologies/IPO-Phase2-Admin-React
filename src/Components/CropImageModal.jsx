// import "react-image-crop/dist/ReactCrop.css";
import CommonMultiplyIcon from "../assets/media/Icons/CommonMultiplyIcon";
import { useState } from "react";
// import ReactCrop from "react-image-crop";
import { useEffect } from "react";
import Cropper from "react-easy-crop";
import "../Components/cropImage.css";
const CromImageModel = ({
  singleUserData,
  setSingleUserData,
  setShowModal,
  showModal,
}) => {
  // const [crop, setCrop] = useState("");
  const [file, setFile] = useState(null);
  const [finalImage, setFinalImage] = useState(null);
  const CROP_AREA_ASPECT = 3 / 2;
  const [fileDataURL, setFileDataURL] = useState(null);

  const changeHandler = (e) => {
    const file = e.target.files[0];

    setFile(file);
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
  const [crop, setCrop] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);
  const [croppedArea, setCroppedArea] = useState(null);

  const Output = ({ croppedArea }) => {
    const scale = 100 / croppedArea.width;
    const transform = {
      x: `${-croppedArea.x * scale}%`,
      y: `${-croppedArea.y * scale}%`,
      scale,
      width: "calc(100% + 0.5px)",
      height: "auto",
    };

    const imageStyle = {
      transform: `translate3d(${transform.x}, ${transform.y}, 0) scale3d(${transform.scale},${transform.scale},1)`,
      width: transform.width,
      height: transform.height,
    };

    return (
      <div
        className="output"
        style={{ paddingBottom: `${100 / CROP_AREA_ASPECT}%` }}
      >
        <img src="/assets/dog.jpeg" alt="" style={imageStyle} />
      </div>
    );
  };
  return (
    <div className="modal-dialog modal-dialog-centered mw-650px">
      <div className="modal-content">
        <div className="modal-header" id="kt_modal_edit_user_header">
          <h2 className="fw-bold">Edit User</h2>

          <div
            className="btn btn-icon btn-sm btn-active-icon-primary"
            data-bs-dismiss="modal"
            onClick={() => {
              // setFileDataURL("");
              setShowModal({
                ...showModal,
                showClass: "",
                displayClass: "",
                modalBackdrop: "",
              });
            }}
          >
            <CommonMultiplyIcon />
          </div>
        </div>

        <div className="modal-body scroll-y mx-5 mx-xl-15 my-7">
          <div className="App">
            <input type="file" onChange={(e) => changeHandler(e)} />
            <div className="cropper">
              <Cropper
                image={fileDataURL}
                aspect={CROP_AREA_ASPECT}
                crop={crop}
                zoom={zoom}
                onCropChange={setCrop}
                onZoomChange={setZoom}
                onCropAreaChange={(croppedArea) => {
                  setCroppedArea(croppedArea);
                }}
              />
            </div>
            <div className="viewer">
              <div>{croppedArea && <Output croppedArea={croppedArea} />}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CromImageModel;
