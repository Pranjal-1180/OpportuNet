import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { jobTypeUpdateAction } from '../../redux/actions/jobTypeAction';

const DashEditCategory = () => {
    const [jobTypeName, setJobTypeName] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { id } = useParams();

    // Select the update state from Redux
    const updateJobType = useSelector((state) => state.updateJobType);
    const { loading, error } = updateJobType;

    // Get userInfo from Redux state
    const { signIn: { userInfo } } = useSelector(state => state);

    // Log the userInfo here
    console.log('User Info:', userInfo); // Log userInfo structure

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('User Info:', userInfo); // Log userInfo structure
        await dispatch(jobTypeUpdateAction(id, jobTypeName));
        navigate('/admin/category'); // Navigate only after dispatching the action
    };

    useEffect(() => {
        if (error) {
            console.error('Error updating job type:', error);
        }
    }, [error]);

    return (
        <div>
            <h2>Edit Job Category</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Category Name:
                    <input
                        type="text"
                        value={jobTypeName}
                        onChange={(e) => setJobTypeName(e.target.value)}
                    />
                </label>
                <button type="submit">Update</button>
                {loading && <p>Loading...</p>}
                {error && <p style={{ color: 'red' }}>{error}</p>}
            </form>
        </div>
    );
};

export default DashEditCategory;

