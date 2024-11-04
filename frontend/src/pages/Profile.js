import React, { useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import commonContext from '../contexts/common/commonContext';

const Profile = () => {
    const { user } = useContext(commonContext); // Extract user from context
    const navigate = useNavigate(); // Initialize useNavigate

    // Check if user exists and navigate accordingly
    useEffect(() => {
        if (!user) {
            navigate('/'); // Redirect to homepage if user is not logged in
        }
    }, [user, navigate]); // Dependencies include user and navigate

    // Return null or a loading indicator while checking the user
    if (!user) {
        { console.log(user)}
        return <p>Loading...</p>; // Show loading indicator while checking the user
    }

    return (
        <section id="profile_page" className="section">
            <div className="container">
                <h1>Welcome, {user.user.username}</h1>
                <p>Email: {user.user.email}</p>
                {/* You can add more user information here */}
            </div>
        </section>
    );
};

export default Profile;
