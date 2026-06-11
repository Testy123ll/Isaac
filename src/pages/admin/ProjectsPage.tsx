import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';
import { Plus, Edit2, Trash2, X, Upload, AlertCircle, RefreshCw, Layers, Compass, Globe } from 'lucide-react';

interface Project {
  id?: string;
  slug: string;
  title: string;
  category: string;
  description: string;
  techStack: string[];
  liveUrl: string;
  imageUrl: string;
  type: 'client' | 'personal';
  order_index: number;
  caseStudy: {
    overview: string;
    challenges: string[];
    solutions: string[];
    results: string[];
  };
}

export const ProjectsPage = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);

  // Form Fields
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [category, setCategory] = useState('');
  const [description, setDescription] = useState('');
  const [techStackText, setTechStackText] = useState('');
  const [liveUrl, setLiveUrl] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [type, setType] = useState<'client' | 'personal'>('client');
  const [orderIndex, setOrderIndex] = useState(0);

  // Case Study fields
  const [csOverview, setCsOverview] = useState('');
  const [csChallengesText, setCsChallengesText] = useState('');
  const [csSolutionsText, setCsSolutionsText] = useState('');
  const [csResultsText, setCsResultsText] = useState('');

  // Upload preview
  const [uploadingImage, setUploadingImage] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    setLoading(true);
    setError(null);
    try {
      const { data, error } = await supabase
        .from('projects')
        .select('*')
        .order('order_index', { ascending: true });

      if (error) throw error;
      setProjects(data || []);
    } catch (err: any) {
      console.error('Failed to fetch projects:', err);
      setError(err.message || 'Failed to load projects from database.');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setSlug('');
    setCategory('');
    setDescription('');
    setTechStackText('');
    setLiveUrl('');
    setImageUrl('');
    setType('client');
    setOrderIndex(0);
    setCsOverview('');
    setCsChallengesText('');
    setCsSolutionsText('');
    setCsResultsText('');
    setEditingId(null);
  };

  const handleTitleChange = (val: string) => {
    setTitle(val);
    if (!editingId) {
      setSlug(
        val
          .toLowerCase()
          .replace(/[^a-z0-9]+/g, '-')
          .replace(/(^-|-$)+/g, '')
      );
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadingImage(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random().toString(36).substring(2)}_${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('project-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data: { publicUrl } } = supabase.storage
        .from('project-images')
        .getPublicUrl(filePath);

      setImageUrl(publicUrl);
    } catch (err) {
      console.error('Upload failed:', err);
      alert('Failed to upload image. Make sure project-images bucket is public.');
    } finally {
      setUploadingImage(false);
    }
  };

  const handleEdit = (project: Project) => {
    setEditingId(project.id || null);
    setTitle(project.title);
    setSlug(project.slug);
    setCategory(project.category);
    setDescription(project.description);
    setTechStackText(project.techStack.join(', '));
    setLiveUrl(project.liveUrl);
    setImageUrl(project.imageUrl);
    setType(project.type);
    setOrderIndex(project.order_index);

    // Case Study fields
    const cs = project.caseStudy || {};
    setCsOverview(cs.overview || '');
    setCsChallengesText(cs.challenges?.join('\n') || '');
    setCsSolutionsText(cs.solutions?.join('\n') || '');
    setCsResultsText(cs.results?.join('\n') || '');

    setFormOpen(true);
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this project?')) return;

    try {
      const { error } = await supabase
        .from('projects')
        .delete()
        .eq('id', id);

      if (error) throw error;
      fetchProjects();
    } catch (err) {
      console.error('Failed to delete project:', err);
      alert('Delete failed');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    const projectData = {
      title,
      slug,
      category,
      description,
      techStack: techStackText.split(',').map((s) => s.trim()).filter(Boolean),
      liveUrl,
      imageUrl,
      type,
      order_index: Number(orderIndex),
      caseStudy: {
        overview: csOverview,
        challenges: csChallengesText.split('\n').map((s) => s.trim()).filter(Boolean),
        solutions: csSolutionsText.split('\n').map((s) => s.trim()).filter(Boolean),
        results: csResultsText.split('\n').map((s) => s.trim()).filter(Boolean),
      },
    };

    try {
      if (editingId) {
        const { error } = await supabase
          .from('projects')
          .update(projectData)
          .eq('id', editingId);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('projects')
          .insert([projectData]);
        if (error) throw error;
      }
      setFormOpen(false);
      resetForm();
      fetchProjects();
    } catch (err) {
      console.error('Failed to save project:', err);
      alert('Failed to save project data.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="space-y-8 font-sans">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold font-header text-white mb-2 tracking-tight">Showcase Registry</h1>
          <p className="text-slate-400 font-mono text-xs uppercase tracking-widest">// Manage portfolio works</p>
        </div>
        <button
          onClick={() => {
            resetForm();
            setFormOpen(true);
          }}
          className="flex items-center justify-center gap-2 px-5 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white rounded-xl font-mono text-xs uppercase tracking-wider font-bold shadow-lg shadow-purple-500/10 hover:shadow-purple-500/20 hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 cursor-pointer"
        >
          <Plus size={15} /> Add Showcase
        </button>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="h-20 bg-slate-900/30 border border-slate-800/40 animate-pulse rounded-2xl" />
          ))}
        </div>
      ) : error ? (
        <div className="flex flex-col items-center justify-center py-16 space-y-4 bg-slate-900/10 border border-slate-800 rounded-3xl">
          <AlertCircle className="text-red-400 animate-pulse" size={28} />
          <p className="text-red-400 font-mono text-sm text-center max-w-sm">{error}</p>
          <button onClick={fetchProjects} className="flex items-center gap-2 px-4 py-2 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 rounded-xl font-mono text-xs uppercase tracking-wider transition-colors cursor-pointer">
            <RefreshCw size={14} /> Retry Query
          </button>
        </div>
      ) : (
        <div className="bg-slate-900/20 backdrop-blur-md border border-slate-800/80 rounded-3xl overflow-hidden shadow-xl">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-800/80 text-slate-500 font-mono text-xs uppercase tracking-widest bg-slate-950/20">
                  <th className="px-6 py-4.5">Showcase Project</th>
                  <th className="px-6 py-4.5">Category Niche</th>
                  <th className="px-6 py-4.5">Target Type</th>
                  <th className="px-6 py-4.5">Index Order</th>
                  <th className="px-6 py-4.5 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/40 font-sans text-slate-300">
                {projects.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-6 py-12 text-center text-slate-600 font-mono text-xs uppercase tracking-wider">
                      // Registry empty. Add a new showcase block.
                    </td>
                  </tr>
                ) : (
                  projects.map((project) => (
                    <tr key={project.id} className="hover:bg-slate-900/20 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-8 rounded-lg bg-slate-950 border border-slate-800/80 overflow-hidden shrink-0 shadow-inner">
                            {project.imageUrl ? (
                              <img src={project.imageUrl} alt="" className="w-full h-full object-cover object-top" />
                            ) : (
                              <div className="w-full h-full bg-slate-900/60 flex items-center justify-center text-[8px] text-slate-600 font-mono uppercase">N/A</div>
                            )}
                          </div>
                          <span className="font-semibold text-white truncate max-w-[180px]">{project.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-xs font-mono">{project.category}</td>
                      <td className="px-6 py-4">
                        <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono border ${
                          project.type === 'client' 
                            ? 'bg-purple-950/20 border-purple-500/20 text-purple-400' 
                            : 'bg-slate-950 border-slate-800 text-slate-500'
                        }`}>
                          {project.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-xs font-mono">{project.order_index}</td>
                      <td className="px-6 py-4 text-right space-x-1">
                        <button
                          onClick={() => handleEdit(project)}
                          className="p-2 text-slate-500 hover:text-white hover:bg-slate-900/60 border border-transparent hover:border-slate-800 rounded-xl transition-all cursor-pointer"
                        >
                          <Edit2 size={14} />
                        </button>
                        <button
                          onClick={() => handleDelete(project.id!)}
                          className="p-2 text-slate-500 hover:text-red-400 hover:bg-red-950/10 border border-transparent hover:border-red-900/10 rounded-xl transition-all cursor-pointer"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add/Edit Modal */}
      {formOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-4xl bg-slate-900 border border-slate-800/80 rounded-[2rem] overflow-hidden shadow-2xl flex flex-col max-h-[90vh]">
            <div className="px-8 py-6 border-b border-slate-800/60 flex justify-between items-center shrink-0">
              <h2 className="text-xl font-bold font-header text-white tracking-wide">
                {editingId ? 'Edit Showcase Block' : 'Register Showcase Block'}
              </h2>
              <button
                onClick={() => setFormOpen(false)}
                className="p-2 text-slate-400 hover:text-white rounded-xl border border-slate-800 bg-slate-950/40 hover:bg-slate-950/80 transition-colors"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-8 overflow-y-auto space-y-8 flex-1">
              
              {/* Form Grid: Group 1 (Basic Parameters) */}
              <div className="space-y-4">
                <h3 className="text-xs font-mono text-purple-400 uppercase tracking-widest font-bold flex items-center gap-2">
                  <Compass size={14} /> // Core Settings
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Project Name</label>
                    <input
                      type="text"
                      required
                      value={title}
                      onChange={(e) => handleTitleChange(e.target.value)}
                      placeholder="e.g. Austin Smiles"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800/80 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500/80 focus:ring-4 focus:ring-purple-500/5 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Slug (URL Path)</label>
                    <input
                      type="text"
                      required
                      value={slug}
                      onChange={(e) => setSlug(e.target.value)}
                      placeholder="austin-smiles"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800/80 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500/80 focus:ring-4 focus:ring-purple-500/5 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Niche Category</label>
                    <input
                      type="text"
                      required
                      value={category}
                      onChange={(e) => setCategory(e.target.value)}
                      placeholder="e.g. Luxury Dental UX"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800/80 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500/80 focus:ring-4 focus:ring-purple-500/5 transition-all"
                    />
                  </div>
                </div>
              </div>

              {/* Form Grid: Group 2 (Technical & Assets) */}
              <div className="space-y-4 pt-4 border-t border-slate-800/40">
                <h3 className="text-xs font-mono text-purple-400 uppercase tracking-widest font-bold flex items-center gap-2">
                  <Globe size={14} /> // Technical & Assets
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Live Platform Link</label>
                    <input
                      type="url"
                      value={liveUrl}
                      onChange={(e) => setLiveUrl(e.target.value)}
                      placeholder="https://..."
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800/80 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500/80 focus:ring-4 focus:ring-purple-500/5 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Work Scope Classification</label>
                    <select
                      value={type}
                      onChange={(e) => setType(e.target.value as any)}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800/80 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500/80 focus:ring-4 focus:ring-purple-500/5 transition-all"
                    >
                      <option value="client">Client Project</option>
                      <option value="personal">Personal Project</option>
                    </select>
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Display Index Order</label>
                    <input
                      type="number"
                      required
                      value={orderIndex}
                      onChange={(e) => setOrderIndex(Number(e.target.value))}
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800/80 rounded-xl text-sm text-white text-center focus:outline-none focus:border-purple-500/80 focus:ring-4 focus:ring-purple-500/5 transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Tech Stack (comma-separated)</label>
                    <input
                      type="text"
                      required
                      value={techStackText}
                      onChange={(e) => setTechStackText(e.target.value)}
                      placeholder="React, GraphQL, Tailwind"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800/80 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500/80 focus:ring-4 focus:ring-purple-500/5 transition-all"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Card Text Description</label>
                    <input
                      type="text"
                      required
                      value={description}
                      onChange={(e) => setDescription(e.target.value)}
                      placeholder="Brief overview summarizing the work..."
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800/80 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500/80 focus:ring-4 focus:ring-purple-500/5 transition-all"
                    />
                  </div>
                </div>

                {/* Cover File Dropzone */}
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Cover Mockup Image</label>
                  <div className="p-6 border border-dashed border-slate-800 bg-slate-950/20 rounded-2xl relative overflow-hidden group hover:border-purple-500/30 transition-all duration-300">
                    <input
                      type="file"
                      accept="image/*"
                      id="image-file"
                      onChange={handleImageUpload}
                      className="hidden"
                      disabled={uploadingImage}
                    />
                    <label
                      htmlFor="image-file"
                      className="flex flex-col items-center justify-center gap-3 cursor-pointer text-center py-4"
                    >
                      {imageUrl ? (
                        <div className="relative w-full max-w-[240px] aspect-video rounded-xl border border-slate-800 bg-slate-900 overflow-hidden shadow-lg shadow-black/40">
                          <img src={imageUrl} alt="" className="w-full h-full object-cover object-top" />
                          <div className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                            <span className="text-[10px] text-white font-mono uppercase tracking-wider">Change Image</span>
                          </div>
                        </div>
                      ) : (
                        <>
                          <div className="w-12 h-12 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-center text-slate-400 group-hover:text-purple-400 transition-colors shadow-inner">
                            <Upload size={18} />
                          </div>
                          <div>
                            <span className="text-xs font-semibold text-slate-200 block">Click to upload mockup image file</span>
                            <span className="text-[10px] font-mono text-slate-500 block uppercase mt-1">Accepts PNG/JPG/WebP · max 5MB</span>
                          </div>
                        </>
                      )}
                      {uploadingImage && (
                        <div className="absolute inset-0 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center gap-2">
                          <div className="w-5 h-5 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin" />
                          <span className="text-[10px] font-mono text-slate-300">Uploading File Assets...</span>
                        </div>
                      )}
                    </label>
                  </div>
                </div>
              </div>

              {/* Form Grid: Group 3 (Case Study Specs) */}
              <div className="space-y-6 pt-4 border-t border-slate-800/40">
                <h3 className="text-xs font-mono text-purple-400 uppercase tracking-widest font-bold flex items-center gap-2">
                  <Layers size={14} /> // Detailed Case Study Config
                </h3>
                
                <div className="space-y-1.5">
                  <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Case Study Context Overview</label>
                  <textarea
                    rows={3}
                    value={csOverview}
                    onChange={(e) => setCsOverview(e.target.value)}
                    placeholder="Provide background context about challenges and diagnostic objectives..."
                    className="w-full px-4 py-3 bg-slate-950 border border-slate-800/80 rounded-xl text-sm text-white focus:outline-none focus:border-purple-500/80 focus:ring-4 focus:ring-purple-500/5 transition-all"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Core Challenges (1 per line)</label>
                    <textarea
                      rows={4}
                      value={csChallengesText}
                      onChange={(e) => setCsChallengesText(e.target.value)}
                      placeholder="Generic conversions funnel&#10;High bounce rates"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800/80 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500/80 focus:ring-4 focus:ring-purple-500/5 transition-all font-mono"
                    />
                  </div>
                  
                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Engineered Solutions (1 per line)</label>
                    <textarea
                      rows={4}
                      value={csSolutionsText}
                      onChange={(e) => setCsSolutionsText(e.target.value)}
                      placeholder="React-based Smart Triage modal&#10;Immersive Atmospheric video hero"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800/80 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500/80 focus:ring-4 focus:ring-purple-500/5 transition-all font-mono"
                    />
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-[10px] font-mono text-slate-400 uppercase tracking-wider block">Performance Results (1 per line)</label>
                    <textarea
                      rows={4}
                      value={csResultsText}
                      onChange={(e) => setCsResultsText(e.target.value)}
                      placeholder="35% increase in high-ticket leads&#10;Reduced bounce rates"
                      className="w-full px-4 py-3 bg-slate-950 border border-slate-800/80 rounded-xl text-xs text-white focus:outline-none focus:border-purple-500/80 focus:ring-4 focus:ring-purple-500/5 transition-all font-mono"
                    />
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-6 border-t border-slate-800/80 flex justify-end gap-3 shrink-0">
                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  className="px-5 py-3 border border-slate-800 hover:border-slate-700 bg-slate-950 hover:bg-slate-900 text-slate-400 hover:text-white rounded-xl font-mono text-xs uppercase transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:from-purple-600/50 disabled:to-indigo-600/50 text-white rounded-xl font-mono text-xs uppercase tracking-wider font-bold transition-all cursor-pointer"
                >
                  {submitting ? 'Registering...' : 'Save Showcase'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
