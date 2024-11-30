// src/actions/chatActions.js

import axios from "axios";
import {
  CHAT_GET_HISTORY_REQUEST,
  CHAT_GET_HISTORY_SUCCESS,
  CHAT_GET_HISTORY_FAIL,
  CHAT_SEND_MESSAGE_REQUEST,
  CHAT_SEND_MESSAGE_SUCCESS,
  CHAT_SEND_MESSAGE_FAIL,
  FETCH_CONVERSATIONS_SUCCESS,
  FETCH_CONVERSATIONS_FAIL,
  FETCH_CONVERSATIONS_REQUEST,
} from "../constants/chatConstants";

// Action to get chat history
export const getChatHistory = (adminId, userId) => async (dispatch) => {
  dispatch({ type: CHAT_GET_HISTORY_REQUEST });

  try {
    const { data } = await axios.get(
      `http://localhost:9000/api/chat/${adminId}/${userId}`,
      { withCredentials: true } // Ensures cookies are included
    );
    console.log("get history data:", data.adminId); // Debugging
    dispatch({
      type: CHAT_GET_HISTORY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: CHAT_GET_HISTORY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

// Action to send a chat message
export const sendMessage =
  (adminId, userId, senderId, content) => async (dispatch) => {
    dispatch({ type: CHAT_SEND_MESSAGE_REQUEST });

    try {
      const { data } = await axios.post(
        `http://localhost:9000/api/chat/${adminId}/${userId}/send`,
        { senderId, content },
        { withCredentials: true } // Ensures cookies are included
      );
      console.log("Sent message data:", data); // Debugging
      dispatch({
        type: CHAT_SEND_MESSAGE_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: CHAT_SEND_MESSAGE_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const clearChatMessages = () => ({
  type: "CLEAR_CHAT_MESSAGES",
});

export const fetchConversations = (userId) => async (dispatch) => {
  try {
    // Dispatch request action
    dispatch({ type: FETCH_CONVERSATIONS_REQUEST });
    console.log("Fetching conversations for user:", userId);

    // Make API request to get conversations
    const { data } = await axios.get(
      `http://localhost:9000/api/chat/conversations/${userId}`,
      { withCredentials: true }
    );

    console.log("API response for fetchConversations:", data); // Debugging response

    // Dispatch success action with the fetched data
    dispatch({
      type: FETCH_CONVERSATIONS_SUCCESS,
      payload: data, // The data contains admins' details: [{ adminId, firstName }]
    });
  } catch (error) {
    console.error("Error in fetchConversations action:", error);

    // Dispatch fail action with error message
    dispatch({
      type: FETCH_CONVERSATIONS_FAIL,
      payload: error.response?.data.message || error.message,
    });
  }
};
