import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { HashLink as Link } from 'react-router-hash-link';
import { NavigationBar } from './components/NavigationBar';
import { FloatingWidgets } from './components/FloatingWidgets';
import { Home } from './pages/Home';
import { PortfolioPage } from './pages/PortfolioPage';
import { BlogPage } from './pages/BlogPage';
import { ContactPage } from './pages/ContactPage';
import { CaseStudy } from './pages/CaseStudy';
import { BlogPost } from './pages/BlogPost';

// Admin Page Imports
import { LoginPage } from './pages/admin/LoginPage';
import { AdminLayout } from './pages/admin/AdminLayout';
import { DashboardPage } from './pages/admin/DashboardPage';
import { ProjectsPage } from './pages/admin/ProjectsPage';
import { BlogPage as AdminBlogPage } from './pages/admin/BlogPage';
import { TestimonialsPage } from './pages/admin/TestimonialsPage';
import { SiteContentPage } from './pages/admin/SiteContentPage';
import { FAQPage } from './pages/admin/FAQPage';

function AppContent() {
  const location = useLocation();
  const isAdminPath = location.pathname.startsWith('/admin');

  return (
    <main className="min-h-screen bg-slate-950 text-white selection:bg-blue-600 selection:text-white font-sans overflow-x-hidden pb-28">
      {!isAdminPath && <NavigationBar />}
      {!isAdminPath && <FloatingWidgets />}
      
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/portfolio" element={<PortfolioPage />} />
        <Route path="/portfolio/:slug" element={<CaseStudy />} />
        <Route path="/blog" element={<BlogPage />} />
        <Route path="/blog/:slug" element={<BlogPost />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* Admin login */}
        <Route path="/admin/login" element={<LoginPage />} />

        {/* Protected admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="projects" element={<ProjectsPage />} />
          <Route path="blog" element={<AdminBlogPage />} />
          <Route path="testimonials" element={<TestimonialsPage />} />
          <Route path="site-content" element={<SiteContentPage />} />
          <Route path="faq" element={<FAQPage />} />
        </Route>
      </Routes>
      
      {!isAdminPath && (
        <footer className="bg-slate-950 py-16 border-t border-slate-800/50 relative z-10">
           <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-8">
              {/* Copyright column */}
              <div className="text-slate-500 font-mono text-sm uppercase tracking-wide text-center md:text-left">
                © 2025 Isaac Testimony. All rights reserved.
              </div>

              {/* Navigation column */}
              <div className="flex gap-6 justify-center">
                 <Link smooth to="/" className="text-slate-400 hover:text-white transition-colors font-mono text-sm">// Home</Link>
                 <Link smooth to="/portfolio" className="text-slate-400 hover:text-white transition-colors font-mono text-sm">// Portfolio</Link>
                 <Link smooth to="/blog" className="text-slate-400 hover:text-white transition-colors font-mono text-sm">// Blog</Link>
                 <Link smooth to="/#contact" className="text-slate-400 hover:text-white transition-colors font-mono text-sm">// Contact</Link>
              </div>

              {/* Social Links column */}
              <div className="flex gap-6 justify-center md:justify-end">
                 <a href="https://linkedin.com/in/isaac-testimony-b63243230" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors font-mono text-sm">LinkedIn</a>
                 <a href="https://github.com/Testy123ll" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors font-mono text-sm">GitHub</a>
                 <a href="https://wa.link/0cit50" target="_blank" rel="noopener noreferrer" className="text-slate-400 hover:text-white transition-colors font-mono text-sm">WhatsApp</a>
              </div>
           </div>
        </footer>
      )}
    </main>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
