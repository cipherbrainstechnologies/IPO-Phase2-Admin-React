import React from 'react';
import { Field, ErrorMessage } from 'formik';
import Add from "../../../assets/media/img/add.png"
import replace from "../../../assets/media/img/replace.png"
import deletei from "../../../assets/media/img/delete.png"
import { useDispatch, useSelector } from 'react-redux';
import { META_IMAGE } from "../../../redux/slice/mainLineIpoSlices";
import { useLocation } from 'react-router-dom';
import SpinnerLoader from '../../SpinnerLoader';

const ImagePicker = ({ field, form  , id , ALID , image1}) => {
  console.log("id--------->" , id)
  const location = useLocation();
  const ipoPrefillData = location.state;
  const dispatch = useDispatch()
  const formDataImg = new FormData();
  const { ID, ALGOLIAID, getIPODataById, getAllMainLineIpoData, updatedIpo , isLoading } =
  useSelector((state) => state.mainLineIpoSlice);
console.log("metaImage==============> ", getIPODataById.metaImage)
    const handleChange = (event) => {
      console.log("handle image run")
        const file = event.currentTarget.files && event.currentTarget.files[0];
        if (file) {
          form.setFieldValue(field.name, file);
      
          // Append the selected file to the FormData object
          const formData = new FormData();
          formData.append('file', file);
          // form.setFieldValue('formDataImg', formData);
          
          // Optionally, you can also show a preview of the selected image
          const reader = new FileReader();
          reader.onload = () => {
            // Update state or use setFieldValue to set the preview image URL
            form.setFieldValue('previewImage', reader.result);
            // form.setFieldValue('metaImage', reader.result);
            form.setFieldValue('metaImage', reader.result);
          };
          reader.readAsDataURL(file);
        }
      };
      const ipoType = localStorage.getItem("ipoType");
      const handleReplaceClick = () => {
      console.log("handle repalce image run")

        // Programmatically trigger the file input click event
        const fileInput = document.getElementById(field.name);
        fileInput.click();
        
        // Listen for changes in the file input
        fileInput.addEventListener('change', (event) => {
            const file = event.currentTarget.files[0];
            if (file) {
                const fileSizeMB = file.size / (1024 * 1024); // Calculate file size in MB
                if (fileSizeMB <= 2) { // Check if file size is less than or equal to 2 MB
                    // Update form field value with new file data
                    form.setFieldValue(field.name, file);
    
                    // Append the selected file to the FormData object
                    const formData = new FormData();
                    // formData.append('metaImage', file);
                    formDataImg.append("file", file);
                    console.log("formData======>" , formDataImg)
                    // form.setFieldValue('formDataImg', formData);
                    const payload = {
                      CategoryForIPOS: ipoType,
                      payload:formDataImg,
                      id:id,
                      algoliaID:ALID
                    };
                    // dispatch(updateBannerImage({ payloadImage }));
                    console.log("payload in image picker" , payload)

                    dispatch(META_IMAGE({ payload }));
                    // Optionally, you can also show a preview of the selected image
                    const reader = new FileReader();
                    reader.onload = () => {
                        // Update state or use setFieldValue to set the preview image URL
                        form.setFieldValue('previewImage', reader.result);
                        form.setFieldValue('metaImage', reader.result);
                    };
                    reader.readAsDataURL(file);
                } else {
                    // Display an error message or perform any other action for files larger than 2 MB
                    alert('Image size must be less than or equal to 2 MB.');
                    // Clear the file input
                    event.currentTarget.value = null;
                }
            }
        });
    };
    
    
  const handleRemove = () => {
    form.setFieldValue(field.name, null);
    form.setFieldValue('previewImage', null);
  };

  return (
    <>{
      isLoading ? <SpinnerLoader/> :
      <div style={{ display: "flex", flexDirection: "row" ,  justifyContent: "space-between"  }}>
      {/* File input */}
      <input
        id={field.name}
        name={field.name}
        type="file"
        accept="image/*"
        onChange={handleChange}
        hidden
      />
  
      {/* Remove Image button */}
      <div style={{ display: "flex", flexDirection: "column"  }}>
      <button type="button" onClick={handleRemove} style={{width:"100px", background:"transparent", border: "none",}}>
        <img
            src={deletei}
            alt="Preview"
            style={{ maxWidth: '30px', maxHeight: '30px', alignSelf: "flex-end" }}
          />
      <label className="form-label" style={{marginLeft:"10px"}}>Delete</label>
          
      </button>
  
      {/* Replace/Add Image button */}
      <button type="button" onClick={handleReplaceClick} style={{width:"110px" , background:"transparent", border: "none",}}>
        <img
            src={form.values.previewImage ? replace : Add}
            alt="Preview"
            style={{ maxWidth: '30px', maxHeight: '30px', alignSelf: "flex-end" }}
          />
      <label className="form-label" style={{marginLeft:"10px"}}>{form.values.previewImage ? "Replace" : "Add"}</label>
  
      </button>
      </div>
   
  
      {/* Error message */}
      <ErrorMessage name={field.name} component="div" />
  
      {/* Preview Image */}
      {console.log("image" ,form?.values?.metaImage  )}
      {form.values.previewImage && (
  
        <div style={{justifyContent:"center", display: 'flex',}}>
          <img
            src={form.values.previewImage}
            alt="Preview"
            style={{ maxWidth: '100px', maxHeight: '100px' ,objectFit:"contain"  }}
          />
        </div>
      )}
    </div>
    }
      
    </>
 
  );
};

export default ImagePicker;
