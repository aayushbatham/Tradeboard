import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Leaderboard from "./pages/Leaderboard";
import Homepage from "./pages/Homepage";
import MainLayout from "./pages/MainLayout";
import Pastwinners from "./pages/Pastwinners";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Homepage />} />
          <Route path="leaderboard" element={<Leaderboard />} />
          <Route path="pastwinners" element={<Pastwinners />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
