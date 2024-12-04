import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { jobTypeLoadAction } from '../../redux/actions/jobTypeAction';
import { registerAjobAction } from '../../redux/actions/jobAction';
import { useTheme } from "@mui/material/styles";

const DashCreateJob = () => {
    const dispatch = useDispatch();
    const theme = useTheme();

    // Load job types on mount
    useEffect(() => {
        dispatch(jobTypeLoadAction());
    }, [dispatch]);

    const { jobType } = useSelector((state) => state.jobTypeAll);

    const [formData, setFormData] = React.useState({
        title: '',
        description: '',
        salary: '',
        location: '',
        jobType: '',
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(registerAjobAction(formData));
        setFormData({
            title: '',
            description: '',
            salary: '',
            location: '',
            jobType: '',
        });
    };

    // Shared styles
    const containerStyle = {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#edeff0',
        padding: '20px',
    };

    const formContainerStyle = {
        width: '100%',
        maxWidth: '900px',
        backgroundColor: theme.palette.mode === "dark" ? "black" : "white",
        borderRadius: '10px',
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
        padding: '30px',
    };

    const labelStyle = {
        fontWeight: '600',
        color: theme.palette.mode === "dark" ? "white" : "#555",
        marginBottom: '5px',
        display: 'block',
    };

    const inputStyle = {
        width: '100%',
        padding: '10px',
        borderRadius: '5px',
        border: '1px solid #ddd',
        fontSize: '14px',
    };

    const buttonStyle = {
        width: '100%',
        padding: '12px',
        borderRadius: '5px',
        border: 'none',
        backgroundColor: '#007BFF',
        color: '#FFFFFF',
        fontWeight: '500',
        fontSize: '14px',
        cursor: 'pointer',
        transition: 'background-color 0.3s ease',
    };

    return (
        <div style={containerStyle}>
            <div style={formContainerStyle}>
                <h3
                    style={{
                        textAlign: 'center',
                        marginBottom: '20px',
                        color: theme.palette.mode === "dark" ? 'white' : '#333',
                        fontWeight: '600',
                    }}
                >
                    Create a New Job Post
                </h3>
                <form onSubmit={handleSubmit}>
                    {/* Title Input */}
                    <div style={{ marginBottom: '18px' }}>
                        <label style={labelStyle}>Job Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter job title"
                            style={inputStyle}
                        />
                    </div>

                    {/* Description Input */}
                    <div style={{ marginBottom: '18px' }}>
                        <label style={labelStyle}>Description</label>
                        <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Enter job description" rows="5" style={{ ...inputStyle, resize: 'none' }}/>
                    </div>

                    {/* Salary Input */}
                    <div style={{ marginBottom: '18px' }}>
                        <label style={labelStyle}>Salary</label>
                        <input
                            type="text"
                            name="salary"
                            value={formData.salary}
                            onChange={handleChange}
                            placeholder="Enter salary"
                            style={inputStyle}
                        />
                    </div>

                    {/* Location Input */}
                    <div style={{ marginBottom: '18px' }}>
                        <label style={labelStyle}>Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Enter job location"
                            style={inputStyle}
                        />
                    </div>

                    {/* Job Type Select */}
                    <div style={{ marginBottom: '18px' }}>
                        <label style={labelStyle}>Job Category</label>
                        <select
                            name="jobType"
                            value={formData.jobType}
                            onChange={handleChange}
                            style={{ ...inputStyle, backgroundColor: '#fff' }}
                        >
                            <option value="">Select a category</option>
                            {jobType &&
                                jobType.map((jt) => (
                                    <option key={jt._id} value={jt._id}>
                                        {jt.jobTypeName}
                                    </option>
                                ))}
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        style={buttonStyle}
                        onMouseEnter={(e) =>
                            (e.target.style.backgroundColor = '#0056b3')
                        }
                        onMouseLeave={(e) =>
                            (e.target.style.backgroundColor = '#007BFF')
                        }
                    >
                        Create Job
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DashCreateJob;

