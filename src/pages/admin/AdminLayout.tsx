import { useEffect, useState } from 'react';
import { useNavigate, Link, Outlet, useLocation } from 'react-router-dom';
import { supabase } from '../../lib/supabase';
import { 
  LayoutDashboard, 
  FolderGit2, 
  FileText, 
  MessageSquare, 
  Settings, 
  HelpCircle, 
  LogOut, 
  Menu, 
  X 
} from 'lucide-react';

export const AdminLayout = () => {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/admin/login', { replace: true });
      } else {
        setCheckingAuth(false);
      }
    };
    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/admin/login', { replace: true });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate]);

  const handleLogout = async () => {
    if (confirm('Are you sure you want to log out?')) {
      await supabase.auth.signOut();
      navigate('/admin/login', { replace: true });
    }
  };

  if (checkingAuth) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center text-white">
        <div className="w-10 h-10 border-4 border-blue-500/30 border-t-blue-500 rounded-full animate-spin mb-4" />
        <span className="font-mono text-sm text-slate-500 uppercase tracking-widest">Verifying Session...</span>
      </div>
    );
  }

  const menuItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Projects', path: '/admin/projects', icon: FolderGit2 },
    { label: 'Blog', path: '/admin/blog', icon: FileText },
    { label: 'Testimonials', path: '/admin/testimonials', icon: MessageSquare },
    { label: 'Site Content', path: '/admin/site-content', icon: Settings },
    { label: 'FAQ', path: '/admin/faq', icon: HelpCircle },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col md:flex-row relative">
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between px-6 py-4 bg-slate-900 border-b border-slate-800 z-50">
        <Link to="/admin/dashboard" className="text-xl font-bold font-header text-white tracking-wider">
          BlueStark <span className="text-blue-500">CMS</span>
        </Link>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-slate-400 hover:text-white transition-colors"
        >
          {sidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Sidebar Nav */}
      <aside className={`
        fixed inset-y-0 left-0 w-64 bg-slate-900 border-r border-slate-800 z-40 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:flex md:flex-col shrink-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Brand Header */}
        <div className="hidden md:flex items-center px-8 py-6 border-b border-slate-800/80">
          <Link to="/admin/dashboard" className="text-2xl font-bold font-header text-white tracking-wider">
            BlueStark <span className="text-blue-500">CMS</span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-8 space-y-2 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3.5 px-4 py-3 rounded-xl font-mono text-sm tracking-wide transition-all duration-200
                  ${isActive 
                    ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/50'
                  }
                `}
              >
                <Icon size={18} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer Logout Button */}
        <div className="p-4 border-t border-slate-800/80">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3.5 px-4 py-3 rounded-xl font-mono text-sm tracking-wide text-slate-400 hover:text-red-400 hover:bg-red-950/20 transition-all duration-200"
          >
            <LogOut size={18} />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div 
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-30 md:hidden animate-fade-in"
        />
      )}

      {/* Main Panel Content Area */}
      <main className="flex-1 min-w-0 bg-slate-950 px-6 py-8 md:px-12 md:py-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
