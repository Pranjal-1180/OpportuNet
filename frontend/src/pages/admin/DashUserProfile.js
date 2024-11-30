
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDetailsAction } from "../../redux/actions/userAction";
import { useParams } from "react-router-dom";
import { useTheme } from "@mui/material/styles";
import {
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Button,
} from "@mui/material";
import AdminChatComponent from "../../component/AdminChatComponent";

const DashUserProfile = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const { id } = useParams(); // This is the user's ID

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
      justifyContent="flex-start"
      alignItems="flex-start"
      minHeight="100vh"
      bgcolor={theme.palette.mode==="dark"?"#3C3D37":"#edeff0"}
      p={2}
    >

<Typography
      variant="h5"
      component="div"
      gutterBottom
      sx={{ alignSelf: "flex-start" }}
      color="#127ce6"
      fontSize="26px"
      left={0}
      fontWeight="bold"
    >
      User Profile
    </Typography>
      {/* Overlay for Resume Display */}
      {showResume && user?.resume && (
        <Box
          position="fixed"
          top={0}
          left={0}
          width="100%"
          height="100%"
          bgcolor="rgba(0, 0, 0, 0.8)"
          display="flex"
          justifyContent="center"
          alignItems="center"
          zIndex={4000}
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
            sx={{ mt: 1, position: "absolute", top: 80, right: 10 }}
          >
            Close
          </Button>
        </Box>
      )}

      {/* Main Content - Profile Card and Chat Side-by-Side */}
     
       
        {/* User Profile Card */}
        <Card
          sx={{
            maxWidth: 800,
            height:"100%",
            width: "100%",
            boxShadow: 3,
            borderRadius: 2,
            padding: 2,
            backgroundColor: theme.palette.mode==="dark"?"#3C3D37":"#ffffff",
            display: "flex-start",
            marginTop:"60px",
            marginLeft:"-100px"
          }}
        >
          <CardContent>
            

            <div style={{ display: "flex", gap: "20px" }}>
              {user?.resume && (
                <Box mt={2}>
                  <Button
                    variant="contained"
                    color="primary"
                    
                    onClick={handleResumeToggle}
                  >
                    {showResume ? "Hide Resume" : "View Resume"}
                  </Button>
                </Box>
              )}

              <Box mt={2}>
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleChatToggle}
                >
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
                      <Card
                        key={index}
                        sx={{ mb: 2, padding: 2, borderRadius: 2 }}
                      >
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

        {/* Chat Box - Placed to the Right of Profile Card */}
        {showChat && (
          <Box
            width="600px"
            height="100%"
            bgcolor="#ffffff"
            boxShadow={3}
            zIndex={10}
            display="flex"
            flexDirection="column"
            marginTop="60px"
          >
            <AdminChatComponent userId={user?._id} />
          </Box>
        )}
      </Box>
    // </Box>
  );
};

export default DashUserProfile;


