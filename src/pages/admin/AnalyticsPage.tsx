import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { 
  Eye, 
  Users, 
  Clock, 
  Activity, 
  AlertCircle, 
  RefreshCw, 
  MessageSquare, 
  Phone, 
  Laptop, 
  Smartphone, 
  Globe, 
  Search, 
  FileText,
  MousePointerClick
} from 'lucide-react';

type PageView = {
  id: string;
  session_id: string;
  url: string;
  referrer: string | null;
  user_agent: string;
  duration_seconds: number;
  created_at: string;
};

type AnalyticsEvent = {
  id: string;
  session_id: string;
  event_name: string;
  event_data: Record<string, any>;
  created_at: string;
};

export const AnalyticsPage = () => {
  const [range, setRange] = useState<'24h' | '7d' | '30d' | 'all'>('7d');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [pageViews, setPageViews] = useState<PageView[]>([]);
  const [events, setEvents] = useState<AnalyticsEvent[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [lastSync, setLastSync] = useState<string>('');

  useEffect(() => {
    fetchData();
  }, [range]);

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const now = new Date();
      let dateFilter: string | null = null;
      if (range === '24h') {
        now.setHours(now.getHours() - 24);
        dateFilter = now.toISOString();
      } else if (range === '7d') {
        now.setDate(now.getDate() - 7);
        dateFilter = now.toISOString();
      } else if (range === '30d') {
        now.setDate(now.getDate() - 30);
        dateFilter = now.toISOString();
      }

      // Fetch page views
      let pvQuery = supabase
        .from('page_views')
        .select('*')
        .order('created_at', { ascending: false });

      if (dateFilter) {
        pvQuery = pvQuery.gte('created_at', dateFilter);
      }

      const { data: pvData, error: pvError } = await pvQuery;
      if (pvError) throw pvError;

      // Fetch events
      let evQuery = supabase
        .from('analytics_events')
        .select('*')
        .order('created_at', { ascending: false });

      if (dateFilter) {
        evQuery = evQuery.gte('created_at', dateFilter);
      }

      const { data: evData, error: evError } = await evQuery;
      if (evError) throw evError;

      setPageViews(pvData || []);
      setEvents(evData || []);
      setLastSync(new Date().toLocaleTimeString());
    } catch (err: any) {
      console.error('Failed to fetch analytics:', err);
      setError(err.message || 'Error executing analytics queries.');
    } finally {
      setLoading(false);
    }
  };

  // Calculations
  const totalPageViews = pageViews.length;
  const uniqueVisitors = new Set(pageViews.map(pv => pv.session_id)).size;
  
  const pageViewsWithDuration = pageViews.filter(pv => pv.duration_seconds > 0);
  const avgDurationSeconds = pageViewsWithDuration.length > 0 
    ? Math.round(pageViewsWithDuration.reduce((acc, curr) => acc + curr.duration_seconds, 0) / pageViewsWithDuration.length)
    : 0;

  const totalEvents = events.length;

  // Formatting helper for duration
  const formatDuration = (seconds: number) => {
    if (seconds < 60) return `${seconds}s`;
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  // Top Pages grouping
  const urlStats = pageViews.reduce((acc, curr) => {
    const url = curr.url || '/';
    if (!acc[url]) {
      acc[url] = { count: 0, totalDuration: 0, viewCountWithDuration: 0 };
    }
    acc[url].count += 1;
    if (curr.duration_seconds > 0) {
      acc[url].totalDuration += curr.duration_seconds;
      acc[url].viewCountWithDuration += 1;
    }
    return acc;
  }, {} as Record<string, { count: number; totalDuration: number; viewCountWithDuration: number }>);

  const topPages = Object.entries(urlStats)
    .map(([url, stats]) => ({
      url,
      views: stats.count,
      avgDuration: stats.viewCountWithDuration > 0 ? Math.round(stats.totalDuration / stats.viewCountWithDuration) : 0
    }))
    .sort((a, b) => b.views - a.views)
    .slice(0, 10);

  // Top Referrers grouping
  const referrerStats = pageViews.reduce((acc, curr) => {
    let ref = curr.referrer || 'Direct';
    if (ref !== 'Direct') {
      try {
        const urlObj = new URL(ref);
        ref = urlObj.hostname;
        if (ref.includes('localhost') || ref.includes('127.0.0.1') || ref.includes('blue-stark.vercel.app')) {
          ref = 'Internal';
        }
      } catch {
        ref = 'Referrer Link';
      }
    }
    acc[ref] = (acc[ref] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const topReferrers = Object.entries(referrerStats)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5);

  // Device Breakdown
  const deviceStats = pageViews.reduce((acc, curr) => {
    const ua = curr.user_agent || '';
    const isMobile = /mobile|android|iphone|ipad|phone/i.test(ua);
    const type = isMobile ? 'Mobile' : 'Desktop';
    acc[type] = (acc[type] || 0) + 1;
    return acc;
  }, { Desktop: 0, Mobile: 0 } as Record<'Desktop' | 'Mobile', number>);

  const desktopPercentage = totalPageViews > 0 ? Math.round((deviceStats.Desktop / totalPageViews) * 100) : 0;
  const mobilePercentage = totalPageViews > 0 ? Math.round((deviceStats.Mobile / totalPageViews) * 100) : 0;

  // Filtered Events based on search query
  const filteredEvents = events.filter(ev => {
    if (!searchQuery) return true;
    const term = searchQuery.toLowerCase();
    const evName = ev.event_name.toLowerCase();
    const dataStr = JSON.stringify(ev.event_data).toLowerCase();
    return evName.includes(term) || dataStr.includes(term);
  });

  // Relative time helper
  const getRelativeTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffSec = Math.floor(diffMs / 1000);
    const diffMin = Math.floor(diffSec / 60);
    const diffHr = Math.floor(diffMin / 60);

    if (diffSec < 60) return 'Just now';
    if (diffMin < 60) return `${diffMin}m ago`;
    if (diffHr < 24) return `${diffHr}h ago`;
    return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  // Get nice UI tags/icons for events
  const getEventBadge = (eventName: string) => {
    switch (eventName) {
      case 'click_whatsapp':
        return {
          label: 'WhatsApp Click',
          style: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
          icon: Phone
        };
      case 'open_chatbot':
        return {
          label: 'Chatbot Opened',
          style: 'bg-blue-500/10 border-blue-500/20 text-blue-400',
          icon: MessageSquare
        };
      case 'view_case_study':
        return {
          label: 'Case Study View',
          style: 'bg-purple-500/10 border-purple-500/20 text-purple-400',
          icon: FileText
        };
      case 'submit_contact_form':
        return {
          label: 'Form Submitted',
          style: 'bg-pink-500/10 border-pink-500/20 text-pink-400',
          icon: Activity
        };
      default:
        return {
          label: eventName,
          style: 'bg-slate-800 border-slate-700 text-slate-300',
          icon: MousePointerClick
        };
    }
  };

  if (loading && pageViews.length === 0) {
    return (
      <div className="space-y-8 animate-pulse">
        <div className="flex justify-between items-center">
          <div className="h-10 w-48 bg-slate-900/60 rounded-xl" />
          <div className="h-10 w-72 bg-slate-900/60 rounded-xl" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-32 bg-slate-900/30 border border-slate-800/40 rounded-3xl" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 h-96 bg-slate-900/20 border border-slate-800/40 rounded-[2rem]" />
          <div className="h-96 bg-slate-900/20 border border-slate-800/40 rounded-[2rem]" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Title Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-header text-white mb-2 tracking-tight">Traffic & Metrics</h1>
          <p className="text-slate-400 font-mono text-xs uppercase tracking-widest">// Analytics Dashboard Panel</p>
        </div>

        {/* Date Filter Tabs & Sync Status */}
        <div className="flex flex-wrap items-center gap-3">
          {lastSync && (
            <p className="text-slate-500 font-mono text-[9px] uppercase tracking-wider bg-slate-900/50 border border-slate-800/60 px-3 py-1.5 rounded-lg select-none flex items-center gap-1.5">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
              </span>
              SYNCED: {lastSync}
            </p>
          )}

          <div className="flex bg-slate-950/80 border border-slate-800/80 rounded-xl p-0.5 select-none">
            {(['24h', '7d', '30d', 'all'] as const).map((t) => (
              <button
                key={t}
                onClick={() => setRange(t)}
                className={`px-3 py-1.5 font-mono text-[10px] uppercase tracking-wider rounded-lg transition-all cursor-pointer ${
                  range === t 
                    ? 'bg-gradient-to-r from-purple-600/20 to-indigo-600/20 border border-purple-500/20 text-purple-400 font-bold' 
                    : 'text-slate-500 hover:text-slate-300'
                }`}
              >
                {t === '24h' ? '24 Hours' : t === '7d' ? '7 Days' : t === '30d' ? '30 Days' : 'All Time'}
              </button>
            ))}
          </div>

          <button 
            onClick={fetchData}
            className="p-2.5 rounded-xl border border-slate-800/60 bg-slate-950 hover:bg-slate-900 hover:border-slate-700 text-slate-400 hover:text-white transition-all cursor-pointer"
            title="Refresh database records"
          >
            <RefreshCw size={14} className={loading ? 'animate-spin' : ''} />
          </button>
        </div>
      </div>

      {error && (
        <div className="flex items-center gap-3 p-4 bg-red-950/20 border border-red-500/20 rounded-2xl text-red-400">
          <AlertCircle size={20} className="shrink-0" />
          <p className="font-mono text-xs">{error}</p>
        </div>
      )}

      {/* Analytics Summary Metric Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Page Views */}
        <div className="group relative rounded-3xl bg-slate-900/20 hover:bg-slate-900/30 border border-slate-800/60 hover:border-purple-500/30 transition-all duration-300 p-6 flex flex-col justify-between overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-24 h-24 bg-purple-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-semibold">Total Hits</span>
            <div className="p-2 rounded-xl bg-purple-500/10 border border-purple-500/20 text-purple-400">
              <Eye size={16} />
            </div>
          </div>
          <div>
            <span className="text-3xl md:text-4xl font-bold font-header text-white block mb-0.5">
              {totalPageViews.toLocaleString()}
            </span>
            <span className="text-xs font-semibold text-slate-300 block mb-0.5">Page Views</span>
            <span className="text-[9px] font-mono text-slate-500 block uppercase">Recorded visits</span>
          </div>
        </div>

        {/* Unique Sessions */}
        <div className="group relative rounded-3xl bg-slate-900/20 hover:bg-slate-900/30 border border-slate-800/60 hover:border-indigo-500/30 transition-all duration-300 p-6 flex flex-col justify-between overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-semibold">Unique Visits</span>
            <div className="p-2 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <Users size={16} />
            </div>
          </div>
          <div>
            <span className="text-3xl md:text-4xl font-bold font-header text-white block mb-0.5">
              {uniqueVisitors.toLocaleString()}
            </span>
            <span className="text-xs font-semibold text-slate-300 block mb-0.5">Unique Visitors</span>
            <span className="text-[9px] font-mono text-slate-500 block uppercase">By session signature</span>
          </div>
        </div>

        {/* Avg Duration */}
        <div className="group relative rounded-3xl bg-slate-900/20 hover:bg-slate-900/30 border border-slate-800/60 hover:border-cyan-500/30 transition-all duration-300 p-6 flex flex-col justify-between overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-24 h-24 bg-cyan-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-semibold">User Engagement</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400">
              <Clock size={16} />
            </div>
          </div>
          <div>
            <span className="text-3xl md:text-4xl font-bold font-header text-white block mb-0.5">
              {formatDuration(avgDurationSeconds)}
            </span>
            <span className="text-xs font-semibold text-slate-300 block mb-0.5">Avg Time Spent</span>
            <span className="text-[9px] font-mono text-slate-500 block uppercase">Per web page view</span>
          </div>
        </div>

        {/* Triggered Actions */}
        <div className="group relative rounded-3xl bg-slate-900/20 hover:bg-slate-900/30 border border-slate-800/60 hover:border-pink-500/30 transition-all duration-300 p-6 flex flex-col justify-between overflow-hidden shadow-sm">
          <div className="absolute top-0 right-0 w-24 h-24 bg-pink-500/5 rounded-full blur-2xl pointer-events-none" />
          <div className="flex items-center justify-between mb-4">
            <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest font-semibold">Conversions</span>
            <div className="p-2 rounded-xl bg-pink-500/10 border border-pink-500/20 text-pink-400">
              <Activity size={16} />
            </div>
          </div>
          <div>
            <span className="text-3xl md:text-4xl font-bold font-header text-white block mb-0.5">
              {totalEvents.toLocaleString()}
            </span>
            <span className="text-xs font-semibold text-slate-300 block mb-0.5">Triggered Events</span>
            <span className="text-[9px] font-mono text-slate-500 block uppercase">Key user interactions</span>
          </div>
        </div>
      </div>

      {/* Main Details Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Left Columns - Tables: Pages & Referrers */}
        <div className="lg:col-span-2 space-y-8">
          
          {/* Top Visited Pages */}
          <div className="p-8 rounded-[2rem] border border-slate-800/80 bg-slate-900/20 backdrop-blur-md relative overflow-hidden">
            <h2 className="text-lg font-bold font-header text-white mb-6 flex items-center gap-2.5">
              <span className="w-1.5 h-6 bg-purple-500 rounded-full" />
              Most Visited Routes
            </h2>

            {topPages.length === 0 ? (
              <div className="py-12 text-center text-slate-500 font-mono text-xs uppercase">// No traffic records in this frame</div>
            ) : (
              <div className="space-y-4">
                {topPages.map((page, i) => {
                  const maxViews = topPages[0].views;
                  const barWidth = maxViews > 0 ? Math.max(5, Math.round((page.views / maxViews) * 100)) : 0;
                  return (
                    <div key={i} className="flex flex-col gap-2 p-3 rounded-2xl bg-slate-950/20 border border-slate-900 hover:border-slate-800/80 hover:bg-slate-950/40 transition-colors">
                      <div className="flex items-center justify-between gap-4">
                        <span className="text-xs font-mono text-slate-300 truncate font-semibold" title={page.url}>
                          {page.url}
                        </span>
                        <div className="flex items-center gap-4 shrink-0">
                          <span className="text-xs font-bold text-white font-mono">{page.views} views</span>
                          <span className="text-[10px] font-mono text-slate-500">avg {formatDuration(page.avgDuration)}</span>
                        </div>
                      </div>
                      <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-gradient-to-r from-purple-500 to-indigo-500 rounded-full" 
                          style={{ width: `${barWidth}%` }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Device & Referrers Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Device Breakdown */}
            <div className="p-8 rounded-[2rem] border border-slate-800/80 bg-slate-900/20 backdrop-blur-md">
              <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-slate-400 mb-6 flex items-center gap-2">
                <Laptop size={16} className="text-indigo-400" /> Device Distribution
              </h3>

              <div className="space-y-6">
                <div className="flex justify-between items-center text-xs font-mono text-slate-300">
                  <span className="flex items-center gap-2"><Laptop size={14} className="text-slate-500" /> Desktop/Laptop</span>
                  <span className="font-bold text-white">{deviceStats.Desktop} ({desktopPercentage}%)</span>
                </div>
                <div className="flex justify-between items-center text-xs font-mono text-slate-300">
                  <span className="flex items-center gap-2"><Smartphone size={14} className="text-slate-500" /> Mobile Phones</span>
                  <span className="font-bold text-white">{deviceStats.Mobile} ({mobilePercentage}%)</span>
                </div>

                <div className="w-full h-3 bg-slate-900 rounded-full overflow-hidden flex">
                  {desktopPercentage > 0 && (
                    <div 
                      className="h-full bg-indigo-500 transition-all duration-300"
                      style={{ width: `${desktopPercentage}%` }}
                      title={`Desktop: ${desktopPercentage}%`}
                    />
                  )}
                  {mobilePercentage > 0 && (
                    <div 
                      className="h-full bg-purple-500 transition-all duration-300"
                      style={{ width: `${mobilePercentage}%` }}
                      title={`Mobile: ${mobilePercentage}%`}
                    />
                  )}
                </div>
              </div>
            </div>

            {/* Top Traffic Referrers */}
            <div className="p-8 rounded-[2rem] border border-slate-800/80 bg-slate-900/20 backdrop-blur-md">
              <h3 className="text-sm font-bold font-mono uppercase tracking-wider text-slate-400 mb-6 flex items-center gap-2">
                <Globe size={16} className="text-cyan-400" /> Top Referrers
              </h3>

              {topReferrers.length === 0 ? (
                <p className="text-xs font-mono text-slate-500 uppercase py-4">// No referrers recorded</p>
              ) : (
                <div className="space-y-4">
                  {topReferrers.map(([ref, count], i) => (
                    <div key={i} className="flex items-center justify-between text-xs font-mono text-slate-300">
                      <span className="truncate max-w-[170px]" title={ref}>{ref}</span>
                      <span className="font-bold text-white">{count} visits</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right Column - Events Activity Stream */}
        <div className="space-y-8">
          
          {/* Action Logs Stream */}
          <div className="p-8 rounded-[2rem] border border-slate-800/80 bg-slate-900/20 backdrop-blur-md flex flex-col h-full min-h-[500px]">
            <h2 className="text-lg font-bold font-header text-white mb-4 flex items-center gap-2.5">
              <span className="w-1.5 h-6 bg-pink-500 rounded-full" />
              Event Stream
            </h2>

            {/* Filter Search Input */}
            <div className="relative mb-6">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Filter events or payload..."
                className="w-full bg-slate-950 border border-slate-800 rounded-xl py-2 pl-9 pr-4 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500/50 transition-all font-mono"
              />
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 pointer-events-none" />
            </div>

            {/* List Stream */}
            <div className="flex-1 overflow-y-auto max-h-[500px] space-y-4 pr-1 scrollbar-thin scrollbar-thumb-slate-800">
              {filteredEvents.length === 0 ? (
                <div className="py-12 text-center text-slate-500 font-mono text-xs uppercase">// No action logs found</div>
              ) : (
                filteredEvents.map((ev, i) => {
                  const badge = getEventBadge(ev.event_name);
                  const Icon = badge.icon;
                  return (
                    <div 
                      key={ev.id || i}
                      className="group flex gap-3.5 p-3 rounded-2xl bg-slate-950/40 border border-slate-900 hover:border-slate-800 hover:bg-slate-950/80 transition-all duration-200"
                    >
                      <div className={`p-2.5 rounded-xl border shrink-0 flex items-center justify-center h-10 w-10 ${badge.style}`}>
                        <Icon size={16} />
                      </div>
                      
                      <div className="min-w-0 flex-1 flex flex-col justify-center">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <span className="text-xs font-semibold text-white block truncate">
                            {badge.label}
                          </span>
                          <span className="text-[9px] font-mono text-slate-500 shrink-0">
                            {getRelativeTime(ev.created_at)}
                          </span>
                        </div>
                        
                        {/* Event Data summary */}
                        {ev.event_data && Object.keys(ev.event_data).length > 0 ? (
                          <div className="text-[10px] font-mono text-slate-400 overflow-hidden text-ellipsis whitespace-nowrap bg-slate-950/50 p-1.5 rounded-lg border border-slate-900/60 mt-0.5">
                            {JSON.stringify(ev.event_data)}
                          </div>
                        ) : (
                          <span className="text-[10px] font-mono text-slate-500 leading-none">session: {ev.session_id.substring(0, 8)}...</span>
                        )}
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};
