
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetailsAction } from "../../redux/actions/userAction";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Button,
} from "@mui/material";
import ChatComponent from "../../component/ChatComponent"; // Import ChatComponent

const DashUserProfile = () => {
  const dispatch = useDispatch();
  const { id } = useParams(); // This is the user's ID
  const adminId = useSelector((state) => state.signIn.userInfo?.id);
  const [showResume, setShowResume] = useState(false);
  const [showChat, setShowChat] = useState(false); // State to control the chat box
  const userDetails = useSelector((state) => state.adminUserDetail);

  const { loading, error, user } = userDetails;

  useEffect(() => {
    if (id) {
      dispatch(getUserDetailsAction(id));
    }
  }, [dispatch, id]);

  const handleResumeToggle = () => {
    setShowResume((prev) => !prev);
  };

  const handleCloseResume = () => {
    setShowResume(false);
  };

  const handleChatToggle = () => {
    setShowChat((prev) => !prev);
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="80vh"
      bgcolor="#f0f2f5"
      p={2}
    >
      {/* Overlay for Resume Display */}
      {showResume && user?.resume && (
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          bgcolor="rgba(0, 0, 0, 0.8)"
          display="flex"
          justifyContent="center"
          alignItems="center"
          zIndex={10}
        >
          <iframe
            src={`http://localhost:9000/${user.resume.replace(/\\/g, "/")}`}
            title="User Resume"
            style={{ width: "80%", height: "80%", border: "none" }}
          ></iframe>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleCloseResume}
            sx={{ mt: 1, position: "absolute", top: 10, right: 10 }}
          >
            Close
          </Button>
        </Box>
      )}

      {/* Main Content - Profile Card and Chat Side-by-Side */}
      <Box display="flex" gap={2} alignItems="flex-start" width="100%" maxWidth={1200}>
        {/* User Profile Card */}
        <Card sx={{ maxWidth: 600, width: "100%", boxShadow: 3, borderRadius: 2, padding: 2, backgroundColor: "#ffffff" }}>
          <CardContent>
            <Typography variant="h5" component="div" gutterBottom>
              User Profile
            </Typography>

            <div style={{ display: "flex", gap: "20px" }}>
              {user?.resume && (
                <Box mt={2}>
                  <Button variant="contained" color="primary" onClick={handleResumeToggle}>
                    {showResume ? "Hide Resume" : "View Resume"}
                  </Button>
                </Box>
              )}

              <Box mt={2}>
                <Button variant="contained" color="primary" onClick={handleChatToggle}>
                  {showChat ? "Close Chat" : "Open Chat"}
                </Button>
              </Box>
            </div>

            {/* Loading/Error or User Info Display */}
            {loading ? (
              <Box display="flex" justifyContent="center" mt={2}>
                <CircularProgress />
              </Box>
            ) : error ? (
              <Alert severity="error" sx={{ mt: 2 }}>
                {error}
              </Alert>
            ) : (
              user && (
                <Box mt={2}>
                  <Card sx={{ mb: 2, padding: 2, borderRadius: 2 }}>
                    <Typography variant="body1">
                      <strong>First Name:</strong> {user.firstName}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Last Name:</strong> {user.lastName}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Email:</strong> {user.email}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Education:</strong> {user.education}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Percentage:</strong> {user.percentage}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Address:</strong> {user.address}
                    </Typography>
                    <Typography variant="body1">
                      <strong>Phone no.:</strong> {user.phone}
                    </Typography>
                  </Card>

                  <Typography variant="h6" gutterBottom mt={3}>
                    Applied Jobs
                  </Typography>
                  {user.jobsHistory && user.jobsHistory.length > 0 ? (
                    user.jobsHistory.map((jobHistory, index) => (
                      <Card key={index} sx={{ mb: 2, padding: 2, borderRadius: 2 }}>
                        <Typography variant="body1">
                          <strong>Job ID:</strong> {jobHistory.job._id}
                        </Typography>
                        <Typography variant="body1">
                          <strong>Job Title:</strong> {jobHistory.job.title}
                        </Typography>
                      </Card>
                    ))
                  ) : (
                    <Typography variant="body1" color="textSecondary">
                      No applied jobs found.
                    </Typography>
                  )}
                </Box>
              )
            )}
          </CardContent>
        </Card>

        {/* Chat Box - Placed Next to Profile Card */}
        {showChat && (
          <Box
            width="400px"
            height="100%"
            bgcolor="#ffffff"
            boxShadow={3}
            zIndex={10}
            display="flex"
            flexDirection="column"
          >
             <ChatComponent userId={user?._id} adminId={adminId} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default DashUserProfile;

//   return (
//     <Box
//       display="flex"
//       justifyContent="auto"
//       alignItems="center"
//       minHeight="80vh"
//       bgcolor="#f0f2f5"
//       p={2}
//       position="relative"
//     >
//       {showResume && user?.resume && (
//         <Box
//           position="absolute"
//           top={0}
//           left={0}
//           width="100%"
//           height="100%"
//           bgcolor="rgba(0, 0, 0, 0.8)"
//           display="flex"
//           justifyContent="center"
//           alignItems="center"
//           zIndex={10}
//         >
//           <iframe
//             src={`http://localhost:9000/${user.resume.replace(/\\/g, "/")}`}
//             title="User Resume"
//             style={{ width: "80%", height: "80%", border: "none" }}
//           ></iframe>
//           <Button
//             variant="outlined"
//             color="secondary"
//             onClick={handleCloseResume}
//             sx={{ mt: 1, position: "absolute", top: 10, right: 10 }}
//           >
//             Close
//           </Button>
//         </Box>
//       )}

//       <Card
//         sx={{
//           maxWidth: 600,
//           width: "100%",
//           boxShadow: 3,
//           borderRadius: 2,
//           padding: 2,
//           backgroundColor: "#ffffff",
//         }}
//       >
//         <CardContent>
//           <Typography variant="h5" component="div" gutterBottom>
//             User Profile
//           </Typography>

//           <div style={{ display: "flex", gap: "20px" }}>
//             {user?.resume && (
//               <Box mt={2}>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={handleResumeToggle}
//                 >
//                   {showResume ? "Hide Resume" : "View Resume"}
//                 </Button>
//               </Box>
//             )}

//             {/* Chat Toggle Button */}
//             <Box mt={2}>
//               <Button
//                 variant="contained"
//                 color="primary"
//                 onClick={handleChatToggle}
//               >
//                 {showChat ? "Close Chat" : "Open Chat"}
//               </Button>
//             </Box>
//           </div>

//           {loading ? (
//             <Box display="flex" justifyContent="center" mt={2}>
//               <CircularProgress />
//             </Box>
//           ) : error ? (
//             <Alert severity="error" sx={{ mt: 2 }}>
//               {error}
//             </Alert>
//           ) : (
//             user && (
//               <Box mt={2}>
//                 <Card sx={{ mb: 2, padding: 2, borderRadius: 2 }}>
//                   <Typography variant="body1">
//                     <strong>First Name:</strong> {user.firstName}
//                   </Typography>
//                   <Typography variant="body1">
//                     <strong>Last Name:</strong> {user.lastName}
//                   </Typography>
//                   <Typography variant="body1">
//                     <strong>Email:</strong> {user.email}
//                   </Typography>
//                   <Typography variant="body1">
//                     <strong>Education:</strong> {user.education}
//                   </Typography>
//                   <Typography variant="body1">
//                     <strong>Percentage:</strong> {user.percentage}
//                   </Typography>
//                   <Typography variant="body1">
//                     <strong>Address:</strong> {user.address}
//                   </Typography>
//                   <Typography variant="body1">
//                     <strong>Phone no.:</strong> {user.phone}
//                   </Typography>
//                 </Card>

//                 <Typography variant="h6" gutterBottom mt={3}>
//                   Applied Jobs
//                 </Typography>
//                 {user.jobsHistory && user.jobsHistory.length > 0 ? (
//                   user.jobsHistory.map((jobHistory, index) => (
//                     <Card
//                       key={index}
//                       sx={{ mb: 2, padding: 2, borderRadius: 2 }}
//                     >
//                       <Typography variant="body1">
//                         <strong>Job ID:</strong> {jobHistory.job._id}
//                       </Typography>
//                       <Typography variant="body1">
//                         <strong>Job Title:</strong> {jobHistory.job.title}
//                       </Typography>
//                     </Card>
//                   ))
//                 ) : (
//                   <Typography variant="body1" color="textSecondary">
//                     No applied jobs found.
//                   </Typography>
//                 )}
//               </Box>
//             )
//           )}
//         </CardContent>
//       </Card>

//       {/* Chat Box */}
//       {showChat && (
//         <Box
//           position="absolute"
//           top={0}
//           right={0}
//           width="400px"
//           height="100%"
//           bgcolor="#ffffff"
//           boxShadow={3}
//           zIndex={10}
//           display="flex"
//           flexDirection="column"
//         >
//           <ChatComponent userId={user?._id} />
//         </Box>
//       )}
      
//     </Box>
//   );
// };

// export default DashUserProfile;




