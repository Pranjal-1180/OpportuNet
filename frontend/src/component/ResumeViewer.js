import React from 'react';

const ResumeViewer = ({ resumePath, onClose }) => {
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 1000 }}>
            <div style={{ width: '80%', margin: '50px auto', backgroundColor: 'white', padding: '20px', borderRadius: '10px' }}>
                <h2>Resume Viewer</h2>
                <iframe
                    src={`${resumePath}`} // Link to the resume
                    style={{ width: '100%', height: '500px' }}
                    title="Resume"
                />
                <button onClick={onClose} style={{ marginTop: '20px' }}>Close</button>
            </div>
        </div>
    );
};

export default ResumeViewer;
