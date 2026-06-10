import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { seedDefaultsIfEmpty } from '../../lib/seedDefaults';
import { FolderGit2, FileText, MessageSquare, ClipboardCheck, HelpCircle, ArrowUpRight, AlertCircle, RefreshCw } from 'lucide-react';
import { Link } from 'react-router-dom';

export const DashboardPage = () => {
  const [stats, setStats] = useState({
    projectsCount: 0,
    blogsCount: 0,
    publishedBlogs: 0,
    draftBlogs: 0,
    testimonialsCount: 0,
    faqsCount: 0,
    lastUpdated: null as string | null,
    loading: true,
    error: null as string | null,
  });

  useEffect(() => {
    init();
  }, []);

  const init = async () => {
    // Seed defaults first, then fetch stats
    await seedDefaultsIfEmpty();
    await fetchStats();
  };

  const fetchStats = async () => {
    setStats(prev => ({ ...prev, loading: true, error: null }));
    try {
      const [
        { count: pCount },
        { count: bCount },
        { count: pubCount },
        { count: draftCount },
        { count: tCount },
        { count: fCount },
        { data: recentFAQ },
        { data: recentContent },
      ] = await Promise.all([
        supabase.from('projects').select('*', { count: 'exact', head: true }),
        supabase.from('blog_posts').select('*', { count: 'exact', head: true }),
        supabase.from('blog_posts').select('*', { count: 'exact', head: true }).eq('published', true),
        supabase.from('blog_posts').select('*', { count: 'exact', head: true }).eq('published', false),
        supabase.from('testimonials').select('*', { count: 'exact', head: true }),
        supabase.from('faqs').select('*', { count: 'exact', head: true }),
        supabase.from('faqs').select('order_index').order('order_index', { ascending: false }).limit(1),
        supabase.from('site_content').select('updated_at').order('updated_at', { ascending: false }).limit(1),
      ]);

      // Pick the most recent updated_at across tables
      const candidates = [
        recentContent?.[0]?.updated_at,
        recentFAQ?.[0] ? new Date().toISOString() : null,
      ].filter(Boolean) as string[];
      const lastUpdated = candidates.length > 0
        ? new Date(Math.max(...candidates.map(d => new Date(d).getTime()))).toLocaleString()
        : null;

      setStats({
        projectsCount: pCount || 0,
        blogsCount: bCount || 0,
        publishedBlogs: pubCount || 0,
        draftBlogs: draftCount || 0,
        testimonialsCount: tCount || 0,
        faqsCount: fCount || 0,
        lastUpdated,
        loading: false,
        error: null,
      });
    } catch (err: any) {
      console.error("Failed to load dashboard metrics:", err);
      setStats(prev => ({ ...prev, loading: false, error: err.message || 'Failed to connect to database.' }));
    }
  };

  if (stats.loading) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="h-10 w-48 bg-slate-900 rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-32 bg-slate-900 rounded-3xl" />
          ))}
        </div>
      </div>
    );
  }

  if (stats.error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4">
        <div className="p-4 rounded-full bg-red-950/30 border border-red-900/30">
          <AlertCircle className="text-red-400" size={28} />
        </div>
        <p className="text-red-400 font-mono text-sm text-center max-w-sm">{stats.error}</p>
        <button
          onClick={fetchStats}
          className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-mono text-xs uppercase tracking-wider transition-colors"
        >
          <RefreshCw size={14} /> Retry
        </button>
      </div>
    );
  }

  const cards = [
    {
      title: 'Total Projects',
      value: stats.projectsCount,
      desc: 'Showcased selections',
      icon: FolderGit2,
      color: 'text-blue-500 bg-blue-950/30 border-blue-900/30',
      link: '/admin/projects',
    },
    {
      title: 'Blog Articles',
      value: stats.blogsCount,
      desc: `${stats.publishedBlogs} published · ${stats.draftBlogs} drafts`,
      icon: FileText,
      color: 'text-cyan-500 bg-cyan-950/30 border-cyan-900/30',
      link: '/admin/blog',
    },
    {
      title: 'Client Reviews',
      value: stats.testimonialsCount,
      desc: 'Feedback and testimonials',
      icon: MessageSquare,
      color: 'text-amber-500 bg-amber-950/30 border-amber-900/30',
      link: '/admin/testimonials',
    },
    {
      title: 'FAQ Items',
      value: stats.faqsCount,
      desc: 'Common questions answered',
      icon: HelpCircle,
      color: 'text-violet-500 bg-violet-950/30 border-violet-900/30',
      link: '/admin/faq',
    },
    {
      title: 'Published Posts',
      value: stats.publishedBlogs,
      desc: 'Live on the website now',
      icon: FileText,
      color: 'text-green-500 bg-green-950/30 border-green-900/30',
      link: '/admin/blog',
    },
    {
      title: 'Site Content',
      value: 'Edit',
      desc: 'Update copy and statistics',
      icon: ClipboardCheck,
      color: 'text-purple-500 bg-purple-950/30 border-purple-900/30',
      link: '/admin/site-content',
    },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-2">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-header text-white mb-2">Workspace Overview</h1>
          <p className="text-slate-400 font-mono text-xs uppercase tracking-wider">// Real-time portfolio metrics</p>
        </div>
        {stats.lastUpdated && (
          <p className="text-slate-500 font-mono text-xs">Last updated: {stats.lastUpdated}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className="group relative p-6 rounded-3xl bg-slate-900/40 border border-slate-800/80 hover:border-slate-700 hover:bg-slate-900 transition-all duration-300"
            >
              <div className="flex items-center justify-between mb-4">
                <div className={`p-3.5 rounded-2xl border ${card.color}`}>
                  <Icon size={22} />
                </div>
                <Link
                  to={card.link}
                  className="w-10 h-10 rounded-full border border-slate-800 flex items-center justify-center text-slate-500 group-hover:text-white group-hover:border-slate-700 transition-all duration-300"
                >
                  <ArrowUpRight size={18} />
                </Link>
              </div>
              <div>
                <span className="text-3xl md:text-4xl font-bold font-header text-white block mb-1">
                  {card.value}
                </span>
                <span className="text-sm font-semibold text-slate-200 block mb-1">
                  {card.title}
                </span>
                <span className="text-xs font-mono text-slate-500 block uppercase tracking-wider">
                  {card.desc}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Connection Status */}
      <div className="p-8 rounded-3xl border border-slate-800 bg-slate-900/10">
        <h3 className="text-xl font-bold text-white mb-3">Database Connection Status</h3>
        <p className="text-slate-400 text-sm leading-relaxed mb-6 max-w-xl">
          Your admin panel is connected directly to Supabase. Any edits made in the tabs on the left will update your live portfolio instantly.
        </p>
        <div className="flex items-center gap-2 text-green-400 font-mono text-xs tracking-wider uppercase">
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
          </span>
          <span>Supabase System Operational</span>
        </div>
      </div>
    </div>
  );
};
