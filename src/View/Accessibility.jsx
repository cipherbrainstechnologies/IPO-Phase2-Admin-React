// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Field, Form, Formik } from "formik";
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Switch from '@mui/material/Switch';
// import { styled } from "@mui/material";
// import { getPurchaseAll, updateSinglePurchase } from "../redux/slice/versionSlice";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// const VersionControl = () => {
//     const dispatch = useDispatch();
    
//     const { getAllPurchaseData } = useSelector((state) => state?.versionReducer);
    
//     // Dispatch getPurchaseAll instead of getAllVersion
//     useEffect(() => {
//         let payload = {};
//         dispatch(getPurchaseAll({ payload }));
//     }, [dispatch]);

//     console.log("getAllPurchaseData===>", getAllPurchaseData);
    
//     const [modalData, setModalData] = useState(null);

//     const openEditModal = (index) => {
//         const version = getAllPurchaseData[index];
//         console.log("Plan data" , version)
//         setModalData(version);
//     };

//     const handleCloseModal = () => {
//         setModalData(null);
//     };

//     const IOSSwitch = styled((props) => (
//         <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
//     ))(({ theme }) => ({
//         width: 42,
//         height: 26,
//         padding: 0,
//         '& .MuiSwitch-switchBase': {
//             padding: 0,
//             margin: 2,
//             transitionDuration: '300ms',
//             '&.Mui-checked': {
//                 transform: 'translateX(16px)',
//                 color: '#fff',
//                 '& + .MuiSwitch-track': {
//                     backgroundColor: theme.palette.mode === 'dark' ? '#2ECA45' : '#65C466',
//                     opacity: 1,
//                     border: 0,
//                 },
//                 '&.Mui-disabled + .MuiSwitch-track': {
//                     opacity: 0.5,
//                 },
//             },
//             '&.Mui-focusVisible .MuiSwitch-thumb': {
//                 color: '#33cf4d',
//                 border: '6px solid #fff',
//             },
//             '&.Mui-disabled .MuiSwitch-thumb': {
//                 color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
//             },
//             '&.Mui-disabled + .MuiSwitch-track': {
//                 opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
//             },
//         },
//         '& .MuiSwitch-thumb': {
//             boxSizing: 'border-box',
//             width: 22,
//             height: 22,
//         },
//         '& .MuiSwitch-track': {
//             borderRadius: 26 / 2,
//             backgroundColor: theme.palette.mode === 'light' ? '#E9E9EA' : '#39393D',
//             opacity: 1,
//             transition: theme.transitions.create(['background-color'], {
//                 duration: 500,
//             }),
//         },
//     }));

//     const handleSubmit = async (values) => {
//         console.log("version control", values);

//         let payload = {
//             id:values.id,
//             isActive: values.isActive,
           
//         };
//        let pay={}
//         await dispatch(updateSinglePurchase({ payload }));
//         await dispatch(getPurchaseAll({pay}));
//         handleCloseModal();
//     };

//     return (
//         <>
//             <div className="card">
//                 <Formik
//                     initialValues={getAllPurchaseData.reduce((acc, obj, index) => {
//                         acc[`id_${index}`] = obj.id;
//                         acc[`isActive${index}`] = obj.isActive;
//                         return acc;
//                     }, {})}
//                     onSubmit={(values) => {
//                         console.log("values", values);
//                     }}
//                 >
//                     {({ values, setFieldValue }) => (
//                         <Form>
//                             <div className="card card-flush py-4">
//                                 <div className="card-header">
//                                     <div className="card-title">
//                                         <h2>Purchase Control </h2>
//                                     </div>
//                                 </div>
//                             </div>
//                             <div className="card card-flush py-4">
//                                 <div className="card-body pt-0">
//                                     <div className="table-responsive">
//                                         <table className="table table-row-dashed table-row-gray-300 gy-7">
//                                             <thead>
//                                                 <tr className="fw-semibold fs-6 text-gray-800 border-bottom border-gray-200">
//                                                     <th>Plans</th>
//                                                     <th>Status</th>
//                                                     <th>Action</th>

//                                                 </tr>
//                                             </thead>
//                                             <tbody>
//                                                 {getAllPurchaseData.map((obj, index) => (
//                                                     <tr key={index}>
//                                                         <td className="card-title">
//                                                             <span>{obj.Plan}</span>
//                                                         </td>
//                                                         <td>
//                                                             <FormControlLabel
//                                                                 control={
//                                                                     <IOSSwitch
//                                                                         checked={obj.isActive}
//                                                                         name={`isActive${index}`}
//                                                                         disabled
//                                                                         sx={{ m: 1 }}
//                                                                     />
//                                                                 }
//                                                             />
//                                                         </td>
//                                                         <td>
//                                                             <button className="btn btn-primary" onClick={() => openEditModal(index)}>
//                                                                 <span className="indicator-label">Edit</span>
//                                                             </button>
//                                                         </td>
//                                                     </tr>
//                                                 ))}
//                                             </tbody>
//                                         </table>
//                                     </div>
//                                     <div className="d-flex justify-content-end"></div>
//                                     <span>
//                             Note: Turning off the Premium feature will hide the "Go Ad Free" button in the mobile app. This action may affect revenue, as users will not be able to purchase premium subscriptions. Please proceed only if you are an authorized user and understand the potential impact. For any doubts or questions, contact the system administrator before making changes.
//                         </span>
//                                 </div>
//                                 <div>
                      
