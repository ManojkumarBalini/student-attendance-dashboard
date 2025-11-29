import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StudentList from '../components/students/StudentList';
import AddStudentForm from '../components/students/AddStudentForm';
import Button from '../components/common/Button';
import { fetchStudents, createStudent } from '../services/api';
import './StudentListPage.css';

const StudentListPage = () => {
    const [students, setStudents] = useState([]);
    const [showAddForm, setShowAddForm] = useState(false);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        loadStudents();
    }, []);

    const loadStudents = async () => {
        try {
            setLoading(true);
            const response = await fetchStudents();
            console.log('Students loaded:', response.data);
            setStudents(response.data);
        } catch (error) {
            console.error('Error loading students:', error);
            alert('Error loading students: ' + (error.response?.data?.message || error.message));
        } finally {
            setLoading(false);
        }
    };

    const handleAddStudent = async (studentData) => {
        try {
            console.log('Adding student:', studentData);
            const response = await createStudent(studentData);
            console.log('Student added successfully:', response.data);
            setStudents(prev => [...prev, response.data]);
            setShowAddForm(false);
            alert('Student added successfully!');
        } catch (error) {
            console.error('Error adding student:', error);
            const errorMessage = error.response?.data?.message || 
                               error.message || 
                               'Failed to add student. Please check your connection.';
            alert('Error: ' + errorMessage);
            throw new Error(errorMessage);
        }
    };

    const handleAttendanceChange = async (studentId, status) => {
        try {
            console.log(`Marked student ${studentId} as ${status}`);
            // TODO: Implement actual attendance submission
            alert(`Attendance marked: Student ${studentId} is ${status}`);
        } catch (error) {
            console.error('Error submitting attendance:', error);
            alert('Error submitting attendance');
        }
    };

    if (loading) {
        return (
            <div className="student-list-page">
                <div className="container">
                    <div className="loading-state">
                        <div className="spinner"></div>
                        <p>Loading students...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="student-list-page">
            <div className="container">
                <div className="page-actions">
                    <h1 className="page-title">My Students</h1>
                    <div className="action-buttons">
                        {students.length > 0 && (
                            <Button 
                                variant="secondary" 
                                onClick={() => navigate('/summary')}
                            >
                                View Summary
                            </Button>
                        )}
                        <Button 
                            variant="primary" 
                            onClick={() => setShowAddForm(true)}
                        >
                            Add Student
                        </Button>
                    </div>
                </div>

                <StudentList
                    students={students}
                    onAttendanceChange={handleAttendanceChange}
                />

                {showAddForm && (
                    <AddStudentForm
                        onStudentAdded={handleAddStudent}
                        onCancel={() => setShowAddForm(false)}
                    />
                )}
            </div>
        </div>
    );
};

export default StudentListPage;