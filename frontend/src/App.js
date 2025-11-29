import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import StudentListPage from './pages/StudentListPage';
import SummaryPage from './pages/SummaryPage';
import './App.css';

function App() {
    return (
        <div className="app">
            <Router>
                <Routes>
                    <Route path="/" element={<LoginPage />} />
                    <Route path="/signup" element={<SignupPage />} />
                    <Route path="/students" element={<StudentListPage />} />
                    <Route path="/summary" element={<SummaryPage />} />
                </Routes>
            </Router>
        </div>
    );
}

export default App;