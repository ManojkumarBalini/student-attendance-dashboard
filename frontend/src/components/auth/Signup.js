import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import './Signup.css';

const Signup = ({ onSignup }) => {
    const [userData, setUserData] = useState({ 
        name: '', 
        email: '', 
        password: '', 
        confirmPassword: '' 
    });
    const [errors, setErrors] = useState({});

    const validateForm = () => {
        const newErrors = {};
        
        if (!userData.name.trim()) {
            newErrors.name = 'Name is required';
        }
        
        if (!userData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(userData.email)) {
            newErrors.email = 'Email is invalid';
        }
        
        if (!userData.password) {
            newErrors.password = 'Password is required';
        } else if (userData.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters';
        }
        
        if (userData.password !== userData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            const { confirmPassword, ...submitData } = userData;
            onSignup(submitData);
        }
    };

    const handleChange = (field, value) => {
        setUserData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => ({ ...prev, [field]: '' }));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="signup-form">
            <Input
                label="Full Name"
                type="text"
                placeholder="Enter your full name"
                value={userData.name}
                onChange={(e) => handleChange('name', e.target.value)}
                error={errors.name}
                required
            />
            <Input
                label="Email Address"
                type="email"
                placeholder="Enter your email"
                value={userData.email}
                onChange={(e) => handleChange('email', e.target.value)}
                error={errors.email}
                required
            />
            <Input
                label="Password"
                type="password"
                placeholder="Create a password"
                value={userData.password}
                onChange={(e) => handleChange('password', e.target.value)}
                error={errors.password}
                required
            />
            <Input
                label="Confirm Password"
                type="password"
                placeholder="Confirm your password"
                value={userData.confirmPassword}
                onChange={(e) => handleChange('confirmPassword', e.target.value)}
                error={errors.confirmPassword}
                required
            />
            <Button type="submit" variant="primary" className="submit-btn">
                Create Account
            </Button>
        </form>
    );
};

export default Signup;