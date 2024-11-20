import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { userProfileAction, userEditAction } from '../../redux/actions/userAction';
import { toast } from 'react-toastify';

const EditUserProfileForm = () => {
    const { id } = useParams(); // Get the dynamic ID from the URL
    const dispatch = useDispatch();
    const navigate = useNavigate();
    
    // Fetching user data
    const { user } = useSelector(state => state.userProfile);
    
    // Fetching the edit user state (including success state)
    const { loading, error, success } = useSelector(state => state.editUser); 
    
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        education: '',
        percentage: '',
        address: '',
    });

    // Fetch user profile based on ID when component loads
    useEffect(() => {
        if (id) {
            dispatch(userProfileAction(id));
        }
    }, [dispatch, id]);

    // Update form fields when user data is loaded
    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                education: user.education || '',
                percentage: user.percentage || '',
                address: user.address || '',
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(userEditAction(id, formData)); // Dispatch the action to edit the user
    };

    // Handle success/failure cases after submission
    useEffect(() => {
        if (success) {
            console.log("Edit success");
            toast.success('Profile updated successfully!');
            navigate(`/user/info`);
        }
        if (error) {
            console.log("Edit failed with error:", error);
            toast.error(error);
        }
    }, [success, error, navigate]);

    return (
        <form onSubmit={handleSubmit} style={{ padding: '20px', maxWidth: '400px', margin: 'auto' }}>
            <h2>Edit Profile</h2>
            <div>
                <label>First Name:</label>
                <input 
                    type="text" 
                    name="firstName" 
                    value={formData.firstName} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <div>
                <label>Last Name:</label>
                <input 
                    type="text" 
                    name="lastName" 
                    value={formData.lastName} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <div>
                <label>Email:</label>
                <input 
                    type="email" 
                    name="email" 
                    value={formData.email} 
                    onChange={handleChange} 
                    required 
                />
            </div>
            <div>
                <label>Education:</label>
                <input 
                    type="text" 
                    name="education" 
                    value={formData.education} 
                    onChange={handleChange} 
                />
            </div>
            <div>
                <label>Percentage:</label>
                <input 
                    type="text" 
                    name="percentage" 
                    value={formData.percentage} 
                    onChange={handleChange} 
                />
            </div>
            <div>
                <label>Address:</label>
                <input 
                    type="text" 
                    name="address" 
                    value={formData.address} 
                    onChange={handleChange} 
                />
            </div>
            <div>
                <label>Phone no:</label>
                <input 
                    type="number" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                />
            </div>
            <button type="submit" style={{ marginTop: '10px' }}>
                {loading ? 'Updating...' : 'Update Profile'}
            </button>
        </form>
    );
};

export default EditUserProfileForm;
