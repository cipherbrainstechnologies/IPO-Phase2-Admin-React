import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const imageMimeType = /image\/(png|jpg|jpeg)/i;

const FilePreview2 = ({ fileData }) => {
  const [file, setFile] = useState(null);
  const [fileDataURL, setFileDataURL] = useState(null);

  const changeHandler = (e) => {
    const file = e.target.files[0];
    if (!file.type.match(imageMimeType)) {
      alert("Image mime type is not valid");
      return;
    }
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

  return (
    <>
      <p>
        <label
          htmlFor="image"
          className="btn position-absolute edit_btn btn btn-icon btn-circle btn-active-color-primary w-25px h-25px bg-body shadow"
        >
          <i class="bi bi-pencil-fill fs-7" />
        </label>
        <input
          name="file"
          type="file"
          id="image"
          onChange={changeHandler}
          hidden
          accept=".png, .jpg, .jpeg"
          value={fileData?.file}
        />
      </p>

      {fileDataURL ? (
        <div className="preview w-400px h-400px">
          {<img src={fileDataURL} alt="preview" />}
        </div>
      ) : null}
    </>
  );
};

export default FilePreview2;
