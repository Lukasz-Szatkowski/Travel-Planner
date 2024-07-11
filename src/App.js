import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../src/components/HomePage';
import LoginPage from '../src/components/LoginPage';
import SignupPage from '../src/components/SignupPage';
import Dashboard from '../src/components/Dashboard'; // Import the dashboard

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/planner" element={<Dashboard />} /> {/* Use the dashboard */}
            </Routes>
        </Router>
    );
}

export default App;