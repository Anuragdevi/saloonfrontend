import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import Axios for making HTTP requests
import { useNavigate } from 'react-router-dom'; // Import useNavigate for navigation

function UpdatePassword() {
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate(); // Initialize navigate function for routing

    useEffect(() => {
        // Parse the URL to extract the reset token
        const urlParams = new URLSearchParams(window.location.search);
        const resetToken = urlParams.get('token'); // Use 'token' instead of 'reset_token'
        
        // Save reset token to local storage
        localStorage.setItem('resetToken', resetToken);
    }, []); // Run only once when the component mounts

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Fetch reset token from local storage
        const resetToken = localStorage.getItem('resetToken');

        // Check if reset token exists
        if (!resetToken) {
            alert('Reset token is required');
            return;
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            alert('Passwords do not match');
            return;
        }

        try {
            // Make a POST request to your backend endpoint to update the password
            const response = await axios.post('http://localhost:5000/reset-password', {
                password: password,
                confirm_password: confirmPassword,
                token: resetToken // Include the reset token in the request
            });

            // Handle success response
            alert(response.data.message);
            navigate('/login'); // Navigate to '/login' route
            console.log(response.data); // You can handle success response here
        } catch (error) {
            // Handle error response
            console.error('Error updating password:', error.response.data);
            alert(error.response.data.message || 'An error occurred while updating the password.');
        }
    };

    return (
        <div>
            <header className='landing1'>
                <div className="lan_context">
                    <div className="content">
                        <div className="containers" id="update">
                            <form id="form" className="form" onSubmit={handleSubmit}>
                                <h2>Update Password</h2>
                                <div className="form-control">
                                    <label htmlFor="password">Password</label>
                                    <input
                                        type="password"
                                        id="password"
                                        placeholder="Enter Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                                <div className="form-control">
                                    <label htmlFor="cpassword">Confirm Password</label>
                                    <input
                                        type="password"
                                        id="cpassword"
                                        placeholder="Enter Confirm password"
                                        value={confirmPassword}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                    />
                                </div>
                                <button type="submit" style={{ fontSize: '20px', letterSpacing: '1px' }}>Update</button>
                            </form>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default UpdatePassword;
