import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, Form, Formik } from "formik";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { createMainLineIpo, updateIPO } from "../redux/slice/mainLineIpoSlices";
import  GoogleLogo  from "../assets/banner.png";
import  AppleLogo  from "../assets/inter.png";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { styled } from "@mui/material";
import { getAllAd  , updateSingleAd} from "../redux/slice/advertisementSlice";

const AdControl = ({ ipoEdit }) => {
    const dispatch = useDispatch();

    const { getAllAdData, getSingleAd,
        editAdId} = useSelector(
        (state) => state?.adReducer
    );
    useEffect(() => {
    let payload={}
        dispatch(getAllAd({payload}));
      }, []);
console.log("getallversionData===>" , getAllAdData)
const [modalData, setModalData] = useState(null);
const openEditModal = (index) => {
    const adID = getAllAdData[index];
    setModalData(adID);
    // Code to open modal
};

const handleCloseModal = () => {
    setModalData(null);
    // Code to close modal
};



    const IOSSwitch = styled((props) => (
        <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
    ))(({ theme }) => ({
        width: 42,
        height: 26,
        padding: 0,
        '& .MuiSwitch-switchBase': {
            padding: 0,
            margin: 2,
            transitionDuration: '300ms',
            '&.Mui-checked': {
                transform: 'translateX(16px)',
                color: '#fff',
                '& + .MuiSwitch-track': {
                    backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
                    opacity: 1,
                    border: 0,
                },
                '&.Mui-disabled + .MuiSwitch-track': {
                    opacity: 0.5,
                },
            },
            '&.Mui-focusVisible .MuiSwitch-thumb': {
                color: '#33cf4d',
                border: '6px solid #fff',
            },
            '&.Mui-disabled .MuiSwitch-thumb': {
                color:
                    theme.palette.mode === 'light'
                        ? theme.palette.grey[100]
                        : theme.palette.grey[600],
            },
            '&.Mui-disabled + .MuiSwitch-track': {
                opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
            },
        },
        '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: 22,
            height: 22,
        },
        '& .MuiSwitch-track': {
            borderRadius: 26 / 2,
            backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
            opacity: 1,
            transition: theme.transitions.create(['background-color'], {
                duration: 500,
            }),
        },
    }));

    const handleSubmit = async(values) => {
        // Your handleSubmit logic here
        console.log("adID control", values)
     
        let payload = {
            type:values.type,
            enable:values.enable,
            adID:values.adID,
            id:values.id,
            timer:values.timer ? values.timer : "-"
        }
        let pay={}
        console.log("payload in adID control" , payload)
      await  dispatch(updateSingleAd({payload}))
      await dispatch(getAllAd({pay}));
        handleCloseModal()
    }



    return (
        <>
            <div className="card">
                <Formik
                    initialValues={getAllAdData.reduce((acc, obj, index) => {
                        acc[`id_${index}`] = obj.id;
                        acc[`type${index}`] = obj.type;
                        acc[`adID${index}`] = obj.adID;
                        acc[`enable${index}`] = obj.enable;
                        return acc;
                    }, {})}
                    onSubmit={(values) => {
                        // handleSubmit(values);
                        console.log("values" , values)
                    }}
                >
                    {({ values, setFieldValue }) => (
                        <Form>
                            {/* Your form content here */}
                            <div className="card card-flush py-4">
                                <div className="card-header">
                                    <div className="card-title">
                                        <h2>Advertisement Control Center</h2>
                                    </div>
                                </div>
                            </div>

                            <div className="card card-flush py-4">
                                <div className="card-body pt-0">
                                    <div className="table-responsive">
                                        <table className="table table-row-dashed table-row-gray-300 gy-7">
                                            <thead>
                                                <tr className="fw-semibold fs-6 text-gray-800 border-bottom border-gray-200">
                                                    <th>Advertisement type</th>
                                                    <th>Advertisement id</th>
                                                    <th>Interval in Miliseconds</th>
                                                    <th>Ad Status</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {getAllAdData.map((obj, index) => (
                                                    <tr key={index}>
                                                        <td className="card-title">
                                                        
                                                            {obj.type}
                                                        </td>
                                                        <td>
                                                            <Field
                                                                type="number"
                                                                className="form-control"
                                                                name={`adID${index}`}
                                                                disabled
                                                                placeholder={`${obj.adID}`}
                                                                
                                                            />
                                                        </td>
                                                          <td>
                                                            <Field
                                                                type="number"
                                                                className="form-control"
                                                                name={`adID${index}`}
                                                                disabled
                                                                placeholder={obj.timer ? `${obj.timer}` :"Not Applicable"}
                                                                
                                                            />
                                                        </td>
                                                        <td>
                                                            {console.log("trueeee==>" , values[`enable${index}`] )}
                                                            <FormControlLabel
                                                                control={
                                                                    <IOSSwitch
                                                                    checked={obj.enable}
                                                                    name={`enable${index}`}
                                                                        disabled
                                                                        sx={{ m: 1 }}
                                                                    />
                                                                }
                                                            />
                                                        </td>
                                                        <td>
                                                            <button className="btn btn-primary" onClick={() => openEditModal(index)}>
                                                                <span className="indicator-label">Edit</span>
                                                            </button>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    <div className="d-flex justify-content-end">
                                {/* <button type="submit" className="btn btn-primary">
                                    <span className="indicator-label">Save Changes</span>
                                </button> */}
                            </div>
                                </div>

                                {/* edit modal */}
                                {modalData && (
                                   

                                   <div className="modal" style={{ display: "block" , backgroundColor:"#201f1fb3"  , padding:"40"}}>
                                   <div className="modal-dialog modal-dialog-centered mw-650px" role="document">
                    <div className="modal-content" style={{padding:40}}>

                        <h2>Edit Ad ID</h2>
                        <Formik
                            initialValues={{
                                type: modalData.type,
                                adID: modalData.adID,
                                enable: modalData.enable,
                                timer:modalData.timer,
                                id:modalData.id
                            }}
                            onSubmit={(values) => {
                                // Handle form submission here
                                // handleSubmit(values)
                                console.log("Edited values:", values);
                                handleSubmit(values)
                            }}
                        >
                            {({ values, setFieldValue , handleSubmit }) => (
                                <Form>
                                    <div className="form-group">
                                    <label className="fw-semibold fs-6 mb-2">Ad Type:</label>
                                     
                                        <Field type="text" name="type" className="form-control" disabled />
                                    </div>
                                    <div className="form-group">
                                    <label className="fw-semibold fs-6 mb-2">ID:</label>

                                        <Field type="text" name="adID" className="form-control" />
                                    </div>
                                   { console.log("values" , values.type)}
                                  {(values.type == "InterButtonAndroid"||values.type == "InterButtonIOS" || values.type =="InterTimerAndroid" || values.type =="InterTimerIOS")&&  <div className="form-group">
                                    <label className="fw-semibold fs-6 mb-2">Interval:</label>
                                        <Field type="text" name="timer" className="form-control" />
                                    </div>}
                                    <div className="form-group">
                                    <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={values.enable}
                                                    onChange={(event) => setFieldValue("enable",!values.enable)}
                                                />
                                            }
                                            label="Ad Status"
                                        />
                                    </div>
                                    <div style={{marginTop:20 , marginBottom:20}}>
                                    <span style={{color:"red"}}>
                                    <p>Note : Before altering any data, consult with Ad manager for thorough review and alignment with system requirements. </p>
                                   </span>
                                    </div>
                                   
                                    <button  className="btn btn-primary" onClick={handleSubmit}>Save Changes</button>
                                    <button  className="btn" onClick={handleCloseModal} >Close</button>
                               
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
                </div>
            
               
            )} 
                            
                            </div>
  
                        </Form>
                    )}
                </Formik>
            </div>
            <ToastContainer />
        </>
    );
};

export default AdControl;
