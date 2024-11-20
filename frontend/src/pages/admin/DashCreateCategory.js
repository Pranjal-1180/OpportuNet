import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createJobTypeAction } from '../../redux/actions/jobTypeAction';

const DashCreateCategory = () => {
    const { user } = useSelector(state => state.userProfile);
    const dispatch = useDispatch();

    const [jobTypeName, setJobTypeName] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        // Basic validation
        if (!jobTypeName) {
            setError('Category is required');
            return;
        }

        setError('');
        const formData = {
            user: user && user._id,
            jobTypeName
        };

        dispatch(createJobTypeAction(formData));
        setJobTypeName(''); // Reset form field
    };

    return (
        <div style={{ height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '16px' }}>
            <form onSubmit={handleSubmit} className='form_style border-style' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}>
                <h2 style={{ paddingBottom: '24px' }}>Create a Category</h2>
                <input
                    style={{ marginBottom: '24px', padding: '8px', width: '100%' }}
                    type="text"
                    placeholder="Category name"
                    value={jobTypeName}
                    onChange={(e) => setJobTypeName(e.target.value)}
                />
                {error && <div style={{ color: 'red', marginBottom: '16px' }}>{error}</div>}
                <button style={{ padding: '12px', width: '100%' }} type="submit">Create category</button>
            </form>
        </div>
    );
};

export default DashCreateCategory;
