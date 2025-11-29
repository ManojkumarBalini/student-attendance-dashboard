import React from 'react';
import './ChartWrapper.css';

const ChartWrapper = ({ children, title }) => {
    return (
        <div className="chart-wrapper">
            {title && <h3 className="chart-title">{title}</h3>}
            <div className="chart-content">
                {children}
            </div>
        </div>
    );
};

export default ChartWrapper;