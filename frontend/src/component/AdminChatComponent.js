import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  getChatHistory,
  sendMessage,
  clearChatMessages,
} from "../redux/actions/chatActions";
import PropTypes from "prop-types";

const AdminChatComponent = ({ userId }) => {
  const dispatch = useDispatch();
  const {
    messages: reduxMessages = [],
    loading,
    error,
  } = useSelector((state) => state.chat.messages);

  const [localMessages, setLocalMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  
  const adminId = useSelector((state) => state.signIn.userInfo?.id);
  useEffect(() => {
    if (adminId && userId) {
      dispatch(clearChatMessages());
      dispatch(getChatHistory(adminId, userId));
    }
  }, [dispatch, adminId, userId]);

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
    if (!newMessage.trim()) return;

    const senderId = adminId; // Admin is sending the message
    const newMessageObject = {
      senderId: { _id: senderId },
      content: newMessage,
    };

    setLocalMessages((prevMessages) => [...prevMessages, newMessageObject]);
    dispatch(sendMessage(adminId, userId, senderId, newMessage)); // Send the message
    setNewMessage(""); // Clear the message input
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
    chatSection: {
      width: "100%",
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
      overflowY: "scroll",
    },
    messageBubble: (isSender) => ({
      alignSelf: isSender ? "flex-end" : "flex-start",
      backgroundColor: isSender ? "#3498db" : "#ecf0f1",
      color: isSender ? "#ffffff" : "#333",
      padding: "10px",
      borderRadius: isSender ? "12px 12px 0 12px" : "12px 12px 12px 0",
      margin: "5px 0",
      maxWidth: "60%",
      wordWrap: "break-word",
      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    }),
    inputContainer: {
      display: "flex",
      alignItems: "center",
      marginTop: "10px",
    },
    input: {
      flex: 1,
      padding: "10px",
      borderRadius: "8px",
      border: "1px solid #ccc",
      fontSize: "16px",
    },
    sendButton: {
      marginLeft: "10px",
      padding: "10px 20px",
      borderRadius: "8px",
      backgroundColor: "#3498db",
      color: "white",
      fontSize: "16px",
      fontWeight: "bold",
      border: "none",
      cursor: "pointer",
      boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.1)",
    },
  };

  return (
    <div style={styles.container}>
      <div style={styles.chatSection}>
        <div style={styles.messagesContainer}>
          {loading ? (
            <p>Loading...</p>
          ) : error ? (
            <p style={{ color: "red" }}>Error: {error}</p>
          ) : (
            localMessages.map((message, index) => {
              const isSender = message.senderId._id === adminId;
              return (
                <div key={index} style={styles.messageBubble(isSender)}>
                  {message.content}
                </div>
              );
            })
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

AdminChatComponent.propTypes = {
  userId: PropTypes.string.isRequired, // Current user's ID
};

export default AdminChatComponent;
