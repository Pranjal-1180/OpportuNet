import {
    USER_LOAD_FAIL,
    USER_LOAD_REQUEST,
    USER_LOAD_RESET,
    USER_LOAD_SUCCESS,
    USER_LOGOUT_FAIL,
    USER_LOGOUT_REQUEST,
    USER_LOGOUT_RESET,
    USER_LOGOUT_SUCCESS,
    USER_SIGNIN_FAIL,
    USER_SIGNIN_REQUEST,
    USER_SIGNIN_RESET,
    USER_SIGNIN_SUCCESS,
    ALL_USER_LOAD_FAIL,
    ALL_USER_LOAD_REQUEST,
    ALL_USER_LOAD_RESET,
    ALL_USER_LOAD_SUCCESS,
    USER_APPLY_JOB_FAIL,
    USER_APPLY_JOB_REQUEST,
    USER_APPLY_JOB_RESET,
    USER_APPLY_JOB_SUCCESS,
    USER_SIGNUP_FAIL,
    USER_SIGNUP_REQUEST,
    USER_SIGNUP_RESET,
    USER_SIGNUP_SUCCESS,
    USER_EDIT_REQUEST,
    USER_EDIT_SUCCESS,
    USER_EDIT_FAIL,
    USER_EDIT_RESET,
    DELETE_USER_REQUEST,
    DELETE_USER_SUCCESS,
    DELETE_USER_FAIL,
    USER_DETAILS_REQUEST,
    USER_DETAILS_SUCCESS,
    USER_DETAILS_FAIL,
    USER_UPLOAD_RESUME_REQUEST,
    USER_UPLOAD_RESUME_SUCCESS,
    USER_UPLOAD_RESUME_FAIL
} from "../constants/userConstant"

// sign in reducer
export const userReducerSignIn = (state = {}, action) => {
    switch (action.type) {
        case USER_SIGNIN_REQUEST:
            return { loading: true, userInfo: null, isAuthenticated: false }
        case USER_SIGNIN_SUCCESS:
            return {
                loading: false,
                userInfo: action.payload,
                isAuthenticated: true
            }
        case USER_SIGNIN_FAIL:
            return { loading: false, userInfo: null, isAuthenticated: false, error: action.payload }
        case USER_SIGNIN_RESET:
            return {}
        default:
            return state;
    }
}




// sign up reducer
export const userReducerSignUp = (state = {}, action) => {
    switch (action.type) {
        case USER_SIGNUP_REQUEST:
            return { loading: true }
        case USER_SIGNUP_SUCCESS:
            return {
                loading: false,
                userSignUp: action.payload,
            }
        case USER_SIGNUP_FAIL:
            return { loading: false, error: action.payload }
        case USER_SIGNUP_RESET:
            return {}
        default:
            return state;
    }
}

// user profile
export const userReducerProfile = (state = { user: null }, action) => {
    switch (action.type) {
        case USER_LOAD_REQUEST:
            return { loading: true, user: null }
        case USER_LOAD_SUCCESS:
            return {
                loading: false,
                user: action.payload.user,
            }
        case USER_LOAD_FAIL:
            return { loading: false, user: null, error: action.payload }
        case USER_LOAD_RESET:
            return {}
        default:
            return state;
    }
}

// user details reducer
export const userDetailsReducer = (state = { user: {}, loading: false }, action) => {
    switch (action.type) {
        case USER_DETAILS_REQUEST:
            return { loading: true };
        case USER_DETAILS_SUCCESS:
            return { loading: false, user: action.payload };
        case USER_DETAILS_FAIL:
            return { loading: false, error: action.payload };
        default:
            return state;
    }
};

// edit profile
export const userReducerEdit = (state = { user: null, success: false }, action) => {
    switch (action.type) {
        case USER_EDIT_REQUEST:
            return { ...state, loading: true, success: false }; 
        case USER_EDIT_SUCCESS:
            return {
                loading: false,
                user: action.payload.user, 
                success: true, 
            };
        case USER_EDIT_FAIL:
            return {
                loading: false,
                error: action.payload, 
                success: false, // Reset success on failure
            };
        case USER_EDIT_RESET: 
            return { user: null, success: false }; 
        default:
            return state;
    }
};

// log out reducer

export const userReducerLogout = (state = {}, action) => {
    switch (action.type) {
        case USER_LOGOUT_REQUEST:
            return { loading: true };
        case USER_LOGOUT_SUCCESS:
            return {
                loading: false,
                user: null, // Clear user state
            };
        case USER_LOGOUT_FAIL:
            return { loading: false, error: action.payload };
        case USER_LOGOUT_RESET:
            return {}; // Reset the state completely
        default:
            return state;
    }
};


// apply for a job reducer
export const userApplyJobReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_APPLY_JOB_REQUEST:
            return { loading: true }
        case USER_APPLY_JOB_SUCCESS:
            return {
                loading: false,
                userJob: action.payload,
            }
        case USER_APPLY_JOB_FAIL:
            return { loading: false, error: action.payload }
        case USER_APPLY_JOB_RESET:
            return {}
        default:
            return state;
    }
}

// all users reducer
export const allUserReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case ALL_USER_LOAD_REQUEST:
            return { loading: true, users: [] }
        case ALL_USER_LOAD_SUCCESS:
            return {
                loading: false,
                users: action.payload.users,
                // users: action.payload
                
            }
        case ALL_USER_LOAD_FAIL:
            return { loading: false, users: [], error: action.payload }
        case ALL_USER_LOAD_RESET:
            return {}
        default:
            return state;
    }
}

// delete user reducer
export const deleteUserReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_USER_REQUEST:
            return { loading: true };
        case DELETE_USER_SUCCESS:
            return {
                loading: false,
                success: true,
                message: action.payload,
            };
        case DELETE_USER_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state; 
    }
};

// user upload resume reducer
export const userUploadResumeReducer = (state = {}, action) => {
    switch (action.type) {
        case USER_UPLOAD_RESUME_REQUEST:
            return { loading: true };
        case USER_UPLOAD_RESUME_SUCCESS:
            return {
                loading: false,
                success: true,
                message: action.payload.message, 
            };
        case USER_UPLOAD_RESUME_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        default:
            return state; 
    }
};
