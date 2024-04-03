import React, { useState } from "react";
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

const SubscriptionTab = ({ ipoEdit }) => {
    const { ALGOLIAID, ID, getIPODataById, getAllMainLineIpoData } = useSelector(
        (state) => state?.mainLineIpoSlice
    );
    const ipoType = localStorage.getItem("ipoType");

    // Fake array with object data
    const fakeArrayData = [
        {
            platform: "Android",
            versionNumber: "1.0",
            forceUpdate: true,
        },
        {
            platform: "iOS",
            versionNumber: "2.0",
            forceUpdate: true,
        },
        // Add more objects as needed
    ];

    const dispatch = useDispatch();
    const [forceUpdate, setForceUpdate] = useState(false);

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

    const handleSubmit = (values) => {
        // Your handleSubmit logic here
        const versionControlData = [];
        for (let i = 0; i < Object.keys(values).length / 3; i++) {
            const platform = values[`platform_${i}`];
            const versionNumber = values[`versionNumber_${i}`];
            const forceUpdate = values[`forceUpdate_${i}`];
            versionControlData.push({
                platform,
                versionNumber,
                forceUpdate,
            });
        }
        console.log("version control" , versionControlData)
    }

    

    return (
        <>
        <div className="card">
            <Formik
                initialValues={fakeArrayData.reduce((acc, obj, index) => {
                    acc[`platform_${index}`] = obj.platform;
                    acc[`versionNumber_${index}`] = obj.versionNumber;
                    acc[`forceUpdate_${index}`] = obj.forceUpdate;
                    return acc;
                }, {})}
                onSubmit={(values) => {
                    handleSubmit(values);
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
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {fakeArrayData.map((obj, index) => (
                                                <tr key={index}>
                                                    <td className="card-title">
                                                        {obj.platform === "Android" && (
                                                            <GoogleLogo style={{ width: '50px', height: '50px', objectFit: "contain", marginRight: 15 }} />
                                                        )}
                                                        {obj.platform === "iOS" && (
                                                            <AppleLogo style={{ width: '50px', height: '50px', objectFit: "contain", marginRight: 15 }} />
                                                        )}
                                                        {obj.platform}
                                                    </td>
                                                    <td>
                                                        <Field
                                                            type="number"
                                                            className="form-control"
                                                            name={`versionNumber_${index}`}
                                                            placeholder={`${obj.platform} App Latest Version Number`}
                                                        />
                                                    </td>
                                                    <td>
                                                    <FormControlLabel
                                                                control={
                                                                    <IOSSwitch
                                                                        checked={values[`forceUpdate_${index}`]}
                                                                        onChange={(event) => {
                                                                            setFieldValue(`forceUpdate_${index}`, event.target.checked);
                                                                        }}
                                                                        sx={{ m: 1 }}
                                                                    />
                                                                }
                                                            />
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
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

export default SubscriptionTab;
