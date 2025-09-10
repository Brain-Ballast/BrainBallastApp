import "./App.css";
import { Routes, Route } from "react-router-dom";
import HistoryPage from "./pages/HistoricalData";
import Dashboard from "./pages/Dashboard";

function App() {
  return (
    <Routes>
        <Route path="/" element={<Dashboard />} />
      <Route path="/Dashboard" element={<Dashboard />} />
      <Route path="/history" element={<HistoryPage />} />
    </Routes>
  );
}

export default App;
