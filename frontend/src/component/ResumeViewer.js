import React from 'react';

const ResumeViewer = ({ resumePath, onClose }) => {
    console.log("Resume Path in Viewer:", resumePath); 
    return (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.7)', zIndex: 3000 }}>
            <div style={{ width: '80%', margin: '30px auto', backgroundColor: 'white',  borderRadius: '10px',padding:'8px' }}>
                <h3>Resume View</h3>
               
                <iframe
                    src={`${resumePath}`} // Link to the resume
                    style={{ width: '100%', height: '400px' }}
                    title="Resume"
                />
                <button onClick={onClose} style={{ marginTop: '10px',height:"35px",width:"70px" ,fontSize:"15px"}}>Close</button>
            </div>
        </div>
    );
};
export default ResumeViewer;
