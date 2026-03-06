import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { NavigationBar } from './components/NavigationBar';
import { FloatingWidgets } from './components/FloatingWidgets';
import { Home } from './pages/Home';
import { PortfolioPage } from './pages/PortfolioPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { CaseStudy } from './pages/CaseStudy';
import { BlogPost } from './pages/BlogPost';

function App() {
  return (
    <Router>
      <main className="min-h-screen bg-slate-950 text-white selection:bg-blue-600 selection:text-white font-sans overflow-x-hidden">
        <NavigationBar />
        <FloatingWidgets />
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/portfolio" element={<PortfolioPage />} />
          <Route path="/portfolio/:slug" element={<CaseStudy />} />
          <Route path="/blog" element={<BlogPage />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
        
        <footer className="bg-slate-950 py-8 border-t border-slate-800/50 text-center relative z-10">
           <p className="text-slate-500 font-mono text-sm uppercase tracking-wide">
             © {new Date().getFullYear()} BlueStark. Engineered with precision by Isaac Testimony. All rights reserved.
           </p>
        </footer>
      </main>
    </Router>
  );
}

export default App;
