import axios from "axios";
import { toast } from "react-toastify";
import {
  JOB_TYPE_LOAD_FAIL,
  JOB_TYPE_LOAD_REQUEST,
  JOB_TYPE_LOAD_SUCCESS,
  JOB_TYPE_UPDATE_REQUEST,
  JOB_TYPE_UPDATE_SUCCESS,
  JOB_TYPE_UPDATE_FAIL,
  JOB_TYPE_UPDATE_RESET,
  CREATE_JOB_TYPE_FAIL,
  CREATE_JOB_TYPE_REQUEST,
  CREATE_JOB_TYPE_SUCCESS,
  DELETE_JOB_TYPE_REQUEST,
  DELETE_JOB_TYPE_SUCCESS,
  DELETE_JOB_TYPE_FAIL,
  DELETE_JOB_TYPE_RESET,
} from "../constants/jobTypeConstant";

export const jobTypeLoadAction = () => async (dispatch) => {
  dispatch({ type: JOB_TYPE_LOAD_REQUEST });
  try {
    const { data } = await axios.get("/api/type/jobs");
    dispatch({
      type: JOB_TYPE_LOAD_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: JOB_TYPE_LOAD_FAIL,
      payload: error.response.data.error,
    });
  }
};

// create jobs category
export const createJobTypeAction = (jobtype) => async (dispatch) => {
  dispatch({ type: CREATE_JOB_TYPE_REQUEST });

  try {
    const { data } = await axios.post("/api/type/create", jobtype);
    dispatch({
      type: CREATE_JOB_TYPE_SUCCESS,
      payload: data,
    });
    toast.success("Job type created successfully");
  } catch (error) {
    dispatch({
      type: CREATE_JOB_TYPE_FAIL,
      payload: error.response.data.error,
    });
    toast.error(error.response.data.error);
  }
};

//delete single job action
export const deleteJobTypeAction = (id) => async (dispatch) => {
  dispatch({ type: DELETE_JOB_TYPE_REQUEST });
  try {
    const { data } = await axios.delete(`/api/type/delete/${id}`);
    dispatch({
      type: DELETE_JOB_TYPE_SUCCESS,
      payload: data,
    });
    toast.success("Job type deleted successfully");
  } catch (error) {
    dispatch({
      type: DELETE_JOB_TYPE_FAIL,
      payload: error.response.data.error,
    });
    toast.error(error.response.data.error);
  }
};

//update jobtype
export const jobTypeUpdateAction =
  (id, jobTypeName) => async (dispatch, getState) => {
    dispatch({ type: JOB_TYPE_UPDATE_REQUEST });

    const {
      signIn: { userInfo },
    } = getState();

    // Check if user is authenticated
    if (!userInfo || !userInfo.token) {
      dispatch({
        type: JOB_TYPE_UPDATE_FAIL,
        payload: "User is not authenticated",
      });
      toast.error("User is not authenticated");
      return;
    }

    try {
      const { data } = await axios.put(
        `http://localhost:9000/api/type/update/${id}`,
        { jobTypeName },
        {
          headers: {
            Authorization: `Bearer ${userInfo.token}`, // Include token in Authorization header
          },
        }
      );
      dispatch({
        type: JOB_TYPE_UPDATE_SUCCESS,
        payload: data,
      });
      toast.success("Category updated successfully");
    } catch (error) {
      dispatch({
        type: JOB_TYPE_UPDATE_FAIL,
        payload: error.response?.data?.error || "Failed to update category",
      });
      toast.error("Failed to update category");
    }
  };