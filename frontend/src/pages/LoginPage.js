import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import Login from '../components/auth/Login';
import { login } from '../services/auth';
import './LoginPage.css';

const LoginPage = () => {
    const navigate = useNavigate();

    const handleLogin = async (credentials) => {
        try {
            const { token, user } = await login(credentials);
            localStorage.setItem('token', token);
            localStorage.setItem('user', JSON.stringify(user));
            navigate('/students');
        } catch (error) {
            alert(error.response?.data?.message || 'Login failed');
        }
    };

    return (
        <div className="login-page">
            <div className="login-container">
                <div className="login-card">
                    <h1 className="login-title">Student Attendance</h1>
                    <p className="login-subtitle">Teacher Login</p>
                    <Login onLogin={handleLogin} />
                    <p className="signup-link">
                        Don't have an account? <Link to="/signup">Sign up here</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;