import React, { useEffect, useState } from 'react'; // Import useEffect and useState
import { useSelector, useDispatch } from 'react-redux';
import { useTheme } from "@mui/material/styles";
import { useNavigate } from 'react-router-dom';
import UploadResume from '../../component/UploadResume';
import { userProfileAction,userUploadResumeAction } from '../../redux/actions/userAction';
import ResumeViewer from '../../component/ResumeViewer'; // Import the new ResumeViewer

const UserInfoDashboard = () => {
    const dispatch = useDispatch();
    const { user } = useSelector(state => state.userProfile);
    const theme = useTheme();
    const navigate = useNavigate();
    
    // State for controlling the resume viewer
    const [showViewer, setShowViewer] = useState(false);
    const baseURL = "http://localhost:9000"; 
    const normalizedResumePath = user?.resume.replace(/\\/g, '/'); 
    useEffect(() => {
        dispatch(userProfileAction());
        console.log("User profile fetched:", user); // Log the entire user object here
            console.log("User resume:", user?.resume); // Log the resume filename specifically
    }, [dispatch]);

    const handleEditClick = () => {
        if (user && user._id) {
            navigate(`/user/edit/${user._id}`);
        }
    };

    const handleResumeUpload = async (resumeFile) => {
        await dispatch(userUploadResumeAction(user._id, resumeFile));
        await dispatch(userProfileAction());
        console.log("User profile fetched:", user); // Log the entire user object here
        console.log("User resume:", user?.resume); // Log the resume filename specifically
        console.log("Resume uploaded and user profile updated!");
    };

    const openResumeViewer = () => {
        
        console.log("Normalized Resume Path:", `${baseURL}/${normalizedResumePath}`); // Log the full URL
        setShowViewer(true);
    };

    const closeResumeViewer = () => {
        setShowViewer(false);
    };

    return (
        <div style={{ maxWidth: "50%", margin: "auto", paddingTop: "50px" }}>
            <h1 style={{ fontSize: "18px", marginBottom: "20px", borderBottom: "2px solid #ddd", color: "#007BFF" }}>Personal Info</h1>

            <div style={{ backgroundColor: "#f0f4f7", padding: "20px", borderRadius: "10px", color: "#333", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
                <p><strong>First Name:</strong> {user?.firstName}</p>
                <p><strong>Last Name:</strong> {user?.lastName}</p>
                <p><strong>Email:</strong> {user?.email}</p>
                <p><strong>Status:</strong> {user?.role === 0 ? "Regular User" : "Admin"}</p>
                <p><strong>Education:</strong> {user?.education}</p>
                <p><strong>Percentage:</strong> {user?.percentage}</p>
                <p><strong>Address:</strong> {user?.address}</p>
                <p><strong>Phone no.:</strong> {user?.phone}</p>

                {/* Resume Link */}
                {user?.resume && (
                    <p>
                        <strong>Resume:</strong>
                        <a onClick={openResumeViewer} style={{ cursor: 'pointer', color: '#007BFF' }}> View Resume</a>
                    </p>
                )}

                {/* Upload Resume Component */}
                {user && <UploadResume userId={user._id} onResumeUpload={handleResumeUpload} />}
                
                {/* Edit Button */}
                <button 
                    style={{
                        backgroundColor: theme.palette.primary.main,
                        color: "#fff",
                        padding: "10px 20px",
                        borderRadius: "5px",
                        border: "none",
                        cursor: "pointer",
                        fontSize: "16px",
                        transition: "background-color 0.3s ease"
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = theme.palette.primary.dark}
                    onMouseLeave={(e) => e.target.style.backgroundColor = theme.palette.primary.main}
                    onClick={handleEditClick}
                >
                    Edit
                </button>
            </div>

            {/* Resume Viewer */}
           
            {showViewer && (
                <ResumeViewer 
                resumePath={`${baseURL}/${normalizedResumePath}`} // Pass the full URL
                onClose={closeResumeViewer} 
            />
            )}
        </div>
    );
};

export default UserInfoDashboard;


// import React, { useEffect } from 'react'; // Import useEffect
// import { useSelector, useDispatch } from 'react-redux'; // Import useDispatch
// import { useTheme } from "@mui/material/styles";
// import { useNavigate } from 'react-router-dom';
// import UploadResume from '../../component/UploadResume';
// import { userProfileAction, userUploadResumeAction } from '../../redux/actions/userAction'; // Import actions

// const UserInfoDashboard = () => {
//     const dispatch = useDispatch(); // Initialize dispatch
//     const { user } = useSelector(state => state.userProfile);
//     const theme = useTheme();
//     const bgColor = theme.palette.mode === "light" ? "#fafafa" : "#303030";
    
//     const navigate = useNavigate();

//     useEffect(() => {
//         // Fetch user profile when the component mounts
//         dispatch(userProfileAction());
//     }, [dispatch]); // Include dispatch in the dependency array

//     const handleEditClick = () => {
//         if (user && user._id) {
//             navigate(`/user/edit/${user._id}`);
//         }
//     };

//     const handleResumeUpload = async (resumeFile) => {
//         // Dispatch the upload resume action
//         await dispatch(userUploadResumeAction(user._id, resumeFile));
        
//         // After uploading, fetch updated user details
//         await dispatch(userProfileAction());
//         console.log("Resume uploaded and user profile updated!");
//     };

//     return (
//         <div style={{ maxWidth: "50%", margin: "auto", paddingTop: "50px" }}>
//             <div style={{ backgroundColor: "#f0f4f7", padding: "20px", borderRadius: "10px", color: "#333", boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)" }}>
//                 <h2 style={{ fontSize: "18px", marginBottom: "20px", borderBottom: "2px solid #ddd", color: "#007BFF" }}>Personal Info</h2>

//                 {/* User Info Display */}
//                 <p><strong>First Name:</strong> {user?.firstName}</p>
//                 <p><strong>Last Name:</strong> {user?.lastName}</p>
//                 <p><strong>Email:</strong> {user?.email}</p>
//                 <p><strong>Status:</strong> {user?.role === 0 ? "Regular User" : "Admin"}</p>
//                 <p><strong>Education:</strong> {user?.education}</p>
//                 <p><strong>Percentage:</strong> {user?.percentage}</p>
//                 <p><strong>Address:</strong> {user?.address}</p>
//                 <p><strong>Phone no.:</strong> {user?.phone}</p>

//                 {/* Resume Link */}
//                 {user?.resume && (
//                     <p>
//                         <strong>Resume:</strong>
//                          {/* <a href={`/${user.resume}`} target="_blank" rel="noopener noreferrer">View Resume</a> */}
//                          <a href={`/uploads/${user.resume}`} target="_blank" rel="noopener noreferrer">View Resume</a>

//                     </p>
//                 )}

//                 {/* Upload Resume Component */}
                

//                 {user && <UploadResume userId={user._id} onResumeUpload={handleResumeUpload} />}
                
//                 {/* Edit Button */}
//                 <button 
//                     style={{
//                         backgroundColor: theme.palette.primary.main,
//                         color: "#fff",
//                         padding: "10px 20px",
//                         borderRadius: "5px",
//                         border: "none",
//                         cursor: "pointer",
//                         fontSize: "16px",
//                         transition: "background-color 0.3s ease"
//                     }}
//                     onMouseEnter={(e) => e.target.style.backgroundColor = theme.palette.primary.dark}
//                     onMouseLeave={(e) => e.target.style.backgroundColor = theme.palette.primary.main}
//                     onClick={handleEditClick}
//                 >
//                     Edit
//                 </button>
//             </div>
//         </div>
//     );
// };

// export default UserInfoDashboard;

