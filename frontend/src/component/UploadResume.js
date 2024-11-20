import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { userUploadResumeAction } from '../redux/actions/userAction'; // Adjust import based on your file structure

const UploadResume = ({ userId }) => {
    const [file, setFile] = useState(null);
    const dispatch = useDispatch();

    const handleFileChange = (event) => {
        setFile(event.target.files[0]);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        console.log("Uploading resume for userId:", userId);

        // Dispatch the action to upload the resume
        dispatch(userUploadResumeAction(userId, file));
    };

    return (
        <form onSubmit={handleSubmit} style={{ margin: "20px 0" }}>
            <input type="file" accept=".pdf,.doc,.docx" onChange={handleFileChange} required />
            <button type="submit" style={{ marginLeft: "10px" }}>Upload Resume</button>
        </form>
    );
};

export default UploadResume;

