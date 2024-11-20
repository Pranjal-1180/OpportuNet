import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { jobTypeLoadAction } from '../../redux/actions/jobTypeAction';
import { registerAjobAction } from '../../redux/actions/jobAction';

const DashCreateJob = () => {
    const dispatch = useDispatch();

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
            alignItems: 'center', 
            justifyContent: 'center', 
            height: '100%', 
            paddingTop: '40px' 
        }}>
            <form onSubmit={handleSubmit} style={{ 
                backgroundColor: '#2C3E50', 
                padding: '20px', 
                borderRadius: '10px', 
                width: '400px', 
                boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.1)' 
            }}>
                <h2 style={{ 
                    textAlign: 'center', 
                    color: '#ECF0F1', 
                    paddingBottom: '20px' 
                }}>
                    Register a Job
                </h2>
                
                {/* Title Input */}
                <input
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Title"
                    style={{
                        width: '100%',
                        padding: '10px',
                        marginBottom: '15px',
                        borderRadius: '5px',
                        border: '1px solid #34495E',
                        backgroundColor: '#ECF0F1',
                        color: '#2C3E50'
                    }}
                />

                {/* Description Input */}
                <textarea
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Description"
                    rows="4"
                    style={{
                        width: '100%',
                        padding: '10px',
                        marginBottom: '15px',
                        borderRadius: '5px',
                        border: '1px solid #34495E',
                        backgroundColor: '#ECF0F1',
                        color: '#2C3E50'
                    }}
                />

                {/* Salary Input */}
                <input
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    placeholder="Salary"
                    style={{
                        width: '100%',
                        padding: '10px',
                        marginBottom: '15px',
                        borderRadius: '5px',
                        border: '1px solid #34495E',
                        backgroundColor: '#ECF0F1',
                        color: '#2C3E50'
                    }}
                />

                {/* Location Input */}
                <input
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Location"
                    style={{
                        width: '100%',
                        padding: '10px',
                        marginBottom: '15px',
                        borderRadius: '5px',
                        border: '1px solid #34495E',
                        backgroundColor: '#ECF0F1',
                        color: '#2C3E50'
                    }}
                />

                {/* Job Type Select */}
                <select
                    name="jobType"
                    value={formData.jobType}
                    onChange={handleChange}
                    style={{
                        width: '100%',
                        padding: '10px',
                        marginBottom: '15px',
                        borderRadius: '5px',
                        border: '1px solid #34495E',
                        backgroundColor: '#ECF0F1',
                        color: '#2C3E50'
                    }}
                >
                    <option value="">Select Category</option>
                    {jobType && jobType.map((jt) => (
                        <option key={jt._id} value={jt._id}>{jt.jobTypeName}</option>
                    ))}
                </select>

                {/* Submit Button */}
                <button type="submit" style={{
                    width: '100%',
                    padding: '10px',
                    borderRadius: '5px',
                    border: 'none',
                    backgroundColor: '#1ABC9C',
                    color: '#FFFFFF',
                    fontWeight: 'bold',
                    cursor: 'pointer'
                }}>
                    Create Job
                </button>
            </form>
        </div>
    );
};

export default DashCreateJob;
