import axios from 'axios';
import { toast } from "react-toastify";
import {
    USER_LOAD_FAIL,
    USER_LOAD_REQUEST,
    USER_LOAD_SUCCESS,
    USER_LOGOUT_FAIL,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_SUCCESS,
    ALL_USER_LOAD_FAIL,
    ALL_USER_LOAD_REQUEST,
    ALL_USER_LOAD_SUCCESS,
    USER_APPLY_JOB_FAIL,
    USER_APPLY_JOB_REQUEST,
    USER_APPLY_JOB_SUCCESS,
    USER_SIGNUP_FAIL,
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_SUCCESS,
    USER_EDIT_REQUEST,
    USER_EDIT_SUCCESS,
    USER_EDIT_FAIL,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPLOAD_RESUME_REQUEST,
    USER_UPLOAD_RESUME_SUCCESS,
    USER_UPLOAD_RESUME_FAIL
} from '../constants/userConstant';



export const userSignInAction = (user) => async (dispatch) => {
    dispatch({ type: USER_SIGNIN_REQUEST });
    try {
        const { data } = await axios.post("/api/signin", user);
        localStorage.setItem('userInfo', JSON.stringify(data));
        dispatch({
            type: USER_SIGNIN_SUCCESS,
            payload: data
        });
        toast.success("Login Successfully!");
    } catch (error) {
        dispatch({
            type: USER_SIGNIN_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}

// user sign up action
// export const userSignUpAction = (user) => async (dispatch) => {
//     dispatch({ type: USER_SIGNUP_REQUEST });
//     try {
//         const { data } = await axios.post("/api/signup", user);

//         dispatch({
//             type: USER_SIGNUP_SUCCESS,
//             payload: data
//         });
//         toast.success("Register Successfully!");
//     } catch (error) {
//         dispatch({
//             type: USER_SIGNUP_FAIL,
//             payload: error.response.data.error
//         });
//         toast.error(error.response.data.error);
//     }
// }
export const userSignUpAction = (user) => async (dispatch) => {
    dispatch({ type: USER_SIGNUP_REQUEST });

    const formData = new FormData();
    formData.append("firstName", user.firstName);
    formData.append("lastName", user.lastName);
    formData.append("email", user.email);
    formData.append("password", user.password);
    formData.append("education", user.education);
    formData.append("percentage", user.percentage);
    formData.append("address", user.address);
    formData.append("phone", user.phone);
    formData.append("role", user.role);

    // Only append the resume file if it exists
    if (user.resume) {
        formData.append("resume", user.resume);
    }

    try {
        const { data } = await axios.post("/api/signup", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        });

        dispatch({
            type: USER_SIGNUP_SUCCESS,
            payload: data
        });
        toast.success("Registered Successfully!");
    } catch (error) {
        dispatch({
            type: USER_SIGNUP_FAIL,
            payload: error.response?.data?.error || "Registration failed."
        });
        toast.error(error.response?.data?.error || "Registration failed.");
    }
};



//log out action
export const userLogoutAction = () => async (dispatch) => {
    dispatch({ type: USER_LOGOUT_REQUEST });
    try {
        const { data } = await axios.get("/api/logout");
        localStorage.removeItem('userInfo');
        dispatch({
            type: USER_LOGOUT_SUCCESS,
            payload: data
        });
        toast.success("Log out successfully!");
    } catch (error) {
        dispatch({
            type: USER_LOGOUT_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}


//user profile action
export const userProfileAction = () => async (dispatch) => {
    dispatch({ type: USER_LOAD_REQUEST });
    try {
        const { data } = await axios.get("/api/me");
        dispatch({
            type: USER_LOAD_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: USER_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}



// user profile details
export const getUserDetailsAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    const {
      signIn: { userInfo },
    } = getState();

    const config = {
      headers: {
        Authorization: `Bearer ${userInfo.token}`,
      },
    };

    const { data } = await axios.get(`/api/user/${id}`, config);

    dispatch({
      type: USER_DETAILS_SUCCESS,
      payload: data.user, // Assuming `data.user` contains the user object
    });
  } catch (error) {
    dispatch({
      type: USER_DETAILS_FAIL,
      payload: error.response && error.response.data.message
        ? error.response.data.message
        : error.message,
    });
  }
};


//user edit
export const userEditAction = (id, updatedUserData) => async (dispatch) => {
    dispatch({ type: USER_EDIT_REQUEST });
    console.log('Dispatching edit request');
    
    try {
        const config = {
            headers: {
                "Content-Type": "application/json",
            },
        };
        
        const { data } = await axios.put(`/api/user/edit/${id}`, updatedUserData, config);
        console.log('Success, received data:', data);
        
        dispatch({
            type: USER_EDIT_SUCCESS,
            payload: data,
        });
        
    } catch (error) {
        console.error('Error:', error);
        dispatch({
            type: USER_EDIT_FAIL,
            payload: error.response && error.response.data.message 
                ? error.response.data.message 
                : error.message,
        });
    }
};

//user job apply action
export const userApplyJobAction = (job) => async (dispatch) => {
    dispatch({ type: USER_APPLY_JOB_REQUEST });
    try {
        const { data } = await axios.post("/api/user/jobhistory", job);

        dispatch({
            type: USER_APPLY_JOB_SUCCESS,
            payload: data
        });
        toast.success("Applied Successfully for this Job!");
    } catch (error) {
        dispatch({
            type: USER_APPLY_JOB_FAIL,
            payload: error.response.data.error
        });
        toast.error(error.response.data.error);
    }
}

//all user action
export const allUserAction = () => async (dispatch) => {
    dispatch({ type: ALL_USER_LOAD_REQUEST });
    try {
        const { data } = await axios.get("/api/allusers");
        dispatch({
            type: ALL_USER_LOAD_SUCCESS,
            payload: data
        });

    } catch (error) {
        dispatch({
            type: ALL_USER_LOAD_FAIL,
            payload: error.response.data.error
        });
    }
}

//delete the user
export const deleteUserAction=(id)=> async(dispatch)=>{
    dispatch({type:DELETE_USER_REQUEST});
    try{
        const {data}=await axios.delete(`/api/admin/user/delete/${id}`);
        dispatch({
            type:DELETE_USER_SUCCESS,
            payload:data
        });
        // toast.success("User deleted successfuly");
    }
    catch(error){
        dispatch({
            type:DELETE_USER_FAIL,
            payload: error.response && error.response.data.error ? error.response.data.error : error.message,
        })
        // toast.error("User deletion failed");
    }
}

// user upload resume action


export const userUploadResumeAction = (id, resumeFile) => async (dispatch, getState) => {
    dispatch({ type: USER_UPLOAD_RESUME_REQUEST });
    
    const {
        signIn: { userInfo },
    } = getState();

    const config = {
        headers: {
            "Content-Type": "multipart/form-data", // Important for file uploads
            Authorization: `Bearer ${userInfo.token}`, // Include token for authentication
        },
    };

    const formData = new FormData();
    formData.append("resume", resumeFile); // Append the resume file to form data

    try {
        const { data } = await axios.put(`/api/user/uploadResume/${id}`, formData, config);
        
        dispatch({
            type: USER_UPLOAD_RESUME_SUCCESS,
            payload: data,
        });

        // You can also handle UI feedback here, if necessary
        alert("Resume uploaded successfully!");
    } catch (error) {
        dispatch({
            type: USER_UPLOAD_RESUME_FAIL,
            payload: error.response && error.response.data.error 
                ? error.response.data.error 
                : error.message,
        });
        alert("Failed to upload resume.");
    }
};
