import React from 'react';
import './Input.css';

const Input = ({ label, type = 'text', value, onChange, placeholder, required, error, ...props }) => {
    return (
        <div className="input-group">
            <label className="input-label">
                {label}
                {required && <span className="required">*</span>}
            </label>
            <input
                type={type}
                value={value}
                onChange={onChange}
                placeholder={placeholder}
                className={`input-field ${error ? 'error' : ''}`}
                required={required}
                {...props}
            />
            {error && <span className="error-message">{error}</span>}
        </div>
    );
};

export default Input;