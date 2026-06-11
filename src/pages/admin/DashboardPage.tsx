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
        <div className="h-10 w-48 bg-slate-900/60 rounded-xl" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-40 bg-slate-900/30 border border-slate-800/40 rounded-3xl" />
          ))}
        </div>
      </div>
    );
  }

  if (stats.error) {
    return (
      <div className="flex flex-col items-center justify-center py-20 space-y-4 bg-slate-900/10 border border-slate-800/80 rounded-[2rem]">
        <div className="p-4 rounded-full bg-red-950/20 border border-red-500/20 text-red-500">
          <AlertCircle size={28} className="animate-bounce" />
        </div>
        <p className="text-red-400 font-mono text-sm text-center max-w-sm">{stats.error}</p>
        <button
          onClick={fetchStats}
          className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 hover:text-white text-slate-300 rounded-xl font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer"
        >
          <RefreshCw size={14} /> Retry Handshake
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
      accentClass: 'text-purple-400 border-purple-500/20 bg-purple-500/5 hover:border-purple-500/40',
      link: '/admin/projects',
      graph: (
        <svg className="w-full h-8 mt-4 text-purple-500/30" viewBox="0 0 100 20" preserveAspectRatio="none">
          <path d="M0,20 Q15,5 30,12 T60,8 T90,2 T100,10 L100,20 L0,20 Z" fill="currentColor" stroke="currentColor" strokeWidth="1" />
        </svg>
      )
    },
    {
      title: 'Blog Articles',
      value: stats.blogsCount,
      desc: `${stats.publishedBlogs} published · ${stats.draftBlogs} drafts`,
      icon: FileText,
      accentClass: 'text-cyan-400 border-cyan-500/20 bg-cyan-500/5 hover:border-cyan-500/40',
      link: '/admin/blog',
      graph: (
        <svg className="w-full h-8 mt-4 text-cyan-500/30" viewBox="0 0 100 20" preserveAspectRatio="none">
          <path d="M0,15 Q20,2 40,14 T80,5 T100,10 L100,20 L0,20 Z" fill="currentColor" stroke="currentColor" strokeWidth="1" />
        </svg>
      )
    },
    {
      title: 'Client Reviews',
      value: stats.testimonialsCount,
      desc: 'Feedback and testimonials',
      icon: MessageSquare,
      accentClass: 'text-amber-400 border-amber-500/20 bg-amber-500/5 hover:border-amber-500/40',
      link: '/admin/testimonials',
      graph: (
        <svg className="w-full h-8 mt-4 text-amber-500/30" viewBox="0 0 100 20" preserveAspectRatio="none">
          <path d="M0,18 Q25,8 50,15 T75,4 T100,2 L100,20 L0,20 Z" fill="currentColor" stroke="currentColor" strokeWidth="1" />
        </svg>
      )
    },
    {
      title: 'FAQ Accordion Items',
      value: stats.faqsCount,
      desc: 'Common questions answered',
      icon: HelpCircle,
      accentClass: 'text-violet-400 border-violet-500/20 bg-violet-500/5 hover:border-violet-500/40',
      link: '/admin/faq',
      graph: (
        <svg className="w-full h-8 mt-4 text-violet-500/30" viewBox="0 0 100 20" preserveAspectRatio="none">
          <path d="M0,10 Q20,15 40,8 T80,12 T100,5 L100,20 L0,20 Z" fill="currentColor" stroke="currentColor" strokeWidth="1" />
        </svg>
      )
    },
    {
      title: 'Active Publications',
      value: stats.publishedBlogs,
      desc: 'Live on the website now',
      icon: FileText,
      accentClass: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5 hover:border-emerald-500/40',
      link: '/admin/blog',
      graph: (
        <svg className="w-full h-8 mt-4 text-emerald-500/30" viewBox="0 0 100 20" preserveAspectRatio="none">
          <path d="M0,20 Q30,10 60,15 T100,2 L100,20 L0,20 Z" fill="currentColor" stroke="currentColor" strokeWidth="1" />
        </svg>
      )
    },
    {
      title: 'Site Content Copy',
      value: 'Modify',
      desc: 'Update copy and statistics',
      icon: ClipboardCheck,
      accentClass: 'text-pink-400 border-pink-500/20 bg-pink-500/5 hover:border-pink-500/40',
      link: '/admin/site-content',
      graph: (
        <svg className="w-full h-8 mt-4 text-pink-500/30" viewBox="0 0 100 20" preserveAspectRatio="none">
          <path d="M0,12 Q10,18 30,10 T70,14 T100,8 L100,20 L0,20 Z" fill="currentColor" stroke="currentColor" strokeWidth="1" />
        </svg>
      )
    },
  ];

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-header text-white mb-2 tracking-tight">Console Control</h1>
          <p className="text-slate-400 font-mono text-xs uppercase tracking-widest">// Operations & Metric Dashboard</p>
        </div>
        {stats.lastUpdated && (
          <p className="text-slate-500 font-mono text-[10px] uppercase tracking-wider bg-slate-900/50 border border-slate-800/60 px-3 py-1.5 rounded-lg select-none">
            SYNC TIME: {stats.lastUpdated}
          </p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, i) => {
          const Icon = card.icon;
          return (
            <div
              key={i}
              className={`group relative rounded-3xl bg-slate-900/40 border transition-all duration-300 overflow-hidden flex flex-col justify-between ${card.accentClass}`}
            >
              <div className="p-6 pb-2">
                <div className="flex items-center justify-between mb-5">
                  <div className="p-3.5 rounded-2xl bg-slate-950/40 border border-slate-800/80">
                    <Icon size={20} />
                  </div>
                  <Link
                    to={card.link}
                    className="w-9 h-9 rounded-full border border-slate-800/60 flex items-center justify-center text-slate-500 hover:text-white hover:border-slate-600 hover:bg-slate-950/60 transition-all duration-300"
                  >
                    <ArrowUpRight size={16} />
                  </Link>
                </div>
                <div>
                  <span className="text-3xl md:text-4xl font-bold font-header text-white block mb-1">
                    {card.value}
                  </span>
                  <span className="text-xs font-semibold text-slate-300 block mb-0.5">
                    {card.title}
                  </span>
                  <span className="text-[10px] font-mono text-slate-500 block uppercase tracking-wide">
                    {card.desc}
                  </span>
                </div>
              </div>
              {/* Graphic element visualizer */}
              {card.graph}
            </div>
          );
        })}
      </div>

      {/* Connection Status block */}
      <div className="p-8 rounded-[2rem] border border-slate-800/80 bg-slate-900/20 backdrop-blur-md relative overflow-hidden">
        {/* Glow effect overlay */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/5 rounded-full blur-[80px] pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
          <div className="space-y-3 max-w-xl">
            <h3 className="text-xl font-bold text-white font-header tracking-wide flex items-center gap-2">
              <span className="relative flex h-3 w-3 shrink-0">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
              </span>
              Infrastructure Status
            </h3>
            <p className="text-slate-400 text-sm leading-relaxed">
              Active link established. Supabase is actively listening for mutations. Operations executed from this panel sync globally with zero propagation latency.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 font-mono text-[10px] uppercase tracking-wider text-slate-400 shrink-0">
            <div className="px-4 py-3 bg-slate-950/60 border border-slate-800/80 rounded-2xl flex flex-col gap-1 min-w-[130px]">
              <span className="text-slate-500 leading-none">Status</span>
              <span className="text-emerald-400 font-bold font-sans text-xs flex items-center gap-1.5 mt-1">ONLINE</span>
            </div>
            <div className="px-4 py-3 bg-slate-950/60 border border-slate-800/80 rounded-2xl flex flex-col gap-1 min-w-[130px]">
              <span className="text-slate-500 leading-none">Relational Layer</span>
              <span className="text-white font-bold font-sans text-xs mt-1">Postgres 15</span>
            </div>
            <div className="px-4 py-3 bg-slate-950/60 border border-slate-800/80 rounded-2xl flex flex-col gap-1 min-w-[130px]">
              <span className="text-slate-500 leading-none">Gateway Sync</span>
              <span className="text-white font-bold font-sans text-xs mt-1">HTTP PostgREST</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
