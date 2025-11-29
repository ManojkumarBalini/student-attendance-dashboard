import axios from 'axios';

const API = axios.create({ baseURL: process.env.REACT_APP_API_URL });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export const fetchStudents = () => API.get('/api/students');
export const createStudent = (studentData) => API.post('/api/students', studentData);
export const submitAttendance = (data) => API.post('/api/attendance', data);
export const getAttendanceSummary = () => API.get('/api/attendance/summary');