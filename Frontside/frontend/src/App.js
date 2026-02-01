import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <h1>Ticketer Events</h1>
        </header>
        <main>
          <Routes>
            <Route path="/" element={<div>Events List - Work in Progress</div>} />
            {/* Additional routes will be added here */}
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
