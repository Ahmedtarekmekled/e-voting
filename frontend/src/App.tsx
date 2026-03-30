
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Admin from './pages/Admin';
import Voter from './pages/Voter';
import { ToasterWrapper } from './components/ui/toaster-wrapper';

function App() {
  return (
    <Router>
      <div className="font-sans text-slate-900 dark:text-slate-50">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/voter" element={<Voter />} />
        </Routes>
        <footer className="py-8 text-center text-slate-500 dark:text-slate-400 text-sm border-t border-slate-200/50 dark:border-slate-800/50 mt-12 mb-4">
          Made with ❤️ by Ahmed Mekled
        </footer>
        <ToasterWrapper />
      </div>
    </Router>
  );
}

export default App;
