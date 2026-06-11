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
  X,
  Compass,
  BarChart3
} from 'lucide-react';

export const AdminLayout = () => {
  const [checkingAuth, setCheckingAuth] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const checkAuth = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        navigate('/admin/login', { replace: true });
      } else {
        setUserEmail(session.user.email || 'Admin');
        setCheckingAuth(false);
      }
    };
    checkAuth();

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!session) {
        navigate('/admin/login', { replace: true });
      } else {
        setUserEmail(session.user?.email || 'Admin');
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
      <div className="min-h-screen bg-[#020617] flex flex-col items-center justify-center text-white">
        <div className="w-10 h-10 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mb-4" />
        <span className="font-mono text-xs text-slate-500 uppercase tracking-widest">Checking Authentication...</span>
      </div>
    );
  }

  const menuItems = [
    { label: 'Dashboard', path: '/admin/dashboard', icon: LayoutDashboard },
    { label: 'Projects', path: '/admin/projects', icon: FolderGit2 },
    { label: 'Blog Articles', path: '/admin/blog', icon: FileText },
    { label: 'Testimonials', path: '/admin/testimonials', icon: MessageSquare },
    { label: 'Site Content', path: '/admin/site-content', icon: Settings },
    { label: 'FAQ Accordion', path: '/admin/faq', icon: HelpCircle },
    { label: 'Analytics', path: '/admin/analytics', icon: BarChart3 },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white flex flex-col md:flex-row relative font-sans">
      
      {/* Mobile Header */}
      <header className="md:hidden flex items-center justify-between px-6 py-4 bg-slate-900/60 backdrop-blur-xl border-b border-slate-800/80 z-50 sticky top-0">
        <Link to="/admin/dashboard" className="flex items-center gap-2 font-bold font-header text-white tracking-wider text-lg">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center shadow-md shadow-purple-500/10">
            <Compass size={16} className="text-white animate-spin-slow" />
          </div>
          <span>BlueStark <span className="text-purple-400">CMS</span></span>
        </Link>
        <button 
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="p-2 text-slate-400 hover:text-white transition-colors rounded-xl border border-slate-800 bg-slate-950/40"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </header>

      {/* Sidebar Nav */}
      <aside className={`
        fixed inset-y-0 left-0 w-64 bg-slate-900/40 backdrop-blur-xl border-r border-slate-800/80 z-40 transform transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:flex md:flex-col shrink-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Brand Header */}
        <div className="hidden md:flex items-center px-8 py-7 border-b border-slate-800/60">
          <Link to="/admin/dashboard" className="flex items-center gap-3 font-bold font-header text-white tracking-wider text-xl">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-500 flex items-center justify-center shadow-lg shadow-purple-500/20">
              <Compass size={18} className="text-white" />
            </div>
            <span>BlueStark <span className="text-purple-400">CMS</span></span>
          </Link>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 px-4 py-8 space-y-1.5 overflow-y-auto">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            return (
              <Link
                key={item.label}
                to={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`
                  flex items-center gap-3.5 px-4 py-3 rounded-xl font-mono text-xs uppercase tracking-wider transition-all duration-200 relative group
                  ${isActive 
                    ? 'bg-gradient-to-r from-purple-600/10 to-indigo-600/10 border border-purple-500/20 text-purple-400 shadow-md shadow-purple-500/5 font-semibold' 
                    : 'text-slate-400 border border-transparent hover:text-slate-200 hover:bg-slate-800/30'
                  }
                `}
              >
                {/* Active left indicator bar */}
                {isActive && (
                  <div className="absolute left-0 top-3 bottom-3 w-[3px] bg-purple-500 rounded-r-md" />
                )}
                <Icon size={16} className={`transition-colors duration-200 ${isActive ? 'text-purple-400' : 'text-slate-500 group-hover:text-slate-300'}`} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* User Profile Card */}
        <div className="px-4 py-3 border-t border-slate-800/60 shrink-0">
          <div className="flex items-center gap-3 px-3 py-2.5 rounded-2xl bg-slate-950/40 border border-slate-800/40">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-purple-500 to-indigo-500 flex items-center justify-center text-white text-xs font-mono font-bold uppercase select-none shrink-0 shadow-inner">
              {userEmail.substring(0, 2)}
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs font-semibold text-slate-200 block truncate leading-none mb-1">Isaac Testimony</span>
              <span className="text-[10px] font-mono text-slate-500 block truncate leading-none">{userEmail}</span>
            </div>
          </div>
        </div>

        {/* Footer Logout Button */}
        <div className="p-4 border-t border-slate-800/60">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-mono text-xs uppercase tracking-wider text-slate-400 hover:text-red-400 hover:bg-red-950/10 border border-transparent hover:border-red-500/10 transition-all duration-200 cursor-pointer"
          >
            <LogOut size={16} className="text-slate-500 group-hover:text-red-400 shrink-0" />
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
      <main className="flex-1 min-w-0 bg-[#020617] px-4 py-8 sm:px-6 md:px-12 md:py-10 overflow-y-auto">
        <div className="max-w-6xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
