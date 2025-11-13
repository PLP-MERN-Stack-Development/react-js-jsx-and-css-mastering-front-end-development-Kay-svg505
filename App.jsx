import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Layout from './layout/Layout';
import Home from './pages/Home';
import APIPage from './pages/APIPage';
import { ThemeProvider } from './context/ThemeContext';
import Button from './components/Button';

function App() {
  return (
    <ThemeProvider>
      <Router>
        <Layout>
          <div className="flex gap-4 mb-6">
            <Link to="/"><Button variant="primary" size="sm">Home</Button></Link>
            <Link to="/api"><Button variant="secondary" size="sm">API Posts</Button></Link>
          </div>

          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/api" element={<APIPage />} />
          </Routes>
        </Layout>
      </Router>
    </ThemeProvider>
  );
}

export default App;


