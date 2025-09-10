import './App.css'
import Graph from './components/Graph'
import { Routes, Route, Link } from 'react-router-dom';
import HistoryPage from './pages/HistoricalData';
import LinkButton from './components/LinkButton';


function App() {

  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <div>
              <h1>Brain Ballast Dashboard</h1>
              <Graph />
            </div>
            <div className='flex justify-center'>
              <LinkButton page='/History' buttonText='History' />
            </div>
          </>
        }
      />
      <Route path="/history" element={<HistoryPage />} />
    </Routes>
  );
}

export default App
