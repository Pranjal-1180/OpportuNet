import {
  CHAT_GET_HISTORY_REQUEST,
  CHAT_GET_HISTORY_SUCCESS,
  CHAT_GET_HISTORY_FAIL,
  CHAT_SEND_MESSAGE_REQUEST,
  CHAT_SEND_MESSAGE_SUCCESS,
  CHAT_SEND_MESSAGE_FAIL,
  CLEAR_CHAT_MESSAGES,
  FETCH_CONVERSATIONS_SUCCESS,
  FETCH_CONVERSATIONS_FAIL,
  FETCH_CONVERSATIONS_REQUEST
} from "../constants/chatConstants";

const initialState = {
  messages: [],
  loading: false,
  error: null,
  conversations: [],
};

export const chatReducer = (state = initialState, action) => {
  switch (action.type) {
    case CHAT_GET_HISTORY_REQUEST:
      return { ...state, loading: true };
    case CHAT_GET_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        messages: action.payload,
        adminId: action.payload.adminId,
        error: null,
      };
    case CHAT_GET_HISTORY_FAIL:
      return { ...state, loading: false, error: action.payload };

    case CHAT_SEND_MESSAGE_REQUEST:
      return { ...state, loading: true };
    case CHAT_SEND_MESSAGE_SUCCESS:
      return {
        ...state,
        loading: false,
        messages: Array.isArray(state.messages)
          ? [...state.messages, action.payload]
          : [action.payload],
        error: null,
      };
    case CHAT_SEND_MESSAGE_FAIL:
      return { ...state, loading: false, error: action.payload };
    case CLEAR_CHAT_MESSAGES:
      return { ...state, messages: [] };
      
      case FETCH_CONVERSATIONS_REQUEST:
        return { ...state, loading: true, error: null };
    
      case FETCH_CONVERSATIONS_SUCCESS:
        return {
          ...state,
          loading: false,
          conversations: action.payload, 
        }; 
    case FETCH_CONVERSATIONS_FAIL:
      return { ...state, error: action.payload };

    default:
      return state;
  }
};
