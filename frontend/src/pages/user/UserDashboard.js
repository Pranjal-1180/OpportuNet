// import React, { useEffect, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import StatComponent from "../../component/StatComponent";

// import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
// import WorkIcon from "@mui/icons-material/Work";
// import moment from "moment";
// import { Box, Button, List, ListItem, ListItemText } from "@mui/material";
// import ChatComponent from "../../component/ChatComponent";
// import { getChatHistory, fetchConversations } from "../../redux/actions/chatActions";

// const UserDashboard = () => {
//   const dispatch = useDispatch();
//   const { user } = useSelector((state) => state.userProfile);
//   const [showChat, setShowChat] = useState(false);
//   const [selectedAdminId, setSelectedAdminId] = useState(null);

//   const { conversations, loading, error } = useSelector((state) => state.chat);

//   useEffect(() => {
//     console.log("Conversations state:", conversations);
//     console.log("Loading state:", loading);
//     console.log("Error state:", error);
//   }, [conversations, loading, error]);

//   useEffect(() => {
//     if (user?._id) {
//       console.log("Dispatching fetchConversations action...");
//       dispatch(fetchConversations(user._id));
//     }
//   }, [user, dispatch]);

//   useEffect(() => {
//     if (selectedAdminId && user?._id) {
//       dispatch(getChatHistory(selectedAdminId, user._id));
//     }
//   }, [selectedAdminId, user, dispatch]);

//   const handleChatToggle = () => {
//     if (!conversations || conversations.length === 0) {
//       alert("No messages available to display.");
//       return;
//     }
//     setShowChat((prev) => !prev);
//   };

//   const handleAdminSelect = (adminId) => {
//     setSelectedAdminId(adminId);
//     setShowChat(true);
//   };

//   return (
//     <div style={{ padding: "20px", backgroundColor: "#edeff0", color: "white" }}>
//       <h2 style={{ paddingTop: "0px", color: "#7E60BF", paddingBottom: "20px" }}>Dashboard</h2>
  
//       <div
//         style={{
//           display: "flex",
//           flexDirection: "row",
//           gap: "16px",
//           flexWrap: "wrap",
//           marginTop: "0px",
//           justifyContent: "center",
//         }}
//       >
//         <StatComponent
//           value={user && moment(user.createdAt).format("YYYY / MM / DD")}
//           icon={<CalendarMonthIcon style={{ color: "#87A2FF", fontSize: "50px" }} />}
//           description="Member since"
//           money=""
//         />
//         <StatComponent
//           value={user && user.jobsHistory.length}
//           icon={<WorkIcon style={{ color: "#87A2FF", fontSize: "50px" }} />}
//           description="Number of jobs submitted"
//           money=""
//         />
//       </div>
  
//       <Box mt={2} style={{ color: "#7E60BF" }}>
//         <h3>Recruiters Who Have Messaged You:</h3>
//         {error ? (
//           <p>{error}</p>
//         ) : conversations.length === 0 ? ( // Handle empty conversations
//           <p>No messages found.</p>
//         ) : (
//           <List>
//             {conversations.map((admin) => (
//               <ListItem
//                 button
//                 key={admin.adminId}
//                 onClick={() => handleAdminSelect(admin.adminId)}
//                 style={{
//                   cursor: "pointer",
//                   backgroundColor: "white",
//                   transition: "transform 0.3s ease, box-shadow 0.3s ease",
//                   marginBottom: "8px", // Add spacing between list items
//                 }}
//                 onMouseEnter={(e) => {
//                   e.currentTarget.style.transform = "scale(1.01)";
//                   e.currentTarget.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.2)";
//                 }}
//                 onMouseLeave={(e) => {
//                   e.currentTarget.style.transform = "scale(1)";
//                   e.currentTarget.style.boxShadow = "none";
//                 }}
//               >
//                 <ListItemText primary={admin.firstName} />
//               </ListItem>
//             ))}
//           </List>
//         )}
//       </Box>
  
//       <Button
//         onClick={handleChatToggle}
//         style={{ color: "white", backgroundColor: "#3498DB" }}
//       >
//         {showChat ? "Close Chat" : "Open Chat"}
//       </Button>
  
//       {showChat && selectedAdminId && user?._id && (
//         <div
//           style={{
//             position: "absolute",
//             top: "0",
//             left: "0",
//             width: "100%",
//             height: "100%",
//             backgroundColor: "rgba(0, 0, 0, 0.5)", // Optional: Add a semi-transparent background
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//             zIndex: 1000, // Ensure it appears above everything else
//           }}
//         >
//           <div
//             style={{
//               backgroundColor: "#EEEEEE",
//               padding: "20px",
//               borderRadius: "8px",
//               boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
//               width: "60%", // Adjust as needed
//               maxHeight: "90%", // Prevent overflow
//               overflowY: "auto", // Scroll if content overflows
//             }}
//           >
//             <ChatComponent adminId={selectedAdminId} userId={user._id} isUserView={true} />
//             <Button
//               onClick={handleChatToggle}
//               style={{
//                 marginTop: "10px",
//                 backgroundColor: "#E74C3C",
//                 color: "white",
//               }}
//             >
//               Close Chat
//             </Button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
  
// };

// export default UserDashboard;



import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import StatComponent from "../../component/StatComponent";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import WorkIcon from "@mui/icons-material/Work";
import moment from "moment";
import { Box, Button } from "@mui/material";
import { fetchConversations } from "../../redux/actions/chatActions";
import ChatComponent from "../../component/ChatComponent";

const UserDashboard = () => {
  const dispatch = useDispatch();
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
    <div style={{ padding: "20px", backgroundColor: "#edeff0", color: "white" }}>
      <h2 style={{ paddingTop: "0px", color: "#7E60BF", paddingBottom: "20px" }}>
        Dashboard
      </h2>

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
        <h3>Recruiters Who Have Messaged You:</h3>
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





