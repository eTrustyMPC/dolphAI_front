import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AgentDashboard from './pages/agent-dashboard';

const App: React.FC = () => {
  return (
    <Router>
      <div className="min-h-screen bg-[#0A0C10]">
        <Routes>
          {/* Redirect root to agent dashboard */}
          <Route path="/" element={<Navigate to="/agent" replace />} />
          
          {/* Main Agent Dashboard */}
          <Route path="/agent" element={<AgentDashboard />} />
          
          {/* Catch all other routes and redirect to agent dashboard */}
          <Route path="*" element={<Navigate to="/agent" replace />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