//                         </div>
//                                 {modalData && (
//                                     <div className="modal" style={{ display: "block", backgroundColor: "#201f1fb3", padding: "40" }}>
//                                         <div className="modal-dialog modal-dialog-centered mw-650px" role="document">
//                                             <div className="modal-content" style={{ padding: 40 }}>
//                                                 <h2>Edit Plan</h2>
//                                                 <Formik
//                                                     initialValues={{
//                                                         Plan: modalData.Plan,
//                                                         isActive: modalData.isActive,
//                                                         id: modalData.id,
//                                                     }}
//                                                     onSubmit={(values) => {
//                                                         console.log("Edited values:", values);
//                                                         handleSubmit(values);
//                                                     }}
//                                                 >
//                                                     {({ values, setFieldValue, handleSubmit }) => (
//                                                         <Form>
//                                                             <div className="form-group">
//                                                                 <label className="fw-semibold fs-6 mb-2">Plan:</label>
//                                                                 <Field type="text" name="Plan" className="form-control" disabled />
//                                                             </div>
                                                         
//                                                             <div className="form-group">
//                                                                 <FormControlLabel
//                                                                     control={
//                                                                         <Switch
//                                                                             checked={values.isActive}
//                                                                             onChange={() => setFieldValue("isActive", !values.isActive)}
//                                                                         />
//                                                                     }
//                                                                     label={    <span style={{ color: values.isActive ? "green" : "red" }}>
//                                                                     {values.isActive ? "Go Ad Free Button is Enable" : "Go Ad Free Button is Disable"}
//                                                                   </span>
//                                                               }
//                                                                 />
//                                                             </div>
                                                            
//                                                             <button className="btn btn-primary" onClick={handleSubmit}>
//                                                                 Save Changes
//                                                             </button>
//                                                             <button className="btn" onClick={handleCloseModal}>
//                                                                 Close
//                                                             </button>

//                                                         </Form>
//                                                     )}
//                                                 </Formik>
               

//                                             </div>
//                                         </div>
//                                     </div>
//                                 )}
//                             </div>
//                         </Form>
//                     )}
//                 </Formik>
//             </div>
//             <ToastContainer />
//         </>
//     );
// };

