
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getChatHistory,
  sendMessage,
  clearChatMessages,
} from "../redux/actions/chatActions";
import PropTypes from "prop-types";

const ChatComponent = ({ adminList, userId, isUserView, onClose }) => {
  const dispatch = useDispatch();
  const {
    messages: reduxMessages = [],
    loading,
    error,
  } = useSelector((state) => state.chat.messages);
  const [localMessages, setLocalMessages] = useState([]);
  const [selectedAdminId, setSelectedAdminId] = useState(null);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    
    if (selectedAdminId && userId) {
      dispatch(clearChatMessages());
      dispatch(getChatHistory(selectedAdminId, userId));
    } else {
      setLocalMessages([]);
    }
  }, [dispatch, selectedAdminId, userId]);

  // Sync Redux messages with local messages whenever they change
  useEffect(() => {
    if (
      reduxMessages.length > 0 &&
      JSON.stringify(reduxMessages) !== JSON.stringify(localMessages)
    ) {
      setLocalMessages(reduxMessages);
    }
  }, [reduxMessages]);

  const handleSendMessage = () => {
    if (!newMessage.trim() || !selectedAdminId) return;

    const senderId = isUserView ? userId : selectedAdminId;
    const newMessageObject = {
      senderId: { _id: senderId },
      content: newMessage,
    };

    setLocalMessages((prevMessages) => [...prevMessages, newMessageObject]);
    dispatch(sendMessage(selectedAdminId, userId, senderId, newMessage));
    setNewMessage("");
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  const styles = {
    container: {
      display: "flex",
      height: "100%",
      width: "100%",
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      overflow: "hidden",
      position: "relative",
    },
    adminList: {
      width: "25%",
      borderRight: "1px solid #ddd",
      padding: "15px",
      backgroundColor: "#f1f1f1",
      color: "#333",
      overflowY: "auto",
    },
    chatSection: {
      width: "75%",
      padding: "15px",
      display: "flex",
      flexDirection: "column",
    },
    messagesContainer: {
      display: "flex",
      flexDirection: "column",
      flex: 1,
      overflowY: "auto",
      padding: "10px",
      backgroundColor: "#ffffff",
      border: "1px solid #ddd",
      borderRadius: "8px",
      marginBottom: "10px",
    },
    messageBubble: (isSender) => ({
      alignSelf: isSender ? "flex-end" : "flex-start",
      backgroundColor: isSender ? "#3498db" : "#ecf0f1",
      color: isSender ? "#ffffff" : "#333",
      padding: "7px",
      borderRadius: isSender ? "12px 12px 0 12px" : "12px 12px 12px 0",
      margin: "3px 0",
      maxWidth: "45%",
      wordWrap: "break-word",
      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    }),
    inputContainer: {
      display: "flex",
      alignItems: "center",
      marginTop: "6px",
    },
    input: {
      flex: 1,
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "10px",
    },
    sendButton: {
      marginLeft: "10px",
      padding: "8px 17px",
      borderRadius: "8px",
      backgroundColor: "#3498db",
      color: "white",
      fontSize: "14px",
      fontWeight: "bold",
      border: "none",
      cursor: "pointer",
      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    },
    closeButton: {
      position: "absolute",
      bottom: "10px",
      left: "10px",
      backgroundColor: "#e74c3c",
      color: "white",
      padding: "6px 10px",
      borderRadius: "8px",
      border: "none",
      cursor: "pointer",
      fontWeight: "bold",
      fontSize: "14px",
      height:"28px",
      width:"60px"
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.adminList}>
        <h4 style={{ margin: "0 0 15px 0", color: "#7E60BF" }}>Recruiters who have messaged you</h4>
        {adminList.map((admin) => (
          <div
            key={admin.adminId}
            style={{
              padding: "10px",
              margin: "5px 0",
              cursor: "pointer",
              backgroundColor:
                selectedAdminId === admin.adminId ? "#d6d6f5" : "white",
              borderRadius: "8px",
              color: "#333",
              fontWeight: "bold",
              boxShadow:
                selectedAdminId === admin.adminId
                  ? "0px 2px 5px rgba(0, 0, 0, 0.2)"
                  : "none",
              transition: "background-color 0.3s, box-shadow 0.3s",
            }}
            onClick={() => setSelectedAdminId(admin.adminId)}
          >
            {admin.firstName} {admin.lastName}
          </div>
        ))}
      </div>
      <button style={styles.closeButton} onClick={onClose}>
          Close
      </button>

      <div style={styles.chatSection}>
     
        <div style={styles.messagesContainer}>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p style={{ color: "red" }}>Error: {error}</p>
          ) : selectedAdminId ? (
            localMessages.map((message, index) => {
              const isSender = message.senderId._id !== selectedAdminId;
              return (
                <div key={index} style={styles.messageBubble(isSender)}>
                  {message.content}
                </div>
              );
            })
          ) : (
            <p>Please select an admin to view the chat.</p>
          )}
        </div>

        <div style={styles.inputContainer}>
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder="Type your message..."
            style={styles.input}
          />
          <button onClick={handleSendMessage} style={styles.sendButton}>
            Send
          </button>
        </div>
      </div>
    </div>
  );
};
ChatComponent.propTypes = {
  adminList: PropTypes.array, // Admin list for User's view
  userId: PropTypes.string.isRequired, // Current user's ID
 
  isUserView: PropTypes.bool, // Whether it's User or Admin view
  onClose: PropTypes.func, // Close handler
};
export default ChatComponent;
