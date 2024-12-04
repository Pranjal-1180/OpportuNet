import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useNavigate } from 'react-router-dom';
import { userProfileAction, userEditAction } from '../../redux/actions/userAction';
import { toast } from 'react-toastify';
import { useTheme } from "@mui/material/styles";
const EditUserProfileForm = () => {
    const { id } = useParams(); // Get the dynamic ID from the URL
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const theme = useTheme();
    const { user } = useSelector(state => state.userProfile);
    const { loading, error, success } = useSelector(state => state.editUser);

    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        education: '',
        percentage: '',
        address: '',
        phone: ''
    });

    useEffect(() => {
        if (id) {
            dispatch(userProfileAction(id));
        }
    }, [dispatch, id]);

    useEffect(() => {
        if (user) {
            setFormData({
                firstName: user.firstName || '',
                lastName: user.lastName || '',
                email: user.email || '',
                education: user.education || '',
                percentage: user.percentage || '',
                address: user.address || '',
                phone: user.phone || ''
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(userEditAction(id, formData));
    };

    useEffect(() => {
        if (success) {
            toast.success('Profile updated successfully!');
            navigate(`/user/info`);
        }
        if (error) {
            toast.error(error);
        }
    }, [success, error, navigate]);

    return (
        <div style={{marginLeft:"0px",backgroundColor: theme.palette.mode==="dark"?"#3C3D37":'#edeff0'}}>
        <h3
                style={{
                    
                    fontWeight: '600',
                    color: '#2196f3',
                    marginBottom: '10px',
                    textAlign: 'left',
                    marginTop:'10px',
                    marginLeft:"0px"
                }}
            >
                Edit Profile
            </h3>
        <form
            onSubmit={handleSubmit}
            style={{
                maxWidth: '850px',
                margin: '30px auto',
                padding: '30px',
                backgroundColor: theme.palette.mode==="dark"?"black":'#ffffff',
                borderRadius: '12px',
                boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
                fontFamily: "'Arial', sans-serif"
            }}
        >
            

            {[
                { label: 'First Name', name: 'firstName', type: 'text' },
                { label: 'Last Name', name: 'lastName', type: 'text' },
                { label: 'Email', name: 'email', type: 'email' },
                { label: 'Education', name: 'education', type: 'text' },
                { label: 'Percentage', name: 'percentage', type: 'text' },
                { label: 'Address', name: 'address', type: 'text' },
                { label: 'Phone no', name: 'phone', type: 'number' }
            ].map(({ label, name, type }, index) => (
                <div
                    key={index}
                    style={{
                        marginBottom: '13px'
                    }}
                >
                    <label
                        style={{
                            display: 'block',
                            fontWeight: '500',
                            marginBottom: '8px',
                            color:theme.palette.mode==="dark"?"white": '#555'
                        }}
                    >
                        {label}:
                    </label>
                    <input
                        type={type}
                        name={name}
                        value={formData[name]}
                        onChange={handleChange}
                        required={name === 'firstName' || name === 'lastName' || name === 'email'}
                        style={{
                            width: '100%',
                            padding: '8px',
                            border: '1px solid #ddd',
                            borderRadius: '6px',
                            fontSize: '12px',
                            color: '#333',
                            outline: 'none',
                            transition: 'border-color 0.3s ease',
                            boxSizing: 'border-box'
                        }}
                        onFocus={(e) => (e.target.style.borderColor = '#2196f3')}
                        onBlur={(e) => (e.target.style.borderColor = '#ddd')}
                    />
                </div>
            ))}

            <button
                type="submit"
                style={{
                    display: 'block',
                    width: '100%',
                    padding: '10px 20px',
                    backgroundColor: '#2196f3',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    fontWeight: '500',
                    fontSize: '14px',
                    cursor: 'pointer',
                    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
                    transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                    e.target.style.backgroundColor = '#1976d2';
                    e.target.style.transform = 'translateY(-2px)';
                }}
                onMouseLeave={(e) => {
                    e.target.style.backgroundColor = '#2196f3';
                    e.target.style.transform = 'translateY(0)';
                }}
            >
                {loading ? 'Updating...' : 'Update Profile'}
            </button>
        </form>
        </div>
    );
};

export default EditUserProfileForm;

