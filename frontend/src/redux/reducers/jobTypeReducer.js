import { JOB_TYPE_LOAD_FAIL, JOB_TYPE_LOAD_REQUEST, JOB_TYPE_LOAD_RESET, JOB_TYPE_LOAD_SUCCESS, JOB_TYPE_UPDATE_REQUEST, JOB_TYPE_UPDATE_SUCCESS, JOB_TYPE_UPDATE_FAIL, JOB_TYPE_UPDATE_RESET, CREATE_JOB_TYPE_FAIL,
    CREATE_JOB_TYPE_REQUEST,
    CREATE_JOB_TYPE_RESET,
    CREATE_JOB_TYPE_SUCCESS, DELETE_JOB_TYPE_REQUEST,
    DELETE_JOB_TYPE_SUCCESS,
    DELETE_JOB_TYPE_FAIL,
    DELETE_JOB_TYPE_RESET } from "../constants/jobTypeConstant"


export const loadJobTypeReducer = (state = { jobType: [] }, action) => {
    switch (action.type) {
        case JOB_TYPE_LOAD_REQUEST:
            return { loading: true };
        case JOB_TYPE_LOAD_SUCCESS:
            return {
                loading: false,
                jobType: action.payload.jobT,
            };
        case JOB_TYPE_LOAD_FAIL:
            return {
                loading: false,
                error: action.payload,
            };
        case JOB_TYPE_LOAD_RESET:
            return {};
        case DELETE_JOB_TYPE_SUCCESS: // Handle delete success here
            return {
                ...state,
                jobType: state.jobType.filter((item) => item._id !== action.payload),
            };
        default:
            return state;
    }
};



export const updateJobTypeReducer = (state = {}, action) => {
    switch (action.type) {
        case JOB_TYPE_UPDATE_REQUEST:
            return { loading: true }
        case JOB_TYPE_UPDATE_SUCCESS:
            return {
                loading: false,
                jobType: action.payload.jobT
            }
        case JOB_TYPE_UPDATE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case JOB_TYPE_UPDATE_RESET:
            return {}
        default:
            return state;
    }
}

// create job type reducer
export const createJobTypeReducer = (state = {}, action) => {
    switch (action.type) {
        case CREATE_JOB_TYPE_REQUEST:
            return { loading: true }
        case CREATE_JOB_TYPE_SUCCESS:
            return {
                loading: false,
                success: true,
                jobType: action.payload,
            }
        case CREATE_JOB_TYPE_FAIL:
            return { loading: false, error: action.payload }
        case CREATE_JOB_TYPE_RESET:
            return {}
        default:
            return state;
    }

}

// delete category by id
export const deleteJobTypeReducer = (state = {}, action) => {
    switch (action.type) {
        case DELETE_JOB_TYPE_REQUEST:
            return { loading: true }
        case DELETE_JOB_TYPE_SUCCESS:
            return {
                loading: false,
                success: action.payload.success,
                message: action.payload.message
            }
        case DELETE_JOB_TYPE_FAIL:
            return {
                loading: false,
                error: action.payload
            }
        case DELETE_JOB_TYPE_RESET:
            return {}
        default:
            return state;
    }
  }