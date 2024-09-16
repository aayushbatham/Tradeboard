import React from 'react'
import './App.css'
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Leaderboard from './pages/Leaderboard';
import Homepage from './pages/Homepage';

function App() {

  return (
    <Router>
      <div>navbar</div>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Routes>
    </Router>
  )
}

export default App
