import React, { useState } from 'react';
import Button from '../common/Button';

const AttendanceToggle = ({ studentId, onStatusChange }) => {
  const [status, setStatus] = useState('present');

  const handleToggle = () => {
    const newStatus = status === 'present' ? 'absent' : 'present';
    setStatus(newStatus);
    onStatusChange(studentId, newStatus);
  };

  return (
    <Button onClick={handleToggle}>
      {status === 'present' ? 'Mark Absent' : 'Mark Present'}
    </Button>
  );
};

export default AttendanceToggle;