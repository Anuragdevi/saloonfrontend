import React, { useState } from 'react';
import axios from 'axios';
import landing1 from '../images/landing2.jpeg';

function Forgotpassword() {
    const [email, setEmail] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/forgot-password', { email });
            setSuccessMessage(response.data.message);
            setErrorMessage('');
        } catch (error) {
            if (error.response) {
                setErrorMessage(error.response.data.message);
            } else {
                setErrorMessage('An error occurred. Please try again later.');
            }
            setSuccessMessage('');
        }
    };

    return (
        <div>
            <header className='landing1' style={{ backgroundImage: `url(${landing1})` }}>
                <div className="lan_context">
                    <div className="content">
                        <div className="containers" id="forgot">
                            <form id="form" className="form" onSubmit={handleSubmit}>
                                <h2>Forgot Password</h2>
                                <div className="form-control">
                                    <label htmlFor="email">Email</label>
                                    <input 
                                        type="text" 
                                        id="email" 
                                        placeholder="Enter email" 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)} 
                                    />
                                    <small>{errorMessage}</small>
                                </div>
                                <button type="submit">Send Email</button>
                                {successMessage && <p>{successMessage}</p>}
                            </form>
                        </div>
                    </div>
                </div>
            </header>
        </div>
    );
}

export default Forgotpassword;
