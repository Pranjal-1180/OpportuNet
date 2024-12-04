

import { useState,useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createJobTypeAction } from '../../redux/actions/jobTypeAction';
import { useNavigate } from 'react-router-dom';
import { useTheme } from "@mui/material/styles";
const DashCreateCategory = () => {
    const { user } = useSelector((state) => state.userProfile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [jobTypeName, setJobTypeName] = useState('');
    const [error, setError] = useState('');
    const theme = useTheme();
    // Get success status from the createJobTypeReducer
    const { success, loading } = useSelector((state) => state.createJobType);

    useEffect(() => {
        console.log(success);
        if (success) {
            navigate('/admin/category'); // Navigate to DashCategory after success
        }
    }, [success, navigate]);

    const handleSubmit = (event) => {
        event.preventDefault();

        // Basic validation
        if (!jobTypeName) {
            setError('Category name is required');
            return;
        }

        setError('');
        const formData = {
            user: user && user._id,
            jobTypeName,
        };

        dispatch(createJobTypeAction(formData));
        setJobTypeName(''); // Reset form field
    };

    const styles = {
        container: {
            height: '100%',
            display: 'flex',
            flexDirection: "column",
            alignItems: 'center',
            justifyContent: 'flex-start',
            padding: '16px',
            backgroundColor: theme.palette.mode === "dark" ? "black" : "#edeff0",
            minHeight: "100vh",
        },
        form: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            maxWidth: '400px',
            backgroundColor: '#ffffff',
            borderRadius: '12px',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            padding: '24px',
            marginTop:'30px'
        },
        heading: {
            paddingBottom: '15px',
            fontSize: '1.3rem',
            fontWeight: 'bold',
            color: '#333333',
        },
        input: {
            marginBottom: '16px',
            padding: '12px',
            width: '100%',
            borderRadius: '8px',
            border: '1px solid #ddd',
            fontSize: '0.8rem',
            transition: 'border-color 0.3s',
        },
        inputFocus: {
            borderColor: '#7E60BF',
        },
        error: {
            color: '#E74C3C',
            marginBottom: '16px',
            fontSize: '0.9rem',
        },
        button: {
            padding: '12px',
            width: '100%',
            borderRadius: '8px',
            backgroundColor: '#127ce6',
            color: '#ffffff',
            fontSize: '0.8rem',
            fontWeight: 'bold',
            border: 'none',
            cursor: 'pointer',
            transition: 'background-color 0.3s',
        },
        buttonHover: {
            backgroundColor: '#5E429B',
        },
    };

    return (
        <div style={styles.container}>
            <form
                onSubmit={handleSubmit}
                className="form_style border-style"
                style={styles.form}
            >
                <h1 style={styles.heading}>Create a Category</h1>
                <input
                    style={{
                        ...styles.input,
                    }}
                    type="text"
                    placeholder="Enter category name"
                    value={jobTypeName}
                    onChange={(e) => setJobTypeName(e.target.value)}
                />
                {error && <div style={styles.error}>{error}</div>}
                <button
                    style={styles.button}
                    type="submit"
                    onMouseEnter={(e) => (e.target.style.backgroundColor = styles.buttonHover.backgroundColor)}
                    onMouseLeave={(e) => (e.target.style.backgroundColor = styles.button.backgroundColor)}
                >
                    Create Category
                </button>
            </form>
        </div>
    );
};

export default DashCreateCategory;

