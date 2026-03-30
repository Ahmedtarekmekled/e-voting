
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Voter from './pages/Voter';
import About from './pages/About';
import { ToasterWrapper } from './components/ui/toaster-wrapper';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-[#030712] selection:bg-[#7034ff]/30 selection:text-white overflow-x-hidden">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/voter" element={<Voter />} />
          <Route path="/about" element={<About />} />
        </Routes>
        <ToasterWrapper />
      </div>
    </Router>
  );
}

export default App;