// export default VersionControl;
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Field, Form, Formik } from "formik";
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import { styled } from "@mui/material";
import { getPurchaseAll, updateSinglePurchase } from "../redux/slice/versionSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const OTPInput = ({ length, onChange }) => {
    const [otp, setOtp] = useState(Array(length).fill(""));

    const handleChange = (element, index) => {
        const value = element.value;
        if (/[^0-9]/.test(value)) return; // Only allow digits

        const newOtp = [...otp];
        newOtp[index] = value;
        setOtp(newOtp);
        onChange(newOtp.join(""));

        // Focus on the next input box when a digit is entered
        if (value && index < length - 1) {
            document.getElementById(`otp-${index + 1}`).focus();
        }
    };

    const handleKeyUp = (element, index) => {
        // Move to the previous input box when backspace is pressed
        if (element.key === 'Backspace' && !otp[index] && index > 0) {
            document.getElementById(`otp-${index - 1}`).focus();
        }
    };

    return (
        <div style={styles.otpContainer}>
            {otp.map((digit, index) => (
                <input
                    key={index}
                    id={`otp-${index}`}
                    type="password"
                    maxLength="1"
                    value={digit}
                    onChange={(e) => handleChange(e.target, index)}
                    onKeyUp={(e) => handleKeyUp(e, index)}
                    style={styles.otpBox}
                />
            ))}
        </div>
    );
};
const VersionControl = () => {
    const dispatch = useDispatch();
    const { getAllPurchaseData } = useSelector((state) => state?.versionReducer);
    
    // Passcode state
    const [passcode, setPasscode] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false); // To track passcode authentication

    // Dispatch getPurchaseAll instead of getAllVersion
    useEffect(() => {
        let payload = {};
        if (isAuthenticated) {
            dispatch(getPurchaseAll({ payload }));
        }
    }, [dispatch, isAuthenticated]);

    const [modalData, setModalData] = useState(null);

    const openEditModal = (index) => {
        const version = getAllPurchaseData[index];
        setModalData(version);
    };

    const handleCloseModal = () => {
        setModalData(null);
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
                        color: theme.palette.mode === 'light' ? theme.palette.grey[100] : theme.palette.grey[600],
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

    const handleSubmit = async (values) => {
        let payload = {
            id: values.id,
            isActive: values.isActive,
        };
        let pay = {};
        await dispatch(updateSinglePurchase({ payload }));
        await dispatch(getPurchaseAll({ pay }));
        handleCloseModal();
    };

    // Function to check passcode
    const handlePasscodeSubmit = () => {
        if (passcode === "1234") {
            setIsAuthenticated(true);
        } else {
            alert("Incorrect passcode. Please try again.");
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="passcode-container" style={styles.container}>
                <h2 style={styles.title}>Enter Passcode to Access Purchase Control</h2>
                <OTPInput length={4} onChange={setPasscode} />
                <button onClick={handlePasscodeSubmit} style={styles.button}>Submit</button>
            </div>
        );
    }

    return (
        <>
            <div className="card">
                <Formik
                    initialValues={getAllPurchaseData.reduce((acc, obj, index) => {
                        acc[`id_${index}`] = obj.id;
                        acc[`isActive${index}`] = obj.isActive;
                        return acc;
                    }, {})}
                    onSubmit={(values) => {
                        console.log("values", values);
                    }}
                >
                    {({ values, setFieldValue }) => (
                        <Form>
                            <div className="card card-flush py-4">
                                <div className="card-header">
                                    <div className="card-title">
                                        <h2>Purchase Control</h2>
                                    </div>
                                </div>
                            </div>
                            <div className="card card-flush py-4">
                                <div className="card-body pt-0">
                                    <div className="table-responsive">
                                        <table className="table table-row-dashed table-row-gray-300 gy-7">
                                            <thead>
                                                <tr className="fw-semibold fs-6 text-gray-800 border-bottom border-gray-200">
                                                    <th>Plans</th>
                                                    <th>Status</th>
                                                    <th>Action</th>

                                                </tr>
                                            </thead>
                                            <tbody>
                                                {getAllPurchaseData.map((obj, index) => (
                                                    <tr key={index}>
                                                        <td className="card-title">
                                                            <span>{obj.Plan}</span>
                                                        </td>
                                                        <td>
                                                            <FormControlLabel
                                                                control={
                                                                    <IOSSwitch
                                                                        checked={obj.isActive}
                                                                        name={`isActive${index}`}
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
                                    <span>
                                        Note: Turning off the Premium feature will hide the "Go Ad Free" button in the mobile app. This action may affect revenue, as users will not be able to purchase premium subscriptions. Please proceed only if you are an authorized user and understand the potential impact. For any doubts or questions, contact the system administrator before making changes.
                                    </span>
                                </div>
                                {modalData && (
                                    <div className="modal" style={{ display: "block", backgroundColor: "#201f1fb3", padding: "40" }}>
                                        <div className="modal-dialog modal-dialog-centered mw-650px" role="document">
                                            <div className="modal-content" style={{ padding: 40 }}>
                                                <h2>Edit Plan</h2>
                                                <Formik
                                                    initialValues={{
                                                        Plan: modalData.Plan,
                                                        isActive: modalData.isActive,
                                                        id: modalData.id,
                                                    }}
                                                    onSubmit={(values) => {
                                                        handleSubmit(values);
                                                    }}
                                                >
                                                    {({ values, setFieldValue, handleSubmit }) => (
                                                        <Form>
                                                            <div className="form-group">
                                                                <label className="fw-semibold fs-6 mb-2">Plan:</label>
                                                                <Field type="text" name="Plan" className="form-control" disabled />
                                                            </div>
                                                            <div className="form-group">
                                                                <FormControlLabel
                                                                    control={
                                                                        <Switch
                                                                            checked={values.isActive}
                                                                            onChange={() => setFieldValue("isActive", !values.isActive)}
                                                                        />
                                                                    }
                                                                    label={
                                                                        <span style={{ color: values.isActive ? "green" : "red" }}>
                                                                            {values.isActive ? "Go Ad Free Button is Enable" : "Go Ad Free Button is Disable"}
                                                                        </span>
                                                                    }
                                                                />
                                                            </div>
                                                            <button className="btn btn-primary" onClick={handleSubmit}>
                                                                Save Changes
                                                            </button>
                                                            <button className="btn" onClick={handleCloseModal}>
                                                                Close
                                                            </button>
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
const styles = {
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f5f5f5',
        padding: '20px',
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    },
    title: {
        fontSize: '24px',
        color: '#333',
        marginBottom: '20px',
    },
    otpContainer: {
        display: 'flex',
        justifyContent: 'center',
        gap: '10px',
        marginBottom: '20px',
    },
    otpBox: {
        width: '50px',
        height: '50px',
        fontSize: '24px',
        textAlign: 'center',
        borderRadius: '5px',
        border: '1px solid #ccc',
        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
    },
    button: {
        padding: '10px 20px',
        fontSize: '16px',
        backgroundColor: '#009270',
        color: 'white',
        border: 'none',
        borderRadius: '5px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    },
};


export default VersionControl;
