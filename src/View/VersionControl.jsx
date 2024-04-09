import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, Form, Formik } from "formik";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { createMainLineIpo, updateIPO } from "../redux/slice/mainLineIpoSlices";
import { ReactComponent as GoogleLogo } from "../assets/media/img/google.svg";
import { ReactComponent as AppleLogo } from "../assets/media/img/apple.svg";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { styled } from "@mui/material";
import { getAllVersion, updateSingleversion } from "../redux/slice/versionSlice";

const VersionControl = ({ ipoEdit }) => {
    const dispatch = useDispatch();

    const { getAllVersionData, getSingleVersion,
        editVersionData} = useSelector(
        (state) => state?.versionReducer
    );
    useEffect(() => {
    let payload={}
        dispatch(getAllVersion({payload}));
      }, []);
console.log("getallversionData===>" , getAllVersionData)
const [modalData, setModalData] = useState(null);
const openEditModal = (index) => {
    const version = getAllVersionData[index];
    setModalData(version);
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
        console.log("version control", values)
     
        let payload = {
            platform:values.platform,
            forceUpdate:values.forceUpdate,
            version:values.version,
            id:values.id
        }
        let pay={}
        console.log("payload in version control" , payload)
      await  dispatch(updateSingleversion({payload}))
      await dispatch(getAllVersion({pay}));
        handleCloseModal()
    }



    return (
        <>
            <div className="card">
                <Formik
                    initialValues={getAllVersionData.reduce((acc, obj, index) => {
                        acc[`id_${index}`] = obj.id;
                        acc[`platform${index}`] = obj.platform;
                        acc[`version${index}`] = obj.version;
                        acc[`forceUpdate${index}`] = obj.forceUpdate;
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
                                        <h2>Android and iOS Version Control</h2>
                                    </div>
                                </div>
                            </div>

                            <div className="card card-flush py-4">
                                <div className="card-body pt-0">
                                    <div className="table-responsive">
                                        <table className="table table-row-dashed table-row-gray-300 gy-7">
                                            <thead>
                                                <tr className="fw-semibold fs-6 text-gray-800 border-bottom border-gray-200">
                                                    <th>Platform</th>
                                                    <th>Version Number</th>
                                                    <th>Force Update</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {getAllVersionData.map((obj, index) => (
                                                    <tr key={index}>
                                                        <td className="card-title">
                                                            {obj.platform === "Android" && (
                                                                <GoogleLogo style={{ width: '50px', height: '50px', objectFit: "contain", marginRight: 15 }} />
                                                            )}
                                                            {obj.platform === "IOS" && (
                                                                <AppleLogo style={{ width: '50px', height: '50px', objectFit: "contain", marginRight: 15 }} />
                                                            )}
                                                            {obj.platform}
                                                        </td>
                                                        <td>
                                                            <Field
                                                                type="number"
                                                                className="form-control"
                                                                name={`version${index}`}
                                                                disabled
                                                                placeholder={`${obj.version}`}
                                                                
                                                            />
                                                        </td>
                                                        <td>
                                                            {console.log("trueeee==>" , values[`forceUpdate${index}`] )}
                                                            <FormControlLabel
                                                                control={
                                                                    <IOSSwitch
                                                                    checked={obj.forceUpdate}
                                                                    name={`forceUpdate${index}`}
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

                        <h2>Edit Version</h2>
                        <Formik
                            initialValues={{
                                platform: modalData.platform,
                                version: modalData.version,
                                forceUpdate: modalData.forceUpdate,
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
                                    <label className="fw-semibold fs-6 mb-2">Platform:</label>
                                     
                                        <Field type="text" name="platform" className="form-control" disabled />
                                    </div>
                                    <div className="form-group">
                                    <label className="fw-semibold fs-6 mb-2">Version:</label>

                                        <Field type="text" name="version" className="form-control" />
                                    </div>
                                    <div className="form-group">
                                        <FormControlLabel
                                            control={
                                                <Switch
                                                    checked={values.forceUpdate}
                                                    onChange={(event) => setFieldValue("forceUpdate",!values.forceUpdate)}
                                                />
                                            }
                                            label="Force Update"
                                        />
                                    </div>
                                    <div style={{marginTop:20 , marginBottom:20}}>
                                    <span style={{color:"red"}}>
                                    <p>Note : Before altering any data, consult with both Admin and Developer teams for thorough review and alignment with system requirements. </p>
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

export default VersionControl;
