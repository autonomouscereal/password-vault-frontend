// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Signup';
import Callback from './Callback';
import Dashboard from './Dashboard';
import AddEntry from './AddEntry';
import EditEntry from './EditEntry';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/callback" element={<Callback />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add" element={<AddEntry />} />
        <Route path="/edit/:entryId" element={<EditEntry />} />
        <Route
          path="/"
          element={
            <div>
              <h1>Welcome to the Password Vault</h1>
              <a href="/signup">Login / Sign Up</a>
            </div>
          }
        />
        {/* Add other routes as needed */}
      </Routes>
    </Router>
  );
}

export default App;
