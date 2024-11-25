

import React from 'react';
import { useSelector } from 'react-redux';
import CardElement from '../../component/CardElement';

const UserJobsHistory = () => {
    const { user } = useSelector(state => state.userProfile);
    
    // Debugging: Log user data
    console.log(user);

    return (
        <div style={{ padding: '20px' }}>
            <h2 style={{ color: "#2196f3" }}>Jobs History</h2>
            <div>
                {
                    user && user.jobsHistory && user.jobsHistory.length > 0 ? (
                        user.jobsHistory.map((history) => (
                            <CardElement
                                key={history._id} // Use unique job ID
                                id={history.job}
                                jobTitle={history.title}
                                description={history.description}
                                location={history.location}
                                applied={true}
                                fromUserJobsHistory={true}
                            />
                        ))
                    ) : (
                        <p style={{ color: "#2196f3" }}>No jobs history available.</p>
                    )
                }
            </div>
        </div>
    );
}

export default UserJobsHistory;
