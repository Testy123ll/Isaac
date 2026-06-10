import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Save, AlertCircle, RefreshCw } from 'lucide-react';

export const SiteContentPage = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [savingSection, setSavingSection] = useState<string | null>(null);

  // States for Hero Section
  const [heroHeadline, setHeroHeadline] = useState('');
  const [heroSubheadline, setHeroSubheadline] = useState('');
  const [heroAvailability, setHeroAvailability] = useState('');

  // States for About Section
  const [aboutTitle, setAboutTitle] = useState('');
  const [aboutBio, setAboutBio] = useState('');

  // States for Stats Section
  const [stat1Val, setStat1Val] = useState('');
  const [stat1Lbl, setStat1Lbl] = useState('');
  const [stat2Val, setStat2Val] = useState('');
  const [stat2Lbl, setStat2Lbl] = useState('');
  const [stat3Val, setStat3Val] = useState('');
  const [stat3Lbl, setStat3Lbl] = useState('');
  const [stat4Val, setStat4Val] = useState('');
  const [stat4Lbl, setStat4Lbl] = useState('');

  // States for Services Section
  const [servicesTitle, setServicesTitle] = useState('');
  const [servicesDesc, setServicesDesc] = useState('');

  // States for Pain Points Section
  const [painPointsTitle, setPainPointsTitle] = useState('');
  const [painPointsDesc, setPainPointsDesc] = useState('');

  useEffect(() => {
    fetchSiteContent();
  }, []);

  const fetchSiteContent = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase.from('site_content').select('*');
      if (error) throw error;

      if (data && data.length > 0) {
        data.forEach((row) => {
          const { section, key, value } = row;
          if (section === 'hero') {
            if (key === 'headline') setHeroHeadline(value);
            if (key === 'subheadline') setHeroSubheadline(value);
            if (key === 'availability') setHeroAvailability(value);
          } else if (section === 'about') {
            if (key === 'title') setAboutTitle(value);
            if (key === 'bio') setAboutBio(value);
          } else if (section === 'stats') {
            if (key === 'stat1_val') setStat1Val(value);
            if (key === 'stat1_lbl') setStat1Lbl(value);
            if (key === 'stat2_val') setStat2Val(value);
            if (key === 'stat2_lbl') setStat2Lbl(value);
            if (key === 'stat3_val') setStat3Val(value);
            if (key === 'stat3_lbl') setStat3Lbl(value);
            if (key === 'stat4_val') setStat4Val(value);
            if (key === 'stat4_lbl') setStat4Lbl(value);
          } else if (section === 'services') {
            if (key === 'title') setServicesTitle(value);
            if (key === 'desc') setServicesDesc(value);
          } else if (section === 'pain_points') {
            if (key === 'title') setPainPointsTitle(value);
            if (key === 'desc') setPainPointsDesc(value);
          }
        });
      }
    } catch (err: any) {
      console.error('Failed to load site content:', err);
      setError(err.message || 'Failed to load site content from database.');
    } finally {
      setLoading(false);
    }
  };

  const saveSection = async (section: string, fields: Record<string, string>) => {
    setSavingSection(section);
    try {
      const promises = Object.entries(fields).map(async ([key, value]) => {
        // Query to check existing row
        const { data, error } = await supabase
          .from('site_content')
          .select('id')
          .eq('section', section)
          .eq('key', key)
          .maybeSingle();

        if (error) throw error;

        if (data) {
          // Update
          return supabase
            .from('site_content')
            .update({ value, updated_at: new Date().toISOString() })
            .eq('id', data.id);
        } else {
          // Insert
          return supabase
            .from('site_content')
            .insert([{ section, key, value, updated_at: new Date().toISOString() }]);
        }
      });

      const results = await Promise.all(promises);
      const errors = results.filter((r) => r.error);
      if (errors.length > 0) throw errors[0].error;

      alert(`Saved updates for the ${section.replace('_', ' ')} section!`);
    } catch (err) {
      console.error(err);
      alert('Failed to save section content.');
    } finally {
      setSavingSection(null);
    }
  };

  if (loading || error) {
    return (
      <div className="space-y-8">
        <div className="h-10 w-48 bg-slate-900 rounded-xl animate-pulse" />
        {loading ? (
          <div className="space-y-6 animate-pulse">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="h-48 bg-slate-900 rounded-3xl" />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-16 space-y-4 bg-slate-900/40 border border-slate-800 rounded-3xl">
            <AlertCircle className="text-red-400" size={28} />
            <p className="text-red-400 font-mono text-sm text-center max-w-sm">{error}</p>
            <button onClick={fetchSiteContent} className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-mono text-xs uppercase tracking-wider transition-colors">
              <RefreshCw size={14} /> Retry
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-12 pb-16">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold font-header text-white mb-2">Site Content</h1>
        <p className="text-slate-400 font-mono text-xs uppercase tracking-wider">// Manage copywriting and statistics copy</p>
      </div>

      {/* Hero Section */}
      <section className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <h2 className="text-xl font-bold font-header text-white">// Hero Section</h2>
          <button
            onClick={() => saveSection('hero', {
              headline: heroHeadline,
              subheadline: heroSubheadline,
              availability: heroAvailability,
            })}
            disabled={savingSection === 'hero'}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white rounded-lg font-mono text-xs uppercase tracking-wider transition-colors"
          >
            <Save size={14} /> {savingSection === 'hero' ? 'Saving...' : 'Save'}
          </button>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Headline (HTML tags supported)</label>
            <textarea
              rows={3}
              value={heroHeadline}
              onChange={(e) => setHeroHeadline(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500 font-mono text-sm"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Subheadline</label>
            <textarea
              rows={3}
              value={heroSubheadline}
              onChange={(e) => setHeroSubheadline(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Availability Pill Text</label>
            <input
              type="text"
              value={heroAvailability}
              onChange={(e) => setHeroAvailability(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <h2 className="text-xl font-bold font-header text-white">// About Section</h2>
          <button
            onClick={() => saveSection('about', {
              title: aboutTitle,
              bio: aboutBio,
            })}
            disabled={savingSection === 'about'}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white rounded-lg font-mono text-xs uppercase tracking-wider transition-colors"
          >
            <Save size={14} /> {savingSection === 'about' ? 'Saving...' : 'Save'}
          </button>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Profile Header</label>
            <input
              type="text"
              value={aboutTitle}
              onChange={(e) => setAboutTitle(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Developer Biography (Linebreaks preserve paragraphs)</label>
            <textarea
              rows={6}
              value={aboutBio}
              onChange={(e) => setAboutBio(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500 leading-relaxed"
            />
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <h2 className="text-xl font-bold font-header text-white">// About Stats</h2>
          <button
            onClick={() => saveSection('stats', {
              stat1_val: stat1Val,
              stat1_lbl: stat1Lbl,
              stat2_val: stat2Val,
              stat2_lbl: stat2Lbl,
              stat3_val: stat3Val,
              stat3_lbl: stat3Lbl,
              stat4_val: stat4Val,
              stat4_lbl: stat4Lbl,
            })}
            disabled={savingSection === 'stats'}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white rounded-lg font-mono text-xs uppercase tracking-wider transition-colors"
          >
            <Save size={14} /> {savingSection === 'stats' ? 'Saving...' : 'Save'}
          </button>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Stat 1 */}
          <div className="space-y-3 p-4 border border-slate-800/80 bg-slate-950/20 rounded-2xl">
            <span className="text-xs font-mono text-slate-500 block uppercase tracking-wide">// Stat 1</span>
            <input
              type="text"
              placeholder="e.g. 15+"
              value={stat1Val}
              onChange={(e) => setStat1Val(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-bold text-center text-lg focus:outline-none"
            />
            <input
              type="text"
              placeholder="Label"
              value={stat1Lbl}
              onChange={(e) => setStat1Lbl(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-300 text-center text-xs focus:outline-none"
            />
          </div>
          {/* Stat 2 */}
          <div className="space-y-3 p-4 border border-slate-800/80 bg-slate-950/20 rounded-2xl">
            <span className="text-xs font-mono text-slate-500 block uppercase tracking-wide">// Stat 2</span>
            <input
              type="text"
              placeholder="e.g. 10+"
              value={stat2Val}
              onChange={(e) => setStat2Val(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-bold text-center text-lg focus:outline-none"
            />
            <input
              type="text"
              placeholder="Label"
              value={stat2Lbl}
              onChange={(e) => setStat2Lbl(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-300 text-center text-xs focus:outline-none"
            />
          </div>
          {/* Stat 3 */}
          <div className="space-y-3 p-4 border border-slate-800/80 bg-slate-950/20 rounded-2xl">
            <span className="text-xs font-mono text-slate-500 block uppercase tracking-wide">// Stat 3</span>
            <input
              type="text"
              placeholder="e.g. 2+"
              value={stat3Val}
              onChange={(e) => setStat3Val(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-bold text-center text-lg focus:outline-none"
            />
            <input
              type="text"
              placeholder="Label"
              value={stat3Lbl}
              onChange={(e) => setStat3Lbl(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-300 text-center text-xs focus:outline-none"
            />
          </div>
          {/* Stat 4 */}
          <div className="space-y-3 p-4 border border-slate-800/80 bg-slate-950/20 rounded-2xl">
            <span className="text-xs font-mono text-slate-500 block uppercase tracking-wide">// Stat 4</span>
            <input
              type="text"
              placeholder="e.g. 100%"
              value={stat4Val}
              onChange={(e) => setStat4Val(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-white font-bold text-center text-lg focus:outline-none"
            />
            <input
              type="text"
              placeholder="Label"
              value={stat4Lbl}
              onChange={(e) => setStat4Lbl(e.target.value)}
              className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-lg text-slate-300 text-center text-xs focus:outline-none"
            />
          </div>
        </div>
      </section>

      {/* Capabilities / Services */}
      <section className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <h2 className="text-xl font-bold font-header text-white">// Services Section</h2>
          <button
            onClick={() => saveSection('services', {
              title: servicesTitle,
              desc: servicesDesc,
            })}
            disabled={savingSection === 'services'}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white rounded-lg font-mono text-xs uppercase tracking-wider transition-colors"
          >
            <Save size={14} /> {savingSection === 'services' ? 'Saving...' : 'Save'}
          </button>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Section Title</label>
            <input
              type="text"
              value={servicesTitle}
              onChange={(e) => setServicesTitle(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Section Description</label>
            <textarea
              rows={3}
              value={servicesDesc}
              onChange={(e) => setServicesDesc(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </section>

      {/* Pain Points */}
      <section className="bg-slate-900/40 border border-slate-800 rounded-3xl p-6 md:p-8 space-y-6">
        <div className="flex justify-between items-center border-b border-slate-800 pb-4">
          <h2 className="text-xl font-bold font-header text-white">// Pain Points Section</h2>
          <button
            onClick={() => saveSection('pain_points', {
              title: painPointsTitle,
              desc: painPointsDesc,
            })}
            disabled={savingSection === 'pain_points'}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:bg-blue-600/50 text-white rounded-lg font-mono text-xs uppercase tracking-wider transition-colors"
          >
            <Save size={14} /> {savingSection === 'pain_points' ? 'Saving...' : 'Save'}
          </button>
        </div>
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Section Title</label>
            <input
              type="text"
              value={painPointsTitle}
              onChange={(e) => setPainPointsTitle(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="space-y-2">
            <label className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Section Description</label>
            <textarea
              rows={3}
              value={painPointsDesc}
              onChange={(e) => setPainPointsDesc(e.target.value)}
              className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
