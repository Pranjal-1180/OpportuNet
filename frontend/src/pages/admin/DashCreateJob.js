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

    const { jobType } = useSelector(state => state.jobTypeAll);

    const [formData, setFormData] = React.useState({
        title: '',
        description: '',
        salary: '',
        location: '',
        jobType: ''
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
            jobType: ''
        });
    };

    return (
        <div style={{ 
            display: 'flex', 
            justifyContent: 'center', 
            alignItems: 'center', 
            minHeight: '100vh', 
            backgroundColor: '#edeff0', 
            padding: '20px' 
        }}>
            <div style={{
                width: '100%',
                maxWidth: '900px',
                backgroundColor: theme.palette.mode==="dark"?"black":"white",
                borderRadius: '10px',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                padding: '30px',
            }}>
                <h2 style={{ 
                    textAlign: 'center', 
                    marginBottom: '20px', 
                    fontSize: '24px', 
                    color: theme.palette.mode==="dark"?'white':'#333', 
                    fontWeight: '600' 
                }}>
                    Create a New Job Listing
                </h2>
                <form onSubmit={handleSubmit}>
                    {/* Title Input */}
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ fontWeight: '600', color: theme.palette.mode==="dark"?'white':'#555', marginBottom: '5px', display: 'block' }}>Job Title</label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleChange}
                            placeholder="Enter job title"
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '5px',
                                border: '1px solid #ddd',
                                fontSize: '16px'
                            }}
                        />
                    </div>

                    {/* Description Input */}
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ fontWeight: '600', color: theme.palette.mode==="dark"?'white':'#555', marginBottom: '5px', display: 'block' }}>Description</label>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleChange}
                            placeholder="Enter job description"
                            rows="5"
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '5px',
                                border: '1px solid #ddd',
                                fontSize: '16px',
                                resize: 'none'
                            }}
                        />
                    </div>

                    {/* Salary Input */}
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ fontWeight: '600', color: theme.palette.mode==="dark"?'white':'#555', marginBottom: '5px', display: 'block' }}>Salary</label>
                        <input
                            type="text"
                            name="salary"
                            value={formData.salary}
                            onChange={handleChange}
                            placeholder="Enter salary"
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '5px',
                                border: '1px solid #ddd',
                                fontSize: '16px'
                            }}
                        />
                    </div>

                    {/* Location Input */}
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ fontWeight: '600', color:theme.palette.mode==="dark"?'white': '#555', marginBottom: '5px', display: 'block' }}>Location</label>
                        <input
                            type="text"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            placeholder="Enter job location"
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '5px',
                                border: '1px solid #ddd',
                                fontSize: '16px'
                            }}
                        />
                    </div>

                    {/* Job Type Select */}
                    <div style={{ marginBottom: '20px' }}>
                        <label style={{ fontWeight: '600', color: theme.palette.mode==="dark"?'white':'#555', marginBottom: '5px', display: 'block' }}>Job Category</label>
                        <select
                            name="jobType"
                            value={formData.jobType}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '12px',
                                borderRadius: '5px',
                                border: '1px solid #ddd',
                                fontSize: '16px',
                                backgroundColor: '#fff'
                            }}
                        >
                            <option value="">Select a category</option>
                            {jobType && jobType.map((jt) => (
                                <option key={jt._id} value={jt._id}>{jt.jobTypeName}</option>
                            ))}
                        </select>
                    </div>

                    {/* Submit Button */}
                    <button type="submit" style={{
                        width: '100%',
                        padding: '15px',
                        borderRadius: '5px',
                        border: 'none',
                        backgroundColor: '#007BFF',
                        color: '#FFFFFF',
                        fontWeight: '600',
                        fontSize: '16px',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease'
                    }}
                    onMouseEnter={(e) => e.target.style.backgroundColor = '#0056b3'}
                    onMouseLeave={(e) => e.target.style.backgroundColor = '#007BFF'}
                    >
                        Create Job
                    </button>
                </form>
            </div>
        </div>
    );
};

export default DashCreateJob;

