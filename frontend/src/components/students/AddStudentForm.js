import React, { useState } from 'react';
import Input from '../common/Input';
import Button from '../common/Button';
import './AddStudentForm.css';

const AddStudentForm = ({ onStudentAdded, onCancel }) => {
    const [studentData, setStudentData] = useState({ name: '', class: '' });
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!studentData.name.trim() || !studentData.class.trim()) return;

        setIsSubmitting(true);
        try {
            await onStudentAdded(studentData);
            setStudentData({ name: '', class: '' });
        } catch (error) {
            alert('Failed to add student');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="add-student-form-container">
            <div className="add-student-form">
                <h3>Add New Student</h3>
                <form onSubmit={handleSubmit}>
                    <Input
                        label="Student Name"
                        type="text"
                        placeholder="Enter student name"
                        value={studentData.name}
                        onChange={(e) => setStudentData({ ...studentData, name: e.target.value })}
                        required
                    />
                    <Input
                        label="Class"
                        type="text"
                        placeholder="Enter class (e.g., Grade 5A)"
                        value={studentData.class}
                        onChange={(e) => setStudentData({ ...studentData, class: e.target.value })}
                        required
                    />
                    <div className="form-actions">
                        <Button 
                            type="button" 
                            variant="danger" 
                            onClick={onCancel}
                            disabled={isSubmitting}
                        >
                            Cancel
                        </Button>
                        <Button 
                            type="submit" 
                            variant="primary"
                            disabled={isSubmitting || !studentData.name.trim() || !studentData.class.trim()}
                        >
                            {isSubmitting ? 'Adding...' : 'Add Student'}
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddStudentForm;