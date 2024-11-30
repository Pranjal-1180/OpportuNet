
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userUploadResumeAction, userProfileAction } from '../redux/actions/userAction'; 

const UploadResume = ({ userId }) => {
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        

       
        const success = await dispatch(userUploadResumeAction(userId, file));

        if (success) {
         
            await dispatch(userProfileAction());
            console.log("User profile updated with the new resume");
        }
    };

    return (
        <form onSubmit={handleSubmit} style={{ margin: "20px 0" }}>
            <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} required />
            <button type="submit" style={{ marginLeft: "10px" }}>Upload Resume</button>
        </form>
    );
};

export default UploadResume;

