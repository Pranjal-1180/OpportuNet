
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StatComponent from "../../component/StatComponent";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WorkIcon from "@mui/icons-material/Work";
import moment from "moment";
import { Box, Button } from "@mui/material";
import { fetchConversations } from "../../redux/actions/chatActions";
import ChatComponent from "../../component/ChatComponent";
import { useTheme } from "@mui/material/styles";
const UserDashboard = () => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const { user } = useSelector((state) => state.userProfile);
  const { conversations, loading, error } = useSelector((state) => state.chat);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    if (user?._id) {
      dispatch(fetchConversations(user._id));
    }
  }, [user, dispatch]);

  const handleChatToggle = () => {
    if (!conversations || conversations.length === 0) {
      alert("No messages available to display.");
      return;
    }
    setShowChat((prev) => !prev);
  };

  return (
    <div style={{  backgroundColor: theme.palette.mode==="dark"?"#3C3D37":"#edeff0", color: "white",minHeight: "100vh",paddingLeft: "10px",paddingTop:"20px"}}>
      <h3 style={{ paddingTop: "0px", color: "#219ff2", paddingBottom: "20px",marginTop:'0px',marginLeft:"0px" }}>
        Dashboard
      </h3>

      <div
        style={{
          display: "flex",
          flexDirection: "row",
          gap: "16px",
          flexWrap: "wrap",
          marginTop: "0px",
          justifyContent: "center",
        }}
      >
        <StatComponent
          value={user && moment(user.createdAt).format("YYYY / MM / DD")}
          icon={
            <CalendarMonthIcon style={{ color: "#87A2FF", fontSize: "50px" }} />
          }
          description="Member since"
          money=""
        />
        <StatComponent
          value={user && user.jobsHistory.length}
          icon={<WorkIcon style={{ color: "#87A2FF", fontSize: "50px" }} />}
          description="Number of jobs submitted"
          money=""
        />
      </div>

      <Box mt={2} style={{ color: "#7E60BF" }}>
        <h4>Recruiters Who Have Messaged You:</h4>
        {error ? (
          <p>{error}</p>
        ) : (
          <p>{conversations.length === 0 && "No messages found."}</p>
        )}
      </Box>

      <Button
        onClick={handleChatToggle}
        style={{ color: "white", backgroundColor: "#3498DB" }}
      >
        {showChat ? "Close Chat" : "Open Chat"}
      </Button>

      {showChat && user?._id && (
        <div
          style={{
            position: "absolute",
            top: "0",
            left: "0",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#f9f9f9",
              padding: "20px",
              borderRadius: "12px",
              boxShadow: "0 8px 16px rgba(0, 0, 0, 0.2)",
              width: "60%",
              height: "80%",
              display: "flex",
            }}
          >
            <ChatComponent
              adminList={conversations}
              userId={user._id}
              isUserView={true}
              onClose={() => setShowChat(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default UserDashboard;





