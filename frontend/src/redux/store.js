import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import { loadJobReducer,loadJobSingleReducer,registerAjobReducer, deleteJobReducer, updateJobReducer } from './reducers/jobReducer';
import {
    createJobTypeReducer,
    loadJobTypeReducer,
    // jobTypeSingleReducer,
    updateJobTypeReducer,
    deleteJobTypeReducer
} from './reducers/jobTypeReducer';

import {allUserReducer, userReducerSignIn, userReducerSignUp,userReducerLogout,userReducerProfile, userApplyJobReducer, userReducerEdit, deleteUserReducer, userDetailsReducer,userUploadResumeReducer } from './reducers/userReducer';
import { modeReducer } from './reducers/themeModeReducer';
import {chatReducer} from './reducers/chatReducer';
//combine reducers
const reducer = combineReducers({
    loadJobs: loadJobReducer,
    jobTypeAll: loadJobTypeReducer,
    updateJobType: updateJobTypeReducer,
    signIn: userReducerSignIn,
    logOut: userReducerLogout,
    userProfile: userReducerProfile,
    singleJob: loadJobSingleReducer,
    userJobApplication: userApplyJobReducer,
    allUsers: allUserReducer,
    mode: modeReducer,
    signUp: userReducerSignUp,
    editUser:userReducerEdit,
    deleteUser:deleteUserReducer,
    deleteJob: deleteJobReducer,
    updateJob: updateJobReducer,
    createJobType: createJobTypeReducer,
    deleteJobType:deleteJobTypeReducer,
    adminUserDetail:userDetailsReducer,
    uploadResume:userUploadResumeReducer,
    chat:chatReducer
    
});


//initial state
let initialState = {signIn: {
    userInfo: localStorage.getItem('userInfo') ? JSON.parse(localStorage.getItem('userInfo')) : null
},
mode: {
    mode: "light"
}};
const middleware = [thunk];
const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))


export default store;
