import React from 'react';
import AttendanceToggle from './AttendanceToggle';
import './StudentList.css';

const StudentList = ({ students, onAttendanceChange }) => {
    if (students.length === 0) {
        return (
            <div className="empty-state">
                <div className="empty-state-icon">👨‍🎓</div>
                <h3>No Students Yet</h3>
                <p>Add your first student to start tracking attendance</p>
            </div>
        );
    }

    return (
        <div className="student-list">
            {students.map(student => (
                <div key={student._id} className="student-item">
                    <div className="student-info">
                        <div className="student-avatar">
                            {student.name.charAt(0).toUpperCase()}
                        </div>
                        <div className="student-details">
                            <div className="student-name">{student.name}</div>
                            <div className="student-class">Class: {student.class}</div>
                        </div>
                    </div>
                    <AttendanceToggle
                        studentId={student._id}
                        onStatusChange={onAttendanceChange}
                    />
                </div>
            ))}
        </div>
    );
};

export default StudentList;