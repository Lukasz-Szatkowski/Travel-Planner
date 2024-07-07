import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from '../src/components/HomePage';
import LoginPage from '../src/components/LoginPage';
import SignupPage from '../src/components/SignupPage';
import TripPlannerPage from '../src/components/TripPlannerPage';

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/signup" element={<SignupPage />} />
                <Route path="/planner" element={<TripPlannerPage />} />
            </Routes>
        </Router>
    );
}

export default App;