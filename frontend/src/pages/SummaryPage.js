import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AttendanceSummary from '../components/dashboard/AttendanceSummary';
import Button from '../components/common/Button';
import Card from '../components/common/Card';
import { getAttendanceSummary, fetchStudents } from '../services/api';
import './SummaryPage.css';

const SummaryPage = () => {
    const [summaryData, setSummaryData] = useState([]);
    const [students, setStudents] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            setLoading(true);
            const [summaryResponse, studentsResponse] = await Promise.all([
                getAttendanceSummary(),
                fetchStudents()
            ]);
            setSummaryData(summaryResponse.data);
            setStudents(studentsResponse.data);
        } catch (error) {
            alert('Error loading summary data');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="summary-page">
                <div className="container">
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Loading summary...</p>
                    </div>
                </div>
            </div>
        );
    }

    const hasStudents = students.length > 0;
    const hasAttendanceData = summaryData.length > 0;

    return (
        <div className="summary-page">
            <div className="container">
                <div className="summary-header">
                    <h1 className="summary-title">Attendance Summary</h1>
                    <div className="summary-actions">
                        <Button onClick={() => navigate('/students')}>
                            Back to Students
                        </Button>
                    </div>
                </div>

                {!hasStudents ? (
                    <Card className="empty-state-card">
                        <div className="empty-state">
                            <h3>No Students Added Yet</h3>
                            <p>Add students to start tracking attendance and view summaries.</p>
                            <Button 
                                variant="primary" 
                                onClick={() => navigate('/students')}
                            >
                                Add Students
                            </Button>
                        </div>
                    </Card>
                ) : !hasAttendanceData ? (
                    <Card className="empty-state-card">
                        <div className="empty-state">
                            <h3>No Attendance Data</h3>
                            <p>Start marking attendance for your students to see summary reports here.</p>
                            <Button 
                                variant="primary" 
                                onClick={() => navigate('/students')}
                            >
                                Mark Attendance
                            </Button>
                        </div>
                    </Card>
                ) : (
                    <div className="summary-content">
                        <div className="summary-stats">
                            <div className="stat-card total-stat">
                                <div className="stat-value">{students.length}</div>
                                <div className="stat-label">Total Students</div>
                            </div>
                            {summaryData.map(stat => (
                                <div key={stat._id} className={`stat-card ${stat._id}-stat`}>
                                    <div className="stat-value">{stat.count}</div>
                                    <div className="stat-label">
                                        {stat._id === 'present' ? 'Present' : 'Absent'}
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="chart-container">
                            <AttendanceSummary data={summaryData} />
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SummaryPage;