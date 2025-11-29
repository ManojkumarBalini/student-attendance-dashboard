import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Signup from '../components/auth/Signup';
import { signup, checkHealth, testBackend } from '../services/auth';
import './SignupPage.css';

const SignupPage = () => {
    const navigate = useNavigate();
    const [backendStatus, setBackendStatus] = useState('checking');

    useEffect(() => {
        checkBackendHealth();
    }, []);

    const checkBackendHealth = async () => {
        try {
            const health = await checkHealth();
            setBackendStatus('connected');
            console.log('Backend health:', health);
        } catch (error) {
            console.error('Backend health check failed:', error);
            setBackendStatus('disconnected');
        }
    };

    const handleSignup = async (userData) => {
        try {
            const { token, user } = await signup(userData);
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/students');
        } catch (error) {
            const errorMessage = error.response?.data?.message || 
                               error.message || 
                               'Signup failed. Please check your connection.';
            alert(errorMessage);
        }
    };

    return (
        <div className="signup-page">
            <div className="signup-container">
                <div className="signup-card">
                    <h1 className="signup-title">Create Account</h1>
                    <p className="signup-subtitle">Join as a Teacher</p>
                    
                    {backendStatus === 'disconnected' && (
                        <div className="backend-warning">
                            ⚠️ Backend connection issue. Please make sure the server is running.
                        </div>
                    )}
                    
                    <Signup onSignup={handleSignup} />
                    <p className="login-link">
                        Already have an account? <Link to="/">Login here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;