import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import './Login.css';

const Login = ({ onLogin }) => {
    const [credentials, setCredentials] = useState({ email: '', password: '' });

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(credentials);
    };

    return (
        <form onSubmit={handleSubmit} className="login-form">
            <Input
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
                required
            />
            <Input
                label="Password"
                type="password"
                placeholder="Enter your password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
                required
            />
            <Button type="submit" variant="primary" className="submit-btn">
                Login
            </Button>
        </form>
    );
};

export default Login;